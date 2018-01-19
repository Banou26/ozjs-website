import { Element, html, css } from '/oz.js'

export default class Header extends Element {
  constructor () {
    super({ shadowDom: 'open' })
  }

  static template () {
    return html`
    <router-link href="/" id="logo">
      <img src="/assets/logo.svg">
      <span>Oz.js</span>
    </router-link>
    <router-link href="/guide">
      <span>Guide</span>
    </router-link>
    `
  }

  static style () {
    return css`
    :host {
      height: 6rem;
      width: 100%;
      color: #2c3e50;
      border-bottom: 1px solid rgba(0,0,0,0.14);
      display: flex;
      align-items: center;
    }

    #logo {
      display: flex;
      align-items: center;
      margin-left: 2rem;
    }

    #logo img {
      height: 4rem;
      width: 4rem;
    }

    #logo span {
      font-family: "News Cycle";
      font-size: 2.25rem;
      margin-left: .5rem;
    }
    `
  }
}
customElements.define('app-header', Header)
