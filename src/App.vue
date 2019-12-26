<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import "~@/styles/transition.css";

html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #606266;
}
#app {
  height: 100%;
}
a {
  text-decoration: none;
  color: #606266;
}
</style>
