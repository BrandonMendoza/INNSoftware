(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{"5pB8":function(n,t,e){"use strict";var o=e("Xn7O");e.n(o).a},CHY2:function(n,t,e){"use strict";var o=e("s52Q");e.n(o).a},Pl9W:function(n,t,e){(t=e("JPst")(!1)).push([n.i,".login-container[data-v-d39fd192] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  background-color: #2d3a4b;\n}\n.login-container .login-form[data-v-d39fd192] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  width: 520px;\n  max-width: 100%;\n  padding: 35px 35px 15px 35px;\n  margin: 120px auto;\n}\n.login-container .tips[data-v-d39fd192] {\n  font-size: 14px;\n  color: #fff;\n  margin-bottom: 10px;\n}\n.login-container .tips span[data-v-d39fd192]:first-of-type {\n  margin-right: 16px;\n}\n.login-container .svg-container[data-v-d39fd192] {\n  padding: 6px 5px 6px 15px;\n  color: #889aa4;\n  vertical-align: middle;\n  width: 30px;\n  display: inline-block;\n}\n.login-container .title[data-v-d39fd192] {\n  font-size: 26px;\n  color: #eee;\n  margin: 0px auto 40px auto;\n  text-align: center;\n  font-weight: bold;\n}\n.login-container .show-pwd[data-v-d39fd192] {\n  position: absolute;\n  right: 10px;\n  top: 7px;\n  font-size: 16px;\n  color: #889aa4;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.login-container .set-language[data-v-d39fd192] {\n  color: #fff;\n  position: absolute;\n  top: 40px;\n  right: 35px;\n}\n@media screen and (orientation: landscape) and (max-width: 1024px) {\n.login-container[data-v-d39fd192] {\n    position: relative;\n    overflow-y: auto;\n}\n.login-container .login-form[data-v-d39fd192] {\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    left: 50%;\n    top: 50%;\n    margin: auto;\n}\n}\n",""]),n.exports=t},SJ18:function(n,t,e){"use strict";e.r(t);var o=e("s7Al"),i=e("l+MC"),a=e("nlWZ"),r={name:"Login",components:{LangSelect:o.a},data:function(){return{loginForm:{email:"admin@laravue.dev",password:"laravue"},loginRules:{email:[{required:!0,trigger:"blur",validator:function(n,t,e){Object(i.b)(t)?e():e(new Error("Please enter the correct email"))}}],password:[{required:!0,trigger:"blur",validator:function(n,t,e){t.length<4?e(new Error("Password cannot be less than 4 digits")):e()}}]},loading:!1,pwdType:"password",redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(n){var t=n.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;n.loading=!0,Object(a.a)().then((function(){n.$store.dispatch("user/login",n.loginForm).then((function(){n.$router.push({path:n.redirect||"/",query:n.otherQuery},(function(n){})),n.loading=!1})).catch((function(){n.loading=!1}))}))}))},getOtherQuery:function(n){return Object.keys(n).reduce((function(t,e){return"redirect"!==e&&(t[e]=n[e]),t}),{})}}},s=(e("CHY2"),e("5pB8"),e("KHd+")),l=Object(s.a)(r,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:n.loginForm,rules:n.loginRules,"auto-complete":"on","label-position":"left"}},[e("h3",{staticClass:"title"},[n._v("\n      "+n._s(n.$t("login.title"))+"\n    ")]),n._v(" "),e("lang-select",{staticClass:"set-language"}),n._v(" "),e("el-form-item",{attrs:{prop:"email"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),e("el-input",{attrs:{name:"email",type:"text","auto-complete":"on",placeholder:n.$t("login.email")},model:{value:n.loginForm.email,callback:function(t){n.$set(n.loginForm,"email",t)},expression:"loginForm.email"}})],1),n._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),e("el-input",{attrs:{type:n.pwdType,name:"password","auto-complete":"on",placeholder:"password"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&n._k(t.keyCode,"enter",13,t.key,"Enter")?null:n.handleLogin(t)}},model:{value:n.loginForm.password,callback:function(t){n.$set(n.loginForm,"password",t)},expression:"loginForm.password"}}),n._v(" "),e("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[e("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),e("el-form-item",[e("el-button",{staticStyle:{width:"100%"},attrs:{loading:n.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),n.handleLogin(t)}}},[n._v("\n        Sign in\n      ")])],1)],1)],1)}),[],!1,null,"d39fd192",null);t.default=l.exports},"WRz+":function(n,t,e){(t=e("JPst")(!1)).push([n.i,"/* reset element-ui css */\n.login-container .el-input {\n  display: inline-block;\n  height: 47px;\n  width: 85%;\n}\n.login-container .el-input input {\n  background: transparent;\n  border: 0px;\n  -webkit-appearance: none;\n  border-radius: 0px;\n  padding: 12px 5px 12px 15px;\n  color: #eee;\n  height: 47px;\n}\n.login-container .el-input input:-webkit-autofill {\n  -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;\n  -webkit-text-fill-color: #fff !important;\n}\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  color: #454545;\n}\n",""]),n.exports=t},Xn7O:function(n,t,e){var o=e("Pl9W");"string"==typeof o&&(o=[[n.i,o,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(o,i);o.locals&&(n.exports=o.locals)},s52Q:function(n,t,e){var o=e("WRz+");"string"==typeof o&&(o=[[n.i,o,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(o,i);o.locals&&(n.exports=o.locals)}}]);