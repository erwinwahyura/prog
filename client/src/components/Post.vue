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
      text: ''
    }
  }
}
</script>

<style lang="css">
</style>
