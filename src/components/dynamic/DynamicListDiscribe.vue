<template>
  <div class="dynamic-list-dis">
    <div class="content">{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>

<style scoped lang='scss'>
.dynamic-list-dis {
  margin-top: 0.1rem;
  .content {
    font-weight: 500;
    font-size: 0.16rem;
    text-align: left;
    color: #333;
    width: 80%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>