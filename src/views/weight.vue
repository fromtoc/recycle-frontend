<template>
  <div id="weight" class="login-container background">
    <!-- 初始頁面 -->
    <div class="login-container" v-if="startPage">
      <el-container style="height: 100%">
        <header style="height: 20%"></header>
        <main style="height: 65%">
          <a
            href="https://192.168.89.50:8088/hengshi/#/share/app/S83089DCC7EEE6B86DFC62B0DBCC0BB27"
            target="_blank"
          >
            <el-button
              style="
                width: 300px;
                height: 120px;
                position: absolute;
                right: 650px;
                top: 200px;
                font-size: 50px;
              "
              >電子展視屏
            </el-button></a
          >
          <el-button
            style="
              width: 300px;
              height: 120px;
              position: absolute;
              right: 650px;
              top: 400px;
              font-size: 50px;
            "
            @click="start"
            >秤重系統</el-button
          >
          <!-- <div
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
            <div style="width: 100%; font-size: 60px">
              <div @click="start" style="width: 100%; text-align: center">
                首頁
              </div>
            </div>
          </div> -->
        </main>
        <el-footer style="height: 15%"></el-footer>
      </el-container>
    </div>
    <!-- 登入頁 -->
    <div class="login-container" v-if="loginPage">
      <el-container style="height: 100%">
        <header style="height: 20%"></header>
        <main style="height: 65%">
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
                ref="loginButton"
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
        </main>
        <el-footer style="height: 15%"></el-footer>
      </el-container>
    </div>

    <!-- <div v-if="loginPage">
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
    </div> -->
    <!-- 公司資料確認頁 -->
    <div class="login-container" v-if="deptInfoPage">
      <el-container style="height: 100%">
        <header style="height: 20%"></header>
        <main style="height: 65%">
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
        </main>
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
        <header style="height: 20%">
          <div
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
          </div>
        </header>
        <main style="height: 65%; width: 100%">
          <div style="width: 100%; display: inline-block; margin-left: 20px">
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
        </main>
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
        <header style="height: 20%">
          <div
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
          </div>
        </header>
        <main style="height: 65%; width: 100%">
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
        </main>
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
    <div class="login-container" v-if="retryPage">
      <el-container style="height: 100%">
        <header style="height: 20%"></header>
        <main style="height: 65%">
          <div
            style="
              height: 60%;
              width: 40%;
              margin-left: 30%;
              margin-top: 5%;
              display: flex;
              align-items: center;
              background-color: white;
            "
          >
            <div style="width: 100%; font-size: 60px">
              <div style="width: 100%; text-align: center">重量讀取失敗</div>
              <div style="width: 100%; text-align: center">
                請將秤重物移開後
              </div>
              <div style="width: 100%; text-align: center">重新置放</div>
            </div>
          </div>
        </main>
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
              retryPage = false;
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
    <!-- 讀取重量頁 -->
    <div class="login-container" v-if="waitingPage">
      <el-container style="height: 100%">
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
          >
            <div style="width: 100%; font-size: 60px">
              <div style="width: 100%; text-align: center">讀取重量</div>
              <div style="width: 100%; text-align: center">請稍後</div>
            </div>
          </div>
        </main>
        <el-footer style="height: 15%"></el-footer>
      </el-container>
    </div>
    <!-- 手動輸入總重 -->
    <div class="login-container" v-if="totalPage">
      <el-container style="height: 100%">
        <header style="height: 15%"></header>
        <main style="height: 70%; width: 100%">
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
        </main>
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
        <header style="height: 15%"></header>
        <main style="height: 70%; width: 100%">
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
        </main>
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
        <header style="height: 10%"></header>
        <main style="height: 70%">
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
              <div style="width: 100%">
                操作人：<span v-text="dept.name"></span>
              </div>
              <div style="width: 100%">
                過磅物：<span v-text="productName"></span>
              </div>
              <div style="width: 100%">
                總重：<span v-text="totalWeight"></span> KG
              </div>
              <div style="width: 100%">
                扣重：<span v-text="deductWeight"></span> KG
              </div>
              <div style="width: 100%">
                淨重：<span v-text="netWeight"></span> KG
              </div>
            </div>
          </div>
        </main>
        <el-footer style="height: 15%">
          <el-button
            style="
              width: 200px;
              height: 60px;
              position: absolute;
              right: 600px;
              font-size: 40px;
            "
            @click="
              finalPage = false;
              deductPage = true;
            "
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

