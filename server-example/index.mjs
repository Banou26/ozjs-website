import fs from 'fs'
import path from 'path'
import util from 'util'

import './http.mjs'
import './routes'
import expose from './expose'
const { promisify } = util
const { __dirname } = expose

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readDir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
const getStat = promisify(fs.stat)

const copyFolderContentTo = async (from, to) => {
  const filesNames = await readDir(from)
  try {
    await readDir(to)
  } catch (err) {
    await mkdir(to)
  }
  for (const fileName of filesNames) {
    const filePath = path.resolve(from, fileName)
    const filePathTarget = path.resolve(to, fileName)
    const stat = await getStat(filePath)
    if (stat.isDirectory()) {
      try {
        await readDir(filePathTarget)
      } catch (err) {
        await mkdir(filePathTarget)
      }
      await copyFolderContentTo(filePath, filePathTarget)
    } else {
      await writeFile(filePathTarget, await readFile(filePath))
    }
  }
}
copyFolderContentTo(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../assets/client'))
copyFolderContentTo('C:\\Users\\Banou\\Desktop\\ozjs\\src', path.resolve(__dirname, '../assets/ozjs'))
fs.watch(path.resolve(__dirname, '../src'), {recursive: true}, _ => copyFolderContentTo(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../assets/client')))
fs.watch('C:\\Users\\Banou\\Desktop\\ozjs\\src', {recursive: true}, _ => copyFolderContentTo('C:\\Users\\Banou\\Desktop\\ozjs\\src', path.resolve(__dirname, '../assets/ozjs')))
