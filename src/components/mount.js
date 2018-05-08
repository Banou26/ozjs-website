import { poz, css, registerElement } from 'oz.js'
import store from '../store/index.js'
import router from '../router/index.js'

export default registerElement({
  store,
  router,
  name: 'app-mount',
  template: _ => poz`router-view`,
  style () {
    return css`
    @import url('https://fonts.googleapis.com/css?family=News+Cycle');
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    
    html {
      font-size: 62.5%;
      height: 100%;
      width: 100%;
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
      background-color: #0f0f0f/*#151a1e #262d33*/;
    }
    `
  }
})
