<template>
  <div>
    <h2 class="titleHeader">分类</h2>
    <el-row>
      <!-- 左边添加按钮 -->
      <el-col :span="3">
        <div class="grid-content bg-purple-dark leftMargin">
          <button class="cssbuttons-io-button" @click="scienceLable = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              ></path>
            </svg>
            <span>添加</span>
          </button>
        </div>
      </el-col>

      <!-- 右边搜索框 -->
      <el-col :span="5" :offset="16">
        <div class="grid-content bg-purple-dark">
          <div class="search" style="width: 200px">
            <input
              @keyup="handelSearch"
              type="text"
              class="search__input"
              placeholder="搜索标签"
              v-model="inputText"
            />
            <button class="search__button">
              <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="margin: 10px"></div>

    <!-- 列表 -->
    <el-table border style="width: 800px" :data="tableData">
      <el-table-column prop="scienceLable" label="分类名"> </el-table-column>
      <el-table-column prop="articleCount" label="文章量"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createTime | format
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <!-- 按钮 -->
          <el-button
            @click="delItem(scope.row.id)"
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="scienceLable"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <div class="inputGroup">
          <input
            type="text"
            required=""
            v-model="addLableText"
            autocomplete="off"
          />
          <label for="name">标签名</label>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="scienceLable = false">取 消</el-button>
        <el-button type="primary" @click="addLableHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from "dayjs";
import {
  getLabaleScience,
  addLabaleScience,
  delLabaleScience,
} from "@/utils/http.js";
import Vue from "vue";
import {
  Row,
  Col,
  TableColumn,
  Dialog,
  Button,
  Option,
  Table,
} from "element-ui";
// 按需引入
Vue.use(Row);
Vue.use(Col);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);

export default {
  name: "ArticlePublish",
  data() {
    return {
      scienceLable: false,
      addLableText: "",
      inputText: "",
      oldData: [],
    };
  },
  computed: {
    tableData() {
      return this.oldData.filter((item) =>
        item.scienceLable.includes(this.inputText)
      );
    },
  },
  mounted() {
    this.findLabel();
  },
  filters: {
    format(time) {
      return dayjs(time - 0).format("YYYY-MM-DD");
    },
  },
  methods: {
    // 获取查询
    findLabel() {
      getLabaleScience().then((res) => {
        this.oldData = res.data.info;
      });
    },

    // 搜索框
    handelSearch() {},
    // 添加标签
    addLableHandle() {
      this.scienceLable = false;
      if (!this.addLableText.trim()) return this.$message.error("不能为空");
      addLabaleScience(this.addLableText).then((res) => {
        this.addLableText = "";
        if (res.data.ok) {
          this.findLabel();
          this.$message({
            message: res.data.info,
            type: "success",
          });
        } else {
          this.$message.error(res.data.info);
        }
      });
    },

    //
    handleClose(done) {
      this.addLableText = "";
      done();
    },

    // 删除按钮
    delItem(id) {
      delLabaleScience(id).then((res) => {
        if (res.data.ok) {
          this.findLabel();
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
};
</script>
<style lang="scss" scoped>
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
  margin-bottom: 20px;
}
.leftMargin {
  margin-left: 10px;
}
/* button按钮 From uiverse.io by @adamgiebl */
.cssbuttons-io-button {
  display: flex;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 12px;
  padding: 5px;
  color: white;
  background: #ad5389;
  background: linear-gradient(
    0deg,
    rgba(20, 167, 62, 1) 0%,
    rgba(102, 247, 113, 1) 100%
  );
  border: none;
  box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
  letter-spacing: 0.05em;
  border-radius: 20em;
}

.cssbuttons-io-button svg {
  margin-right: 6px;
}

.cssbuttons-io-button:hover {
  box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
}

.cssbuttons-io-button:active {
  box-shadow: 0 0.3em 1em -0.5em #14a73e98;
}
/* input输入框 From uiverse.io by @joe-watson-sbf */
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.search__input {
  font-family: inherit;
  font-size: inherit;
  background-color: #fdfdfd;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 12em;
  transition: all ease-in-out 0.5s;
  margin-right: -2rem;
}

.search__input:hover,
.search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
  background-color: #fff;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: #ccc;
}

.search__input:focus + .search__button {
  background-color: #f0eeee;
}

.search__button {
  border: none;
  background-color: #f4f2f2;
  margin-top: 0.1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #409eff;
}
// 对话框内的input框
/* From uiverse.io by @Maximinodotpy */
.inputGroup {
  font-family: "Segoe UI", sans-serif;
  margin: 1em 0 1em 0;
  max-width: 190px;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
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
  border-radius: 5px;
}

.inputGroup :is(input:focus, input:valid) ~ label {
  transform: translateY(-50%) scale(0.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #409eff;
  color: #fff;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}
</style>
