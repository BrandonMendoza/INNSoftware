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
                                <p><b>Dirección:</b>  {{scope.row.direccion }},{{scope.row.colonia }}. {{scope.row.ciudad }}, {{scope.row.estado.estado }}.</p>
                            </li>
                            <li>
                                <p><b>Contacto:</b> {{ scope.row.telefono_casa }} - {{scope.row.telefono_celular }} - {{scope.row.email }}</p>
                            </li>
                        </ul>
                        
                        
                    </template>
                </el-table-column>

                <el-table-column 
                prop="numero_empleado"
                label="Núm. de Empleado"
                align="center"
                show-overflow-tooltip/>

                <el-table-column
                prop="fecha_entrada"
                label="Fecha de Entrada"
                align="center" 
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.fecha_entrada | moment("YYYY-MMM-DD")}}
                    </template>
                </el-table-column>

                <el-table-column 
                prop="nombre"
                label="Nombre"
                show-overflow-tooltip/>

                <el-table-column 
                prop="apellidos"
                label="Apellidos"
                show-overflow-tooltip/>

                <el-table-column 
                prop="Puesto.no"
                label="Puesto (departamento)"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.puesto.nombre }} ({{ scope.row.puesto.departamento.nombre }})
                    </template>
                </el-table-column>

                <el-table-column
                prop="fecha_nacimiento"
                label="Fecha de Nac."
                align="center" 
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.fecha_nacimiento | moment("YYYY-MMM-DD")}}
                    </template>
                </el-table-column>

                <el-table-column 
                prop="rfc"
                label="RFC"
                align="center" 
                show-overflow-tooltip/>

                <el-table-column 
                prop="nss"
                label="NSS"
                align="center" 
                show-overflow-tooltip/>

                <el-table-column 
                prop="curp"
                label="curp"
                align="center" 
                show-overflow-tooltip/>

            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination layout="prev, pager, next" v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
        </el-row>

        <!-- FORM Dialog -->
        <el-dialog :title="formTitle" :visible.sync="formVisible" width="60%">
            <div class="form-container">
                <el-form ref="form" :model="current" :rules="rules" label-position="top" label-width="150px" style="">
                    

                    <el-tabs v-model="activeName" :stretch="true">
                        <el-tab-pane label="General" name="first">
                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Numero de Empleado" prop="numero_empleado">
                                        <el-tag type="info"> {{ current.numero_empleado == '' ? '—' :  current.numero_empleado}}</el-tag>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="Fecha de Entrada" prop="fecha_entrada">
                                        <el-date-picker v-model="current.fecha_entrada" type="date"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Fecha de Nacimiento" prop="fecha_nacimiento">
                                        <el-date-picker v-model="current.fecha_nacimiento" type="date"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="Nombre" prop="nombre">
                                        <el-input v-model="current.nombre"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                     <el-form-item label="Apellidos" prop="apellidos">
                                        <el-input v-model="current.apellidos"/>
                                    </el-form-item>
                                </el-col>
                                
                            </el-row>

                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="RFC" prop="rfc">
                                        <el-input v-model="current.rfc" maxlength="13"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="NSS" prop="nss">
                                        <el-input v-model="current.nss" v-mask="'###########'"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="CURP" prop="curp">
                                        <el-input v-model="current.curp" v-mask="'###########'"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </el-tab-pane>
                        <el-tab-pane label="Dirección" >
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <el-form-item label="Calle y Numero" prop="direccion">
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
                            </el-row>                            
                        </el-tab-pane>

                        <el-tab-pane label="Contacto" >
                            <el-row :gutter="20">
                                <el-col :span="5">
                                    <el-form-item label="Teléfono  de Casa" prop="telefono_casa">
                                        <el-input v-mask="'(###) ###-##-##'" v-model="current.telefono_casa"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="Celular" prop="telefono_celular">
                                        <el-input v-mask="'(686) ###-##-##'" v-model="current.telefono_celular"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="Email" prop="email">
                                        <el-input v-model="current.email"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="Info. Laboral" >

                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="Departamento" prop="departamento_id">
                                        <el-select 
                                        v-loading="loadingDepartamentos"
                                        v-model="current.departamento_id" 
                                        value-key="id"
                                        @change="changeDepartamentos()">
                                            <el-option 
                                            v-for="departamento in departamentos_list"
                                            :key="departamento.id"
                                            :label="departamento.nombre" 
                                            :value="departamento.id"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="Puesto" prop="puesto_id">
                                        <!-- <el-input v-model="current.puesto_id"/> -->
                                        <el-select 
                                        v-loading="loadingPuestos"
                                        v-model="current.puesto_id" 
                                        value-key="id">
                                            <el-option 
                                            v-for="puesto in puestos_list"
                                            :key="puesto.id"
                                            :label="puesto.nombre" 
                                            :value="puesto.id"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                        </el-tab-pane>

                        
                    </el-tabs>
                    
                    
                    <el-row >
                       <el-col>
                             <!--<el-tabs v-model="activeName" :stretch="true">
                                DOCUMENTOS Table 
                                <el-tab-pane label="Documentos" v-if="current.id != 0" name="first">
                                    <div class="filter-container">
                                        <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus" @click="dialogoDocumentosAgregarVisible = true;">Agregar</el-button>
                                    </div>
                                    <el-table
                                    :data="current.documentos"
                                    border
                                    fit
                                    highlight-current-row
                                    style="width: 100%">
                                        <el-table-column
                                        type="index"
                                        align="center" 
                                        width="80"/>

                                        <el-table-column
                                        prop="nombre_real"
                                        label="Documento"
                                        show-overflow-tooltip/>

                                        <el-table-column
                                        prop="created_at"
                                        label="Fecha de carga"
                                        align="center" 
                                        show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                {{scope.row.created_at | moment("YYYY-MMM-DD")}}
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                        align="center"
                                        width="180">
                                            <template slot-scope="scope">
                                                <a type="button" title="descargar" :href="'/embarques/downloadDocumento/'+scope.row.id" class="el-button el-button--primary el-button--mini" >
                                                    <i class="el-icon-download"></i>
                                                </a>
                                                <el-button type="danger" title="eliminar" size="mini" icon="el-icon-delete" @click="deleteDocumento(scope.row);"/>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </el-tabs>-->
                        </el-col>
                   </el-row>


                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false;" class="float-left">Cancelar</el-button>
                <el-button type="success" @click="handleSubmit();" icon="el-icon-check">Confirmar</el-button>
            </span>
        </el-dialog>


        <!-- Document Add Dialog -->
        <el-dialog
        id="dialogoAgregarDocumento"
        title="Agregar Documento a Embarque"
        :visible.sync="dialogoDocumentosAgregarVisible"
        :before-close="handleClose"
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
                <el-button @click="dialogoDocumentosAgregarVisible = false;fileList = [];" class="float-left">Cancelar</el-button>
                <el-button style="margin-left: 10px;" type="success" @click="submitUpload">Guardar</el-button>
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

