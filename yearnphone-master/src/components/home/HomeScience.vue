<template>
  <div class="news">
    <div v-for="item in newsList" :key="item._id" class="newsitem"
      @click="$router.push(`/science-details?id=${item._id}`)">
      <div style="padding: 5px 10px 10px">
        <div class="newsImage" :style="{
          backgroundImage: `url(${$store.state.urlBase + item.bg})`
        }">
        </div>
        <h4>{{ item.title }}</h4>
        <div class="info">
          <p>
            {{ item.reprinted }}
            <van-tag type="primary" plain>
              {{ item.scienceType }}
            </van-tag>
          </p>
          <span>{{ dayjs(item.createTime - 0).format('YYYY-MM-DD') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { getHomeScience } from '@/util/homeMainHttp.js'
const newsList = ref([])
getHomeScience().then(res => {
  newsList.value = res.data.info.data
})
</script>
<style lang="scss" scoped>
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
    }

    .info {
      display: flex;
      justify-content: space-between;
      color: #888;
      font-style: 12px;
    }
  }
}
</style>