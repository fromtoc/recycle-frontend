<template>
    <div id="login">
        <h1 style="position: absolute;color: #fff;left: 50%;transform: translateX(-50%); top: -110px;">秤重</h1>
        <el-form
                :model="userLoginForm"
                :rules="loginRules"
                status-icon
                ref="userLoginFormRef"
                label-position="left"
                label-width="0px"
                class="demo-ruleForm login-page"
        >
            <h3 class="title">系統登入</h3>
            <el-form-item prop="username">
                <el-input
                        type="text"
                        @keyup.enter.native="handleSubmit"
                        v-model="userLoginForm.username"
                        auto-complete="off"
                        placeholder="刷卡"
                        prefix-icon="iconfont el-icon-user"
                ></el-input>
            </el-form-item>
        </el-form>

        <!-- 驗證碼 -->
    </div>
</template>

<script>
    import Vcode from "vue-puzzle-vcode";

    export default {
        data() {
            return {
                isShow: false,
                successText: "驗證通過！",
                failText: "驗證失敗，請重試",
                sliderText: "拖動滑塊完成拼圖",
                dialogVisible: false,
                imgCode: undefined,
                //表單用戶登入數據
                loading: false,
                userLoginForm: {
                    username: ""
                },
                checked: true,

                //驗證規則
            };
        },

        methods: {
            //登入提交
            handleSubmit: function () {
                this.$refs.userLoginFormRef.validate(valid => {
                    if (!valid) {
                        return;
                    } else {
                        this.isShow = true;
                    }
                });
            },
            //重置表單
            resetForm: function () {
                this.$refs.userLoginFormRef.resetFields();
            },
            //驗證成功
            async success() {
                this.loading = true;
                //發起登入請求
                const {data: res} = await this.$http.post("system/user/login",this.userLoginForm);
                if (res.success) {
                    this.$message({
                        title: "登入成功",
                        message: "歡迎你進入系統",
                        type: "success"
                    });
                    LocalStorage.set(LOCAL_KEY_XINGUAN_ACCESS_TOKEN, res.data);
                    await this.getUserInfo();
                } else {
                    this.isShow = false;
                    this.$message.error({
                        title: "登入失敗",
                        message: res.data.errorMsg,
                        type: "error"
                    });
                }
                this.loading = false;
            },

            /**
             獲取用戶信息
             */
            async getUserInfo() {
                const {data: res} = await this.$http.get("system/user/info");
                if (!res.success) {
                    return this.$message.error("獲取用戶信息失敗:" + res.data.errorMsg);
                } else {
                    this.userInfo = res.data;
                    this.$store.commit("setUserInfo", res.data);
                    await this.$router.push("/home");
                }
            },

            close() {
                this.isShow = false;
            }
        },
        created() {
        }
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


