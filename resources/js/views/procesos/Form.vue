<template>
    <el-form  :model="form" :rules="rules" ref="form" label-position="top"   label-width="100px" >
        <el-dialog
        width="20%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Proceso</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Proceso </span>
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            

            <el-form-item class="text-right">
                <el-switch v-model="form.activo" active-text="Activo" :active-value="1" :inactive-value="0"></el-switch>    
            </el-form-item>

            <el-form-item label="Nombre del Proceso" prop="nombre">
                <el-input v-model="form.nombre" />
            </el-form-item>

            <el-form-item label="Simbolo" prop="simbolo">
                <el-input v-model="form.simbolo" />
            </el-form-item>

            <el-form-item required>
                <el-col :span="5">
                    <el-form-item label="Color" prop="color"> 
                        <el-color-picker v-model="form.color" :predefine="predefineColors" class="color"/>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2"></el-col>
                <el-col :span="10">
                    <el-form-item label="Color del Texto" prop="texto_color">
                        <el-select v-model="form.texto_color" placeholder="selecciona color del texto" style="width: 100%;">
                            <el-option label="Negro" value="#000000"></el-option>
                            <el-option label="Blanco" value="#FFFFFF"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item>
                <div class="text-center" :style="{'background-color':form.color,'color':form.texto_color}">
                    <b>EJEMPLO</b>
                </div>
            </el-form-item>


            <span slot="footer" class="dialog-footer">
                <el-button @click="clearFields();dialogoAgregar = false" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button type="success" v-if="form.id == 0" @click="insertProceso('form');" icon="el-icon-check">Agregar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button type="success" v-if="form.id != 0" @click="insertProceso('form');" icon="el-icon-check">Guardar</el-button>
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
            activo:1,
            nombre:"",
            simbolo:"",
            color:"",
            texto_color:"#000000"
        },
        rules: {
            nombre: [
                { required: true, message: 'Ingresa un nombre de Proceso', trigger: 'blur' },
            ],
            simbolo: [
                { required: true, message: 'Ingresa un simbolo de Proceso', trigger: 'blur' }
            ],
            color: [
                { required: true, message: 'Selecciona un color', trigger: 'change' }
            ],
            texto_color: [
                { required: true, message: 'Seleccion un color de texto', trigger: 'change' }
            ],
        },
        checked:"",
        update:0,
        dialogoAgregar: false,
        dialogRef: 'myForm',
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ]
      };
    },
    methods: {
        open() {
            this.dialogoAgregar = true;
        },
        close() {
            this.dialogoAgregar = false;
        },
        insertProceso(form){/*Update o Insert Proceso*/
            

            this.$refs[form].validate((valid) => { //validacion del form
                if (valid) {
                    let me = this;
                    var loadingInstance = this.$loading({
                        target: '.el-dialog'
                    });
                    axios.put('/proceso/insert',me.form).then(function (response) {
                        me.$parent.getProcesos();
                        me.clearFields();
                        me.close(); 
                        loadingInstance.close();
                        me.$message.success('Guardado correctamente.');
                    })
                    .catch(function (error) {
                        me.$message.success('Hubo un error.');
                        console.log(error);
                    });
                } else {
                    return false;
                }
            });
        },
        clearFields(){/*Limpia los campos e inicializa la variable update a 0*/
            this.form.id = 0;
            this.form.activo = 1;
            this.form.nombre = "";
            this.form.simbolo = "";
            this.form.color= "";
            this.form.texto_color = "#000000";
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

    
  