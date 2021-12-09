<template>
  <div id="users">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>秤重管理</el-breadcrumb-item>
      <el-breadcrumb-item>秤重明細維護</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 秤重明細列表卡片區 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        ref="form"
        :model="queryMap"
        label-width="70px"
        size="small"
      >
        <el-form-item v-if="!limitUser" label="">
          <el-select
            no-data-text="無數據"
            clearable
            @change="searchWeight"
            @clear="searchWeight"
            v-model="queryMap.departmentId"
            placeholder="請選擇公司查詢"
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
        <el-form-item v-if="!limitUser" label="">
          <el-input
            @keyup.enter.native="searchWeight"
            @clear="searchWeight"
            clearable
            v-model="queryMap.userNickname"
            placeholder="請輸入用戶名稱查詢"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            clearable
            @clear="searchWeight"
            v-model="queryMap.productName"
            placeholder="請輸入廢棄物名稱查詢"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="">
          <el-date-picker
            v-model="range"
            type="datetimerange"
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="结束日期"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
          >
          </el-date-picker>
          <el-button
            style="margin-left: 20px"
            type="primary"
            @click="searchWeight"
            icon="el-icon-search"
            >查詢</el-button
          >
          <!-- <el-button @click="reset" icon="el-icon-refresh">重置</el-button> -->
        </el-form-item>

        <el-form-item style="float: right">
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
            v-hasPermission="'weight:add'"
            >新增</el-button
          >
          <el-button
            @click="downExcel"
            v-hasPermission="'weight:export'"
            icon="el-icon-download"
            >下載</el-button
          >
          <span>
            <span style="margin-left: 20px; margin-right: 5px">顯示作廢</span>
            <el-switch v-model="showWeightStop"></el-switch></span
        ></el-form-item>
      </el-form>

      <!-- 表格區域 -->
      <el-table
        empty-text="暫無數據"
        v-loading="loading"
        size="small"
        :data="weightListFilter"
        border
        style="width: 100%"
        height="420"
      >
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <el-table-column label="序號" prop="id" width="100"></el-table-column>
        <el-table-column
          prop="departmentName"
          label="公司名稱"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="userNickname"
          label="用戶名稱"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="cardName"
          label="登入卡號"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="productName"
          label="廢棄物名稱"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="totalWeight"
          label="總重"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="deductWeight"
          label="扣重"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="netWeight"
          label="淨重"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column prop="isban" label="作廢" width="100">
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
              v-if="scope.row.status == false"
              v-hasPermission="'weight:edit'"
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="edit(scope.row.id)"
              >編輯</el-button
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
        :current-page="this.queryMap.pageNum"
        :page-sizes="[6, 10, 15, 20]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 新增對話框 -->
      <el-dialog
        title="新增秤重明細"
        @close="closeDialog"
        :visible.sync="addDialogVisible"
        width="60%;"
      >
        <!-- 表單 -->
        <span>
          <el-form
            :model="addForm"
            :label-position="labelPosition"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="100px"
          >
            <el-form-item label="登入卡號" prop="cardName">
              <el-input v-model="addForm.cardName"></el-input>
            </el-form-item>
            <el-form-item label="廢棄物名稱" prop="productName">
              <el-input v-model="addForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="總重" prop="totalWeight">
              <el-input type="number" v-model="addForm.totalWeight"></el-input>
            </el-form-item>
            <el-form-item label="扣重" prop="deductWeight">
              <el-input type="number" v-model="addForm.deductWeight"></el-input>
            </el-form-item>
            <el-form-item label="淨重" prop="netWeight">
              <el-input disabled type="number" v-model="netWeight"></el-input>
            </el-form-item>
          </el-form>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addWeight"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 修改對話框 -->
      <el-dialog
        title="編輯秤重明細"
        :visible.sync="editDialogVisible"
        width="60%"
        @close="editClose"
      >
        <span>
          <el-form
            :model="editForm"
            :label-position="labelPosition"
            :rules="addFormRules"
            ref="editFormRef"
            label-width="100px"
          >
            <el-form-item label="登入卡號" prop="cardName">
              <el-input disabled v-model="editForm.cardName"></el-input>
            </el-form-item>
            <el-form-item label="廢棄物名稱" prop="productName">
              <el-input disabled v-model="editForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="總重" prop="totalWeight">
              <el-input type="number" v-model="editForm.totalWeight"></el-input>
            </el-form-item>
            <el-form-item label="扣重" prop="deductWeight">
              <el-input
                type="number"
                v-model="editForm.deductWeight"
              ></el-input>
            </el-form-item>
            <el-form-item label="淨重" prop="editNetWeight">
              <el-input
                disabled
                type="number"
                v-model="editNetWeight"
              ></el-input>
            </el-form-item>
          </el-form>
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="updateWeight"
            :loading="btnLoading"
            :disabled="btnDisabled"
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
      limitUser: false,
      range: [],
      showWeightStop: false,
      regions: [],
      btnLoading: false,
      btnDisabled: false,
      departments: [],
      loading: true,
      total: 0,
      addDialogVisible: false, //新增對話框,
      editDialogVisible: false, //修改對話框
      labelPosition: "right", //lable對齊方式
      //查詢對象
      queryMap: {
        pageNum: 1,
        pageSize: 6,
      },
      weightList: [],

      addForm: {}, //新增表單
      editForm: {}, //更新表單
      addCardUserId: "",
      addCardId: "",
      changePasswordUserId: "",
      newPassword: "",
      addFormRules: {
        cardName: [
          { required: true, message: "請輸入登入卡號", trigger: "blur" },
        ],
        productName: [
          { required: true, message: "請輸入廢棄物名稱", trigger: "blur" },
        ],
        totalWeight: [
          { required: true, message: "請輸入總重", trigger: "blur" },
        ],
        deductWeight: [
          { required: true, message: "請輸入扣重", trigger: "blur" },
        ],
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
    weightListFilter: function () {
      if (!this.showWeightStop) {
        return this.weightList.filter((item) => item.status !== true);
      }
      return this.weightList.filter((item) => item.status == true);
    },
    netWeight: function () {
      return this.count(this.addForm.totalWeight, this.addForm.deductWeight);
    },
    editNetWeight: function () {
      return this.count(this.editForm.totalWeight, this.editForm.deductWeight);
    },
  },
  methods: {
    /**
     * 重置
     */
    reset() {
      this.range = [];
      this.queryMap = {
        pageNum: 1,
        pageSize: 6,
      };
    },
    /**
     * 加載用戶表格
     */
    downExcel() {
      const $this = this;
      const res = axios
        .request({
          url: "business/weight/excel",
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
          a.download = "秤重明細列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    /**
     * 加載秤重明細列表
     */
    async getWeightList() {
      if (this.range != null && this.range.length === 1) {
        this.queryMap.createTimeStart = this.range[0];
      } else if (this.range != null && this.range.length === 2) {
        this.queryMap.createTimeStart = this.range[0];
        this.queryMap.createTimeEnd = this.range[1];
      }
      const { data: res } = await this.$http.get(
        "business/weight/findWeightList",
        {
          params: this.queryMap,
        }
      );
      if (!res.success) {
        return this.$message.error("獲取秤重明細列表失敗:" + res.data.errorMsg);
      }
      this.total = res.data.total;
      this.weightList = res.data.rows;
    },

    /**
     * 新增秤重明細
     */
    async addWeight() {
      this.addForm.netWeight = this.netWeight;
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          const { data: res } = await this.$http.post(
            "business/weight/addVO",
            this.addForm
          );
          if (res.success) {
            this.$notify.success({
              title: "操作成功",
              message: "秤重明細新增成功",
            });
            this.addForm = {};
            await this.getWeightList();
            await this.getDepartmets();
          } else {
            this.btnLoading = false;
            this.btnDisabled = false;
            return this.$message.error("秤重明細新增失敗:" + res.data.errorMsg);
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
    async updateWeight() {
      this.editForm.netWeight = this.editNetWeight;
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          const { data: res } = await this.$http.put(
            "business/weight/update/" + this.editForm.id,
            this.editForm
          );
          if (res.success) {
            this.$notify({
              title: "操作成功",
              message: "秤重明細已更新",
              type: "success",
            });
            this.editForm = {};
            await this.getWeightList();
            await this.getDepartmets();
          } else {
            this.$message.error("秤重明細更新失敗:" + res.data.errorMsg);
          }
          this.editDialogVisible = false;
          this.btnLoading = false;
          this.btnDisabled = false;
        }
      });
    },
    /**
     * 搜索秤重明細
     */
    searchWeight() {
      this.queryMap.pageNum = 1;
      this.getWeightList();
    },
    /**
     * 修改秤重明細
     */
    async edit(id) {
      const { data: res } = await this.$http.get("business/weight/edit/" + id);
      if (res.success) {
        this.editForm = res.data;
        this.editDialogVisible = true;
      } else {
        return this.$message.error("秤重明細編輯失敗:" + res.data.errorMsg);
      }
    },
    /**
     *  改變頁碼
     */
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getWeightList();
    },
    /**
     * 翻頁
     */
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getWeightList();
    },

    /**
     * 關閉新增彈出框
     */
    closeDialog() {
      this.$refs.addFormRef.clearValidate();
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
    async changeStatus(row) {
      const { data: res } = await this.$http.put(
        "business/weight/updateStatus/" + row.id + "/" + row.status
      );
      if (!res.success) {
        this.$message.error("作廢秤重明細失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "秤重明細已作廢" : "秤重明細已啟用";
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
  },
  created() {
    this.getWeightList();
    this.getDepartmets();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
