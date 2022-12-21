<template>
  <div>
    <transition name="fadeChange" appear mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>