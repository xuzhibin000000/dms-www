import Vue from 'vue'
import Router from 'vue-router'
// 登录
// const Login = () => import('@/page/login/Login')
// 主页
const Index = () => import('@/page/index/Index')
// DEMO
const Home = () => import('@/page/home/Home')
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/dms-web/index.html',
      component: Index
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      components: {
        default: Index
      },
      children: [{
        path: 'home',
        components: {
          Home
        }
      }]
    }
  ]
})
