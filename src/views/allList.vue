<template>
  <div class="case">
    <el-table :data="tableData" style="width: 70%; margin: auto">
      <el-table-column prop="illnessCase.id" width="70"> </el-table-column>
      <el-table-column prop="illnessCase.author" label="作者">
      </el-table-column>
      <el-table-column prop="illnessCase.title" label="标题"> </el-table-column>
      <el-table-column prop="illnessCase.company" label="公司">
      </el-table-column>

      <el-table-column label="评审">
        <template slot-scope="scope">
          <div v-for="item in scope.row.refereeList" :key="item.id">
            {{ item.username }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.illnessCase.pdfAddress" target="_blank">
            <el-button type="success" size="small">查看作品</el-button>
          </a>
          <el-button
            type="primary"
            size="small"
            v-if="user.userName == 'admin' && scope.row.refereeList.length == 0"
            @click="handelRefereesChoose(scope.row.illnessCase.id)"
            >分配评审</el-button
          >
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
            >{{ item.username }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handelReferees">确 定</el-button>
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
import { illnessCases, refereesPage, refereesChoose } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      current: 1,
      user: JSON.parse(Cookies.get("user")),
      // 选择评委
      refereesId: "",
      dialogVisible: false,
      refereesData: [],
      checkedCities: [],
    };
  },
  created() {
    this._getviewIllnessCases();
    this.getRefereesPage();
  },
  methods: {
    _getviewIllnessCases() {
      let data = {
        current: this.current,
        size: 10,
      };
      illnessCases(data).then((res) => {
        console.log(res);
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
  },
};
</script>
<style lang="scss" scoped>
.case {
  padding: 50px 0;
}
.el-button {
  margin-left: 10px;
}
</style>