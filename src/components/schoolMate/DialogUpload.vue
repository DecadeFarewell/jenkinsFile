<template>
  <div class="upload-dialog-com">
    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="75%" :before-close="handleClose">
      <div class="upload-area">
        <div class="show-local" v-for="(item, index) in fileObject">
          <div class="img-box">
            <el-image class="img" lazy :src="item.url" fit="contain"></el-image>
            <div class="delete-bar">
              <i class="el-icon-delete delete-icon" @click="deleteOne(index)"></i>
            </div>
            <span class="file-name">{{item.filename}}</span>
          </div>
        </div>
        <div class="add-box" @click="triggleFile" v-if="fileObject.length !== maxLimit">
          <i class="el-icon-plus add-icon"></i>
          <span class="text">上传图片({{fileObject.length}}/{{maxLimit}})</span>
          <input ref="file" type="file" hidden @change="selectedImg" />
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHandle">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  data() {
    return {
      reader: new FileReader(),
      maxLimit: 12,
      fileObject: []
    };
  },
  methods: {
    //触发input:file的点击事件
    triggleFile() {
      this.$refs.file.click();
    },
    // 图片选择完毕
    selectedImg(e) {
      const file = e.target.files[0];
      if (this.fileObject.length >= this.maxLimit) {
        this.execeedLimit();
      } else {
        this.addIntoFileObj(file);
      }
    },
    //提示超过数量
    execeedLimit() {
      this.$message({
        message: `选择图片数量不能超过${this.maxLimit}`,
        type: "warning",
        duration: 3500
      });
    },
    //添加到数组中
    addIntoFileObj(file) {
      this.reader.readAsDataURL(file);
      this.reader.onload = e => {
        const base64URL = e.target.result;
        this.fileObject.push({
          url: base64URL,
          filename: file.name,
          file: file
        });
      };
    },
    //删除已选择的一个
    deleteOne(index) {
      this.$refs.file.value = null; //将值清空，否则下次再选同一个图片时无法触发change事件
      this.fileObject.splice(index, 1);
    },
    //上传到服务器
    subToServer() {
      const formData = this.initFormData();
      const classID = this.$store.state.classID;
      return this.$api.uploadToAlbum(formData, classID);
    },
    //构建formData对象
    initFormData() {
      const former = new FormData();
      for (let i = 0; i < this.fileObject.length; i++) {
        const file = this.fileObject[i].file;
        former.append("img", file);
      }
      return former;
    },
    closeHandle() {
      this.$emit("close");
    },
    confirmHandle() {
      if (this.fileObject.length > 0) {
        this.subToServer().then(resp => {
          this.fileObject = [];
          this.$refs.file.value = null;
          this.$emit("confirmUpload",true);
        });
      } else {
        this.$emit("confirmUpload",false);
      }
    },
    handleClose() {
      this.$confirm("确认取消上传？")
        .then(_ => {
          this.closeHandle();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped lang="scss">
.upload-dialog-com {
  .upload-area {
    width: 100%;
    min-height: 3.7rem;
    border: 1px solid $border-color;
    .show-local {
      width: 1.5rem;
      height: 1.5rem;
      float: left;
      margin: 0.1rem 0.15rem 0.1rem;
      box-sizing: border-box;
      border: 1px solid $border-color;
      .img-box {
        width: 1.48rem;
        height: 1.28rem;
        box-sizing: border-box;
        margin: 0 auto;
        position: relative;
        &:hover {
          .delete-bar {
            visibility: visible;
          }
        }
        .img {
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
        .delete-bar {
          position: absolute;
          left: 0;
          bottom: 0;
          background: rgba(128, 128, 128, 0.8);
          width: 100%;
          height: 20%;
          visibility: hidden;
          .delete-icon {
            position: absolute;
            top: 50%;
            transform: translateX(-50%);
            right: 0;
            top: 0;
            font-size: 0.2rem;
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .file-name {
        display: inline-block;
        width: 100%;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .add-box {
      width: 1.48rem;
      height: 1.48rem;
      float: left;
      overflow: hidden;
      box-sizing: border-box;
      margin: 0.1rem 0.15rem 0.1rem;
      border: 1px solid $border-color;
      position: relative;
      cursor: pointer;
      .add-icon {
        font-size: 0.5rem;
        position: absolute;
        top: 25%;
        left: 50%;
        color: #ddd;
        transform: translateX(-50%);
      }
      .text {
        display: inline-block;
        width: 100%;
        text-align: center;
        height: 0.35rem;
        line-height: 0.35rem;
        position: absolute;
        top: 60%;
        font-size: 0.18rem;
        color: #ddd;
      }
    }
  }
}
</style>