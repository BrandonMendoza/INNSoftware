<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="60%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Proyecto</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Proyecto </span>

            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <input v-model="form.numero_parte" hidden/>

            

            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="Número de Parte (Local)" prop="numero_parte">
                        <el-tag type="info"> {{ form.numero_parte == '' ? '—' :  form.numero_parte}}</el-tag>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Cliente" prop="cliente_id" >
                        <el-select 
                        id="cliente_select"
                        :disabled="!checkPermission(['editar proyectos'])"
                        v-model="form.cliente_nombre" 
                        value-key="nombre_cliente"
                        @change="changeCliente()"
                        filterable>
                            <el-option 
                            v-for="cliente in clientes"
                            :key="cliente.id"
                            :label="cliente.nombre_cliente" 
                            :value="cliente.nombre_cliente"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="Orden de Compra (Cliente)" prop="orden_compra">
                        <el-input :disabled="!checkPermission(['editar proyectos'])" v-model="form.orden_compra"/>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="10" v-if="checkPermission(['ver fecha entrega proyectos'])">
                    <el-form-item label="Fecha de Entrega" prop="fecha_entrega">
                        <el-date-picker
                        :disabled="!checkPermission(['editar proyectos'])"
                        v-model="form.fecha_entrega"
                        type="date"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10" >
                    <el-form-item label="Fecha de Promesa" prop="fecha_promesa">
                        <el-date-picker
                        :disabled="!checkPermission(['editar proyectos'])"
                        v-model="form.fecha_promesa"
                        type="date"/>
                    </el-form-item>
                </el-col>
            </el-row>

                    <el-row v-if="form.id != 0">
                       <el-col>
                             <el-tabs v-model="activeName"  :stretch="true" >
                                <!-- Tab General -->

                                <el-tab-pane label="Ordenes del Proyecto" name="first" >
                                    <el-row>
                                        <div class="filter-container"> 
                                            <!-- AGREGAR -->
                                            <el-button  v-waves :disabled="disableAddProducto" :v-show="checkPermission(['agrergar productos proyectos'])" 
                                                size="small" class="filter-item" style="margin-left:0px;" type="primary" icon="el-icon-plus" @click="handleCreateForm()">
                                                    Agregar</el-button>

                                                <!-- Ediar -->
                                                <el-button  v-waves :disabled="disableEditProducto" :v-show="checkPermission(['editar productos proyectos'])" 
                                                    size="small" class="filter-item" style="margin-left:0px;"  type="primary" icon="el-icon-edit" @click="handleEditForm()">
                                                    Editar</el-button>

                                                <!-- Eliminar -->
                                                <el-button v-waves :disabled="disableDeleteProducto" :v-show="checkPermission(['eliminar productos proyectos'])" 
                                                    size="small" class="filter-item" style="margin-left:0px;"  type="danger" icon="el-icon-delete" @click="deleteRowProductos();">
                                                    Eliminar</el-button>

                                                <!-- Plan de Corte 
                                                <el-button v-waves :disabled="disableCambiarPlanCorte" :v-show="showCambiarPlanCorte&checkPermission(['editar productos proyectos'])" 
                                                    size="small" class="filter-item" style="margin-left:0px;"  type="primary" @click="handleCambiarPlanCorte();">
                                                    Cambiar Plan de Corte</el-button>-->

                                                <!-- COLUMNAS BUTTON -->
                                                <el-popover placement="right-start" size="small" width="400" trigger="click" class="filter-item" style="margin-left:0px;" >
                                                    <!-- <el-checkbox v-model="showProyecto" class="filter-item" style="margin-left:15px;">Ver Nombre del Proyecto (local)</el-checkbox>     -->
                                                    <el-switch 
                                                    active-text="Multiseleccion"
                                                    v-model="showMultipleSelection"  
                                                    :active-value="true" 
                                                    :inactive-value="false"></el-switch>
                                                    
                                                    
                                                    <el-button type="primary" size="small" icon="el-icon-setting" slot="reference"></el-button>
                                                </el-popover>
                                        </div>
                                    </el-row>
                                    <el-row type="flex" justify="space-around" id="embarqueTransfer">
                                        <el-col>
                                            <el-table
                                            :data="displayData"
                                            @current-change="handleCurrentChangeTable"
                                            @selection-change="handleSelectionChange"
                                            v-loading="loadingProyectosProductos"
                                            ref="proyectos_productos_table"
                                            border
                                            fit
                                            highlight-current-row
                                            style="width: 100%">
                                                <el-table-column
                                                type="selection"
                                                align="center"
                                                v-if="showMultipleSelection"
                                                width="55">
                                                </el-table-column>


                                                <!-- <el-table-column
                                                type="index"
                                                align="center" 
                                                width="80"/> -->

                                                <el-table-column
                                                prop="proyecto_producto.numero_parte"
                                                label="Orden"
                                                show-overflow-tooltip/>

                                                <el-table-column
                                                prop="proyecto_producto.numero_parte_cliente"
                                                label="NP Cliente"
                                                show-overflow-tooltip/>

                                                <el-table-column
                                                prop="proyecto_producto.numero_parte_cliente"
                                                label="Producto"
                                                show-overflow-tooltip/>

                                                <el-table-column
                                                prop="proyecto_producto.cantidad"
                                                label="Cantidad"
                                                align="center"
                                                width="85"/>

                                                <!--<el-table-column
                                                prop="proyecto_producto.plan_corte"
                                                label="Plan de Corte"
                                                show-overflow-tooltip/>
                                                -->

                                                <el-table-column
                                                prop="proyecto_producto.work_order"
                                                label="Orden de Trabajo"
                                                align="center"
                                                width="85"/>

                                                <el-table-column
                                                prop="proyecto_producto.item"
                                                label="Item"
                                                align="center"
                                                width="85"/>

                                                <el-table-column
                                                    v-if="checkPermission(['view finanzas ordenes abiertas'])"
                                                    label="Precio (pesos)"
                                                    align="center"
                                                    show-overflow-tooltip>
                                                        <template slot-scope="scope">
                                                            <vue-numeric v-if="scope.row.proyecto_producto.precio_pesos" v-bind:precision="2"  currency="$" separator="," v-model="scope.row.proyecto_producto.precio_pesos" :read-only="true">                                                
                                                            </vue-numeric>
                                                            <span v-else>$ 0.00 </span>
                                                        </template>
                                                </el-table-column> 

                                                <el-table-column
                                                    v-if="checkPermission(['view finanzas ordenes abiertas'])"
                                                    label="Precio (dlls)"
                                                    align="center"
                                                    show-overflow-tooltip>
                                                        <template slot-scope="scope">
                                                            <vue-numeric v-if="scope.row.proyecto_producto.precio_dlls" v-bind:precision="2"  currency="$" separator="," v-model="scope.row.proyecto_producto.precio_dlls" :read-only="true">                                                
                                                            </vue-numeric>
                                                            <span v-else>$ 0.00 </span>
                                                        </template>
                                                </el-table-column>
                                            </el-table>
                                            <!-- Dialog agregar Material -->
                                            <el-row type="flex" justify="end">
                                                <el-pagination
                                                    background
                                                    layout="prev, pager, next"
                                                    @current-change="handleCurrentChangePagination"
                                                    :page-size="pageSize"
                                                    :total="total">
                                                </el-pagination>
                                            </el-row>
                                           
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                   </el-row>


            <span slot="footer" class="dialog-footer">
                <el-button  v-waves  @click="clearFields();close();" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button  v-waves type="success" v-if="form.id == 0" @click="insert('form');" icon="el-icon-check">Agregar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button  v-waves type="success" v-if="form.id != 0" @click="insert('form');" icon="el-icon-check">Guardar</el-button>
            </span>
        </el-dialog>

       

         <!-- Dialogo Editar ProyectoProducto -->
        <el-dialog
        :title="formTitle"
        id="dialogProyectoProducto"
        :visible.sync="dialogoProyectoProductoEdit"
        width="30%">

            <el-form-item class="text-right">
                <el-switch
                style="display: block"
                v-if="currentProyectoProducto.id == 0"
                v-model="currentProyectoProducto.agrupar"
                :active-value="1"
                :inactive-value="0"
                active-color="#409EFF"
                inactive-color="#409EFF"
                :active-text="agruparTexto"
                :disabled="agruparDisabled">
                </el-switch>
            </el-form-item>
            
            <el-row :gutter="20">
                <el-col :span="24">

                   <el-form-item label="Producto" v-if="currentProyectoProducto.id != 0">
                        {{ currentProyectoProducto.nombre_producto}}
                    </el-form-item>

                    <el-form-item label="Producto"  v-if="currentProyectoProducto.id == 0">
                        <el-select 
                        v-model="currentProyectoProducto.producto_id" 
                        value-key="id" 
                        filterable>
                            <el-option 
                                v-for="producto in productosSelect" 
                                :key="producto.id"
                                :label="producto.numero_parte_cliente+' - '+producto.nombre_producto" 
                                :value="producto.id" 
                                :disabled="producto.disabled"/>
                        </el-select>
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="Num. de parte Cliente">
                        <el-input  v-model="currentProyectoProducto.numero_parte_cliente" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Cantidad">
                        <el-input-number :min="1" v-model="currentProyectoProducto.cantidad" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12" v-if="checkPermission(['ver fecha entrega proyectos'])">
                    <el-form-item label="Fecha de Entrega" prop="fecha_entrega">
                        <el-date-picker :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="currentProyectoProducto.fecha_entrega" type="date" format="dd-MMMM-yyyy" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Fecha Promesa" prop="fecha_promesa">
                        <el-date-picker :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="currentProyectoProducto.fecha_promesa" type="date" format="dd-MMMM-yyyy"/>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Orden de Trabajo">
                        <el-input  v-model="currentProyectoProducto.work_order" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Item">
                        <el-input v-model="currentProyectoProducto.item" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Precio (pesos)" >
                        <vue-numeric    class="el-input__inner" 
                                        v-bind:precision="2"  
                                        currency="$" separator="," v-model="currentProyectoProducto.precio_pesos"></vue-numeric>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Precio (dlls)" >
                        <vue-numeric    class="el-input__inner" 
                                        v-bind:precision="2"  
                                        currency="$" separator="," v-model="currentProyectoProducto.precio_dlls" ></vue-numeric>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Plan de Corte" >
                         <el-input v-model="currentProyectoProducto.plan_corte" />
                    </el-form-item>
                </el-col>
            </el-row> -->
            

            <el-form-item label="Heat Number" hidden>
                <el-input v-model="currentProyectoProducto.heat_number" />
            </el-form-item>

            <span slot="footer" class="dialog-footer">
                <el-button  v-waves @click="dialogoProyectoProductoEdit = false">Cancelar</el-button>
                <el-button  v-waves type="primary" @click="updateOrCreateProyectoProducto">Guardar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo Cambiar PLan de CORTE -->
        <el-dialog
        title="Cambiar Plan de Corte"
        id="dialogCambiarPlanCorte"
        :visible.sync="dialogoCambiarPlanCorte"
        width="20%">

            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="Plan de Corte" >
                         <el-input v-model="nuevoPlanCorte"/>
                    </el-form-item>
                </el-col>
            </el-row>
            

            <span slot="footer" class="dialog-footer">
                <el-button  v-waves @click="dialogoCambiarPlanCorte = false">Cancelar</el-button>
                <el-button  v-waves type="primary" @click="updatePlanCorte">Aplicar</el-button>
            </span>
        </el-dialog>

    </el-form>

    

    
