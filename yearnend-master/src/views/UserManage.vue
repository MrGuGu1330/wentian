<template>
  <div>
    <el-card class="box-card">
      <vxe-toolbar>
        <template #buttons>
          <div class="header">
            <el-button
              size="small"
              @click="handelDelAll"
              type="danger"
              style="height: 30px"
              >删除选中</el-button
            >
            <div>
              <el-input
                placeholder="搜索用户名"
                style="width: 180px; margin: 0 20px"
                v-model="username"
                clearable
              >
              </el-input>
              <el-input
                placeholder="搜索邮箱"
                style="width: 180px; margin: 0 20px"
                v-model="email"
                clearable
              >
              </el-input>
              <el-button
                icon="el-icon-search"
                circle
                @click="getListData"
              ></el-button>
            </div>
          </div>
        </template>
      </vxe-toolbar>

      <vxe-table
        ref="xTable"
        border
        show-overflow
        :row-config="{ height: 100 }"
        :data="dataList"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column title="头像" width="100" align="center">
          <template #default="{ row }">
            <div style="padding: 20px">
              <el-avatar :size="50" :src="$urlBase + row.avatar"></el-avatar>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="username" title="用户名"> </vxe-column>
        <vxe-column field="_id" title="唯一标识符"> </vxe-column>

        <vxe-column field="email" title="邮箱"> </vxe-column>
        <vxe-column title="创建时间">
          <template #default="{ row }">
            {{ row.createTime | formatTime }}
          </template>
        </vxe-column>
        <vxe-column title="删除" width="55">
          <template #default="{ row }">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circletype="text"
              @click="removeRowEvent(row)"
              size="small"
              circle
            ></el-button>
          </template>
        </vxe-column>
        <!--自定义空数据模板-->
        <template #empty>
          <span style="color: red">
            <p>没有更多数据了！</p>
          </span>
        </template>
      </vxe-table>
    </el-card>
    <el-pagination
      class="page"
      background
      layout="->, prev, pager, next, total, jumper"
      :total="this.count"
      :page-size="5"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAllUser, delUser, delBatch } from "@/utils/http.js";
import { Input, Button, Avatar, Card, Pagination } from "element-ui";
import Vue from "vue";
import dayjs from "dayjs";
import { mapState } from "vuex";
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Card);
Vue.use(Button);
Vue.use(Pagination);
export default {
  data() {
    return {
      dataList: [],
      page: "1",
      username: "",
      email: "",
      count: 0,
    };
  },
  mounted() {
    this.getListData();
  },
  filters: {
    formatTime(date) {
      return dayjs(date - 0).format("YYYY-MM-DD HH:mm");
    },
  },
  methods: {
    // 查询
    getListData() {
      getAllUser(this.page, this.username, this.email).then((res) => {
        this.count = res.data.data.count;
        this.dataList = res.data.data.data;
      });
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getListData();
      });
    },
    // 全选删除
    handelDelAll() {
      if (!this.$refs.xTable.getCheckboxRecords().length)
        return this.$message.error("不能一个都不选");
      delBatch(
        this.$refs.xTable.getCheckboxRecords().map((item) => item._id),
        this.$refs.xTable
          .getCheckboxRecords()
          .map((item) => item.avatar.split("/")[1])
      ).then((res) => {
        this.$refs.xTable.removeCheckboxRow();
        this.getListData();
      });
    },
    removeRowEvent(row) {
      // if(row)
      delUser(row._id, row.avatar.split("/")[1]).then((res) => {
        if (res.data.ok) {
          this.$refs.xTable.remove(row);
          this.getListData();
        } else {
          this.$message.error("服务器繁忙");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-width: 700px;
  padding: 20px 0px 0 0;
}
.text {
  font-size: 14px;
}

.box-card {
  padding: 0px 20px 40px;
}

.page {
  margin-top: 50px;
}
</style>
