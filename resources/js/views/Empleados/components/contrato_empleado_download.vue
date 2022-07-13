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
        
<div id="customer">
  <b><u>  CONTRATO INDIVIDUAL DE TRABAJO POR TIEMPO DETERMINADO</u></b> pactado por <b>{{ duracionContrato.toUpperCase() }}</b>, que celebran por una parte EL <b> C. BRANDON MENDOZA TOVAR</b>, designado en lo 
          sucesivo como <u><b>“LA EMPRESA”</b></u>, por otra parte, y por su propio derecho, el <b>C. {{empleado.apellidos.toUpperCase()+" "+empleado.nombre.toUpperCase()}} </b>, a quien en lo sucesivo se le designará para términos del presente 
          contrato como el <u><b>“TRABAJADOR”</b></u>, quedando así pactado por ambas partes y existiendo 
          conformidad con las declaraciones y cláusulas siguientes:
    <br>
    <br>
  <div class="titulo"><u><b>D E C L A R A C I O N E S:</b></u></div>
  <br> <br>
 <dd><b>PRIMERA.</b> - Declara “LA EMPRESA” lo siguiente:<br></dd>
A).- Ser Mexicano con capacidad legal para celebrar el presente contrato, y que tiene su domicilio fiscal en Av. Calle Tercera S/N, Ejido Sinaloa de esta ciudad de Mexicali, Baja California.<br>
B).- Que necesita los servicios de una persona para el puesto de <b> {{ empleado.puesto.nombre.toUpperCase() }} </b> para cubrir un periodo de <b>{{ duracionContrato.toUpperCase() }}</b>.<br> <br>
La cual cuenta con Registro Federal de Contribuyente: METB940228K52.<br><br>
<dd><b>SEGUNDA.</b> - Declara el trabajador: <b>{{empleado.apellidos.toUpperCase()+" "+empleado.nombre.toUpperCase()}}</b>, de 
nacionalidad mexicana, sexo masculino, con domicilio ubicado {{ empleado.direccion }} {{ empleado.colonia }} 
21395, {{ empleado.ciudad }} {{ empleado.estado.estado }}, que está dispuesto a prestar sus servicios personales en
 los términos señalados por “LA EMPRESA”, y clave única de registro de población: 
 {{ empleado.curp }}.</dd>
 <br>

<dd>Leídas las declaraciones anteriores y estando de acuerdo en que lo declarado es correcto, ambas partes se someten a las siguientes:</dd>
<br>
<div class="titulo"><u><b>C L A U S U L A S:</b></u></div>
<br>
<br>

<dd><b>PRIMERA</b>. -“EL TRABAJADOR” está de acuerdo en prestar sus servicios personales, bajo 
la dirección y dependencia de la empresa, desempeñando el puesto de: <b> {{ empleado.puesto.nombre.toUpperCase() }}. </b><br>

Asimismo, se estipula en el presente contrato que se aplicara de común acuerdo todo lo 
actuado por la empresa en términos del artículo 19 de la ley federal del trabajo y demás relativos
 al mismo.
 </dd><br>
<!-- CONTRATO INDEFINIDO -->
 <template v-if="contrato.duracion == -1">
  <dd><b>SEGUNDA.</b> - Este contrato de trabajo se celebra en términos del artículo 35 de la Ley Federal del Trabajo, por tiempo indeterminado,  a partir del día  
 <b> {{contrato.inicio_contrato | moment("DD")}} del mes de {{contrato.inicio_contrato | moment("MMMM")}} del {{contrato.inicio_contrato | moment("YYYY")}}</b>.
 <br>
 <br>
 La relación de trabajo y este contrato, se darán por terminados automáticamente sin necesidad
 de aviso, ni responsabilidad u obligación alguna para “LA EMPRESA” de acuerdo al artículo 53
  fracción III de la Ley Federal Del Trabajo, esto de conformidad con los numerales 36 y 37 de la
   misma Ley Federal del Trabajo, teniendo por lo tanto “EL TRABAJADOR” el carácter de 
   trabajador temporal o de tiempo determinado como se estipula en el presente contrato y bajo 
   la tesitura jurídica de la presente ley en cita.</dd>
   <br>
 </template>
 <!-- CONTRATO TIEMPO DEFINIDO -->
 <template v-else>
  <dd><b>SEGUNDA.</b> - Este contrato de trabajo se celebra en términos del artículo 35 de la Ley
 Federal del Trabajo, por tiempo determinado que será por un periodo comprendido de <b> {{ duracionContrato.toUpperCase() }} </b>, a partir del día  
 <b> {{contrato.inicio_contrato | moment("DD")}} del mes de {{contrato.inicio_contrato | moment("MMMM")}} del {{contrato.inicio_contrato | moment("YYYY")}}</b>, con fecha de terminación 
 contractual el <b> {{contrato.termino_contrato | moment("DD")}} del mes de {{contrato.termino_contrato | moment("MMMM")}} del {{contrato.termino_contrato | moment("YYYY")}}</b>.
 <br>
 <br>
 La relación de trabajo y este contrato, se darán por terminados automáticamente sin necesidad
 de aviso, ni responsabilidad u obligación alguna para “LA EMPRESA” de acuerdo al artículo 53
  fracción III de la Ley Federal Del Trabajo, esto de conformidad con los numerales 36 y 37 de la
   misma Ley Federal del Trabajo, teniendo por lo tanto “EL TRABAJADOR” el carácter de 
   trabajador temporal o de tiempo determinado como se estipula en el presente contrato y bajo 
   la tesitura jurídica de la presente ley en cita.</dd>
   <br>
 </template>




