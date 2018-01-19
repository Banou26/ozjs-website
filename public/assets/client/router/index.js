import { Router } from '/oz.js'
import Index from '../components/index.js'
import Guide from '../components/guide.js'

export default new Router({
  routes: [
    {
      path: '/',
      components: [Index]
    },
    {
      path: '/guide',
      components: [Guide]
    }
  ]
})
