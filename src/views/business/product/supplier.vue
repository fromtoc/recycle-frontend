<template>
    <div id="productCategroys">
        <!-- 面包導航 -->
        <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>廢棄物流向</el-breadcrumb-item>
            <el-breadcrumb-item>廢棄物来源</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 右側卡片區域 -->
        <!-- 用戶列表卡片區 -->
        <el-card class="box-card">
            <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
                <el-form-item label="省市區縣">
                    <el-input v-model="queryMap.address" clearable @clear="search" placeholder="省市區縣"></el-input>
                </el-form-item>
                <el-form-item label="聯繫人">
                    <el-input v-model="queryMap.contact" clearable @clear="search" placeholder="聯繫人"></el-input>
                </el-form-item>
                <el-form-item label="具體地點">
                    <el-input
                            clearable
                            v-model="queryMap.name"
                            placeholder="請具體地點查詢"
                            @clear="search"
                            class="input-with-el-select"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary"> 查詢</el-button>
                    <el-button
                            v-hasPermission="'supplier:add'"
                            type="success"
                            icon="el-icon-circle-plus-outline"
                            @click="addDialogVisible=true"
                    >新增</el-button>
                </el-form-item>
            </el-form>






            <!-- 表格區域 -->
            <template>
                <el-table
                        border
                        size="mini"
                        v-loading="loading"
                        stripe
                        :data="supplierData"
                        style="width: 100%;"
                        height="460"
                >
                    <el-table-column prop="id" type="index" label="ID" width="50"></el-table-column>

                    <el-table-column label="廢棄物提供方地址">
                        <el-table-column
                                prop="address"
                                label="省份"
                                width="130">
                            <template slot-scope="scope">
                                <span v-text="scope.row.address.split('/')[0]"></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="市"
                                width="100">
                            <template slot-scope="scope">
                                <span v-text="scope.row.address.split('/')[1]"></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="區縣"
                                width="100">
                            <template slot-scope="scope">
                                <span v-text="scope.row.address.split('/')[2]"></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="地址"
                                width="180">
                        </el-table-column>
                    </el-table-column>

                    <el-table-column prop="createTime" label="創建時間" width="180"></el-table-column>
                    <el-table-column prop="email" label="郵箱" width="180"></el-table-column>
                    <el-table-column prop="contact" label="聯繫人" width="120"></el-table-column>
                    <el-table-column prop="phone" label="電話" width="120"></el-table-column>
                    <el-table-column prop="sort" label="排序" width="80"></el-table-column>
                    <el-table-column label="操作" fixed="right" width="180">
                        <template slot-scope="scope">
                            <el-button
                                    v-hasPermission="'supplier:edit'"
                                    type="text"
                                    size="mini"
                                    icon="el-icon-edit"
                                    @click="edit(scope.row.id)"
                            >編輯</el-button>

                            <el-button
                                    v-hasPermission="'supplier:delete'"
                                    type="text"
                                    size="mini"
                                    icon="el-icon-delete"
                                    @click="del(scope.row.id)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- 分頁 -->
            <el-pagination
                    style="margin-top:10px;"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="this.queryMap.pageNum"
                    :page-sizes="[ 10, 15, 20]"
                    :page-size="this.queryMap.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
            <!-- 来源新增彈出框 -->
            <el-dialog title="新增来源" :visible.sync="addDialogVisible" width="50%" @close="closeAddDialog">
        <span>
          <el-form
                  :model="addRuleForm"
                  :rules="addRules"
                  ref="addRuleFormRef"
                  label-width="100px"
                  class="demo-ruleForm"
          >
           <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple"></div>
                <el-form-item label="省份" prop="valueProvince">
                  <el-select
                          v-model="addRuleForm.valueProvince"
                          placeholder="請選擇省"
                          @change="changeProvince"
                  >
                    <el-option
                            v-for="item in provinceList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="城市" prop="valueCity">
                    <el-select
                            v-model="addRuleForm.valueCity"
                            placeholder="請選擇市"
                            @change="changeCity"
                    >
                      <el-option
                              v-for="item in cityOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="區縣" prop="valueOrigin">
                    <el-select
                            v-model="addRuleForm.valueOrigin"
                            placeholder="請選擇區"
                            @change="changeOrigin"
                    >
                      <el-option
                              v-for="item in originOptions"
                              :key="item.label"
                              :label="item.label"
                              :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="来源 名稱" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="聯繫人" prop="contact">
              <el-input v-model="addRuleForm.contact"></el-input>
            </el-form-item>


            <el-form-item label="郵箱" prop="email">
              <el-input v-model="addRuleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="電話" prop="phone">
              <el-input v-model="addRuleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="addRuleForm.sort" :min="1" :max="10" label="排序"></el-input-number>
            </el-form-item>
          </el-form>
        </span>
                <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">確 定</el-button>
        </span>
            </el-dialog>

            <!-- 系別編輯彈出框 -->
            <el-dialog
                    title="更新来源"
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
            <el-form-item label="省市區縣" prop="address">
              <el-input disabled v-model="editRuleForm.address"></el-input>
            </el-form-item>

            <el-form-item label="来源详细地" prop="name">
              <el-input type="textarea" v-model="editRuleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="聯繫人" prop="contact">
              <el-input v-model="editRuleForm.contact"></el-input>
            </el-form-item>


            <el-form-item label="郵箱" prop="email">
              <el-input v-model="editRuleForm.email"></el-input>
            </el-form-item>

            <el-form-item label="電話" prop="phone">
              <el-input v-model="editRuleForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="editRuleForm.sort" :min="1" :max="10" label="排序"></el-input-number>
            </el-form-item>
          </el-form>
        </span>
                <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">確 定</el-button>
        </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            var checkEmail = (rule, value, callback) => {
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
            var checkPhone = (rule, value, callback) => {
                const phoneReg = /^1[34578]\d{9}$$/;
                if (!value) {
                    return callback(new Error("電話號碼不能為空"));
                }
                setTimeout(() => {
                    // Number.isInteger是es6驗證數字是否為整數的方法,實际輸入的數字總是识別成字符串
                    // 所以在前面加了一個+實現隐式轉换

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
                loading:true,
                editDialogVisible: false,
                addDialogVisible: false, //新增彈框是否顯示
                total: 0, //總共多少條數據
                supplierData: [], //表格數據
                queryMap: { pageNum: 1, pageSize: 10, name: "" }, //查詢對象
                addRuleForm: {}, //新增表單數據
                editRuleForm: {}, //修改表單數據
                deans: [], //所有系主任
                addRules: {
                    name: [
                        { required: true, message: "請輸入来源名稱", trigger: "blur" },
                        { min: 2, max: 50, message: "長度在 2 到 50 個字符", trigger: "blur" }
                    ],
                    address: [
                        { required: true, message: "請輸入地址信息", trigger: "blur" },
                        { min: 2, max: 12, message: "長度在 2 到 12 個字符", trigger: "blur" }
                    ],
                    email: [{ required: true, validator: checkEmail, trigger: "blur" }],
                    valueProvince: [
                        { required: true, message: "請輸入省份", trigger: "blur" }
                    ],
                    valueCity: [{ required: true, message: "請輸入城市", trigger: "blur" }],
                    valueOrigin: [
                        { required: true, message: "請輸入區縣", trigger: "blur" }
                    ],
                    sort: [
                        { required: true, message: "請輸入排序號", trigger: "blur" }
                    ],
                    contact: [{ required: true, message: "請輸入聯繫人", trigger: "blur" }],
                    phone: [
                        {
                            required: true,
                            message: "請輸入聯繫方式",
                            validator: checkPhone,
                            trigger: "blur"
                        }
                    ]
                } //新增驗證
                ,
                provinceList: [], // 省列表
                cityList: [], // 市列表
                originList: [], // 區列表
                cityOptions: [], // 市下拉框數據
                originOptions: [] // 區下拉框數據
            };
        },
        methods: {
            //搜索
            search() {
                this.queryMap.pageNum = 1;
                this.getSupplierList();
            },
            //删除来源
            async del(id) {
                const res = await this.$confirm(
                    "此操作將永久删除該用戶, 是否繼續?",
                    "提示",
                    {
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
                if (res === "confirm") {
                    const { data: res } = await this.$http.delete("business/supplier/delete/" + id);
                    if (res.success) {
                        this.$message.success("来源删除成功");
                        await this.getSupplierList();
                    } else {
                        this.$message.error(res.data.errorMsg);
                    }
                }
            },
            //更新用戶
            async update() {
                this.$refs.editRuleFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    } else {

                        const { data: res } = await this.$http.put(
                            "business/supplier/update/" + this.editRuleForm.id,
                            this.editRuleForm
                        );
                        if (res.success) {
                            this.$notify({
                                title: "成功",
                                message: "来源信息更新",
                                type: "success"
                            });
                            this.editRuleForm = {};
                            await this.getSupplierList();
                        } else {
                            this.$message.error("来源信息更新失敗:" + res.data.errorMsg);
                        }

                        this.editDialogVisible = false;
                    }
                });
            },
            //編輯
            async edit(id) {
                const { data: res } = await this.$http.get("business/supplier/edit/" + id);
                if (res.success) {
                    this.editRuleForm = res.data;
                } else {
                    return this.$message.error("来源信息編輯失敗" + res.data.errorMsg);
                }
                this.editDialogVisible = true;
            },
            //新增
            add() {
                this.$refs.addRuleFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    } else {
                        this.addRuleForm.address =
                            this.addRuleForm.province +
                            "/" +
                            this.addRuleForm.city +
                            "/" +
                            this.addRuleForm.origin;
                        const { data: res } = await this.$http.post(
                            "business/supplier/add",
                            this.addRuleForm
                        );
                        if (res.success) {
                            this.$message.success("来源新增成功");
                            this.addRuleForm = {};
                            await this.getSupplierList();
                        } else {
                            return this.$message.error("来源新增失敗:" + res.data.errorMsg);
                        }
                        this.addDialogVisible = false;
                    }
                });
            },
            //加載系別列表
            async getSupplierList() {
                const { data: res } = await this.$http.get("business/supplier/findSupplierList", {
                    params: this.queryMap
                });
                if (!res.success) {
                    return this.$message.error("獲取用戶列表失敗:"+res.data.errorMsg);
                } else {
                    this.total = res.data.total;
                    this.supplierData = res.data.rows;
                }
            },

            //改變頁碼
            handleSizeChange(newSize) {
                this.queryMap.pageSize = newSize;
                this.getSupplierList();
            },
            //翻頁
            handleCurrentChange(current) {
                this.queryMap.pageNum = current;
                this.getSupplierList();
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
            // 選擇省
            changeProvince(val) {
                this.provinceList.forEach((province, index) => {
                    if (val.toString() === this.provinceList[index].value) {
                        this.cityOptions = this.provinceList[index].children;
                        this.addRuleForm.valueCity = this.provinceList[
                            index
                            ].children[0].value; //設置市的值
                        this.addRuleForm.city = this.provinceList[index].children[0].label;

                        this.addRuleForm.valueOrigin = this.provinceList[
                            index
                            ].children[0].children[0].value; //設置縣的值
                        this.addRuleForm.origin = this.provinceList[
                            index
                            ].children[0].children[0].label;

                        this.originOptions = this.provinceList[index].children[0].children;
                        //set value
                        this.addRuleForm.province = this.provinceList[index].label;
                    }
                });
            },
            // 選擇市
            changeCity(val) {
                this.cityList.forEach((city, index) => {
                    if (val.toString() === this.cityList[index].value) {
                        this.originOptions = this.cityList[index].children;
                        this.addRuleForm.valueOrigin = this.cityList[index].children[0].value; //設置縣的值;
                        //set value
                        this.addRuleForm.city = this.cityList[index].label;
                    }
                });
            },
            // 選擇區
            changeOrigin(val) {
                this.addRuleForm.valueOrigin = val;

                this.originList.forEach((origin, index) => {
                    if (val.toString() === this.originList[index].value) {
                        //set value
                        this.addRuleForm.origin = this.originList[index].label;
                    }
                });
                //新增this.$forceUpdate();進行强制渲染，效果實現。搜索資料得出结果：因為數據層次太多，render函數没有自動更新，需手動强制刷新。
                this.$forceUpdate();
            },

            _getJsonData() {
                this.$http.get("/json/provinces.json").then(res => {
                    this.provinceList = [];
                    this.cityList = [];
                    this.originList = [];
                    res.data.forEach(item => {
                        if (item.value.match(/0000$/)) {
                            this.provinceList.push({
                                value: item.value,
                                label: item.name,
                                children: []
                            });
                        } else if (item.value.match(/00$/)) {
                            this.cityList.push({
                                value: item.value,
                                label: item.name,
                                children: []
                            });
                        } else {
                            this.originList.push({
                                value: item.value,
                                label: item.name
                            });
                        }
                    });
                    for (let index in this.provinceList) {
                        for (let index1 in this.cityList) {
                            if (
                                this.provinceList[index].value.slice(0, 2) ===
                                this.cityList[index1].value.slice(0, 2)
                            ) {
                                this.provinceList[index].children.push(this.cityList[index1]);
                            }
                        }
                    }
                    for (let item1 in this.cityList) {
                        for (let item2 in this.originList) {
                            if (
                                this.originList[item2].value.slice(0, 4) ===
                                this.cityList[item1].value.slice(0, 4)
                            ) {
                                this.cityList[item1].children.push(this.originList[item2]);
                            }
                        }
                    }
                });
            }
        },
        created() {
            this.getSupplierList();
            this._getJsonData();
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    };
</script>
