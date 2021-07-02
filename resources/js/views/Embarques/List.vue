<template>
    <div class="app-container">

        
        <div class="filter-container">
            <!-- BUSCAR INPUT -->
            <div class="filter-item">
                <el-input class="input-with-select" size="small" placeholder="buscar" v-model="query.keyword"  @keyup.enter.native="handleFilter" clearable> 
                    <el-button slot="append" size="small" v-waves type="primary" icon="el-icon-search" 
                        @click="handleFilter"></el-button>    
                </el-input>
            </div>
            <!-- AGREGAR -->
            <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus"  style="margin-left:0px;"  
                @click="handleCreateForm()"> {{ $t('table.add') }} </el-button>
            <!-- EDIT -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit"  style="margin-left:0px;"  :disabled="disableEditar"  
                @click="handleEditForm()">Editar</el-button>

            <!-- DOCUMENTOS -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-document" style="margin-left:0px;" :disabled="disableEditar" 
                @click="handleDocumentos()">Documentos</el-button>
           
            <!-- DELETE -->
            <el-button v-waves type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="true"
                @click="deleteRow(current);">Eliminar</el-button>

            <!-- GENERAR HOJA DE SALIDA -->
            <el-button v-waves type="primary" size="small" class="filter-item" style="margin-left:0px;"  :disabled="disableEditar"  
                @click="handlePrePrintForm()">Generar Hoja de Salida</el-button>

            <!-- pdf example button
            <router-link target="_blank" :to="{ name: 'hoja_de_salida_download', params: { id: current.id } }">
                <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableEditar">
                    Generar Hoja de Salida
                </el-button>
            </router-link> -->
        </div>
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
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <li  v-for="(proyecto_producto, index) of props.row.proyectos_productos">
                            <p>Numero de Parte (Local): {{ proyecto_producto.numero_parte }} - Numero de Parte (Cliente): {{ proyecto_producto.producto.numero_parte_cliente }}</p>
                        </li>
                        
                    </template>
                </el-table-column>
                
                <af-table-column
                type="index"
                align="center"
                sortable
                fixed/>

                <el-table-column 
                prop="fecha_salida"
                label="Fecha de Salida"
                show-overflow-tooltip/>

                <el-table-column 
                prop="cantidad_bultos"
                label="Cantidad de Bultos"
                align="center"
                show-overflow-tooltip/>

                <el-table-column 
                prop="compania_transporte"
                label="Compañia de Transporte"
                show-overflow-tooltip/>

                <el-table-column 
                prop="nombre_chofer"
                label="Nombre del Chofer"
                show-overflow-tooltip/>

                <el-table-column 
                prop="placas_transporte"
                label="Placas"
                align="center"
                show-overflow-tooltip/>

            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination layout="prev, pager, next" v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
        </el-row>

        <!-- CREATE DIALOG -->
        <el-dialog :title="formTitle" :visible.sync="formVisible" width="60%">
            <div class="form-container">
                <el-form ref="form" :model="current" :rules="rules" label-position="top" label-width="150px" style="">
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <el-form-item label="Fecha de Salida" prop="fecha_salida">
                                <el-date-picker
                                v-model="current.fecha_salida"
                                type="date"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="Cliente" prop="cliente_nombre">
                                <el-select 
                                v-model="current.cliente_nombre" 
                                value-key="nombre_cliente"
                                @change="changeCliente()"
                                clearable 
                                filterable>
                                    <el-option 
                                    v-for="cliente in clientes"
                                    :key="cliente.id"
                                    :label="cliente.nombre_cliente" 
                                    :value="cliente.nombre_cliente"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="Cantidad de Bultos" prop="cantidad_bultos">
                                <el-input-number :min="1" v-model="current.cantidad_bultos" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">

                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <el-form-item label="Compañía de Transporte" prop="compania_transporte">
                                <el-input v-model="current.compania_transporte" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="Nombre del Chofer" prop="nombre_chofer">
                                <el-input v-model="current.nombre_chofer"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="Placas del Vehiculo" prop="placas_transporte">
                                <el-input v-model="current.placas_transporte" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            
                        </el-col>
                    </el-row>
                    <el-row >
                       <el-col>
                             <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                                <!-- Tab General -->

                                <el-tab-pane label="Ordenes Terminadas" name="first" >
                                    <el-row>
                                        <div class="filter-container"> 
                                            <!-- AGREGAR -->
                                            <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus" @click="handleAddOrden()">
                                                Agregar Orden
                                            </el-button>
                                        </div>
                                    </el-row>
                                    <el-row type="flex" justify="space-around" id="embarqueTransfer">
                                        <el-col>
                                           <el-table
                                            :data="ordenesAbiertasSeleccionadas"
                                            ref="ordenesSeleccionadas"
                                            sortable
                                            border
                                            tooltip-effect="light"
                                            fit
                                            style="width: 100%; word-wrap: break-word;">
                                                <af-table-column
                                                type="index"
                                                align="center"
                                                sortable
                                                fixed/>

                                                <el-table-column 
                                                prop="numero_parte"
                                                label="Numero de Parte"
                                                show-overflow-tooltip/>

                                                <el-table-column 
                                                prop="producto.numero_parte_cliente"
                                                label="Numero de Parte (Cliente)"
                                                show-overflow-tooltip/>

                                                <el-table-column
                                                align="center"
                                                width="80">
                                                    <template slot-scope="scope">
                                                        <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="loadFieldsUpdate(scope.row);"/> -->
                                                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="desembarcar(scope.row);"/>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                           
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                   </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false;" class="float-left">Cancelar</el-button>
                <el-button type="success" @click="handleSubmit();" icon="el-icon-check">Confirmar</el-button>
            </span>
        </el-dialog>


        <!-- DIALOGO AGREGAR ORDENES -->
        <el-dialog title="Agregar Ordenes" :visible.sync="agregarOrdenesVisible" width="60%">
            <div class="form-container">
                <el-transfer
                @change="handleChangeTransfer"
                :titles="['Ordenes Terminadas', 'Embarque']"
                :button-texts="['Quitar', 'Embarcar']"
                v-model="ordenesAbiertasNuevas"
                :data="ordenesAbiertasList">
                    
                    <span slot-scope="{ option }">{{ option.label }}</span>
                    
                </el-transfer>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="agregarOrdenesVisible = false;" class="float-left">Cancelar</el-button>
                <el-button type="success" @click="handleConfirmOrdenes();" icon="el-icon-check">Confirmar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo PRE PRINT -->
        <el-dialog
        id="dialogoPrePrint"
        title="Generar Hoja de Salida"
        :visible.sync="dialogoPrePrint"
        width="23%">
            
            <el-row>
                <el-col>
                        Perfil de Empresa:
                        <el-select 
                        v-model="perfil_empresa" 
                        value-key="id">
                            <el-option 
                            v-for="perfil_empresa in perfil_empresa_list"
                            :key="perfil_empresa.id"
                            :label="perfil_empresa.nombre_corto" 
                            :value="perfil_empresa"/>
                        </el-select>
                </el-col>
            </el-row>

            <!-- 
                <router-link target="_blank"  
                :to="{ name: 'renuncia_empleado_download', 
                    params: {   fechaRenuncia:JSON.stringify(fechaRenuncia), 
                                currentBajaEmpleado: JSON.stringify(currentBajaEmpleado), 
                                currentEmpleado: JSON.stringify(currentEmpleado)} }">
                
                </router-link>
            
            -->
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoPrePrint = false;fileList = [];" size="small" class="float-left">Cancelar</el-button>
                <!-- pdf example button -->
                <router-link target="_blank" :to="{ name: 'hoja_de_salida_download', params: { id: current.id, perfil_empresa: JSON.stringify(perfil_empresa) } }">
                    <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disablePrint">
                        Generar Hoja de Salida
                    </el-button>
                </router-link>
            </span>
        </el-dialog>


        <!-- DIALOGO DOCUMENTOS -->
        <el-dialog
        width="50%"
        id="dialogoListDocumento"
        :visible.sync="dialogoDocumentos">
            <span slot="title">
                <i class="el-icon-document"></i> Documentos
            </span>

            <div class="filter-container">
                <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus" @click="handleAgregarDocumento">Agregar</el-button>
            </div>
            <el-table :data="current.documentos" border fit highlight-current-row style="width: 100%">
                <el-table-column
                type="index"
                align="center" 
                width="80"/>

                <el-table-column
                prop="nombre_real"
                label="Documento"
                show-overflow-tooltip/>

                <el-table-column
                prop="documento_tipo.nombre"
                label="Tipo de Documento"
                show-overflow-tooltip/>

                <el-table-column
                prop="usuario.name"
                label="Cargado Por"
                show-overflow-tooltip/>

                <el-table-column
                prop="created_at"
                label="Fecha de carga"
                align="center" 
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.created_at | moment("YYYY-MMM-DD, h:mm a")}}
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

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoDocumentos = false" class="float-left">Cerrar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo Agregar Doc -->
        <el-dialog
        id="dialogoAgregarDocumento"
        title="Agregar Documento a Embarque"
        :visible.sync="dialogoDocumentosAgregarVisible"
        :before-close="handleClose"
        width="23%">
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="24">
                    Tipo de Documento
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="24">
                    
                        <el-select 
                        v-loading="loadingTipoDocumentos"
                        v-model="documento_tipo_id" 
                        value-key="id">
                            <el-option 
                            v-for="documentoTipo in documentosTiposSelect"
                            :key="documentoTipo.id"
                            :label="documentoTipo.nombre" 
                            :value="documentoTipo.id"/>
                        </el-select>
                    
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="24">
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
                </el-col>
            </el-row>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoDocumentosAgregarVisible = false;fileList = [];" class="float-left">Cancelar</el-button>
                <el-button style="margin-left: 10px;" type="success" @click="submitUpload">Guardar</el-button>
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
import ProyectoProductoResource from '@/api/proyectoProducto';
import Resource from '@/api/resource';

