<template>
  <div class="w">
    <!-- 顶部 -->
    <div class="top">
      <div>REGARDING <span>OUR</span></div>
      <div>
        <span>——— </span>
        &nbsp;&nbsp;&nbsp;
        您可以随时联系我们
        &nbsp;&nbsp;&nbsp;
        <span>——— </span>
      </div>
    </div>
    <!-- 下方内容 -->
    <div class="box">
      <!-- 左侧内容 -->
      <div class="left">
        <div>
          <div>电话:</div>
          <div><i class="el-icon-phone-outline"></i>&nbsp;&nbsp;&nbsp;+{{ datas.phone }}</div>
        </div>
        <div>
          <div>邮箱:</div>
          <div><i class="el-icon-message"></i>&nbsp;&nbsp;&nbsp;{{ datas.email }}</div>
        </div>
        <div>

        </div>
        <div>
          <div>{{datas.title}}:</div>
          <div><i class="el-icon-info"></i>&nbsp;&nbsp;&nbsp;{{ datas.info }}
            <!-- <img width="100px" height="40px" :src="$urlBase +file" alt=""> -->
          </div>
        </div>
        <div>

          <svg t="1669353293489" class="icon" @click="handleShow('微信')" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4243" width="200" height="200">
            <path
              d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
              fill="#28C445" p-id="4244"></path>
            <path
              d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
              fill="#28C445" p-id="4245"></path>
          </svg>
          <svg t="1669353754487" @click="handleShow('qq')" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="6508" width="200" height="200">
            <path
              d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z"
              fill="#FAAD08" p-id="6509"></path>
            <path
              d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z"
              fill="#FAAD08" p-id="6510"></path>
            <path
              d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z"
              fill="#000000" p-id="6511"></path>
            <path
              d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017"
              fill="#000000" p-id="6512"></path>
            <path
              d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453"
              fill="#FFFFFF" p-id="6513"></path>
            <path
              d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498"
              fill="#FAAD08" p-id="6514"></path>
            <path
              d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135"
              fill="#000000" p-id="6515"></path>
            <path
              d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927"
              fill="#FFFFFF" p-id="6516"></path>
            <path
              d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574"
              fill="#EB1C26" p-id="6517"></path>
            <path
              d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z"
              fill="#EB1C26" p-id="6518"></path>
          </svg>

        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <div>
          如果您有任何建议、商业合作，甚至想说声“ Hello ..”，
          请填写下面的表格,我们会尽快给您答复。
        </div>
        <div>
          <div>
            <el-input v-model="username" placeholder="请输入您的姓名" class="inp"></el-input>
            <el-input v-model="email" placeholder="请输入您的邮箱" class="inp"></el-input>
          </div>
          <el-input v-model="opinion" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
          <div>
            <el-button type="primary" round class="btn" @click="handleSend">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <Map ref="map" @updateLocation="updateLocation" class="plat" :location="datas.location" />
  </div>
</template>
<script>
import { Input, Button } from 'element-ui';
import { getRegardingOur } from '@/util/MainHttp'
import Map from "@/components/map/aliMap.vue";
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { addMessage } from '@/util/comment.js'
Vue.use(Input)
Vue.use(Button)
export default {
  name: 'SpaceflightAbout',
  components: {
    Map,
  },
  computed: {
    ...mapState(['userBase'])
  },
  data () {
    return {
      username: '',
      email: '',
      opinion: '',

      datas: {
        phone: '',
        email: '',
        title: ''
      },
      Addr: '杭州',
      file: ''
    }
  },

  methods: {
    ...mapMutations(['ChangeShowLogin']),
    handleSend () {
      if (!this.username || !this.email || !this.opinion) {
        this.ChangeShowLogin(true)
      } else {
        addMessage(this.opinion, this.username, this.email).then(res => {
          this.opinion = ''
          this.$message.success(res.data.info)
        })
      }

    },
    handleShow (msg) {
      if (msg === 'qq') {
        this.$message.success(this.datas.email.split('@')[0])

      } else {
        this.$message.success(this.datas.phone)


      }
    },
    updateLocation (Addr) {
      this.Addr = Addr.orgAddr
    },
  },

  mounted () {
    if (this.userBase.email) {
      this.username = this.userBase.username
      this.email = this.userBase.email
    }
    getRegardingOur().then(res => {

      this.file = res.data.info.file
      this.datas = res.data.info.data[0]
      this.datas.phone = this.datas.contact.split(';')[0]
      this.datas.email = this.datas.contact.split(';')[1];

    });
  },
}
</script>

<style lang="scss" scoped>
.w {
  > .top {
    padding-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 80px;

    > div:nth-child(1) {
      font-size: 52px;
      margin-bottom: 20px;

      > span {
        color: #daa520;
      }
    }

    > div:nth-child(2) {
      font-size: 18px;

      > span {
        color: #daa520;
        font-weight: bold;
      }
    }
  }

  > .box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .left {
      width: 600px;

      > div {
        margin-bottom: 30px;

        > div {
          margin-bottom: 10px;
          padding: 0 60px;
        }
      }

      > div:nth-child(5) {
        padding: 0px 60px;
        height: 154px;

        > .icon {
          width: 50px;
          margin-left: 20px;
        }
      }
    }

    > .right {
      height: 600px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0px 20px;

      > div:nth-child(2) {
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .inp {
          width: 300px;
        }

        > div:nth-child(1) {
          display: flex;
          flex-direction: column;
          height: 120px;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>