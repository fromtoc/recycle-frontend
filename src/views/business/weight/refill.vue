<template>
  <div id="welcome">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>秤重管理</el-breadcrumb-item>
      <el-breadcrumb-item>相關資料補登</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="18">
      <!-- 左邊部分 -->
      <el-col :span="9">
        <el-card
          ><div class="grid-content bg-purple-light" style="font-size: 80px">
            <i
              class="el-icon-office-building"
              style="cursor: pointer; margin-left: 20px"
            ></i>
            <span
              style="
                font-size: 30px;
                margin-top: 5px;
                margin-left: 5px;
                margin-right: 50px;
              "
            >
              大樓租賃相關數據統計
            </span>
            <br />
            <el-button
              type="primary"
              style="width: 100px"
              @click="dialogVisible1 = true"
              >上傳<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </div>
        </el-card>
        <br />
        <el-card
          ><div class="grid-content bg-purple-light" style="font-size: 80px">
            <i
              class="el-icon-delete"
              style="cursor: pointer; margin-left: 20px"
            ></i>
            <span
              style="
                font-size: 30px;
                margin-top: 5px;
                margin-left: 5px;
                margin-right: 50px;
              "
            >
              投遞系統垃圾統計
            </span>
            <br />
            <el-button
              type="primary"
              style="width: 100px"
              @click="dialogVisible2 = true"
              >上傳<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </div>
        </el-card>
        <br />
      </el-col>
      <el-col :span="9">
        <el-card
          ><div class="grid-content bg-purple-light" style="font-size: 80px">
            <i
              class="el-icon-s-data"
              style="cursor: pointer; margin-left: 20px"
            ></i>
            <span
              style="
                font-size: 30px;
                margin-top: 5px;
                margin-left: 5px;
                margin-right: 50px;
              "
            >
              工程廢棄物處理重量統計
            </span>
            <br />
            <el-button
              type="primary"
              style="width: 100px"
              @click="dialogVisible3 = true"
              >上傳<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </div>
        </el-card>
        <br />
        <el-card
          ><div class="grid-content bg-purple-light" style="font-size: 80px">
            <i
              class="el-icon-truck"
              style="cursor: pointer; margin-left: 20px"
            ></i>
            <span
              style="
                font-size: 30px;
                margin-top: 5px;
                margin-left: 5px;
                margin-right: 50px;
              "
            >
              清運及費用統計
            </span>
            <br />
            <el-button
              type="primary"
              style="width: 100px"
              @click="dialogVisible4 = true"
              >上傳<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </div>
        </el-card>
        <br />
      </el-col>
    </el-row>
    <!-- 大樓租賃相關數據統計 -->
    <el-dialog
    
      title="上傳大樓租賃相關數據統計資料"
      :visible.sync="dialogVisible1"
      width="50%"
      @close="closeDialog1"
    >
      <span>
        <el-form
          :model="addRuleForm1"
          :rules="addRules1"
          ref="addRuleFormRef1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <span style="margin: 0 10px">請選擇上傳月份</span>
            <el-date-picker
              size="small"
              v-model="addRuleForm1.uploadMonth"
              type="month"
              placeholder="選擇上傳月份"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </div>
          <br />
          <el-table
            :data="tableData1"
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="point" label="指標" width="250">
            </el-table-column>
            <el-table-column prop="number" label="數量" width="250">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="單位"> </el-table-column>
          </el-table>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add1"
          :disabled="btnDisabled"
          :loading="btnLoading"
          >確 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 投遞系統垃圾統計 -->
    <el-dialog
      title="上傳投遞系統垃圾統計資料"
      :visible.sync="dialogVisible2"
      width="50%"
      @close="closeDialog2"
    >
      <span>
        <el-form
          :model="addRuleForm2"
          :rules="addRules2"
          ref="addRuleFormRef2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <span style="margin: 0 10px">請選擇上傳月份</span>
            <el-date-picker
              size="small"
              v-model="addRuleForm2.uploadMonth"
              type="month"
              placeholder="選擇上傳月份"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </div>
          <br />
          <el-table
            :data="tableData2"
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="point" label="指標" width="250">
            </el-table-column>
            <el-table-column prop="number" label="數量" width="250">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="單位"> </el-table-column>
          </el-table>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add2"
          :disabled="btnDisabled"
          :loading="btnLoading"
          >確 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 工程廢棄物處理重量統計 -->
    <el-dialog
      title="上傳工程廢棄物處理重量統計資料"
      :visible.sync="dialogVisible3"
      width="50%"
      @close="closeDialog3"
    >
      <span>
        <el-form
          :model="addRuleForm3"
          :rules="addRules3"
          ref="addRuleFormRef3"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <span style="margin: 0 10px">請選擇上傳月份</span>
            <el-date-picker
              size="small"
              v-model="addRuleForm3.uploadMonth"
              type="month"
              placeholder="選擇上傳月份"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </div>
          <br />
          <el-table
            :data="tableData3"
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="point" label="指標" width="250">
            </el-table-column>
            <el-table-column prop="number" label="數量" width="250">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="單位"> </el-table-column>
          </el-table>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add3"
          :disabled="btnDisabled"
          :loading="btnLoading"
          >確 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 清運及費用統計 -->
    <el-dialog
      title="上傳清運及費用統計資料"
      :visible.sync="dialogVisible4"
      width="50%"
      @close="closeDialog4"
    >
      <span>
        <el-form
          :model="addRuleForm4"
          :rules="addRules4"
          ref="addRuleFormRef4"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <span style="margin: 0 10px">請選擇上傳月份</span>
            <el-date-picker
              size="small"
              v-model="addRuleForm4.uploadMonth"
              type="month"
              placeholder="選擇上傳月份"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </div>
          <br />
          <el-table
            :data="tableData4"
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="point" label="指標" width="250">
            </el-table-column>
            <el-table-column prop="number" label="數量" width="250">
              <template slot-scope="scope">
                <el-input type="number" v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="單位"> </el-table-column>
          </el-table>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add4"
          :disabled="btnDisabled"
          :loading="btnLoading"
          >確 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import icon from "../../system/icon.vue";
