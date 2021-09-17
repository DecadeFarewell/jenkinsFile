<template>
  <div class="upload-notice-com">
    <div class="upload-notice-area">
      <label for="title">公告标题：</label>
      <el-input id="title" class="title" v-model="title" placeholder="输入公告标题"></el-input>
      <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;"></div>
      </div>
      <el-button class="publish-btn" type="primary" @click="publish">发 布</el-button>
      <el-button class="clear-btn" type="info" @click="clearContent">清 空</el-button>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      title: "",
      editorContent: ""
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData"], // 接收父组件的方法
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      //   this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      console.log(this.editorContent);
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
  methods: {
    publish() {
      if (this.title.trim() === "") {
        this.$message({
          message: "标题为空！",
          type: "warning",
          duration: 1500
        });
        return;
      }
      if (this.editorContent.trim() === "") {
        this.$message({
          message: "内容为空！",
          type: "warning",
          duration: 1500
        });
        return;
      }
      const form = new FormData();
      form.append("title", this.title);
      form.append("content", this.editorContent);
      form.append("publisher", "管理员");
      this.$api.publishNotice(form).then(
        resp => {
          this.pubSuccess(resp);
          this.$emit("refresh");
        },
        err => {
          this.$message({
            message: `${err}`,
            type: "error",
            duration: 1500
          });
        }
      );
    },
    pubSuccess(resp) {
      this.$message({
        message: `${resp.data.msg}`,
        type: "success",
        duration: 1500
      });
    },
    clearContent() {
      this.editor.txt.html("");
      this.title = "";
    }
  }
};
</script>

<style scoped lang="scss">
.upload-notice-com {
  border-bottom: 1px solid $border-color;
  .upload-notice-area {
    min-height: 200px;
    // border: 1px solid $border-color;
    margin-bottom: 0.2rem;
    label {
      font-weight: 600;
      color: #333;
    }
    .title {
      width: 60%;
      margin-bottom: 0.2rem;
    }
    .publish-btn,
    .clear-btn {
      display: block;
      margin: 0.1rem auto;
    }
  }
}
</style>