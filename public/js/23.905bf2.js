(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"4Aq5":function(e,t,o){var r=o("EyLs");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o("aET+")(r,n);r.locals&&(e.exports=r.locals)},EyLs:function(e,t,o){(t=o("JPst")(!1)).push([e.i,"\n.pagination-container[data-v-68c28e9d] {\n  background: #fff;\n  padding: 32px 16px;\n}\n.pagination-container.hidden[data-v-68c28e9d] {\n  display: none;\n}\n",""]),e.exports=t},FowT:function(e,t,o){"use strict";var r=o("Tlbl");o.n(r).a},J96V:function(e,t,o){"use strict";var r=o("aQHn");o.n(r).a},OyD8:function(e,t,o){"use strict";o.r(t);var r=o("o0o1"),n=o.n(r),a=o("yXPU"),i=o.n(a),l=(o("fJGn"),{data:function(){return{clientes:[],productosSelect:[],activeName:"first",form:{id:0,cliente_id:"",numero_parte_cliente:"",numero_parte:"",orden_compra:"",plan_corte:"",fecha_entrega:"",productos:[]},productoAgregar:{producto:"",proyecto_producto:{cantidad:1,heat_number:"",work_order:"",item:""}},rules:{numero_parte_cliente:[{required:!0,message:"Ingresa un número de parte",trigger:"blur"}],cliente_id:[{required:!0,message:"Selecciona un cliente",trigger:"change"}],fecha_entrega:[{required:!0,message:"Selecciona una fecha de entrega",trigger:"blur"}]},dialogoAgregar:!1,dialogRef:"myForm",dialogoProductos:!1,loadingCliente:!1}},methods:{open:function(){this.getClientes(),this.getProductos(),this.dialogoAgregar=!0},close:function(){this.dialogoAgregar=!1},insert:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;var o=t.$loading({target:".el-dialog"}),r=t;axios.put("/proyectos/insert",r.form).then((function(e){r.$parent.getList(),r.clearFields(),r.close(),o.close(),r.$message.success("Guardado correctamente.")})).catch((function(e){r.$message.error("Hubo un error."),console.log(e)}))}))},clearFields:function(){this.form.id=0,this.form.cliente_id="",this.form.numero_parte_cliente="",this.form.orden_compra="",this.form.plan_corte="",this.form.fecha_entrega="",this.form.productos=[]},handleClose:function(e){var t=this;this.$confirm("Está seguro que deseas salir?").then((function(e){t.clearFields(),t.close()})).catch((function(e){}))},getProductos:function(){var e=this;axios.get("/productos").then((function(t){e.productosSelect=t.data,e.productosSelect.forEach((function(t){e.form.productos.forEach((function(e){t.id==e.id?t.disabled=!0:t.disabled=!1}))}))})).catch((function(t){e.$message.error("Hubo un error."),console.log(t)}))},getClientes:function(){var e=this;this.loadingClientes=!0,axios.get("/clientes").then((function(t){e.clientes=t.data,e.loadingClientes=!1})).catch((function(t){e.$message.error("Hubo un error."),console.log(t),e.loadingClientes=!1}))},handleClick:function(e,t){},agregarProducto:function(){return""==this.productoAgregar.producto.id?(this.$message.error("Selecciona un producto"),!1):""==this.productoAgregar.proyecto_producto.cantidad||0==this.productoAgregar.proyecto_producto.cantidad?(this.$message.error("Ingresa una cantidad valida"),!1):(this.productoAgregar.producto.proyecto_producto=JSON.parse(JSON.stringify(this.productoAgregar.proyecto_producto)),this.form.productos.push(this.productoAgregar.producto),this.productoAgregar.producto="",this.productoAgregar.proyecto_producto.cantidad=1,this.productoAgregar.proyecto_producto.heat_number="",this.productoAgregar.proyecto_producto.work_order="",this.productoAgregar.proyecto_producto.item="",void(this.dialogoProductos=!1))},actualizarSelectProductos:function(){var e=this;this.productosSelect.forEach((function(e){e.disabled=!1})),this.productosSelect.forEach((function(t){e.form.productos.forEach((function(e){t.id==e.id&&(t.disabled=!0)}))}))},deleteRowProductos:function(e){var t=this.form.productos.map((function(e){return e.id})).indexOf(e.id);this.form.productos.splice(t,1)}}}),s=(o("J96V"),o("KHd+")),c=Object(s.a)(l,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-position":"top","label-width":"150px"}},[o("el-dialog",{ref:e.dialogRef,attrs:{width:"60%","before-close":e.handleClose,visible:e.dialogoAgregar},on:{"update:visible":function(t){e.dialogoAgregar=t}}},[0==e.form.id?o("span",{attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"el-icon-plus"}),e._v(" Agregar Proyecto")]):e._e(),e._v(" "),0!=e.form.id?o("span",{attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"el-icon-edit"}),e._v(" Editar Proyecto ")]):e._e(),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.id,expression:"form.id"}],attrs:{hidden:""},domProps:{value:e.form.id},on:{input:function(t){t.target.composing||e.$set(e.form,"id",t.target.value)}}}),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.numero_parte,expression:"form.numero_parte"}],attrs:{hidden:""},domProps:{value:e.form.numero_parte},on:{input:function(t){t.target.composing||e.$set(e.form,"numero_parte",t.target.value)}}}),e._v(" "),o("span",{staticStyle:{"margin-right":"5px"}},[o("b",[e._v("Núm. de Parte (Local): ")]),e._v(" "+e._s(e.form.numero_parte))]),e._v(" "),o("br"),e._v(" "),o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:6}},[o("el-form-item",{attrs:{label:"Cliente",prop:"cliente_id"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{"value-key":"form.cliente_id",filterable:"",loading:e.loadingCliente},model:{value:e.form.cliente_id,callback:function(t){e.$set(e.form,"cliente_id",t)},expression:"form.cliente_id"}},e._l(e.clientes,(function(e){return o("el-option",{key:e.id,attrs:{label:e.nombre_cliente,value:e.id}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"Número de Parte (Cliente)",prop:"numero_parte_cliente"}},[o("el-input",{model:{value:e.form.numero_parte_cliente,callback:function(t){e.$set(e.form,"numero_parte_cliente",t)},expression:"form.numero_parte_cliente"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Orden de Compra (Cliente)",prop:"orden_compra"}},[o("el-input",{model:{value:e.form.orden_compra,callback:function(t){e.$set(e.form,"orden_compra",t)},expression:"form.orden_compra"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Plan de Corte",prop:"plan_corte"}},[o("el-input",{model:{value:e.form.plan_corte,callback:function(t){e.$set(e.form,"plan_corte",t)},expression:"form.plan_corte"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Fecha de Entrega",prop:"fecha_entrega"}},[o("el-date-picker",{attrs:{type:"date"},model:{value:e.form.fecha_entrega,callback:function(t){e.$set(e.form,"fecha_entrega",t)},expression:"form.fecha_entrega"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:18}},[o("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[o("el-tab-pane",{attrs:{label:"Productos",name:"first"}},[o("div",{staticClass:"filter-container"},[o("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.dialogoProductos=!0,e.actualizarSelectProductos()}}},[e._v("Agregar")])],1),e._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form.productos,border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{type:"index",align:"center",width:"80"}}),e._v(" "),o("el-table-column",{attrs:{prop:"numero_parte_cliente",label:"Producto","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{prop:"proyecto_producto.cantidad",label:"Cantidad",align:"center",width:"85"}}),e._v(" "),o("el-table-column",{attrs:{prop:"proyecto_producto.item",label:"Item",align:"center",width:"85"}}),e._v(" "),o("el-table-column",{attrs:{prop:"proyecto_producto.work_order",label:"Orden de Trabajo",align:"center",width:"85"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(o){return e.deleteRowProductos(t.row)}}})]}}])})],1)],1)],1)],1)],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticClass:"float-left",on:{click:function(t){e.clearFields(),e.dialogoAgregar=!1}}},[e._v("Cancelar")]),e._v(" "),0==e.form.id?o("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(t){return e.insert("form")}}},[e._v("Agregar")]):e._e(),e._v(" "),0!=e.form.id?o("el-button",{attrs:{type:"success",icon:"el-icon-check"},on:{click:function(t){return e.insert("form")}}},[e._v("Guardar")]):e._e()],1)],1),e._v(" "),o("el-dialog",{attrs:{title:"Agregar Material a Producto",visible:e.dialogoProductos,width:"25%"},on:{"update:visible":function(t){e.dialogoProductos=t}}},[o("el-form-item",{attrs:{label:"Producto"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{"value-key":"id",filterable:""},model:{value:e.productoAgregar.producto,callback:function(t){e.$set(e.productoAgregar,"producto",t)},expression:"productoAgregar.producto"}},e._l(e.productosSelect,(function(e){return o("el-option",{key:e.id,attrs:{label:e.numero_parte_cliente,value:e,disabled:e.disabled}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"Cantidad"}},[o("el-input-number",{attrs:{size:"mini",min:1},model:{value:e.productoAgregar.proyecto_producto.cantidad,callback:function(t){e.$set(e.productoAgregar.proyecto_producto,"cantidad",t)},expression:"productoAgregar.proyecto_producto.cantidad"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Item"}},[o("el-input",{model:{value:e.productoAgregar.proyecto_producto.item,callback:function(t){e.$set(e.productoAgregar.proyecto_producto,"item",t)},expression:"productoAgregar.proyecto_producto.item"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Orden de Trabajo"}},[o("el-input",{model:{value:e.productoAgregar.proyecto_producto.work_order,callback:function(t){e.$set(e.productoAgregar.proyecto_producto,"work_order",t)},expression:"productoAgregar.proyecto_producto.work_order"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"Heat Number",hidden:""}},[o("el-input",{model:{value:e.productoAgregar.proyecto_producto.heat_number,callback:function(t){e.$set(e.productoAgregar.proyecto_producto,"heat_number",t)},expression:"productoAgregar.proyecto_producto.heat_number"}})],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogoProductos=!1}}},[e._v("Cancelar")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.agregarProducto}},[e._v("Confirmar")])],1)],1)],1)}),[],!1,null,"2ed8da12",null).exports,u={props:{csrf:{type:String},photourl:{type:String}},data:function(){return{imageUrl:"",fileList:[],form:{id:0,numero_parte:"",numero_parte_cliente:"",documentos:[]},dialogoAgregar:!1,dialogRef:"documentosDialog",dialogoDocumentos:!1,loadingImage:!1,imageFile:null}},methods:{open:function(){this.dialogoAgregar=!0},close:function(){this.dialogoAgregar=!1},clearFields:function(){this.form.id=0,this.form.documentos=[]},handleClose:function(e){var t=this;this.$confirm("Está seguro que deseas salir?").then((function(e){t.dialogoDocumentos=!1})).catch((function(e){}))},deleteDocumento:function(e){var t=this;t.loading=!0;var o=this.$loading({target:"#dialogoListDocumento > .el-dialog"});axios.post("/proyectos/documentos/delete",{proyecto_id:t.form.id,documento_id:e.id}).then((function(r){t.form.documentos.map((function(e){return e.id})).indexOf(e.id);t.form.documentos=r.data.documentos,t.$message.success("Eliminado correctamente."),o.close()})).catch((function(e){t.$message.error("Hubo un error."),console.log(e)}))},submitUpload:function(){var e=this;if("undefined"==e.fileList[0]||null==e.fileList[0])return e.notificarError("Selecciona un archivo para subir"),!1;var t=this.$loading({target:"#dialogoAgregarDocumento > .el-dialog"}),o=new FormData;o.append("file",e.fileList[0].raw),o.append("proyecto_id",e.form.id),axios.post("/proyectos/documentos/store",o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(o){e.$message.success("Guardado correctamente."),e.form.documentos=o.data.documentos,e.fileList=[],t.close(),e.dialogoDocumentos=!1})).catch((function(o){e.$message.error("Hubo un error."),console.log(o),t.close(),e.dialogoDocumentos=!1}))},handleProgress:function(e,t,o){t.raw.status="uploading"},handleSuccess:function(e,t,o){t.raw.status="success"},handleUploadChange:function(e,t){this.fileList=t.slice(-1)}}},d={data:function(){return{listUrl:"/proyectos",deleteUrl:"/proyectos/delete",loading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},list:[]}},components:{formDialog:c,documentosDialog:Object(s.a)(u,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"form",attrs:{model:e.form,"label-position":"top","label-width":"150px"}},[o("el-dialog",{ref:e.dialogRef,attrs:{width:"40%",id:"dialogoListDocumento",visible:e.dialogoAgregar},on:{"update:visible":function(t){e.dialogoAgregar=t}}},[o("span",{attrs:{slot:"title"},slot:"title"},[o("i",{staticClass:"el-icon-edit"}),e._v(" Documentos de Proyecto ")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.id,expression:"form.id"}],attrs:{hidden:""},domProps:{value:e.form.id},on:{input:function(t){t.target.composing||e.$set(e.form,"id",t.target.value)}}}),e._v(" "),o("span",{staticStyle:{"margin-right":"5px"}},[o("b",[e._v("Núm. de Parte (Local): ")]),e._v(" "+e._s(e.form.numero_parte))]),e._v(" "),o("span",{staticStyle:{"margin-right":"5px"}},[o("b",[e._v("Núm. de Parte (Cliente): ")]),e._v(" "+e._s(e.form.numero_parte_cliente))]),e._v(" "),o("br"),e._v(" "),o("br"),e._v(" "),o("div",{staticClass:"filter-container"},[o("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.dialogoDocumentos=!0}}},[e._v("Agregar")])],1),e._v(" "),o("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form.documentos,border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{type:"index",align:"center",width:"80"}}),e._v(" "),o("el-table-column",{attrs:{prop:"nombre_real",label:"Documento","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{prop:"created_at",label:"Fecha de carga",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                        "+e._s(e._f("moment")(t.row.created_at,"YYYY-MMM-DD"))+"\n                    ")]}}])}),e._v(" "),o("el-table-column",{attrs:{align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("a",{staticClass:"el-button el-button--primary el-button--mini",attrs:{type:"button",title:"descargar",href:"/proyectos/downloadDocumento/"+t.row.id}},[o("i",{staticClass:"el-icon-download"})]),e._v(" "),o("el-button",{attrs:{type:"danger",title:"eliminar",size:"mini",icon:"el-icon-delete"},on:{click:function(o){return e.deleteDocumento(t.row)}}})]}}])})],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticClass:"float-left",on:{click:function(t){e.clearFields(),e.dialogoAgregar=!1}}},[e._v("Cerrar")])],1)],1),e._v(" "),o("el-dialog",{attrs:{id:"dialogoAgregarDocumento",title:"Agregar Documento a Proyecto",visible:e.dialogoDocumentos,"before-close":e.handleClose,width:"23%"},on:{"update:visible":function(t){e.dialogoDocumentos=t}}},[o("div",{staticClass:"filter-container"},[o("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"","file-list":e.fileList,"auto-upload":!1,"on-change":e.handleUploadChange,"on-progress":e.handleProgress,"on-success":e.handleSuccess,drag:""}},[o("i",{staticClass:"el-icon-upload"}),e._v(" "),o("div",{staticClass:"el-upload__text"},[e._v("Arrastra un archivo aqui o "),o("em",[e._v("click para subir")])])])],1),e._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{staticClass:"float-left",on:{click:function(t){e.dialogoDocumentos=!1,e.fileList=[]}}},[e._v("Cancelar")]),e._v(" "),o("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"success"},on:{click:e.submitUpload}},[e._v("Guardar")])],1)])],1)}),[],!1,null,null,null).exports,Pagination:o("k9pt").a},methods:{getList:function(){var e=this;return i()(n.a.mark((function t(){var o;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o=e,axios.get(o.listUrl).then((function(e){o.list=e.data,o.loading=!1})).catch((function(e){o.$message.error("Hubo un error."),console.log(e)}));case 2:case"end":return t.stop()}}),t)})))()},loadFieldsUpdate:function(e){this.$refs.myForm.form.id=e.id,this.$refs.myForm.form.cliente_id=e.cliente_id,this.$refs.myForm.form.numero_parte_cliente=e.numero_parte_cliente,this.$refs.myForm.form.numero_parte=e.numero_parte,this.$refs.myForm.form.orden_compra=e.orden_compra,this.$refs.myForm.form.plan_corte=e.plan_corte,this.$refs.myForm.form.fecha_entrega=e.fecha_entrega,this.$refs.myForm.form.productos=JSON.parse(JSON.stringify(e.productos)),this.$refs.myForm.open()},loadDocumentos:function(e){this.$refs.documentosDialog.form.id=e.id,this.$refs.documentosDialog.form.numero_parte=e.numero_parte,this.$refs.documentosDialog.form.numero_parte_cliente=e.numero_parte_cliente,this.$refs.documentosDialog.form.documentos=JSON.parse(JSON.stringify(e.documentos)),this.$refs.documentosDialog.open()},deleteRow:function(e){var t=this;t.loading=!0,axios.post(t.deleteUrl,{id:e}).then((function(e){t.getList(),t.$message.success("Eliminado correctamente."),t.loading=!1})).catch((function(e){t.$message.error("Hubo un error."),console.log(e),t.loading=!1}))}},mounted:function(){this.getList()}},p=(o("FowT"),Object(s.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-row",{attrs:{type:"flex"}}),e._v(" "),o("div",{staticClass:"filter-container"},[o("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(t){e.$refs.myForm.clearFields(),e.$refs.myForm.open()}}},[e._v("Agregar")])],1),e._v(" "),o("el-row",[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"","tooltip-effect":"light",fit:""}},[o("el-table-column",{attrs:{type:"index",align:"center",fixed:""}}),e._v(" "),o("el-table-column",{attrs:{prop:"numero_parte",label:"Núm. de Parte (Local)",width:"110"}}),e._v(" "),o("el-table-column",{attrs:{prop:"numero_parte_cliente",label:"Núm. de Parte (Cliente)"}}),e._v(" "),o("el-table-column",{attrs:{prop:"cliente.nombre_cliente",label:"Cliente","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{prop:"orden_compra",label:"Orden de Compra","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{prop:"plan_corte",label:"Plan de Corte","show-overflow-tooltip":""}}),e._v(" "),o("el-table-column",{attrs:{label:"Progreso","show-overflow-tooltip":"",width:"260"},scopedSlots:e._u([{key:"default",fn:function(e){return[o("el-progress",{attrs:{"text-inside":!0,"stroke-width":26,percentage:parseInt(e.row.progreso)}})]}}])}),e._v(" "),o("el-table-column",{attrs:{label:"Fecha de Entrega","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",[e._v("\n                        "+e._s(e._f("moment")(t.row.fecha_entrega,"YYYY-MMM-DD"))+"\n                    ")])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"totalHrsLabor",label:"Hrs Labor","show-overflow-tooltip":"",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{prop:"productos.length",label:"Productos","show-overflow-tooltip":"",align:"center"}}),e._v(" "),o("el-table-column",{attrs:{fixed:"right",label:"",align:"center",width:"270"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){return e.loadFieldsUpdate(t.row)}}},[e._v("Editar")]),e._v(" "),o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){return e.loadDocumentos(t.row)}}},[e._v("Docs")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return e.deleteRow(t.row.id)}}},[e._v("Eliminar")])]}}])})],1)],1),e._v(" "),o("el-row",{attrs:{type:"flex",justify:"end"}},[o("pagination",{directives:[{name:"show",rawName:"v-show",value:e.list.length>0,expression:"list.length>0"}],attrs:{total:e.list.length,page:e.list.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.list,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}})],1),e._v(" "),o("formDialog",{ref:"myForm"}),e._v(" "),o("documentosDialog",{ref:"documentosDialog"})],1)}),[],!1,null,null,null));t.default=p.exports},Tlbl:function(e,t,o){var r=o("qr1n");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o("aET+")(r,n);r.locals&&(e.exports=r.locals)},Y6d9:function(e,t,o){(t=o("JPst")(!1)).push([e.i,"\n.color[data-v-2ed8da12] {\n    width: 100%;\n}\n",""]),e.exports=t},aQHn:function(e,t,o){var r=o("Y6d9");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o("aET+")(r,n);r.locals&&(e.exports=r.locals)},bHOZ:function(e,t,o){"use strict";var r=o("4Aq5");o.n(r).a},fJGn:function(e,t,o){"use strict";o.d(t,"a",(function(){return a})),o.d(t,"b",(function(){return l})),o.d(t,"c",(function(){return c}));var r={props:{value:{type:Boolean,default:!1}},computed:{comment_disabled:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},n=o("KHd+"),a=Object(n.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[e._v("\n    "+e._s(e.comment_disabled?"Comment closed":"Comment opened")+"\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),o("el-dropdown-menu",{staticClass:"no-padding",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",[o("el-radio-group",{staticStyle:{padding:"10px"},model:{value:e.comment_disabled,callback:function(t){e.comment_disabled=t},expression:"comment_disabled"}},[o("el-radio",{attrs:{label:!0}},[e._v("\n          Close comment\n        ")]),e._v(" "),o("el-radio",{attrs:{label:!1}},[e._v("\n          Open comment\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null).exports,i={props:{value:{required:!0,default:function(){return[]},type:Array}},data:function(){return{platformsOptions:[{key:"a-platform",name:"a-platform"},{key:"b-platform",name:"b-platform"},{key:"c-platform",name:"c-platform"}]}},computed:{platforms:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},l=Object(n.a)(i,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dropdown",{attrs:{"hide-on-click":!1,"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[e._v("\n    Platform ("+e._s(e.platforms.length)+")\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),o("el-dropdown-menu",{staticClass:"no-border",attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-checkbox-group",{staticStyle:{padding:"5px 15px"},model:{value:e.platforms,callback:function(t){e.platforms=t},expression:"platforms"}},e._l(e.platformsOptions,(function(t){return o("el-checkbox",{key:t.key,attrs:{label:t.key}},[e._v("\n        "+e._s(t.name)+"\n      ")])})),1)],1)],1)}),[],!1,null,null,null).exports,s={props:{value:{type:String,default:""}},computed:{source_uri:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},c=Object(n.a)(s,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[o("el-button",{attrs:{plain:""}},[e._v("\n    External URL\n    "),o("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),o("el-dropdown-menu",{staticClass:"no-padding no-border",staticStyle:{width:"400px"},attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-form-item",{staticStyle:{"margin-bottom":"0px"},attrs:{"label-width":"0px",prop:"source_uri"}},[o("el-input",{attrs:{placeholder:"Enter the content"},model:{value:e.source_uri,callback:function(t){e.source_uri=t},expression:"source_uri"}},[o("template",{slot:"prepend"},[e._v("\n          Fill in the URL\n        ")])],2)],1)],1)],1)}),[],!1,null,null,null).exports},k9pt:function(e,t,o){"use strict";Math.easeInOutQuad=function(e,t,o,r){return(e/=r/2)<1?o/2*e*e+t:-o/2*(--e*(e-2)-1)+t};var r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function n(e,t,o){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,a=e-n,i=0;t=void 0===t?500:t;!function e(){i+=20;var l,s=Math.easeInOutQuad(i,n,a,t);l=s,document.documentElement.scrollTop=l,document.body.parentNode.scrollTop=l,document.body.scrollTop=l,i<t?r(e):o&&"function"==typeof o&&o()}()}var a={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,15,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&n(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},i=(o("bHOZ"),o("KHd+")),l=Object(i.a)(a,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[o("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)}),[],!1,null,"68c28e9d",null);t.a=l.exports},qr1n:function(e,t,o){(t=o("JPst")(!1)).push([e.i,"\n.el-table .cell {\n    word-break: break-word;\n}\n",""]),e.exports=t}}]);