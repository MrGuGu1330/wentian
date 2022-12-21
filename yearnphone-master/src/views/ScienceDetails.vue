<template>
  <div>
    <van-nav-bar title="科普小知识" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="science">
      <h3>{{ details.title }}</h3>
      <p class="reprinted">
        <span class="rep">来源：{{ details.reprinted }}</span>
        <span>标签: {{ details.scienceType }}</span>
      </p>
      <p class="reprinted">{{ dayjs(details.createTime - 0).format('YYYY-MM-DD HH:mm') }}</p>
      <div class="info" v-html="details.info"></div>
    </div>
    <details-comment :articleId="$route.query.id" :articleTitle="details.title" articleType="科普" v-if="details.title">
    </details-comment>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getScienceDeatils } from '@/util/homeMainHttp.js'
import dayjs from 'dayjs';
import DetailsComment from '@/components/details/DetailsComment.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const details = ref({})
getScienceDeatils(route.query.id).then(res => {
  details.value = res.data.info[0]
})
function onClickLeft () {
  router.back()
}
</script>
<style lang="scss">
.science img {
  max-width: 90% !important;
  height: auto !important;
}
.science {
  .info {
    font-size: 15px;
  }
}
</style>
<style lang="scss" scoped>
.science {
  padding: 20px;

  .reprinted {
    display: flex;
    color: #888;
    font-size: 12px;
    justify-content: center;
    margin-bottom: 8px;

    .rep {
      margin-right: 30px;
    }
  }
}

h3 {
  font-size: 16px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
