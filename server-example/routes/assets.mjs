import fs from 'fs'
import path from 'path'
import util from 'util'

import mime from 'mime-types'

import { router } from '../http'
import expose from '../expose'
const { __dirname } = expose
const readFile = util.promisify(fs.readFile)

router.get('/assets/(.*)', async function (ctx, next) {
  const filePath = path.resolve(__dirname, '../assets', ctx.captures[0])
  ctx.set('Content-Type', mime.lookup(filePath))
  ctx.body = await readFile(filePath)
  next()
})

router.get('/oz.js', async function (ctx, next) {
  ctx.set('Content-Type', mime.lookup('index.js'))
  ctx.body = `export * from '/assets/ozjs/index.js'`
  next()
})
