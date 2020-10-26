<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="25%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Cliente</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Cliente </span>

            
                <!-- Id del proceso que se esta editando ("0" si es agregar) -->
                <input v-model="form.id" hidden/>
                <input v-model="form.clave_cliente" hidden/>

                <el-divider content-position="left"> <p style="font-size: 14px; color: #5e6d82; line-height: 1.5em;">General</p></el-divider>
                <el-form-item label="Nombre Comercial" prop="nombre_cliente">
                    <el-input v-model="form.nombre_cliente"/>
                </el-form-item>

                <el-form-item label="Giro" prop="giro">
                    <el-input v-model="form.giro" />
                </el-form-item>

                <el-form-item label="Teléfono" prop="tel_oficinas" >
                    <el-input v-model="form.tel_oficinas" prefix-icon="el-icon-phone" v-mask="'(###) #######'" placeholder="(686) 1223344"/>
                </el-form-item>

                <el-divider content-position="left"><p style="font-size: 14px; color: #5e6d82; line-height: 1.5em;">Datos Fiscales</p></el-divider>

                <el-form-item label="RFC" prop="rfc" >
                    <el-input v-model="form.rfc" maxlength="13"/>
                    <!-- <the-mask class="el-input__inner" v-model="form.rfc" :mask="['AAAA######FFF','AAA######FFF']" :tokens="hexTokens" placeholder="AAAA666666WW2"/> -->
                </el-form-item>

                <el-form-item label="Razón Social" prop="razon_social" >
                    <el-input v-model="form.razon_social"/>
                </el-form-item>

                <el-form-item label="País" prop="pais">
                    <el-select v-model="form.pais" placeholder="país" style="width: 100%;">
                        <el-option label="México​" value="484"></el-option>
                        <el-option label="Estados Unidos​" value="840"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="Dirección" prop="direccion" >
                    <el-input v-model="form.direccion" placeholder="av calle #1111 fracc..."/>
                </el-form-item>

                <el-form-item label="Ciudad" prop="ciudad" >
                    <el-input v-model="form.ciudad"/>
                </el-form-item>

                <el-form-item label="Estado" prop="estado" >
                    <el-input v-model="form.estado"/>
                </el-form-item>
                
                <el-form-item label="Codigo Postal" prop="codigo_postal" >
                    <el-input v-model="form.codigo_postal"  v-mask="'######'" placeholder="22222"/>
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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
        tiposMateriales:[],
        aceros:[],
        form:{
            id:0,
            foto_cliente:"",
            clave_cliente:"",
            nombre_cliente:"",
            giro:"",
            rfc:"",
            razon_social:"",
            tel_oficinas:"",
            direccion:"",
            pais:"",
            codigo_postal:"",
            estado:"",
            ciudad:"",
        },
        rules: {
            nombre_cliente: [
                { required: true, message: 'Ingresa un nombre de cliente', trigger: 'blur' },
            ],
            giro: [
                { required: true, message: 'Ingresa un giro', trigger: 'blur' },
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
            this.$refs[form].validate((valid) => { 
                if (valid) {
                    var loadingInstance = this.$loading({
                        target: '.el-dialog'
                    });
                    let me = this;
                    axios.put('/clientes/insert',me.form).then(function (response) {
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
            this.form.foto_cliente = "";
            this.form.clave_cliente = "";
            this.form.nombre_cliente = "";
            this.form.giro = "";
            this.form.rfc = "";
            this.form.direccion = "";
            this.form.razon_social = "";
            this.form.tel_oficinas = "";
            this.form.pais = "";
            this.form.codigo_postal = "";
            this.form.estado = "";
            this.form.ciudad = "";
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
    },
  };
</script>

    
  