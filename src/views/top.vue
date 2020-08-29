<template>
  <div class="home">
    <div class="top-title">
      <el-row>
        <el-col :span="4">
          <!-- <div class="logo">
            <img src="@/assets/logo.png" />
          </div> -->
        </el-col>
        <el-col :span="16" :offset="4">
          <h1 style="text-align: center;padding-top:5%">评审列表</h1>
        </el-col>
        <el-col :span="4">
          <!-- <p>
            <span>评审人：{{user.userName}}</span>
            <el-link type="primary" href="/#/login" :underline="false">退出</el-link>
          </p>-->
          <div class="header-buttom">
            <span class="header-user">
              <i class="el-icon-user-solid"></i>
              {{user.userName}}
            </span>
            <span class="header-line">|</span>
            <span class="header-out">
              <router-link to="/login">退出</router-link>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view />
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
      user: JSON.parse(Cookies.get("user")),
    };
  },
  created() {
    console.log(Cookies.get("user"));
    this._getviewIllnessList();
  },
  methods: {
    _getviewIllnessList() {
      viewIllnessList().then((res) => {
        this.illnessList = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .top-title {
    // background-color: #005fad;
    background-image: url(~@/assets/banner.jpg);
    // background-size:auto 100% ;
    background-position: center;
    height: 150px;
    color: #ffffff;
    text-align: center;
    padding: 40px 0;
    position: relative;
    .el-row {
      // max-width: 1000px;
      margin: 0 auto;
      height: 100%;
    }
    .logo {
      img {
        height: 35px;
      }
    }
    h1 {
      // line-height: 80px;
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
  .header-buttom {
      position: absolute;
      bottom: -20px;
      right: 25px;
      height: 30px;
      line-height: 27px;
      padding: 0 15px;
      background-color: #f6f6f6;
      border-radius: 5px;
      span {
        font-size: 12px;
      }
      .header-line {
        color: #dcdcdc;
        padding: 0 15px;
      }
      .header-user {
        color: #707070;
      }
      .header-out {
        a {
          color: #005fae;
          text-decoration: none;
        }
      }
    }
}
</style>
