<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <div class="header">
          <el-button size="small" @click="handelDelAll" type="danger">删除选中</el-button>
          <el-input placeholder="搜索留言" style="width:300px" v-model="message" clearable>
            <template slot="append">
              <el-button size="small" type="primary" @click="searchHandle">搜索</el-button>
            </template>
          </el-input>
        </div>
      </template>

    </vxe-toolbar>

    <vxe-table ref="xTable" border show-overflow :data="tableData" :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="username" title="昵称">
      </vxe-column>
      <vxe-column field="email" title="邮箱">
      </vxe-column>
      <vxe-column field="talk" title="留言">
      </vxe-column>
      <vxe-column field="createTime" title="创建时间" width="200">
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
      <el-pagination layout="prev, pager, next" @current-change="handleChange" :page-size="7" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMessage, delSingleMessage, delMessageAll } from '@/utils/http.js'
import { Pagination, Button, Input } from 'element-ui'
import Vue from 'vue'
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Input)
import dayjs from 'dayjs'
export default {
  data () {
    return {
      total: 0,
      page: '1',
      message: '',
      tableData: [
      ]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 搜索
    searchHandle () {
      this.getList()
    },
    // 删除全选的
    async handelDelAll () {
      if (!this.$refs.xTable.getCheckboxRecords().length) return this.$message.error('不能一个都不选')
      console.log(this.$refs.xTable.getCheckboxRecords().map(item => item._id));
      delMessageAll(this.$refs.xTable.getCheckboxRecords().map(item => item._id)).then(res => {
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
      delSingleMessage(row._id).then(res => {
        this.getList()
      })
    },
    // 渲染数据
    getList () {
      getMessage(this.page, this.message).then(res => {
        this.tableData = res.data.info.data
        this.total = res.data.info.num
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
s