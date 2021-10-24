<template>
  <div class="attachments">
    <!-- 面包導航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>附件管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 圖片列表部分 -->
    <el-card>
      <!-- 搜索部分 -->
      <el-form :size="'small'" :inline="true" :model="queryMap" class="demo-form-inline">
        <el-form-item label="圖片路徑">
          <el-input clearable @clear="search" v-model="queryMap.path" placeholder="輸入圖片路徑查詢"></el-input>
        </el-form-item>
        <el-form-item label="圖片後缀">
          <el-select clearable @clear="search" v-model="queryMap.suffix" placeholder="請選擇">
            <el-option label="jpg/JPG" value=".jpg"></el-option>
            <el-option label="png/PNG" value=".png"></el-option>
            <el-option label="gif/GIF" value=".gif"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查詢</el-button>
          <el-button type="primary" @click="centerDialogVisible=true">
            上傳
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 圖片展示部分 -->
      <el-row :gutter="20" style="height:430px;" v-loading="loading">
        <el-col style="margin-top:10px;" v-for="image in this.list" :key="image.id" :span="6">
          <div class="grid-content bg-purple">
            <el-image
              :alt="image.path"
              :fit="fits"
              :preview-src-list="srcList"
              style="width:200px;height:170px"
              :src="'https://www.zykhome.club/'+image.path"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div>
              <el-tag
                size="mini"
                effect="dark"
                type="success"
                style="margin-left:50px;"
              >{{image.width}}px X {{image.height}}px</el-tag>
              <el-popconfirm title="這是一段内容確定删除嗎？" @onConfirm="del(image.id)">
                <el-button
                  v-hasPermission="'image:delete'"
                  style="margin-left:30px;"
                  icon="el-icon-delete"
                  size="mini"
                  type="text"
                  slot="reference"
                >删除</el-button>
              </el-popconfirm>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 分頁 -->
      <el-pagination
        style="margin-top:30px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryMap.pageNum"
        :page-sizes="[8, 20, 30, 40]"
        :page-size="queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 上傳彈出框 -->
      <el-dialog title="上傳圖片附件" @close="closeUpload" :visible.sync="centerDialogVisible" width="38%" center>
        <span>
          <el-upload
            accept="image/*"
            :auto-upload="false"
            :multiple="true"
            ref="upload"
            :limit="10"
            :on-exceed="exceed"
            class="upload-demo"
            drag
            :headers="headerObject"
            :on-success="handleUploadSuccess"
            :action="uploadUrl"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              將文件拖到此處，或
              <em>點擊上傳</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上傳jpg/png文件，且不超過500kb,最多支持10張圖片一起上傳</div>
          </el-upload>
        </span>
       <span slot="footer" class="dialog-footer">
          <el-button @click="closeUpload" size="small"  >取消返回</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上傳到服務器</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      uploadUrl:this.BASE_API_URL+"system/upload/image",
      centerDialogVisible: false,
      loading: true,
      total: 0,
      fits: "contain",
      queryMap: {},
      list: [],
      srcList: [],
      headerObject: {
        Authorization: LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN)
      }, //圖片上傳請求頭
    };
  },
  methods: {
    /**
     * 取消上傳
     */
    closeUpload(){
      this.centerDialogVisible=false;
      this.$refs.upload.clearFiles();
    },
    /**
     * 上傳之後的回調
     */
    handleUploadSuccess: function (response, file, fileList) {
      console.log(response)
      if (!response.success) {
        this.$refs.upload.clearFiles();
        return this.$message.error("上傳失敗:" + response.data.errorMsg);
      } else {
        this.ageImageList();
      }
    },
    /**
     *
     * 點擊上傳到服務器
     */
     submitUpload() {
      this.$refs.upload.submit();
    },
    /**
     * 删除圖片
     */
    del: async function (id) {
      const {data: res} = await this.$http.delete("system/upload/delete/" + id);
      if (res.success) {
        this.$message.success("删除圖片成功");
        await this.ageImageList();
      } else {
        this.$message.error(res.data.errorMsg);
      }
    },
    /**
     * 加載附件列表
     */
    async ageImageList() {
      const { data: res } = await this.$http.get("system/upload/findImageList", {
        params: this.queryMap
      });
      if (!res.success) {
        return this.$message.error("獲取附件列表失敗:"+res.data.errorMsg);
      } else {
        const $this = this;
        this.total = res.data.total;
        this.list = res.data.list;
        this.srcList = [];
        this.list.forEach(function(item) {
          $this.srcList.push('https://www.zykhome.club/'+item.path);
        });
      }
    },
    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.ageImageList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.ageImageList();
    },
    /**
     * 搜索
     */
    search() {
      this.queryMap.pageNum = 1;
      this.ageImageList();
    },
    /**
     * 超出允許上傳的時候
     */
    exceed(){
      this.$message.warning("超出允許上傳圖片的數量");
    }
  },
  created() {
    this.ageImageList();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
};
</script>

<style>
.el-upload-dragger {
  width: 530px !important;

}
</style>
