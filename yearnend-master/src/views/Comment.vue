<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <comment-list />
    </el-card>
  </div>
</template>
<script>
import { Card } from 'element-ui'
import Vue from 'vue'
Vue.use(Card)
import CommentList from '@/components/comment/CommentList.vue'
export default {
  components: { CommentList },
  name: 'FrontComment.vue'
}
</script>
<style lang="scss" scoped>
.box-card {
  width: 100%;
  margin-bottom: 40px;
}
.text {
  font-size: 14px;
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
</style>
