<template>
  <div>
    <div class="form-control username">
      <input type="value" required="" v-model="form_validateEmail.email" @blur="validateEmail">
      <label>
        <span style="transition-delay:0ms">请</span><span style="transition-delay:50ms">输</span><span
          style="transition-delay:100ms">入</span><span style="transition-delay:150ms">您</span><span
          style="transition-delay:200ms">的</span><span style="transition-delay:250ms">邮</span><span
          style="transition-delay:300ms">箱</span>
      </label>
      <p v-show="showEmail">请输入正确的邮箱格式</p>
    </div>

    <div class="form-control username" v-show="!isShowForget">
      <input type="password" required="" v-model="form_validateEmail.password">
      <label>
        <span style="transition-delay:0ms">请</span><span style="transition-delay:50ms">输</span><span
          style="transition-delay:100ms">入</span><span style="transition-delay:150ms">您</span><span
          style="transition-delay:200ms">的</span><span style="transition-delay:250ms">密</span><span
          style="transition-delay:300ms">码</span>
      </label>
    </div>

    <div class="emailLogin" v-show="isShowForget">

      <div class="form-control username">
        <input type="value" required="" v-model="form_validateEmail.emailCode">
        <label>
          <span style="transition-delay:0ms">请</span><span style="transition-delay:50ms">输</span><span
            style="transition-delay:100ms">入</span><span style="transition-delay:150ms">您</span><span
            style="transition-delay:200ms">的</span><span style="transition-delay:250ms">验</span>
          <span style="transition-delay:300ms">证</span>
          <span style="transition-delay:350ms">码</span>
        </label>

      </div>
      <div>
        <a class="btn" v-show="isCodeShow" @click="sendEmailCodeHandle">
          <span>获取验证码</span>
        </a>
        <button class="btn" v-show="!isCodeShow" style="background:#888">
          等待 {{ count }} 秒
        </button>
      </div>
    </div>
    <p class="forget"><span @click="forgetHandle">{{isShowForget? '返回登录':'忘记密码？'}}</span></p>
    <div class="btnlogin">
      <button @click="handelSubmit">
        登录
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
      还没有账号？<span @click="handleRegister">注册</span>
    </div>
  </div>
</template>
<script>
import { login, sendEmailCode, } from '@/util/login.js'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      isCodeShow: true,
      count: 0,
      timer: {},
      showEmail: false,
      isShowForget: false,
      form_validateEmail: {
        email: "",
        password: "",
        emailCode: "",
      },
    }
  },
  methods: {
    ...mapMutations(['SetUserBase']),
    handleRegister () {
      this.$emit('handleRegister', 0)
    },
    handleRegister () {
      this.$emit('handleRegister', 180)
    },
    // 忘记密码
    forgetHandle () {
      this.isShowForget = !this.isShowForget
    },
    // 返回验证码
    sendEmailCodeHandle () {
      if (!this.form_validateEmail.email) {
        this.$message.warning("邮箱不能为空");
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
    // 登录
    handelSubmit () {

      if (this.validateEmail()) {
        return this.$message.warning("邮箱格式错误");
      }
      login(this.form_validateEmail.email, this.form_validateEmail.password, this.form_validateEmail.emailCode).then(res => {
        if (res.data.ok) {
          this.$message.success('登录成功');
          this.SetUserBase(res.data.info)
          this.$emit('handleShowLogin')
        } else {
          this.$message.error(res.data.info);
        }
      })
      this.form_validateEmail.email = ''
      this.form_validateEmail.password = ''
    },
    validateEmail () {

      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (this.form_validateEmail.email) {
        this.showEmail = !regEmail.test(this.form_validateEmail.email)
      } else {
        this.showEmail = false
      }
      return !regEmail.test(this.form_validateEmail.email)
    },


  },
}
</script>

<style lang="scss" scoped>
.forget {
  text-align: right;
  font-size: 12px;
  padding: 30px 40px;
  color: #ddd;
  span {
    cursor: pointer;
  }
}
.btnlogin {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0px 0 40px;
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
  padding: 20px 10px;
  font-weight: 900;
  span {
    color: #2761c3;
    cursor: pointer;
  }
}
.username {
  display: block;
  margin: 60px auto 0;
}

.emailLogin {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  padding: 0 30px;
  .form-control {
    width: 230px;
  }
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
// 基本样式
.form-control {
  position: relative;
  // margin: 20px 0 40px;
  width: 400px;
  p {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;

    font-size: 12px;
    color: rgb(215, 60, 60);
  }
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #fff;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: lightblue;
  transform: translateY(-30px);
}
</style>