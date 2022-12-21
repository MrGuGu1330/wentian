<template>
  <div>
    <div class="HomeBase">
      <div class="HomeBaseItem" v-for="(item, index) in dataList" :key="item._id"
        :class="index % 2 ? 'HomeBaseItemStrat' : 'HomeBaseItemEnd'">
        <div class="img" :style="{ backgroundImage: `url(${$urlBase + item.file})` }"></div>
        <div class="right">
          {{ item.info }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBaseHome } from "@/util/MainHttp.js";
export default {
  name: "SpacefilghtFlow",
  data () {
    return {
      dataList: [],
    };
  },
  mounted () {
    getBaseHome().then((res) => {
      this.dataList = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.HomeBase {
  width: 1200px;
  margin: 0 auto;
  padding: 100px 0 100px;

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
}
</style>