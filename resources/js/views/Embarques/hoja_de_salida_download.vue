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
          <el-image
          id="logo"
          v-if="perfil_empresa.logo != null"
          :src="perfil_empresa.logo.storage_path+'/'+perfil_empresa.logo.nombre_sistema"
          fit="scale-down">

              <div slot="placeholder" class="image-slot">
                  Cargando<span class="dot">...</span>
              </div>
          </el-image>
        </div>
        <div style="clear:both"></div>
        
        
        <div id="customer">
        <el-table
            :data="embarques"
            ref="tableList" 
            border
            fit
            style="width: 100%; ">
                
              
                <el-table-column 
                prop="id"
                label="Emb #"
                align="center"/>

                <af-table-column
                prop="fecha_salida"
                label="Fecha de Salida"
                align="center">
                   <template slot-scope="scope">
                      {{scope.row.fecha_salida | moment("DD")}} de {{scope.row.fecha_salida | moment("MMMM")}} del {{scope.row.fecha_salida | moment("YYYY HH:MM") }}
                    </template>
                </af-table-column>

                <el-table-column 
                prop="cantidad_bultos"
                label="Cant. de Bultos"
                align="center"/>
              
              
            </el-table>

            <el-table
            :data="embarques"
            ref="tableList" 
            border
            fit
            style="width: 100%; ">

                <el-table-column 
                prop="cliente.nombre_cliente"
                label="Cliente"
                align="center"/>

                <el-table-column 
                prop="compania_transporte"
                label="Compañia de Transporte"
                align="center"/>

                <el-table-column 
                prop="nombre_chofer"
                label="Nombre del Chofer"
                align="center"/>
              
              
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
              style="width: 100%; ">

                  <el-table-column 
                  prop="numero_parte"
                  label="Orden"
                  align="center"/>

                  <el-table-column 
                  prop="cantidad"
                  label="Cantidad"
                  align="center"/>

                  <el-table-column 
                  prop="numero_parte_cliente"
                  label="Num de Parte"
                  align="center"/>

                  <el-table-column 
                  prop="producto.nombre_producto"
                  label="Producto"
                  align="center"/>

                  <el-table-column 
                  prop="item"
                  label="Item"
                  align="center"/>

                  <el-table-column 
                  prop="work_order"
                  label="Work Order"
                  align="center"/>

                  
                  

              </el-table>
          </el-row>   

          
        </div>
        
        
        <div id="terms" style="text-align:center;float:left; margin-left:32px"> <h5></h5>
          <textarea>Recibió {{embarque.nombre_chofer}}</textarea>
        </div>



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
    console.log("PERFIL EMPRESA");
    console.log(JSON.parse(this.$route.params.perfil_empresa));
    this.perfil_empresa = JSON.parse(this.$route.params.perfil_empresa);
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    
    async fetchData() {
      this.query.id = this.id;
      await embarqueResource.list(this.query).then(data => {
        console.log("DATA");
        console.log(data);
        this.embarques = data.data;
        this.embarque = data.data[0];
        
      });
      this.fullscreenLoading = false;
      setTimeout(() => {
          window.print();
      }, 1000);
    },

    // async getPerfilEmpresa(){
    //   this.query.perfil_empresa_id = this.perfil_empresa_id;
    //   const { data, meta } = await perfilEmpresaResource.list(this.query);
    //   console.log("PERFIL EMPRESA");
    //   console.log(data);
    //   this.perfil_empresa = data[0];
    // },

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
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
}
.el-table .cell{padding-left: 0px; word-break: break-word; line-height: 18px;}


.el-table th{background-color:#3c4471; color: #fff; }

#customer .el-table{font-size: 10px;}
//#customer .el-table th{padding: 2px;}
.el-table--border{
	//border: 1px solid #dfe6ec;	
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
  //letter-spacing: 0.5px;
  line-height: 16px;
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
table {  }
// #embarque > table, th, td {
//   border: 1px solid black;
//   border-collapse: collapse;
// }
table td, table th { padding: 0px; }
#header { height: 30px; width: 100%; margin: 0 0; background: #fff; text-align: center; color: #606266; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 8px 0px; }
#address { width: 400px; height: 150px; float: right;line-height: 12px;text-align: right; font-size: 8px}
#address textarea{width: 50%; text-align: right;}
#customer { margin: 0 0 0px 0; overflow: hidden; }
#logo { text-align: right; float: left; position: relative; margin-top: 0px; border: 1px solid #fff; max-width: 540px; max-height: 160px; overflow: hidden; }
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

