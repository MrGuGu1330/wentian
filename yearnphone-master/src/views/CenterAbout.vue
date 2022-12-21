<template>
  <div v-if="data.contact">
    <van-nav-bar title="关于我们">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <h3 class="avatar">
      <van-image width="60px" height="60px" fit="cover" position="center" src="ht.svg" />
    </h3>
    <h3 class="aboutTitle">{{data.title}}</h3>
    <p class="info">{{data.info}}</p>
    <h4>联系我们</h4>
    <div class="contact">
      <p>电话：{{data.contact.split(';')[0]}}</p>
      <p>邮箱：{{data.contact.split(';')[1]}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getCenterData } from '@/util/center.js'
const data = ref({})
getCenterData().then(res => {
  data.value = res.data.info.data[0]
})

</script>

<style lang="scss" scoped>
.avatar {
  text-align: center;
  margin: 20px;
}
.aboutTitle {
  color: #333;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
}
p {
  color: #333;
  font-size: 16px;
  padding: 0 15px;
  margin: 10px 0;
  line-height: 1.5;
}
h4 {
  padding: 0 15px;
  font-weight: 700;
}
.info {
  text-indent: 24px;
  margin: 30px 0;
}
.contact {
  p {
    font-size: 14px;
  }
}
</style>