<template>
    <div class="app-container">

        
        <div class="filter-container">
            <router-link :to="'/ordenesAbiertas/UploadExcel'">
                <el-button type="primary" icon="el-icon-edit">
                    Importar    
                </el-button>
            </router-link>
            <!-- <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()" hidden>Agregar</el-button> -->
        </div>
        <el-row >
            <el-table
            :data="list"
            border
            tooltip-effect="light"
            fit
            v-loading="loading"
            style="width: 100%; word-wrap: break-word;">
                <el-table-column
                type="index"
                align="center"
                fixed/>

                <el-table-column
                label="Proceso"
                width="150">
                    <template slot-scope="scope">
                        <el-tag :style="'font-weight: bold;background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'">
                            <svg-icon icon-class="process" :style="'background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'"/>
                            {{scope.row.Proceso.proyecto_proceso.proceso.nombre}}
                        </el-tag>
                    </template>
                </el-table-column>  

                 <el-table-column
                prop="proyecto.cliente.nombre_cliente"
                label="Cliente"/> 

                <el-table-column
                prop="producto.numero_parte"
                label="Núm. de Parte"
                show-overflow-tooltip
                width="110"/>

                <el-table-column
                prop="producto.numero_parte_cliente"
                label="Núm. de Parte (cliente)"
                show-overflow-tooltip
                width="110"/>

                <el-table-column
                prop="proyecto.numero_parte"
                label="Proyecto"
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
                show-overflow-tooltip/>

                <el-table-column
                prop="item"
                label="Item"
                align="center"
                show-overflow-tooltip/>

                <el-table-column
                prop="proyecto.orden_compra"
                label="Orden de Compra"
                show-overflow-tooltip/>

                <el-table-column
                prop="fecha_entrega"
                label="Fecha de Entrega"
                width="110"
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
                align="center"
                width="110">
                    <template slot-scope="scope">
                        <span>{{scope.row.producto.peso_lbs+" lbs/"+scope.row.producto.peso_kg+" kgs"}}</span>
                    </template>
                </el-table-column>               

                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="170">
                    <template slot-scope="scope">
                        <el-button type="primary" title="Editar proceso" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="primary" title="Cambiar proceso" size="mini" @click="cambiarProceso(scope.row);"><svg-icon icon-class="process" /></el-button>
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
</style>
<script>
import formDialog from './Form';
import cambiarProcesoDialog from './cambiarProceso';
import Pagination from '@/components/Pagination'; 
import moment from 'moment';


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
                axios.get(me.listUrl).then(function (response) {
                    //creamos un array y guardamos el contenido que nos devuelve el response
                    console.table("RESPONSE:");
                    console.log(response.data);
                    console.table(response.data);
                    me.list = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    // handle error
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){ 
                console.log("Load fields update DATA:");
                console.log(data);

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
                    console.log("Response:");
                    console.log(response);
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
            }
        },
        mounted() {
           this.getList();
        }
    }
</script>

