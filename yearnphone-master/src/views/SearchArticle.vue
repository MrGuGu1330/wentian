<template>
  <div class="search">
    <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词" @keyup="onSearch" @cancel="onCancel" />
    <div class="searchInfo">
      <div v-show="searchValue">
        <p class="searchValueList" v-for="item in data.articleList" :key="item._id"
          @click="item.releaseTime ? $router.push(`/news-details?id=${item._id}`):$router.push(`/science-details?id=${item._id}`)">
          <span>
            <van-icon name="search" size="18" />
            <span v-html="item.title"></span>
          </span>
        </p>
        <van-empty v-show="!data.articleList.length" description="没找到相关文章哦" />
      </div>
      <div v-show="!searchValue">
        <h3>热门新闻</h3>
        <div class="info">
          <p v-for="item in data.newsList" :key="item._id" @click="$router.push(`/news-details?id=${item._id}`)">
            <span>{{item.title}}</span>
          </p>
        </div>
        <h3>热门科普</h3>
        <div class="info">
          <p v-for="item in data.scienceList" :key="item._id" @click="$router.push(`/science-details?id=${item._id}`)">
            <span>{{item.title}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

import { getHomeNews, getHomeScience } from '@/util/homeMainHttp.js'
const router = useRouter()

const data = reactive({
  newsList: [],
  scienceList: [],
  articleList: []
})
getHomeNews(1, 2).then(res => {
  data.newsList = res.data.info.data
})
getHomeScience(1, 3).then(res => {
  data.scienceList = res.data.info.data
})
const searchValue = ref('')

let timer = null
function onSearch () {
  if (!searchValue.value) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    let res1 = await getHomeNews(1, 20, { title: searchValue.value })
    let res2 = await getHomeScience(1, 20, { title: searchValue.value })
    let arr = [...res1.data.info.data, ...res2.data.info.data]

    const regExp = new RegExp(searchValue.value, 'g')

    data.articleList = arr.map(item => {
      let title = item.title.replace(regExp, `<span style="color: red;">${searchValue.value}</span>`)

      return { ...item, title, }
    })


  }, 500)
}
function onCancel () {
  router.back()
}

</script>

<style lang="scss" >
.van-search__content {
  background: #eee;
  border-radius: 50px;
}
</style>
<style lang="scss" scoped>
.search {
  padding: 2px 5px;
}
.searchValueList {
  padding-left: 10px;
}
.searchInfo {
  padding: 10px;
  h3 {
    margin: 20px 0 0 -5px;
    color: #000;
    font-weight: 700;
    font-size: 15px;
  }
  p {
    color: #333;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    height: 26px;
    border: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    width: 100%;
    margin: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 26px;
    display: inline-block;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-width: 0px;
    border-radius: 5px;
    padding: 0 5px;
  }
  .info {
    margin-top: 30px;
  }
}
</style>