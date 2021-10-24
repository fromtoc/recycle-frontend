<template>
  <div id="stocks">
    <!-- 面包導航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>廢棄物管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存维护</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="13">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <!-- 為 ECharts 准備一個具備大小（寬高）的 DOM -->
            <div id="tianxing" style="width: 650px;height:350px;"></div>
          </el-card>
          <el-card class="box-card" style="margin-top:10px;">
            <!-- 库存饼圖 -->
            <div id="bingtu" style="width: 590px;height:225px;"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
              <el-form-item>
                <el-cascader
                        placeholder="請選擇分類查詢"
                        :change-on-select="true"
                        @change="selectChange"
                        v-model="categorykeys"
                        :props="searchSelectProps"
                        :options="catetorys"
                        clearable
                ></el-cascader>
              </el-form-item>

              <el-form-item>
                <el-input clearable @clear="search" v-model="queryMap.name" placeholder="廢棄物名稱" ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="mini" type="primary" @click="search" icon="el-icon-search">查詢</el-button>
              </el-form-item>
            </el-form>
            <el-table height="530" border :data="tableData" style="width: 100%">
              <el-table-column prop="imageUrl" label="圖片" align="center" width="80" padding="0px">
                <!--            <template slot-scope="scope">-->
                <!--              <img-->
                <!--                slot="error"-->
                <!--                :src="'https://www.zykhome.club/'+scope.row.imageUrl"-->
                <!--                alt-->
                <!--                style="width: 55px;height:55px"-->
                <!--              />-->
                <!--            </template>-->
                <template slot-scope="scope">
                  <el-popover placement="right"  trigger="hover">
                    <img :src="'https://www.zykhome.club/'+scope.row.imageUrl"  style="height: 200px;width: 200px"/>
                    <img  slot="reference" :src="'https://www.zykhome.club/'+scope.row.imageUrl" :alt="scope.row.imgUrl" style="height: 21px;width: 21px;cursor: pointer">
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名稱" width="140"></el-table-column>
              <el-table-column prop="model" label="規格" width="120"></el-table-column>
              <el-table-column prop="stock" label="库存">
                  <template slot-scope="scope">
                      <el-tag size="mini" closable>{{scope.row.stock}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column prop="unit" label="單位"></el-table-column>
            </el-table>
            <!-- 分頁 -->
            <el-pagination
              style="margin-top:20px;"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryMap.pageNum"
              :page-sizes="[9, 10, 15, 20]"
              layout="total, prev, pager, next, jumper,sizes"
              :total="total"
            ></el-pagination>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      catetorys: [], //類別選擇
      searchSelectProps: {
        expandTrigger: "hover",
        value: "id",
        label: "name",
        children: "children",
        checkStrictly: true
      }, //級聯搜索選擇器配置项
      categorykeys: [] ,
      total: 0,
      tableData: [],
      queryMap: { pageSize: 9, pageNum: 1 },
      xData: [],
      yData: [],
      legendData: [], //饼圖存放廢棄物名稱
      selected: {}, //存放選擇的數據
      seriesData: [{ name: "", value: "" }] //饼圖數據
    };
  },
  methods: {
    /**
     * 搜索
     */
    search() {
      this.queryMap.pageNum = 1;
      this.getStockList();
    },
    /**
     * 加載库存信息
     */
    async getStockList() {
      const { data: res } = await this.$http.get("business/product/findProductStocks", {
        params: this.queryMap
      });
      if (!res.success) {
        return this.$message.error("獲取廢棄物库存列表失敗:"+res.data.errorMsg);
      } else {
        this.total = res.data.total;
        this.tableData = res.data.rows;
        this.xData = [];
        this.yData = [];
        this.selected = {};
        const $this = this;
        //構建表格條形统計圖的數據
        this.tableData.forEach(function(e) {
          console.log(e)
          $this.xData.push(e.name);
          $this.yData.push(e.stock);
        });
        //重新绘制表格
        this.draw();
        //饼圖
        this.findAllProductStocks();
      }
    },

    //改變頁碼
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getStockList();
    },
    //翻頁
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getStockList();
    },
    /**
     * 绘制條形统計圖
     */
    draw() {
      var myChart = echarts.init(document.getElementById("tianxing"));
      // 指定圖表的配置项和數據
      var option = {
        title: {
          text: "库存條形圖"
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false }, //  缩放
            magicType: { type: ["bar"] }, ///　　折线  直方圖切换
            restore: {}, // 重置
            saveAsImage: {} // 導出圖片
          }
        },
        tooltip: {},
        legend: {
          data: ["库存量"]
        },
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            name: "库存量",
            type: "bar",
            showBackground: true,
            data: this.yData,
            itemStyle: {
                    normal: {
　　　　　　　　　　　　　　//好，這里就是重頭戏了，定义一個list，然後根据所以取得不同的值，這样就實現了，
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#0780cf ','#fa6d1d ','#ac2026 ','#701866 ','#d22e8d ',
                               '#FE8463','#a195c5 ','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#a195c5  ','#F4E001','#F0805A','#63b2ee'
                            ];
                            return colorList[params.dataIndex]
                        },
　　　　　　　　　　　　　　//以下為是否顯示，顯示位置和顯示格式的設置了
                        label: {
                            show: true,
                            position: 'top',
//                             formatter: '{c}'
                            formatter: '{b}\n{c}'
                        }
                    }
                },
          },

        ]
      };

      // 使用刚指定的配置项和數據顯示圖表。
      myChart.setOption(option);
    },
    /**
     * 绘制饼圖
     */
    drawRound() {
      var myChart = echarts.init(document.getElementById("bingtu"));
      var option = {
        title: {
          text: "库存占比圖",

          left: "left"
        },
         toolbox: {
          show: true,
          feature: {
            saveAsImage: {} // 導出圖片
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: this.legendData,
          selected: this.selected
        },
        series: [
          {
            name: "廢棄物名稱",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },

    /**
     * 廢棄物所有的库存信息
     */
    async findAllProductStocks() {
      const { data: res } = await this.$http.get("business/product/findAllStocks", {
        params: this.queryMap
      });
      if (!res.success) {
        return this.$message.error("獲取廢棄物所有库存失敗:"+res.data.errorMsg);
      } else {
        this.legendData = [];
        this.selected = {};
        this.seriesData = [{}];
        var $this = this;
        //構建饼圖的數據對象
        res.data.forEach(function(e) {
          $this.legendData.push(e.name);
          $this.seriesData.push({ name: e.name, value: e.stock });
        });

        //重新绘制表格
        this.drawRound();
      }
    },
    /**
     * 分類搜索改變時
     */
    selectChange() {
      var str = "";
      for (var i = 0; i < this.categorykeys.length; i++) {
        str += this.categorykeys[i] + ",";
      }
      str = str.substring(0, str.length - 1);
      this.queryMap.categorys = str;
    },
    /**
     * 加載廢棄物類別
     */
    async getCatetorys() {
      const { data: res } = await this.$http.get(
              "business/productCategory/categoryTree"
      );
      if (!res.success) {
        return this.$message.error("獲取廢棄物類別失敗:"+res.data.errorMsg);
      } else {
        this.catetorys = res.data.rows;
      }
    },
  },
  created() {
    this.getStockList();
    this.getCatetorys();
    this.findAllProductStocks();
  },
  mounted: function() {
    this.draw();
    this.drawRound();
  }
};
</script>
