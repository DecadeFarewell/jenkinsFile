<template>
  <li class="item" v-html="hightLight"></li>
</template>

<script>
export default {
  props: {
    resultItem: {
      type: Object,
      required: true,
      default: () => {}
    },
    val: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    hightLight() {
      let inner = `${this.resultItem.real_name}(${this.resultItem.username})`;
      inner = inner.replace(this.val, `<span class="hight-light" style="color:red">${this.val}</span>`);
      console.log(inner,'高亮')
      return inner;
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  padding: 0.05rem 0.1rem;
  cursor: pointer;
  color: #333;
  &:hover {
    background: #eee;
  }
  &.none-result {
    color: $subText;
  }
  .hight-light{
      color: red;
  }
}
</style>