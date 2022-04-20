<template>

    <el-form  :model="form" :rules="rules" ref="formUpdateMultiple" label-position="top"  label-width="150px" >
        <el-dialog
        id="updateMultipleProyectosProductos"
        width="50%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-edit"></i> Edición Multiple de Ordenes Abiertas</span>

            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>    
            
            <br>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- Tab General -->

                        <el-tab-pane label="Procesos" name="first">

                            <el-row :gutter="20" v-permission="['view finanzas']">
                                <el-col :span="24">
                                    <el-form-item label="Comentarios">
                                        <el-input 
                                        type="textarea" 
                                        placeholder="Comentarios para todas las ordenes"
                                        resize="none"
                                        v-model="form.comentario_general"
                                        :autosize="{ minRows: 3, maxRows: 16}"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-table
                            :data="form.productosSelect"
                            border
                            fit
                            style="width: 100%">


                                <af-table-column
                                label="Proceso"
                                fixed> 
                                    <template slot-scope="scope">
                                        <el-select 
                                        :loading="loadingProductoSelected"
                                        v-model="scope.row.Proceso.proyecto_proceso.proceso.nombre"
                                        @change="changeProyectoProceso(scope)"
                                        @focus="focusProductSelect(scope)"
                                        value-key="proyecto_proceso.proceso.nombre"
                                        placeholder="Select">
                                            <el-option
                                            :style="'font-weight: bold;background-color:'+procesoProy.color+';color:'+procesoProy.texto_color+';'"
                                            v-for="procesoProy in scope.row.proyecto.procesos"
                                            :key="procesoProy.id"
                                            :label="procesoProy.proceso.nombre"
                                            :value="procesoProy.proceso.nombre">
                                                <span :style="'font-weight: bold;background-color:'+procesoProy.color+';color:'+procesoProy.texto_color+';'">
                                                    {{ procesoProy.proceso.nombre }}
                                                </span>
                                            </el-option>
                                        </el-select>
                                        <!--
                                        <el-tag  :style="'font-weight: bold;background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'">
                                            <svg-icon icon-class="process" :style="'background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'"/>
                                            {{scope.row.Proceso.proyecto_proceso.proceso.nombre}}
                                        </el-tag>
                                        -->

                                    </template>

                                </af-table-column> 

                                <af-table-column
                                prop="numero_parte"
                                label="Orden"
                                show-overflow-tooltip
                                width="110"
                                fixed/> 

                                <af-table-column
                                prop="numero_parte_cliente" 
                                label="Producto (cliente)"
                                show-overflow-tooltip
                                width="110"
                                fixed/>

                                <af-table-column
                                prop="producto.nombre_producto" 
                                label="Nombre del Producto"
                                show-overflow-tooltip
                                fixed/>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="General">

                            <el-row :gutter="20">
                                <el-col :span="12" v-if="checkPermission(['ver fecha entrega proyectos'])">
                                    <el-form-item label="Fecha de Entrega" prop="fecha_entrega">
                                        <el-date-picker :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.fecha_entrega" type="date" format="dd-MMMM-yyyy" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Fecha Promesa" prop="fecha_promesa">
                                        <el-date-picker :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.fecha_promesa" type="date" format="dd-MMMM-yyyy"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-row :gutter="20">
                                <el-col :span="12">
                                   <el-form-item label="Orden de Trabajo">
                                        <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.work_order"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Item">
                                        <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.item"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="20" v-permission="['view finanzas']">
                                <el-col :span="12">
                                    <el-form-item label="Precio (pesos)">
                                        <vue-numeric :disabled="!checkPermission(['editar ordenes abiertas'])" class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="form.precio_pesos"></vue-numeric>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Precio (dlls)">
                                        <vue-numeric :disabled="!checkPermission(['editar ordenes abiertas'])" class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="form.precio_dlls"></vue-numeric>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            

                            <!--
                            <el-row :gutter="20" >
                                <el-col :span="12">
                                    <el-form-item label="Plan de Corte">
                                        <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.plan_corte"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    
                                </el-col>
                            </el-row>
                            -->

                            
                            

                            <el-form-item label="Heat Number" hidden>
                                <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.heat_number" />
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button v-waves @click="clearFields();close();" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button v-waves type="success" v-if="form.id == 0" @click="insertMultipleOrdenesAbiertas();" icon="el-icon-check">Guardar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button v-waves type="success" v-if="form.id != 0" @click="insert('form');" icon="el-icon-check">Guardar</el-button>
            </span>
        </el-dialog>

        
    </el-form>

    
</template>
<style scoped>
    .color {
        width: 100%;
    }

    .el-input--suffix {
        background-color: #FF0000;
    }
</style>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
import moment from 'moment';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive

