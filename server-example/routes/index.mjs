import './assets'

import fs from 'fs'
import path from 'path'
import util from 'util'

import mime from 'mime-types'

import { router } from '../http'
import expose from '../expose'
const { __dirname } = expose
const readFile = util.promisify(fs.readFile)

router.get('/', async (ctx, next) => {
  const filePath = path.resolve(__dirname, '../index.html')
  ctx.set('Content-Type', mime.lookup(filePath))
  ctx.body = await readFile(filePath)
  next()
})
