import { html, css, registerElement } from 'oz.js'
import showdown from 'showdown'
import extension from '../util/showdown-extension.js'

const converter = new showdown.Converter({ extensions: [extension] })

const style = _ => css`
code {
  background: #151a1e;
  border-radius: .25rem;
}
`

const template = ({props: { value }}) => {
  const result = document.createElement('div')
  if (value) result.innerHTML = converter.makeHtml(value)
  return html`${[...result.childNodes]}`
}

export default registerElement({
  name: 'oz-markdown',
  props: ['value'],
  template,
  style
})
