<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
      <!-- <el-footer class="footer">footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/home/Header.vue";
export default {
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
.home {
  .header {
    box-shadow: 1px -3px 20px #5f5f5f;
    // position:sticky;
    // top: 0;
  }
  .main{
    width: 11.7rem;
    margin: 0.3rem auto;
    border: 1px solid rgba(182,173,173,.897);
  }
  .footer {
    border: 1px solid black;
    margin-top: 0.5rem;
  }

}
</style>