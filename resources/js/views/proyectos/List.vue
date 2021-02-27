<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <!-- BUSCAR INPUT -->
            <div class="filter-item" id="barra_busqueda">
                <el-input class="input-with-select" size="small" placeholder="buscar" v-model="presearch" @change="handlePresearchChange()" clearable>
                    <el-select v-model="selectSearch" slot="prepend" size="small" placeholder="Select">
                        <el-option label="Nom. del Proyecto"  value="numero_parte_cliente"></el-option>
                        <el-option label="Núm. de Parte (Local)"    value="numero_parte"></el-option>
                        <el-option label="Cliente"                  value="nombre_cliente"></el-option>
                    </el-select>
                    <el-button slot="append" v-waves size="small" type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
            <!-- Agregar -->
            <el-button v-waves v-permission="['agregar proyectos']" class="filter-item" type="primary" size="small" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
             <!-- Editar -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" style="margin-left:0px;" :disabled="disableEditar" @click="loadFieldsUpdate(currentRow)">Editar</el-button>
            <!-- Documentos -->
            <el-button v-waves v-permission="['ver documentos proyectos']" type="primary" size="small" class="filter-item" icon="el-icon-document" style="margin-left:0px;" :disabled="disableEditar" @click="loadDocumentos(currentRow)">Documentos</el-button>
            <!-- Eliminar -->
            <el-button v-waves v-permission="['eliminar proyectos']" type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="disableEditar"
                        @click="deleteRow(currentRow.id,currentRow.numero_parte,currentRow.numero_parte_cliente);">Eliminar</el-button>

        </div>
        <el-row >
            <el-table
            :data="displayData"
            ref="tableList" 
            highlight-current-row
            @current-change="handleCurrentChangeTable"
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
                width="110"
                sortable/>  

                 <el-table-column
                prop="orden_compra"
                label="Orden de Compra"
                show-overflow-tooltip/>

                <el-table-column
                prop="cliente.nombre_cliente"
                label="Cliente"
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
                v-if="checkPermission(['ver fecha entrega proyectos'])"
                show-overflow-tooltip
                sortable
                align="center"> 
                    <template slot-scope="scope">
                        <el-tag>
                            {{scope.row.fecha_entrega | moment("YYYY-MMM-DD")}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                label="Fecha Promesa"
                show-overflow-tooltip
                sortable
                align="center"> 
                    <template slot-scope="scope">
                        <el-tag>
                            {{scope.row.fecha_promesa | moment("YYYY-MMM-DD")}}
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
            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChangePagination"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </el-row>
        <formDialog  ref="myForm" />

        <documentosDialog  ref="documentosDialog" />
    </div>
</template>
<style>
    #barra_busqueda > .el-select .el-input {
        width: 180px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .el-table .cell {
        word-break: break-word;
    }

</style>
<script>
    import formDialog from './Form';
    import documentosDialog from './documentos';
    import Pagination from '@/components/Pagination';
    import waves from '@/directive/waves'; // Waves directive
    import permission from '@/directive/permission/index.js'
    import role from '@/directive/role/index.js'
    import checkPermission from '@/utils/permission';
    export default {
        data(){
            
            return{
                listUrl:'/proyectos',
                deleteUrl:'/proyectos/delete',
                loading : true,
                list:[],
                presearch:'',
                search: '',
                page: 1,
                pageSize: 10,
                total: 0,
                currentRow: null,
                selectSearch:'numero_parte_cliente'
            }
        },
        computed: {
            searching() {
                if (!this.search) {
                    this.total = this.list.length;
                    return this.list;
                }
                this.page = 1;
                if(this.selectSearch == "nombre_cliente"){
                   return this.list.filter(data => data['cliente']['nombre_cliente'].toLowerCase().includes(this.search.toLowerCase()));
                }
                return this.list.filter(data => data[this.selectSearch].toLowerCase().includes(this.search.toLowerCase()));
            },
            displayData() {
                this.total = this.searching.length;
                return this.searching.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
            },
            disableEditar() {
                if(this.currentRow == null){
                    return true;
                }
                return false;
            }
        },
        directives: { waves, permission, role },
        components: { 
            formDialog : formDialog,
            documentosDialog : documentosDialog,
            Pagination
        },
        methods:{
            checkPermission,
            setCurrent(row) {
                this.$refs.tableList.setCurrentRow(row);
            },
            //SELECTROW
            handleCurrentChangeTable(val) {
                this.currentRow = val;
            },
            handleCurrentChangePagination (val) {
                this.page = val
            },
            handlePresearchChange(){
                if(!this.presearch){
                    this.search = '';
                }
            },
            handleSearch () {
                this.search = this.presearch;
            },
            async getList(){
                let me = this;
                me.loading = true;
                axios.get(me.listUrl).then(function (response) {
                    me.list = response.data;
                    console.log(me.list);
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
                this.$refs.myForm.form.fecha_promesa = data.fecha_promesa;

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

