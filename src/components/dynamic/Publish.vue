<template>
  <div class="publish">
    <div class="publish-header">
      <div class="text-area">
        <textarea
          v-model="pubContent"
          cols="30"
          rows="10"
          maxlength="80"
          placeholder="说点什么吧,字数限制80"
        ></textarea>
      </div>
      <div class="select-photo" @click="selectPhoto">
        <i class="el-icon-camera-solid"></i>
        <input type="file" ref="upload" class="upload-img" @change="inputChangeHandle" />
      </div>
      <div class="publish-btn" @click="subToServer">发表</div>
    </div>
    <template v-if="dataURLArray.length">
      <div class="slider">
        <i class="el-icon-picture"></i>
        <span>图片({{dataURLArray.length}}/{{maxLimit}})</span>
        <a href="javascript:void(0)" title="删除所有" @click="deleteAll">
          <i class="el-icon-close close"></i>
        </a>
      </div>
      <div class="publish-images">
        <div class="show-local" v-for="(item, index) in dataURLArray">
          <div class="img-box">
            <el-image class="img" :src="item.url" fit="contain"></el-image>
            <div class="delete-bar">
              <i class="el-icon-delete delete-icon" @click="deleteOne(index)"></i>
            </div>
            <span class="file-name">{{item.filename}}</span>
          </div>
        </div>
        <div class="add-box" @click="selectPhoto" v-if="dataURLArray.length !== maxLimit">
          <i class="el-icon-plus add-icon"></i>
          <span class="text">上传图片({{dataURLArray.length}}/{{maxLimit}})</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pubContent: "",
      maxLimit: 9,
      reader: new FileReader(),
      dataURLArray: [],
      id: 0
    };
  },
  methods: {
    selectPhoto() {
      this.$refs.upload.click();
    },
    inputChangeHandle(e) {
      const file = e.target.files[0];
      if (this.dataURLArray.length >= this.maxLimit) {
        this.execeedLimit();
      } else {
        this.showImgLocal(file);
      }
    },
    //提示超过数量
    execeedLimit() {
      this.$message({
        message: `选择图片数量不能超过${this.maxLimit}`,
        type: "error",
        duration: 3500
      });
    },
    //本地展示图片
    showImgLocal(file) {
      this.reader.readAsDataURL(file);
      this.reader.onload = e => {
        const base64URL = e.target.result;
        this.dataURLArray.push({
          url: base64URL,
          filename: file.name,
          file: file
        });
      };
    },
    //删除全部选中的
    deleteAll() {
      this.dataURLArray = [];
    },
    //删除一个
    deleteOne(index) {
      this.$refs.upload.value = null; //将值清空，否则下次再选同一个图片时无法触发change事件
      this.dataURLArray.splice(index, 1);
    },
    //发送到服务器
    async subToServer() {
      //发送之前还要有验证，文字和图片不能都为空
      if (this.validateBaseInfo()) {
        if (this.validateContent()) {
          const fromData = this.initFormData();
          const response1 = await this.$api.publishDynamic_img(fromData);
          const response2 = await this.subBaseInfo(response1.data.data);
          response2.data.status && this.complete();
        } else {
          this.showMessage("请输入内容或选择图片", "warning", 1500);
        }
      } else {
        this.showMessage("请先完善基本信息", "error", 2000, e => {
          this.returnOrigin();
          this.$router.push({ path: "/alumni/personal" });
        });
      }
    },
    initFormData() {
      const formData = new FormData();
      for (let i = 0; i < this.dataURLArray.length; i++) {
        const file = this.dataURLArray[i].file;
        formData.append("img", file);
      }
      return formData;
    },
    subBaseInfo(imgsPath) {
      const userInfo = this.$store.state.userInfo;
      return this.$api.publishDynamic_info({
        userID: userInfo.id,
        content: this.pubContent,
        imgsPath: imgsPath
      });
    },
    //验证 内容是否为空
    validateContent() {
      return this.pubContent !== "" || this.dataURLArray.length !== 0;
    },
    //验证基本信息是否具备
    validateBaseInfo() {
      const userInfo = this.$store.state.userInfo;
      return (
        userInfo &&
        userInfo.avater_path &&
        userInfo.username &&
        userInfo.real_name
      );
    },
    //请求均已提交成功
    complete() {
      this.$emit("needRefresh");
      this.pubContent = "";
      this.dataURLArray = [];
      this.showMessage("发布成功", "success");
    },
    //消息提示
    showMessage(msg, type, duration = 2000, closeCB = () => {}) {
      this.$message({
        message: msg,
        type: type,
        showClose:true,
        duration: duration,
        onClose: e => {
          closeCB(e);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.publish {
  border: 1px solid $border-color;
  .publish-header {
    width: auto;
    display: flex;
    .text-area {
      width: 8rem;
      height: 0.6rem;
      textarea {
        width: 99%;
        height: 100%;
        padding: 0.1rem;
        box-sizing: border-box;
        font-size: 0.16rem;
        resize: none;
        border: none;
        outline: none;
      }
    }
    .select-photo {
      position: relative;
      height: 0.62rem;
      width: 0.62rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid $border-color;
      border-right: 1px solid $border-color;
      box-sizing: border-box;
      cursor: pointer;
      .upload-img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        visibility: hidden;
      }
      .el-icon-camera-solid {
        font-size: 0.5rem;
      }
    }
    .publish-btn {
      width: 0.62rem;
      height: 0.62rem;
      text-align: center;
      line-height: 0.62rem;
      border-right: 1px solid $border-color;
      box-sizing: border-box;
      background: $active;
      color: #fff;
      cursor: pointer;
    }
  }
  .slider {
    position: relative;
    text-align: left;
    border: 1px solid $border-color;
    border-right: none;
    border-left: none;
    padding: 0.05rem;
    .close {
      position: absolute;
      font-size: 0.25rem;
      right: 0;
      top: 0;
      color: $text;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  .publish-images {
    height: auto;
    overflow: hidden;
    // border: 1px solid $border-color;
    // border-top: none;
    .images-box {
      padding: 0.05rem 0.05rem;
      overflow: hidden;
      .img-item {
        width: 148px;
        height: 128px;
        position: relative;
        float: left;
        margin-left: 0.2rem;
        margin-bottom: 0.1rem;
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
      }
    }
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