<template>
  <div class="login">
    <el-card class="box-card">
      <div class="title">
        <!-- <el-link type="primary" href="/#/register" :underline="false">
          去注册
          <i class="el-icon-arrow-right"></i>
        </el-link>-->
      </div>
      <div class="form-box">
        <h3>登录</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
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
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
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
              this.$router.push("/");
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
  background: url(~@/assets/bg-1.png) 0% 0% / cover no-repeat;
  height: 100vh;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  .box-card {
    width: 500px;
    .title {
      text-align: right;
    }
    .form-box {
      padding: 20px;
      h3 {
        text-align: center;
      }
    }
  }
}
</style>