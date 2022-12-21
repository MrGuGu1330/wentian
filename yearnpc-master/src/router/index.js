import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 阻止报错
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/home",
    name: "home",
    meta: { title: "问天首页" },
    component: () => import("@/views/YearHome.vue"),
    children: [
      {
        path: "main",
        name: "main",
        component: () => import("@/views/home/HomeMain"),
        meta: { title: "问天首页" },
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/SpaceflightAbout"),
        meta: { title: "关于我们" },
      },
      {
        path: "flow",
        name: "flow",
        component: () => import("@/views/flow/SpacefilghtFlow"),
        meta: { title: "基础流程" },
      },
      {
        path: "hero",
        name: "hero",
        component: () => import("@/views/hero/SpacefightHero"),
        meta: { title: "航天英雄" },
      },
      {
        path: "history",
        name: "history",
        component: () => import("@/views/history/SpaceflightHistory"),
        meta: { title: "航天历史" },
      },
      {
        path: "news",
        name: "news",
        component: () => import("@/views/news/SpaceflightNews"),
        meta: { title: "航天新闻" },
      },
      {
        path: "articlenews/:id",
        name: "articlenews",
        component: () => import("@/views/news/ArticleNews"),
        meta: { title: "航天新闻详情" },
      },

      {
        path: "science",
        name: "science",
        component: () => import("@/views/science/SpaceflightScience"),
        meta: { title: "航天科普" },
      },
      {
        path: "sciencedetials",
        name: "sciencedetials",
        component: () => import("@/views/science/ScienceDetials"),
        meta: { title: "科普详情" },
      },
      {
        path: "center",
        name: "center",
        component: () => import("@/views/center/Center.vue"),
        meta: { title: "个人主页" },
      },
      {
        path: "/home",
        redirect: "/home/main",
      },
    ],
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
  document.title = to.meta.title || "问天";
});

export default router;
