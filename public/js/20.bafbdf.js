(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"/osV":function(e,o,t){var r=t("hyNO");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};t("aET+")(r,n);r.locals&&(e.exports=r.locals)},"3/cO":function(e,o,t){var r=t("9rId");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};t("aET+")(r,n);r.locals&&(e.exports=r.locals)},"4Aq5":function(e,o,t){var r=t("EyLs");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};t("aET+")(r,n);r.locals&&(e.exports=r.locals)},"9rId":function(e,o,t){(o=t("JPst")(!1)).push([e.i,"\n.icon-star[data-v-7e5840e8] {\r\n  margin-right:2px;\n}\n.drag-handler[data-v-7e5840e8] {\r\n  width: 20px;\r\n  height: 20px;\r\n  cursor: pointer;\n}\n.show-d[data-v-7e5840e8] {\r\n  margin-top: 15px;\n}\r\n",""]),e.exports=o},EyLs:function(e,o,t){(o=t("JPst")(!1)).push([e.i,"\n.pagination-container[data-v-68c28e9d] {\n  background: #fff;\n  padding: 32px 16px;\n}\n.pagination-container.hidden[data-v-68c28e9d] {\n  display: none;\n}\n",""]),e.exports=o},HwFC:function(e,o,t){"use strict";var r=t("Qsoo");t.n(r).a},JNZO:function(e,o,t){(o=t("JPst")(!1)).push([e.i,"\n.color[data-v-64a1d4d8] {\n    width: 100%;\n}\n",""]),e.exports=o},Qsoo:function(e,o,t){var r=t("JNZO");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};t("aET+")(r,n);r.locals&&(e.exports=r.locals)},bHOZ:function(e,o,t){"use strict";var r=t("4Aq5");t.n(r).a},hyNO:function(e,o,t){(o=t("JPst")(!1)).push([e.i,"\n.sortable-ghost{\r\n  opacity: .8;\r\n  color: #fff!important;\r\n  background: #42b983!important;\n}\r\n",""]),e.exports=o},k9pt:function(e,o,t){"use strict";Math.easeInOutQuad=function(e,o,t,r){return(e/=r/2)<1?t/2*e*e+o:-t/2*(--e*(e-2)-1)+o};var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function n(e,o,t){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=e-n,s=0;o=void 0===o?500:o;!function e(){s+=20;var i,l=Math.easeInOutQuad(s,n,a,o);i=l,document.documentElement.scrollTop=i,document.body.parentNode.scrollTop=i,document.body.scrollTop=i,s<o?r(e):t&&"function"==typeof t&&t()}()}var a={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,15,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&n(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},s=(t("bHOZ"),t("KHd+")),i=Object(s.a)(a,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[t("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(o){e.currentPage=o},"update:current-page":function(o){e.currentPage=o},"update:pageSize":function(o){e.pageSize=o},"update:page-size":function(o){e.pageSize=o},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)}),[],!1,null,"68c28e9d",null);o.a=i.exports},kF9C:function(e,o,t){"use strict";var r=t("3/cO");t.n(r).a},pPad:function(e,o,t){"use strict";t.r(o);var r={data:function(){return{form:{id:0,activo:1,nombre:"",simbolo:"",color:"",texto_color:"#000000"},rules:{nombre:[{required:!0,message:"Ingresa un nombre de Proceso",trigger:"blur"}],simbolo:[{required:!0,message:"Ingresa un simbolo de Proceso",trigger:"blur"}],color:[{required:!0,message:"Selecciona un color",trigger:"change"}],texto_color:[{required:!0,message:"Seleccion un color de texto",trigger:"change"}]},checked:"",update:0,dialogoAgregar:!1,dialogRef:"myForm",predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]}},methods:{open:function(){this.dialogoAgregar=!0},close:function(){this.dialogoAgregar=!1},insertProceso:function(e){var o=this;this.$refs[e].validate((function(e){if(!e)return!1;var t=o,r=o.$loading({target:".el-dialog"});axios.put("/proceso/insert",t.form).then((function(e){t.$parent.getProcesos(),t.clearFields(),t.close(),r.close(),t.$message.success("Guardado correctamente.")})).catch((function(e){t.$message.success("Hubo un error."),console.log(e)}))}))},clearFields:function(){this.form.id=0,this.form.activo=1,this.form.nombre="",this.form.simbolo="",this.form.color="",this.form.texto_color="#000000"},handleClose:function(e){var o=this;this.$confirm("Está seguro que deseas salir?").then((function(e){o.clearFields(),o.close()})).catch((function(e){}))}}},n=(t("HwFC"),t("KHd+")),a=Object(n.a)(r,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-position":"top","label-width":"100px"}},[t("el-dialog",{ref:e.dialogRef,attrs:{width:"20%","before-close":e.handleClose,visible:e.dialogoAgregar},on:{"update:visible":function(o){e.dialogoAgregar=o}}},[0==e.form.id?t("span",{attrs:{slot:"title"},slot:"title"},[t("i",{staticClass:"el-icon-plus"}),e._v(" Agregar Proceso")]):e._e(),e._v(" "),0!=e.form.id?t("span",{attrs:{slot:"title"},slot:"title"},[t("i",{staticClass:"el-icon-edit"}),e._v(" Editar Proceso ")]):e._e(),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.id,expression:"form.id"}],attrs:{hidden:""},domProps:{value:e.form.id},on:{input:function(o){o.target.composing||e.$set(e.form,"id",o.target.value)}}}),e._v(" "),t("el-form-item",{staticClass:"text-right"},[t("el-switch",{attrs:{"active-text":"Activo","active-value":1,"inactive-value":0},model:{value:e.form.activo,callback:function(o){e.$set(e.form,"activo",o)},expression:"form.activo"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"Nombre del Proceso",prop:"nombre"}},[t("el-input",{model:{value:e.form.nombre,callback:function(o){e.$set(e.form,"nombre",o)},expression:"form.nombre"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"Simbolo",prop:"simbolo"}},[t("el-input",{model:{value:e.form.simbolo,callback:function(o){e.$set(e.form,"simbolo",o)},expression:"form.simbolo"}})],1),e._v(" "),t("el-form-item",{attrs:{required:""}},[t("el-col",{attrs:{span:5}},[t("el-form-item",{attrs:{label:"Color",prop:"color"}},[t("el-color-picker",{staticClass:"color",attrs:{predefine:e.predefineColors},model:{value:e.form.color,callback:function(o){e.$set(e.form,"color",o)},expression:"form.color"}})],1)],1),e._v(" "),t("el-col",{staticClass:"line",attrs:{span:2}}),e._v(" "),t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:"Color del Texto",prop:"texto_color"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"selecciona color del texto"},model:{value:e.form.texto_color,callback:function(o){e.$set(e.form,"texto_color",o)},expression:"form.texto_color"}},[t("el-option",{attrs:{label:"Negro",value:"#000000"}}),e._v(" "),t("el-option",{attrs:{label:"Blanco",value:"#FFFFFF"}})],1)],1)],1)],1),e._v(" "),t("el-form-item",[t("div",{staticClass:"text-center",style:{"background-color":e.form.color,color:e.form.texto_color}},[t("b",[e._v("EJEMPLO")])])]),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticClass:"float-left",on:{click:function(o){e.clearFields(),e.dialogoAgregar=!1}}},[e._v("Cancelar")]),e._v(" "),0==e.form.id?t("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(o){return e.insertProceso("form")}}},[e._v("Agregar")]):e._e(),e._v(" "),0!=e.form.id?t("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(o){return e.insertProceso("form")}}},[e._v("Guardar")]):e._e()],1)],1)],1)}),[],!1,null,"64a1d4d8",null).exports,s=t("lSNA"),i=t.n(s),l=t("iiPH"),c={name:"DragTable",filters:{statusFilter:function(e){return{published:"success",draft:"info",deleted:"danger"}[e]}},data:function(){var e;return e={list:[],total:null,listLoading:!0,listQuery:{page:1,limit:10},sortable:null,oldList:[],newList:[]},i()(e,"sortable",null),i()(e,"dialogoOrdenar",!1),i()(e,"dialogOrdenarRef","dialogoOrdenar"),i()(e,"loading",!0),i()(e,"procesosOrdenar",[]),e},methods:{guardarOrden:function(){var e=this.$loading({target:".dialogoOrdenar .el-dialog"}),o=this;axios.put("/procesos/updateOrder",{procesos:this.procesosOrdenar}).then((function(t){console.log("Response:"),console.log(t),o.$parent.getProcesos(),o.close(),e.close(),o.notificarSuccess()})).catch((function(e){notificarError(),console.log(e)}))},getList:function(){var e=this;this.listLoading=!0,this.list=this.procesosOrdenar,this.oldList=this.list.map((function(e){return e.id})),this.newList=this.oldList.slice(),this.$nextTick((function(){e.setSort()}))},getProcesos:function(){var e=this;axios.get("/procesos/order").then((function(o){console.table("PROCESOS ORDER:"),console.table(o.data),e.procesosOrdenar=o.data,e.getList(),e.listLoading=!1})).catch((function(e){console.log(e)}))},setSort:function(){var e=this,o=this.$refs.dragTable.$el.querySelectorAll(".el-table__body-wrapper > table > tbody")[0];console.log("EL:"),console.log(o),this.sortable=l.default.create(o,{ghostClass:"sortable-ghost",setData:function(e){e.setData("Text","")},onEnd:function(o){var t=e.newList.splice(o.oldIndex,1)[0];e.newList.splice(o.newIndex,0,t),e.newList.forEach((function(o,t){e.procesosOrdenar.find((function(e){e.id===o&&(e.orden=t+1)}))}))}})},open:function(){this.dialogoOrdenar=!0,this.getProcesos()},close:function(){this.dialogoOrdenar=!1},notificarSuccess:function(){this.$message({message:"Guardado correctamente.",type:"success"})},notificarError:function(){this.$message({message:"Hubo un error.",type:"danger"})}}},u=(t("ro/p"),t("kF9C"),Object(n.a)(c,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"app-container"},[t("el-dialog",{ref:e.dialogOrdenarRef,staticClass:"dialogoOrdenar",attrs:{width:"60%",visible:e.dialogoOrdenar},on:{"update:visible":function(o){e.dialogoOrdenar=o}}},[t("span",{attrs:{slot:"title"},slot:"title"},[t("svg-icon",{attrs:{"icon-class":"list"}}),e._v(" Ordenar Procesos")],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"dragTable",staticStyle:{width:"100%"},attrs:{data:e.procesosOrdenar,border:"",fit:"","highlight-current-row":"","row-key":"id"}},[t("el-table-column",{attrs:{prop:"orden",label:"Orden",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{prop:"nombre",label:"Nombre"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(o.row.nombre))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"simbolo",label:"Simbolo"}}),e._v(" "),t("el-table-column",{attrs:{prop:"porcentaje",label:"Porcentaje"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(o.row.porcentaje)+"%")])]}}])})],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticClass:"float-left",on:{click:function(o){e.dialogoOrdenar=!1}}},[e._v("Cancelar")]),e._v(" "),t("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(o){return e.guardarOrden()}}},[e._v("Guardar")])],1)],1)],1)}),[],!1,null,"7e5840e8",null).exports),d=t("SXG0"),p=t.n(d),f=(t("PjkW"),{components:{VueSlider:p.a},data:function(){return{porcentajeTotal:0,sortable:null,dialogoPorcentaje:!1,dialogPorcentajeRef:"dialogoPorcentaje",listLoading:!0,procesos:[],min:0,max:100,errorMsg:""}},methods:{slide:function(){var e=this;if(this.porcentajeTotal=0,this.procesos.forEach((function(o,t){e.porcentajeTotal+=e.procesos[t].porcentaje})),this.porcentajeTotal>100)return this.errorMsg="El porcentaje total debe de ser 100%, porcentaje total actual: "+this.porcentajeTotal+"%",!1;this.errorMsg=""},guardarPorcentajes:function(){if(100!=this.porcentajeTotal)return this.$message.error("El porcentaje total debe ser igual a 100%."),!1;var e=this.$loading({target:".dialogoPorcentaje .el-dialog"}),o=this;axios.put("/procesos/updatePorcentaje",{procesos:this.procesos}).then((function(t){console.log("Response:"),console.log(t),o.$parent.getProcesos(),o.close(),e.close(),o.notificarSuccess()})).catch((function(e){notificarError(),console.log(e)}))},getProcesos:function(){var e=this.$loading({target:".dialogoPorcentaje .el-dialog"}),o=this;axios.get("/procesos/order").then((function(t){console.table("PROCESOS ORDER:"),console.table(t.data),o.procesos=t.data,o.porcentajeTotal=0,o.procesos.forEach((function(e,t){o.porcentajeTotal+=o.procesos[t].porcentaje})),e.close()})).catch((function(o){e.close(),console.log(o)}))},open:function(){this.dialogoPorcentaje=!0,this.getProcesos()},close:function(){this.dialogoPorcentaje=!1},notificarSuccess:function(){this.$message({message:"Guardado correctamente.",type:"success"})},notificarError:function(){this.$message.error({message:"Hubo un error."})},clearErrorMsg:function(){this.errorMsg=""},handleClose:function(e){var o=this;this.$confirm("Está seguro que deseas salir?").then((function(e){o.close()})).catch((function(e){}))}}}),g={data:function(){return{loading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},procesos:[]}},components:{formDialog:a,ordenarDialog:u,porcentajeDialog:Object(n.a)(f,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"app-container"},[t("el-dialog",{ref:e.dialogPorcentajeRef,staticClass:"dialogoPorcentaje",attrs:{width:"35%","before-close":e.handleClose,visible:e.dialogoPorcentaje},on:{"update:visible":function(o){e.dialogoPorcentaje=o}}},[t("span",{attrs:{slot:"title"},slot:"title"},[t("i",{staticClass:"el-icon-s-operation"}),e._v(" Porcentaje Procesos")]),e._v(" "),t("el-row",{staticStyle:{"margin-bottom":"10px"}},[e.porcentajeTotal>100?t("span",{staticStyle:{color:"red","margin-left":"20px"}},[e._v(e._s(e.errorMsg))]):e._e()]),e._v(" "),t("el-row",{staticStyle:{"margin-bottom":"20px"}},[t("el-progress",{attrs:{"text-inside":!0,"stroke-width":24,percentage:e.porcentajeTotal>100?100:e.porcentajeTotal,status:e.porcentajeTotal>100?"exception":"success"}})],1),e._v(" "),e._l(e.procesos,(function(o){return t("el-row",{key:o.id,staticClass:"text-center",staticStyle:{"margin-bottom":"15px"},attrs:{gutter:30}},[t("el-col",{style:{"background-color":o.color,color:o.texto_color},attrs:{span:4}},[t("span",[e._v(e._s(o.nombre)+"  ")])]),e._v(" "),t("el-col",{attrs:{span:13}},[t("vue-slider",{ref:o.id,refInFor:!0,attrs:{min:e.min,max:e.max},on:{change:function(o){e.clearErrorMsg,e.slide()}},model:{value:o.porcentaje,callback:function(t){e.$set(o,"porcentaje",t)},expression:"proceso.porcentaje"}})],1),e._v(" "),t("el-col",{attrs:{span:6}},[t("el-input-number",{attrs:{size:"mini"},on:{change:function(o){return e.slide()}},model:{value:o.porcentaje,callback:function(t){e.$set(o,"porcentaje",t)},expression:"proceso.porcentaje"}})],1)],1)})),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticClass:"float-left",on:{click:function(o){e.dialogoPorcentaje=!1}}},[e._v("Cancelar")]),e._v(" "),t("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(o){return e.guardarPorcentajes()}}},[e._v("Guardar")])],1)],2)],1)}),[],!1,null,null,null).exports,Pagination:t("k9pt").a},methods:{getProcesos:function(){var e=this;axios.get("/procesos").then((function(o){e.procesos=o.data,e.loading=!1})).catch((function(o){e.$message.error("Hubo un error."),console.log(o),e.loading=!1}))},loadFieldsUpdate:function(e){this.$refs.myForm.form.id=e.id,this.$refs.myForm.form.activo=parseInt(e.activo),this.$refs.myForm.form.nombre=e.nombre,this.$refs.myForm.form.simbolo=e.simbolo,this.$refs.myForm.form.color=e.color,this.$refs.myForm.form.texto_color=e.texto_color,this.$refs.myForm.open()},deleteRow:function(e){var o=this;o.loading=!0,console.log("DELETE FUNCTION"),axios.post("/proceso/delete",{id:e}).then((function(e){o.getProcesos(),o.$message.success("Eliminado correctamente."),o.loading=!1})).catch((function(e){o.$message.error("Hubo un error."),console.log(e),o.loading=!1}))}},mounted:function(){this.getProcesos()}},m=Object(n.a)(g,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"app-container"},[t("el-row"),e._v(" "),t("div",{staticClass:"filter-container"},[t("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(o){e.$refs.myForm.clearFields(),e.$refs.myForm.open()}}},[e._v("Agregar")]),e._v(" "),t("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:""},on:{click:function(o){return e.$refs.dialogoOrdenar.open()}}},[t("svg-icon",{attrs:{"icon-class":"list"}}),e._v(" Ordenar")],1),e._v(" "),t("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:""},on:{click:function(o){return e.$refs.dialogoPorcentaje.open()}}},[t("i",{staticClass:"el-icon-s-operation"}),e._v(" Porcentajes")])],1),e._v(" "),t("el-row",[t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.procesos,border:"",fit:"","highlight-current-row":""}},[t("el-table-column",{attrs:{type:"index",align:"center",width:"80"}}),e._v(" "),t("el-table-column",{attrs:{prop:"activo",label:"Activo",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(o){return[1==o.row.activo?t("el-tag",{attrs:{type:"success"}},[t("i",{staticClass:"el-icon-success"})]):e._e(),e._v(" "),0==o.row.activo?t("el-tag",{attrs:{type:"danger"}},[t("i",{staticClass:"el-icon-error"})]):e._e()]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"Orden",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("el-tag",[e._v(" "+e._s(0==o.row.orden?"—":o.row.orden))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"nombre",label:"Nombre"}}),e._v(" "),t("el-table-column",{attrs:{prop:"simbolo",label:"Simbolo"}}),e._v(" "),t("el-table-column",{attrs:{label:"Color",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("el-tag",{style:{"background-color":e.row.color}})]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"Color del Texto",align:"center",width:"140"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("el-tag",{style:{"background-color":e.row.texto_color},attrs:{disabled:""}})]}}])}),e._v(" "),t("el-table-column",{attrs:{fixed:"right",label:"",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(o){return 0==o.row.es_estatico?[t("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.loadFieldsUpdate(o.row)}}},[e._v("Editar")]),e._v(" "),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.deleteRow(o.row.id)}}},[e._v("Eliminar")])]:void 0}}],null,!0)})],1)],1),e._v(" "),t("el-row",{attrs:{type:"flex",justify:"end"}},[t("pagination",{directives:[{name:"show",rawName:"v-show",value:e.procesos.length>0,expression:"procesos.length>0"}],attrs:{total:e.procesos.length,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(o){return e.$set(e.listQuery,"page",o)},"update:limit":function(o){return e.$set(e.listQuery,"limit",o)},pagination:e.getProcesos}})],1),e._v(" "),t("formDialog",{ref:"myForm"}),e._v(" "),t("ordenarDialog",{ref:"dialogoOrdenar"}),e._v(" "),t("porcentajeDialog",{ref:"dialogoPorcentaje"})],1)}),[],!1,null,null,null);o.default=m.exports},"ro/p":function(e,o,t){"use strict";var r=t("/osV");t.n(r).a}}]);