<template>
  <el-form :model="currentBajaEmpleado" ref="EmpleadosBajasForm" label-position="top"  label-width="150px" :rules="rules" >
    <el-dialog
    :ref="dialogRef"
    :title="dialogTitle"
    
    width="40%"
    :visible.sync="dialogoBaja">
     
      <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="Numero de Empleado">
                  <el-tag type="info"> {{ currentEmpleado.numero_empleado}}</el-tag>
              </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Empleado">
              <el-tag type="info"> {{ currentEmpleado.nombre+' '+currentEmpleado.apellidos}}</el-tag>
            </el-form-item>
          </el-col>
      </el-row>
   <!-- 
        id:0,
          fecha_baja:'',
          fecha_inicial_labores:'',
          motivo_baja_id:0,
          dias_laborados:0,
          vacaciones:0,
          prima_vacacional:0,
          aguinaldo:0,
          firmado:0,
          empleado_id:0,
          motivo:'',
          notas:'',
      -->
      <el-row :gutter="20">
        <el-col :span="10">
            <el-form-item label="Fecha de Inicio de Labores" prop="fecha_inicial_labores">
                <el-date-picker @change="validarFecha()" format="yyyy-MMM-dd" v-model="currentBajaEmpleado.fecha_inicial_labores" type="date" />
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="Fecha de la Baja" prop="fecha_baja">
                <el-date-picker @change="validarFecha()" format="yyyy-MMM-dd" v-model="currentBajaEmpleado.fecha_baja" type="date" />
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
            <el-form-item label="Tipo de Baja" prop="tipo_baja_id">                
              <el-select 
              v-model="currentBajaEmpleado.tipo_baja_id" 
              value-key="id">
                  <el-option 
                  v-for="tipo_baja in tipo_baja_list"
                  :key="tipo_baja.id"
                  :label="tipo_baja.tipo" 
                  :value="tipo_baja.id"/>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="Motivo de la Baja " prop="motivo">                
              <el-input v-model="currentBajaEmpleado.motivo"/>
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
      <el-col :span="10">
            <el-form-item label="Salario">                
              <el-tag type="info"> $ {{ formatPrice(currentBajaEmpleado.salario) }}</el-tag>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="Salario diario">                
              <el-tag type="info"> $ {{ formatPrice(currentBajaEmpleado.salario_diario) }}</el-tag>
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
            <el-form-item label="Días Laborados">                
              <el-tag type="info"> {{ dias_laborados }} Días</el-tag>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="Días de Vacaciones">                
                <el-tag type="info"> {{dias_vacaciones}} </el-tag>
            </el-form-item>
        </el-col>
      </el-row>


        <el-form-item>
        <el-tabs v-model="activeName">
          <!-- Tab NOTAS
            dias_laborados:0,
            vacaciones:0,
            prima_vacacional:0,
            aguinaldo:0,
          -->
          <el-tab-pane label="Finiquito" name="first">
          
          <table style="border: 0px; width:100%;">
            <tr>
              <th style="text-align:left;"> Concepto </th>
              <th style="text-align:left;"> Porcentaje </th>
              <th style="text-align:left;"> Total </th>
            </tr>
            <tr>
              <td> Vacaciones </td>
              <td> {{ formatDecimales(currentBajaEmpleado.vacaciones) }} </td>
              <td> $ {{ formatPrice(currentBajaEmpleado.vacaciones*currentBajaEmpleado.salario_diario) }}   </td>
            </tr>
            <tr>
              <td> Prima Vacacional </td>
              <td> {{ formatDecimales(currentBajaEmpleado.prima_vacacional) }} </td>
              <td> $ {{ formatPrice(currentBajaEmpleado.prima_vacacional*currentBajaEmpleado.salario_diario) }} </td>
            </tr>
            <tr>
              <td> Aguinaldo </td>
              <td> {{ formatDecimales(currentBajaEmpleado.aguinaldo) }} </td>
              <td> $ {{ formatPrice(currentBajaEmpleado.aguinaldo*currentBajaEmpleado.salario_diario) }} </td>
            </tr>

            <tr>
              <td> </td>
              <td> <b> Total </b> </td>
              <td> <b> $ {{ formatPrice(total_finiquito) }} </b> </td>
            </tr>
          </table>

          </el-table>
          </el-tab-pane>
          <!-- Tab CALCULO DE DINERO -->
          <el-tab-pane label="Notas" name="second">
              <el-input type="textarea" 
                  v-model="currentBajaEmpleado.notas"
                  :autosize="{ minRows: 16, maxRows: 16}"/>
              
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-row :gutter="20">
        <el-col>
          <el-switch
          style="display: block"
          v-model="currentBajaEmpleado.firmado"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          active-text="Firmado">
          </el-switch>
        </el-col>
        <el-col>

        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
       <!-- IMPRIMIR RENUNCIA-->
        <el-button class="filter-item" type="primary" icon="el-icon-printer" @click="handlePrintFiniquito()">
            Imprimir Finiquito
        </el-button>
        <!-- IMPRIMIR RENUNCIA-->
        <el-button class="filter-item" type="primary" icon="el-icon-printer" @click="handlePrintRenuncia()">
            Imprimir Renuncia
        </el-button>
        <el-button @click="dialogoBaja = false;" class="float-left">Cerrar</el-button>
        <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
        <el-button type="danger" @click="submitBajaEmpleado()" icon="el-icon-check">Dar de Baja</el-button>
      </span>
    </el-dialog>

    <!-- Dialogo PRE PRINT -->
    <el-dialog
    id="dialogoPrePrint"
    title="Imprimir Renuncia"
    :visible.sync="dialogoPrintRenuncia"
    width="30%">
        
        <!-- FECHA CON LA QUE SALDRA EL DOCUMENTO -->
        <el-row :gutter="20">
            <el-col :span="10">
              Fecha de la Renuncia:
            </el-col>
            <el-col :span="10">
              <el-date-picker format="yyyy-MMM-dd" v-model="fechaRenuncia" type="date" />
            </el-col>
        </el-row>
        
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogoPrintRenuncia = false;" class="float-left">Cancelar</el-button>
            
            <router-link target="_blank"  :to="{ name: 'renuncia_empleado_download', params: {fechaRenuncia:JSON.stringify(fechaRenuncia), currentBajaEmpleado: JSON.stringify(currentBajaEmpleado), currentEmpleado: JSON.stringify(currentEmpleado)} }">
                <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableImprimir">
                    Imprimir Renuncia
                </el-button>
            </router-link>
        </span>
    </el-dialog>

    <!-- Dialogo PRE PRINT FINIQUITO -->
    <el-dialog
    id="dialogoPrePrintFiniquito"
    title="Imprimir Finiquito"
    :visible.sync="dialogoPrintFiniquito"
    width="30%">
        
        <!-- FECHA CON LA QUE SALDRA EL DOCUMENTO -->
        <el-row :gutter="20">
            <el-col :span="10">
              Fecha de la Renuncia:
            </el-col>
            <el-col :span="10">
              <el-date-picker format="yyyy-MMM-dd" v-model="fechaRenuncia" type="date" />
            </el-col>
        </el-row>
        
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogoPrintFiniquito = false;" class="float-left">Cancelar</el-button>
            
            <router-link target="_blank"  :to="{ name: 'finiquito_empleado_download', params: {fechaRenuncia:JSON.stringify(fechaRenuncia), currentBajaEmpleado: JSON.stringify(currentBajaEmpleado), currentEmpleado: JSON.stringify(currentEmpleado)} }">
                <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableImprimir">
                    Imprimir Finiquito
                </el-button>
            </router-link>
        </span>
    </el-dialog>
   
  </el-form>
