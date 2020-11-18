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

            <span style="margin-right: 5px;"><b>Núm. de Parte (Local): </b> {{form.numero_parte}}</span>
            <br>
            <el-row :gutter="20">
                <el-col :span="6">
                    

                    <el-form-item label="Cliente" prop="cliente_id">
                        <el-select 
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

                    <el-form-item label="Nombre del Proyecto" prop="numero_parte_cliente">
                        <el-input v-model="form.numero_parte_cliente" />
                    </el-form-item>  

                    <el-form-item label="Orden de Compra (Cliente)" prop="orden_compra">
                        <el-input v-model="form.orden_compra" />
                    </el-form-item>

                    <el-form-item label="Fecha de Entrega" prop="fecha_entrega">
                        <el-date-picker
                        v-model="form.fecha_entrega"
                        type="date"/>
                    </el-form-item>
                    
                </el-col>
                <el-col :span="18">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- Tab Materiales -->
                        <el-tab-pane label="Productos" name="first">
                            <div class="filter-container">
                                <el-button size="mini" class="filter-item" type="primary" icon="el-icon-plus" @click="openProductDialog()">Agregar</el-button>
                            </div>
                            <el-table
                            :data="displayData"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%">
                                <el-table-column
                                type="index"
                                align="center" 
                                width="80"/>

                                <el-table-column
                                prop="numero_parte_cliente"
                                label="Producto"
                                show-overflow-tooltip/>

                                <el-table-column
                                prop="proyecto_producto.cantidad"
                                label="Cantidad"
                                align="center"
                                width="85"/>

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

                                <af-table-column
                                    label="Precio (pesos)"
                                    align="center"
                                    width="85"
                                    show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <vue-numeric v-if="scope.row.proyecto_producto.precio_pesos" v-bind:precision="2"  currency="$" separator="," v-model="scope.row.proyecto_producto.precio_pesos" :read-only="true">                                                
                                            </vue-numeric>
                                            <span v-else>$ 0.00 </span>
                                        </template>
                                </af-table-column> 

                                <af-table-column
                                    label="Precio (dlls)"
                                    align="center"
                                    width="85"
                                    show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <vue-numeric v-if="scope.row.proyecto_producto.precio_dlls" v-bind:precision="2"  currency="$" separator="," v-model="scope.row.proyecto_producto.precio_dlls" :read-only="true">                                                
                                            </vue-numeric>
                                            <span v-else>$ 0.00 </span>
                                        </template>
                                </af-table-column> 

                                


                                <el-table-column
                                align="center"
                                width="80">
                                    <template slot-scope="scope">
                                        <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="loadFieldsUpdate(scope.row);"/> -->
                                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRowProductos(scope.row);"/>
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
                        </el-tab-pane>
                        
                        
                    </el-tabs>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="clearFields();close();" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button type="success" v-if="form.id == 0" @click="insert('form');" icon="el-icon-check">Agregar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button type="success" v-if="form.id != 0" @click="insert('form');" icon="el-icon-check">Guardar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo Agregar Material -->
        <el-dialog
        title="Agregar Material a Producto"
        :visible.sync="dialogoProductos"
        width="25%">
            <el-form-item label="Producto">
                <el-select 
                v-model="productoAgregar.producto" 
                style="width: 100%;" 
                value-key="id" 
                filterable>
                    <el-option 
                        v-for="producto in productosSelect" 
                        :key="producto.id"
                        :label="producto.numero_parte_cliente" 
                        :value="producto" 
                        :disabled="producto.disabled"/>
                </el-select>
            </el-form-item>

            <el-form-item label="Cantidad">
                <el-input-number size="mini" :min="1" v-model="productoAgregar.proyecto_producto.cantidad" />
            </el-form-item>

            <el-form-item label="Item">
                <el-input v-model="productoAgregar.proyecto_producto.item" />
            </el-form-item>

            <el-form-item label="Orden de Trabajo">
                <el-input  v-model="productoAgregar.proyecto_producto.work_order" />
            </el-form-item>

            <el-form-item label="Precio (pesos)" >
                <vue-numeric    class="el-input__inner" 
                                v-bind:precision="2"  
                                currency="$" separator="," v-model="productoAgregar.proyecto_producto.precio_pesos" style="width: auto;"></vue-numeric>
            </el-form-item>

            <el-form-item label="Precio (dlls)" >
                <vue-numeric    class="el-input__inner" 
                                v-bind:precision="2"  
                                currency="$" separator="," v-model="productoAgregar.proyecto_producto.precio_dlls" style="width: auto;"></vue-numeric>
            </el-form-item>

            <el-form-item label="Heat Number" hidden>
                <el-input v-model="productoAgregar.proyecto_producto.heat_number" />
            </el-form-item>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoProductos = false">Cancelar</el-button>
                <el-button type="primary" @click="agregarProducto">Confirmar</el-button>
            </span>
        </el-dialog>
    </el-form>

    
