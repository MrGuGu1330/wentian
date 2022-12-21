<template>
  <div>
    <van-nav-bar title="账号管理">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <div style="margin:20px"></div>
    <div class="changeItem" @click="(showUsername = !showUsername)">
      修改昵称
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="changeItem" @click="(showEmail = !showEmail)">
      换绑邮箱
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="changeItem" @click="(showAvatar = !showAvatar)">
      修改头像
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <div class="changeItem" @click="(showPassword = !showPassword)">
      修改密码
      <span>
        <van-icon name="arrow" />
      </span>
    </div>
    <!-- 修改头像 -->
    <van-action-sheet v-model:show="showPassword" title="修改密码">
      <div class="content" style="text-align: center;">
        <van-form @submit="onChangePassword">
          <van-cell-group inset>
            <van-field v-model="password" type="password" name="password" label="密&emsp;&emsp;码" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="changePassword" type="password" name="changePassword" label="确认密码" placeholder="确认密码"
              :rules="[{ validator: validatorPassword, message: '密码不一致' }]" />
          </van-cell-group>
          <div style="margin: 10px; height: 40px;">
            <van-button style="height: 40px;" round block type="primary" native-type="submit">
              修改密码
            </van-button>
          </div>
        </van-form>

      </div>
    </van-action-sheet>
    <!-- 修改头像 -->
    <van-action-sheet v-model:show="showAvatar" title="修改头像">
      <div class="content" style="text-align: center;">
        <van-uploader v-model="fileList" multiple :max-count="1" />
        <div style="margin: 10px; height: 40px;">
          <van-button style="height: 40px;" round block type="primary" @click="handleUpdate">
            修改头像
          </van-button>
        </div>
      </div>
    </van-action-sheet>

    <!-- 修改用户名 -->
    <van-action-sheet v-model:show="showUsername" title="修改用户名">
      <div class="content">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <div style="margin:10px 0">
              <van-field v-model="username" name="username" label="用&ensp;户&ensp;名" placeholder="请输入用户名"
                :rules="[{ validator: validatorUsername, message: '用户名2-8位' }]" />
            </div>
          </van-cell-group>
          <div style="margin: 10px; height: 40px;">
            <van-button style="height: 40px;" round block type="primary" native-type="submit">
              修改用户名
            </van-button>
          </div>
        </van-form>
      </div>
    </van-action-sheet>

    <!-- 换绑邮箱 -->
    <van-action-sheet v-model:show="showEmail" title="修改用户名">
      <div class="content">
        <van-form @submit="onSubmitEmail">
          <van-cell-group inset>
            <div style="margin:10px 0">
              <van-field v-model="email" name="email" label="邮箱" placeholder="请输入用户名"
                :rules="[{ validator: validator, message: '请输入正确的邮箱格式' }]" />
            </div>
            <van-field v-model="code" name="code" center clearable
              :rules="[{ validator: codeValidator, message: '请输入六位验证码' }]">
              placeholder="请输入短信验证码">
              <template #button>
                <van-button size="small" @click="handleSendEmailCode" type="primary" :disabled="isCodeShow">{{
                    !isCodeShow ? `发送验证码` : `等待${count} 秒`
                }}</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div style="margin: 10px; height: 40px;">
            <van-button style="height: 40px;" round block type="primary" native-type="submit">
              换绑邮箱
            </van-button>

          </div>
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { showNotify } from 'vant';
import { updateUser, sendCode, setPassword } from '@/util/login.js'
const { ref } = require("@vue/reactivity");
const { onMounted } = require("@vue/runtime-core");
const { useStore } = require("vuex");
const isCodeShow = ref(false)
let timer = ref({})
const store = useStore()
const showUsername = ref(false)
// 修改邮箱
const showEmail = ref(false)
// 修改用户名
const username = ref('')
// 修改邮箱
const email = ref('')
const code = ref('')
const count = ref(0)
// 修改头像
const showAvatar = ref(false)
// 修改密码
const showPassword = ref(false)
const password = ref('')
const changePassword = ref('')
const validatorPassword = (val) => {
  return password.value === changePassword.value
};


const fileList = ref([]);
// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val) => {
  let flag = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val)
  return flag
};

const validatorUsername = (val) => {
  return /^.{2,8}$/.test(val)
};
const codeValidator = (val) => {
  return /^\d{6}$/.test(val)
};

onMounted(() => {
  username.value = store.state.userBase.username
  email.value = store.state.userBase.email
})
// 修改用户名
const onSubmit = (values) => {
  updateUser({ ...values, oldEmail: store.state.userBase.email }).then(res => {

    if (res.data.ok) {
      showUsername.value = false
      store.commit('SetUserBase', { ...store.state.userBase, username: res.data.BaseUser.username })
    } else {
      // 危险通知
      showNotify({ type: 'danger', message: res.data.info });
    }
  })
};
// 修改邮箱
const onSubmitEmail = (values) => {
  updateUser({ ...values, oldEmail: store.state.userBase.email }).then(res => {
    console.log(res.data);
    if (res.data.ok) {
      showEmail.value = false
      store.commit('SetUserBase', { ...store.state.userBase, email: res.data.BaseUser.email })
    } else {
      // 危险通知
      showNotify({ type: 'danger', message: res.data.info });
    }
  })
};
// 发送验证码
function handleSendEmailCode () {
  if (!email.value) {
    showNotify({ type: 'danger', message: '邮箱不能为空' });
    return;
  }
  sendCode(email.value).then(res => {
    // 通知
    showNotify({ type: 'primary', message: '验证码已发送到您的邮箱，请注意查收' });
    let TIME_COUNT = 60;
    if (Object.keys(timer.value).length == 0) {
      count.value = TIME_COUNT;
      isCodeShow.value = true;
      timer.value = setInterval(() => {
        if (count.value > 0 && count.value <= TIME_COUNT) {
          count.value--;
        } else {
          isCodeShow.value = false;
          clearInterval(timer.value);
          timer.value = {};
        }
      }, 1000);
    }

  })
}
// 修改头像
function handleUpdate () {

  const fd = new FormData()
  fd.append('oldEmail', store.state.userBase.email)
  fd.append('oldFile', store.state.userBase.avatar)
  fd.append('avatar', fileList.value[0].file)
  fd.append('username', store.state.userBase.username)
  updateUser(fd).then(res => {
    if (res.data.ok) {
      showAvatar.value = false
      store.commit('SetUserBase', { ...store.state.userBase, avatar: res.data.BaseUser.avatar })
    } else {
      // 危险通知
      showNotify({ type: 'danger', message: res.data.info });
    }
  })
}

// 修改密码
function onChangePassword (values) {
  console.log(values.password);
  setPassword(store.state.userBase.email, values.password).then(res => {
    showPassword.value = false
    console.log(res.data);
    showNotify({ type: 'success', message: '修改成功' });
  })
}
</script>

<style lang="scss" scoped>
.changeItem {
  display: flex;
  height: 2.75rem;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
}

.content {
  padding: 16px 16px 160px;
}
</style>