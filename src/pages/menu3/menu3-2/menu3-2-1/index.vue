<template>
  <div style="padding:30px;">
    <el-button @click="route">跳转到menu3-2-2</el-button>
    <el-alert :closable="false" title="menu3-2-1" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  methods: {
    route() {
      this.$router.push("/menu3/menu3-2/menu3-2-2");
    }
  }
};
</script>

<style>
</style>