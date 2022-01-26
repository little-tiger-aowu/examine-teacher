<template>
  <div class="home">
    <img src="@/assets/banner-2.jpg" width="100%" v-if="isshow" />
    <!-- <img src="@/assets/banner-1.jpg" width="100%" v-else /> -->
    <div class="top-title">
      <el-row>
        <el-col :span="4">
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
      isshow: true,
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
  watch: {
    $route(to) {
      console.log(to);
      if (to.fullPath == "/Home") {
        this.isshow = true;
      } else if (to.fullPath == "/detail") {
        this.isshow = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .top-title {
    color: #ffffff;
    text-align: center;
    padding: 40px 0;
    margin-top: -80px;
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
