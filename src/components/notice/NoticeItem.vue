<template>
  <div class="notice-item-com">
    <div class="header">
      <span class="title" @click="showDialog">【公告】{{notice.title}}</span>
      <Del class="del" @confirmDel="delNotice" />
    </div>
    <div class="main" v-html="notice.content"></div>
    <div class="footer">
      <span>来自：网站管理->管理员</span>
      <span class="ctime">{{notice.ctime | formatTime}}</span>
    </div>
  </div>
</template>

<script>
import Del from "@/components/base/Delete";
import { formatTime } from "@/utils/getCurTime.js";
export default {
  components: {
    Del
  },
  props: {
    notice: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      delCallback: () => {
        console.log(111);
      }
    };
  },
  methods: {
    showDialog() {
      this.$emit("showDialog",this.notice.id);
    },
    delNotice() {
      this.$api
        .delNotice({
          id: this.notice.id
        })
        .then(resp => {
          console.log(resp,'dellllldel');
          this.$emit('refresh')
        });
    }
  },
  filters: {
    formatTime
  }
};
</script>

<style scoped lang="scss">
.notice-item-com {
  .header {
    font-weight: 600;
    font-size: 0.2rem;
    color: #333;
    .title {
      &:hover {
        color: $active;
        text-decoration: underline;
      }
    }
    .del {
      display: inline-block;
    }
  }
  .main {
    margin: 0.1rem 0;
    height: 50px;
    line-height: 25px;
    // border:1px solid black;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .footer {
    color: $subText;
    .ctime {
      margin-left: 0.2rem;
    }
  }
}
</style>