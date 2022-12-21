<template>
  <div>
    <!-- 密码 -->
    <el-form ref="form" :model="form" :rules="rules" validate>
      <el-form-item prop="pass" label="输入密码">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" :show-password="true">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" placeholder="请输入密码" v-model="form.checkPass" autocomplete="off">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
        <!-- 下面按钮 -->
        <el-form-item>
          <button class="btnSub" @click="submitPassword">
            <span>
              确认
            </span>
          </button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div style="margin:50px 0"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, FormItem, Input } from 'element-ui'
import { setAdminPassword } from '@/utils/http.js'
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
export default {
  name: 'ChangePassword',
  data () {
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!this.form.password.trim()) {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^[\w+$]{6,12}$/
        reg.test(this.form.password) || callback(new Error('密码只能是6-12位的数字下划线和字母'))
        callback()
      }
    }

    return {
      // 表单数据
      form: {
        password: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitPassword () {
      if (!this.form.password.trim()) return
      if (this.form.password !== this.form.checkPass) return

      setAdminPassword(this.form.password)
        .then(res => {
          this.form.password = ''
          this.form.checkPass = ''
          if (res.data.ok) {
            this.$message({
              message: res.data.info,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.info)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btnSub {
  position: absolute;
  bottom: -50px;
  right: 20px;
  padding: 3px 3px;
  width: 70px;
  height: 40px;
  background-color: #212121;
  border: 1px solid #fff;
  border-radius: 10px;
  font-size: 12px;
}
.btnSub span {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0.4em;
  width: 100%;
  height: 100%;
  background-color: #212121;
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  border: 0.08em solid #fff;
  box-shadow: 0 0.4em 0.1em 0.019em #fff;
}
.btnSub:active span {
  transition: all 0.2s;
  transform: translate(0, 0.4em);
  box-shadow: 0 0 0 0 #fff;
}

.btnSub span:not(active) {
  transition: all 0.2s;
}
</style>
