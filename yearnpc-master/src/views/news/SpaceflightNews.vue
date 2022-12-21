<template>
  <div class="news">
    <div class="banner">
      <img src="@/assets/news/zght.png" alt="">
      <h1>航天新闻 +</h1>
    </div>
    <div class="newlist">
      <div class="lists">

        <lazy @lazyHandle="lazyHandle" :isLoad="isLoad" :finish="finish">
          <ul>
            <li v-for="(item, index) in newsList" :key="index" ref="item" id="NewsList" @click="detail(item)">
              <img :src="$urlBase + 'uploadNew/' + item.cover" alt="" width="300px" height="200px">
              <div>
                <span>{{ item.title }}</span>
                <p><img src="@/assets/news/rl.png" alt="">{{ dayjs(item.releaseTime - 0).format('YYYY-MM-DD') }}</p>
                <p>新闻来源：{{ item.source }}</p>
              </div>
            </li>
          </ul>
        </lazy>

      </div>
      <div class="rocket">
        <img src="@/assets/news/hjsk.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>

import { frontNews } from "@/util/news.js";
import Lazy from '@/components/Lazy.vue'
import dayjs from 'dayjs'
export default {
  components: { Lazy },
  data() {
    return {
      newsList: [],
      dayjs: dayjs,
      page: 1,
      isLoad: true,
      finish: false
    }
  },
  mounted() {
  },
  methods: {
    lazyHandle() {
      this.isLoad = false
      frontNews(this.page++).then((res) => {
        // console.log("请求", res.data);
        this.newsList.push(...res.data.info.data)
        this.newsList.length >= res.data.info.count && (this.finish = true)
        this.$nextTick(() => {
          this.isLoad = true
        })
      })
    },
    detail(row) {
      this.$router.push("/home/articlenews/" + row._id)
    }

  }
}
</script>
<style scoped lang="scss">
.news {
  .banner {
    margin: 0 auto;
    width: 80%;
    padding-top: 100px;
    display: flex;
    align-items: center;

    img {
      width: 240px;
    }

    h1 {
      font-size: 60px;
    }
  }

  .newlist {
    margin: 0 auto;
    width: 80%;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    z-index: 100;

    .lists {
      width: 70%;

      li {
        margin: 20px 0;
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        border-radius: 20px;
        // border: 4px solid rgba(233, 233, 233, 0.1);
        display: flex;
        cursor: pointer;
        overflow-x: hidden;
        transition: all 0.5s;

        div {
          padding: 30px;

          span {
            font-size: 20px;
            margin-bottom: 10px;
            display: inline-block;
            white-space: nowrap;
            width: 560px;
            overflow-x: hidden;

            text-overflow: ellipsis;
          }

          p {
            font-size: 16px;
            line-height: 28px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            img {
              margin-right: 10px;
              width: 20px;
            }
          }
        }
      }

      li:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 30px 6px rgba(212, 212, 212, 0.1);
      }
    }

    .rocket {
      width: 20%;
      position: fixed;
      top: 80px;
      right: 200px;
    }
  }
}
</style>