</template>

<script>
import moment from 'moment';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission/index.js'
import role from '@/directive/role/index.js'
import checkPermission from '@/utils/permission';
import Resource from '@/api/resource';
import ContratoEmpleadoResource from '@/api/contratoEmpleado';

const contratoEmpleadoResource = new ContratoEmpleadoResource('contratoEmpleado');
const empleadoBajaResource = new Resource('bajaEmpleado');

  export default {
    data() {
      return {
        activeName:'first',
        fechaRenuncia:'',
        dialogoPrintRenuncia:false,
        dialogoPrintFiniquito:false,
        currentEmpleado:{
          id:0,
        },
        contratoActual:{
          id:0,
        },
        empleado_vacaciones:{
           id: 0, tiempo_anos: 0, dias_vacaciones: 0
        },
        currentBajaEmpleado:{
          id:0,
          fecha_baja:'',
          fecha_inicial_labores:'',
          tipo_baja_id:'', //RENUNCIA O DESPIDO (BAJA_EMPLEADO)
          dias_laborados:0,
          vacaciones:0,
          prima_vacacional:0,
          aguinaldo:0,
          firmado:0,
          empleado_id:0,
          motivo:'', // (PARA HISTORIAL ALTA BAJA)
          tipo:0, //ALTA = 1 , BAJA = 0 (PARA HISTORIAL ALTA BAJA)
          notas:'',
          salario:0,
          salario_diario:0,
          empleado_id:0,
        },
        rules: {
          fecha_baja: [
            // / type: 'date', required: true, message: 'Please pick a date', trigger: 'change'
            { required: true, message: 'Selecciona una fecha de baja', trigger: 'blur' },
          ],
          fecha_inicial_labores: [
            { required: true, message: 'Selecciona una fecha de inicio de labores', trigger: 'blur' },
          ],
          tipo_baja_id: [
            { required: true, message: 'Selecciona un tipo de baja', trigger: 'change' },
          ],
        },
        tipo_baja_list:[
          {
            id: 1,
            tipo: 'Renuncia'
          }, 
          {
            id: 2,
            tipo: 'Despido'
          },

        ],
        vacaciones:[
          {  id: 1, tiempo_anos: 1, dias_vacaciones: 6  }, 
          {  id: 2, tiempo_anos: 2, dias_vacaciones: 8  }, 
          {  id: 3, tiempo_anos: 3, dias_vacaciones: 10  }, 
          {  id: 4, tiempo_anos: 4, dias_vacaciones: 12  }, 
          {  id: 5, tiempo_anos: 9, dias_vacaciones: 14  }, 
          {  id: 6, tiempo_anos: 14, dias_vacaciones: 16  }, 
          {  id: 7, tiempo_anos: 19, dias_vacaciones: 18  }, 
          {  id: 8, tiempo_anos: 24, dias_vacaciones: 20  }, 
          {  id: 9, tiempo_anos: 29, dias_vacaciones: 22  }, 
        ],
        /*
          `id` INT NOT NULL AUTO_INCREMENT,
          `fecha_baja` TIMESTAMP NULL,
          `fecha_inicial_labores` TIMESTAMP NULL,
          `motivo_baja_id` INT NULL,
          `dias_laborados` FLOAT NULL,
          `vacaciones` FLOAT NULL,
          `prima_vacacional` FLOAT NULL,
          `aguinaldo` FLOAT NULL,
          `firmado` INT NULL,
          `created_at` TIMESTAMP NULL,
          `updated_at` TIMESTAMP NULL,
          `empleado_id` INT NULL,
        */
        query: {
          page: 1,
          limit: 15,
          keyword: '',
          role: '',
        },
        contratos:[],
        /*Dialog*/
        dialogoBaja:false,
        dialogTitle: '',
        dialogRef: 'EmpleadosBajasDialog',
        /*Informacion principal*/
      };
    },
    computed:{ /* Barra de Acciones */
      dias_vacaciones(){
        var inicio_labores = moment(this.currentBajaEmpleado.fecha_inicial_labores);
        var fecha_baja = moment(this.currentBajaEmpleado.fecha_baja);

        if(!inicio_labores.isValid() || !fecha_baja.isValid()){
          console.log("NULL AMBOS");
          return 0;
        }
        

        var anos = fecha_baja.diff(inicio_labores, 'years');
        this.empleado_vacaciones = this.vacaciones.find(vacacion =>  vacacion.tiempo_anos > anos);
        console.log(" DIAS VACACINOES) EMPLEADO VACACIONES");
        console.log(this.empleado_vacaciones);

        this.currentBajaEmpleado.vacaciones = (this.empleado_vacaciones.dias_vacaciones/365) * this.currentBajaEmpleado.dias_laborados;
        this.currentBajaEmpleado.prima_vacacional = this.currentBajaEmpleado.vacaciones * 0.25;
        this.currentBajaEmpleado.aguinaldo = (15/365) * this.currentBajaEmpleado.dias_laborados;

        var dias = this.empleado_vacaciones.dias_vacaciones;
        return dias;
      },
      dias_laborados(){
        var inicio_labores = moment(this.currentBajaEmpleado.fecha_inicial_labores);
        var fecha_baja = moment(this.currentBajaEmpleado.fecha_baja);
        this.currentBajaEmpleado.dias_laborados = fecha_baja.diff(inicio_labores, 'days');
        
        return this.currentBajaEmpleado.dias_laborados;
      },
      total_finiquito(){
        var vacaciones = this.currentBajaEmpleado.vacaciones*this.currentBajaEmpleado.salario_diario;
        var prima_vacacional = this.currentBajaEmpleado.prima_vacacional*this.currentBajaEmpleado.salario_diario;
        var aguinaldo = this.currentBajaEmpleado.aguinaldo*this.currentBajaEmpleado.salario_diario;

        return (vacaciones + prima_vacacional + aguinaldo);
      },
      disableImprimir(){
        if(this.fechaRenuncia == '' || this.fechaRenuncia == null){
          return true;
        }
        return false;
      },
    },
    directives: { waves, permission, role  },
    methods: {
      checkPermission,
      async submitBajaEmpleado(){
        console.log("CURRENT EMPLEADO");
        console.log(this.currentEmpleado);
        this.currentBajaEmpleado.empleado_id = this.currentEmpleado.id;
        this.$refs['EmpleadosBajasForm'].validate((valid) => { //validacion del form
          if (valid) {
            empleadoBajaResource.store({current: this.currentBajaEmpleado}).then(response => {
              console.log("RESPONSE: ");
              console.log(response);
              this.$parent.getList();
              this.$message({ message: 'Contrato agregado correctamente.', type: 'success', duration: 5 * 1000, });
              this.dialogoBaja = false;
            })
            .catch(error => {
                console.log(error);
            });            
            
          } else {
            return false;
          }
        });
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      formatDecimales(value) {
        let val = (value/1).toFixed(6).replace(',', '.')
        return val.toString();
      },
      validarFecha(){
        var inicio_labores = moment(this.currentBajaEmpleado.fecha_inicial_labores);
        var fecha_baja = moment(this.currentBajaEmpleado.fecha_baja);
        if(inicio_labores.isValid() || fecha_baja.isValid()){
          if(inicio_labores > fecha_baja){
            this.$message({ message: 'La fecha de inicio de labores no puede ser mayor a la fecha de baja.', type: 'warning', duration: 5 * 1000, });
            this.currentBajaEmpleado.fecha_inicial_labores =  moment(this.currentEmpleado.fecha_entrada);
            this.currentBajaEmpleado.fecha_baja = moment();
          }
        }
      },
      /* LISTADO*/
      /*DIALOG METHODS*/
      open() {
        this.dialogoBaja = true;
        this.activeName = 'first';
        this.currentEmpleado = this.$parent.current;
        this.currentBajaEmpleado.fecha_inicial_labores =  moment(this.currentEmpleado.fecha_entrada);
        this.currentBajaEmpleado.fecha_baja = moment();
        
        this.contratoActual = this.$parent.contratos.find(contrato => contrato.contrato_actual == 1);
        this.currentBajaEmpleado.salario =  this.contratoActual.sueldo;
        this.currentBajaEmpleado.salario_diario =  this.contratoActual.sueldo/7;

        this.dialogTitle = 'Dar de Baja: ('+this.currentEmpleado.numero_empleado+') '+this.currentEmpleado.nombre+' '+this.currentEmpleado.apellidos;
      },
      close() {
          //this.$parent.setCurrent();
          this.dialogoBaja = false;
      },
      handleClose(done) {
          this.$confirm('Está seguro que deseas salir?')
          .then(_ => {
              this.clearFields(); //limpiamos campos
              this.close(); //cerramos modal
          })
          .catch(_ => {});
      },
      handlePrintRenuncia(){
        this.dialogoPrintRenuncia = true;
      },
      handlePrintFiniquito(){
        this.dialogoPrintFiniquito = true;
      },
    }
  };
</script>

    
