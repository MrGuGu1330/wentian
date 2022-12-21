<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="base">{{
        this.baseId ? "修改基础流程" : `发表基础流程`
      }}</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="info">
        <el-input
          type="textarea"
          :autosize="{ minRows: 8, maxRows: 20 }"
          placeholder="请输入内容"
          v-model="form.info"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action=""
          :http-request="handleUpdate"
          multiple
          :limit="1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件,且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{
          this.baseId ? "立即修改" : `立即新增`
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import Vue from "vue";
import { Card, Input, Button, Upload, Form, FormItem } from "element-ui";
import { baseContent, baseOnly, updateOnly } from "@/utils/http.js";

Vue.use(Card);
Vue.use(Input);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Form);
Vue.use(FormItem);

export default {
  data() {
    return {
      form: {
        info: "",
        file: "",
      },
      rules: {
        info: [{ required: true, message: "内容必须写", trigger: "blur" }],
      },
      baseId: "",
      oldFile: "",
    };
  },
  mounted() {
    // console.log(this.$route);
    this.baseId = this.$route.query.id;
    if (this.$route.query.id) {
      // 修改的时候获取到id 进行渲染文本
      baseOnly(this.baseId).then((res) => {
        this.form.info = res.data.data[0].info;
        console.log(res.data);
        this.oldFile = res.data.data[0].file.split("/")[1];
      });
    }
  },
  methods: {
    submit() {
      if (this.baseId) {
        const fd = new FormData();
        fd.append("info", this.form.info);
        fd.append("id", this.baseId);
        if (this.form.file) {
          fd.append("file", this.form.file);
          fd.append("oldFile", this.oldFile);
        }
        updateOnly(fd).then((res) => {
          console.log(111, res.data);
          // 修改成功，跳转
          if (res.status == "200") {
            this.$message({ message: "修改完成", type: "success" });
            this.$router.push(`/home/base/baselist`);
          }
        });
      } else {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            console.log("验证通过");
            baseContent(this.form).then((res) => {
              if (res.status == "200") {
                this.$refs["form"].resetFields();
                this.$message({ message: "新增完成", type: "success" });
                this.$router.push(`/home/base/baselist`);
              }
            });
          }
        });
      }
    },
    handleUpdate(file) {
      this.form.file = file.file;
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
  font-weight: bold;
}

.base {
  font-size: 14px;
  font-weight: bold;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
  height: 1000px;
  padding: 0 40px 0;
  ::-webkit-scrollbar {
    width: 3px;
  }

  .btn {
    margin-top: 20px;
    margin-left: auto;
    display: flex;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>