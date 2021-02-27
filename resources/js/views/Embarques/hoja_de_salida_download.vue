<template>

  <!-- Simbolo de cargando c/ mensaje-->
  <div  v-loading.fullscreen.lock="fullscreenLoading" class="main-article"  element-loading-text="Generando PDF">
  <!-- Header del articulo -->
  <!-- con la variable de articulo puesta
    <div class="article__heading">
      <div class="article__heading__title">
      HOJA DE SALIDA
      </div>
    </div>-->
  
  <!--El articulo COMPLETO -->
    <div ref="content" class="node-article-content">
      <div id="page-wrap">

        
        
        <div id="identity">
        
          <div id="address">
            <br>
            <p style="font-size: 14px;"> <b>Hoja de Salida/ Packing List</b> </p>
            <p>{{perfil_empresa.nombre_representante}} </p>
            <p>{{perfil_empresa.rfc}}</p>
            <p>{{perfil_empresa.email}}</p>
            <textarea>
            </textarea>
          </div>
          <div id="logo">
            <img id="image" :src="logoEmpresa" alt="logo">
          </div>

        </div>
        <div style="clear:both"></div>
        
        <div id="customer">

           <el-table
            :data="embarques"
            ref="tableList" 
            border
            fit
            style="width: 100%; word-wrap: break-word;">
                
              
                <el-table-column 
                prop="id"
                label="Emb #"
                align="center"/>

                <el-table-column 
                prop="fecha_salida"
                label="Fecha de Salida"
                align="center">
                   <template slot-scope="scope">
                            {{scope.row.fecha_salida | moment("YYYY-MMM-DD")}}
                    </template>
                </el-table-column>



                <el-table-column 
                prop="cliente.nombre_cliente"
                label="Cliente"/>

                <el-table-column 
                prop="cantidad_bultos"
                label="Cant. de Bultos"
                align="center"/>

                <el-table-column 
                prop="compania_transporte"
                label="Compañia de Transporte"/>

                <el-table-column 
                prop="nombre_chofer"
                label="Nombre del Chofer"/>
              
              
            </el-table>
        </div>
        <div id="ordenes">
          <div id="header">ORDENES</div>
          <el-row >
              <el-table
              :data="embarque.proyectos_productos"
              ref="tableList" 
              fit
              border
              style="width: 100%; word-wrap: break-word;">
                
                  <el-table-column
                  type="index"
                  align="center" 
                  width="80"/>

                  <el-table-column 
                  prop="numero_parte"
                  label="Número de Parte (Local)"
                  align="center"/>

                  <el-table-column 
                  prop="producto.numero_parte_cliente"
                  label="Número de Parte (Cliente)"
                  align="center"/>

                  <el-table-column 
                  prop="producto.item"
                  label="Item"
                  align="center"/>

                  <el-table-column 
                  prop="producto.work_order"
                  label="Work Order"
                  align="center"/>

                  <el-table-column 
                  prop="cantidad"
                  label="Cantidad"
                  align="center">
                      <template slot-scope="scope">
                        <textarea>{{scope.row.cantidad}}</textarea>
                      </template>
                  </el-table-column>
                  

              </el-table>
          </el-row>   
        </div>
        
        
        <div id="terms" style="float:left; margin-left:32px"> <h5></h5><textarea>Recibió ({{embarque.nombre_chofer}})</textarea></div>



        <div id="terms" style="float:right; margin-right:32px"> <h5></h5><textarea>Autorizó</textarea></div>
      
      </div>
    </div>
  </div>
</template>
<script>

import Resource from '@/api/resource';

const perfilEmpresaResource = new Resource('perfilEmpresa');
const embarqueResource = new Resource('embarques');
const logoEmpresa = require('@/assets/empresa/logo-dsi.jpeg').default;


