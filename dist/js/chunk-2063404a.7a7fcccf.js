(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2063404a"],{"1da1":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r("d3b7");function a(e,t,r,a,n,i,o){try{var s=e[i](o),l=s.value}catch(c){return void r(c)}s.done?t(l):Promise.resolve(l).then(a,n)}function n(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var o=e.apply(t,r);function s(e){a(o,n,i,s,l,"next",e)}function l(e){a(o,n,i,s,l,"throw",e)}s(void 0)}))}}},"96cf":function(e,t){!function(t){"use strict";var r,a=Object.prototype,n=a.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag",c="object"===typeof e,u=t.regeneratorRuntime;if(u)c&&(e.exports=u);else{u=t.regeneratorRuntime=c?e.exports:{},u.wrap=w;var d="suspendedStart",p="suspendedYield",m="executing",g="completed",h={},f={};f[o]=function(){return this};var b=Object.getPrototypeOf,y=b&&b(b(E([])));y&&y!==a&&n.call(y,o)&&(f=y);var v=F.prototype=k.prototype=Object.create(f);R.prototype=v.constructor=F,F.constructor=R,F[l]=R.displayName="GeneratorFunction",u.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===R||"GeneratorFunction"===(t.displayName||t.name))},u.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,F):(e.__proto__=F,l in e||(e[l]="GeneratorFunction")),e.prototype=Object.create(v),e},u.awrap=function(e){return{__await:e}},L(_.prototype),_.prototype[s]=function(){return this},u.AsyncIterator=_,u.async=function(e,t,r,a){var n=new _(w(e,t,r,a));return u.isGeneratorFunction(t)?n:n.next().then((function(e){return e.done?e.value:n.next()}))},L(v),v[l]="Generator",v[o]=function(){return this},v.toString=function(){return"[object Generator]"},u.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){while(t.length){var a=t.pop();if(a in e)return r.value=a,r.done=!1,r}return r.done=!0,r}},u.values=E,D.prototype={constructor:D,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(z),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(a,n){return s.type="throw",s.arg=e,t.next=a,n&&(t.method="next",t.arg=r),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var l=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(l&&c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),z(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var a=r.completion;if("throw"===a.type){var n=a.arg;z(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,a){return this.delegate={iterator:E(e),resultName:t,nextLoc:a},"next"===this.method&&(this.arg=r),h}}}function w(e,t,r,a){var n=t&&t.prototype instanceof k?t:k,i=Object.create(n.prototype),o=new D(a||[]);return i._invoke=C(e,r,o),i}function x(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(a){return{type:"throw",arg:a}}}function k(){}function R(){}function F(){}function L(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function _(e){function t(r,a,i,o){var s=x(e[r],e,a);if("throw"!==s.type){var l=s.arg,c=l.value;return c&&"object"===typeof c&&n.call(c,"__await")?Promise.resolve(c.__await).then((function(e){t("next",e,i,o)}),(function(e){t("throw",e,i,o)})):Promise.resolve(c).then((function(e){l.value=e,i(l)}),o)}o(s.arg)}var r;function a(e,a){function n(){return new Promise((function(r,n){t(e,a,r,n)}))}return r=r?r.then(n,n):n()}this._invoke=a}function C(e,t,r){var a=d;return function(n,i){if(a===m)throw new Error("Generator is already running");if(a===g){if("throw"===n)throw i;return O()}r.method=n,r.arg=i;while(1){var o=r.delegate;if(o){var s=$(o,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===d)throw a=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=m;var l=x(e,t,r);if("normal"===l.type){if(a=r.done?g:p,l.arg===h)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(a=g,r.method="throw",r.arg=l.arg)}}}function $(e,t){var a=e.iterator[t.method];if(a===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,$(e,t),"throw"===t.method))return h;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=x(a,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,h;var i=n.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,h):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function z(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function D(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function E(e){if(e){var t=e[o];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function t(){while(++a<e.length)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=r,t.done=!0,t};return i.next=i}}return{next:O}}function O(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},a898:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"productCategroys"}},[r("el-breadcrumb",{staticStyle:{"padding-left":"10px","padding-bottom":"10px","font-size":"12px"},attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("物资管理")]),r("el-breadcrumb-item",[e._v("物资资料")])],1),r("el-card",{staticClass:"box-card"},[r("el-container",{staticStyle:{"margin-bottom":"20px"}},[r("el-alert",{attrs:{"show-icon":"",title:"友情提示:  商品的分类只支持三级分类",type:"warning"}})],1),r("el-row",{attrs:{gutter:6}},[r("el-col",{attrs:{span:5}},[r("el-cascader",{attrs:{size:"small",placeholder:"请选择分类查询","change-on-select":!0,props:e.searchSelectProps,options:e.cateories,clearable:""},on:{change:e.selectChange},model:{value:e.categorykeys,callback:function(t){e.categorykeys=t},expression:"categorykeys"}})],1),r("el-col",{attrs:{span:6}},[r("el-input",{staticClass:"input-with-select",attrs:{clearable:"",size:"small",placeholder:"请输入物资名称查询"},on:{clear:e.search},model:{value:e.queryMap.name,callback:function(t){e.$set(e.queryMap,"name",t)},expression:"queryMap.name"}})],1),r("el-col",{attrs:{span:5}},[[r("el-select",{attrs:{size:"small",placeholder:"请选择状态"},on:{click:e.search},model:{value:e.queryMap.status,callback:function(t){e.$set(e.queryMap,"status",t)},expression:"queryMap.status"}},[r("el-option",{attrs:{label:"正常",value:0}}),r("el-option",{attrs:{label:"回收站",value:1}}),r("el-option",{attrs:{label:"待审核",value:2}})],1)]],2),r("el-col",{attrs:{span:8}},[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("查找")]),r("el-button",{attrs:{size:"small",icon:"el-icon-refresh-right",type:"warning"},on:{click:e.resetForm}},[e._v("重置")]),r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"product:add",expression:"'product:add'"}],attrs:{size:"small",type:"success",icon:"el-icon-circle-plus-outline"},on:{click:e.openAdd}},[e._v("添加 ")]),r("el-button",{attrs:{size:"small",icon:"el-icon-refresh"},on:{click:e.getproductList}},[e._v("刷新")])],1)],1),[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{size:"mini",border:"",stripe:"",data:e.productData,height:"400"}},[r("el-table-column",{attrs:{prop:"id",type:"index",label:"ID"}}),r("el-table-column",{attrs:{prop:"imageUrl",label:"图片",align:"center",width:"150px",padding:"0px"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("el-popover",{attrs:{placement:"right",trigger:"hover"}},[r("img",{staticStyle:{height:"200px",width:"200px"},attrs:{src:"https://www.zykhome.club/"+e.row.imageUrl}}),r("img",{staticStyle:{height:"38px",width:"38px",cursor:"pointer"},attrs:{slot:"reference",src:"https://www.zykhome.club/"+e.row.imageUrl,alt:e.row.imgUrl},slot:"reference"})])]}}])}),r("el-table-column",{attrs:{prop:"name",label:"物资名称"}}),r("el-table-column",{attrs:{prop:"pnum","show-overflow-tooltip":!0,label:"物资编号"}}),r("el-table-column",{attrs:{label:"物资规格",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tag",{attrs:{type:"success",size:"mini",closable:""},domProps:{textContent:e._s(t.row.model)}})]}}])}),r("el-table-column",{attrs:{prop:"unit",label:"单位",width:"80"}}),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),r("el-table-column",{attrs:{prop:"status",label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?r("el-tag",{attrs:{size:"mini",type:"danger",effect:"plain"}},[e._v("回收")]):e._e(),0==t.row.status?r("el-tag",{attrs:{size:"mini",effect:"plain"}},[e._v("正常")]):e._e(),2==t.row.status?r("el-tag",{attrs:{size:"mini",effect:"plain",type:"warning"}},[e._v("审核中")]):e._e()]}}])}),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?r("span",[r("el-popconfirm",{staticStyle:{"margin-left":"10px"},attrs:{confirmButtonText:"好的",cancelButtonText:"不用了",icon:"el-icon-info",iconColor:"green",title:"这是一段内容确定恢复吗？"},on:{onConfirm:function(r){return e.back(t.row.id)}}},[r("el-button",{attrs:{slot:"reference",type:"text",size:"mini",icon:"el-icon-back"},slot:"reference"},[e._v("恢复")])],1),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(r){return e.del(t.row.id)}}},[e._v("删除")])],1):e._e(),0==t.row.status?r("span",[r("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-edit"},on:{click:function(r){return e.edit(t.row.id)}}},[e._v("编辑")]),r("el-popconfirm",{staticStyle:{"margin-left":"10px"},attrs:{confirmButtonText:"好的",cancelButtonText:"不用了",icon:"el-icon-info",iconColor:"red",title:"这是一段内容确定移入回收站吗？"},on:{onConfirm:function(r){return e.remove(t.row.id)}}},[r("el-button",{attrs:{slot:"reference",type:"text",size:"mini",icon:"el-icon-s-operation"},slot:"reference"},[e._v("回收站")])],1)],1):e._e(),2==t.row.status?r("span",[r("el-popconfirm",{staticStyle:{"margin-left":"10px"},attrs:{confirmButtonText:"是的",cancelButtonText:"不用了",icon:"el-icon-info",iconColor:"blue",title:"确定审核通过吗？"},on:{onConfirm:function(r){return e.publish(t.row.id)}}},[r("el-button",{attrs:{slot:"reference",type:"text",size:"mini",icon:"el-icon-s-operation"},slot:"reference"},[e._v("通过")])],1),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(r){return e.del(t.row.id)}}},[e._v("删除")])],1):e._e()]}}])})],1)],r("el-pagination",{staticStyle:{"margin-top":"10px"},attrs:{background:"","current-page":this.queryMap.pageNum,"page-sizes":[6,10,15,20],"page-size":this.queryMap.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),r("el-dialog",{attrs:{title:"添加物资",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.closeAddDialog}},[r("span",[r("el-form",{ref:"addRuleFormRef",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.addRuleForm,rules:e.addRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"物资名称",prop:"name"}},[r("el-input",{model:{value:e.addRuleForm.name,callback:function(t){e.$set(e.addRuleForm,"name",t)},expression:"addRuleForm.name"}})],1),r("el-form-item",{attrs:{label:"物资图片",prop:"name"}},[r("el-upload",{ref:"upload",class:{disabled:e.uploadDisabled},attrs:{action:e.uploadApi,"list-type":"picture-card",limit:e.limitCount,"on-change":e.handleChange,"on-remove":e.handleRemove,accept:"image/*","on-success":e.handleSuccess,headers:e.headerObject,"on-preview":e.handlePictureCardPreview}},[r("i",{staticClass:"el-icon-plus"})])],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple-light"},[r("el-form-item",{attrs:{label:"物资规格",prop:"model"}},[r("el-input",{model:{value:e.addRuleForm.model,callback:function(t){e.$set(e.addRuleForm,"model",t)},expression:"addRuleForm.model"}})],1)],1)]),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"分类",prop:"categoryKeys"}},[r("el-cascader",{attrs:{options:e.cateories,clearable:"",filterable:"",props:e.selectProps},model:{value:e.addRuleForm.categoryKeys,callback:function(t){e.$set(e.addRuleForm,"categoryKeys",t)},expression:"addRuleForm.categoryKeys"}})],1)],1)])],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"单位",prop:"unit"}},[r("el-input",{model:{value:e.addRuleForm.unit,callback:function(t){e.$set(e.addRuleForm,"unit",t)},expression:"addRuleForm.unit"}})],1)],1)]),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple-light"},[r("el-form-item",{attrs:{label:"排序",prop:"sort"}},[r("el-input-number",{attrs:{min:1,max:10,label:"排序"},model:{value:e.addRuleForm.sort,callback:function(t){e.$set(e.addRuleForm,"sort",t)},expression:"addRuleForm.sort"}})],1)],1)])],1),r("el-form-item",{attrs:{label:"备注信息",prop:"remark"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.addRuleForm.remark,callback:function(t){e.$set(e.addRuleForm,"remark",t)},expression:"addRuleForm.remark"}})],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary",disabled:e.btnDisabled,loading:e.btnLoading},on:{click:e.add}},[e._v("确 定")])],1)]),r("el-dialog",{attrs:{title:"更新物资",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.closeEditDialog}},[r("span",[r("el-form",{ref:"editRuleFormRef",staticClass:"demo-ruleForm",attrs:{size:"mini",model:e.editRuleForm,rules:e.addRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"物资名称",prop:"name"}},[r("el-input",{model:{value:e.editRuleForm.name,callback:function(t){e.$set(e.editRuleForm,"name",t)},expression:"editRuleForm.name"}})],1),r("el-form-item",{attrs:{label:"物资图片",prop:"name"}},[r("el-upload",{ref:"upload2",class:{disabled:e.uploadDisabled},attrs:{action:e.uploadApi,"list-type":"picture-card",limit:e.limitCount,accept:"image/*","on-success":e.editHandleSuccess,headers:e.headerObject,"on-preview":e.handlePictureCardPreview,"file-list":e.imgFilesList}},[r("i",{staticClass:"el-icon-plus"})])],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"物资规格",prop:"model"}},[r("el-input",{model:{value:e.editRuleForm.model,callback:function(t){e.$set(e.editRuleForm,"model",t)},expression:"editRuleForm.model"}})],1)],1),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"分类",prop:"categoryKeys"}},[r("el-cascader",{attrs:{options:e.cateories,clearable:"",filterable:"",props:e.selectProps},model:{value:e.editRuleForm.categoryKeys,callback:function(t){e.$set(e.editRuleForm,"categoryKeys",t)},expression:"editRuleForm.categoryKeys"}})],1)],1)])],1),r("el-row",[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-form-item",{attrs:{label:"单位",prop:"unit"}},[r("el-input",{model:{value:e.editRuleForm.unit,callback:function(t){e.$set(e.editRuleForm,"unit",t)},expression:"editRuleForm.unit"}})],1)],1)]),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"grid-content bg-purple-light"},[r("el-form-item",{attrs:{label:"排序",prop:"sort"}},[r("el-input-number",{attrs:{min:1,max:10,label:"排序"},model:{value:e.editRuleForm.sort,callback:function(t){e.$set(e.editRuleForm,"sort",t)},expression:"editRuleForm.sort"}})],1)],1)])],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary",disabled:e.btnDisabled,loading:e.btnLoading},on:{click:e.update}},[e._v("确 定")])],1)]),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],2)],1)},n=[],i=r("1da1"),o=(r("b0c0"),r("96cf"),{data:function(){return{uploadApi:this.BASE_API_URL+"system/upload/image",btnLoading:!1,btnDisabled:!1,loading:!0,headerObject:{Authorization:LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN)},cateories:[],selectProps:{expandTrigger:"hover",value:"id",label:"name",children:"children",checkStrictly:!1},searchSelectProps:{expandTrigger:"hover",value:"id",label:"name",children:"children",checkStrictly:!0},editDialogVisible:!1,addDialogVisible:!1,total:0,productData:[],queryMap:{pageNum:1,pageSize:6,name:"",categoryId:"",supplier:"",status:0},addRuleForm:{},editRuleForm:{},uploadDisabled:!1,limitCount:1,dialogImageUrl:"",dialogVisible:!1,addRules:{name:[{required:!0,message:"请输入物资名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],unit:[{required:!0,message:"请输入物资单位",trigger:"blur"},{min:1,max:10,message:"长度在 1 到 10 个字符",trigger:"blur"}],model:[{required:!0,message:"请输入物资规格",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],remark:[{required:!0,message:"请输入物资说明备注",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],categorys:[{required:!0,message:"请输入物资分类",trigger:"blur"}],sort:[{required:!0,message:"请输入地址信息",trigger:"blur"}],categoryKeys:[{required:!0,message:"请选择物资分类",trigger:"blur"}]},imgFilesList:[],categorykeys:[]}},methods:{resetForm:function(){this.queryMap={pageNum:1,pageSize:5,name:"",categoryId:"",supplier:"",status:0}},openAdd:function(){this.getCatetorys(),this.addDialogVisible=!0},search:function(){this.queryMap.pageNum=1,this.getproductList()},publish:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("business/product/publish/"+e);case 2:if(a=r.sent,n=a.data,n.success){r.next=8;break}return r.abrupt("return",t.$message.error("审核失败:"+n.data.errorMsg));case 8:return r.next=10,t.getproductList();case 10:return r.abrupt("return",t.$message.success("物资已审核通过"));case 11:case"end":return r.stop()}}),r)})))()},del:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("此操作将永久删除该物资, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(){t.$message({type:"info",message:"已取消删除"})}));case 2:if(a=r.sent,"confirm"!==a){r.next=15;break}return r.next=6,t.$http.delete("business/product/delete/"+e);case 6:if(n=r.sent,i=n.data,!i.success){r.next=14;break}return t.$message.success("物资删除成功"),r.next=12,t.getproductList();case 12:r.next=15;break;case 14:t.$message.error(i.data.errorMsg);case 15:case"end":return r.stop()}}),r)})))()},update:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.editRuleFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=4;break}return t.abrupt("return");case 4:return e.btnDisabled=!0,e.btnLoading=!0,t.next=8,e.$http.put("business/product/update/"+e.editRuleForm.id,e.editRuleForm);case 8:if(a=t.sent,n=a.data,!n.success){t.next=17;break}return e.$notify({title:"成功",message:"物资信息更新",type:"success"}),e.editRuleForm={},t.next=15,e.getproductList();case 15:t.next=18;break;case 17:e.$message.error("物资信息更新失败:"+n.data.errorMsg);case 18:e.editDialogVisible=!1,e.btnDisabled=!1,e.btnLoading=!1;case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},edit:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n,i,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.get("business/product/edit/"+e);case 2:if(a=r.sent,n=a.data,!n.success){r.next=10;break}t.editRuleForm=n.data,i=n.data,t.imgFilesList.push({url:"https://www.zykhome.club/"+i.imageUrl,name:i.name,id:i.id}),r.next=11;break;case 10:return r.abrupt("return",t.$message.error("物资信息编辑失败"+n.data.errorMsg));case 11:o=[],o.push(n.data.oneCategoryId),o.push(n.data.twoCategoryId),o.push(n.data.threeCategoryId),t.editRuleForm.categoryKeys=o,t.editDialogVisible=!0;case 17:case"end":return r.stop()}}),r)})))()},add:function(){var e=this;this.$refs.addRuleFormRef.validate(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(r){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=4;break}return t.abrupt("return");case 4:return e.btnDisabled=!0,e.btnLoading=!0,t.next=8,e.$http.post("product/add",e.addRuleForm);case 8:if(a=t.sent,n=a.data,!n.success){t.next=17;break}return e.$message.success("物资添加成功"),e.addRuleForm={},t.next=15,e.getproductList();case 15:t.next=18;break;case 17:return t.abrupt("return",e.$message.error("物资添加失败:"+n.data.errorMsg));case 18:e.addDialogVisible=!1,e.btnDisabled=!1,e.btnLoading=!1;case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},remove:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("business/product/remove/"+e);case 2:if(a=r.sent,n=a.data,n.success){r.next=8;break}return r.abrupt("return",t.$message.error("移入回收站失败:"+n.data.errorMsg));case 8:return r.next=10,t.getproductList();case 10:return r.abrupt("return",t.$message.success("移入回收站成功"));case 11:case"end":return r.stop()}}),r)})))()},back:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.put("product/back/"+e);case 2:if(a=r.sent,n=a.data,n.success){r.next=8;break}return r.abrupt("return",t.$message.error("从回收站恢复失败:"+n.data.errorMsg));case 8:return r.next=10,t.getproductList();case 10:return r.abrupt("return",t.$message.success("从回收站中已恢复"));case 11:case"end":return r.stop()}}),r)})))()},getproductList:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("business/product/findProductList",{params:e.queryMap});case 2:if(r=t.sent,a=r.data,a.success){t.next=8;break}return t.abrupt("return",e.$message.error("获取物资列表失败"));case 8:e.total=a.data.total,e.productData=a.data.rows;case 10:case"end":return t.stop()}}),t)})))()},getCatetorys:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("business/productCategory/categoryTree");case 2:if(r=t.sent,a=r.data,a.success){t.next=8;break}return t.abrupt("return",e.$message.error("获取物资类别失败"));case 8:e.cateories=a.data.rows;case 9:case"end":return t.stop()}}),t)})))()},handleChange:function(e,t){this.uploadDisabled=t.length>=this.limitCount},handleRemove:function(e,t){this.uploadDisabled=t.length>=this.limitCount,this.addRuleForm.imageUrl=""},handleSizeChange:function(e){this.queryMap.pageSize=e,this.getproductList()},handleCurrentChange:function(e){this.queryMap.pageNum=e,this.getproductList()},closeAddDialog:function(){this.$refs.addRuleFormRef.clearValidate(),this.addRuleForm={},this.$refs.upload.clearFiles()},closeEditDialog:function(){this.$refs.editRuleFormRef.clearValidate(),this.editRuleForm={},this.$refs.upload2.clearFiles(),this.imgFilesList=[]},handleSuccess:function(e,t,r){this.addRuleForm.imageUrl=e.msg},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},editHandleSuccess:function(e,t,r){this.editRuleForm.imageUrl=e.msg},selectChange:function(){for(var e="",t=0;t<this.categorykeys.length;t++)e+=this.categorykeys[t]+",";e=e.substring(0,e.length-1),this.queryMap.categorys=e}},created:function(){var e=this;this.getproductList(),this.getCatetorys(),setTimeout((function(){e.loading=!1}),500)}}),s=o,l=r("2877"),c=Object(l["a"])(s,a,n,!1,null,null,null);t["default"]=c.exports},b0c0:function(e,t,r){var a=r("83ab"),n=r("5e77").EXISTS,i=r("9bf2").f,o=Function.prototype,s=o.toString,l=/^\s*function ([^ (]*)/,c="name";a&&!n&&i(o,c,{configurable:!0,get:function(){try{return s.call(this).match(l)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-2063404a.7a7fcccf.js.map