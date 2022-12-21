<template>
  <div class="rightHeader">
    <span @click="screen">
      <div id="lottie"></div>
    </span>
  </div>
</template>
<script>
import screenfull from "screenfull";
import lottie from "@/utils/lottie.js";
import one from "@/utils/car-loading2-data.js";
export default {
  name: "fullScreen",
  data() {
    return {
      fullScreen: false,
    };
  },
  mounted() {
    // 使用lottie
    const anim = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg", // 渲染方式：svg：支持交互、不会失帧；canvas、html：支持3D，支持交互
      loop: true, // 循环播放：默认为true
      autoplay: false, // 自动播放：默认为true
      // assetsPath:'images/',//图片文件夹的路径(这里可以设置图片地址，如果设置了最终是在这个路径下找图片)
      animationData: one, // 变量名（还记得上面声明变量接收的json文件吧，跟那个接收的名字要一样）
    });

    // 然后就是把这段代码放在你想要运行的时候，比如想要在加载之后就执行，那就放在以下代码里
    setTimeout(() => {
      anim.play();
    });
  },
  methods: {
    screen() {
      // 如果不允许进入全屏，发出不允许提示
      if (screenfull.isEnabled) {
        screenfull.toggle();
        this.fullScreen = !this.fullScreen;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rightHeader {
  position: absolute;
  z-index: 999;
  cursor: pointer;
  animation: move 60s infinite linear;
}
#lottie {
  width: 80px;
  height: 70px;
}
@keyframes move {
  0% {
    right: 70%;
  }
  50% {
    right: 10%;
    transform: rotate(0);
  }
  51% {
    right: 5%;
    transform: rotateY(180deg);
  }
  99% {
    transform: rotateY(180deg);
    right: 70%;
  }
  100% {
    transform: rotate(360deg);
    right: 75%;
  }
}
</style>
