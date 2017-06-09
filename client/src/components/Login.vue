<template lang="html">
  <div id="app">
    <div class="container">
      <h1>LOGIN HERE</h1>
      <br>
      <div class="row">

        <div class="col-md-4">

        </div>
        <div class="col-md-4">

          <b-form-input v-model="email" type="text" placeholder="Enter your email" :state="text.length?'success':'warning'" :formatter="format" lazy-formatter></b-form-input>
          <small class="text-muted"></small>

          <br>

          <b-form-input v-model="password" type="password" placeholder="Enter your password" :state="text.length?'success':'warning'" :formatter="format"></b-form-input>
          <small class="text-muted"></small>
          <br>

          <div class="row">
            <template v-for="variant in ['success']">
              <div class="col-md-12">
                <b-button :size="size" :variant="variant" href="">
                  SIGN IN {{size}}
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
  data() {
    return {
      text: ''
    }
  }
}
</script>

<style lang="css" scoped>
button {
  width: 100% !important;
}
</style>
