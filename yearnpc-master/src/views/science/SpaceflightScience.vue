<template>
  <div class="science w">
    <div class="wrapper">
      <!-- 懒加载设置 -->
      <lazy @lazyHandle="lazyHandle" :isLoad="isLoad" :finish="finish">
        <div class="task-container">
          <!--遍历任务列表-->
          <div v-for="(item, index) in taskData" :key="index" class="tasks" id="taskData" @click="handleGo(item._id)">
            <div class="task-div">
              <!--任务标签-->
              <span :style="{
                backgroundColor:
                  tagColorList[Math.floor(Math.random() * tagColorList.length)],
              }" v-for="tag in item.scienceType" :key="tag">{{ tag }}
              </span>
              <div class="taskImg">
                <img v-if="item.bg" :src="$urlBase + item.bg" />
              </div>
              <h1>{{ item.title }}</h1>
              <p style="font-size: 12px">
                {{ dayjs(item.createTime - 0).format("YYYY-MM-DD") }}
              </p>
              <p>{{ item.reprinted }}</p>
            </div>

          </div>
        </div>
      </lazy>
    </div>
  </div>
</template>
<script>

import { getHomeScience } from "@/util/ScienceHttp";
import dayjs from "dayjs";
// 引入懒加载组件
import Lazy from '@/components/Lazy.vue'


export default {
  // 使用懒加载组件
  components: { Lazy },

  data() {
    return {
      taskData: [],
      tagColorList: [
        "#015A91",
        "#2D80B3",
        "#E1B4D7",
        "#FA7987",
        "#E66562",
        "#9D92D8",
        "#8C273D",
        "#B8AFB4",
        "#5B7397",
        "#003361",
        "#003361",
      ],
      dayjs: dayjs,
      // 定义懒加载
      page: 1,
      isLoad: true,
      finish: false
    };
  },
  mounted() {

  },
  methods: {
    lazyHandle() {
      this.isLoad = false
      getHomeScience(this.page++).then((res) => {
        this.taskData.push(...res.data.info.data)
        this.taskData.length >= res.data.info.count && (this.finish = true)
        this.$nextTick(() => {
          this.isLoad = true
        })
      });
    },
    handleGo(id) {
      this.$router.push(`/home/sciencedetials?id=${id}`)
    }
  }


};
</script>

<style lang="scss" scoped>
/* .lazy {

} */
.wrapper {
  position: relative;
  margin: 0px auto;
  width: 98%;

  .task-container {
    margin: auto;
    width: 100%;
    column-count: 4;
    /*表示分割的列数 */
    column-gap: 0px;

    /*表示列之间的间隔*/
    .tasks {
      width: 250px;
      overflow: hidden;
      break-inside: avoid;
      /*防止元素内部断裂成第二列*/
      margin: 0px 20px 30px 20px;
      background-color: #eff6ff;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;

      .taskImg {
        max-height: 500px;
        overflow: hidden;
      }

      h1 {
        color: #666;
        font-size: 18px;
        font-weight: 900;
      }

      .task-div {
        span {
          margin: 10px 10px 10px 0px;
          padding: 3px 5px;
          background-color: #ffe5d3;
          border-radius: 5px;
        }

        img {
          margin: 10px auto;
          width: 100%;
          // height: 145px;
          // max-height: 200px;
          border-radius: 10px;
        }

        p {
          width: 100%;
          color: #aaa;
          margin: 5px 0px 10px 0px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        a {
          padding: 10px 0px 0px 0px;
          text-decoration: none;
          color: #4c33e6;
        }
      }
    }
  }
}

.wrapper::-webkit-scrollbar {
  /*滚动条整体*/
  width: 5px;
  height: 5px;
}

.wrapper::-webkit-scrollbar-track {
  /*滑轨*/
  background-color: #ccc;
  border-radius: 30px;
}

.wrapper::-webkit-scrollbar-thumb {
  /*滑块*/
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  cursor: pointer;
}

.science {
  padding-top: 100px;
  position: relative;
}
</style>