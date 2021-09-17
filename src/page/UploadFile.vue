<template>
  <div class="upload-com">
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
    <el-button @click="handlePause">暂停</el-button>
    <el-button @click="handleResume">恢复</el-button>

    <template v-if="this.container.file">
      <p>计算文件hash</p>
      <el-progress :percentage="hashPercentage"></el-progress>
      <p>总进度</p>
      <el-progress :percentage="fakeUploadPercentage"></el-progress>

      <table border="1" class="table" v-if="this.data.length > 0">
        <tbody>
          <tr>
            <th class="hash">切片hash</th>
            <th class="size">大小（KB）</th>
            <th class="progress">进度</th>
          </tr>
          <tr v-for="(item,index) in data" :key="item.hash + index">
            <td>{{item.hash}}</td>
            <td>{{Math.ceil((item.chunk.size/1024))}}</td>
            <td>
              <el-progress :percentage="item.percentage"></el-progress>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
const SIZE = 10 * 1024 * 1024; //这是切片的大小
import Hash from "./hash.worker.js";
export default {
  created() {
    // this.$set(this.container, "worker", new Hash());
    // this.container.worker.postMessage({fileChunkList:[1]})
    // console.log(this.container, "mmmmm");
  },
  data() {
    return {
      container: {
        file: null,
        worker: null
      },
      hashPercentage: 0,
      data: [],
      requestList: [],
      fakeUploadPercentage: 0 //假进度条，当点击恢复时，由于重新创建了 xhr 导致切片进度清零，总进度条就会倒退
    };
  },
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0;
      const loaded = this.data
        .map(item => item.chunk.size * item.percentage)
        .reduce((acc, cur) => acc + cur, 0);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    }
  },
  watch: {
    uploadPercentage(oldVal, newVal) {
      if (oldVal > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = oldVal;
      } else {
        this.fakeUploadPercentage = newVal;
      }
    }
  },
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    request({
      url,
      method = "post",
      data,
      headers = {},
      onProgress = e => e,
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          if (requestList) {
            const xhrIndex = requestList.findIndex(item => item === xhr);
            requestList.splice(xhrIndex, 1);
          }
        };
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
        requestList ? requestList.push(xhr) : null;
      });
    },
    //生成文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) });
        cur += size;
      }
      return fileChunkList;
    },
    //并发上传切片
    async uploadChunks(uploadedList) {
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash)) //过滤掉已经上传过的文件切片
        .map(({ chunk, hash, fileHash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.hash);
          return { formData, index };
        })
        .map(async ({ formData, index }) => {
          return this.request({
            url: "http://localhost:3110/test/upload",
            data: formData,
            onProgress: this.createProgressHandle(this.data[index]),
            requestList: this.requestList
          });
        });
      await Promise.all(requestList);
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 合并切片
      if (uploadedList.length + requestList.length === this.data.length) {
        await this.mergeRequest();
      }
    },
    //合并请求
    async mergeRequest() {
      await this.request({
        url: "http://localhost:3110/test/merge",
        // header: {
        //   "Content-Type": "application/json"
        // },
        data: JSON.stringify({
          fileHash: this.container.hash,
          filename: this.container.file.name,
          size: SIZE
        })
      });
    },
    //生成文件hash（web-worker）
    calculateHash(fileChunkList) {
      return new Promise((resolve, reject) => {
        this.container.worker = new Hash();
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data;
          this.hashPercentage = ~~percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    //验证是否需要上传，可能之前已经上传了，那就秒传
    async verifyUpload(filename, fileHash) {
      const { data } = await this.request({
        url: "http://localhost:3110/test/verify",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        data: JSON.stringify({
          filename,
          fileHash
        })
      });
      console.log(data, "ddddd");
      return JSON.parse(data);
    },
    // 上传处理
    async handleUpload() {
      if (!this.container.file) return; //没有选择上传文件
      const fileChunkList = this.createFileChunk(this.container.file); //生成文件切片
      this.container.hash = await this.calculateHash(fileChunkList); //生成文件hash
      const { shouldUpload, uploadedList } = await this.verifyUpload(
        //验证是否上需要上传
        this.container.file.name,
        this.container.hash
      );
      if (!shouldUpload) {
        this.$message.success("秒传：上传成功");
        return;
      }
      this.data = fileChunkList.map(({ file }, index) => {
        return {
          fileHash: this.container.hash,
          chunk: file,
          hash: this.container.hash + "_" + index,
          index,
          percentage: uploadedList.includes(this.container.hash + "_" + index)
            ? 100
            : 0
        };
      });
      await this.uploadChunks(uploadedList);
    },
    handlePause() {
      this.requestList.forEach(xhr => xhr.abort());
      this.requestList = [];
    },
    async handleResume() {
      const { uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      console.log(uploadedList, "这是已经上传的");
      await this.uploadChunks(uploadedList);
    },
    createProgressHandle(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
      };
    }
  }
};
</script>

<style scoped lang="scss">
.upload-com {
  .table {
    width: 100%;
    margin-top: 0.1rem;
    border-collapse: collapse;
    border: 1px solid rgba(182, 173, 173, 0.897);
    tr {
      th {
        padding: 5px 0;
      }
      .hash {
        width: 40%;
      }
      .size {
        width: 10%;
      }
      .progress {
        width: 50%;
      }
      td {
        padding: 5px 0;
        text-align: center;
      }
    }
  }
}
</style>