<template>
  <div>
    <el-select v-model="EnumEthnic" placeholder="请选择">
      <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-button type="primary" @click="getTableData">搜 索</el-button>
    <el-alert>一级菜单1 表格</el-alert>
    <el-table :data="tableData" v-loading="tableLoading" stripe border style="width: 100%">
      <el-table-column prop="residentName" label="姓名"></el-table-column>
      <el-table-column prop="position" label="国家地区">
        <template
          slot-scope="scope"
        >{{scope.row.residentNationality|filterCodeToName('EnumNationality')}}</template>
      </el-table-column>
      <el-table-column prop="doorName" label="性别">
        <template slot-scope="scope">{{scope.row.residentGender|filterCodeToName('EnumGender')}}</template>
      </el-table-column>
      <el-table-column prop="residentBirthday" label="出生日期"></el-table-column>
      <el-table-column label="民族">
        <template slot-scope="scope">{{scope.row.residentNation|filterCodeToName('EnumEthnic')}}</template>
      </el-table-column>
      <el-table-column prop="houseAddress" label="居住信息"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getResidents } from "@/api/axios/user.js";
import "@/utils/filters.js";
export default {
  name: "menu1",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      EnumEthnic: ""
    };
  },
  computed: {
    options() {
      return this.$store.state.dict.EnumEthnic;
    }
  },
  mounted() {},
  methods: {
    getTableData() {
      this.tableLoading = true;
      getResidents(
        { page: 1, pageSize: 10 },
        val => {
          if (val.data.data) {
            this.tableData = val.data.data.rows;
          }
          this.tableLoading = false;
        },
        () => {
          this.tableLoading = false;
        }
      );
    },
    caihai() {
      window.console.log("打印出蔡海");
    }
  }
};
</script>

<style>
</style>