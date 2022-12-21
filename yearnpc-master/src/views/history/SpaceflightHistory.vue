<template>
  <div class="historyMain">
    <div class="historyTitle">航天历史</div>
    <div class="turn-banner">
      <div class="body-content">
        <div id="flipbook">
          <div class="hard"></div>
          <div class="hard" style="background-position: 200px 100px"></div>
          <div v-for="(item, index) in allPages" :key="`test_${index}`" class="info">
            <div :class="(item.page%2==0) ? 'odd' : 'even'" class="text">
              <!-- <h3>{{item.title}}</h3> -->
              <div class="bookInfo" v-html="item.info"></div>

            </div>
          </div>
          <div class="hard " style="background-position: -942px 0;"></div>
          <div class="hard " style="  background-position: -1413px 0;"></div>
        </div>

      </div>
      <div class="slider-bar" style="margin-top: 50px;">
        <div v-for="(item, index) in allPages" :key="index" class="slider"
          :class="{ 'slider-current': index + 1 == currentPage }" @click="toPage(index)"></div>
      </div>
    </div>

  </div>

</template>

<script>
import $ from "jquery";

import turn from '@/util/turn.js'
import { getHistortyData } from '@/util/HistoryHttp.js'
export default {
  data () {
    return {
      value: "",
      page: 1,
      currentPage: 1,
      allPages: [

      ]
    };
  },

  mounted () {
    this.getBookInfo()
  },
  methods: {
    getBookInfo () {
      getHistortyData('10000').then(res => {
        let data = res.data.info.data.map((item, index) => ({ ...item, page: index + 2 }))
        this.allPages.push(...data)

        console.log(this.allPages);
        this.$nextTick(() => {

          this.initBook()
        })

      }).catch(err => err)
    },
    initBook () {
      // 书的
      let self = this;
      $("#flipbook").turn("center");
      $("#flipbook").turn("page");
      // $('#flipbook').turn('page', 1).turn('stop');
      $("#flipbook").turn({
        //显示模式 (只显示一页 single, 两个页面 double)
        display: "double",
        elevation: 50,
        //	持续时间，单位毫秒。如果你设置为 0, 不会有过渡效果
        duration: 1000,
        // 显示渐变阴影
        gradients: true,
        //中心翻取决于有多少页面可见 true or false
        autoCenter: true,
        // 加速模式 ture or false。（必须在移动端）
        // acceleration: true,
        // 设置页面当前的数量
        page: self.page,
        // 设置全部页数
        pages: self.allPages.length,
        width: 1131,
        height: 720,
        page: 1,
        // 监听事件 when 当，
        when: {
          turning: (target, page) => {
            // console.log(target,page);
            this.currentPage = page
          }

        }

      });

    },
    toPage (index) {
      // this.currentPage = index
      $('#flipbook').turn('page', index + 3) //进度条跳转到对应的页数
    }

  }
}
</script>
<style lang="scss">
.historyMain {
  .info {
    font-size: 15px;
  }
}
</style>
<style lang="scss" scoped>
.turn-banner {
  .body-content {
    display: flex;
    margin: 0px auto;
    overflow: hidden;
  }
}
.slider-bar {
  width: 1120px;
  height: 8px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  overflow: hidden;
  margin: 0 auto;

  .slider {
    flex: 1;
    cursor: pointer;
  }
  .slider-current {
    background-color: rgb(22, 211, 164);
    border-radius: 5px;
  }
}
.historyTitle {
  width: 500px;
  font-size: 100px;
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  color: transparent;
  font-weight: bold;
  letter-spacing: 2px;
}

.hard {
  background: url(@/assets/hai.jpg) right bottom no-repeat !important;
}

* {
  box-sizing: border-box;
}

.text {
  overflow: hidden;
  width: 460px;
  height: 582px;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 20px;
  transform-origin: 0% 100%;
  padding: 20px;
}
.odd {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0.95, #fff),
    color-stop(1, #dadada)
  );

  background-image: -webkit-linear-gradient(left, #fff 95%, #dadada 100%);
}
.even {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0.95, #fff),
    color-stop(1, #dadada)
  );

  background-image: -webkit-linear-gradient("right", #dadada 5%, #fff 0%);
}

.current-page {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
}
#flipbook {
  width: 942px;
  height: 600px;
  margin: 0 auto !important;
  color: rgb(8, 8, 8);
}
.even-numbers {
  width: 30px;
  height: 30px;
  color: #888;
  right: 0;
  position: absolute;
  bottom: 0px;
  line-height: 30px;
  text-align: center;
}
.odd-number {
  position: absolute;
  bottom: 0px;
  width: 30px;
  height: 30px;
  color: #888;
  line-height: 30px;
  text-align: center;
}

#flipbook .turn-page {
  background-color: white;
  background-size: 100% 100%;
}
.bookmark {
  margin: 0 auto;
  font-size: 20px;
  writing-mode: tb-rl;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 47px;
}
</style>