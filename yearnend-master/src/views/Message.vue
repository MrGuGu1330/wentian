<template>
  <div>
    <el-card class="box-card">
      <message-list></message-list>
    </el-card>

  </div>
</template>
<script>
import MessageList from '@/components/comment/MessageList.vue'
import { Card } from 'element-ui'
import Vue from 'vue'
Vue.use(Card)
export default {
  components: { MessageList },
}
</script>

<style lang="scss" scoped>
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

.box-card {
  width: 1000px;
  margin-bottom: 40px;
}
</style>
