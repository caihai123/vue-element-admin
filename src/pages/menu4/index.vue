<template>
  <div style="height:500px">
    <div style="font-size:36px;color:#e65d6e;">
      你一共欠我：￥
      <CountUp :endVal="endVal" />rmb
    </div>
    <el-row>
      <el-col :span="4">
        <div class="pan-btn pan-blue" @click="update">默认按钮</div>
      </el-col>
      <el-col :span="4">
        <a class="pan-btn pan-primary" @click="routerParams">带参跳转到表单页面</a>
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
    <div style="padding:10px 0;">
      <mallki text="蔡海哈哈哈哈" />
    </div>
  </div>
</template>

<script>
import CountUp from "@/components/CountUp";
import Mallki from "@/components/Mallki";
export default {
  components: {
    CountUp,
    Mallki
  },
  data() {
    return {
      endVal: 20201024996
    };
  },
  methods: {
    update() {
      this.endVal = this.endVal + 2020;
    },
    routerParams() {
      this.$router.push({
        path: "/menu3/menu3-1",
        query: {
          userId: 555
        },
        force: true
      });
    }
  }
};
</script>