<template>
    <div class="app-container">
        <el-dialog
        class="dialogoPorcentaje"
        width="35%"
        :ref="dialogPorcentajeRef"
        :before-close="handleClose"
        :visible.sync="dialogoPorcentaje"> 

            <span slot="title"><i class="el-icon-s-operation"></i> Porcentaje Procesos</span>

            <el-row style="margin-bottom:10px;"> 
                <span v-if="porcentajeTotal > 100" style="color: red; margin-left: 20px;">{{  errorMsg }}</span>
            </el-row>
            <el-row style="margin-bottom:20px;">
                
                <el-progress 
                    :text-inside="true" 
                    :stroke-width="24" 
                    :percentage="porcentajeTotal > 100 ? 100 : porcentajeTotal"
                    :status="porcentajeTotal > 100 ? 'exception' : 'success'">
                </el-progress>
            </el-row>

            

            <el-row class="text-center" :gutter="30" v-for="proceso in procesos" :key="proceso.id" style="margin-bottom:15px;">
                <el-col :span="4" :style="{'background-color':proceso.color,'color':proceso.texto_color}"> 
                    <span>{{proceso.nombre}}  </span>
                </el-col>
                 <el-col :span="13">
                    
                    <vue-slider 
                    :ref="proceso.id" 
                    :min="min"
                    :max="max"
                    v-model="proceso.porcentaje"
                    @change="clearErrorMsg;slide()"
                    />
                    
                </el-col> <el-col :span="6">
                    <el-input-number size="mini" v-model="proceso.porcentaje" @change="slide()"></el-input-number>
                </el-col>
            </el-row>
            

            <!-- <vue-slider v-model="procesos.porcentaje"></vue-slider> -->
            

            <span slot="footer" class="dialog-footer">
              <el-button @click=" dialogoPorcentaje = false" class="float-left">Cancelar</el-button>            
              <el-button type="success" @click="guardarPorcentajes();" icon="el-icon-check">Guardar</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
 import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
  
export default {
    components: {
        VueSlider
    },
    data() {
        return {
            porcentajeTotal: 0,
            sortable: null,
            dialogoPorcentaje: false,
            dialogPorcentajeRef: 'dialogoPorcentaje', 
            listLoading : true,
            procesos:[],
            min: 0,
            max: 100,
            errorMsg: ''
        };
    },
    methods: {
        slide(){
            /*Calculamos el porcentaje total*/
            this.porcentajeTotal = 0;
            this.procesos.forEach((value, index) => {
                this.porcentajeTotal += this.procesos[index].porcentaje;
            });
            //si es mayor a 100 enviamos mensaje de error, si no, lo quitamos
            if(this.porcentajeTotal > 100){
                this.errorMsg = 'El porcentaje total debe de ser 100%, porcentaje total actual: '+this.porcentajeTotal+"%";
                return false;
            }else{
                this.errorMsg = '';
            }
        },
        guardarPorcentajes(){
            if(this.porcentajeTotal != 100){
                this.$message.error('El porcentaje total debe ser igual a 100%.');
                return false;
            }
            var loadingInstance = this.$loading({
                target: '.dialogoPorcentaje .el-dialog'
            });
            let me =this;
            axios.put('/procesos/updatePorcentaje',{'procesos':this.procesos}).then(function (response) {
                console.log("Response:");
                console.log(response);
            
                me.$parent.getProcesos();
                me.close(); //Cerramos dialogo
                loadingInstance.close();//paramos animacion de cargar
                me.notificarSuccess(); //notificamos
            })
            .catch(function (error) {
                notificarError();
                console.log(error);
            });
        },
        getProcesos(){
            var loadingInstance = this.$loading({
                target: '.dialogoPorcentaje .el-dialog'
            });
            let me =this;
            let url = '/procesos/order' //Ruta que hemos creado para que nos devuelva todas las tareas
            axios.get(url).then(function (response) {
                //creamos un array y guardamos el contenido que nos devuelve el response
                console.table("PROCESOS ORDER:");
                console.table(response.data);
                me.procesos = response.data;
                /*Calcular total*/
                me.porcentajeTotal = 0;
                me.procesos.forEach((value, index) => {
                    me.porcentajeTotal += me.procesos[index].porcentaje;
                });
                loadingInstance.close();
            })
            .catch(function (error) {
                // handle error
                loadingInstance.close();
                console.log(error);
            });
        },
        open() {
            this.dialogoPorcentaje = true;
            this.getProcesos();
        },
        close() {
            this.dialogoPorcentaje = false;
        },
        notificarSuccess() {
            this.$message({
                message: 'Guardado correctamente.',
                type: 'success'
            });
        },
        notificarError() {
            this.$message.error({
                message: 'Hubo un error.'
            });
        },
        clearErrorMsg() {
            this.errorMsg = ''
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
    },
};
</script>
