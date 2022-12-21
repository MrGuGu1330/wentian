<template>
  <div>
    <transition name="fadeChange" appear mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>