<template>
  <div id="china_map" style="width: 100%; height: 100%"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/map/js/china");
export default {
  name: "Satellite",
  mounted() {
    // 初始化echarts实例
    this.chinachart = echarts.init(document.getElementById("china_map"));
    // 进行相关配置
    this.chartOption = {
      visualMap: {
        // 左下角的颜色区域
        type: "piecewise", // 定义为分段型 visualMap
        min: 0,
        max: 1000,
        itemWidth: 40,
        bottom: 60,
        left: 20,
        pieces: [
          // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
          { gt: 900, lte: 1000, label: "酒泉卫星发射中心", color: "#6ad86e" }, // (900, 1000]
          { gt: 500, lte: 900, label: "西昌卫星发射中心", color: "#9adcfa" }, // (500, 900]
          { gt: 310, lte: 500, label: "太原卫星发射中心", color: "#ffeb3b" }, // (310, 500]
          { gt: 200, lte: 300, label: "文昌卫星发射中心", color: "#ff9800" }, // (200, 300]
          { gt: 10, lte: 200, label: "中国东方航天港", color: "orangered" }, // (10, 200]
          { value: 0, label: "无数据", color: "#999" }, // [0]
        ],
      },
      // geo配置详解： https://echarts.baidu.com/option.html#geo
      geo: {
        // 地理坐标系组件用于地图的绘制
        map: "china", // 表示中国地图
        // roam: true, // 是否开启鼠标缩放和平移漫游
        zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
        label: {
          show: true,
        },
        itemStyle: {
          // 地图区域的多边形 图形样式。
          borderColor: "rgba(0, 0, 0, 0.2)",
          emphasis: {
            // 高亮状态下的多边形和标签样式
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          type: "map",
          geoIndex: 0,
          label: {
            show: true,
          },
          // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
          data: [
            {
              name: "山东",
              value: 142,
              jidi: "中国东方航天港",
            },
            {
              name: "甘肃",
              value: 999,
              jidi: "酒泉卫星发射中心",
            },
            {
              name: "海南",
              value: 292,
              jidi: "文昌卫星发射中心",
            },
            {
              name: "四川",
              value: 810,
              jidi: "西昌卫星发射中心",
            },
            {
              name: "山西",
              value: 453,
              jidi: "太原卫星发射中心",
            },
          ],
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
        formatter: (p) => {
          let dataCon = p.data;
          if (!dataCon) dataCon = { name: "该省没有", jidi: "暂无基地" };
          let txtCon = `${p.name} <br/> ${dataCon.jidi}`;
          return txtCon;
        },
      },
    };
    // 使用刚指定的配置项和数据显示地图数据
    this.chinachart.setOption(this.chartOption);
  },
};
</script>

<style lang="scss" scoped>
</style>