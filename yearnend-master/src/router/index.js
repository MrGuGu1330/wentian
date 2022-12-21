import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/YearnHome.vue"),
    meta: { title: "后台主页" },
    children: [
      // 首页
      {
        path: "main",
        name: "main",
        component: () => import("@/views/HomeMain.vue"),
        meta: { title: "首页" },
      },
      // 管理员
      {
        path: "admin",
        name: "admin",
        meta: { title: "管理员" },
        component: () => import("@/views/YearnAdmin.vue"),
        children: [
          {
            path: "adminlist",
            name: "adminlist",
            component: () => import("@/views/admin/AdminList.vue"),
            meta: { title: "管理员列表" },
          },
          {
            path: "addadmin",
            name: "addadmin",
            component: () => import("@/views/admin/AddAdmin.vue"),
            meta: { title: "添加管理员" },
          },
          {
            path: "/home/admin",
            redirect: "/home/admin/adminlist",
          },
        ],
      },
      // 主要组成
      {
        path: "constitute",
        name: "constitute",
        component: () => import("@/views/Constitute.vue"),
        meta: { title: "航天员" },
        children: [
          {
            path: "introduce",
            name: "introduce",
            component: () => import("@/views/constitute/Introduce.vue"),
            meta: { title: "添加航天员" },
          },
          {
            path: "ctor",
            name: "ctor",
            component: () => import("@/views/constitute/Ctor.vue"),
            meta: { title: "航天员列表" },
            children: [],
          },
          {
            path: "modification",
            name: "modification",
            component: () => import("@/views/constitute/Modification.vue"),
            meta: { title: "航天员列表" },
          },
        ],
      },
      // 基础流程
      {
        path: "base",
        name: "base",
        meta: { title: "基础流程" },
        component: () => import("@/views/YearnBase.vue"),
        children: [
          {
            path: "baselist",
            name: "baselist",
            component: () => import("@/views/base/BaseList.vue"),
            meta: { title: "基础流程列表" },
          },
          {
            path: "addbase",
            name: "addbase",
            component: () => import("@/views/base/AddBase.vue"),
            meta: { title: "添加基础流程" },
          },
          {
            path: "/home/base",
            redirect: "/home/base/baselist",
          },
        ],
      },
      {
        path: "/home",
        redirect: "/home/main",
      },

      // 历史
      {
        path: "historyhome",
        name: "historyhome",
        meta: { title: "历史线" },
        component: () => import("@/views/YearnHistory.vue"),
        children: [
          {
            path: "history",
            name: "history",
            component: () => import("@/views/history/History.vue"),
            meta: { title: "历史内容" },
          },
          {
            path: "historylist",
            name: "historylist",
            component: () => import("@/views/history/HistoryList.vue"),
            meta: { title: "历史列表" },
          },
          {
            path: "/home/historyhome",
            redirect: "/home/historyhome/historylist",
          },
        ],
      },
      // 个人中心
      {
        path: "center",
        name: "center",
        component: () => import("@/views/YearnCenter"),
        meta: { title: "个人中心" },
      },
      // 关于我们
      {
        path: "about",
        name: "about",
        meta: { title: "关于我们" },
        component: () => import("@/views/YearnAbout.vue"),
        children: [
          {
            path: "aboutyearnsky",
            name: "aboutyearnsky",
            component: () => import("@/views/about/AboutYearnsky.vue"),
            meta: { title: "关于问天" },
          },
          {
            path: "/home/about",
            redirect: "/home/about/aboutyearnsky",
          },
        ],
      },
      // 界面管理
      {
        path: "frontpage",
        name: "frontpage",
        meta: { title: "界面管理" },
        component: () => import("@/views/FrontPage"),
      },
      //  评论管理
      {
        path: "comment",
        name: "comment",
        meta: { title: "评论管理" },
        component: () => import("@/views/Comment.vue"),
      },
      //  留言管理
      {
        path: "message",
        name: "message",
        meta: { title: "留言管理" },
        component: () => import("@/views/Message.vue"),
      },

      // 科学科普
      {
        path: "science",
        name: "science",
        meta: { title: "科学科普" },
        component: () => import("@/views/YearnScience.vue"),
        children: [
          {
            path: "classifiedscience",
            name: "classifiedscience",
            component: () => import("@/views/science/ClassifiedScience.vue"),
            meta: { title: "分类科普" },
          },
          {
            path: "publishscience",
            name: "publishscience",
            component: () => import("@/views/science/PublishScience"),
            meta: { title: "发布科普" },
          },
          {
            path: "sciencelist",
            name: "sciencelist",
            component: () => import("@/views/science/ScienceList.vue"),
            meta: { title: "科普列表" },
          },

          {
            path: "/home/science",
            redirect: "/home/science/sciencelist",
          },
        ],
      },
      // 用户管理
      {
        path: 'usermanage',
        name: 'usermanage',
        meta: { title: '用户管理' },
        component: () => import('@/views/UserManage.vue'),
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/views/News.vue"),
        meta: { title: "新闻列表" },
      },

      {
        path: "pressreleas",
        name: "pressreleas",
        component: () => import("@/views/Pressreleas.vue"),
        meta: { title: "新闻发布" },
      },
      {
        path: "/home",
        redirect: "/home/main",
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/YearnLogin.vue"),
    meta: { title: "登录" },
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

// 定义全局拦截（守卫）后置全局拦截
router.afterEach((to, from) => {
  // 每次切换的时候切换标题名字用到了路由元传参
  document.title = to.meta.title || "问天后台";
});
export default router;
