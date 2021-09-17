<template>
  <div class="images-list-com">
    <div class="show-box">
      <div class="images-box">
        <div class="img-item" v-for="(img,index) in pathObj" :key="img.id">
          <!-- <img :src="item.url" alt />   :preview-src-list="completeUrl" -->
          <el-image class="img" lazy :preview-src-list="completeUrl" :src="img.url" fit="cover"></el-image>
          <div class="ctime">{{img.ctime | formatTime}}</div>
          <Del class="del" :id="img.id" @confirmDel="confirmDel" :styleObj="styleObj" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Del from "../base/Delete";

export default {
  components: {
    Del
  },
  props: {
    imgPathArr: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    pathObj() {
      const arr = this.imgPathArr.map(item => {
        const { id, className, ctime } = item;
        const url = this.$url + "/" + item.url;
        return { id, className, url, ctime };
      });
      return arr;
    },
    completeUrl() {
      const arr = [];
      this.pathObj.forEach(item => {
        arr.push(item.url);
      });
      return arr;
    }
    // isAdmin() {
    //   const role = this.$store.state.roles[0];
    //   return role === "admin";
    // }
  },
  methods: {
    confirmDel(id) {
      this.delAlbumPhot(id);
    },
    delAlbumPhot(id) {
      this.$api
        .delCertainPhoto({
          id
        })
        .then(resp => {
          console.log(resp);
          this.delCallback();
        });
    },
    delCallback() {
      this.$message({
        message: "删除成功！",
        showClose: true,
        duration: 1500,
        type: "success"
      });
      this.$emit("refresh");
    }
  },
  data() {
    return {
      styleObj: {
        color: "#fff"
      }
    };
  },
  filters: {
    formatTime(timer) {
      const date = new Date(timer * 1);
      const yy = date.getFullYear();
      let mm = date.getMonth() + 1;
      mm = mm < 10 ? "0" + mm : mm;
      let dd = date.getDate();
      dd = dd < 10 ? "0" + date.getDate() : date.getDate();
      return `${yy}-${mm}-${dd}`;
    }
  }
};
</script>

<style scoped lang="scss">
.images-list-com {
  .show-box {
    .images-box {
      padding: 0.05rem 0.05rem;
      overflow: hidden;
      cursor: pointer;
      .img-item {
        width: 2.5rem;
        height: 2.5rem;
        position: relative;
        float: left;
        margin-left: 0.2rem;
        margin-bottom: 0.1rem;
        .del {
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: pointer;
        }
        .el-icon-close {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 0.18rem;
          background: rgba(0, 0, 0, 0.75);
          color: #fff;
          cursor: pointer;
        }
        img,
        .img {
          width: 100%;
          height: 100%;
        }
        .ctime {
          position: absolute;
          width: 100%;
          height: 0.3rem;
          bottom: 0;
          left: 0;
          text-align: center;
          line-height: 0.3rem;
          color: #a6a6a6;
          background: rgb(38, 38, 38);
        }
      }
    }
  }
}
</style>