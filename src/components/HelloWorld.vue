<template>
  <div class="hello">
    <h1 @click="msgClicked()"><span>{{ msg }}</span></h1>
    <div class="test-el"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      msgClicked() {
        console.log(123)
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  h1
    px2rem('font-size',56);
    span {
      color: red;
    }

  .test-el
    px2rem('width', 640)
    px2rem('height', 200)
    border: 1px red solid
    box-sizing: border-box
</style>