export default {
  data() {
    return {
      logoEmpresa: logoEmpresa,
      article: '',
      
      fullscreenLoading: true,
      id: 0,
      perfil_empresa_id:0,
      query: {
        page: 1,
        limit: 15,
        keyword: '',
        role: '',
        id:'',
      },
      embarques:[],
      embarque:{
        cliente:{nombre_cliente:''}
      },
      perfil_empresa:[],
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.perfil_empresa_id = this.$route.params.perfil_empresa_id;
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    
    async fetchData() {
      this.getPerfilEmpresa();
      this.query.id = this.id;
      await embarqueResource.list(this.query).then(data => {
        this.embarques = data.data;
        this.embarque = data.data[0];
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$nextTick(() => {
            window.print();
          });
        }, 3000);
      });
    },

    async getPerfilEmpresa(){
      this.query.perfil_empresa_id = this.perfil_empresa_id;
      const { data, meta } = await perfilEmpresaResource.list(this.query);
      console.log("PERFIL EMPRESA");
      console.log(data);
      this.perfil_empresa = data[0];
    },

  },
};

</script>

<style rel="stylesheet/scss" lang="scss">
@mixin clearfix {
  &:before {
    display: table;
    content: '';
    clear: both;
  }

  &:after {
    display: table;
    content: '';
    clear: both;
  }
}
// CSS MIOS
#elTable {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}

.el-table .cell {word-break: break-word;}

.el-table thead{color: #000;}

#customer .el-table{font-size: 10px;}
#customer .el-table .cell{ padding:0px; line-height: 12px;}
//#customer .el-table th{padding: 2px;}
.el-table--border{
	border: 1px solid #dfe6ec;	
}
// CSS MIOS
.main-article {
  margin: 0 auto;
  display: block;
  width: 740px;
  background: #fff;
}

.article__heading {
  position: relative;
  padding: 0 0 20px;
  overflow: hidden;
}

.article__heading__title {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
}

.node-article-content {
  margin: 0 0 0;
  @include clearfix;
  font-size: 12px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 30px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;

  & > :last-child {
    margin-bottom: 0;
  }

  /*
	 CSS-Tricks Example
	 by Chris Coyier
	 http://css-tricks.com
*/

* { margin: 0; padding: 0; }
body { font: 14px/1.4 ; }
#page-wrap { width: 100%; margin: 0 auto; }

textarea { border: 0; overflow: hidden; resize: none; }
textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }
#ordenes textarea{text-align: center; vertical-align: middle;}
table { }
table td, table th { padding: 5px; }
#header { height: 30px; width: 100%; margin: 0 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 8px 0px; }
#address { width: 400px; height: 150px; float: right;line-height: 12px;text-align: right; font-size: 8px}
#address textarea{width: 50%; text-align: right;}
#customer { margin: 0 0 20px 0; overflow: hidden; }
// #logo { text-align: right; float: left; position: relative; margin-top: 0px; border: 1px solid #fff; max-width: 540px; max-height: 160px; overflow: hidden; }
// // #logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }
// #logoctr { display: none; }
// // #logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }
// #logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}
// #logohelp input { margin-bottom: 5px; }
// .edit #logohelp { display: block; }
// .edit #save-logo, .edit #cancel-logo { display: inline; }
// .edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }
// #customer-title { font-size: 20px; font-weight: bold; float: left; }

#meta { margin-top: 1px; width: 100%; }
// #meta td { text-align: right;  }
// #meta td.meta-head { text-align: left; background: #fff; }
// #meta td textarea { width: 100%; height: 20px; text-align: right; }
#image {height:150px;}

// #items { clear: both; width: 100%; margin: 30px 0 0 0; border: 1px solid black; }
// #items th { background: #eee; }
// #items textarea { width: 80px; height: 50px; }
// #items tr.item-row td { border: 0; vertical-align: top; }
// #items td.description { width: 300px; }
// #items td.item-name { width: 175px; }
// #items td.description textarea, #items td.item-name textarea { width: 100%; }
// #items td.total-line { border-right: 0; text-align: right; }
// #items td.total-value { border-left: 0; padding: 10px; }
// #items td.total-value textarea { height: 20px; background: none; }
// #items td.balance { background: #eee; }
// #items td.blank { border: 0; }

#terms { text-align: center; margin-top: 20px; width: 276px; padding-top: 100px; }
#terms h5 { text-transform: uppercase; font: 13px; letter-spacing: 10px; border-bottom: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }
#terms textarea { width: 100%; text-align: center;}

//textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }

// .delete-wpr { position: relative; }
// .delete { display: block; color: #000; text-decoration: none; position: absolute; background: #EEEEEE; font-weight: bold; padding: 0px 3px; border: 1px solid; top: -6px; left: -22px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;font-size: 12px; }
}



</style>
