(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{0:function(e,t){},1:function(e,t){},2:function(e,t){},"4ZE1":function(e,t,a){"use strict";a.r(t);var r=a("UZKy"),n=a("wd/R"),o=a.n(n);function l(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return i(e,t)}(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,s=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return l=e.done,e},e:function(e){s=!0,o=e},f:function(){try{l||null==a.return||a.return()}finally{if(s)throw o}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var s={name:"UploadExcel",components:{UploadExcelComponent:r.a},data:function(){return{validation:!0,agregarProductos:!0,loading:!0,list:[],productos:[],proyectos:[],ordenAbierta:[],clientes:[],pinturas:[],tableData:[],tableHeader:[]}},methods:{getData:function(){var e=this;e.loading=!0,axios.get("uploadExcel/getData").then((function(t){console.table("RESPONSE:"),console.log(t.data),e.productos=t.data.productos,e.proyectos=t.data.proyectos,e.ordenesAbiertas=t.data.ordenesAbiertas,e.clientes=t.data.clientes,e.pinturas=t.data.pinturas,e.loading=!1})).catch((function(t){e.$message.error("Hubo un error."),e.loading=!1,console.log(t)}))},insert:function(){var e=this;e.loading=!0,axios.put("/uploadExcel/insertOrdenesAbiertas",{list:e.list}).then((function(t){console.log("Response:"),console.log(t),e.tableData=[],e.getData(),e.list=[],e.loading=!1,e.$message.success("Guardado correctamente.")})).catch((function(t){e.$message.error("Hubo un error."),e.loading=!1,console.log(t)}))},ExcelDateToJSDate:function(e){var t=Math.floor(e-25569),a=new Date(1e3*(86400*t)),r=e-Math.floor(e)+1e-7,n=Math.floor(86400*r),o=n%60;n-=o;var l=Math.floor(n/3600),i=Math.floor(n/60)%60;return new Date(a.getFullYear(),a.getMonth(),a.getDate(),l,i,o)},validateData:function(e){var t,a=l(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(void 0===r.plan_corte)return this.$confirm("plan_corte no puede estar vacio. (Producto:"+r.numero_parte_producto+")","Aviso",{cancelButtonText:"Cerrar",type:"warning",center:!0}),!1;if(void 0===r.numero_parte_producto)return this.$confirm("numero_parte_producto no puede estar vacio.","Aviso",{cancelButtonText:"Cerrar",type:"warning",center:!0}),!1;if(void 0===r.fecha_entrega)return this.$confirm("fecha de entrega no puede estar vacio.","Aviso",{cancelButtonText:"Cerrar",type:"warning",center:!0}),!1;if(r.fecha_entrega=this.ExcelDateToJSDate(r.fecha_entrega).toString(),r.fecha_entrega=o()(r.fecha_entrega).format("YYYY-MM-DD"),void 0===r.cantidad)return this.$confirm("cantidad no puede estar vacio.","Aviso",{cancelButtonText:"Cerrar",type:"warning",center:!0}),!1;var n,i=!1,s=l(this.clientes);try{for(s.s();!(n=s.n()).done;){var c=n.value;if(r.cliente.toUpperCase()==c.nombre_cliente.toUpperCase()){r.cliente_id=c.id,i=!0;break}}}catch(e){s.e(e)}finally{s.f()}if(0==i)return this.$confirm("El cliente: "+r.cliente.toUpperCase()+" no esta registrado en el sistema.","Aviso",{cancelButtonText:"Cerrar",type:"warning",center:!0}),!1;var u,d=!1,p=l(this.pinturas);try{for(p.s();!(u=p.n()).done;){var f=u.value;if(r.pintura.toUpperCase()==f.simbolo.toUpperCase()){r.pintura_id=f.id,d=!0;break}}}catch(e){p.e(e)}finally{p.f()}if(0==d)return this.$confirm('La pintura: "'+r.pintura.toUpperCase()+'" no esta registrado en el sistema.',"Aviso",{cancelButtonText:"Cerrar",type:"warning",center:!0}),!1}}catch(e){a.e(e)}finally{a.f()}return this.agregarProductos=!1,!0},beforeUpload:function(e){return e.size/1024/1024<1||(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSuccess:function(e){var t=e.results;e.header;console.log("DATOS:"),console.log(t),this.validateData(t)&&(this.list=t)}},mounted:function(){this.getData()}},c=(a("tQCx"),a("KHd+")),u=Object(c.a)(s,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("upload-excel-component",{attrs:{"on-success":e.handleSuccess,"before-upload":e.beforeUpload}}),e._v(" "),a("br"),e._v(" "),a("div",{staticClass:"filter-container"},[a("a",{staticClass:"el-button el-button--primary el-button--mini",attrs:{type:"button",title:"descargar",href:"/uploadExcel/downloadPlantilla"}},[a("i",{staticClass:"el-icon-download"}),e._v("  Descargar Plantilla\n    ")])]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","word-wrap":"break-word"},attrs:{data:e.list,border:"","tooltip-effect":"light",fit:""}},[a("el-table-column",{attrs:{label:"Producto"}},[a("el-table-column",{attrs:{prop:"numero_parte_producto",label:"Num. de Parte (Producto)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pintura",label:"Pintura"}}),e._v(" "),a("el-table-column",{attrs:{prop:"peso_kg",label:"Peso (kg)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cliente",label:"Cliente"}})],1),e._v(" "),a("el-table-column",{attrs:{label:"Proyecto"}},[a("el-table-column",{attrs:{prop:"plan_corte",label:"Plan de Corte"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fecha_entrega",label:"Fecha de Entrega"}})],1),e._v(" "),a("el-table-column",{attrs:{label:"Orden Abierta"}},[a("el-table-column",{attrs:{prop:"cantidad",label:"Cantidad"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orden_trabajo",label:"Orden de Trabajo"}}),e._v(" "),a("el-table-column",{attrs:{prop:"item",label:"Item"}})],1)],1),e._v(" "),a("br"),e._v(" "),a("el-row",{attrs:{align:"right"}},[a("el-button",{staticClass:"float-left",attrs:{disabled:e.agregarProductos,type:"success"},on:{click:function(t){return e.insert()}}},[e._v("Agregar Productos")])],1)],1)}),[],!1,null,null,null);t.default=u.exports},Hs10:function(e,t,a){(t=a("JPst")(!1)).push([e.i,"\n.excel-upload-input[data-v-672c73af]{\n  display: none;\n  z-index: -9999;\n}\n.drop[data-v-672c73af]{\n  border: 2px dashed #bbb;\n  width: 600px;\n  height: 160px;\n  line-height: 160px;\n  margin: 0 auto;\n  font-size: 24px;\n  border-radius: 5px;\n  text-align: center;\n  color: #bbb;\n  position: relative;\n}\n",""]),e.exports=t},UZKy:function(e,t,a){"use strict";var r=a("EUZL"),n=a.n(r),o={props:{beforeUpload:Function,onSuccess:Function},data:function(){return{loading:!1,excelData:{header:null,results:null}}},methods:{readerData:function(e){var t=this;return this.loading=!0,new Promise((function(a,r){var o=new FileReader;o.onload=function(e){var r=e.target.result,o=n.a.read(r,{type:"array"}),l=o.SheetNames[0],i=o.Sheets[l],s=t.getHeaderRow(i),c=n.a.utils.sheet_to_json(i);t.generateData({header:s,results:c}),t.loading=!1,a()},o.readAsArrayBuffer(e)}))},generateData:function(e){var t=e.header,a=e.results;this.excelData.header=t,this.excelData.results=a,this.onSuccess&&this.onSuccess(this.excelData)},handleDrop:function(e){if(e.stopPropagation(),e.preventDefault(),!this.loading){var t=e.dataTransfer.files;if(1===t.length){var a=t[0];if(!this.isExcel(a))return this.$message.error("Only supports upload .xlsx, .xls, .csv suffix files"),!1;this.upload(a),e.stopPropagation(),e.preventDefault()}else this.$message.error("Only support uploading one file!")}},handleDragover:function(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"},handleUpload:function(){this.$refs["excel-upload-input"].click()},handleClick:function(e){var t=e.target.files[0];t&&this.upload(t)},upload:function(e){(this.$refs["excel-upload-input"].value=null,this.beforeUpload)?this.beforeUpload(e)&&this.readerData(e):this.readerData(e)},getHeaderRow:function(e){var t,a=[],r=n.a.utils.decode_range(e["!ref"]),o=r.s.r;for(t=r.s.c;t<=r.e.c;++t){var l=e[n.a.utils.encode_cell({c:t,r:o})],i="UNKNOWN "+t;l&&l.t&&(i=n.a.utils.format_cell(l)),a.push(i)}return a},isExcel:function(e){return/\.(xlsx|xls|csv)$/.test(e.name)}}},l=(a("YMzs"),a("KHd+")),i=Object(l.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("input",{ref:"excel-upload-input",staticClass:"excel-upload-input",attrs:{type:"file",accept:".xlsx, .xls"},on:{change:e.handleClick}}),e._v(" "),a("div",{staticClass:"drop",on:{drop:e.handleDrop,dragover:e.handleDragover,dragenter:e.handleDragover}},[e._v("\n    Arrastra el documento aqui o presiona \n    "),a("el-button",{staticStyle:{"margin-left":"16px"},attrs:{loading:e.loading,size:"mini",type:"primary"},on:{click:e.handleUpload}},[e._v("\n      Buscar\n    ")])],1)])}),[],!1,null,"672c73af",null);t.a=i.exports},YMzs:function(e,t,a){"use strict";var r=a("qWky");a.n(r).a},oFQc:function(e,t,a){(t=a("JPst")(!1)).push([e.i,"\n.el-table .cell {\n    word-break: break-word;\n}\n",""]),e.exports=t},qWky:function(e,t,a){var r=a("Hs10");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(r,n);r.locals&&(e.exports=r.locals)},t8mY:function(e,t,a){var r=a("oFQc");"string"==typeof r&&(r=[[e.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};a("aET+")(r,n);r.locals&&(e.exports=r.locals)},tQCx:function(e,t,a){"use strict";var r=a("t8mY");a.n(r).a}}]);