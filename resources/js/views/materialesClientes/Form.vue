<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="25%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Asignar Material</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Asignación </span>

            
                <!-- Id del proceso que se esta editando ("0" si es agregar) -->
                <input v-model="form.id" hidden/>

                <el-form-item label="Categoría" prop="categoria">
                    <el-select v-model="form.catalogo" style="width: 100%;" @change="getMaterialesAccesorios()">
                        <el-option label="Material" :value="1" ></el-option>
                        <el-option label="Accesorio​" :value="2"></el-option>
                    </el-select>
                </el-form-item>

                <!-- <el-divider content-position="left"> <p style="font-size: 14px; color: #5e6d82; line-height: 1.5em;">General</p></el-divider> -->

                <el-form-item label="Número de Parte" prop="numero_parte">
                    <el-input v-model="form.numero_parte"/>
                </el-form-item>

                <el-form-item label="Material/Accesorio" prop="material_id">
                    <el-select v-model="form.material_id" style="width: 100%;" :loading="loadingMaterialAccesorio">
                        <el-option 
                            :label="materialAccesorio.catalogo == 1 ? materialAccesorio.nombreCompleto : materialAccesorio.descripcion" 
                            :value="materialAccesorio.id" 
                            v-for="materialAccesorio in materialesAccesorios" 
                            :key="materialAccesorio.id"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="Cliente" prop="cliente_id"  >
                    <el-select v-model="form.cliente_id" style="width: 100%;" filterable>
                        <el-option 
                            :label="cliente.nombre_cliente" 
                            :value="cliente.id" 
                            v-for="cliente in clientes" 
                            :key="cliente.id"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="Almacén" prop="almacen">
                    <el-input v-model="form.almacen" />
                </el-form-item>   

                <el-form-item label="Locación" prop="locacion_almacen">
                    <el-input v-model="form.locacion_almacen" />
                </el-form-item>           


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
<script>
    var esNumero = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('Ingresa peso'));
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
        loadingMaterialAccesorio:true,
        form:{
            id:0,
            catalogo:1,
            numero_parte:"",
            material_id:"",
            cliente_id:"",
            locacion_almacen:"",
            almacen:"",
        },
        rules: {
            numero_parte: [
                { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            material_id: [
                { required: true, message: 'Selecciona un material/accesorio', trigger: 'blur' },
            ],
            cliente_id: [
                { required: true, message: 'Selecciona un cliente', trigger: 'blur' },
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
                    
                    axios.put('/materialesClientes/insert',me.form).then(function (response) {
                        console.log("Response:");
                        console.log(response);
                        
                        me.$parent.getList();//llamamos al metodo getTask(); para que refresque nuestro array y muestro los nuevos datos
                        me.clearFields();//Limpiamos los campos e inicializamos la variable update a 0
                        me.close(); 
                        loadingInstance.close();
                        me.notificarSuccess("Asignado correctamente");
                    })
                    .catch(function (error) {
                        me.notificarError();
                        console.log(error);
                    });
                } else {
                    return false;
                }
            });
        },
        clearFields(){/*Limpia los campos e inicializa la variable update a 0*/

            this.form.id = 0;
            this.form.catalogo = 1;
            this.form.numero_parte = "";
            this.form.material_id = "";
            this.form.cliente_id = "";
            this.form.locacion_almacen = "";
            this.form.almacen = "";

        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
        notificarSuccess(mensaje = 'Agregado correctamente.') {
            this.$message({
                message: mensaje,
                type: 'success'
            });
        },
        notificarError(mensaje = "Hubo un error.") {
            this.$message.error({
                message: mensaje,
            });
        },
        getMaterialesAccesorios(){
            let me =this;
            let url = '/materialesClientes/getMaterialesAccesoriosByCatalogo' 
            me.loadingMaterialAccesorio = true;
            console.log("GET MATERIALESACC");
            console.log(this.form.catalogo);
            axios.put(url,{'catalogo':this.form.catalogo}).then(function (response) {
                //creamos un array y guardamos el contenido que nos devuelve el response
                console.table("RESPONSE Materiales Accesorios:");
                console.log(response.data);
                console.table(response.data);
                me.materialesAccesorios = response.data;
                me.loadingMaterialAccesorio = false;
            })
            .catch(function (error) {
                // handle error
                me.notificarError();
                console.log(error);
                me.loadingMaterialAccesorio = false;
            });
        },
        getClientes(){
            let me =this;
            let url = '/clientes' 
            axios.get(url).then(function (response) {
                //creamos un array y guardamos el contenido que nos devuelve el response
                console.table("RESPONSE Clientes:");
                console.log(response.data);
                console.table(response.data);
                me.clientes = response.data;
            })
            .catch(function (error) {
                // handle error
                me.notificarError();
                console.log(error);
            });
        }
    },
  };
</script>

    
  