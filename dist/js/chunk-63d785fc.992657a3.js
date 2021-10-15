(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63d785fc"],{"11c2":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"category"}},[r("el-breadcrumb",{staticStyle:{"padding-left":"10px","padding-bottom":"10px","font-size":"12px"},attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("物资管理")]),r("el-breadcrumb-item",[e._v("物资分类")])],1),r("el-card",{staticClass:"box-card"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:8}},[r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"productCategory:add",expression:"'productCategory:add'"}],attrs:{type:"warning",icon:"el-icon-circle-plus-outline"},on:{click:e.openAdd}},[e._v("添加")])],1)],1),r("zk-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",staticStyle:{"margin-top":"10px"},attrs:{"show-index":"","expand-type":!1,"selection-type":!1,"sum-text":"sum","index-text":"#",data:e.categorys,columns:e.columns},scopedSlots:e._u([{key:"lev",fn:function(t){return[1===t.row.lev?r("el-tag",[e._v("一级分类")]):2===t.row.lev?r("el-tag",{attrs:{type:"success"}},[e._v("二级分类")]):r("el-tag",{attrs:{type:"danger"}},[e._v("三级分类")])]}},{key:"caozuo",fn:function(t){return[r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"productCategory:edit",expression:"'productCategory:edit'"}],attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(r){return e.edit(t.row.id)}}}),r("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"productCategory:delete",expression:"'productCategory:delete'"}],attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(r){return e.del(t.row.id)}}})]}}])}),r("el-pagination",{staticStyle:{"margin-top":"10px"},attrs:{background:"","show-header":!0,"current-page":this.queryMap.pageNum,"page-sizes":[5,10,15,20,25,30],"page-size":this.queryMap.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),r("el-dialog",{attrs:{title:"添加分类",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addCloseDialog}},[r("span",[r("el-form",{ref:"addRuleFormRef",attrs:{model:e.addRuleForm,rules:e.addRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[r("el-input",{model:{value:e.addRuleForm.name,callback:function(t){e.$set(e.addRuleForm,"name",t)},expression:"addRuleForm.name"}})],1),r("el-form-item",{attrs:{label:"父分类",prop:"pid"}},[r("el-cascader",{staticStyle:{width:"100%"},attrs:{"change-on-select":!0,options:e.parentCategorys,clearable:"",filterable:"",props:e.selectProps},on:{change:e.selectParentChange,clear:e.clearParent},model:{value:e.pKeys,callback:function(t){e.pKeys=t},expression:"pKeys"}})],1),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.addRuleForm.remark,callback:function(t){e.$set(e.addRuleForm,"remark",t)},expression:"addRuleForm.remark"}})],1),r("el-form-item",{attrs:{label:"排序",prop:"sort"}},[r("el-input-number",{attrs:{min:1,max:10,label:"排序"},model:{value:e.addRuleForm.sort,callback:function(t){e.$set(e.addRuleForm,"sort",t)},expression:"addRuleForm.sort"}})],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary",disabled:e.btnDisabled,loading:e.btnLoading},on:{click:e.add}},[e._v("确 定")])],1)]),r("el-dialog",{attrs:{title:"编辑分类",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editCloseDialog}},[r("span",[r("el-form",{ref:"editRuleFormRef",attrs:{model:e.editRuleForm,rules:e.addRules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[r("el-input",{model:{value:e.editRuleForm.name,callback:function(t){e.$set(e.editRuleForm,"name",t)},expression:"editRuleForm.name"}})],1),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.editRuleForm.remark,callback:function(t){e.$set(e.editRuleForm,"remark",t)},expression:"editRuleForm.remark"}})],1),r("el-form-item",{attrs:{label:"排序",prop:"sort"}},[r("el-input-number",{attrs:{min:1,max:10,label:"排序"},model:{value:e.editRuleForm.sort,callback:function(t){e.$set(e.editRuleForm,"sort",t)},expression:"editRuleForm.sort"}})],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary",disabled:e.btnDisabled,loading:e.btnLoading},on:{click:e.update}},[e._v("确 定")])],1)])],1)],1)},a=[],o=r("1da1"),i=(r("96cf"),{data:function(){return{btnLoading:!1,btnDisabled:!1,loading:!0,pKeys:[],addDialogVisible:!1,editDialogVisible:!1,editRuleForm:[],addRuleForm:{pid:"0",name:"",remark:"",sort:""},addRules:{name:[{required:!0,message:"请输入分类名",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符",trigger:"blur"}],remark:[{required:!0,message:"请输入备注信息",trigger:"blur"}],sort:[{required:!0,message:"请输入排序号",trigger:"blur"}]},total:0,queryMap:{pageNum:1,pageSize:5},categorys:[],parentCategorys:[],selectProps:{expandTrigger:"hover",value:"id",label:"name",children:"children"},columns:[{label:"分类名称",prop:"name"},{label:"排序",prop:"sort"},{label:"创建时间",prop:"createTime"},{label:"修改时间",prop:"modifiedTime"},{label:"备注",prop:"remark"},{label:"层级",prop:"lev",type:"template",template:"lev"},{label:"操作",type:"template",template:"caozuo"}]}},methods:{update:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$refs.editRuleFormRef.validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=4;break}return e.abrupt("return");case 4:return t.btnLoading=!0,t.btnDisabled=!0,e.next=8,t.$http.put("business/productCategory/update/"+t.editRuleForm.id,t.editRuleForm);case 8:if(n=e.sent,a=n.data,!a.success){e.next=16;break}return t.$notify({title:"成功",message:"分类信息更新",type:"success"}),e.next=14,t.getCategoryList();case 14:e.next=17;break;case 16:t.$message.error("分类信息更新失败:"+a.data.errorMsg);case 17:t.btnLoading=!1,t.btnDisabled=!1,t.editDialogVisible=!1;case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),edit:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.get("business/productCategory/edit/"+e);case 2:if(n=r.sent,a=n.data,!a.success){r.next=8;break}t.editRuleForm=a.data,r.next=9;break;case 8:return r.abrupt("return",t.$message.error("分类信息编辑失败"+a.data.errorMsg));case 9:t.editDialogVisible=!0;case 10:case"end":return r.stop()}}),r)})))()},del:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n,a,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(){t.$message({type:"info",message:"已取消删除"})}));case 2:if(n=r.sent,"confirm"!==n){r.next=16;break}return r.next=6,t.$http.delete("business/productCategory/delete/"+e);case 6:if(a=r.sent,o=a.data,console.log(o),!o.success){r.next=15;break}return t.$message.success("分类删除成功"),r.next=13,t.getCategoryList();case 13:r.next=16;break;case 15:t.$message.error(o.data.errorMsg);case 16:case"end":return r.stop()}}),r)})))()},selectParentChange:function(){var e=this.pKeys.length;this.addRuleForm.pid=e>0?this.pKeys[e-1]:0},getCategoryList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("business/productCategory/categoryTree",{params:e.queryMap});case 2:if(r=t.sent,n=r.data,n.success){t.next=6;break}return t.abrupt("return",e.$message.error("分类列表失败"));case 6:e.categorys=n.data.rows,e.total=n.data.total;case 8:case"end":return t.stop()}}),t)})))()},getParentCategoryList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("business/productCategory/getParentCategoryTree");case 2:if(r=t.sent,n=r.data,n.success){t.next=6;break}return t.abrupt("return",e.$message.error("父级分类列表失败:"+n.data.errorMsg));case 6:e.parentCategorys=n.data;case 7:case"end":return t.stop()}}),t)})))()},add:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.addRuleFormRef.validate(function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(r){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=4;break}return t.abrupt("return");case 4:return e.btnLoading=!0,e.btnDisabled=!0,null==e.addRuleForm.pid&&(e.addRuleForm.pid=0),t.next=9,e.$http.post("business/productCategory/add",e.addRuleForm);case 9:if(n=t.sent,a=n.data,!a.success){t.next=17;break}return e.$message.success("分类添加成功"),t.next=15,e.getCategoryList();case 15:t.next=18;break;case 17:return t.abrupt("return",e.$message.error("分类添加失败:"+a.data.errorMsg));case 18:e.addDialogVisible=!1,e.btnLoading=!1,e.btnDisabled=!1;case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.queryMap.pageSize=e,this.getCategoryList()},handleCurrentChange:function(e){this.queryMap.pageNum=e,this.getCategoryList()},openAdd:function(){this.addDialogVisible=!0,this.getParentCategoryList()},addCloseDialog:function(){this.$refs.addRuleFormRef.clearValidate(),this.addRuleForm={},this.pKeys=[]},editCloseDialog:function(){this.$refs.editRuleFormRef.clearValidate(),this.editRuleForm={}},clearParent:function(){this.addRuleForm.pid=""}},created:function(){var e=this;this.getCategoryList(),setTimeout((function(){e.loading=!1}),500)}}),s=i,u=r("2877"),l=Object(u["a"])(s,n,a,!1,null,null,null);t["default"]=l.exports},"1da1":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("d3b7");function n(e,t,r,n,a,o,i){try{var s=e[o](i),u=s.value}catch(l){return void r(l)}s.done?t(u):Promise.resolve(u).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var i=e.apply(t,r);function s(e){n(i,a,o,s,u,"next",e)}function u(e){n(i,a,o,s,u,"throw",e)}s(void 0)}))}}},"96cf":function(e,t){!function(t){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag",l="object"===typeof e,c=t.regeneratorRuntime;if(c)l&&(e.exports=c);else{c=t.regeneratorRuntime=l?e.exports:{},c.wrap=w;var d="suspendedStart",p="suspendedYield",f="executing",m="completed",h={},g={};g[i]=function(){return this};var y=Object.getPrototypeOf,b=y&&y(y(j([])));b&&b!==n&&a.call(b,i)&&(g=b);var v=F.prototype=R.prototype=Object.create(g);k.prototype=v.constructor=F,F.constructor=k,F[u]=k.displayName="GeneratorFunction",c.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===k||"GeneratorFunction"===(t.displayName||t.name))},c.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,F):(e.__proto__=F,u in e||(e[u]="GeneratorFunction")),e.prototype=Object.create(v),e},c.awrap=function(e){return{__await:e}},L(C.prototype),C.prototype[s]=function(){return this},c.AsyncIterator=C,c.async=function(e,t,r,n){var a=new C(w(e,t,r,n));return c.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},L(v),v[u]="Generator",v[i]=function(){return this},v.toString=function(){return"[object Generator]"},c.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){while(t.length){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},c.values=j,E.prototype={constructor:E,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(D),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,a){return s.type="throw",s.arg=e,t.next=n,a&&(t.method="next",t.arg=r),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),D(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;D(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:j(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),h}}}function w(e,t,r,n){var a=t&&t.prototype instanceof R?t:R,o=Object.create(a.prototype),i=new E(n||[]);return o._invoke=_(e,r,i),o}function x(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(n){return{type:"throw",arg:n}}}function R(){}function k(){}function F(){}function L(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function C(e){function t(r,n,o,i){var s=x(e[r],e,n);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then((function(e){t("next",e,o,i)}),(function(e){t("throw",e,o,i)})):Promise.resolve(l).then((function(e){u.value=e,o(u)}),i)}i(s.arg)}var r;function n(e,n){function a(){return new Promise((function(r,a){t(e,n,r,a)}))}return r=r?r.then(a,a):a()}this._invoke=n}function _(e,t,r){var n=d;return function(a,o){if(n===f)throw new Error("Generator is already running");if(n===m){if("throw"===a)throw o;return O()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var s=$(i,r);if(s){if(s===h)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var u=x(e,t,r);if("normal"===u.type){if(n=r.done?m:p,u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=m,r.method="throw",r.arg=u.arg)}}}function $(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,$(e,t),"throw"===t.method))return h;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var a=x(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,h;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,h):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function D(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function E(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function j(e){if(e){var t=e[i];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){while(++n<e.length)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return o.next=o}}return{next:O}}function O(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())}}]);
//# sourceMappingURL=chunk-63d785fc.992657a3.js.map