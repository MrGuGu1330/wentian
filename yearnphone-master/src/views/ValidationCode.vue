<template>
  <div class="code">
    <h2 class="cross" @click="$router.back()">
      <van-icon name="arrow-left" />
    </h2>
    <!-- 密码输入框 -->
    <van-password-input :value="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true" />
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="value" :show="showKeyboard" @blur="handleRegistered" />
  </div>
</template>
<script setup>
import { showNotify } from 'vant';
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import { ref, watch } from 'vue'
import { registered, login } from '@/util/login.js'
const store = useStore()
const router = useRouter()
const value = ref('');
const showKeyboard = ref(true);

const handleRegistered = () => {
  if (store.state.RegisteredLogin.email) {
    if (value.value.length === 6) {
      registered(value.value, store.state.RegisteredLogin.email, store.state.RegisteredLogin.username, store.state.RegisteredLogin.password).then(res => {
        if (res.data.ok) {
          store.commit('SetUserBase', res.data.userBase)

          router.push('/home/center')
        } else {
          // 危险通知
          showNotify({ type: 'danger', message: res.data.info });
          router.back()

        }
        store.commit('SetRegisteredLogin', {})
      })
    }
  } else {
    if (value.value.length === 6) {
      login(store.state.Login.email, '', value.value).then(res => {
        if (res.data.ok) {
          store.commit('SetUserBase', res.data.info)
          router.push('/home/center')
        } else {
          // 危险通知
          showNotify({ type: 'danger', message: res.data.info });
          router.back()
        }
      })
    }
  }

}
watch(() => value.value, (value) => {
  if (value.length >= 6) {
    handleRegistered()
  }
})

</script>

<style lang="scss" scoped>
.code {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #000;
  padding: 20px;
}

.cross {
  width: 30px;
  height: 30px;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  padding: 0;
  margin-left: -20px;
}
</style>