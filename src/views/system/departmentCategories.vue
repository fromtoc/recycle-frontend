<template>
  <div id="departmentCategory">
    <!-- 面包導航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>一般設定</el-breadcrumb-item>
      <el-breadcrumb-item>公司類型設定</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右側卡片區域 -->
    <!-- 公司類型卡片區 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            size="small"
            clearable
            v-model="queryMap.code"
            placeholder="請輸入公司類型代碼查詢"
            @clear="search"
            class="input-with-select"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            size="small"
            clearable
            v-model="queryMap.value"
            placeholder="請輸入公司類型名稱查詢"
            @clear="search"
            class="input-with-select"
          >
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search"
            >查詢</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            size="small"
            v-hasPermission="'departmentCategory:add'"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="addDialogVisible = true"
            >新增</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            size="small"
            icon="el-icon-download"
            v-hasPermission="'departmentCategory:export'"
            @click="downExcel"
            >下載</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格區域 -->
      <template>
        <el-table
          border
          size="small"
          v-loading="loading"
          stripe
          :data="departmentCategoryData"
          style="width: 100%; margin-top: 20px"
          height="460"
          empty-text="暫無數據"
        >
          <el-table-column label="序號" type="index" width="50"></el-table-column>
          <el-table-column
            prop="code"
            label="公司類型代碼"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="value"
            label="公司類型名稱"
            width="180"
          ></el-table-column>
          <el-table-column prop="isban" label="停用" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="changeStatus(scope.row)"
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
                @click="edit(scope.row.id)"
                >編輯</el-button
              >

              <!-- <el-button
                                    v-hasPermission="'departmentCategory:delete'"
                                    type="text"
                                    size="small"
                                    icon="el-icon-delete"
                                    @click="del(scope.row.id)"
                            >删除</el-button> -->
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
      <!-- 公司類型新增彈出框 -->
      <el-dialog
        title="新增公司類型"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="closeAddDialog"
      >
        <span>
          <el-form
            :model="addRuleForm"
            :rules="addRules"
            ref="addRuleFormRef"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="公司類型代碼" prop="code">
              <el-input v-model="addRuleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="公司類型名稱" prop="value">
              <el-input v-model="addRuleForm.value"></el-input>
            </el-form-item>
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

      <!-- 公司類型編輯彈出框 -->
      <el-dialog
        title="編輯公司類型"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEditDialog"
      >
        <span>
          <el-form
            :model="editRuleForm"
            :rules="addRules"
            ref="editRuleFormRef"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="公司類型代碼" prop="code">
              <el-input v-model="editRuleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="公司類型名稱" prop="value">
              <el-input v-model="editRuleForm.value"></el-input>
            </el-form-item>
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
    return {
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      editDialogVisible: false,
      addDialogVisible: false, //新增彈框是否顯示
      total: 0, //總共多少條數據
      departmentCategoryData: [], //表格數據
      queryMap: { pageNum: 1, pageSize: 7, code: "", value: "" }, //查詢對象
      addRuleForm: {}, //新增表單數據
      editRuleForm: {}, //修改表單數據
      addRules: {
        code: [
          { required: true, message: "請輸入公司類型代碼", trigger: "blur" },
          // { min: 3, max: 10, message: "長度在 3 到 10 個字符", trigger: "blur" }
        ],
        value: [
          { required: true, message: "請輸入公司類型名稱", trigger: "blur" },
          // { min: 4, max: 12, message: "長度在 4 到 12 個字符", trigger: "blur" }
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
          url: "system/departmentCategory/excel",
          method: "post",
          responseType: "blob",
        })
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
            return $this.$message.error(
              "Subject does not have permission [departmentCategory:export]"
            );
          }
          const data = res.data;
          let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "公司類型列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    /**
     * 搜索公司類型
     */
    search() {
      this.queryMap.pageNum = 1;
      this.getDepartmentCategoryList();
    },
    /**
     * 删除公司類型
     */
    del: async function (id) {
      let res = await this.$confirm(
        "此操作將永久删除該類型, 是否繼續?",
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
          "system/departmentCategory/delete/" + id
        );
        if (res.success) {
          this.$message.success("公司類型删除成功");
          await this.getDepartmentCategoryList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },
    /**
     * 更新用戶類型
     */
    update: async function () {
      this.$refs.editRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          (this.btnLoading = true), (this.btnDisabled = true);
          const { data: res } = await this.$http.put(
            "system/departmentCategory/update/" + this.editRuleForm.id,
            this.editRuleForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "公司類型更新",
              type: "success",
            });
            await this.getDepartmentCategoryList();
          } else {
            this.$message.error("公司類型更新失敗");
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
        "system/departmentCategory/edit/" + id
      );
      if (res.success) {
        this.editRuleForm = res.data;
      } else {
        return this.$message.error("公司類型編輯失敗" + res.data.errorMsg);
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
            "system/departmentCategory/add",
            this.addRuleForm
          );
          if (res.success) {
            this.$message.success("公司類型新增成功");
            this.addRuleForm = {};
            await this.getDepartmentCategoryList();
          } else {
            return this.$message.error("公司類型新增失敗:" + res.data.errorMsg);
          }
          this.addDialogVisible = false;
          (this.btnLoading = false), (this.btnDisabled = false);
        }
      });
    },
    //加載公司類型列表
    async getDepartmentCategoryList() {
      const { data: res } = await this.$http.get(
        "system/departmentCategory/findByPage",
        {
          params: this.queryMap,
        }
      );
      if (!res.success) {
        return this.$message.error("獲取公司類型失敗:" + res.data.errorMsg);
      } else {
        this.total = res.data.total;
        this.departmentCategoryData = res.data.rows;
      }
    },
    /**
     * 禁用啟用公司類型
     */
    async changeStatus(row) {
      const { data: res } = await this.$http.put(
        "system/departmentCategory/updateStatus/" + row.id + "/" + row.status
      );
      if (!res.success) {
        this.$message.error("更新公司類型狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "公司類型狀態已禁用" : "公司類型狀態已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getDepartmentCategoryList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getDepartmentCategoryList();
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
  },
  created() {
    this.getDepartmentCategoryList();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
