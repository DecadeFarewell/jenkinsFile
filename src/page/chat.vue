<template>
  <div class="chat">
    <ChatRoom />
  </div>
</template>

<script>
import ChatRoom from "@/components/chat/index.vue";
export default {
  components: {
    ChatRoom
  },
  beforeRouteEnter(to, from, next) {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const keys = Object.keys(userInfo);
    // const Uncomplete = keys.some(item => userInfo[item] === null);
    // if (Uncomplete) {
    //   vm.$message({
    //     message: "完善个人信息尚未完善，请先完善个人信息！",
    //     onClose: () => {
    //       return "/alumni/personal";
    //     }
    //   });
    // } else {
    //   return true;
    // }
    next()
  }
};
</script>

<style scoped>
</style>