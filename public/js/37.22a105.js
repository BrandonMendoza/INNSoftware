(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"+Awk":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("lwsE"),r=n.n(a),i=n("W8MJ"),o=n.n(i),l=n("rywy"),c=function(){function e(t){r()(this,e),this.uri=t}return o()(e,[{key:"list",value:function(e){return Object(l.a)({url:"/"+this.uri,method:"get",params:e})}},{key:"get",value:function(e){return Object(l.a)({url:"/"+this.uri+"/"+e,method:"get"})}},{key:"store",value:function(e){return Object(l.a)({url:"/"+this.uri,method:"post",data:e})}},{key:"update",value:function(e,t){return Object(l.a)({url:"/"+this.uri+"/"+e,method:"put",data:t})}},{key:"destroy",value:function(e){return Object(l.a)({url:"/"+this.uri+"/"+e,method:"delete"})}}]),e}()},"9zGX":function(e,t,n){"use strict";n.r(t);var a=n("o0o1"),r=n.n(a),i=n("yXPU"),o=n.n(i),l=n("+Awk"),c=(new l.a("perfilEmpresa"),new l.a("embarques")),s=n("IyBY").default,d={data:function(){return{logoEmpresa:s,article:"",fullscreenLoading:!0,id:0,query:{page:1,limit:15,keyword:"",role:"",id:""},embarques:[],embarque:{cliente:{nombre_cliente:""}},perfil_empresa:[]}},created:function(){this.id=this.$route.params.id,console.log("PERFIL EMPRESA"),console.log(JSON.parse(this.$route.params.perfil_empresa)),this.perfil_empresa=JSON.parse(this.$route.params.perfil_empresa)},mounted:function(){this.fetchData()},methods:{fetchData:function(){var e=this;return o()(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.query.id=e.id,t.next=3,c.list(e.query).then((function(t){console.log("DATA"),console.log(t),e.embarques=t.data,e.embarque=t.data[0]}));case 3:e.fullscreenLoading=!1,setTimeout((function(){window.print()}),1e3);case 5:case"end":return t.stop()}}),t)})))()}}},p=(n("pISR"),n("KHd+")),u=Object(p.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"main-article",attrs:{"element-loading-text":"Generando PDF"}},[n("div",{ref:"content",staticClass:"node-article-content"},[n("div",{attrs:{id:"page-wrap"}},[n("div",{attrs:{id:"identity"}},[n("div",{attrs:{id:"address"}},[n("br"),e._v(" "),e._m(0),e._v(" "),n("p",[e._v(e._s(e.perfil_empresa.nombre_representante)+" ")]),e._v(" "),n("p",[e._v(e._s(e.perfil_empresa.rfc))]),e._v(" "),n("p",[e._v(e._s(e.perfil_empresa.email))]),e._v(" "),n("textarea")]),e._v(" "),null!=e.perfil_empresa.logo?n("el-image",{attrs:{id:"logo",src:e.perfil_empresa.logo.storage_path+"/"+e.perfil_empresa.logo.nombre_sistema,fit:"scale-down"}},[n("div",{staticClass:"image-slot",attrs:{slot:"placeholder"},slot:"placeholder"},[e._v("\n                Cargando"),n("span",{staticClass:"dot"},[e._v("...")])])]):e._e()],1),e._v(" "),n("div",{staticStyle:{clear:"both"}}),e._v(" "),n("div",{attrs:{id:"customer"}},[n("el-table",{ref:"tableList",staticStyle:{width:"100%"},attrs:{data:e.embarques,border:"",fit:""}},[n("el-table-column",{attrs:{prop:"id",label:"Emb #",align:"center"}}),e._v(" "),n("af-table-column",{attrs:{prop:"fecha_salida",label:"Fecha de Salida",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(e._f("moment")(t.row.fecha_salida,"DD"))+" de "+e._s(e._f("moment")(t.row.fecha_salida,"MMMM"))+" del "+e._s(e._f("moment")(t.row.fecha_salida,"YYYY HH:MM"))+"\n                  ")]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"cantidad_bultos",label:"Cant. de Bultos",align:"center"}})],1),e._v(" "),n("el-table",{ref:"tableList",staticStyle:{width:"100%"},attrs:{data:e.embarques,border:"",fit:""}},[n("el-table-column",{attrs:{prop:"cliente.nombre_cliente",label:"Cliente",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"compania_transporte",label:"Compañia de Transporte",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"nombre_chofer",label:"Nombre del Chofer",align:"center"}})],1)],1),e._v(" "),n("div",{attrs:{id:"ordenes"}},[n("div",{attrs:{id:"header"}},[e._v("ORDENES")]),e._v(" "),n("el-row",[n("el-table",{ref:"tableList",staticStyle:{width:"100%"},attrs:{data:e.embarque.proyectos_productos,fit:"",border:""}},[n("el-table-column",{attrs:{prop:"numero_parte",label:"Orden",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"producto.numero_parte_cliente",label:"Producto",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"item",label:"Item",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"work_order",label:"Work Order",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"cantidad",label:"Cantidad",align:"center"}})],1)],1)],1),e._v(" "),n("div",{staticStyle:{"text-align":"center",float:"left","margin-left":"32px"},attrs:{id:"terms"}},[n("h5"),e._v(" "),n("textarea",[e._v("Recibió "+e._s(e.embarque.nombre_chofer))])]),e._v(" "),e._m(1)])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticStyle:{"font-size":"14px"}},[t("b",[this._v("Hoja de Salida/ Packing List")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticStyle:{float:"right","margin-right":"32px"},attrs:{id:"terms"}},[t("h5"),t("textarea",[this._v("Autorizó")])])}],!1,null,null,null);t.default=u.exports},CQit:function(e,t,n){(t=n("JPst")(!1)).push([e.i,"#elTable {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: relative;\n  vertical-align: middle;\n  padding-left: 0px;\n  padding-right: 0px;\n  width: 100%;\n}\n.el-table .cell {\n  padding-left: 0px;\n  word-break: break-word;\n  line-height: 18px;\n}\n.el-table th {\n  background-color: #3c4471;\n  color: #fff;\n}\n#customer .el-table {\n  font-size: 10px;\n}\n.main-article {\n  margin: 0 auto;\n  display: block;\n  width: 740px;\n  background: #fff;\n}\n.article__heading {\n  position: relative;\n  padding: 0 0 20px;\n  overflow: hidden;\n}\n.article__heading__title {\n  display: block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  font-size: 32px;\n  line-height: 48px;\n  font-weight: 600;\n  color: #333;\n  overflow: hidden;\n}\n.node-article-content {\n  margin: 0 0 0;\n  font-size: 12px;\n  color: #333;\n  line-height: 16px;\n  margin-bottom: 30px;\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  /*\r\n\t CSS-Tricks Example\r\n\t by Chris Coyier\r\n\t http://css-tricks.com\r\n*/\n}\n.node-article-content:before {\n  display: table;\n  content: '';\n  clear: both;\n}\n.node-article-content:after {\n  display: table;\n  content: '';\n  clear: both;\n}\n.node-article-content > :last-child {\n  margin-bottom: 0;\n}\n.node-article-content * {\n  margin: 0;\n  padding: 0;\n}\n.node-article-content body {\n  font: 14px/1.4;\n}\n.node-article-content #page-wrap {\n  width: 100%;\n  margin: 0 auto;\n}\n.node-article-content textarea {\n  border: 0;\n  overflow: hidden;\n  resize: none;\n}\n.node-article-content textarea:hover, .node-article-content textarea:focus, .node-article-content #items td.total-value textarea:hover, .node-article-content #items td.total-value textarea:focus, .node-article-content .delete:hover {\n  background-color: #EEFF88;\n}\n.node-article-content #ordenes textarea {\n  text-align: center;\n  vertical-align: middle;\n}\n.node-article-content table td, .node-article-content table th {\n  padding: 0px;\n}\n.node-article-content #header {\n  height: 30px;\n  width: 100%;\n  margin: 0 0;\n  background: #fff;\n  text-align: center;\n  color: #606266;\n  font: bold 15px Helvetica, Sans-Serif;\n  -webkit-text-decoration: uppercase;\n          text-decoration: uppercase;\n  letter-spacing: 20px;\n  padding: 8px 0px;\n}\n.node-article-content #address {\n  width: 400px;\n  height: 150px;\n  float: right;\n  line-height: 12px;\n  text-align: right;\n  font-size: 8px;\n}\n.node-article-content #address textarea {\n  width: 50%;\n  text-align: right;\n}\n.node-article-content #customer {\n  margin: 0 0 0px 0;\n  overflow: hidden;\n}\n.node-article-content #logo {\n  text-align: right;\n  float: left;\n  position: relative;\n  margin-top: 0px;\n  border: 1px solid #fff;\n  max-width: 540px;\n  max-height: 160px;\n  overflow: hidden;\n}\n.node-article-content #meta {\n  margin-top: 1px;\n  width: 100%;\n}\n.node-article-content #image {\n  height: 150px;\n}\n.node-article-content #terms {\n  text-align: center;\n  margin-top: 20px;\n  width: 276px;\n  padding-top: 100px;\n}\n.node-article-content #terms h5 {\n  text-transform: uppercase;\n  font: 13px;\n  letter-spacing: 10px;\n  border-bottom: 1px solid black;\n  padding: 0 0 8px 0;\n  margin: 0 0 8px 0;\n}\n.node-article-content #terms textarea {\n  width: 100%;\n  text-align: center;\n}\n",""]),e.exports=t},IyBY:function(e,t,n){"use strict";n.r(t),t.default="/images/logo-dsi.jpeg?a01e32d530b7989185e2a33d0d713222"},W8MJ:function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}e.exports=function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}},aNFm:function(e,t,n){var a=n("CQit");"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(a,r);a.locals&&(e.exports=a.locals)},lwsE:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},pISR:function(e,t,n){"use strict";var a=n("aNFm");n.n(a).a}}]);