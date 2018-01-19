import fs from 'fs'
import path from 'path'
import util from 'util'

import detective from 'detective-es6'

import expose from '../expose'
const { __dirname } = expose
const readFile = util.promisify(fs.readFile)

export const getJsFileDependencies = async (_path, map = new Map()) => {
  if (map.has(_path)) return
  const file = await readFile(_path)
  const deps = detective(file.toString())
  map.set(_path, deps)
  const _deps = []
  for (const dep of deps) {
    const depPath = dep.startsWith('.') ? path.resolve(__dirname, _path, '..', dep) : path.resolve(__dirname, `../client/${dep}`)
    if (!map.has(depPath)) _deps.push(getJsFileDependencies(depPath, map))
  }
  await Promise.all(_deps)
  return [...map.keys()]
}
