<template>
  <div class="no-data text-center">
    {{title}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .no-data
    font-size: .24rem
    padding-top: 1rem
</style>
