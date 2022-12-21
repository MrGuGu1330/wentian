<template>
  <div>
    <el-form :model="form_validateEmail" ref="ref_form_validateEmail" status-icon :rules="rules" class="demo-ruleForm">
      <!-- username start-->
      <el-form-item prop="username" class="username">

        <el-input v-model="form_validateEmail.username" autocomplete="off" placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid" size="medium" clearable></el-input>
      </el-form-item>
      <!-- username end -->

      <!-- email start -->
      <el-form-item prop="email" class="username">
        <el-input v-model="form_validateEmail.email" autocomplete="off" placeholder="请输入您的邮箱"
          prefix-icon="el-icon-s-promotion" size="medium" clearable></el-input>
      </el-form-item>
      <!-- email end -->

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

      <!-- emailcode start -->
      <el-form-item prop="emailCode" class="username">
        <div class="email">
          <el-input v-model="form_validateEmail.emailCode" autocomplete="off" placeholder="邮箱验证码"
            prefix-icon="el-icon-key" size="medium" clearable></el-input>
          <a class="btn" v-show="isCodeShow" @click="sendEmailCodeHandle">
            <span>获取验证码</span>
          </a>
          <button class="btn" v-show="!isCodeShow" style="background:#888">
            等待 {{ count }} 秒
          </button>
        </div>
      </el-form-item>
      <!-- emailcode end -->
    </el-form>
    <div class="btnlogin">
      <button @click="handelSubmitRegister">
        注册
        <div id="clip">
          <div id="leftTop" class="corner"></div>
          <div id="rightBottom" class="corner"></div>
          <div id="rightTop" class="corner"></div>
          <div id="leftBottom" class="corner"></div>
        </div>
        <span id="rightArrow" class="arrow"></span>
        <span id="leftArrow" class="arrow"></span>
      </button>
    </div>
    <div class="register">
      <span @click="handleRegister">返回登录页</span>
    </div>

  </div>
