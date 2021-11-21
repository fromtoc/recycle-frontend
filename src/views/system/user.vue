<template>
  <div id="users">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>基本資料</el-breadcrumb-item>
      <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用戶列表卡片區 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        ref="form"
        :model="queryMap"
        label-width="70px"
        size="small"
      >
        <el-form-item label="">
          <el-input
            clearable
            @clear="searchUser"
            v-model="queryMap.nickname"
            placeholder="請輸入用戶名稱查詢"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            @keyup.enter.native="searchUser"
            @clear="searchUser"
            clearable
            v-model="queryMap.username"
            placeholder="請輸入用戶帳號查詢"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select
            no-data-text="無數據"
            clearable
            @change="searchUser"
            @clear="searchUser"
            v-model="queryMap.departmentId"
            placeholder="請選擇所屬公司查詢"
          >
            <el-option
              v-for="department in departments"
              :label="department.nickname"
              :key="department.id"
              :value="department.id"
            >
              <span style="float: left">{{ department.nickname }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <el-tag size="small" effect="plain" type="success">
                  {{ department.total }}人
                </el-tag>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" @click="searchUser" icon="el-icon-search"
            >查詢</el-button
          >
          <!-- <el-button @click="reset" icon="el-icon-refresh">重置</el-button> -->
        </el-form-item>

        <el-form-item style="float: right">
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
            v-hasPermission="'user:add'"
            >新增</el-button
          >
          <el-button
            @click="downExcel"
            v-hasPermission="'user:export'"
            icon="el-icon-download"
            >下載</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 表格區域 -->
      <el-table
        empty-text="暫無數據"
        v-loading="loading"
        size="small"
        :data="userList"
        border
        style="width: 100%"
        height="420"
      >
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <el-table-column label="序號" type="index" width="50"></el-table-column>
        <el-table-column
          prop="nickname"
          label="用戶名稱"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用戶帳號"
          width="110"
        ></el-table-column>
        <!-- <el-table-column
          prop="sex"
          :formatter="showSex"
          label="性別"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag size="small" type="success" v-if="scope.row.sex === 1"
              >帥哥</el-tag
            >
            <el-tag size="small" type="warning" v-else>美女</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="departmentName"
          label="所屬公司"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="regionName"
          label="區域"
          width="100"
        ></el-table-column>
        <!-- <el-table-column prop="birth" label="生日" width="180" sortable></el-table-column> -->
        <el-table-column
          prop="email"
          label="E-mail信箱"
          width="180"
        ></el-table-column>
        <!-- <el-table-column
          prop="phoneNumber"
          label="電話"
          width="150"
        ></el-table-column> -->
        <el-table-column prop="isban" label="停用" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="changUserStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-hasPermission="'user:edit'"
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="edit(scope.row.id)"
              >編輯</el-button
            >
            <el-button
              v-hasPermission="'user:assign'"
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="assignRoles(scope.row.id)"
              >分配角色</el-button
            >
            <el-button
              v-hasPermission="'user:changePassword'"
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="resetPwd(scope.row.id)"
              >重設密碼</el-button
            >
            <el-button
              v-hasPermission="'card:manage'"
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="cardManage(scope.row.id)"
              >卡片管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分頁 -->
      <el-pagination
        style="margin-top: 10px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryMap.pageNo"
        :page-sizes="[6, 10, 20, 30]"
        :page-size="queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 新增對話框 -->
      <el-dialog
        title="新增用戶"
        @close="closeDialog"
        :visible.sync="addDialogVisible"
        width="50%;"
      >
        <!-- 表單 -->
        <span>
          <el-form
            :model="addForm"
            :label-position="labelPosition"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="80px"
          >
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="所屬公司" prop="departmentId">
                    <el-select
                      no-data-text="無數據"
                      v-model="addForm.departmentId"
                      placeholder="請選擇所屬公司"
                    >
                      <el-option
                        v-for="department in departments"
                        :key="department.id"
                        :label="department.nickname"
                        :value="department.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="區域" prop="regionId">
                    <el-select
                      no-data-text="無數據"
                      v-model="addForm.regionId"
                      placeholder="請選擇區域"
                    >
                      <el-option
                        v-for="region in regions"
                        :key="region.id"
                        :label="region.value"
                        :value="region.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="用戶帳號" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="用戶名稱" prop="nickname">
                    <el-input v-model="addForm.nickname"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <!-- <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="性別" prop="sex">
                    <el-radio-group v-model="addForm.sex">
                      <el-radio :label="1">帥哥</el-radio>
                      <el-radio :label="0">美女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col> -->
            </el-row>
            <!-- <el-form-item label="密碼" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item> -->
            <el-form-item label="E-mail" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
          </el-form>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addUser"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 修改對話框 -->
      <el-dialog
        title="編輯用戶"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editClose"
      >
        <span>
          <el-form
            :model="editForm"
            :label-position="labelPosition"
            :rules="addFormRules"
            ref="editFormRef"
            label-width="80px"
          >
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="所屬公司" prop="departmentId">
                    <el-select
                      no-data-text="無數據"
                      v-model="editForm.departmentId"
                      placeholder="請選擇所屬公司"
                    >
                      <el-option
                        v-for="department in departments"
                        :key="department.id"
                        :label="department.nickname"
                        :value="department.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="區域" prop="regionId">
                    <el-select
                      no-data-text="無數據"
                      v-model="editForm.regionId"
                      placeholder="請選擇區域"
                    >
                      <el-option
                        v-for="region in regions"
                        :key="region.id"
                        :label="region.value"
                        :value="region.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="用戶帳號" prop="username">
                    <el-input
                      v-model="editForm.username"
                      :disabled="true"
                    ></el-input>
                    <el-input
                      type="hidden"
                      v-model="editForm.id"
                      :disabled="true"
                      style="display: none"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="用戶名稱" prop="nickname">
                    <el-input v-model="editForm.nickname"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="E-mail" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="updateUser"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 分配角色對話框 -->
      <el-dialog
        center
        title="分配角色"
        :visible.sync="assignDialogVisible"
        width="49%"
      >
        <span>
          <template>
            <el-transfer
              filter-placeholder="請輸入搜索內容"
              filterable
              :titles="['未擁有', '已擁有']"
              :button-texts="['到左邊', '到右邊']"
              v-model="value"
              :data="roles"
            ></el-transfer>
          </template>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="assignDialogVisible = false" class="el-icon-close"
            >取消分配</el-button
          >
          <el-button
            v-hasPermission="'user:assign'"
            type="primary"
            @click="doAssignRoles"
            class="el-icon-check"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確定分配</el-button
          >
        </span>
      </el-dialog>
      <!-- 卡片管理對話框 -->
      <el-dialog
        center
        title="卡片管理"
        :visible.sync="cardManagementVisible"
        width="50%"
      >
        <el-button
          size="small"
          type="success"
          icon="el-icon-plus"
          @click="addCardDialogVisible = true"
          v-hasPermission="'user:add'"
          style="float: right; margin-bottom: 10px"
          >新增</el-button
        >
        <div style="float: right; margin-right: 10px">
          <span style="margin-right: 5px">顯示停用</span>
          <el-switch v-model="showCardStop"></el-switch>
        </div>

        <!-- 表格區域 -->
        <el-table
          empty-text="暫無數據"
          v-loading="loading"
          size="small"
          :data="cardListFilter"
          border
          style="width: 100%"
          height="420"
        >
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column
            prop="cardName"
            label="過磅卡號"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="departmentCategoryName"
            label="公司類型"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="departmentName"
            label="公司名稱"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="regionName"
            label="區域位置"
            width="100"
          ></el-table-column>
          <el-table-column prop="isban" label="停用" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="changCardStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="assignCardProduct(scope.row.id)"
                >編輯</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <span>
          <template>
            <el-transfer
              filter-placeholder="請輸入搜索內容"
              filterable
              :titles="['未擁有', '已擁有']"
              :button-texts="['到左邊', '到右邊']"
              v-model="value"
              :data="roles"
            ></el-transfer>
          </template>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="assignDialogVisible = false" class="el-icon-close"
            >取消分配</el-button
          >
          <el-button
            v-hasPermission="'user:assign'"
            type="primary"
            @click="doAssignRoles"
            class="el-icon-check"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確定分配</el-button
          >
        </span> -->
      </el-dialog>
      <!-- 新增卡片對話框 -->
      <el-dialog
        title="新增卡片"
        :visible.sync="addCardDialogVisible"
        width="50%"
      >
        <span>
          <el-form label-width="140px" class="demo-ruleForm">
            <el-form-item label="輸入卡片號碼" prop="addCardId">
              <el-input @keyup.enter.native="addCard" type="text" v-model="addCardId"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCardDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCard">確 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配廢棄物對話框 -->
      <el-dialog
        center
        title="分配廢棄物"
        :visible.sync="assignCardProdcutsDialogVisible"
        width="49%"
      >
        <span>
          <template>
            <el-transfer
              filter-placeholder="請輸入搜索內容"
              filterable
              :titles="['未擁有', '已擁有']"
              :button-texts="['到左邊', '到右邊']"
              v-model="cardProductsValue"
              :data="products"
            ></el-transfer>
          </template>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="assignCardProdcutsDialogVisible = false"
            class="el-icon-close"
            >取消分配</el-button
          >
          <el-button
            type="primary"
            @click="doAssignCardProduct"
            class="el-icon-check"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確定分配</el-button
          >
        </span>
      </el-dialog>
      <!-- 修改密碼對話框 -->
      <el-dialog
        title="重設密碼"
        :visible.sync="resetPwdDialogVisable"
        width="50%"
      >
        <span>
          <el-form label-width="140px" class="demo-ruleForm">
            <el-form-item label="輸入新密碼" prop="newPassword">
              <el-input type="password" v-model="newPassword"></el-input>
            </el-form-item>
            <el-form-item label="再次輸入新密碼">
              <el-input type="password" v-model="newPasswordAgain"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetPwdDialogVisable = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">確 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("郵箱不能為空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("請輸入正確的郵箱格式"));
        }
      }, 100);
    };
    const checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("電話號碼不能為空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("請輸入數字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("電話號碼格式不正確"));
          }
        }
      }, 100);
    };
    return {
      showCardStop: false,
      regions: [],
      btnLoading: false,
      btnDisabled: false,
      departments: [],
      loading: true,
      total: 0,
      addDialogVisible: false, //新增對話框,
      editDialogVisible: false, //修改對話框
      assignDialogVisible: false, //分配角色對話框
      cardManagementVisible: false, //卡片管理對話框
      addCardDialogVisible: false, //新增卡片對話框
      assignCardProdcutsDialogVisible: false, //卡片分配產品對話框
      resetPwdDialogVisable: false, //修改密碼對話框
      labelPosition: "right", //lable對齊方式
      //查詢對象
      queryMap: {
        pageNum: 1,
        pageSize: 6,
        username: "",
        sex: "",
        nickname: "",
      },
      userList: [],
      cardList: [],

      addForm: {
        username: "",
        nickname: "",
        password: "8888",
        email: "",
        phoneNumber: "",
        sex: "",
        birth: "",
      }, //新增表單
      editForm: {}, //更新表單
      addCardUserId: "",
      addCardId: "",
      changePasswordUserId: "",
      newPassword: "",
      newPasswordAgain: "",
      addFormRules: {
        username: [
          { required: true, message: "請輸入用戶帳號", trigger: "blur" },
        ],
        // password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
        departmentId: [
          { required: true, message: "請選擇所屬公司", trigger: "blur" },
        ],
        email: [{ required: true, message: "請輸入E-mail", trigger: "blur" }],
        nickname: [
          { required: true, message: "請輸入用戶名稱", trigger: "blur" },
        ],
        regionId: [{ required: true, message: "請選擇區域", trigger: "blur" }],
      }, //新增表單驗證規則
      roles: [], //角色
      value: [], //用戶擁有的角色
      uid: "",
      products: [], //產品
      cardProductsValue: [], //卡片擁有的產品
      cid: "",
    };
  },
  computed: {
    cardListFilter: function () {
      if (!this.showCardStop) {
        return this.cardList.filter((item) => item.status !== true);
      }
      return this.cardList.filter((item) => item.status == true);
    },
  },
  methods: {
    /**
     * 重置
     */
    reset() {
      this.queryMap = {
        pageNum: 1,
        pageSize: 6,
        username: "",
        sex: "",
        nickname: "",
      };
    },
    /**
     * 加載用戶表格
     */
    downExcel() {
      const $this = this;
      const res = axios
        .request({
          url: "system/user/excel",
          method: "post",
          responseType: "blob",
        })
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
            return $this.$message.error(
              "Subject does not have permission [user:export]"
            );
          }
          const data = res.data;
          let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "用戶列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    /**
     * 彈出用戶分配角色
     */
    async assignRoles(id) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const { data: res } = await this.$http.get(
        "system/user/" + id + "/roles"
      );
      if (res.success) {
        this.roles = res.data.roles;
        this.value = res.data.values;
        this.uid = id;
        setTimeout(() => {
          loading.close();
          this.assignDialogVisible = true;
        }, 400);
      } else {
        this.$message.error("分配角色失敗:" + res.data.errorMsg);
      }
    },
    /**
     * 確定分配角色
     */
    async doAssignRoles() {
      this.assignDialogVisible = true;
      this.btnLoading = true;
      this.btnDisabled = true;
      const { data: res } = await this.$http.post(
        "system/user/" + this.uid + "/assignRoles",
        this.value
      );
      if (res.success) {
        this.$notify.success({
          title: "操作成功",
          message: "用戶分配角色成功",
        });
      } else {
        this.$message.error("分配角色失敗:" + res.data.errorMsg);
      }
      this.assignDialogVisible = false;
      this.btnLoading = false;
      this.btnDisabled = false;
    },
    /**
     * 彈出卡片分配廢棄物
     */
    async assignCardProduct(id) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const { data: res } = await this.$http.get(
        "system/user/card/" + id + "/products"
      );
      if (res.success) {
        this.products = res.data.products;
        this.cardProductsValue = res.data.values;
        this.cid = id;
        setTimeout(() => {
          loading.close();
          this.assignCardProdcutsDialogVisible = true;
        }, 400);
      } else {
        this.$message.error("分配角色失敗:" + res.data.errorMsg);
      }
    },
    /**
     * 確定卡片分配廢棄物
     */
    async doAssignCardProduct() {
      this.assignCardProdcutsDialogVisible = true;
      this.btnLoading = true;
      this.btnDisabled = true;
      const { data: res } = await this.$http.post(
        "system/user/" + this.cid + "/assignProducts",
        this.cardProductsValue
      );
      if (res.success) {
        this.$notify.success({
          title: "操作成功",
          message: "卡片分配廢棄物成功",
        });
      } else {
        this.$message.error("分配廢棄物失敗:" + res.data.errorMsg);
      }
      this.assignCardProdcutsDialogVisible = false;
      this.btnLoading = false;
      this.btnDisabled = false;
    },
    /**
     * 加載用戶列表
     */
    async getUserList() {
      const { data: res } = await this.$http.get("system/user/findUserList", {
        params: this.queryMap,
      });
      if (!res.success) {
        return this.$message.error("獲取用戶列表失敗:" + res.data.errorMsg);
      }
      this.total = res.data.total;
      this.userList = res.data.rows;
    },
    /**
     * 加載用戶列表
     */
    async getCardList(id) {
      const { data: res } = await this.$http.get("system/user/card/list/" + id);
      if (!res.success) {
        return this.$message.error("獲取用戶卡片列表失敗:" + res.data.errorMsg);
      }
      this.cardList = res.data;
      this.addCardUserId = id;
    },

    /**
     * 删除用戶
     */
    async del(id) {
      const res = await this.$confirm(
        "此操作將永久删除該用戶, 是否繼續?",
        "提示",
        {
          confirmButtonText: "確定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (res === "confirm") {
        const { data: res } = await this.$http.delete(
          "system/user/delete/" + id
        );
        console.log(res);
        if (res.success) {
          this.$notify.success({
            title: "操作成功",
            message: "用戶删除成功",
          });
          await this.getUserList();
          await this.getDepartmets();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },
    /**
     * 新增用戶
     */
    async addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          const { data: res } = await this.$http.post(
            "system/user/add",
            this.addForm
          );
          if (res.success) {
            this.$notify.success({
              title: "操作成功",
              message: "用戶新增成功",
            });
            this.addForm = {};
            await this.getUserList();
            await this.getDepartmets();
          } else {
            return this.$message.error("用戶新增失敗:" + res.data.errorMsg);
          }
          this.addDialogVisible = false;
          this.btnLoading = false;
          this.btnDisabled = false;
        }
      });
    },
    /**
     * 更新用戶
     */
    async updateUser() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          const { data: res } = await this.$http.put(
            "system/user/update/" + this.editForm.id,
            this.editForm
          );
          if (res.success) {
            this.$notify({
              title: "操作成功",
              message: "用戶基本信息已更新",
              type: "success",
            });
            this.editForm = {};
            await this.getUserList();
            await this.getDepartmets();
          } else {
            this.$message.error("用戶信息更新失敗:" + res.data.errorMsg);
          }
          this.editDialogVisible = false;
          this.btnLoading = false;
          this.btnDisabled = false;
        }
      });
    },
    async resetPwd(id) {
      this.resetPwdDialogVisable = true;
      this.changePasswordUserId = id;
    },
    /**
     * 更新用戶密碼
     */
    async changePassword(id) {
      if (this.newPassword != this.newPasswordAgain) {
        this.$message.error("新密碼不相同");
        return;
      }
      const { data: res } = await this.$http.put(
        "system/user/change/password/" +
          this.changePasswordUserId +
          "/" +
          this.newPassword
      );
      if (res.success) {
        this.$notify({
          title: "操作成功",
          message: "用戶密碼已更新",
          type: "success",
        });
      } else {
        this.$message.error("用戶密碼更新失敗:" + res.data.errorMsg);
      }
      this.changePasswordUserId = "";
      this.newPassword = "";
      this.newPasswordAgain = "";
      this.resetPwdDialogVisable = false;
    },
    /**
     * 新增用戶卡片
     */
    async addCard() {
      const { data: res } = await this.$http.put(
        "system/user/card/add/" + this.addCardUserId + "/" + this.addCardId
      );
      if (res.success) {
        this.$notify({
          title: "操作成功",
          message: "用戶卡片新增成功",
          type: "success",
        });
      } else {
        this.$message.error("用戶卡片新增失敗:" + res.data);
      }
      this.addCardId = "";
      this.addCardDialogVisible = false;
      this.getCardList(this.addCardUserId);
      this.addCardUserId = "";
    },
    /**
     * 搜索用戶
     */
    searchUser() {
      this.queryMap.pageNum = 1;
      this.getUserList();
    },
    /**
     * 修改用戶信息
     */
    async edit(id) {
      const { data: res } = await this.$http.get("system/user/edit/" + id);
      if (res.success) {
        this.editForm = res.data;
        this.editDialogVisible = true;
      } else {
        return this.$message.error("用戶信息編輯失敗:" + res.data.errorMsg);
      }
    },
    /**
     *  改變頁碼
     */
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getUserList();
    },
    /**
     * 翻頁
     */
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getUserList();
    },

    /**
     * 關閉新增彈出框
     */
    closeDialog() {
      this.$refs.addFormRef.clearValidate();
      this.addForm.birth = "";
      this.addForm = {};
    },
    /**
     * 關閉編輯彈出框
     */
    editClose() {
      this.$refs.editFormRef.clearValidate();
      this.editForm = {};
    },
    /**
     * 禁用啟用用戶
     */
    async changUserStatus(row) {
      const { data: res } = await this.$http.put(
        "system/user/updateStatus/" + row.id + "/" + row.status
      );
      if (!res.success) {
        this.$message.error("更新用戶狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "用戶狀態已禁用" : "用戶狀態已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    /**
     * 禁用啟用卡片
     */
    async changCardStatus(row) {
      const { data: res } = await this.$http.put(
        "system/user/updateCardStatus/" + row.id + "/" + +row.status
      );
      if (!res.success) {
        this.$message.error("更新卡片狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "卡片已禁用" : "卡片已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    /**
     * 加載所有公司
     */
    async getDepartmets() {
      const { data: res } = await this.$http.get("system/department/findAll");
      if (!res.success) {
        if (res.data.errorMsg == "限本帳號") {
          this.limitUser = true;
        } else {
          return this.$message.error("獲取公司列表失敗:" + res.data.errorMsg);
        }
      }
      this.departments = res.data;
    },
    /**
     * 加載所有區域類別
     */
    async getRegion() {
      const { data: res } = await this.$http.get("system/region/findAll");
      if (!res.success) {
        return this.$message.error("獲取區域失敗:" + res.data.errorMsg);
      }
      this.regions = res.data;
    },
    /**
     * 顯示用戶性別
     */
    showSex(row, column) {
      return row.sex === 1 ? "帥哥" : "美女";
    },
    /**
     * 彈出用戶卡片管理
     */
    async cardManage(id) {
      this.getCardList(id);
      this.cardManagementVisible = true;
      // const loading = this.$loading({
      //   lock: true,
      //   text: "Loading",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      // const { data: res } = await this.$http.get(
      //   "system/user/" + id + "/roles"
      // );
      // if (res.success) {
      //   this.roles = res.data.roles;
      //   this.value = res.data.values;
      //   this.uid = id;
      //   setTimeout(() => {
      //     loading.close();
      //     this.assignDialogVisible = true;
      //   }, 400);
      // } else {
      //   this.$message.error("分配角色失敗:" + res.data.errorMsg);
      // }
    },
  },
  created() {
    this.getUserList();
    this.getDepartmets();
    this.getRegion();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
