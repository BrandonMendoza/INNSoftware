<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
        </div>
        <el-row >
            <el-table
            :data="list"
            border
            tooltip-effect="light"
            fit
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                type="index"
                align="center"
                fixed/>

                <el-table-column
                prop="numero_parte"
                label="Núm. de Parte (Local)"
                width="110"/>  

                 <el-table-column
                prop="numero_parte_cliente"
                label="Núm. de Parte (Cliente)"/> 

                <el-table-column
                prop="cliente.nombre_cliente"
                label="Cliente"
                show-overflow-tooltip/>

                <el-table-column
                prop="orden_compra"
                label="Orden de Compra"
                show-overflow-tooltip/>

                <el-table-column
                prop="plan_corte"
                label="Plan de Corte"
                show-overflow-tooltip/>

                <el-table-column
                label="Progreso"
                show-overflow-tooltip
                width="260">
                    <template slot-scope="scope">
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="parseInt(scope.row.progreso)"></el-progress>
                    </template>
                </el-table-column>

                <el-table-column
                label="Fecha de Entrega"
                show-overflow-tooltip
                align="center"> 
                    <template slot-scope="scope">
                        <el-tag>
                            {{scope.row.fecha_entrega | moment("YYYY-MMM-DD")}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                prop="totalHrsLabor"
                label="Hrs Labor"
                show-overflow-tooltip
                align="center"/>

                <el-table-column
                prop="productos.length"
                label="Productos"
                show-overflow-tooltip
                align="center"/>

                

                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="270">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="primary" size="mini" @click="loadDocumentos(scope.row);">Docs</el-button>
                        <el-button type="danger" size="mini" @click="deleteRow(scope.row.id);">Eliminar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination v-show="list.length>0" :total="list.length" :page.sync="list.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
        <formDialog  ref="myForm" />

        <documentosDialog  ref="documentosDialog" />
    </div>
</template>
<style>
    .el-table .cell {
        word-break: break-word;
    }
</style>
<script>
import formDialog from './Form';
import documentosDialog from './documentos';
import Pagination from '@/components/Pagination'; 


    export default {
        data(){
            
            return{
                listUrl:'/proyectos',
                deleteUrl:'/proyectos/delete',
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
            documentosDialog : documentosDialog,
            Pagination
        },
        methods:{
            async getList(){
                let me = this;
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
                console.log("LOad fields update DATA:");
                console.log(data);
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.cliente_id = data.cliente_id;
                this.$refs.myForm.form.numero_parte_cliente = data.numero_parte_cliente;
                this.$refs.myForm.form.numero_parte = data.numero_parte;
                this.$refs.myForm.form.orden_compra = data.orden_compra;
                this.$refs.myForm.form.plan_corte = data.plan_corte;
                this.$refs.myForm.form.fecha_entrega = data.fecha_entrega;

                this.$refs.myForm.form.productos = JSON.parse(JSON.stringify(data.productos));

                this.$refs.myForm.open();
            },
            loadDocumentos(data){
                this.$refs.documentosDialog.form.id = data.id;
                console.log("DOCUMENTOS:");
                console.log(data.documentos);
                this.$refs.documentosDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.documentosDialog.open()
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
        },
        
        mounted() {
           this.getList();
        }
    }
</script>

