<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <!-- BUSCAR INPUT -->
            <div class="filter-item">
                <el-input class="input-with-select" size="small" placeholder="buscar" v-model="presearch" @change="handlePresearchChange()" clearable>
                    <el-select v-model="selectSearch" slot="prepend" size="small" placeholder="Select">
                        <el-option label="Nom. del Proyecto"  value="numero_parte_cliente"></el-option>
                        <el-option label="Núm. de Parte (Local)"    value="numero_parte"></el-option>
                        <el-option label="Cliente"                  value="nombre_cliente"></el-option>
                    </el-select>
                    <el-button slot="append" v-waves size="small" type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
            
            <el-button v-waves type="primary" size="small" class="filter-item"  icon="el-icon-plus" style="margin-left:0px;" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" style="margin-left:0px;" :disabled="disableEditar" @click="loadFieldsUpdate(currentRow)">Editar</el-button>
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-document" style="margin-left:0px;"  :disabled="disableEditar" @click="loadDocumentos(currentRow)">Documentos</el-button>
            <el-button  v-waves type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="disableEditar"
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
            style="width: 100%"
            :row-class-name="tableRowClassName">
                <el-table-column
                type="index"
                align="center" 
                width="80"
                sortable
                fixed/>

                <el-table-column
                prop="numero_parte"
                label="Núm. de Parte (Local)"
                fixed/>  

                 <el-table-column
                prop="numero_parte_cliente"
                label="Núm. de Parte (Cliente)"
                fixed/> 

                <el-table-column
                prop="cliente.nombre_cliente"
                label="Cliente"
                show-overflow-tooltip
                fixed/>

                <el-table-column
                prop="peso_kg"
                label="Peso (kg)"
                show-overflow-tooltip
                align="center" 
                fixed>
                    <template slot-scope="scope">
                        <vue-numeric v-bind:precision="2" separator="," v-model="scope.row.peso_kg" :read-only="true"></vue-numeric>
                    </template>
                </el-table-column>

                <el-table-column
                prop="peso_lbs"
                label="Peso (lbs)"
                show-overflow-tooltip
                align="center" 
                fixed>
                    <template slot-scope="scope">
                        <vue-numeric v-bind:precision="2" separator="," v-model="scope.row.peso_lbs" :read-only="true"></vue-numeric>
                    </template>
                </el-table-column>
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
    .el-select .el-input {
        width: 180px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

  .el-table .danger-row {
    background: #FDE2E2;
  }

  .el-table .success-row {
    background: #E1F3D8;
  }

  .el-table .warning-row {
    background: #FAECD8;
  }
</style>

<script>
import formDialog from './Form';
import documentosDialog from './documentos';
import Pagination from '@/components/Pagination';
import waves from '@/directive/waves'; // Waves directive


    export default {
        data(){
            
            return{
                loading : true,
                list:[], //Este array contendrá las tareas de nuestra bd
                //PAGINATION INTENTO
                presearch:'',
                search: '',
                page: 1,
                pageSize: 10,
                total: 0,
                //SELECTROW
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
            //SELECTROW
            disableEditar() {
                if(this.currentRow == null){
                    return true;
                }
                return false;
            }
        },
        directives: { waves },
        components: { 
            formDialog : formDialog,
            documentosDialog : documentosDialog,
            Pagination
        },
        methods:{
            //SELECTROW
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
            tableRowClassName({row, rowIndex}) {
                if (parseInt(row.status_id) === 1) { //sin recibir
                    return 'danger-row';
                } else if (parseInt(row.status_id) === 2) {//recibido  
                    return 'success-row';
                }else if (parseInt(row.status_id) === 3) {//revisando  
                    return 'warning-row';
                }
                return '';
            },
            async getList(){
                let me =this;
                let url = '/productos';
                axios.get(url).then(function (response) {
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
                this.$refs.myForm.form.pintura_id = data.pintura_id;
                this.$refs.myForm.form.pintura_nombre = data.pintura.nombre;
                this.$refs.myForm.form.numero_parte = data.numero_parte;
                this.$refs.myForm.form.numero_parte_cliente = data.numero_parte_cliente;
                this.$refs.myForm.form.peso_kg = data.peso_kg;
                this.$refs.myForm.form.peso_lbs = data.peso_lbs;
                this.$refs.myForm.form.descripcion = data.descripcion;

                this.$refs.myForm.form.materiales = JSON.parse(JSON.stringify(data.materiales));
                this.$refs.myForm.form.accesorios = JSON.parse(JSON.stringify(data.accesorios));

                this.$refs.myForm.open();
            },
            loadDocumentos(data){
                this.$refs.documentosDialog.form.id = data.id;
                this.$refs.documentosDialog.form.numero_parte = data.numero_parte;
                this.$refs.documentosDialog.form.numero_parte_cliente = data.numero_parte_cliente;
                this.$refs.documentosDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.documentosDialog.open()
            },
            documentos(data){
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.open();
            },
            deleteRow(id,proyecto,proyecto_cliente){
                this.$confirm('Esto eliminara permanentemente el producto ' + proyecto + '/'+ proyecto_cliente +'. Quieres continuar?', 'Advertencia', {
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning',
                }).then(() => {
                    let me = this;
                    me.loading = true;
                    axios.post('/productos/delete',{'id':id}).then(function (response) {
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
            }
        },
        
        mounted() {
           this.getList();
        }
    }
</script>

