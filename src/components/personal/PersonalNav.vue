<template>
  <div class="personal-nav-com">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/alumni/personal' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{curTab.tabName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    curTab: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
.personal-nav-com {
}
</style>