<template>
  <div class="login">
    <h2 class="cross" @click="$router.back()">
      <van-icon name="arrow-left" />
    </h2>
    <h2>Hi,</h2>
    <h2>欢迎加入问天</h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <div style="margin:10px 0">
          <van-field v-model="username" name="username" label="用&ensp;户&ensp;名" placeholder="请输入用户名"
            :rules="[{ validator: validatorUsername, message: '用户名2-8位' }]" />
        </div>
        <div style="margin:10px 0">
          <van-field v-model="email" name="email" label="邮&emsp;&emsp;箱" placeholder="请输入邮箱"
            :rules="[{ validator, message: '请填写正确的邮箱格式' }]" />
        </div>
        <van-field v-model="password" type="password" name="password" label="密&emsp;&emsp;码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="changePassword" type="password" name="changePassword" label="确认密码" placeholder="确认密码"
          :rules="[{ validator: validatorPassword, message: '密码不一致' }]" />
      </van-cell-group>
      <div style="margin: 10px; height: 40px;">
        <van-button style="height: 40px;" round :disabled="!disabledAll" block type="primary" native-type="submit">
          发送验证码
        </van-button>
      </div>
      <div style="margin:30px 0 0;font-size: 13px;">
        <van-checkbox v-model="checked">
          我已阅读同意并授权问天使用该问天账号信息(如昵称、头像、收获地址)进行同意管理
        </van-checkbox>
      </div>
    </van-form>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { sendCode } from '@/util/login.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const email = ref('')
const store = useStore()
const code = ref('')
const disabled = ref(true)
const checked = ref(false);
const password = ref('');
const changePassword = ref('');
const username = ref('')
const router = useRouter()
// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val) => {
  let flag = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)
  disabled.value = flag
  return flag
};

const validatorPassword = (val) => {
  return password.value === changePassword.value
};
const validatorUsername = (val) => {
  return /^.{2,8}$/.test(val)
};
const disabledAll = computed(() => {
  return disabled.value && checked.value
})
const fromData = ref({})

const onSubmit = (values) => {
  if (!checked.value) return
  sendCode(email.value).then(res => {
    store.commit('SetRegisteredLogin', values)
    router.push('/validation')
  })
};
</script>
<style lang="scss">
.login {
  .van-field__label {
    width: 60px;
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
  margin: 0px 10px;
  color: #000;
  font-size: 14px;
}

.cross {
  width: 30px;
  height: 30px;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
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