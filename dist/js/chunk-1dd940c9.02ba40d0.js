(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1dd940c9"],{1069:function(t,e,n){!function(e,n){t.exports=n()}(0,(function(){return function(){"use strict";var t={358:function(t,e,n){var i=n(81),o=n.n(i),r=n(645),a=n.n(r)()(o());a.push([t.id,".vue-puzzle-vcode {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  z-index: 999;\n  opacity: 0;\n  pointer-events: none;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n}\n.vue-puzzle-vcode.show_ {\n  opacity: 1;\n  pointer-events: auto;\n}\n.vue-auth-box_ {\n  position: absolute;\n  top: 40%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  padding: 20px;\n  background: #fff;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border-radius: 3px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n.vue-auth-box_ .auth-body_ {\n  position: relative;\n  overflow: hidden;\n  border-radius: 3px;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 20;\n  opacity: 1;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.vue-auth-box_ .auth-body_ .loading-box_.hide_ {\n  opacity: 0;\n  pointer-events: none;\n}\n.vue-auth-box_ .auth-body_ .loading-box_.hide_ .loading-gif_ span {\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ {\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n          flex: none;\n  height: 5px;\n  line-height: 0;\n}\n@-webkit-keyframes load {\n0% {\n    opacity: 1;\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n}\n100% {\n    opacity: 0.2;\n    -webkit-transform: scale(0.3);\n            transform: scale(0.3);\n}\n}\n@keyframes load {\n0% {\n    opacity: 1;\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n}\n100% {\n    opacity: 0.2;\n    -webkit-transform: scale(0.3);\n            transform: scale(0.3);\n}\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span {\n  display: inline-block;\n  width: 5px;\n  height: 100%;\n  margin-left: 2px;\n  border-radius: 50%;\n  background-color: #888;\n  -webkit-animation: load 1.04s ease infinite;\n          animation: load 1.04s ease infinite;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(1) {\n  margin-left: 0;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(2) {\n  -webkit-animation-delay: 0.13s;\n          animation-delay: 0.13s;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(3) {\n  -webkit-animation-delay: 0.26s;\n          animation-delay: 0.26s;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(4) {\n  -webkit-animation-delay: 0.39s;\n          animation-delay: 0.39s;\n}\n.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span:nth-child(5) {\n  -webkit-animation-delay: 0.52s;\n          animation-delay: 0.52s;\n}\n.vue-auth-box_ .auth-body_ .info-box_ {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  overflow: hidden;\n  font-size: 13px;\n  background-color: #83ce3f;\n  opacity: 0;\n  -webkit-transform: translateY(24px);\n          transform: translateY(24px);\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n  color: #fff;\n  z-index: 10;\n}\n.vue-auth-box_ .auth-body_ .info-box_.show {\n  opacity: 0.95;\n  -webkit-transform: translateY(0);\n          transform: translateY(0);\n}\n.vue-auth-box_ .auth-body_ .info-box_.fail {\n  background-color: #ce594b;\n}\n.vue-auth-box_ .auth-body_ .auth-canvas2_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 60px;\n  height: 100%;\n  z-index: 2;\n}\n.vue-auth-box_ .auth-body_ .auth-canvas3_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  -webkit-transition: opacity 600ms;\n  transition: opacity 600ms;\n  z-index: 3;\n}\n.vue-auth-box_ .auth-body_ .auth-canvas3_.show {\n  opacity: 1;\n}\n.vue-auth-box_ .auth-body_ .flash_ {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.1);\n  z-index: 3;\n}\n.vue-auth-box_ .auth-body_ .flash_.show {\n  -webkit-transition: -webkit-transform 600ms;\n  transition: -webkit-transform 600ms;\n  transition: transform 600ms;\n  transition: transform 600ms, -webkit-transform 600ms;\n}\n.vue-auth-box_ .auth-body_ .reset_ {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 35px;\n  height: auto;\n  z-index: 12;\n  cursor: pointer;\n  -webkit-transition: -webkit-transform 200ms;\n  transition: -webkit-transform 200ms;\n  transition: transform 200ms;\n  transition: transform 200ms, -webkit-transform 200ms;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg);\n}\n.vue-auth-box_ .auth-body_ .reset_:hover {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n.vue-auth-box_ .auth-control_ .range-box {\n  position: relative;\n  width: 100%;\n  background-color: #eef1f8;\n  margin-top: 20px;\n  border-radius: 3px;\n  box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-text {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  font-size: 14px;\n  color: #b7bcd1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: center;\n  width: 100%;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider {\n  position: absolute;\n  height: 100%;\n  width: 50px;\n  background-color: rgba(106, 160, 255, 0.8);\n  border-radius: 3px;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  right: 0;\n  width: 50px;\n  height: 100%;\n  background-color: #fff;\n  border-radius: 3px;\n  box-shadow: 0 0 4px #ccc;\n  cursor: pointer;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div {\n  width: 0;\n  height: 40%;\n  -webkit-transition: all 200ms;\n  transition: all 200ms;\n  border: solid 1px #6aa0ff;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div:nth-child(2) {\n  margin: 0 4px;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div:first-child,\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div:first-child {\n  border: solid 4px transparent;\n  height: 0;\n  border-right-color: #6aa0ff;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div:nth-child(2),\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div:nth-child(2) {\n  border-width: 3px;\n  height: 0;\n  border-radius: 3px;\n  margin: 0 6px;\n  border-right-color: #6aa0ff;\n}\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div:nth-child(3),\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div:nth-child(3) {\n  border: solid 4px transparent;\n  height: 0;\n  border-left-color: #6aa0ff;\n}\n.vue-puzzle-overflow {\n  overflow: hidden !important;\n}\n",""]),e.Z=a},645:function(t){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,o,r){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(i)for(var s=0;s<this.length;s++){var h=this[s][0];null!=h&&(a[h]=!0)}for(var c=0;c<t.length;c++){var l=[].concat(t[c]);i&&a[l[0]]||(void 0!==r&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=r),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},81:function(t){t.exports=function(t){return t[1]}},379:function(t){var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},a=[],s=0;s<t.length;s++){var h=t[s],c=i.base?h[0]+i.base:h[0],l=r[c]||0,u="".concat(c," ").concat(l);r[c]=l+1;var d=n(u),p={css:h[1],media:h[2],sourceMap:h[3],supports:h[4],layer:h[5]};if(-1!==d)e[d].references++,e[d].updater(p);else{var f=o(p,i);i.byIndex=s,e.splice(s,0,{identifier:u,updater:f,references:1})}a.push(u)}return a}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var r=i(t=t||[],o=o||{});return function(t){t=t||[];for(var a=0;a<r.length;a++){var s=n(r[a]);e[s].references--}for(var h=i(t,o),c=0;c<r.length;c++){var l=n(r[c]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}r=h}}},569:function(t){var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:function(t){t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:function(t,e,n){t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:function(t){t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,o&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:function(t){t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={id:i,exports:{}};return t[i](r,r.exports,n),r.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};return function(){n.r(i),n.d(i,{default:function(){return w}});var t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["vue-puzzle-vcode",{show_:t.show}],on:{mousedown:t.onCloseMouseDown,mouseup:t.onCloseMouseUp,touchstart:t.onCloseMouseDown,touchend:t.onCloseMouseUp}},[n("div",{staticClass:"vue-auth-box_",on:{mousedown:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()}}},[n("div",{staticClass:"auth-body_",style:"height: "+t.canvasHeight+"px"},[n("canvas",{ref:"canvas1",style:"width:"+t.canvasWidth+"px;height:"+t.canvasHeight+"px",attrs:{width:t.canvasWidth,height:t.canvasHeight}}),t._v(" "),n("canvas",{ref:"canvas3",class:["auth-canvas3_",{show:t.isSuccess}],style:"width:"+t.canvasWidth+"px;height:"+t.canvasHeight+"px",attrs:{width:t.canvasWidth,height:t.canvasHeight}}),t._v(" "),n("canvas",{ref:"canvas2",staticClass:"auth-canvas2_",style:"width:"+t.puzzleBaseSize+"px;height:"+t.canvasHeight+"px;transform:translateX("+(t.styleWidth-t.sliderBaseSize-(t.puzzleBaseSize-t.sliderBaseSize)*((t.styleWidth-t.sliderBaseSize)/(t.canvasWidth-t.sliderBaseSize)))+"px)",attrs:{width:t.puzzleBaseSize,height:t.canvasHeight}}),t._v(" "),n("div",{class:["loading-box_",{hide_:!t.loading}]},[t._m(0)]),t._v(" "),n("div",{class:["info-box_",{show:t.infoBoxShow},{fail:t.infoBoxFail}]},[t._v("\n        "+t._s(t.infoText)+"\n      ")]),t._v(" "),n("div",{class:["flash_",{show:t.isSuccess}],style:"transform: translateX("+(t.isSuccess?t.canvasWidth+.578*t.canvasHeight+"px":"-"+.578*t.canvasHeight+"px")+") skew(-30deg, 0);"}),t._v(" "),n("img",{staticClass:"reset_",attrs:{src:t.resetSvg},on:{click:t.reset}})]),t._v(" "),n("div",{staticClass:"auth-control_"},[n("div",{staticClass:"range-box",style:"height:"+t.sliderBaseSize+"px"},[n("div",{staticClass:"range-text"},[t._v(t._s(t.sliderText))]),t._v(" "),n("div",{ref:"range-slider",staticClass:"range-slider",style:"width:"+t.styleWidth+"px"},[n("div",{class:["range-btn",{isDown:t.mouseDown}],style:"width:"+t.sliderBaseSize+"px",on:{mousedown:function(e){return t.onRangeMouseDown(e)},touchstart:function(e){return t.onRangeMouseDown(e)}}},[n("div"),t._v(" "),n("div"),t._v(" "),n("div")])])])])])])};t._withStripped=!0;var e={props:{canvasWidth:{type:Number,default:310},canvasHeight:{type:Number,default:160},show:{type:Boolean,default:!1},puzzleScale:{type:Number,default:1},sliderSize:{type:Number,default:50},range:{type:Number,default:10},imgs:{type:Array},successText:{type:String,default:"验证通过！"},failText:{type:String,default:"验证失败，请重试"},sliderText:{type:String,default:"拖动滑块完成拼图"}},data:()=>({mouseDown:!1,startWidth:50,startX:0,newX:0,pinX:0,pinY:0,loading:!1,isCanSlide:!1,error:!1,infoBoxShow:!1,infoText:"",infoBoxFail:!1,timer1:null,closeDown:!1,isSuccess:!1,imgIndex:-1,isSubmting:!1,resetSvg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAELklEQVRYR+2YW2wUZRTH//9vtlCoF9IoIklT3PqgPGi326hoetuaGEhIr9SgCYkkgt2WGOQVCca+GavWdr0GjD4YhG3RB3hply1LQA1tEQIxEXapGI2pEkys9LIzx2ylYWfY6e5sF0oi+7hzzvl+3/9855xvhrjNf7zN+XAHcL4Z+n8o6JWTeYt++W25S596AIZy6TB+n3yo+Nchlk8vmIIVowdXU9c3Q1gDSilBlQwjgBAYFGDvdF58/4milqvZwDpOcXWsb5Uh8hmBqkwXFMhlCN8aX5LXNbRy/T+Z+iXsHAFWRXs3QGQPyLucLDJrK5DgUXdTsxPfjAEro8E3Ce50EtxsKxPTwCPH3U2jTmJkBJgWTnAMxDeGMEoa0xQ+LJQnCD4HYFkCyAC3RdwN3U7gMkpxRTTYrMD91sCJIgCxV5R6O1Jcfy7VwonqLoj9/CqB2kF341qncGkBvRe+ureAWpRgoalCBecMFzcdK24YymZRJz5zprgq1tsJwXYL3CVZGvdGHmwZc7JQtra2gE+f712ep2QUYP714DJhaJrXLqXZQszlZwtYdSHoB9ljVk/ePVrSZFL0ZkAlxzQBVseCT8WhZhRThtFB8plk9Zi/qCi8cv0fNxvKFrDy4oF11NXXIFy2EII4iBcG3Y03VLZT8OqRd5aFPduvOEpxRayvXolxAKB2g6NgEhobBlc1HHYKY7WvHf5wtVAPgegIlbbZ9seUZ7AyFnwewi9pGoUyDmhrB931kfnC1ZwOeKlLP8GZJi6QLSFP2yep4toXSbT3ZQAfX3O6omt8Nhd9r/aHQAUMOQywYBZo5uZD2ThQ2rbPCjlnH6yI9rUryE5DU75ctJaake46Be4DuDjF8dFBNA94/AdtiySVxIlpMlTS8td801o70vMigM9huTda2lhcKHVHPO2HZv/P6LIwX7hk/+qzPSvUJGMkrg8AQYTkroRdXMlE+HH/twsG6BsOdJHYZlaO/lBZ6weOiiSXqs3Gqj0TeAxx+T75DIpgwjC0onD51pQD4JaluPrkR/cpFT9DcoVp84LOgTL/DjtBbglgou+puHwB8lEznPxJw1XSX77VtgizBvQNBw4RMqB7xt4Lc3c8lQKJaQHoO4R8ydz0/7MWoCXk8c85MrMC9J3qaafw/WtQlwXST+F3BnAeYB4obgJ1BJIuG+YtiKAjVOZ/Pd1ZdwzoG+4uBtSPpjaRbhXLcwF3hzytb2TilgVgT5BkYybBrTYC+Rvg5nRpdTRJrIs8+VPXPQXj2i4ItxC4O2NQQUQnN4U9rRcz9nH64p4ceM2lziX5Y4s3KHCdUHwE77ecMkMEp6BwhIa2Z6DslZRvfulgHafYLuCas58WLp2aLCFUga70qxOFU6dPFL2W1feYeaU43Y5z/TxnCuYabMEuC043ckdBp4pZ7f8FE5psOI1g6fwAAAAASUVORK5CYII="}),mounted(){document.body.appendChild(this.$el),document.addEventListener("mousemove",this.onRangeMouseMove,!1),document.addEventListener("mouseup",this.onRangeMouseUp,!1),document.addEventListener("touchmove",this.onRangeMouseMove,{passive:!1}),document.addEventListener("touchend",this.onRangeMouseUp,!1),this.show&&(document.body.classList.add("vue-puzzle-overflow"),this.reset())},beforeDestroy(){clearTimeout(this.timer1),document.body.removeChild(this.$el),document.removeEventListener("mousemove",this.onRangeMouseMove,!1),document.removeEventListener("mouseup",this.onRangeMouseUp,!1),document.removeEventListener("touchmove",this.onRangeMouseMove,{passive:!1}),document.removeEventListener("touchend",this.onRangeMouseUp,!1)},watch:{show(t){t?(document.body.classList.add("vue-puzzle-overflow"),this.reset()):(this.isSuccess=!1,this.infoBoxShow=!1,document.body.classList.remove("vue-puzzle-overflow"))}},computed:{styleWidth(){const t=this.startWidth+this.newX-this.startX;return t<this.sliderBaseSize?this.sliderBaseSize:t>this.canvasWidth?this.canvasWidth:t},puzzleBaseSize(){return Math.round(52.5*Math.max(Math.min(this.puzzleScale,2),.2)+6)},sliderBaseSize(){return Math.max(Math.min(Math.round(this.sliderSize),Math.round(.5*this.canvasWidth)),10)}},methods:{onClose(){this.mouseDown||(clearTimeout(this.timer1),this.$emit("close"))},onCloseMouseDown(){this.closeDown=!0},onCloseMouseUp(){this.closeDown&&this.onClose(),this.closeDown=!1},onRangeMouseDown(t){this.isCanSlide&&(this.mouseDown=!0,this.startWidth=this.$refs["range-slider"].clientWidth,this.newX=t.clientX||t.changedTouches[0].clientX,this.startX=t.clientX||t.changedTouches[0].clientX)},onRangeMouseMove(t){this.mouseDown&&(t.preventDefault(),this.newX=t.clientX||t.changedTouches[0].clientX)},onRangeMouseUp(){this.mouseDown&&(this.mouseDown=!1,this.submit())},init(t){if(this.loading&&!t)return;this.loading=!0,this.isCanSlide=!1;const e=this.$refs.canvas1,n=this.$refs.canvas2,i=this.$refs.canvas3,o=e.getContext("2d"),r=n.getContext("2d"),a=i.getContext("2d"),s=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,h=document.createElement("img");if(o.fillStyle="rgba(255,255,255,1)",a.fillStyle="rgba(255,255,255,1)",o.clearRect(0,0,this.canvasWidth,this.canvasHeight),r.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.pinX=this.getRandom(this.puzzleBaseSize,this.canvasWidth-this.puzzleBaseSize-20),this.pinY=this.getRandom(20,this.canvasHeight-this.puzzleBaseSize-20),h.crossOrigin="anonymous",h.onload=()=>{const[t,e,n,i]=this.makeImgSize(h);o.save(),this.paintBrick(o),o.closePath(),s?(o.clip(),o.save(),o.shadowOffsetX=0,o.shadowOffsetY=0,o.shadowColor="#000",o.shadowBlur=3,o.fill(),o.restore()):(o.shadowOffsetX=0,o.shadowOffsetY=0,o.shadowColor="#000",o.shadowBlur=3,o.fill(),o.clip()),o.drawImage(h,t,e,n,i),a.fillRect(0,0,this.canvasWidth,this.canvasHeight),a.drawImage(h,t,e,n,i),o.globalCompositeOperation="source-atop",this.paintBrick(o),o.arc(this.pinX+Math.ceil(this.puzzleBaseSize/2),this.pinY+Math.ceil(this.puzzleBaseSize/2),1.2*this.puzzleBaseSize,0,2*Math.PI,!0),o.closePath(),o.shadowColor="rgba(255, 255, 255, .8)",o.shadowOffsetX=-1,o.shadowOffsetY=-1,o.shadowBlur=Math.min(Math.ceil(8*this.puzzleScale),12),o.fillStyle="#ffffaa",o.fill();const c=o.getImageData(this.pinX-3,this.pinY-20,this.pinX+this.puzzleBaseSize+5,this.pinY+this.puzzleBaseSize+5);r.putImageData(c,0,this.pinY-20),o.restore(),o.clearRect(0,0,this.canvasWidth,this.canvasHeight),o.save(),this.paintBrick(o),o.globalAlpha=.8,o.fillStyle="#ffffff",o.fill(),o.restore(),o.save(),o.globalCompositeOperation="source-atop",this.paintBrick(o),o.arc(this.pinX+Math.ceil(this.puzzleBaseSize/2),this.pinY+Math.ceil(this.puzzleBaseSize/2),1.2*this.puzzleBaseSize,0,2*Math.PI,!0),o.shadowColor="#000",o.shadowOffsetX=2,o.shadowOffsetY=2,o.shadowBlur=16,o.fill(),o.restore(),o.save(),o.globalCompositeOperation="destination-over",o.drawImage(h,t,e,n,i),o.restore(),this.loading=!1,this.isCanSlide=!0},h.onerror=()=>{this.init(!0)},!t&&this.imgs&&this.imgs.length){let t=this.getRandom(0,this.imgs.length-1);t===this.imgIndex&&(t===this.imgs.length-1?t=0:t++),this.imgIndex=t,h.src=this.imgs[t]}else h.src=this.makeImgWithCanvas()},getRandom:(t,e)=>Math.ceil(Math.random()*(e-t)+t),makeImgSize(t){const e=t.width/t.height;let n=0,i=0,o=0,r=0;return e>this.canvasWidth/this.canvasHeight?(r=this.canvasHeight,o=e*r,i=0,n=(this.canvasWidth-o)/2):(o=this.canvasWidth,r=o/e,n=0,i=(this.canvasHeight-r)/2),[n,i,o,r]},paintBrick(t){const e=Math.ceil(15*this.puzzleScale);t.beginPath(),t.moveTo(this.pinX,this.pinY),t.lineTo(this.pinX+e,this.pinY),t.arcTo(this.pinX+e,this.pinY-e/2,this.pinX+e+e/2,this.pinY-e/2,e/2),t.arcTo(this.pinX+e+e,this.pinY-e/2,this.pinX+e+e,this.pinY,e/2),t.lineTo(this.pinX+e+e+e,this.pinY),t.lineTo(this.pinX+e+e+e,this.pinY+e),t.arcTo(this.pinX+e+e+e+e/2,this.pinY+e,this.pinX+e+e+e+e/2,this.pinY+e+e/2,e/2),t.arcTo(this.pinX+e+e+e+e/2,this.pinY+e+e,this.pinX+e+e+e,this.pinY+e+e,e/2),t.lineTo(this.pinX+e+e+e,this.pinY+e+e+e),t.lineTo(this.pinX,this.pinY+e+e+e),t.lineTo(this.pinX,this.pinY+e+e),t.arcTo(this.pinX+e/2,this.pinY+e+e,this.pinX+e/2,this.pinY+e+e/2,e/2),t.arcTo(this.pinX+e/2,this.pinY+e,this.pinX,this.pinY+e,e/2),t.lineTo(this.pinX,this.pinY)},makeImgWithCanvas(){const t=document.createElement("canvas"),e=t.getContext("2d");t.width=this.canvasWidth,t.height=this.canvasHeight,e.fillStyle=`rgb(${this.getRandom(100,255)},${this.getRandom(100,255)},${this.getRandom(100,255)})`,e.fillRect(0,0,this.canvasWidth,this.canvasHeight);for(let n=0;n<12;n++)if(e.fillStyle=`rgb(${this.getRandom(100,255)},${this.getRandom(100,255)},${this.getRandom(100,255)})`,e.strokeStyle=`rgb(${this.getRandom(100,255)},${this.getRandom(100,255)},${this.getRandom(100,255)})`,this.getRandom(0,2)>1)e.save(),e.rotate(this.getRandom(-90,90)*Math.PI/180),e.fillRect(this.getRandom(-20,t.width-20),this.getRandom(-20,t.height-20),this.getRandom(10,t.width/2+10),this.getRandom(10,t.height/2+10)),e.restore();else{e.beginPath();const n=this.getRandom(-Math.PI,Math.PI);e.arc(this.getRandom(0,t.width),this.getRandom(0,t.height),this.getRandom(10,t.height/2+10),n,n+1.5*Math.PI),e.closePath(),e.fill()}return t.toDataURL("image/png")},submit(){this.isSubmting=!0;const t=Math.abs(this.pinX-(this.styleWidth-this.sliderBaseSize)+(this.puzzleBaseSize-this.sliderBaseSize)*((this.styleWidth-this.sliderBaseSize)/(this.canvasWidth-this.sliderBaseSize))-3);t<this.range?(this.infoText=this.successText,this.infoBoxFail=!1,this.infoBoxShow=!0,this.isCanSlide=!1,this.isSuccess=!0,clearTimeout(this.timer1),this.timer1=setTimeout(()=>{this.isSubmting=!1,this.$emit("success",t)},800)):(this.infoText=this.failText,this.infoBoxFail=!0,this.infoBoxShow=!0,this.isCanSlide=!1,this.$emit("fail",t),clearTimeout(this.timer1),this.timer1=setTimeout(()=>{this.isSubmting=!1,this.reset()},800))},resetState(){this.infoBoxFail=!1,this.infoBoxShow=!1,this.isCanSlide=!1,this.isSuccess=!1,this.startWidth=this.sliderBaseSize,this.startX=0,this.newX=0},reset(){this.isSubmting||(this.resetState(),this.init())}}},o=n(379),r=n.n(o),a=n(795),s=n.n(a),h=n(569),c=n.n(h),l=n(565),u=n.n(l),d=n(216),p=n.n(d),f=n(589),g=n.n(f),m=n(358),v={};v.styleTagTransform=g(),v.setAttributes=u(),v.insert=c().bind(null,"head"),v.domAPI=s(),v.insertStyleElement=p(),r()(m.Z,v),m.Z&&m.Z.locals&&m.Z.locals;var b=function(t,e,n,i,o,r,a,s){var h,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loading-gif_"},[n("span"),t._v(" "),n("span"),t._v(" "),n("span"),t._v(" "),n("span"),t._v(" "),n("span")])}],c._compiled=!0),h)if(c.functional){c._injectStyles=h;var l=c.render;c.render=function(t,e){return h.call(e),l(t,e)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,h):[h]}return{exports:t,options:c}}(e,t);b.options.__file="src/app.vue";var w=b.exports}(),i}()}))},"16f9":function(t,e,n){},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("d3b7");function i(t,e,n,i,o,r,a){try{var s=t[r](a),h=s.value}catch(c){return void n(c)}s.done?e(h):Promise.resolve(h).then(i,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var a=t.apply(e,n);function s(t){i(a,o,r,s,h,"next",t)}function h(t){i(a,o,r,s,h,"throw",t)}s(void 0)}))}}},"67a5":function(t,e,n){"use strict";n("16f9")},"96cf":function(t,e){!function(e){"use strict";var n,i=Object.prototype,o=i.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",h=r.toStringTag||"@@toStringTag",c="object"===typeof t,l=e.regeneratorRuntime;if(l)c&&(t.exports=l);else{l=e.regeneratorRuntime=c?t.exports:{},l.wrap=y;var u="suspendedStart",d="suspendedYield",p="executing",f="completed",g={},m={};m[a]=function(){return this};var v=Object.getPrototypeOf,b=v&&v(v(X([])));b&&b!==i&&o.call(b,a)&&(m=b);var w=S.prototype=_.prototype=Object.create(m);k.prototype=w.constructor=S,S.constructor=k,S[h]=k.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===k||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,h in t||(t[h]="GeneratorFunction")),t.prototype=Object.create(w),t},l.awrap=function(t){return{__await:t}},z(C.prototype),C.prototype[s]=function(){return this},l.AsyncIterator=C,l.async=function(t,e,n,i){var o=new C(y(t,e,n,i));return l.isGeneratorFunction(e)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},z(w),w[h]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var i=e.pop();if(i in t)return n.value=i,n.done=!1,n}return n.done=!0,n}},l.values=X,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(M),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function i(i,o){return s.type="throw",s.arg=t,e.next=i,o&&(e.method="next",e.arg=n),!!o}for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var h=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(h&&c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(h){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&o.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var r=i;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var a=r?r.completion:{};return a.type=t,a.arg=e,r?(this.method="next",this.next=r.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),M(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var i=n.completion;if("throw"===i.type){var o=i.arg;M(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,i){return this.delegate={iterator:X(t),resultName:e,nextLoc:i},"next"===this.method&&(this.arg=n),g}}}function y(t,e,n,i){var o=e&&e.prototype instanceof _?e:_,r=Object.create(o.prototype),a=new T(i||[]);return r._invoke=B(t,n,a),r}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(i){return{type:"throw",arg:i}}}function _(){}function k(){}function S(){}function z(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function C(t){function e(n,i,r,a){var s=x(t[n],t,i);if("throw"!==s.type){var h=s.arg,c=h.value;return c&&"object"===typeof c&&o.call(c,"__await")?Promise.resolve(c.__await).then((function(t){e("next",t,r,a)}),(function(t){e("throw",t,r,a)})):Promise.resolve(c).then((function(t){h.value=t,r(h)}),a)}a(s.arg)}var n;function i(t,i){function o(){return new Promise((function(n,o){e(t,i,n,o)}))}return n=n?n.then(o,o):o()}this._invoke=i}function B(t,e,n){var i=u;return function(o,r){if(i===p)throw new Error("Generator is already running");if(i===f){if("throw"===o)throw r;return Y()}n.method=o,n.arg=r;while(1){var a=n.delegate;if(a){var s=R(a,n);if(s){if(s===g)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(i===u)throw i=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);i=p;var h=x(t,e,n);if("normal"===h.type){if(i=n.done?f:d,h.arg===g)continue;return{value:h.arg,done:n.done}}"throw"===h.type&&(i=f,n.method="throw",n.arg=h.arg)}}}function R(t,e){var i=t.iterator[e.method];if(i===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,R(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=x(i,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,g;var r=o.arg;return r?r.done?(e[t.resultName]=r.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,g):r:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function X(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,r=function e(){while(++i<t.length)if(o.call(t,i))return e.value=t[i],e.done=!1,e;return e.value=n,e.done=!0,e};return r.next=r}}return{next:Y}}function Y(){return{value:n,done:!0}}}(function(){return this}()||Function("return this")())},dd7b:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"login"}},[n("h1",{staticStyle:{position:"absolute",color:"#fff",left:"50%",transform:"translateX(-50%)",top:"-110px"}},[t._v("新冠-物资管理系统")]),n("el-form",{ref:"userLoginFormRef",staticClass:"demo-ruleForm login-page",attrs:{model:t.userLoginForm,rules:t.loginRules,"status-icon":"","label-position":"left","label-width":"0px"}},[n("h3",{staticClass:"title"},[t._v("系统登录")]),n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"用户名","prefix-icon":"iconfont el-icon-user"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSubmit.apply(null,arguments)}},model:{value:t.userLoginForm.username,callback:function(e){t.$set(t.userLoginForm,"username",e)},expression:"userLoginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"密码","prefix-icon":"el-icon-suitcase-1"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSubmit.apply(null,arguments)}},model:{value:t.userLoginForm.password,callback:function(e){t.$set(t.userLoginForm,"password",e)},expression:"userLoginForm.password"}})],1),n("div"),n("el-checkbox",{staticClass:"rememberme",model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("记住密码")]),n("el-form-item",{staticStyle:{width:"100%"}},[n("div",{staticStyle:{float:"right"}},[n("el-button",{staticClass:"el-icon-mobile-phone",attrs:{type:"primary",loading:t.loading},on:{click:t.handleSubmit}},[t._v("登录 ")]),n("el-button",{staticClass:"el-icon-refresh",on:{click:t.resetForm}},[t._v("重置")])],1)])],1),n("Vcode",{attrs:{show:t.isShow,canvasWidth:500,canvasHeight:350},on:{success:t.success,close:t.close}})],1)},o=[],r=n("1da1"),a=(n("96cf"),n("1069")),s=n.n(a),h={data:function(){return{isShow:!1,dialogVisible:!1,imgCode:void 0,loading:!1,userLoginForm:{username:"蔡徐坤",password:"123456"},checked:!0,loginRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:12,message:"长度在 3 到 12 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入用户密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 15 个字符",trigger:"blur"}]}}},components:{Vcode:s.a},methods:{handleSubmit:function(){var t=this;this.$refs.userLoginFormRef.validate((function(e){e&&(t.isShow=!0)}))},resetForm:function(){this.$refs.userLoginFormRef.resetFields()},success:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$http.post("system/user/login",t.userLoginForm);case 3:if(n=e.sent,i=n.data,!i.success){e.next=12;break}return t.$message({title:"登入成功",message:"欢迎你进入系统",type:"success"}),LocalStorage.set(LOCAL_KEY_XINGUAN_ACCESS_TOKEN,i.data),e.next=10,t.getUserInfo();case 10:e.next=14;break;case 12:t.isShow=!1,t.$message.error({title:"登入失败",message:i.data.errorMsg,type:"error"});case 14:t.loading=!1;case 15:case"end":return e.stop()}}),e)})))()},getUserInfo:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("system/user/info");case 2:if(n=e.sent,i=n.data,i.success){e.next=8;break}return e.abrupt("return",t.$message.error("获取用户信息失败:"+i.data.errorMsg));case 8:return t.userInfo=i.data,t.$store.commit("setUserInfo",i.data),e.next=12,t.$router.push("/home");case 12:case"end":return e.stop()}}),e)})))()},close:function(){this.isShow=!1}},created:function(){}},c=h,l=(n("67a5"),n("2877")),u=Object(l["a"])(c,i,o,!1,null,"32103ad0",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-1dd940c9.02ba40d0.js.map