<template>
  <div class="dynamic-list-img">
    <div class="img-box">
      <div class="image-item" v-for="(url, i) in urlArray" :key="url.id">
        <el-image class="img" lazy :preview-src-list="completeUrl" :src="url.path" fit="cover"></el-image>
        <!-- <img :src="url" alt="" class="img"> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listID: {
      type: Number,
      required: true,
      default: () => -1
    }
  },
  mounted() {
    this.getImgPath(this.listID)
  },
  computed: {
    urlArray() {
      const _ = this;
      const arr = _.imgsPathArray.map(item => {
        item.path = _.$url + "/" + item.path;
        return item;
      });
      return arr;
    },
    completeUrl() {
      const arr = this.urlArray.map(item => {
        return item.path;
      });
      return arr;
    }
  },
  data() {
    return {
      imgsPathArray: []
    };
  },
  methods: {
    getImgPath(listID) {
      this.$api
        .getDynamicImgPath({
          listID
        })
        .then(resp => {
          this.imgsPathArray = resp.data.data;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.dynamic-list-img {
  //   margin-top: 0.1rem;
  padding-bottom: 0.3rem;
  // border-bottom: 1px solid $border-color;

  .img-box {
    text-align: left;
    width: 87%;
    overflow: hidden;
    .image-item {
      float: left;
      margin-right: 0.1rem;
      margin-top: 0.1rem;
      width: 2.5rem;
      height: 2.5rem;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>