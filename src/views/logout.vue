<template>
  <div class="login-container">
    <el-container style="height: 100%">
      <!-- <el-header style="height: 20%"></el-header> -->
      <header style="height: 20%"></header>
      <main style="height: 65%">
        <div
          style="
            height: 50%;
            width: 40%;
            margin-left: 30%;
            margin-top: 5%;
            display: flex;
            align-items: center;
            background-color: white;
          "
          @click="loginPage"
        >
          <div style="width: 100%; font-size: 70px; font-weight: bold;">
            <div style="width: 100%; text-align: center">您已登出</div>
            <div style="width: 100%; text-align: center">謝謝您的使用！</div>
          </div>
        </div>
      </main>
      <el-footer style="height: 15%"></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    async loginPage() {
      await this.$router.push("/login");
    },
  },
  created() {},
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}

#login {
  position: relative;
}

.login-page {
  position: relative;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 190px auto;
  width: 370px;
  padding: 40px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
}

label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>


