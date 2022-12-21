<template>
  <div>
    <div ref="chart1" style="width: 100%; height: 376px"></div>
  </div>
</template>

<script>
import { getHomePage } from "@/utils/http.js";
export default {
  name: "NumberArticles",
  data() {
    return {
      // scienceCount: 0,
      // historyCount: 0,
      dataList: [],
    };
  },
  mounted() {
    this.getData();
  },
  props: ["homeData"],
  methods: {
    getData() {
      this.adminCount = this.homeData[3].admin;
      this.astrinautCount = this.homeData[5].astrinaut;
      this.flowCount = this.homeData[1].flow;
      this.scienceCount = this.homeData[0].science;
      this.newsCount = this.homeData[2].news;
      this.historyCount = this.homeData[4].history;
      this.dataList.push(
        this.scienceCount,
        this.historyCount,
        this.flowCount,
        this.newsCount,
        this.astrinautCount
      );
      this.getEchartData1();
    },
    getEchartData1() {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);
        const option = {
          xAxis: {
            data: [
              "科普文章",
              "历史文章",
              "流程文章",
              "新闻文章",
              "航天员文章",
            ],
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: this.dataList,
              // showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
              },
            },
          ],
          tooltip: {
            // 鼠标悬浮提示框显示 X和Y 轴数据
            backgroundColor: "rgba(32, 33, 36,.7)",
            borderColor: "rgba(32, 33, 36,0.20)",
            borderWidth: 1,
            textStyle: {
              // 文字提示样式
              color: "#fff",
              fontSize: "12",
            },
          },
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
  },
  watch: {},
  created() {},
};
</script>

<style lang="scss" scoped>
</style>