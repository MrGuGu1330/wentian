import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message, MessageBox } from 'element-ui'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$urlBase = 'http://47.122.16.71:9999/'
// Vue.prototype.$urlBase = "http://localhost:9999/";
// 全局安装表格
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

// ---------------高德地图引入-----------------
import VueAMap from 'vue-amap'
Vue.use(VueAMap);


// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: '266083f4b197da3f831811a9b2752627',// 高德的key
  // 插件集合
  plugin: [
    'AMap.CircleEditor',// 圆形编辑器插件
    "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder", // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.CitySearch",
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
//高德的安全密钥
window._AMapSecurityConfig = {
  securityJsCode: '7ed339778704858d734b3d81c1b7bdad',
}

// ---------------end-----------------



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
