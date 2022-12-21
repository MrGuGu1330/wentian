<template>
  <div>
    <!-- <home-bg></home-bg> -->
    <div class="w">
      <div class="senceFather">
        <div class="scene" v-for="item in data1" :key="item.id">
          <div class="card">
            <div class="card__face card__face--front" :style="{
              'background-image': `url(${$urlBase + item.file})`
            }"></div>
            <div class="card__face card__face--back">
              {{ item.introduce }}
              <div class="source">摘自：{{ item.source }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getHeroHome } from "@/util/MainHttp";
import HomeBg from "@/components/home/HomeBg.vue";
export default {
  components: { HomeBg },
  data() {
    return {
      data1: [],
      source: ''
    };
  },
  methods: {},
  mounted() {
    getHeroHome().then((res) => {
      this.data1 = res.data.inof.data;
    });
  },
};
</script>

<style>

</style>

<style lang="scss" scoped>
.senceFather {
  display: flex;
  flex-wrap: wrap;

  padding-top: 100px;
}

.scene {
  perspective: 500px;

  .card {
    position: relative;
    width: 317px;
    height: 500px;
    margin-right: 40px;
    margin-bottom: 40px;
    transition: 0.8s ease-in-out;
    cursor: pointer;
    transform-style: preserve-3d;

    &:active {
      transform: rotateY(180deg);

    }



    .card__face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: 0.8s ease-in-out;
      background-size: cover;

      &.card__face--back {
        transform: rotateY(0.5turn);
        // background-image: linear-gradient(45deg, #8a1b18, rgba(58, 155, 235, 0.133));
        background-image: url(@/assets/xixi.jpg);
        background-size: cover;
        font-size: 20px;
        line-height: 30px;
        padding: 10px;
        text-indent: 2em;
        position: relative;

        >.source {
          font-size: 16px;
          position: absolute;
          top: 450px;
          left: 60px;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
