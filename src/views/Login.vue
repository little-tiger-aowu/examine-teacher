<template>
  <div class="login">
    <div class="logo">
      <el-row type="flex" justify="space-between">
        <el-col :span="1">
          <!-- <img src="@/assets/logo-2.png" width="100%" /> -->
          <img src="@/assets/logo.png" width="400%" />
        </el-col>
        <el-col :span="3">
          
        </el-col>
      </el-row>
    </div>

    <el-row class="login-box">
      <el-col :xs="24" :sm="15" :md="16" :lg="17" :xl="18">
        <div class="login-txt">
          <!-- <img src="@/assets/login-txt.png" /> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="9" :md="8" :lg="7" :xl="6">
        <div class="box-card">
          <el-card>
            <div class="form-box">
              <div class="title-txt">
                <div style="color: rgb(0, 89, 160); font-size: 23px;">
                  <b> “全民新show”病例巡回展</b>
                </div>
                <!-- 登录 -->
                <h3>评审登录</h3>
              </div>

              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="username">
                  <el-input
                    v-model="ruleForm.username"
                    placeholder="用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    placeholder="请输入密码"
                    v-model="ruleForm.password"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="width: 100%"
                    type="primary"
                    @click="submitForm('ruleForm')"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { login } from "@/api/index";
import Cookies from "js-cookie";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm).then((res) => {
            if (res.code === 200) {
              this.$message({ message: "登陆成功", type: "success" });
              setToken(res.data.accessToken);
              Cookies.set("user", res.data);
              if (res.data.userName == "admin") {
                this.$router.push("/allList");
              } else {
                this.$router.push("/");
              }
            } else {
              this.$message(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #f5f5f5;
  background: url("~@/assets/login-banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 5%;
  .login-box {
    max-width: 100%;
    margin: 0 auto;
  }
  .box-card {
    .el-card {
      max-width: 100%;

      width: 100%;
      margin: 0 auto;
    }
    .title {
      text-align: right;
    }
    .form-box {
      .title-txt {
        text-align: center;
        // padding-bottom: 15px;
        // img {
        //   max-width: 70%;
        //   padding-bottom: 15px;
        // }
      }
    }
  }
  .logo {
    position: absolute;
    top: 5%;
    left: 0;
    width: 100%;
    .el-row {
      padding: 0 50px;
    }
    // img {
    //   width: 90%;
    // }
  }
  .login-txt,
  .box-card {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .login-txt {
    padding-right: 20%;
    div {
      height: 100%;
    }
    img {
      max-width: 50%;
    }
  }
}
</style>