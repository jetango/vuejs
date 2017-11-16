<template>
  <div class="contact-info">
    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow bold">直系联系人</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">关系</div>
        <div>配偶</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">电话</div>
        <div>直系亲属电话</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">姓名</div>
        <div>直系亲属姓名</div>
        <i class="iconfont icon-117"></i>
      </div>
    </div>

    <div class="list-view h4">
      <div class="item flex h3">
        <div class="flex-grow bold">重要联系人</div>
      </div>
      <div class="item flex">
        <div class="flex-grow">关系</div>
        <div>配偶</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">电话</div>
        <div>直系亲属电话</div>
        <i class="iconfont icon-117"></i>
      </div>
      <div class="item flex">
        <div class="flex-grow">姓名</div>
        <div>直系亲属姓名</div>
        <i class="iconfont icon-117"></i>
      </div>
    </div>
    <div class="button-box">
      <div class="button button-primary" @click="confirmIdentity()">
        提交
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/base"
  .contact-info
    > .list-view
      margin-top: .1rem
    .flex-grow
      color: #000
  .button-box
    padding: 1rem .4rem .4rem
</style>
