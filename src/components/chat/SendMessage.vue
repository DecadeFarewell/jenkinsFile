<template>
  <div class="send-message-com">
    <div class="send-side">
      <el-input v-model="sendText" class="sendMsg" placeholder="请输入内容，按回车发送"></el-input>
      <el-button class="btn" type="info" disabled v-if="isAdmin">发送(S)</el-button>
      <el-button class="btn" type="primary" @click="sendMsg" v-else>发送(S)</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userID: {
      type: Number,
      required: true,
      default: () => -1
    }
  },
  data() {
    return {
      sendText: ""
    };
  },
  computed: {
    isAdmin() {
      const role = this.$store.state.roles[0];
      return role === "admin";
    }
  },
  methods: {
    sendMsg() {
      if (this.sendText.trim() !== "") {
        // const former = new FormData();
        // former.append("userID", this.userID);
        // former.append("content", this.sendText);
        // this.$api.sendMessage(former).then(resp => {
        //   console.log(resp, "success");
        // });

        const msg = {
          userID: this.userID,
          msg: this.sendText,
          ctime:new Date().getTime()
        };
        this.$emit("send",msg);
        this.sendText = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.send-message-com {
  .send-side {
    display: flex;
    .sendMsg {
    }
  }
}
</style>