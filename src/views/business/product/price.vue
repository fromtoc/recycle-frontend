<template>
  <div id="price">
    <!-- 面包導航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>基本資料</el-breadcrumb-item>
      <el-breadcrumb-item>廢棄物管理</el-breadcrumb-item>
      <el-breadcrumb-item>單價維護</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右側卡片區域 -->
    <el-card class="box-card">
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
        <el-col :span="8">
          <span style="margin: 0 10px">適用月份</span>
          <el-date-picker
            size="small"
            @change="search"
            v-model="queryMap.validMonth"
            type="month"
            placeholder="選擇適用月份"
            value-format="yyyy-MM"
          >
          </el-date-picker>
          <el-button
            style="margin: 0 10px"
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search"
            >查詢</el-button
          >
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
        <el-col :span="7">
          <el-button
            size="small"
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="openAdd"
            >新增
          </el-button>
          <el-upload
            style="display: inline-block; margin: 0 10px"
            class="upload-demo"
            action=""
            :http-request="upload"
            :before-upload="beforeUpload"
            accept=".xlsx"
            :auto-upload="true"
            :show-file-list="false"
          >
            <el-button type="warning" size="small">
              <i class="el-icon-upload2" />批次上傳</el-button
            >
          </el-upload>
          <!-- <el-button
            size="small"
            icon="el-icon-circle-plus-outline"
            type="warning"
            @click="resetForm"
            >批次上傳</el-button
          > -->
          <el-button
            style="float: right; margin-right: 20px"
            size="small"
            icon="el-icon-download"
            @click="downExcel"
            >下載</el-button
          >
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
          @selection-change="selsChange"
        >
          <el-table-column
            label="序號"
            type="index"
            :index="getIndex"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="twoCategoryName"
            label="廢棄物小分類"
          ></el-table-column>
          <el-table-column prop="name" label="廢棄物名稱"></el-table-column>
          <el-table-column prop="price" label="單價"></el-table-column>
          <el-table-column prop="unit" label="單位"></el-table-column>
          <el-table-column prop="validMonth" label="適用月份"></el-table-column>
          <!-- <el-table-column prop="isban" label="是否禁用" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                @change="changeStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--              给操作员提供的編輯和回收-->
              <span>
                <el-button
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
        :page-sizes="[6, 10, 15, 20]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 廢棄物新增彈出框 -->
      <el-dialog
        title="新增單價維護"
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
            <!-- <el-form-item label="分類" prop="categoryKeys">
              <el-cascader
                placeholder="請選擇"
                :options="cateories"
                clearable
                filterable
                :props="selectProps"
                v-model="addRuleForm.categoryKeys"
              ></el-cascader>
            </el-form-item> -->
            <el-form-item label="廢棄物名稱" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="單價" prop="price">
              <el-input type="number" v-model="addRuleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="單位" prop="unit">
              <el-select v-model="addRuleForm.unit" placeholder="請選擇">
                <el-option label="KG" value="KG"></el-option>
                <el-option label="批" value="批"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="適用月份" prop="validMonth">
              <el-date-picker
                v-model="addRuleForm.validMonth"
                type="month"
                placeholder="選擇適用月份"
                value-format="yyyy-MM"
              >
              </el-date-picker>
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

      <!-- 廢棄物編輯彈出框 -->
      <el-dialog
        title="編輯單價維護"
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
            <el-form-item label="分類" prop="categoryKeys">
              <el-cascader
                placeholder="請選擇"
                :options="cateories"
                clearable
                filterable
                disabled
                :props="selectProps"
                v-model="editRuleForm.categoryKeys"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="廢棄物名稱" prop="name">
              <el-input disabled v-model="editRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="單價" prop="price">
              <el-input type="number" v-model="editRuleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="單位" prop="unit">
              <el-select
                disabled
                v-model="editRuleForm.unit"
                placeholder="請選擇"
              >
                <el-option label="KG" value="KG"></el-option>
                <el-option label="批" value="批"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="適用月份" prop="validMonth">
              <el-date-picker
                v-model="editRuleForm.validMonth"
                type="month"
                placeholder="選擇適用月份"
                value-format="yyyy-MM"
                disabled
              >
              </el-date-picker>
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
      sels: [], //選中的值顯示
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
        pageSize: 6,
        name: "",
        categoryId: "",
        supplier: "",
        status: "",
        validMonth: "",
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
        unit: [{ required: true, message: "請輸入單位", trigger: "blur" }],
        price: [{ required: true, message: "請輸入單價", trigger: "blur" }],
        categorys: [
          { required: true, message: "請輸入廢棄物分類", trigger: "blur" },
        ],
        categoryKeys: [
          { required: true, message: "請選擇廢棄物分類", trigger: "blur" },
        ],
        validMonth: [
          { required: true, message: "請選擇適用月份", trigger: "blur" },
        ],
      }, //新增驗證
      imgFilesList: [],
      categorykeys: [], //搜索類別
    };
  },
  computed: {
    lastMonth: function () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      if (month == 0) {
        year = year - 1;
        month = 12;
      }
      return year + "-" + month;
    },
  },
  methods: {
    getIndex(index) {
      return (this.queryMap.pageNum - 1) * this.queryMap.pageSize + index + 1;
    },
    //重置查詢表單
    resetForm() {
      this.queryMap = {
        pageNum: 1,
        pageSize: 5,
        name: "",
        categoryId: "",
        supplier: "",
        status: 0,
      };
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
      this.getPriceList();
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
            "business/productPrice/update/" + this.editRuleForm.id,
            this.editRuleForm
          );
          if (res.success) {
            this.$notify({
              title: "成功",
              message: "廢棄物單價信息更新",
              type: "success",
            });
            this.editRuleForm = {};
            await this.getPriceList();
          } else {
            this.$message.error("廢棄物單價信息更新失敗:" + res.data);
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
      const { data: res } = await this.$http.get(
        "business/productPrice/edit/" + id
      );
      if (res.success) {
        this.editRuleForm = res.data;
        const item = res.data;
        this.imgFilesList.push({
          url: "https://www.zykhome.club/" + item.imageUrl,
          name: item.name,
          id: item.id,
        });
      } else {
        return this.$message.error(
          "廢棄物單價信息編輯失敗" + res.data.errorMsg
        );
      }
      const array = [];
      array.push(res.data.oneCategoryId);
      array.push(res.data.twoCategoryId);
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
            "business/productPrice/add",
            this.addRuleForm
          );
          if (res.success) {
            this.$message.success("廢棄物單價新增成功");
            this.addRuleForm = {};
            await this.getPriceList();
          } else if (res.data == "廢棄物名稱不存在") {
            this.$message.error("廢棄物單價新增失敗:" + res.data);
          } else if (res.data == "該筆資料已存在，請問是否覆蓋?") {
            this.$confirm("該筆資料已存在，請問是否覆蓋?", {
              distinguishCancelAndClose: true,
              confirmButtonText: "確認覆蓋",
              cancelButtonText: "取消",
              dangerouslyUseHTMLString: true,
            })
              .then(async () => {
                this.addRuleForm.recover = true;
                const { data: res } = await this.$http.post(
                  "business/productPrice/add",
                  this.addRuleForm
                );
                if (res.success) {
                  this.$message.success("廢棄物單價新增成功");
                  this.addRuleForm = {};
                  await this.getPriceList();
                } else {
                  this.$message.error("廢棄物單價新增失敗:" + res.data);
                }
              })
              .catch((action) => {
                if (action === "cancel") {
                  this.$message({
                    type: "info",
                    message: "放棄覆蓋",
                  });
                }
              });
          }
          this.addDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
        }
      });
    },
    /**
     * 加載廢棄物列表
     */
    async getPriceList() {
      const { data: res } = await this.$http.get(
        "business/productPrice/findProductPriceList",
        {
          params: this.queryMap,
        }
      );
      if (!res.success) {
        return this.$message.error("獲取廢棄物單價列表失敗");
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
        "business/productPrice/updateStatus/" + row.id + "/" + row.status
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
      this.getPriceList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getPriceList();
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
    downExcel() {
      const $this = this;
      const res = axios
        .request({
          url: "business/productPrice/excel",
          method: "post",
          responseType: "blob",
          data: this.queryMap,
          params: this.queryMap,
        })
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
            return $this.$message.error("Subject does not have permission");
          }
          const data = res.data;
          let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "單價列表.xls";
          a.click();
          window.URL.revokeObjectURL(url);
        });
    },
    beforeUpload: function (file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$message.warning("只能上傳後綴是.xlsx的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超過10M");
      }
    },
    upload: function (param) {
      let formData = new FormData();
      formData.append("file", param.file);
      this.importExcel(formData).then(
        (res) => {
          if (res.data.success) {
            this.$message({
              message: "文件上傳成功,請刷新頁面！ ",
              type: "ok",
            });
          } else {
            let data = res.data.data;
            if (data.type == "empty") {
              var products = "";
              data.list.forEach((element) => {
                products = products + " " + element.name;
              });
              this.$alert(products, "廢棄物名稱不存在", {
                confirmButtonText: "確定",
                type: "error",
              });
            }
            if (data.type == "same") {
              var products = "";
              data.list.forEach((element) => {
                products =
                  products +
                  "<div>" +
                  element.validMonth +
                  ": " +
                  element.name +
                  " " +
                  element.price +
                  " " +
                  element.unit +
                  "</div>";
              });
              this.$confirm(products, "廢棄物單價已存在，是否覆蓋原有資料？", {
                distinguishCancelAndClose: true,
                confirmButtonText: "確認覆蓋",
                cancelButtonText: "取消",
                dangerouslyUseHTMLString: true,
              })
                .then(async () => {
                  const { data: res } = await this.$http.post(
                    "business/productPrice/recover",
                    data.entityList
                  );
                  if (res.success) {
                    console.log("success");
                    this.$message.success("廢棄物單價批次上傳成功");
                    this.getPriceList();
                  } else {
                    return this.$message.error(
                      "廢棄物單價批次上傳失敗:" + res.data
                    );
                  }
                })
                .catch((action) => {
                  if (action === "cancel") {
                    this.$message({
                      type: "info",
                      message: "放棄覆蓋",
                    });
                  }
                });
              // this.$alert(products, "廢棄物單價已存在", {
              //   confirmButtonText: "確定",
              //   type: "error",
              // });
            }
          }
        },
        (err) => {
          this.$message({ message: "文件上傳失敗,請刷新頁面！ ", type: "ok" });
        }
      );
    },
    importExcel: function (data) {
      return axios({
        url: "/business/productPrice/import",
        method: "post",
        headers: {
          "Content-type": "multipart/from-data",
        },
        data,
      });
    },
  },
  created() {
    this.getPriceList();
    this.getCatetorys();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>


