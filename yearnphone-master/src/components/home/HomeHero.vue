<template>
  <div class="swiper myswiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for=" item,index  in heroList" :key="item._id">
        <div class="swiper3D" @click="handleRotate(index)" ref="swiper3D">
          <div class="swiperFront">
            <div class="Swiperimage" :style="{backgroundImage:`url(${$store.state.urlBase +item.file})`}">
              <h3 class="astrinautName">
                {{item.astrinautName}}
              </h3>
              <p>{{item.source}}</p>
            </div>
          </div>
          <div class="swiperEnd">
            <div>
              <p>
                简介：<br />
                {{item.introduce}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, nextTick, handleError } from 'vue'
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { getHomeHero } from '@/util/homeMainHttp.js'
const swiper3D = ref(null)
let heroList = ref([])
let flag = ref(false)
getHomeHero().then(res => {
  heroList.value = res.data.inof.data
  nextTick(() => {
    new Swiper('.myswiper', {
      slidesPerView: 2.5,
      freeMode: true,
      spaceBetween: 20,
    });
  })

})
function handleRotate (i) {
  swiper3D._rawValue[i].classList.toggle('swiper3DRotate')
}

</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
  background: #eeee;
  perspective: 500px;
  p {
    font-size: 12px;
    color: #888;
  }
}
.astrinautName {
  color: #333;
  font-weight: 700;
}
.Swiperimage {
  width: 100%;
  height: 8.125rem;
  background-position: center -2.8125rem;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 8.4375rem;
}
.swiperFront {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // transform: translateZ(10px);
  // z-index: 100;
  backface-visibility: hidden;
}
.swiperEnd {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  text-align: left;
  overflow: auto;
  padding: 10px;
  p {
    color: #000;
    font-weight: 600;
  }
}
.swiper3D {
  width: 100%;
  height: 100%;
  position: relative;

  transition: all 1s;
  transform-style: preserve-3d;
}
.swiper3DRotate {
  transform: rotateY(180deg);
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
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
  height: 11.25rem;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>