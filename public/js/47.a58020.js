(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{"+Awk":function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var a=t("lwsE"),r=t.n(a),i=t("W8MJ"),o=t.n(i),l=t("rywy"),c=function(){function e(n){r()(this,e),this.uri=n}return o()(e,[{key:"list",value:function(e){return Object(l.a)({url:"/"+this.uri,method:"get",params:e})}},{key:"get",value:function(e){return Object(l.a)({url:"/"+this.uri+"/"+e,method:"get"})}},{key:"store",value:function(e){return Object(l.a)({url:"/"+this.uri,method:"post",data:e})}},{key:"update",value:function(e,n){return Object(l.a)({url:"/"+this.uri+"/"+e,method:"put",data:n})}},{key:"destroy",value:function(e){return Object(l.a)({url:"/"+this.uri+"/"+e,method:"delete"})}}]),e}()},"5gPe":function(e,n,t){"use strict";t.r(n);var a=t("o0o1"),r=t.n(a),i=t("yXPU"),o=t.n(i),l=t("+Awk"),c=(new l.a("perfilEmpresa"),new l.a("embarques"),{data:function(){return{article:"",fullscreenLoading:!0,id:0,perfil_empresa_id:0,query:{page:1,limit:15,keyword:"",role:"",id:""},fechaRenuncia:"",currentBajaEmpleado:[],empleado:[],perfil_empresa:[]}},computed:{},created:function(){this.fechaRenuncia=JSON.parse(this.$route.params.fechaRenuncia),console.log("FECHA RENUNCIA:"),console.log(this.fechaRenuncia),this.empleado=JSON.parse(this.$route.params.currentEmpleado),console.log("CONTRATO:"),console.log(this.empleado),this.currentBajaEmpleado=JSON.parse(this.$route.params.currentBajaEmpleado),console.log("BAJA EMPLEADO:"),console.log(this.currentBajaEmpleado)},mounted:function(){this.fetchData()},methods:{formatPrice:function(e){return(e/1).toFixed(2).replace(",",".").toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},fetchData:function(){var e=this;return o()(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.fullscreenLoading=!0,setTimeout((function(){e.$nextTick((function(){window.print()}))}),3e3),e.fullscreenLoading=!1;case 3:case"end":return n.stop()}}),n)})))()}}}),s=(t("zta1"),t("KHd+")),u=Object(s.a)(c,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"main-article",attrs:{"element-loading-text":"Generando PDF"}},[t("div",{ref:"content",staticClass:"node-article-content"},[t("div",{attrs:{id:"page-wrap"}},[t("div",{staticStyle:{clear:"both"}}),e._v(" "),e._m(0),e._v(" "),t("br"),e._v(" "),t("br"),e._v(" "),e._m(1),e._v(" "),t("br"),e._v(" "),t("br"),e._v(" "),t("dd",[e._v("\nPor medio de la presente y bajo protesta de decir verdad, le comunico a la \nempresa BRANDON MENDOZA TOVAR, Y/O QUIEN RESULTE RESPONSABLE \nDE LA FUENTE LABORAL DE TRABAJO, que yo el "),t("b",[e._v(e._s(e.empleado.apellidos.toUpperCase()+" "+e.empleado.nombre.toUpperCase()))]),e._v("\n, por así convenir a mis intereses particulares, en fecha: "),t("b",[e._v(e._s(e._f("moment")(e.fechaRenuncia,"DD"))+" del mes de  "+e._s(e._f("moment")(e.fechaRenuncia,"MMMM"))+" del "+e._s(e._f("moment")(e.fechaRenuncia,"YYYY")))]),e._v(", \nhe resuelto dar por terminada voluntariamente la relación laboral y/o contrato \nindividual de trabajo que me unía con usted(es) en términos del artículo 53 fracción \nI de la Ley Federal del Trabajo.\n")]),e._v(" "),t("br"),e._v(" "),t("dd",[e._v("\nAsí pues también manifiesto expresamente que durante el tiempo que presté \nmis servicios con el C. BRANDON MENDOZA TOVAR, Y/O QUIEN RESULTE \nRESPONSABLE DE LA FUENTE LABORAL DE TRABAJO, nunca sufrí riesgo de \ntrabajo alguno, de igual modo a la fecha no se me adeuda horas extras o prestación \nalguna contemplada por la Ley Federal Del Trabajo, y por último y en virtud de esta \nrenuncia voluntaria, no me reservo acción o derecho que ejercitar de ninguna \nnaturaleza en el futuro, ni en contra suya ni de su negocio, ni de su representante \nlegal, ni de ninguna otra persona que hubiere sido mi patrón, durante la relación \nlaboral.\n")]),e._v(" "),t("br"),e._v(" "),t("dd",[e._v("\nRatificada que fue la presente en todas sus partes la firmo y pongo mi huella \ndactilar, por voluntad propia.\n")]),e._v(" "),t("br"),e._v(" "),e._m(2),e._v(" "),e._m(3),e._v(" "),t("div",{staticStyle:{float:"left","margin-left":"32px"},attrs:{id:"terms"}},[t("h5",[e._v("C. "+e._s(e.empleado.apellidos.toUpperCase()+" "+e.empleado.nombre.toUpperCase()))])]),e._v(" "),e._m(4)])]),e._v(" "),t("br"),e._v(" "),t("br"),e._v(" "),t("br"),e._v(" "),t("div",{staticStyle:{"font-family":"'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif","text-align":"center"},attrs:{id:"huella"}},[e._v(" \n      Mexicali, Baja California, a "+e._s(e._f("moment")(e.fechaRenuncia,"DD"))+" de "+e._s(e._f("moment")(e.fechaRenuncia,"MMMM"))+" del "+e._s(e._f("moment")(e.fechaRenuncia,"YYYY"))+"\n    ")])])}),[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"titulo"},[n("u",[n("b",[this._v("RENUNCIA VOLUNTARIA:")])])])},function(){var e=this.$createElement,n=this._self._c||e;return n("b",[this._v("\nPARTE PATRONAL: "),n("br"),this._v("\nBRANDON MENDOZA TOVAR "),n("br"),this._v("\nY/O QUIEN RESULTE RESPONSABLE DE LA FUENTE "),n("br"),this._v("\nLABORAL DEL TRABAJO. \n")])},function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticStyle:{float:"left","margin-left":"32px"},attrs:{id:"terms"}},[n("b",[this._v("FIRMA")])])},function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticStyle:{float:"right","margin-right":"32px"},attrs:{id:"terms"}},[n("b",[this._v("HUELLA")])])},function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticStyle:{float:"right","margin-right":"120px","margin-top":"20px"},attrs:{id:"huella"}},[n("div",{staticStyle:{width:"100px",height:"100px",border:"1px solid black"}})])}],!1,null,null,null);n.default=u.exports},W8MJ:function(e,n){function t(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}e.exports=function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}},lwsE:function(e,n){e.exports=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},oqMN:function(e,n,t){var a=t("r5Q2");"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t("aET+")(a,r);a.locals&&(e.exports=a.locals)},r5Q2:function(e,n,t){(n=t("JPst")(!1)).push([e.i,".main-article {\n  margin: 0 auto;\n  display: block;\n  width: 740px;\n  background: #fff;\n}\n.node-article-content {\n  margin: 0 0 0;\n  font-size: 12px;\n  color: #333;\n  letter-spacing: 0.5px;\n  line-height: 18px;\n  margin-bottom: 30px;\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  /*\r\n\t CSS-Tricks Example\r\n\t by Chris Coyier\r\n\t http://css-tricks.com\r\n*/\n}\n.node-article-content:before {\n  display: table;\n  content: '';\n  clear: both;\n}\n.node-article-content:after {\n  display: table;\n  content: '';\n  clear: both;\n}\n.node-article-content > :last-child {\n  margin-bottom: 0;\n}\n.node-article-content * {\n  margin: 0;\n  padding: 0;\n}\n.node-article-content body {\n  font: 14px/1.4;\n}\n.node-article-content dd {\n  text-indent: 25px;\n}\n.node-article-content textarea {\n  border: 0;\n  overflow: hidden;\n  resize: none;\n}\n.node-article-content textarea:hover, .node-article-content textarea:focus, .node-article-content #items td.total-value textarea:hover, .node-article-content #items td.total-value textarea:focus, .node-article-content .delete:hover {\n  background-color: #EEFF88;\n}\n.node-article-content #customer {\n  text-align: justify;\n}\n.node-article-content .titulo {\n  text-align: center;\n}\n.node-article-content #huella {\n  text-align: center;\n  margin-top: 0px;\n}\n.node-article-content #terms {\n  text-align: center;\n  margin-top: 20px;\n  width: 276px;\n  padding-top: 100px;\n}\n.node-article-content #terms h5 {\n  text-transform: uppercase;\n  font: 13px;\n  border-top: 1px solid black;\n  padding: 0 0 8px 0;\n  margin: 0 0 8px 0;\n}\n.node-article-content #terms textarea {\n  width: 100%;\n  text-align: center;\n}\n",""]),e.exports=n},zta1:function(e,n,t){"use strict";var a=t("oqMN");t.n(a).a}}]);