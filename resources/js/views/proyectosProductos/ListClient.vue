<template>
    <div class="app-container" id="app-container">
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

            <!-- HISTORIAL DE PROCESOS -->
            <el-button  v-waves type="primary" size="small" class="filter-item" icon="el-icon-time" :disabled="disableEditar"  @click="dialogoHistorial = true; getHistorial(currentRow);">Historial de Procesos</el-button>
            <!-- ACTUALIZAR -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-refresh" slot="reference" @click="getList()" style="margin-left:0px;"></el-button>
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
                <el-badge  class="item" :value="scope.row.proyecto_producto_comentario.length">
                    <el-tag  v-if="scope.row.proyecto_proceso_producto.length > 0" :style="'font-weight: bold;background-color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.color+';color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.texto_color+';'">
                        <svg-icon icon-class="process" :style="'background-color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.color+';color:'+scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.texto_color+';'"/>
                        {{scope.row.proyecto_proceso_producto[0].proyecto_proceso.proceso.nombre}}
                    </el-tag>

                    <el-tag v-else="scope.row.proyecto_proceso_producto.length < 1" type="danger">
                        Error de Proceso
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
                    
                    <el-tag v-if="scope.row.proyecto_proceso_producto[0].proyecto_proceso.es_ultimo == 1" type="success">
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
                    
                    <el-tag v-if="scope.row.proyecto_proceso_producto[0].proyecto_proceso.es_ultimo == 1" type="success">
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
                    <el-tag v-if="scope.row.proyecto_proceso_producto[0].proyecto_proceso.es_ultimo == 1" type="success">
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


        <!-- Dialogo Agregar Doc -->
        <el-dialog
        id="dialogoHistorial"
        title="Historial de Procesos"
        :visible.sync="dialogoHistorial"
        width="50%">

            <el-table
            :data="historial"
            border
            fit
            highlight-current-row
            style="width: 100%">
                <el-table-column
                type="index"
                align="center" 
                width="60"/>

                <el-table-column
                label="Proceso"
                width="220">
                    <template slot-scope="scope">
                        <el-tag :style="'font-weight: bold;background-color:'+scope.row.proyecto_proceso.proceso.color+';color:'+scope.row.proyecto_proceso.proceso.texto_color+';'">
                            <svg-icon icon-class="process"/>
                            {{scope.row.proyecto_proceso.proceso.nombre}}
                        </el-tag>
                    </template>
                </el-table-column>  

                <el-table-column
                prop="iniciado_el"
                label="Fecha"
                align="center" 
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.iniciado_el == null ? '—' :  formatMoment(scope.row.iniciado_el) }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="user.name"
                label="Usuario"
                align="center" 
                show-overflow-tooltip/>
            </el-table>

            <div class="filter-container" hidden>
                <pagination 
                v-show="historial.length>0" 
                :total="historial.length" 
                :page.sync="listQuery.page" 
                :limit.sync="listQuery.limit" 
                @pagination="getHistorial" 
                layout="total, prev, pager, next"/>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoHistorial = false;" class="float-left">Cerrar</el-button>
            </span>
        </el-dialog>

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
        overflow: visible;
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
                /* DIALOGO HISTORIAL */
                dialogoHistorial:false,
                historial:[],
                listQuery: {
                    page: 1,
                    limit: 5,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id',
                },
            }
        },
        components: { 
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
            async getList(){
                //const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasList();
                this.loading = true;
                const { limit, page } = this.query;
                const { data, meta } = await proyectoProductoResource.getOrdenesAbiertasByCliente(20);

                console.log("DATA GET LIST");
                console.log(data);
                
                if(this.mostrarTerminados == 0){
                    this.list = data.filter(data => data['proyecto_proceso_producto'][0]['proyecto_proceso']['es_ultimo'] == 0);
                }else{
                    this.list = data;
                }
                
                this.pagesSizeOptions = [ 100, 300, 600, 1000]
                this.pagesSizeOptions.push(this.list.length);
                this.pageSize = this.list.length;
                
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
                return row["proyecto_proceso_producto"][0]["proyecto_proceso"]["proceso"]["nombre"] === value;
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
                this.currentComentario.proyecto_proceso_id = row.proyecto_proceso_producto[0].proyecto_proceso_id;
                this.currentComentario.proyecto_producto_id = row.proyecto_proceso_producto[0].proyecto_producto_id;
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
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
            },
            async getHistorial(currentRow){
                let me = this;
                var loadingInstance = this.$loading({ target: '#dialogoHistorial > .el-dialog' });
                let url = '/proyectosProductos/getHistorialProcesos';
                axios.put(url,currentRow).then(function (response) {
                    //cargar barra de porcentaje
                    me.historial = response.data;
                    loadingInstance.close();
                })
                .catch(function (error) {
                    loadingInstance.close();
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            }
        },
        mounted() {
           this.getList();
        }
    }
</script>

