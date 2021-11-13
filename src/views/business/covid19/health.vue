<template>
    <div class="health">
        <!--       面包屑導航-->
        <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>健康報備</el-breadcrumb-item>
            <el-breadcrumb-item>每日打卡</el-breadcrumb-item>
        </el-breadcrumb>
        <!--       打卡部分 style="height: 590px;"-->
        <el-card style="height: 590px;">
            <el-alert
                    :closable="false"
                    style="margin-bottom: 20px;"
                    v-if="reported"
                    show-icon
                    :title="'今日已成功打卡,勤洗手,戴口罩,不群聚,打卡時間:['+ruleForm.createTime+']'"
                    type="success">
            </el-alert>
            <h5 style="margin: 0px;padding: 0px;">基本信息  <div style="float: right;margin-bottom: 10px;vertical-align: center;">
            <el-button @click="OpenHistory"   size="small" type="warning">簽到記錄</el-button>
                <el-button style="margin-top: 5px;" type="primary"   size="small" @click="onSubmit" v-if="!reported">立即打卡</el-button>
                <el-button @click="reset"  size="small" v-if="!reported">重置</el-button>
            </div></h5>

            <!--            抽屜-->
            <el-drawer
                    :with-header="false"
                    :visible.sync="drawer"
                    :direction="direction"
                    >
                <span>
                    <el-card class="box-card"  v-for="item in this.historyTable" :key="item.id" style="margin-bottom: 10px;">
                      <div class="text item">
                         <ul>
                             <li>打卡人:{{userInfo.username}}</li>
                             <li>打卡位置:{{item.address}}</li>
                             <li>打卡時間:{{item.createTime}}</li>
                             <li>健康狀况:
                                 <div style="float: right">
                                       <el-tag v-if="item.situation===0" size="small" effect="dark" type="success">健康</el-tag>
                                <el-tag v-else-if="item.situation===1" size="small" effect="dark" type="danger">發熱</el-tag>
                                <el-tag v-else-if="item.situation===2"  size="small" effect="dark"  type="warning">其他情况</el-tag>
                                 </div>
                             </li>
                         </ul>
                      </div>
