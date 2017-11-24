<template>
  <div id="app">
    <!-- <app-header></app-header> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less">
  @import './style/common';
  #app{
    height: 100%;
  }
</style>
