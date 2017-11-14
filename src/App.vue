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
  
</style>
