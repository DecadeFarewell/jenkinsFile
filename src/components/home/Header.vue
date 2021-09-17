<template>
  <el-row :gutter="20" class="inner-head">
    <el-col :span="6" class="col">
      <BaseLogo />
    </el-col>
    <el-col :span="15">
      <BaseNav />
    </el-col>
    <el-col :span="3">
      <BaseLogout />
    </el-col>
  </el-row>
</template>

<script>
import BaseLogo from "@/components/base/BaseLogo.vue";
import BaseNav from "@/components/base/BaseNav.vue";
import BaseLogout from "@/components/base/BaseLogout.vue";

export default {
  components: {
    BaseLogo,
    BaseNav,
    BaseLogout
  }
};
</script>

<style scoped lang="scss">
.inner-head {
  height: 100%;
  padding: 0 2rem;
  .el-col {
    height: 100%;
  }
}
</style>