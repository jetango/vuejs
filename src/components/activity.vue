<template>
  <div class="no-data">
    <img src="~/common/image/tie_jqqd_001.png">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted() {
      document.title = '活动列表'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .no-data
    position: absolute
    top: 50%
    text-align: center
    left: 0
    right: 0
    transform: translateY(-50%)
</style>
