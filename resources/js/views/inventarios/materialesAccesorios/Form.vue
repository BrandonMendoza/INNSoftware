<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="40%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Material/Accesorio</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Material/Accesorio </span>

            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <input v-model="form.material_cliente_id" hidden/>
            <el-row :gutter="20">
                <el-col :span="8" style="padding-top:55px;">
                    <el-form-item label="Estatus" prop="status_id">
                        <el-select v-model="form.status_id" value-key="form.status_id" style="width: 100%;" :row-class-name="tableRowClassName">
                            <el-option 
                                v-for="status in statusList"
                                :key="status.id"
                                :label="status.nombre" 
                                :value="status.id"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Categoría" prop="categoria">
                        <el-select v-model="form.catalogo" value-key="form.catalogo" style="width: 100%;" @change="getMaterialesAccesorios();changeCategoria()">
                            <el-option 
                                v-for="categoria in categorias"
                                :key="categoria.id"
                                :label="categoria.nombre" 
                                :value="categoria.id"/>
                        </el-select>
                    </el-form-item>

                    

                    <el-form-item label="Material/Accesorio" prop="material_id"  >
                        <el-select v-model="form.material_id" value-key="form.material_id" style="width: 100%;" v-loading="loadingMaterialAccesorio" filterable clearable>
                            <el-option 
                                v-for="materialAccesorio in materialesAccesorios"
                                :key="materialAccesorio.id"
                                :label="form.catalogo == 1 ? materialAccesorio.nombreCompleto : materialAccesorio.descripcion" 
                                :value="materialAccesorio.id"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Cantidad" prop="cantidad">
                            <el-input-number :min="1" v-model="form.cantidad" style="width: auto;"/>
                    </el-form-item> 

                </el-col>
                <el-col :span="16">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="General" name="first">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Tba" prop="tba">
                                        <el-input v-model="form.tba" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Heat Number" prop="heat_number">
                                        <el-input v-model="form.heat_number" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                               
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Work Order" prop="work_order">
                                        <el-input v-model="form.work_order" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Item" prop="item">
                                        <el-input v-model="form.item" />
                                    </el-form-item> 
                                </el-col>
                            </el-row>

                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Proyecto" prop="proyecto">
                                        <el-input v-model="form.proyecto" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Plan de Corte" prop="plan_corte">
                                        <el-input v-model="form.plan_corte" />
                                    </el-form-item> 
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="Cliente-Material" name="second">

                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Cliente">
                                        <el-select v-model="form.cliente_id" style="width: 100%;" @change="changeCliente()" v-loading="loadingClientes" filterable clearable>
                                            <el-option 
                                                v-for="cliente in clientes"
                                                :label="cliente.nombre_cliente" 
                                                :value="cliente.id"  
                                                :key="cliente.id"/>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Número de Parte (Cliente)" prop="numero_parte">
                                        <el-input v-model="form.numero_parte" :disabled="clienteFormDisable"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Almacén" prop="almacen">
                                        <el-input v-model="form.almacen" :disabled="clienteFormDisable"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Locación" prop="locacion_almacen">
                                        <el-input v-model="form.locacion_almacen" :disabled="clienteFormDisable"/>
                                    </el-form-item> 
                                </el-col>
                            </el-row>
                            
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="clearFields();dialogoAgregar = false" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button type="success" v-if="form.id == 0" @click="insert('form');" icon="el-icon-check">Agregar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button type="success" v-if="form.id != 0" @click="insert('form');" icon="el-icon-check">Guardar</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>
<style scoped>
    .color {
        width: 100%;
    }
</style>

<style>
  .el-table .danger-row {
    background: #FDE2E2;
  }

  .el-table .success-row {
    background: #E1F3D8;
  }

  .el-table .warning-row {
    background: #E1F3E5;
  }
