<template>
  <div class="news">
    <div class="banner">
      <div class="spaceNews">
        <img src="@/assets/zght.png" alt="">
        <h1>航天科普 +</h1>
      </div>

      <div class="unknown">
        <p>来源：{{html.reprinted}}</p>
        <p>日期：{{dayjs(html.createTime - 0 ).format('YYYY-MM-DD') }}</p>
      </div>
    </div>
    <div class="newlist" ref="item" id="newssingle">
      <h1>{{html.title}}</h1>

      <div class="rqly">
        <span>发布日期:{{dayjs(html.createTime  - 0 ).format('YYYY-MM-DD') }}</span><span>新闻来源：{{html.reprinted}}</span>
      </div>
      <div v-html="html.info" class="content"></div>
      <bright-comment :articleId="$route.query.id" :articleTitle="html.title" articleType="科普"></bright-comment>
    </div>
  </div>
</template>
  <script>
import { scienceGetSingle } from '@/util/ScienceHttp'
import dayjs from "dayjs";
import brightComment from '@/components/brightComment.vue';

export default {
  components: { brightComment },
  data () {
    return {
      dayjs: dayjs,
      html: {},
    }
  },
  mounted () {
    scienceGetSingle(this.$route.query.id).then(res => {
      this.html = res.data.info[0]
    })
  },
  methods: {
  }

}
  </script>

<style lang="scss">
.OwO-items.OwO-items-show {
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ced7dd;
    background-image: -webkit-linear-gradient(
      45deg,
      hsla(0deg, 0%, 100%, 0.4) 25%,
      transparent 0,
      transparent 50%,
      hsla(0deg, 0%, 100%, 0.4) 0,
      hsla(0deg, 0%, 100%, 0.4) 75%,
      transparent 0,
      transparent
    );
    border-radius: 2em;
  }
}
</style>
  <style scoped lang="scss">
.content {
  overflow: hidden;
  overflow-x: auto;
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