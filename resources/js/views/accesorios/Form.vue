<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"   label-width="100px" >
        <el-dialog
        width="20%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Accesorio</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Accesorio </span>
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <input v-model="form.catalogo" hidden/>
            

            <el-form-item label="Número de Parte" prop="numero_parte">
                <el-input v-model="form.numero_parte" />
            </el-form-item>

            <el-form-item label="Descripción" prop="descripcion">
                <el-input v-model="form.descripcion" />
            </el-form-item>

            <el-form-item label="Acero" prop="acero_id" >

                <el-select v-model="form.acero_id" value-key="form.acero_id"  style="width:100%">
                    <el-option 
                        v-for="acero in aceros"
                        :key="acero.id"
                        :label="acero.nombre" 
                        :value="acero.id" />
                </el-select>
            </el-form-item>

            

            <el-row :gutter="20" align="bottom">
                <el-col :span="10">
                    <el-form-item label="Peso(kg)" prop="peso_kg">
                        <el-input v-model="form.peso_kg" />
                    </el-form-item>
                </el-col>
                <el-col :span="14"/>
            </el-row>
            

            <!-- <input v-model="message" v-on:keypress="isNumber(event)"> -->


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
        tiposMateriales:[],
        aceros:[],
        form:{
            id:0,
            catalogo:2,
            numero_parte:"",
            descripcion:"",
            acero_id:"",
            peso_kg:"",
        },
        rules: {
            numero_parte: [
                { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            descripcion: [
                { required: true, message: 'Ingresa una descripcion', trigger: 'blur' },
            ],
            acero_id: [
                { required: true, message: 'selecciona un acero', trigger: 'change' }
            ],
            descripcion: [
                { required: true, message: 'ingresa una descripción', trigger: 'change' }
            ],
            peso_kg: [
                { validator: esNumero, trigger: 'blur' }
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
      };
    },
    methods: {
        open() {
            this.getAceros();
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
                    
                    axios.put('/accesorios/insert',me.form).then(function (response) {
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
        getAceros(){
            let me =this;
            let url = '/acerosMateriales';
            axios.get(url).then(function (response) {
                me.aceros = response.data;
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        clearFields(){
            this.form.id = 0;
            this.form.numero_parte = "";
            this.form.descripcion = "";
            this.form.acero_id = "";
            this.form.peso_kg = "";
            //this.$refs['form'].resetFields();
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        }
    },
  };
</script>

    
  