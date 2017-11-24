<template>
  
  <h2 class="app-title">{{value}}</h2>

</template>

<script>
  export default {
    props: {
      value: {
        default: 'null'
      }
    }
  }
</script>

<style lang='less'>
  .app-title{
    border-left: 5px solid #089F48;
    padding-left: 10px;
    font-size: 16px;
    color: #373D41;
    margin: 5px 0px;
  }
</style>
