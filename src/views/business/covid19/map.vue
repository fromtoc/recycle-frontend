<template>
  <div class="hello">
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>健康報備</el-breadcrumb-item>
      <el-breadcrumb-item>全國疫情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    初始化echarts需要個有寬高的盒子-->
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <el-tabs type="border-card">
              <el-tab-pane label="疫情概覽">
                <el-table  empty-text="暫無數據" v-loading="loading" border :data="info" style="width: 100%" height="495">
                  <el-table-column prop="name" label="名稱" width="150"></el-table-column>
                  <el-table-column prop="value" label="數量" >
                    <template slot-scope="scope">
                      <el-tag effect="plain" size="mini">{{scope.row.value}}人</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="yesterday" label="較昨日" width="100">
                    <template slot-scope="scope">
                      <el-tag effect="plain" size="mini" v-if="scope.row.yesterday>0" type="danger">{{scope.row.yesterday}} 人</el-tag>
                      <el-tag effect="plain" size="mini" v-else type="success">{{scope.row.yesterday}}人</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="時間"> <span style="font-size: 11px;">{{times}}</span></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="TOP10城市" >
                <el-table

                        height="495"
                        border
                    :data="top10"
                    style="width: 100%;font-size: 10px;">

              <el-table-column

                      prop="name"
                      label="城市名稱"
                      width="180">
              </el-table-column>
              <el-table-column

                      prop="ename"
                      label="English">
              </el-table-column>
                  <el-table-column
                          prop="jwsrNum"
                          label="確診人數"
                          width="180">
                    <template slot-scope="scope">
                      <el-tag v-text="scope.row.jwsrNum+'人'" size="mini" type="danger" effect="plain"></el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

            </el-tabs>



        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-card>
            <div ref="mapbox" style="height:520px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card>
            <el-table  empty-text="暫無數據"  stripe  :data="tableData" style="width: 100%;">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-table  empty-text="暫無數據" :data="scope.row.city" style="width: 100%">
                    <el-table-column prop="name" label="城市/區" width="200"></el-table-column>

                    <el-table-column sortable label="現存確診" prop="econNum"></el-table-column>
                    <el-table-column sortable label="累計確診" prop="cureNum"></el-table-column>
                    <el-table-column sortable label="疑似" prop="susNum"></el-table-column>
                    <el-table-column sortable label="死亡" prop="deathNum"></el-table-column>
                    <el-table-column sortable label="現存無症狀" prop="asymptomNum"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column sortable label="省份" prop="name"></el-table-column>
              <el-table-column sortable label="現存確診" prop="econNum"></el-table-column>
              <el-table-column sortable label="累計確診" prop="value"></el-table-column>
              <el-table-column sortable label="疑似" prop="susNum"></el-table-column>
              <el-table-column sortable label="死亡" prop="deathNum"></el-table-column>
              <el-table-column sortable label="現存無症狀" prop="asymptomNum"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import jsonp from "jsonp";

const option = {
  title: {
    text: "疫情地圖",
    link: "https://baidu.com",
    subtext: "疫情地圖",
    sublink: "https://baidu.com"
  },
  series: [
    {
      name: "確診人數",
      type: "map", //告诉echarts要去渲染一個地圖
      map: "china",
      label: {
        show: true, // 控制對應地區的漢字
        color: "#333",
        fontSize: 10
      },
      roam: true, //控制地圖放大缩小
      zoom: 1.2, //控制地圖的放大缩小
      data: [], //用来展示後台给的數據  {name:xx,value:xxx}
      /*      控制地圖板塊的顏色和邊框*/
      itemStyle: {
        areaColor: "#83b5e7",
        borderColor: "yellow" //邊框顏色
      },
      /*     控制鼠標滑過之後的背景色和字體顏色*/
      emphasis: {
        label: {
          color: "#fff",
          fontsize: 12
        },
        itemStyle: {
          areaColor: "#83b5e7"
        }
      }
    }
  ],
  visualMap: [
    {
      type: "piecewise",
      show: true,
      pieces: [
        //分段
        { min: 10000 },
        { min: 1000, max: 9990 },
        { min: 100, max: 999 },
        { min: 10, max: 99 },
        { min: 1, max: 9 }
      ],
      inRange: {
        symbol: "rect",
        color: ["#ffc0b1", "#e70520"]
      },
      itemWidth: 20,
      itemHeight: 10
    }
  ],
  tooltip: {
    trigger: "item" //鼠標移入後顯示人數
  }
};
export default {
  name: "HelloWorld",
  data() {
    return {
      times:'',
      loading:true,
      info: [],
      tableData: [],
      top10:[],
    };
  },
  mounted() {
    //template掛載到頁面時調用
    this.getData(); //執行getData方法

    this.mychart = echarts.init(this.$refs.mapbox);
    this.mychart.setOption(option);
  },
  methods: {
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427", //接口
        {},
        (err, data) => {
          if (!err) {
            //代表請求數據成功
            let list = data.data.list.map(item => ({
              name: item.name,
              value: item.value
            })); //從接口獲取到數據後，使用map()函數，進行接口數據映射
            option.series[0].data = list;
            this.tableData = data.data.list;

            this.mychart.setOption(option);
            //這行代碼能執行的前提是DOM已經渲染完成，只有DOM已渲染完成才能echarts初始化
            this.buildTable(data); //構建表格數據
          }
        }
      );
    },
    /**
     * 構建表格數據:每日新增....
     */
    buildTable(data) {
      var data = data.data;
      let data1 = {
        name: "現存確診",
        value: data.econNum,
        yesterday: data.add_daily["addecon_new"]
      };
      let data2 = {
        name: "累計境外輸入",
        value: data.jwsrNum,
        yesterday: data.add_daily["addjwsr"]
      };
      let data3 = {
        name: "現無症狀",
        value: data.asymptomNum,
        yesterday: data.add_daily["addasymptom"]
      };
      let data4 = {
        name: "現存確診重症",
        value: data.heconNum,
        yesterday: data.add_daily["addhecon_new"]
      };
      let data5 = {
        name: "累計確診",
        value: data.gntotal,
        yesterday: data.add_daily["addcon_new"]
      };
      let data6 = {
        name: "累計死亡",
        value: data.deathtotal,
        yesterday: data.add_daily["adddeath_new"]
      };
      let data7 = {
        name: "累計治癒",
        value: data.curetotal,
        yesterday: data.add_daily["addcure_new"]
      };
      let data8 = {
        name: "現存疑似",
        value: data.sustotal,
        yesterday: data.add_daily["wjw_addsus_new"]
      };
      this.times=data.times;
      this.top10=data.jwsrTop;

      this.info.push(data1);
      this.info.push(data2);
      this.info.push(data3);
      this.info.push(data4);
      this.info.push(data5);
      this.info.push(data6);
      this.info.push(data7);
      this.info.push(data8);
      this.loading=false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

