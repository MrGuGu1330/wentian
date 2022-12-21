<template>
  <div class="news">
    <div class="banner">
      <div class="spaceNews">
        <img src="@/assets/news/zght.png" alt="">
        <h1>航天新闻 +</h1>
      </div>

      <div class="unknown">
        <p>来源：{{ newssingle.source }}</p>
        <p>日期：{{ dayjs(newssingle.releaseTime - 0).format('YYYY-MM-DD') }}</p>
      </div>
    </div>
    <div class="newlist" ref="item" id="newssingle">
      <h1>{{ newssingle.title }} </h1>

      <div class="rqly">
        <span>发布日期:{{ dayjs(newssingle.releaseTime - 0).format('YYYY-MM-DD')
        }}</span><span>新闻来源：{{ newssingle.source }}</span>
      </div>
      <div v-html="newssingle.Publisher" class="yc"></div>
      <bright-comment :articleId="$route.params.id" :articleTitle="newssingle.title" articleType="新闻"></bright-comment>
    </div>

  </div>
</template>
<script>
// v-html="Publisher"
import { Allnews } from "@/util/news.js";
import dayjs from 'dayjs'
import brightComment from '@/components/brightComment.vue';

export default {
  components: { brightComment },

  data() {
    return {
      newssingle: {},
      dayjs: dayjs,
      page: 1,
    }
  },
  mounted() {
    this.$route.params.id && (this.id = this.$route.params.id)
    Allnews(this.id).then(res => {
      // console.log(res)  
      this.newssingle = res.data.info[0]
    })
  },

}
</script>
<style scoped lang="scss">
.yc {
  overflow: hidden;
}

.news {
  .banner {
    margin: 0 auto;
    width: 80%;
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .spaceNews {
      display: flex;
      align-items: center;

      img {
        width: 240px;
      }

      h1 {
        font-size: 60px;
      }
    }

    .unknown {
      padding: 15px;
      border-radius: 10px;
      line-height: 26px;
      font-size: 16px;
      background-color: rgba(2, 41, 73, 0.2);
    }
  }

  .newlist {
    margin: 0 auto;
    width: 80%;
    margin-top: 60px;
    padding: 20px 60px;
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
    color: #333;

    h1 {
      font-size: 30px;
      padding: 40px;
      text-align: center;
      font-weight: bold;
      border-bottom: 1px solid rgba(87, 87, 87, 0.3);
    }

    .rqly {
      display: flex;
      padding: 20px;

      span {
        margin: 0 20px;
        font-size: 16px;
      }
    }
  }
}
</style>