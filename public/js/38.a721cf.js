(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"/yk1":function(e,t,o){"use strict";o.r(t);var r=o("o0o1"),a=o.n(r),i=o("yXPU"),n=o.n(i),s=function(e,t,o){return t?(t=Number(t),isNaN(t)?o(new Error("Error de formato")):void(0==t?o(new Error("Debe de ser mayor a 0")):o())):o(new Error("Ingresa peso"))},l={data:function(){return{tiposMateriales:[],aceros:[],form:{id:0,catalogo:1,numero_parte:"",tipo_material_id:"",tipo_material_nombre:"",acero_id:"",acero_nombre:"",peso_kg:"",medida_1:"",medida_2:"",medida_3:"",medida_4:""},rules:{numero_parte:[{required:!0,message:"Ingresa un número de parte",trigger:"blur"}],tipo_material_id:[{required:!0,message:"Ingresa un simbolo",trigger:"change"}],peso_kg:[{validator:s,trigger:"blur"}],medida_1:[{required:!0,message:"Ingresa medida 1",trigger:"blur"}],medida_2:[{required:!0,message:"Ingresa medida 2",trigger:"blur"}]},dialogoAgregar:!1,dialogRef:"myForm"}},methods:{open:function(){this.getTiposMateriales(),this.getAceros(),this.dialogoAgregar=!0},close:function(){this.dialogoAgregar=!1},insert:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;var o=t.$loading({target:".el-dialog"}),r=t;axios.put("/materiales/insert",r.form).then((function(e){r.$parent.getList(),r.clearFields(),r.close(),o.close(),r.$message.success("Guardado correctamente.")})).catch((function(e){r.$message.success("Hubo un error."),console.log(e)}))}))},getTiposMateriales:function(){var e=this;axios.get("/tiposMateriales").then((function(t){e.tiposMateriales=t.data})).catch((function(t){e.$message.error("Hubo un error."),console.log(t)}))},getAceros:function(){var e=this;axios.get("/acerosMateriales").then((function(t){e.aceros=t.data})).catch((function(t){e.$message.error("Hubo un error."),console.log(t)}))},changeTipoMaterial:function(){var e=this;this.tiposMateriales.forEach((function(t){t.nombre==e.form.tipo_material_nombre&&(e.form.tipo_material_id=t.id)}))},changeAcero:function(){var e=this;this.aceros.forEach((function(t){t.nombre==e.form.acero_nombre&&(e.form.acero_id=t.id)}))},clearFields:function(){this.form.id=0,this.catalogo=1,this.form.numero_parte="",this.form.tipo_material_id="",this.form.tipo_material_nombre="",this.form.acero_id="",this.form.acero_nombre="",this.form.peso_kg="",this.form.medida_1="",this.form.medida_2="",this.form.medida_3="",this.form.medida_4=""},handleClose:function(e){var t=this;this.$confirm("Está seguro que deseas salir?").then((function(e){t.clearFields(),t.close()})).catch((function(e){}))}}},m=(o("mDn6"),o("KHd+")),c={data:function(){return{loading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},materiales:[]}},components:{formDialog:Object(m.a)(l,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-position":"top","label-width":"100px"}},[o("el-dialog",{ref:e.dialogRef,attrs:{width:"20%","before-close":e.handleClose,visible:e.dialogoAgregar},on:{"update:visible":function(t){e.dialogoAgregar=t}}},[0==e.form.id?o("span",{attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"el-icon-plus"}),e._v(" Agregar Material")]):e._e(),e._v(" "),0!=e.form.id?o("span",{attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"el-icon-edit"}),e._v(" Editar Material ")]):e._e(),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.id,expression:"form.id"}],attrs:{hidden:""},domProps:{value:e.form.id},on:{input:function(t){t.target.composing||e.$set(e.form,"id",t.target.value)}}}),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.catalogo,expression:"form.catalogo"}],attrs:{hidden:""},domProps:{value:e.form.catalogo},on:{input:function(t){t.target.composing||e.$set(e.form,"catalogo",t.target.value)}}}),e._v(" "),o("el-form-item",{attrs:{label:"Número de Parte",prop:"numero_parte"}},[o("el-input",{model:{value:e.form.numero_parte,callback:function(t){e.$set(e.form,"numero_parte",t)},expression:"form.numero_parte"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Tipo de Material",prop:"tipo_material_id"}},[o("el-select",{attrs:{"value-key":"nombre",filterable:""},on:{change:function(t){return e.changeTipoMaterial()}},model:{value:e.form.tipo_material_nombre,callback:function(t){e.$set(e.form,"tipo_material_nombre",t)},expression:"form.tipo_material_nombre"}},e._l(e.tiposMateriales,(function(e){return o("el-option",{key:e.id,attrs:{label:e.nombre,value:e.nombre}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"Acero",prop:"acero_id"}},[o("el-select",{attrs:{"value-key":"nombre",filterable:""},on:{change:function(t){return e.changeAcero()}},model:{value:e.form.acero_nombre,callback:function(t){e.$set(e.form,"acero_nombre",t)},expression:"form.acero_nombre"}},e._l(e.aceros,(function(e){return o("el-option",{key:e.id,attrs:{label:e.nombre,value:e.nombre}})})),1)],1),e._v(" "),o("el-row",{attrs:{gutter:20,align:"bottom"}},[o("el-col",{attrs:{span:10}},[o("el-form-item",{attrs:{label:"Peso(kg)",prop:"peso_kg"}},[o("el-input",{model:{value:e.form.peso_kg,callback:function(t){e.$set(e.form,"peso_kg",t)},expression:"form.peso_kg"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:14}})],1),e._v(" "),o("el-row",[o("label",{staticClass:"el-form-item__label"},[e._v("Medidas")])]),e._v(" "),o("el-row",{attrs:{gutter:20,align:"bottom"}},[o("el-col",{attrs:{span:6}},[o("el-form-item",{attrs:{prop:"medida_1"}},[o("el-input",{model:{value:e.form.medida_1,callback:function(t){e.$set(e.form,"medida_1",t)},expression:"form.medida_1"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{attrs:{prop:"medida_2"}},[o("el-input",{model:{value:e.form.medida_2,callback:function(t){e.$set(e.form,"medida_2",t)},expression:"form.medida_2"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{attrs:{prop:"medida_3"}},[o("el-input",{model:{value:e.form.medida_3,callback:function(t){e.$set(e.form,"medida_3",t)},expression:"form.medida_3"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-form-item",{attrs:{prop:"medida_4"}},[o("el-input",{staticStyle:{width:"80px"},attrs:{precision:2,controls:!1,min:0},model:{value:e.form.medida_4,callback:function(t){e.$set(e.form,"medida_4",t)},expression:"form.medida_4"}})],1)],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticClass:"float-left",on:{click:function(t){e.dialogoAgregar=!1,e.clearFields()}}},[e._v("Cancelar")]),e._v(" "),0==e.form.id?o("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(t){return e.insert("form")}}},[e._v("Agregar")]):e._e(),e._v(" "),0!=e.form.id?o("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(t){return e.insert("form")}}},[e._v("Guardar")]):e._e()],1)],1)],1)}),[],!1,null,"200b163f",null).exports,Pagination:o("k9pt").a},methods:{getList:function(){var e=this;return n()(a.a.mark((function t(){var o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o=e,"/materiales",axios.get("/materiales").then((function(e){o.materiales=e.data,o.loading=!1})).catch((function(e){o.$message.error("Hubo un error."),console.log(e)}));case 3:case"end":return t.stop()}}),t)})))()},loadFieldsUpdate:function(e){this.$refs.myForm.form.id=e.id,this.$refs.myForm.form.catalogo=e.catalogo,this.$refs.myForm.form.numero_parte=e.numero_parte,this.$refs.myForm.form.tipo_material_id=e.tipo_material_id,this.$refs.myForm.form.tipo_material_nombre=e.tipo_material.nombre,this.$refs.myForm.form.acero_id=e.acero_id,this.$refs.myForm.form.acero_nombre=e.acero.nombre,this.$refs.myForm.form.peso_kg=e.peso_kg,this.$refs.myForm.form.medida_1=e.medida_1,this.$refs.myForm.form.medida_2=e.medida_2,this.$refs.myForm.form.medida_3=e.medida_3,this.$refs.myForm.form.medida_4=e.medida_4,this.$refs.myForm.open()},deleteRow:function(e){var t=this;t.loading=!0,console.log("DELETE FUNCTION"),axios.post("/materiales/delete",{id:e}).then((function(e){t.getList(),t.$message.success("Eliminado correctamente."),t.loading=!1})).catch((function(e){t.$message.error("Hubo un error."),console.log(e),t.loading=!1}))}},mounted:function(){this.getList()}},d=Object(m.a)(c,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-row",{attrs:{type:"flex"}}),e._v(" "),o("div",{staticClass:"filter-container"},[o("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.$refs.myForm.clearFields(),e.$refs.myForm.open()}}},[e._v("Agregar")])],1),e._v(" "),o("el-row",[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.materiales,border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{type:"index",align:"center",width:"80"}}),e._v(" "),o("el-table-column",{attrs:{prop:"numero_parte",label:"Número de Parte"}}),e._v(" "),o("el-table-column",{attrs:{prop:"medidas",label:"Medidas"}}),e._v(" "),o("el-table-column",{attrs:{prop:"tipo_material.nombre",label:"Tipo de Material"}}),e._v(" "),o("el-table-column",{attrs:{prop:"acero.nombre",label:"Acero"}}),e._v(" "),o("el-table-column",{attrs:{prop:"peso_kg",label:"Peso(kg)"}}),e._v(" "),o("el-table-column",{attrs:{fixed:"right",label:"",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){return e.loadFieldsUpdate(t.row)}}},[e._v("Editar")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return e.deleteRow(t.row.id)}}},[e._v("Eliminar")])]}}])})],1)],1),e._v(" "),o("el-row",{attrs:{type:"flex",justify:"end"}},[o("pagination",{directives:[{name:"show",rawName:"v-show",value:e.materiales.length>0,expression:"materiales.length>0"}],attrs:{total:e.materiales.length,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}})],1),e._v(" "),o("formDialog",{ref:"myForm"})],1)}),[],!1,null,null,null);t.default=d.exports},"4Aq5":function(e,t,o){var r=o("EyLs");"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};o("aET+")(r,a);r.locals&&(e.exports=r.locals)},"8Re4":function(e,t,o){(t=o("JPst")(!1)).push([e.i,"\n.color[data-v-200b163f] {\n    width: 100%;\n}\n",""]),e.exports=t},EyLs:function(e,t,o){(t=o("JPst")(!1)).push([e.i,"\n.pagination-container[data-v-68c28e9d] {\n  background: #fff;\n  padding: 32px 16px;\n}\n.pagination-container.hidden[data-v-68c28e9d] {\n  display: none;\n}\n",""]),e.exports=t},KhFe:function(e,t,o){var r=o("8Re4");"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};o("aET+")(r,a);r.locals&&(e.exports=r.locals)},bHOZ:function(e,t,o){"use strict";var r=o("4Aq5");o.n(r).a},k9pt:function(e,t,o){"use strict";Math.easeInOutQuad=function(e,t,o,r){return(e/=r/2)<1?o/2*e*e+t:-o/2*(--e*(e-2)-1)+t};var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function a(e,t,o){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,i=e-a,n=0;t=void 0===t?500:t;!function e(){n+=20;var s,l=Math.easeInOutQuad(n,a,i,t);s=l,document.documentElement.scrollTop=s,document.body.parentNode.scrollTop=s,document.body.scrollTop=s,n<t?r(e):o&&"function"==typeof o&&o()}()}var i={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,15,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&a(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},n=(o("bHOZ"),o("KHd+")),s=Object(n.a)(i,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[o("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)}),[],!1,null,"68c28e9d",null);t.a=s.exports},mDn6:function(e,t,o){"use strict";var r=o("KhFe");o.n(r).a}}]);