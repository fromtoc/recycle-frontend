<template>
    <div id="inStocks">
        <!-- 面包導航 -->
        <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>秤重管理</el-breadcrumb-item>
            <el-breadcrumb-item>秤重明細查詢</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片區域 -->
        <el-card>
            <!-- 搜索部分 -->
            <el-form size="small" :inline="true" :model="queryMap" class="demo-form-inline">
                <!-- <el-form-item label="類型">
                    <el-select  clearable  v-model="queryMap.type" placeholder="請選擇入庫類型">
                        <el-option label="捐赠" value="1"></el-option>
                        <el-option label="下拨" value="2"></el-option>
                        <el-option label="采购" value="3"></el-option>
                        <el-option label="借用" value="4"></el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item>
                    <el-select    v-model="queryMap.status" placeholder="請選擇狀態">
                        <el-option label="已入庫" :value="0"></el-option>
                        <el-option label="回收站" :value="1"></el-option>
                        <el-option label="待审核" :value="2"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-date-picker
                            :clearable="false"
                            v-model="range"
                            type="datetimerange"
                            :value-format="'yyyy-MM-dd HH:mm:ss'"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="開始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="廢棄物">

                    <el-input
                            clearable
                            @clear="search"
                            v-model="queryMap.inNum"
                            placeholder="請輸入廢棄物查詢"
                            @keyup.enter.native="search"
                            class="input-with-select"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="登入者">

                    <el-input
                            clearable
                            @clear="search"
                            v-model="queryMap.inNum"
                            placeholder="請輸入登入者查詢"
                            @keyup.enter.native="search"
                            class="input-with-select"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="公司">

                    <el-input
                            clearable
                            @clear="search"
                            v-model="queryMap.inNum"
                            placeholder="請輸入公司查詢"
                            @keyup.enter.native="search"
                            class="input-with-select"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="search">查詢</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-refresh" type="warning" @click="clearTime">重置</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <router-link to="/business/product/add-stocks">
                        <el-button type="success" icon="el-icon-plus">入庫</el-button>
                    </router-link>
                </el-form-item> -->

                <!-- <el-form-item>
                    <el-button type="button" icon="el-icon-download">導出</el-button>
                </el-form-item> -->

            </el-form>
            <!-- 表格區域 -->
            <el-table empty-text="暫無數據" size="mini" v-loading="loading" :data="tableData" border style="width: 100%;" height="420">
                <el-table-column label="#" prop="id" width="50"></el-table-column>
                <el-table-column  prop="inNum" :show-overflow-tooltip='true' label="秤重單號" width="180"></el-table-column>
                <!-- <el-table-column prop="type" label="廢棄物類型" width="100">
                    <template slot-scope="scope">
                        <el-tag  type="success" v-if="scope.row.type===1">捐赠</el-tag>
                        <el-tag  v-else-if="scope.row.type===2">下拨</el-tag>
                        <el-tag  type="danger" v-else-if="scope.row.type===3">采购</el-tag>
                        <el-tag  type="warning" v-else>借用</el-tag>
                    </template>
                </el-table-column> -->
                <el-table-column prop="createTime" label="時間" sortable width="180"></el-table-column>
                <el-table-column prop="phone" label="廢棄物" width="150"></el-table-column>
                <el-table-column prop="productNumber" label="淨重" sortable width="100"></el-table-column>
                <el-table-column prop="productNumber" label="總重" sortable width="100"></el-table-column>
                <el-table-column prop="productNumber" label="扣重" sortable width="100"></el-table-column>
                <el-table-column prop="operator" label="登入者" width="180"></el-table-column>
                <el-table-column prop="operator" label="公司" width="180"></el-table-column>
                <!-- <el-table-column prop="status" label="狀態" width="100">
                    <template slot-scope="scope">
                        <el-tag size="mini" type="danger" effect="plain" v-if="scope.row.status==1">回收</el-tag>
                        <el-tag size="mini" effect="plain" v-if="scope.row.status==0">已入庫</el-tag>
                        <el-tag size="mini" effect="plain" type="warning" v-if="scope.row.status==2">审核中</el-tag>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- 分頁部分 -->
            <el-pagination
                    style="margin-top:10px;"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryMap.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="queryMap.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
            <!-- 入庫明细 -->
            <el-dialog title="入庫明细" :visible.sync="dialogVisible" @close="closeDetail" width="60%">
                <!--                来源信息-->
                <el-card class="box-card" style="margin-bottom: 10px;">
                    <div  class="text item">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">省區市:</span> &nbsp;<el-tag size="mini" >{{supplier.address}}</el-tag>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">具體位置:</span> &nbsp;<el-tag size="mini" >{{supplier.name}}</el-tag>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">聯繫人 :</span> &nbsp;<el-tag size="mini"  >{{supplier.contact}}</el-tag>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">電話 : </span>&nbsp;<el-tag size="mini" >{{supplier.phone}}</el-tag>
                                </div>
                            </el-col>

                        </el-row>
                    </div>
                </el-card>

                <!--                步骤條-->
                <el-steps simple v-if="pStatus==0"  style="margin-left: 10px;margin-bottom: 5px;" :space="200" :active="3" finish-status="success">
                    <el-step title="提交入庫單" ></el-step>
                    <el-step title="审核入庫單"></el-step>
                    <el-step title="進入庫存"></el-step>
                </el-steps>
                <el-steps simple v-if="pStatus==2"  style="margin-left: 10px;margin-bottom: 5px;" :space="200" :active="2" finish-status="success">
                    <el-step title="提交入庫單" ></el-step>
                    <el-step title="审核入庫單"></el-step>
                    <el-step title="進入庫存"></el-step>
                </el-steps>
                <span>
          <template>
            <el-table empty-text="暫無數據" height="260" max-height="350" border :data="detailTable" style="width: 100%">
              <el-table-column prop="name" label="名稱"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="pnum" label="商品編號"></el-table-column>
               <el-table-column prop="model" label="規格"></el-table-column>
              <el-table-column
                      prop="imageUrl"
                      label="圖片"
                      align="center"
                      width="150px"
                      padding="0px"
              >
                <template slot-scope="scope">
                  <img
                          :src="'https://www.zykhome.club/'+scope.row.imageUrl"
                          alt
                          style="width: 30px;height:30px"
                  />
                </template>
              </el-table-column>
               <el-table-column prop="count" label="數量"></el-table-column>
                <el-table-column prop="unit" label="單位"></el-table-column>
            </el-table>
              <!--              明细分頁-->
        <el-pagination
                style="margin-top:20px;"
                background
                @current-change="handleDetailSizeChange"
                :current-page="this.pageNum"
                :page-size="3"
                layout="prev, pager, next,total"
                :total="this.detailTotal">
        </el-pagination>
          </template>

        </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天(此刻)',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const end = new Date(new Date(new Date().toLocaleDateString()).getTime());
                                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一個月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                        }, {
                            text: '最近两個月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三個月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },
                supplier:{},
                detailTotal:0,
                pageNum:1,
                detailId:undefined,
                loading: true,
                detailTable: [],
                dialogVisible: false,
                total: 0,
                queryMap: {pageNum: 1, pageSize: 10, status: 0},
                tableData: [],
                range:[],
                pStatus:'',//步骤flag
            };
        },
        methods: {
            /**
             * 關閉明细
             */
            closeDetail(){
                this.pageNum=1;
            },
            clearTime(){
                this.queryMap= {pageNum: 1, pageSize: 10, status: 0};
                this.queryMap.startTime=null;
                this.queryMap.endTime=null;
                this.range=[];
            },
            /**
             *  改變頁碼
             */
            handleDetailSizeChange(newSize) {
                this.pageNum = newSize;
                this.detail(this.detailId);
            },

            /**
             *廢棄物入庫审核
             */
            async publish(id){
                const { data: res } = await this.$http.put("business/inStock/publish/"+id);
                if (!res.success) {
                    return this.$message.error("审核失敗:"+res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("入庫已审核通過");
                }
            },
            /**
             * 從回收站恢复
             */
            async back(id){
                const { data: res } = await this.$http.put("business/inStock/back/"+id);
                if (!res.success) {
                    return this.$message.error("從回收站恢复失敗:"+res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("從回收站中已恢复");
                }
            },
            /**
             * 移除回收站
             */
            async remove(id) {
                const {data: res} = await this.$http.put("business/inStock/remove/" + id);
                if (!res.success) {
                    return this.$message.error("移入回收站失敗:" + res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("移入回收站成功");
                }
            },
            /**删除明细
             */
            async del(id) {
                const {data: res} = await this.$http.get("business/inStock/delete/" + id);
                if (!res.success) {
                    return this.$message.error("删除失敗:" + res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("删除入庫單記錄成功");
                }
            },
            /**
             * 查看入庫單明细
             */
            async detail(id) {
                this.detailId=id;
                const {data: res} = await this.$http.get("business/inStock/detail/" + id+"?pageNum="+this.pageNum);
                if (!res.success) {
                    this.$message.error("獲取明细失敗:" + res.data.errorMsg);
                } else {
                    this.detailTable = res.data.itemVOS;
                    this.detailTotal = res.data.total;
                    this.supplier=res.data.supplierVO;
                    this.pStatus=res.data.status;
                    this.dialogVisible = true;

                }

            },
            /**
             * 加載表格數據
             */
            async loadTableData() {

                if(this.range!=null&&this.range.length===1){
                    this.queryMap.startTime=this.range[0];
                }else if(this.range!=null&&this.range.length===2){
                    this.queryMap.startTime=this.range[0];
                    this.queryMap.endTime=this.range[1];
                }

                const {data: res} = await this.$http.get("business/inStock/findInStockList", {
                    params: this.queryMap
                });
                if (!res.success) {
                    return this.$message.error("獲取列表失敗:"+res.data.errorMsg);
                } else {
                    this.total = res.data.total;
                    this.tableData = res.data.rows;
                }
            },
            /**
             * 改變頁碼
             */
            handleSizeChange(newSize) {
                this.queryMap.pageSize = newSize;
                this.loadTableData();
            },
            /**
             * 查詢入庫單
             */
            search() {
                this.queryMap.pageNum = 1;
                this.loadTableData();
            },
            /**
             * 點擊分頁
             */
            handleCurrentChange(current) {
                this.queryMap.pageNum = current;
                this.loadTableData();
            }
        },
        created() {
            this.loadTableData();
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    };
</script>


