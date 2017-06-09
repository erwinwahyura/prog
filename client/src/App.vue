<template>
  <div id="app">
    <Navbar :login="decodedToken" :key="decodedToken._id"></Navbar>
    <br>
    <br>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  data(){
    return{
      decodedToken :[]
    }
  },
  components: {
    Navbar
  },
  created(){
    var self = this
    axios.get('http://localhost:3000/api/users/validate',{
      headers:{
        token : localStorage.getItem('token')
      }
    })
    .then(response=>{
      self.decodedToken = response.data
      window.location.href = 'http://localhost:8080/#/home'
      console.log(self.decodedToken);
    })
    .catch(err=>{
      console.log(err);
    })
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
