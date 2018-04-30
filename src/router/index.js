import { Router } from 'oz.js'
import Index from '../components/index.js'
// import Guide from '../components/guide.js'

export default Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
    // {
    //   path: '/guide',
    //   components: [Guide]
    // }
  ]
})
