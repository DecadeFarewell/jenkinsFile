<template>
  <div class="tips-com">
    <div class="prop">
      <span class="num">{{hiddenMsg}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hiddenMsg: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>

<style scoped lang="scss">
.tips-com {
  .prop {
    width: 0.3rem;
    height: 0.3rem;
    background: $active;
    border-radius: 50%;
    position: relative;
    .num {
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      transform: translate(-50%, -50%);
    }
    &::after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 0.05rem solid $active;
      border-bottom: 0.05rem solid transparent;
      border-left: 0.05rem solid transparent;
      border-right: 0.05rem solid transparent;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 290%);
    }
  }
}
</style>