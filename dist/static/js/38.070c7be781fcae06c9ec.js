webpackJsonp([38],{"/Qd/":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"baofu-box"},[a("div",{staticClass:"list-view h4"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),a("div",{staticClass:"item flex"},[a("div",{staticClass:"title tel"},[t._v("银行卡预留手机号：")]),t._v(" "),a("div",{staticClass:"flex-grow"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.postData.mobile,expression:"postData.mobile"}],attrs:{type:"tel",maxlength:"11"},domProps:{value:t.postData.mobile},on:{input:function(e){e.target.composing||t.$set(t.postData,"mobile",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"item flex flex-item"},[a("span",{staticClass:"title tel"},[t._v("验证码：")]),t._v(" "),t._m(4),t._v(" "),t.isSend?t._e():a("div",{staticClass:"identify-code-btn",on:{click:function(e){t.sendValidateCode()}}},[t._v("发送验证码")]),t._v(" "),t.isSend?a("div",{staticClass:"identify-code-btn"},[t._v(t._s(t.delayTime)+"s重新获取")]):t._e()])]),t._v(" "),a("div",{staticClass:"button-box"},[a("a",{staticClass:"button button-primary",on:{click:t.submit}},[t._v("确认还款")])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item flex"},[a("div",{staticClass:"title tel"},[t._v("应还款金额：5600元")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item flex"},[a("div",{staticClass:"title tel"},[t._v("银行卡号：")]),t._v(" "),a("div",{staticClass:"flex-grow"},[a("input",{attrs:{type:"tel",maxlength:"20",placeholder:"请正确输入银行卡号"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item flex"},[a("div",{staticClass:"title tel"},[t._v("持卡人姓名：")]),t._v(" "),a("div",{staticClass:"flex-grow"},[a("input",{attrs:{type:"text",placeholder:"请正确输入姓名"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item flex"},[a("div",{staticClass:"title tel"},[t._v("身份证号码：")]),t._v(" "),a("div",{staticClass:"flex-grow"},[a("input",{attrs:{type:"text",placeholder:"请正确输入身份证号码"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"flex-grow"},[a("input",{staticClass:"identify-code-input",attrs:{type:"tel",placeholder:"短信验证码",maxlength:"6"}})])}],n={render:i,staticRenderFns:s};e.a=n},"FI//":function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,".baofu-box[data-v-0e5021f2]{padding-top:.1rem}.tel[data-v-0e5021f2]{padding-right:.1rem}.button-box[data-v-0e5021f2]{padding:1rem .4rem .4rem}input[data-v-0e5021f2]{outline:none;border:0;width:100%}.identify-code-btn[data-v-0e5021f2]{color:#0079ff!important;text-align:center}","",{version:3,sources:["D:/nyd-cash-app-h5/src/components/baofuFast.vue"],names:[],mappings:"AACA,4BACE,iBAAoB,CACrB,AACD,sBACE,mBAAsB,CACvB,AACD,6BACE,wBAA4B,CAC7B,AACD,uBACE,aAAc,AACd,SAAU,AACV,UAAY,CACb,AACD,oCACE,wBAA0B,AAC1B,iBAAmB,CACpB",file:"baofuFast.vue",sourcesContent:["\n.baofu-box[data-v-0e5021f2] {\n  padding-top: 0.1rem;\n}\n.tel[data-v-0e5021f2] {\n  padding-right: 0.1rem;\n}\n.button-box[data-v-0e5021f2] {\n  padding: 1rem 0.4rem 0.4rem;\n}\ninput[data-v-0e5021f2] {\n  outline: none;\n  border: 0;\n  width: 100%;\n}\n.identify-code-btn[data-v-0e5021f2] {\n  color: #0079ff !important;\n  text-align: center;\n}"],sourceRoot:""}])},K0E7:function(t,e,a){"use strict";function i(t){a("tqbZ")}Object.defineProperty(e,"__esModule",{value:!0});var s=a("nEGG"),n=a("/Qd/"),l=a("VU/8"),o=i,r=l(s.a,n.a,!1,o,"data-v-0e5021f2",null);e.default=r.exports},nEGG:function(t,e,a){"use strict";var i=a("Iljn"),s=a("KYXE");e.a={data:function(){return{isSend:!1,delayTime:0,postData:{}}},methods:{submit:function(){},sendValidateCode:function(){var t=this,e=this.postData.mobile;if(!/^1\d{10}$/.test(e))return void Object(i.n)("",null,"请输入手机号码！");Object(i.f)(s.s,{mobile:e,smsType:"1"},{success:function(e){Object(i.p)("验证码已发送，请注意查收！"),t.isSend=!0,t.delayTime=59;var a=setInterval(function(){1===t.delayTime&&(t.isSend=!1,t.delayTime=0,clearInterval(a)),t.delayTime--},1e3)},error:function(t){Object(i.n)(null,null,t.msg||"校验码发送失败，请稍后再试！")}})}}}},tqbZ:function(t,e,a){var i=a("FI//");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("44b16446",i,!0)}});
//# sourceMappingURL=38.070c7be781fcae06c9ec.js.map