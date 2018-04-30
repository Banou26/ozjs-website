export const style = `
<style>
@import url('https://fonts.googleapis.com/css?family=News+Cycle');
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

html {
  font-size: 62.5%;
  height: 100%;
  width: 100%;
  background-color: #0f0f0f/*#151a1e #262d33*/;
}

body {
  font-size: 1.5rem;
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
}

app-header {
  display: block;
  text-align: center;
  color: #ECECEC;
  align-self: end;
  font-family: Roboto;
  font-size: 4rem;
  font-weight: 100;
}
</style>
`

export const code = `const AppHeader = registerElement({
  name: 'app-header',
  props: ['description'],
  template: ({props: {description}}) => html\`Oz.js, \${description}\`
})

const appHeader = new AppHeader() // Or document.createElement('app-header')
appHeader.description = 'Progressive Javascript Framework'
document.body.appendChild(appHeader)
`

export const documentation = `###Component overview
Oz.js exposes a
\`\`\`javascript
registerElement(options)\`\`\`
function used to define custom elements.
Once the element is defined, you can create it by calling its constructor(
\`\`\`javascript
new myElement()\`\`\`
) or by calling
\`\`\`javascript
document.createElement('my-element')\`\`\`
and append it like any other elements to the dom
\`\`\`javascript
.appendChild(myElement)\`\`\``
