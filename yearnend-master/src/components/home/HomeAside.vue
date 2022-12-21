<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :collapse="showSidebar" :default-active="$route.path" router
      :unique-opened="true" background-color="#263445" text-color="#f5f5f5" active-text-color="#409EFF">
      <el-menu-item index="/home/main/main">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 组件详情 -->
      <el-submenu index="constitute">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">航天员</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/home/constitute/ctor">
            <i class="el-icon-s-operation"></i>
            航天员列表
          </el-menu-item>
          <el-menu-item index="/home/constitute/introduce">
            <i class="el-icon-circle-plus-outline"></i>
            添加航天员
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 航天员详情 -->
      <!-- 新闻中心 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>新闻中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/pressreleas">
            <i class="el-icon-collection"></i>
            新闻发布
          </el-menu-item>
          <el-menu-item index="/home/news">
            <i class="el-icon-news"></i>新闻列表
          </el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <!-- 历史线 -->
      <el-submenu index="history">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>历史线</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/historyhome/history">
            <i class="el-icon-document-checked"></i>
            历史内容
          </el-menu-item>
          <el-menu-item index="/home/historyhome/historylist">
            <i class="el-icon-menu"></i>历史列表
          </el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <!-- 历史结束 end -->

      <!-- 基础流程 -->
      <el-submenu index="base">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span slot="title">基础流程</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/home/base/baselist">
            <i class="el-icon-c-scale-to-original"></i>
            基础流程列表
          </el-menu-item>
          <el-menu-item index="/home/base/addbase">
            <i class="el-icon-circle-plus-outline"></i>
            添加基础流程
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 基础流程end -->

      <!-- 管理员 -->
      <el-submenu index="admin">
        <template slot="title">
          <i class="el-icon-folder-opened"></i>
          <span slot="title">管理员</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/home/admin/adminlist">
            <i class="el-icon-s-custom"></i>
            管理员列表
          </el-menu-item>
          <el-menu-item index="/home/admin/addadmin">
            <i class="el-icon-circle-plus-outline"></i>
            添加管理员
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 管理员end -->

      <!-- 关于我们 -->
      <el-submenu index="about">
        <template slot="title">
          <i class="el-icon-sunrise-1"></i>
          <span slot="title">关于我们</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/home/about/aboutyearnsky">
            <i class="el-icon-discount"></i>
            关于问天
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 关于我们end -->

      <!--科学 科普 -->
      <el-submenu index="science">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>科学科普</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/science/classifiedscience">
            <i class="el-icon-menu"></i>
            分类科普
          </el-menu-item>
          <el-menu-item index="/home/science/publishscience">
            <i class="el-icon-position"></i>
            发布科普
          </el-menu-item>
          <el-menu-item index="/home/science/sciencelist">
            <i class="el-icon-document-copy"></i>
            科普列表
          </el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <!--科学 科普 end-->
      <!-- 用户管理 -->
      <el-menu-item index="/home/usermanage">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <!-- 用户管理end -->
      <!-- 评论管理 -->
      <el-menu-item index="/home/comment">
        <i class="el-icon-chat-dot-square"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <!-- 评论管理end -->
      <!-- 留言管理 -->
      <el-menu-item index="/home/message">
        <i class="el-icon-chat-round"></i>
        <span slot="title">留言管理</span>
      </el-menu-item>
      <!-- 留言管理end -->
      <!-- 个人中心 -->
      <el-menu-item index="/home/center">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <!-- 个人中心end -->
      <!-- 界面管理   -->
      <el-menu-item index="/home/frontPage">
        <i class="el-icon-monitor"></i>
        <span slot="title">界面管理</span>
      </el-menu-item>
      <!-- 界面管理 end  -->
    </el-menu>
  </div>
</template>


<script>
import Vue from "vue";
import { MenuItem, Menu, MenuItemGroup, Submenu } from "element-ui";
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Menu);
export default {
  // 这个显示和隐藏侧边栏的
  props: ["showSidebar"],

  data () {
    return {};
  },
};
</script>

<style>
/* 这个不要写样式 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  text-align: left;
}
.el-aside {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #263445;
  text-align: center;
  height: 100vh;
}
.el-menu {
  border: 0;
}
</style>

