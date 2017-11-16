<template>
  <div class="repayment-loan">
    <list-item v-for="item in items" :key="item.borrowTime" :loanInfo="item"></list-item>
  </div>
</template>

<script type="text/ecmascript-6">
  import ListItem from 'base/listItem/list-item'
  export default {
    data() {
      return {
        items: [{
          amount: '8900',
          isPay: true,
          borrowTime: '2017-12-09'
        }, {
          amount: '8900',
          isPay: false,
          borrowTime: '2017-12-09'
        }, {
          amount: '8900',
          isPay: false,
          borrowTime: '2017-12-09'
        }]
      }
    },
    components: {
      ListItem
    }
  }
</script>

<style scoped lang="stylus" stylesheet="stylesheet/stylus">
  @import "~common/stylus/base"

</style>