<template>
  <div class="replay-com">
    <div class="leave-message">
      <span class="totle">{{messageList.length}}</span>
      <span class="text">条留言</span>
      <i class="el-icon-chat-dot-square leave" v-if="!isAdmin" @click.stop="toggleTextArea"></i>
    </div>

    <ReplayArea
      v-click-outside="hide"
      v-if="showTextArea"
      @send="sendHandle"
      :placeholder="'输入评论内容'"
    />

    <div class="message-list">
      <ul>
        <LeaveMessageItem
          v-for="(message,index) in messageList"
          :key="message.id"
          :messageList="messageList"
          :index="index"
          :author="author"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Del from "../base/Delete";
import ReplayArea from "./ReplayArea";
import LeaveMessageItem from "./LeaveMessageItem";
import directives from "@/utils/directives.js";

export default {
  components: {
    Del,
    ReplayArea,
    LeaveMessageItem
  },
  props: {
    listID: {
      type: Number,
      required: true,
      default: () => -1
    },
    author: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    isAdmin() {
      const role = this.$store.state.roles[0];
      return role === "admin";
    }
  },
  created() {
    this.getMessage();
  },
  directives: {
    clickOutside: directives.clickOutside
  },
  data() {
    return {
      textContent: "",
      showTextArea: false,
      messageList: []
    };
  },
  methods: {
    sendHandle(content) {
      const userInfo = this.$store.state.userInfo;
      const lookover = userInfo.username === this.author ? 1 : -1;
      const data = {
        dynamicID: this.listID,
        userID: userInfo.id,
        content: content,
        pID: -1,
        ctime: new Date().getTime(),
        lookover
      };
      this.$api.leaveMessage(data).then(resp => {
        console.log(resp, "评论成功");
        this.sendSuccess();
      });
    },
    sendSuccess() {
      this.showTextArea = false;
      this.textContent = "";
      this.getMessage();
    },
    getMessage() {
      this.$api
        .getMessageById({
          listID: this.listID
        })
        .then(resp => {
          this.messageList = resp.data.data;
          const newMsg = resp.data.data.filter(item => item.hasLook === -1)
          this.$emit('newMsgCount',newMsg)
        });
    },
    toggleTextArea(e) {
      this.showTextArea = !this.showTextArea;
    },
    hide() {
      this.showTextArea = false;
    }
  }
};
</script>

<style scoped lang="scss">
.replay-com {
  border-top: 1px solid $border-color;
  margin-bottom: 0.1rem;
  .leave-message {
    padding-left: 0.1rem;
    margin: 0.1rem 0;
    .total {
      font-weight: 600;
      color: #333;
    }
    .text {
      font-size: 0.14rem;
      color: $subText;
    }
    .leave {
      font-size: 0.2rem;
      padding: 0 0.04rem;
      cursor: pointer;
      //   border: 1px solid #333;
    }
  }

  .message-list {
    ul {
      li {
        margin: 0.1rem;
        .username {
          color: $active;
        }
      }
    }
  }
}
</style>