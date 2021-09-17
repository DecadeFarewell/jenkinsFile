<template>
  <div class="album-show-com">
    <span class="back" @click="back">返回</span>
    <div class="upload-img" @click="dialogVisible = true" v-if="isMyClasssAlbum">
      <i class="el-icon-picture"></i>
      <span class="upload">上传照片</span>
    </div>

    <DialogUpload
      :dialogVisible="dialogVisible"
      @close="dialogVisible = false"
      @confirmUpload="confirmUploadHandle"
    />

    <ImagesList :imgPathArr="imgPathArr" @refresh="getAlbumImgs" />
  </div>
</template>

<script>
import DialogUpload from "./DialogUpload";
import ImagesList from "./ImagesList";
export default {
  components: {
    DialogUpload,
    ImagesList
  },
  data() {
    return {
      dialogVisible: false,
      imgPathArr: []
    };
  },
  mounted() {
    this.getAlbumImgs();
  },
  computed:{
    //当前的相册是不是当前用户所在的班级
    isMyClasssAlbum(){
      const state = this.$store.state;
      return state.classID === state.userInfo.classID
    }
  },
  methods: {
    confirmUploadHandle(isUpload) {
      this.dialogVisible = false;
      if (isUpload) {
        this.getAlbumImgs();
        this.$message({
          message: "上传成功！",
          type: "success"
        });
      }
    },
    back() {
      console.log(this.$route, "bbbbb");
      this.$router.go(-1);
    },
    getAlbumImgs() {
      const id = this.$store.state.classID;

      this.$api
        .getAlbumImgsPath({
          classID: id
        })
        .then(resp => {
          console.log(resp, "ppppp");
          this.imgPathArr = resp.data.data;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.album-show-com {
  .back {
    font-weight: 600;
    color: #303133;
    text-decoration: underline;
    margin: 0.2rem 0 0 0.2rem;
    cursor: pointer;
  }
  .upload-img {
    width: 1.2rem;
    height: 0.4rem;
    margin: 0.2rem 0.2rem;
    line-height: 0.4rem;
    padding: 0.05rem 0.2rem;
    background: $active;
    cursor: pointer;
    display: flex;
    align-items: center;
    .upload {
      font-weight: 600;
      color: #fff;
    }
    .el-icon-picture {
      font-size: 0.24rem;
      color: #fff;
    }
  }
}
</style>