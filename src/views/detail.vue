<template>
  <div class="detail">
    <el-row :gutter="20" style="margin: 20px">
      <el-col :span="24">
        <el-col :span="22">
          <span  @click="back" class="back">
          <i class="el-icon-arrow-left"></i> 返回
        </span>
        </el-col>
        <el-col :span="2" style="">
          <el-button :span="12" type="primary">
            <a style="color: #eeeeee;text-decoration: none;" href="https://ssl.resource.synconize.com/binglishoujidafen.xlsx">下载评分表</a>
          </el-button>
        </el-col>
      </el-col>

      <el-col :span="16">
        <iframe
          :src="illness.illnessCase.pdfAddress + '?t=' + nowData"
          frameborder="0"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
        <div v-if="illness.illnessCase.videoAddress" style="height: auto;width: auto">
          <hr/>
<!--          <iframe v-if="fileType === 'ppt' || this.fileType === 'pptx'" id="iframe1" width="800" height="600" frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes'-->
<!--                  :src="'http://view.officeapps.live.com/op/view.aspx?src='+illness.illnessCase.videoAddress">-->
<!--            <p>Your browser does not support iframes.</p>-->
<!--          </iframe>-->
          <div v-if="fileType === 'ppt' || this.fileType === 'pptx'"></div>
<!--          <el-button style="float: right" v-if="fileType === 'ppt' || this.fileType === 'pptx'" :span="12" type="primary">-->
<!--            <a style="color: #eeeeee;text-decoration: none;" :href="illness.illnessCase.videoAddress"><i class="el-icon-download"></i>下载ppt</a>-->
<!--          </el-button>-->
          <video v-else :src="illness.illnessCase.videoAddress" style="width: 100%" controls="controls" ></video>
        </div>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-row :gutter="20" class="title">
              <el-col :span="7">评分要素</el-col>
              <el-col :span="10">评分细则</el-col>
              <el-col :span="7">分项评分</el-col>
            </el-row>
            <el-form-item prop="checkDiagnosis">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7">
                  <b>检查和诊断
                  <br />（总分20）</b>
                </el-col>
                <el-col :span="10">
                  <span
                    >主诉（2分）<br>病史（2分）<br>面相检查（2分）<br>口内检查（2分）<br>模型分析（2分）<br>头颅曲断片描述（2分）<br>头影测量（2分）<br>问题列表（2分）<br>总体诊断（2分）<br>CBCT片（2分）</span
                  >
                </el-col>
                <el-col :span="7">
                  <el-input-number
                    v-model="ruleForm.checkDiagnosis"
                    controls-position="right"
                    size="small"
                    :precision="0"
                    :min="0"
                    :max="20"
                    @change="allNUm()"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item prop="goalPlan">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7">
                  <b>治疗目标和计划
                  <br />（总分20）</b>
                </el-col>
                <el-col :span="10">
                  <span>
                    治疗目标（5分）<br>治疗方案（15分）<br>
<!--                    基本治疗目标为：1. 纠正前牙反𬌗，2. 缓解上下颌拥挤，3. 建立正常的覆𬌗覆盖关系，4. 改善侧面貌，5. 获得满意的结果，ABO 评分不少于 30-->
                    <b>若矫治难度高12--15分，矫治难度中等7--12分。符合Damon矫治理念，可酌情加3分</b>
                  </span>
                </el-col>
                <el-col :span="7">
                  <el-input-number
                    @change="allNUm()"
                    size="small"
                    v-model="ruleForm.goalPlan"
                    controls-position="right"
                    :precision="0"
                    :min="0"
                    :max="20"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider></el-divider>
            <!-- <el-form-item prop="difficulty">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7"> 病例新颖性、难度 （总共10分） </el-col>
                <el-col :span="10">
                  <span>对病例的新颖性和难度进行综合评价</span>
                </el-col>
                <el-col :span="7">
                  <el-input-number
                    size="small"
                    @change="allNUm()"
                    v-model="ruleForm.difficulty"
                    controls-position="right"
                    :precision="0"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item> -->
            <el-divider></el-divider>
            <el-form-item prop="treatmentProcess">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7"> <b>治疗过程<br /> （总分20）</b> </el-col>
                <el-col :span="11">
<!--                  <span>复诊时间和次数、口内照、面相照、矫治描述</span>-->
                  <span>
                    每次复诊皆有以下打分项(最多三次)<br>
                    时间(1分)、口内照(1分)<br>
                    面相照(1分)<br>矫治描述(1分)<br>
                    <b>额外加分项(共8分):<br></b>
                    额外一次以上(含)复诊资料(2分)<br>重视提及关节异常(2分) <br>重视提及给学问题(2分)<br>涉及到正畸正颌联合治疗/多学科联合治疗(2分)
                  </span>
                </el-col>
                <el-col :span="6">
                  <el-input-number
                    size="small"
                    @change="allNUm()"
                    v-model="ruleForm.treatmentProcess"
                    controls-position="right"
                    :precision="0"
                    :min="0"
                    :max="20"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item prop="treatmentResult">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7"> <b>治疗结果<br> （总分20）</b> </el-col>
                <el-col :span="11">
                  <span>面相对比（4分）<br>口内对比（4分）<br>头颅曲断片对比（2分）<br>头影测量分析（3分）<br>CBCT/核磁共振等影像资料对比（3分）<br>
                    跟踪随访:面像、口内照（4分）
                  </span
                  >
                </el-col>
                <el-col :span="6">
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
                <el-col :span="7"> <b>总体评价 （总分20）</b> </el-col>
                <el-col :span="11">
