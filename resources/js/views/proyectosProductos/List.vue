<template>
    <div class="app-container">

        
        <div class="filter-container">
            <router-link :to="'/ordenesAbiertas/UploadExcel'">
                <el-button type="primary" icon="el-icon-edit">
                    Importar    
                </el-button>
            </router-link>
            
            <el-popover
            placement="right"
            width="400"
            trigger="click">    
                <el-checkbox v-model="showProyecto" class="filter-item" style="margin-left:15px;">Ver Proyecto</el-checkbox>
                <el-checkbox v-model="showProducto" class="filter-item" style="margin-left:15px;">Ver Producto</el-checkbox>

                
                <el-button type="primary" icon="el-icon-setting" slot="reference">Columnas</el-button>
            </el-popover>
            <!-- <el-checkbox v-model="filtrarTerminados" class="filter-item" style="margin-left:15px;">Mostrar Ordenes Terminadas</el-checkbox> -->
            <!-- <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()" hidden>Agregar</el-button> -->
        </div>
        <el-row >
            <el-table
            :data="list"
            sortable
            border
            tooltip-effect="light"
            fit
            v-loading="loading"
            style="width: 100%; word-wrap: break-word;">
                <el-table-column
                type="index"
                align="center"
                sortable
                fixed/>

                <el-table-column
                label="Proceso"
                prop="Proceso.proyecto_proceso.proceso.nombre"
                :filters="procesosFiltroList"
                :filter-method="filterProcesoHandler"
                sortable
                width="150">
                    <template slot-scope="scope">
                        <el-tag :style="'font-weight: bold;background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'">
                            <svg-icon icon-class="process" :style="'background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'"/>
                            {{scope.row.Proceso.proyecto_proceso.proceso.nombre}}
                        </el-tag>
                    </template>
                </el-table-column>  

                <el-table-column
                prop="producto.numero_parte"
                label="Núm. de Parte"
                show-overflow-tooltip
                width="110"
                v-if="showProducto"/>

                <el-table-column
                v-if="showProyecto"
                prop="proyecto.numero_parte"
                label="Proyecto"
                show-overflow-tooltip
                width="110"/>

                 <el-table-column
                prop="proyecto.cliente.nombre_cliente"
                :filters="clientesFiltroList"
                :filter-method="filterClienteHandler"
                label="Cliente"/> 

                <el-table-column
                prop="producto.numero_parte_cliente"
                label="Núm. de Parte (cliente)"
                show-overflow-tooltip
                width="110"/>

                <el-table-column
                prop="cantidad"
                label="Cantidad"
                show-overflow-tooltip
                width="85"
                align="center"  />
                
                <el-table-column
                prop="work_order"
                label="Orden de Trabajo"
                align="center"
                width="100"
                show-overflow-tooltip/>

                <el-table-column
                prop="item"
                label="Item"
                align="center"
                width="80"
                show-overflow-tooltip/>

                <el-table-column
                prop="proyecto.orden_compra"
                label="Orden de Compra"
                width="100"
                show-overflow-tooltip/>

                <el-table-column
                prop="fecha_entrega"
                label="Fecha de Entrega"
                width="110"
                sortable
                show-overflow-tooltip> 
                    <template slot-scope="scope">
                        <el-tag :type="compareDates(scope.row.fecha_entrega)">
                            {{scope.row.fecha_entrega | moment("YYYY-MMM-DD")}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                prop="proyecto.plan_corte"
                label="Plan de Corte"
                show-overflow-tooltip/>

                <el-table-column
                label="Peso"
                show-overflow-tooltip
                width="200">
                    <template slot-scope="scope">

                        <span>{{ Number(scope.row.producto.peso_lbs).toLocaleString()+" lbs/"+Number(scope.row.producto.peso_kg).toLocaleString()+" kgs"}}</span>
                    </template>
                </el-table-column> 

                <el-table-column
                label="Notas"
                min-width="150px">
                    <template slot-scope="scope">
                        <span class="pre-formateado">{{ scope.row.notas }}</span>
                        <!-- <template v-for="line in scope.row.notas.split('\n')">{{line}}<br></template> -->
                    </template>
                </el-table-column> 

                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="170">
                    <template slot-scope="scope">
                        <el-button type="primary" title="Cambiar proceso" size="mini" @click="cambiarProceso(scope.row);"><svg-icon icon-class="process" /></el-button>
                        <el-button type="primary" title="Editar proceso" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <!-- <el-button type="primary" size="mini" @click="loadDocumentos(scope.row);">Docs</el-button>
                        <el-button type="danger" size="mini" @click="deleteRow(scope.row.id);">Eliminar</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination v-show="list.length>0" :total="list.length" :page.sync="list.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
        <formDialog  ref="myForm" />

        <cambiarProcesoDialog  ref="cambiarProcesoDialog" />
    </div>
</template>
<style>
  .el-table .cell {
    word-break: break-word;
    }

    .pre-formateado {
        white-space: pre;
    }
</style>
<script>
import formDialog from './Form';
import cambiarProcesoDialog from './cambiarProceso';
import Pagination from '@/components/Pagination'; 
import moment from 'moment';
import uniq from 'lodash/uniq'


    export default {
        data(){
            
            return{
                listUrl:'/proyectosProductos',
                deleteUrl:'/proyectosProductos/delete',
                loading : true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id',
                },
                list:[],
                showProyecto:false,
                showProducto:false,
                filtrarTerminados:false,
                procesosFiltroList:[],
                clientesFiltroList:[],
            }
        },
        components: { 
            formDialog : formDialog,
            cambiarProcesoDialog : cambiarProcesoDialog,
            Pagination
        },
        methods:{
            async getList(){
                let me = this;
                me.loading = true;
                axios.get(me.listUrl,me.filtrarTerminados).then(function (response) {
                    me.list = response.data;
                    me.cargarProcesosFiltro();
                    me.cargarClientesFiltro();
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            cargarProcesosFiltro(){
                var filtroItem = {};
                for (var openOrder of this.list) {
                    filtroItem = {
                        value: openOrder.Proceso.proyecto_proceso.proceso.nombre,
                        text: openOrder.Proceso.proyecto_proceso.proceso.nombre
                    };
                    this.procesosFiltroList.push(filtroItem);
                }
                
                var auxList = _.uniqBy(this.procesosFiltroList, 'value')
                this.procesosFiltroList = auxList;
            },
            cargarClientesFiltro(){
                var filtroItem = {};
                for (var openOrder of this.list) {
                    filtroItem = {
                        value: openOrder.proyecto.cliente.nombre_cliente,
                        text: openOrder.proyecto.cliente.nombre_cliente
                    };
                    this.clientesFiltroList.push(filtroItem);
                }
                
                var auxList = _.uniqBy(this.clientesFiltroList, 'value')
                this.clientesFiltroList = auxList;
            },
            loadFieldsUpdate(data){ 
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.cantidad = data.cantidad;
                this.$refs.myForm.form.item = data.item;
                this.$refs.myForm.form.work_order = data.work_order;
                this.$refs.myForm.form.heat_number = data.heat_number;
                this.$refs.myForm.form.fecha_entrega = data.fecha_entrega;
                this.$refs.myForm.form.proyecto = data.proyecto.numero_parte;
                this.$refs.myForm.form.producto = data.producto.numero_parte_cliente;
                this.$refs.myForm.form.producto_local = data.producto.numero_parte;
                this.$refs.myForm.form.notas = data.notas;

                

                this.$refs.myForm.open();
            },
            cambiarProceso(data){
                this.$refs.cambiarProcesoDialog.form.id = data.id;
                this.$refs.cambiarProcesoDialog.form.numero_parte = data.producto.numero_parte;
                this.$refs.cambiarProcesoDialog.form.numero_parte_cliente = data.producto.numero_parte_cliente;
                this.$refs.cambiarProcesoDialog.form.proyecto_id = data.proyecto_id;
                // this.$refs.cambiarProcesoDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.cambiarProcesoDialog.open()
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                axios.post(me.deleteUrl,{'id':id}).then(function (response) {
                    me.getList();   
                    me.$message.success('Eliminado correctamente.');
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                    me.loading = false;
                });
            },
            /**Funcion para darle clase a el TAG de acuerdo a la feche de entrega */
            compareDates(date){
                var date = moment(date);
                var now = moment();
                if (now >= date) {
                    return 'danger';
                } else if(date.diff(now, "days") < 3  && date.diff(now, "days") >= 0) {
                    return 'warning';
                }

                return 'success';
            },
            filterProcesoHandler(value, row, column) {
                const property = column['property'];
                return row["Proceso"]["proyecto_proceso"]["proceso"]["nombre"] === value;
            },
            filterClienteHandler(value, row, column) {
                const property = column['property'];
                return row["proyecto"]["cliente"]["nombre_cliente"] === value;
            },
        },
        mounted() {
           this.getList();
        }
    }
</script>

