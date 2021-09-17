<template>
  <div class="class-member-com">
    <div class="member-card" @click="dialogVisible = true">
      <div class="avater">
        <img :src="avater" alt />
        <!-- <el-image class="img" lazy :src="avater" fit="cover"></el-image> -->
      </div>
      <div class="info">
        <div class="info-top">
          <span class="name">姓名：{{info.real_name}}</span>
          <span class="sex">
            <i class="el-icon-male"></i>
          </span>
        </div>
        <div class="info-bottom">
          <i class="el-icon-phone-outline"></i>
          <span class="tel">{{info.tel}}</span>
        </div>
      </div>
    </div>

    <DialogMemberInfo 
    @close="dialogVisible = false"
    :detailInfo="info"
    :dialogVisible="dialogVisible" />

  </div>
</template>

<script>
import DialogMemberInfo from "./DialogMemberInfo.vue";
export default {
  components: {
    DialogMemberInfo
  },
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    avater() {
      return this.$url + "/" + this.info.avater_path;
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>

<style scoped lang="scss">
.class-member-com {
  .member-card {
    border: 1px solid $border-color;
    border-radius: 0.1rem;
    overflow: hidden;
    padding: 0.05rem;
    display: flex;
    width: 2.7rem;
    height: 100px;
    cursor: pointer;
    .avater {
      flex: 0 0 1rem;
      border-radius: 50%;
      overflow: hidden;
      transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        // transform: scale(1.3);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1 1 auto;
      margin-left: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .info-top {
        &:hover {
          .name {
            font-size: 0.18rem;
          }
        }
        .name {
          font-weight: 600;
          color: #333;
          transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .sex {
          color: $active;
        }
      }
      .info-bottom {
        &:hover {
          .tel {
            font-size: 0.18rem;
          }
        }
        .tel {
          transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
    }
  }
}
</style>