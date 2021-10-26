<template>
  <div id="Logs">
    <!-- 面包導航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>後台功能</el-breadcrumb-item>
      <el-breadcrumb-item>操作日誌</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右側卡片區域 -->
    <!-- 用戶列表卡片區 -->
    <el-card class="box-card">

    <el-form :inline="true" size="mini" :model="queryMap" class="demo-form-inline">
      <el-form-item label="操作">
          <el-input   @keyup.enter.native="search"  clearable  @clear="search" v-model="queryMap.username" placeholder="操作"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input   @keyup.enter.native="search"  clearable  @clear="search" v-model="queryMap.username" placeholder="操作人"></el-input>
        </el-form-item>
        <!-- <el-form-item label="ip地址">
           <el-input   @keyup.enter.native="search"  clearable  @clear="search" v-model="queryMap.ip" placeholder="ip地址"></el-input>
        </el-form-item>

        <el-form-item label="操作位置">
           <el-input   @keyup.enter.native="search"  clearable  @clear="search" v-model="queryMap.location" placeholder="操作位置"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"  @click="search" icon="el-icon-search">查詢</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  @click="deleteFileOrDirectory(sels)" :disabled="this.sels.length === 0" class="el-icon-delete">批量</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格區域 -->
      <template>
        <el-table
                size="mini"
          border
          stripe
          :data="LogData"
          style="width: 100%;"
          height="460"
          @selection-change="selsChange"
        >
         <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" width="150"></el-table-column>

       <!-- <el-table-column :show-overflow-tooltip="true" prop="method" label="方法" width="180">

          </el-table-column>

          <el-table-column :show-overflow-tooltip="true" prop="params"  label="参數" width="100">
            <template slot-scope="scope">
                  <span>{{ scope.row.params }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="time" label="耗時" width="120" sortable>
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.time>=2000" size="mini" type="danger" >
                   {{scope.row.time+'毫秒'}}
                  </el-tag>
                  <el-tag size="mini" v-else-if="scope.row.time>=1000&&scope.row.time<=2000" >
                   {{scope.row.time+'毫秒'}}
                  </el-tag>
                  <el-tag v-else  type="success" size="mini">
                   {{scope.row.time+'毫秒'}}
                  </el-tag>
              </template>
          </el-table-column>
            <el-table-column prop="location" label="操作地點" width="240"></el-table-column>
            <el-table-column prop="ip" label="IP地址" width="160"></el-table-column> -->
          <el-table-column prop="username" label="操作人" width="150" ></el-table-column>
            <el-table-column prop="createTime" label="時間" sortable width="180"></el-table-column>


          <!-- <el-table-column label="操作" width="100px;" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="mini"  v-hasPermission="'log:delete'" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </template>
      <!-- 分頁 -->
      <el-pagination
        style="margin-top:10px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-sizes="[10, 15, 20]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sels: [], //選中的值顯示
      LogData: [],
      total: 0, //總共多少條數據
      queryMap: { pageNum: 1, pageSize: 10, location: "" } //查詢對象
    };
  },
  methods: {
    async deleteFileOrDirectory() {
        const ids = this.sels.map(item => item.id).join(); //獲取所有選中行的id组成的字符串，以逗號分隔
        const res = await this.$confirm(
            "此操作將永久批量删除系統日誌, 是否繼續?",
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
        const { data: res } = await this.$http.delete("system/log/batchDelete/" + ids);
        if (res.success) {
          this.$message.success("系統日誌删除成功");
          await this.getLogList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },
    selsChange(sels) {
      this.sels = sels;
    },
    //搜索
    search() {
      this.queryMap.pageNum = 1;
      this.getLogList();
    },

    //加載系統日誌列表
    async getLogList() {
      const { data: res } = await this.$http.get("system/log/findLogList", {
        params: this.queryMap
      });
      if (!res.success) {
        return this.$message.error("獲取列表失敗");
      } else {
        this.total = res.data.total;
        this.LogData = res.data.rows;
      }
    },
    //删除系統日誌
    async del(id) {
        let res = await this.$confirm(
            "此操作將永久删除該系統日誌, 是否繼續?",
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
        const { data: res } = await this.$http.delete("system/log/delete/" + id);
        if (res.success) {
          this.$message.success("系統日誌删除成功");
          await this.getLogList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },

    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getLogList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getLogList();
    }
  },
  created() {
    this.getLogList();
  }
};
</script>

<style>
.el-tooltip__popper{max-width: 400px;}
</style>
