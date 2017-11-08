<template>
  <div id="app">
    <scroll ref="listContent" :data="list" class="list-content">
      <img src="~common/image/test.jpg">
      <router-view/>
    </scroll>
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
    margin-top: 60px;
  }
  .list-content {
    display: flex;
  }
</style>
