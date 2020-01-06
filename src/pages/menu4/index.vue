<template>
  <div>
    <CountUp :endVal="2020" />
  </div>
</template>

<script>
import CountUp from "@/components/CountUp";
export default {
  components: {
    CountUp
  }
};
</script>