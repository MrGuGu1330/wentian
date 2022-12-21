<template>
  <div>
    <el-card class="box-card">
      <!-- 用户名 -->
      <div class="text item">
        <div>
          <span>用&ensp;户&ensp;名</span> ：{{globalUsername}}
        </div>
        <button class="cta" @click='handleSet'>
          <span class="hover-underline-animation">修改</span>
          <svg viewBox="0 0 46 16" height="10" width="10" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10" id="Path_10"></path>
          </svg>
        </button>
      </div>
      <div class="text item">
        <div>
          <span>类&emsp;&emsp;型</span> ：{{info.type==='1' ?'超级管理员':'普通管理员' }}
        </div>
        <button class="cta" @click="open('类型',info.type===1 ?'超级管理员':'普通管理员')">
          <span class="hover-underline-animation">查看</span>
          <svg viewBox="0 0 46 16" height="10" width="10" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10" id="Path_10"></path>
          </svg>
        </button>
      </div>
      <!-- 创建时间 -->
      <div class="text item">
        <div>
          <span>创建时间</span> ：{{info.createTime|setTime  }}
        </div>
        <button class="cta">
          <span class="hover-underline-animation" @click="open('创建时间',info.createTime )">查看</span>
          <svg viewBox="0 0 46 16" height="10" width="10" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10" id="Path_10"></path>
          </svg>
        </button>
      </div>
      <!-- 所属id -->
      <div class="text item">
        <div>
          <span>所&ensp;属&ensp;id</span> ：{{info._id  }}
        </div>
        <button class="cta">
          <span class="hover-underline-animation" @click="open('所属ID',info._id  )">查看</span>
          <svg viewBox="0 0 46 16" height="10" width="10" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10" id="Path_10"></path>
          </svg>
        </button>
      </div>
      <!-- 头像 -->
      <div class="text item">
        <div style="padding-left:80px">
          <span class="activeSpan">头&emsp;&emsp;像:</span>
          <el-avatar :src="$urlBase + globalAvatarUrl" :size="50"></el-avatar>
        </div>
        <el-upload class="avatar-uploader" action="/" :show-file-list="false" :http-request='handleUpdateAvatar'>
          <span style="color:#409eff">修改</span>&nbsp;
          <i class="el-icon-plus" style="width:10px;height:10px"></i>
        </el-upload>
      </div>
    </el-card>
    <!-- 修改用户名的弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" class="myDialog" :before-close="handleClose">
      <div class="form-control">
        <input type="value" required="" v-model="uservalue">
        <label>
          <span style="transition-delay:0ms">U</span><span style="transition-delay:50ms">s</span><span
            style="transition-delay:100ms">e</span><span style="transition-delay:150ms">r</span><span
            style="transition-delay:200ms">n</span><span style="transition-delay:250ms">a</span><span
            style="transition-delay:300ms">m</span><span style="transition-delay:350ms">e</span>
        </label>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="usernameChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { Card, Dialog, Button, Upload, Avatar } from "element-ui"
import Vue from 'vue'
import { getCurrentAdmin, setAdminUsername, setAdminAvatar } from '@/utils/http.js'
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Avatar)
Vue.use(Upload)
import { mapState, mapMutations } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'BasicMessage',
  data: function () {
    return {
      info: {},
      // 修改用户名的弹出框
      dialogVisible: false,
      uservalue: ''
    }
  },
  watch: {
    dialogVisible (newValue) {
      (newValue === false) && (this.uservalue = '')
    }
  },
  computed: {
    // 全局的username和avatarUrl
    ...mapState(['globalUsername', 'globalAvatarUrl'])
  },
  methods: {
    ...mapMutations(['ChangeUsername', 'Changeavatar']),
    handleSet () {
      this.dialogVisible = true
    },
    // 上传头像
    handleUpdateAvatar (file) {
      // 提交表单
      const fd = new FormData()
      fd.append('avatar', file.file)
      fd.append('token', localStorage.getItem('token'))
      fd.append('oldAvatar', this.globalAvatarUrl.split('/')[1])
      setAdminAvatar(fd).then(res => {
        if (res.data.ok) {
          this.Changeavatar(res.data.avatar)
          this.$message({
            message: res.data.info,
            type: 'success'
          })
        } else {
          this.$message.error(res.data.info)
        }
      })
    },
    // 修改用户名
    usernameChange () {
      if (!this.uservalue.trim()) return this.$message.error('不能为空')
      this.dialogVisible = false
      setAdminUsername(this.uservalue).then(res => {
        if (res.data.ok) {
          this.ChangeUsername(res.data.username)
          this.$message({
            message: res.data.info,
            type: 'success'
          })
        } else {
          this.$message.error(res.data.info)
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    open (title, info) {
      this.$alert(info, title, {
        confirmButtonText: '确定'
      })
    }
  },
  filters: {
    setTime (date) {
      return dayjs(date - 0).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    getCurrentAdmin().then(res => {
      this.info = res.data
    })
  }
}
</script>

<style lang='scss'>
.myDialog {
  .el-dialog__header {
    background: #000;
    color: #fff;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__body {
    background: #000;
  }
  .el-dialog__footer {
    background: #000;
  }
}
</style>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}
.avatar-uploader {
  position: absolute;
  top: 30px;
  right: 10px;
}
.item {
  position: relative;
  display: flex;
  padding: 18px 0;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  .activeSpan {
    top: 50%;
    left: 0;
    position: absolute;
    transform: translateY(-50%);
  }
}

.box-card {
  width: 800px;
  margin: 30px auto;
}

/* From uiverse.io by @alexmaracinaru */
.cta {
  border: none;
  background: none;
  cursor: pointer;
}

.cta span {
  padding-bottom: 7px;
  letter-spacing: 4px;
  font-size: 12px;
  padding-right: 10px;
  text-transform: uppercase;
}

.cta svg {
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active svg {
  transform: scale(0.9);
}

.hover-underline-animation {
  position: relative;
  color: #409eff;
  padding-bottom: 20px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #409eff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
/* From uiverse.io by @liyaxu123 */
.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 190px;
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
.avatar-uploader .el-upload {
  border: 0;
}
</style>
