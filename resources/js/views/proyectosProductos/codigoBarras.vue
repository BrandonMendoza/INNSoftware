<template>

    <el-form  :model="form" ref="form" label-position="top" label-width="150px" >
        <el-dialog
        width="25%"
        id="dialogoCodigoBarras"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span slot="title"><svg-icon icon-class="process"/> Configuración de Codigo de Barras </span>
             
            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <!-- proyecto_producto_id -->
            <input v-model="form.id" hidden/> 
            
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- Tab Local -->
                <el-tab-pane label="Local" name="first">
                    <el-row>
                        <el-col :span="6">
                            <!--PDF BUTTON -->
                            <el-button v-waves type="primary" size="small" icon="el-icon-printer" @click="print('barcodeLocal')">Imprimir</el-button>
                        </el-col>
                        <el-col :span="6">
                            <!--DOWNLOAD BUTTON -->
                            <el-button v-waves type="primary" size="small" icon="el-icon-download" @click="download('barcodeLocal')">Descargar</el-button>
                        </el-col>
                        <el-col :span="18">
                            <!--INPIUT -->
                            <input v-model="form.numero_parte" hidden /><br>
                        </el-col>
                    </el-row>
                    
                    
                    

                     <div style="display: flex; justify-content: center;">
                        <!-- BARCODE -->
                        <div style="width:min-content; margin: 0 auto;" >
                            <img id="barcodeLocal" class="img-thumbnail" style="margin: 0 auto;" />
                        </div>
                    </div>
                </el-tab-pane>


                <!-- Tab Cliente -->
                <el-tab-pane label="Cliente" name="second">
                    <el-row>
                        <el-col :span="6">
                            <!--PDF BUTTON -->
                            <el-button v-waves type="primary" size="small" icon="el-icon-printer" @click="print('barcodeLocal')">Imprimir</el-button>
                        </el-col>
                        <el-col :span="6">
                            <!--DOWNLOAD BUTTON -->
                            <el-button v-waves type="primary" size="small" icon="el-icon-download" @click="download('barcodeCliente')">Descargar</el-button>
                        </el-col>
                        <el-col :span="12">
                            <!--INPIUT -->
                            <el-input size="small" v-model="form.codigo_barras_cliente" @blur="handleBlur();"/><br>
                        </el-col>
                    </el-row>
                    
                    <div style="display: flex; justify-content: center;">
                        <!-- BARCODE -->
                        <div style="width:min-content; margin: 0 auto;" >
                            <img id="barcodeCliente" class="img-thumbnail" style="margin: 0 auto;" />
                        </div>
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
            
            <span slot="footer" class="dialog-footer">
                <el-button v-waves @click="dialogoAgregar = false" class="float-left">Cerrar</el-button>
            </span>
        </el-dialog>

      
    </el-form>

    
</template>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
import JsBarcode from 'jsbarcode';
import Print from 'print-js';
import waves from '@/directive/waves'; // Waves directive

  export default {
    data() {
      return {
        form:{
            id:0,
            numero_parte:"",
            codigo_barras_cliente:"",
        },
        dialogoAgregar: false,
        dialogRef: 'codigoBarrasDialog',
        activeName:'first',
        loadingInstance:"",
      };
    },
    directives: { waves },
    components: { 
        
    },
    methods: {
        open() {
            this.activeName = 'first'
            this.dialogoAgregar = true;
            let me = this;
            this.$nextTick(function () {
                me.loadingInstance = this.$loading({ target: '#dialogoCodigoBarras > .el-dialog' });
                JsBarcode("#barcodeLocal", this.form.numero_parte);
                if(this.form.codigo_barras_cliente == ""){
                    JsBarcode("#barcodeCliente", this.form.numero_parte);
                }else{
                    JsBarcode("#barcodeCliente", this.form.codigo_barras_cliente);
                }
                me.loadingInstance.close();
            })
        },
        close() {
            this.dialogoAgregar = false;
        },
        clearFields(){/*Limpia los campos e inicializa la variable update a 0*/
            this.form.id = 0;
        },
        print(barcodeId) {
            printJS(barcodeId, 'html');
        },
        handleBlur(){
            this.loadingInstance = this.$loading({ target: '#dialogoCodigoBarras > .el-dialog' });
            if(this.form.codigo_barras_cliente == ""){
                this.form.codigo_barras_cliente = this.form.codigo_barras_cliente;
            }
            this.guardar();
            JsBarcode("#barcodeCliente", this.form.codigo_barras_cliente);
            this.loadingInstance.close();
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.dialogoAgregar = false;
            })
            .catch(_ => {});
        },
        guardar(){
            let me =this;
            let url = '/proyectosProductos/saveCodigoBarras';
            axios.put(url,me.form).then(function (response) {
                me.$message.success('Guardado correctamente.');
            })
            .catch(function (error) {
                me.close(); 
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        async download(barcodeId){
            var img = document.getElementById(barcodeId);
            var link = document.createElement("a");
            var url = img.getAttribute("src");
            link.setAttribute("href",url);
            link.setAttribute("download",this.form.numero_parte+'.png');
            link.click();
        },
    },
    mounted() {
        
    },


  };
</script>

    
