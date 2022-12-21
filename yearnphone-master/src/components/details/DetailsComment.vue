<template>
  <div class="list">
    <comment-input @mes="mes" :articleTitle="articleTitle" :articleId="articleId" :articleType="articleType"
      v-if="articleId" />
    <h3>评论({{count}})</h3>
    <ul>
      <li v-show="commentList.length" v-for="(item ,index) in commentList" :key="item.item._id">
        <div class="commentHeight">
          <div class="avatar">
            <van-image round width="40px" height="40px" :src="$store.state.urlBase +item.item.avatar" fit="cover" />
          </div>
          <div>
            <h4>{{item.item.nickName}}</h4>
            <p>{{dayjs(item.item.createDate - 0).format('YYYY-MM-DD HH:mm')}}</p>
            <div>{{item.item.content}}</div>
          </div>
          <div class="reply" @click="replyHandle(item.item,item.item.nickName,index,item.item)">
            <!-- 回复图标 -->
            <!-- #region -->
            <svg t="1667407296888" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="5548" width="20" height="20">
              <path
                d="M170.666667 136.533333m136.533333 0l512 0q136.533333 0 136.533333 136.533334l0 307.2q0 136.533333-136.533333 136.533333l-512 0q-136.533333 0-136.533333-136.533333l0-307.2q0-136.533333 136.533333-136.533334Z"
                fill="#FC7300" p-id="5549"></path>
              <path
                d="M170.666667 170.666667m136.533333 0l512 0q136.533333 0 136.533333 136.533333l0 307.2q0 136.533333-136.533333 136.533333l-512 0q-136.533333 0-136.533333-136.533333l0-307.2q0-136.533333 136.533333-136.533333Z"
                fill="#FA8511" p-id="5550"></path>
              <path
                d="M170.666667 273.066667h512a136.533333 136.533333 0 0 1 136.533333 136.533333v307.2a136.533333 136.533333 0 0 1-136.533333 136.533333h-188.757334l-67.242666 67.4816L359.1168 853.333333H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533333v-307.2a136.533333 136.533333 0 0 1 136.533334-136.533333z"
                fill="#FBC476" p-id="5551"></path>
              <path
                d="M170.666667 307.2h512a136.533333 136.533333 0 0 1 136.533333 136.533333v307.2a136.533333 136.533333 0 0 1-136.533333 136.533334h-188.757334l-67.242666 67.4816L359.1168 887.466667H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533334v-307.2a136.533333 136.533333 0 0 1 136.533334-136.533333z"
                fill="#FAB85F" p-id="5552"></path>
              <path
                d="M204.8 477.866667m34.133333 0l375.466667 0q34.133333 0 34.133333 34.133333l0 0q0 34.133333-34.133333 34.133333l-375.466667 0q-34.133333 0-34.133333-34.133333l0 0q0-34.133333 34.133333-34.133333Z"
                fill="#FFFFFF" p-id="5553"></path>
              <path
                d="M204.8 648.533333m34.133333 0l273.066667 0q34.133333 0 34.133333 34.133334l0 0q0 34.133333-34.133333 34.133333l-273.066667 0q-34.133333 0-34.133333-34.133333l0 0q0-34.133333 34.133333-34.133334Z"
                fill="#FFFFFF" p-id="5554"></path>
            </svg>
            <!-- #endregion -->
          </div>
        </div>
        <ul v-show="item.childrenList.length" class="replyItem">
          <li v-for="i in item.childrenList" :key="i._id">
            <div class="commentHeight">
              <div class="avatar">
                <!-- 左边头像 -->
                <van-image round width="40px" height="40px" :src="$store.state.urlBase +i.avatar" fit="cover" />
              </div>
              <div>
                <h4>{{i.nickName}}@ {{i.targetId}}</h4>
                <p>{{dayjs(i.createDate - 0).format('YYYY-MM-DD HH:mm')}}</p>
                <div class="info">{{i.content}}</div>
              </div>
              <div class="reply" @click="replyHandle(i,i.nickName,index,item.item)">
                <!-- 回复图标 -->
                <!-- #region -->
                <svg t="1667407296888" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="5548" width="20" height="20">
                  <path
                    d="M170.666667 136.533333m136.533333 0l512 0q136.533333 0 136.533333 136.533334l0 307.2q0 136.533333-136.533333 136.533333l-512 0q-136.533333 0-136.533333-136.533333l0-307.2q0-136.533333 136.533333-136.533334Z"
                    fill="#FC7300" p-id="5549"></path>
                  <path
                    d="M170.666667 170.666667m136.533333 0l512 0q136.533333 0 136.533333 136.533333l0 307.2q0 136.533333-136.533333 136.533333l-512 0q-136.533333 0-136.533333-136.533333l0-307.2q0-136.533333 136.533333-136.533333Z"
                    fill="#FA8511" p-id="5550"></path>
                  <path
                    d="M170.666667 273.066667h512a136.533333 136.533333 0 0 1 136.533333 136.533333v307.2a136.533333 136.533333 0 0 1-136.533333 136.533333h-188.757334l-67.242666 67.4816L359.1168 853.333333H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533333v-307.2a136.533333 136.533333 0 0 1 136.533334-136.533333z"
                    fill="#FBC476" p-id="5551"></path>
                  <path
                    d="M170.666667 307.2h512a136.533333 136.533333 0 0 1 136.533333 136.533333v307.2a136.533333 136.533333 0 0 1-136.533333 136.533334h-188.757334l-67.242666 67.4816L359.1168 887.466667H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533334v-307.2a136.533333 136.533333 0 0 1 136.533334-136.533333z"
                    fill="#FAB85F" p-id="5552"></path>
                  <path
                    d="M204.8 477.866667m34.133333 0l375.466667 0q34.133333 0 34.133333 34.133333l0 0q0 34.133333-34.133333 34.133333l-375.466667 0q-34.133333 0-34.133333-34.133333l0 0q0-34.133333 34.133333-34.133333Z"
                    fill="#FFFFFF" p-id="5553"></path>
                  <path
                    d="M204.8 648.533333m34.133333 0l273.066667 0q34.133333 0 34.133333 34.133334l0 0q0 34.133333-34.133333 34.133333l-273.066667 0q-34.133333 0-34.133333-34.133333l0 0q0-34.133333 34.133333-34.133334Z"
                    fill="#FFFFFF" p-id="5554"></path>
                </svg>
                <!-- #endregion -->
              </div>
            </div>
          </li>
        </ul>
        <transition name="replyShow" appear mode="out-in">
          <div v-if="item.item.showReply && item.item._id">
            <comment-reply :mainIp="item.item._id" @reply="reply" :targetName="data.item">
            </comment-reply>
          </div>
        </transition>
      </li>
    </ul>

    <div v-show="!commentList.length">
      <van-empty description="没有评论" />
    </div>
  </div>

