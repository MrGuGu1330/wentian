<template>
  <div class="comment">
    <div>
      <textarea class="comment-textarea" ctype="textarea" :placeholder="`想对${targetName.nickName}说点什么`"
        v-model="comment" />
      <div class="addBtn">
        <button @click="addComment">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { showNotify } from 'vant';
import { onMounted, reactive, toRefs, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  props: {
    mainIp: {
      default: '',
    },
    targetName: {
      default: ''
    }
  },
  setup (props, context) {
    const route = useRoute()
    const data = reactive({
      comment: '',
    })
    function addComment () {
      if (!data.comment.trim()) {
        return showNotify({ message: '不能为空' });
      }
      context.emit('reply', { content: data.comment, mainIp: props.mainIp, articleId: route.query.id })
    }


    return {
      ...toRefs(data),
      addComment,
    }
  }
}
</script>
<style lang="scss" scoped>
.comment {
  margin: 0 auto;
  padding: 10px;
  background: #fff;
}
.addBtn {
  display: flex;
  justify-content: flex-end;
}

.comment-textarea {
  font-size: 0.875rem;
  color: #555 !important;
  outline: none;
  border: 1px solid rgba(144, 147, 153, 0.31);
  border-radius: 4px;
  padding: 10px 10px;
  min-height: 60px;
  resize: none;
  width: 80%;
  font-size: 14px;
  border-radius: 4px;
  background: url("@/assets/dateils/input.gif") right no-repeat;
  background-size: auto 100%;
  font-weight: 20px;
}
button {
  width: 80px;
  height: 30px;
  border-radius: 30em;
  font-size: 12px;
  font-family: inherit;
  border: none;
  position: relative;
  overflow: hidden;
}

button::before {
  content: "";
  width: 0;
  height: 30px;
  border-radius: 30em;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
  transition: 0.1s ease;
  display: block;
  z-index: -1;
}

button:active::before {
  width: 9em;
}
</style>