<dd><b>TERCERA.</b> -“LA EMPRESA” se obliga a pagar al trabajador por concepto de salario la 
cantidad de $ {{ formatPrice(contrato.sueldo) }} ( {{ NumeroALetras(contrato.sueldo, { plural: 'Pesos', singular: 'Peso', centPlural: 'centavos', centSingular: 'centavo' }) }} 00/100 M.N) Semanalmente incluyendo su 
séptimo día, asimismo podrá recibir otras cantidades adicionales por prestaciones de seguridad 
social, como son bono de productividad y bono de puntualidad, horas extras y despensa. El 
salario será pagado los sábados de cada semana, en efectivo.</dd>
<br>

<dd><b>CUARTA. </b>- “EL TRABAJADOR” Se obliga a cumplir con una jornada de trabajo de ocho 
horas diarias, trabajando de lunes a sábado, comprendiendo la jornada de trabajo, entrando a 
laboral a las 7:00 horas, por lo que su descanso comprenderá de 12:00 horas a 13:00 horas, 
terminando su jornada de trabajo de lunes a viernes a las 17:00 horas, y los días sabados terminando a las 12:00 horas . <br>
Convienen expresamente las partes, que es facultad de “LA EMPRESA” repartir, cambiar 
o modificar en cualquier tiempo, y por necesidades del servicio llevar a cabo las modificaciones 
de jornada, turnos, domicilio, día de descanso, y horarios de trabajo de “EL TRABAJADOR” 
que se establecen en el párrafo anterior.</dd>
<br>

<dd><b>QUINTA.</b>-“EL TRABAJADOR” se obliga expresamente a realizar las tareas que le 
incumben con motivo de su trabajo, con todo esmero y cuidado, a cumplir estrictamente las 
ordenes e indicaciones que reciba respecto de la forma y términos para el desarrollo de su 
trabajo, igualmente, “EL TRABAJADOR” se obliga a cumplir fielmente las instrucciones de su 
supervisor o jefe inmediato, respecto de la forma de operar y conservar la maquinaria, 
herramienta y mobiliario que utiliza, para que a la salida de su turno, tanto el equipo como el 
lugar de trabajo, queden perfectamente limpios; “EL TRABAJADOR” deberá desempeñar 
dentro de su jornada de trabajo, las labores propias de su categoría, así como todas aquellas 
que resulten compatibles con la misma, y a todo lo demás relativo al artículo 134 de la Ley 
Federal Del Trabajo.</dd>	
<br>

<dd><b>SEXTA.</b> -Queda estrictamente prohibido para “EL TRABAJADOR” laborar tiempo 
extraordinario, excepto en el caso de que fuere solicitado para ello por la empresa, que podrá 
ser en cualquier momento para la ejecución de trabajos determinados siempre y cuando 
no exceda de tres horas diarias o de nueve horas a la semana.</dd>
<br>

<dd><b>SEPTIMA. </b>-“EL TRABAJADOR” está de acuerdo en que este contrato de trabajo se 
tendrá por rescindido sin responsabilidad alguna para la empresa por cualquiera de las causas 
enumeradas en el artículo 47 o por no cumplir con lo estipulado en el artículo 134 y 135 de la 
Ley Federal Del Trabajo.</dd>
<br>

<dd><b>OCTAVA.</b> -“LA EMPRESA” proporcionara, en su caso, al trabajador capacitación y 
adiestramiento dentro y fuera de la empresa de conformidad con lo establecido en el artículo 
153- A. </dd>
<br>

