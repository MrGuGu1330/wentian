<template>
  <div ref="chart1" style="width: 100%; height: 430px"></div>
</template>

<script>
import { getAllUser } from "@/utils/http.js";
export default {
  name: "ArticleContribution",
  data () {
    return {
      dataList: [],
    };
  },
  mounted () {
    this.getData();
  },
  props: ["homeData"],
  methods: {
    getData () {
      getAllUser().then((res) => {
        let data = res.data.data.data.map((item) => [
          new Date(item.createTime - 0).getDay(),
          new Date(item.createTime - 0).getHours(),
          new Date(item.createTime - 0).getDate(),
        ]);
        data = data.map((item) => {
          let num = 0;
          data.forEach((e) => {
            e[2] === item[2] && num++;
          });
          return [...item, num];
        });
        data.forEach((item) => item.splice(2, 1));
        this.dataList = data;
        this.$nextTick(() => {
          this.getEchartData1();
        });
      });
    },
    getEchartData1 () {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);

        const hours = [
          "12a",
          "1a",
          "2a",
          "3a",
          "4a",
          "5a",
          "6a",
          "7a",
          "8a",
          "9a",
          "10a",
          "11a",
          "12p",
          "1p",
          "2p",
          "3p",
          "4p",
          "5p",
          "6p",
          "7p",
          "8p",
          "9p",
          "10p",
          "11p",
        ];

        const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        const dataList = this.dataList.map(function (item) {
          return [item[1], item[0], item[2] || "-"];
        });
        const option = {
          tooltip: {
            position: "top",
          },
          grid: {
            height: "50%",
            top: "10%",
          },
          xAxis: {
            type: "category",
            data: hours,
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: "category",
            data: days,
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: "horizontal",
            left: "center",
            bottom: "15%",
          },
          series: [
            {
              name: "注册用户数",
              type: "heatmap",
              data: dataList,
              label: {
                show: true,
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
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