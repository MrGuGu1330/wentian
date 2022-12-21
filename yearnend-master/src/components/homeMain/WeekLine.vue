<template>
  <div>
    <div ref="chart1" style="width: 100%; height: 376px"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "WeekLine",
  data () {
    return {
      dataList1: [],
      dataList2: [],
    };
  },
  props: ["homeData"],
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      this.dataList1 = this.homeData[6].map((item) => {
        return item.createTime
          .split("/")
          .map((item, i) => {
            i === 0 && (item = item - 0 + 1);
            return item;
          })
          .join("-");
      });
      this.dataList2 = this.homeData[6].map((item) => {
        return item.visits;
      });

      this.$nextTick(() => {
        this.getEchartData1();
      });
    },
    getEchartData1 () {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);
        const option = {
          title: {},
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["访问量"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.dataList1,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "访问量",
              type: "line",
              stack: "Total",
              data: this.dataList2,
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
  created () { },
};
</script>

<style lang="scss" scoped>
</style>