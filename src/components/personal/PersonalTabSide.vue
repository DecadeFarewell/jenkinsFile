<template>
  <div class="personal-tabside-com">
    <ul>
      <li v-for="(tab, index) in tabList" :key="tab.id" @click="clickHandle(index)">
        <TabItem :tab="tab" />
      </li>
    </ul>
  </div>
</template>

<script>
import TabItem from "./TabsideItem";
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    TabItem
  },
  data() {
    return {

    };
  },
  methods:{
    clickHandle(index){
      this.$emit('navigateTo',index)
    }
  }
};
</script>

<style scoped lang="scss">
.personal-tabside-com {
  border: 1px solid $border-color;
  min-height: 5rem;
}
</style>