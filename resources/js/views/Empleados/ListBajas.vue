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
           
            <!-- EDIT -->
            <el-button v-waves type="primary" v-permission="['editar empleados bajas']" size="small" class="filter-item" icon="el-icon-edit"  style="margin-left:0px;"  :disabled="disableEditar"  @click="handleEditForm()">
                Editar</el-button>           

            <!-- DAR DE ALTA DE NUEVO -->
            <el-button v-waves type="primary" v-permission="['dar alta empleados bajas']" size="small" class="filter-item" icon="el-icon-user"  style="margin-left:0px;"  :disabled="disableEditar"  @click="handleDarAltaNuevoForm()">
                Dar de Alta de Nuevo</el-button>

            <!-- HISTORIAL ALTA BAJA-->
            <el-button v-waves type="primary" v-permission="['historial alta baja empleados bajas']" size="small" class="filter-item" icon="el-icon-time"  style="margin-left:0px;"  :disabled="disableEditar"  @click="handleHistorialForm()">
               Historial Alta/baja</el-button>

            <!-- HISTORIAL SUELDOS -->
            <el-button v-waves type="primary" v-permission="['historial sueldos empleados bajas']" size="small" class="filter-item" icon="el-icon-money"  style="margin-left:0px;"  :disabled="disableEditar"  @click="handleHistorialSueldoForm()">
               Historial Sueldos</el-button>

            <!-- IMPRIMIR RENUNCIA-->
            <el-button class="filter-item" v-permission="['imprimir renuncia empleados bajas']" size="small" type="primary" icon="el-icon-printer" style="margin-left:0px;" @click="handlePrintRenuncia()" :disabled="disableEditar">
                Imprimir Renuncia
            </el-button>

            <!-- IMPRIMIR RENUNCIA-->
            <el-button class="filter-item" v-permission="['imprimir finiquito empleados bajas']" size="small" type="primary" icon="el-icon-printer" style="margin-left:0px;" @click="handlePrintFiniquito()" :disabled="disableEditar">
                Imprimir Finiquito
            </el-button>
            

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
                show-overflow-tooltip
                sortable/>

                <af-table-column 
                prop="apellidos"
                label="Apellidos"
                show-overflow-tooltip
                sortable/>

                <af-table-column 
                prop="nombre"
                label="Nombre"
                show-overflow-tooltip
                sortable/>

                

                <af-table-column 
                prop="Puesto.no"
                label="Puesto (departamento)"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.puesto.nombre }} ({{ scope.row.puesto.departamento.nombre }})
                    </template>
                </af-table-column>

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
                                        <el-input v-model="current.curp" maxlength="13"/>
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
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="Tipo de Empleado" prop="tipo_empleado_id">
                                        <el-select 
                                        v-model="current.tipo_empleado_id" 
                                        value-key="id">
                                            <el-option 
                                            v-for="tipo_empleado in tipos_empleado_list"
                                            :key="tipo_empleado.id"
                                            :label="tipo_empleado.nombre" 
                                            :value="tipo_empleado.id"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                </el-col>
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
         <!-- Dialogo PRE PRINT -->
        <el-dialog
        id="dialogoPrePrint"
        title="Imprimir Renuncia"
        :visible.sync="dialogoPrintRenuncia"
        width="30%">
            
            <!-- FECHA CON LA QUE SALDRA EL DOCUMENTO -->
            <el-row :gutter="20">
                <el-col :span="10">
                Fecha de la Renuncia:
                </el-col>
                <el-col :span="10">
                <el-date-picker :disabled="true" format="yyyy-MMM-dd" v-model="fechaRenuncia" type="date" />
                </el-col>
            </el-row>
            
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogoPrintRenuncia = false;" class="float-left">Cancelar</el-button>
                
                <router-link target="_blank"  :to="{ name: 'renuncia_empleado_download', params: {fechaRenuncia:JSON.stringify(fechaRenuncia), currentBajaEmpleado: JSON.stringify(currentBajaEmpleado), currentEmpleado: JSON.stringify(current)} }">
                    <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableImprimir">
                        Imprimir Renuncia
                    </el-button>
                </router-link>
            </span>
        </el-dialog>

        <!-- Dialogo PRE PRINT FINIQUITO -->
        <el-dialog
        id="dialogoPrePrintFiniquito"
        title="Imprimir Finiquito"
        :visible.sync="dialogoPrintFiniquito"
        width="30%">
            
            <!-- FECHA CON LA QUE SALDRA EL DOCUMENTO -->
            <el-row :gutter="20">
                <el-col :span="10">
                Fecha de la Renuncia:
                </el-col>
                <el-col :span="10">
                <el-date-picker :disabled="true" format="yyyy-MMM-dd" v-model="fechaRenuncia" type="date" />
                </el-col>
            </el-row>
            
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogoPrintFiniquito = false;" class="float-left">Cancelar</el-button>
                
                <router-link target="_blank"  :to="{ name: 'finiquito_empleado_download', params: {fechaRenuncia:JSON.stringify(fechaRenuncia), currentBajaEmpleado: JSON.stringify(currentBajaEmpleado), currentEmpleado: JSON.stringify(current)} }">
                    <el-button type="primary" size="small" class="filter-item"  style="margin-left:0px;"  :disabled="disableImprimir">
                        Imprimir Finiquito
                    </el-button>
                </router-link>
            </span>
        </el-dialog>

        <!-- ALTA DE NUEVO -->
        <EmpleadosAltaDialog  ref="EmpleadosAltaDialog" />

        <!-- HISTORIAL -->
        <EmpleadosHistorialDialog  ref="EmpleadosHistorialDialog" />

        <!-- HISTORIAL SUELDOS-->
        <EmpleadosHistorialSueldoDialog  ref="EmpleadosHistorialSueldoDialog" />

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
import EmpleadosAltaDialog from './components/EmpleadoDarAltaNuevo';
import EmpleadosHistorialDialog from './components/EmpleadoHistorialAltaBaja';
import EmpleadosHistorialSueldoDialog from './components/EmpleadoHistorialSueldos';
import Pagination from '@/components/Pagination'; 
import moment from 'moment';
import uniq from 'lodash/uniq';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive
import Resource from '@/api/resource';
import ContratoEmpleadoResource from '@/api/contratoEmpleado';
import EmpleadoResource from '@/api/empleado';
import BajaEmpleado from '@/api/bajaEmpleado';
import permission from '@/directive/permission/index.js';
import role from '@/directive/role/index.js';
import checkPermission from '@/utils/permission';