</style>
<script>
    var esNumero = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('Ingresa un dato'));
        }
        value = Number(value);
        if (isNaN(value)) {
            return callback(new Error('Error de formato'));
        }
        if (value == 0) {
            callback(new Error('Debe de ser mayor a 0'));
        }else{
                callback();
        }
    };
  export default {
    data() {
      return {
        hexTokens: {
            F: {
                pattern:/[0-9a-fA-F]/,
                transform: v => v.toLocaleUpperCase()
            },
            '#': {pattern: /\d/},
            X: {pattern: /[0-9a-zA-Z]/},
            S: {pattern: /[a-zA-Z]/},
            A: {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
            a: {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
            '!': {escape: true}
        },
        materialesAccesorios:[],
        clientes:[],
        aceros:[],
        categorias: [
            { id: 1, nombre: 'Material' },
            { id: 2, nombre: 'Accesorio' },
        ],
        statusList: [
            { id: 1, nombre: 'Sin Recibir' },
            { id: 2, nombre: 'Recibido' }, 
            { id: 3, nombre: 'Revisando' }
        ],
        activeName: 'first',
        loadingMaterialAccesorio:true,
        loadingClientes:true,
        clienteFormDisable:true,
        form:{
            id:0,
            status_id:1,
            catalogo:1,
            cliente_id:"",
            material_id:"",
            cantidad:"",
            tba:"",
            heat_number:"",
            work_order:"",
            item:"",
            proyecto:"",
            plan_corte:"",
            numero_parte:"",
            almacen:"",
            locacion_almacen:"",
            material_cliente_id:0,
        },
        rules: {
            material_id: [
                { required: true, message: 'Selecciona un material/accesorio', trigger: 'blur' },
            ],
            cliente_id: [
                { required: true, message: 'Selecciona un cliente', trigger: 'blur' },
            ],
            cantidad: [
                { validator: esNumero, trigger: 'blur' }
            ],
            // locacion_almacen: [
            //     { required: true, message: 'Ingresa una locación', trigger: 'blur' },
            // ],
            // almacen: [
            //     { required: true, message: 'Ingresa un almacén', trigger: 'blur' },
            // ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
      };
    },
    methods: {
        open() {
            this.getMaterialesAccesorios();
            this.getClientes();
            this.dialogoAgregar = true;
        },
        close() {
            this.dialogoAgregar = false;
        },
        insert(form){/*Update o Insert Proceso*/
            this.$refs[form].validate((valid) => { //validacion del form
                if (valid) {
                    var loadingInstance = this.$loading({
                        target: '.el-dialog'
                    });
                    let me = this;
                    
                    axios.put('/inventariosMaterialesAccesorios/insert',me.form).then(function (response) {
                        me.$parent.getList();
                        me.clearFields();
                        me.close(); 
                        loadingInstance.close();
                        me.$message.success("Guardado correctamente");
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
        clearFields(){

            this.form.id = 0;
            this.form.status_id = 1;
            this.form.catalogo = 1;
            this.form.cliente_id = "";
            this.form.material_cliente_id = "";
            this.form.cantidad = "";
            this.form.tba = "";
            this.form.heat_number = "";
            this.form.work_order = "";
            this.form.item = "";
            this.form.proyecto = "";
            this.form.plan_corte = "";
            this.form.material_cliente_id = "";
            this.form.locacion_almacen = "";
            this.form.almacen = "";
            this.form.numero_parte = "";

        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
        getMaterialesAccesorios(){
            let me =this;
            let url = '/inventariosMaterialesAccesorios/getMaterialesAccesoriosByCatalogo';
            this.loadingMaterialAccesorio = true;
            console.log("GET MATERIALESACC");
            console.log(this.form.catalogo);
            if(this.form.catalogo == 1){
               url = '/materialesNombreCompleto' 
            }else{
                url = '/accesorios' 
            }
            axios.get(url).then(function (response) {
                me.materialesAccesorios = response.data;
                me.loadingMaterialAccesorio = false;
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
                me.loadingMaterialAccesorio = false;
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
                // handle error
                me.$message.error("Hubo un error");
                console.log(error);
                me.loadingClientes = false;
            });
        },
        changeCategoria(){
            this.form.material_id = "";
        },
        changeCliente(){
            if(this.form.cliente_id == ""){
                this.clienteFormDisable = true;
            }else{
                let me = this;
                let url = '/inventariosMaterialesAccesorios/getMaterialClienteByMaterialCliente';
                axios.put(url,me.form).then(function (response) {
                    me.form.numero_parte = response.data.numero_parte;
                    me.form.almacen = response.data.almacen;
                    me.form.locacion_almacen = response.data.locacion_almacen;
                    me.form.material_cliente_id =  response.data.id;
                })
                .catch(function (error) {
                    // handle error
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
                this.clienteFormDisable = false;
            }
        },
        tableRowClassName({row, rowIndex}) {
            if (this.form.status_id === 1) { //sin recibir
                return 'danger-row';
            } else if (this.form.status_id === 2) {//recibido  
                return 'success-row';
            }else if (this.form.status_id === 3) {//revisando  
                return 'warning-row';
            }
            return '';
        }
    },
  };
</script>

    
  