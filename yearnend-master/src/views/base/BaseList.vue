<template>
  <div class="block">
    <el-divider content-position="left">基础流程列表</el-divider>
    <el-form>
      <!-- 搜索表单 行内表单 -->
      <div class="search">
        <el-form-item class="inp" :inline="true" :model="form" @submit.native.prevent>
          <el-input v-model="form.name" placeholder="查一下吧 老铁" @keyup.native.enter="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </div>

      <!-- 时间线 -->
      <el-timeline :reverse="true">
        <el-timeline-item :timestamp="dayjs(item.createTime - 0).format('YYYY-MM-DD HH:mm')" placement="top"
          v-for="(item, i) in act" :key="item._id">
          <el-card class="main">
            <el-image class="imgg" style="width: 150px; height: 100px" :src="$urlBase + item.file" fit="cover ">
            </el-image>

            <h4 class="confon1">
              {{ item.info }}
            </h4>
            <p class="confon2">流程内容</p>

            <div class="btn">
              <el-button @click="handleEdit(item._id)" class="btn1" type="primary" icon="el-icon-edit" circle
                size="medium"></el-button>

              <el-button @click="delItem(item._id, i)" class="btn2" type="danger" icon="el-icon-delete" circle
                size="medium"></el-button>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Vue from "vue";
import {
  Card,
  Input,
  Button,
  Timeline,
  TimelineItem,
  Divider,
  Image,
  Form,
  FormItem,
} from "element-ui";
import { baseFind, basedelete } from "@/utils/http.js";

Vue.use(Card);
Vue.use(Input);
Vue.use(Button);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);

export default {
  data () {
    return {
      keyword: "",
      form: {
        name: "", // 绑定模糊查询的姓名
      },
      act: [],
      actData: [],
      dayjs,
    };
  },

  methods: {
    handleEdit (id) {
      this.$router.push(`/home/base/addbase?id=${id}`);
    },
    // 删除列表项 发送请求 删除成功后更新列表
    delItem (id, index) {
      this.$confirm("此操作将永久删除，是否继续？", "提示", {
        type: "warning",
      }).then(() => {
        basedelete(id).then((res) => {
          this.$message({ type: "success", message: "删除成功" });
          this.act.splice(index, 1);
        });
      });
    },

    onSubmit () {
      // 当点击按钮后执行
      this.act = this.actData.filter((item) =>
        item.info.includes(this.form.name)
      );
    },
  },

  // 显示页面
  mounted () {
    baseFind(this.form.name).then((res) => {
      this.actData = res.data.data;
      this.act = this.actData;
    });
  },
};
</script>

<style lang="scss" scoped>
.el-divider__text.is-left {
  font-weight: bold;
  background-color: #e6eff7;
}

.search {
  display: flex;
  margin-left: 30px;

  .inp {
    margin-right: 10px;
  }
}

.main {
  position: relative;
  .confon1 {
    position: absolute;
    left: 250px;
    top: 65px;
    width: 1200px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .confon2 {
    position: absolute;
    left: 250px;
    top: 20px;
  }

  .btn {
    position: absolute;
    right: 70px;
    top: 20px;
    display: flex;

    .btn2 {
      margin-left: 30px;
    }
  }
}
</style>