<template>
  <div class="dynamic-list">
    <DynamicListHead
      :avaterPath="listInfo.avater_path"
      :userName="listInfo.username"
      :realName="listInfo.real_name"
      :ctime="listInfo.ctime"
    />
    <DynamicListDiscribe :content="listInfo.content" />
    <DynamicListImg :listID="listInfo.listID" />
    <span class="new"><slot></slot></span>
    <Replay :listID="listInfo.listID" :author="listInfo.username" @newMsgCount="receiveNewMsg" />
    <Del class="del" :id="listInfo.listID" @confirmDel="confirmDel" />
  </div>
</template>

<script>
import DynamicListHead from "./DynamicListHead";
import DynamicListDiscribe from "./DynamicListDiscribe";
import DynamicListImg from "./DynamicListImg";
import Replay from "./Replay";
import Del from "../base/Delete";
export default {
  components: {
    DynamicListHead,
    DynamicListDiscribe,
    DynamicListImg,
    Del,
    Replay
  },
  props: {
    listInfo: {
      type: Object,
      required: true,
      default: []
    }
  },
  computed: {
    isAdmin() {
      const role = this.$store.state.roles[0];
      return role === "admin";
    }
  },
  data() {
    return {};
  },
  methods: {
    confirmDel() {
      this.delDynamic();
    },
    delDynamic() {
      this.$api
        .delCertainDynamic({
          id: this.listInfo.listID
        })
        .then(resp => {
          this.delCallback();
        });
    },
    delCallback() {
      this.$message({
        message: "删除成功！",
        type: "success",
        duration: 1500,
        showClose: true
      });
      this.$emit("refresh");
    },
    receiveNewMsg(msg){
      this.$emit('receiveNewMsg',msg)
    }
  }
};
</script>

<style scoped lang="scss">
.dynamic-list {
  padding: 0.1rem 0.1rem 0;
  border: 1px solid $border-color;
  position: relative;
  .del {
    position: absolute;
    top: 0.1rem;
    left: 40%;
    cursor: pointer;
  }
  .new{
    color:$active
  }
}
</style>