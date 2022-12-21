<template>
  <div class="home">
    <home-header @handleShowLogin='handleShowLogin'></home-header>
    <!-- 首页路由 -->
    <transition name="fade" appear mode="out-in">
      <router-view></router-view>
    </transition>
    <footer>
      <div class="landscapeBottom ">
        <img :src="`${$urlBase}singleUploads/frontpcImg.jpg`" alt="">
      </div>
      <div class="footer" v-html="homeList.footer">
      </div>
    </footer>
    <transition mode="out-in" name="loginShow">
      <div class="login" v-show="loginShow">
        <div class="cloneLogin" @click="loginShow=false">X</div>
        <div class="login3D " ref="login3D">
          <div class="loginFront">
            <home-login @handleRegister='handleRegister' @handleShowLogin='handleShowLogin'></home-login>
          </div>
          <div class="loginEnd">
            <home-register @handleRegister='handleRegister'></home-register>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeLogin from '@/components/home/HomeLogin.vue'
import HomeRegister from '@/components/home/HomeRegister.vue'
import { mapMutations, mapState } from 'vuex'
import { getHomeData } from '@/util/MainHttp.js'

export default {
  data () {
    return {
      loginShow: false,
    }
  },
  computed: {
    ...mapState(['homeList', 'showLogin'])
  },
  watch: {
    showLogin (value) {
      this.loginShow = value
    }
  },
  methods: {
    ...mapMutations(['HomeList']),
    handleShowLogin () {
      this.loginShow = !this.loginShow
    },
    handleRegister (angle) {
      // transform: rotateY(180deg);
      this.$refs.login3D.style.transform = `rotateY(${angle}deg)`
    }
  },
  components: { HomeHeader, HomeLogin, HomeRegister },
  mounted () {
    getHomeData().then(res => {
      this.HomeList(...res.data.info.data)
    })
  },
}
</script>

<style lang="scss" scoped>
.cloneLogin {
  position: absolute;
  right: -20px;
  top: -20px;
  cursor: pointer;
  color: #888;
}
// 显示和隐藏
.loginShow-enter-active {
  animation: isDemo 1s reverse;
}
.loginShow-leave-active {
  animation: isDemo 1s;
}
@keyframes isDemo {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
.landscapeBottom {
  position: relative;
  width: 100%;
  height: 230px;
  background: url("@/assets/xkbg.png") no-repeat bottom center;
  background-size: 1000px auto;
  img {
    position: absolute;
    bottom: -100px;
    right: 0;
    width: 100px;
    height: 100px;
  }
}
.footer {
  display: flex;
  // width: 200px;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100px;
  background: #000;
  // position: absolute;
  bottom: 0;
  right: 300px;
  text-align: center;
  a {
    color: #fff;
  }
}
.home {
  background: linear-gradient(to top left, #000000 0%, #5788fe 100%);
}
.login {
  position: fixed;
  top: 100px;
  left: 50%;
  margin-left: -250px;
  width: 500px;
  height: 400px;
  z-index: 20;
  perspective: 500px;
  .login3D {
    width: 500px;
    height: 450px;
    position: relative;
    transition: all 1s;
    transform-style: preserve-3d;
    background-color: #5788fe;
    background-image: radial-gradient(
        white,
        rgba(255, 255, 255, 0.2) 2px,
        transparent 40px
      ),
      radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 30px),
      radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 40px),
      radial-gradient(
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0.1) 2px,
        transparent 30px
      );
    background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
  }

  .loginFront {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    backface-visibility: hidden;
  }
  .loginEnd {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }
}
</style>