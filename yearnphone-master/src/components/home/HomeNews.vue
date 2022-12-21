<template>
  <div class="newshome">
    <div v-for="item in newsList" :key="item._id" class="newsitem"
      @click="$router.push(`/news-details?id=${item._id}`)">
      <div>
        <div class="newsImage" :style="{
          backgroundImage: `url(${$store.state.urlBase + 'uploadNew/' + item.cover})`
        }">
        </div>
        <h4>{{ item.title }}</h4>
        <div class="info">
          <p> {{ item.source }}

          </p>
          <span>{{ dayjs(item.releaseTime - 0).format('YYYY-MM-DD') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { getHomeNews } from '@/util/homeMainHttp.js'
const newsList = ref([])
getHomeNews().then(res => {
  newsList.value = res.data.info.data
})
</script>
<style lang="scss" scoped>
.newshome {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
  .newsitem {
    width: 10.125rem;
    margin-bottom: 0.9375rem;
  }
  .newsImage {
    width: 10.125rem;
    height: 6.25rem;
    background-size: cover;
  }
  h4 {
    color: 666;
    font-size: 12px;
    font-weight: 700;
    height: 1.9375rem;
    line-height: 1.9375rem;
    width: 10.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p,
  span {
    color: #888;
    font-size: 12px;
  }
}
</style>