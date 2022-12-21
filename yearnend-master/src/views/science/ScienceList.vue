<template>
  <div>
    <h2 class="titleHeader">科普列表</h2>
    <!-- 头部 -->
    <div class="header">
      <div class="inputGroup">
        <input
          type="text"
          v-model="searchTitle"
          required=""
          @keyup.enter="handleSearch"
          autocomplete="off"
        />

        <label for="name"> 搜索文章</label>
        <i class="el-icon-close" @click="handleClear"></i>
      </div>
      <button @click="handleSearch">
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>搜索</span>
      </button>
    </div>

    <!-- 表格部分 -->
    <el-table :data="tableData" border style="width: 100%">
      <!-- 文章封面 -->
      <el-table-column fixed prop="bg" label="文章封面" width="200px">
        <template slot-scope="scope">
          <div style="width: 150px; height: 80px">
            <el-image :src="$urlBase + scope.row.bg"></el-image>
          </div>
        </template>
      </el-table-column>
      <!-- 文章标题 -->
      <el-table-column prop="title" label="文章标题">
        <template slot-scope="scope">
          <div class="title">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>

      <!-- 分类-->
      <el-table-column prop="scienceType" label="科普分类">
        <template slot-scope="scope">
          <div class="scienceType">
            {{ scope.row.scienceType }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="scienceType" label="是否发布">
        <template slot-scope="scope">
          <div class="scienceType">
            <el-tag
              :type="scope.row.scienceType === '草稿' ? 'danger' : 'success'"
            >
              {{
                scope.row.scienceType === "草稿" ? "未发布" : "已发布"
              }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <!-- 文章标题 -->
      <el-table-column prop="reprinted" label="转载于">
        <template slot-scope="scope">
          <div class="reprinted">
            {{ scope.row.reprinted }}
          </div>
        </template>
      </el-table-column>
      <!-- 时间 -->
      <el-table-column prop="createTime" label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createTime | format
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="handeEdit(scope.row)"
          >
          </el-button>
          <el-button
            @click="handleDelClick(scope.row)"
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <div class="page">
      <el-pagination
        background
        :hide-on-single-page="this.DataCount < 5"
        :total="this.DataCount"
        layout="prev, pager, next"
        :page-size="5"
        ref="page"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { queryAllscience, delScienceArtical } from "@/utils/http.js";
import Vue from "vue";
import {
  Select,
  Option,
  Table,
  Button,
  TableColumn,
  Tag,
  Image,
  pagination,
} from "element-ui";
// 按需引入
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(Button);
Vue.use(Image);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(pagination);
export default {
  data() {
    return {
      tableData: [],
      DataCount: 0,
      searchTitle: "",
    };
  },
  computed: {
    // 这个是上选择标签的
  },
  mounted() {
    // this.getLabelData()
    queryAllscience(1).then((res) => {
      this.tableData = res.data.info.data;
      this.DataCount = res.data.info.count;
    });
  },
  // 添加
  methods: {
    handeEdit(row) {
      this.$router.push(`/home/science/publishscience?id=${row._id}`);
    },
    // 当前页
    handleCurrentChange(page) {
      let where;
      if (!this.searchTitle.trim()) {
        where = {};
      } else {
        where = { title: `${this.searchTitle}` };
      }
      // 分页
      queryAllscience(page, where).then((res) => {
        this.tableData = res.data.info.data;
        this.DataCount = res.data.info.count;
      });
    },
    // 搜索按钮
    handleSearch() {
      this.handleCurrentChange(1);
    },
    // 处理清除
    handleClear() {
      this.searchTitle = "";
      this.handleSearch();
    },
    // 删除文章
    //处理 删除
    handleDelClick(row) {
      // 改为post
      const imgReg = /<img.*?(?:>|\/>)/gi;
      // 匹配src属性
      const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i;
      const arr = row.info ? row.info.match(imgReg) : [];
      const imgs = [];
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          const src = arr[i].match(srcReg)[1];
          imgs.push(src.split("scienceUpload/")[1]);
        }
      }

      delScienceArtical(row._id, imgs).then((res) => {
        if (res.data.ok) {
          this.handleSearch(this.$refs.page.internalCurrentPage);
          this.$message({
            message: res.data.info,
            type: "success",
          });
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
  },
  filters: {
    //  加载时间
    format(date) {
      return dayjs(date - 0).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>


<!-- css样式 -->
<style lang="scss" scoped>
.inputGroup :is(input:focus, input:valid) ~ label[data-v-d52083f0] {
  background-color: #e6eff7;
}
.titleHeader {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  font-size: 14px;
  padding-left: 20px;
  margin-top: 10px;
  border-left: 3px solid #0081ff;
  width: 100%;
  text-align: left;
}
.header {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  /* From uiverse.io by @adamgiebl */
  button {
    font-family: inherit;
    font-size: 12px;
    background: #4f6583;
    color: white;
    padding: 5px 10px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button:hover span {
    transform: translateX(5em);
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
}
/* From uiverse.io by @Maximinodotpy */
.inputGroup {
  position: relative;
  font-family: "Segoe UI", sans-serif;
  margin: 1em 0 1em 0;
  width: 300px;
  position: relative;
  margin: 0 30px 0 50px;
  &:hover .el-icon-close {
    display: block;
  }
}
.el-icon-close {
  position: absolute;
  top: 12px;
  right: 10px;
  color: #999;
  display: none;
  cursor: pointer;
}
.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 1px solid #dcdfe6;
  background-color: transparent;
  border-radius: 20px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  left: 0;
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(100, 100, 100);
}

.inputGroup :is(input:focus, input:valid) ~ label {
  transform: translateY(-50%) scale(0.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #f2f2f2;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}
.title {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 100px;
}
</style>