<template>
  <div class="dynamic-list-head">
    <div class="avater">
      <img v-lazy="avaterSrc" alt="头像" />
    </div>
    <div class="user-info">
      <div class="user-name">
        <span class="user-name">{{userName}}</span>
        <span class="real-name">({{realName}})</span>
      </div>
      <div class="publish">
        <span class="create-time">{{pubTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCurTime from '@/utils/getCurTime.js'
export default {
  props: {
    avaterPath: {
      type: String,
      required: true,
      default: ""
    },
    userName: {
      type: String,
      required: true,
      default: ""
    },
    realName: {
      type: String,
      required: true,
      default: ""
    },
    ctime: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    avaterSrc() {
      return this.$url + '/' + this.avaterPath;
    },
    pubTime() {
      const timer =  new Date(this.ctime * 1);
      return getCurTime(timer);
    }
  }
};
</script>

<style scoped lang="scss">
.dynamic-list-head {
  box-sizing: border-box;
  width: 100%;
  height: 0.5rem;
  display: flex;
  .avater {
    flex: 0 0 0.5rem;
    margin-right: 0.1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user-info {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    .user-name {
      flex-basis: 0.2rem;
      text-align: left;
      flex-basis: 0.25rem;
      font-size: 0.18rem;
      font-weight: 700;
      color: #333;
    }
    .publish {
      flex-basis: 0.25rem;
      span {
        display: inline-block;
        height: 100%;
        margin-right: 0.1rem;
        font-size: 0.14rem;
        line-height: 0.25rem;
        color: #909090;
      }
    }
  }
}
</style>