<template>
  <div class="about-us">
    <div class="version-box">
      <img src="~/common/image/gywm_bb_icon_001.png">
      <p>版本：{{version}}</p>
    </div>
    <h2 class="more-title text-center">
      <div class="line"></div>
      <span>了解银码头</span>
    </h2>
    <p class="desc">上海造艺网络科技有限公司是一家科技金融公司，旗下《银码头》 竭力为用户提供最贴心的金融产品及相关服务。</p>
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
