<template>
  <div>
    <div>
      <div style="border: 1px solid #cccccc">
        <!-- //搜索框 -->
        <el-amap-search-box :search-option="searchOption" :on-search-result="onSearchResult" />
        <!-- 地图 -->
        <el-amap class="amap-box" :zoom="amap.zoom" :center="amap.center" :plugin="amap.plugin" :events="amap.events">
          <!-- 当前位置图标 -->
          <el-amap-marker v-for="(marker, index) in amap.markers" :key="'marker' + index" :position="marker.position" />
          <!-- 位置名称显示 -->
          <el-amap-text v-for="(marker, index) in amap.markers" :key="'text' + index" :text="marker.text"
            :offset="marker.offset" :position="marker.position" />
        </el-amap>
        <el-form style="width: 700px" :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-input v-model="form.province" />
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="form.city" />
          </el-form-item>
          <el-form-item label="地区" prop="district">
            <el-input v-model="form.district" />
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="form.longitude" />
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="form.latitude" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
//初始数据
function getFormData () {
  return {
    lat: "39.909186",
    lon: "116.39746",
    orgAddr: "天安门",
    province: "",
    city: "",
    district: "",
  };
}
export default {
  name: "Map",
  props: ["location"],
  data () {
    const vm = this;
    return {
      form: {
        address: "",
        province: "",
        city: "",
        district: "",
        longitude: "",
        latitude: "",
      },
      rules: {
        address: [{ required: true, message: "必填", trigger: "blur" }],
        province: [{ required: true, message: "必填", trigger: "blur" }],
        district: [{ required: true, message: "必填", trigger: "blur" }],
        longitude: [{ required: true, message: "必填", trigger: "blur" }],
        latitude: [{ required: true, message: "必填", trigger: "blur" }],
      },
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
        zoom: 10,
        center: [120.142048, 30.28042],
        events: {
          // 点击获取地址的数据
          click (e) {
            const { lng, lat } = e.lnglat;
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
              init (o) {
                // this.o = o;
                // o是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    // 设置经度
                    vm.lng = result.position.lng;
                    // 设置维度
                    vm.lat = result.position.lat;
                    // 设置坐标
                    vm.amap.center = [vm.lng, vm.lat];
                    let op = {
                      position: [vm.lng, vm.lat],
                      text: result.formattedAddress,
                      offset: [0, 30],
                    };
                    vm.amap.markers.push(op);
                    // 页面渲染好后
                    vm.$nextTick();
                  }
                });
              },
            },
          },
        ],
        //
        markers: [],
      },
    };
  },
  watch: {
    location (value) {
      // setTimeout(() => {
      setTimeout(() => {
        this.handleLoad(value.split(","));
      }, 500);
      // }, 1000);
    },
  },
  methods: {
    handleLoad (arr) {
      let vm = this;
      let [lng, lat] = arr;
      // 设置坐标
      vm.amap.center = [lng, lat];
      let op = {
        position: [lng, lat],
        offset: [0, 30],
      };
      vm.amap.markers.push(op);
      // 页面渲染好后
      vm.$nextTick();
      // 这里通过高德 SDK 完成。
      var geocoder = new AMap.Geocoder({
        radius: 100,
        extensions: "all",
      });
      geocoder.getAddress([lng, lat], function (status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.regeocode) {
            vm.dataForm.orgAddr = result.regeocode.formattedAddress;
            vm.dataForm.province = result.regeocode.addressComponent.province;
            vm.dataForm.city = result.regeocode.addressComponent.city;
            vm.dataForm.district = result.regeocode.addressComponent.district;
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
    // 地图搜索回调
    onSearchResult (pois) {
      const vm = this;
      vm.amap.markers = [];
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach((poi, index) => {
          const { lng, lat } = poi;
          if (index === 0) {
            lngSum = lng;
            latSum = lat;
            const obj = {
              position: [poi.lng, poi.lat],
              text: poi.name,
              offset: [0, 30],
            };
            vm.amap.markers.push(obj);
            vm.dataForm.orgAddr = poi.name;
            vm.dataForm.lat = poi.lat ? poi.lat.toString() : "";
            vm.dataForm.lon = poi.lng ? poi.lng.toString() : "";
          }
        });
        vm.amap.center = [lngSum, latSum];
      }
    },
    // getAddress(AMap, position) {
    //   let geocoder = new AMap.Geocoder()
    //   geocoder.getAddress(position, (status, result)=>{
    //     // 回填表单字段
    //     let r = result.regeocode
    //     this.form.address = r.formattedAddress
    //     this.form.province = r.addressComponent.province
    //     this.form.city = r.addressComponent.city
    //     this.form.district = r.addressComponent.district
    //     this.form.longitude = position[0]
    //     this.form.latitude = position[1]
    //   })
    // },
    // 提交方法
    sure () {
      const vm = this;
      this.form.city = vm.dataForm.city;
      this.form.latitude = vm.dataForm.lat;
      this.form.longitude = vm.dataForm.lon;
      this.form.district = vm.dataForm.district;
      this.form.province = vm.dataForm.province;
      this.form.address = vm.dataForm.orgAddr;
      // address: '',
      // province: '',
      // city: '',
      // district: '',
      // longitude: '',
      // latitude: '',
      this.$emit("updateLocation", vm.dataForm);
    },
  },
  beforeDestroy () { },
};
</script>
<style lang="scss" scoped>
.amap-box {
  height: 33vh;
  height: calc(80vh - 45px);
}
.el-vue-search-box-container {
  // top: 45px;
  width: 100% !important;
}
.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}

.search-box .el-input {
  float: left;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 0 7px 7px 0;
  outline: none;
  position: relative;
}

.search-box .el-button {
  position: absolute;
  right: 0;
  top: 1px;
  width: 20%;
  background: #38a28a;
  border-radius: 0 7px 7px 0;
  border: none;
  color: #fff;
  outline: none;
}

.tip-box {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 35px;
  padding: 10px 0;
  background-color: #fff;
  opacity: 0.8;
}
</style>