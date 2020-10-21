(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"7BsA":function(t,e,n){t.exports=function(t){function e(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,n){var a=n(4)(n(1),n(5),null,null);t.exports=a.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,n,a){return n*(1-Math.pow(2,-10*t/a))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,a.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,a.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,a.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,a.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,a.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var e=(t+="").split("."),n=e[0],a=e.length>1?this.decimal+e[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;i.test(n);)n=n.replace(i,"$1"+this.separator+"$2");return this.prefix+n+a+this.suffix}},destroyed:function(){(0,a.cancelAnimationFrame)(this.rAF)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t){return t&&t.__esModule?t:{default:t}}(n(0));e.default=a.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",a.default)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=0,i="webkit moz ms o".split(" "),r=void 0,s=void 0;if("undefined"==typeof window)e.requestAnimationFrame=r=function(){},e.cancelAnimationFrame=s=function(){};else{e.requestAnimationFrame=r=window.requestAnimationFrame,e.cancelAnimationFrame=s=window.cancelAnimationFrame;for(var o=void 0,u=0;u<i.length&&(!r||!s);u++)o=i[u],e.requestAnimationFrame=r=r||window[o+"RequestAnimationFrame"],e.cancelAnimationFrame=s=s||window[o+"CancelAnimationFrame"]||window[o+"CancelRequestAnimationFrame"];r&&s||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-a)),i=window.setTimeout((function(){t(e+n)}),n);return a=e+n,i},e.cancelAnimationFrame=s=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=r,e.cancelAnimationFrame=s},function(t,e){t.exports=function(t,e,n,a){var i,r=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(i=t,r=t.default);var o="function"==typeof r?r.options:r;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),n&&(o._scopeId=n),a){var u=Object.create(o.computed||null);Object.keys(a).forEach((function(t){var e=a[t];u[t]=function(){return e}})),o.computed=u}return{esModule:i,exports:r,options:o}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},"9O5j":function(t,e,n){var a=n("Mwyl");"string"==typeof a&&(a=[[t.i,a,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(a,i);a.locals&&(t.exports=a.locals)},HgIO:function(t,e,n){"use strict";n.r(e);var a=n("7BsA"),i={name:"CountToDemo",components:{countTo:n.n(a).a},data:function(){return{setStartVal:0,setEndVal:2017,setDuration:4e3,setDecimals:0,setSeparator:",",setSuffix:" per capita",setPrefix:"$ ",paused:!0,resumeLabel:"Resume",pauseLabel:"Pause"}},computed:{_startVal:function(){return this.setStartVal?this.setStartVal:0},_endVal:function(){return this.setEndVal?this.setEndVal:0},_duration:function(){return this.setDuration?this.setDuration:100},_decimals:function(){return this.setDecimals?this.setDecimals<0||this.setDecimals>20?(alert("digits argument must be between 0 and 20"),0):this.setDecimals:0},_separator:function(){return this.setSeparator},_suffix:function(){return this.setSuffix},_prefix:function(){return this.setPrefix},_pauseResumeLabel:function(){return this.paused?this.resumeLabel:this.pauseLabel}},methods:{start:function(){this.$refs.countTo.start(),this.paused=!1},pauseResume:function(){this.$refs.countTo.pauseResume(),this.paused=this.$refs.countTo.paused}}},r=(n("zFt+"),n("KHd+")),s=Object(r.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"components-container"},[t._m(0),t._v(" "),n("count-to",{ref:"countTo",staticClass:"example",attrs:{"start-val":t._startVal,"end-val":t._endVal,duration:t._duration,decimals:t._decimals,separator:t._separator,prefix:t._prefix,suffix:t._suffix,autoplay:!1}}),t._v(" "),n("div",{staticStyle:{"margin-left":"25%","margin-top":"40px"}},[n("label",{staticClass:"label",attrs:{for:"startValInput"}},[t._v("startVal:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setStartVal,expression:"setStartVal",modifiers:{number:!0}}],attrs:{type:"number",name:"startValInput"},domProps:{value:t.setStartVal},on:{input:function(e){e.target.composing||(t.setStartVal=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"endValInput"}},[t._v("endVal:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setEndVal,expression:"setEndVal",modifiers:{number:!0}}],attrs:{type:"number",name:"endVaInput"},domProps:{value:t.setEndVal},on:{input:function(e){e.target.composing||(t.setEndVal=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"durationInput"}},[t._v("duration:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setDuration,expression:"setDuration",modifiers:{number:!0}}],attrs:{type:"number",name:"durationInput"},domProps:{value:t.setDuration},on:{input:function(e){e.target.composing||(t.setDuration=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"startBtn example-btn",on:{click:t.start}},[t._v("\n      Start\n    ")]),t._v(" "),n("div",{staticClass:"pause-resume-btn example-btn",on:{click:t.pauseResume}},[t._v("\n      "+t._s(t._pauseResumeLabel)+"\n    ")]),t._v(" "),n("br"),t._v(" "),n("label",{staticClass:"label",attrs:{for:"decimalsInput"}},[t._v("decimals:\n      "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.setDecimals,expression:"setDecimals",modifiers:{number:!0}}],attrs:{type:"number",name:"decimalsInput"},domProps:{value:t.setDecimals},on:{input:function(e){e.target.composing||(t.setDecimals=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"separatorInput"}},[t._v("separator:\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setSeparator,expression:"setSeparator"}],attrs:{name:"separatorInput"},domProps:{value:t.setSeparator},on:{input:function(e){e.target.composing||(t.setSeparator=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"prefixInput"}},[t._v("prefix:\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setPrefix,expression:"setPrefix"}],attrs:{name:"prefixInput"},domProps:{value:t.setPrefix},on:{input:function(e){e.target.composing||(t.setPrefix=e.target.value)}}})]),t._v(" "),n("label",{staticClass:"label",attrs:{for:"suffixInput"}},[t._v("suffix:\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setSuffix,expression:"setSuffix"}],attrs:{name:"suffixInput"},domProps:{value:t.setSuffix},on:{input:function(e){e.target.composing||(t.setSuffix=e.target.value)}}})])]),t._v(" "),n("code",[t._v("<count-to :start-val='"+t._s(t._startVal)+"' :end-val='"+t._s(t._endVal)+"' :duration='"+t._s(t._duration)+"'\n    :decimals='"+t._s(t._decimals)+"' :separator='"+t._s(t._separator)+"' :prefix='"+t._s(t._prefix)+"' :suffix='"+t._s(t._suffix)+"'\n    :autoplay=false>")])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"warn-content"},[e("a",{attrs:{href:"https://github.com/PanJiaChen/vue-countTo",target:"_blank"}},[this._v("CountTo component")])])}],!1,null,"4b58de0e",null);e.default=s.exports},Mwyl:function(t,e,n){(e=n("JPst")(!1)).push([t.i,"\n.example-btn[data-v-4b58de0e] {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: 500;\n  text-align: center;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  line-height: 1.5;\n  padding: 4px 15px;\n  font-size: 12px;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);\n  transition: all .3s cubic-bezier(.645, .045, .355, 1);\n  position: relative;\n  color: rgba(0, 0, 0, .65);\n  background-color: #fff;\n  border-color: #d9d9d9;\n}\n.example-btn[data-v-4b58de0e]:hover {\n  color: #4AB7BD;\n  background-color: #fff;\n  border-color: #4AB7BD;\n}\n.example[data-v-4b58de0e] {\n  font-size: 50px;\n  color: #F6416C;\n  display: block;\n  margin: 10px 0;\n  text-align: center;\n  font-size: 80px;\n  font-weight: 500;\n}\n.label[data-v-4b58de0e] {\n  color: #2f4f4f;\n  font-size: 16px;\n  display: inline-block;\n  margin: 15px 30px 15px 0;\n}\ninput[data-v-4b58de0e] {\n  position: relative;\n  display: inline-block;\n  padding: 4px 7px;\n  width: 70px;\n  height: 28px;\n  cursor: text;\n  font-size: 12px;\n  line-height: 1.5;\n  color: rgba(0, 0, 0, .65);\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n.startBtn[data-v-4b58de0e] {\n  margin-left: 20px;\n  font-size: 20px;\n  color: #30B08F;\n  background-color: #fff;\n}\n.startBtn[data-v-4b58de0e]:hover {\n  background-color: #30B08F;\n  color: #fff;\n  border-color: #30B08F;\n}\n.pause-resume-btn[data-v-4b58de0e] {\n  font-size: 20px;\n  color: #E65D6E;\n  background-color: #fff;\n}\n.pause-resume-btn[data-v-4b58de0e]:hover {\n  background-color: #E65D6E;\n  color: #fff;\n  border-color: #E65D6E;\n}\n",""]),t.exports=e},"zFt+":function(t,e,n){"use strict";var a=n("9O5j");n.n(a).a}}]);