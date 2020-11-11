<template>

        <el-dialog
        width="23%"
        id="dialogoMenuCodigoBarras"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
        

        
            <span slot="title"><svg-icon icon-class="process"/> Menu del Producto: {{data.numero_parte}} </span>
            <el-row>
                
                     <!-- EDIT -->
                    <el-button  v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" 
                          @click="close();editar()">Editar</el-button>
                
                    <!-- PROCESO -->
                    <el-button v-waves type="primary" size="small" class="filter-item" title="Cambiar proceso" 
                        style="margin-left:0px;" @click="close();cambiarProceso();">
                        <svg-icon icon-class="process"/> Cambiar Proceso
                    </el-button>
                
                
                    <!-- CODIGO DE BARRAS -->
                    <el-button  v-waves type="primary" size="small" class="filter-item" icon="el-icon-tickets" title="Cambiar proceso" 
                                style="margin-left:0px;" @click="close();codigoBarras();">
                                Codigo de Barras
                    </el-button>
                
            </el-row>
            
            
            <br>
            <span v-if="data.proyecto" style="margin-right: 5px;"><b>Proyecto: </b> {{data.proyecto.numero_parte}}/{{data.proyecto.numero_parte_cliente}}</span>
            <br>
            <span v-if="data.producto">                          <b>Producto: </b> {{data.producto.numero_parte}}/{{data.producto.numero_parte_cliente}}</span>    
            <br>
            <br>
            <span>                         <b>Proceso: </b> 
                <el-tag  v-if="data.Proceso" :style="'font-weight: bold;background-color:'+data.Proceso.proyecto_proceso.proceso.color+';color:'+data.Proceso.proyecto_proceso.proceso.texto_color+';'">
                    <svg-icon icon-class="process" :style="'background-color:'+data.Proceso.proyecto_proceso.proceso.color+';color:'+data.Proceso.proyecto_proceso.proceso.texto_color+';'"/>
                        {{data.Proceso.proyecto_proceso.proceso.nombre}}
                </el-tag>
            </span> 
               
            
            
            <span slot="footer" class="dialog-footer">
                <el-button v-waves @click="dialogoAgregar = false" class="float-left">Cerrar</el-button>
            </span>
        
        </el-dialog>

    
</template>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
import JsBarcode from 'jsbarcode';
import Print from 'print-js';
import waves from '@/directive/waves'; // Waves directive

  export default {
    data() {
      return {
        dialogoAgregar: false,
        dialogRef: 'menuCodigoBarrasDialog',
        loadingInstance:"",
        data:{},
      };
    },
    directives: { waves },
    components: { 
    },
    methods: {
        open() {
            this.dialogoAgregar = true;
            this.$parent.setCurrent(this.data)
        },
        close() {
            this.dialogoAgregar = false;
        },
        cambiarProceso(){
            this.$parent.cambiarProceso(this.data);
        },
        codigoBarras(){
            this.$parent.codigoBarras(this.data);
        },
        editar(){
            this.$parent.loadFieldsUpdate(this.data);
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.dialogoAgregar = false;
            })
            .catch(_ => {});
        },
    },
    mounted() {
        
    },


  };
</script>

    
