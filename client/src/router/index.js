import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Sidebar from '@/components/Sidebar'
import Home from '@/components/Home'
import Content from '@/components/Content'

Vue.use(BootstrapVue);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/sidebar',
      name: 'Sidebar',
      component: Sidebar
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    }
  ]
})
