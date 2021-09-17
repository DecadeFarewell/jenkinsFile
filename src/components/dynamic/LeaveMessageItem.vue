<template>
  <div class="leave-message-item-com">
    <li class="message-item" @mouseenter="mouseEnterHandle" @mouseleave="mouseleaveHandle">
      <span class="username">{{message.username}}</span>
      <span v-if="!parentMesaage">：</span>
      <span v-else class="parentMsg">
        回复
        <span class="username">{{parentMesaage.username}}</span> ：
      </span>
      <span class="content">{{message.content}}</span>
      <a class="rep" href="javascript:void(0)" title="回复" v-if="showReplayIcon">
        <i class="el-icon-chat-dot-square leave" v-if="!isAdmin" @click.stop="toggleTextArea"></i>
      </a>
      <Del class="del" @confirmDel="confirmDel" />

      <ReplayArea
        v-click-outside="hide"
        v-if="showTextArea"
        @send="sendHandle"
        :placeholder="message.username"
      />
    </li>
  </div>
</template>

<script>
import ReplayArea from "./ReplayArea";
import Del from "../base/Delete";

import directives from "@/utils/directives.js";

export default {
  name: "messageItem",
  components: {
    ReplayArea,
    Del
  },
  props: {
    messageList: {
      type: Array,
      required: true,
      default: []
    },
    index: {
      type: Number,
      required: true,
      default: -1
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
    },
    message() {
      return this.messageList[this.index];
    },
    parentMesaage() {
      if (this.message.parentID > -1) {
        return this.messageList.find(item => item.id === this.message.parentID);
      } else {
        return null;
      }
    }
  },
  directives: {
    clickOutside: directives.clickOutside
  },
  data() {
    return {
      showReplayIcon: false,
      showTextArea: false
    };
  },
  methods: {
    mouseEnterHandle() {
      this.showReplayIcon = true;
    },
    mouseleaveHandle() {
      this.showReplayIcon = false;
    },
    toggleTextArea() {
      this.showTextArea = !this.showTextArea;
    },
    sendHandle(content) {
      const userInfo = this.$store.state.userInfo;
      const lookover = userInfo.username === this.author ? 1 : -1;
      const data = {
        dynamicID: this.$parent.$parent.listInfo.listID,
        userID: this.$store.state.userInfo.id,
        content: content,
        pID: this.message.id,
        ctime: new Date().getTime(),
        lookover
      };
      console.log(this.$parent.$parent.listInfo.listID)
      this.$api.leaveMessage(data).then(resp => {
        console.log(resp, "评论成功");
        this.sendSuccess();
      });
    },
    sendSuccess() {
      this.showTextArea = false;
      this.showReplayIcon = false;
      this.$parent.getMessage();
    },
    hide() {
      this.showTextArea = false;
    },
    confirmDel(id) {
      this.$api
        .delLeaveMsg({
          id: this.message.id
        })
        .then(resp => {
          this.$message({
            message: resp.data.msg,
            type: "success",
            duration: 1000,
            showClose: true
          });
          this.$parent.getMessage();
        });
    }
  }
};
</script>

<style scoped lang="scss">
.leave-message-item-com {
  li {
    margin: 0.1rem;
    .username {
      color: $active;
    }
    .parentMsg {
      .username {
        color: $active;
      }
    }
    .rep {
    }
  }
  .del {
    display: inline-block;
    margin-left: 0.1rem;
  }
}
</style>