export default {
  components: { icon },

  data() {
    return {
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      addRuleForm1: {}, //新增表單數據
      addRuleForm2: {}, //新增表單數據
      addRuleForm3: {}, //新增表單數據
      addRuleForm4: {}, //新增表單數據
      addRules1: {
        code: [
          { required: true, message: "請輸入公司類型代碼", trigger: "blur" },
        ],
      }, //新增驗證
      addRules2: {
        code: [
          { required: true, message: "請輸入公司類型代碼", trigger: "blur" },
        ],
      }, //新增驗證
      addRules3: {
        code: [
          { required: true, message: "請輸入公司類型代碼", trigger: "blur" },
        ],
      }, //新增驗證
      addRules4: {
        code: [
          { required: true, message: "請輸入公司類型代碼", trigger: "blur" },
        ],
      }, //新增驗證
      tableData1: [
        {
          point: "大樓出租面積",
          unit: "坪",
        },
        {
          point: "大樓租戶員工人數(發卡數)",
          unit: "人",
        },
      ],
      tableData2: [
        {
          point: "投遞系統",
          unit: "KG",
        },
      ],
      tableData3: [
        {
          point: "回收級配粗料",
          unit: "KG",
        },
        {
          point: "回收級配細料",
          unit: "KG",
        },
        {
          point: "回收木材",
          unit: "KG",
        },
        {
          point: "含鐵金屬",
          unit: "KG",
        },
        {
          point: "非鐵金屬",
          unit: "KG",
        },
        {
          point: "回收塑膠料",
          unit: "KG",
        },
        {
          point: "不可回收垃圾",
          unit: "KG",
        },
      ],
      tableData4: [
        {
          point: "投遞系統壓縮櫃",
          unit: "次",
        },
        {
          point: "工程廢棄物開放櫃",
          unit: "次",
        },
        {
          point: "人工投遞壓縮櫃",
          unit: "次",
        },
        {
          point: "木頭開放櫃",
          unit: "次",
        },
        {
          point: "紙類開放櫃",
          unit: "次",
        },
        {
          point: "資源回收物",
          unit: "次",
        },
        {
          point: "契約服務費用",
          unit: "元",
        },
        {
          point: "資源回收金額",
          unit: "元",
        },
        {
          point: "焚化廠規費(內湖、北投、木柵)",
          unit: "元",
        },
        {
          point: "焚化廠規費(山豬坑)",
          unit: "元",
        },
        {
          point: "工程廢棄物(尊弘環保)",
          unit: "元",
        },
      ],
    };
  },
  methods: {
    //關閉彈出框
    closeDialog1() {
      this.$refs.addRuleFormRef1.clearValidate();
      this.addRuleForm1 = {};
    },
    closeDialog2() {
      this.$refs.addRuleFormRef2.clearValidate();
      this.addRuleForm2 = {};
    },
    closeDialog3() {
      this.$refs.addRuleFormRef3.clearValidate();
      this.addRuleForm3 = {};
    },
    closeDialog4() {
      this.$refs.addRuleFormRef4.clearValidate();
      this.addRuleForm4 = {};
    },
    add1() {
      this.addRuleForm1.number1 = this.tableData1[0].number;
      this.addRuleForm1.number2 = this.tableData1[1].number;
      console.log(this.addRuleForm1);
    },
    add2() {
      this.addRuleForm2.number1 = this.tableData2[0].number;
      console.log(this.addRuleForm2);
    },
    add3() {
      this.addRuleForm3.number1 = this.tableData3[0].number;
      this.addRuleForm3.number2 = this.tableData3[1].number;
      this.addRuleForm3.number3 = this.tableData3[2].number;
      this.addRuleForm3.number4 = this.tableData3[3].number;
      this.addRuleForm3.number5 = this.tableData3[4].number;
      this.addRuleForm3.number6 = this.tableData3[5].number;
      this.addRuleForm3.number7 = this.tableData3[6].number;
      console.log(this.addRuleForm3);
    },
    add4() {
      this.addRuleForm4.number1 = this.tableData4[0].number;
      this.addRuleForm4.number2 = this.tableData4[1].number;
      this.addRuleForm4.number3 = this.tableData4[2].number;
      this.addRuleForm4.number4 = this.tableData4[3].number;
      this.addRuleForm4.number5 = this.tableData4[4].number;
      this.addRuleForm4.number6 = this.tableData4[5].number;
      this.addRuleForm4.number7 = this.tableData4[6].number;
      this.addRuleForm4.number8 = this.tableData4[7].number;
      this.addRuleForm4.number9 = this.tableData4[8].number;
      this.addRuleForm4.number10 = this.tableData4[9].number;
      this.addRuleForm4.number11 = this.tableData4[10].number;
      console.log(this.addRuleForm4);
    },
  },

  created() {},
  mounted: function () {},
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  background-image: url("http://myforum.oss-cn-beijing.aliyuncs.com/postImages/1582867606734617c9668-8086-4c9b-867e-efda0bff78d63.png?Expires=1677475607&OSSAccessKeyId=LTAI4FsV5R1tnt8W8kqFqBYh&Signature=3xKM18EXDDD%2BQmsg%2B0t7uDC%2FMGg%3D");
  background-size: 100% 100%;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  background-image: url("http://myforum.oss-cn-beijing.aliyuncs.com/postImages/15828676585536f809b01-a5c3-4229-8ce6-ed29a7bdaaa22.png?Expires=1677475658&OSSAccessKeyId=LTAI4FsV5R1tnt8W8kqFqBYh&Signature=k2fJfFzwKwp7f2c%2BRD7rdH%2FAj%2Bs%3D");
  background-size: 100% 100%;
}
</style>