import permission from '@/directive/permission/index.js'
import role from '@/directive/role/index.js'
import checkPermission from '@/utils/permission';
import ProyectoProductoResource from '@/api/proyectoProducto';


const proyectoProductoResource = new ProyectoProductoResource('proyectosProductos');
  export default {
    data() {
      return {
        clientes:[],
        productosSelect:[],
        procesosByProducto:[],
        activeName: 'first',
        loadingProductoSelected:true,
        form:{
            id:0,
            numero_parte:"",
            cantidad:"",
            fecha_entrega:"",
            fecha_promesa:"",
            item:"",
            work_order:"",
            heat_number:"",
            proyecto:"",
            producto:"",
            producto_local:"",
            notas:"",
            precio_pesos:"",
            precio_dlls:"",
            plan_corte:"",
            documentos:[],
            comentario_general:"",
            productosSelect:[],
            productosActuales:[],

        },
        rules: {
            // numero_parte_cliente: [
            //       { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            // ],
            // cliente_id: [
            //     { required: true, message: 'Selecciona un cliente', trigger: 'change' },
            // ],
            // fecha_entrega: [
            //     { required: true, message: 'Selecciona una fecha de entrega', trigger: 'blur' },
            // ],
        },
        dialogoAgregar: false,
        dialogRef: 'formMultipleUpdate',
        dialogoProductos:false,
        loadingCliente:false,
        /*Documentos*/
        dialogoDocumentos:false,
        fileList: [],
      };
    },
    directives: { waves, permission, role  },
    mounted() {
        
    },
    methods: {
        checkPermission,
        async insertMultipleOrdenesAbiertas(){
            console.log("INSERT FORM");
            console.log(this.form);
            var loadingInstance = this.$loading({
                target: '#updateMultipleProyectosProductos > .el-dialog'
            });
            const data = await proyectoProductoResource.insertMultipleOrdenesAbiertas(this.form);
            this.$parent.getList();
            this.$parent.showMultipleSelection = false;            
            this.clearFields();
            this.close();
            loadingInstance.close();
        },
        changeProyectoProceso(scope) {
            if(scope.row.Proceso.proyecto_proceso.proceso.nombre != ""){
                scope.row.proyecto.procesos.forEach(proceso => {
                    if(proceso.proceso['nombre'] == scope.row.Proceso.proyecto_proceso.proceso.nombre){
                        scope.row.Proceso.proyecto_proceso.id = proceso.id;
                    }
                });
            }
        },
        async focusProductSelect(scope) {
            this.loadingProductoSelected = true;
            var aux = scope.row;
            console.log("SI ENTRA");
            console.log(aux)
            await this.getProcesos(scope.row).then(response => {
                scope.row.proyecto.procesos = response;
            });
            this.loadingProductoSelected = false;
            this.$forceUpdate();
            console.log(scope.row)
        },
        ForcesUpdateComponent() {
            this.$forceUpdate();
        },
         open() {
            // var loadingInstance = this.$loading({target: '#updateMultipleProyectosProductos > .el-dialog'});

            // this.form.productosSelect.forEach(proyectoProducto => {
            //     this.getProcesos(proyectoProducto).then(function (response) {
            //         console.log("RESPONSE GET PROCESOS");
            //         console.log(response);
            //         proyectoProducto.proyecto.procesos = response;
            //     });
            //     proyectoProducto.proyecto.procesos = this.getProcesos(proyectoProducto);
            // });
            // console.log("DESPUES DE GET PROCESOS");
            // console.log(this.form.productosSelect);
            
            // this.cargandoProcesosSelect = false;
            // loadingInstance.close();
            // this.form.productosSelect.forEach(async proyectoProducto => {
            //     proyectoProducto.proyecto.procesos = await this.getProcesos(proyectoProducto);
            // });
            this.loadingSelectProceso = false;
            
            this.activeName = 'first';
            this.ForcesUpdateComponent();
            this.dialogoAgregar = true;
            
            
        },
        close() {
            this.$parent.setCurrent();
            this.dialogoAgregar = false;
        },
        clearFields(){/*Limpia los campos e inicializa la variable update a 0*/
            this.form.id = 0;
            this.form.numero_parte = "";
            this.form.cantidad = "";
            this.form.item = "";
            this.form.work_order = "";
            this.form.heat_number = "";
            this.form.notas = "";
            this.form.proyecto = "";
            this.form.producto = "";
            this.form.producto_local = "";
            this.form.fecha_entrega = "";
            this.form.fecha_promesa = "";
            this.form.precio_pesos = 0;
            this.form.precio_dlls = 0;
            this.form.plan_corte = "";
        },
        async getProcesos(proyectoProducto){
            const data = await proyectoProductoResource.getProcesosFromProyectoProducto(proyectoProducto);
            return data;

        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
    },
  };
</script>

    
