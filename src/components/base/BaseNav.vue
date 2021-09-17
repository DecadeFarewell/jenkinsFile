<template>
  <el-row class="nav">
    <ul class="nav-ul">
      <router-link :to="{path: '/alumni/dynamic'}">
        <li class="nav-item active">动态</li>
      </router-link>
      <router-link :to="{path: '/alumni/personal'}" v-if="role =='ordinary'">
        <li class="nav-item">
          <span>个人中心</span>
          <div class="notifyCount" v-if="count">{{count}}</div>
        </li>
      </router-link>
      <router-link :to="{path: '/alumni/schoolMate'}">
        <li class="nav-item">同生缘</li>
      </router-link>
      <router-link :to="{path: '/alumni/chat'}">
        <li class="nav-item">多人聊天室</li>
      </router-link>
      <router-link :to="{path: '/alumni/notice'}">
        <li class="nav-item">站内公告</li>
      </router-link>
    </ul>
  </el-row>
</template>

<script>
export default {
  computed: {
    role() {
      return this.$store.state.roles[0];
    },
    count() {
      return this.$store.state.notifyCount;
    }
  },
  mounted() {
    // this.getNotifiesNum()
    this.timer = setInterval(() => {
      this.$store.dispatch("GetNotifyCount");
    }, 2000);
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  data() {
    return {
      notifyCounts: 0,
      timer:null
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.nav {
  height: 100%;
  line-height: 0.6rem;
  .nav-ul {
    .nav-item {
      float: left;
      height: 100%;
      font-size: 0.18rem;
      color: $text;
      padding: 0 0.2rem;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      .notifyCount {
        position: absolute;
        right: 0;
        top: 0.1rem;
        width: 0.2rem;
        height: 0.2rem;
        text-align: center;
        line-height: 0.2rem;
        border-radius: 50%;
        background: red;
        transform: scaleY(0.8);
        font-weight: 600;
        font-size: 0.12rem;
        color: #fff;
      }
    }
    .exact,
    .active {
      .nav-item {
        color: $active;
      }
    }

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>