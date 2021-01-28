<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-checkbox-group v-model="checkedTags" @change="handlerCheckedTagsChange">
          <el-checkbox v-for="item in tags" :label="item" :key="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="6">
        <el-checkbox-group v-model="checkedArea" @change="handlerCheckedAreaChange">
          <el-checkbox v-for="item in areaArray" :label="item" :key="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="6">
        <el-checkbox-group v-model="checkedType" @change="handlerCheckedTypeChange">
          <el-checkbox v-for="item in typeArray" :label="item" :key="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="6">
        <div class="button">
          <el-button
              type="primary"
              size="small"
              @click="handlerSearch()"
          >搜索
          </el-button>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      checkedTags: [],
      tags: ['拔牙', '深覆颌', '深覆盖'],
      checkedArea: [],
      areaArray: ['西区', '南区', '北区', '中区', '东区', '东北区', 'DSO'],
      checkedType: [],
      typeArray: ['Ⅰ类', 'Ⅱ类', 'Ⅲ类'],
      isIndeterminate: true
    };
  },
  methods: {
    handlerCheckedTagsChange(value) {
      this.checkedTags = value
    },
    handlerCheckedAreaChange(value) {
      this.checkedArea = value
    },
    handlerCheckedTypeChange(value) {
      this.checkedType = value
    },
    handlerSearch() {
      let data = {
        tags: this.checkedTags.join(','),
        area: this.checkedArea.join(','),
        type: this.checkedType.join(',')
      }
      this.$emit('ok', data)
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.button {
  //position: relative;
  //top: -8px;
  float: right;
  margin-right: 126px;
}

.el-checkbox {
  font-size: 20px;
  min-width: 60px;
  margin-bottom: 20px;
}
</style>
