(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"+Awk":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n("lwsE"),r=n.n(i),s=n("W8MJ"),o=n.n(s),a=n("rywy"),l=function(){function e(t){r()(this,e),this.uri=t}return o()(e,[{key:"list",value:function(e){return Object(a.a)({url:"/"+this.uri,method:"get",params:e})}},{key:"get",value:function(e){return Object(a.a)({url:"/"+this.uri+"/"+e,method:"get"})}},{key:"store",value:function(e){return Object(a.a)({url:"/"+this.uri,method:"post",data:e})}},{key:"update",value:function(e,t){return Object(a.a)({url:"/"+this.uri+"/"+e,method:"put",data:t})}},{key:"destroy",value:function(e){return Object(a.a)({url:"/"+this.uri+"/"+e,method:"delete"})}}]),e}()},"4Aq5":function(e,t,n){var i=n("EyLs");"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,r);i.locals&&(e.exports=i.locals)},"4juw":function(e,t,n){var i=n("jxZQ");"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,r);i.locals&&(e.exports=i.locals)},"7W2i":function(e,t,n){var i=n("SksO");e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}},"7sWw":function(e,t,n){var i=n("VyIk");"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,r);i.locals&&(e.exports=i.locals)},"7zX1":function(e,t,n){"use strict";var i=n("4juw");n.n(i).a},EyLs:function(e,t,n){(t=n("JPst")(!1)).push([e.i,"\n.pagination-container[data-v-68c28e9d] {\n  background: #fff;\n  padding: 32px 16px;\n}\n.pagination-container.hidden[data-v-68c28e9d] {\n  display: none;\n}\n",""]),e.exports=t},GczY:function(e,t,n){"use strict";var i=n("g6NE"),r={inserted:function(e,t,n){var r=t.value,s=i.a.getters&&i.a.getters.permissions;if(!(r&&r instanceof Array&&r.length>0))throw new Error("Permissions are required! Example: v-permission=\"['manage user','manage permission']\"");var o=r;s.some((function(e){return o.includes(e)}))||e.parentNode&&e.parentNode.removeChild(e)}},s=function(e){e.directive("permission",r)};window.Vue&&(window.permission=r,Vue.use(s)),r.install=s;t.a=r},"HF+U":function(e,t,n){"use strict";n("7sWw");var i="@@wavesContext";function r(e,t){function n(n){var i=Object.assign({},t.value),r=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),s=r.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var o=s.getBoundingClientRect(),a=s.querySelector(".waves-ripple");switch(a?a.className="waves-ripple":((a=document.createElement("span")).className="waves-ripple",a.style.height=a.style.width=Math.max(o.width,o.height)+"px",s.appendChild(a)),r.type){case"center":a.style.top=o.height/2-a.offsetHeight/2+"px",a.style.left=o.width/2-a.offsetWidth/2+"px";break;default:a.style.top=(n.pageY-o.top-a.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",a.style.left=(n.pageX-o.left-a.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return a.style.backgroundColor=r.color,a.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var s={bind:function(e,t){e.addEventListener("click",r(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!0),e.addEventListener("click",r(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},o=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(o)),s.install=o;t.a=s},Nsbk:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},OuqF:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=n("g6NE");function r(e){if(e&&e instanceof Array&&e.length>0){var t=i.a.getters&&i.a.getters.permissions,n=e;return t.some((function(e){return n.includes(e)}))}return console.error("Need permissions! Like v-permission=\"['manage permission','edit article']\""),!1}},PJYZ:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},SksO:function(e,t){function n(t,i){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,i)}e.exports=n},VyIk:function(e,t,n){(t=n("JPst")(!1)).push([e.i,".waves-ripple {\n    position: absolute;\n    border-radius: 100%;\n    background-color: rgba(0, 0, 0, 0.15);\n    background-clip: padding-box;\n    pointer-events: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 1;\n}\n\n.waves-ripple.z-active {\n    opacity: 0;\n    -webkit-transform: scale(2);\n    transform: scale(2);\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\n}",""]),e.exports=t},W8MJ:function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}e.exports=function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}},a1gu:function(e,t,n){var i=n("cDf5"),r=n("PJYZ");e.exports=function(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?r(e):t}},bHOZ:function(e,t,n){"use strict";var i=n("4Aq5");n.n(i).a},jxZQ:function(e,t,n){(t=n("JPst")(!1)).push([e.i,".edit-input[data-v-48bd6654] {\n  padding-right: 100px;\n}\n.cancel-btn[data-v-48bd6654] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n.dialog-footer[data-v-48bd6654] {\n  text-align: left;\n  padding-top: 0;\n  margin-left: 150px;\n}\n.app-container[data-v-48bd6654] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 14px;\n  padding-right: 8px;\n}\n.app-container .block[data-v-48bd6654] {\n  float: left;\n  min-width: 250px;\n}\n.app-container .clear-left[data-v-48bd6654] {\n  clear: left;\n}\n",""]),e.exports=t},k9pt:function(e,t,n){"use strict";Math.easeInOutQuad=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function r(e,t,n){var r=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=e-r,o=0;t=void 0===t?500:t;!function e(){o+=20;var a,l=Math.easeInOutQuad(o,r,s,t);a=l,document.documentElement.scrollTop=a,document.body.parentNode.scrollTop=a,document.body.scrollTop=a,o<t?i(e):n&&"function"==typeof n&&n()}()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,15,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&r(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&r(0,800)}}},o=(n("bHOZ"),n("KHd+")),a=Object(o.a)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)}),[],!1,null,"68c28e9d",null);t.a=a.exports},lwsE:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},"ze0+":function(e,t,n){"use strict";n.r(t);var i=n("o0o1"),r=n.n(i),s=n("yXPU"),o=n.n(s),a=n("k9pt"),l=n("lwsE"),u=n.n(l),c=n("W8MJ"),d=n.n(c),m=n("7W2i"),p=n.n(m),f=n("a1gu"),h=n.n(f),g=n("Nsbk"),v=n.n(g),w=n("rywy"),b=n("+Awk");function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=v()(e);if(t){var r=v()(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return h()(this,n)}}var k=function(e){p()(n,e);var t=y(n);function n(){return u()(this,n),t.call(this,"users")}return d()(n,[{key:"permissions",value:function(e){return Object(w.a)({url:"/"+this.uri+"/"+e+"/permissions",method:"get"})}},{key:"updatePermission",value:function(e,t){return Object(w.a)({url:"/"+this.uri+"/"+e+"/permissions",method:"put",data:t})}}]),n}(b.a),P=n("HF+U"),x=n("GczY"),_=n("OuqF"),U=new k,C=new b.a("permissions"),$={name:"UserList",components:{Pagination:a.a},directives:{waves:P.a,permission:x.a},data:function(){var e=this;return{list:null,total:0,loading:!0,downloading:!1,userCreating:!1,query:{page:1,limit:15,keyword:"",role:""},roles:["admin","auxiliar administrativo","director general","planeador de produccion","supervisor de produccion","gerente"],nonAdminRoles:["auxiliar administrativo","director general","planeador de produccion","supervisor de produccion","gerente"],newUser:{},dialogFormVisible:!1,dialogPermissionVisible:!1,dialogPermissionLoading:!1,currentUserId:0,currentUser:{name:"",permissions:[],rolePermissions:[]},rules:{role:[{required:!0,message:"Role is required",trigger:"change"}],name:[{required:!0,message:"Name is required",trigger:"blur"}],email:[{required:!0,message:"Email is required",trigger:"blur"},{type:"email",message:"Please input correct email address",trigger:["blur","change"]}],password:[{required:!0,message:"Password is required",trigger:"blur"}],confirmPassword:[{validator:function(t,n,i){n!==e.newUser.password?i(new Error("Password is mismatched!")):i()},trigger:"blur"}]},permissionProps:{children:"children",label:"name",disabled:"disabled"},permissions:[],menuPermissions:[],otherPermissions:[]}},computed:{normalizedMenuPermissions:function(){var e=this,t=[];return this.currentUser.permissions.role.forEach((function(e){t.push({id:e.id,name:e.name,disabled:!0})})),[{id:-1,name:"Inherited from role",disabled:!0,children:this.classifyPermissions(t).menu},{id:0,name:"Extra menus",children:t=this.menuPermissions.filter((function(t){return!e.currentUser.permissions.role.find((function(e){return e.id===t.id}))})),disabled:0===t.length}]},normalizedOtherPermissions:function(){var e=this,t=[];return this.currentUser.permissions.role.forEach((function(e){t.push({id:e.id,name:e.name,disabled:!0})})),[{id:-1,name:"Inherited from role",disabled:!0,children:this.classifyPermissions(t).other},{id:0,name:"Extra permissions",children:t=this.otherPermissions.filter((function(t){return!e.currentUser.permissions.role.find((function(e){return e.id===t.id}))})),disabled:0===t.length}]},userMenuPermissions:function(){return this.classifyPermissions(this.userPermissions).menu},userOtherPermissions:function(){return this.classifyPermissions(this.userPermissions).other},userPermissions:function(){return this.currentUser.permissions.role.concat(this.currentUser.permissions.user)}},created:function(){this.resetNewUser(),this.getList(),Object(_.a)(["manage permission"])&&this.getPermissions()},methods:{checkPermission:_.a,getPermissions:function(){var e=this;return o()(r.a.mark((function t(){var n,i,s,o,a,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.list({});case 2:n=t.sent,i=n.data,s=e.classifyPermissions(i),o=s.all,a=s.menu,l=s.other,e.permissions=o,e.menuPermissions=a,e.otherPermissions=l;case 8:case"end":return t.stop()}}),t)})))()},getList:function(){var e=this;return o()(r.a.mark((function t(){var n,i,s,o,a,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.query,i=n.limit,s=n.page,e.loading=!0,t.next=4,U.list(e.query);case 4:o=t.sent,a=o.data,l=o.meta,e.list=a,e.list.forEach((function(e,t){e.index=(s-1)*i+t+1})),e.total=l.total,e.loading=!1;case 11:case"end":return t.stop()}}),t)})))()},handleFilter:function(){this.query.page=1,this.getList()},handleCreate:function(){var e=this;this.resetNewUser(),this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs.userForm.clearValidate()}))},handleDelete:function(e,t){var n=this;this.$confirm("This will permanently delete user "+t+". Continue?","Warning",{confirmButtonText:"OK",cancelButtonText:"Cancel",type:"warning"}).then((function(){U.destroy(e).then((function(e){n.$message({type:"success",message:"Delete completed"}),n.handleFilter()})).catch((function(e){console.log(e)}))})).catch((function(){n.$message({type:"info",message:"Delete canceled"})}))},handleEditPermissions:function(e){var t=this;return o()(r.a.mark((function n(){var i,s,o;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.currentUserId=e,t.dialogPermissionLoading=!0,t.dialogPermissionVisible=!0,i=t.list.find((function(t){return t.id===e})),n.next=6,U.permissions(e);case 6:s=n.sent,o=s.data,t.currentUser={id:i.id,name:i.name,permissions:o},t.dialogPermissionLoading=!1,t.$nextTick((function(){t.$refs.menuPermissions.setCheckedKeys(t.permissionKeys(t.userMenuPermissions)),t.$refs.otherPermissions.setCheckedKeys(t.permissionKeys(t.userOtherPermissions))}));case 11:case"end":return n.stop()}}),n)})))()},createUser:function(){var e=this;this.$refs.userForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.newUser.roles=[e.newUser.role],e.userCreating=!0,U.store(e.newUser).then((function(t){e.$message({message:"New user "+e.newUser.name+"("+e.newUser.email+") has been created successfully.",type:"success",duration:5e3}),e.resetNewUser(),e.dialogFormVisible=!1,e.handleFilter()})).catch((function(e){console.log(e)})).finally((function(){e.userCreating=!1}))}))},resetNewUser:function(){this.newUser={name:"",email:"",password:"",confirmPassword:"",role:""}},handleDownload:function(){var e=this;this.downloading=!0,Promise.all([n.e(0),n.e(1),n.e(2)]).then(n.bind(null,"6Ru/")).then((function(t){var n=e.formatJson(["index","id","name","email","role"],e.list);t.export_json_to_excel({header:["id","user_id","name","email","role"],data:n,filename:"user-list"}),e.downloading=!1}))},formatJson:function(e,t){return t.map((function(t){return e.map((function(e){return t[e]}))}))},permissionKeys:function(e){return e.map((function(e){return e.id}))},classifyPermissions:function(e){var t=this,n=[],i=[],r=[];return e.forEach((function(e){var s=e.name;n.push(e),s.startsWith("view menu")?i.push(t.normalizeMenuPermission(e)):r.push(t.normalizePermission(e))})),{all:n,menu:i,other:r}},normalizeMenuPermission:function(e){return{id:e.id,name:this.$options.filters.uppercaseFirst(e.name.substring(10)),disabled:e.disabled||!1}},normalizePermission:function(e){var t=e.disabled||"manage permission"===e.name;return{id:e.id,name:this.$options.filters.uppercaseFirst(e.name),disabled:t}},confirmPermission:function(){var e=this,t=this.$refs.menuPermissions.getCheckedKeys(),n=this.$refs.otherPermissions.getCheckedKeys(),i=t.concat(n);this.dialogPermissionLoading=!0,U.updatePermission(this.currentUserId,{permissions:i}).then((function(t){e.$message({message:"Permissions has been updated successfully",type:"success",duration:5e3}),e.dialogPermissionLoading=!1,e.dialogPermissionVisible=!1}))}}},E=(n("7zX1"),n("KHd+")),O=Object(E.a)($,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:e.$t("table.keyword")},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.query.keyword,callback:function(t){e.$set(e.query,"keyword",t)},expression:"query.keyword"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"90px"},attrs:{placeholder:e.$t("table.role"),clearable:""},on:{change:e.handleFilter},model:{value:e.query.role,callback:function(t){e.$set(e.query,"role",t)},expression:"query.role"}},e._l(e.roles,(function(t){return n("el-option",{key:t,attrs:{label:e._f("uppercaseFirst")(t),value:t}})})),1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      "+e._s(e.$t("table.search"))+"\n    ")]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleCreate}},[e._v("\n      "+e._s(e.$t("table.add"))+"\n    ")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("\n      "+e._s(e.$t("table.export"))+"\n    ")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.index))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"Name"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"Email"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.email))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"Role",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.roles.join(", ")))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"Actions",width:"350"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.roles.includes("admin")?e._e():n("router-link",{attrs:{to:"/administrator/users/edit/"+t.row.id}},[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["manage user"],expression:"['manage user']"}],attrs:{type:"primary",size:"small",icon:"el-icon-edit"}},[e._v("\n            Edit\n          ")])],1),e._v(" "),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["manage permission"],expression:"['manage permission']"}],attrs:{type:"warning",size:"small",icon:"el-icon-edit"},on:{click:function(n){return e.handleEditPermissions(t.row.id)}}},[e._v("\n          Permisos\n        ")]),e._v(" "),t.row.roles.includes("admin")?e._e():n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["manage user"],expression:"['manage user']"}],attrs:{type:"danger",size:"small",icon:"el-icon-delete"},on:{click:function(n){return e.handleDelete(t.row.id,t.row.name)}}},[e._v("\n          Eliminar\n        ")])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.query.page,limit:e.query.limit},on:{"update:page":function(t){return e.$set(e.query,"page",t)},"update:limit":function(t){return e.$set(e.query,"limit",t)},pagination:e.getList}}),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogPermissionVisible,title:"Edit Permissions - "+e.currentUser.name},on:{"update:visible":function(t){e.dialogPermissionVisible=t}}},[e.currentUser.name?n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogPermissionLoading,expression:"dialogPermissionLoading"}],staticClass:"form-container"},[n("div",{staticClass:"permissions-container"},[n("div",{staticClass:"block"},[n("el-form",{attrs:{model:e.currentUser,"label-width":"80px","label-position":"top"}},[n("el-form-item",{attrs:{label:"Menus"}},[n("el-tree",{ref:"menuPermissions",staticClass:"permission-tree",attrs:{data:e.normalizedMenuPermissions,"default-checked-keys":e.permissionKeys(e.userMenuPermissions),props:e.permissionProps,"show-checkbox":"","node-key":"id"}})],1)],1)],1),e._v(" "),n("div",{staticClass:"block"},[n("el-form",{attrs:{model:e.currentUser,"label-width":"80px","label-position":"top"}},[n("el-form-item",{attrs:{label:"Permissions"}},[n("el-tree",{ref:"otherPermissions",staticClass:"permission-tree",attrs:{data:e.normalizedOtherPermissions,"default-checked-keys":e.permissionKeys(e.userOtherPermissions),props:e.permissionProps,"show-checkbox":"","node-key":"id"}})],1)],1)],1),e._v(" "),n("div",{staticClass:"clear-left"})]),e._v(" "),n("div",{staticStyle:{"text-align":"right"}},[n("el-button",{attrs:{type:"danger"},on:{click:function(t){e.dialogPermissionVisible=!1}}},[e._v("\n          "+e._s(e.$t("permission.cancel"))+"\n        ")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.confirmPermission}},[e._v("\n          "+e._s(e.$t("permission.confirm"))+"\n        ")])],1)]):e._e()]),e._v(" "),n("el-dialog",{attrs:{title:"Create new user",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.userCreating,expression:"userCreating"}],staticClass:"form-container"},[n("el-form",{ref:"userForm",staticStyle:{"max-width":"500px"},attrs:{rules:e.rules,model:e.newUser,"label-position":"left","label-width":"150px"}},[n("el-form-item",{attrs:{label:e.$t("user.role"),prop:"role"}},[n("el-select",{staticClass:"filter-item",attrs:{placeholder:"Please select role"},model:{value:e.newUser.role,callback:function(t){e.$set(e.newUser,"role",t)},expression:"newUser.role"}},e._l(e.nonAdminRoles,(function(t){return n("el-option",{key:t,attrs:{label:e._f("uppercaseFirst")(t),value:t}})})),1)],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("user.name"),prop:"name"}},[n("el-input",{model:{value:e.newUser.name,callback:function(t){e.$set(e.newUser,"name",t)},expression:"newUser.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("user.email"),prop:"email"}},[n("el-input",{model:{value:e.newUser.email,callback:function(t){e.$set(e.newUser,"email",t)},expression:"newUser.email"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("user.password"),prop:"password"}},[n("el-input",{attrs:{"show-password":""},model:{value:e.newUser.password,callback:function(t){e.$set(e.newUser,"password",t)},expression:"newUser.password"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("user.confirmPassword"),prop:"confirmPassword"}},[n("el-input",{attrs:{"show-password":""},model:{value:e.newUser.confirmPassword,callback:function(t){e.$set(e.newUser,"confirmPassword",t)},expression:"newUser.confirmPassword"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("\n          "+e._s(e.$t("table.cancel"))+"\n        ")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.createUser()}}},[e._v("\n          "+e._s(e.$t("table.confirm"))+"\n        ")])],1)],1)])],1)}),[],!1,null,"48bd6654",null);t.default=O.exports}}]);