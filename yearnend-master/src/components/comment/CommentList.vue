<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <div class="header">
          <el-button size="small" @click="handelDelAll" type="danger">删除选中</el-button>
          <div>
            <el-input placeholder="搜索文章" style="width:230px" v-model="articleTitle" clearable>
            </el-input>
            <el-input placeholder="搜索用户名字" style="width:230px;margin: 0 20px" v-model="nickName" clearable>
            </el-input>
            <el-select clearable placeholder="请选择文章类型" v-model="articleTypeValue">
              <el-option v-for="item in articleTypeName" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button size="small" type="primary" @click="searchHandle">搜索</el-button>
          </div>
        </div>
      </template>

    </vxe-toolbar>

    <vxe-table ref="xTable" border show-overflow :data="tableData" :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column title="用户" width="80">
        <template #default="{ row }">
          <el-avatar :src="$urlBase+row.avatar"></el-avatar>
        </template>
      </vxe-column>
      <vxe-column field="nickName" title="用户" width="80">
      </vxe-column>
      <vxe-column field="articleTitle" title="文章标题">
      </vxe-column>
      <vxe-column field="content" title="评论内容">
      </vxe-column>
      <vxe-column field="articleType" title="文章类型">
      </vxe-column>
      <vxe-column field="targetId" title="被回复的用户" width="120">
      </vxe-column>
      <vxe-column title="创建时间" width="140">
        <template #default="{ row }">
          {{row.createDate | format}}
        </template>
      </vxe-column>
      <vxe-column title="删除" width="55">

        <template #default="{ row }">
          <vxe-button type="text" @click="removeRowEvent(row)" icon="vxe-icon-delete"></vxe-button>
        </template>
      </vxe-column>
      <!--自定义空数据模板-->
      <template #empty>
        <span style="color: red;">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" @current-change="handleChange" :page-size="8" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Pagination, Input, Button, Avatar, Select, Option } from 'element-ui'
import Vue from 'vue'
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
import dayjs from 'dayjs'
import { getComment, delCommenSingle, delCommentAll } from '@/utils/http.js'
export default {
  data () {
    return {
      total: 0,
      page: '1',
      articleTitle: '',
      nickName: '',
      tableData: [
      ],
      articleTypeName: [{
        value: '科普',
        label: '科普'
      }, {
        value: '新闻',
        label: '新闻'
      },],
      articleTypeValue: ''
    }
  },
  mounted () {
    this.getList()
  },
  filters: {
    format (timer) {
      return dayjs(timer - 0).format('YYYY-MM-DD HH:mm')
    }
  },
  methods: {
    // 搜索
    searchHandle () {
      this.getList()
    },
    // 删除全选的
    async handelDelAll () {
      if (!this.$refs.xTable.getCheckboxRecords().length) return this.$message.error('不能一个都不选')
      delCommentAll(this.$refs.xTable.getCheckboxRecords().map(item => item._id)).then(res => {
        this.getList()
      })
    },
    // 分页
    handleChange (page) {
      this.page = page
      this.getList()
    },
    // 删除单个
    async removeRowEvent (row) {
      delCommenSingle(row._id)
      this.getList()
    },
    // 渲染数据
    getList () {
      getComment(this.page, this.articleTitle, this.nickName, this.articleTypeValue).then(res => {
        this.tableData = res.data.data.data
        this.total = res.data.data.count
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-width: 700px;
}
.el-button.el-button--danger.el-button--small {
  padding: 0 7px;
  height: 30px;
}
.block {
  margin-top: 40px;
  text-align: right;
}
</style>