const documentoTipoResource = new Resource('documentoTipo');
const perfilEmpresaResource = new Resource('perfilEmpresa');
const embarqueResource = new Resource('embarques');
const proyectoProductoResource = new ProyectoProductoResource('proyectosProductos');


    export default {
        name: 'EmbarqueList',
        created () {
            this.getList();
            
        },
        destroyed () {
            
        },
        data(){
            return{
                listUrl:'/proyectosProductos',
                deleteUrl:'/proyectosProductos/delete',
                loading : true,
                list:[],
                page: 1,
                pageSize: 10,
                total: 0,
                selectSearch: 'numero_parte_cliente',
                query: {
                    page: 1,
                    limit: 15,
                    keyword: '',
                    role: '',
                },
                formVisible: false,
                formTitle: '',
                activeName:'first',
                /* Form */
                clientes:[],
                current: {
                    id:0,
                    cliente_id:0,
                    cliente_nombre:'',
                    fecha_salida: '',
                    cantidad_bultos:'',
                    compania_transporte:'',
                    nombre_chofer:'',
                    placas_transporte:'',
                    documentos:[],
                },
                /* Validations */
                rules: {
                    cliente_nombre: [
                        { required: true, message: 'Selecciona un Cliente', trigger: 'blur' },
                    ],
                    fecha_salida: [
                        { required: true, message: 'Ingresa una Fecha de Salida', trigger: 'blur' },
                    ],
                    cantidad_bultos: [
                        { required: true, message: 'Ingresa una Cantidad de Bultos', trigger: 'blur' },
                    ],
                    compania_transporte: [
                        { required: true, message: 'Ingresa una Compañía de Transporte', trigger: 'blur' },
                    ],
                    nombre_chofer: [
                        { required: true, message: 'Ingresa un Nombre de Chofer', trigger: 'blur' },
                    ],
                },
                /** Transfer Editar Embarques  */
                ordenesAbiertasList:[],
                ordenesAbiertasSeleccionadas:[],
                ordenesAbiertasNuevas:[],
                OrdenesTodasList:[],
                /**Sub dialog */
                agregarOrdenesVisible:false,
                /** Documentos */
                dialogoDocumentos:false,
                dialogoDocumentosAgregarVisible:false,
                fileList: [],
                loadingTipoDocumentos:false,
                documentosTiposSelect: [{
                    id: 4,
                    nombre: 'Foto'
                }, 
                {
                    id: 5,
                    nombre: 'Otro'
                }],
                documento_tipo_id:"",
                /* PRE PRINT */
                perfil_empresa_list:[],
                dialogoPrePrint: false,
                perfil_empresa:{
                    id: 0
                },
            }
        },
        components: { 
            Pagination,
        },
        directives: { waves },
        computed: {
            disableEditar() {
                if(this.current.id == 0){
                    return true;
                }
                return false;
            },
            disablePrint() {
                if(this.perfil_empresa.id == 0){
                    return true;
                }
                return false;
            },
        },
        methods:{
            /* Documentos*/
            async getDocumentoTipos(){
                const { data, meta } = await documentoTipoResource.list();
                this.documentosTiposSelect = data;
            },
            handleClose(done) {
                this.$confirm('Está seguro que deseas salir?')
                .then(_ => {
                    this.dialogoDocumentosAgregarVisible = false;
                })
                .catch(_ => {});
            },
            handleAgregarDocumento(){
                this.dialogoDocumentosAgregarVisible = true;
                //this.getDocumentoTipos();
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
                formData.append('documento_tipo_id', me.documento_tipo_id);
                axios.post('/embarques/documentos/store', formData,{headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (response){
                    me.$message.success('Guardado correctamente.');
                    me.current.documentos = response.data.documentos;
                    me.fileList = [];
                    loadingInstance.close();
                    me.dialogoDocumentosAgregarVisible = false;
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
            /**Form */
            disableTabOrdenesAbiertasTerminadas(){
                if(this.current.cliente_id == 0){
                    //this.ordenesAbiertasList = [];
                    this.ordenesAbiertasList.forEach(ordenAbiertaList => {
                        ordenAbiertaList.disabled = true;
                    });
                    this.ordenesAbiertasSeleccionadas.forEach(ordenAbiertaSeleccionada => {
                        ordenAbiertaSeleccionada.disabled = true;
                    });
                }else{
                    this.ordenesAbiertasList.forEach(ordenAbiertaList => {
                        ordenAbiertaList.disabled = false;
                    });

                    this.ordenesAbiertasSeleccionadas.forEach(ordenAbiertaSeleccionada => {
                        ordenAbiertaSeleccionada.disabled = false;
                    });
                }
            },
            async getPerfilesEmpresa(){
                const { data, meta } = await perfilEmpresaResource.list();
                this.perfil_empresa_list = data;
            },
            getClientes(){
                let me =this;
                axios.get( '/clientes').then(function (response) {
                    me.clientes = response.data;
                    me.loadingClientes = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            changeCliente(){
                if(this.current.cliente_nombre != ""){
                    this.clientes.forEach(cliente => {
                        if(cliente['nombre_cliente'] == this.current.cliente_nombre){
                            this.current.cliente_id = cliente['id'];
                        }
                    });

                    this.getProyectosProductosList();
                }else{
                    this.current.cliente_id = 0;
                    this.ordenesAbiertasSeleccionadas = [];
                }             
                
                this.disableTabOrdenesAbiertasTerminadas();
            },
            desembarcar(row){
                this.$confirm('Esto eliminara permanentemente la orden del Embarque. Quieres continuar?', 'Advertencia', {
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning',
                }).then(() => {
                    /*Se agrega a la lista general el embaruqe*/
                    this.ordenesAbiertasSeleccionadas.forEach(ordenAbierta => {
                        if(row.id == ordenAbierta.id ){
                            this.ordenesAbiertasList.push({
                                key: ordenAbierta.id,
                                label: 'Orden: '+ordenAbierta.numero_parte+' - '+ordenAbierta.producto.numero_parte_cliente,
                                disabled: false,
                            });
                        }
                    });

                    // se borra de las seleccionadas
                    let i = this.ordenesAbiertasSeleccionadas.map(orden => orden.id).indexOf(row.id);
                    this.ordenesAbiertasSeleccionadas.splice(i, 1);
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: 'Eliminacion cancelada',
                    });
                });
            },
            /**Ordenes Dialog */
            handleAddOrden(){
                this.agregarOrdenesVisible = true;
            },
            handleConfirmOrdenes(){
                var idAgregado = 0;
                this.ordenesAbiertasNuevas.forEach(nuevaOrden => {
                    this.OrdenesTodasList.forEach(ordenAbierta => {
                        if(ordenAbierta.id == nuevaOrden){
                            /*Se agrega a la lista de Seleccionadas de el embarque*/
                            this.ordenesAbiertasSeleccionadas.push(ordenAbierta);
                            /* Se borra del listado general del embarque*/
                            let i = this.ordenesAbiertasList.map(orden => orden.key).indexOf(ordenAbierta.id);
                            this.ordenesAbiertasList.splice(i, 1);
                        }
                    });
                });

                this.ordenesAbiertasNuevas = [];
                this.agregarOrdenesVisible = false;
                this.updateOrdenesAbiertasList();
            },
            updateOrdenesAbiertasList(){
                this.ordenesAbiertasList.forEach(ordenAbierta => {
                    ordenAbierta.disabled = false;
                }); 
                this.ordenesAbiertasList.forEach(ordenAbierta => {
                    this.ordenesAbiertasSeleccionadas.forEach(ordenSeleccionada => {
                        if(ordenAbierta.id == ordenSeleccionada.id){
                            ordenAbierta.disabled = true;
                        }
                    });
                });
            },
            /* Transfer */
            filterMethod(query, item) {
                return item.initial.toLowerCase().indexOf(query.toLowerCase()) > -1;
            },
            handleChangeTransfer(){
                console.log(this.ordenesAbiertasSeleccionadas);
            },
            /* Tab */
            handleClick(tab, event) {
            },
            handleCreateForm() {
                this.formVisible = true;
                this.formTitle = 'Agregar Nuevo Embarque';
                this.clearCurrent();
                this.getClientes();
                
            },
            handleEditForm() {
                this.formTitle = 'Editar Embarque';
                this.getClientes();
                this.getProyectosProductosList();
                this.formVisible = true;
            },
            handleDocumentos(){
                this.dialogoDocumentos = true;
            },
            setCurrent(row) {
                this.$refs.tableList.setCurrentRow(row);
            },
            handleCurrentChangeTable(val) {
                console.log("CURRENT");
                console.log(val);
                if(val != null){
                    this.current = val;
                    this.current.cliente_nombre = val.cliente.nombre_cliente;
                    this.ordenesAbiertasSeleccionadas = val.proyectos_productos;
                }
            },
            handleFilter() {
                this.query.page = 1;
                this.getList();
            },
            /** Acceso a la BD */
            /** Listado principal */
            async getList() {
                const { limit, page } = this.query;
                this.loading = true;
                const { data, meta } = await embarqueResource.list(this.query);
                console.log("GET LIST DATA");
                console.log(data);
                this.list = data;
                this.list.forEach((element, index) => {
                    element['index'] = (page - 1) * limit + index + 1;
                });
                this.total = meta.total;
                this.loading = false;
            },
            /**Obtener ordenes abiertas disponibles */
            async getProyectosProductosList() {
                var loadingInstance = this.$loading({target: '#embarqueTransfer'});
                const { data, meta } = await proyectoProductoResource.OrdenesTerminadasSinEmbarcar(this.current.cliente_id);
                this.ordenesAbiertasList = [];
                this.OrdenesTodasList = data;
                console.log("ORDENES ABIERTAS LIST/DATA");
                console.log(this.ordenesAbiertasList);
                data.forEach(ordenAbierta => {
                    if(ordenAbierta.Proceso.proyecto_proceso.es_ultimo == 1){
                        this.ordenesAbiertasList.push({
                            key: ordenAbierta.id,
                            label: 'Orden: '+ordenAbierta.numero_parte+' - '+ordenAbierta.producto.numero_parte_cliente,
                            disabled: false,
                        });
                    }
                });
                this.updateOrdenesAbiertasList();
                loadingInstance.close();
            },
            /*  metodos de agregar Editar (myForm)*/
            handleSubmit() {
                /** "Validacion" */
                if(this.ordenesAbiertasSeleccionadas.length == 0){
                    this.$message.error('Debes agregar una Orden Terminada al Embarque');
                    return false;
                }
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var loadingInstance = this.$loading({ target: '.el-dialog' });
                        
                        embarqueResource.store({current: this.current, ordenesSeleccionadas: this.ordenesAbiertasSeleccionadas.map(orden => orden.id)}).then(response => {
                            this.$message({ message: 'Embarque creado correctamente.', type: 'success', duration: 5 * 1000, });
                            this.formVisible = false;
                            this.clearCurrent();
                            this.getList();
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
            clearCurrent(){
                this.setCurrent();
                this.ordenesAbiertasSeleccionadas = [];
                this.current = {
                    id:0,
                    cliente_id:0,
                    fecha_salida: '',
                    cantidad_bultos:'',
                    compania_transporte:'',
                    nombre_chofer:'',
                    placas_transporte:'',
                };
            },
            /* PRE PRINT */
            handlePrePrintForm(){
                this.dialogoPrePrint = true;
                this.getPerfilesEmpresa();
            },
            handleClosePrePrint(done) {
                this.$confirm('Está seguro que deseas salir?')
                .then(_ => {
                    this.dialogoPrePrint = false;
                })
                .catch(_ => {});
            },
        },
    }
</script>