<dd><b>NOVENA. </b>-Las partes pactan expresamente que “LA EMPRESA” podrá suspender de 
sus labores a “EL TRABAJADOR”, de uno a tres días por razón de medida disciplinaria y sin 
goce de sueldo ni obligación o responsabilidad alguna para “LA EMPRESA” faltas a las que se 
refieren los artículos 134 y 135 de La Ley Federal Del Trabajo.</dd>
<br>

<dd>EL presente contrato lo firman ambas partes en la Ciudad de Mexicali, Baja California el 
día <b> {{contrato.inicio_contrato | moment("DD")}} de {{contrato.inicio_contrato | moment("MMMM")}} del {{contrato.inicio_contrato | moment("YYYY")}}</b>, y se extiende por duplicado, entregando una copia al trabajador de 
conformidad para los efectos legales correspondientes.</dd>
<br>

        </div>
        <div id="ordenes">
          
          <el-row >
              
          </el-row>   
        </div>

        <div id="terms" style="float:left; margin-left:32px"> 
          <b>"EL TRABAJADOR"</b>
        </div>

        <div id="terms" style="float:right; margin-right:32px"> 
          <b>"LA EMPRESA"</b>
        </div>
        
        
        <div id="terms" style="float:left; margin-left:32px"> 
          <h5>C. {{ empleado.apellidos.toUpperCase()+" "+empleado.nombre.toUpperCase() }}</h5>
        </div>

        <div id="terms" style="float:right; margin-right:32px"> 
          <h5> BRANDON MENDOZA TOVAR </h5>
        </div>
      
      </div>
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
      fechaContrato:'',
      contrato:[],
      empleado:[],
      perfil_empresa:[],
    }
  },
  computed:{ /* Barra de Acciones */
      duracionContrato() {
        if(this.contrato.duracion == -1){
            return "Tiempo indefinido";
        }
        
        switch(this.contrato.duracion){
          case 1:
            return "(1) Un mes";

          case 2:
            return "(2) Dos meses";

          case 3:
            return "(3) Tres meses";
        }
      },
    },
  created() {
    //console.log("PARAMS");
    //console.log(JSON.parse(this.$route.params.currentContrato));

    this.fechaContrato = JSON.parse(this.$route.params.fechaContrato);
    console.log("FECHA CONTRATO:");
    console.log(this.fechaContrato);

    this.empleado = JSON.parse(this.$route.params.currentEmpleado);
    console.log("CONTRATO:");
    console.log(this.empleado);
    
    this.contrato = JSON.parse(this.$route.params.currentContrato);
    console.log("CONTRATO:");
    console.log(this.contrato);
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
    NumeroALetras(num, currency) {
        currency = currency || {};
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: currency.plural || 'PESOS CHILENOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
            letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (function () {
                    if (data.centavos == 1)
                        return this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                    else
                        return this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                })();
        };

        if(data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
            return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    },
    Unidades(num){

        switch(num)
        {
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }

        return '';
    },//Unidades()
    Decenas(num){

        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);

        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + this.Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + this.Unidades(unidad);
                }
            case 3: return this.DecenasY('TREINTA', unidad);
            case 4: return this.DecenasY('CUARENTA', unidad);
            case 5: return this.DecenasY('CINCUENTA', unidad);
            case 6: return this.DecenasY('SESENTA', unidad);
            case 7: return this.DecenasY('SETENTA', unidad);
            case 8: return this.DecenasY('OCHENTA', unidad);
            case 9: return this.DecenasY('NOVENTA', unidad);
            case 0: return this.Unidades(unidad);
        }
    },//Unidades()

    DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + this.Unidades(numUnidades)

        return strSin;
    },//DecenasY()

    Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + this.Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
            case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
            case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
        }

        return this.Decenas(decenas);
    },//Centenas()

    Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = this.Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    },//Seccion()

    Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = this.Centenas(resto);

        if(strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    },//Miles()

    Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = this.Miles(resto);

        if(strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    },//Millones()


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

#terms { text-align: center; margin-top: 20px; width: 276px; padding-top: 100px; }
#terms h5 { text-transform: uppercase; font: 13px; border-top: 1px solid black; padding: 0 0 8px 0; margin: 0 0 8px 0; }
#terms textarea { width: 100%; text-align: center;}

//textarea:hover, textarea:focus, #items td.total-value textarea:hover, #items td.total-value textarea:focus, .delete:hover { background-color:#EEFF88; }

// .delete-wpr { position: relative; }
// .delete { display: block; color: #000; text-decoration: none; position: absolute; background: #EEEEEE; font-weight: bold; padding: 0px 3px; border: 1px solid; top: -6px; left: -22px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;font-size: 12px; }
}



</style>