</template>
<script>
import { Form, FormItem, Input } from 'element-ui'
import Vue from 'vue'
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
import { mapMutations } from 'vuex'
import { sendEmailCode, register } from '@/util/login.js'

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
    let validateUser = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      }
      // 验证用户名的正则表达式
      const regEmail = /^.{2,6}$/;
      if (!regEmail.test(value)) {
        callback(new Error("用户名2-6位"));
      } else {
        callback();
      }
    };
    let validateCode = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("验证码不能为空"));
      }
      // 验证验证码的正则表达式
      const regEmail = /^\d{1,6}$/;
      if (!regEmail.test(value)) {
        //验证验证码
        callback(new Error("请输入正确的验证码格式"));
      } else {
        callback();
      }
    };
    let validateEmail = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      }
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!regEmail.test(value)) {
        // 合法的邮箱
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    return {
      isCodeShow: true,
      count: 0,
      timer: {}, //用null时，判断是否为空可用if(this.timer)；用{}时，判断是否为空则用：Object.keys(this.timer).length==0
      //邮箱验证表单
      form_validateEmail: {
        username: "",
        email: "",
        emailCode: "",
        password: '',
        cheackPassword: '',
      },
      rules: {
        username: [
          { validator: validateUser, trigger: "blur" },
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }], //记得要验证邮箱格式
        emailCode: [
          { required: true, validator: validateCode, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        cheackPassword: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    ...mapMutations(['SetUserBase']),
    handleRegister () {
      this.$emit('handleRegister', 0)
    },
    handelSubmitRegister () {
      this.$refs.ref_form_validateEmail.validate((valid) => {
        if (valid) {
          register(
            this.form_validateEmail.email,
            this.form_validateEmail.emailCode,
            this.form_validateEmail.username,
            this.form_validateEmail.password
          ).then(res => {
            if (res.data.ok) {
              this.$message.success(res.data.info);
            } else {
              this.$message.error(res.data.info);
            }
            this.$refs.ref_form_validateEmail.resetFields();
          })
        } else {
          return false;
        }
      })
    },  //发送邮箱验证码
    sendEmailCodeHandle () {
      if (!this.form_validateEmail.username || !this.form_validateEmail.email) {
        this.$message.warning("用户名或邮箱不能为空");
        return;
      }
      let TIME_COUNT = 60;
      if (Object.keys(this.timer).length == 0) {
        this.count = TIME_COUNT;
        this.isCodeShow = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.isCodeShow = true;
            clearInterval(this.timer);
            this.timer = {};
          }
        }, 1000);
      }

      sendEmailCode(this.form_validateEmail.email).then(res => {
        console.log(res.data);
        this.$message.success("验证码已发送到您的邮箱，请注意查收");
      })
    },
  },

}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  padding-top: 20px;
}
.btnlogin {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0 0;
  button {
    position: relative;
    width: 11em;
    height: 4em;
    outline: none;
    transition: 0.1s;
    background-color: transparent;
    border: none;
    font-size: 13px;
    font-weight: bold;
    color: #ddebf0;
  }

  #clip {
    --color: #2761c3;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 5px double var(--color);
    box-shadow: inset 0px 0px 15px #195480;
    -webkit-clip-path: polygon(
      30% 0%,
      70% 0%,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0% 70%,
      0% 30%
    );
  }

  .arrow {
    position: absolute;
    transition: 0.2s;
    background-color: #2761c3;
    top: 35%;
    width: 11%;
    height: 30%;
  }

  #leftArrow {
    left: -13.5%;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
  }

  #rightArrow {
    -webkit-clip-path: polygon(100% 49%, 0 0, 0 100%);
    left: 102%;
  }

  button:hover #rightArrow {
    background-color: #27c39f;
    left: -15%;
    animation: 0.6s ease-in-out both infinite alternate rightArrow8;
  }

  button:hover #leftArrow {
    background-color: #27c39f;
    left: 103%;
    animation: 0.6s ease-in-out both infinite alternate leftArrow8;
  }

  .corner {
    position: absolute;
    width: 4em;
    height: 4em;
    background-color: #2761c3;
    box-shadow: inset 1px 1px 8px #2781c3;
    transform: scale(1) rotate(45deg);
    transition: 0.2s;
  }

  #rightTop {
    top: -1.98em;
    left: 91%;
  }

  #leftTop {
    top: -1.96em;
    left: -3em;
  }

  #leftBottom {
    top: 2.1em;
    left: -2.15em;
  }

  #rightBottom {
    top: 45%;
    left: 88%;
  }

  button:hover #leftTop {
    animation: 0.1s ease-in-out 0.05s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover #rightTop {
    animation: 0.1s ease-in-out 0.15s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover #rightBottom {
    animation: 0.1s ease-in-out 0.25s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover #leftBottom {
    animation: 0.1s ease-in-out 0.35s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  button:hover .corner {
    transform: scale(1.25) rotate(45deg);
  }

  button:hover #clip {
    animation: 0.2s ease-in-out 0.55s both greenLight8;
    --color: #27c39f;
  }

  @keyframes changeColor8 {
    from {
      background-color: #2781c3;
    }

    to {
      background-color: #27c39f;
    }
  }

  @keyframes lightEffect8 {
    from {
      box-shadow: 1px 1px 5px #27c39f;
    }

    to {
      box-shadow: 0 0 2px #27c39f;
    }
  }

  @keyframes greenLight8 {
    from {
    }

    to {
      box-shadow: inset 0px 0px 32px #27c39f;
    }
  }

  @keyframes leftArrow8 {
    from {
      transform: translate(0px);
    }

    to {
      transform: translateX(10px);
    }
  }

  @keyframes rightArrow8 {
    from {
      transform: translate(0px);
    }

    to {
      transform: translateX(-10px);
    }
  }
}
.register {
  font-size: 16px;
  text-align: right;
  padding: 10px 10px;
  font-weight: 900;
  span {
    color: #2761c3;
    cursor: pointer;
  }
}
.username {
  display: block;
  margin: 25px auto 0;
  padding: 0 50px;
}

.email {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .btn {
    height: 40px;
    display: inline-block;
    border-radius: 4px;
    background-color: #3d405b;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    padding: 0 10px;
    width: 150px;
    transition: all 0.5s;
    cursor: pointer;
    margin-left: 10px;
    line-height: 40px;
  }

  .btn span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .btn span:after {
    content: "»";
    position: absolute;
    opacity: 0;
    top: 0;
    right: -15px;
    transition: 0.5s;
  }

  .btn:hover span {
    padding-right: 15px;
  }

  .btn:hover span:after {
    opacity: 1;
    right: 0;
  }
}
</style>