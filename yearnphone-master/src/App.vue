<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <van-back-top right="0" bottom="60px" />
</template>

<script setup>
import { getFront } from '@/util/homeMainHttp.js'
getFront()
</script>
<style lang="scss">
// 显示和隐藏
.fade-enter-active {
  animation: isDemo 0.5s reverse;
}
.fade-leave-active {
  animation: isDemo 0.5s;
}
@keyframes isDemo {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a,
button,
img {
  cursor: pointer;
}
body,
html {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  user-select: none;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;

  padding-bottom: 1.875rem;
}
body {
  overflow-x: hidden;
}

button {
  outline: none;
  cursor: pointer;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
  font-weight: normal;
}

i,
em {
  font-style: normal;
}

.more {
  font-size: 14px;
  color: #ddd;
  margin: 20px 0;
  cursor: pointer;
  font-weight: 900;
  text-align: right;
}

a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
.title {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-weight: 700;
  margin: 10px 12px 10px;
  padding: 0 5px;
  font-size: 16px;
  border-left: 3px solid rgb(64, 158, 255);

  span {
    color: #999;
    font-size: 14px;
    padding-top: 3px;
  }
}
</style>
