<template>
  <div>
    <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }" :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="item in newsList" :key="item._id" @click="$router.push(`/news-details?id=${item._id}`)"><img
          :src="$store.state.urlBase +'uploadNew/' + item.cover" />
      </swiper-slide>
    </swiper>
    <div class="title">新闻</div>

    <div class="news">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <van-cell v-for="item in data.dataList" :key="item._id">
          <div class="newsitem" @click="$router.push(`/news-details?id=${item._id}`)">
            <div style="padding: 5px 10px 10px">
              <div class="newsImage" :style="{
          backgroundImage: `url(${$store.state.urlBase + 'uploadNew/' + item.cover})`
        }"></div>
              <h4>{{ item.title }}</h4>
              <div class="info">
                <p> {{ item.source }}

                </p>
                <span>{{ dayjs(item.releaseTime - 0).format('YYYY-MM-DD') }}</span>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import { getHomeNews } from '@/util/homeMainHttp.js'
import { reactive, ref } from 'vue'
const loading = ref(false);
const finished = ref(false);


const newsList = ref([])
const data = reactive({
  dataList: [],
  count: 0
})
let page = 1
function getList () {
  getHomeNews(page, 5).then(res => {
    if (page === 1) {
      newsList.value = res.data.info.data
    }
    page++

    loading.value = false;
    data.count = res.data.info.count
    data.dataList.push(...res.data.info.data)
    if (data.dataList.length >= res.data.info.count) {
      finished.value = true;
    }
  })
}
getList(1)



const modules = [EffectCoverflow, Pagination]
</script>
<style lang="scss" >
.van-cell {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.title {
  margin-top: 0;
}
.swiper {
  width: 100%;
  padding-top: 0px;
  padding-bottom: 30px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 18.75rem;
  height: 10rem;
  overflow: hidden;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.news {
  .newsitem {
    border-radius: 5px;
    border-bottom: 4px solid #ddd;

    .newsImage {
      width: 100%;
      height: 10rem;
      background-size: cover;
      border-radius: 5px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background-position: center;
    }

    h4 {
      font-size: 16px;
      font-weight: 700;
      margin: 10px 0 5px;
      color: #333;
      text-align: left;
    }

    .info {
      display: flex;
      justify-content: space-between;
      text-align: left;
      color: #888;
      font-style: 12px;
    }
  }
}
</style>