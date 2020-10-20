<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="40%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if='form.id === ""' slot="title"><i class="el-icon-plus"></i> Agregar Pintura</span>
            <span v-if='form.id !== ""' slot="title"><i class="el-icon-edit"></i> Editar Pintura </span>

            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <el-row :gutter="20">
                <el-col :span="6">

                    <el-form-item label="Nombre">
                        <el-input v-model="form.nombre" style="width: auto;"/>
                    </el-form-item>

                     <el-form-item label="Simbolo">
                        <!-- <el-input v-model="form.simbolo" style="width: auto;"/> -->
                        <the-mask class="el-input__inner" v-model="form.simbolo" :mask="['AAA','AA']" :tokens="hexTokens" style="width: 165px;"/>
                    </el-form-item>

                    <el-form-item label="Número de Capas">
                        <el-input-number :min="1" v-model="form.numero_capas" style="width: auto;"/>
                    </el-form-item>

                    <el-form-item label="Tiempo de secada por capa">
                        <el-input-number :min="1" v-model="form.tiempo_secado_capa" style="width: auto;"/>
                    </el-form-item>

                </el-col>
                <el-col :span="18">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- Tab Materiales -->
                        <el-tab-pane label="Indicaciones" name="first">
                            <el-input type="textarea" 
                            v-model="form.indicaciones"
                            :autosize="{ minRows: 16, maxRows: 16}"/>
                            
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="clearFields();dialogoAgregar = false" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button type="success" v-if='form.id === ""' @click="insert('form');" icon="el-icon-check">Agregar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button type="success"  v-if='form.id !== ""' @click="insert('form');" icon="el-icon-check">Guardar</el-button>
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
        clientes:[],
        productosSelect:[],
        activeName: 'first',
        form:{
            id:"",
            nombre:"",
            simbolo:"",
            numero_capas:1,
            tiempo_secado_capa:1,
            indicaciones:"",
        },
        rules: {
            simbolo: [
                  { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            numero_capas: [
                { required: true, message: 'Selecciona un cliente', trigger: 'change' },
            ],
            tiempo_secado_capa: [
                { required: true, message: 'Selecciona una fecha de entrega', trigger: 'blur' },
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
      };
    },
    methods: {
        open() {
            this.dialogoAgregar = true;
            console.log("FORM");
            console.log(this.form);
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
                    axios.put('/pinturas/insert',me.form).then(function (response) {
                        console.log("Response:");
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
            this.form.id = "";
            this.form.nombre = "";
            this.form.simbolo = "";
            this.form.numero_capas = 1;
            this.form.tiempo_secado_capa = 1;
            this.form.indicaciones = "";
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
    },
  };
</script>

    
