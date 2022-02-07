<template>
  <div class="home">
    <router-view />
    <!--列表信息-->
    <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" @click="submitData">提交审核结果</el-button>
    </div>
    <div class="box-list">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in illnessList" :key="item.id">
          <el-card
            class="box-card"
            :class="item.illnessEvaluate.wholeScore ? 'active' : ''"
            @click.native="routerPush(item)"
          >
            <div class="title-list">
              <p class="title-txt">
                {{ item.illnessCase.id }}、{{ item.illnessCase.title }}
              </p>
            </div>
            <el-col :span="15" style="padding: 0">
              <div class="item-box">
                <!-- <p>病例作者：{{ item.illnessCase.author }}</p>
                <p>所在单位：{{ item.illnessCase.company }}</p> -->
                <p>
                  评审状态：{{
                    item.illnessEvaluate.scoreSum ? "已评分" : "未评分"
                  }}
                </p>
                <p>
                  提交状态：{{
                    item.illnessEvaluate.status ? "已提交" : "未提交"
                  }}
                </p>
              </div>
            </el-col>
            <el-col :span="9" style="padding: 0">
              <p class="title-num">
                <!-- <i class="el-icon-circle-check"></i> -->
                {{item.illnessEvaluate.scoreSum}}分
              </p>
              <div class="box-kind">
                <p v-if="item.illnessEvaluate.scoreSum == null">暂无</p>
                <p v-else>
                  <!-- {{item.illnessEvaluate.scoreSum ? }} -->
                  <span v-if="item.illnessEvaluate.scoreSum >= 85">A类</span>
                  <!-- this.ruleForm.scoreSum < 85 && this.ruleForm.scoreSum >= 70 -->
                  <span
                    v-else-if="
                      item.illnessEvaluate.scoreSum < 85 &&
                      item.illnessEvaluate.scoreSum >= 70
                    "
                    >B类</span
                  >
                  <span v-else-if="item.illnessEvaluate.scoreSum < 70"
                    >C类</span
                  >
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
import { viewIllnessList, submitEvaluate } from "@/api/index";
export default {
  name: "Home",
  data() {
    return {
      illnessList: [], //列表
      newIllnessList: [],
    };
  },
  created() {
    this._getviewIllnessList();
  },
  methods: {
    // 获取列表
    _getviewIllnessList() {
      viewIllnessList().then((res) => {
        if (res.code == 200) {
          this.$alert(
            "尊敬的专家，感谢您拨冗担任首届Ormco“全民新show”病例巡回展评委！评阅病例前请务必阅读“评审须知”。<br/>注意，必须所有病例评完后，才能点“提交审核结果”（上海场截止时间：2022年03月06日24时）",
            "",
            {
              confirmButtonText: "确定",
              dangerouslyUseHTMLString: true,
              callback: () => {
                this.$alert(
                  "1.请遵守保密原则，勿对外公开病例资料内容及评审结果，否则可能需承担相应法律后果。<br>2.请浏览完整病例幻灯片后，给出各分项评分，系统自动总分。<br>3.在您评审的全部病例中，最终获得“重点推荐（A类）”的病例占比请务必控制在40%左右。<br>4.请您给出具体的点评意见，对选手帮助很大。<br>5.单个病例评审完成后，可以点击“保存”，保存评审结果，但不会提交给系统；全部病例评审完成并确认无误后，方可点击“提交评审结果”，提交后不可退回修改。",
                  "评审须知",
                  {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    callback: () => {
                      this.$alert(
                        "特别提醒：某病例若最终入围“优秀病例”，将随机抽取该病例评价为“A”的评委评语在线公布，故请尤其注意您给“A”的病例评语是否恰当。",
                        "特别提醒",
                        {
                          confirmButtonText: "确定",
                          dangerouslyUseHTMLString: true,
                        }
                      );
                    },
                  }
                );
              },
            }
          );
          this.illnessList = res.data;
          res.data.forEach((item) => {
            this.newIllnessList.push(item.illnessEvaluate);
          });

          console.log(this.newIllnessList);
        }
      });
    },
    // 一键提交
    submitData() {
      let data = {
        evaluateList: this.newIllnessList,
      };

      this.$confirm("提交后不得修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          submitEvaluate(data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this._getviewIllnessList();
              this.$message({
                message: "恭喜你，提交成功！",
                type: "success",
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    routerPush(item) {
      console.log(item);
      Cookies.set("illness", item);
      if (!item.illnessEvaluate.status) {
        this.$router.push("/detail");
      } else {
        this.$message("已提交");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .box-card {
    padding-bottom: 10px;
    margin-bottom: 20px;
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
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
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
