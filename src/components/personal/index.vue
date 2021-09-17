<template>
  <div class="per">
    <div class="head">
      <a class="avater" @click="changeAvater" title="更换头像">
        <img class="img" :src="avater_path" alt />
        <input type="file" ref="changeAvater" hidden="hidden" @change="showNewAvater" />
      </a>
      <p class="nick-name">
        <el-input v-model="info.username" v-if="isModifing&&info.root !== 'admin'"></el-input>
        <span v-if="!isModifing || info.root == 'admin'">{{info.username}}</span>
      </p>
    </div>
    <div class="saved" @click="subToServer" v-if="showSaveBtn">保存</div>
    <div class="cancel" @click="cancelHandle" v-if="showCancelBtn">取消</div>
    <table class="user-info">
      <tbody>
        <tr>
          <td>
            <span class="td-key">真实姓名</span>：
            <span class="td-val" v-if="!isModifing">{{info.real_name}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.real_name" @blur="validateRealName"></el-input>
              <span class="tips" v-if="realNameTips">{{realNameTips}}</span>
            </span>
          </td>
          <td>
            <span class="td-key">性别</span>：
            <span class="td-val" v-if="!isModifing">{{info.sex}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <!-- <el-input v-model="info.sex"></el-input> -->
              <el-radio v-model="info.sex" label="男">男</el-radio>
              <el-radio v-model="info.sex" label="女">女</el-radio>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="td-key">身高(cm)</span>：
            <span class="td-val" v-if="!isModifing">{{info.height}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.height"></el-input>
            </span>
          </td>
          <td>
            <span class="td-key">体重(kg)</span>：
            <span class="td-val" v-if="!isModifing">{{info.weight}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.weight"></el-input>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="td-key">生日</span>：
            <span class="td-val" v-if="!isModifing">{{info.birthday}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input type="date" v-model="info.birthday"></el-input>
            </span>
          </td>
          <td>
            <span class="td-key">星座</span>：
            <span class="td-val" v-if="!isModifing">{{info.constellation}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <!-- <el-input v-model="info.constellation"></el-input> -->
              <el-select v-model="info.constellation" placeholder="请选择">
                <el-option
                  v-for="item in constellation"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="td-key">邮箱地址</span>：
            <span class="td-val" v-if="!isModifing">{{info.e_mail}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.e_mail" @blur="validateEmail"></el-input>
              <span class="tips" v-if="emailTips">{{emailTips}}</span>
            </span>
          </td>
          <td>
            <span class="td-key">电话号码</span>：
            <span class="td-val" v-if="!isModifing">{{info.tel}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.tel" @blur="validateTel"></el-input>
              <span class="tips" v-if="telTips">{{telTips}}</span>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="td-key">QQ</span>:
            <span class="td-val" v-if="!isModifing">{{info.qq}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.qq"></el-input>
            </span>
          </td>
          <td>
            <span class="td-key">微信</span>：
            <span class="td-val" v-if="!isModifing">{{info.wx}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.wx"></el-input>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="td-key">学院</span>：
            <span class="td-val" v-if="!isModifing">{{info.depart}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.depart"></el-input>
            </span>
          </td>
          <td>
            <span class="td-key">专业班级</span>：
            <span class="td-val" v-if="!isModifing">{{className}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <!-- <el-input v-model="info.class"></el-input> -->
              <el-select v-model="info.classID" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.className"
                  :value="item.classID"
                ></el-option>
              </el-select>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="td-key">个人爱好</span>：
            <span class="td-val" v-if="!isModifing">{{info.hobby}}</span>
            <span class="td-val modify-input" v-if="isModifing">
              <el-input v-model="info.hobby"></el-input>
            </span>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <el-button class="modify" type="success" @click="saveInfo" v-if="isModifing">保存</el-button>
    <el-button class="modify" type="primary" @click="modifyUserInfo" v-if="!isModifing">修改资料</el-button>
    <el-button
      class="modify"
      type="success"
      @click="submiteModify"
      v-if="neededSubmit && !isModifing"
    >提交修改</el-button>
  </div>
</template>

<script>
export default {
  created() {
    const userInfo = this.$store.state.userInfo;
    this.info = Object.assign({}, userInfo);
  },
  mounted() {
    this.setAvaterPath();
    this.changeOriginAvater();
    this.getClassList();
  },
  computed: {
    className() {
      const id = this.info.classID;
      const c = this.options.find(item => item.classID === id);
      return c ? c.className : "";
    }
  },
  data() {
    return {
      name: "",
      info: {},
      avater_path: "",
      avater_path_copy: "",
      formData: {},
      isModifing: false,
      neededSubmit: false,
      showSaveBtn: false,
      showCancelBtn: false,
      options: [],
      constellation: [
        { value: "白羊座", label: "白羊座" },
        { value: "金牛座", label: "金牛座" },
        { value: "双子座", label: "双子座" },
        { value: "巨蟹座", label: "巨蟹座" },
        { value: "狮子座", label: "狮子座" },
        { value: "处女座", label: "处女座" },
        { value: "天枰座", label: "天枰座" },
        { value: "天蝎座", label: "天蝎座" },
        { value: "射手座", label: "射手座" },
        { value: "摩羯座", label: "摩羯座" },
        { value: "水瓶座", label: "水瓶座" },
        { value: "双鱼座", label: "双鱼座" }
      ],
      realNameTips: "",
      emailTips: "",
      telTips: ""
    };
  },
  methods: {
    validateRealName() {
      const reg = /^([a-zA-Z\u4e00-\u9fa5\·]{2,6})$/;
      const flag = reg.test(this.info.real_name);
      if (flag) {
        this.realNameTips = "";
      } else {
        this.realNameTips = "请输入正确的姓名！";
      }
    },
    validateEmail() {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      const flag = reg.test(this.info.e_mail);
      if (flag) {
        this.emailTips = "";
      } else {
        this.emailTips = "请输入正确的邮箱！";
      }
    },
    validateTel() {
      const reg = /^[1]([3-9])[0-9]{9}$/;
      const flag = reg.test(this.info.tel);
      if (flag) {
        this.telTips = "";
      } else {
        this.telTips = "请输入正确的电话号码！";
      }
    },
    //获取班级列表
    getClassList() {
      this.$api.getClassList().then(res => {
        this.options = res.data.data;
      });
    },
    //显示头像
    setAvaterPath() {
      let path = this.info.avater_path;
      path = path.split(/\\|\//);
      this.avater_path = this.$url + "/" + path.join("/");
    },
    modifyUserInfo() {
      this.isModifing = !this.isModifing;
    },
    // 保存修改
    saveInfo() {
      if (this.validateAll()) {
        this.$message({
          message: "请检查是否有错误格式或者漏填项！",
          type:'warning',
          duration: 3000
        });
      } else {
        this.isModifing = !this.isModifing;
        this.neededSubmit = true;
      }
    },
    // 验证全部信息
    validateAll() {
      const userInfo = this.info;
      const keys = Object.keys(userInfo);
      const Uncomplete = keys.some(item => !userInfo[item]);
      const hasErrTips =
        this.realNameTips !== "" ||
        this.emailTips !== "" ||
        this.telTips !== "";
      return Uncomplete || hasErrTips;
    },
    // 提交修改信息
    submiteModify() {
      this.neededSubmit = false;
      this.$api.modifyUserInfo("/modify", this.info).then(res => {
        this.modifySuccess(res);
      });
    },
    modifySuccess(res) {
      const newInfo = JSON.parse(res.config.data);
      this.$store.commit('set_user_info',newInfo)
    },
    changeAvater() {
      this.$refs.changeAvater.click();
    },
    // 将选择的图片展示在本地
    showNewAvater(e) {
      console.log(e);
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = e => (this.avater_path = e.target.result);
      this.addToFormData(file);
      this.shwoBtn();
    },
    // 将选择的图片暂时保存
    addToFormData(file) {
      const former = new FormData();
      former.append("avater", file);
      this.formData = former;
    },
    // 更改的图片上传到服务器
    subToServer() {
      this.$api
        .replaceAvater(`/changeAvater?id=${this.info.id}`, this.formData)
        .then(res => {
          console.log(res);
          this.changeOriginAvater();
          this.updateStore();
          this.hidenBtn();
        });
    },
    // 取消修改
    cancelHandle() {
      this.hidenBtn();
      this.returnOriginAvater();
    },
    changeOriginAvater() {
      this.avater_path_copy = this.avater_path;
    },
    returnOriginAvater() {
      this.avater_path = this.avater_path_copy;
    },
    //按钮显示
    shwoBtn() {
      this.showSaveBtn = true;
      this.showCancelBtn = true;
    },
    //按钮隐藏
    hidenBtn() {
      this.showSaveBtn = false;
      this.showCancelBtn = false;
    },
    //更新vuex
    updateStore() {
      let newInfo = Object.assign({}, this.info);
      this.$api
        .getAvaterPath("/getAvaterPath", {
          id: this.info.id
        })
        .then(res => {
          newInfo.avater_path = res.data.data[0].avater_path;
          console.log(newInfo,'这是新的用户信息！！！')
          this.$store.commit('set_user_info',newInfo)
        });
    }
  }
};
</script>

<style scoped lang="scss">
.per {
  .head {
    display: flex;
    align-items: center;
    margin-bottom: 0.1rem;
    .avater {
      display: block;
      width: 1.28rem;
      height: 1.28rem;
      border-radius: 0.05rem;
      cursor: pointer;
      overflow: hidden;
      .img {
        width: 1.28rem;
        height: 1.28rem;
      }
    }
    .nick-name {
      font-weight: 700;
      font-size: 0.2rem;
      color: #333;
      position: relative;
      bottom: -0.3rem;
      margin-left: 0.2rem;
      .el-icon-edit {
        cursor: pointer;
      }
    }
  }
  .saved,
  .cancel {
    display: inline-block;
    width: 0.5rem;
    height: 0.25rem;
    line-height: 0.25rem;
    font-size: 0.12rem;
    text-align: center;
    background: #333;
    color: #fff;
    cursor: pointer;
    margin-bottom: 0.2rem;
  }
  .saved {
  }
  .cancel {
  }
  .user-info {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid $border-color;
    tbody {
      tr {
        border-bottom: 1px solid $border-color;
        td {
          width: 50%;
          height: 0.6rem;
          padding: 0.1rem;
          .td-key {
            font-weight: 600;
            color: #333;
          }
          .td-val {
            color: $text;
            position: relative;
            .tips {
              font-size: 0.12rem;
              color: red;
              width: 80%;
              position: absolute;
              left: 0;
              bottom: 0;
              padding-left: 0.1rem;
              transform: translateY(100%);
              // border: 1px solid black;
            }
            &.modify-input {
              display: inline-block;
              width: 60%;
            }
          }
        }
      }
    }
  }
  .el-button {
    display: block;
    margin: 0.15rem auto;
  }
}
</style>