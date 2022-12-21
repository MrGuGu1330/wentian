<template>
  <div class="person" :style="{ 'background-image': 'url(' + avatar + ')' }">
    <div class="info">
      <div>航天员简介</div>
      <div>来源：{{ source }}</div>
      <div>{{ introduce }}</div>
      <div>
        <slot></slot>
      </div>
    </div>
    <i @click="doclick" class="el-icon-circle-close"></i>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: "",
      required: true,
    },
    source: {
      type: String,
      default: "",
      required: true,
    },
    introduce: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    doclick() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped>
.person {
  width: 200px;
  height: 422px;
  border: 1px solid gray;
  border-radius: 20px;
  position: relative;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  color: #f5f5f5;
  /* 阴影 */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
  /* 溢出隐藏 */
  overflow: hidden;

  &::before {
    content: "";
    width: 100%;
    height: 110%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 0 0;
    /* 过渡效果: css属性名 时长 贝塞尔曲线 */
    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 200%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.25) 55%,
      rgba(0, 0, 0, 0.8) 100%
    );
    /* 绝对定位 */
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(0);
    /* 过渡效果 */
    transition: transform 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  }
  &:hover {
    align-items: center;
    > i {
      display: block;
      z-index: 10;
    }
  }

  &:hover::before {
    transform: translateY(-5%);
  }

  &:hover::after {
    transform: translateY(-50%);
  }

  &:hover div {
    transform: translateY(0);
  }

  .info {
    height: 100%;
    width: 100%;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    padding: 16px 8px;
    transform: translateY(100%);
    transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);

    > div:nth-child(1) {
      font-size: 24px;
      font-weight: bold;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div:nth-child(3) {
      max-height: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      // height: fit-content;
    }

    > div:last-child {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        background-color: #aaa;
        color: #fff;
        font-size: 20px;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  > i {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 40px;
    background-color: #666;
    display: none;
  }
}
</style>