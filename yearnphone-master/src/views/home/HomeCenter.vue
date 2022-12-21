<template>
  <div>
    <div class="banner" v-if="data.centerData.file"
      :style="{ backgroundImage: `url(${$store.state.urlBase + data.centerData.file})` }">

    </div>
    <div class="center">
      <div class="avatar" :style="{ backgroundImage: `url(${$store.state.urlBase + $store.state.userBase.avatar})` }">
      </div>
      <h3 class="username">{{ $store.state.userBase.username }}</h3>
      <div class="centerItem" @click="$router.push('/chenage-message')">
        账号管理
        <span>
          <van-icon name="arrow" />
        </span>
      </div>

      <div class="centerItem" @click="$router.push('/center-feedback')">
        意见反馈
        <span>
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="centerItem" @click="$router.push('/center-about')">
        关于我们
        <span>
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="centerItem" @click="(showShare = !showShare)">
        分享网站
        <span>
          <van-icon name="arrow" />
        </span>
      </div>
    </div>

    <!-- 分享 -->
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    <div id="copyDom"></div>
  </div>
</template>

<script setup>
import { showNotify } from 'vant';
import { getCenterData } from '@/util/center.js'
import { useStore } from 'vuex';
const { onMounted, reactive, ref } = require("@vue/runtime-core");
const store = useStore()
const showPassword = ref(false)
const data = reactive({
  centerData: {}
})
getCenterData().then(res => {
  data.centerData = res.data.info
})
const onSelect = (option) => {
  showShare.value = false;
  copyUrl(option.name)
};
// 复制链接
function copyUrl (optionName) {
  let inputDom = document.createElement('input');
  let copyDom = document.getElementById('copyDom')
  copyDom.appendChild(inputDom);// 把标签添加给body
  inputDom.style.opacity = 0;//设置input标签设置为透明(不可见)
  inputDom.value = window.location.href // 修改文本框的内容
  inputDom.select(); // 选中文本
  // 执行选中元素
  let successful = document.execCommand("copy"); // 执行浏览器复制命令
  let messageText = successful ? '请将此链接复制至手机或电脑浏览器打开并完成下载。' : '链接复制失败！'
  copyDom.removeChild(inputDom)
  showNotify({ type: 'primary', message: `复制成功${optionName != '复制链接' ? "请去分享" + optionName : ''}` });

}


// 分享
const showShare = ref(false);
const options = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: 'QQ', icon: 'qq' },
    { name: '复制链接', icon: 'link' },
  ],

];
</script>
<style lang="scss" scoped>
.centerItem {
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  justify-content: space-between;
  margin: 30px 0;
}

.banner {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 11.75rem;
  background-size: 100% 100%;

  background-repeat: no-repeat;
  background-position: center;
}

.center {
  position: relative;
  margin-top: 10.3125rem;
  background: #fff;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px 15px 0;
  z-index: 1000;
  transform: translateY(-40px);
}

.avatar {
  position: absolute;
  top: -2.25rem;
  left: 50%;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 2px solid #fff;
  transform: translateX(-50%);
}

.username {
  text-align: center;
  font-family: "Arial Negreta", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  color: #000000;
  margin-bottom: 20px;
}
</style>