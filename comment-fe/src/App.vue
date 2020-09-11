<template>
  <router-view />
</template>

<script>
import { getUserInfoService } from "./services/user";

export default {
  methods: {
    async getUserInfo() {
      // 获取用户信息
      try {
        const userInfo = await getUserInfoService();
        // 成功获取用户信息
        window.userInfo = userInfo;
        this.$router.push("/").catch((err) => {
          err;
        });
      } catch (ex) {
        // 获取失败，去登录
        if (location.hash === "#/") {
          this.$router.push("/login").catch((err) => {
            err;
          });
        }
      }
    },
  },
  async created() {
    await this.getUserInfo();
  },
  updated() {
    this.getUserInfo();
  },
};
</script>

<style >
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  background: url("./assets/img/bg1.jpg") no-repeat center;
  background-size:100% 100%;
  overflow:hidden;
}
a{
    text-decoration:none;
}
.wrap {
  position: absolute;
  left: 50%;
  top: 15px;
  transform: translateX(-50%);
  min-width: 600px;
  padding:20px 10px;
  background: #fff;
  border-radius: 10px;
}
.link {
  position: absolute;
  bottom: 0;
  display: inline-block;
  width: 28px;
  height: 14px;
  padding: 12px 20px;
  margin-left:70px;
  font-size:14px;
  color: #fff;
  line-height:14px;
  border: 1px solid #409eff;
  border-radius:4px;
  outline:none;
  background-color: #409eff;
}
</style>