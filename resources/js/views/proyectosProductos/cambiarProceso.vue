<template>

    <el-form  :model="form" ref="form" label-position="top" label-width="150px" >
        <el-dialog
        width="40%"
        id="dialogoCambiarProceso"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span slot="title"><svg-icon icon-class="process"/> Cambiar Proceso </span>
             
            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <!-- proyecto_producto_id -->
            <input v-model="form.id" hidden/> 
            <input v-model="form.proyecto_id" hidden/>
            <input v-model="form.proceso_actual" hidden/>
            <input v-model="form.proceso_nuevo" hidden/>

            <el-row type="flex"  justify="space-around" style="font-size: 12px; margin-bottom:8px; ">
                <el-col style="text-align:right">
                    <el-button type="primary" size="mini" icon="el-icon-time" @click="dialogoHistorial = true; getHistorial();">Historial</el-button>
                </el-col>
            </el-row>
            <!-- Titulo de porcentaje -->
            <el-row type="flex"  justify="space-around" style="font-size: 12px;">
                <el-col>
                    Núm. de Parte: <span style="font-weight: bold;">{{form.numero_parte}}</span>
                </el-col>
            </el-row>
            <!-- Titulo de porcentaje -->
            <el-row type="flex"  justify="space-around" style="font-size: 12px;">
                <el-col>
                    Núm. de Parte (cliente): <span style="font-weight: bold;">{{form.numero_parte_cliente}}</span>
                </el-col>
            </el-row>
            
            <!-- Titulo de porcentaje -->
            <el-row type="flex"  justify="space-around">
                <el-col :span="3"></el-col>
                <el-col :span="8" class="text-center">
                    <h3>{{procesoActual.nombre}}</h3>
                </el-col>
                <el-col :span="3"></el-col>
            </el-row>
            <!-- Barra de progreso -->
            <el-row style="margin-bottom: 20px;">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" :color="procesoActual.color"></el-progress>
            </el-row>
            <el-row type="flex"  justify="space-around">
                <el-col :span="6" style="text-align:left;">
                    <el-button icon="el-icon-d-arrow-left" @click="increaseDecrease(-1)"></el-button>
                </el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6" style="text-align:right;" >
                    <el-button icon="el-icon-d-arrow-right" @click="increaseDecrease(1)"></el-button>
                </el-col>
            </el-row>
            <!--
            <el-row type="flex"  justify="space-around" style="margin-top: 20px;">
                <el-col :span="3"></el-col>
                <el-col :span="8" class="text-center">
                    <el-button icon="el-icon-plus" circle></el-button>    
                </el-col>
                <el-col :span="3"></el-col>
            </el-row>
            -->
            
                
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoAgregar = false" class="float-left">Cerrar</el-button>
                <el-button type="success" v-if="form.id != 0" @click="guardarProceso();" icon="el-icon-check">Guardar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo Agregar Doc -->
        <el-dialog
        id="dialogoHistorial"
        title="Historial de Procesos"
        :visible.sync="dialogoHistorial"
        width="50%">

            <el-table
            :data="historial"
            border
            fit
            highlight-current-row
            style="width: 100%">
                <el-table-column
                type="index"
                align="center" 
                width="60"/>

                <el-table-column
                label="Proceso"
                width="220">
                    <template slot-scope="scope">
                        <el-tag :style="'font-weight: bold;background-color:'+scope.row.proyecto_proceso.proceso.color+';color:'+scope.row.proyecto_proceso.proceso.texto_color+';'">
                            <svg-icon icon-class="process"/>
                            {{scope.row.proyecto_proceso.proceso.nombre}}
                        </el-tag>
                    </template>
                </el-table-column>  

                <el-table-column
                prop="iniciado_el"
                label="Fecha"
                align="center" 
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.iniciado_el == null ? '—' :  formatMoment(scope.row.iniciado_el) }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="user.name"
                label="Usuario"
                align="center" 
                show-overflow-tooltip/>
            </el-table>

            <div class="filter-container" hidden>
                <pagination 
                v-show="historial.length>0" 
                :total="historial.length" 
                :page.sync="listQuery.page" 
                :limit.sync="listQuery.limit" 
                @pagination="getHistorial" 
                layout="total, prev, pager, next"/>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoHistorial = false;" class="float-left">Cerrar</el-button>
            </span>
        </el-dialog>
    </el-form>

    
