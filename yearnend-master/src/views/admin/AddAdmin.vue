<template>
  <div>
    <el-card>
      <div class="login_content register">
        <el-form ref="form" :model="form" :rules="rules" validate>
          <el-form-item prop='user' label="输入用户名">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="pass" label="输入密码">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" :show-password="true">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" placeholder="请输入密码" v-model="form.checkPass" autocomplete="off">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <!-- 上传头像 -->
          <el-form-item>
            <span>上传头像</span>
            <el-upload v-show="isShowAvatar" class="avatar-uploader" action="/" :show-file-list="false" :limit="1"
              ref="mYupload" :http-request="handleAvatarUpdate">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- 上传头像成功就会走这 -->
            <i class="el-icon-circle-check" v-show="!isShowAvatar"></i>
          </el-form-item>
          <!-- 下面两按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">
              确定添加
            </el-button>
            <el-button type="primary" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { Button, Form, FormItem, Upload, Input, Card } from 'element-ui'
import Vue from 'vue'
import { addAdmin } from '@/utils/http.js'
Vue.use(Card)
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Upload)
export default {
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
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '',
      isShowAvatar: true,
      // 表单数据
      form: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单元素
    resetForm () {
      this.form.username = ''
      this.form.password = ''
      this.form.checkPass = ''
      this.isShowAvatar = true
      // 清除选中列表
      this.$refs.mYupload.clearFiles()
    },
    // 去向后端去查找有没有user
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交表单
          const fd = new FormData()
          fd.append('avatar', this.file)
          fd.append('username', this.form.username)
          fd.append('password', this.form.password)
          addAdmin(fd).then(res => {
            this.$message('这是一条消息提示')
            if (res.data.ok) {
              this.$message({
                message: res.data.info,
                type: 'success'
              })
            } else {
              this.$message.error(res.data.info)
            }
            this.resetForm()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传头像
    handleAvatarUpdate (file) {
      this.isShowAvatar = false
      this.file = file.file
    }
  }
}

</script>

<style lang="scss">
.register {
  .el-input .el-input__clear {
    font-size: 16px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
<style lang="scss" scoped>
.register {
  max-width: 400px;
  margin: auto;
  color: #999;
  padding-top: 20px;
}
.el-icon-circle-check {
  color: #5cb6ff;
}
.el-input .el-input__clear {
  font-size: 16px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
