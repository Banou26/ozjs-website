import fs from 'fs'
import path from 'path'

import Koa from 'koa'
import http2 from 'http2'
import Router from 'koa-router'
import compress from 'koa-compress'
import zlib from 'zlib'

import expose from './expose'
const { __dirname } = expose

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem'))
}

const app = new Koa()
const router = new Router()

app
.use(router.routes())
.use(router.allowedMethods())
.use(compress({
  filter: contentType => true,
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH
}))

const server = http2
.createSecureServer(options, app.callback())
.listen(443)

export {
  app,
  router,
  server
}
