<template>
    <el-dialog
    width="30%"
    id="dialogoReportes"
    :ref="dialogRef"
    :visible.sync="dialogoReportes">
    
        <span slot="title">Reportes</span>
        <el-row>
        
            <!-- General 
            <el-button  v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" 
            @click="close();editar()">Reporte General</el-button>-->
            <el-button v-waves size="small" class="filter-item" type="primary" icon="el-icon-document" @click="close();reporteGeneral();"  style="margin-left:0px;">
                Reporte General
            </el-button>
            
            <!-- ORDENES TERMINADAS SIN EMBARCAR -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-document" title="Ordenes terminadas sin Embarcar" 
                style="margin-left:0px;" @click="close();reporteTerminadasSinEmbarcar();">Ordenes terminadas sin Embarcar
            </el-button>
        </el-row>
        
        
            
        
        
        <span slot="footer" class="dialog-footer">
            <el-button v-waves @click="dialogoReportes = false" class="float-left">Cerrar</el-button>
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
        dialogoReportes: false,
        dialogRef: 'reportesDialog',
        loadingInstance:"",
        data:{},
      };
    },
    directives: { waves },
    components: { 
    },
    methods: {
        open() {
            this.dialogoReportes = true;
        },
        close() {
            this.dialogoReportes = false;
        },
        reporteGeneral(){
            this.$parent.handleDownload();
        },
        reporteTerminadasSinEmbarcar(){
            var me = this;
            this.$parent.getListTerminadasSinEmbarcar().then(function () {
                me.$parent.handleSinEmbarcarDownload();
            });
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.dialogoReportes = false;
            })
            .catch(_ => {});
        },
    },
    mounted() {
        
    },


  };
</script>

    
