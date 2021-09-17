<template>
  <div class="message-item-com">
    <div class="user" :class="{mine: msg.name == name}">
      <span class="name" :class="{mine: msg.name == name, others: msg.name != name}">{{msg.name}}</span>
      <span class="ctime">{{msg.ctime | formatTime}}</span>
    </div>
    <div :class="{mineContent: msg.name == name, content: msg.name != name}">
      <span class="message">{{msg.msg}}</span>
    </div>
  </div>
</template>

<script>
import getCurTime from "@/utils/getCurTime.js";

export default {
  props: {
    msg: {
      type: Object,
      required: false,
      default: () => {}
    },
    name: {
      type: String,
      required: true,
      default: () => ""
    }
  },
  mounted(){
    // console.log(msg)
  },
  filters: {
    formatTime(timer) {
      return getCurTime(timer * 1);
    }
  }
};
</script>

<style scoped lang="scss">
.message-item-com {
  .user {
    display: flex;

    &.mine {
      flex-direction: row-reverse;
    }
    .name {
      color: blue;

      &.mine {
        color: red;
      }
      &.others {
        color: blue;
      }
    }
    .ctime {
      margin-left: 0.05rem;
      font-size: 0.14rem;
      color: $text;
    }
  }
  .content {
    width: 70%;
    min-height: 0.3rem;
    margin-top: 0.05rem;
    .message {
      display: inline-block;
      min-height: 0.2rem;
      min-width: 0.3rem;
      border-radius: 5px;
      padding: 0.05rem 0.05rem;
      background: rgb(173, 255, 47);
      color: #333;
      position: relative;
      margin-top: 0.05rem;
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0.05rem;
        top: -0.16rem;
        width: 0;
        height: 0;
        border: 0.08rem solid rgb(173, 255, 47);
        border-top: 0.08rem solid transparent;
        border-left: 0.08rem solid transparent;
        border-right: 0.08rem solid transparent;
      }
    }
  }
  .mineContent {
    width: 70%;
    min-height: 0.3rem;
    margin-top: 0.05rem;
    float: right;
    .message {
      display: inline-block;
      min-width: 0.3rem;
      min-height: 0.2rem;
      border-radius: 5px;
      padding: 0.05rem 0.05rem;
      background: rgb(173, 255, 47);
      color: #333;
      position: relative;
      margin-top: 0.05rem;
      float: right;
      &::after {
        content: "";
        display: block;
        position: absolute;
        right: 0.08rem;
        top: -0.16rem;
        width: 0;
        height: 0;
        border: 0.08rem solid rgb(173, 255, 47);
        border-top: 0.08rem solid transparent;
        border-left: 0.08rem solid transparent;
        border-right: 0.08rem solid transparent;
      }
    }
  }
}
</style>