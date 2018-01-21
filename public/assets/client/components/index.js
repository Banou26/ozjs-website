import { html, css, registerElement } from '/oz.js'
import Mount from './mount.js'
import Header from './header.js'
import Code from './code.js'
import Markdown from './markdown.js'
import * as componentOverview from '../documentation/examples/component-overview.js'
import * as templateOverview from '../documentation/examples/template-overview.js'
import * as reactivityOverview from '../documentation/examples/reactivity-overview.js'

const style = _ => css`

:host {
  display: flex;
  flex-direction: column;
}
/* firefox fix */
app-index {
  display: flex;
  flex-direction: column;
}

.header {
  display: inline-block;
  position: relative;
  margin: auto;
  margin-top: 10rem;
}

#logo {
  margin: auto;
  height: 20rem;
}

#discord {
  position: absolute;
  right: -4rem;
  bottom: 0;
  height: 4rem;
}

#github {
  position: absolute;
  right: -3.6rem;
  bottom: 4.2rem;
  height: 3.2rem;
}

footer {
  text-align: center;
  color: #ECECEC;
  padding: 2.5rem;
}

#description {
  display: block;
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

#inner {
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
`

const template = ({host}) => {
  const descNode = document.createElement('iframe')
  descNode.setAttribute('frameborder', '0')
  descNode.setAttribute('scrolling', 'no')
  descNode.id = 'description'
  // const items = [{
  //   documentation: componentOverview.documentation,
  //   html: componentOverview.style,
  //   result: descNode,
  //   value: componentOverview.code
  // }, {
  //   documentation: templateOverview.documentation,
  //   result: 'true',
  //   value: templateOverview.code
  // }, {
  //   documentation: reactivityOverview.documentation,
  //   result: 'true',
  //   value: reactivityOverview.code
  // }]
//   ${items.map(item => html`<div class="example">
//   <oz-markdown value=${item.documentation}></oz-markdown>
//   <oz-code
//     html=${item.html || ''}
//     language="javascript"
//     result=${item.result}
//     editable="true"
//     value=${item.value}
//   ></oz-code>
// </div>`)}
  const ozjsBundle = process && process.env.webpack ? '<script src="/assets/code-result.js"></script>' : ''
  return html`
  <div class="header">
    <img id="logo" src="/assets/imgs/logo.svg">
    <a href="https://github.com/Banou26/ozjs" target="_blank"><img id="github" src="/assets/imgs/github-light-120.png"></a>
    <a href="https://discord.gg/ZKEbTqf" target="_blank"><img id="discord" src="/assets/imgs/discord-logo-white.svg"></a>
  </div>
  ${descNode}
  <div id="inner">
    <div class="example">
      <oz-markdown value=${componentOverview.documentation}></oz-markdown>
      <oz-code
        html=${ozjsBundle + componentOverview.style}
        language="javascript"
        result=${descNode}
        editable="true"
        value=${componentOverview.code}
      ></oz-code>
    </div>
    <div class="example">
      <oz-markdown value=${templateOverview.documentation}></oz-markdown>
      <oz-code
      html=${ozjsBundle}
        language="javascript"
        result="true"
        editable="true"
        value=${templateOverview.code}
      ></oz-code>
    </div>
    <div class="example">
      <oz-markdown value=${reactivityOverview.documentation}></oz-markdown>
      <oz-code
      html=${ozjsBundle}
        language="javascript"
        result="true"
        editable="true"
        value=${reactivityOverview.code}
      ></oz-code>
    </div>
    <h2 class="soon">
      Router and Store examples soon...
    </h2>
  </div>
  <footer>Released under the MIT License<br>Copyright © 2018 Dias-Santos Thomas</footer>
  `
}

const Index = {
  name: 'app-index',
  options: {shadowDom: 'open'},
  template,
  style
}

export default registerElement(Index)

export {
  Mount,
  Header,
  Code,
  Markdown
}
