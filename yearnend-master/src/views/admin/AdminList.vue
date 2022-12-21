<template>
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
              placeholder="搜索管理员"
              style="width: 230px; margin: 0 20px"
              v-model="getAdmin"
              clearable
            >
            </el-input>
          </div>
        </div>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      :row-config="{ height: 100 }"
      :data="tableData"
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
      <vxe-column title="创建时间">
        <template #default="{ row }">
          {{ row.createTime | formatTime }}
        </template>
      </vxe-column>
      <vxe-column title="删除" width="55">
        <template #default="{ row }">
          <vxe-button
            type="text"
            @click="removeRowEvent(row)"
            icon="vxe-icon-delete"
          ></vxe-button>
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
</template>

<script>
import { getAdminAll, delAdmin, delAdminBatch } from "@/utils/http.js";
import { Input, Button, Avatar, Card } from "element-ui";
import Vue from "vue";
import dayjs from "dayjs";
import { mapState } from "vuex";
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Card);
Vue.use(Button);
export default {
  data() {
    return {
      getAdmin: "",
      dataList: [],
    };
  },
  computed: {
    ...mapState(["globalUsername"]),
    tableData() {
      // 搜索关键字
      return this.dataList.filter((item) =>
        item.username.includes(this.getAdmin)
      );
    },
  },
  mounted() {
    getAdminAll().then((res) => {
      this.dataList = res.data.info.filter(
        (item) => item.username !== this.globalUsername
      );
    });
  },
  filters: {
    formatTime(date) {
      return dayjs(date - 0).format("YYYY-MM-DD HH:mm");
    },
  },
  methods: {
    // 全选删除
    handelDelAll() {
      if (!this.$refs.xTable.getCheckboxRecords().length)
        return this.$message.error("不能一个都不选");
      delAdminBatch(
        this.$refs.xTable.getCheckboxRecords().map((item) => item._id),
        this.$refs.xTable
          .getCheckboxRecords()
          .map((item) => item.avatar.split("/")[1])
      );
      this.$refs.xTable.removeCheckboxRow();
    },
    removeRowEvent(row) {
      // if(row)
      delAdmin(
        row._id,
        localStorage.getItem("token"),
        row.avatar.split("/")[1]
      ).then((res) => {
        if (res.data.ok) {
          this.$refs.xTable.remove(row);
        } else {
          this.$message.error(res.data.info);
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
</style>
