<template>
  <div>
    <p>发表内容</p>
    <el-menu>
      <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="textarea">
      </el-input>
    </el-menu>
    <el-menu style="padding: 20px">
      <el-form inline :model="formInline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.astrinautName" placeholder="请输入姓名" style="width: 300px; margin-bottom: 10px">
          </el-input>
        </el-form-item>
        <el-form-item label="信息来源">
          <el-input v-model="formInline.source" placeholder="请输入信息来源" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
    </el-menu>
    <el-menu style="padding: 20px">
      <el-upload class="upload-demo" drag action="" :http-request="handleUpdate" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件,且不超过500kb
        </div>
      </el-upload>
    </el-menu>
    <el-menu class="btn">
      <el-button type="primary" icon="el-icon-edit" @click="handleSend">立即新增</el-button>
    </el-menu>
  </div>
</template>

<script>
import { } from "element-ui";
import { Input, Button, MenuItem, Upload, Form, FormItem } from "element-ui";
import Vue from "vue";
import { sendConstitute } from "@/utils/http.js";
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(MenuItem);
Vue.use(Upload);
export default {
  data () {
    return {
      textarea: "",
      fileName: "",
      formInline: {
        astrinautName: "",
        source: "",
      },
    };
  },
  methods: {
    handleUpdate (file) {
      this.fileName = file.file;
    },
    handleSend () {
      const fd = new FormData();
      fd.append("astrinautName", this.formInline.astrinautName);
      fd.append("file", this.fileName);
      fd.append("source", this.formInline.source);
      fd.append("introduce", this.textarea);
      console.log(fd);
      sendConstitute(fd).then((res) => {
        console.log(res.data);
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.$router.push('/home/constitute/ctor');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 10px 0;
}
.el-button {
  margin: 20px;
}
</style>