<template>
  <div class="member-info-dialog">
    <el-dialog title="详细资料" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">

        <Table :detailInfo="detailInfo" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeHandle">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "./Table";
export default {
  components: {
    Table
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: () => false
    },
    detailInfo: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    closeHandle() {
      this.$emit("close");
    },
    handleClose(done) {
      this.closeHandle();
    }
  }
};
</script>

<style scoped lang="scss">
.member-info-dialog {

}
</style>