<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"   label-width="100px" >
        <el-dialog
        width="20%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Material</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Material </span>
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <input v-model="form.catalogo" hidden/>
            

            <el-form-item label="Número de Parte" prop="numero_parte">
                <el-input v-model="form.numero_parte" />
            </el-form-item>

            <el-form-item label="Tipo de Material" prop="tipo_material_id">
                <el-select 
                v-model="form.tipo_material_nombre" 
                value-key="nombre"
                @change="changeTipoMaterial()"
                filterable>
                    <el-option 
                    v-for="tipoMaterial in tiposMateriales"
                    :key="tipoMaterial.id"
                    :label="tipoMaterial.nombre" 
                    :value="tipoMaterial.nombre"/>
                </el-select>
            </el-form-item>

            <el-form-item label="Acero" prop="acero_id">
                <el-select 
                v-model="form.acero_nombre" 
                value-key="nombre"
                @change="changeAcero()"
                filterable>
                    <el-option 
                    v-for="acero in aceros"
                    :key="acero.id"
                    :label="acero.nombre" 
                    :value="acero.nombre"/>
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

            <el-row> 
                <label class="el-form-item__label">Medidas</label>
            </el-row>
            <el-row :gutter="20" align="bottom">
                <el-col :span="6">
                    <el-form-item prop="medida_1">
                        <el-input v-model="form.medida_1"  />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="medida_2">
                        <el-input v-model="form.medida_2" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="medida_3">
                        <el-input v-model="form.medida_3"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="medida_4">
                        <el-input v-model="form.medida_4" :precision="2" :controls="false" :min="0" style="width:80px;"/>
                    </el-form-item>
                </el-col>
            </el-row>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoAgregar = false;clearFields();" class="float-left">Cancelar</el-button>
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
            catalogo:1,
            numero_parte:"",
            tipo_material_id:"",
            tipo_material_nombre:"",
            acero_id:"",
            acero_nombre:"",
            peso_kg:"",
            medida_1:"",
            medida_2:"",
            medida_3:"",
            medida_4:"",
        },
        rules: {
            numero_parte: [
                { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            tipo_material_id: [
                { required: true, message: 'Ingresa un simbolo', trigger: 'change' }
            ],
            // acero_id: [
            //     { required: true, message: 'selecciona una cantidad de datos', trigger: 'change' }
            // ],
            peso_kg: [
                { validator: esNumero, trigger: 'blur' }
            ],
            medida_1: [
                { required: true, message: 'Ingresa medida 1', trigger: 'blur' },
            ],
            medida_2: [
                { required: true, message: 'Ingresa medida 2', trigger: 'blur' },
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
      };
    },
    methods: {
        open() {
            this.getTiposMateriales();
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
                    axios.put('/materiales/insert',me.form).then(function (response) {
                        me.$parent.getList();
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
        getTiposMateriales(){
            let me =this;
            let url = '/tiposMateriales';
            axios.get(url).then(function (response) {
                me.tiposMateriales = response.data;
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
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
        changeTipoMaterial(){
            this.tiposMateriales.forEach(tipoMaterial => {
                if(tipoMaterial['nombre'] == this.form.tipo_material_nombre){
                    this.form.tipo_material_id = tipoMaterial['id'];
                }
            });
        },
        changeAcero(){
            this.aceros.forEach(acero => {
                if(acero['nombre'] == this.form.acero_nombre){
                    this.form.acero_id = acero['id'];
                }
            });
        },
        clearFields(){
            this.form.id = 0;
            this.catalogo = 1;
            this.form.numero_parte = "";
            this.form.tipo_material_id = "";
            this.form.acero_id = "";
            this.form.peso_kg = "";
            this.form.medida_1 = "";
            this.form.medida_2 = "";
            this.form.medida_3 = "";
            this.form.medida_4 = "";
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

    
  