const bajaEmpleadoResource = new BajaEmpleado('bajaEmpleado');


const EmpleadoResourceMod = new EmpleadoResource('empleado');
const contratoEmpleadoResource = new ContratoEmpleadoResource('contratoEmpleado');
const empleadoResource = new Resource('empleados');
const departamentoResource = new Resource('departamentos');
const puestoResource = new Resource('puestos');
const estadoResource = new Resource('estados');


    export default {
        name: 'EmpleadosList',
        components: { 
            Pagination, 
            EmpleadosAltaDialog : EmpleadosAltaDialog,
            EmpleadosHistorialDialog : EmpleadosHistorialDialog,
            EmpleadosHistorialSueldoDialog : EmpleadosHistorialSueldoDialog,
        },
        directives: { waves,permission,role },
        created () {
            this.getList();
        },
        data(){
            return{
                loading : true,
                dialogoPrintRenuncia:false,
                dialogoPrintFiniquito:false,
                fechaRenuncia:'',
                currentBajaEmpleado:{
                    id:0,
                    fecha_baja:'',
                    fecha_inicial_labores:'',
                    tipo_baja_id:'', //RENUNCIA O DESPIDO (BAJA_EMPLEADO)
                    dias_laborados:0,
                    vacaciones:0,
                    prima_vacacional:0,
                    aguinaldo:0,
                    firmado:0,
                    empleado_id:0,
                    motivo:'', // (PARA HISTORIAL ALTA BAJA)
                    tipo:0, //ALTA = 1 , BAJA = 0 (PARA HISTORIAL ALTA BAJA)
                    notas:'',
                    salario:0,
                    salario_diario:0,
                    empleado_id:0,
                },
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
                    bajas:'',
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
                tipos_empleado_list:[
                    {
                        id: 1,
                        tipo: 'Empleado de planta'
                    }, 
                    {
                        id: 2,
                        tipo: 'Empleado eventual'
                    }, 
                ],
                departamentos_list: [],
                loadingDepartamentos : false,
                puestos_list: [],
                loadingPuestos : false,
                estados_list: [],
                contratos:[],
                /* Validations */
                rules: {
                    fecha_entrada: [
                        { required: true, message: 'Selecciona una Fecha de Entrada', trigger: 'blur' }
                    ],
                    fecha_nacimiento: [
                        { required: true, message: 'Selecciona una Fecha de Nac.', trigger: 'blur' }
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
            disableImprimir(){
                if(this.fechaRenuncia == '' || this.fechaRenuncia == null){
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
                console.log("HANDLE CURRENT CHANGE TABLE");
                console.log(val);
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

            handleDarAltaNuevoForm() {
                this.$refs.EmpleadosAltaDialog.open();
            },
            handleHistorialForm() {
                this.$refs.EmpleadosHistorialDialog.open();
            },

            handleHistorialSueldoForm() {
                this.$refs.EmpleadosHistorialSueldoDialog.open();
            },
            async handlePrintRenuncia(){
                const { data, meta } = await bajaEmpleadoResource.getBajasByEmpleado(this.current.id);
                console.log("DATA GET LIST");
                console.log(data);
                if(data.length > 0 ){
                    this.currentBajaEmpleado = data[0];
                    this.fechaRenuncia = this.currentBajaEmpleado.fecha_baja;
                    this.dialogoPrintRenuncia = true;
                }else{
                    this.$message({ type: 'warning', message: 'Este empleado no tiene renuncias.', });
                }
            },
            async handlePrintFiniquito(){
                const { data, meta } = await bajaEmpleadoResource.getBajasByEmpleado(this.current.id);
                if(data.length > 0 ){
                    this.currentBajaEmpleado = data[0];
                    this.fechaRenuncia = this.currentBajaEmpleado.fecha_baja;
                    this.dialogoPrintFiniquito = true;
                }else{
                    this.$message({ type: 'warning', message: 'Este empleado no tiene renuncias.', });
                }
            },

            /** PRINCIPALES ---------
                1. GET LIST  2. SUBMIT 3. DELETE ROW 4. CLEAR CURRENT
            */
            async getList() {
                console.log("GET LIST METHOD");
                const { limit, page } = this.query;
                this.query.bajas = 1;
                this.loading = true;
                const { data, meta } = await empleadoResource.list(this.query);
                console.log("GET LIST DATA");
                console.log(data);
                
                this.list = data;
                
                this.loading = false;
            },
            handleSubmit() {
                //validacion
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //loading animation
                        var loadingInstance = this.$loading({ target: '.el-dialog' });
                        //calling store method
                        console.log("CURRENT");
                        console.log(this.current);
                        EmpleadoResourceMod.updateDeleted(this.current.id,{current:this.current})
                            .then(response => {
                                console.log("RESPONSE");
                                console.log(response);
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
                }
            },
            handleClose(done) {
                this.$confirm('Está seguro que deseas salir?')
                .then(_ => {
                    this.dialogoDocumentosAgregarVisible = false;
                })
                .catch(_ => {});
            },
            handleFilter() {
                this.query.page = 1;
                this.getList();
            },
        },
    }
</script>

