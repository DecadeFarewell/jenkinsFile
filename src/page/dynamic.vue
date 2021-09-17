<template>
  <div class="dynamic">
    <Publish v-if="!isAdmin" class="publish-com" @needRefresh="getDynamicList" />

    <!-- <AllDynamic /> -->

    <DynamicList
      class="list-com"
      v-for="(item, index) in dynamicList"
      :key="item.listID"
      :listInfo="item"
      v-if="dynamicList.length"
      @refresh="getDynamicList"
    />
  </div>
</template>

<script>
import Publish from "@/components/dynamic/Publish";
import DynamicList from "@/components/dynamic/DynamicList";
import AllDynamic from "@/components/dynamic/AllDynamic";
export default {
  components: {
    Publish,
    DynamicList,
    AllDynamic
  },
  computed: {
    isAdmin() {
      const role = this.$store.state.roles[0];
      return role === "admin";
    }
  },
  created() {
    this.getDynamicList();
  },
  data() {
    return {
      dynamicList: []
    };
  },
  methods: {
    getDynamicList() {
      this.$api
        .getAllDynamicList({
          page: 0,
          pageSize: 10
        })
        .then(res => {
          this.dynamicList = res.data.data;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.dynamic {
  .publish-com {
    margin-bottom: 0.3rem;
  }
  .list-com {
    margin: 0.3rem 0;
  }
}
</style>