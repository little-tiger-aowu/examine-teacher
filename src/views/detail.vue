<template>
  <div class="detail">
    <el-row :gutter="10" style="margin:20px 0;">
      <el-col :span="12">
        <iframe :src="illness.illnessCase.pdfAddress" frameborder="0">
          <p>Your browser does not support iframes.</p>
        </iframe>
      </el-col>
      <el-col :span="12">
        <el-col :span="16" :offset="4">
          <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-row :gutter="20" class="title">
                <el-col :span="7">评分要素</el-col>
                <el-col :span="10">评分要素</el-col>
                <el-col :span="7">分项评分</el-col>
              </el-row>
              <el-form-item prop="checkDiagnosis">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    检查和诊断
                    （15分）
                  </el-col>
                  <el-col :span="10">
                    <span>主诉、病史、面向检查、口内检查、模型分析、头颅曲断片描述、头影测量、问题列表、总体诊断、CBCT片</span>
                  </el-col>
                  <el-col :span="7">
                    <el-input-number
                      v-model="ruleForm.checkDiagnosis"
                      controls-position="right"
                      size="small"
                      :precision="0"
                      :min="0"
                      :max="15"
                      @change="allNUm()"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item prop="goalPlan">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    治疗目标和计划
                    （15分）
                  </el-col>
                  <el-col :span="10">
                    <span>治疗目标、治疗方案和矫治理念</span>
                  </el-col>
                  <el-col :span="7">
                    <el-input-number
                      @change="allNUm()"
                      size="small"
                      v-model="ruleForm.goalPlan"
                      controls-position="right"
                      :precision="0"
                      :min="0"
                      :max="15"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item prop="treatmentProcess">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    治疗过程
                    （30分）
                  </el-col>
                  <el-col :span="10">
                    <span>复诊时间和次数、口内照、面相照、矫治描述</span>
                  </el-col>
                  <el-col :span="7">
                    <el-input-number
                      size="small"
                      @change="allNUm()"
                      v-model="ruleForm.treatmentProcess"
                      controls-position="right"
                      :precision="0"
                      :min="0"
                      :max="30"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item prop="treatmentResult">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    治疗结果
                    （20分）
                  </el-col>
                  <el-col :span="10">
                    <span>面相对比、口内对比、头颅曲断片对比、头影测量分析、CBCT对比</span>
                  </el-col>
                  <el-col :span="7">
                    <el-input-number
                      size="small"
                      @change="allNUm()"
                      v-model="ruleForm.treatmentResult"
                      controls-position="right"
                      :precision="0"
                      :min="0"
                      :max="20"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item prop="summary">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    讨论和经验分享
                    （10分）
                  </el-col>
                  <el-col :span="10">
                    <span>对于此病例的总结和经验提取</span>
                  </el-col>
                  <el-col :span="7">
                    <el-input-number
                      size="small"
                      @change="allNUm()"
                      v-model="ruleForm.summary"
                      controls-position="right"
                      :precision="0"
                      :min="0"
                      :max="10"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item prop="wholeScore">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    总体评分
                    （10分）
                  </el-col>
                  <el-col :span="10">
                    <span>根据总体内容、完整度及治疗效果</span>
                  </el-col>
                  <el-col :span="7">
                    <el-input-number
                      size="small"
                      @change="allNUm()"
                      v-model="ruleForm.wholeScore"
                      controls-position="right"
                      :precision="0"
                      :min="0"
                      :max="10"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item prop="remark">
                <el-row :gutter="20" class="title-content">
                  <el-col :span="7">
                    总分合计（100分）
                    <div class="txt-1">{{ruleForm.scoreSum ? ruleForm.scoreSum:"0"}}</div>
                  </el-col>
                  <el-col :span="16">
                    <div>评语及建议备注</div>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="ruleForm.remark"
                      style="margin-top:10px"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="hasRecommend">
                <el-row :gutter="10" class="title-content">
                  <el-col :span="7">推荐评级</el-col>
                  <el-col :span="17">
                    <el-col :span="8">
                      <el-radio
                        size="mini"
                        v-model="ruleForm.hasRecommend"
                        :label="1"
                        disabled
                        border
                      >
                        重点推荐
                        A类
                      </el-radio>
                      <p>（总分≥85分）</p>
                    </el-col>
                    <el-col :span="8">
                      <el-radio
                        size="mini"
                        v-model="ruleForm.hasRecommend"
                        :label="2"
                        disabled
                        border
                      >
                        一般推荐
                        B类
                      </el-radio>
                      <p>（70≤总分＜85分）</p>
                    </el-col>
                    <el-col :span="8">
                      <el-radio
                        size="mini"
                        v-model="ruleForm.hasRecommend"
                        :label="3"
                        disabled
                        border
                      >
                        不推荐
                        C类
                      </el-radio>
                      <p>（总分＜70分）</p>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item style="text-align: center;">
                <el-button
                  size="small"
                  style="width:50%;"
                  type="primary"
                  @click="submitForm('ruleForm')"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { submitEvaluate } from "@/api/index";
