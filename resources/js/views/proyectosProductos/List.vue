<template>
    <div class="app-container">

        
        <div class="filter-container">
            <!-- BUSCAR INPUT -->
            <div class="filter-item">
                <el-input class="input-with-select" size="small" placeholder="buscar"  v-model="presearch" @change="handlePresearchChange()" clearable>
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
                    <el-button  slot="append" size="small" v-waves type="primary" icon="el-icon-search"  @click="handleSearch" ></el-button>
                </el-input>
            </div>

            <!-- EDIT -->
            <el-button  v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" :disabled="disableEditar"  @click="loadFieldsUpdate(currentRow)">Editar</el-button>
            <!-- PROCESO -->
            <el-button v-waves v-permission="['cambiar proceso ordenes abiertas']" type="primary" size="small" class="filter-item" title="Cambiar proceso" :disabled="disableEditar" style="margin-left:0px;" @click="cambiarProceso(currentRow);">
                <svg-icon icon-class="process"/> Cambiar Proceso
            </el-button>
            <!-- CODIGO DE BARRAS -->
            <el-button v-waves v-permission="['codigo barras ordenes abiertas']" type="primary" size="small" class="filter-item" icon="el-icon-tickets" title="Cambiar proceso" :disabled="disableEditar" style="margin-left:0px;" @click="codigoBarras(currentRow);">
                Codigo de Barras
            </el-button>
            <!-- Documentos -->
            <el-button v-waves v-permission="['ver documentos proyectos']" type="primary" size="small" class="filter-item" icon="el-icon-document" style="margin-left:0px;" :disabled="disableEditar" @click="loadDocumentos(currentRow)">Documentos</el-button>
            <!-- DELETE -->
            <el-button v-waves v-permission="['eliminar ordenes abiertas']" type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="disableEditar"
                        @click="deleteRow(currentRow.id,currentRow.numero_parte,currentRow.numero_parte_cliente);">Eliminar</el-button>
            <!-- IMPORTAR BUTTON -->
            <router-link v-permission="['importar ordenes abiertas']" class="filter-item"  :to="'/ordenesAbiertas/UploadExcel'">
                <el-button type="primary" size="small" icon="el-icon-edit">
                    Importar    
                </el-button>
            </router-link>
            <!-- COLUMNAS BUTTON -->
            <el-popover placement="left-start" size="small" width="400"  trigger="click" class="filter-item">
                <!-- <el-checkbox v-model="showProyecto" class="filter-item" style="margin-left:15px;">Ver Nombre del Proyecto (local)</el-checkbox>     -->
                <el-switch 
                    class="filter-item" 
                    active-text="Mostrar Ordenes Terminadas"
                    style="margin-left:15px;" 
                    @change="handleSearch"
                    v-model="mostrarTerminados"  
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
                
                <el-button type="primary" size="small" icon="el-icon-setting" slot="reference"></el-button>
            </el-popover>
            
            
            <!-- <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()" hidden>Agregar</el-button> -->
        </div>
        <el-row >
            <el-table
            :data="displayData"
            ref="tableList" 
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
                sortable
                fixed>
                    <template slot-scope="scope">
                        <el-tag :style="'font-weight: bold;background-color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.color+';color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.texto_color+';'">
                            <svg-icon icon-class="process" :style="'background-color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.color+';color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.texto_color+';'"/>
                            {{scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.nombre}}
                        </el-tag>
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
                prop="producto.numero_parte_cliente"
                label="Producto (cliente)"
                show-overflow-tooltip
                width="110"
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
                label="Cliente"/> 

                <af-table-column
                prop="cantidad"
                label="Cantidad"
                show-overflow-tooltip
                width="85"
                align="center"  />

                <af-table-column
                prop="plan_corte"
                label="Plan de Corte"
                align="center"
                width="100"
                show-overflow-tooltip/>
                
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
                prop="fecha_promesa"
                label="Fecha Promesa"
                width="110"
                sortable
                show-overflow-tooltip> 
                    <template slot-scope="scope">
                        
                        <el-tag v-if="scope.row.proyecto_proceso_producto[0].es_ultimo == 1" type="success">
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
                v-if="checkPermission(['ver fecha entrega proyectos'])"
                show-overflow-tooltip> 
                    <template slot-scope="scope">
                        
                        <el-tag v-if="scope.row.proyecto_proceso_producto[0].es_ultimo == 1" type="success">
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
                label="Semana de Entrega"> 
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.proyecto_proceso_producto[0].es_ultimo == 1" type="success">
                            {{ calculateWeeks(scope.row.fecha_entrega) }}
                        </el-tag>

                        <el-tag v-else :type="compareDates(scope.row.fecha_entrega)">
                            {{ calculateWeeks(scope.row.fecha_entrega) }}
                        </el-tag>
                    </template>
                </el-table-column>

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

                <af-table-column
                label="Notas">
                    <template slot-scope="scope">
                        <span class="pre-formateado">{{ scope.row.notas }}</span>
                    </template>
                </af-table-column>
            </el-table>
        </el-row>    
         
        <el-row type="flex" justify="end">
            <el-pagination
                background
                layout="total, sizes, prev, pager, next"
                @current-change="handleCurrentChangePagination"
                :page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]"
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

    .pre-formateado {
        white-space: pre;
    }
    .el-table .cell {
        word-break: break-word;
    }
    
