export const code = `import { reactify, watch } from '/oz.js'
const react = reactify({
  a: 1,
  b: 2,
  get c () {
    return this.a + this.b
  }
})

const element = document.createElement('div')
element.textContent = react.c
document.body.appendChild(element)

watch(_ => react.c, newVal => (element.textContent = newVal))
setInterval(_ => react.a ++, 1000)
`

export const documentation = `###Reactivity overview
A reactive system that allows you to react to data changes.

Reactive objects also get some optimisations, such as a getter's value will be cached until its dependencies change.`
