<template>
  <div class="login">
    <el-card class="box-card">
      <div class="title">
        <el-link type="primary" href="/login" :underline="false">
          <i class="el-icon-arrow-left"></i> 去登录
        </el-link>
      </div>
      <div class="form-box">
        <h3>注册账号</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div>
            <el-form-item prop="tel">
              <el-input v-model="ruleForm.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="tel" class="code-send">
              <el-input v-model="ruleForm.tel" placeholder="短信验证码"></el-input>
              <el-button round size="small">发送验证码</el-button>
            </el-form-item>
            <!-- <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>-->
            <el-form-item prop="pass">
              <el-input
                placeholder="密码"
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                placeholder="确认密码"
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%" type="primary" @click="nextForm">下一步</el-button>
            </el-form-item>
          </div>
          
          <div>
            <el-form-item prop="realname">
              <el-input v-model="ruleForm.realname" placeholder="请输入您的真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="unit">
              <el-input v-model="ruleForm.unit" placeholder="请填写您的单位名称"></el-input>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="area">
                  <el-select v-model="ruleForm.area" placeholder="请选择省份" style="width:100%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="city">
                  <el-select v-model="ruleForm.city" placeholder="请选择城市" style="width:100%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item prop="department">
              <el-select v-model="ruleForm.department" placeholder="请选择您所属科室" style="width:100%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #f5f5f5;
  background: url(//ps.faisys.com/image/demo2.png) 0% 0% / cover no-repeat;
  height: 100vh;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  .box-card {
    width: 500px;
    .title {
      text-align: left;
    }
    .form-box {
      padding: 20px;
      h3 {
        text-align: center;
      }
      .code-send {
        position: relative;
        .el-button {
          position: absolute;
          top: 4px;
          right: 4px;
        }
      }
    }
  }
}
</style>