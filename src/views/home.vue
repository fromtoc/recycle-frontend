<template>
    <el-container class="home-container">
        <!--    導航-->
        <el-header>
            <div>
        <span style="margin-left:20px;">
          <!-- <img
                  src="../assets/ilogo.png"
                  width="250px;"
                  style="margin-left:-10px;"
                  height="100%;"
                  alt
                  srcset
          /> -->
        </span>
            </div>
            <el-dropdown>
                <div class="block">
                    <!-- <el-avatar  :size="50" :src="this.userInfo.avatar" style="cursor: pointer;"></el-avatar> -->
                    <el-avatar  :size="50" :src="this" style="cursor: pointer;"></el-avatar>
                </div>
                <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item>
                        <span type="danger"  @click="toWelcome"><span class="el-icon-house"></span> &nbsp;系統首頁</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span type="danger" @click="resetPwdDialogVisable=true"><span class="el-icon-ship"></span> &nbsp;重設密碼</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span type="danger" @click="logout"><span class="el-icon-switch-button"></span> &nbsp;登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-dialog title="重設密碼" :visible.sync="resetPwdDialogVisable" width="50%" @close="closeAddDialog">
            <span>
                <el-form
                        label-width="100px"
                        class="demo-ruleForm"
                >
                    <el-form-item label="請輸入密碼">
                    <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="再次輸入密碼">
                    <el-input></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetPwdDialogVisable = false">取 消</el-button>
                <el-button type="primary" @click="add" :disabled="btnDisabled" :loading="btnLoading">確 定</el-button>
            </span>
        </el-dialog>
        <!--主體-->
        <el-container style="height: 500px;">
            <!--選單-->
            <el-aside :width="isOpen===true?'64px':'200px'">
                <div class="toggle-btn" @click="toggleMenu">|||</div>
                <el-menu
                        class="el-menu-vertical-demo"
                        :collapse="isOpen"
                        :router="true"
                        :default-active="activePath"
                        background-color="#001529"
                        :collapse-transition="false"
                        text-color="rgba(255,255,255,0.7)"
                        unique-opened
                >
                    <MenuTree  :menuList="this.menuList"></MenuTree>
                </el-menu>
            </el-aside>

            <!--右邊主體-->
            <el-main  v-loading="loading">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>


<script>
    import MenuTree from "../components/MenuTree"; //引進選單模板

    export default {
        data() {
            return {
                loading: true,
                activePath: "", //激活的路徑
                isOpen: false,
                menuList: {},
                userInfo: {},
                resetPwdDialogVisable: false,
            };
        },
        components: {
            MenuTree
        },
        methods: {
            /**
             *
             * 退出登入
             */
            async logout() {
                const res = await this.$confirm("此操作將退出系統, 是否繼續?", "提示", {
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消登出"
                    });
                });
                if (res === "confirm") {
                    LocalStorage.clearAll();
                    await this.$router.push("/login");
                }
            },
            /**
             * 去系统首頁
             */
            toWelcome(){
                this.$router.push("/welcome");
            },
            /**
             加載選單數據
             */
            async getMenuList() {
                const { data: res } = await this.$http.get("system/user/findMenu");
                if(!res.success){
                    return this.$message.error("獲取選單失敗:" + res.msg);
                }
                this.menuList = res.data;
            },
            /**
             獲取用戶信息
             */
            async getUserInfo() {
                const { data: res } = await this.$http.get("system/user/info");
                if(!res.success){
                    return this.$message.error("獲取用戶信息失敗:" + res.msg);
                } else {
                    this.userInfo = res.data;
                    this.$store.commit("setUserInfo", res.data);
                }
            },
            /**
             * 選單伸缩
             */
            toggleMenu() {
                this.isOpen = !this.isOpen;
            },
            /**
             * 點擊交流
             */
            getContact(){
                const w = window.open('about:blank');
                w.location.href = 'https://www.zykcoderman.xyz/';
            }
        },
        mounted() {
            this.getUserInfo();
        },
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem("activePath");
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    };
</script>

<style>
    /* 為對應的路由跳轉時設置動画效果 */

    .el-header {
        background-color: #001529;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 19px;

        padding-left: 0px;
    }
    .el-aside {
        background-color:#001529
    }
    .el-main {
        background-color: #eaedf1;
    }
    .home-container {
        width: 100%;
        height: 100% !important;
    }
    .toggle-btn {
        background-color: #2d8cf0 !important;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

</style>
