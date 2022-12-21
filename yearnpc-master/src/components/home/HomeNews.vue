<template>
  <div>
    <h3 class="title">新闻栏</h3>
    <div id="news">
      <div class="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="content">
          <div class="homeNewsImg" :class="`imgItem`+ index" v-for="(item,index) in newsList" :key="item._id"
            @click="detail(item)" :style="{backgroundImage:`url(${$urlBase + 'uploadNew/'+ item.cover})`}">
          </div>
        </div>
      </div>
      <div class="newsRight">
        <span class="rocket"></span>
        <div class="item" v-for="(item,index) in newsList" @click="detail(item)" :key="item._id"
          @mouseover="handleMouse(index)" ref="item">
          {{item.title}}({{item.source}})
        </div>
        <div class="more" @click="$router.push('/home/news')">点击查看更多...</div>
      </div>
    </div>
  </div>
</template>
<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getHomeNews } from '@/util/MainHttp.js'
export default {
  data () {
    return {
      newsList: []
    }
  },
  mounted () {
    getHomeNews().then(res => {
      this.newsList = res.data.info.data
    })
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
    })
    gsap.registerPlugin(ScrollTrigger)
    // 从哪来的

    gsap.to('.title', {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 50px",
        trigger: ".title",
        // pin: ".title",
        scrub: true, // 0.5, 以秒计算
      },
      duration: 1,
      opacity: 0,
      x: 400
    });
    gsap.fromTo('.newsRight', {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 100px",
        trigger: ".news",
        // pin: ".newsRight",
        scrub: true, // 0.5, 以秒计算
      },
      duration: 2,
      x: 150,
    }, {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 100px",
        trigger: ".news",
        // pin: ".newsRight",
        scrub: true, // 0.5, 以秒计算
      },
      duration: 2,
      y: 200,
      x: 0
    });
    gsap.from('.news .box', {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 100px",
        trigger: ".news",
        // 定住锚点位置
        scrub: true, // 0.5, 以秒计算
      },
      duration: 2,
      x: -150,
    });

  },
  methods: {
    detail (row) {
      this.$router.push("/home/articlenews/" + row._id)
    },
    handleMouse (index) {
      gsap.to('.rocket', {
        duration: 1,
        y: this.$refs.item[index].offsetTop,
      });
      gsap.to(`.homeNewsImg`, {
        duration: 1,
        opacity: function (i, target) {
          return i === index ? 1 : 0
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.rocket {
  position: absolute;
  top: 0;
  left: -50px;
  width: 50px;
  height: 50px;
  background: url(@/assets/hj.png) no-repeat center;
  background-size: 100%;
}
.title {
  width: 400px;
  font-size: 100px;
  color: #fff;
  margin: 100px 0;
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  color: #f1ebe5;
  font-weight: bold;
  letter-spacing: 2px;
}
#news {
  min-width: 1000px;
  display: flex;
  align-items: center;
  position: relative;
  .newsRight {
    margin-left: 100px;
    .item {
      width: 600px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      margin: 20px 0;
      padding: 10px 0;
      cursor: pointer;
      transition: all 0.3s;
      font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial,
        sans-serif;
      color: #f1ebe5;
      font-weight: bold;
      &:hover {
        transform: scale(1.01);
      }
    }
  }
}
.content {
  .homeNewsImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background-size: cover;
  }
}

.box {
  position: relative;
  width: 400px;
  height: 400px;
  background: #111845a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(23, 32, 90);
  border: 2px solid #2a3cad;
  color: white;
  cursor: pointer;
}

.box:before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: 0.5s;
  pointer-events: none;
}

.box:hover:before {
  left: -50%;
  transform: skewX(-5deg);
}

.box .content {
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 1px solid #f0a591;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
}

.box span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}

.box span:nth-child(1) {
  transform: rotate(0deg);
}

.box span:nth-child(2) {
  transform: rotate(90deg);
}

.box span:nth-child(3) {
  transform: rotate(180deg);
}

.box span:nth-child(4) {
  transform: rotate(270deg);
}

.box span:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #50dfdb;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform: scaleX(1);
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}
</style>