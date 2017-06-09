<template lang="html">
  <div id="app">
    <b-navbar toggleable type="inverse" variant="success">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="/">
        <span>PROG-APPS</span>
      </b-link>
      <b-collapse is-nav id="nav_collapse" v-if="login.id">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="text">
              <span style="font-weight: bold;">Welcome {{login.name}}</span>
            </template>
            <b-dropdown-item  @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
      <b-collapse is-nav id="nav_collapse" v-else>
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using text slot -->
            <template slot="text">
              <span style="font-weight: bold;">Getting Started</span>
            </template>
            <b-dropdown-item to="./login">Sign In</b-dropdown-item>
            <b-dropdown-item to="./register">Sign Up</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'

export default {
  props : ['login'],
  components: {
    Login,
    Register
  },
  methods : {
    logout(){
      localStorage.clear()
      window.location.href = "http://localhost:8080/#/"
      location.reload()
      
    }
  }
}
</script>

<style lang="css">
</style>
