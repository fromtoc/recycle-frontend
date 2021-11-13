<template>
  <div id="category">
    <!-- 面包導航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>廢棄物管理</el-breadcrumb-item>
      <el-breadcrumb-item>廢棄物類型設定</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
          <el-col :span="2">
          <el-button
            size="small"
            v-hasPermission="'productCategory:add'"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="openAdd"
            >新增</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格部分 -->
      <zk-table
        v-loading="loading"
        style="margin-top: 10px"
        ref="table"
        show-index
        :expand-type="false"
        :selection-type="false"
        sum-text="sum"
        index-text="序號"
        :data="categorys"
        :columns="columns"
      >
        <!-- 層級 -->
        <template slot="lev" slot-scope="scope">
          <el-tag v-if="scope.row.lev === 1">一級分類</el-tag>
          <el-tag type="success" v-else-if="scope.row.lev === 2"
            >二級分類</el-tag
          >
          <el-tag type="danger" v-else>三級分類</el-tag>
        </template>
        <template slot="isban" slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
        <!-- 操作 -->
        <template slot="caozuo" slot-scope="scope">
          <el-button
            v-hasPermission="'productCategory:edit'"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row.id)"
          ></el-button>
          <!-- <el-button
            v-hasPermission="'productCategory:delete'"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row.id)"
          ></el-button> -->
        </template>
      </zk-table>
      <!-- 分頁 -->
      <el-pagination
        style="margin-top: 10px"
        background
        :show-header="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-sizes="[5, 10, 15, 20, 25, 30]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 新增彈出框 -->
      <el-dialog
        title="新增廢棄物分類"
        :visible.sync="addDialogVisible"
        @close="addCloseDialog"
        width="50%"
      >
        <span>
          <el-form
            :model="addRuleForm"
            :rules="addRules"
            ref="addRuleFormRef"
            label-width="100px"
          >
            <el-form-item label="分類名稱" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="父分類" prop="pid">
              <el-cascader
                placeholder="請選擇"
                @change="selectParentChange"
                @clear="clearParent"
                :change-on-select="true"
                :options="parentCategorys"
                clearable
                filterable
                style="width: 100%"
                :props="selectProps"
                v-model="pKeys"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="備註" prop="remark">
              <el-input type="textarea" v-model="addRuleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="addRuleForm.sort"
                :min="1"
                :max="10"
                label="排序"
              ></el-input-number>
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
      <!-- 編輯彈出框 -->
      <el-dialog
        title="編輯廢棄物分類"
        :visible.sync="editDialogVisible"
        @close="editCloseDialog"
        width="50%"
      >
        <span>
          <el-form
            :model="editRuleForm"
            :rules="addRules"
            ref="editRuleFormRef"
            label-width="100px"
          >
            <el-form-item label="分類名稱" prop="name">
              <el-input v-model="editRuleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="備註" prop="remark">
              <el-input
                type="textarea"
                v-model="editRuleForm.remark"
              ></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="editRuleForm.sort"
                :min="1"
                :max="10"
                label="排序"
              ></el-input-number>
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
export default {
  data() {
    return {
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      pKeys: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editRuleForm: [],
      addRuleForm: { pid: "0", name: "", remark: "", sort: "" }, //新增表單
      addRules: {
        name: [
          { required: true, message: "請輸入分類名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "長度在 2 到 10 個字符",
            trigger: "blur",
          },
        ],
        remark: [
          { required: true, message: "請輸入備註信息", trigger: "blur" },
        ],
        sort: [{ required: true, message: "請輸入排序號", trigger: "blur" }],
      },
      total: 0,
      queryMap: { pageNum: 1, pageSize: 5 },
      categorys: [],
      parentCategorys: [],
      selectProps: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        children: "children",
      }, //級聯選擇器配置项
      columns: [
        {
          label: "分類名稱",
          prop: "name",
        },
        {
          label: "排序",
          prop: "sort",
        },
        {
          label: "創建時間",
          prop: "createTime",
        },
        {
          label: "修改時間",
          prop: "modifiedTime",
        },
        {
          label: "備註",
          prop: "remark",
        },
        {
          label: "層級",
          prop: "lev",
          type: "template",
          template: "lev",
        },
        {
          label: "停用",
          prop: "isban",
          type: "template",
          template: "isban",
        },
        {
          label: "操作",
          type: "template",
          template: "caozuo",
        },
      ],
    };
  },
  methods: {
    update: async function () {
      this.$refs.editRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          const { data: res } = await this.$http.put(
            "business/productCategory/update/" + this.editRuleForm.id,
            this.editRuleForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "分類信息更新",
              type: "success",
            });
            await this.getCategoryList();
          } else {
            this.$message.error("分類信息更新失敗:" + res.data.errorMsg);
          }
          this.btnLoading = false;
          this.btnDisabled = false;
          this.editDialogVisible = false;
        }
      });
    },
    //修改
    async edit(id) {
      const { data: res } = await this.$http.get(
        "business/productCategory/edit/" + id
      );
      if (res.success) {
        this.editRuleForm = res.data;
      } else {
        return this.$message.error("分類信息編輯失敗" + res.data.errorMsg);
      }
      this.editDialogVisible = true;
    },
    //删除分類
    async del(id) {
      const res = await this.$confirm(
        "此操作將永久删除該分類, 是否繼續?",
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
          "business/productCategory/delete/" + id
        );
        console.log(res);
        if (res.success) {
          this.$message.success("分類删除成功");
          await this.getCategoryList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },

    //父級分類中改變
    selectParentChange() {
      const len = this.pKeys.length;
      if (len > 0) {
        this.addRuleForm.pid = this.pKeys[len - 1];
      } else {
        this.addRuleForm.pid = 0;
      }
    },
    //加載分類數據
    async getCategoryList() {
      const { data: res } = await this.$http.get(
        "business/productCategory/categoryTree",
        {
          params: this.queryMap,
        }
      );
      if (!res.success) return this.$message.error("分類列表失敗");
      this.categorys = res.data.rows;
      this.total = res.data.total;
    },
    //加載父級分類數據
    async getParentCategoryList() {
      const { data: res } = await this.$http.get(
        "business/productCategory/getParentCategoryTree"
      );
      if (!res.success)
        return this.$message.error("父級分類列表失敗:" + res.data.errorMsg);
      this.parentCategorys = res.data;
    },
    //新增分類
    async add() {
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          if (this.addRuleForm.pid == null) {
            this.addRuleForm.pid = 0;
          }
          const { data: res } = await this.$http.post(
            "business/productCategory/add",
            this.addRuleForm
          );
          if (res.success) {
            this.$message.success("分類新增成功");
            await this.getCategoryList();
          } else {
            return this.$message.error("分類新增失敗:" + res.data.errorMsg);
          }
          this.addDialogVisible = false;
          this.btnLoading = false;
          this.btnDisabled = false;
        }
      });
    },
    /**
     * 禁用啟用廢棄物類型
     */
    async changeStatus(row) {
      const { data: res } = await this.$http.put(
        "business/productCategory/updateStatus/" + row.id + "/" + row.status
      );
      if (!res.success) {
        this.$message.error("更新廢棄物類型狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status
          ? "廢棄物類型狀態已禁用"
          : "廢棄物類型狀態已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getCategoryList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getCategoryList();
    },
    //打開新增
    openAdd() {
      this.addDialogVisible = true;
      this.getParentCategoryList();
    },
    //關閉彈出框
    addCloseDialog() {
      this.$refs.addRuleFormRef.clearValidate();
      this.addRuleForm = {};
      this.pKeys = [];
    },
    editCloseDialog() {
      this.$refs.editRuleFormRef.clearValidate();
      this.editRuleForm = {};
    },
    clearParent() {
      this.addRuleForm.pid = "";
    },
  },
  created() {
    this.getCategoryList();

    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
