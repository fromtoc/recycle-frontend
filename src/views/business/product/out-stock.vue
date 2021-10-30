<template>
    <div class="outStocks">
        <!-- 面包導航 -->
        <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>廢棄物管理</el-breadcrumb-item>
            <el-breadcrumb-item>出库記錄</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片部分-->
        <el-card>
        <!--搜索部分-->
            <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
                <el-form-item label="發放單號">
                    <el-input v-model="queryMap.outNum" placeholder="發放單號"></el-input>
                </el-form-item>
                <el-form-item label="發放類型">
                    <el-select v-model="queryMap.type" placeholder="發放類型">
                        <el-option label="全部類型" value=""></el-option>
                        <el-option label="政府领取" value="0"></el-option>
                        <el-option label="医院领取" value="1"></el-option>
                        <el-option label="小區领取" value="2"></el-option>
                        <el-option label="個人领取" value="3"></el-option>
                        <el-option label="其他领取" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select    v-model="queryMap.status" placeholder="請選擇狀態">
                        <el-option label="已發放" :value="0"></el-option>
                        <el-option label="回收站" :value="1"></el-option>
                        <el-option label="待审核" :value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search">查詢</el-button>
                    <el-button  @click="reset">重置</el-button>
                </el-form-item>

                <el-form-item>
                    <router-link to="/business/product/publish">
                        <el-button type="success" >
                            發放
                        </el-button>
                    </router-link>
                </el-form-item>
            </el-form>
<!--            數據表格-->
                <el-table
                        size="mini"
                        border
                        :data="tableData"
                        style="width: 100%;height: 450px;">
                    <el-table-column label="#" prop="id" width="50"></el-table-column>
                    <el-table-column  prop="outNum" :show-overflow-tooltip='true' label="發放單號" width="180"></el-table-column>
                    <el-table-column prop="type" label="發放類型" width="100">
                        <template slot-scope="scope">
                            <el-tag  effect="plain" size="mini"  type="success" v-if="scope.row.type===0">政府领取</el-tag>
                            <el-tag  effect="plain" size="mini" type="danger"  v-else-if="scope.row.type===1">医院领取</el-tag>
                            <el-tag  effect="plain" size="mini"  type="warning"  v-else-if="scope.row.type===2">小區领取</el-tag>
                            <el-tag  effect="plain" size="mini"  type="info"  v-else-if="scope.row.type===3">個人领取</el-tag>
                            <el-tag  effect="plain" size="mini"   v-else-if="scope.row.type===4">其他领取</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="priority" label="紧急程度" width="180">
                        <template slot-scope="scope">
                            <el-rate
                                    :disabled="true"
                                    v-model="scope.row.priority"
                                    show-text
                                    :texts="['不急','常規','紧急','特急','超急']"
                            >
                            </el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="發放地點" width="150"></el-table-column>
                    <el-table-column prop="productNumber" label="總數" width="80"></el-table-column>
                    <el-table-column prop="phone" label="聯繫方式" width="120"></el-table-column>
                    <el-table-column prop="status" label="狀態" width="100">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="danger" effect="plain" v-if="scope.row.status==1">回收</el-tag>
                            <el-tag size="mini" effect="plain" v-if="scope.row.status==0">已放</el-tag>
                            <el-tag size="mini" effect="plain" type="warning" v-if="scope.row.status==2">审核中</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="operator" label="操作员" width="150"></el-table-column>

                    <el-table-column prop="createTime" label="發放時間" width="200px;"></el-table-column>
                    <el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-view" type="text" size="small" @click="detail(scope.row.id)">
                                明细
                            </el-button>
                            <!--                        给操作员使用的按鈕-->
                            <span v-if="scope.row.status==0">
                             <el-popconfirm
                                     @onConfirm="remove(scope.row.id)"
                                     style="margin-left: 20px;"
                                     confirmButtonText='好的'
                                     cancelButtonText='不用了'
                                     icon="el-icon-info"
                                     iconColor="red"
                                     title="這是一段内容確定移入回收站嗎？"
                             >
              <el-button type="text" slot="reference" size="mini" icon="el-icon-s-operation">回收站</el-button>
            </el-popconfirm>
                        </span>
                            <!--   给操作员使用的按鈕(回收站)-->
                            <span v-if="scope.row.status==1">
                             <el-popconfirm
                                     @onConfirm="back(scope.row.id)"
                                     style="margin-left:10px;"
                                     confirmButtonText='好的'
                                     cancelButtonText='不用了'
                                     icon="el-icon-info"
                                     iconColor="green"
                                     title="這是一段内容確定恢复數據嗎？"
                             >
                            <el-button type="text" slot="reference" size="mini" icon="el-icon-s-operation">還原</el-button>
                        </el-popconfirm>
                                <el-popconfirm
                                        style="margin-left:20px;"
                                        @onConfirm="del(scope.row.id)"
                                        title="這是一段内容確定删除嗎？"
                                >
                            <el-button type="text" slot="reference" size="small" icon="el-icon-delete">删除</el-button>
                        </el-popconfirm>
                        </span>

                            <!--                        给审核员使用的按鈕-->
                            <span v-if="scope.row.status===2">
                          <el-popconfirm
                                  style="margin-left:20px;"
                                  @onConfirm="publish(scope.row.id)"
                                  title="审核通過後库存將更新,是否通過"
                          >
                        <el-button type="text" slot="reference" size="small" icon="el-icon-refresh">通過</el-button>
                    </el-popconfirm>
                        <el-popconfirm
                                style="margin-left:20px;"
                                @onConfirm="del(scope.row.id)"
                                title="這是一段内容確定删除嗎？"
                        >
                            <el-button type="text" slot="reference" size="small" icon="el-icon-delete">删除</el-button>
                        </el-popconfirm>
                        </span>

                        </template>
                    </el-table-column>
                </el-table>
