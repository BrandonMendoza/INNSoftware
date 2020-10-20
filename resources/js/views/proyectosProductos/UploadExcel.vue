<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <br>
    <div class="filter-container">
      <a type="button" title="descargar" :href="'/uploadExcel/downloadPlantilla'" class="el-button el-button--primary el-button--mini" >
       <i class="el-icon-download"></i>  Descargar Plantilla
      </a>
    </div>
    <el-table
    :data="list"
    border
    tooltip-effect="light"
    fit
    v-loading="loading"
    style="width: 100%; word-wrap: break-word;">
        <el-table-column label="Producto"> 
          <el-table-column
          prop="numero_parte_producto"
          label="Num. de Parte (Producto)"/> 

          <el-table-column
          prop="pintura"
          label="Pintura"/>

          <el-table-column
          prop="peso_kg"
          label="Peso (kg)"/>

          <el-table-column
          prop="cliente"
          label="Cliente"/>
        </el-table-column>

        <el-table-column label="Proyecto"> 
          <!-- <el-table-column
          prop="numero_parte_proyecto"
          label="Num. de Parte (Proyecto)"/> -->
          
          <el-table-column
          prop="plan_corte"
          label="Plan de Corte"/>

          <el-table-column
          prop="fecha_entrega"
          label="Fecha de Entrega"/>
        </el-table-column>


        <el-table-column label="Orden Abierta"> 
          <el-table-column
          prop="cantidad"
          label="Cantidad"/>


          <el-table-column
          prop="orden_trabajo"
          label="Orden de Trabajo"/>

          <el-table-column
          prop="item"
          label="Item"/>
        </el-table-column>
    </el-table>
    <br>
    <el-row align="right"> 
      <el-button @click="insert()" class="float-left" :disabled="agregarProductos" type="success">Agregar Productos</el-button>
    </el-row>
    
  </div>
</template>
<style>
  .el-table .cell {
    word-break: break-word;
}
</style>
<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue';
import moment from 'moment';

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      validation:true,
      agregarProductos:true,
      loading : true,
      list:[],
      productos:[],
      proyectos:[],
      ordenAbierta:[],
      clientes:[],
      pinturas:[],
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    getData(){
      let me = this;
      me.loading = true;
      axios.get('uploadExcel/getData').then(function (response) {
          //creamos un array y guardamos el contenido que nos devuelve el response
          console.table("RESPONSE:");
          console.log(response.data);
          me.productos = response.data.productos;
          me.proyectos = response.data.proyectos;
          me.ordenesAbiertas = response.data.ordenesAbiertas;
          me.clientes = response.data.clientes;
          me.pinturas = response.data.pinturas;
          me.loading = false;
      })
      .catch(function (error) {
          // handle error
          me.$message.error('Hubo un error.');
          me.loading = false;
          console.log(error);
      });
    },
    insert(){
      let me = this;
      me.loading = true;
      axios.put('/uploadExcel/insertOrdenesAbiertas',{'list':me.list}).then(function (response) {
          console.log("Response:");
          console.log(response);
          me.tableData = [];
          me.getData();
          me.list = [];
          me.loading = false;
          me.$message.success('Guardado correctamente.');
      })
      .catch(function (error) {
          me.$message.error('Hubo un error.');
          me.loading = false;
          console.log(error);
      });
    },
    ExcelDateToJSDate(serial) {
      var utc_days  = Math.floor(serial - 25569);
      var utc_value = utc_days * 86400;                                        
      var date_info = new Date(utc_value * 1000);

      var fractional_day = serial - Math.floor(serial) + 0.0000001;

      var total_seconds = Math.floor(86400 * fractional_day);

      var seconds = total_seconds % 60;

      total_seconds -= seconds;

      var hours = Math.floor(total_seconds / (60 * 60));
      var minutes = Math.floor(total_seconds / 60) % 60;

      return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    },
    validateData(resultados){
      /**Recorremos la informacion del excel */
      for (var resultado of resultados) {

        /**Validando proyecto y plan de corte */
        if(typeof resultado.plan_corte == 'undefined'){
          this.$confirm('plan_corte no puede estar vacio. (Producto:'+resultado.numero_parte_producto+')', 'Aviso', {
            cancelButtonText: 'Cerrar',
            type: 'warning',
            center: true
          });
          return false;
        }

        /**Validando numero de parte de producto */
        if(typeof resultado.numero_parte_producto == 'undefined'){
          this.$confirm('numero_parte_producto no puede estar vacio.', 'Aviso', {
            cancelButtonText: 'Cerrar',
            type: 'warning',
            center: true
          });
          return false;
        }
        /**Validar fecha entrega */
        if(typeof resultado.fecha_entrega == 'undefined'){
          this.$confirm('fecha de entrega no puede estar vacio.', 'Aviso', {
            cancelButtonText: 'Cerrar',
            type: 'warning',
            center: true
          });
          return false;
        }else{
          /**Formateando fecha */
          resultado.fecha_entrega =  this.ExcelDateToJSDate(resultado.fecha_entrega).toString();
          resultado.fecha_entrega =  moment(resultado.fecha_entrega).format("YYYY-MM-DD");
        }

        /**Validar  cantidad*/
        if(typeof resultado.cantidad == 'undefined'){
          this.$confirm('cantidad no puede estar vacio.', 'Aviso', {
            cancelButtonText: 'Cerrar',
            type: 'warning',
            center: true
          });
          return false;
        }

        /**Validando clientes */
        var validateCliente = false;
        for(var cliente of this.clientes){
          if(resultado.cliente.toUpperCase() == cliente.nombre_cliente.toUpperCase()){
            resultado.cliente_id = cliente.id;
            validateCliente = true;
            break;
          }
        }
        /**Si no se encuentra el cliente mandamos mensaje y terminamos la validacion */
        if(validateCliente == false){
          this.$confirm('El cliente: '+resultado.cliente.toUpperCase()+' no esta registrado en el sistema.', 'Aviso', {
            cancelButtonText: 'Cerrar',
            type: 'warning',
            center: true
          });
          
          return false;
        }
        /**Validando pinturas */
         var validatePintura = false;
        for(var pintura of this.pinturas){
          if(resultado.pintura.toUpperCase() == pintura.simbolo.toUpperCase()){
            resultado.pintura_id = pintura.id;
            validatePintura = true
            break;
          }
        }
        /**Si no se encuentra la pintura mandamos mensaje y terminamos la validacion */
        if(validatePintura == false){
          this.$confirm('La pintura: "'+resultado.pintura.toUpperCase()+'" no esta registrado en el sistema.', 'Aviso', {
            cancelButtonText: 'Cerrar',
            type: 'warning',
            center: true
          });
          return false;
        }
      }
      /**Desbloqueamos el boton de agregar */
      this.agregarProductos = false;
      return true;
      
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning',
      });
      return false;
    },
    handleSuccess({ results, header }) {
      console.log("DATOS:");
      console.log(results);
      /**Si la validacion es correcta cargamos la tabla con los datos */
      if(this.validateData(results)){
        this.list = results;
      }
      
      
      
    },
  },
  mounted() {
    this.getData();
  }
};
</script>
