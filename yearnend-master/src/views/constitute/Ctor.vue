<template>
  <div>
    <el-menu :inline="true" :model="formInline" class="demo-form-inline">
      <el-menu-item>
        <el-input
          v-model="formInline.user"
          placeholder="请输入要查询的内容"
          style="width: 300px; margin-right: 5px"
        ></el-input>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-menu-item>
    </el-menu>
    <el-divider content-position="left">航天员列表</el-divider>
    <div class="box">
      <person
        v-for="(item, i) in formInline.actors"
        :avatar="$urlBase + item.file"
        :source="item.source"
        :introduce="item.introduce"
        :key="item._id"
        @delete="deleteItem(item._id, i)"
      >
        <el-button
          @click="$router.push(`/home/constitute/modification?id=${item._id}`)"
          >修改信息</el-button
        >
      </person>
    </div>
  </div>
</template>

<script>
import { Input, Button, MenuItem, Divider, Table } from "element-ui";
import person from "@/components/Constitute/Person.vue";
import Vue from "vue";
import { getAstrinaut, delAstrinaut } from "@/utils/http.js";
Vue.use(Input);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Button);
Vue.use(MenuItem);
export default {
  components: {
    Person: person,
  },
  data() {
    return {
      tableDate: [],
      formInline: {
        user: "", //模糊查询的值
        actors: [], //y演员列表
      },
    };
  },
  methods: {
    onSubmit() {
      getAstrinaut(this.formInline.user).then((res) => {
        console.log(res);
        this.formInline.actors = res.data.inof.data;
      });
    },

    deleteItem(id, i) {
      delAstrinaut(id).then((res) => {
        console.log(res.data);
        this.formInline.actors.splice(i, 1);
        this.$message({
          type: "error",
          message: "删除成功",
        });
      });
    },
  },
  mounted() {
    getAstrinaut().then((res) => {
      // console.log(res.data.inof.data);
      this.formInline.actors = res.data.inof.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;

  > .person {
    width: 300px;
    margin: 20px;
    padding: 20px;
  }
}
</style>