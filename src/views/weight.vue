<template>
  <div id="weight" class="login-container">
    <!-- 登入頁 -->
    <div v-if="loginPage">
      <h1
        style="
          position: absolute;
          color: #fff;
          left: 50%;
          transform: translateX(-50%);
          top: -110px;
        "
      >
        秤重
      </h1>
      <el-form
        :model="userLoginForm"
        status-icon
        ref="userLoginFormRef"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h3 class="title">刷卡登入</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            @keyup.enter.native="handleSubmit"
            v-model="userLoginForm.cardId"
            auto-complete="off"
            placeholder="刷卡"
            prefix-icon="iconfont el-icon-user"
          ></el-input>
        </el-form-item>
        <div></div>
        <el-form-item style="width: 100%">
          <div style="float: right">
            <el-button
              type="primary"
              class="el-icon-mobile-phone"
              @click="handleSubmit"
              :loading="loading"
              >登入
            </el-button>
            <el-button class="el-icon-refresh" @click="resetForm"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 公司資料確認頁 -->
    <div class="login-container" v-if="deptInfoPage">
      <el-container style="height: 100%">
        <el-header style="height: 20%"></el-header>
        <el-main style="height: 50%">
          <div
            style="
              height: 100%;
              width: 70%;
              margin-left: 15%;
              display: flex;
              align-items: center;
              background-color: white;
            "
          >
            <div style="width: 100%; font-size: 60px">
              <div style="width: 30%; display: inline-block">登錄單位:</div>
              <div
                style="width: 70%; display: inline-block; text-align: center"
                v-text="deptName"
              ></div>
            </div>
          </div>
        </el-main>
        <el-footer style="height: 30%">
          <el-button
            style="
              width: 300px;
              height: 80px;
              position: absolute;
              right: 100px;
              font-size: 50px;
            "
            @click="
              deptInfoPage = false;
              productPage = true;
            "
            >確認</el-button
          >
          <br />
          <br />
          <br />
          <br />
          <br />
          <el-button
            style="
              width: 300px;
              height: 80px;
              position: absolute;
              right: 100px;
              font-size: 50px;
            "
            @click="
              deptInfoPage = false;
              loginPage = true;
              userLoginForm = {};
            "
            >取消</el-button
          ></el-footer
        >
      </el-container>
    </div>
    <!-- 選擇品項 -->
    <div class="login-container" v-if="productPage">
      <el-container style="height: 100%">
        <el-header style="height: 20%"
          ><div
            style="
              height: 60%;
              width: 30%;
              margin-left: 50px;
              margin-top: 50px;
              display: flex;
              align-items: center;
              background-color: white;
              text-align: center;
            "
          >
            <span style="text-align: center; width: 100%; font-size: 60px"
              >請選擇品項</span
            >
          </div></el-header
        >
        <el-main style="height: 50%; width:80%">
          <div style="width: 20%; display:inline-block" v-for="product in products" :key="product.id">
              <el-button
                style="width: 230px; height: 80px; font-size: 40px; margin-bottom:10px"
                @click="deptInfoPage = false"
                >{{ product.name }}</el-button
              >
          </div>
        </el-main>
        <el-footer style="height: 30%">
          <el-button
            style="
              width: 300px;
              height: 80px;
              position: absolute;
              right: 100px;
              font-size: 50px;
            "
            @click="deptInfoPage = false"
            >確認</el-button
          >
          <br />
          <br />
          <br />
          <br />
          <br />
          <el-button
            style="
              width: 300px;
              height: 80px;
              position: absolute;
              right: 100px;
              font-size: 50px;
            "
            @click="
              deptInfoPage = false;
              loginPage = true;
              userLoginForm = {};
            "
            >取消</el-button
          ></el-footer
        >
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表單用戶登入數據
      loading: false,
      userLoginForm: { cardId: "" },
      deptName: "",
      products: [],
      loginPage: true,
      deptInfoPage: false,
      productPage: false,
      items: [],
    };
  },

  methods: {
    //登入提交
    async handleSubmit() {
      this.loading = true;
      //發起登入請求
      const { data: res } = await this.$http.post(
        "business/weight/login",
        this.userLoginForm
      );
      if (res.success) {
        this.$message({
          title: "登入成功",
          message: "歡迎你進入系統",
          type: "success",
        });
        console.log(res.data);
        this.deptName = res.data.deptName;
        this.products = res.data.products;
        this.loginPage = false;
        this.deptInfoPage = true;
      } else {
        this.$message.error({
          title: "登入失敗",
          message: res.data,
          type: "error",
        });
      }
      this.loading = false;
    },
    //重置表單
    resetForm: function () {
      this.userLoginForm = {};
    },
  },
  created() {},
};
</script>

<style scoped>
.none {
  display: none;
}

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


