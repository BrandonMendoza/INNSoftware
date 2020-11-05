<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
        </div>
        <el-row >
            <el-table
            :data="displayData"
            border
            tooltip-effect="light"
            fit
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                type="index"
                align="center"
                sortable
                fixed/>

                <el-table-column
                prop="numero_parte"
                label="Núm. de Parte (Local)"
                width="110"/>  

                 <el-table-column
                prop="numero_parte_cliente"
                label="Nombre del Proyecto"/> 

                <el-table-column
                prop="cliente.nombre_cliente"
                label="Cliente"
                show-overflow-tooltip/>

                <el-table-column
                prop="orden_compra"
                label="Orden de Compra"
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
                    <template slot="header">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="buscar"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="primary" size="mini" @click="loadDocumentos(scope.row);">Docs</el-button>
                        <el-button type="danger" size="mini" @click="deleteRow(scope.row.id,scope.row.numero_parte);">Eliminar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
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
                list:[],
                search: '',
                page: 1,
                pageSize: 10,
                total: 0
            }
        },
        computed: {
            searching() {
                if (!this.search) {
                    this.total = this.list.length;
                    return this.list;
                }
                this.page = 1;
                var resultData = this.list.filter(data => data.numero_parte.toLowerCase().includes(this.search.toLowerCase()));
                if(resultData.length == 0){
                    resultData = this.list.filter(data => data.numero_parte_cliente.toLowerCase().includes(this.search.toLowerCase()));
                }
                return resultData;
            },
            displayData() {
                this.total = this.searching.length;
                return this.searching.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
            }
        },
        components: { 
            formDialog : formDialog,
            documentosDialog : documentosDialog,
            Pagination
        },
        methods:{
            handleCurrentChange (val) {
                this.page = val
            },
            async getList(){
                let me = this;
                axios.get(me.listUrl).then(function (response) {
                    me.list = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.cliente_id = data.cliente_id;
                this.$refs.myForm.form.cliente_nombre = data.cliente.nombre_cliente;
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
                this.$refs.documentosDialog.form.numero_parte = data.numero_parte;
                this.$refs.documentosDialog.form.numero_parte_cliente = data.numero_parte_cliente;
                this.$refs.documentosDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.documentosDialog.open()
            },
            deleteRow(id,proyecto){
                this.$confirm('Esto eliminara permanentemente el proyecto ' + proyecto + '. Quieres continuar?', 'Advertencia', {
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning',
                }).then(() => {
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
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: 'Eliminacion cancelada',
                    });
                });
            },
        },
        mounted() {
           this.getList();
        }
    }
</script>

