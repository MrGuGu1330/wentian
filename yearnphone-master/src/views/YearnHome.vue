<template>
  <div style="padding:2.875rem 0 0 0">

    <!--头部栏  -->

    <van-nav-bar :fixed="true" z-index="999">
      <template #right>
        <van-icon name="search" size="25" color="#888" @click="$router.push('/search')" />
      </template>
      <template #left>
        <van-image width="30px" height="30px" fit="cover" position="center" src="ht.svg" />
        <span class="navTitle">问天</span>
      </template>
    </van-nav-bar>

    <!-- 视口 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" appear mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 底部栏 -->
    <footer>
      <van-tabbar active-color="#49b1f5" v-model="active">
        <van-tabbar-item icon="home-o" name="main" to="/home/main">首页</van-tabbar-item>
        <van-tabbar-item icon="todo-list-o" name="news" to="/home/news">新闻</van-tabbar-item>
        <van-tabbar-item icon="notes-o" name="science" to="/home/science">科普</van-tabbar-item>
        <van-tabbar-item icon="user-o" name="center" to="/home/center">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, reactive, onMounted, watch } from 'vue'
const active = ref('')
const store = useStore()

watch(() => store.state.routerName, (value) => {
  active.value = store.state.routerName
}, { immediate: true })

</script>
<style>
.van-nav-bar__left {
  padding: 3px;
}
</style>
<style lang="scss" scoped>
.navTitle {
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
}
</style>