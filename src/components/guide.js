import { Element, html, css } from '/oz.js'

export default class Guide extends Element {
  constructor () {
    super({ shadowDom: 'open' })
  }

  static template () {
    return html`
    Guide
    `
  }

  static style () {
    return css`
    `
  }
}
customElements.define('app-guide', Guide)