<!--                        分頁-->

                    </el-card>
                     <el-pagination
                             @current-change="handleCurrentChange"
                             :current-page="queryMap.pageNo"
                             :page-size="queryMap.pageSize"
                             style="margin-top: 20px;"
                             background
                             small
                             layout="prev, pager, next"
                             :total="historyTotal">
                        </el-pagination>
                </span>
            </el-drawer>

            <el-divider></el-divider>
            <el-form size="small" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="打卡人">
                                <el-input v-model="userInfo.username" disabled></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="打卡時間">
                                    <el-date-picker
                                            disabled
                                            v-model="nowTime"
                                            type="datetime"
                                            placeholder="選擇日期時間">
                                    </el-date-picker>

                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="grid-content bg-purple">
                                <el-form-item label="所屬公司">
                                    <el-input v-model="userInfo.department" disabled></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>

            <h5 style="margin: 0px;padding: 0px;">健康打卡</h5>

            <el-divider></el-divider>
            <el-form  size="small" :inline="true" :label-position="'top'" :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="省份" prop="valueProvince">
                                <el-select
                                        :disabled="reported"
                                        v-model="ruleForm.valueProvince"
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
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                        <el-form-item label="城市" prop="valueCity">
                            <el-select
                                    :disabled="reported"
                                    v-model="ruleForm.valueCity"
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
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item label="區縣" prop="valueOrigin">
                                <el-select
                                        :disabled="reported"
                                        v-model="ruleForm.valueOrigin"
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
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                    <el-form-item v-if="reported" label="打卡位置" prop="valueOrigin">
                        <el-tag size="small">
                            {{ruleForm.address}}
                        </el-tag>
                    </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="目前健康狀况" prop="situation">
                                <el-radio-group :disabled="reported" v-model="ruleForm.situation">
                                    <el-radio :label="0">健康</el-radio>
                                    <el-radio :label="1">有咳嗽發熱症狀</el-radio>
                                    <el-radio :label="2">其他情况</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="接觸的人是否有疑似症狀?  (冠狀病毒檢測结果為陽性或尚在等待檢測结構)" prop="touch">
                                <el-radio-group :disabled="reported" v-model="ruleForm.touch">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="自2020年1月1日起,是否在湖北省停留過 (保存轉車路過)" prop="passby">
                                <el-radio-group :disabled="reported" v-model="ruleForm.passby">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="自2020年1月1日起,是否有接待過来自湖北的客戶,親戚或朋友)" prop="reception">
                                <el-radio-group :disabled="reported" v-model="ruleForm.reception">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

            </el-form>

        </el-card>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                queryMap:{pageSize:4,pageNum:1},
                reported:false,
                historyTable:[],
                historyTotal:0,
                provinceList: [], // 省列表
                cityList: [], // 市列表
                originList: [], // 區列表
                cityOptions: [], // 市下拉框數據
                originOptions: [] // 區下拉框數據
                ,
                ruleForm: {},
                nowTime: new Date(),
                userInfo: {},
                rules: {
                    situation: [
                        {required: true, message: "請選擇當前情况", trigger: "blur"},
                    ],
                    touch: [
                        {required: true, message: "請選擇是否接觸", trigger: "blur"},
                    ],
                    passby: [
                        {required: true, message: "請選擇是否路過", trigger: "blur"},
                    ],
                    reception: [
                        {required: true, message: "請選擇是否招待", trigger: "blur"},
                    ],
                    valueProvince: [
                        { required: true, message: "請輸入省份", trigger: "blur" }
                    ],
                    valueCity: [{ required: true, message: "請輸入城市", trigger: "blur" }],
                    valueOrigin: [
                        { required: true, message: "請輸入區縣", trigger: "blur" }
                    ],
                },
            }
        },
        methods: {
            OpenHistory(){
                this.drawer = true;
                this.reportHistory();
            },
            /**
             * 翻頁
             */
            handleCurrentChange(current) {
                this.queryMap.pageNum = current;
                this.reportHistory();
            },

            //打卡歷史記錄
            async reportHistory(){
                const { data: res } = await this.$http.get("business/health/history",{
                    params: this.queryMap
                });
                if(!res.success){
                    return this.$message.error("歷史記錄獲取失敗:" + res.msg);
                }else {
                    this.historyTable=res.data.rows;
                    this.historyTotal=res.data.total;
                }
            },
            //今日是否已簽到
            async isReport(){
                const { data: res } = await this.$http.get("business/health/isReport");
                if(!res.success){
                    return this.$message.error("今日健康報備檢查錯誤:" + res.msg);
                }else {
                    if(res.data){
                        this.reported=true;
                        this.ruleForm=res.data;
                    }else {
                        this.reported=false;
                        this.$notify.warning({
                            title: '温馨提示',
                            message: '您今日還未打卡,別忘記了哟~'
                        });
                    }
                }
            },
            //打卡
            onSubmit(){
                this.$refs.ruleFormRef.validate(async valid => {
                    if (!valid) {
                        return;
                    } else {
                        this.ruleForm.address =
                            this.ruleForm.province +
                            "/" +
                            this.ruleForm.city +
                            "/" +
                            this.ruleForm.origin;
                        const { data: res } = await this.$http.post(
                            "business/health/report",
                            this.ruleForm
                        );
                        if (res.success) {
                            this.reported=true;
                            this.ruleForm.createTime=this.nowTime;
                            this.$message.success("健康報備成功");
                        } else {
                            return this.$message.error("健康報備失敗:" + res.msg);
                        }
                    }
                });
            },

            //重置打卡表單
            reset(){
                this.$refs.ruleFormRef.clearValidate();
                this.ruleForm={};
            },
            currentTime() {
                setInterval(this.getDate, 500);
            },
            getDate() {
                this.nowTime = new Date();

            },
            // 選擇省
            changeProvince(val) {
                this.provinceList.forEach((province, index) => {
                    if (val.toString() === this.provinceList[index].value) {
                        this.cityOptions = this.provinceList[index].children;
                        this.ruleForm.valueCity = this.provinceList[
                            index
                            ].children[0].value; //設置市的值
                        this.ruleForm.city = this.provinceList[index].children[0].label;

                        this.ruleForm.valueOrigin = this.provinceList[
                            index
                            ].children[0].children[0].value; //設置縣的值
                        this.ruleForm.origin = this.provinceList[
                            index
                            ].children[0].children[0].label;

                        this.originOptions = this.provinceList[index].children[0].children;
                        //set value
                        this.ruleForm.province = this.provinceList[index].label;
                    }
                });
            },
            // 選擇市
            changeCity(val) {
                this.cityList.forEach((city, index) => {
                    if (val.toString() === this.cityList[index].value) {
                        this.originOptions = this.cityList[index].children;
                        this.ruleForm.valueOrigin = this.cityList[index].children[0].value; //設置縣的值;
                        //set value
                        this.ruleForm.city = this.cityList[index].label;
                    }
                });
            },
            // 選擇區
            changeOrigin(val) {
                this.ruleForm.valueOrigin = val;

                this.originList.forEach((origin, index) => {
                    if (val.toString() === this.originList[index].value) {
                        //set value
                        this.ruleForm.origin = this.originList[index].label;
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
            this.isReport();
            this.userInfo = this.$store.state.userInfo;
            this._getJsonData();
        },
        mounted() {
            this.currentTime();
        },
        // 銷毁定時器
        beforeDestroy: function () {
            if (this.getDate) {
                clearInterval(this.getDate); // 在Vue實例銷毁前，清除時間定時器
            }
        }

    }
</script>
