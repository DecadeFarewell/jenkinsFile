<template>
  <div class="replay-area-com">
    <div class="text-area-box">
      <el-input
        class="text-area"
        type="textarea"
        resize="none"
        :rows="1"
        :placeholder="`回复: ${placeholder}`"
        v-model="textContent"
      ></el-input>
      <div class="btn" @click="sendHandle">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "请输入评论内容"
    }
  },
  data() {
    return {
      textContent: ""
    };
  },
  methods: {
    sendHandle() {
      this.$emit("send", this.textContent);
    }
  }
};
</script>

<style scoped lang="scss">
.replay-area-com {
  .text-area-box {
    .text-area {
      margin-top: 0.05rem;
      width: 75%;
      display: inline-block;
    }
    .btn {
      display: inline-block;
      height: 0.33rem;
      line-height: 0.33rem;
      text-align: center;
      background: $active;
      color: #fff;
      border-radius: 0.1rem;
      padding: 0 0.2rem;
      cursor: pointer;
    }
  }
}
</style>