<template>
  <el-form :model="currentEmpleado" ref="EmpleadosContratosForm" label-position="top"  label-width="150px" >
    <el-dialog
    :ref="dialogRef"
    :title="dialogTitle"
    width="50%"
    :visible.sync="dialogoContrato">

      <el-row :gutter="20">
          <el-col :span="5">
              <el-form-item label="Numero de Empleado">
                  <el-tag type="info"> {{ currentEmpleado.numero_empleado}}</el-tag>
              </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Empleado">
              <el-tag type="info"> {{ currentEmpleado.nombre+' '+currentEmpleado.apellidos}}</el-tag>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row >
        <el-col>
          <el-tabs v-model="activeName" :stretch="true">
            <!-- Tab General -->
            <el-tab-pane label="Contratos" name="first" >
              <el-row>
                  <div class="filter-container"> 
                      <!-- AGREGAR -->
                      <el-button class="filter-item" v-permission="['agregar contratos empleados activos']" type="primary" size="small" icon="el-icon-plus" @click="handleAddContrato()">
                          Agregar Contrato
                      </el-button>

                      <!-- EDITAR -->
                      <el-button class="filter-item" v-permission="['editar contratos empleados activos']" type="primary" size="small" icon="el-icon-edit" @click="handleEditContrato()" :disabled="disableEditar">
                          Editar Contrato
                      </el-button>

                      <!-- EDITAR -->
                      <el-button class="filter-item" v-permission="['eliminar contratos empleados activos']" type="danger" size="small" icon="el-icon-delete" @click="deleteContrato()" :disabled="disableEditar">
                          Eliminar Contrato
                      </el-button>

                       <!-- IMPRIMIR -->
                      <el-button class="filter-item" v-permission="['imprimir contratos empleados activos']" type="primary" size="small" icon="el-icon-printer" @click="handlePrintContrato()" :disabled="disableEditar">
                          Imprimir Contrato
                      </el-button>
                  </div>
              </el-row>
              <el-row type="flex" justify="space-around" id="embarqueTransfer">
                <el-col>
                  <el-table
                  :data="contratos"
                  ref="contratosList"
                  highlight-current-row
                  @current-change="handleCurrentChangeTable"
                  sortable
                  border
                  tooltip-effect="light"
                  fit
                  style="width: 100%; word-wrap: break-word;">
                    
                    <el-table-column 
                    prop="inicio_contrato"
                    label="Inicio del Contrato"
                    show-overflow-tooltip> 
                      <template slot-scope="scope">
                          <el-tag>
                              {{scope.row.inicio_contrato | moment("YYYY-MMM-DD")}}
                          </el-tag>
                      </template>
                    </el-table-column>

                    <el-table-column 
                    prop="termino_contrato"
                    label="Final del Contrato"
                    show-overflow-tooltip> 
                      <template slot-scope="scope">
                          <el-tag v-if="scope.row.duracion != -1" :type="compareDates(scope.row.termino_contrato)">
                              {{scope.row.termino_contrato | moment("YYYY-MMM-DD")}}
                          </el-tag>
                          
                          <el-tag v-if="scope.row.duracion == -1"> —— </el-tag>
                      </template>
                  </el-table-column>

                    <el-table-column 
                    prop="duracion"
                    label="Duración"
                    align="center"
                    show-overflow-tooltip> 
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.duracion == -1">Tiempo Indefinido</el-tag>
                        <el-tag v-if="scope.row.duracion != -1" > {{ scope.row.duracion}} Meses</el-tag>
                      </template>
                  </el-table-column>

                    <el-table-column 
                    prop="sueldo"
                    label="Sueldo"
                    align="center"
                    show-overflow-tooltip/>

                    <el-table-column 
                    prop="bono"
                    label="Bono de Puntualidad"
                    align="center"
                    show-overflow-tooltip/>

                    <el-table-column 
                    prop="firmado"
                    label="Firmado"
                    align="center"
                    show-overflow-tooltip>
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.firmado == 1" type="success"><i class="el-icon-success"></i></el-tag>
                        <el-tag v-if="scope.row.firmado == 0" type="danger"><i class="el-icon-error"></i></el-tag>
                      </template>
                    </el-table-column>

                    <el-table-column 
                    prop="contrato_actual"
                    label="Contrato actual"
                    align="center"
                    show-overflow-tooltip>
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.contrato_actual == 1" type="success"><i class="el-icon-success"></i></el-tag>
                        <el-tag v-if="scope.row.contrato_actual == 0" type="danger"><i class="el-icon-error"></i></el-tag>
                      </template>
                    </el-table-column>


                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>

            
          </el-tabs>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogoContrato = false;" class="float-left">Cerrar</el-button>
      </span>
    </el-dialog>

    <!--  ADD  CONTRATO Dialog -->
    <el-dialog
    id="dialogoAgregarDocumento"
    :title="addContratoTitle"
    :visible.sync="agregarContratoDialog" 
    width="23%">

      <el-row :gutter="20">
        <el-col>
            <el-form-item label="Inicio del Contrato" prop="inicio_contrato">
                <el-date-picker @change="changeFinContrato()" format="yyyy-MMM-dd" v-model="currentContrato.inicio_contrato" type="date" />
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col>
            <el-form-item label="Duración del Contrato" prop="inicio_contrato">
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
      </el-row>

      <el-row :gutter="20">
        <el-col>
            <el-form-item label="Final del Contrato" prop="termino_contrato" >
               <el-date-picker format="yyyy-MMM-dd" :readonly="true" v-model="currentContrato.termino_contrato" type="date" />
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col >
            <el-form-item label="Sueldo" prop="sueldo">                
              <vue-numeric class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="currentContrato.sueldo"></vue-numeric>
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col >
            <el-form-item label="Bono" prop="bono">                
              <vue-numeric class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="currentContrato.bono"></vue-numeric>
            </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col>
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
        
      <span slot="footer" class="dialog-footer">
          <el-button class="float-left"         @click="closeAgregarDialog()">Cancelar</el-button>
          <el-button style="margin-left: 10px;" @click="submitContrato" type="success">Guardar</el-button>
      </span>
    </el-dialog>

    <!-- Dialogo PRE PRINT -->
    <el-dialog
    id="dialogoPrePrint"
    title="Imprimir Contrato"
    :visible.sync="dialogoPrintContrato"
    width="30%">
        
        <!-- FECHA CON LA QUE SALDRA EL DOCUMENTO -->
        <el-row :gutter="20">
            <el-col :span="10">
              Fecha Contrato:
            </el-col>
            <el-col :span="10">
              <el-date-picker format="yyyy-MMM-dd" v-model="fechaContrato" type="date" />
            </el-col>
        </el-row>
        
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogoPrintContrato = false;fileList = [];" class="float-left">Cancelar</el-button>
            <!-- pdf example button -->
            
            <router-link target="_blank"  :to="{ name: 'contrato_empleado_download', params: {fechaContrato:JSON.stringify(fechaContrato), currentContrato: JSON.stringify(currentContrato), currentEmpleado: JSON.stringify(currentEmpleado)} }">
                <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableImprimir">
                    Imprimir Contrato
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
const contratoResource = new Resource('contratoEmpleado');

  export default {
    data() {
      return {
        activeName:'first',
        currentEmpleado:{
          id:0,
        },
        query: {
          page: 1,
          limit: 15,
          keyword: '',
          role: '',
        },
        contratos:[],
        /*Dialog*/
        dialogoContrato:false,
        dialogTitle: '',
        dialogRef: 'EmpleadosContratosDialog',
        /*Dialog Print Contrato*/
        dialogoPrintContrato:false,
        fechaContrato:'',
        /*Agregar Contrato Dialog*/
        agregarContratoDialog:false,
        addContratoTitle:'',
        currentContrato:{
          id:0,
          sueldo:0,
          bono:0,
          inicio_contrato:'',
          termino_contrato:'',
          firmado:0,
          duracion:0,
          empleado_id:0,
          contrato_actual:1,
          ultimo_contrato:0,
        },
        tiempo_contrato_select:[
          { id:1, nombre:"1 Meses", meses:1 },
          { id:3, nombre:"3 Meses", meses:3 },
          { id:-1, nombre:"Tiempo indefinido", meses:-1},
        ],
        /*Informacion principal*/
      };
    },
    computed:{ /* Barra de Acciones */
      disableImprimir(){
        if(this.fechaContrato == '' || this.fechaContrato == null){
          return true;
        }
        return false;
      },
      disableEditar() {
        if(this.currentContrato.id == 0){
            return true;
        }
        return false;
      },
      finContrato() {
        if( this.currentContrato.inicio_contrato == "" || 
            this.currentContrato.duracion == 0 || 
            this.currentContrato.duracion == null || 
            this.currentContrato.duracion == -1){
          console.log("ENTRO A IF");
          this.currentContrato.termino_contrato = "";
          return '——';
        }
        
        // var inicio_contrato = this.currentContrato.inicio_contrato;
        // this.currentContrato.termino_contrato = new Date(inicio_contrato.setMonth(inicio_contrato.getMonth() + this.currentContrato.duracion));
        // return this.currentContrato.termino_contrato;
      }
    },
    directives: { waves, permission, role  },
    methods: {
      checkPermission,
      /* Principales Funcinoes */
      async getList() {
        const { limit, page } = this.query;
        
        const { data, meta } = await contratoEmpleadoResource.contratosByEmpleado(this.currentEmpleado.id);
        console.log("GET LIST DATA");
        console.log(data);
        this.contratos = data;
        
        
      },
      async submitContrato(){
        if(this.currentContrato.sueldo == "" || this.currentContrato.sueldo < 1){
          this.$message.error('Ingresa un sueldo');
          return false;
        }

        if(this.currentContrato.inicio_contrato == ""){
          this.$message.error('Ingresa inicio del contrato');
          return false;
        }

        if(this.currentContrato.duracion == ""){
          this.$message.error('Ingresa duración del contrato');
          return false;
        }
        console.log("Current contrato");
        console.log(this.currentContrato);
        this.currentContrato.empleado_id = this.currentEmpleado.id;

        /*Se revisa si hay un contrato anterior, para quitarle la bandera de "ultimo_contrato" en la BD*/
        if(this.contratos.length == 0){
          this.currentContrato.ultimo_contrato = 0;
        }else{
          this.currentContrato.ultimo_contrato = this.contratos[this.contratos.length-1].id;
        }

        contratoResource.store({current: this.currentContrato}).then(response => {
          //showing succeful message
          console.log("RESPONSE: ");
          console.log(response);
          this.$message({ message: 'Contrato agregado correctamente.', type: 'success', duration: 5 * 1000, });
          //hidding form
          this.agregarContratoDialog = false;
          this.getList();
        })
        .catch(error => {
            console.log(error);
        });
        
      },
      
      /* LISTADO*/
      compareDates(date){
        var date = moment(date);
        var now = moment();
        if (now >= date) {
            return 'danger';
        } else if(date.diff(now, "days") < 6  && date.diff(now, "days") >= 0) {
            return 'warning';
        }
        return '';
      },
      handleCurrentChangeTable(val) {
        if(val != null){
          this.currentContrato = val;
        }
      },
      /*DIALOG METHODS*/
      open() {
        this.dialogoContrato = true;
        console.log("PARENT CURRENT:");
        console.log(this.$parent.current);
        this.currentEmpleado = this.$parent.current;
        this.dialogTitle = 'Contratos: ('+this.currentEmpleado.numero_empleado+') '+this.currentEmpleado.nombre+' '+this.currentEmpleado.apellidos;
        this.getList();
      },
      close() {
          //this.$parent.setCurrent();
          this.dialogoContrato = false;
      },
      handleClose(done) {
          this.$confirm('Está seguro que deseas salir?')
          .then(_ => {
              this.clearFields(); //limpiamos campos
              this.close(); //cerramos modal
          })
          .catch(_ => {});
      },
      /*DIALOG Print CONTRATO*/
      
      handlePrintContrato(){
        this.dialogoPrintContrato = true;
      },
      handleClosePrePrint(done) {
        this.$confirm('Está seguro que deseas salir?')
        .then(_ => {
            this.dialogoPrintContrato = false;
        })
        .catch(_ => {});
      },
      /*Agregar contrato Dialog*/
      closeAgregarDialog(){
        this.setCurrentAgregarContrato();
        this.agregarContratoDialog = false;
        this.clearCurrentContrato();
      },
      setCurrentAgregarContrato(row) {
        this.$refs.contratosList.setCurrentRow(row);
      },
      handleAddContrato(){
        if(this.contratos.length == 0){
          this.agregarContratoDialog = true;
          this.addContratoTitle = 'Agregar Contrato';
          this.clearCurrentContrato();
        }else{
          var fecha_termino_contrato = this.contratos[this.contratos.length-1].termino_contrato;
          console.log("COMPARAR FECHAS AGREGAR");
          console.log(this.compareDates(fecha_termino_contrato));
          if(this.compareDates(fecha_termino_contrato) != 'danger' || this.compareDates(fecha_termino_contrato) != 'warning'){
            this.$message({ type: 'warning', message: 'No puedes agregar otro contrato hasta que el contrato actual termine o este apunto de terminar.', });
          }else{
            this.agregarContratoDialog = true;
            this.addContratoTitle = 'Agregar Contrato';
            this.clearCurrentContrato();
          }
        }
      },
      handleEditContrato(){
        this.agregarContratoDialog = true;
        this.addContratoTitle = 'Editar Contrato';
      },
      deleteContrato(id){
        this.$confirm('Esto eliminara permanentemente la Orden Abierta. Quieres continuar?', 'Advertencia', {
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          type: 'warning',
        }).then(() => {
          //let me = this;
          //me.loading = true;
          contratoResource.destroy(this.currentContrato.id).then(response => {
            //showing succeful message
            console.log("DESTROY RESPONSE");
            console.log(response);
            this.$message({ message: response.message, type: response.type, duration: 5 * 1000, });
            //hidding form
            this.getList();
            this.agregarContratoDialog = false;
          })
          .catch(error => {
              console.log(error);
          });
        }).catch(() => {
            this.$message({ type: 'info', message: 'Eliminacion cancelada', });
        });
      },
      clearCurrentContrato(){
        this.currentContrato = {
          id:0,
          sueldo:0,
          inicio_contrato:'',
          termino_contrato:'',
          firmado:0,
        }
      },
      changeFinContrato(){
         if( this.currentContrato.inicio_contrato == "" || 
            this.currentContrato.duracion == 0 || 
            this.currentContrato.duracion == null || 
            this.currentContrato.duracion == -1){
          console.log("ENTRO A IF");
          this.currentContrato.termino_contrato = "";
          return '——';
        }
        
        console.log("NO ENTRO A IF");
       
        var inicio_contrato_aux = new Date(this.currentContrato.inicio_contrato);
        var termino_contrato_aux = new Date(inicio_contrato_aux.setMonth(inicio_contrato_aux.getMonth() + this.currentContrato.duracion));

        this.currentContrato.termino_contrato = termino_contrato_aux;
      }
    },
  };
</script>

    
