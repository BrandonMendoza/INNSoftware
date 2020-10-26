<template>
    <el-form  :model="form" :rules="rules" ref="form" label-position="top"   label-width="100px" >
        <el-dialog
        width="20%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Tipo de Acero</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Tipo de Acero </span>
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            

            <el-form-item label="Nombre" prop="nombre">
                <el-input v-model="form.nombre" />
            </el-form-item>

            <el-form-item label="Simbolo" prop="simbolo">
                <el-input v-model="form.simbolo" />
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
  export default {
    data() {
      return {
        form:{
            id:0,
            nombre:"",
            simbolo:"",
            cantidad_datos:"",
        },
        rules: {
            nombre: [
                { required: true, message: 'Ingresa un nombre', trigger: 'blur' },
            ],
            simbolo: [
                { required: true, message: 'Ingresa un simbolo', trigger: 'blur' }
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
      };
    },
    methods: {
        open() {
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
                    
                    axios.put('/acerosMateriales/insert',me.form).then(function (response) {
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
        clearFields(){
            this.form.id = 0;
            this.form.nombre = "";
            this.form.simbolo = "";
            this.form.cantidad_datos = "";
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); 
                this.close(); 
            })
            .catch(_ => {});
        },
    },
  };
</script>

    
  