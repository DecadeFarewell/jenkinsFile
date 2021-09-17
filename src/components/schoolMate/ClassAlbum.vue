<template>
  <div class="class-album-com">
    <router-link
      :to="{path:`${this.$route.path}/album`,params:{classID:$store.state.classID}}"
      @click.stop.capture
    >
      <div class="show-box">
        <div class="poster-box">
          <el-image
            class="poster"
            :src="posterUrl ? posterUrl : '/static/images/none.jpg'"
            :fit="'cover'"
          ></el-image>
          <div class="counts">{{this.poster.counts}}</div>
        </div>
        <div class="text">{{className}}的相册</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    poster: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    posterUrl() {
      const src = this.poster.posterUrl
        ? this.$url + "/" + this.poster.posterUrl
        : "";
      return src;
    },
    className() {
      if(!this.classMap.length)return ''
      const classID =  this.$store.state.classID;
      const curClass = this.classMap.find(item => item.cID === parseInt(classID))
      return  curClass.className
    }
  },
  data(){
    return {
      classMap:[]
    }
  },
  mounted(){
    this.getClassNameMap()
  },
  methods:{
    getClassNameMap(){
      this.$api.getClassNameMap().then(resp => {
        console.log(resp.data.data,'mmmmm');
        this.classMap = resp.data.data;
      })
    }
  }
};
</script>

<style scoped lang="scss">
.class-album-com {
  padding-bottom: 0.15rem;
  border-bottom: 1px solid $border-color;
  .upload-img {
    width: 1.2rem;
    height: 0.4rem;
    margin: 0.2rem 0.1rem;
    line-height: 0.4rem;
    padding: 0.05rem 0.2rem;
    background: $active;
    cursor: pointer;
    display: flex;
    align-items: center;
    .el-icon-picture {
      font-size: 0.24rem;
      color: #fff;
    }
  }
  .show-box {
    display: inline-block;
    width: 1.85rem;
    height: 2.16rem;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    border: 0.1rem solid #333;
    background: #333;
    .poster-box {
      width: 95%;
      height: 80%;
      position: relative;
      cursor: pointer;
      .poster {
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
      .counts {
        width: 0.3rem;
        height: 0.3rem;
        color: #fff;
        font-weight: 600;
        line-height: 0.3rem;
        text-align: center;
        position: absolute;
        font-size: 0.22rem;
        right: -0.2rem;
        bottom: -0.3rem;
      }
    }
    .text {
      height: 20%;
      color: #fff;
      padding-left: 5%;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>