<template>
  <div class="home">
    <router-view />
    <!--列表信息-->
    <div class="box-list">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in illnessList" :key="item.id">
          <el-card
            class="box-card"
            :class="item.illnessEvaluate.wholeScore ? 'active':''"
            @click.native="routerPush(item)"
          >
            <div class="title-list">
              <p class="title-txt">{{item.illnessCase.title}}</p>
            </div>
            <el-col :span="15" style="padding:0">
              <div class="item-box">
                <p>病例作者：{{item.illnessCase.author}}</p>
                <p>所在单位：{{item.illnessCase.company}}</p>
                <p>评审状态：{{item.illnessEvaluate.wholeScore ? '已评分':'未评分'}}</p>
              </div>
            </el-col>
            <el-col :span="9" style="padding:0">
              <p class="title-num">
                <!-- <i class="el-icon-circle-check"></i> -->
                {{item.illnessEvaluate.wholeScore ? item.illnessEvaluate.scoreSum:'000'}}分
              </p>
              <div class="box-kind">
                <p v-if="item.illnessEvaluate.scoreSum == null">暂无</p>
                <p v-else>
                  <!-- {{item.illnessEvaluate.scoreSum ? }} -->
                  <span v-if="item.illnessEvaluate.scoreSum>=85">A类</span>
                  <span v-else-if="70<item.illnessEvaluate.scoreSum<85">B类</span>
                  <span v-else-if="item.illnessEvaluate.scoreSum<70">C类</span>
                </p>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { viewIllnessList } from "@/api/index";
export default {
  name: "Home",
  data() {
    return {
      illnessList: [], //列表
    };
  },
  created() {
    this._getviewIllnessList();
  },
  methods: {
    _getviewIllnessList() {
      viewIllnessList().then((res) => {
        this.illnessList = res.data;
        console.log(res);
      });
    },
    routerPush(item) {
      console.log(item);
      // if (item.illnessEvaluate.wholeScore) {
      // this.$message({ message: "该病例已评分", type: "success" });
      // return false;
      // this.$router.push("/detail");
      // }
      // window.open(item.illnessCase.pdfAddress);
      // console.log(item.illnessCase.pdfAddress);
      Cookies.set("illness", item);
      this.$router.push("/detail");
    },
  },
};
</script>
<style lang="scss" scoped>
.home {

  .box-card {
    padding-bottom: 10px;
  }
  .top-title {
    background-color: #005fad;
    color: #ffffff;
    text-align: center;
    height: 110px;
    h1 {
      line-height: 80px;
      font-size: 30px;
    }
    p {
      font-size: 15px;
      line-height: 30px;
      .el-link {
        font-size: 15px;
        line-height: 30px;
        color: #ffffff;
        padding-left: 30px;
      }
    }
  }
  .box-list {
    max-width: 1200px;
    margin: 20px auto;
    > div {
      margin-bottom: 20px;
    }
    .title-list {
      background-color: #f5f5f5;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding: 5px 0;
      margin-bottom: 10px;

      .title-txt {
        color: #585858;
      }
    }
    .title-num {
      padding-top: 10px;
      font-size: 30px;
      color: #e8e8e8;
      text-align: center;
    }
    .active {
      .title-num,
      .title-txt {
        color: #81c26a;
      }
    }
    p {
      padding: 0 20px;
      line-height: 30px;
    }
    .el-card {
      border-radius: 10px;
    }

    .item-box {
      font-size: 13px;
      color: #434343;
    }
  }
  .box-kind {
    text-align: center;
    padding-top: 10px;
  }
}
</style>
<style lang="scss">
.box-list {
  .el-card__body {
    padding: 15px 0;
  }
}
</style>
