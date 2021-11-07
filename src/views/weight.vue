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
            v-model="userLoginForm.cardName"
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
        <el-main style="height: 65%">
          <div
            style="
              height: 80%;
              width: 60%;
              margin-left: 20%;
              display: flex;
              align-items: center;
              background-color: white;
            "
          >
            <div style="width: 100%; font-size: 60px">
              <div style="width: 30%; display: inline-block">登錄單位:</div>
              <div
                style="width: 70%; display: inline-block; text-align: center"
                v-text="dept.name"
              ></div>
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 350px;
              font-size: 40px;
            "
            @click="
              deptInfoPage = false;
              productPage = true;
            "
            >確認</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 100px;
              font-size: 40px;
            "
            @click="cancel"
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
              height: 50%;
              width: 20%;
              margin-left: 100px;
              margin-top: 50px;
              display: flex;
              align-items: center;
              background-color: white;
              text-align: center;
            "
          >
            <span style="text-align: center; width: 100%; font-size: 50px"
              >請選擇品項</span
            >
          </div></el-header
        >
        <el-main style="height: 65%; width: 100%">
          <div style="width: 100%; display: inline-block">
            <div
              style="width: 14%; display: inline-block"
              v-for="product in products"
              :key="product.id"
            >
              <el-button
                style="
                  width: 200px;
                  height: 80px;
                  font-size: 30px;
                  margin-bottom: 10px;
                "
                @click="chooseProduct(product.id, product.name)"
                >{{ product.name }}</el-button
              >
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 350px;
              font-size: 40px;
            "
            @click="
              deptInfoPage = true;
              productPage = false;
            "
            >上一步</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 100px;
              font-size: 40px;
            "
            @click="cancel"
            >取消</el-button
          ></el-footer
        >
      </el-container>
    </div>
    <!-- 選擇器具 -->
    <div class="login-container" v-if="toolPage">
      <el-container style="height: 100%">
        <el-header style="height: 20%"
          ><div
            style="
              height: 60%;
              width: 30%;
              margin-left: 465px;
              margin-top: 50px;
              display: flex;
              align-items: center;
              background-color: white;
              text-align: center;
            "
          >
            <span style="text-align: center; width: 100%; font-size: 60px"
              >請選擇器具</span
            >
          </div></el-header
        >
        <el-main style="height: 65%; width: 100%">
          <div style="width: 100%; height: 100%; display: inline-block">
            <div
              style="
                display: flex;
                align-items: center;
                height: 100%;
                margin-left: 250px;
              "
            >
              <el-button
                style="
                  width: 400px;
                  height: 150px;
                  font-size: 60px;
                  margin-bottom: 10px;
                  display: inline-block;
                "
                @click="getWeight()"
                >地磅</el-button
              >
              <el-button
                style="
                  width: 400px;
                  height: 150px;
                  font-size: 60px;
                  margin-bottom: 10px;
                  margin-left: 100px;
                  display: inline-block;
                "
                @click="inputTotalWeight()"
                >秤重油壓車</el-button
              >
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 350px;
              font-size: 40px;
            "
            @click="
              toolPage = false;
              productPage = true;
            "
            >上一步</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 100px;
              font-size: 40px;
            "
            @click="cancel"
            >取消</el-button
          ></el-footer
        >
      </el-container>
    </div>
    <!-- 讀取重量頁 -->
    <div class="login-container" v-if="waitingPage">
      <el-container style="height: 100%">
        <el-header style="height: 20%"></el-header>
        <el-main style="height: 65%">
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
          >
            <div style="width: 100%; font-size: 60px" @click="recieveWeight">
              <div style="width: 100%; text-align: center">讀取重量</div>
              <div style="width: 100%; text-align: center">請稍後</div>
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%"></el-footer>
      </el-container>
    </div>
    <!-- 手動輸入總重 -->
    <div class="login-container" v-if="totalPage">
      <el-container style="height: 100%">
        <el-header style="height: 15%"></el-header>
        <el-main style="height: 70%; width: 100%">
          <div style="width: 50%; text-align: center; display: inline-block">
            <div
              style="
                height: 80px;
                width: 40%;
                margin-left: 30%;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                font-size: 40px;
                background-color: white;
              "
            >
              <div style="width: 100%">輸入總重</div>
            </div>
            <div
              style="
                height: 250px;
                width: 50%;
                margin-left: 25%;
                display: flex;
                align-items: center;
                font-size: 40px;
                background-color: white;
              "
            >
              <input
                v-model="totalWeight"
                type="text"
                style="
                  width: 100%;
                  font-size: 50px;
                  text-align: center;
                  border: 0;
                "
              />
              <div style="float; right: 0px">KG</div>
            </div>
          </div>
          <div style="width: 50%; display: inline-block; float; right: 0px">
            <div
              style="
                height: 410px;
                width: 470px;
                background-color: gray;
                position: absolute;
                top: 150px;
              "
            >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(1)"
                >1</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(2)"
                >2</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(3)"
                >3</el-button
              >
              <el-button
                style="
                  width: 130px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 30px;
                  display: inline-block;
                "
                @click="deleteTotalNumber()"
                >&larr;</el-button
              >
              <br />
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(4)"
                >4</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(5)"
                >5</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(6)"
                >6</el-button
              >
              <el-button
                style="
                  width: 130px;
                  height: 90px;
                  font-size: 50px;
                  margin-top: 10px;
                  margin-left: 30px;
                  display: inline-block;
                "
                @click="clearTotalNumber()"
                >清除</el-button
              >
              <br />
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(7)"
                >7</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(8)"
                >8</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(9)"
                >9</el-button
              >
              <el-button
                style="
                  width: 130px;
                  height: 190px;
                  font-size: 50px;
                  margin-top: 10px;
                  margin-left: 30px;
                  position: absolute;
                  display: inline-block;
                "
                @click="confirmTotalNumber()"
                >確認</el-button
              >
              <br />
              <el-button
                style="
                  width: 190px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber(0)"
                >0</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addTotalNumber('.')"
                >.</el-button
              >
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 350px;
              font-size: 40px;
            "
            @click="
              totalPage = false;
              toolPage = true;
            "
            >上一步</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 100px;
              font-size: 40px;
            "
            @click="cancel"
            >取消</el-button
          ></el-footer
        >
      </el-container>
    </div>
    <!-- 輸入扣重 -->
    <div class="login-container" v-if="deductPage">
      <el-container style="height: 100%">
        <el-header style="height: 15%"></el-header>
        <el-main style="height: 70%; width: 100%">
          <div style="width: 50%; text-align: center; display: inline-block">
            <div
              style="
                height: 80px;
                width: 40%;
                margin-left: 30%;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                font-size: 40px;
                background-color: white;
              "
            >
              <div style="width: 100%">
                總重：<span v-text="totalWeight"></span> KG
              </div>
            </div>
            <div
              style="
                height: 80px;
                width: 40%;
                margin-left: 30%;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                font-size: 40px;
                background-color: white;
              "
            >
              <div style="width: 100%">輸入扣重</div>
            </div>
            <div
              style="
                height: 250px;
                width: 50%;
                margin-left: 25%;
                display: flex;
                align-items: center;
                font-size: 40px;
                background-color: white;
              "
            >
              <input
                v-model="deductWeight"
                type="text"
                style="
                  width: 100%;
                  font-size: 50px;
                  text-align: center;
                  border: 0;
                "
              />
              <div style="float; right: 0px">KG</div>
            </div>
          </div>
          <div style="width: 50%; display: inline-block; float; right: 0px">
            <div
              style="
                height: 410px;
                width: 470px;
                background-color: gray;
                position: absolute;
                top: 150px;
              "
            >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(1)"
                >1</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(2)"
                >2</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(3)"
                >3</el-button
              >
              <el-button
                style="
                  width: 130px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 30px;
                  display: inline-block;
                "
                @click="deleteDeductNumber()"
                >&larr;</el-button
              >
              <br />
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(4)"
                >4</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(5)"
                >5</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(6)"
                >6</el-button
              >
              <el-button
                style="
                  width: 130px;
                  height: 90px;
                  font-size: 50px;
                  margin-top: 10px;
                  margin-left: 30px;
                  display: inline-block;
                "
                @click="clearDeductNumber()"
                >清除</el-button
              >
              <br />
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(7)"
                >7</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(8)"
                >8</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(9)"
                >9</el-button
              >
              <el-button
                style="
                  width: 130px;
                  height: 190px;
                  font-size: 50px;
                  margin-top: 10px;
                  margin-left: 30px;
                  position: absolute;
                  display: inline-block;
                "
                @click="confirmDeductNumber()"
                >確認</el-button
              >
              <br />
              <el-button
                style="
                  width: 190px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber(0)"
                >0</el-button
              >
              <el-button
                style="
                  width: 90px;
                  height: 90px;
                  font-size: 60px;
                  margin-top: 10px;
                  margin-left: 10px;
                  display: inline-block;
                "
                @click="addDeductNumber('.')"
                >.</el-button
              >
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 350px;
              font-size: 40px;
            "
            @click="deductPageLastStep"
            >上一步</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 100px;
              font-size: 40px;
            "
            @click="cancel"
            >取消</el-button
          ></el-footer
        >
      </el-container>
    </div>
    <!-- 最後確認頁 -->
    <div class="login-container" v-if="finalPage">
      <el-container style="height: 100%">
        <el-header style="height: 10%"></el-header>
        <el-main style="height: 70%">
          <div
            style="
              height: 70%;
              width: 40%;
              margin-left: 30%;
              margin-top: 5%;
              display: flex;
              align-items: center;
              background-color: white;
            "
          >
            <div style="width: 100%; font-size: 45px">
              <div style="width: 100%;">操作人：<span v-text="dept.name"></span></div>
              <div style="width: 100%;">過磅物：<span v-text="productName"></span></div>
              <div style="width: 100%;">總重：<span v-text="totalWeight"></span> KG</div>
              <div style="width: 100%;">扣重：<span v-text="deductWeight"></span> KG</div>
              <div style="width: 100%;">淨重：<span v-text="netWeight"></span> KG</div>
            </div>
          </div>
        </el-main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 600px;
              font-size: 40px;
            "
            @click="finalPage = false; deductPage = true;"
            >上一步</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 350px;
              font-size: 40px;
            "
            @click="printWeight"
            >確認列印</el-button
          >
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 100px;
              font-size: 40px;
            "
            @click="cancel"
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
      userLoginForm: { cardName: "" },
      dept: {},
      user: {},
      cardId: "",
      productId: "",
      productName: "",
      products: [],
      loginPage: true,
      deptInfoPage: false,
      productPage: false,
      toolPage: false,
      waitingPage: false,
      totalPage: false,
      deductPage: false,
      finalPage: false,
      items: [],
      tool: "",
      totalWeight: "",
      deductWeight: "",
      netWeight: "",
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
        this.dept = res.data.dept;
        this.user = res.data.user;
        this.cardId = res.data.cardId;
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
    //取消
    cancel: function () {
      this.deptInfoPage = false;
      this.productPage = false;
      this.toolPage = false;
      this.waitingPage = false;
      this.totalPage = false;
      this.deductPage = false;
      this.finalPage = false;
      this.loginPage = true;
      this.userLoginForm = {};
    },
    //選擇廢棄物
    chooseProduct: function (id, name) {
      this.productPage = false;
      this.toolPage = true;
      this.productId = id;
      this.productName = name;
    },
    //讀取重量
    getWeight: function () {
      this.tool = 1;
      this.toolPage = false;
      this.waitingPage = true;
    },
    //收到重量
    recieveWeight: function () {
      this.totalWeight = 100;
      this.deductWeight = "";
      this.waitingPage = false;
      this.deductPage = true;
    },
    //手輸總重
    inputTotalWeight: function () {
      this.tool = 2;
      this.totalWeight = "";
      this.toolPage = false;
      this.totalPage = true;
    },
    //手輸總重計算
    addTotalNumber: function (number) {
      var str = this.totalWeight;
      if (str == "0" && number != ".") {
        return;
      }
      if (number == ".") {
        if (str.length == 0 || str.includes(".")) {
          return;
        }
      }
      this.totalWeight = this.totalWeight + number;
    },
    deleteTotalNumber: function (number) {
      var str = this.totalWeight;
      this.totalWeight = str.substr(0, str.length - 1);
    },
    clearTotalNumber: function (number) {
      this.totalWeight = "";
    },
    confirmTotalNumber: function () {
      var reg = /^(0|[1-9][0-9]*)+(.[0-9]{1,6})?$/;
      if (reg.test(this.totalWeight)) {
        this.deductWeight = "";
        this.totalPage = false;
        this.deductPage = true;
      } else {
        this.$message.error({
          title: "總重數字異常",
          message: "總重數字異常",
          type: "error",
        });
      }
    },
    //扣重計算
    addDeductNumber: function (number) {
      var str = this.deductWeight;
      if (str == "0" && number != ".") {
        return;
      }
      if (number == ".") {
        if (str.length == 0 || str.includes(".")) {
          return;
        }
      }
      this.deductWeight = this.deductWeight + number;
    },
    deleteDeductNumber: function (number) {
      var str = this.deductWeight;
      this.deductWeight = str.substr(0, str.length - 1);
    },
    clearDeductNumber: function (number) {
      this.deductWeight = "";
    },
    confirmDeductNumber: function () {
      var reg = /^(0|[1-9][0-9]*)+(.[0-9]{1,6})?$/;
      if (reg.test(this.deductWeight)) {
        this.totalWeight = Number(this.totalWeight);
        this.deductWeight = Number(this.deductWeight);
        this.netWeight = this.count(this.totalWeight, this.deductWeight);
        this.deductPage = false;
        this.finalPage = true;
      } else {
        this.$message.error({
          title: "扣重數字異常",
          message: "扣重數字異常",
          type: "error",
        });
      }
    },
    deductPageLastStep: function () {
      this.deductPage = false;
      if (this.tool == 1) {
        this.toolPage = true;
      } else {
        this.totalPage = true;
      }
    },
    count: function(num1, num2) {
      var r1,r2,m,n;
        try{
            r1 = num1.toString().split('.')[1].length;
        }catch(e){
            r1 = 0;
        }
        try{
            r2=num2.toString().split('.')[1].length;
        }catch(e){
            r2=0;
        }
        m=Math.pow(10,Math.max(r1,r2));
        n=(r1>=r2)?r1:r2;
        return (Math.round(num1*m-num2*m)/m).toFixed(n);
    },
    async printWeight() {
      this.loading = true;
      var param = {
        departmentId: this.dept.id,
        userId: this.user.id,
        cardId: this.cardId,
        productId: this.productId,
        totalWeight: this.totalWeight,
        deductWeight: this.deductWeight,
        netWeight: this.netWeight
      }
      //發起登入請求
      const { data: res } = await this.$http.post(
        "business/weight/add",
        param
      );
      if (res.success) {
        this.$message({
          title: "秤重完成",
          message: "秤重完成，列印磅單",
          type: "success",
        });
      } else {
        this.$message.error({
          title: "秤重作業上傳失敗",
          message: res.data,
          type: "error",
        });
      }
      this.loading = false;
      this.cancel();
    }
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


