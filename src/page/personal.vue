<template>
  <div class="personal">
    <PersonalNav :curTab="curTab" />
    <el-row class="main" :gutter="10">
      <el-col :span="4" class="tab-list">
        <PersonalTabSide  :tabList="tabList" @navigateTo="navigateTo" />
      </el-col>
      <el-col :span="20" class="tab-content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonalNav from "@/components/personal/PersonalNav";
import PersonalTabSide from "@/components/personal/PersonalTabSide";
export default {
  components: {
    PersonalNav,
    PersonalTabSide
  },
  mounted() {
  },

  data() {
    return {
      tabList: [
        {
          id: 1,
          tabName: "个人资料",
          path: "userInfo"
        },
        {
          id: 2,
          tabName: "我的动态",
          path: "myDynamic"
        }
      ],
      curTabIndex:0
    };
  },
  computed:{
    curTab(){
      return this.tabList[this.curTabIndex];
    }
  },
  methods:{
    navigateTo(index){
      this.curTabIndex = index
    }
  }
};
</script>

<style scoped lang="scss">
.personal {
  .main {
    margin-top: 0.1rem;
    .tab-list {
      // border: 1px solid black;
      height: 300px;
    }
    .tab-content {
      // border: 1px solid black;
    }
  }
}
</style>