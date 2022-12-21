<template>
  <transition name="fade" appear mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
$textActive: rgb(64, 158, 255);
$textLight: rgb(191, 203, 217);
$textDark: #606266;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}

input,
button {
  outline: none;
}

li {
  list-style: none;
}

body {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  user-select: none;
  background: #e6eff7;
  overflow-x: hidden;
}
body,
html {
  height: 100%;
  min-width: 1200px;
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
  font-size: 14px;
  font-weight: normal;
}

i,
em {
  font-style: normal;
}
// login 和home组件间跳转特效
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}
.fade-enter {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
// main 组件的切换效果
.fadeChange-enter-active,
.fadeChange-leave-active {
  transition: all 0.3s linear;
}
.fadeChange-enter {
  transform: translateX(-20%);
  opacity: 1;
}
.fadeChange-leave-to {
  transform: translateX(20%);
  opacity: 0;
}
</style>