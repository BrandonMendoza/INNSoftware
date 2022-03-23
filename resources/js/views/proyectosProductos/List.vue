<template>
    <div class="app-container" id="app-container">
        <div class="filter-container">
            <!-- BUSCAR INPUT -->
            <div class="filter-item">
                <el-input class="input-with-select" size="small" placeholder="Buscar"  v-model="presearch" @change="handleSearch()" clearable>
                    <el-select v-model="selectSearch" size="small" slot="prepend" placeholder="Select" >
                        <el-option label="Núm. de Parte (Cliente)"      value="numero_parte_cliente"></el-option>
                        <el-option label="Núm. de Parte (Local)"     value="numero_parte_producto"></el-option>
                        <el-option label="Proyecto"                     value="proyecto"></el-option>
                        <el-option label="Cliente"                      value="nombre_cliente"></el-option>
                        <el-option label="Codigo de Barras (Local)"     value="codigo_barras"></el-option>
                        <el-option label="Codigo de Barras (Cliente)"   value="codigo_barras_cliente"></el-option>
                        <!-- <el-option label="Orden de Compra"          value="orden_compra"></el-option> -->
                        <!-- <el-option label="Orden de Trabajo"         value="work_order"></el-option> -->
                    </el-select>
                    <!--<el-button  slot="append" size="small" v-waves type="primary" icon="el-icon-search"  @click="handleSearch" ></el-button> -->
                </el-input>
            </div>

            <!--
            <el-autocomplete
            class="inline-input"
            v-model="presearch"
            :fetch-suggestions="searching"
            placeholder="Please Input"
            :trigger-on-focus="false"
            @select="handleSearch"
            ></el-autocomplete> -->
            <el-date-picker
                class="filter-item" 
                size="small"
                v-model="rangoFechas"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="A"
                start-placeholder="Inicio"
                end-placeholder="Fin"
                :picker-options="pickerOptions"
                @change="changeRangoFechas()">
            </el-date-picker>
                

            <el-switch 
            class="filter-item" 
            active-text="Mostrar Ordenes Terminadas"
            style="margin-left:15px;" 
            @change="handleSearch"
            v-model="query.mostrarTerminados"  
            :active-value="1" 
            :inactive-value="0"></el-switch>
        </div>
            <!-- DRAWER PARA COMENTARIOS POR PROCESO -->
            <el-drawer
            title="Comentarios"
            :visible.sync="drawer">
                <div class="filter-container"> 

                        <el-row :gutter="20" >
                            <el-col>
                                <el-input type="textarea" 
                                    resize="none"
                                    v-model="currentComentario.comentario"
                                    :autosize="{ minRows: 3, maxRows: 16}"/>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" justify="end" style="margin-top:15px;">
                            <el-col style="float:right;"> 
                                <el-button @click="submitComentario()" :disabled="disableEnviarComentario" class="filter-item" type="success" size="small" icon="el-icon-check" style="float:right;">
                                    Agregar Comentario
                                </el-button>
                            </el-col>
                        </el-row>

                </div>
                <el-row>    
                    <el-timeline :reverse="reverse">

                        <el-timeline-item 
                        v-for="(proyecto_producto_comentario, index) in proyecto_producto_comentarios_list"
                        :timestamp="proyecto_producto_comentario.proyecto_proceso.proceso.nombre"
                        :color="proyecto_producto_comentario.proyecto_proceso.proceso.color"
                        placement="top">
                            <el-card>
                                <h4>{{proyecto_producto_comentario.comentario  }}</h4>
                                <p>{{  proyecto_producto_comentario.usuario.name }} {{formatMoment(proyecto_producto_comentario.created_at)}}</p>
                            </el-card>
                        </el-timeline-item>

                    </el-timeline>
                </el-row>

            </el-drawer>

        <div class="filter-container">

            

            <!-- EDIT -->
            <el-button  v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" :disabled="disableEditar"  @click="loadFieldsUpdate(currentRow)">Editar</el-button>
            <!-- PROCESO -->
            <el-button v-waves v-permission="['cambiar proceso ordenes abiertas']" type="primary" size="small" class="filter-item" title="Cambiar proceso" :disabled="disableEditar" style="margin-left:0px;" @click="cambiarProceso(currentRow);">
                <svg-icon icon-class="process"/> Cambiar Proceso
            </el-button>
            <!-- CODIGO DE BARRAS 
            <el-button v-waves v-permission="['codigo barras ordenes abiertas']" type="primary" size="small" class="filter-item" icon="el-icon-tickets" title="Cambiar proceso" :disabled="disableEditar" style="margin-left:0px;" @click="codigoBarras(currentRow);">
                Codigo de Barras
            </el-button>-->
            <!-- Documentos -->
            <el-button v-waves v-permission="['ver documentos proyectos']" type="primary" size="small" class="filter-item" icon="el-icon-document" style="margin-left:0px;" :disabled="disableEditar" @click="loadDocumentos(currentRow)">Documentos</el-button>
            <!-- DELETE -->
            <el-button v-waves v-permission="['eliminar ordenes abiertas']" type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="disableEditar"
                        @click="deleteRow(currentRow.id,currentRow.numero_parte,currentRow.numero_parte_cliente);">Eliminar</el-button>

            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-document" slot="reference" @click="menuReportes()" style="margin-left:0px;">
                Reportes
            </el-button>

             <!-- pdf example button
                <div class="block">
                    <span class="demonstration">With quick options</span>
                    <el-date-picker
                    v-model="value2"
                    type="monthrange"
                    align="right"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start month"
                    end-placeholder="End month"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            -->

            <!-- IMPORTAR BUTTON 
            <router-link v-permission="['importar ordenes abiertas']" class="filter-item"  :to="'/ordenesAbiertas/UploadExcel'">
                <el-button type="primary" size="small" icon="el-icon-edit">
                    Importar    
                </el-button>
            </router-link>-->
            <!-- EXPORTAR 
            <el-button v-waves :loading="downloading" size="small" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload"  style="margin-left:0px;">
                {{ $t('table.export') }}
            </el-button>-->
            <!-- ACTUALIZAR -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-refresh" slot="reference" @click="getList()" style="margin-left:0px;"></el-button>

            <!-- REPORTES -->


            <!-- COLUMNAS BUTTON -->
            <el-popover placement="left-start" size="small" width="400"  trigger="click" class="filter-item">
                <!-- <el-checkbox v-model="showProyecto" class="filter-item" style="margin-left:15px;">Ver Nombre del Proyecto (local)</el-checkbox>     -->
                <el-switch 
                    class="filter-item" 
                    active-text="Mostrar Ordenes Terminadas"
                    style="margin-left:15px;" 
                    @change="handleSearch"
                    v-model="query.mostrarTerminados"  
                    :active-value="1" 
                    :inactive-value="0"></el-switch>
                
                    <el-switch 
                    class="filter-item" 
                    active-text="Ver Núm. de Parte Proyecto (local)"
                    style="margin-left:15px;" 
                    v-model="showProyecto"  
                    :active-value="true" 
                    :inactive-value="false"></el-switch>

                    <el-switch 
                    class="filter-item" 
                    active-text="Ver Núm. de Parte Producto (local)"
                    style="margin-left:15px;" 
                    v-model="showProducto"  
                    :active-value="true" 
                    :inactive-value="false"></el-switch>
                    <br>
                    <br>
                    <!-- ACTUALIZAR -->
                    <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-refresh" @click="arreglarListado()">Arreglar Listado</el-button>
                
                <el-button type="primary" size="small" icon="el-icon-setting" slot="reference"></el-button>
            </el-popover>


            
            
            <!-- <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()" hidden>Agregar</el-button> -->
        </div>

    <el-row>
        <div id="fixed">
        
        <el-table
       
        :data="displayData"
        ref="tableList" 
        height="1000"
        @row-dblclick="dbSelected"
        highlight-current-row
        @current-change="handleCurrentChangeTable"
        sortable
        border
        tooltip-effect="light"
        fit
        v-loading="loading"
        style="width: 100%; word-wrap: break-word;">
            <!-- <af-table-column
            type="index"
            align="center"
            sortable
            fixed/> -->

            <af-table-column
            label="Proceso"
            :filters="procesosFiltroList"
            :filter-method="filterProcesoHandler"
            fixed>
                <template slot-scope="scope">
                <el-badge  class="notificaciones_badge" :value="scope.row.proyecto_producto_comentario.length">
                    <el-tag  :style="'font-weight: bold;background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'">
                        <svg-icon icon-class="process" :style="'background-color:'+scope.row.Proceso.proyecto_proceso.proceso.color+';color:'+scope.row.Proceso.proyecto_proceso.proceso.texto_color+';'"/>
                        {{scope.row.Proceso.proyecto_proceso.proceso.nombre}}
                    </el-tag>

                </el-badge>
                </template>

            </af-table-column> 

            <af-table-column
            prop="numero_parte"
            label="Orden"
            show-overflow-tooltip
            width="110"
            fixed/> 

            <af-table-column
            prop="producto.numero_parte" 
            label="Producto (local)"
            show-overflow-tooltip
            width="110"
            v-if="showProducto"
            fixed/>

            

            <af-table-column
            prop="proyecto.orden_compra" 
            label="Orden de Compra"
            width="100"
            show-overflow-tooltip/>

            <af-table-column
            prop="numero_parte_cliente" 
            label="Producto (cliente)"
            show-overflow-tooltip
            width="110"
            fixed/>

            <af-table-column
            prop="producto.nombre_producto" 
            label="Nombre del Producto"
            show-overflow-tooltip
            fixed/>

            <af-table-column
            v-if="showProyecto"
            prop="proyecto.numero_parte" 
            label="Núm. de Parte del Proyecto (local)"
            show-overflow-tooltip
            width="110"/>

            <af-table-column
            prop="proyecto.cliente.nombre_cliente" 
            :filters="clientesFiltroList"
            :filter-method="filterClienteHandler"
            label="Cliente"
            fixed/> 

            <af-table-column
            prop="cantidad" 
            label="Cantidad"
            show-overflow-tooltip
            width="85"
            align="center"  />

            <!-- <af-table-column
            prop="plan_corte" 
            label="Plan de Corte"
            align="center"
            width="100"
            show-overflow-tooltip/> -->
            
            

            <af-table-column
            prop="fecha_promesa" 
            label="Fecha Promesa"
            width="110"
            sortable> 
                <template slot-scope="scope">
                    
                    <el-tag v-if="scope.row.Proceso.proyecto_proceso.es_ultimo == 1" type="success">
                        {{scope.row.fecha_promesa | moment("YYYY-MMM-DD")}}
                    </el-tag>

                    <el-tag v-else :type="compareDates(scope.row.fecha_promesa)">
                        {{scope.row.fecha_promesa | moment("YYYY-MMM-DD")}}
                    </el-tag>
                </template>
            </af-table-column>

            

            <af-table-column
            prop="fecha_entrega" 
            label="Fecha de Entrega"
            width="110"
            sortable
            v-if="checkPermission(['ver fecha entrega proyectos'])"> 
                <template slot-scope="scope">
                    
                    <el-tag v-if="scope.row.Proceso.proyecto_proceso.es_ultimo == 1" type="success">
                        {{scope.row.fecha_entrega | moment("YYYY-MMM-DD")}}
                    </el-tag>

                    <el-tag v-else :type="compareDates(scope.row.fecha_entrega)">
                        {{scope.row.fecha_entrega | moment("YYYY-MMM-DD")}}
                    </el-tag>
                </template>
            </af-table-column>

            
            

            <el-table-column
            align="center"
            width="84"
            sortable
            v-if="checkPermission(['ver fecha entrega proyectos'])"
            label="Semana de Entrega"> 
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.Proceso.proyecto_proceso.es_ultimo == 1" type="success">
                        {{ calculateWeeks(scope.row.fecha_entrega) }} 
                    </el-tag>
                    <el-tag v-else :type="compareDates(scope.row.fecha_entrega)">
                        {{ calculateWeeks(scope.row.fecha_entrega) }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column
            prop="categorias"
            label="Categoria"
            show-overflow-tooltip
            align="center" >
                <template slot-scope="scope">
                    <el-tag
                    v-for="categoria in scope.row.producto.categorias"
                    effect="plain"
                    style="margin-left:2px;">
                    {{ categoria.categoria }}
                    </el-tag>
                </template>
            </el-table-column>

            <af-table-column
            prop="work_order" 
            label="Orden de Trabajo"
            align="center"
            width="100"
            show-overflow-tooltip/>

            <af-table-column
            prop="item" 
            label="Item"
            align="center"
            width="80"
            show-overflow-tooltip/>

            <af-table-column
            label="Peso (kgs)"
            align="center"
            width="170"
            show-overflow-tooltip>
                <template slot-scope="scope">
                    <vue-numeric v-bind:precision="2" separator="," v-model="scope.row.producto.peso_kg" :read-only="true"></vue-numeric> Kgs 
                </template>
            </af-table-column> 

            <af-table-column
            label="Peso (lbs)"
            align="center"
            width="170"
            show-overflow-tooltip>
                <template slot-scope="scope">
                    <vue-numeric v-bind:precision="2" separator="," v-model="scope.row.producto.peso_lbs" :read-only="true"></vue-numeric> lbs 
                </template>
            </af-table-column> 

            <el-table-column
            label="Precio (Pesos)"
            align="center"
            width="170"
            v-if="checkPermission(['view finanzas ordenes abiertas'])"
            show-overflow-tooltip>
                <template slot-scope="scope">

                    <vue-numeric v-if="scope.row.precio_pesos" v-bind:precision="2"  currency="$" separator="," v-model="scope.row.precio_pesos" :read-only="true"></vue-numeric>
                    <span v-else>$ 0.00 </span>
                </template>
            </el-table-column> 

            <af-table-column
            label="Precio (Dlls)"
            align="center"
            width="170"
            
            v-if="checkPermission(['view finanzas ordenes abiertas'])"
            show-overflow-tooltip>
                <template slot-scope="scope">

                    <vue-numeric v-if="scope.row.precio_dlls" v-bind:precision="2"  currency="$" separator="," v-model="scope.row.precio_dlls" :read-only="true"></vue-numeric>
                    <span v-else>$ 0.00 </span>
                </template>
            </af-table-column> 

        </el-table>
        </div>
    </el-row>    
    
    <el-row type="flex" justify="end">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangePagination"
            :page-size="pageSize"
            :page-sizes="pagesSizeOptions"
            :total="total">
        </el-pagination>
    </el-row>
    <el-backtop ></el-backtop>
         <!--
        <el-row type="flex" justify="end">
            <pagination layout="prev, pager, next" v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
        </el-row>-->

        <!-- DIALOGS -->
        <formDialog  ref="myForm" />
        <cambiarProcesoDialog  ref="cambiarProcesoDialog" />
        <codigoBarrasDialog  ref="codigoBarrasDialog" />
        <menuCodigoBarrasDialog  ref="menuCodigoBarrasDialog" />
        <reportesDialog  ref="reportesDialog" />
        <documentosDialog  ref="documentosDialog" />
    </div>


    
</template>
<style>
    .el-select .el-input {
        width: 180px;
    }

    .el-table .cell {
        word-break: break-word;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .pre-formateado {
        white-space: pre;
    }
    .el-badge__content.is-fixed{
        top:15px;

    }
    .el-table--border td{
        overflow:hidden;
    }

    .card-action {
        height: 50px;

    }

    .el-drawer__body {
		height: 100%;
		box-sizing: border-box;
		overflow-y: auto;
	}

    .el-drawer__body > .filter-container{
        padding:20px;
    }
    
</style>
<script>
import formDialog from './Form';
import documentosDialog from './documentos';
import cambiarProcesoDialog from './cambiarProceso';
import codigoBarrasDialog from './codigoBarras';
import menuCodigoBarrasDialog from './menuCodigoBarras';
import reportesDialog from './reportes';
import Pagination from '@/components/Pagination'; 
import moment from 'moment';
import uniq from 'lodash/uniq';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission/index.js';
import role from '@/directive/role/index.js';
import checkPermission from '@/utils/permission';
import ProyectoProductoResource from '@/api/proyectoProducto';
import ProyectoProductoComentarioResource from '@/api/proyectoProductoComentario';

const proyectoProductoResource = new ProyectoProductoResource('proyectosProductos');
const proyectoProductoComentarioResource = new ProyectoProductoComentarioResource('proyectosProductosComentarios');



    export default {
        created () {
        // Add barcode scan listener and pass the callback function
            this.$barcodeScanner.init(this.onBarcodeScanned)
            
        },
        destroyed () {
            // Remove listener when component is destroyed
            this.$barcodeScanner.destroy()
        },
        data(){
            return{
                
                /*EXPORTAR*/
                downloading:false,
                /*TIME LINE*/
                currentComentario:{
                    id:0,
                    comentario:'',
                    user_id:'',
                    proyecto_producto_id:'',
                    proyecto_proceso_id:'',
                },
                proyecto_producto_comentarios_list:[],
                reverse: false,
                pagesSizeOptions: [
                    100,
                    300,
                    600,
                    1000,
                ],
                /*TIME LINE*/
                listUrl:'/proyectosProductos',
                deleteUrl:'/proyectosProductos/delete',
                loading : true,
                drawer: false,
                list:[],
                terminadasSinEmbarcarlist:[],
                mostrarTerminados:0,
                showProyecto:false,
                showProducto:false,
                procesosFiltroList:[],
                clientesFiltroList:[],
                presearch:'',
                search: '',
                page: 1,
                pageSize: 100,
                total: 0,
                currentRow: null,
                selectSearch: 'numero_parte_cliente',
                barcodeValue: 'test',
                query: {
                    role: '',
                    mostrarTerminados:0,
                    rangoFechas:[],
                },
                /* MONTH RANGE */
                rangoFechas:[],
                pickerOptions: {
                    shortcuts: [{
                        text: 'Mes Actual',
                        onClick(picker) {
                        picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: 'Año Actual',
                        onClick(picker) {
                            const end = new Date(new Date().getFullYear(), 12);
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Ultimos 6 Meses',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
                value2: '',
            }
        },
        components: { 
            formDialog : formDialog,
            documentosDialog : documentosDialog,
            cambiarProcesoDialog : cambiarProcesoDialog,
            codigoBarrasDialog : codigoBarrasDialog,
            menuCodigoBarrasDialog : menuCodigoBarrasDialog,
            reportesDialog : reportesDialog,
            Pagination,
        },
        directives: { waves, permission, role  },
        computed: {
            
            searching() {
                this.loading = true;
                if (!this.search) {
                    this.loading = false;
                    this.total = this.list.length;                
                    return this.list;
                }
                this.page = 1;
                let dataReturned = [];

                if(this.selectSearch == "nombre_cliente"){
                   dataReturned = this.list.filter(data => !!data['proyecto']['cliente']['nombre_cliente'].toLowerCase().includes(this.search.toLowerCase()));
                }
                else if(this.selectSearch == "proyecto"){
                   dataReturned = this.list.filter(data => !!data['proyecto']['numero_parte_cliente'].toLowerCase().includes(this.search.toLowerCase()));
                }
                else if(this.selectSearch == "orden_compra"){
                    //let notNullData = this.list.filter(data => function (e) {return e != null;});
                    //dataReturned = notNullData.filter(data => !!data['proyecto']['orden_compra'].toLowerCase().includes(this.search.toLowerCase()));
                   //!!data['proyecto']['orden_compra'].toLowerCase().includes(this.search.toLowerCase())
                }
                else if(this.selectSearch == "numero_parte_cliente"){
                   dataReturned = this.list.filter(data => !!data['producto']['numero_parte_cliente'].toLowerCase().includes(this.search.toLowerCase()));
                }
                else if(this.selectSearch == "numero_parte_producto"){
                   dataReturned = this.list.filter(data => !!data['producto']['numero_parte'].toLowerCase().includes(this.search.toLowerCase()));
                }
                else if(this.selectSearch == "codigo_barras"){
                   dataReturned = this.list.filter(data => data['numero_parte'].toLowerCase().includes(this.search.toLowerCase()));
                }
                else if(this.selectSearch == "codigo_barras_cliente"){
                   dataReturned = this.list.filter(data => !!data['codigo_barras_cliente'].toLowerCase().includes(this.search.toLowerCase()));
                }
                else {
                    dataReturned = this.list.filter(data => data[this.selectSearch].toLowerCase().includes(this.search.toLowerCase()));
                }
                
                this.loading = false;
                return dataReturned;

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
            },
            disableEnviarComentario(){
                if(this.currentComentario.comentario == ""){
                    return true;
                }
                return false;
            },
        },
        methods:{
            checkPermission,
            //funcion para buscar con barcode
            barcodeSearch(barcodeInput){
                    let dataReturned = this.list.filter(data => data['numero_parte'].toLowerCase().includes(barcodeInput.toLowerCase()));
                    if(dataReturned.length == 0){
                       this.$message({type: 'info',message: 'No existe orden abierta',});
                    }else{
                       this.menuCodigoBarras(dataReturned[0]);
                    }
            },
            changeRangoFechas(){
                if(this.rangoFechas == '' || this.rangoFechas == null){
                    this.rangoFechas = [];
                    this.setRangeDateDefault();
                }else{
                    this.rangoFechas[0].setMonth(this.rangoFechas[0].getMonth(),1);
                    this.rangoFechas[1].setMonth(this.rangoFechas[1].getMonth() + 1,0);

                    this.query.rangoFechas = this.rangoFechas;
                }
                this.getList();
            },
            // Create callback function to receive barcode when the scanner is already done
            onBarcodeScanned (barcodeInput) {
                if(barcodeInput.length > 5){
                    this.barcodeSearch(barcodeInput);
                }
                console.log(barcodeInput)
                // do something...
            },
            // Reset to the last barcode before hitting enter (whatever anything in the input box)
            resetBarcode () {
                let barcode = this.$barcodeScanner.getPreviousCode()
                // do something...
            },
            setCurrent(row) {
                this.$refs.tableList.setCurrentRow(row);
            },
            //SELECTROW
            handleCurrentChangeTable(val) {
                this.currentRow = val;
            },
            calculateWeeks(date){
                if(date == null)
                    return '—';
                return moment(date).week()+' - '+moment(date).year();
            },
            handleSizeChange(val){
                this.pageSize = val;
            },
            handleCurrentChangePagination (val) {
                this.page = val;
            },
            handlePresearchChange(){
                if(!this.presearch){
                    this.search = '';
                }
            },
            handleSearch () {
                this.getList();
                this.search = this.presearch;
            },
            handleFilter() {
                this.query.page = 1;
                //this.getList();
            },
            setRangeDateDefault(){
                const start = new Date();
                const end = new Date();
                start.setMonth(start.getMonth() - 6,1);
                end.setMonth(end.getMonth() + 7,0);

                // var FirstDay = new Date(year, month, 1);
                // var LastDay = new Date(year, month + 1, 0);

                this.query.rangoFechas[0] = start;
                this.query.rangoFechas[1] = end;
                this.rangoFechas[0] = start;
                this.rangoFechas[1] = end;
            },
            async getList(){
                //const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasList();

                console.log("INICIO DE GET LIST");
                console.log("QUERY CON FECHAS");
                console.log(this.query);
                this.loading = true;
                if(this.rangoFechas == '' || this.rangoFechas == null){
                    this.setRangeDateDefault();
                }
                const { limit, page } = this.query;
                const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasList(this.query);
                //var data = await proyectoProductoResource.getOrdenesAbiertasList(this.query);
                console.log("FIN DE GET ORDENES ABIERTAS LIST");
                console.log("DATA");
                console.log(data);
                
                this.list = data;
                
                // if(this.mostrarTerminados == 0){
                //     this.list = data.filter(data => data['Proceso']['proyecto_proceso']['es_ultimo'] == 0);
                // }else{
                //     this.list = data;
                // }
                console.log("FIN DE FILTRO DE TERMINADOS");
                
                this.pagesSizeOptions = [ 100, 300, 600, 1000]
                this.pagesSizeOptions.push(this.list.length);
                this.pageSize = this.list.length;
                
                this.cargarProcesosFiltro();
                this.cargarClientesFiltro();
                console.log("FIN DE CARGAR FILTROS");
                this.loading = false;
            },
            async getListTerminadasSinEmbarcar(){
                //const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasList();
                console.log("INICIO DE GET LIST");
                this.loading = true;
                const { limit, page } = this.query;
                
                const { data, meta } = await proyectoProductoResource.getOrdenesTerminadasSinEmbarcarList(this.query);
                console.log("DATA");
                console.log(data);
                this.terminadasSinEmbarcarlist = data;
                
                // if(this.mostrarTerminados == 0){
                //     this.list = data.filter(data => data['Proceso']['proyecto_proceso']['es_ultimo'] == 0);
                // }else{
                //     this.list = data;
                // }
                
                
                this.loading = false;
            },
            cargarProcesosFiltro(){
                var filtroItem = {};
                for (var openOrder of this.list) {
                    filtroItem = {
                        value: openOrder.Proceso.proyecto_proceso.proceso.nombre,
                        text: openOrder.Proceso.proyecto_proceso.proceso.nombre
                    };
                    this.procesosFiltroList.push(filtroItem);
                }
                
                var auxList = _.uniqBy(this.procesosFiltroList, 'value')
                this.procesosFiltroList = auxList;
            },
            cargarClientesFiltro(){
                var filtroItem = {};
                for (var openOrder of this.list) {
                    filtroItem = {
                        value: openOrder.proyecto.cliente.nombre_cliente,
                        text: openOrder.proyecto.cliente.nombre_cliente
                    };
                    this.clientesFiltroList.push(filtroItem);
                }
                
                var auxList = _.uniqBy(this.clientesFiltroList, 'value')
                this.clientesFiltroList = auxList;
            },
            loadFieldsUpdate(data){ 
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.cantidad = data.cantidad;
                this.$refs.myForm.form.item = data.item;
                this.$refs.myForm.form.work_order = data.work_order;
                this.$refs.myForm.form.heat_number = data.heat_number;
                this.$refs.myForm.form.fecha_entrega = data.fecha_entrega;
                this.$refs.myForm.form.fecha_promesa = data.fecha_promesa;
                this.$refs.myForm.form.proyecto = data.proyecto.numero_parte;
                this.$refs.myForm.form.producto = data.producto.numero_parte_cliente;
                this.$refs.myForm.form.producto_local = data.producto.numero_parte;
                this.$refs.myForm.form.notas = data.notas;
                this.$refs.myForm.form.precio_dlls = data.precio_dlls;
                this.$refs.myForm.form.precio_pesos = data.precio_pesos;
                this.$refs.myForm.form.numero_parte = data.numero_parte;
                this.$refs.myForm.form.plan_corte = data.plan_corte;

                //Documentos
                //this.$refs.myForm.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                

                this.$refs.myForm.open();
            },
            menuCodigoBarras(data){ 
                this.$refs.menuCodigoBarrasDialog.data = data;
                this.$refs.menuCodigoBarrasDialog.open();
            },
            cambiarProceso(data){
                this.$refs.cambiarProcesoDialog.form.id = data.id;
                this.$refs.cambiarProcesoDialog.form.numero_parte = data.producto.numero_parte;
                this.$refs.cambiarProcesoDialog.form.numero_parte_cliente = data.producto.numero_parte_cliente;
                this.$refs.cambiarProcesoDialog.form.proyecto_id = data.proyecto_id;
                // this.$refs.cambiarProcesoDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.cambiarProcesoDialog.open()
            },
            codigoBarras(data){
                this.$refs.codigoBarrasDialog.form.id = data.id;
                this.$refs.codigoBarrasDialog.form.numero_parte = data.numero_parte;
                this.$refs.codigoBarrasDialog.form.codigo_barras_cliente = data.codigo_barras_cliente;
                this.$refs.codigoBarrasDialog.form.numero_parte_producto = data.producto.numero_parte_cliente;
                
                this.$refs.codigoBarrasDialog.open()
            },
            loadDocumentos(data){
                this.$refs.documentosDialog.form.id = data.id;
                this.$refs.documentosDialog.form.numero_parte = data.numero_parte;
                this.$refs.documentosDialog.form.numero_parte_cliente = data.numero_parte_cliente;
                this.$refs.documentosDialog.form.proyecto = data.proyecto.numero_parte;
                this.$refs.documentosDialog.form.producto = data.producto.numero_parte_cliente;
                this.$refs.documentosDialog.query.proyecto_producto_id = data.id;
                //this.$refs.documentosDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.documentosDialog.open()
            },
            menuReportes(){
                this.$refs.reportesDialog.open()
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
            /**Funcion para darle clase a el TAG de acuerdo a la feche de entrega */
            compareDates(date){
                var date = moment(date);
                var now = moment();
                if (now >= date) {
                    return 'danger';
                } else if(date.diff(now, "days") < 6  && date.diff(now, "days") >= 0) {
                    return 'warning';
                }

                return '';
            },
            filterProcesoHandler(value, row, column) {
                const property = column['property'];
                return row["Proceso"]["proyecto_proceso"]["proceso"]["nombre"] === value;
            },
            filterClienteHandler(value, row, column) {
                const property = column['property'];
                return row["proyecto"]["cliente"]["nombre_cliente"] === value;
            },
            //COMENTARIOS POR PRODUCTO
            async getProyectoProductoComentarios(){
                var loadingInstance = this.$loading({ target: '.el-drawer' });
                const { data, meta } = await proyectoProductoComentarioResource.getProyectoProducoComentarioByProyectoProducto(this.currentRow.id);
                this.proyecto_producto_comentarios_list = data;
                loadingInstance.close();
            },
            submitComentario(){
                var loadingInstance = this.$loading({ target: '.el-drawer' });
                if(this.currentComentario.comentario == ""){
                    this.$message({ message: 'Escribe un comentario', type: 'danger', duration: 5 * 1000, });
                    loadingInstance.close();
                    return false;
                }

                proyectoProductoComentarioResource.storeComentario({current: this.currentComentario}).then(response => {
                    this.getProyectoProductoComentarios();
                    loadingInstance.close();
                    this.clearCurrentComentario();
                    this.$message({ message: 'Comentario agregado correctamente.', type: 'success', duration: 5 * 1000, });
                })
                .catch(error => {
                    console.log(error);
                });
            },
            dbSelected(row) {
                this.drawer = true;
                this.currentComentario.proyecto_proceso_id = row.Proceso.proyecto_proceso_id;
                this.currentComentario.proyecto_producto_id = row.Proceso.proyecto_producto_id;
                this.getProyectoProductoComentarios();
            },
            formatMoment(date){
                return moment(date).format('DD') + ' de ' +moment(date).format('MMMM') + ' del ' + moment(date).format('YYYY HH:MM')
            },
            formatMomentDate(date){
                if(date == null){
                    return ""
                }
                return moment(date).format('DD') + ' de ' +moment(date).format('MMMM') + ' del ' + moment(date).format('YYYY');
            },
            clearCurrentComentario(){
                this.currentComentario = {
                    id: 0,
                    comentario:'',
                    user_id:'',
                    proyecto_producto_id:'',
                    proyecto_proceso_id:'',
                };
            },
            handleDownload() {
            this.downloading = true;
                import('@/vendor/Export2Excel').then(excel => {
                    var tHeader = [
                        'Proceso', 
                        'Orden', 
                        'Producto', 
                        'Orden de Compra', 
                        'Cliente',
                        'Cantidad',
                        'Plan de corte',
                        'Orden de Trabajo',
                        'Item',
                        'Fecha Promesa',
                        'Peso (KGS)',
                        'Peso (LBS)',];


                    var filterVal = [
                        //'proyecto_proceso_producto[0].proyecto_proceso.proceso.nombre', 
                        'excel_proceso', 
                        'numero_parte', 
                        'excel_producto_numero_parte', 
                        'excel_proyecto_orden_compra', 
                        'excel_proyecto_nombre_cliente',
                        'cantidad',
                        'plan_corte',
                        'work_order',
                        'item',
                        'excel_fecha_promesa',
                        'excel_producto_peso_lbs',
                        'excel_producto_peso_kgs',];

                    if(checkPermission(['ver fecha entrega proyectos'])){
                        tHeader.push('Fecha entrega');
                        filterVal.push('excel_fecha_entrega');
                    }
                    
                    if(checkPermission(['view finanzas ordenes abiertas'])){
                        tHeader.push('Precio (DLLS)', 'Precio (Pesos)');
                        filterVal.push('precio_dlls', 'precio_pesos');
                    }


                    this.list.forEach((value, index) => {
                        value.excel_proceso = value.Proceso.proyecto_proceso.proceso.nombre;
                        value.excel_producto_numero_parte = value.producto.numero_parte_cliente;
                        value.excel_proyecto_orden_compra = value.proyecto.orden_compra;
                        value.excel_proyecto_nombre_cliente = value.proyecto.cliente.nombre_cliente;
                        value.excel_fecha_entrega = this.formatMomentDate(value.fecha_entrega);
                        value.excel_fecha_promesa = this.formatMomentDate(value.fecha_promesa);
                        value.excel_producto_peso_lbs = value.producto.peso_lbs;
                        value.excel_producto_peso_kgs = value.producto.peso_kg;
                    });
                    const data = this.formatJson(filterVal, this.list);
                    
                    
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'Ordenes Abiertas'+moment().format(' DD MMMM YYYY HH:MM'),
                    });
                    this.downloading = false;
                });
            },
            handleSinEmbarcarDownload() {

                this.downloading = true;
                
                
                import('@/vendor/Export2Excel').then(excel => {
                    var tHeader = [
                        'Proceso', 
                        'Orden', 
                        'Producto', 
                        'Orden de Compra', 
                        'Cliente',
                        'Cantidad',
                        'Plan de corte',
                        'Orden de Trabajo',
                        'Item',
                        'Fecha Promesa',
                        'Peso (KGS)',
                        'Peso (LBS)',];


                    var filterVal = [
                        //'proyecto_proceso_producto[0].proyecto_proceso.proceso.nombre', 
                        'excel_proceso', 
                        'numero_parte', 
                        'excel_producto_numero_parte', 
                        'excel_proyecto_orden_compra', 
                        'excel_proyecto_nombre_cliente',
                        'cantidad',
                        'plan_corte',
                        'work_order',
                        'item',
                        'excel_fecha_promesa',
                        'excel_producto_peso_lbs',
                        'excel_producto_peso_kgs',];

                    if(checkPermission(['ver fecha entrega proyectos'])){
                        tHeader.push('Fecha entrega');
                        filterVal.push('excel_fecha_entrega');
                    }
                    
                    if(checkPermission(['view finanzas ordenes abiertas'])){
                        tHeader.push('Precio (DLLS)', 'Precio (Pesos)');
                        filterVal.push('precio_dlls', 'precio_pesos');
                    }

                    
                    this.terminadasSinEmbarcarlist.forEach((value, index) => {
                        value.excel_proceso = value.Proceso.proyecto_proceso.proceso.nombre;
                        value.excel_producto_numero_parte = value.producto.numero_parte_cliente;
                        value.excel_proyecto_orden_compra = value.proyecto.orden_compra;
                        value.excel_proyecto_nombre_cliente = value.proyecto.cliente.nombre_cliente;
                        value.excel_fecha_entrega = this.formatMomentDate(value.fecha_entrega);
                        value.excel_fecha_promesa = this.formatMomentDate(value.fecha_promesa);
                        value.excel_producto_peso_lbs = value.producto.peso_lbs;
                        value.excel_producto_peso_kgs = value.producto.peso_kg;
                    });
                    const data = this.formatJson(filterVal, this.terminadasSinEmbarcarlist);
                    
                    
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'Ordenes Terminadas Sin Embarcar'+moment().format(' DD MMMM YYYY HH:MM'),
                    });
                    this.downloading = false;
                });
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },
            async arreglarListado(){
                const { data, meta } = await proyectoProductoResource.arreglarListado();
                this.getList();
            }
        },
        mounted() {
           this.getList();
        }
    }
</script>

