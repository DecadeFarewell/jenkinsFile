<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" @input="input"></el-input>
        <div class="pw-strength" v-if="this.ruleForm.pass">
          <div :class="['bar', strengthClass]"></div>
          <div class="strength">
            <span>弱</span>
            <span>中</span>
            <span>强</span>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button type="info" class="reset" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <p class="to_login">
        <span>已有帐号</span>
        <router-link class="link" :to="{path:'/login'}">去登陆</router-link>
      </p>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    let checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length > 8) {
          callback(new Error("用户名不能超过8个字符"));
        } else {
          callback();
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        userName: ""
      },
      rules: {
        userName: [{ validator: checkUserName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      strengthClass: ""
    };
  },
  methods: {
    //提交注册请求
    submit_register() {
      return this.$api.register("/register", {
        userName: this.ruleForm.userName,
        password: this.ruleForm.pass
      });
    },
    // 验证返回结果
    check_response(res) {
      return res.data.status === "ok" ? true : false;
    },
    // 验证成功，跳转至登录页面
    navto_login_page(res) {
      // 弹窗
      this.$message({
        message: "注册成功，3s后跳转至登录页面！",
        type: "success",
        duration: 3000
      });
      let timer = setTimeout(() => {
        this.$router.push({ path: "/login" });
        timer = null;
      }, 3500);
    },
    // 验证失败，do sth
    register_err(res) {
      this.$message({
        showClose: true,
        message: res.data.msg,
        type: "error"
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit_register()
            .then(res => {
              console.log(res);
              if (this.check_response(res)) {
                this.navto_login_page();
              } else {
                this.register_err(res);
              }
            })
            .catch(err => {
              throw new Error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    input() {
      let regStr = /(\w)+/g;
      let regNum = /(\d)+/g;
      let reg = /_/g;
      let strongth =
        this.ruleForm.pass.match(reg) &&
        this.ruleForm.pass.match(regStr) &&
        this.ruleForm.pass.match(regNum);
      if (
        this.ruleForm.pass.length > 20 ||
        (this.ruleForm.pass.length > 6 && strongth)
      ) {
        this.strengthClass = "strong";
      } else if (this.ruleForm.pass.length < 6) {
        this.strengthClass = "week";
      } else if (!this.ruleForm.pass) {
        this.strengthClass = "";
      } else {
        this.strengthClass = "normal";
      }
      console.log(this.strengthClass);
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  text-align: center;
  width: 450px;
  position: absolute;
  left: 50%;
  top: 120px;
  transform: translate(-50%);
  .reset {
    margin-left: 50px;
    cursor: pointer;
  }
  .to_login {
    width: 550px;
    .link {
      text-decoration: none;
      color: #fe8c00;
    }
  }
  .pw-strength {
    position: relative;
    width: 350px;
    top: 10px;
    left: 0px;
    background: #eee;
    .bar {
      background: #d3ebee;
      height: 20px;
      width: 0;
      overflow: hidden;
      transition: all 0.4s linear;
      &.week {
        width: 117px;
        background: #f76120;
      }
      &.normal {
        width: 230px;
        background: #ff8900;
      }
      &.strong {
        width: 342px;
        background: #5bab3c;
      }
    }
    .strength {
      position: absolute;
      width: 100%;
      height: 20px;
      left: 0;
      top: 0;
      span {
        width: 112px;
        height: 20px;
        float: left;
        border: 2px solid #fff;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>