<template>
  <div>
    <div ref="chart1" style="width: 100%; height: 376px"></div>
  </div>
</template>

<script>
import { getHomePageScience } from "@/utils/http.js";

export default {
  name: "ScienceArticle",
  data() {
    return {
      dataList1: [],
      dataList2: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getHomePageScience().then((res) => {
        this.dataList1 = res.data.info.map((item) => {
          return item.scienceLable;
        });
        this.dataList2 = res.data.info.map((item) => {
          return { value: item.articleCount, name: item.scienceLable };
        });
        this.$nextTick(() => {
          this.getEchartData1();
        });
      });
    },
    getEchartData1() {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);
        const option = {
          legend: {
            orient: "vertical",
            x: "left",
            data: this.dataList1,
          },
          series: [
            {
              type: "pie",
              data: this.dataList2,
              roseType: "area",
            },
          ],
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