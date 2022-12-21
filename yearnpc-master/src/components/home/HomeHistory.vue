<template>
  <div>
    <div class="historyTitle">航天历史</div>
    <div class="body-content">
      <div id="flipbook">
        <div class="hard"></div>
        <div class="hard" style="background-position: -471px 0;"></div>

        <div class="hard " style="background-position: -942px 0;"></div>
        <div class="hard " style="  background-position: -1413px 0;"></div>
      </div>
    </div>
  </div>

</template>

<script>
import $ from "jquery";

import turn from '@/util/turn.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getHistorty } from '@/util/MainHttp.js'
export default {
  data () {
    return {
      value: "",
      page: 1,
      allPages: [

      ]
    };
  },

  mounted () {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.historyTitle', {
      // 页面滚动开始触发
      scrollTrigger: {
        // 目标
        start: "top center",
        end: "top 100px",
        trigger: ".historyTitle",
        // pin: ".Sciencetitle",
        scrub: true, // 0.5, 以秒计算
      },

      duration: 1,
      opacity: 0,
      x: 400
    });
    this.initBook()
    this.getBookInfo()
  },
  methods: {
    getBookInfo () {
      getHistorty().then(res => {
        this.allPages.push(...res.data.info.data.map((item, index) => ({ ...item, page: index + 3 })))

        this.allPages.forEach(item => {
          let html = `  
          <div class="info">
           <div :class="${item.page % 2 == 0 ? 'odd' : 'even'
            }" class="text">
            <div class="bookInfo">${item.info}</div>
          </div>
          </div >`

          $('#flipbook ').turn('addPage', html, item.page)
        }
        )



        gsap.from('.body-content', {
          // 页面滚动开始触发
          scrollTrigger: {
            // 目标
            start: "top 100",
            trigger: ".body-content",
          },
          onStart: () => {
            $("#flipbook").turn("previous").turn("previous")

          },
          onComplete: () => {
            $("#flipbook").turn("next")

          },
          duration: 2,
          scale: 1.2
        });
      })
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
        // pages: self.allPages.length,
        pages: 100,
        width: 942,
        height: 600,
        // 监听事件 when 当，
        when: {
          turned: (e, page) => {
            if (this.allPages.length + 2 === page) {
              if (this.allPages.length) this.$router.push('/home/history')
            }
          }
        }

      });
    }
  }
}
</script>
<style>
</style>
<style lang="scss">
.info {
  font-size: 12px;
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
}
#flipbook {
  width: 942px;
  height: 600px;
  margin: 0 auto !important;
  color: #666;
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
  writing-mode: tb-rl;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 47px;
}
.hard {
  background-image: url(@/assets/sbj.jpg) !important;
}
</style>
<style lang="scss" scoped>
.historyTitle {
  width: 500px;
  font-size: 100px;
  color: #fff;
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
  color: #f1ebe5;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 150px;
}

* {
  box-sizing: border-box;
}
</style>