</template>
<style scoped>
    .color {
        width: 100%;
    }

     #cliente_col + .el-input {
        width: 100%;
    }

    .el-input-number--mini {
        width: 100%;
    }

    .el-dialog .el-select{
        width:430px;
    }
</style>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
import permission from '@/directive/permission/index.js';
import moment from 'moment';
import role from '@/directive/role/index.js';
import waves from '@/directive/waves'; // Waves directive
import checkPermission from '@/utils/permission';
import ProductoResource from '@/api/producto';
import ProyectoProductoResource from '@/api/proyectoProducto';


const productoResource = new ProductoResource('proyectosProductos');
const productoProductoResource = new ProyectoProductoResource('proyectosProductos');

export default {
    data() {
      return {
        clientes:[],
        productosSelect:[],
        activeName: 'first',
        form:{
            id:0,
            cliente_id:"",
            cliente_nombre:"",
            numero_parte_cliente:"",
            numero_parte:"",
            orden_compra:"",
            plan_corte:"",
            fecha_entrega:"",
            fecha_promesa:"",
            productos:[],
            agrupar:1,
        },
        rules: {
            orden_compra: [
                  { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            cliente_id: [
                { required: true, message: 'Selecciona un cliente', trigger: 'change' },
            ],
            fecha_entrega: [
                { required: true, message: 'Selecciona una fecha de entrega', trigger: 'blur' },
            ],
            fecha_promesa: [
                { required: true, message: 'Selecciona una fecha promesa', trigger: 'blur' },
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
        dialogoProductos:false,
        loadingCliente:false,
        page: 1,
        pageSize: 10,
        total: 0,
        /*Cambiar Plan de corte*/
        dialogoCambiarPlanCorte:false,
        nuevoPlanCorte:"",
        /*ProyectoProducto Dialog*/
        formTitle:'',
        showMultipleSelection:false,
        multipleSelection: [],
        loadingProyectosProductos:false,
        currentProyectoProducto:{
            id:0,
            numero_parte:"",
            cantidad:1,
            heat_number:"",
            work_order:"",
            item:"",
            precio_pesos:0,
            precio_dlls:0,
            agrupar:1,
            proyecto_id:0,
            producto_id:"",
            nombre_producto:"",
            agrupar:1,
            plan_corte:"",
            fecha_entrega:"",
            fecha_promesa:"",
            numero_parte_cliente:"",
        },
        dialogoProyectoProductoEdit:false,
      };
    },
    computed:{
        searching() {
            this.total = this.form.productos.length;
            return this.form.productos;
        },
        displayData() {
            return this.searching.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
        },
        disableAddProducto(){
            if(this.showMultipleSelection == true){
                return true;
            }
            if(this.form.cliente_id == 0)
                return true;
            return false;
        },
        disableEditProducto(){
            if(this.showMultipleSelection == true){
                return true;
            }
            if(this.currentProyectoProducto.id == 0){
                return true;
            }
            return false;
        },
        disableDeleteProducto(){
            if(this.showMultipleSelection == true){
                if(this.multipleSelection.length > 0){
                    return false;
                }
                return true;
            }else{
                if(this.currentProyectoProducto.id == 0){
                    return true;
                }
                return false;
            }
        },
        disableCambiarPlanCorte(){
            if(this.showMultipleSelection == true){
                
                if(this.multipleSelection.length > 0){
                    return false;
                }
                return true;
            }else{
                return true;
            }
        },
        showCambiarPlanCorte(){
            if(this.showMultipleSelection == true){
                
                if(this.multipleSelection.length > 0){
                    return true;
                }
                return false;
            }else{
                return false;
            }
        },
        agruparTexto(){
            if(this.currentProyectoProducto.agrupar == 1){
                return "Agrupar";
            }else{
                return "Agregar "+this.currentProyectoProducto.cantidad+" Orden(es) Nueva(s)";
            }
        },
        agruparDisabled(){
            if(this.currentProyectoProducto.cantidad > 1){
                this.currentProyectoProducto.agrupar = 0;
                return false;
            }else{
                this.currentProyectoProducto.agrupar = 1;
                return true;
            }
        }
    },
    directives: { waves, permission, role  },
    methods: {
        checkPermission,
        open() {
            this.getClientes();
            //this.currentProyectoProducto.proyecto_producto.proyecto_id = this.form.id;
            this.dialogoAgregar = true;
            this.loadingProyectosProductos = false;
        },
        close() {
            this.$parent.setCurrent();
            this.dialogoAgregar = false;
            this.loadingProyectosProductos = false;
        },
        handleCreateForm(){
            //this.dialogoProductos = true;
            this.dialogoProyectoProductoEdit = true;
            this.formTitle = 'Agregar Orden';
            this.getProductos();
            this.clearCurrent();
        },
        handleEditForm(){
            this.formTitle = 'Editar Orden';
            this.dialogoProyectoProductoEdit = true;
        },
        insert(form){/*Update o Insert Proceso*/
            this.$refs[form].validate((valid) => { //validacion del form
                if (valid) {
                    var loadingInstance = this.$loading({
                        target: '.el-dialog'
                    });
                    let me = this;
                    axios.put('/proyectos/insert',me.form).then(function (response) {
                        console.log("RESPONSE");
                        console.log(response);
                        if(me.form.id == 0){
                            console.log("ESTO ERA AGREGAR");
                            me.$parent.loadFieldsUpdate(response.data[0]);
                        }else{
                            console.log("Esto era editar");
                            me.$parent.getList();
                            me.clearFields();
                            me.close(); 
                        }
                        loadingInstance.close();
                        me.$message.success('Guardado correctamente.');
                    })
                    .catch(function (error) {
                        me.$message.error('Hubo un error.');
                        console.log(error);
                    });
                } else {
                    return false;
                }
            });
        },
        clearFields(){/*Limpia los campos e inicializa la variable update a 0*/
            this.form.id = 0;
            this.form.cliente_id = 0;
            this.form.cliente_nombre = "";
            this.form.numero_parte_cliente = "";
            this.form.numero_parte = "";
            this.form.orden_compra = "";
            this.form.plan_corte = "";
            this.form.fecha_entrega = "";
            this.form.fecha_promesa = "";
            this.form.productos = [];


        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
        handleCurrentChangePagination (val) {
            this.page = val
        },
        async getProductos(){
            const { data, meta } = await productoResource.getProductosByCliente(this.form.cliente_id);
            console.log("DATA GET PRODUCTOS");
            console.log(data);
            this.productosSelect = data;
        },
        getClientes(){
            let me =this;
            let url = '/clientes';
            this.loadingClientes = true;
            axios.get(url).then(function (response) {
                me.clientes = response.data;
                me.loadingClientes = false;
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
                me.loadingClientes = false;
            });
        },
        changeCliente(){
            if(this.form.cliente_nombre != ""){
                this.clientes.forEach(cliente => {
                    if(cliente['nombre_cliente'] == this.form.cliente_nombre){
                        this.form.cliente_id = cliente['id'];
                    }
                });
            }else{
                this.current.cliente_id = 0;
            }   
        },
        //*  ProyectoPrducto in Proyecto*/
        clearCurrent(){
            this.setCurrent();
            this.currentProyectoProducto = {
                    id:0,
                    numero_parte:"",
                    cantidad:1,
                    heat_number:"",
                    work_order:"",
                    item:"",
                    precio_pesos:0,
                    precio_dlls:0,
                    agrupar:1,
                    proyecto_id:this.form.id,
                    producto_id: "",
                    nombre_producto:"",
                    numero_parte_cliente:"",
                    agrupar:1,
                    plan_corte:"",
                    fecha_entrega: moment(),
                    fecha_promesa: moment(),
            }
        },
        /*Table ProyectoProducto*/
        /* Cambiar Plan de Corte*/
        async updatePlanCorte(){
            /** "Validacion" */
            if(this.nuevoPlanCorte == ""){
                this.$message.error('Ingresa Plan de Corte');
                return false;
            }
             var loadingInstance = this.$loading({
                target: '#dialogCambiarPlanCorte > .el-dialog'
            });
            //INSERT PROYECTO PRODUCTO A PROYECTO
            var  data = await productoProductoResource.updateMultiplePlanCorte({    nuevoPlanCorte:this.nuevoPlanCorte,
                                                                                    multipleSelection:this.multipleSelection,
                                                                                    proyecto_id:this.form.id});
            this.form.productos = data[0].productos;
            this.setCurrent();
            this.multipleSelection = [];
            this.nuevoPlanCorte = "";
            this.dialogoCambiarPlanCorte = false;
            this.showMultipleSelection = false;
            loadingInstance.close();
        },
        handleCambiarPlanCorte(){
            this.dialogoCambiarPlanCorte = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /* TABLE */
        handleCurrentChangeTable(val) {
            console.log("VAL:::");
            console.log(val);
            if(val != null){
                this.currentProyectoProducto = val.proyecto_producto;
                this.currentProyectoProducto.nombre_producto = val.numero_parte_cliente+' - '+val.nombre_producto;
                this.currentProyectoProducto.proyecto_id = this.form.id;
            }else{
                this.clearCurrent();
            }
        },
        
        setCurrent(row) {
            this.$refs.proyectos_productos_table.setCurrentRow(row);
        },
        async updateOrCreateProyectoProducto() {
            /** "Validacion" */
            if(this.currentProyectoProducto.cantidad == "" || this.currentProyectoProducto.cantidad == 0){
                this.$message.error('Ingresa una cantidad valida');
                return false;
            }
             var loadingInstance = this.$loading({
                target: '#dialogProyectoProducto > .el-dialog'
            });
            //INSERT PROYECTO PRODUCTO A PROYECTO
            var  data = await productoProductoResource.store(this.currentProyectoProducto);
            this.form.productos = data[0].productos;
            this.setCurrent();
            this.dialogoProyectoProductoEdit = false;
            loadingInstance.close();
        },
        async deleteRowProductos(){
            this.$confirm('Esto eliminara permanentemente la Orden. Quieres continuar?', 'Advertencia', {
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                type: 'warning',
            }).then(async() => {
                this.loadingProyectosProductos = true;
                if(this.showMultipleSelection == true){                    
                    var data = await productoProductoResource.deleteMultipleFromProject({multipleSelection:this.multipleSelection,proyecto_id:this.form.id});
                    this.showMultipleSelection = false;
                }else{
                    var data = await productoProductoResource.deleteFromProject(this.currentProyectoProducto);
                }
                this.form.productos = data[0].productos;
                this.loadingProyectosProductos = false;
            }).catch(() => {
                this.$message({
                type: 'info',
                message: 'Eliminacion cancelada',
                });
            });
        },
    },
  };
</script>

    
