<template>
  <div>
    <!-- 统计数据 -->
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-mouse" style="color: #40c9c6" />
          </div>
          <div class="card-desc">
            <div class="card-title">周访问量</div>
            <div class="card-count">{{ all }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-document" style="color: #f4516c" />
          </div>
          <div class="card-desc">
            <div class="card-title">文章量</div>
            <div class="card-count">
              {{
                astrinautCount +
                flowCount +
                scienceCount +
                newsCount +
                historyCount
              }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-user-solid" style="color: #36a3f7" />
          </div>
          <div class="card-desc">
            <div class="card-title">管理者</div>
            <div class="card-count">{{ adminCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-position" style="color: #41b883" />
          </div>
          <div class="card-desc">
            <div class="card-title">航天员</div>
            <div class="card-count">{{ astrinautCount }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 一周访问量展示 -->
    <el-card style="margin-top: 1.25rem">
      <div class="e-title">本周访问量</div>
      <div style="height: 350px">
        <week-line :homeData="homeData" v-if="homeData.length" />
      </div>
    </el-card>
    <!-- 文章贡献统计 -->
    <el-card style="margin-top: 1.25rem">
      <div class="e-title">注册量统计</div>
      <div style="height: 350px">
        <article-contribution :homeData="homeData" v-if="homeData.length" />
      </div>
    </el-card>
    <el-row :gutter="20" style="margin-top: 1.25rem">
      <!-- 文章量排行 -->
      <el-col :span="16">
        <el-card>
          <div class="e-title">文章量排行</div>
          <div style="height: 350px">
            <number-articles :homeData="homeData" v-if="homeData.length" />
          </div>
        </el-card>
      </el-col>
      <!-- 科普文章分类统计 -->
      <el-col :span="8">
        <el-card>
          <div class="e-title">科普文章分类统计</div>
          <div style="height: 350px">
            <science-article />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 1.25rem">
      <!-- 卫星发射基地分布 -->
      <el-col :span="16">
        <el-card>
          <div class="e-title">卫星发射基地分布</div>
          <div style="height: 350px">
            <satellite />
          </div>
        </el-card>
      </el-col>
      <!-- 模块标签统计 -->
      <el-col :span="8">
        <el-card>
          <div class="e-title">模块标签统计</div>
          <div style="height: 350px">
            <home-label v-if="lableName.length" :lableName="lableName" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from "vue";
import { Card, Col, Tag, Radio, Row } from "element-ui";
import WeekLine from "@/components/homeMain/WeekLine";
import ArticleContribution from "@/components/homeMain/ArticleContribution";
import ScienceArticle from "@/components/homeMain/ScienceArticle";
import Satellite from "@/components/homeMain/Satellite";
import HomeLabel from "@/components/homeMain/HomeLabel";
import NumberArticles from "@/components/homeMain/NumberArticles";
import { getHomePage } from "@/utils/http.js";

Vue.use(Card);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Radio);
Vue.use(Row);

export default {
  components: {
    WeekLine,
    ArticleContribution,
    ScienceArticle,
    Satellite,
    HomeLabel,
    NumberArticles,
  },
  data () {
    return {
      lableName: ["历史线", "科普", "基础流程", "航天员", "航天新闻"],
      adminCount: 0,
      astrinautCount: 0,
      flowCount: 0,
      scienceCount: 0,
      newsCount: 0,
      historyCount: 0,
      all: 0,
      homeData: [],
    };
  },

  methods: {
    getData () {
      getHomePage().then((res) => {
        this.homeData = res.data;
        this.adminCount = res.data[3].admin;
        this.astrinautCount = res.data[5].astrinaut;
        this.flowCount = res.data[1].flow;
        this.scienceCount = res.data[0].science;
        this.newsCount = res.data[2].news;
        this.historyCount = res.data[4].history;
        let all = 0;
        res.data[6].forEach((item) => {
          all += JSON.parse(item.visits);
        });
        this.all = all;
      });
    },
  },
  mounted () {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.card-icon-container {
  display: inline-block;
  font-size: 3rem;
}
.area-wrapper {
  display: flex;
  justify-content: center;
}
.card-desc {
  font-weight: bold;
  float: right;
}
.card-title {
  margin-top: 0.3rem;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1rem;
}
.card-count {
  margin-top: 0.75rem;
  color: #666;
  font-size: 1.25rem;
}
.echarts {
  width: 100%;
  height: 100%;
}
.e-title {
  font-size: 13px;
  color: #202a34;
  font-weight: 700;
}
</style>
