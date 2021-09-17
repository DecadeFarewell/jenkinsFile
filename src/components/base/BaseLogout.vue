<template>
  <div class="logout">
    <el-col :span="12">
      <el-dropdown @command="logoutHandler">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      const { userInfo, roles } = this.$store.state;
      return roles[0] === "admin" ? userInfo.adminName : userInfo.username;
    }
  },
  methods: {
    logoutHandler() {
      this.$store.commit({
        type: "clear_token"
      });
      this.$store.commit({
        type: "clear_user_info"
      });
      this.$store.commit({
        type: "clear_role"
      });
      this.clearAllCookie();
      this.$router.replace({ path: "/login" });
      // setTimeout(() => {
      //   // 退出之后需要刷新，因为如果一次登录两个不同权限的角色会造成权限路由的冲突，需要刷新整个应用
      //   location.reload();
      // }, 0);
    },
    clearAllCookie() {
      const keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie =
            keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); // 清除当前域名下的,例如：m.ratingdog.cn
          document.cookie =
            keys[i] +
            "=0;path=/;domain=" +
            document.domain +
            ";expires=" +
            new Date(0).toUTCString(); // 清除当前域名下的，例如 .m.ratingdog.cn
          document.cookie =
            keys[i] +
            "=0;path=/;domain=ratingdog.cn;expires=" +
            new Date(0).toUTCString(); // 清除一级域名下的或指定的，例如 .ratingdog.cn
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.logout {
  // width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-dropdown-link {
    width: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $active;
    .el-icon-caret-bottom {
      color: $text;
    }
  }
}
</style>