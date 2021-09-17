<template>
  <div class="login">
    <div class="logo">
      <img
        src="https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2323101524,2568980176&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=ae933c8d03b29a973d580a8a74d753fb"
        alt
      />
      <h2>湖南文理学院同学录网站</h2>
    </div>
    <div class="form-wrapper">
      <el-input placeholder="请输入用户名" class="userName" v-model="userName" clearable></el-input>
      <el-input placeholder="请输入密码" class="pwd" v-model="password" show-password></el-input>
      <el-button type="primary" @click.enter="check_form" @keydown.enter="check_form">登录</el-button>
      <p class="to_register">
        <span>还没有账号?</span>
        <router-link class="link" :to="{path:'/register'}">免费注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  created() {
    console.log(this.$route, 11111111);
  },
  methods: {
    // 表单验证
    check_form() {
      if (!this.userName || !this.password) {
        const tips = !this.userName ? "用户名" : "密码";
        this.$message({
          showClose: true,
          message: `请输入${tips}!`,
          type: "error"
        });
      } else {
        this.submit_login();
      }
    },
    //提交登录请求
    submit_login() {
      this.$store
        .dispatch("LoginByUsername", {
          userName: this.userName,
          password: this.password
        })
        .then(() => {
          this.$router.push({ path: "/alumni" });
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  text-align: center;
  .logo{
    // border: 1px solid black;
    text-align: left;
    width: 4rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .form-wrapper {
    width: 4rem;
    margin-top: 0.2rem;
    position: absolute;
    left: 50%;
    top: 1.2rem;
    transform: translate(-50%);
    .pwd {
      margin: 0.4rem 0;
    }
    .to_register {
      .link {
        text-decoration: none;
        color: #fe8c00;
      }
    }
  }
}
</style>