<template>
  <div>
    <login-bg></login-bg>
    <div class="login">
      <span class="border_corner border_corner_left_top"></span>
      <span class="border_corner border_corner_right_top"></span>
      <span class="border_corner border_corner_left_bottom"></span>
      <span class="border_corner border_corner_right_bottom"></span>

      <h4>用户登录</h4>
      <div>
        <el-form ref="form" :model="form" :rules="rules" validate>
          <el-form-item prop='user'>
            <el-input v-model="form.username" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" :show-password="true">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" style="width:100%;">
              确定
            </el-button>
          </el-form-item>
          <el-form-item class="textRight">
            <el-tag @click="callMy" size="small" style="cursor: pointer;">
              联系</el-tag>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Vcode :show="VcoedIsShow" @success="success" />
  </div>
</template>

<script>
// 导入人机验证模块
import Vcode from 'vue-puzzle-vcode'
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { Input, Button, FormItem, Form, Tag } from 'element-ui'
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Tag)
Vue.use(Button)
import LoginBg from '@/components/login/LoginBg.vue'
import { loginVerify } from '@/utils/http.js'
export default {
  components: {
    LoginBg, Vcode
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (!this.form.password.trim()) {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^[\w+$]{6,12}$/
        reg.test(this.form.password) || callback(new Error('密码只能是6-12位的数字下划线和字母'))
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (!this.form.username.trim()) {
        callback(new Error('请输入用户名'))
      } else {
        const reg = /^.{2,8}$/
        reg.test(this.form.username) || callback(new Error('用户名长度是2-8位'))
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      VcoedIsShow: false
    }
  },

  methods: {
    ...mapMutations(['ChangeUsername', 'Changeavatar']),
    // 去向后端去查找有没有user
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginVerify({
            username: this.form.username,
            password: this.form.password
          }).then(res => {
            if (res.data.ok) {
              // 给全局方法存储username avatar
              this.ChangeUsername(res.data.username)
              this.Changeavatar(res.data.avatar)
              this.VcoedIsShow = true
            } else {
              this.callMy()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 人机验证成功
    success () {
      // 就跳转页面
      this.VcoedIsShow = false

      this.$router.push('/home')
    },
    // 联系我们
    callMy () {
      this.$alert('登录不上去加我微信  18803425419 ', '微信', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '等待消息吧'
          })
        }
      })
    }
  },
  beforeDestroy () {
    this.VcoedIsShow = false
    document.querySelector('body').classList.remove('vue-puzzle-overflow')

  },
}
</script>
<style lang='scss' scoped>
#container {
  margin: 0;
  padding: 0;
}
.login {
  box-sizing: border-box;
  position: absolute;
  top: 100px;
  right: 15%;
  width: 350px;
  color: #ddd;
  padding: 30px 40px 0px;
  overflow: hidden;
  background: rgba($color: #000, $alpha: 0.2);
  h4 {
    font-weight: 900;
    text-align: center;
    letter-spacing: 2px;
    font-size: 25px;
    // padding: 20px 0 0;
  }
  div {
    margin: 10px 0;
  }
  .el-button {
    margin-top: 10px;
    width: 100%;
    font-weight: 700;
    letter-spacing: 2px;
  }
}
/*四个角框*/
.border_corner {
  z-index: 2500;
  position: absolute;
  width: 19px;
  height: 19px;
  background: rgba(0, 0, 0, 0);
  border: 4px solid #1fa5f1;
}
.border_corner_left_top {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 6px;
}
.border_corner_right_top {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 6px;
}
.border_corner_left_bottom {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 6px;
}
.border_corner_right_bottom {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 6px;
}
.textRight {
  text-align: right;
  font-size: 12px;
  margin: 0;
  padding: 0;
}
</style>