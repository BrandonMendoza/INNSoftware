<template>
  <el-form :model="currentEmpleado" ref="EmpleadosHistorialForm" label-position="top"  label-width="150px">
    <el-dialog
    :ref="dialogRef"
    id="dialogoHistorial"
    :title="dialogTitle"
    width="40%"
    :visible.sync="dialogoHistorial">
     
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
        <el-tab-pane label="Historial" name="first">
          <el-row type="flex" justify="space-around" id="embarqueTransfer">
            <el-col>
              <el-table
              :data="historialEmpleado"
              ref="historialList"
              highlight-current-row
              sortable
              border
              tooltip-effect="light"
              fit
              style="width: 100%; word-wrap: break-word;">


                <el-table-column 
                  prop="tipo"
                  label="Alta/baja"
                  align="center">

                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.tipo == 1" type="success">ALTA</el-tag>
                    <el-tag v-if="scope.row.tipo == 0" type="danger">BAJA</el-tag>
                  </template>
                </el-table-column>
                <el-table-column 
                  prop="motivo"
                  label="Motivo"
                  align="center"/>

                <el-table-column 
                prop="created_at"
                label="Fecha"
                show-overflow-tooltip>

                  <template slot-scope="scope">
                      <el-tag>
                          {{scope.row.created_at | moment("YYYY-MMM-DD")}}
                      </el-tag>
                  </template>
                </el-table-column>

                <el-table-column 
                  prop="notas"
                  label="Notas"/>

              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogoHistorial = false;" class="float-left">Cerrar</el-button>
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
import HistorialAltaBajaEmpleado from '@/api/historialAltaBajaEmpleado';

const historialAltaBajaEmpleadoResource = new HistorialAltaBajaEmpleado('historialAltaBajaEmpleado');

  export default {
    data() {
      return {
        activeName:'first',
        historialEmpleado:[],
        currentEmpleado:{
          id:0,
        },
        /*Dialog*/
        dialogoHistorial:false,
        dialogTitle: '',
        dialogRef: 'EmpleadosHistorialDialog',
        /*Informacion principal*/
      };
    },
    computed:{ },
    directives: { waves, permission, role  },
    methods: {
      checkPermission,
      async submitAltaEmpleado(){
        // var loadingInstance = this.$loading({ target: '#dialogoHistorial > .el-dialog' });
        // this.currentContrato.empleado_id = this.currentEmpleado.id;
        // this.$refs['EmpleadosAltaForm'].validate((valid) => { //validacion del form
        //   if (valid) {
        //     contratoEmpleadoResource.storeAlta(this.currentContrato.empleado_id,{currentContrato:this.currentContrato}).then(response => {
        //       console.log("RESPONSE: ");
        //       console.log(response);
        //       this.$parent.getList();
        //       this.$message({ message: 'Contrato agregado correctamente.', type: 'success', duration: 5 * 1000, });
        //       this.dialogoHistorial = false;
        //       loadingInstance.close();
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });            
        //   }else{
        //     console.log(" no es valid");
        //     loadingInstance.close();
        //     return false;
        //   }
        // });
      },
      /* METODOS PRINCIPALES */
      async getList(){
        const { data, meta } = await historialAltaBajaEmpleadoResource.historialByEmpleado(this.currentEmpleado.id);
        console.log("DATA GET LIST");
        console.log(data);
        this.historialEmpleado = data;
      },
      /*DIALOG METHODS*/
      open() {
        this.dialogoHistorial = true;
        this.currentEmpleado = this.$parent.current;
        this.dialogTitle = 'Historial Altas Bajas: ('+this.currentEmpleado.numero_empleado+') '+this.currentEmpleado.nombre+' '+this.currentEmpleado.apellidos;
        this.getList();
      },
      close() {
          //this.$parent.setCurrent();
          this.dialogoHistorial = false;
      },
      handleClose(done) {
          this.$confirm('Está seguro que deseas salir?')
          .then(_ => {
              this.clearFields(); //limpiamos campos
              this.close(); //cerramos modal
          })
          .catch(_ => {});
      },
    }
  };
</script>

    