</template>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
import Pagination from '@/components/Pagination'; 
import moment from 'moment';

  export default {
    data() {
      return {
        orden:0,
        ordenMax:0,
        percentage: 0,
        procesoActual:"",
        procesoPrimero:[],
        procesoUltimo:[],
        procesos:[],
        listQuery: {
            page: 1,
            limit: 5,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: '+id',
        },
          /**Default variables  */
        form:{
            id:0,
            numero_parte:"",
            numero_parte_cliente:"",
            proyecto_id:0,
            proceso_actual:0,
            proceso_nuevo:0,
        },
        dialogoAgregar: false,
        dialogRef: 'cambiarProcesoDialog',
        dialogoDocumentos:false,
        dialogoHistorial:false,
        historial:[],
      };
    },
    components: {
        Pagination
    },
    methods: {
        open() {
            this.getProcesos();
            this.dialogoAgregar = true;
        },
        close() {
            this.dialogoAgregar = false;
        },
        clearFields(){/*Limpia los campos e inicializa la variable update a 0*/
            this.form.id = 0;
            this.form.documentos = [];
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.dialogoAgregar = false;
            })
            .catch(_ => {});
        },
        increaseDecrease(step){
            this.orden += step;
            if (this.orden > (this.ordenMax + 1)) {
                this.orden = (this.ordenMax + 1);
            }else{
                if (this.orden < 0){
                    this.orden = 0;
                }
            }
            this.calcularPorcentaje();
        },
        guardarProceso(){
            var loadingInstance = this.$loading({ target: '#dialogoCambiarProceso > .el-dialog' });
            if(this.form.proceso_actual == this.form.proceso_nuevo){
                this.$message('Nada que guardar.');
                loadingInstance.close();
                this.close(); 
                return false;
            }
            let me =this;
            let url = '/proyectosProductos/saveProceso';
            axios.put(url,me.form).then(function (response) {
                //creamos un array y guardamos el contenido que nos devuelve el response
                me.$parent.getList();
                loadingInstance.close();
                me.close(); 
            })
            .catch(function (error) {
                // handle error
                me.close(); 
                loadingInstance.close();
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        getProcesos(){
            let me =this;
            var loadingInstance = this.$loading({ target: '#dialogoCambiarProceso > .el-dialog' });
            let url = '/proyectosProductos/getProcesosByProducto';
            axios.put(url,me.form).then(function (response) {
                console.log("RESPUESTA: ");
                console.log(response);
                //creamos un array y guardamos el contenido que nos devuelve el response
                //procesos
                me.procesos = response.data.procesos;
                //proceso actual
                me.procesoActual = response.data.lastProceso.proyecto_proceso;
                me.form.proceso_actual = response.data.lastProceso.proyecto_proceso.id;
                me.form.proceso_nuevo = response.data.lastProceso.proyecto_proceso.id;
                //primer proceso
                me.procesoPrimero = response.data.procesoPrimero;
                //ultimo
                me.procesoUltimo = response.data.procesoUltimo;
                //orden Maximo
                me.ordenMax = Math.max.apply(Math, me.procesos.map(function(proceso) { 
                    return proceso.orden;  
                }));
                //orden
                if(me.procesoActual.es_primero == 1){
                    me.orden = 0;
                } else if(me.procesoActual.es_ultimo == 1){
                    me.orden = (me.ordenMax + 1);
                }else{
                    console.log("PROCESO ACTUAL");
                    console.log(me.procesoActual);
                    me.orden = me.procesoActual.orden
                }


                //cargar barra de porcentaje
                me.calcularPorcentaje();
                loadingInstance.close();
            })
            .catch(function (error) {
                // handle error
                me.close(); 
                loadingInstance.close();
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        calcularPorcentaje(){
            this.percentage = 0;
            var count = 0;
            //si es el primero acomodamos porcentajes
            if(this.orden == 0){
                this.percentage = 0;
                this.procesoActual = this.procesoPrimero.proceso;
                this.form.proceso_nuevo = this.procesoPrimero.id;
                return false;
            }
            //si es ultimo acomodamos porcentajes
            if(this.orden == (this.ordenMax + 1)){
                this.percentage = 100;
                this.procesoActual = this.procesoUltimo.proceso;
                this.form.proceso_nuevo = this.procesoUltimo.id;
                return false;
            }
            console.log("FOR PROCESOS: ----");
            for (var proceso of this.procesos) {
                if(parseInt(proceso.porcentaje) != 0){
                    this.percentage += parseInt(proceso.porcentaje);
                }
                console.log("---------------------");
                console.log(proceso);
                console.log(this.orden);
                if(this.orden == proceso.orden){
                    //cuando encuentras el proceso lo guardas en el proceso actual
                    this.procesoActual = proceso.proceso;
                    //asignamos el nuevo id del proceso
                    this.form.proceso_nuevo = proceso.id;
                    //si no se sale calculamos el porcentaje
                    if(proceso.porcentaje != 0 ){
                        this.percentage -= parseInt(proceso.porcentaje)/2;
                    }

                    return false;
                }
            }
        },
        async getHistorial(){
            let me =this;
            var loadingInstance = this.$loading({ target: '#dialogoHistorial > .el-dialog' });
            let url = '/proyectosProductos/getHistorialProcesos';
            axios.put(url,me.form).then(function (response) {
                //cargar barra de porcentaje
                me.historial = response.data;
                loadingInstance.close();
            })
            .catch(function (error) {
                loadingInstance.close();
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        formatMoment(date){
            return moment(date).format('DD') + ' de ' +moment(date).format('MMMM') + ' del ' + moment(date).format('YYYY HH:MM')
        },
    },
  };
</script>

    
