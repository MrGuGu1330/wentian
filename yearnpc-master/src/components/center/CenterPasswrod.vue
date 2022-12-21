<template>
  <div class="password">
    <el-form :model="form_validateEmail" ref="ref_form_validateEmail" status-icon :rules="rules" class="demo-ruleForm">
      <!-- 输入密码 -->
      <el-form-item prop="password" class="username">
        <el-input v-model="form_validateEmail.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock"
          size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item prop="cheackPassword" class="username">
        <el-input v-model="form_validateEmail.cheackPassword" placeholder="再次输入密码" type="password"
          prefix-icon="el-icon-lock" size="medium" clearable></el-input>
      </el-form-item>
      <!-- 密码end -->
    </el-form>
    <div class="submit">
      <button alt="修改" @click="handelSubmitRegister">

        <i>点</i>
        <i>我</i>
        <i>修</i>
        <i>改</i>

      </button>
    </div>

  </div>
</template>

<script>
import { changePassword } from '@/util/login.js'
import { Form, FormItem, Input } from 'element-ui'
import Vue from 'vue'
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
import { mapState } from 'vuex'

export default {
  data () {
    let validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form_validateEmail.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form_validateEmail: {
        cheackPassword: '',
        password: '',
      },
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        cheackPassword: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
      },
    }
  },
  computed: {
    ...mapState(['userBase'])
  },
  methods: {
    handelSubmitRegister () {
      this.$refs.ref_form_validateEmail.validate((valid) => {
        if (valid) {
          changePassword(this.userBase.email, this.form_validateEmail.password).then(res => {
            this.form_validateEmail.password = ''
            this.form_validateEmail.cheackPassword = ''
            this.$message.success("修改成功");
          })
        } else {
          return false;
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.password {
  width: 400px;
  margin: 100px auto;
}
.submit {
  display: flex;
  justify-content: flex-end;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    position: relative;
    padding: 0 10px;
    font-size: 14px;
    text-transform: uppercase;
    border: 0;
    box-shadow: hsl(210deg 87% 36%) 0px 7px 0px 0px;
    background-color: hsl(210deg 100% 44%);
    border-radius: 12px;
    overflow: hidden;
    transition: 31ms cubic-bezier(0.5, 0.7, 0.4, 1);
  }

  button:before {
    content: attr(alt);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    font-size: 14px;
    font-weight: bold;
    color: white;
    letter-spacing: 4px;
    opacity: 1;
  }

  button:active {
    box-shadow: none;
    transform: translateY(7px);
    transition: 35ms cubic-bezier(0.5, 0.7, 0.4, 1);
  }

  button:hover:before {
    transition: all 0s;
    transform: translateY(100%);
    opacity: 0;
  }

  button i {
    color: white;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 4px;
    font-style: normal;
    transition: all 2s ease;
    transform: translateY(-20px);
    opacity: 0;
  }

  button:hover i {
    transition: all 0.2s ease;
    transform: translateY(0px);
    opacity: 1;
  }

  button:hover i:nth-child(1) {
    transition-delay: 0.045s;
  }

  button:hover i:nth-child(2) {
    transition-delay: calc(0.045s * 3);
  }

  button:hover i:nth-child(3) {
    transition-delay: calc(0.045s * 4);
  }

  button:hover i:nth-child(4) {
    transition-delay: calc(0.045s * 5);
  }
}
</style>