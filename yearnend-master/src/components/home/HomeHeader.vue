<template>
  <div class="header">
    <div class="sliderComponent">
      <slot></slot>
    </div>
    <!-- 面包屑 -->
    <div class="breaCrumb">
      <brea-crumb></brea-crumb>
    </div>
    <!-- 全屏 -->
    <full-screen />
    <!-- 头像 -->
    <div class="avatar">
      <div class="loader">
        <div class="face">
          <div class="circle"></div>
        </div>
        <div class="face">
          <div class="circle"></div>
        </div>
      </div>
      <el-avatar :src="$urlBase + globalAvatarUrl" :size="50"></el-avatar>
      <div class="avatarItem">
        <div class="item" @click="handleBlack">退出登录</div>
        <div class="item" @click="handleGoCenter"> {{globalUsername}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BreaCrumb from '@/components/homeHeader/BreaCrumb.vue'
import FullScreen from '@/components/homeHeader/FullScreen.vue'
import { Avatar } from 'element-ui'
import { mapState } from 'vuex'
import Vue from 'vue'
Vue.use(Avatar)
export default {
  components: {
    BreaCrumb,
    FullScreen
  },
  computed: {
    // 全局的username和avatarUrl
    ...mapState(['globalUsername', 'globalAvatarUrl'])
  },
  methods: {
    handleBlack () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    handleGoCenter () {
      // this.$router.push({ name: 'center' })
    }
  }
}
</script>

<style lang="scss" scoped>
.breaCrumb {
  transform: translateY(10px);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
i {
  color: #000;
  font-size: 20px;
}

.header {
  position: relative;
  display: flex;
  align-items: center;
}
.avatar {
  position: absolute;
  top: 5px;
  width: 50px;
  height: 50px;
  right: 20px;
  cursor: pointer;
  translate: all 0.3s;
  &:hover .avatarItem {
    max-height: 500px;
  }
}
.avatarItem {
  position: absolute;
  top: 60px;
  right: -30px;
  z-index: 999;
  max-height: 0px;
  background: #fff;
  overflow: hidden;
  transition: all 1s;
  .item {
    height: 50px;
    width: 100px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
  }
}
</style>
