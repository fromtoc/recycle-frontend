<template>
  <div id="roles">
    <!-- 面包導航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>權限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色權限</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片主體 -->
    <el-card class="box-card">
      <!-- 上面工具欄 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            clearable
            size="small"
            placeholder="請輸入角色名查詢"
            v-model="queryMap.roleName"
            class="input-with-select"
            @clear="getRoleList"
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
            v-hasPermission="'role:add'"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="addDialogVisible = true"
            >新增</el-button
          >
          <el-button
            size="small"
            v-hasPermission="'role:export'"
            icon="el-icon-download"
            @click="downExcel"
            >下載</el-button
          >
        </div>
      </el-row>
      <!-- 表格區域 -->
      <template>
        <el-table
          empty-text="暫無數據"
          v-loading="loading"
          :data="roleData"
          border
          style="width: 100%; margin-top: 20px"
          height="470"
          size="small"
        >
          <!-- <el-table-column prop="id" label="序號" width="180"></el-table-column> -->
          <el-table-column label="序號" type="index" width="50">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名稱"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="modifiedTime"
            label="最後修改時間"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="type"
            :formatter="showSex"
            label="資料權限"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag size="small" type="warning" v-if="scope.row.type == 1"
                >限本帳號</el-tag
              >
              <el-tag size="small" type="success" v-else>所有資料</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="備註"></el-table-column>
          <el-table-column prop="isban" label="停用" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="changRoleStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="grant(scope.row.id)"
                type="text"
                icon="el-icon-present"
                size="small"
                >授權</el-button
              >
              <el-button
                @click="edit(scope.row.id)"
                v-hasPermission="'role:edit'"
                type="text"
                icon="el-icon-edit"
                size="small"
                >編輯</el-button
              >
              <!-- <el-button
                                    v-hasPermission="'role:delete'"
                                    @click="del(scope.row.id)"
                                    type="text"
                                    icon="el-icon-delete"
                                    size="small"
                            >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分頁部分 -->
      <el-pagination
        background
        style="margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryMap.pageNum"
        :page-sizes="[7, 10, 15, 20]"
        :page-size="queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 新增彈框 -->
      <el-dialog
        title="新增角色權限"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="closeAdd"
      >
        <el-form
          ref="addFormRef"
          :model="addForm"
          label-width="80px"
          :rules="addFormRoles"
        >
          <el-form-item label="角色名稱" prop="roleName">
            <el-input v-model="addForm.roleName"></el-input>
          </el-form-item>
          <div class="grid-content bg-purple-light">
            <el-form-item label="資料權限" prop="type">
              <el-radio-group v-model="addForm.type">
                <el-radio :label="0">所有資料</el-radio>
                <el-radio :label="1">限本帳號</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="描述信息" prop="remark">
            <el-input type="textarea" v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addRole"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 編輯彈框 -->
      <el-dialog
        title="編輯角色權限"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEdit"
      >
        <el-form
          ref="editFormRef"
          :model="editForm"
          label-width="80px"
          :rules="addFormRoles"
        >
          <el-form-item label="角色名稱" prop="roleName">
            <el-input v-model="editForm.roleName"></el-input>
          </el-form-item>
          <div class="grid-content bg-purple-light">
            <el-form-item label="資料權限" prop="type">
              <el-radio-group v-model="editForm.type">
                <el-radio :label="0">所有資料</el-radio>
                <el-radio :label="1">限本帳號</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-form-item label="描述信息" prop="remark">
            <el-input type="textarea" v-model="editForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="updateRole"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >確 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 角色授權彈出框 -->
      <el-dialog
        title="分配選單權限"
        :visible.sync="grantDialogVisible"
        width="38%"
      >
        <span>
          <el-tree
            :auto-expand-parent="false"
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="open"
            :props="defaultProps"
            ref="tree"
            highlight-current
            @check-change="checkChange"
          ></el-tree>
          <!-- check-strictly -->
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="grantDialogVisible = false">取 消</el-button>
          <el-button
            v-hasPermission="'role:authority'"
            type="primary"
            icon="el-icon-setting"
            @click="authority"
            :loading="btnLoading"
            :disabled="btnDisabled"
            >授 權</el-button
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
      total: 0,
      queryMap: { roleName: "", pageNum: 1, pageSize: 8 }, //查詢條件
      roleData: [], //角色表格數據
      addForm: { type: 0 }, //新增數據
      editForm: {}, //編輯數據
      addDialogVisible: false, //新增彈框的顯示
      editDialogVisible: false, //編輯彈框
      grantDialogVisible: false, //授權彈出框
      data: [],
      open: [], //展開
      grantId: "",
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      addFormRoles: {
        roleName: [
          { required: true, message: "請輸入角色名稱", trigger: "blur" },
        ],
        type: [{ required: true, message: "請選擇資料權限", trigger: "blur" }],
      }, //新增驗證規則
    };
  },
  methods: {
    checkChange(a, b, c) {
      const anode = this.$refs.tree.getNode(a);
      !anode.checked ? this.findchildren(anode.parent) : "";
    },
    findchildren(current) {
      const fnode = this.$refs.tree.getNode(current);
      if (!fnode.isLeaf) {
        fnode.indeterminate = true;
        fnode.checked = true;
      }
    },
    /**
     * 加載選單表格
     */
    downExcel() {
      const $this = this;
      const res = axios
        .request({
          url: "system/role/excel",
          method: "post",
          responseType: "blob",
        })
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
            return $this.$message.error(
              "Subject does not have permission [role:export]"
            );
          }
          const data = res.data;
          let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "角色列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },

    //獲取選中的節點
    async authority() {
      this.btnDisabled = true;
      this.btnLoading = true;
      const { data: res } = await this.$http.post(
        "system/role/authority/" + this.grantId,
        [].concat(
          this.$refs.tree.getCheckedKeys(),
          this.$refs.tree.getHalfCheckedKeys()
        )
      );
      if (res.success) {
        this.$message.success("角色授權成功");
      } else {
        this.$message.error("角色授權失敗:" + res.data.errorMsg);
      }
      this.btnDisabled = false;
      this.btnLoading = false;
      this.grantDialogVisible = false;
    },

    //用戶授權
    async grant(id) {
      //加載所有選單以及用戶擁有的選單權限id
      const { data: res } = await this.$http.get(
        "system/role/findRoleMenu/" + id
      );
      if (res.success) {
        //默認選中的樹的數據
        let that = this;
        setTimeout(function () {
          res.data.mids.forEach((value) => {
            that.$refs.tree.setChecked(value, true, false);
          });
        }, 100);
        this.data = res.data.tree;
        this.open = res.data.open;
        this.grantId = id; //需要授權的id
      }
      this.grantDialogVisible = true;
    },
    //加載用戶列表
    async getRoleList() {
      const { data: res } = await this.$http.get("system/role/findRoleList", {
        params: this.queryMap,
      });
      if (res.success) {
        this.roleData = res.data.rows;
        this.total = res.data.total;
      }
    },
    //搜索
    search() {
      this.queryMap.pageNum = 1;
      this.getRoleList();
    },
    //關閉新增彈框
    closeAdd() {
      this.$refs.addFormRef.clearValidate();
      this.addForm = { type: 0 };
    },
    closeEdit() {
      this.$refs.editFormRef.clearValidate();
      this.editForm = {};
    },
    //新增
    async addRole() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          const { data: res } = await this.$http.post(
            "system/role/add",
            this.addForm
          );
          if (res.success) {
            this.$message.success("新增成功");
            this.addDialogVisible = false;
            this.btnDisabled = false;
            this.btnLoading = false;
            this.addForm = {};
            await this.getRoleList();
          } else {
            return this.$message.error("角色新增失敗:" + res.data.errorMsg);
          }
        }
      });
    },
    //編輯
    async edit(id) {
      const { data: res } = await this.$http.get("system/role/edit/" + id);
      if (res.success) {
        this.editForm = res.data;
        this.editDialogVisible = true;
      } else {
        return this.$message.error("角色編輯失敗:" + res.data.errorMsg);
      }
    },
    //更新用戶
    async updateRole() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          const { data: res } = await this.$http.put(
            "system/role/update/" + this.editForm.id,
            this.editForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "角色信息更新",
              type: "success",
            });
            await this.getRoleList();
          } else {
            this.$message.error("角色信息更新失敗:" + res.data.errorMsg);
          }

          this.editDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
          this.editForm = {};
        }
      });
    },
    //删除
    async del(id) {
      var res = await this.$confirm(
        "此操作將永久删除該角色, 是否繼續?",
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
          "system/role/delete/" + id
        );
        console.log(res);
        if (res.success) {
          this.$message.success("删除成功");
          await this.getRoleList();
        } else {
          this.$message.error("删除失敗:" + res.data.errorMsg);
        }
      }
    },
    //改變用戶禁用狀態
    async changRoleStatus(row) {
      const { data: res } = await this.$http.put(
        "system/role/updateStatus/" + row.id + "/" + row.status
      );

      if (!res.success) {
        this.$message.error("更新角色狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "角色狀態已禁用" : "角色狀態已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getRoleList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getRoleList();
    },
  },
  created() {
    this.getRoleList();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
