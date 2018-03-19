<template>
  <div class="pay-error">
    <no-data :title="title"></no-data>
  </div>
</template>

<script type="text/ecmascript-6">
  import NoData from 'base/noData/noData'
  export default {
    data() {
      return {
        title: '支付失败！'
      }
    },
    components: {
      NoData
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>