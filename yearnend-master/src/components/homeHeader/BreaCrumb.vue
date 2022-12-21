<template>
  <div class="example-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import Vue from "vue";
import { Breadcrumb, BreadcrumbItem } from "element-ui";
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
export default {
  components: { Breadcrumb, BreadcrumbItem },
  data() {
    return {
      breadList: [], // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    isHome(route) {
      return route.name === "home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      // 如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    },
  },
  created() {
    this.getBreadcrumb();
  },
};
</script>
<style lang="scss" scoped>
.example-container {
  margin: 0 50px;
}
</style>
