(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{"1gbT":function(t,e,n){(e=n("JPst")(!1)).push([t.i,"\n.edit-input[data-v-639e4585] {\n  padding-right: 100px;\n}\n.cancel-btn[data-v-639e4585] {\n  position: absolute;\n  right: 15px;\n  top: 10px;\n}\n",""]),t.exports=e},"6ZsR":function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"b",(function(){return s})),n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return l})),n.d(e,"e",(function(){return o}));var i=n("rywy");function a(t){return Object(i.a)({url:"/articles",method:"get",params:t})}function s(t){return Object(i.a)({url:"/articles/"+t,method:"get"})}function r(t){return Object(i.a)({url:"/articles/"+t+"/pageviews",method:"get"})}function l(t){return Object(i.a)({url:"/article/create",method:"post",data:t})}function o(t){return Object(i.a)({url:"/article/update",method:"post",data:t})}},IgsS:function(t,e,n){var i=n("1gbT");"string"==typeof i&&(i=[[t.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,a);i.locals&&(t.exports=i.locals)},exh9:function(t,e,n){"use strict";var i=n("IgsS");n.n(i).a},rL1j:function(t,e,n){"use strict";n.r(e);var i=n("o0o1"),a=n.n(i),s=n("yXPU"),r=n.n(s),l=n("6ZsR"),o={name:"InlineEditTable",filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]}},data:function(){return{list:null,listLoading:!0,listQuery:{page:1,limit:10}}},created:function(){this.getList()},methods:{getList:function(){var t=this;return r()(a.a.mark((function e(){var n,i,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.listLoading=!0,e.next=3,Object(l.c)(t.listQuery);case 3:n=e.sent,i=n.data,s=i.items,t.list=s.map((function(e){return t.$set(e,"edit",!1),e.originalTitle=e.title,e})),t.listLoading=!1;case 8:case"end":return e.stop()}}),e)})))()},cancelEdit:function(t){t.title=t.originalTitle,t.edit=!1,this.$message({message:"The title has been restored to the original value",type:"warning"})},confirmEdit:function(t){t.edit=!1,t.originalTitle=t.title,this.$message({message:"The title has been edited",type:"success"})}}},c=(n("exh9"),n("KHd+")),u=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"180px",align:"center",label:"Date"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("parseTime")(e.row.timestamp,"{y}-{m}-{d} {h}:{i}")))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"120px",align:"center",label:"Author"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.author))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"100px",label:"Importance"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(+e.row.importance,(function(t){return n("svg-icon",{key:t,staticClass:"meta-item__icon",attrs:{"icon-class":"star"}})}))}}])}),t._v(" "),n("el-table-column",{attrs:{"class-name":"status-col",label:"Status",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("el-tag",{attrs:{type:t._f("statusFilter")(i.status)}},[t._v("\n          "+t._s(i.status)+"\n        ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"300px",label:"Title"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[i.edit?[n("el-input",{staticClass:"edit-input",attrs:{size:"small"},model:{value:i.title,callback:function(e){t.$set(i,"title",e)},expression:"row.title"}}),t._v(" "),n("el-button",{staticClass:"cancel-btn",attrs:{size:"small",icon:"el-icon-refresh",type:"warning"},on:{click:function(e){return t.cancelEdit(i)}}},[t._v("\n            cancel\n          ")])]:n("span",[t._v(t._s(i.title))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"Actions",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[i.edit?n("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-circle-check-outline"},on:{click:function(e){return t.confirmEdit(i)}}},[t._v("\n          Ok\n        ")]):n("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(t){i.edit=!i.edit}}},[t._v("\n          Edit\n        ")])]}}])})],1)],1)}),[],!1,null,"639e4585",null);e.default=u.exports}}]);