const webpack = process && process.env.webpack

export const code = `${webpack ? '/*\n  ' : ''}import { html } from '/oz.js'
${webpack ? `  This browser doesn't support ES2015 modules
 */` : ''}
const template = html\`<\${'p'}>\${'some text'}</\${'p'}>\`

const instance = template()
document.body.appendChild(instance.content)

let i
setInterval(_ => instance.update(...(i = !i) ? template.values : ['h1','another text', 'h1']), 1000)
`

export const documentation = `###Templates overview
You can declare \`element tags\`, \`attributes\`, \`properties\`, \`events listeners\`, \`comments\`, 
\`texts\` in html and \`property values\` in css templates.

It's extensiveness allows you to write in Pug's syntax or any other that you'd want.`
