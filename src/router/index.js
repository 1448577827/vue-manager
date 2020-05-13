import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/users/Users.vue'
import Welvome from '../components/welvome.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    { path:'/', redirect:'/login' },
    { path:'/login', component:Login },
    {
      path:'/home',
      component:Home,
      redirect:'/welvome',
      children : [
        // { path: '/', redirect:'welvome' },
        { path: '/users', component:Users },
        { path: '/welvome', component:Welvome }
      ]
    }
  ]
})
// 监听路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路由
  // from从哪个路由跳转过来的
  // next()执行下一个操作
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')

  next()
})

export default router
