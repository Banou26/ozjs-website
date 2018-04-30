import { poz } from 'oz.js'
const template = poz`
meta(charset="utf-8")
meta(name="viewport" content="width=device-width, initial-scale=1.0")`()
document.head.appendChild(template.content)
