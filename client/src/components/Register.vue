<template lang="html">
  <div id="app">
    <div class="container">
      <h1>REGISTER HERE</h1>
      <br>
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <b-form-input v-model="name" type="text" placeholder="Enter your name" :state="text.length?'success':'warning'" :formatter="format"></b-form-input>
          <br>
          <b-form-input v-model="email" type="text" placeholder="Enter your email" :state="text.length?'success':'warning'" :formatter="format" lazy-formatter></b-form-input>
          <small class="text-muted"></small>
          <br>
          <b-form-input v-model="password" type="password" placeholder="Enter your password" :state="text.length?'success':'warning'" :formatter="format"></b-form-input>
          <small class="text-muted"></small>
          <br>
          <b-form-input v-model="phone" type="phone" placeholder="Enter your phone number" :state="text.length?'success':'warning'" :formatter="format"></b-form-input>
          <small class="text-muted"></small>
          <br>
          <div class="row">
            <template v-for="variant in ['success']">
              <div class="col-md-12">
                <b-button :size="size" :variant="variant" href="">
                  SIGN UP {{password}}
                </b-button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      name : '',
      email : '',
      password : '',
      phone : ''
    }
  },
  methods : {
    signup(){
      axios.post('http://localhost:3000/api/users/signup',{
        name : this.name,
        email : this.email,
        password : this.password,
        phone : this.phone
      })
      .then(response=>{
        this.email = ''
        this.password = ''
        this.name = ''
        this.phone = ''
        if(response.data.hasOwnProperty('msg')){
          this.msg = response.data.msg
        }else if(response.data.hasOwnProperty('message')){
          this.msg = response.data.message
        }else{
          // console.log(response.data.token);
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    msgClear(){
      var self = this
      self.msg = ''
    }
  }
}
</script>

<style lang="css" scoped>
  button {
    width: 100% !important;
  }

</style>
