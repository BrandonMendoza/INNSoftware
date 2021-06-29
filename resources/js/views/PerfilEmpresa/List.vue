<template>
    <div class="app-container">

        <!-- BARRA DE ACCIONES -->
        <div class="filter-container">
            <!-- BUSCAR INPUT -->
            <div class="filter-item">
                <el-input class="input-with-select" size="small" placeholder="buscar" v-model="query.keyword"  @keyup.enter.native="handleFilter" clearable> 
                    <el-button slot="append" size="small" v-waves type="primary" icon="el-icon-search" @click="handleFilter"></el-button>    
                </el-input>
            </div>
            <!-- AGREGAR -->
            <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus"  style="margin-left:0px;"  @click="handleCreateForm()">
                {{ $t('table.add') }}
            </el-button>
            <!-- EDIT -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit"  style="margin-left:0px;"  :disabled="disableEditar"  @click="handleEditForm()">Editar</el-button>
           
            <!-- DELETE 
            <el-button v-waves type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="true"
                        @click="deleteRow(current);">Eliminar</el-button>-->

            <!-- pdf example button
            <router-link target="_blank" :to="{ name: 'hoja_de_salida_download', params: { id: current.id } }">
                <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableEditar">
                    Generar Hoja de Salida
                </el-button>
            </router-link> -->
        </div>
        <!-- TABLE -->
        <el-row >
             

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

                <el-table-column type="expand">
                    <template slot-scope="scope">

                        <ul style="list-style: none;"> 
                            <li>
                                <p><b>Dirección:</b>  {{scope.row.direccion }},{{scope.row.colonia }}. {{scope.row.ciudad }}, {{scope.row.estado.estado }}. CP: {{ scope.row.codigo_postal}}</p>
                            </li>
                            <li>
                                <p><b>Contacto:</b> {{ scope.row.telefono }} - {{scope.row.email }}</p>
                            </li>
                        </ul>
                        
                        
                    </template>
                </el-table-column>
                

                <el-table-column 
                prop="nombre_corto"
                label="Nombre Corto"
                show-overflow-tooltip/>

                <el-table-column
                prop="razon_social"
                label="Razon Social"
                show-overflow-tooltip/>

                <el-table-column 
                prop="nombre_representante"
                label="Representante"
                show-overflow-tooltip/>

                <el-table-column 
                prop="rfc"
                label="RFC"
                show-overflow-tooltip/>

            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination layout="prev, pager, next" v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
        </el-row>

        <!-- FORM Dialog -->
        <el-dialog :title="formTitle" :visible.sync="formVisible" width="60%" id="dialogoForm">
            <div class="form-container">
                <el-form ref="form" :model="current" :rules="rules" label-position="top" label-width="150px" style="">

                    <el-tabs v-model="activeName" :stretch="true">
                        <el-tab-pane label="General" name="first">
                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Nombre Corto" prop="nombre_corto">
                                        <el-input v-model="current.nombre_corto"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                     <el-form-item label="Razon social" prop="razon_social">
                                        <el-input v-model="current.razon_social"/>
                                    </el-form-item>
                                </el-col>
                                
                            </el-row>

                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Nombre del Representante" prop="nombre_representante">
                                        <el-input v-model="current.nombre_representante"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="RFC" prop="rfc">
                                        <el-input v-model="current.rfc" maxlength="13"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </el-tab-pane>

                        <el-tab-pane label="Dirección" >
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <el-form-item label="Calle y Número" prop="direccion">
                                        <el-input v-model="current.direccion"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>           
                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Colonia" prop="colonia">
                                        <el-input v-model="current.colonia"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="Ciudad" prop="ciudad">
                                        <el-input v-model="current.ciudad"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="Estado" prop="estado_id">

                                        <el-select 
                                        v-model="current.estado_id" 
                                        value-key="id">
                                            <el-option 
                                            v-for="estado in estados_list"
                                            :key="estado.id"
                                            :label="estado.estado" 
                                            :value="estado.id"/>
                                        </el-select>

                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="C.P." prop="codigo_postal">
                                        <el-input v-model="current.codigo_postal"/>
                                    </el-form-item>
                                </el-col>
                            </el-row> 

                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Teléfono" prop="telefono">
                                        <el-input v-mask="'(686) ###-##-##'" v-model="current.telefono"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="Email" prop="email">
                                        <el-input v-model="current.email"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>                           
                        </el-tab-pane>

                        <el-tab-pane label="Logotipo" v-if="current.id != 0" >
                            <el-row :gutter="20">
                                <el-col :span="3">
                                    <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-upload2"
                                        @click="dialogoAgregarLogo = true;">Subir</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button v-waves :disabled="disableBorrarLogo" type="danger" size="small" class="filter-item" icon="el-icon-delete" 
                                        @click="deleteDocumento">Borrar</el-button>
                                </el-col>
                            </el-row>           
                            <el-row :gutter="20" style="margin-top:20px;">
                            <!-- :src="'storage/uploads/PerfilEmpresa/1/documentos/'+current.logo.nombre_sistema"-->
                                <div class="block">
                                    <el-image
                                    v-if="current.logo != null"
                                    style="width: 300px; height: 300px"
                                    :src="current.logo.storage_path+'/'+current.logo.nombre_sistema"
                                    fit="scale-down">

                                        <div slot="placeholder" class="image-slot">
                                            Cargando<span class="dot">...</span>
                                        </div>
                                    </el-image>
                                </div>
                                <div class="block">
                                    <el-image
                                    v-if="current.logo == null"
                                    style="width: 300px; height: 300px"
                                    src=""
                                    fit="fill">

                                        <div slot="placeholder" class="image-slot">
                                            Cargando<span class="dot">...</span>
                                        </div>
                                    </el-image>
                                </div>
                            </el-row>                          
                        </el-tab-pane>
                        
                    </el-tabs>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false;" class="float-left">Cancelar</el-button>
                <el-button type="success" @click="handleSubmit();" icon="el-icon-check">Confirmar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo Agregar LOGOTIPO -->
        <el-dialog
        id="dialogoAgregarLogo"
        title="Agregar Logo"
        :visible.sync="dialogoAgregarLogo"
        width="23%">
            
            <div class="filter-container">
                <el-upload
                class="upload-demo"
                action=""
                :file-list="fileList"
                ref="upload"
                :auto-upload="false"
                :on-change="handleUploadChange"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                drag>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Arrastra un archivo aqui o <em>click para subir</em></div>
                </el-upload>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoAgregarLogo = false;fileList = [];" class="float-left">Cancelar</el-button>
                <el-button style="margin-left: 10px;" type="success" @click="storeDocumento">Guardar</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<style>
    .el-select {
        width:100%;
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

const perfilEmpresaResource = new Resource('perfilEmpresa');
const estadoResource = new Resource('estados');


    export default {
        name: 'PerfilEmpresaList',
        components: { Pagination, },
        directives: { waves },
        created () {
            this.getList();
        },
        data(){
            return{
                loading : true,
                /*TAB*/
                activeName:'first',
                /* TABLE */
                list:[],
                total: 0,
                query: {
                    page: 1,
                    limit: 15,
                    keyword: '',
                    role: '',
                },
                /* Form dialog */
                formVisible: false,
                formTitle: '',
                current: {
                    id:0,
                    nombre_corto:'',
                    razon_social:'',
                    nombre_representante:'',
                    rfc: '',
                    direccion:'',
                    colonia:'',
                    ciudad:'',
                    estado_id:'',
                    codigo_postal:'',
                    telefono:'',
                    email:'',
                    logo_documento_id:"",
                    logo:{  
                        url:"",
                        nombre_sistema:""
                    },
                },
                estados_list: [],
                loadingEstados : false,
                /* Validations */
                rules: {
                    nombre_corto: [
                        { required: true, message: 'Ingresa el Nombre Corto', trigger: 'blur' },
                    ],
                    razon_social: [
                        { required: true, message: 'Ingresa Razon Social', trigger: 'blur' },
                    ],
                    nombre_representante: [
                        { required: true, message: 'Ingresa nombre del represetante', trigger: 'blur' },
                    ],
                    rfc: [
                        { required: true, message: 'Ingresa un RFC', trigger: 'blur' },
                    ],
                    direccion: [
                        { required: true, message: 'Ingresa una Dirección', trigger: 'blur' },
                    ],
                    colonia: [
                        { required: true, message: 'Ingresa la Colonia', trigger: 'blur' },
                    ],
                    ciudad: [
                        { required: true, message: 'Ingresa la Ciudad', trigger: 'blur' },
                    ],
                    estado_id: [
                        { required: true, message: 'Selecciona un Estado', trigger: 'change' }
                    ],
                    codigo_postal: [
                        { required: true, message: 'Ingresa un Codigo Postal', trigger: 'blur' }
                    ],
                    telefono: [
                        { required: true, message: 'Ingresa un Telefono', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'Ingresa un Email', trigger: 'blur' }
                    ],
                },
                /** Documentos */
                dialogoDocumentosAgregarVisible:false,
                fileList: [],
                /* AGREGAR LOGOTIPO*/
                dialogoAgregarLogo:false,
                fileList:[],
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
            disableBorrarLogo(){
                if(this.current.logo != null){
                    return false;
                }
                return true;
            },
        },
        methods:{
            /* Form*/
            async getEstados(){
                const { data, meta } = await estadoResource.list();                
                this.estados_list = data;
            },
            /* TABLE */
            handleCurrentChangeTable(val) {
                if(val != null){
                    this.current = val;
                }
            },
            setCurrent(row) {
                this.$refs.tableList.setCurrentRow(row);
            },
            /* BARRA DE ACCIONES */
            handleCreateForm() {
                this.activeName = 'first';
                this.formVisible = true;
                this.formTitle = 'Agregar Perfil de Empresa';
                this.getEstados();
                this.clearCurrent();
            },
            handleEditForm() {
                this.activeName = 'first';
                this.formTitle = 'Editar Perfil de Empresa';
                this.getEstados();
                this.formVisible = true;
            },
            handleFilter() {
                this.query.page = 1;
                this.getList();
            },
            /** PRINCIPALES ---------
                1. GET LIST  2. SUBMIT 3. DELETE ROW 4. CLEAR CURRENT
            */
            async getList() {
                const { limit, page } = this.query;
                this.loading = true;
                const { data, meta } = await perfilEmpresaResource.list(this.query);
                this.list = data;
                this.list.forEach((element, index) => {
                    element['index'] = (page - 1) * limit + index + 1;
                });
                this.total = meta.total;
                this.loading = false;
            },
            // async getImageURL() {
            //     const { data, meta } = await perfilEmpresaResource.list();
            //     this.list = data;
                
            // },
            handleSubmit() {
                //validacion
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //loading animation
                        var loadingInstance = this.$loading({ target: '.el-dialog' });
                        //calling store method
                        perfilEmpresaResource.store({current: this.current})
                            .then(response => {
                                //showing succeful message
                                this.$message({ message: 'Perfil de Empresa agregado correctamente.', type: 'success', duration: 5 * 1000, });
                                //hidding form
                                this.formVisible = false;
                                //cleaning form
                                this.clearCurrent();
                                //refreshing table
                                this.getList();
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
                    //     me.getList();   
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
                    nombre_corto:'',
                    razon_social:'',
                    nombre_representante:'',
                    rfc: '',
                    direccion:'',
                    colonia:'',
                    ciudad:'',
                    estado_id:'',
                    codigo_postal:'',
                    telefono:'',
                    email:'',
                    logo_documento_id:"",
                    logo:{  
                        url:"",
                        nombre_sistema:""
                    },
                }
            },
            /* AGREGAR DOCUMENTO*/
            handleUploadLogotipo(){

            },
            deleteDocumento(){
                let me = this;
                var loadingInstance = this.$loading({
                    target: '#dialogoForm > .el-dialog'
                });
                axios.post('/perfilEmpresa/documentos/delete',{'perfil_empresa_id':me.current.id}).then(function (response) {
                    me.current.logo = null;
                    me.$message.success('Eliminado correctamente.');
                    loadingInstance.close();
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                    loadingInstance.close();
                });
            },
            storeDocumento() {
                let me =this;
                if(me.fileList[0] == 'undefined' || me.fileList[0] == null){
                    me.notificarError("Selecciona un archivo para subir");
                    return false
                }
                var loadingInstance = this.$loading({
                    target: '#dialogoAgregarLogo > .el-dialog'
                });
                const formData = new FormData();
                
                formData.append('file', me.fileList[0].raw);
                formData.append('perfil_empresa_id', me.current.id);
                axios.post('/perfilEmpresa/documentos/store', formData,{headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response){
                    me.$message.success('Guardado correctamente.');
                    me.current.logo = response.data.logo;
                    me.fileList = [];
                    loadingInstance.close();
                    me.dialogoAgregarLogo = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                    loadingInstance.close();
                    me.dialogoAgregarLogo = false;
                });
            },
            handleProgress(ev, file, fileLIst) {
                file.raw['status'] = "uploading";
            },
            handleSuccess(res, file, fileLIst) {
                file.raw['status'] = "success";
            },
            handleUploadChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
        },
    }
</script>

