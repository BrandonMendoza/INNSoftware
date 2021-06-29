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

<br>
<br>
<b>
<div id="huella" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; text-align:right;"> 
  Mexicali, Baja California, a {{ fechaRenuncia | moment("DD") }} de {{ fechaRenuncia | moment("MMMM") }} del {{ fechaRenuncia | moment("YYYY") }}
</div>
</b>
<br>
<br>

<dd>
Por medio de la presente manifiesto que por así convenir a mis intereses renuncio
voluntariamente y de manera irrevocable al puesto de que venía desempeñando en esta
empresa; así mismo hago constar que no se me adeuda ninguna cantidad por concepto de
salarios, horas extras, bonos, comisiones, premios, séptimos días, vacaciones, prima
vacacional, accidentes o enfermedades profesionales, prima de antigüedad, reparto de
utilidades, aguinaldo, ni por ningún otro concepto nacido de la Ley o de mi contrato de trabajo,
motivo por el cual la libero de toda responsabilidad, otorgándole el más amplio finiquito y
manifiesto que no me reservo ninguna acción o derecho en contra de MENDOZA TOVAR
BRANDON o quien resulte responsable o propietario de la fuente de trabajo .
Agradezco el apoyo y atención que siempre me brindo a esta empresa.
</dd>
<br>


<b>
  Fecha Inicial: {{ currentBajaEmpleado.fecha_inicial_labores | moment("DD") }} del mes de  {{ currentBajaEmpleado.fecha_inicial_labores | moment("MMMM") }} del {{ currentBajaEmpleado.fecha_inicial_labores | moment("YYYY") }}<br>
  Sueldo $ {{ formatPrice(currentBajaEmpleado.salario) }} semanal. <br>
  {{ currentBajaEmpleado.dias_laborados }} días laborados <br>
</b>
<br>
<table style="border: 0px; width:100%;">
  <tr>
    <th style="text-align:left;"> Concepto </th>
    <th style="text-align:left;"> Salario diario </th>
    <th style="text-align:left;"> Porcentaje </th>
    <th style="text-align:left;"> Correspondiente </th>
  </tr>
  <tr>
    <td> Vacaciones </td>
    <td> $ {{ formatPrice(currentBajaEmpleado.salario_diario) }} </td>
    <td> {{ formatDecimales(currentBajaEmpleado.vacaciones) }} </td>
    <td> $ {{ formatPrice(currentBajaEmpleado.vacaciones*currentBajaEmpleado.salario_diario) }}   </td>
  </tr>
  <tr>
    <td> Prima Vacacional </td>
    <td> $ {{ formatPrice(currentBajaEmpleado.salario_diario) }} </td>
    <td> {{ formatDecimales(currentBajaEmpleado.prima_vacacional) }} </td>
    <td> $ {{ formatPrice(currentBajaEmpleado.prima_vacacional*currentBajaEmpleado.salario_diario) }} </td>
  </tr>
  <tr>
    <td> Aguinaldo </td>
    <td> $ {{ formatPrice(currentBajaEmpleado.salario_diario) }} </td>
    <td> {{ formatDecimales(currentBajaEmpleado.aguinaldo) }} </td>
    <td> $ {{ formatPrice(currentBajaEmpleado.aguinaldo*currentBajaEmpleado.salario_diario) }} </td>
  </tr>

  <tr>
    <td> </td>
    <td></td>
    <td> <b> Total </b> </td>
    <td> <b> $ {{ formatPrice(total_finiquito) }} </b> </td>
  </tr>
</table>


<br>




<div style="width:40%;margin: 0 auto;">
  <div id="terms" style=""> 
      <b>FIRMA</b>
    </div>

    <div id="terms" style=""> 
      <h5>C. {{ empleado.apellidos.toUpperCase()+" "+empleado.nombre.toUpperCase() }}</h5>
    </div>
</div>
        

        
      
      </div>
    </div>
    <br>
    <br>
    <br>
    
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
      total_finiquito(){
        var vacaciones = this.currentBajaEmpleado.vacaciones*this.currentBajaEmpleado.salario_diario;
        var prima_vacacional = this.currentBajaEmpleado.prima_vacacional*this.currentBajaEmpleado.salario_diario;
        var aguinaldo = this.currentBajaEmpleado.aguinaldo*this.currentBajaEmpleado.salario_diario;

        return (vacaciones + prima_vacacional + aguinaldo);
      },
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
    formatDecimales(value) {
      let val = (value/1).toFixed(6).replace(',', '.')
      return val.toString();
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
#terms { text-align: center; margin-top: 10px; width: 276px; padding-top: 50px; }
#terms h5 { text-transform: uppercase; font: 13px; border-top: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }
#terms textarea { width: 100%; text-align: center;}

//textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }

// .delete-wpr { position: relative; }
// .delete { display: block; color: #000; text-decoration: none; position: absolute; background: #EEEEEE; font-weight: bold; padding: 0px 3px; border: 1px solid; top: -6px; left: -22px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;font-size: 12px; }
}



</style>
