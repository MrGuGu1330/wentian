<template>
  <div class="login">
    <h2 class="cross" @click="$router.back()">
      <van-icon name="cross" />
    </h2>
    <h2>Hi,</h2>
    <h2>欢迎开启问天</h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <div style="margin:30px 0">
          <van-field v-model="email" name="email" label="邮箱" placeholder="请输入邮箱"
            :rules="[{ validator, message: '请填写正确的邮箱格式' }]" />
        </div>
        <div style="margin:30px 0" v-if="flagPassword">
          <van-field v-model="password" name="password" type="password" label="密码" placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写正确的密码' }]" />
        </div>
      </van-cell-group>
      <div style="margin: 10px; height: 50px;">
        <van-button style="height: 50px;" round :disabled="!disabledAll" block type="primary" native-type="submit">
          {{disabledAll? (flagPassword ? '登录' : '获取验证码 ') : '按钮禁用中'}}
        </van-button>
      </div>
      <div class="loginOther">
        <span @click="handlePassword">账号密码登录</span>
        <span @click="$router.push('/registered')">还没注册？</span>
      </div>
      <div style="margin:60px 0 0;font-size: 13px;">
        <van-checkbox v-model="checked">
          我已阅读同意并授权问天使用该问天账号信息(如昵称、头像、收获地址)进行同意管理
        </van-checkbox>
      </div>
    </van-form>

  </div>
</template>

<script setup>
import { showNotify } from 'vant';
import { sendCode, login } from '@/util/login.js'
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const email = ref('')
const password = ref('')
const flagPassword = ref(false)
const code = ref('')
const disabled = ref(true)
const checked = ref(false)
const store = useStore()
const router = useRouter()

// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val) => {
  let flag = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)
  disabled.value = flag
  return flag
};
const disabledAll = computed(() => {
  return disabled.value && checked.value
})
// 验证码登录
const onSubmit = (values) => {
  if (!checked.value) return
  if (flagPassword.value) {
    login(values.email, values.password).then(res => {
      if (res.data.ok) {
        store.commit('SetUserBase', res.data.info)
        router.push('/home/center')
      } else {
        // 危险通知
        showNotify({ type: 'danger', message: res.data.info });
      }
    })
  } else {
    sendCode(email.value).then(res => {
      store.commit('SetLogin', values)
      router.push('/validation')
    })
  }

};
//账号密码登录
function handlePassword () {
  flagPassword.value = !flagPassword.value
}
</script>
<style lang="scss">
.login {
  .van-field__label {
    width: 30px;
  }

  .van-field__control {
    border-bottom: 1px solid #ddd;
  }

  .van-button--round {
    border-radius: 20px;
  }

  .van-cell {
    padding: 10px 0;
  }
}
</style>
<style lang="scss" scoped>
.loginOther {
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
  color: #000;
  font-size: 14px;
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

.fromSubmit {
  margin-top: 30px;
}

.login {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #000;
  padding: 20px;

  h2 {
    height: 42px;
    line-height: 42px;
    font-family: "PingFang SC Bold", "PingFang SC";
    font-weight: 650;
    font-style: normal;
    font-size: 32px;
    padding: 0 10px;
  }
}
</style>