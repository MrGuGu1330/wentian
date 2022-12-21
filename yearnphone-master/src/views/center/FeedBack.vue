<template>
  <div>

    <van-nav-bar title="意见反馈">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" @click="$router.back()" />
      </template>
      <template #right>
        <span class="submit" @click="sendMessage">提交</span>
      </template>
    </van-nav-bar>
    <h3 class="title">反馈留言</h3>
    <div class="feedback">
      <van-cell-group inset>
        <van-field v-model="message" rows="2" autosize type="textarea" maxlength="50" placeholder="我们会认真对待每一个意见的"
          show-word-limit />
      </van-cell-group>
    </div>
  </div>
</template>
<script setup>
import { showNotify } from 'vant';
import { sendTalk } from '@/util/center.js'
import { ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const message = ref('')
const store = useStore()
const router = useRouter()
const sendMessage = function () {
  sendTalk(message.value, store.state.userBase.username, store.state.userBase.email).then(res => {
    console.log(res.data);
    if (res.data.ok) {
      showNotify({ type: 'success', message: res.data.info });
      router.back()
    } else {
      showNotify({ type: 'danger', message: res.data.info });
    }
  })
}
</script>

<style lang="scss">
.feedback {

  #van-field-4-input {
    height: 100px !important;
    font-size: 18px;
  }
}
</style>
<style lang="scss" scoped>
.submit {
  color: #ff000072;
  font-size: 14px;
}
</style>