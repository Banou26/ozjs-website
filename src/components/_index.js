import { poz, css, registerElement } from 'oz.js'
import Mount from './mount.js'
// import Header from './header.js'
import Code from './code.js'
import Markdown from './markdown.js'
import * as componentOverview from '../documentation/examples/component-overview.js'
import * as templateOverview from '../documentation/examples/template-overview.js'
import * as reactivityOverview from '../documentation/examples/reactivity-overview.js'

const style = ({state: { loading }}) => css`

:host {
  display: flex;
  flex-direction: column;
}
/* firefox fix */
app-index {
  display: flex;
  flex-direction: column;
}

header {
  display: inline-block;
  position: relative;
  margin: auto;
  margin-top: 10rem;
}

.logo {
  margin: auto;
  height: 20rem;
}

.discord {
  position: absolute;
  right: -4rem;
  bottom: 0;
  height: 4rem;
}

.github {
  position: absolute;
  right: -3.6rem;
  bottom: 4.2rem;
  height: 3.2rem;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
  text-align: center;
  color: #ECECEC;
  align-self: end;
  font-family: Roboto;
  font-size: 4rem;
  font-weight: 100;
  width: 100%;
  height: 4.8rem;
}

footer {
  text-align: center;
  color: #ECECEC;
  padding: 2.5rem;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.example {
  display: flex;
  margin: 4rem auto;
  width: 120rem;
}

.example oz-markdown {
  font-family: Roboto;
  color: #ECECEC;
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 2.25rem;
  flex: 0 0 30%;
}

.example oz-markdown oz-code {
  font-size: 1.5rem;
  flex: none;
}

.example oz-code {
  flex: 0 0 70%;
}

@media screen and (max-width: 1250px) {
  /* #inner {
    margin: 5rem 2.5rem;
  } */

  #description {
    height: calc(4.8rem * 2);
  }

  .example {
    flex-direction: column;
    width: auto;
    max-width: calc(100% - 1 * 2rem);
    margin: 0 1rem;
  }
}

.soon {
  margin: auto;
  padding: 2rem;
  padding-bottom: 4rem;
  text-align: center;
  color: #ECECEC;
}

.loading-icon {
  height: 4.8rem;
  opacity: ${loading ? '0' : '.11666'};
}

.placeholder {
  border-radius: .3rem;
  margin-left: 1rem;
  color: ${`hsla(0, 0%, 93%, ${loading ? '1' : '0'})`};
}
.placeholder { background-color: ${`hsla(0, 0%, 17%, ${loading ? '0' : '1'})`}; }

router-link[to="guide"], router-link[to="api"] {
  width: 10rem;
  height: 5rem;
  background-color: firebrick;
  display: inline;
  margin: auto;
}

`

const template = ({state: loading}) => {
  const ozjsBundle = process && process.env.webpack ? '<script src="/assets/code-result.js"></script>' : ''
  return poz`
  header
    img.logo(src="/assets/imgs/logo.svg")
    a(href="https://github.com/Banou26/ozjs" target="_blank")
      img.github(src="/assets/imgs/github-light-120.png")
    a(href="https://discord.gg/ZKEbTqf" target="_blank")
      img.discord(src="/assets/imgs/discord-logo-white.svg")
  h1 Oz.js,
    span.placeholder Progressive Javascript Framework
    img.loading-icon(src="/assets/imgs/loading.svg")
  router-link(to="guide") Guide
  router-link(to="api") API
  footer Released under the MIT License<br>Copyright © 2018 Dias-Santos Thomas
  `
  //.inner
  //  .example
  //    oz-markdown(value=${componentOverview.documentation})
  //    oz-code(html=${ozjsBundle + componentOverview.style} language="javascript" editable="true" value=${componentOverview.code})
}

const Index = {
  name: 'app-index',
  shadowDom: 'open',
  state: _ => ({
    titleLoading: true,
    interval: undefined
  }),
  template,
  style,
  connected: ({state}) => (state.interval = setInterval(_ => (state.loading = !state.loading), 2500)),
  disconencted: ({state: {interval}}) => clearInterval(interval)
}

export default registerElement(Index)

export {
  // Header,
  Code,
  Markdown
}
