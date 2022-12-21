<template>
  <div>
    <div class="Basetitle">流程内容</div>
    <div class="HomeBase">
      <div
        class="HomeBaseItem"
        v-for="(item, index) in dataList"
        :key="item._id"
        :class="index % 2 ? 'HomeBaseItemStrat' : 'HomeBaseItemEnd'"
      >
        <div
          class="img"
          :style="{ backgroundImage: `url(${$urlBase + item.file})` }"
        ></div>
        <div class="right">
          {{ item.info }}
        </div>
      </div>
      <div class="more" @click="$router.push('/home/flow')">查看更多...</div>
    </div>
  </div>
</template>
<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getBaseHome } from "@/util/MainHttp.js";
export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    getBaseHome().then((res) => {
      this.dataList = res.data.data.filter((item, index) => index < 2);
      this.$nextTick(() => {
        gsap.from(".HomeBaseItem .right", {
          scrollTrigger: {
            // 目标
            start: "top 60",
            // 目标
            trigger: ".HomeBaseItem .img",
            scrub: true, // 0.5, 以秒计算
            pin: ".HomeBase",
          },
          duration: 1,
          opacity: 1,
          y: 300,
        });
        gsap.from(".HomeBaseItem .img", {
          scrollTrigger: {
            // 目标
            start: "top 100",
            trigger: ".HomeBaseItem .img",
            scrub: true, // 0.5, 以秒计算
            pin: ".HomeBase",
          },
          x: function (index) {
            return index % 2 ? 150 : -150;
          },
        });
        // gsap.to('.HomeBaseItem .right', {

        // })
      });
    });
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".Basetitle", {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 50px",
        trigger: ".Basetitle",
        scrub: true, // 0.5, 以秒计算
      },
      duration: 1,
      opacity: 0,
      x: 400,
    });
  },
};
</script>
<style lang="scss" scoped>
.Basetitle {
  width: 500px;
  font-size: 100px;
  color: #fff;
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  color: #f1ebe5;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 500px;
  margin-bottom: 200px;
}
video {
  margin: 0 auto;
}
.HomeBaseItemEnd {
  .img {
    float: right;
    margin-left: 50px;
  }
}
.HomeBaseItemStrat {
  .img {
    float: left;
    margin-right: 50px;
  }
}
.HomeBaseItem {
  height: 300px;
  width: 100%;
  line-height: 1.5;
  overflow: hidden;
  .img {
    width: 445px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    background-size: cover;
  }
  .right {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    width: 700px;
    padding-top: 50px;
    font-size: 25px;
  }
}
</style>