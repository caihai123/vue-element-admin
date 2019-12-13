<template>
  <div>
    <h2>一级菜单1 表格</h2>
    <el-table :data="tableData" v-loading="tableLoading" stripe border style="width: 100%">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="position" label="位置"></el-table-column>
      <el-table-column prop="doorName" label="设备名称"></el-table-column>
      <el-table-column prop="unitCode" label="unitCode"></el-table-column>
      <el-table-column prop="doorId" label="doorId"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import { buildParams } from "../../utils/common-util";

export default {
  data() {
    return {
      tableData: [],
      tableLoading:false
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData: function() {
      var self = this;
      self.tableLoading = true;
      axios
        .post(
          "/api/equipOnline/selectEquipOnlineListWithPage.json",
          buildParams({
            blockCode: "5201030003",
            isDay: true,
            page: 1,
            pageSize: 15
          })
        )
        .then(val => {
          if (val.data.data) {
            self.tableData = val.data.data.rows;
          }
          self.tableLoading = false;
        });
    }
  }
};
</script>

<style>
</style>