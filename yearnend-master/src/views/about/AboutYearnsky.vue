<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="base">关于问天</span>
    </div>
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item prop="info" label="输入标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item prop="info" label="联系方式">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item prop="info">
        <el-input
          label="输入内容"
          type="textarea"
          placeholder="请输入内容"
          v-model="form.info"
          :autosize="{ minRows: 8, maxRows: 2 }"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="http://176.19.28.87:9999/center/centerImg"
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
        <el-button type="primary" @click="submit">立即修改</el-button>
      </el-form-item>
      <div>
        <Map ref="map" @updateLocation="updateLocation" :location="location" />
      </div>
    </el-form>
  </el-card>
</template>



<script>
import Vue from "vue";
import { Card, Input, Button, Form, FormItem, Upload } from "element-ui";
import { getAbout, updateAbout } from "@/utils/http.js";

import Map from "@/components/aliMap.vue";

Vue.use(Card);
Vue.use(Input);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Form);
Vue.use(FormItem);

export default {
  name: "",
  props: {},
  components: {
    Map,
  },
  data() {
    return {
      form: {
        info: "",
        title: "",
        contact: "",
      },
      rules: {
        info: [{ required: true, message: "内容必须写", tigger: "blur" }],
      },
      addr: "",
      location: "",
    };
  },
  mounted() {
    getAbout().then((res) => {
      this.form = res.data.info.data[0];
      this.location = res.data.info.data[0].location;
    });
  },
  methods: {
    updateLocation(Addr) {
      this.location = Addr.lon + "," + Addr.lat;
    },
    submit() {
      updateAbout({ ...this.form, location: this.location }).then((res) => {
        if (res.data.ok) {
          this.$message({ message: "修改完成", type: "success" });
        }
      });
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
  height: 2000px;
  padding: 0 40px 0;
  ::-webkit-scrollbar {
    width: 3px;
  }
  .iup1 {
    width: 200px;
  }
  .iup2 {
    width: 200px;
  }
  .iup3 {
    width: 200px;
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
