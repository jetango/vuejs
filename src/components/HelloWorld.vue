<template>
  <div class="hello">
    <h1 @click="msgClicked()"><span>{{ msg }}</span></h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      msgClicked() {
        alert(123)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  h1
    font-size: 19px;
    span {
      color: red;
    }
</style>
