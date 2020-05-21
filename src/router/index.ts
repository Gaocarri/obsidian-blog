import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

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
    component: Create
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes
})

export default router
