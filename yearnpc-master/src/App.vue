<template>
  <div class="app">
    <transition name="fade" appear mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 回到顶部 -->
    <el-backtop class="backtop" :right="5" :bottom="100">
      <svg t="1667008340940" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="3657" width="30" height="30">
        <path
          d="M383.786667 640.853333a42.666667 42.666667 0 0 1-8.192 56.149334l-3.968 2.986666-64.64 42.496a42.666667 42.666667 0 0 0-16.085334 20.138667l-1.621333 5.034667L267.946667 853.333333H384a42.666667 42.666667 0 0 1 42.368 37.674667L426.666667 896a42.666667 42.666667 0 0 1-37.674667 42.368L384 938.666667H213.333333a42.666667 42.666667 0 0 1-42.325333-48.213334l0.938667-4.778666 34.56-138.666667a128.042667 128.042667 0 0 1 46.250666-70.570667l7.082667-5.12 64.853333-42.666666a42.666667 42.666667 0 0 1 59.093334 12.202666z m311.168-14.677333l4.352 2.517333 65.066666 42.794667a128 128 0 0 1 50.773334 67.2l2.346666 8.32 34.56 138.666667a42.666667 42.666667 0 0 1-36.565333 52.736L810.666667 938.666667h-170.666667a42.666667 42.666667 0 0 1-4.992-85.034667L640 853.333333h116.053333l-21.333333-85.674666a42.709333 42.709333 0 0 0-13.397333-21.888l-4.096-3.157334-64.853334-42.666666a42.666667 42.666667 0 0 1 37.76-75.861334l4.821334 2.133334z"
          fill="#03CD8E" p-id="3658"></path>
        <path
          d="M512 102.570667a85.333333 85.333333 0 0 0-60.586667 25.258666l-30.165333 30.165334a469.333333 469.333333 0 0 0-131.882667 403.2l52.48 341.290666A42.666667 42.666667 0 0 0 384 938.666667h256a42.666667 42.666667 0 0 0 42.154667-36.181334l52.48-341.333333a469.333333 469.333333 0 0 0-131.84-403.157333l-30.293334-30.293334A85.248 85.248 0 0 0 512 102.570667z m-30.421333 115.754666L512 187.946667l30.421333 30.378666 9.088 9.386667a384 384 0 0 1 98.816 320.426667L603.306667 853.333333H420.608l-46.933333-305.152a384 384 0 0 1 107.946666-329.856z"
          fill="#049DEE" p-id="3659"></path>
        <path
          d="M512 384a42.666667 42.666667 0 0 1 42.368 37.674667L554.666667 426.666667v128a42.666667 42.666667 0 0 1-85.034667 4.992L469.333333 554.666667v-128a42.666667 42.666667 0 0 1 42.666667-42.666667z"
          fill="#049DEE" p-id="3660"></path>
      </svg>
    </el-backtop>
  </div>
</template>

<script>
import { Backtop } from 'element-ui'
import Vue from 'vue'
Vue.use(Backtop)
export default {
}
</script>

<style lang="scss">
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
  min-width: 800px;
  font-size: 18px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #f1ebe5;

  user-select: none;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  background: #000000;
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
  font-size: 20px;
  font-weight: normal;
}

i,
em {
  font-style: normal;
}

// home组件间跳转特效
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
}
.fade-enter {
  transform: translateY(0);
  opacity: 1;
}
.fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

// 显示和隐藏
.fade2-enter-active {
  animation: isDemo 0.5s reverse;
}
.fade2-leave-active {
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
.more {
  font-size: 14px;
  color: #ddd;
  margin: 20px 0;
  cursor: pointer;
  font-weight: 900;
  text-align: right;
}

/* 滚动槽 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  background-image: -webkit-linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.4) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.4) 0,
    hsla(0, 0%, 100%, 0.4) 75%,
    transparent 0,
    transparent
  );
  border-radius: 2em;
}
::-webkit-scrollbar-track {
  background-color: #264a9d;
  border-radius: 2em;
}
.w {
  max-width: 1200px;
  margin: auto;
}
a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
</style>