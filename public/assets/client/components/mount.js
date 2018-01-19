import { html, css, registerElement } from '/oz.js'

export default registerElement({
  name: 'app-mount',
  template () {
    return html`<router-view></router-view>`
  },
  style () {
    return css`
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
    
    app-mount {
      height: 100%;
      width: 100%;
      display: inline-block;
    }
    `
  }
})