<!--                  <span-->
<!--                    >根据总体内容、完整度及治疗效果，经验分享进行评分，如有值得学习借鉴的失败经验也可以酌情加分</span-->
<!--                  >-->
                  <span>
                    总体评价（15分）<br>
                    示例：总体内容、完整度、治疗效果、经验分享。如有值得学习借鉴的失败经验也可以酌情加分<br>
                    视频讲解（5分）<br>
                    示例：医生对病例讲解。若有视频讲解帮助病例介绍及讲解治疗思路可酌情加分
                  </span>
                </el-col>
                <el-col :span="6">
                  <el-input-number
                    size="small"
                    @change="allNUm()"
                    v-model="ruleForm.summary"
                    controls-position="right"
                    :precision="0"
                    :min="0"
                    :max="20"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider></el-divider>
            <!-- <el-form-item prop="wholeScore">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7"> 总体美学评分 （总共10分） </el-col>
                <el-col :span="10">
                  <span
                    >根据病例治疗结果、过程、方法、理念与美学的相关程度、幻灯片的美观性等进行综合评价，涉及颌面部医学美学相关治疗的病例建议适当加分</span
                  >
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
            </el-form-item> -->
            <el-divider></el-divider>
            <el-form-item prop="remark">
              <el-row :gutter="20" class="title-content">
                <el-col :span="7">
                  <b>总分合计
                  <br />（总分100）</b>
                  <div class="txt-1">
                    {{ ruleForm.scoreSum ? ruleForm.scoreSum : "0" }}
                  </div>
                </el-col>
                <el-col :span="16">
                  <div>评委评语及建议</div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    @input="this.descInput"
                    v-model="ruleForm.remark"
                    style="margin-top: 10px"
                  ></el-input>
                  <p>当前字数：{{ txtVal }}</p>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="hasRecommend">
              <el-row :gutter="10" class="title-content">
                <el-col :span="7">是否推荐</el-col>
                <el-col :span="17">
                  <el-col :span="8">
                    <el-radio
                      size="mini"
                      v-model="ruleForm.hasRecommend"
                      :label="1"
                      disabled
                      border
                    >
                      重点推荐 A类
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
                      一般推荐 B类
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
                      不推荐 C类
                    </el-radio>
                    <p>（总分＜70分）</p>
                  </el-col>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button
                size="small"
                style="width: 50%"
                type="primary"
                @click="submitForm('ruleForm')"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import Slideout from 'vue-slideout';
import { saveEvaluate } from "@/api/index";
export default {
  name: "detail",
  // components: {
  //   Slideout
  // },
  data() {
    return {
      nowData: "",
      // 留言字数
      txtVal: 0,
      // 留言提示
      ruleForm: {
        checkDiagnosis: 0,
        goalPlan: 0,
        treatmentProcess: 0,
        treatmentResult: 0,
        summary: 0,
        wholeScore: 0,
        difficulty: 0,
        hasRecommend: 3,
      },
      rules: {
        checkDiagnosis: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        goalPlan: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        treatmentProcess: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        treatmentResult: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        difficulty: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        summary: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        wholeScore: [
          { required: true, message: "请评分", trigger: "blur" },
          {
            pattern: /^-?([1-9]+(\.(\d*)|0)?)|(0(\.\d+){1})$/,
            message: "请评分",
          },
        ],
        remark: [
          { required: false, message: "请填写评语及建议备注", trigger: "blur" },
        ],
      },
      illness: JSON.parse(Cookies.get("illness")),
      fileType: '', // 附件文件类型
      slides: [
        { type: 'ppt', url: '' }
      ]
    };
  },
  watch: {},
  created() {
    console.log("illness::", this.illness.illnessCase.videoAddress);
    let filePath = this.illness.illnessCase.videoAddress
    var index= filePath.lastIndexOf(".");
    //获取后缀
    this.fileType = filePath.substr(index+1)
    if (this.fileType === 'ppt' || this.fileType === 'pptx') {
      // let routeUrl = this.illness.illnessCase.videoAddress
      // let url = encodeURIComponent(routeUrl)
      // let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+url
      // window.open(officeUrl,'_target')
    }
    console.log(this.slides)
    this.nowData = Date.parse(new Date());
    if (this.illness.illnessEvaluate.scoreSum) {
      this.ruleForm = this.illness.illnessEvaluate;
    }
    this.allNUm();
    console.log(this.ruleForm);
    // console.log(this.illness.illnessEvaluate);
  },
  methods: {
    descInput() {
      this.txtVal = this.ruleForm.remark.length;
    },
    // 返回上一层
    back() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.illnessId = this.illness.illnessCase.id;
          this.ruleForm.id = this.illness.illnessEvaluate.id;

          saveEvaluate(this.ruleForm).then((res) => {
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
      console.log(this.ruleForm.scoreSum);
      this.ruleForm.scoreSum = 0;
      this.ruleForm.scoreSum =
        this.ruleForm.checkDiagnosis +
        this.ruleForm.goalPlan +
        this.ruleForm.difficulty +
        this.ruleForm.treatmentProcess +
        this.ruleForm.treatmentResult +
        this.ruleForm.summary +
        this.ruleForm.wholeScore;
      console.log(this.ruleForm.scoreSum);
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
  .back {
    display: inline-block;
    cursor: pointer;
    line-height: 50px;
  }
}
</style>
<style lang="scss">
.detail {
  position: relative;
  .el-card__body {
    padding: 15px 0;
  }
}
.el-form-item__error {
  position: absolute;
  right: 60px !important;
  left: auto;
}
</style>
