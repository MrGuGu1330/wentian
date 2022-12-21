<template>
  <div class="list">
    <slot />
  </div>
</template>

<script>
//  传入isLoad 在发请求之前 赋值为false  在请求回来之后再赋值为true 
//  finish 在请求列表数量等于返回的总数的时候就赋值为true
//  lazyHandle  这个触发请求的方法eg:@lazyHandle = "lazyHandle"
// 看不懂问我
export default {
  props: {
    isLoad: {
      type: Boolean,
      default: true,
      required: true
    },
    finish: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data () {
    return {
      timer: null,
      load: true
    }
  },

  methods: {
    windowScoll1 () {
      if (!this.isLoad) return
      const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let allHeight = bodyScrollTop + window.innerHeight
      const list = document.querySelector('.list')
      list && (allHeight = (list.offsetHeight + list.offsetTop) - allHeight)
      allHeight < 0 && this.getList()
    },
    getList () {
      if (this.finish) return
      this.$emit('lazyHandle')
    }
  },
  mounted () {
    this.getList()
    window.addEventListener('scroll', this.windowScoll1)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.windowScoll1)
  },
}
</script>