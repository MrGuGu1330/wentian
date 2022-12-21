<template>
  <div class="hero">
    <div class="herotitle">航天英雄</div>
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :style="{ backgroundImage:`url(${$urlBase +item.file })`}" v-for="item in heroList"
          :key="item._id">

          <div class="heroInfo">
            <h3>{{item.astrinautName}}</h3>
            <p class="source"><span>转载：{{item.source}}</span>
              <span>{{dayjs(item.createTime -0).format('YYYY-MM-DD')}}</span>
            </p>
            <p class="introduce">{{item.introduce}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import "swiper/swiper-bundle.min.css"//引入swiper样式
import Swiper, { EffectCards } from "swiper"; //引入swiper
import { getHeroHome } from '@/util/MainHttp.js'

import dayjs from 'dayjs'
export default {
  data () {
    return {
      heroList: [],
      dayjs: dayjs
    }
  },
  mounted () {
    gsap.registerPlugin(ScrollTrigger)

    gsap.to('.herotitle', {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 50px",
        trigger: ".herotitle",
        scrub: true, // 0.5, 以秒计算
      },
      duration: 1,
      opacity: 0,
      x: 400,

    });
    getHeroHome().then(res => {
      this.heroList = res.data.inof.data
      this.$nextTick(() => {
        this.initSwiper()

      })
    })
  },
  methods: {
    initSwiper () {
      new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        modules: [EffectCards],
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.herotitle {
  width: 500px;
  font-size: 100px;
  color: #fff;
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  color: #f1ebe5;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 200px;
}
.hero {
  margin-top: 300px;
  padding: 0;
  position: relative;
  height: 100%;
  font-size: 18px;
  z-index: 10;
}
.swiper {
  width: 80%;
  height: 500px;
}

.swiper-slide {
  display: flex;
  // align-items: center;
  justify-content: flex-end;
  border-radius: 18px;
  font-size: 22px;
  color: #666;
  margin: 0;
  background-size: 400px;
  background-position: left center;
  background-repeat: no-repeat;
  background-color: #fff;

  .heroInfo {
    padding: 10px 20px;
    width: 500px;
    h3 {
      font-size: 25px;
      text-align: center;
      font-weight: 900;
      margin: 30px 0;
    }
    .source {
      display: flex;
      justify-content: space-between;
      color: #888;
      font-size: 14px;
      margin: 0 20px 20px 0;
    }
    .introduce {
      letter-spacing: 2px;
    }
  }
}
</style>