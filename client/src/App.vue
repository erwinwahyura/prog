<template>
  <div id="app">
    <Navbar></Navbar>
    <br>
    <br>
    <br>
    
    <!-- <img src="./assets/bg.jpg"> -->
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  /*background-image: url('./assets/bg.jpg');*/
  /*min-height: 800px;*/
  /*background-image: cover;*/
}
</style>