<script type='text/javascript' src='js/jquery-3.5.1.min.js'></script>
<script type='text/javascript' src='js/BarcodePrinter.js'></script>
<script type='text/javascript' src='js/jquery.base64.js'></script>
<script>
const _PADCHAR = "=";
const _ALPHA =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// import axios from "axios";
// import qs from "querystring";
// import { QueryUsbList, SendToPrinter } from "./js/BarcodePrinter";
// import {_getbyte64, _decode_chars, _decode, _get_chars, _encode} from './js/jquery.base64'
export default {
  data() {
    return {
      //表單用戶登入數據
      retryFlag: false,
      loading: false,
      userLoginForm: { cardName: "" },
      dept: {},
      user: {},
      cardId: "",
      productId: "",
      productName: "",
      products: [],
      startPage: true,
      loginPage: false,
      deptInfoPage: false,
      productPage: false,
      toolPage: false,
      waitingPage: false,
      retryPage: false,
      totalPage: false,
      deductPage: false,
      finalPage: false,
      items: [],
      tool: "",
      totalWeight: "",
      deductWeight: "",
      netWeight: "",
      addDate: "",
    };
  },

  methods: {
    start: function () {
      this.startPage = false;
      this.loginPage = true;
      this.loginPort();
    },
    async loginPort() {
      this.$nextTick(() => {
        this.$refs.loginButton.$el.querySelector("input").focus();
      });
      // var port = null;
      // port = await navigator.serial.getPorts();
      //       console.log("port:"+port);
      // if (port !== null && Array.isArray(port) && port.length == 1) {
      //   port = port[0];
      // } else {
      //   port = await navigator.serial.requestPort();
      // }
      // // 設定 baud rate 為 9600
      // await port.open({ baudRate: 9600 });
      // // 將 bit data 解碼為文字
      // let decoder = new TextDecoderStream();
      // let inputDone = port.readable.pipeTo(decoder.writable);
      // const reader = decoder.readable.getReader();
      // try {
      //   var string = "";
      //   var keepReading = true;
      //   while (keepReading) {
      //     const { value, done } = await reader.read();
      //     if (this.loginPage) {
      //       string += value;
      //       console.log(value);
      //               console.log(string);
      //       var start = string.indexOf("\\u2");
      //       var end = string.indexOf("\\u3");
      //       var card = string.substring(start + 4, end);
      //       this.userLoginForm.cardName = card;
      //       await this.handleSubmit();
      //       keepReading = false;
      //     }
      //   }
      // } catch (error) {
      //   console.log("error:" + error);
      //   // Handle error...
      // } finally {
      //   await reader.cancel();
      //   await inputDone.catch(() => {});
      //   await port.close();
      // }
    },
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

      // this.testPort();
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
      this.retryPage = false;
      this.loginPage = true;
      this.startPage = false;
      this.userLoginForm = {};
      this.loginPort();
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
      this.recieveWeight();
    },
    retry: function () {
      this.retryFlag = true;
      this.waitingPage = false;
      this.retryPage = true;
    },
    //收到重量
    async recieveWeight() {
      this.retryFlag = false;
      var timeoutID = window.setTimeout(() => this.retry(), 3000);
      await this.testPort();
      if (!this.retryFlag) {
        window.clearTimeout(timeoutID);
        this.deductWeight = "";
        this.waitingPage = false;
        this.deductPage = true;
      }
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
        if (this.count(this.totalWeight, this.deductWeight) < 0) {
          this.$message.error({
            title: "扣重不可大於總重",
            message: "扣重不可大於總重",
            type: "error",
          });
        } else {
          this.netWeight = this.count(this.totalWeight, this.deductWeight);
          this.deductPage = false;
          this.finalPage = true;
        }
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
    count: function (num1, num2) {
      var r1, r2, m, n;
      try {
        r1 = num1.toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = num2.toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      n = r1 >= r2 ? r1 : r2;
      return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    },
    async testPort() {
      var port = null;
      // port = await navigator.serial.requestPort();
      port = await navigator.serial.getPorts();
      console.log("port:" + port);
      if (port !== null && Array.isArray(port) && port.length == 1) {
        port = port[0];
      } else if (port !== null && Array.isArray(port) && port.length == 2) {
        port = port[1];
      } else {
        port = await navigator.serial.requestPort();
      }
      // 設定 baud rate 為 9600
      await port.open({ baudRate: 9600 });
      // 將 bit data 解碼為文字
      let decoder = new TextDecoderStream();
      let inputDone = port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();
      try {
        var string = "";
        var keepReading = true;
        while (port.readable && keepReading) {
          console.log("reading");
          const { value, done } = await reader.read();
          string += value;
          console.log("value:" + value);
          console.log("string:" + string);
          var start = string.indexOf("ST,GS,+");
          var end = string.indexOf("kg");
          if (start != -1 && end != -1) {
            if (start > end) {
              string = string.replace("kg", "");
            } else {
              var number = string.substring(start + 7, end);
              var g = Number(number);
              this.totalWeight = g;
              keepReading = false;
            }
          }
        }
      } catch (error) {
        console.log("error:" + error);
        // Handle error...
      } finally {
        await reader.cancel();
        await inputDone.catch(() => {});
        await port.close();
      }
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
        netWeight: this.netWeight,
      };
      const { data: res } = await this.$http.post("business/weight/add", param);
      if (res.success) {
        console.log(res);
        this.addDate = res.data.date;
        await this.Print_ecTextOut();
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
    },
    // 印表機
    async QueryUsbList() {
      console.log("QueryUsbList");
      return await this.SendToPrinter("UsbList", "");
    },
    _encode: function (s) {
      if (arguments.length !== 1) {
        throw "SyntaxError: exactly one argument required";
      }

      s = String(s);
      if (s.length === 0) {
        return s;
      }

      //s = _encode_utf8(s);
      var i,
        b10,
        y = [],
        x = [],
        len = s.length;
      i = 0;
      while (i < len) {
        this._get_chars(s.charCodeAt(i), y);
        while (y.length >= 3) {
          var ch1 = y.shift();
          var ch2 = y.shift();
          var ch3 = y.shift();
          b10 = (ch1 << 16) | (ch2 << 8) | ch3;
          x.push(_ALPHA.charAt(b10 >> 18));
          x.push(_ALPHA.charAt((b10 >> 12) & 0x3f));
          x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
          x.push(_ALPHA.charAt(b10 & 0x3f));
        }
        i++;
      }

      switch (y.length) {
        case 1:
          var ch = y.shift();
          b10 = ch << 16;
          x.push(
            _ALPHA.charAt(b10 >> 18) +
              _ALPHA.charAt((b10 >> 12) & 0x3f) +
              _PADCHAR +
              _PADCHAR
          );
          break;

        case 2:
          var ch1 = y.shift();
          var ch2 = y.shift();
          b10 = (ch1 << 16) | (ch2 << 8);
          x.push(
            _ALPHA.charAt(b10 >> 18) +
              _ALPHA.charAt((b10 >> 12) & 0x3f) +
              _ALPHA.charAt((b10 >> 6) & 0x3f) +
              _PADCHAR
          );
          break;
      }

      return x.join("");
    },
    _get_chars: function (ch, y) {
      if (ch < 0x80) y.push(ch);
      else if (ch < 0x800) {
        y.push(0xc0 + ((ch >> 6) & 0x1f));
        y.push(0x80 + (ch & 0x3f));
      } else {
        y.push(0xe0 + ((ch >> 12) & 0xf));
        y.push(0x80 + ((ch >> 6) & 0x3f));
        y.push(0x80 + (ch & 0x3f));
      }
    },
    _decode: function (s) {
      var pads = 0,
        i,
        b10,
        imax = s.length,
        x = [],
        y = [];

      s = String(s);

      if (imax === 0) {
        return s;
      }

      if (imax % 4 !== 0) {
        throw "Cannot decode base64";
      }

      if (s.charAt(imax - 1) === _PADCHAR) {
        pads = 1;

        if (s.charAt(imax - 2) === _PADCHAR) {
          pads = 2;
        }

        // either way, we want to ignore this last block
        imax -= 4;
      }

      for (i = 0; i < imax; i += 4) {
        var ch1 = this._getbyte64(s, i);
        var ch2 = this._getbyte64(s, i + 1);
        var ch3 = this._getbyte64(s, i + 2);
        var ch4 = this._getbyte64(s, i + 3);

        b10 =
          (this._getbyte64(s, i) << 18) |
          (this._getbyte64(s, i + 1) << 12) |
          (this._getbyte64(s, i + 2) << 6) |
          this._getbyte64(s, i + 3);
        y.push(b10 >> 16);
        y.push((b10 >> 8) & 0xff);
        y.push(b10 & 0xff);
        this._decode_chars(y, x);
      }
      switch (pads) {
        case 1:
          b10 =
            (this._getbyte64(s, i) << 18) |
            (this._getbyte64(s, i + 1) << 12) |
            (this._getbyte64(s, i + 2) << 6);
          y.push(b10 >> 16);
          y.push((b10 >> 8) & 0xff);
          break;

        case 2:
          b10 =
            (this._getbyte64(s, i) << 18) | (this._getbyte64(s, i + 1) << 12);
          y.push(b10 >> 16);
          break;
      }
      this._decode_chars(y, x);
      if (y.length > 0) throw "Cannot decode base64";
      return x.join("");
    },
    _getbyte64: function (s, i) {
      // This is oddly fast, except on Chrome/V8.
      // Minimal or no improvement in performance by using a
      // object with properties mapping chars to value (eg. 'A': 0)

      var idx = _ALPHA.indexOf(s.charAt(i));

      if (idx === -1) {
        throw "Cannot decode base64";
      }

      return idx;
    },
    _decode_chars: function (y, x) {
      while (y.length > 0) {
        var ch = y[0];
        if (ch < 0x80) {
          y.shift();
          x.push(String.fromCharCode(ch));
        } else if ((ch & 0x80) == 0xc0) {
          if (y.length < 2) break;
          ch = y.shift();
          var ch1 = y.shift();
          x.push(String.fromCharCode(((ch & 0x1f) << 6) + (ch1 & 0x3f)));
        } else {
          if (y.length < 3) break;
          ch = y.shift();
          var ch1 = y.shift();
          var ch2 = y.shift();
          x.push(
            String.fromCharCode(
              ((ch & 0x0f) << 12) + ((ch1 & 0x3f) << 6) + (ch2 & 0x3f)
            )
          );
        }
      }
    },
    async PrinterCtrl_GetJson() {
      console.log("PrinterCtrl_GetJson");
      // var l = await this.QueryUsbList();
      var JsonObject = {
        Interface: "USB",
        USB: "",
        // USB: this._encode(l),
        COM: "",
        BaudRate: "",
        LPT: "",
        IP: "",
        Port: "",
      };

      return JsonObject;
    },
    async SendCommand(mData) {
      console.log("SendCommand");
      // Get Json Object ( Printer Config )
      var JsonObject = await this.PrinterCtrl_GetJson();

      // Encode data
      mData = this._encode(mData);

      // Add Data to Json Object
      JsonObject["Data"] = mData;

      // Send To Printer
      await this.SendToPrinter("Send", JsonObject);
    },
    async ecTextOut(PosX, PosY, FontHeight, mFontName, mData) {
      console.log("ecTextOut");
      // Get Json Object ( Printer Config )
      var JsonObject = await this.PrinterCtrl_GetJson();

      // Encode "FontName" and "Data"
      mFontName = this._encode(mFontName);
      mData = this._encode(mData);

      JsonObject["PosX"] = PosX;
      JsonObject["PosY"] = PosY;
      JsonObject["FontHeight"] = FontHeight;
      JsonObject["FontName"] = mFontName;
      JsonObject["Data"] = mData;

      // Send To Printer
      await this.SendToPrinter("ecTextOut", JsonObject);
    },
    async Print_ecTextOut() {
      console.log("Print_ecTextOut");
      // Set Label Size
      var LabelW = 54;
      var LabelH = 40;
      await this.SendCommand("^Q" + LabelH + ",0,0\n^W" + LabelW);
      // Print Job Start
      await this.SendCommand("^L");
      // Print Text
      //ecTextOut(10, 10, 24, "標楷體", "標楷體測試");
      //ecTextOut(10, 100, 24, "MS Gothic", "日本のテスト");

      // Print Text
      var PosX = "30";
      var PosY = "30";
      var FontSize = "36";
      var FontName = "標楷體";
      var Data = this.addDate;
      await this.ecTextOut(PosX, PosY, FontSize, FontName, Data);
      PosX = "30";
      PosY = "80";
      var FontSize = "36";
      var FontName = "標楷體";
      var Data = this.dept.name;
      await this.ecTextOut(PosX, PosY, FontSize, FontName, Data);
      PosX = "30";
      PosY = "130";
      var FontSize = "36";
      var FontName = "標楷體";
      var Data = this.productName;
      await this.ecTextOut(PosX, PosY, FontSize, FontName, Data);
      PosX = "250";
      PosY = "130";
      var FontSize = "36";
      var FontName = "標楷體";
      var Data = this.netWeight + "  kg";
      await this.ecTextOut(PosX, PosY, FontSize, FontName, Data);

      // Print Job End
      await this.SendCommand("E");
    },
    SendToPrinter(FuncName, JsonObject) {
      // Response Data
      var RetArray = [];

      var RootUrl = "http://localhost:8050/";

      // Combine WebAPI URL
      var SendUrl = RootUrl + FuncName + "/";

      // Get Json Text
      var SendData = JSON.stringify(JsonObject);

      // Debug
      //alert("Url = " + SendUrl + "\r\nData = " + SendData);

      // Encrypt Data
      if (SendData != "") {
        SendData = this._encode(SendData);
      }

      // Send Ajax Request
      $.ajax({
        url: SendUrl,
        type: "POST",
        cache: false,
        dataType: "json",
        data: { EncodeData: SendData },
        async: false,

        success: function (data) {
          // Get Json Text
          var JsonData = JSON.stringify(data);
          //alert(JsonData);

          // JsonData = {"AAA","BBB","CCC"}
          if (JsonData.length > 4) {
            // JsonData = AAA","BBB","CCC
            JsonData = JsonData.substr(2, JsonData.length - 4);
          }

          // ItemList[0] = AAA
          // ItemList[1] = BBB
          // ItemList[2] = CCC
          var ItemList = JsonData.split('","');
          for (var i = 0; i < ItemList.length; i++) {
            //alert(ItemList[i]);
            var str = this._decode(ItemList[i]);
            RetArray.push(str);
          }
        },

        error: function (xhr, ajaxOptions, thrownError) {
          //alert(xhr.status);
          //alert(thrownError);
        },
      });

      return RetArray;
    },
  },
  async created() {
    LocalStorage.clearAll();
  },
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
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-left: 600px;
  margin-top: 50px;
  width: 370px;
  padding: 40px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
}

label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}

.background {
  width: 100%;
  height: 100%;
  background: url("../assets/picture.jpg") center center no-repeat;
  background-size: cover;
}
</style>


