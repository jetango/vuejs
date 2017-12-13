<template>
  <div class="about-us">
    <div class="version-box">
      <img src="~/common/image/gywm_bb_icon_001.png">
      <p>版本：{{version}}</p>
    </div>
    <h2 class="more-title text-center">
      <div class="line"></div>
      <span>了解侬要贷</span>
    </h2>
    <p class="desc" style="padding-bottom: 0">"侬要贷"是保山昌宁长江村镇银行股份有限公司旗下的独立研发、运营的一款小额贷款产品，版权为保山昌宁长江村镇银行股份有限公司所有，并由保山昌宁长江村镇银行股份有限公司承担借款过程中的一切法律责任，所产生的一切纠纷与Apple公司无关。</p>
    <p class="desc" style="padding-top: 10px">贷款资金由保山昌宁长江村镇银行股份有限公司提供。</p>
    <div class="flex flex-item flex-justify types">
      <div class="flex-grow first">
        <img src="~/common/image/gywm_bb_icon_002.png">
        <p>周期灵活</p>
      </div>
      <div class="flex-grow">
        <img src="~/common/image/gywm_bb_icon_004.png">
        <p>放款迅速</p>
      </div>
      <div class="flex-grow last">
        <img src="~/common/image/gywm_bb_icon_003.png">
        <p>通过率高</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        version: ''
      }
    },
    created() {
      let {version} = this.$route.query
      this.version = version
    },
    mounted() {
      document.title = '关于我们'
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .more-title
    position: relative
    > span
      position: relative
      background: #f6f6f6
      padding: 0 .1rem
    .line
      position: absolute
      left: 0
      right: 0
      height: .01rem
      top: 50%

      background-color: #525252
  .version-box
    text-align: center
    img
      width: .86rem
    p
      font-size: .2rem
      padding-top: .1rem
      padding-bottom: .6rem
  .about-us
    padding: 1.1rem .4rem 0
  .desc
    font-size: .2rem
    color: #525252
    line-height: .32rem
    padding-top: .5rem
    padding-bottom: .5rem
  .types
    text-align: center
    img
      width: .84rem
    p
      font-size: .2rem
      line-height: .28rem
      color: #525252
    .first
      margin-left: -.4rem
    .last
      margin-right: -.4rem
</style>
