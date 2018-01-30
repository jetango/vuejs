<template>
  <div class="vip-introduction-box">
    <img src="~/common/image/HY_js_01.jpg"/>
    <img src="~/common/image/HY_js_02.jpg"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    beforeCreate() {
      document.getElementsByTagName('html')[0].className = 'add-bg'
    },
    beforeDestroy() {
      document.getElementsByTagName('html')[0].removeAttribute('class', 'add-bg')
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .vip-introduction-box
    img
      max-width: 100%
      vertical-align: bottom
      display: block
      float: left
</style>
