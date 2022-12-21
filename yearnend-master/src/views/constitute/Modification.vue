<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="姓名" prop="astrinautName">
        <el-input
          v-model="ruleForm.astrinautName"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="信息来源" prop="source">
        <el-input
          v-model="ruleForm.source"
          placeholder="请输入信息来源"
        ></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="ruleForm.introduce"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action=""
          :http-request="handleFile"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件,且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateAstrinaut">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Button, Input, FormItem, Upload } from "element-ui";
import { findAstrinaut, updateAstrinaut } from "@/utils/http.js";
Vue.use(Form);
Vue.use(Upload);
Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
export default {
  data() {
    return {
      ruleForm: {
        astrinautName: "",
        source: "",
        introduce: "",
      },
      oldFile: "",
      file: "",
      rules: {
        astrinautName: [{ required: true, message: "必填", trigger: "blur" }],
        source: [{ required: true, message: "必填", trigger: "blur" }],
        introduce: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },

  mounted() {
    let id = this.$route.query.id;
    // console.log(id);
    findAstrinaut(id).then((res) => {
      // console.log(res.data);
      this.oldFile = res.data.data[0].file;
      this.ruleForm = res.data.data[0];
    });
  },
  methods: {
    updateAstrinaut() {
      let where = {
        ...this.ruleForm,
        id: this.$route.query.id,
        oldFile: this.oldFile,
        file: this.file,
      };
      updateAstrinaut(where).then((res) => {
        // console.log(res.data);
        this.$router.back();
      });
      this.$message({
        type: "success",
        message: "修改成功",
      });
    },
    handleFile(file) {
      console.log(file.file);
      this.file = file.file;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>