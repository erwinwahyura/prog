<template lang="html">
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <h2>SIDEBAR</h2>
          <div class="row">
            <div class="col-md-12">
              <div class="list-group">
               <a href="#" class="list-group-item active">
                 Cras justo odio
               </a>
               <a href="#" to="./sidebar" class="list-group-item" >Dapibus ac facilisis in</a>
               <a href="#" class="list-group-item">Morbi leo risus</a>
               <a href="#" class="list-group-item">Porta ac consectetur ac</a>
               <a href="#" class="list-group-item">Vestibulum at eros</a>
             </div>
           </div>
          </div>
        </div>
        <div class="col-md-9">
          <Content></Content>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Content from '@/components/Content'
export default {
  data () {
    return {

    }
  },
  methods: {
    subMenu () {
      panel:''
    }
  },
  components: {
    Content
  }
}
</script>

<style lang="css" scoped>
.col {
  width: 100% !important;
}
</style>
