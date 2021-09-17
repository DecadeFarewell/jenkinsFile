<template>
  <div class="chat-com">
    <div class="head">
      <p class="onLine">多人在线聊天</p>
    </div>
    <ul ref="main" @scroll="scrollHandle">
      <li v-for="(msg, index) in msgList" :key="msg.ctime+index">
        <MessageItem :msg="msg" :name="userName" />
      </li>
    </ul>

    <SendMessage :userID="userID" @send="sendHandle" />

    <Tips class="tips" v-if="hiddenMsg !== 0" :hiddenMsg="hiddenMsg" />
  </div>
</template>

<script>
import MessageItem from "./MessageItem";
import SendMessage from "./SendMessage";
import Tips from "./Tips";

export default {
  components: {
    MessageItem,
    SendMessage,
    Tips
  },
  mounted() {
    this.initUserInfo();
    this.getMsgList();
    this.createWsConnection();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    // next()
  },
  data() {
    return {
      msgList: [],
      userName: "",
      userID: -1,
      timer: null,
      hiddenMsg: 0,
      scrollTop: 0
    };
  },
  methods: {
    createWsConnection() {
      this.ws = this.$api.sendMsg(this.userID);
      this.ws.onopen = () => {
        this.ws.onmessage = this.receiveNewMsg;
      };
      this.ws.onclose = e => {
        console.log("colse==", e.code, e.reason);
      };
    },
    sendHandle(msg) {
      msg.name = this.userName;
      this.msgList.push(msg);
      this.ws.send(JSON.stringify(msg));
      this.$nextTick(() => {
        this.scrollBottom();
      });
    },
    receiveNewMsg(e) {
      const newMsg = JSON.parse(e.data);
      this.msgList.push(newMsg);
      console.log(e.data, "这是新的消息----");
      const scroH = this.$refs.main.scrollHeight;
      const clientH = this.$refs.main.clientHeight;
      if (this.scrollTop + clientH < scroH) {
        //没有滚动到最底部
        this.hiddenMsg += 1;
      }
    },
    initUserInfo() {
      const info = this.$store.state.userInfo;
      this.userName = info.username;
      this.userID = info.id * 1;
    },
    getMsgList() {
      this.$api.getMessageList().then(resp => {
        console.log(resp);
        this.msgList = resp.data.data;
        this.$nextTick(() => {
          this.scrollBottom();
        });
      });
    },
    scrollBottom() {
      const h = this.$refs.main.scrollHeight;
      this.$refs.main.scrollTo(0, h);
    },
    scrollHandle(e) {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      this.scrollTop = scrollTop;
      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        //滚动到了最底部
        this.hiddenMsg = 0;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.chat-com {
  position: relative;
  width: 5.5rem;
  height: 6rem;
  margin: 0px auto 0px auto;
  border: 1px solid $border-color;
  .head {
    position: relative;
    width: 100%;
    height: 0.5rem;
    font-size: 0.18rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.15rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-color;
  }
  ul {
    height: 5.1rem;
    box-sizing: border-box;
    padding-bottom: 0.1rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      list-style: none;
      margin: 0.15rem 0.1rem 0 0.15rem;
      // border: 1px solid black;
      position: relative;
      overflow: hidden;
    }
  }
  .tips {
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
  }
}
</style>