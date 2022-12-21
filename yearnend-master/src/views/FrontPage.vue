<template>
  <div>
    <h2 class="titleHeader">修改首页</h2>
    <div id="frontHome">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="首 页 标 题">
          <el-input v-model="form.typewriter"></el-input>
        </el-form-item>
        <el-form-item label="首 页 简 介">
          <el-input type="textarea" :rows="5" v-model="form.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="底 部 栏">
          <el-input type="textarea" v-model="form.footer"></el-input>
        </el-form-item>
        <el-form-item label="二 维 码">
          <!--   <el-upload
            class="upload-demo"
            drag
            :action="`${this.$urlBase}frontpc/frontpcImg`"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
          <el-image
            style="width: 100px; height: 100px"
            :src="`${this.$urlBase}singleUploads/frontpcImg.jpg`"
            fit="cover"
          ></el-image> -->

          <el-upload :action="`${$urlBase}frontpc/frontpcImg`" list-type="picture-card" :limit="1">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item style="text-align: right">
          <el-button type="primary" @click="onSubmit"> 立即修改 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, Input, Upload, FormItem, Button, Image } from "element-ui";
import { frontPage, frontPageSubmit } from "@/utils/http.js";

Vue.use(Form);
Vue.use(Input);
Vue.use(Upload);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Image);

export default {
  data () {
    return {
      form: {
        typewriter: "",
        bulletin: "",
        footer: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  mounted () {
    frontPage().then((res) => {
      this.form.typewriter = res.data.info.data[0].title;
      this.form.bulletin = res.data.info.data[0].info;
      this.form.footer = res.data.info.data[0].footer;
    });
  },
  methods: {
    handleRemove (file) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload (file) {
    },
    onSubmit () {
      if (
        !this.form.typewriter.trim() ||
        !this.form.bulletin.trim() ||
        !this.form.footer.trim()
      )
        return this.$message.error("不能为空");

      frontPageSubmit(
        this.form.typewriter,
        this.form.bulletin,
        this.form.footer
      ).then((res) => {
        if (res.data.ok) {
          this.$message({
            message: res.data.info,
            type: "success",
          });
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
  },
};
</script>

<style>
#frontHome {
  width: 90%;
  margin: 30px auto;
  background: #fff;
  padding: 100px;
}
</style>
