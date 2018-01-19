export const example1 = `import { Element, html, css } from 'oz.js'

class Header extends Element {
  constructor () {
    super({ shadowDom: 'open' })
  }

  static template () {
    return html\`
    <router-link href="/" id="logo">
      <img src="/assets/logo.svg">
    </router-link>
    <router-link href="/guide">
      <span>Guide</span>
      \${ 'foo' }
    </router-link>
    \`
  }

  static style () {
    return css\`
    :host {
      height: 6rem;
      width: 100%;
      color: #2c3e50;
    }

    #logo {
      display: flex;
      align-items: center;
      margin-left: 2rem;
    }
    \`
  }
}
customElements.define('app-header', Header)
`

export const example2 = `import { reactify } from 'oz.js'

const react = reactify({
  a: 1,
  b: 2,
  c () {
    return this.a + this.b
  }
})

react.$watch(obj => {
  console.log(obj)
})
`

export const example3 = `import { registerElement, html, css } from 'oz.js'

const template = _ => html\`
<router-link href="/" id="logo">
  <img src="/assets/logo.svg">
  <span>Oz.js</span>
</router-link>
<router-link href="/guide">
  <span>Guide</span>
  \${ 'foo' }
</router-link>
\`

const Header = _ => ({
  options: { shadowDom: 'open' },
  template,
  style
})

const style = _ => css\`
:host {
  height: 6rem;
  width: 100%;
  color: #2c3e50;
}

#logo {
  display: flex;
  align-items: center;
  margin-left: 2rem;
}
\`
registerElement('app-header', Header)
`
