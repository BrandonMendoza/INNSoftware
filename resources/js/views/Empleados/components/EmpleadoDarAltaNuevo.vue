<template>
  <el-form :model="currentContrato" ref="EmpleadosAltaForm" label-position="top"  label-width="150px" :rules="rules" >
    <el-dialog
    :ref="dialogRef"
    id="dialogoAlta"
    :title="dialogTitle"
    width="40%"
    :visible.sync="dialogoAlta">
     
      <el-row :gutter="5">
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

      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="Contrato Nuevo" name="first">
          <el-row :gutter="5">
            <el-col :span="8">
                <el-form-item label="Inicio del Contrato" prop="inicio_contrato">
                    <el-date-picker @change="changeFinContrato()" format="yyyy-MMM-dd" v-model="currentContrato.inicio_contrato" type="date" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="Duración del Contrato" prop="duracion">
                    <el-select 
                    v-model="currentContrato.duracion" 
                    @change="changeFinContrato()"
                    value-key="id">
                        <el-option 
                        v-for="tiempo_contrato in tiempo_contrato_select"
                        :key="tiempo_contrato.id"
                        :label="tiempo_contrato.nombre" 
                        :value="tiempo_contrato.id"/>
                    </el-select>
                    <!--{{ tiempoContrato }}-->
                </el-form-item>
            </el-col>

             <el-col :span="8">
                <el-form-item label="Final del Contrato" prop="termino_contrato" >
                  <el-date-picker format="yyyy-MMM-dd" :readonly="true" v-model="currentContrato.termino_contrato" type="date" />
                </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="10">
                <el-form-item label="Sueldo" prop="sueldo">                
                  <vue-numeric class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="currentContrato.sueldo"></vue-numeric>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="Bono" prop="bono">                
                  <vue-numeric class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="currentContrato.bono"></vue-numeric>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            
          </el-row>


          <el-row :gutter="20">
            <el-col :span="10">
              <el-switch
              style="display: block"
              v-model="currentContrato.firmado"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              active-text="Firmado">
              </el-switch>
            </el-col>
            <el-col>

            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogoAlta = false;" class="float-left">Cerrar</el-button>
        <el-button type="success" @click="submitAltaEmpleado()" icon="el-icon-check">Dar de Alta</el-button>
      </span>
    </el-dialog>

   
  </el-form>
</template>

<style scoped>
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>

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

  export default {
    data() {
      /* Custom validacion sueldo*/
      var checkSueldo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Ingresa un sueldo valido'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Ingresa un sueldo valido'));
          } else {
            if (value <= 0) {
              callback(new Error('Sueldo debe de ser mayor a $ 0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        activeName:'first',
        loading:true,
        currentEmpleado:{
          id:0,
        },
        currentAltaEmpleado:{
          id:0,
        },
        currentContrato:{
          id:0,
          sueldo:0,
          bono:0,
          inicio_contrato:'',
          termino_contrato:'',
          firmado:0,
          duracion:'',
          empleado_id:0,
          contrato_actual:1,
          ultimo_contrato:0,
        },
        empleado_vacaciones:{
           id: 0, tiempo_anos: 0, dias_vacaciones: 0
        },
        tiempo_contrato_select:[
          { id:1, nombre:"1 Meses", meses:1 },
          { id:3, nombre:"3 Meses", meses:3 },
          { id:-1, nombre:"Tiempo indefinido", meses:-1},
        ],
        rules: {
          inicio_contrato: [
            { required: true, message: 'Selecciona una fecha de baja', trigger: 'blur' },
          ],
          sueldo: [
            { validator: checkSueldo, trigger: 'blur' }
          ],
          bono: [
            { required: true, message: 'Ingresa un bono', trigger: 'change' },
          ],
          duracion: [
            { required: true, message: 'Selecciona una duración', trigger: 'change' },
          ],
        },
        query: {
          page: 1,
          limit: 15,
          keyword: '',
          role: '',
        },
        contratos:[],
        /*Dialog*/
        dialogoAlta:false,
        dialogTitle: '',
        dialogRef: 'EmpleadosAltaDialog',
        /*Informacion principal*/
      };
    },
    computed:{ },
    directives: { waves, permission, role  },
    methods: {
      checkPermission,
      async submitAltaEmpleado(){
        var loadingInstance = this.$loading({ target: '#dialogoAlta > .el-dialog' });
        this.currentContrato.empleado_id = this.currentEmpleado.id;
        this.$refs['EmpleadosAltaForm'].validate((valid) => { //validacion del form
          if (valid) {
            contratoEmpleadoResource.storeAlta(this.currentContrato.empleado_id,{currentContrato:this.currentContrato}).then(response => {
              console.log("RESPONSE: ");
              console.log(response);
              this.$parent.getList();
              this.$message({ message: 'Contrato agregado correctamente.', type: 'success', duration: 5 * 1000, });
              this.dialogoAlta = false;
              loadingInstance.close();
            })
            .catch(error => {
                console.log(error);
            });            
          }else{
            console.log(" no es valid");
            loadingInstance.close();
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
        this.dialogoAlta = true;
        console.log("PARENT CURRENT:");
        console.log(this.$parent.current);
        this.currentEmpleado = this.$parent.current;
        this.dialogTitle = 'Dar de Alta de Nuevo: ('+this.currentEmpleado.numero_empleado+') '+this.currentEmpleado.nombre+' '+this.currentEmpleado.apellidos;
        //this.getList();
      },
      close() {
          //this.$parent.setCurrent();
          this.dialogoAlta = false;
      },
      handleClose(done) {
          this.$confirm('Está seguro que deseas salir?')
          .then(_ => {
              this.clearFields(); //limpiamos campos
              this.close(); //cerramos modal
          })
          .catch(_ => {});
      },
      changeFinContrato(){
         if( this.currentContrato.inicio_contrato == "" || 
            this.currentContrato.duracion == 0 || 
            this.currentContrato.duracion == null || 
            this.currentContrato.duracion == -1){
          this.currentContrato.termino_contrato = "";
          return '——';
        }
       
        var inicio_contrato_aux = new Date(this.currentContrato.inicio_contrato);
        var termino_contrato_aux = new Date(inicio_contrato_aux.setMonth(inicio_contrato_aux.getMonth() + this.currentContrato.duracion));

        this.currentContrato.termino_contrato = termino_contrato_aux;
      }
    }
  };
</script>

    