const empleadoResource = new Resource('empleados');
const departamentoResource = new Resource('departamentos');
const puestoResource = new Resource('puestos');
const estadoResource = new Resource('estados');


    export default {
        name: 'EmpleadosList',
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
                queryPuesto:{
                    departamento_id: 0
                },
                /* Form dialog */
                formVisible: false,
                formTitle: '',
                current: {
                    id:0,
                    numero_empleado:'',
                    nombre:'',
                    apellidos:'',
                    telefono_casa: '',
                    telefono_celular:'',
                    email:'',
                    fecha_nacimiento:'',
                    fecha_entrada:'',
                    direccion:'',
                    colonia:'',
                    ciudad:'',
                    estado_id:'',
                    rfc:'',
                    nss:'',
                    curp:'',
                    puesto_id:'',
                    departamento_id:'',
                    documentos:[],
                },
                departamentos_list: [],
                loadingDepartamentos : false,
                puestos_list: [],
                loadingPuestos : false,
                estados_list: [],
                /* Validations */
                rules: {
                    fecha_entrada: [
                        { type: 'date', required: true, message: 'Selecciona una Fecha de Entrada', trigger: 'change' }
                    ],
                    fecha_nacimiento: [
                        { type: 'date', required: true, message: 'Selecciona una Fecha de Nac.', trigger: 'change' }
                    ],
                    nombre: [
                        { required: true, message: 'Ingresa los Nombres', trigger: 'blur' },
                    ],
                    apellidos: [
                        { required: true, message: 'Ingresa los Apellidos', trigger: 'blur' },
                    ],
                    rfc: [
                        { required: true, message: 'Ingresa el RFC', trigger: 'blur' },
                    ],
                    nss: [
                        { required: true, message: 'Ingresa el NSS', trigger: 'blur' },
                    ],
                    curp: [
                        { required: true, message: 'Ingresa el Curp', trigger: 'blur' },
                    ],
                    direccion: [
                        { required: true, message: 'Ingresa la Dirección', trigger: 'blur' },
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
                    puesto_id: [
                        { required: true, message: 'Selecciona un Puesto', trigger: 'change' }
                    ],
                },
                /** Documentos */
                dialogoDocumentosAgregarVisible:false,
                fileList: [],
                
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
        },
        methods:{
            /* Form*/
            async getEstados(){
                const { data, meta } = await estadoResource.list();                
                this.estados_list = data;
            },
            async getDepartamentos(){
                this.puestos_list = [];
                this.loadingDepartamentos = true;
                const { limit, page } = this.query;
                const { data, meta } = await departamentoResource.list(this.query);                
                this.departamentos_list = data;
                this.loadingDepartamentos = false;
            },
            async getPuestos(){
                
                this.puestos_list = [];
                if(this.current.departamento_id == 0){
                    return false;
                }
                this.queryPuesto.departamento_id = this.current.departamento_id;
                this.loadingPuestos = true;
                const { limit, page } = this.queryPuesto;
                const { data, meta } = await puestoResource.list(this.queryPuesto);                
                this.puestos_list = data;
                this.loadingPuestos = false;
            },
            changeDepartamentos(){
                this.getPuestos();
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
                this.formTitle = 'Agregar Nuevo Empleado';
                this.getDepartamentos();
                this.getEstados();
                this.clearCurrent();
            },
            handleEditForm() {
                this.activeName = 'first';
                this.formTitle = 'Editar Empleado';
                this.current.departamento_id = this.current.puesto.departamento.id;
                this.getDepartamentos();
                this.getPuestos();
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
                const { data, meta } = await empleadoResource.list(this.query);
                console.log("GET LIST DATA");
                console.log(data);
                this.list = data;
                this.list.forEach((element, index) => {
                    element['index'] = (page - 1) * limit + index + 1;
                });
                this.total = meta.total;
                this.loading = false;
            },
            handleSubmit() {
                //validacion
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //loading animation
                        var loadingInstance = this.$loading({ target: '.el-dialog' });
                        //calling store method
                        empleadoResource.store({current: this.current})
                            .then(response => {
                                //showing succeful message
                                this.$message({ message: 'Empleado agregado correctamente.', type: 'success', duration: 5 * 1000, });
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
                    numero_empleado:'',
                    nombre:'',
                    apellidos:'',
                    telefono_casa: '',
                    telefono_celular:'',
                    email:'',
                    fecha_nacimiento:'',
                    direccion:'',
                    colonia:'',
                    ciudad:'',
                    estado_id:'',
                    rfc:'',
                    nss:'',
                    curp:'',
                    puesto_id:'',
                    departamento_id:'',
                    documentos:[],
                }
            },
            /* DOCUMENTOS */
            handleClose(done) {
                this.$confirm('Está seguro que deseas salir?')
                .then(_ => {
                    this.dialogoDocumentosAgregarVisible = false;
                })
                .catch(_ => {});
            },
            submitUpload() {
                let me =this;
                if(me.fileList[0] == 'undefined' || me.fileList[0] == null){
                    me.notificarError("Selecciona un archivo para subir");
                    return false
                }
                var loadingInstance = this.$loading({
                    target: '#dialogoAgregarDocumento > .el-dialog'
                });
                const formData = new FormData();
                
                formData.append('file', me.fileList[0].raw);
                formData.append('embarque_id', me.current.id);
                axios.post('/embarques/documentos/store', formData,{headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response){
                    me.$message.success('Guardado correctamente.');
                    me.current.documentos = response.data.documentos;
                    me.fileList = [];
                    loadingInstance.close();
                    me.dialogoDocumentos = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                    loadingInstance.close();
                    me.dialogoDocumentosAgregarVisible = false;
                });
            },
            deleteDocumento(row){
                let me = this;
                me.loading = true;
                var loadingInstance = this.$loading({
                    target: '#dialogoAgregarDocumento > .el-dialog'
                });
                axios.post('/embarques/documentos/delete',{'embarque_id':me.current.id,'documento_id':row.id}).then(function (response) {
                    let i = me.current.documentos.map(documento => documento.id).indexOf(row.id) // find index of your object
                    me.current.documentos = response.data.documentos;
                    me.$message.success('Eliminado correctamente.');
                    loadingInstance.close();
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
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

