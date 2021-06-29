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

        
        
        
<div style="clear:both"></div>
<div class="titulo"><u><b>RENUNCIA VOLUNTARIA:</b></u></div>
<br>
<br>
<b>
PARTE PATRONAL: <br>
BRANDON MENDOZA TOVAR <br>
Y/O QUIEN RESULTE RESPONSABLE DE LA FUENTE <br>
LABORAL DEL TRABAJO. 
</b>
<br>
<br>

<dd>
Por medio de la presente y bajo protesta de decir verdad, le comunico a la 
empresa BRANDON MENDOZA TOVAR, Y/O QUIEN RESULTE RESPONSABLE 
DE LA FUENTE LABORAL DE TRABAJO, que yo el <b>{{empleado.apellidos.toUpperCase()+" "+empleado.nombre.toUpperCase()}}</b>
, por así convenir a mis intereses particulares, en fecha: <b>{{ fechaRenuncia | moment("DD") }} del mes de  {{ fechaRenuncia | moment("MMMM") }} del {{ fechaRenuncia | moment("YYYY") }}</b>, 
he resuelto dar por terminada voluntariamente la relación laboral y/o contrato 
individual de trabajo que me unía con usted(es) en términos del artículo 53 fracción 
I de la Ley Federal del Trabajo.
</dd>
<br>

<dd>
Así pues también manifiesto expresamente que durante el tiempo que presté 
mis servicios con el C. BRANDON MENDOZA TOVAR, Y/O QUIEN RESULTE 
RESPONSABLE DE LA FUENTE LABORAL DE TRABAJO, nunca sufrí riesgo de 
trabajo alguno, de igual modo a la fecha no se me adeuda horas extras o prestación 
alguna contemplada por la Ley Federal Del Trabajo, y por último y en virtud de esta 
renuncia voluntaria, no me reservo acción o derecho que ejercitar de ninguna 
naturaleza en el futuro, ni en contra suya ni de su negocio, ni de su representante 
legal, ni de ninguna otra persona que hubiere sido mi patrón, durante la relación 
laboral.
</dd>
<br>

<dd>
Ratificada que fue la presente en todas sus partes la firmo y pongo mi huella 
dactilar, por voluntad propia.
</dd>
<br>

        <div id="terms" style="float:left; margin-left:32px"> 
          <b>FIRMA</b>
        </div>

        <div id="terms" style="float:right; margin-right:32px"> 
          <b>HUELLA</b>
        </div>
        
        
        <div id="terms" style="float:left; margin-left:32px"> 
          <h5>C. {{ empleado.apellidos.toUpperCase()+" "+empleado.nombre.toUpperCase() }}</h5>
        </div>

        <div id="huella" style="float:right;margin-right:120px;margin-top:20px"> 
          <div style="width:100px;height:100px; border: 1px solid black;"> 
          
          </div>
        </div>

        
      
      </div>
    </div>
    <br>
    <br>
    <br>
    <div id="huella" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; text-align:center;"> 
      Mexicali, Baja California, a {{ fechaRenuncia | moment("DD") }} de {{ fechaRenuncia | moment("MMMM") }} del {{ fechaRenuncia | moment("YYYY") }}
    </div>
  </div>
</template>

<script>

import Resource from '@/api/resource';

const perfilEmpresaResource = new Resource('perfilEmpresa');
const embarqueResource = new Resource('embarques');



export default {
  data() {
    return {
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
      fechaRenuncia:'',
      currentBajaEmpleado:[],
      empleado:[],
      perfil_empresa:[],
    }
  },
  computed:{ /* Barra de Acciones */
      // duracionContrato() {
      //   if(this.contrato.duracion == -1){
      //       return "Tiempo indefinido";
      //   }
        
      //   switch(this.contrato.duracion){
      //     case 1:
      //       return "(1) Un mes";

      //     case 2:
      //       return "(2) Dos meses";

      //     case 3:
      //       return "(3) Tres meses";
      //   }
      // },
    },
  created() {
    //console.log("PARAMS");
    //console.log(JSON.parse(this.$route.params.currentContrato));

    this.fechaRenuncia = JSON.parse(this.$route.params.fechaRenuncia);
    console.log("FECHA RENUNCIA:");
    console.log(this.fechaRenuncia);

    this.empleado = JSON.parse(this.$route.params.currentEmpleado);
    console.log("CONTRATO:");
    console.log(this.empleado);
    
    this.currentBajaEmpleado = JSON.parse(this.$route.params.currentBajaEmpleado);
    console.log("BAJA EMPLEADO:");
    console.log(this.currentBajaEmpleado);
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    async fetchData() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.$nextTick(() => {
          window.print();
        });
      }, 3000);
      this.fullscreenLoading = false;
    },
    /* NUMERO A LETRAS*/ 
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
.main-article {
  margin: 0 auto;
  display: block;
  width: 740px;
  background: #fff;
}


.node-article-content {
  margin: 0 0 0;
  @include clearfix;
  font-size: 12px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 18px;
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
// #page-wrap { width: 100%; margin: 0 auto; }
dd{ text-indent: 25px; }
 textarea { border: 0; overflow: hidden; resize: none; }
 textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }

 #customer {text-align:justify}
 .titulo{text-align:center}
// #ordenes textarea{text-align: center; vertical-align: middle;}
// table { }
// table td, table th { padding: 5px; }
// #header { height: 30px; width: 100%; margin: 0 0; background: #fff; text-align: center; color: black; font: bold 15px Helvetica, Sans-Serif; text-decoration: uppercase; letter-spacing: 20px; padding: 8px 0px; }
// #address { width: 400px; height: 150px; float: right;line-height: 12px;text-align: right; font-size: 8px}
// #address textarea{width: 50%; text-align: right;}
// #customer { margin: 0 0 20px 0; overflow: hidden; }
// // #logo { text-align: right; float: left; position: relative; margin-top: 0px; border: 1px solid #fff; max-width: 540px; max-height: 160px; overflow: hidden; }
// // // #logo:hover, #logo.edit { border: 1px solid #000; margin-top: 0px; max-height: 125px; }
// // #logoctr { display: none; }
// // // #logo:hover #logoctr, #logo.edit #logoctr { display: block; text-align: right; line-height: 25px; background: #eee; padding: 0 5px; }
// // #logohelp { text-align: left; display: none; font-style: italic; padding: 10px 5px;}
// // #logohelp input { margin-bottom: 5px; }
// // .edit #logohelp { display: block; }
// // .edit #save-logo, .edit #cancel-logo { display: inline; }
// // .edit #image, #save-logo, #cancel-logo, .edit #change-logo, .edit #delete-logo { display: none; }
// // #customer-title { font-size: 20px; font-weight: bold; float: left; }

// #meta { margin-top: 1px; width: 100%; }
// #meta td { text-align: right;  }
// #meta td.meta-head { text-align: left; background: #fff; }
// #meta td textarea { width: 100%; height: 20px; text-align: right; }
//#image {height:150px;}

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
#huella { text-align: center; margin-top: 0px;}
#terms { text-align: center; margin-top: 20px; width: 276px; padding-top: 100px; }
#terms h5 { text-transform: uppercase; font: 13px; border-top: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }
#terms textarea { width: 100%; text-align: center;}

//textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }

// .delete-wpr { position: relative; }
// .delete { display: block; color: #000; text-decoration: none; position: absolute; background: #EEEEEE; font-weight: bold; padding: 0px 3px; border: 1px solid; top: -6px; left: -22px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;font-size: 12px; }
}



</style>
