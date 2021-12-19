(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-265d31c2"],{a15b:function(e,t,r){"use strict";var a=r("23e7"),s=r("44ad"),n=r("fc6a"),i=r("a640"),o=[].join,c=s!=Object,u=i("join",",");a({target:"Array",proto:!0,forced:c||!u},{join:function(e){return o.call(n(this),void 0===e?",":e)}})},a640:function(e,t,r){"use strict";var a=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&a((function(){r.call(null,t||function(){throw 1},1)}))}},a898:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"productCategroys"}},[r("el-breadcrumb",{staticStyle:{"padding-left":"10px","padding-bottom":"10px","font-size":"12px"},attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首頁")]),r("el-breadcrumb-item",[e._v("廢棄物管理")]),r("el-breadcrumb-item",[e._v("廢棄物資料")])],1),r("el-card",{staticClass:"box-card"},[r("el-row",{attrs:{gutter:6}},[r("el-col",{attrs:{span:4}},[r("el-cascader",{attrs:{size:"small",placeholder:"請選擇分類查詢","change-on-select":!0,props:e.searchSelectProps,options:e.cateories,clearable:""},on:{change:e.selectChange},model:{value:e.categorykeys,callback:function(t){e.categorykeys=t},expression:"categorykeys"}})],1),r("el-col",{attrs:{span:5}},[r("el-input",{staticClass:"input-with-select",attrs:{clearable:"",size:"small",placeholder:"請輸入廢棄物名稱查詢"},on:{clear:e.search},model:{value:e.queryMap.name,callback:function(t){e.$set(e.queryMap,"name",t)},expression:"queryMap.name"}})],1),r("el-col",{attrs:{span:15}},[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("查詢")]),r("el-button",{attrs:{size:"small",icon:"el-icon-refresh-right"},on:{click:e.resetForm}},[e._v("重置")]),r("div",{staticStyle:{float:"right"}},[r("span",{staticStyle:{"margin-right":"5px"}},[e._v("顯示停用")]),r("el-switch",{model:{value:e.showProductStop,callback:function(t){e.showProductStop=t},expression:"showProductStop"}})],1),r("router-link",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"product:price",expression:"'product:price'"}],staticStyle:{float:"right","margin-right":"20px"},attrs:{to:"/business/product/price"}},[r("el-button",{attrs:{size:"small",icon:"el-icon-price-tag",type:"danger"}},[e._v("單價維護")])],1),r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"product:export",expression:"'product:export'"}],staticStyle:{float:"right","margin-right":"20px"},attrs:{size:"small",icon:"el-icon-download"},on:{click:e.downExcel}},[e._v("下載")]),r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"product:add",expression:"'product:add'"}],staticStyle:{float:"right","margin-right":"20px"},attrs:{size:"small",type:"success",icon:"el-icon-circle-plus-outline"},on:{click:e.openAdd}},[e._v("新增 ")])],1)],1),[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{"empty-text":"暫無數據",size:"mini",border:"",stripe:"",data:e.productData,height:"400"}},[r("el-table-column",{attrs:{label:"序號",type:"index",index:e.getIndex,width:"50"}}),r("el-table-column",{attrs:{prop:"oneCategoryName",label:"廢棄物大分類"}}),r("el-table-column",{attrs:{prop:"twoCategoryName",label:"廢棄物小分類"}}),r("el-table-column",{attrs:{prop:"name",label:"廢棄物名稱"}}),r("el-table-column",{attrs:{prop:"isban",label:"停用",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{on:{change:function(r){return e.changeStatus(t.row)}},model:{value:t.row.status,callback:function(r){e.$set(t.row,"status",r)},expression:"scope.row.status"}})]}}])}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?r("span",[r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"product:edit",expression:"'product:edit'"}],attrs:{type:"text",size:"mini",icon:"el-icon-edit"},on:{click:function(r){return e.edit(t.row.id)}}},[e._v("編輯")])],1):e._e()]}}])})],1)],r("el-pagination",{staticStyle:{"margin-top":"10px"},attrs:{background:"","current-page":this.queryMap.pageNum,"page-sizes":[7,10,15,20],"page-size":this.queryMap.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),r("el-dialog",{attrs:{title:"新增廢棄物",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t}}},[r("span",[r("el-form",{ref:"addRuleFormRef",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.addRuleForm,rules:e.addRules,"label-width":"100px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"廢棄物分類",prop:"categoryKeys"}},[r("el-cascader",{attrs:{placeholder:"請選擇",options:e.cateories,clearable:"",filterable:"",props:e.selectProps},model:{value:e.addRuleForm.categoryKeys,callback:function(t){e.$set(e.addRuleForm,"categoryKeys",t)},expression:"addRuleForm.categoryKeys"}})],1)],1)])],1),r("el-form-item",{attrs:{label:"廢棄物名稱",prop:"name"}},[r("el-input",{model:{value:e.addRuleForm.name,callback:function(t){e.$set(e.addRuleForm,"name",t)},expression:"addRuleForm.name"}})],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary",disabled:e.btnDisabled,loading:e.btnLoading},on:{click:e.add}},[e._v("確 定")])],1)]),r("el-dialog",{attrs:{title:"編輯廢棄物",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.closeEditDialog}},[r("span",[r("el-form",{ref:"editRuleFormRef",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.editRuleForm,rules:e.addRules,"label-width":"100px"}},[r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"廢棄物分類",prop:"categoryKeys"}},[r("el-cascader",{attrs:{placeholder:"請選擇",options:e.cateories,clearable:"",filterable:"",props:e.selectProps},model:{value:e.editRuleForm.categoryKeys,callback:function(t){e.$set(e.editRuleForm,"categoryKeys",t)},expression:"editRuleForm.categoryKeys"}})],1)],1)])],1),r("el-form-item",{attrs:{label:"廢棄物名稱",prop:"name"}},[r("el-input",{model:{value:e.editRuleForm.name,callback:function(t){e.$set(e.editRuleForm,"name",t)},expression:"editRuleForm.name"}})],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary",disabled:e.btnDisabled,loading:e.btnLoading},on:{click:e.update}},[e._v("確 定")])],1)]),r("el-dialog",{attrs:{title:"成本中心分配",visible:e.costCenterDialogVisible,width:"50%"},on:{"update:visible":function(t){e.costCenterDialogVisible=t},close:e.closeAddDialog}},[r("el-select",{attrs:{placeholder:"請選擇成本中心"},model:{value:e.costCenterId,callback:function(t){e.costCenterId=t},expression:"costCenterId"}},e._l(e.costCenters,(function(t){return r("el-option",{key:t.id,attrs:{label:t.value,value:t.id}},[r("span",{staticStyle:{float:"left"}},[e._v(e._s(t.value))])])})),1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.costCenterDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.assignCostCenter()}}},[e._v("確 定")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],2)],1)},s=[],n=r("1da1"),i=(r("b0c0"),r("a15b"),r("d81d"),r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),r("9861"),r("96cf"),r("bc3a")),o=r.n(i),c={data:function(){return{showProductStop:!1,costCenters:[],costCenterId:"",uploadApi:this.BASE_API_URL+"system/upload/image",btnLoading:!1,btnDisabled:!1,loading:!0,headerObject:{Authorization:LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN)},cateories:[],selectProps:{expandTrigger:"hover",value:"id",label:"name",children:"children",checkStrictly:!1},searchSelectProps:{expandTrigger:"hover",value:"id",label:"name",children:"children",checkStrictly:!0},editDialogVisible:!1,addDialogVisible:!1,costCenterDialogVisible:!1,total:0,productData:[],queryMap:{pageNum:1,pageSize:7,name:"",categoryId:"",supplier:"",status:!1},addRuleForm:{},editRuleForm:{},uploadDisabled:!1,limitCount:1,dialogImageUrl:"",dialogVisible:!1,addRules:{name:[{required:!0,message:"請輸入廢棄物名稱",trigger:"blur"}],categorys:[{required:!0,message:"請輸入廢棄物分類",trigger:"blur"}],categoryKeys:[{required:!0,message:"請選擇廢棄物分類",trigger:"blur"}]},imgFilesList:[],categorykeys:[]}},computed:{},methods:{getIndex:function(e){return(this.queryMap.pageNum-1)*this.queryMap.pageSize+e+1},resetForm:function(){this.queryMap={pageNum:1,pageSize:7,name:"",categoryId:"",supplier:"",status:!1},this.showProductStop=!1},openAdd:function(){this.getCatetorys(),this.addDialogVisible=!0},search:function(){this.queryMap.pageNum=1,this.getproductList()},publish:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("business/product/publish/"+e);case 2:if(a=r.sent,s=a.data,s.success){r.next=8;break}return r.abrupt("return",t.$message.error("审核失敗:"+s.data.errorMsg));case 8:return r.next=10,t.getproductList();case 10:return r.abrupt("return",t.$message.success("廢棄物已审核通過"));case 11:case"end":return r.stop()}}),r)})))()},del:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("此操作將永久删除該廢棄物, 是否繼續?","提示",{confirmButtonText:"確定",cancelButtonText:"取消",type:"warning"}).catch((function(){t.$message({type:"info",message:"已取消删除"})}));case 2:if(a=r.sent,"confirm"!==a){r.next=15;break}return r.next=6,t.$http.delete("business/product/delete/"+e);case 6:if(s=r.sent,n=s.data,!n.success){r.next=14;break}return t.$message.success("廢棄物删除成功"),r.next=12,t.getproductList();case 12:r.next=15;break;case 14:t.$message.error(n.data.errorMsg);case 15:case"end":return r.stop()}}),r)})))()},update:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.editRuleFormRef.validate(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(r){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=4;break}return t.abrupt("return");case 4:return e.btnDisabled=!0,e.btnLoading=!0,t.next=8,e.$http.put("business/product/update/"+e.editRuleForm.id,e.editRuleForm);case 8:if(a=t.sent,s=a.data,!s.success){t.next=17;break}return e.$notify({title:"成功",message:"廢棄物信息更新",type:"success"}),e.editRuleForm={},t.next=15,e.getproductList();case 15:t.next=18;break;case 17:e.$message.error("廢棄物信息更新失敗:"+s.data.errorMsg);case 18:e.editDialogVisible=!1,e.btnDisabled=!1,e.btnLoading=!1;case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},edit:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s,n,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.get("business/product/edit/"+e);case 2:if(a=r.sent,s=a.data,!s.success){r.next=10;break}t.editRuleForm=s.data,n=s.data,t.imgFilesList.push({url:"https://www.zykhome.club/"+n.imageUrl,name:n.name,id:n.id}),r.next=11;break;case 10:return r.abrupt("return",t.$message.error("廢棄物信息編輯失敗"+s.data));case 11:i=[],i.push(s.data.oneCategoryId),i.push(s.data.twoCategoryId),t.editRuleForm.categoryKeys=i,t.editDialogVisible=!0;case 16:case"end":return r.stop()}}),r)})))()},add:function(){var e=this;this.$refs.addRuleFormRef.validate(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(r){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=4;break}return t.abrupt("return");case 4:return e.btnDisabled=!0,e.btnLoading=!0,t.next=8,e.$http.post("business/product/add",e.addRuleForm);case 8:if(a=t.sent,s=a.data,!s.success){t.next=17;break}return e.$message.success("廢棄物新增成功"),e.addRuleForm={},t.next=15,e.getproductList();case 15:t.next=21;break;case 17:return e.addDialogVisible=!1,e.btnDisabled=!1,e.btnLoading=!1,t.abrupt("return",e.$message.error("廢棄物新增失敗:"+s.data));case 21:e.addDialogVisible=!1,e.btnDisabled=!1,e.btnLoading=!1;case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},remove:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("business/product/remove/"+e);case 2:if(a=r.sent,s=a.data,s.success){r.next=8;break}return r.abrupt("return",t.$message.error("移入回收站失敗:"+s.data.errorMsg));case 8:return r.next=10,t.getproductList();case 10:return r.abrupt("return",t.$message.success("移入回收站成功"));case 11:case"end":return r.stop()}}),r)})))()},back:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("product/back/"+e);case 2:if(a=r.sent,s=a.data,s.success){r.next=8;break}return r.abrupt("return",t.$message.error("從回收站恢复失敗:"+s.data.errorMsg));case 8:return r.next=10,t.getproductList();case 10:return r.abrupt("return",t.$message.success("從回收站中已恢复"));case 11:case"end":return r.stop()}}),r)})))()},getproductList:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("business/product/findProductList",{params:e.queryMap});case 2:if(r=t.sent,a=r.data,a.success){t.next=8;break}return t.abrupt("return",e.$message.error("獲取廢棄物列表失敗"));case 8:e.total=a.data.total,e.productData=a.data.rows;case 10:case"end":return t.stop()}}),t)})))()},getCatetorys:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("business/productCategory/categoryTree");case 2:if(r=t.sent,a=r.data,a.success){t.next=8;break}return t.abrupt("return",e.$message.error("獲取廢棄物類別失敗"));case 8:e.cateories=a.data.rows;case 9:case"end":return t.stop()}}),t)})))()},changeStatus:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var a,s,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("business/product/updateStatus/"+e.id+"/"+e.status);case 2:a=r.sent,s=a.data,s.success?(n=e.status?"廢棄物狀態已禁用":"廢棄物狀態已啟用",t.$notify.success({title:"操作成功",message:n})):(t.$message.error("更新廢棄物狀態失敗:"+s.data.errorMsg),e.status=!e.status);case 5:case"end":return r.stop()}}),r)})))()},handleChange:function(e,t){this.uploadDisabled=t.length>=this.limitCount},handleRemove:function(e,t){this.uploadDisabled=t.length>=this.limitCount,this.addRuleForm.imageUrl=""},handleSizeChange:function(e){this.queryMap.pageSize=e,this.getproductList()},handleCurrentChange:function(e){this.queryMap.pageNum=e,this.getproductList()},closeAddDialog:function(){this.$refs.addRuleFormRef.clearValidate(),this.addRuleForm={},this.$refs.upload.clearFiles()},closeEditDialog:function(){this.$refs.editRuleFormRef.clearValidate(),this.editRuleForm={},this.$refs.upload2.clearFiles(),this.imgFilesList=[]},handleSuccess:function(e,t,r){this.addRuleForm.imageUrl=e.msg},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},editHandleSuccess:function(e,t,r){this.editRuleForm.imageUrl=e.msg},selectChange:function(){for(var e="",t=0;t<this.categorykeys.length;t++)e+=this.categorykeys[t]+",";e=e.substring(0,e.length-1),this.queryMap.categorys=e},selsChange:function(e){this.sels=e},assignCostCenter:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.sels.map((function(e){return e.id})).join(),t.next=3,e.$http.put("business/product/costCenter/"+r+"/"+e.costCenterId);case 3:if(a=t.sent,s=a.data,!s.success){t.next=11;break}return e.$message.success("成本中心分配成功"),t.next=9,e.getproductList();case 9:t.next=12;break;case 11:e.$message.error(s.data.errorMsg);case 12:e.costCenterDialogVisible=!1,e.costCenterId="";case 14:case"end":return t.stop()}}),t)})))()},getCostCenters:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("system/costCenter/findAll");case 2:if(r=t.sent,a=r.data,a.success){t.next=6;break}return t.abrupt("return",e.$message.error("獲取成本中心列表失敗:"+a.data.errorMsg));case 6:e.costCenters=a.data;case 7:case"end":return t.stop()}}),t)})))()},downExcel:function(){var e=this;o.a.request({url:"business/product/excel",method:"post",responseType:"blob"}).then((function(t){if("application/json"===t.headers["content-type"])return e.$message.error("Subject does not have permission [product:export]");var r=t.data,a=window.URL.createObjectURL(r),s=document.createElement("a");document.body.appendChild(s),s.href=a,s.download="廢棄物列表.xls",s.click(),window.URL.revokeObjectURL(a)}))}},created:function(){var e=this;this.getproductList(),this.getCatetorys(),this.getCostCenters(),setTimeout((function(){e.loading=!1}),500)},watch:{showProductStop:function(e,t){this.queryMap={pageNum:1,pageSize:7,name:"",categoryId:"",supplier:"",status:!1},this.queryMap.status=e,this.getproductList()}}},u=c,l=r("2877"),d=Object(l["a"])(u,a,s,!1,null,null,null);t["default"]=d.exports},b0c0:function(e,t,r){var a=r("83ab"),s=r("5e77").EXISTS,n=r("9bf2").f,i=Function.prototype,o=i.toString,c=/^\s*function ([^ (]*)/,u="name";a&&!s&&n(i,u,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-265d31c2.d38ea657.js.map