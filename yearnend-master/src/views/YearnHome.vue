<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <home-aside :showSidebar='!showSidebar'></home-aside>
      </el-aside>
      <el-container>
        <el-header>
          <home-header>
            <el-tooltip content="侧边栏开关" placement="top">
              <el-switch v-model="showSidebar" active-color="#13ce66" inactive-color="#263445" :active-value="true"
                :inactive-value="false">
              </el-switch>
            </el-tooltip>
          </home-header>
        </el-header>
        <el-main>
          <transition name="fadeChange" appear mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue';
import { Container, Main, Header, Aside, Tooltip, Switch } from 'element-ui';
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeAside from '@/components/home/HomeAside.vue'
Vue.use(Container)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
export default {
  components: {
    HomeHeader,
    HomeAside
  },
  data () {
    return {
      showSidebar: JSON.parse(sessionStorage.getItem('showSidebar'))
    }},
  watch: {
    showSidebar (value) {
      sessionStorage.setItem('showSidebar', value)
    }
  },

}
</script>
<style lang="scss" scoped>
.el-header {
  border-bottom: 2px solid #dedede;
  line-height: 60px;
}
.el-header {
  border-bottom: 2px solid #dedede;
  line-height: 60px;
}
</style>