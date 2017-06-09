<template lang="html">
  <div id="app">
    <div class="container" v-if="product == true">
      <p><a class="btn btn-primary" role="button" style="color:white;" @click="showPost">Post Your Product</a>
      <h3>List Product</h3>
      <div class="row">
        <product v-for="product in list_products" v-bind:content="product" :key="product._id"></product>
      </div>

    </div>
    <div class="container" v-if="post == true">
      <p><a class="btn btn-primary" role="button" style="color:white;" @click="showListProduct">Back</a>
      <h1>Post New Product</h1>
      <br>
      <div class="row">
        <div class="col-md-2">
          <alert v-if="msg.length>0">
            <span class="icon-ok-circled alert-icon-float-left"></span>
            <strong>Well Done!</strong>
            <p>{{msg}}</p>
            <button @click="msgClear">X</button>
          </alert>
        </div>
        <div class="col-md-8">
          <b-form-input v-model="title" type="text" placeholder="title.." required></b-form-input>
          <br>
          <b-form-input style="height:100px;" textarea v-model="description" placeholder="your description.." required></b-form-input>
          <br>
          <b-form-input v-model="image" type="text" placeholder="url image" required></b-form-input>
          <br>
          <b-form-input v-model="post_date" type="datetime-local" placeholder="url image" required></b-form-input>
          <br>
          <b-button class="col-md-12" @click="postYourProduct">Post Your Product</b-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
var config = {
  apiKey: "AIzaSyBFeB00_BJThgniQHFGWEDb7iD8F0bhoK8",
  authDomain: "kanban-project.firebaseapp.com",
  databaseURL: "https://kanban-project.firebaseio.com/",
  storageBucket: "gs://kanban-project.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database()

import Product from './Product'
export default {
  components : {
    Product
  },
  data(){
    return{
      product : true,
      post : false,
      title : '',
      description : '',
      image: '',
      post_date:'',
      list_products:[],
      msg : ''
    }
  },
  methods : {
    msgClear(){
      this.msg = ''
    },
    showPost(){
      this.post = true;
      this.product = false;
    },
    showListProduct(){
      this.post = false;
      this.product = true;
    },
    postYourProduct(){
      var self = this
      this.msg = 'Product berhasil di upload... Silahkan tunggu untuk proses lain lain'
      axios.post('http://localhost:3000/api/blog',{
        title: self.title,
        description : self.description,
        image : self.image,
        postdate : self.post_date
      },{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        self.title = ''
        self.description = ''
        self.image= ''
        self.post_date=''
        self.msg = ''
        self.list_products.push(response.data)
        console.log(response.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created(){
    var self = this

    var ref = firebase.database().ref();
    ref.on("value", function(snapshot) {
       self.list_products = snapshot.val().product
       console.log(self.list_products);
    }, function (error) {
       console.log("Error: " + error.code);
    });

    // axios.get('http://localhost:3000/api/blog',{
    //   headers : {
    //     token : localStorage.getItem('token')
    //   }
    // })
    // .then(response=>{
    //   self.list_products = response.data
    //   console.log(response.data);
    // })
    // .catch(err=>{
    //   console.log(err);
    // })
  }
}
</script>

<style lang="css">
.container {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;
  padding: 10px
}

</style>
