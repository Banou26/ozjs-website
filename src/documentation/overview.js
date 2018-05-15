export const markdown = `Yeet :)`

export const style = ``

export const code = `const externalAPI = name => new Promise(resolve => setTimeout(_ => resolve(Math.random()), 1000))

const style = ({state: { id }}) => css\`
:host, app-card {
  display: block;
  background-color: white;
  padding: 2rem;
  border-radius: .2rem;
}

.id {
  height: 18px;
  border-radius: .2rem;
  background-color: \${
    id && id.$resolved !== false
    ? ''
    : 'hsla(0, 0%, 0%, .5)'
  };
}
\`

const template = ({state: {id}, props: {name}}) => poz\`
.name \${name}
.id \${id}
\`

registerElement({
  name: 'app-card',
  props: ['name'],
  state: _ => ({ id: undefined }),
  template,
  style,
  watchers: [({state, props: {name}}) => name ? state.id = externalAPI('Card 1') : undefined]
})

const card = document.createElement('app-card')
card.name = 'Card 1'
document.body.appendChild(card)

setInterval(_ => card.name = \`Card \${Number(card.name.slice(5)) + 1}\`, 2000)
`

