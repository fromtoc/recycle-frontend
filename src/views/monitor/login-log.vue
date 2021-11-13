<template>
  <div id="LoginLogs">
    <!-- 面包導航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>日誌管理</el-breadcrumb-item>
      <el-breadcrumb-item>登入日誌</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右側卡片區域 -->
    <!-- 用戶列表卡片區 -->
    <el-card class="box-card">
      <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
        <el-form-item label="帳號">
          <el-input v-model="queryMap.username" placeholder="請輸入帳號查詢"></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input v-model="queryMap.ip" placeholder="請輸入IP查詢"></el-input>
        </el-form-item>
        <el-form-item label="登入地址">
          <el-input v-model="queryMap.location" placeholder="請輸入登入地址查詢"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-search" @click="search" type="primary">查詢</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="deleteFileOrDirectory(sels)" icon="el-icon-delete"  :disabled="this.sels.length === 0">批量</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格區域 -->
      <template>
        <el-table
          border
          stripe
          size="mini"
          :data="LoginLogData"
          style="width: 100%;"
          height="460"
          @selection-change="selsChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序號" type="index" width="50"></el-table-column>
          <el-table-column prop="username" label="登入用戶" width="150"></el-table-column>
          <el-table-column prop="loginTime" label="登入時間" width="190"></el-table-column>
          <el-table-column prop="location" label="登入地點" width="250"></el-table-column>
          <el-table-column prop="ip" label="IP地址"></el-table-column>
          <el-table-column prop="userSystem" label="操作系统" width="150"></el-table-column>
          <el-table-column prop="userBrowser" label="瀏覽器"></el-table-column>
          <el-table-column label="操作" width="100px;">
            <template slot-scope="scope">
              <el-button
               v-hasPermission="'loginLog:delete'"
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sels: [], //選中的值顯示
      LoginLogData: [],
      total: 0, //總共多少條數據
      queryMap: { pageNum: 1, pageSize: 10, location: "" } //查詢對象
    };
  },
  methods: {
    async deleteFileOrDirectory() {
      var ids = this.sels.map(item => item.id).join(); //獲取所有選中行的id组成的字符串，以逗號分隔
       var res = await this.$confirm(
        "此操作將永久批量删除登入日誌, 是否繼續?",
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
        const { data: res } = await this.$http.delete("system/loginLog/batchDelete/" + ids);
        if (res.success) {
          this.$message.success("登入日誌删除成功");
          await this.getLoginLogList();
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
      this.getLoginLogList();
    },

    //加載登入日誌列表
    async getLoginLogList() {
      const { data: res } = await this.$http.get("system/loginLog/findLoginLogList", {
        params: this.queryMap
      });
      if (!res.success) {
        return this.$message.error("獲取列表失敗:"+res.data.errorMsg);
      } else {
        this.total = res.data.total;
        this.LoginLogData = res.data.rows;
      }
    },
    //删除登入日誌
    async del(id) {
      const res = await this.$confirm(
              "此操作將永久删除該登入日誌, 是否繼續?",
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
        const { data: res } = await this.$http.delete("system/loginLog/delete/" + id);
        if (res.success) {
          this.$message.success("登入日誌删除成功");
          await this.getLoginLogList();
        } else {
          this.$message.error(res.data.errorMsg);
        }
      }
    },

    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getLoginLogList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getLoginLogList();
    }
  },
  created() {
    this.getLoginLogList();
  }
};
</script>
