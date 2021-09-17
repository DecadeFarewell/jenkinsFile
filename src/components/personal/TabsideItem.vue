<template>
  <div class="tabside-item-com">
    <router-link :to="{path:tab.path}" class="tabName">
      <span>{{tab.tabName}}</span>
      <span class="tips" v-if="tab.path==='myDynamic' && count > 0">{{count}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      required: true,
      default: ""
    }
  },
  computed: {
    count() {
      return this.$store.state.notifyCount;
    }
  }
};
</script>

<style scoped lang="scss">
.tabside-item-com {
  .tabName {
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.1rem;
    cursor: pointer;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.14rem;
    color: $active;
    line-height: 0.3rem;
    &:hover {
      text-decoration: underline;
    }
    .tips {
      display: inline-block;
      // left: 40%;
      // top: 50%;
      // transform: translateY(-50%);
      width: 0.2rem;
      height: 0.2rem;
      text-align: center;
      line-height: 0.2rem;
      border-radius: 50%;
      background: red;
      // transform: scaleY(0.8);
      font-weight: 600;
      font-size: 0.12rem;
      color: #fff;
    }
  }
}
</style>