<!--                表格分頁-->
                <el-pagination
                        style="margin-top:20px;"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryMap.pageNum"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="queryMap.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                ></el-pagination>
            <!-- 發放明细 -->
            <el-dialog title="發放明细" :visible.sync="dialogVisible" @close="closeDetail" width="60%">
                <!--                来源信息-->
                <el-card class="box-card" style="margin-bottom: 10px;">
                    <div  class="text item">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">省區市:</span> &nbsp;<el-tag size="mini" >{{consumer.address}}</el-tag>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">具體位置:</span> &nbsp;<el-tag size="mini" >{{consumer.name}}</el-tag>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">聯繫人 :</span> &nbsp;<el-tag size="mini"  >{{consumer.contact}}</el-tag>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <span style="font-size: 11px;color: #303030;">電話 : </span>&nbsp;<el-tag size="mini" >{{consumer.phone}}</el-tag>
                                </div>
                            </el-col>

                        </el-row>
                    </div>
                </el-card>
                <!--                步骤條-->
                <el-steps simple v-if="pStatus==0"  style="margin-left: 10px;margin-bottom: 5px;" :space="200" :active="3" finish-status="success">
                    <el-step title="提交發放單" ></el-step>
                    <el-step title="审核發放單"></el-step>
                    <el-step title="成功發放"></el-step>
                </el-steps>
                <el-steps simple v-if="pStatus==2"  style="margin-left: 10px;margin-bottom: 5px;" :space="200" :active="2" finish-status="success">
                    <el-step title="提交發放單" ></el-step>
                    <el-step title="审核發放單"></el-step>
                    <el-step title="成功發放"></el-step>
                </el-steps>
                <span>
          <template>
            <el-table empty-text="暫無數據"  height="260" max-height="350" border :data="detailTable" style="width: 100%">
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
                consumer:{},
                detailTotal:0,
                detailTable:[],
                dialogVisible:false,
                pageNum:1,
                total:0,
                queryMap:{pageNum:1,pageSize:10, status: 0,},
                tableData:[],
                pStatus:'',//步骤flag
            }
        },
        methods:{
            /**
             *廢棄物發放审核
             */
            async publish(id){

                const { data: res } = await this.$http.put("business/outStock/publish/"+id);
                if (!res.success) {
                    return this.$message.error("审核失敗:"+res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("發放已审核通過");
                }
            },

            /**
             * 關閉明细
             */
            closeDetail(){
                this.pageNum=1;
            },
            /**
             *  改變頁碼
             */
            handleDetailSizeChange(newSize) {
                this.pageNum = newSize;
                this.detail(this.detailId);
            },

            /**
             * 查看發放單明细
             */
            async detail(id) {
                this.detailId=id;
                const {data: res} = await this.$http.get("business/outStock/detail/" + id+"?pageNum="+this.pageNum);
                if (!res.success) {
                    this.$message.error("獲取明细失敗:" + res.data.errorMsg);
                } else {
                    this.detailTable = res.data.itemVOS;
                    this.detailTotal = res.data.total;
                    this.consumer=res.data.consumerVO;
                    this.pStatus=res.data.status;
                    this.dialogVisible = true;
                }

            },

            /**
             * 從回收站恢复
             */
            async back(id){
                const { data: res } = await this.$http.put("business/outStock/back/"+id);
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
                const {data: res} = await this.$http.put("business/outStock/remove/" + id);
                if (!res.success) {
                    return this.$message.error("移入回收站失敗:" + res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("移入回收站成功");
                }
            },

            /**
             * 重置查詢表單
             */
            reset(){
                this.queryMap={pageNum:1,pageSize:10 ,status: 0,};
            },
            /**
             * 加載表格數據
             */
            async loadTableData() {
                const {data: res} = await this.$http.get("business/outStock/findOutStockList", {
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
             * 點擊分頁
             */
            handleCurrentChange(current) {
                this.queryMap.pageNum = current;
                this.loadTableData();
            },
            //搜索
            search() {
                this.queryMap.pageNum = 1;
                this.loadTableData();
            },

            /**删除明细
             */
            async del(id) {
                const {data: res} = await this.$http.get("business/outStock/delete/" + id);
                if (!res.success) {
                    return this.$message.error("删除失敗:" + res.data.errorMsg);
                } else {
                    await this.loadTableData();
                    return this.$message.success("删除發放單記錄成功");
                }
            },

        },
        created() {
            this.loadTableData();
        }
    }
</script>
