import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import auth from '@/api/auth'
import store from '../store'

// import Index from "../views/Index.vue"
// import Login from '../views/Login.vue'
const Index = () => import("../views/Index.vue")
const Login = () => import("../views/Login.vue")
const Register = () => import("../views/Register.vue")
const My = () => import("../views/My.vue")
const Edit = () => import("../views/Edit.vue")
const Detail = () => import("../views/Detail.vue")
const User = () => import("../views/User.vue")
const Create = () => import("../views/Create.vue")


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/create',
    component: Create,
    meta: { requiresAuth: true }
  },
  {
    path: '/detail/:blogId',
    component: Detail
  },
  {
    path: '/edit/:blogId',
    component: Edit,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/my',
    component: My,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user/:userId',
    component: User
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {// 如果没有登录
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保调用了next()
  }
})

export default router
