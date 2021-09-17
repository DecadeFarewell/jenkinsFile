<template>
  <div class="notice-detail-com">
    <el-dialog
      title="公告详情"
      :visible.sync="dialogVisible"
      width="75%"
      top="5vh"
      :before-close="handleClose"
    >
      <span class="title">{{showingNotice.title}}</span>
      <div class="content-box">
        <div class="content-wrapper">
          <div class="content" v-html="showingNotice.content"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    showingNotice: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      //   dialogVisible: false
    };
  },
  methods: {
    confirmHandle() {
      this.$emit("close");
    },
    handleClose() {
      this.confirmHandle();
    }
  }
};
</script>

<style scoped lang="scss">
.notice-detail-com {
  .title {
    font-weight: 600;
    font-size: 0.2rem;
  }
  .content-box {
    margin-top: 0.3rem;
    overflow-x: hidden;
      border: 1px solid $border-color;

    .content-wrapper {
      width: 102%;
      max-height: 3.8rem;
      overflow-y: scroll;
      box-sizing: border-box;
      padding-right: 0.1rem;
    }
    .content {
      // height: 600px;

    }
  }
}
</style>