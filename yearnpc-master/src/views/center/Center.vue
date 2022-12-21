<template>
  <div>
    <home-bg></home-bg>

    <div class="center">
      <header class="w">
        <div>
          <el-image style="width: 150px; height: 150px;margin-left: 20px;" :src="this.$urlBase +userBase.avatar"
            fit="cover">
          </el-image>
        </div>
        <div class="info">
          <p>{{this.userBase.username}}</p>
          <p class="createTime">{{dayjs(this.userBase.createTime-0).format("YYYY-MM-DD")}}</p>
          <p class="email">邮&ensp;箱: &emsp;{{this.userBase.email}}</p>
        </div>
      </header>
      <div class="centerInfo w">
        <el-tabs tab-position="right" style="height: 500px;">
          <el-tab-pane label="编辑信息">
            <div class="infoLeft">
              <center-editor></center-editor>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            <div class="infoLeft password">
              <div class="rockets"></div>

              <center-passwrod></center-passwrod>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { Image, TabPane, Tabs } from 'element-ui';
import Vue from 'vue'
import { mapState } from 'vuex'
import HomeBg from '@/components/home/HomeBg.vue';
import CenterEditor from '@/components/center/CenterEditor.vue';
import CenterPasswrod from '@/components/center/CenterPasswrod.vue';
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Image)
export default {
  components: { HomeBg, CenterEditor, CenterPasswrod },
  data () {
    return {
      dayjs
    }
  },
  computed: {
    ...mapState(['userBase'])
  },

}
</script>
<style lang="scss">
.el-tabs__nav-wrap {
  width: 200px;
  background: rgba($color: #252c37, $alpha: 1);
}
.el-tabs__item {
  color: #fff;
}
</style>
<style lang="scss" scoped>
.rockets {
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 200px;
  height: 200px;
  background-image: url(@/assets/password.gif);
  background-repeat: no-repeat;
  background-size: 200px;
  transform: rotate(-25deg);
  animation: rocketsMove 10s infinite linear;
}
@keyframes rocketsMove {
  0% {
    transform: translateX(200px);
  }

  49% {
    transform: translateX(-1000px) translateY(-150px);
  }
  50% {
    transform: translateX(-1000px) translateY(-150px) rotateY(180deg);
  }
  99% {
    transform: translateX(100px) translateY(-300px) rotateY(180deg);
  }
  100% {
    transform: translateX(200px) translateY(-300px) rotateY(180deg);
  }
}
.infoLeft {
  position: relative;
  width: 1000px;
  margin-top: 20px;
  margin-left: 10px;
  height: 500px;
  overflow: auto;
  background: rgba($color: #252c37, $alpha: 0.5);
}

.center {
  padding-top: 100px;
  background: url("@/assets/宇航员巴布亚新几内亚34\(astronaut_PNG34.p_爱给网_aigei_com.png") -260px -10px
    no-repeat;
  background-size: 900px auto;
}

.centerInfo {
  padding-top: 20px;
}
header {
  display: flex;
  padding-top: 20px;
  height: 200px;
  background: #252c37;
  .info {
    p {
      margin: 0 30px 0;
    }
    .createTime {
      font-size: 14px;
      color: #888;
      margin: 5px 30px;
    }
    .email {
      margin-top: 40px;
      font-size: 16px;
      color: #5788fe;
    }
  }
}
</style>