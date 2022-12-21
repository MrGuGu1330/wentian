<template>
  <div>
    <comment :commentNum="commentNum" :commentList="commentList" @doSend="doSend" :avatar="avatar" :authorId="authorId"
      placeholder="来了就说点什么吧" @doChidSend="doChidSend" label="用户">
    </comment>

  </div>
</template>

<script>
import { addComment, addReply, findComment } from '@/util/comment.js'
import comment from 'bright-comment'
import { mapState, mapMutations } from 'vuex'
import dayjs from 'dayjs'
export default {
  components: {
    comment
  },
  props: ['articleId', 'articleTitle', 'articleType'],
  computed: {
    ...mapState(['userBase'])
  },
  data () {
    return {
      commentNum: 0,
      commentList: [],
      avatar: '',
      authorId: 0,
      nickName: ''
    }
  },
  mounted () {
    this.initComment()
    this.avatar = this.userBase.avatar ? this.$urlBase + this.userBase.avatar : ''
    this.authorId = this.userBase.createTime ? this.userBase.createTime - 0 : 0
  },
  methods: {
    ...mapMutations(['ChangeShowLogin']),
    initComment () {
      findComment(this.articleId).then(res => {
        this.commentNum = res.data.info.data.length
        let arr = []
        res.data.info.data.forEach(item => {
          arr.push({
            id: item.item._id,
            commentUser:
              { id: item.item.nickName, nickName: item.item.nickName, avatar: this.$urlBase + item.item.avatar },
            content:
              item.item.content,
            createDate: dayjs(item.item.createDate - 0).format('YYYY-MM-DD HH:mm'),

            childrenList: item.childrenList.map(item => {
              this.commentNum++
              return {
                id: item._id,
                commentUser:
                  { id: item.nickName, nickName: item.nickName, avatar: this.$urlBase + item.avatar },
                content:
                  item.content,
                createDate: dayjs(item.createDate - 0).format('YYYY-MM-DD HH:mm'),
                targetUser: { id: item.targetId, nickName: item.targetId }
              }
            })
          })
        });
        this.commentList = arr
      })
    },
    doSend (content) {

      if (!this.userBase.username) return this.ChangeShowLogin(true)
      addComment(this.userBase.username, this.userBase.avatar, content, this.articleId, this.articleTitle, this.articleType,).then(res => {
        this.commentList.push({
          id: res.data.data._id,
          commentUser:
            { id: res.data.data.nickName, nickName: res.data.data.nickName, avatar: this.avatar },
          content:
            res.data.data.content,
          createDate: dayjs(res.data.data.createDate - 0).format('YYYY-MM-DD HH:mm'),
          targetUser: {},
          childrenList: []
        })
        this.commentNum++
      })
    },

    doChidSend (content, authorId, parentId) {

      if (!this.userBase.username) return this.ChangeShowLogin(true)
      addReply(this.userBase.username, this.userBase.avatar, parentId, content, authorId, this.articleId, this.articleTitle, this.articleType).then(res => {
        this.initComment()
      })
    }
  },

}
</script>
<style lang="scss">
.OwO-items.OwO-items-show {
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ced7dd;
    background-image: -webkit-linear-gradient(
      45deg,
      hsla(0deg, 0%, 100%, 0.4) 25%,
      transparent 0,
      transparent 50%,
      hsla(0deg, 0%, 100%, 0.4) 0,
      hsla(0deg, 0%, 100%, 0.4) 75%,
      transparent 0,
      transparent
    );
    border-radius: 2em;
  }
}
</style>
<style lang="scss" scoped>
</style>