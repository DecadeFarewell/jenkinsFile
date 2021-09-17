<template>
  <div class="all-dynamic">
    <div class="all">
      <span class="text">全部动态</span>
      <i class="el-icon-s-help"></i>
    </div>
    <div class="refresh">
      <!-- <div class="hidden-tips">刷新动态</div> -->
      <a href="javascript:void(0)" title="刷新动态" @click="throttleRefresh">
        <i class="el-icon-refresh-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastTime: 0
    };
  },
  methods: {
    refresh() {
      this.$emit("needRefresh");
    },
    throttleRefresh() {
      let curTime = new Date().getTime();
      if (curTime - this.lastTime > 2000) {
        this.refresh();
        this.lastTime = curTime;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.all-dynamic {
  border: 1px solid rgba(182, 173, 173, 0.897);
  display: flex;
  height: 50px;
  align-items: center;
  .all {
    cursor: pointer;
    .text {
      font-size: 0.14rem;
      padding-left: 0.2rem;
    }
  }
  .refresh {
    position: relative;
    margin-left: 3rem;
    &:hover {
      .hidden-tips {
        visibility: visible;
      }
    }
    .el-icon-refresh-right {
      font-size: 0.18rem;
      width: 0.2rem;
      height: 0.2rem;
      font-weight: 700;
      color: #333;
      cursor: pointer;
      &:hover {
        color: $active;
      }
    }
    .hidden-tips {
      width: 0.8rem;
      position: absolute;
      left: 0.15rem;
      top: 0.15rem;
      font-size: 0.14rem;
      color: #fff;
      background: #000;
      visibility: hidden;
      padding: 0.05rem 0;
    }
  }
}
</style>