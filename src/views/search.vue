<template>
  <div>
    <el-row>
      <!-- <el-col :span="10">
        <div style="margin-bottom: 10px"><strong>标签</strong></div>
        <el-checkbox-group v-model="checkedTags" @change="handlerCheckedTagsChange">
          <el-checkbox v-for="item in tags" :label="item" :key="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-col> -->
      <el-col :span="6">
        <div style="margin-bottom: 10px"><strong>区域</strong></div>
        <el-checkbox-group v-model="checkedArea" @change="handlerCheckedAreaChange">
          <el-checkbox v-for="item in areaArray" :label="item" :key="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
      <!-- <el-col :span="6">
        <div style="margin-bottom: 10px"><strong>类别</strong></div>
        <el-checkbox-group v-model="checkedType" @change="handlerCheckedTypeChange">
          <el-checkbox v-for="item in typeArray" :label="item" :key="item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </el-col> -->
      <el-col>
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
      // 拔上下4、把上4下5、拔上5下4、拔下颌切牙、拔其他牙、非拔牙、深覆颌、深覆盖、反𬌗、安氏Ⅰ类、安氏Ⅱ类、安氏Ⅲ类、正颌手术、双颌前突、低角、高角、支抗钉辅助、后牙锁𬌗、牙弓狭
      tags: ['拔牙', '深覆颌', '深覆盖','拔上下4','把上4下5','拔上5下4','拔下颌切牙','拔其他牙','非拔牙','反𬌗','安氏Ⅰ类','安氏Ⅱ类','安氏Ⅲ类','正颌手术','双颌前突','低角','高角','支抗钉辅助','后牙锁𬌗','牙弓狭'],
      checkedArea: [],
      areaArray: ['上海', '重庆', '成都', '杭州', '广州', '深圳', '北京'],
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
  // float: right;
  // margin-right: 126px;
}

.el-checkbox {
  font-size: 20px;
  min-width: 95px;
  margin-bottom: 20px;
}
.el-checkbox-group{
  display: flex;
}
</style>

