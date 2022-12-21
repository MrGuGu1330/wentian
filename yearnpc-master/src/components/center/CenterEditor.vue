<template>
  <div class="editor">
    <div>
      用&ensp;户&ensp;名: &emsp;<input :class="isShowEditorUser? '':'editorIpt' " :disabled="!isShowEditorUser" type="text"
        v-model="username">
      <i class="el-icon-edit" @click="handleIsShowEditorUser"></i>
    </div>
    <div style="margin:30px"></div>
    <div>
      <p style="margin-left: 295px;"> <i class="el-icon-edit" @click="handleIsShowEditorEmail"></i></p>
      <p v-show="!isShowEditorEmail">
        邮箱换绑: &emsp;{{email}}
      </p>

      <el-form :model="form_validateEmail" v-show="isShowEditorEmail" ref="ref_form_validateEmail" status-icon
        :rules="rules" class="demo-ruleForm">

        <!-- email start -->
        <el-form-item prop="email" class="emailStyle">
          <el-input v-model="form_validateEmail.email" autocomplete="off" placeholder="请输新的邮箱"
            prefix-icon="el-icon-s-promotion" size="medium" clearable></el-input>
        </el-form-item>
        <!-- email end -->
        <!-- emailcode start -->
        <el-form-item prop="emailCode" class="emailStyle">
          <div class="email">
            <el-input style="width:200px" v-model="form_validateEmail.emailCode" autocomplete="off" placeholder="邮箱验证码"
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
    </div>
    <p class="upload">上传头像</p>
    <el-upload class="avatar-uploader" action="" :http-request="uploadAvatar" :show-file-list="false"
      :on-success="handleAvatarSuccess">
      <img v-if="imageUrl" :src="$urlBase +imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="text-align: right;">
      <el-button type="primary" round @click="update">修改</el-button>
    </div>
  </div>
</template>

<script>
import { updateUser, sendEmailCode } from '@/util/login.js'
import { Upload, Button, Form, FormItem, Input } from 'element-ui'
import Vue from 'vue'
Vue.use(Button)
Vue.use(Upload)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
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
      username: '',
      isShowEditorUser: false,
      isShowEditorEmail: false,
      imageUrl: '',
      isCodeShow: true,
      email: '',
      count: 0,
      timer: {},
      avatar: '',
      oldFile: '',
      form_validateEmail: {
        email: "",
        emailCode: "",
      },
      rules: {
        email: [{ required: true, validator: validateEmail, trigger: "blur" }], //记得要验证邮箱格式
        emailCode: [
          { required: true, validator: validateCode, trigger: "blur" },
        ],

      },
    }
  },
  computed: {
    ...mapState(['userBase'])
  },
  mounted () {
    this.$nextTick(() => {
      this.username = this.userBase.username
      this.email = this.userBase.email
      this.form_validateEmail.email = this.userBase.email
      this.oldFile = this.userBase.avatar
    })
  },
  methods: {
    ...mapMutations(['SetUserBase']),
    // 修改
    update () {

      let email = null
      if (this.email === this.form_validateEmail.email) {
        email = null
      } else {
        email = this.form_validateEmail.email
        if (!this.form_validateEmail.emailCode) return this.$message.warning("验证码不能为空");
      }
      const fd = new FormData()
      fd.append('username', this.username)
      fd.append('oldEmail', this.email)
      if (email) {
        fd.append('email', email)
        fd.append('code', this.form_validateEmail.emailCode)
      }

      if (this.avatar) {
        fd.append('oldFile', this.userBase.avatar)
        fd.append('avatar', this.avatar)
      }


      updateUser(fd).then(res => {
        console.log(res.data);
        if (res.data.ok) {
          this.SetUserBase({ ...this.userBase, ...res.data.BaseUser })
          this.isShowEditorUser = false
          this.isShowEditorEmail = false
          this.imageUrl = this.userBase.avatar

        } else {
          this.$message.warning(res.data.info);
        }
      })
    },
    // 上传头像
    uploadAvatar (file) {

      this.avatar = file.file
    },
    handleIsShowEditorEmail () {
      this.isShowEditorEmail = !this.isShowEditorEmail
    },
    handleIsShowEditorUser () {
      this.isShowEditorUser = !this.isShowEditorUser
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //发送邮箱验证码
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
  },
}
</script>
<style lang="scss" scoped>
.upload {
  margin-top: 40px;
  margin-bottom: 10px;
}
.emailStyle {
  width: 300px;
  .email {
    display: flex;
    align-items: flex-end;
  }
}
.btn {
  height: 30px;
  display: inline-block;
  border-radius: 4px;
  background-color: #3d405b;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  padding: 0 10px;
  width: 130px;
  transition: all 0.5s;
  cursor: pointer;
  margin-left: 10px;
  line-height: 30px;
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
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
  background: #ddd;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
.editor {
  width: 100%;
  font-size: 16px;
  padding: 40px 150px 0;
}
input {
  outline: none;
  border: 0;
  height: 30px;
  padding: 0 8px;
  background: #fff;
  color: #000;
  margin-right: 20px;
}
.editorIpt {
  background: transparent;
  color: #fff;

  border: 0;
  outline: none;
}
</style>