</style>
<script>
import formDialog from './Form';
import documentosDialog from './documentos';
import cambiarProcesoDialog from './cambiarProceso';
import codigoBarrasDialog from './codigoBarras';
import menuCodigoBarrasDialog from './menuCodigoBarras';
import Pagination from '@/components/Pagination'; 

import moment from 'moment';
import uniq from 'lodash/uniq';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission/index.js';
import role from '@/directive/role/index.js';
import checkPermission from '@/utils/permission';
import ProyectoProductoResource from '@/api/proyectoProducto';

const proyectoProductoResource = new ProyectoProductoResource('proyectosProductos');



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
                listUrl:'/proyectosProductos',
                deleteUrl:'/proyectosProductos/delete',
                loading : true,
                list:[],
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
                },
            }
        },
        components: { 
            formDialog : formDialog,
            documentosDialog : documentosDialog,
            cambiarProcesoDialog : cambiarProcesoDialog,
            codigoBarrasDialog : codigoBarrasDialog,
            menuCodigoBarrasDialog : menuCodigoBarrasDialog,
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
            }
        },
        methods:{
            checkPermission,
            //funcion para buscar con barcode
            barcodeSearch(barcodeInput){
                    console.log("DATA RETURNED");
                    console.log(this.list);
                    let dataReturned = this.list.filter(data => data['numero_parte'].toLowerCase().includes(barcodeInput.toLowerCase()));
                   
                    console.log(dataReturned);
                    if(dataReturned.length == 0){
                       this.$message({type: 'info',message: 'No existe orden abierta',});
                    }else{
                       this.menuCodigoBarras(dataReturned[0]);
                    }
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
                return moment(date).week();
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
            async getList(){
                //const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasList();
                this.loading = true;
                const { limit, page } = this.query;
                const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasList(this.query);
                
                if(this.mostrarTerminados == 0){
                    this.list = data.filter(data => data['proyecto_proceso_producto'][0]['proyecto_proceso']['es_ultimo'] == 0);
                }else{
                    this.list = data;
                }
                console.log("LIST");
                console.log(this.list);
                
                this.cargarProcesosFiltro();
                this.cargarClientesFiltro();
                this.loading = false;
            },
            cargarProcesosFiltro(){
                var filtroItem = {};
                for (var openOrder of this.list) {
                    filtroItem = {
                        value: openOrder.proyecto_proceso_producto[0].proyecto_proceso.proceso.nombre,
                        text: openOrder.proyecto_proceso_producto[0].proyecto_proceso.proceso.nombre
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
                return row["proyecto_proceso_producto"][0]["proceso"]["nombre"] === value;
            },
            filterClienteHandler(value, row, column) {
                const property = column['property'];
                return row["proyecto"]["cliente"]["nombre_cliente"] === value;
            },
        },
        mounted() {
           this.getList();
        }
    }
</script>

