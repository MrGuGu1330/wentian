<template>
  <div>
    <h2 class="titleHeader">个人中心</h2>
    <div style="margin-bottom:10px"></div>
    <el-tabs type="border-card">
      <!-- 修改信息 -->
      <el-tab-pane>
        <span slot="label"><i class="el-icon-edit"></i> 修改信息</span>
        <basic-message></basic-message>
      </el-tab-pane>
      <!-- 修改密码 -->
      <el-tab-pane>
        <span slot="label"><i class="el-icon-edit"></i> 修改密码</span>
        <change-password></change-password>
      </el-tab-pane>
      <div style="margin-bottom:30px"></div>
    </el-tabs>
  </div>
</template>

<script>
import { TabPane, Tabs } from 'element-ui'
import Vue from 'vue'
import BasicMessage from '@/components/center/BasicMessage.vue'
import ChangePassword from '@/components/center/ChangePassword.vue'
Vue.use(TabPane)
Vue.use(Tabs)
export default {
  components: {
    BasicMessage,
    ChangePassword
  }
}
</script>

<style lang="scss" scoped>
.titleHeader {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  font-size: 14px;
  padding-left: 20px;
  margin-top: 10px;
  border-left: 3px solid #0081ff;
  width: 100%;
  text-align: left;
}
</style>