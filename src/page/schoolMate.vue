<template>
  <div class="school-mate">
    <Head :classList="classList" />

    <el-row class="main-content">
      <el-col class="left-content" :span="5">
        <ClassList :classList="classList" />
      </el-col>
      <el-col class="right-content" :span="19">
        <router-view />
        <!-- <ClassDetail /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Head from "@/components/schoolMate/Head.vue";
import Create from "@/components/schoolMate/Create.vue";
import Search from "@/components/schoolMate/Search.vue";
import ClassList from "@/components/schoolMate/ClassList.vue";
import ClassDetail from "@/components/schoolMate/ClassDetail.vue";

export default {
  components: {
    Head,
    Create,
    Search,
    ClassList,
    ClassDetail
  },
  created() {
    this.getClassList();
  },
  data() {
    return {
      classList: []
    };
  },
  methods: {
    getClassList() {
      this.$api.getClassMember().then(res => {
        this.classList = res.data.data
      });
    }
  }
};
</script>

<style scoped lang="scss">
.school-mate {
  .slider-bar {
    margin-top: 0.15rem;
    display: flex;
    justify-items: center;
    justify-content: space-between;
  }
  .main-content {
    margin-top: 0.15rem;
    .left-content {
      border: 1px solid $border-color;
    }
    .right-content {
      border: 1px solid $border-color;
      height: 100%;
    }
  }
}
</style>