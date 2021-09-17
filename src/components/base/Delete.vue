<template>
  <div class="delete-com" v-if="isAdmin">
    <el-popconfirm
      class="confirm-pop"
      confirmButtonText="确定"
      cancelButtonText="不用了"
      icon="el-icon-info"
      iconColor="red"
      title="确定删除吗？"
      @onConfirm="confirmDel"
      @onCancel="cancelDel"
    >
      <a href="javascript:void(0)" title="删除该项" slot="reference" :style="styleObj">
        <i class="el-icon-delete-solid"></i>
      </a>
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: () => -1
    },
    styleObj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isAdmin() {
      const role = this.$store.state.roles[0];
      return role === "admin";
    }
  },
  methods: {
    confirmDel() {
      this.$emit('confirmDel',this.id)
    },
    cancelDel() {
      return;
    }
  }
};
</script>

<style scoped lang="scss">
.delete-com {
  width: 0.3rem;
  height: 0.3rem;
  // border:1px solid $border-color;
  text-align: center;
  line-height: 0.3rem;
  font-size: 0.2rem;
  .confirm-pop {
    a {
      color: #333;
      &:hover {
        color: red;
      }
    }
  }
}
</style>