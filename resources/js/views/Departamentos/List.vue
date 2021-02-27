<template>
    <div class="app-container">

        <!-- BARRA DE ACCIONES -->
        <div class="filter-container">
            <el-row >
                <el-col style="width: 56%;margin-right:10px;">
                    <!-- AGREGAR -->
                    <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus"  style="margin-left:0px;"  @click="handleCreateForm()">
                        Agregar Departamento
                    </el-button>
                    <!-- EDIT -->
                    <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit"  style="margin-left:0px;"  :disabled="disableEditar"  @click="handleEditForm()">
                        Editar Departamento
                    </el-button>
                
                    <!-- DELETE 
                    <el-button v-waves type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="true"
                        @click="deleteRow(current);">Eliminar</el-button> -->
                </el-col>
                <el-col style="width: 40%;">
                    <!-- AGREGAR -->
                    <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus" :disabled="disableAgregarPuestos" @click="handleAddPuesto()">
                        Agregar Puesto
                    </el-button>
                    <!-- EDIT -->
                    <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit"  style="margin-left:0px;"  :disabled="disableEditarPuestos"  
                        @click="handleEditFormPuestos()">Editar Puesto</el-button>
                    <!-- DELETE 
                    <el-button v-waves type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="disableEditarPuestos"
                        @click="deleteRowPuesto(current);">Eliminar Puesto</el-button> -->
                </el-col>
            </el-row>
            
        </div>
        <!-- TABLE -->
        <el-row >
            <el-col style="width: 56%;margin-right:10px;">
                <el-table
                :data="list"
                ref="tableList" 
                highlight-current-row
                @current-change="handleCurrentChangeTable"
                sortable
                border
                tooltip-effect="light"
                fit
                v-loading="loading"
                style="width: 100%; word-wrap: break-word;">
                    
                    
                    <af-table-column
                    type="index"
                    align="center"
                    sortable
                    fixed/>

                    <el-table-column 
                    prop="nombre"
                    label="Nombre"
                    show-overflow-tooltip/>

                    <el-table-column 
                    prop="simbolo"
                    label="Simbolo"
                    align="center"
                    show-overflow-tooltip/>

                    <el-table-column 
                    prop="descripcion"
                    label="Descripcion"
                    show-overflow-tooltip/>

                </el-table>
            </el-col>
            <el-col style="width: 40%; ">
               <el-table
                :data="listPuestos"
                ref="tableListPuestos" 
                highlight-current-row
                @current-change="handleCurrentChangeTablePuestos"
                sortable
                border
                tooltip-effect="light"
                fit
                v-loading="loadingPuestos"
                style="width: 100%; word-wrap: break-word;">
                    <af-table-column
                    type="index"
                    align="center"
                    sortable
                    fixed/>

                    <el-table-column 
                    prop="nombre"
                    label="Nombre"
                    show-overflow-tooltip/>

                    <el-table-column 
                    prop="simbolo"
                    label="Simbolo"
                    align="center"
                    show-overflow-tooltip/>

                    <el-table-column 
                    prop="descripcion"
                    label="Descripcion"
                    show-overflow-tooltip/>
                </el-table>
            </el-col>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <el-col style="width: 53%;">
                <pagination layout="prev, pager, next" v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getListDepartamentos" />
            </el-col>
        </el-row>

        <!-- FORM Dialog -->
        <el-dialog :title="formTitle" :visible.sync="formVisible" width="40%">
            <div class="form-container">
                <el-form ref="form" :model="current" :rules="rules" label-position="top" label-width="150px" style="">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Nombre" prop="nombre">
                                <el-input v-model="current.nombre"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Simbolo" prop="simbolo">
                                <el-input v-model="current.simbolo"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col>
                           <el-form-item label="Descripcion" prop="descripcion">
                                <el-input type="textarea" v-model="current.descripcion" :autosize="{ minRows: 2, maxRows: 16}"/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false;" class="float-left">Cancelar</el-button>
                <el-button type="success" @click="handleSubmit();" icon="el-icon-check">Confirmar</el-button>
            </span>
        </el-dialog>

        <!-- FORM PUESTOS Dialog -->
        <el-dialog :title="formTitlePuestos" :visible.sync="formVisiblePuestos" width="30%">
            <div class="form-container">
                <el-form ref="form" :model="currentPuesto" :rules="rulesPuestos" label-position="top" label-width="150px" style="">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Nombre" prop="nombre">
                                <el-input v-model="currentPuesto.nombre"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Simbolo" prop="simbolo">
                                <el-input v-model="currentPuesto.simbolo"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col>
                           <el-form-item label="Descripcion" prop="descripcion">
                                <el-input type="textarea" v-model="currentPuesto.descripcion" :autosize="{ minRows: 2, maxRows: 16}"/>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisiblePuestos = false;" class="float-left">Cancelar</el-button>
                <el-button type="success" @click="handleSubmitPuestos();" icon="el-icon-check">Confirmar</el-button>
            </span>
        </el-dialog>
    </div>


    
