export const markdown = `Yeet :)`

export const style = ``

export const code = `
const externalAPI = name => new Promise(resolve => setTimeout(_ => resolve(Math.random()), 1000))

const style = ({state: { id }}) => css\`
:host, app-card {
  display: block;
  background-color: white;
  padding: 2rem;
  border-radius: .3rem;
}

.placeholder {
  height: 18px;
  background-color: grey;
}
\`

const template = ({state: {id}, props: {name}}) => poz\`
.name \${name}
.id(class="\${id && id.$resolved !== false ? '' : 'placeholder'}") \${id}
\`

registerElement({
  name: 'app-card',
  props: ['name'],
  state: _ => ({ id: undefined }),
  template,
  style,
  watchers: [({state, state: {name}}) => state ? state.id = externalAPI('Card 1') : undefined]
})
const card = document.createElement('app-card')
card.name = 'Card 1'
document.body.appendChild(card)
`

