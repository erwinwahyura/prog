<template lang="html">
  <div class="card">
      <img class="card-img-top" :src="content.image">
      <div class="card-block">
          <h4 class="card-title">{{content.title}}</h4>
          <div class="card-text">
              {{content.description}}
          </div>
      </div>
      <div class="card-footer">
          <!-- <span class="float-right">{{content.userId.name}}</span> -->
      </div>
  </div>
</template>

<script>
export default {
  props:['content']
}
</script>

<style lang="css">
.card {
    font-size: 12px;
    overflow: hidden;
    padding: 0;
    border: none;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    width: 22em;
    margin-left: 20px;
    margin-top: 10px;
}

.card-block {
    font-size: 1em;
    position: relative;
    margin: 0;
    padding: 1em;
    border: none;
    border-top: 1px solid rgba(34, 36, 38, .1);
    box-shadow: none;
}

.card-img-top {
    display: block;
    width: 100%;
    height: 20em;
}

.card-title {
    font-size: 1.28571429em;
    font-weight: 700;
    line-height: 1.2857em;
}

.card-text {
    clear: both;
    margin-top: .5em;
    color: rgba(0, 0, 0, .68);
}

.card-footer {
    font-size: 1em;
    position: static;
    top: 0;
    left: 0;
    max-width: 100%;
    padding: .75em 1em;
    color: rgba(0, 0, 0, .4);
    border-top: 1px solid rgba(0, 0, 0, .05) !important;
    background: #fff;
}
</style>
