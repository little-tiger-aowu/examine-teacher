<template>
  <div class="home">
    <router-view />
    <!--列表信息-->
    <div class="box-list">
      <div v-for="item in illnessList" :key="item.id">
        <el-card class="box-card" @click.native="routerPush(item)">
          <div class="title-list" :class="item.illnessEvaluate.wholeScore ? 'active':''">
            <p class="title-txt">{{item.illnessCase.title}}</p>
            <p class="title-num">
              <i class="el-icon-circle-check"></i> {{item.illnessEvaluate.wholeScore ? item.illnessEvaluate.scoreSum:'000'}}分
            </p>
          </div>
          <div class="item-box">
            <p>病例作者：{{item.illnessCase.author}}</p>
            <p>所在单位：{{item.illnessCase.company}}</p>
            <p>评审状态：{{item.illnessEvaluate.wholeScore ? '已评分':'未评分'}}</p>
          </div>
        </el-card>
      </div>
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
    max-width: 1000px;
    margin: 20px auto;
    >div {
      margin-bottom: 20px;
    }
    .title-list {
      background-color: #f5f5f5;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding: 5px 0;
      margin-bottom: 10px;
      .title-num {
        font-size: 20px;
        color:#E8E8E8
      }
      .title-txt {
        color:#585858
      }
    }
    .active {
      .title-num,.title-txt {
      color: #81c26a;}
    }
    p {
      padding: 0 40px;
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
}
</style>
<style lang="scss">
.box-list {
  .el-card__body {
    padding: 15px 0;
  }
}
</style>
