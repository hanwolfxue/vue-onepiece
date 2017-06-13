<template>
  <div id="app">
    <keep-alive exclude="directive">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  require('./assets/scss/common.scss');
  //  require('./assets/buttons.css');
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 600px;
    overflow: scroll;
  }
</style>
