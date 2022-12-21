<template>
  <div class="mapsvip">
    <div>
      <div>
        <!-- 地图 -->
        <el-amap class="amap-box" :zoom="amap.zoom" :center="amap.center" :plugin="amap.plugin" :events="amap.events">
          <!-- 当前位置图标 -->
          <el-amap-marker v-for="(marker, index) in amap.markers" :key="'marker' + index" :position="marker.position" />
          <!-- 位置名称显示 -->
          <el-amap-text v-for="(marker, index) in amap.markers" :key="'text' + index" :text="marker.text"
            :offset="marker.offset" :position="marker.position" />
        </el-amap>
      </div>
    </div>
  </div>
</template>
<script>
//初始数据
function getFormData () {
  return {
    lat: "120.135949",
    lon: "30.274294",
    orgAddr: "天安门",
    province: "",
    city: "",
    district: "",
  };
}

export default {
  name: "Map",
  props: ['location'],
  data () {
    const vm = this;
    return {
      // form对象
      dataForm: getFormData(),
      // 地图搜索对象
      searchOption: {
        city: "全国",
        citylimit: true,
      },
      lng: 0,
      lat: 0,
      // 地图对象
      amap: {
        zoom: 16,
        center: [120.135949, 30.274294],
        events: {
          // 点击获取地址的数据
          click (e) {

            let lng = vm.location.split(',')[0]
            let lat = vm.location.split(',')[1]
            vm.dataForm.lon = lng;
            vm.dataForm.lat = lat;
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 100,
              extensions: "all",
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === "complete" && result.info === "OK") {
                if (result && result.regeocode) {

                  vm.dataForm.orgAddr = result.regeocode.formattedAddress;
                  vm.dataForm.province =
                    result.regeocode.addressComponent.province;
                  vm.dataForm.city = result.regeocode.addressComponent.city;
                  vm.dataForm.district =
                    result.regeocode.addressComponent.district;
                  vm.dataForm.lat = lat ? lat.toString() : "";
                  vm.dataForm.lon = lng ? lng.toString() : "";
                  vm.amap.markers = [];
                  const obj = {
                    position: [lng, lat],
                    text: result.regeocode.formattedAddress,
                    offset: [0, 30],
                  };
                  vm.amap.markers.push(obj);
                  vm.sure();
                }
              }
            });
            vm.$nextTick();
          },
        },

        plugin: [
          {
            // 定位
            pName: "Geolocation",
            events: {

            },
          },
        ],
        //
        markers: [],
      },
    };
  },
  mounted () {

  },
  watch: {
    location (value) {
      const vm = this;
      vm.amap.markers = [];
      let latSum = value.split(',')[1];
      let lngSum = value.split(',')[0];
      const obj = {
        position: [lngSum, latSum],
        offset: [0, 0],
      };
      vm.amap.markers.push(obj);
      vm.amap.center = [lngSum, latSum];
    }
  },
  methods: {

    // 提交方法
    sure () {
      const vm = this;
      this.$emit("updateLocation", vm.dataForm);
    },
  },
};
</script>
<style>
.amap-overlay-text-container {
  color: #333;
}
</style>
<style lang="scss" scoped>
.mapsvip {
  height: 500px;
  width: 1000px;
  margin: auto;
}

.amap-box {
  height: 500px;
  width: 1000px;
}
</style>