<template>
  <div class="home">
    <home-bg />
    <div>
      <!-- 主页展示区域 -->
      <!-- banner -->
      <div class="banner w">
     
        <div class="info">
          <h2>
            {{homeList.title}}
          </h2>
          <p>
            {{homeList.info}}
          </p>
      
        </div>
              
        <div class="canvas w fs" title="双击模型可以滚轮放大缩小在双击就固定了">
           
          <home-aircraft></home-aircraft>
        </div>
      </div>
      <!-- 新闻 -->
      <div class="w news">
        <home-news></home-news>
      </div>
      <!-- 科普 -->
      <div class="w">
        <home-science />
      </div>
      <!-- 历史 -->
      <div class="w history">
        <home-history></home-history>
      </div>
      <!-- 流程内容 -->
      <div class="w">
        <home-base />
      </div>
      <!-- 航天英雄 -->
      <div class="w">
        <home-hero />
      </div>
    </div>

  </div>
</template>
<script>
import HomeBg from "@/components/home/HomeBg.vue";
import HomeBase from "@/components/home/HomeBase.vue";
import HomeHero from '@/components/home/HomeHero.vue'

import HomeAircraft from '@/components/canvas/HomeAircraft.vue'
import HomeNews from '@/components/home/HomeNews.vue'
import HomeScience from '@/components/home/HomeScience.vue'
import HomeHistory from '@/components/home/HomeHistory.vue'
import { mapState } from 'vuex'
export default {
  components: { HomeAircraft, HomeNews, HomeScience, HomeHistory, HomeBg, HomeBase, HomeHero },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['homeList'])
  },
  mounted () {
  },
};
</script>
<style scoped lang="scss">
.history {
  height: 600px;
  // overflow: hidden;
}
.banner {
  width: 100%;
  min-width: 800px;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
  .info {
    width: 500px;
    padding-top: 200px;
  }
  h2 {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: 3px;
    padding: 30px 0;
    color: #fff;
  }
  p {
    border-left: 5px solid #fff;
    padding: 0 15px;
    font-size: 16px;
    line-height: 2;
    color: #fff;
  }
  .canvas {
    height: 700px;
    width: 800px;
    margin-right: 0;
    transform: translateX(20%);
  }
}
.news {
  margin-top: 200px;
}

</style>