export default {
  name: "detail",
  data() {
    return {
      ruleForm: {
        checkDiagnosis: 0,
        goalPlan: 0,
        treatmentProcess: 0,
        treatmentResult: 0,
        summary: 0,
        wholeScore: 0,
        hasRecommend: 3,
      },
      rules: {
        checkDiagnosis: [
          { required: true, message: "请评分", trigger: "blur" },
        ],
        goalPlan: [{ required: true, message: "请评分", trigger: "blur" }],
        treatmentProcess: [
          { required: true, message: "请评分", trigger: "blur" },
        ],
        treatmentResult: [
          { required: true, message: "请评分", trigger: "blur" },
        ],
        summary: [{ required: true, message: "请评分", trigger: "blur" }],
        wholeScore: [{ required: true, message: "请评分", trigger: "blur" }],
        remark: [
          { required: true, message: "请填写评语及建议备注", trigger: "blur" },
        ],
      },
      illness: JSON.parse(Cookies.get("illness")),
    };
  },
  watch: {},
  created() {
    console.log(this.illness);
    if(this.illness.illnessEvaluate.wholeScore){
      this.ruleForm = this.illness.illnessEvaluate
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.illnessId = this.illness.illnessCase.id;
          this.ruleForm.id = this.illness.illnessEvaluate.id;
          submitEvaluate(this.ruleForm).then((res) => {
            console.log(res);
            this.$router.push("/");
            this.$message({ message: "评分成功！", type: "success" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    allNUm() {
      console.log(1);
      console.log(this.ruleForm.summary);
      this.ruleForm.scoreSum = 0;
      this.ruleForm.scoreSum =
        this.ruleForm.checkDiagnosis +
        this.ruleForm.goalPlan +
        this.ruleForm.treatmentProcess +
        this.ruleForm.treatmentResult +
        this.ruleForm.summary +
        this.ruleForm.wholeScore;
      if (this.ruleForm.scoreSum >= 85) {
        this.ruleForm.hasRecommend = 1;
      } else if (this.ruleForm.scoreSum < 85 && this.ruleForm.scoreSum >= 70) {
        this.ruleForm.hasRecommend = 2;
      } else {
        this.ruleForm.hasRecommend = 3;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  iframe {
    width: 100%;
    height: 100vh;
  }
  .title {
    font-size: 18px;
    background-color: #f5f5f5;
    padding: 10px 40px;
    margin-bottom: 10px;
  }
  .title-content {
    margin-top: 10px;
    line-height: 20px;
    padding: 0 40px;
    color: #535353;
    p {
      font-size: 12px;
      padding-top: 5px;
    }
  }
  .el-divider {
    background-color: #f5f5f5;
  }
  .txt-1 {
    font-size: 50px;
    padding-top: 20px;
    color: #80c269;
  }
}
</style>
<style lang="scss">
.detail {
  .el-card__body {
    padding: 15px 0;
  }
}
</style>