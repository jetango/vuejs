<template>
  <div class="personal-info">
    <!-- <div class="personal-info-item flex flex-item" v-for="item in personalInfo" :key="item.itemCode">
              <p class="flex-grow">{{item.itemName}}</p>
              <i class="icon iconfont icon-correct-marked" :class="{'is-filled': item.isChose}"></i>
              <i class="icon iconfont icon-117"></i>
            </div> -->
    <div class="credit-item flex flex-item" @click="goPage(item)" v-for="item in personalInfo" :key="item.itemCode">
      <span class="flex-grow">{{item.itemName}}</span>
      <span v-if="item.isFilled" :class="{'credit': item.isFilled}">已填写</span>
      <span v-if="!item.isFilled">去填写</span>
      <i class="icon iconfont icon-117"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        personalInfo: [{
          itemName: '身份信息',
          itemCode: 1,
          isFilled: true
        }, {
          itemName: '工作信息',
          itemCode: 2,
          isFilled: false
        }, {
          itemName: '联系人信息',
          itemCode: 3,
          isFilled: false
        }]
      }
    },
    methods: {
      goPage: function(param) {
        if (param.itemCode === 1) {
          if (param.isFilled) {
            this.$router.push('identity-detail')
          } else {
            this.$router.push('identity-input')
          }
        } else if (param.itemCode === 2) {
          if (param.isFilled) {
            this.$router.push('workinfo-detail')
          } else {
            this.$router.push('workinfo-input')
          }
        } else if (param.itemCode === 3) {
          if (param.isFilled) {
            this.$router.push('contactinfo-detail')
          } else {
            this.$router.push('contactinfo-input')
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .personal-info-item
    margin-top: .1rem
    background-color: #ffffff
    height: 1rem
    padding: 0 .4rem
    p
      font-size: .3rem
      color: #000000

  .icon-correct-marked
    color: lightgrey
    margin-right:.02rem
    font-size: .3rem

  .icon-117
    color: #525252
    margin-top: -0.03rem
    font-size: .24rem

  .is-filled
    color: green !important


  .credit-item
    height: 1rem
    background-color: #ffffff
    padding: 0 .4rem
    margin-top: .1rem
    span
      display: block
      font-size: .3rem
      color: #000000
      &:last-of-type
        color: #525252

    .icon-117
      color: #525252
      margin-top: -.03rem
      margin-left: .02rem
  
  .credit
    color: #2ec200 !important

</style>