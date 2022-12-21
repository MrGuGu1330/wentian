<template>
  <div class="header" :class="isShow ? 'headerTop' : 'headerBottom'">
    <div>
      <span @click="$router.push('/home/main')"> 首页 </span>
      <span @click="$router.push('/home/news')"> 航天新闻 </span>
      <span @click="$router.push('/home/science')"> 航天科普 </span>
      <span @click="$router.push('/home/history')"> 航天历史 </span>
      <span @click="$router.push('/home/flow')"> 流程内容 </span>
      <span @click="$router.push('/home/hero')"> 航天英雄 </span>
      <span @click="$router.push('/home/about')"> 关于我们 </span>
    </div>
    <div>
      <span v-show="!$store.state.userBase.username" class="registered" @click="handleShowLogin">登录 / 注册</span>
      <span v-show="$store.state.userBase.username"
        @click="$router.push('/home/center')">{{$store.state.userBase.username}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.isShowHeader);
    });
  },
  methods: {
    isShowHeader() {
      let domScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.isShow = domScrollTop > 100 ? false : true;
    },
    handleShowLogin () {
      this.$emit('handleShowLogin')
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.isShowHeader)
  },
}

</script>

<style lang="scss" scoped>
.headerTop {
  position: absolute;
  background: transparent;
  height: 0;
}
.headerBottom {
  position: fixed;
  background: rgba($color: #264a9d, $alpha: 0.5);
  height: 45px;
}
.header {
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  min-width: 800px;
  justify-content: space-between;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 50px;
  transition: all 0.5s;
  padding: 0px 20px;
  > div {
    span {
      position: relative;
      padding: 3px 5px 8px;
      cursor: pointer;
      margin: 0 5px;
      &::after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        height: 2px;
        width: 0;
        background-color: #ddd;
        transition: all 0.5s;
      }
      &:hover::after {
        width: 100%;
      }
    }

    span.registered {
      border: 2px solid #ddd;
      border-radius: 10px;
      margin-left: 10px;
      padding: 3px 10px;
      font-size: 16px;
      &::after {
        width: 0;
      }
    }
  }
}
</style>