</template>
<style>
    .el-select .el-input {
        width: 180px;
    }

    .el-transfer-panel{
        width: 35%;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .pre-formateado {
        white-space: pre;
    }
    .el-table .cell {
        word-break: break-word;
    }
    
    
</style>
<script>
import Pagination from '@/components/Pagination'; 
import moment from 'moment';
import uniq from 'lodash/uniq';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive
import Resource from '@/api/resource';

const departamentoResource = new Resource('departamentos');
const puestoResource = new Resource('puestos');


    export default {
        name: 'DepartamentosList',
        components: { Pagination, },
        directives: { waves },
        created () {
            this.getListDepartamentos();
        },
        data(){
            return{
                loading : true,
                loadingPuestos: false,
                /* TABLE */
                list:[],
                total: 0,
                query: {
                    page: 1,
                    limit: 15,
                    keyword: '',
                    role: '',
                },
                /* TABLE PUESTOS */
                listPuestos:[],
                totalPuestos: 0,
                queryPuestos: {
                    page: 1,
                    limit: 15,
                    keyword: '',
                    role: '',
                    departamento_id:0,
                },
                /* Form dialog */
                formVisible: false,
                formTitle: '',
                activeName:'first',
                current: {
                    id:0,
                    nombre:'',
                    simbolo:'',
                    descripcion:'',
                    puestos:[],
                },
                /* Form dialog  PUESTOS*/
                formVisiblePuestos: false,
                formTitlePuestos: '',
                currentPuesto: {
                    id:0,
                    nombre:'',
                    simbolo:'',
                    descripcion:'',
                    departamento_id:0,
                },
                /* Validations */
                rules: {
                    nombre: [
                        { required: true, message: 'Ingresa un Nombre', trigger: 'blur' },
                    ],
                    simbolo: [
                        { required: true, message: 'Ingresa un simbolo', trigger: 'blur' },
                    ],
                },
                rulesPuestos: {
                   nombre: [
                        { required: true, message: 'Ingresa un Nombre', trigger: 'blur' },
                    ],
                    simbolo: [
                        { required: true, message: 'Ingresa un simbolo', trigger: 'blur' },
                    ],
                },
                
            }
        },
        computed: {
            /* Barra de Acciones */
            disableEditar() {
                if(this.current.id == 0){
                    return true;
                }
                return false;
            },
            /* Barra de Acciones Puestos*/
            disableEditarPuestos() {
                if(this.currentPuesto.id == 0){
                    return true;
                }
                return false;
            },
            disableAgregarPuestos() {
                if(this.current.id == 0){
                    return true;
                }
                return false;
            },
        },
        methods:{
            /*  Form Puestos*/
            handleAddPuesto(){
                this.formVisiblePuestos = true;
                this.formTitlePuestos = 'Agregar Puesto';
            },
            /* Form Puestos Table*/
            setCurrentPuestos(row) {
                this.$refs.tableListPuestos.setCurrentRow(row);
            },
            handleEditFormPuestos() {
                this.formTitlePuestos = 'Editar Puesto';
                this.formVisiblePuestos = true;
            },
            /* TABLE */
            handleCurrentChangeTable(val) {
                if(val != null){
                    this.current = val;
                    this.queryPuestos.departamento_id = this.current.id;
                    this.getListPuestos();
                }else{

                }
            },
            handleCurrentChangeTablePuestos(val) {
                if(val != null){
                    this.currentPuesto = val;
                }
            },
            setCurrent(row) {
                this.$refs.tableList.setCurrentRow(row);
            },
            /* BARRA DE ACCIONES */
            handleCreateForm() {
                this.formVisible = true;
                this.formTitle = 'Agregar Nuevo Departamento';
                this.clearCurrent();
                
            },
            handleEditForm() {
                this.formTitle = 'Editar Departamento';
                this.formVisible = true;
            },
            handleFilter() {
                this.query.page = 1;
                this.getListDepartamentos();
            },
            /** PRINCIPALES ---------
                1. GET LIST  2. SUBMIT 3. DELETE ROW 4. CLEAR CURRENT
            */
            async getListDepartamentos() {
                const { limit, page } = this.query;
                this.loading = true;
                const { data, meta } = await departamentoResource.list(this.query);
                console.log("GET LIST DATA");
                console.log(data);
                this.list = data;
                this.list.forEach((element, index) => {
                    element['index'] = (page - 1) * limit + index + 1;
                });
                this.total = meta.total;
                this.loading = false;
            },
            async getListPuestos() {
                this.listPuestos = [];
                if(this.query.departamento_id == 0){
                    return false;
                }
                const { limit, page } = this.queryPuestos;
                this.loadingPuestos = true;
                const { data, meta } = await puestoResource.list(this.queryPuestos);
                console.log("GET LIST DATA");
                console.log(data);
                this.listPuestos = data;
                this.listPuestos.forEach((element, index) => {
                    element['index'] = (page - 1) * limit + index + 1;
                });
                this.total = meta.total;
                this.loadingPuestos = false;
            },
            handleSubmit() {
                //validacion
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //loading animation
                        var loadingInstance = this.$loading({ target: '.el-dialog' });
                        //calling store method
                        departamentoResource.store({current: this.current})
                            .then(response => {
                                //showing succeful message
                                this.$message({ message: 'Departamento agregado correctamente.', type: 'success', duration: 5 * 1000, });
                                //hidding form
                                this.formVisible = false;
                                //cleaning form
                                this.clearCurrent();
                                //refreshing table
                                this.getListDepartamentos();
                                //closing loading animation
                                loadingInstance.close();
                            })
                            .catch(error => {
                                console.log(error);
                                loadingInstance.close();
                            });
                    } else {
                        return false;
                    }
                });
            },
            handleSubmitPuestos() {
                //validacion
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //loading animation
                        var loadingInstance = this.$loading({ target: '.el-dialog' });
                        //calling store method
                        this.currentPuesto.departamento_id = this.current.id;
                        puestoResource.store({current: this.currentPuesto})
                            .then(response => {
                                //showing succeful message
                                this.$message({ message: 'Puesto agregado correctamente.', type: 'success', duration: 5 * 1000, });
                                //hidding form
                                this.formVisiblePuestos = false;
                                //CLEAR PUEST
                                this.clearCurrentPuesto();
                                //refreshing table
                                this.getListPuestos();
                                //closing loading animation
                                loadingInstance.close();
                            })
                            .catch(error => {
                                console.log(error);
                                loadingInstance.close();
                            });
                    } else {
                        return false;
                    }
                });
            },
            deleteRow(id){
                this.$confirm('Esto eliminara permanentemente la Orden Abierta. Quieres continuar?', 'Advertencia', {
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning',
                }).then(() => {
                    // let me = this;
                    // me.loading = true;
                    // axios.post(me.deleteUrl,{'id':id}).then(function (response) {
                    //     me.getListDepartamentos();   
                    //     me.$message.success('Eliminado correctamente.');
                    //     me.loading = false;
                    // })
                    // .catch(function (error) {
                    //     me.$message.error('Hubo un error.');
                    //     console.log(error);
                    //     me.loading = false;
                    // });
                }).catch(() => {
                    this.$message({ type: 'info', message: 'Eliminacion cancelada', });
                });
            },
            clearCurrent(){
                this.setCurrent();
                this.current = {
                    id:0,
                    nombre:'',
                    simbolo:'',
                    descripcion:'',
                    puestos:[],
                }
                this.queryPuestos.departamento_id = 0;
                this.listPuestos = [];
            },
            clearCurrentPuesto(){
                this.setCurrent();
                this.currentPuesto = {
                    id:0,
                    nombre:'',
                    simbolo:'',
                    descripcion:'',
                }
            },
        },
    }
</script>

