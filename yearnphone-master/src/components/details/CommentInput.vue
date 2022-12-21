<template>
  <div class="comment">
    <div>
      <div class="header">
        <strong @click="handleGo">{{$store.state.userBase.username ? $store.state.userBase.username :'未登录'}}</strong>
      </div>
      <textarea class="comment-textarea" ctype="textarea" placeholder="您的意见对我很重要" v-model="comment" />
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
import { onMounted, reactive, toRefs } from 'vue'
import { addCommentHttp } from '@/util/comment.js'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'comment',
  props: ['articleTitle', 'articleId', 'articleType'],
  setup (props, context) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const data = reactive({
      comment: '',
    })

    function addComment () {
      if (!store.state.userBase.username) {
        router.push('/login')
        return
      }
      if (!data.comment.trim()) {
        return showNotify({ message: '不能为空' });
      }

      addCommentHttp(store.state.userBase.username, store.state.userBase.avatar, data.comment, props.articleId, props.articleTitle, props.articleType).then(res => {
        context.emit('mes', res.data.data)
        data.comment = ''
      })
    }
    function handleGo () {
      if (!store.state.userBase.username) {
        router.push('/login')
        return
      }
    }
    return {
      ...toRefs(data),
      addComment,
      handleGo
    }
  }
}
</script>
<style lang="scss" scoped>
.comment {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  background: #fff;
}
.addBtn {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.header {
  height: 40px;
  line-height: 40px;

  i {
    transform: translateY(5px);
  }
}
.comment-textarea {
  font-size: 0.875rem;
  color: #555 !important;
  outline: none;
  border: 1px solid rgba(144, 147, 153, 0.31);
  border-radius: 4px;
  padding: 10px 10px;
  min-height: 80px;
  resize: none;
  width: 100%;
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
  z-index: 1;
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