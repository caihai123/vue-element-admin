<template>
  <div style="height:500px">
    <CountUp :endVal="endVal" />
    <el-row>
      <el-col :span="4">
        <div class="pan-btn pan-blue" @click="update">默认按钮</div>
      </el-col>
      <el-col :span="4">
        <router-link class="pan-btn pan-primary" to="/">主要按钮</router-link>
      </el-col>
      <el-col :span="4">
        <router-link class="pan-btn pan-success" to="/">成功按钮</router-link>
      </el-col>
      <el-col :span="4">
        <router-link class="pan-btn pan-info" to="/">信息按钮</router-link>
      </el-col>
      <el-col :span="4">
        <router-link class="pan-btn pan-warning" to="/">警告按钮</router-link>
      </el-col>
      <el-col :span="4">
        <router-link class="pan-btn pan-danger" to="/">危险按钮</router-link>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-button v-waves>默认按钮</el-button>
      <el-button v-waves type="primary">主要按钮</el-button>
      <el-button v-waves type="success">成功按钮</el-button>
      <el-button v-waves type="info">信息按钮</el-button>
      <el-button v-waves type="warning">警告按钮</el-button>
      <el-button v-waves type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import CountUp from "@/components/CountUp";
export default {
  components: {
    CountUp
  },
  data() {
    return {
      endVal: 2020
    };
  },
  methods: {
    update() {
      this.endVal = this.endVal + 2020;
    }
  }
};
</script>