<template>
  <div class="case">
    <search class="search" ref="search" @ok="handleOk"/>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 70%; margin: auto">
      <el-table-column prop="illnessCase.id" width="70"></el-table-column>
      <el-table-column prop="illnessCase.author" label="作者">
      </el-table-column>
      <!-- <el-table-column prop="illnessCase.title" label="标题"></el-table-column> -->
      <el-table-column prop="illnessCase.company" label="公司">
      </el-table-column>

      <el-table-column label="评审">
        <template slot-scope="scope">
          <div v-for="item in scope.row.refereeList" :key="item.id">
            {{ item.username }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="illnessCase.tags" label="标签"></el-table-column>
      <el-table-column prop="illnessCase.province" label="区域"></el-table-column>
      <el-table-column prop="illnessCase.type" label="类型"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <a :href="scope.row.illnessCase.pdfAddress" target="_blank">
            <el-button type="success" size="small">查看作品</el-button>
          </a>
          <el-button
              type="primary"
              size="small"
              v-if="user.userName == 'admin' && scope.row.refereeList.length == 0"
              @click="handelRefereesChoose(scope.row.illnessCase.id)"
          >分配评审
          </el-button>

          <!-- <el-button
              type="primary"
              size="small"
              v-if="user.userName == 'admin'"
              @click="handelTag(scope.row.illnessCase)"
          >打标签
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 选择评审 -->
    <el-dialog
        title="分配评审"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleClose"
    >
      <div>
        <el-checkbox-group v-model="checkedCities" :max="3">
          <el-checkbox
              v-for="item in refereesData"
              :label="item.id"
              :key="item.id"
          >{{ item.username }}
          </el-checkbox
          >
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handelReferees">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗 打标签 -->
    <el-dialog
        title="打标签"
        :visible.sync="tagVisible"
        width="50%"
        @close="tagHandleClose"
    >
      <div>
        <el-checkbox-group v-model="checkTagsData" :max="10">
          <el-checkbox
              v-for="item in tagsData"
              :label="item"
              :key="item"
          >{{ item }}
          </el-checkbox
          >
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tagHandleClose">取 消</el-button>
        <el-button type="primary" @click="tagHandelSure">确 定</el-button>
      </span>
    </el-dialog>

    <div style="text-align: center; margin-top: 50px">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import {illnessCases, refereesChoose, refereesPage, tag} from "@/api/index";
import search from "./search";

export default {
  components: {
    search
  },
  data() {
    return {
      tableData: [],
      total: 0,
      current: 1,
      user: JSON.parse(Cookies.get("user")),
      // 选择评委
      refereesId: "",
      illnessId: '',
      dialogVisible: false,
      refereesData: [],
      checkedCities: [],
      // 打标签
      checkTagsData: [],
      tagsData: ['拔牙', '深覆颌', '深覆盖','拔上下4','把上4下5','拔上5下4','拔下颌切牙','拔其他牙','非拔牙','反𬌗','安氏Ⅰ类','安氏Ⅱ类','安氏Ⅲ类','正颌手术','双颌前突','低角','高角','支抗钉辅助','后牙锁𬌗','牙弓狭'],
      tagVisible: false
    };
  },
  created() {
    this._getviewIllnessCases();
    this.getRefereesPage();
  },
  methods: {
    _getviewIllnessCases(exData = {}) {
      let data = {
        current: this.current,
        size: 10,
        ...exData
      };
      illnessCases(data).then((res) => {
        console.log("============",res);
        if (res.code == 200) {
          this.tableData = res.data.records;

          this.total = JSON.parse(res.data.total);
          console.log(this.tableData);
        }
      });
    },
    handleCurrentChange(val) {
      this.current = val;
      this._getviewIllnessCases();
    },
    // 获取评审列表
    getRefereesPage() {
      refereesPage().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.refereesData = res.data;
          console.log(this.refereesData);
        }
      });
    },
    handelReferees() {
      console.log(this.checkedCities);
      var checkedCities = this.checkedCities.join(",");
      if (this.checkedCities.length == 3) {
        let data = {
          illnessId: this.refereesId,
          refereeIds: checkedCities,
        };
        refereesChoose(data).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.dialogVisible = false;
            this.checkedCities = [];
            this._getviewIllnessCases();
          }
        });
      } else {
        this.$message({
          message: "请分配三位讲师！",
          type: "warning",
        });
      }
    },
    handleClose() {
      console.log("object");
      this.dialogVisible = false;
      this.checkedCities = [];
    },
    handelRefereesChoose(id) {
      console.log(id);
      this.refereesId = id;
      this.dialogVisible = true;
    },

    // 取消打标签
    tagHandleClose() {
      this.tagVisible = false;
      this.checkTagsData = [];
    },

    // 确定打标签
    tagHandelSure() {
      let subData = []
      this.tagsData.forEach(all=>{
        if (this.checkTagsData.includes(all)){
          subData.push(all)
        }
      })
      const data = {
        illnessId: this.illnessId,
        tags: subData.join(",")
      }
      tag(data).then(() => {
        this.tagVisible = false;
        this.checkedCities = [];
        this._getviewIllnessCases()
      })
    },

    // 标签弹窗激活
    handelTag(record) {
      console.log(record)
      this.tagVisible = true;
      this.illnessId = record.id
      if (record.tags) {
        this.checkTagsData = record.tags.split(',');
      }
    },
    handleOk(event) {
      this._getviewIllnessCases(event)
    }
  },
};
</script>
<style lang="scss" scoped>
.case {
  padding: 50px 0;
}

.search {
  width: 70%;
  margin: auto;
}

.el-button {
  margin-left: 10px;
}

.el-checkbox {
  font-size: 20px;
  min-width: 100px;
  margin-bottom: 20px;
}
</style>
