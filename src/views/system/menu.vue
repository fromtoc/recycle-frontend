<template>
    <div id="roles" v-loading="loading">
        <!-- 面包導航 -->
        <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>選單管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片主體 -->
        <el-card class="box-card">
            <div class="block">
                <!-- 節點過濾 -->
                <el-row>
                    <el-col :span="16">
                        <div class="grid-content bg-purple">
                            <el-input placeholder="輸入關鍵字進行過濾" v-model="filterText" clearable></el-input>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content bg-purple-light">
                            <el-button
                                    type="primary"
                                    icon="el-icon-plus"
                                    style="margin-left:20px;"
                                    @click="openParentAdd"
                            >父級</el-button>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <el-button
                                v-hasPermission="'menu:export'"
                                style="margin-left:20px;"
                                icon="el-icon-download"
                                @click="downExcel"
                        >導出</el-button>
                    </el-col>

                </el-row>

                <p>選單權限樹</p>
                <el-tree
                        :data="data"
                        accordion
                        :auto-expand-parent="false"
                        node-key="id"
                        show-checkbox
                        :default-expanded-keys="open"
                        :expand-on-click-node="false"
                        :render-content="renderContent"
                        :props="defaultProps"
                        highlight-current
                        :filter-node-method="filterNode"
                        ref="tree"
                ></el-tree>
            </div>
        </el-card>
        <!-- 節點新增彈出框 -->
        <el-dialog :title="addTitle" :visible.sync="addDialogVisible" @close="addClose" width="50%">
      <span>
        <el-form
                size="mini"
                ref="addFormRef"
                :model="addForm"
                label-width="80px"
                :rules="addFormRules"
        >
          <el-form-item label="節點名稱" prop="menuName">
            <el-input v-model="addForm.menuName"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="權限編碼">
            <el-input v-model="addForm.perms"></el-input>
          </el-form-item>
          <el-form-item label="圖標">
            <el-input v-model="addForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="是否可用" prop="disabled">
            <template>
              <el-radio v-model="addForm.disabled" label="false">可用</el-radio>
              <el-radio v-model="addForm.disabled" label="true">禁用</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="是否展開" prop="open">
            <template>
              <el-radio v-model="addForm.open" label="1">展開</el-radio>
              <el-radio v-model="addForm.open" label="0">關閉</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input-number v-model="addForm.orderNum" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="類型" prop="type">
            <template>
              <el-radio v-model="addForm.type" label="0">選單</el-radio>
              <el-radio v-model="addForm.type" label="1">按鈕</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </span>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNode" :loading="btnLoading" :disabled="btnDisabled">確 定</el-button>
      </span>
        </el-dialog>
        <!-- 編輯節點彈出框 -->
        <el-dialog :title="editTitle" :visible.sync="editlogVisible" width="50%" @close="editClose">
      <span>
        <el-form
                size="mini"
                ref="editFormRef"
                :model="editForm"
                label-width="80px"
                :rules="addFormRules"
        >
          <!-- <el-form-item label="父節點" prop="menuName">
            <el-input v-model="editForm.parentId"></el-input>
          </el-form-item> -->
          <el-form-item v-if="editForm.parentId!=0" label="父節點" prop="parentId">
            <el-select
            v-model="editForm.parentId"
            placeholder="請選擇父節點"
            >
            <el-option
                v-for="menu in data"
                :key="menu.id"
                :label="menu.menuName"
                :value="menu.id"
            ></el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="節點名稱" prop="menuName">
            <el-input v-model="editForm.menuName"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="editForm.url"></el-input>
          </el-form-item>
          <el-form-item label="權限編碼">
            <el-input v-model="editForm.perms"></el-input>
          </el-form-item>
          <el-form-item label="圖標">
            <el-input v-model="editForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="是否可用" prop="disabled">
            <template>
              <el-radio v-model="editForm.disabled" :label="false">可用</el-radio>
              <el-radio v-model="editForm.disabled" :label="true">禁用</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="是否展開" prop="open">
            <template>
              <el-radio v-model="editForm.open" :label="1">展開</el-radio>
              <el-radio v-model="editForm.open" :label="0">關閉</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input-number v-model="editForm.orderNum" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="類型" prop="type">
            <template>
              <el-radio v-model="editForm.type" :label="0">選單</el-radio>
              <el-radio v-model="editForm.type" :label="1">按鈕</el-radio>
            </template>
          </el-form-item>
        </el-form>
      </span>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editlogVisible = false">取 消</el-button>
        <el-button
                type="primary"
                @click="updateMenu"
                :loading="btnLoading"
                :disabled="btnDisabled"
        >確 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    let id = 1000;

    export default {
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },

        data() {
            const data = [];

            return {
                btnLoading: false,
                btnDisabled: false,
                loading: true,
                open: [], //展開節點
                filterText: "", //節點過濾文本
                addDialogVisible: false, //新增節點彈出框
                editlogVisible: false, //編輯節點彈出框
                addTitle: "",
                editTitle: "",
                addForm: {
                    parentId: "",
                    menuName: "",
                    url: "",
                    type: "",
                    orderNum: "",
                    disabled: "",
                    open: "",
                    perms: ""
                }, //添加請求表單數據
                editForm: {}, //編輯節點表單數據
                addFormRules: {
                    menuName: [
                        { required: true, message: "節點名稱不能為空", trigger: "blur" },
                        { min: 3, max: 10, message: "長度在 3 到 10 個字符", trigger: "blur" }
                    ],
                    disabled: [
                        { required: true, message: "節點狀態不能為空", trigger: "blur" }
                    ],

                    orderNum: [
                        { required: true, message: "排序不能為空", trigger: "blur" }
                    ],
                    type: [{ required: true, message: "類型不能為空", trigger: "blur" }],
                    open: [{ required: true, message: "是否展開不能為空", trigger: "blur" }]
                }, //添加表單驗證規則
                pNode: {}, //父節點
                data: JSON.parse(JSON.stringify(data)),

                defaultProps: {
                    children: "children",
                    label: "menuName"
                }
            };
        },
        created() {
            this.getMenuTree();
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        methods: {

            /**
             * 加載選單表格
             */
            downExcel() {
                var $this = this;
                const res = axios.request({
                    url: "/menu/excel",
                    method: "post",
                    responseType: "blob"
                })
                    .then(res => {
                        if(res.headers['content-type']==='application/json'){
                            return $this.$message.error("Subject does not have permission [menu:export]");
                        }
                        const data = res.data;
                        let url = window.URL.createObjectURL(data); // 將二進制文件轉化為可訪問的url
                        const a = document.createElement("a");
                        document.body.appendChild(a);
                        a.href = url;
                        a.download = "選單列表.xls";
                        a.click();
                        window.URL.revokeObjectURL(url);
                    });
            },


            //更新選單
            async updateMenu() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    } else {
                        this.btnLoading = true;
                        this.btnDisabled = true;
                        const { data: res } = await this.$http.put(
                            "system/menu/update/" + this.editForm.id,
                            this.editForm
                        );
                        if (res.success) {
                            this.$message({
                                title: "成功",
                                message: "節點信息更新",
                                type: "success"
                            });
                            this.editForm = {};
                            this.editlogVisible = false;
                            this.btnLoading=false;
                            this.btnDisabled = false;
                            await this.getMenuTree();
                        } else {
                            this.btnLoading = false;
                            this.btnDisabled = false;
                            return this.$message.error("更新選單失敗"+res.data.errorMsg);
                        }
                    }
                });
            },
            //點擊編輯節點
            async edit(data) {
                this.editTitle = "編輯：【" + data.menuName + "】";
                const { data: res } = await this.$http.get("system/menu/edit/" + data.id);
                if (res.success) {
                    this.editForm = res.data;
                    this.editlogVisible = true;
                } else {
                    return this.$message.error("節點編輯失敗:" + res.data.errorMsg);
                }
            },
            //過濾節點
            filterNode(value, data) {
                if (!value) return true;
                return data.menuName.indexOf(value) !== -1;
            },
            //關閉添加
            addClose() {
                this.$refs.addFormRef.clearValidate();
                this.addForm = {};
            },
            editClose() {
                this.$refs.editFormRef.clearValidate();
                this.editForm = {};
            },
            //加載選單樹
            async getMenuTree() {
                const { data: res } = await this.$http.get("system/menu/tree");
                if (res.success) {
                    this.data = res.data.tree;
                    this.open = res.data.open;
                }
            },
            //打開添加框
            openAdd(data) {
                this.addTitle = "添加節點 ：當前【" + data.menuName + "】";
                this.addDialogVisible = true;
                this.addForm.parentId = data.id;
                this.pNode = data;
            },
            //添加最高父級節點
            openParentAdd(data) {
                this.addTitle = "添加第一父級";
                this.addDialogVisible = true;
                this.addForm.parentId = 0;
            },
            //點擊删除按鈕
            async delNode(node, data) {
                const res = await this.$confirm(
                    "此操作將永久删除該節點, 是否繼續?",
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
                    console.log(node);
                    const { data: res } = await this.$http.delete(
                        "system/menu/delete/" + node.data.id
                    );
                    if (res.success) {
                        this.$message.success("節點删除成功");
                        await this.getMenuTree();
                    } else {
                        this.$message.error("節點删除失敗:" + res.data.errorMsg);
                    }
                }
            },
            //發送添加節點請求
            async addNode() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    } else {
                        this.btnLoading = true;
                        this.btnDisabled = true;
                        const { data: res } = await this.$http.post("system/menu/add", this.addForm);
                        if (res.success) {
                            this.$message.success("節點添加成功");
                            this.addDialogVisible = false;
                            await this.getMenuTree();
                        } else {
                            this.$message.error("節點添加失敗:"+res.data.errorMsg);
                        }
                        this.btnLoading=false;
                        this.btnDisabled = false;
                    }
                });
            },
            //前端添加節點
            append(data, newChild) {
                //   var newChild = { id: 1231, label: "qqqqq", children: [] };
                if (!data.children) {
                    this.$set(data, "children", []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                    <span>
                    <i class={data.icon}></i>&nbsp;&nbsp;&nbsp;{node.label}
                {node.data.type == 0 ?  <el-tag style='margin-left:20px;'  effect='plain' size='mini'>選單</el-tag>:
                    <el-tag style='margin-left:20px;' type='warning' effect='plain' size='mini'>權限  [{node.data.perms}]</el-tag>

                }
            </span>
                <span>
                <el-button
                size="mini"
                type="text"
                on-click={() => {
                    this.edit(data);
                    return false;
                }}
            >
            <i class="el-icon-edit"></i>&nbsp;編輯
                    </el-button>
                    <el-button
                size="mini"
                type="text"
                on-click={() => {
                    this.openAdd(data);
                }}
            >
            <i class="el-icon-plus"></i>&nbsp;增加
                    </el-button>

                    <el-button
                size="mini"
                type="text"
                on-click={() => this.delNode(node, data)}
            >
            <i class="el-icon-delete"></i>&nbsp;删除
                    </el-button>
                    </span>
                    </span>
            );
            }
        }
    };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