</template>
<style scoped>
    .color {
        width: 100%;
    }
</style>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
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
            productos:[],
        },
        productoAgregar:{
            producto:"",
            proyecto_producto:{
                cantidad:1,
                heat_number:"",
                work_order:"",
                item:"",
                precio_pesos:0,
                precio_dlls:0
            },
        },
        rules: {
            numero_parte_cliente: [
                  { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            cliente_id: [
                { required: true, message: 'Selecciona un cliente', trigger: 'change' },
            ],
            fecha_entrega: [
                { required: true, message: 'Selecciona una fecha de entrega', trigger: 'blur' },
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
        dialogoProductos:false,
        loadingCliente:false,
        page: 1,
        pageSize: 10,
        total: 0,
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
    },
    methods: {
        open() {
            this.getClientes();
            this.dialogoAgregar = true;
        },
        close() {
            this.$parent.setCurrent();
            this.dialogoAgregar = false;
        },
        openProductDialog(){
            this.dialogoProductos = true;
            this.getProductos();
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
                        me.$parent.getList();
                        me.clearFields();
                        me.close(); 
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
            this.form.cliente_id = "";
            this.form.cliente_nombre = "";
            this.form.numero_parte_cliente = "";
            this.form.orden_compra = "";
            this.form.plan_corte = "";
            this.form.fecha_entrega = "";
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
        getProductos(){
            let me =this;
            let url = '/productos';
            axios.get(url).then(function (response) {
                me.productosSelect = response.data;
                me.actualizarSelectProductos();
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
            });
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
            this.clientes.forEach(cliente => {
                if(cliente['nombre_cliente'] == this.form.cliente_nombre){
                    this.form.cliente_id = cliente['id'];
                }
            });
        },
        handleClick(tab, event) {
        },
        agregarProducto(){
            /** "Validacion" */
            if(this.productoAgregar.producto.id == "" ){
                this.$message.error('Selecciona un producto');
                return false;
            }
            if(this.productoAgregar.proyecto_producto.cantidad == "" || this.productoAgregar.proyecto_producto.cantidad == 0){
                this.$message.error('Ingresa una cantidad valida');
                return false;
            }
            /**Se agrerga el producto a la lista */
            this.productoAgregar.producto['proyecto_producto'] = JSON.parse(JSON.stringify(this.productoAgregar.proyecto_producto));
            this.form.productos.push(this.productoAgregar.producto);
            /**Se limpian los campos */
            this.productoAgregar.producto = "";
            this.productoAgregar.proyecto_producto.cantidad = 1;
            this.productoAgregar.proyecto_producto.heat_number="";
            this.productoAgregar.proyecto_producto.work_order="";
            this.productoAgregar.proyecto_producto.item="";
            this.productoAgregar.proyecto_producto.precio_pesos = 0;
            this.productoAgregar.proyecto_producto.precio_dlls = 0;
            this.productosSelect = [];
            this.dialogoProductos = false;
        },
        actualizarSelectProductos(){
            this.productosSelect = this.productosSelect.filter(x=> !this.form.productos.some(y=> y.id==x.id ));
        },
        deleteRowProductos(row){
            this.$confirm('Esto eliminara permanentemente el producto. Quieres continuar?', 'Advertencia', {
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                type: 'warning',
            }).then(() => {
                let i = this.form.productos.map(producto => producto.id).indexOf(row.id);
                this.form.productos.splice(i, 1);
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

    
