<template>
  <div class="class-list-com">
    <div class="list-head">班级列表</div>
    <ClassListItem v-for="(item, i) in classList" :key="item.classID" :index="i" :classItem="item" />
  </div>
</template>

<script>
import ClassListItem from "@/components/schoolMate/ClassListItem";
export default {
  components: {
    ClassListItem
  },
  props: {
    classList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  watch: {
    // classList() {
    //   const path = `/alumni/schoolMate/class/${this.classList[0].classID}`;
    //   if (this.classList.length || this.$route.fullPath === path) return;
    //   this.$router.replace({
    //     path,
    //     params: {
    //       classID: this.classList[0].classID,
    //       className: this.classList[0].className
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="scss">
.class-list-com {
  .list-head {
    font-weight: 600;
    color: #333;
    font-size: 0.18rem;
    text-align: center;
  }
}
</style>