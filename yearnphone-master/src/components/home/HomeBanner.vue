<template>
  <div>
    <swiper v-if="data.bannerList.length" :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="mySwiper2">
      <swiper-slide v-for="item in data.bannerList" :key="item._id">
        <div class="bannerItem">
          <van-image width="100%" height="100%" fit="cover" :src="$store.state.urlBase + item.file" />
          <div class="bannerInfo">{{item.info}}</div>
        </div>
      </swiper-slide>

    </swiper>
    <swiper @swiper="setThumbsSwiper" v-if="data.bannerList.length" :spaceBetween="10" :slidesPerView="4"
      :freeMode="true" :watchSlidesProgress="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="item in data.bannerList" :key="item._id">
        <div class="bannerItem">
          <van-image width="100%" height="100%" fit="cover" :src="$store.state.urlBase + item.file" />
        </div>
      </swiper-slide>
    </swiper>
  </div>

</template>

<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { ref, reactive } from 'vue'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { getBannerData } from '@/util/homeMainHttp.js'


let thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
}

const modules = [FreeMode, Navigation, Thumbs]

const data = reactive({
  bannerList: []
})
getBannerData().then(res => {
  data.bannerList = res.data.data
})
</script>
<style lang="scss" scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

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

.swiper {
  width: 100%;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 150px;
  width: 100%;
}

.mySwiper {
  height: 60px;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// 下面是原本的
.bannerItem {
  position: relative;
  width: 100%;
  height: 100%;
  .bannerInfo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 14px;
    background: rgba($color: #000000, $alpha: 0.3);
    padding: 30px;
    opacity: 0;
    transition: all 0.5s;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
  }
  &:hover .bannerInfo {
    opacity: 1;
  }
}
</style>

