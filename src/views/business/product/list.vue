<template>
  <div id="productCategroys">
    <!-- 面包導航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>廢棄物管理</el-breadcrumb-item>
      <el-breadcrumb-item>廢棄物資料</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右側卡片區域 -->
    <el-card class="box-card">
      <!-- <el-container style="margin-bottom: 20px">
        <el-alert
          show-icon
          title="友情提示:  廢棄物的分類只支持二級分類"
          type="warning"
        >
        </el-alert>
      </el-container> -->
      <el-row :gutter="6">
        <el-col :span="4">
          <el-cascader
            size="small"
            placeholder="請選擇分類查詢"
            :change-on-select="true"
            @change="selectChange"
            v-model="categorykeys"
            :props="searchSelectProps"
            :options="cateories"
            clearable
          ></el-cascader>
        </el-col>
        <el-col :span="5">
          <el-input
            clearable
            size="small"
            v-model="queryMap.name"
            placeholder="請輸入廢棄物名稱查詢"
            @clear="search"
            class="input-with-select"
          ></el-input>
        </el-col>
        <!-- <el-col :span="5">
                    <template>
                        <el-select size="small" v-model="queryMap.status" @click="search" placeholder="請選擇狀態">
                            <el-option label="正常" :value="0"></el-option>
                            <el-option label="回收站" :value="1"></el-option>
                            <el-option label="待审核" :value="2"></el-option>
                        </el-select>
                    </template>
                </el-col> -->
        <el-col :span="15">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search"
            >查詢</el-button
          >
          <el-button
            size="small"
            icon="el-icon-refresh-right"
            @click="resetForm"
            >重置</el-button
          >
          <!-- <el-button size="small" icon="el-icon-refresh" @click="getproductList"
            >刷新</el-button
          > -->
          <!-- <el-button
            style="float: right"
            size="small"
            icon="el-icon-money"
            type="info"
            @click="costCenterDialogVisible = true"
            :disabled="this.sels.length === 0"
            >成本中心分配</el-button
          > -->
          <div style="float: right">
            <span style="margin-right: 5px">顯示停用</span>
            <el-switch v-model="showProductStop"></el-switch>
          </div>
          <router-link
            v-hasPermission="'product:price'"
            style="float: right; margin-right: 20px"
            to="/business/product/price"
          >
            <el-button size="small" icon="el-icon-price-tag" type="danger"
              >單價維護</el-button
            ></router-link
          >
          <el-button
            style="float: right; margin-right: 20px"
            size="small"
            icon="el-icon-download"
            v-hasPermission="'product:export'"
            @click="downExcel"
            >下載</el-button
          >
          <el-button
            style="float: right; margin-right: 20px"
            size="small"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="openAdd"
            v-hasPermission="'product:add'"
            >新增
          </el-button>
        </el-col>
      </el-row>

      <!-- 表格區域 -->
      <template>
        <el-table
          empty-text="暫無數據"
          size="mini"
          v-loading="loading"
          border
          stripe
          :data="productData"
          style="width: 100%; margin-top: 20px"
          height="400"
        >
          <el-table-column
            label="序號"
            type="index"
            :index="getIndex"
            width="50"
          ></el-table-column>

          <!-- <el-table-column prop="imageUrl" label="圖片" align="center" width="150px" padding="0px"> -->
          <!--            <template slot-scope="scope">-->
          <!--              <img-->
          <!--                slot="error"-->
          <!--                :src="'https://www.zykhome.club/'+scope.row.imageUrl"-->
          <!--                alt-->
          <!--                style="width: 55px;height:55px"-->
          <!--              />-->
          <!--            </template>-->
          <!-- <template slot-scope="scope">
                            <el-popover placement="right" trigger="hover">
                                <img :src="'https://www.zykhome.club/'+scope.row.imageUrl"
                                     style="height: 200px;width: 200px"/>
                                <img slot="reference" :src="'https://www.zykhome.club/'+scope.row.imageUrl"
                                     :alt="scope.row.imgUrl" style="height: 38px;width: 38px;cursor: pointer">
                            </el-popover>
                        </template>
                    </el-table-column> -->
          <el-table-column
            prop="oneCategoryName"
            label="廢棄物大分類"
          ></el-table-column>
          <el-table-column
            prop="twoCategoryName"
            label="廢棄物小分類"
          ></el-table-column>
          <el-table-column prop="name" label="廢棄物名稱"></el-table-column>
          <!-- <el-table-column prop="modelName" label="成本中心"></el-table-column> -->

          <!-- <el-table-column prop="pnum" :show-overflow-tooltip='true' label="廢棄物編號"></el-table-column> -->
          <!-- <el-table-column label="單價" width="100">
            <template slot-scope="scope">
              <el-tag
                type="success"
                size="mini"
                closable
                v-text="scope.row.model"
              ></el-tag>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="sort"
            label="排序"
            width="80"
          ></el-table-column>
          <!-- <el-table-column prop="remark" label="備註"></el-table-column> -->
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
              <!--              给操作员提供的編輯和回收-->
              <span v-if="scope.row.status == 0">
                <el-button
                  v-hasPermission="'product:edit'"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                  @click="edit(scope.row.id)"
                  >編輯</el-button
                >
              </span>

              <!--          给管理员提供的审核和不通過-->
              <!-- <span v-if="scope.row.status == 2">
                <el-button
                  style="margin-left: 10px"
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  @click="del(scope.row.id)"
                  >删除</el-button
                >
              </span> -->
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
      <!-- 廢棄物新增彈出框 -->
      <el-dialog
        title="新增廢棄物"
        :visible.sync="addDialogVisible"
        width="50%"
      >
        <span>
          <el-form
            size="mini"
            :model="addRuleForm"
            :rules="addRules"
            ref="addRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-form-item label="廢棄物圖片" prop="name"> -->
            <!-- 圖片上傳部分 -->
            <!-- <el-upload
                      :action="uploadApi"
                      :class="{ disabled: uploadDisabled }"
                      list-type="picture-card"
                      :limit="limitCount"
                      :on-change="handleChange"
                      :on-remove="handleRemove"
                      accept="image/*"
                      :on-success="handleSuccess"
                      :headers="headerObject"
                      ref="upload"
                      :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item> -->
            <el-row>
              <!-- <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="單價" prop="model">
                    <el-input v-model="addRuleForm.model"></el-input>
                  </el-form-item>
                </div>
              </el-col> -->
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="廢棄物分類" prop="categoryKeys">
                    <el-cascader
                      placeholder="請選擇"
                      :options="cateories"
                      clearable
                      filterable
                      :props="selectProps"
                      v-model="addRuleForm.categoryKeys"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="廢棄物名稱" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <!-- <el-row> -->
            <!-- <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="單位" prop="unit">
                    <el-input v-model="addRuleForm.unit"></el-input>
                  </el-form-item>
                </div>
              </el-col> -->
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="排序" prop="sort">
                    <el-input-number
                      v-model="addRuleForm.sort"
                      :min="1"
                      :max="1000"
                      label="排序"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </el-col>
            <!-- </el-row> -->

            <!-- <el-form-item label="備註信息" prop="remark">
              <el-input type="textarea" v-model="addRuleForm.remark"></el-input>
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

      <!-- 廢棄物編輯彈出框 -->
      <el-dialog
        title="編輯廢棄物"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEditDialog"
      >
        <span>
          <el-form
            size="mini"
            :model="editRuleForm"
            :rules="addRules"
            ref="editRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-form-item label="廢棄物圖片" prop="name"> -->
            <!-- 圖片上傳部分 -->
            <!-- <el-upload
                      :action="uploadApi"
                      :class="{ disabled: uploadDisabled }"
                      list-type="picture-card"
                      :limit="limitCount"
                      accept="image/*"
                      :on-success="editHandleSuccess"
                      :headers="headerObject"
                      ref="upload2"
                      :on-preview="handlePictureCardPreview"
                      :file-list="imgFilesList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item> -->
            <el-row>
              <!-- <el-col :span="12">
                <el-form-item label="單價" prop="model">
                  <el-input v-model="editRuleForm.model"></el-input>
                </el-form-item>
              </el-col> -->

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="廢棄物分類" prop="categoryKeys">
                    <el-cascader
                      placeholder="請選擇"
                      :options="cateories"
                      clearable
                      filterable
                      :props="selectProps"
                      v-model="editRuleForm.categoryKeys"
                    ></el-cascader>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="廢棄物名稱" prop="name">
              <el-input v-model="editRuleForm.name"></el-input>
            </el-form-item>
            <el-row>
              <!-- <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="單位" prop="unit">
                    <el-input v-model="editRuleForm.unit"></el-input>
                  </el-form-item>
                </div>
              </el-col> -->
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="排序" prop="sort">
                    <el-input-number
                      v-model="editRuleForm.sort"
                      :min="1"
                      :max="1000"
                      label="排序"
                    ></el-input-number>
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
            @click="update"
            :disabled="btnDisabled"
            :loading="btnLoading"
            >確 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 成本中心分配彈出框 -->
      <el-dialog
        title="成本中心分配"
        :visible.sync="costCenterDialogVisible"
        width="50%"
        @close="closeAddDialog"
      >
        <el-select v-model="costCenterId" placeholder="請選擇成本中心">
          <el-option
            v-for="costCenter in costCenters"
            :label="costCenter.value"
            :key="costCenter.id"
            :value="costCenter.id"
          >
            <span style="float: left">{{ costCenter.value }}</span>
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="costCenterDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="assignCostCenter()"
            >確 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 圖片预覽 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showProductStop: false,
      // sels: [], //選中的值顯示
      costCenters: [],
      costCenterId: "",
      uploadApi: this.BASE_API_URL + "system/upload/image",
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      headerObject: {
        Authorization: LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN),
      }, //圖片上傳請求頭
      cateories: [], //類別選擇
      selectProps: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: false,
      }, //級聯選擇器配置项
      searchSelectProps: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true,
      }, //級聯搜索選擇器配置项

      editDialogVisible: false,
      addDialogVisible: false, //新增彈框是否顯示
      costCenterDialogVisible: false, //新增彈框是否顯示
      total: 0, //總共多少條數據
      productData: [], //表格數據
      queryMap: {
        pageNum: 1,
        pageSize: 7,
        name: "",
        categoryId: "",
        supplier: "",
        status: false,
      }, //查詢對象
      addRuleForm: {}, //新增表單數據
      editRuleForm: {}, //修改表單數據
      uploadDisabled: false,
      limitCount: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      addRules: {
        name: [
          { required: true, message: "請輸入廢棄物名稱", trigger: "blur" },
        ],
        // model: [
        //   { required: true, message: "請輸入單價", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 10,
        //     message: "長度在 1 到 10 個字符",
        //     trigger: "blur",
        //   },
        // ],
        // remark: [
        //   { required: true, message: "請輸入廢棄物说明備註", trigger: "blur" },
        //   {
        //     min: 2,
        //     max: 10,
        //     message: "長度在 2 到 10 個字符",
        //     trigger: "blur",
        //   },
        // ],
        categorys: [
          { required: true, message: "請輸入廢棄物分類", trigger: "blur" },
        ],
        sort: [{ required: true, message: "請輸入排序", trigger: "blur" }],
        categoryKeys: [
          { required: true, message: "請選擇廢棄物分類", trigger: "blur" },
        ],
      }, //新增驗證
      imgFilesList: [],
      categorykeys: [], //搜索類別
    };
  },

  computed: {
    // productListFilter: function () {
    //   if (!this.showProductStop) {
    //     this.queryMap.status = true;
    //     this.getproductList();
    //     return this.productData.filter((item) => item.status !== true);
    //   }
    //   this.queryMap.status = true;
    //   this.getproductList();
    //   return this.productData.filter((item) => item.status == true);
    // },
  },
  methods: {
    // :index="getIndex"
    getIndex(index) {
      return (this.queryMap.pageNum - 1) * this.queryMap.pageSize + index + 1;
    },
    //重置查詢表單
    resetForm() {
      this.queryMap = {
        pageNum: 1,
        pageSize: 7,
        name: "",
        categoryId: "",
        supplier: "",
        status: false,
      };
      this.showProductStop = false;
    },
    /**
     * 打開新增廢棄物彈框
     */
    openAdd() {
      this.getCatetorys();
      this.addDialogVisible = true;
    },
    /**
     * 搜索廢棄物
     */
    search() {
      this.queryMap.pageNum = 1;
      this.getproductList();
    },

    /**
     * 廢棄物新增审核
     */
    async publish(id) {
      const { data: res } = await this.$http.put(
        "business/product/publish/" + id
      );
      if (!res.success) {
        return this.$message.error("审核失敗:" + res.data.errorMsg);
      } else {
        await this.getproductList();
        return this.$message.success("廢棄物已审核通過");
      }
    },
    /**
     * 删除廢棄物
     */
    async del(id) {
      var res = await this.$confirm(
        "此操作將永久删除該廢棄物, 是否繼續?",
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
          "business/product/delete/" + id
        );
        if (res.success) {
          this.$message.success("廢棄物删除成功");
          await this.getproductList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },
    /**
     * 更新廢棄物
     */
    async update() {
      this.$refs.editRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          const { data: res } = await this.$http.put(
            "business/product/update/" + this.editRuleForm.id,
            this.editRuleForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "廢棄物信息更新",
              type: "success",
            });
            this.editRuleForm = {};
            await this.getproductList();
          } else {
            this.$message.error("廢棄物信息更新失敗:" + res.data.errorMsg);
          }
          this.editDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
        }
      });
    },
    /**
     * 編輯廢棄物
     */
    async edit(id) {
      const { data: res } = await this.$http.get("business/product/edit/" + id);
      if (res.success) {
        this.editRuleForm = res.data;
        const item = res.data;
        this.imgFilesList.push({
          url: "https://www.zykhome.club/" + item.imageUrl,
          name: item.name,
          id: item.id,
        });
      } else {
        return this.$message.error("廢棄物信息編輯失敗" + res.data);
      }
      const array = [];
      array.push(res.data.oneCategoryId);
      array.push(res.data.twoCategoryId);
      // array.push(res.data.threeCategoryId);
      this.editRuleForm.categoryKeys = array;
      this.editDialogVisible = true;
    },
    /**
     * 新增廢棄物
     */
    add() {
      this.$refs.addRuleFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          const { data: res } = await this.$http.post(
            "business/product/add",
            this.addRuleForm
          );
          if (res.success) {
            this.$message.success("廢棄物新增成功");
            this.addRuleForm = {};
            await this.getproductList();
          } else {
            this.addDialogVisible = false;
            this.btnDisabled = false;
            this.btnLoading = false;
            return this.$message.error("廢棄物新增失敗:" + res.data);
          }
          this.addDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
        }
      });
    },
    /**
     * 移除回收站
     */
    async remove(id) {
      const { data: res } = await this.$http.put(
        "business/product/remove/" + id
      );
      if (!res.success) {
        return this.$message.error("移入回收站失敗:" + res.data.errorMsg);
      } else {
        await this.getproductList();
        return this.$message.success("移入回收站成功");
      }
    },
    /**
     * 從回收站恢复
     */
    async back(id) {
      const { data: res } = await this.$http.put("product/back/" + id);
      if (!res.success) {
        return this.$message.error("從回收站恢复失敗:" + res.data.errorMsg);
      } else {
        await this.getproductList();
        return this.$message.success("從回收站中已恢复");
      }
    },
    /**
     * 加載廢棄物列表
     */
    async getproductList() {
      const { data: res } = await this.$http.get(
        "business/product/findProductList",
        {
          params: this.queryMap,
        }
      );
      if (!res.success) {
        return this.$message.error("獲取廢棄物列表失敗");
      } else {
        this.total = res.data.total;
        this.productData = res.data.rows;
      }
    },
    /**
     * 加載廢棄物類別
     */
    async getCatetorys() {
      const { data: res } = await this.$http.get(
        "business/productCategory/categoryTree"
      );
      if (!res.success) {
        return this.$message.error("獲取廢棄物類別失敗");
      } else {
        this.cateories = res.data.rows;
      }
    },
    /**
     * 禁用啟用廢棄物
     */
    async changeStatus(row) {
      const { data: res } = await this.$http.put(
        "business/product/updateStatus/" + row.id + "/" + row.status
      );
      if (!res.success) {
        this.$message.error("更新廢棄物狀態失敗:" + res.data.errorMsg);
        row.status = !row.status;
      } else {
        const message = row.status ? "廢棄物狀態已禁用" : "廢棄物狀態已啟用";
        this.$notify.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    handleChange(file, fileList) {
      this.uploadDisabled = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = fileList.length >= this.limitCount;
      this.addRuleForm.imageUrl = "";
    },
    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getproductList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getproductList();
    },
    //關閉彈出框
    closeAddDialog() {
      this.$refs.addRuleFormRef.clearValidate();
      this.addRuleForm = {};
      this.$refs.upload.clearFiles();
    },
    //關閉彈出框
    closeEditDialog() {
      this.$refs.editRuleFormRef.clearValidate();
      this.editRuleForm = {};
      this.$refs.upload2.clearFiles();
      this.imgFilesList = [];
    },
    handleSuccess(response, file, fileList) {
      this.addRuleForm.imageUrl = response.msg;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //編輯
    editHandleSuccess(response, file, fileList) {
      this.editRuleForm.imageUrl = response.msg;
    },
    /**
     * 分類搜索改變時
     */
    selectChange() {
      var str = "";
      for (var i = 0; i < this.categorykeys.length; i++) {
        str += this.categorykeys[i] + ",";
      }
      str = str.substring(0, str.length - 1);
      this.queryMap.categorys = str;
    },
    selsChange(sels) {
      this.sels = sels;
    },
    /**
     * 成本中心分配
     */
    async assignCostCenter() {
      var ids = this.sels.map((item) => item.id).join(); //獲取所有選中行的id组成的字符串，以逗號分隔
      const { data: res } = await this.$http.put(
        "business/product/costCenter/" + ids + "/" + this.costCenterId
      );
      if (res.success) {
        this.$message.success("成本中心分配成功");
        await this.getproductList();
      } else {
        this.$message.error(res.data.errorMsg);
      }
      this.costCenterDialogVisible = false;
      this.costCenterId = "";
    },
    /**
     * 加載所有成本中心
     */
    async getCostCenters() {
      const { data: res } = await this.$http.get("system/costCenter/findAll");
      if (!res.success) {
        return this.$message.error("獲取成本中心列表失敗:" + res.data.errorMsg);
      }
      this.costCenters = res.data;
    },
    downExcel() {
      const $this = this;
      const res = axios
        .request({
          url: "business/product/excel",
          method: "post",
          responseType: "blob",
          data: this.queryMap,
          params: this.queryMap,
        })
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
            return $this.$message.error(
              "Subject does not have permission [product:export]"
            );
          }
          const data = res.data;
          let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "廢棄物列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
  },
  created() {
    this.getproductList();
    this.getCatetorys();
    this.getCostCenters();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  watch: {
    showProductStop: function (newValue, oldValue) {
      this.queryMap = {
        pageNum: 1,
        pageSize: 7,
        name: "",
        categoryId: "",
        supplier: "",
        status: false,
      };
      this.queryMap.status = newValue;
      this.getproductList();
    },
  },
};
</script>


