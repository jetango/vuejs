<template>
  <div class="coupon-list">
    <div>
      <no-data title="暂无优惠券"></no-data>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NoData from 'base/noData/noData'

  export default {
    components: {
      NoData
    },
    created() {
      document.title = '优惠券'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
