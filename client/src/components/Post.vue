<template lang="html">
  <div id="app">
    <div class="container">
      <h1>Post New Product</h1>
      <br>
      <div class="row">
        <div class="col-md-4">

        </div>
        <div class="col-md-4">
          <b-form-input v-model="text" type="text" placeholder="title.." required></b-form-input>
          <br>
          <b-form-input style="height:100px;" textarea v-model="text" placeholder="your description.." required></b-form-input>
          <br>
          <b-form-file class="col-md-12" v-model="file" @click="uploud(file)"></b-form-file>
          <br> Selected file: {{file && file.name}}
          <br>
          <br>
          <b-button class="col-md-12">Submit</b-button>
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
      file: ''
    }
  },
  methods: {
    // uploud: function (file) {
    //   var self = this
    //   unirest.post('https://www.dropbox.com/home/img')
    //   .header("X-Mashape-Key", "QGOXQtQCgkmshQZ216bcDj8RaRX4p1yguhIjsn88GLh3e3Iybw")
    //   .attach("file", fs.createReadStream(self.file)
    //   .field("UPLOADCARE_PUB_KEY", "demopublickey")
    //   .field("UPLOADCARE_STORE", 1)
    //   .end(function (result) {
    //     console.log(result.status, result.headers, result.body);
    //   });
    // }
  }
}
</script>

<style lang="css">
</style>
