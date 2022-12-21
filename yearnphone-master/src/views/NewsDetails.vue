<template>
  <div>
    <van-nav-bar title="新闻早知道" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="news">
      <h3>{{ details.title }}</h3>
      <div class="center">
        <div class="left">
          <div class="img">
            <img src="@/assets/dateils/news.png" alt="">
          </div>
          <div class="source">
            <p>{{ details.source }}</p>
            <p class="timer">{{ dayjs(details.releaseTime - 0).format('YYYY-MM-DD HH:mm') }}</p>
          </div>
        </div>
        <div class="comment" @click="handleScroll">
          <van-icon name="comment" size="20px" />{{count}}
        </div>
      </div>
      <div v-html="details.Publisher" class="Publisher"></div>
    </div>
    <div id="commentList">
      <details-comment :articleId="$route.query.id" :articleTitle="details.title" articleType="新闻" v-if="details.title"
        @countHandle="countHandle">
      </details-comment>
    </div>
  </div>
</template>

<script setup>
import DetailsComment from '@/components/details/DetailsComment.vue'
import { ref, reactive } from 'vue'
import { getNewsDeatils } from '@/util/homeMainHttp.js'
import dayjs from 'dayjs';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const details = ref({})
const count = ref(0)
getNewsDeatils(route.query.id).then(res => {
  details.value = res.data.info[0]
})
function onClickLeft () {
  router.back()
}
function countHandle (value) {
  count.value = value
}

function handleScroll () {
  document.querySelector('#commentList').scrollIntoView({ behavior: 'smooth' }); // 有兼容性问题
}
</script>
<style>
.Publisher img {
  max-width: 90% !important;
  height: auto !important;
}
.Publisher {
  font-size: 15px;
}
</style>
<style lang="scss" scoped>
h3 {
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}

.news {
  padding: 20px;
}

.source {
  margin-top: 10px;

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
  }

  .timer {
    color: #888;
    font-size: 12px;
  }
}

.center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  .left {
    display: flex;
    align-items: center;
  }
}

.img {
  width: 30px;
  height: 30px;
  margin: 15px 8px 0 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.comment {
  display: flex;
  background: #f5f7f9;
  border-radius: 20px;
  padding: 3px 5px;
  color: #333;
  width: 50px;
  justify-content: space-around;
}
</style>