<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  export default {
    name: 'app',
    data() {
      return {
        list: [1]
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .list-content {
    display: flex;
  }
</style>
