<template>
  <div>
    <swiper :slidesPerView="'auto'" :spaceBetween="30" class="mySwiper">
      <swiper-slide v-for="item in swiperList" @click="$router.push(`/science-details?id=${item._id}`)" :key="item._id">
        <van-image width="100%" height="100%" fit="cover" :src="$store.state.urlBase +item.bg" />
        <div class="info">
          <p>
            {{item.title}}
          </p>
          <p class="timer">
            <span>{{dayjs(item.createTime -0 ).format('YYYY-MM-DD')}}</span>
          </p>
          <p class="reprinted">
            <span>来源：{{item.reprinted}}</span>
            <van-tag type="primary" plain>{{item.scienceType}}</van-tag>
          </p>
        </div>
      </swiper-slide>

    </swiper>

    <!-- 列表 -->
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item._id" @click="$router.push(`/science-details?id=${item._id}`)">
        <div class="scienceItem">
          <div class="left">
            <h3>{{item.title}} <van-tag type="primary" plain>{{item.scienceType}}</van-tag>
            </h3>
            <p class="reprinted">
              <span>来源：{{item.reprinted}}</span>
            </p>
            <p>
              <span>{{dayjs(item.createTime -0 ).format('YYYY-MM-DD')}}</span>
            </p>
          </div>
          <div>
            <van-image width="7.5rem" height="4.8125rem" fit="cover" :src="$store.state.urlBase +item.bg"
              style=" border-radius: 10px; overflow: hidden;" />
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getHomeScience } from '@/util/homeMainHttp.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import dayjs from 'dayjs';
const list = ref([]);
const loading = ref(false);
const finished = ref(false);


const swiperList = ref([])
let page = 1

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求

  getHomeScience(page, 5).then(res => {
    if (page === 1) {
      swiperList.value = res.data.info.data
    }
    page++
    list.value.push(...res.data.info.data);
    if (list.value.length >= res.data.info.count) {
      finished.value = true;
    }
    loading.value = false;
  })
  // 数据全部加载完成
};

</script>
<style lang="scss" >
.van-cell {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 12.5rem;
  margin-bottom: 20px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide {
  width: 70%;
  position: relative;
  .info {
    position: absolute;
    padding: 0 15px 5px;
    bottom: 0px;
    width: 100%;
    font-family: "Arial Negreta", "Arial";
    font-weight: 700;
    font-style: normal;
    font-size: 15px;
    color: #ffffff;
    .timer {
      font-size: 12px;
      color: #eee;
      margin-bottom: 5px;
    }
    .reprinted {
      font-size: 12px;
      & > span:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}

.scienceItem {
  display: flex;
  text-align: left;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;
  .left {
    width: 12.5rem;
    h3 {
      font-size: 17px;
      font-weight: 700;
      color: #1e1e1e;
    }
    p {
      color: #999;
      font-size: 12px;
      height: 20px;
    }
    .reprinted {
      margin-top: 10px;
    }
  }
}
</style>