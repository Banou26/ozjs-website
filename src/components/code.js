import { html, css, registerElement } from 'oz.js'
import { caret } from '../util/caret.js'
import '../libs/prism.js'
import '../util/prism-extends.js'
/* global Prism */

const style = _ => css`
@import url('/assets/style/prism.css');

:host {
  display: inline-flex;
}

oz-code { /* firefox fixes */
  display: inline-flex;
}
oz-code code {
  padding: 1rem;
}
:host code {
  padding: 1rem;
}  /* firefox fixes */

code {
  position: relative;
  text-shadow: none !important;
  outline: none;
  background-color: #151a1e !important;
  border-radius: 1rem;
  white-space: pre-wrap !important;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
}

code[contenteditable=""]::after, code[contenteditable="true"]::after {
  content: "live editor";
  position: absolute;
  top: 0;
  right: .5rem;
  color: #a5a5a5;
  font-size: 1.3rem;
}

.error {
  color: #a91000/*#740b00*/;
}

code.extended {
  flex: 0 0 100%;
}

code.compact {
  flex: none;
  padding: .25rem;
  border-radius: .25rem;
  border-bottom-right-radius: .25rem;
  border-top-right-radius: .25rem;
}

code.result {
  display: inline-block;
  width: calc(70% - 4 * 1rem);
  /* flex: 0 0 calc(70% - calc(4 * 1rem)); */
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  word-wrap: break-word;
}

code.result.external {
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
}

div.result {
  display: inline-block;
  /* flex: 0 0 calc(30% - calc(4 * 1rem)); */
  background-color: rgb(200, 200, 200);
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem;
}

@media screen and (max-width: 950px) {
  oz-code{ /* firefox fix */
    flex-direction: column;
  }
  :host {
    flex-direction: column;
  }

  code.compact {
    border-bottom-right-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  code.result {
    width: calc(100% - 2 * 1rem);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 1rem;
  }
  code.result.external {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  div.result {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
}
`

const template = ({host, state, props: { language, value: pValue, editable, display, result }}) => {
  const { value = pValue, error, mountNode } = state
  const code = document.createElement('div')
  if (value && Prism.languages[language]) code.innerHTML = Prism.highlight(value, Prism.languages[language])
  let borderClass = ''
  if (result instanceof Node) borderClass = 'external'
  else borderClass = result ? 'result' : 'extended'
  return html`<code
    class="language-${language} ${borderClass} ${error ? 'error' : ''} ${display === 'compact' ? 'compact' : ''}"
    contenteditable="${editable ? '' : 'false'}"
    spellcheck="false"
    on-input=${editable ? ev => input(ev, {host, state}) : null}
    on-keydown=${editable ? keydown : null}
  >${[...code.childNodes]}</code>
  ${typeof result === 'string' || error ? html`
  <div class="result ${error ? 'error' : ''}">
    ${error ? error.toString() : mountNode}
  </div>
  ` : ''}`
}

const keydown = (ev) => {
  if (ev.keyCode === 9) { // Tab
    document.execCommand('insertHTML', false, '  ')
    ev.preventDefault()
  }
}

const input = (ev, {host, state}) => {
  const elem = ev.composedPath()[0]
  const offset = caret(host, elem)
  state.value = elem.textContent
  caret(host, elem, offset)
}

export const OzCodeErrorEvent = new Event('error', {bubbles: true, composed: true})

export default registerElement({
  name: 'oz-code',
  shadowDom: 'open',
  props: ['language', 'value', 'result', 'editable', 'display', 'html'],
  template,
  style,
  state: ({host, props, watchers}) => ({
    error: undefined,
    value: undefined,
    ready: false,
    get mountNode () {
      const { result } = props
      let node
      if (result !== undefined) {
        if (result instanceof Node) {
          node = result
        } else {
          node = document.createElement('iframe')
          node.setAttribute('frameborder', '0')
          node.classList.add('mountNode')
        }
        window.addEventListener('message', ev => {
          if (ev.source !== node.contentWindow) return
          const offset = caret(host, host.querySelector('code'))
          this.error = ev.data
          caret(host, host.querySelector('code'), offset)
        })
        node.addEventListener('load', _ => (this.ready = true))
      }
      return node
    }
  }),
  watchers: [
    ({props: {pValue}}) => {},
    ({host, state, props: { value: pValue, html }}) => {
      const { value = pValue, mountNode, ready } = state
      if (!mountNode || !value || !ready) return
      try {
        // code awaiting for https://bugs.chromium.org/p/chromium/issues/detail?id=717715
        // mountNode.contentWindow.location.reload(true)
        // mountNode.contentDocument.open()
        // mountNode.contentDocument.write(`
        //   <html>
        //   <head></head>
        //   <body>
        //     ${html || ''}
        //     <script src="/assets/code-result-bundle.js"></script>
        //     <script>${value}</script>
        //   </body>
        // </html>`)
        // mountNode.contentDocument.close()
        mountNode.srcdoc = `
        <html>
          <head></head>
          <body>
            ${html || ''}
            <script src="/assets/code-result-bundle.js"></script>
            <script>${value}</script>
          </body>
        </html>`
        state.error = undefined
      } catch (err) {
        state.error = err
        console.error(err)
        host.dispatchEvent(OzCodeErrorEvent)
      }
    }
  ]
})
