<template>
  <div id="users">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>帳號管理</el-breadcrumb-item>
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
        <el-form-item label="公司">
          <el-select
            clearable
            @change="searchUser"
            @clear="searchUser"
            v-model="queryMap.departmentId"
            placeholder="請選擇所屬公司"
          >
            <el-option
              v-for="department in departments"
              :label="department.name"
              :key="department.id"
              :value="department.id"
            >
              <span style="float: left">{{ department.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                <el-tag size="small" effect="plain" type="success">
                  {{ department.total }}人
                </el-tag>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帳號">
          <el-input
            @keyup.enter.native="searchUser"
            @clear="searchUser"
            clearable
            v-model="queryMap.username"
            placeholder="請輸入帳號查詢"
          ></el-input>
        </el-form-item>

        <el-form-item label="郵箱">
          <el-input
            @keyup.enter.native="searchUser"
            clearable
            @clear="searchUser"
            v-model="queryMap.email"
            placeholder="請輸入郵箱查詢"
          ></el-input>
        </el-form-item>

        <el-form-item label="性別">
          <el-radio v-model="queryMap.sex" label="1">男</el-radio>
          <el-radio v-model="queryMap.sex" label="0">女</el-radio>
          <el-radio v-model="queryMap.sex" label>全部</el-radio>
        </el-form-item>

        <el-form-item label="名稱">
          <el-input
            clearable
            @clear="searchUser"
            v-model="queryMap.nickname"
            placeholder="請輸入名稱查詢"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="狀態">
                  <el-select
                    clearable
                    v-model="queryMap.isban"
                    @clear="searchUser"
                    placeholder="請選擇用戶狀態"
                  >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="1"></el-option>
                    <el-option label="正常" value="0"></el-option>
                  </el-select>
                </el-form-item>-->

        <el-form-item style="margin-left: 50px">
          <el-button @click="reset" icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" @click="searchUser" icon="el-icon-search"
            >查詢</el-button
          >
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
            v-hasPermission="'user:add'"
            >添加</el-button
          >
          <el-button
            @click="downExcel"
            v-hasPermission="'user:export'"
            icon="el-icon-download"
            >導出</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 表格區域 -->
      <el-table
        v-loading="loading"
        size="small"
        :data="userList"
        border
        style="width: 100%"
        height="420"
      >
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <el-table-column label="#" prop="id" width="50"></el-table-column>
        <el-table-column
          prop="username"
          label="帳號"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="名稱"
          width="110"
        ></el-table-column>
        <el-table-column
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
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="所屬公司"
          width="180"
          sortable
        ></el-table-column>
        <!-- <el-table-column prop="birth" label="生日" width="180" sortable></el-table-column> -->
        <el-table-column
          prop="email"
          label="郵箱"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="電話"
          width="150"
        ></el-table-column>
        <el-table-column prop="isban" label="是否禁用" width="100">
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
              size="small"
              type="primary"
              icon="el-icon-edit-outline"
              @click="edit(scope.row.id)"
            ></el-button>
            <el-button
              v-hasPermission="'user:delete'"
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <el-tooltip
              v-hasPermission="'user:assign'"
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="small"
                icon="el-icon-user-solid"
                @click="assignRoles(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- todo -->
            <el-tooltip
              class="item"
              effect="dark"
              content="卡片管理"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                size="small"
                icon="el-icon-bank-card"
                @click="cardManage(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- todo -->
            <el-tooltip
              class="item"
              effect="dark"
              content="重設密碼"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="info"
                size="small"
                icon="el-icon-setting"
                @click="resetPwd(scope.row.id)"
              ></el-button>
            </el-tooltip>
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

      <!-- 添加對話框 -->
      <el-dialog
        title="添加用戶"
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
                <div class="grid-content bg-purple">
                  <el-form-item label="帳號" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="公司" prop="departmentId">
                    <el-select
                      v-model="addForm.departmentId"
                      placeholder="請選擇所屬公司"
                    >
                      <el-option
                        v-for="department in departments"
                        :key="department.id"
                        :label="department.name"
                        :value="department.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="名稱" prop="nickname">
                    <el-input v-model="addForm.nickname"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="性別" prop="sex">
                    <el-radio-group v-model="addForm.sex">
                      <el-radio :label="1">帥哥</el-radio>
                      <el-radio :label="0">美女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="密碼" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="郵箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手機" prop="phoneNumber">
              <el-input v-model="addForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item prop="birth" label="生日">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="選擇出生日期"
                  v-model="addForm.birth"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
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
        title="修改用戶"
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
                <div class="grid-content bg-purple">
                  <el-form-item label="帳號" prop="username">
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
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="公司" prop="departmentId">
                    <el-select
                      v-model="editForm.departmentId"
                      placeholder="請選擇所屬公司"
                    >
                      <el-option
                        v-for="department in departments"
                        :key="department.id"
                        :label="department.name"
                        :value="department.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  <el-form-item label="名稱" prop="nickname">
                    <el-input v-model="editForm.nickname"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="性別" prop="sex">
                    <el-radio-group v-model="editForm.sex">
                      <el-radio :label="1">帥哥</el-radio>
                      <el-radio :label="0">美女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-form-item label="郵箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="聯繫方式" prop="phoneNumber">
              <el-input v-model="editForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item prop="birth" label="生日">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  value-format="yyyy年MM月dd日"
                  placeholder="選擇出生日期"
                  v-model="editForm.birth"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
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
          type="success"
          icon="el-icon-plus"
          @click="addCardDialogVisible = true"
          v-hasPermission="'user:add'"
          >添加</el-button
        >
        <!-- 表格區域 -->
        <el-table
          v-loading="loading"
          size="small"
          :data="cardList"
          border
          style="width: 100%"
          height="420"
        >
          <!-- <el-table-column type="selection" width="40"></el-table-column> -->
          <el-table-column
            prop="cardId"
            label="卡片號碼"
            width="300"
          ></el-table-column>
          <el-table-column prop="status" label="是否禁用" width="100">
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
                v-hasPermission="'departmentCategory:edit'"
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="assignRoles(scope.row.id)"
                >分配廢棄物</el-button
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
      <!-- 添加卡片對話框 -->
      <el-dialog
        title="添加卡片"
        :visible.sync="addCardDialogVisible"
        width="50%"
      >
        <span>
          <el-form label-width="140px" class="demo-ruleForm">
            <el-form-item label="輸入卡片號碼" prop="addCardId">
              <el-input type="text" v-model="addCardId"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCardDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCard">確 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改密碼對話框 -->
      <el-dialog
        title="修改密碼"
        :visible.sync="resetPwdDialogVisable"
        width="50%"
      >
        <span>
          <el-form label-width="140px" class="demo-ruleForm">
            <el-form-item label="輸入新密碼" prop="newPassword">
              <el-input type="text" v-model="newPassword"></el-input>
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
      btnLoading: false,
      btnDisabled: false,
      departments: [],
      loading: true,
      total: 0,
      addDialogVisible: false, //添加對話框,
      editDialogVisible: false, //修改對話框
      assignDialogVisible: false, //分配角色對話框
      cardManagementVisible: false, //卡片管理對話框
      addCardDialogVisible: false, //添加卡片對話框
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
        password: "",
        email: "",
        phoneNumber: "",
        sex: "",
        birth: "",
      }, //添加表單
      editForm: {}, //更新表單
      addCardUserId: "",
      addCardId: "",
      changePasswordUserId: "",
      newPassword: "",
      addFormRules: {
        username: [
          { required: true, message: "請輸入帳號", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "長度在 3 到 10 個字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "請輸入密碼", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "長度在 3 到 12 個字符",
            trigger: "blur",
          },
        ],
        departmentId: [
          { required: true, message: "請選擇公司", trigger: "blur" },
        ],
        sex: [{ required: true, message: "請選擇性別", trigger: "blur" }],
        birth: [{ required: true, message: "請填寫出生日期", trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phoneNumber: [
          {
            required: true,
            message: "請輸入聯繫方式",
            // validator: checkPhone,
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "請輸入名稱", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "長度在 5 到 10 個字符",
            trigger: "blur",
          },
        ],
      }, //添加表單驗證規則
      roles: [], //角色
      value: [], //用戶擁有的角色
      uid: "",
    };
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
     * 添加用戶
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
              message: "用戶添加成功",
            });
            this.addForm = {};
            await this.getUserList();
            await this.getDepartmets();
          } else {
            return this.$message.error("用戶添加失敗:" + res.data.errorMsg);
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
        this.$message.error("用戶卡片新增失敗:" + res.data.errorMsg);
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
     * 關閉添加彈出框
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
        "system/user/updateCardStatus/" + row.id + "/" + + row.status
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
        return this.$message.error("獲取公司列表失敗:" + res.data.errorMsg);
      }
      this.departments = res.data;
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
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
