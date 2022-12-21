<template>
  <div>
    <h2 class="titleHeader">
      {{ pushId ? "修改文章" : "发布内容" }}
      <div class="headerRight">
        <button id="btnpush" @click="btnPush">
          <div class="svg-wrapper-1">
            <div class="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                </path>
              </svg>
            </div>
          </div>
          <span>{{ pushId ? "修改" : "发布" }}</span>
        </button>
      </div>
    </h2>
    <div class="xwsrk">
      <el-input placeholder="请输入标题" v-model="title" clearable> </el-input>
      <el-select v-model="state" placeholder="请选择" class="fbzt">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="xwsrk">
      <el-input placeholder="请输入新闻来源" v-model="source" class="xwjy" clearable> </el-input>
    </div>

    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode"
        ref="toolbar" />
      <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode"
        @onCreated="onCreated" />
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Breadcrumb, BreadcrumbItem, Divider, Input, Select, Option } from 'element-ui';
import { frontNews, newsCorrect, Allnews, queryAllnews, newsDel, newsDelImage, newsContent, newsImge } from "@/utils/http.js";
import "@wangeditor/editor/dist/css/style.css";
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Divider)
Vue.use(Input)
Vue.use(Option)
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
export default {
  name: "Pressreleas",
  components: { Editor, Toolbar },
  data () {
    return {
      options: [{
        value: '0',
        label: '草稿'
      },
      {
        value: '1',
        label: '发布'
      }],
      // value: '0',
      editor: null,
      html: "",
      // select 的值
      pushId: "",
      title: "",
      // cover:'',
      source: '',
      state: '0',
      // 初始的image路径 用来减去最后的
      imageUrls: [],
      // 配置全局的属性删除上传视频的按钮
      toolbarConfig: {
        excludeKeys: ["headerSelect", "italic", "group-video"],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          // 配置上传图片
          uploadImage: {
            customUpload: this.uploadImg,
          },
        },
      },
      mode: "default", // or 'simple'
    };
  },
  mounted () {
    this.pushId = this.$route.query.id;
    // 修改的时候获取到id 进行渲染文本
    if (this.$route.query.id) {
      Allnews(this.pushId).then((res) => {
        this.title = res.data.info[0].title;
        this.html = res.data.info[0].Publisher;
        this.source = res.data.info[0].source;
        this.state = res.data.info[0].state;
        const imgReg = /<img.*?(?:>|\/>)/gi;
        // 匹配src属性
        const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i;
        const oldArr = res.data.info[0].Publisher.match(imgReg) || [];
        oldArr.length &&
          oldArr.forEach((item) => {
            this.imageUrls.push(
              item.match(srcReg)[1].split("uploadNew/")[1]
            );
          });
      });
    }
  },
  methods: {
    // 上传图片
    uploadImg (file, insertFn) {
      const imgData = new FormData();
      imgData.append("file", file);
      // 调接口，上传图片
      newsImge(imgData).then((res) => {
        if (res.data.ok) {
          this.imageUrls.push(res.data.imageUrl.split("uploadNew/")[1]);
          insertFn(this.$urlBase + res.data.imageUrl);
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    onCreated (editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // 添加文章
    async btnPush () {
      // 发布新闻
      // 这个标题为空和内容为空return 出去
      if (!this.title.trim() || !this.html.trim())
        return this.$message.error("不能为空");
      // 如果id为空进行下面代码 添加新闻
      if (!this.pushId) {
        this.delImage(this.html);
        const res = await newsContent({
          title: this.title,
          source: this.source,
          Publisher: this.html,
          cover: this.cover,
          state: this.state,
        });
        if (res.data.ok) {
          this.$message({
            message: res.data.info,
            type: "success",
          });
        } else {
          this.$message.error(res.data.info);
        }
        // 修改新闻
      } else {
        this.delImage(this.html);

        const res = await newsCorrect(this.pushId, this.title, this.source, this.html, this.state, this.cover);
        this.$router.replace("/home/news").catch((err) => err);
        // const res = await this.$axios.put("/article", {
        //   _id: this.pushId,
        //   title: this.title,
        //   source: this.source,
        //   Publisher: this.Publisher,
        //   info: this.html,
        //   articleType: this.Labelvalue || "草稿",
        // });
        // this.$router.back();
        if (res.data.ok) {
          this.$message({
            message: res.data.info,
            type: "success",
          });
        } else {
          this.$message.error(res.data.info);
        }
      }
      this.imageUrls = [];
      this.html = "";
      this.title = "";
      this.source = "";
      this.state = "";
      this.pushId = "";
      this.cover = "";

    },
    // 当上传的时候或者销毁的时候返送删除图片
    delImage (html = "") {
      const imgReg = /<img.*?(?:>|\/>)/gi;
      // 匹配src属性
      const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i;
      const arr = html.match(imgReg);
      const imgs = [];
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          const src = arr[i].match(srcReg)[1];
          if (i == 0) {
            this.cover = src.split("uploadNew/")[1]
          }
          imgs.push(src.split("uploadNew/")[1]);
        }
      }
      const delArr = Array.from(
        new Set(this.imageUrls.filter((item) => !imgs.includes(item)))
      );
      if (delArr.length) {
        newsDelImage(delArr);
      }
    },
  },
  beforeDestroy () {
    if (!this.pushId) {
      this.delImage();
    } else {
      this.btnPush();
    }
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
  
  <style lang="scss" scoped>
.inputGroup :is(input:focus, input:valid) ~ label[data-v-d52083f0] {
  background-color: #e6eff7;
}
.titleHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  font-size: 14px;
  padding-left: 20px;
  margin-top: 10px;
  border-left: 3px solid #0081ff;
  width: 100%;
  text-align: left;
  .headerRight {
    display: flex;
    width: 80px;
    justify-content: space-between;
    align-items: center;
    .select {
      width: 135px;
    }
  }
}

/* From uiverse.io by @adamgiebl */
#btnpush {
  font-family: inherit;
  font-size: 14px;
  background: #4f6583;
  color: white;
  padding: 5px 6px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
}

#btnpush span {
  display: block;
  margin-left: 1px;
  transition: all 0.3s ease-in-out;
}

#btnpush svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

#btnpush:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

#btnpush:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

#btnpush:hover span {
  transform: translateX(5em);
}

#btnpush:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

.xwsrk {
  display: flex;
  margin-top: 20px;
  .xwjy {
    margin-right: 20px;
  }
  .fbzt {
    margin-left: 20px;
  }
}
</style>
  