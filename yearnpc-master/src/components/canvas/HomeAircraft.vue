<template>
  <div>

    <div id="container" @dblclick="container.enableZoom = !container.enableZoom"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入模型
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// 导入动画
import gsap from 'gsap'
export default {
  data () {
    return {
      camera: null,  //相机对象
      scene: null,  //场景对象
      renderer: null,  //渲染器对象
      cube: null,// 物体
      container: null
    };
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 先创建一个场景 
      this.scene = new THREE.Scene();
      // 创建一个相机
      this.camera = new THREE.PerspectiveCamera(
        // 第一个参数是角度 75°
        75,
        // 第二个参数传入宽高比 
        // window.innerWidth / window.innerHeight,
        700 / 800,
        // 近端
        0.1,
        // 远端
        1000
      )
      // 创建相机定位 set 设置相机位置 x y z
      this.camera.position.set(0, 0, 10)
      // 把相机添加到场景
      this.scene.add(this.camera)

      // 初始化模型
      const loader = new GLTFLoader();
      loader.load('./canvasModel/scene.gltf', (gltf) => {
        const mode = gltf.scene
        mode.scale.set(4
          , 4, 3)
        this.scene.add(mode);
        gsap.to(mode.rotation, {
          y: 0.5 * Math.PI,
          x: -0.2 * Math.PI,
          duration: 3
        })

      }, undefined, (error) => {
        error
      });
      // // 添加光
      let light2 = new THREE.DirectionalLight(0Xfffff, 1)
      light2.position.set(0, 10, 10)
      // 添加天空的光
      let light3 = new THREE.DirectionalLight(0Xfffff, 0.8)
      light3.position.set(0, 0, 10)
      let light4 = new THREE.DirectionalLight(0Xfffff, 0.8)
      light4.position.set(0, 0, -10)
      let light1 = new THREE.HemisphereLight();
      this.scene.add(light1, light2, light3, light4)
      //初始化渲染器
      this.renderer = new THREE.WebGLRenderer({
        // 抗锯齿
        // antialias: true,
        alpha: true, // canvas是否包含alpha (透明度) 默认为 false
      })
      // 设置渲染的尺寸大小 可以填屏幕大小 参数是宽高
      this.renderer.setSize(700, 800)
      // 其实现在的renderer就是画布 把画板的dom渲染到画布上
      document.querySelector('#container').appendChild(this.renderer.domElement)
      // 使用渲染器 通过相机将场景渲染出来
      this.renderer.render(this.scene, this.camera)
      // 创建轨道控制器 第一个参数是相机 第二个参数是 要渲染的元素
      // 实例化控制器
      this.container = new OrbitControls(this.camera, this.renderer.domElement)
      this.container.enableDamping = true

      // 禁止缩放
      this.container.enableZoom = false;
      // 先执行一下这个函数先渲染一下这个场景
      this.render()
    },
    render () {
      // 在这里设置阻尼感
      this.container.update()
      // 每一帧都会渲染轨道控制器 参数是场景和摄像头
      this.renderer.render(this.scene, this.camera)
      // 浏览器自带渲染 下一帧的时候就去在执行这个函数
      requestAnimationFrame(this.render)
    }
  }
}
</script>

<style>
#container {
  position: relative;
  z-index: 2;
  height: 700px;
  width: 800px;
}
</style>