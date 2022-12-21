<template>
  <div>
    <div id="container" @dblclick="shopOrPlay"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
// 导入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
      mode: null, // 航天员
      container: null,
      flag: true,
      clock: new THREE.Clock(),
      mixer: '',
      mixers: [],
      animate1: null,
      baseZ: 3,
      baseR: 0.7,
      basePY: -6,
      basePX: -8,
      baseMixer: null,
      stars: null, //星星
      mon: null,//月球
    };
  },
  mounted () {
    this.init()
  },
  methods: {

    init () {
      // 初始化场景
      this.scene = new THREE.Scene();
      //  设置背景
      // 初始化相机 75度  宽高比 最小0.1 最大2000
      this.camera = new THREE.PerspectiveCamera(75,
        (document.documentElement.offsetWidth || window.innerWidth) / (document.documentElement.offsetHeight || window.innerHeight),
        0.1,
        100000)
      // 设置摄像头位置
      this.camera.position.set(0, 0, 10)
      // // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({
        // 抗锯齿
        // antialias: true,
        alpha: true // 这个是背景透明色
      })
      // 设置渲染器宽高
      this.renderer.setSize((document.documentElement.offsetWidth || window.innerWidth), (document.documentElement.offsetHeight || window.innerHeight))
      // 实例化控制器
      this.container = new OrbitControls(this.camera, this.renderer.domElement)
      this.container.enableDamping = true



      // 更新摄像头宽高比
      this.camera.aspect = (document.documentElement.offsetWidth || window.innerWidth) / (document.documentElement.offsetHeight || window.innerHeight);
      // // 更新摄像头投影矩阵
      this.camera.updateProjectionMatrix()
      // // 添加相机到场景
      this.scene.add(this.camera);

      // 初始化模型
      const loader = new GLTFLoader();
      // 添加月球
      loader.load('/mon/scene.gltf', (gltf) => {
        this.mon = gltf.scene
        this.mon.scale.set(1500, 1500, 1500)
        this.mon.position.set(0, -12, 0)

        this.scene.add(this.mon);

      }, undefined, function (error) {


      });
      //  创建一个超大球体 半径一千 后面的是经纬度 切分为各60
      const skyGeomtry = new THREE.SphereGeometry(5000, 50, 50)
      // 创建一个纹理
      const skMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide, //两面可见
        // 添加纹理 为星河纹理
        map: new THREE.TextureLoader().load('./images/bj.jpg')
      })
      // 把球体翻到里面能看见不然是黑色的 俩面可见就不翻转了
      skyGeomtry.scale(1, 1, 1)
      // 添加材质
      const sky = new THREE.Mesh(skyGeomtry, skMaterial)

      // 添加到场景
      this.scene.add(sky)
      // 创建宇航员
      loader.load('./yuhangyuan/scene.gltf', (gltf) => {
        this.mode = gltf.scene
        this.mode.scale.set(3, 3, 3)
        this.mode.position.set(this.basePX, this.basePY, -90)
        this.mode.rotation.set(0, 0, 0)
        this.mixer = new THREE.AnimationMixer(gltf.scene.children[0]);
        this.baseMixer = this.mixer.clipAction(gltf.animations[0]).setDuration(1)
        this.baseMixer.play();
        this.animate1 = gsap.to(this.mode.position, {
          z: this.baseZ, duration: 8, onComplete: () => {
            gsap.to(this.mode.rotation, {
              y: this.baseR * Math.PI, duration: 1,
            })
          },
        })
        this.mixers.push(this.mixer);
        this.scene.add(this.mode);
      }, undefined, (error) => {

      });


      // 添加光
      let light2 = new THREE.DirectionalLight(0Xfffff, 0.3)
      light2.position.set(0, 10, 10)

      let light1 = new THREE.HemisphereLight();
      this.scene.add(light1, light2
      )
      // // 设置渲染器编码
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      // 监听屏幕大小变化修改渲染器的宽高相机比例
      window.addEventListener('resize', this.size)
      // 监听屏幕按键
      window.addEventListener('keyup', this.spacemanMove)
      document.querySelector('#container').appendChild(this.renderer.domElement)
      this.render()
    },
    render () {

      // 在这里设置阻尼感
      this.container.update()
      var delta = this.clock.getDelta();
      for (var i = 0; i < this.mixers.length; i++) { // 重复播放动画
        this.mixers[i].update(delta - 0.011);
      }
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    size () {
      this.camera.aspect = (document.documentElement.offsetWidth || window.innerWidth) / (document.documentElement.offsetHeight || window.innerHeight);
      this.camera.updateProjectionMatrix()
      this.renderer.setSize((document.documentElement.offsetWidth || window.innerWidth), (document.documentElement.offsetHeight || window.innerHeight))
    },
    // 宇航员移动
    spacemanMove (e) {
      if (!this.animate1) return
      if (!this.animate1.isActive()) {
        if (e.keyCode === 38) {
          this.animate1 = gsap.to(this.mode.position, {
            z: (this.baseZ -= 3)
          })
        }
        if (e.keyCode === 40) {
          this.animate1 = gsap.to(this.mode.position, {
            z: (this.baseZ += 3)
          })
        }
        if (e.keyCode === 37) {
          this.animate1 = gsap.to(this.mode.rotation, {
            y: (this.baseR -= 0.3) * Math.PI
          })
        }
        if (e.keyCode === 39) {
          this.animate1 = gsap.to(this.mode.rotation, {
            y: (this.baseR += 0.3) * Math.PI
          })
        }
        if (e.keyCode === 87) {
          this.animate1 = gsap.to(this.mode.position, {
            y: (this.basePY += 2)
          })
        }
        if (e.keyCode === 83) {
          this.animate1 = gsap.to(this.mode.position, {
            y: (this.basePY -= 2)
          })
        }
        if (e.keyCode === 65) {
          this.animate1 = gsap.to(this.mode.position, {
            x: (this.basePX -= 3)
          })
        }
        if (e.keyCode === 68) {
          this.animate1 = gsap.to(this.mode.position, {
            x: (this.basePX += 3)
          })
        }
      }
    },
    shopOrPlay () {
      if (!this.flag) {
        this.flag = true
        this.baseMixer.play()
      } else {
        this.flag = false
        this.animate1 = gsap.to(this.mode.rotation, {
          y: (this.baseR += 2) * Math.PI,
          yoyo: true,
          duration: 10,
        })
        this.baseMixer.stop()
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.size)
    window.removeEventListener('keyup', this.spacemanMove)
  },
}
</script>
<style scoped lang='scss'>
#container {
  background: url("@/assets/bj1.jpg");
  background-size: cover;
}
</style>