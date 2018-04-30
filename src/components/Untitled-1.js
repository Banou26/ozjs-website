import { Element, html, css, reactify } from 'oz.js'

const template = state => a.
html`
<router-link href="/" id="logo">
  <img src="/assets/logo.svg">
  <span>Oz.js</span>
</router-link>
<router-link href="/guide">
  <span>Guide</span>
</router-link>
`

export _ => {
  const state = reactify({
    a:1
  })

}