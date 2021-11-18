<template>
  <div id="departments">
    <!-- 面包導航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>基本資料</el-breadcrumb-item>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右側卡片區域 -->
    <!-- 公司列表卡片區 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            size="small"
            clearable
            v-model="queryMap.name"
            placeholder="請輸入公司名稱查詢"
            @clear="search"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <div style="float: right; margin-right: 20px">
          <el-button
            size="small"
            v-hasPermission="'department:add'"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="addDialogVisible = true"
            >新增</el-button
          >
          <el-button
            size="small"
            icon="el-icon-download"
            v-hasPermission="'department:export'"
            @click="downExcel"
            >下載</el-button
          >
        </div>
      </el-row>
      <!-- 表格區域 -->
      <template>
        <el-table
          empty-text="暫無數據"
          border
          size="small"
          v-loading="loading"
          stripe
          :data="departmentData"
          style="width: 100%; margin-top: 20px"
          height="460"
        >
          <el-table-column
            label="序號"
            type="index"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="typeCodeName"
            label="公司類型"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="公司名稱"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="nickname"
            label="公司簡稱"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="contact"
            label="聯絡人姓名"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="聯絡人市話"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="cellPhone"
            label="聯絡人手機"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="E-mail郵件信箱"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="備註"
            width="100"
          ></el-table-column>
          <!-- <el-table-column prop="total" label="人數" width="70">
            <template slot-scope="scope">
              <el-tag
                effect="plain"
                v-text="scope.row.total + '人'"
                size="small"
              >
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="isban" label="辦公大樓餐廳廚餘標記" width="150">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.food"
                @change="changeFood(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isban" label="停用" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="changeStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="createTime"
            label="創建時間"
            sortable
          ></el-table-column>
          <el-table-column
            prop="modifiedTime"
            label="修改時間"
            sortable
          ></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-hasPermission="'department:edit'"
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="edit(scope.row.id)"
                >編輯</el-button
              >

              <!-- <el-button
                v-hasPermission="'department:delete'"
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="del(scope.row.id)"
                >删除</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分頁 -->
      <el-pagination
        style="margin-top: 10px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-sizes="[7, 10, 15, 20]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 公司別新增彈出框 -->
      <el-dialog
        title="新增公司"
        :visible.sync="addDialogVisible"
        width="60%"
        @close="closeAddDialog"
      >
        <span>
          <el-form
            :model="addRuleForm"
            :rules="addRules"
            ref="addRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="公司類型" prop="typeId">
              <el-select
                v-model="addRuleForm.typeId"
                placeholder="請選擇公司類型"
              >
                <el-option
                  v-for="departmentCategory in departmentCategories"
                  :key="departmentCategory.id"
                  :label="departmentCategory.value"
                  :value="departmentCategory.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司名稱" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司簡稱" prop="nickname">
              <el-input v-model="addRuleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="聯絡人姓名" prop="contact">
              <el-input v-model="addRuleForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="聯絡人市話" prop="phone">
              <el-input v-model="addRuleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="聯絡人手機" prop="cellPhone">
              <el-input v-model="addRuleForm.cellPhone"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
              <el-input v-model="addRuleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="備註" prop="remark">
              <el-input type="textarea" v-model="addRuleForm.remark"></el-input>
            </el-form-item>
            <!-- <el-form-item label="辦公地址" prop="address">
              <el-input
                type="textarea"
                v-model="addRuleForm.address"
              ></el-input>
            </el-form-item> -->
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="add"
            :disabled="btnDisabled"
            :loading="btnLoading"
            >確 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 公司別編輯彈出框 -->
      <el-dialog
        title="編輯公司"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEditDialog"
      >
        <span>
          <el-form
            :model="editRuleForm"
            :rules="addRules"
            ref="editRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="公司類型" prop="typeId">
              <el-select
                v-model="editRuleForm.typeId"
                placeholder="請選擇公司類型"
              >
                <el-option
                  v-for="departmentCategory in departmentCategories"
                  :key="departmentCategory.id"
                  :label="departmentCategory.value"
                  :value="departmentCategory.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司名稱" prop="name">
              <el-input v-model="editRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司簡稱" prop="nickname">
              <el-input v-model="editRuleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="聯絡人姓名" prop="contact">
              <el-input v-model="editRuleForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="聯絡人市話" prop="phone">
              <el-input v-model="editRuleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="聯絡人手機" prop="cellPhone">
              <el-input v-model="editRuleForm.cellPhone"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
              <el-input v-model="editRuleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="備註" prop="remark">
              <el-input
                type="textarea"
                v-model="editRuleForm.remark"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="辦公地址" prop="address">
              <el-input
                type="textarea"
                v-model="addRuleForm.address"
              ></el-input>
            </el-form-item> -->
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="update"
            :disabled="btnDisabled"
            :loading="btnLoading"
            >確 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // const checkPhone = (rule, value, callback) => {
    //     // const phoneReg = /^1[34578]\d{9}$$/;
    //     if (!value) {
    //         return callback(new Error("電話號碼不能為空"));
    //     }
    //     setTimeout(() => {
    //         if (!Number.isInteger(+value)) {
    //             callback(new Error("請輸入數字值"));
    //         } else {
    //             callback();
    //             // if (phoneReg.test(value)) {
    //             //     callback();
    //             // } else {
    //             //     callback(new Error("電話號碼格式不正確"));
    //             // }
    //         }
    //     }, 100);
    // };
    return {
      departmentCategories: [],
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      editDialogVisible: false,
      addDialogVisible: false, //新增彈框是否顯示
      total: 0, //總共多少條數據
      departmentData: [], //表格數據
      queryMap: { pageNum: 1, pageSize: 7, name: "" }, //查詢對象
      addRuleForm: {}, //新增表單數據
      editRuleForm: {}, //修改表單數據
      addRules: {
        typeId: [
          { required: true, message: "請選擇公司類型", trigger: "blur" },
        ],
        name: [{ required: true, message: "請輸入公司名稱", trigger: "blur" }],
        nickname: [
          { required: true, message: "請輸入公司簡稱", trigger: "blur" },
        ],
        contact: [
          { required: true, message: "請輸入聯絡人姓名", trigger: "blur" },
        ],
        cellPhone: [
          { required: true, message: "請輸入聯絡人手機", trigger: "blur" },
        ],
        email: [
          { required: true, message: "請輸入E-mail郵件信箱", trigger: "blur" },
        ],
      }, //新增驗證
    };
  },
  methods: {
    /**
     * 加載公司表格
     */
    downExcel() {
      const $this = this;
      const res = axios
        .request({
          url: "system/department/excel",
          method: "post",
          responseType: "blob",
        })
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
            return $this.$message.error(
              "Subject does not have permission [department:export]"
            );
          }
          const data = res.data;
          let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "公司列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    /**
     * 搜索公司
     */
    search() {
      this.queryMap.pageNum = 1;
      this.getDepartmentList();
    },
    /**
     * 删除公司
     */
    del: async function (id) {
      let res = await this.$confirm(
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
      if ("confirm" === res) {
        const { data: res } = await this.$http.delete(
          "system/department/delete/" + id
        );
        if (res.success) {
          this.$message.success("公司删除成功");
          await this.getDepartmentList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },
    /**
     * 更新用戶
     */
    update: async function () {
      this.$refs.editRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          (this.btnLoading = true), (this.btnDisabled = true);
          const { data: res } = await this.$http.put(
            "system/department/update/" + this.editRuleForm.id,
            this.editRuleForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "公司信息更新",
              type: "success",
            });
            await this.getDepartmentList();
          } else {
            this.$message.error("公司信息更新失敗");
          }
          this.editRuleForm = {};
          this.btnDisabled = false;
          this.btnLoading = false;
          this.editDialogVisible = false;
        }
      });
    },
    /**
     * 編輯
     * @param {Object} id
     */
    edit: async function (id) {
      const { data: res } = await this.$http.get(
        "system/department/edit/" + id
      );
      if (res.success) {
        this.editRuleForm = res.data;
      } else {
        return this.$message.error("公司信息編輯失敗" + res.data.errorMsg);
      }
      this.editDialogVisible = true;
    },
    //新增
    add: function () {
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          (this.btnLoading = true), (this.btnDisabled = true);
          const { data: res } = await this.$http.post(
            "system/department/add",
            this.addRuleForm
          );
          if (res.success) {
            this.$message.success("公司新增成功");
            this.addRuleForm = {};
            await this.getDepartmentList();
          } else {
            return this.$message.error("公司新增失敗:" + res.data.errorMsg);
          }
          this.addDialogVisible = false;
          (this.btnLoading = false), (this.btnDisabled = false);
        }
      });
    },
    //加載公司別列表
    async getDepartmentList() {
      const { data: res } = await this.$http.get(
        "system/department/findDepartmentList",
        {
          params: this.queryMap,
        }
      );
      if (!res.success) {
        return this.$message.error("獲取用戶列表失敗:" + res.data.errorMsg);
      } else {
        this.total = res.data.total;
        this.departmentData = res.data.rows;
      }
    },
    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getDepartmentList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getDepartmentList();
    },
    //關閉彈出框
    closeAddDialog() {
      this.$refs.addRuleFormRef.clearValidate();
      this.addRuleForm = {};
    },
    //關閉彈出框
    closeEditDialog() {
      this.$refs.editRuleFormRef.clearValidate();
      this.editRuleForm = {};
    },
    /**
     * 加載所有公司類別
     */
    async getDepartmentCategory() {
      const { data: res } = await this.$http.get(
        "system/departmentCategory/findAll"
      );
      if (!res.success) {
        return this.$message.error("獲取公司類別失敗:" + res.data.errorMsg);
      }
      this.departmentCategories = res.data;
    },
    /**
     * 禁用啟用公司
     */
    async changeStatus(row) {
      const { data: res } = await this.$http.put(
        "system/department/updateStatus/" + row.id + "/" + row.status
      );
      if (!res.success) {
        this.$message.error("更新公司狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "公司狀態已禁用" : "公司狀態已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    /**
     * 禁用啟用公司
     */
    async changeFood(row) {
      const { data: res } = await this.$http.put(
        "system/department/updateFood/" + row.id + "/" + row.food
      );
      if (!res.success) {
        this.$message.error("更新廚餘標記失敗:" + res.data.errorMsg);
        row.food = !row.food;
      } else {
        const message = row.food ? "增加廚餘標記" : "移除廚餘標記";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
  },
  created() {
    this.getDepartmentList();
    this.getDepartmentCategory();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