</template>

<script setup>
import dayjs from 'dayjs';
import CommentInput from './CommentInput.vue'
import CommentReply from './CommentReply.vue';
import { findComment, addReply } from '@/util/comment.js'
import { defineProps, ref, defineEmits, reactive } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const emit = defineEmits(['countHandle'])
const data = reactive({
  item: null,
  mainItem: null,
  index: ''
})

// 传递值
const props = defineProps(['articleId', 'articleTitle', 'articleType'])
const commentList = ref([])
const count = ref(0)
// 上来直接先获取数据
findComment(props.articleId).then(res => {

  commentList.value = res.data.info.data
  count.value = res.data.info.data.length
  res.data.info.data.map(item => {
    item.childrenList.map(item => count.value++)
  })

  emit('countHandle', count.value)

})

// 显示回复框
function replyHandle (item, cip, index, mainItem) {
  data.item = item
  data.index = index
  data.mainItem = mainItem
  commentList.value.forEach((ele, i) => {
    if (i === index) return
    ele.item.showReply = false
  });
  mainItem.showReply = !mainItem.showReply
}
// 回复
function reply (res) {
  if (!store.state.userBase.username) {
    router.push('/login')
    return
  }

  addReply(store.state.userBase.username, store.state.userBase.avatar, res.mainIp, res.content, data.item.nickName, data.item.articleId, data.item.articleTitle, data.item.articleType).then(res => {
    if (res.data.ok) {
      commentList.value[data.index].childrenList.push(res.data.data)
      count.value++
    }
    data.mainItem.showReply = false
  })
}
// 监听传来数据
function mes (res) {
  commentList.value.push({ item: res, childrenList: [] })
  count.value++
  // commentList.value.push({ ...res, childrenList: [] })

}
</script>
<style lang='scss'>
li {
  .comment-textarea {
    margin-left: 60px;
  }
}
</style>
<style lang="scss" scoped>
.list {
  background: #fff;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 30px;
  h3 {
    font-size: 18px;
    font-weight: 700;
    padding: 0 10px;
    color: #434948;
  }
  ul li {
    position: relative;
    margin: 20px 0;
    color: #434948;
    border-bottom: 1px solid #ddd;
    padding: 0 0 0 15px;
    overflow: hidden;
    .replyItem {
      .avatar {
        margin: 0 10px 0 0;
      }
      li {
        margin: 0px 0;
        margin-left: 10px;
        border: 0;
        padding-top: 5px;
        .commentHeight {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .info {
          font-size: 12px;
        }
        .reply {
          position: absolute;
          top: 10px;
        }
      }
    }
    .commentHeight {
      display: flex;
    }
    .reply {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .avatar {
      margin: 0 10px 0 0;
    }
    h4 {
      padding: 5px 0 0;
      font-size: 14px;
    }
    p {
      font-size: 12px;
      color: #b3b3b3;
    }
    div {
      font-size: 16px;
      line-height: 1.75;
      margin-bottom: 5px;
      white-space: pre-line;
      word-wrap: break-word;
      color: #777;
      word-break: break-all;
    }
  }
}

.replyList {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 10px;
  top: 68px;
  font-size: 12px !important;
  align-items: center;
}

// 显示和隐藏
.replyShow-enter-active {
  overflow: hidden;
  animation: isDemo3 0.5s reverse;
}
.replyShow-leave-active {
  animation: isDemo3 0.5s;
}
@keyframes isDemo3 {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(5%);
    opacity: 0;
  }
}
// 显示和隐藏
.replyShowList-enter-active {
  overflow: hidden;
  animation: isDemo4 0.5s reverse;
}
.replyShowList-leave-active {
  animation: isDemo4 0.5s;
}
@keyframes isDemo4 {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(50%);
    opacity: 0;
  }
}
</style>