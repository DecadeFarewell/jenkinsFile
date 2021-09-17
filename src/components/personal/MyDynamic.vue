<template>
  <div class="my-dynamic-com">
    <div class="no-dynamic" v-if="dynamicList.length === 0">
      <h1>暂未发表过动态</h1>
      <router-link class="to-dynamic" :to="{path: '/alumni/dynamic'}">现在去发表</router-link>
    </div>
    <DynamicList
      class="list-com"
      v-for="(item, index) in dynamicList"
      :key="item.listID"
      :listInfo="item"
      v-if="dynamicList.length"
      @refresh="getMyDynamicList"
      @receiveNewMsg="receiveNewMsg"
    >{{newMsg.length}}新条留言</DynamicList>
  </div>
</template>

<script>
import DynamicList from "@/components/dynamic/DynamicList";
export default {
  components: {
    DynamicList
  },
  created() {
    this.getMyDynamicList();
  },
  mounted() {
    setTimeout(() => {
      this.hasLookAll();
    }, 2000);
  },
  data() {
    return {
      dynamicList: [],
      newMsg: []
    };
  },
  methods: {
    getMyDynamicList() {
      const myUserID = this.$store.state.userInfo.id;
      this.$api
        .getMyDynamicList({
          userID: myUserID
        })
        .then(res => {
          console.log(res, "我的动态列表来了");
          this.dynamicList = res.data.data;
        });
    },
    receiveNewMsg(msg) {
      this.newMsg = msg;
    },
    hasLookAll() {
      const userID = this.$store.state.userInfo.id;
      this.$api
        .hasLookAll({
          userID
        })
        .then(resp => {
          console.log(resp, "清掉了没?????");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.my-dynamic-com {
  .no-dynamic{
    h1{
      display: inline-block;
    }
    .to-dynamic{
      color: $active;
      text-decoration: underline;
    }
  }
  .list-com {
    margin-bottom: 0.1rem;
  }
}
</style>