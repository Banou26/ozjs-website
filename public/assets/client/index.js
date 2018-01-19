import store from './store/index.js'
import router from './router/index.js'
import { Mount } from './components/index.js'

document.body.appendChild(new Mount({
  store,
  router
}))
