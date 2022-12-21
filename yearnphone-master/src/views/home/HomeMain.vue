<template>
  <div>
    <div class="banner">
      <home-banner></home-banner>
    </div>
    <div class="title">航天英雄</div>
    <div class="hero">
      <home-hero></home-hero>
    </div>

    <div class="title">科普精选<span @click="$router.push('/home/science')">更多</span></div>
    <div>
      <home-science></home-science>
    </div>
    <div class="title">新闻精选
      <span @click="$router.push('/home/news')">更多</span>
    </div>
    <div class="news">
      <home-news></home-news>
    </div>
  </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
}
.hero {
  height: 12.5rem;
}
</style>

