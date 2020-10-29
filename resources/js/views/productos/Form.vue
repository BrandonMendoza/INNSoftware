<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="60%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Producto</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Producto </span>

            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <span style="margin-right: 5px;"><b>Núm. de Parte (Local): </b> {{form.numero_parte}}</span>
            <br>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="Cliente" prop="cliente_id"  >
                        <el-select v-model="form.cliente_id" value-key="id" style="width: 100%;" filterable :loading="loadingCliente">
                            <el-option 
                                v-for="cliente in clientes"
                                :key="cliente.id"
                                :label="cliente.nombre_cliente" 
                                :value="cliente.id" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Número de Parte (Cliente)" prop="numero_parte_cliente">
                        <el-input v-model="form.numero_parte_cliente" />
                    </el-form-item>  

                    <el-form-item label="Pintura" prop="pintura_id"  >
                        <el-select v-model="form.pintura_id" value-key="id" style="width: 100%;" filterable :loading="loadingPinturas">
                            <el-option 
                                v-for="pintura in pinturas"
                                :key="pintura.id"
                                :label="pintura.simbolo" 
                                :value="pintura.id"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Peso (kg)" prop="peso_kg">
                        <el-input v-model="form.peso_kg" @change="calcularKgsToLbs"/>
                    </el-form-item> 

                    <el-form-item label="Peso (lbs)" prop="peso_lbs">
                        <el-input v-model="form.peso_lbs" @change="calcularLbsToKgs"/>
                    </el-form-item> 
                </el-col>
                <el-col :span="18">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- Tab Descripcion -->
                        <el-tab-pane label="Descripción" name="first">
                            <el-input type="textarea" 
                            v-model="form.descripcion"
                            :autosize="{ minRows: 16, maxRows: 16}"/>
                        </el-tab-pane>
                        <!-- Tab Materiales -->
                        <el-tab-pane label="Materiales" name="second">
                            <div class="filter-container">
                                <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="dialogoMateriales = true;actualizarSelectMateriales();">Agregar</el-button>
                            </div>
                            <el-table
                            :data="form.materiales"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%">
                                <el-table-column
                                type="index"
                                align="center" 
                                width="80"/>

                                <el-table-column
                                prop="nombreCompleto"
                                label="Material"
                                show-overflow-tooltip/>

                                <el-table-column
                                prop="pivot.cantidad"
                                label="Cantidad"
                                align="center"
                                width="85"/>

                                <el-table-column
                                align="center"
                                width="80">
                                    <template slot-scope="scope">
                                        <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="loadFieldsUpdate(scope.row);"/> -->
                                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRowMateriales(scope.row);"/>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- Dialog agregar Material -->
                            
                        </el-tab-pane>
                        <!-- Tab Accesorios -->
                        <el-tab-pane label="Accesorios" name="third">
                            <div class="filter-container">
                                <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="dialogoAccesorios = true;actualizarSelectAccesorios()">Agregar</el-button>
                            </div>
                            <el-table
                            :data="form.accesorios"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%">
                                <el-table-column
                                type="index"
                                align="center" 
                                width="80"/>

                                <el-table-column
                                prop="descripcion"
                                label="Accesorio"
                                show-overflow-tooltip/>

                                <el-table-column
                                prop="pivot.cantidad"
                                label="Cantidad"
                                align="center"
                                width="85"/>

                                <el-table-column
                                fixed="right"
                                label=""
                                align="center"
                                width="80">
                                    <template slot-scope="scope">
                                        <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="loadFieldsUpdate(scope.row);"/> -->
                                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRowAccesorios(scope.row);"/>
                                    </template>
                                </el-table-column>
                            </el-table>
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

        <!-- Dialogo Agregar Material -->
        <el-dialog
        title="Agregar Material a Producto"
        :visible.sync="dialogoMateriales"
        width="30%">

            <el-form-item label="Material">
                <el-select v-model="materialAgregar.material" style="width: 100%;" value-key="id" filterable>
                    <el-option 
                        v-for="material in materialesSelect" 
                        :label="material.nombreCompleto" 
                        :value="material" 
                        :key="material.id"
                        :disabled="material.disabled"/>
                </el-select>
            </el-form-item>

            <el-form-item label="Cantidad">
                <el-input-number size="mini" :min="1" v-model="materialAgregar.pivot.cantidad" />
            </el-form-item>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoMateriales = false">Cancelar</el-button>
                <el-button type="primary" @click="agregarMaterial">Confirmar</el-button>
            </span>
        </el-dialog>
        <!-- Dialogo Agregar Accesorio -->
        <el-dialog
        title="Agregar Accesorio a Producto"
        :visible.sync="dialogoAccesorios"
        width="30%">
            <el-form-item label="Accesorio">
                <el-select v-model="accesorioAgregar.accesorio" style="width: 100%;" value-key="id" filterable>
                    <el-option 
                        v-for="accesorio in accesoriosSelect" 
                        :label="accesorio.descripcion" 
                        :value="accesorio" 
                        :key="accesorio.id"
                        :disabled="accesorio.disabled"/>
                </el-select>
            </el-form-item>

            <el-form-item label="Cantidad">
                <el-input-number size="mini" :min="1" v-model="accesorioAgregar.pivot.cantidad" />
            </el-form-item>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoAccesorios = false">Cancelar</el-button>
                <el-button type="primary" @click="agregarAccesorio">Confirmar</el-button>
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
import { CommentDropdown } from '../articles/components/Dropdown';
  export default {
    data() {
      return {
          
        clientes:[],
        pinturas:[],
        materialesSelect:[],
        accesoriosSelect:[],
        activeName: 'first',
        form:{
            id:0,
            descripcion:"",
            numero_parte:"",
            numero_parte_cliente:"",
            cliente_id:"",
            pintura_id:"",
            peso_kg:"",
            peso_lbs:"",
            materiales:[],
            accesorios:[],
        },
        materialAgregar:{
            material:"",
            pivot:{
                cantidad:1,
            },
        },
        accesorioAgregar:{
            accesorio:"",
            pivot:{
                cantidad:1,
            },
        },
        rules: {
            numero_parte_cliente: [
                  { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            ],
            cliente_id: [
                { required: true, message: 'Selecciona un cliente', trigger: 'change' },
            ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
        dialogoMateriales:false,
        dialogoAccesorios:false,
        loadingCliente:false,
        loadingPinturas:false,
      };
    },
    methods: {
        open() {
            this.activeName = 'first';
            this.getPinturas();
            this.getClientes();
            this.getMateriales();
            this.getAccesorios();
            
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
                    axios.put('/productos/insert',me.form).then(function (response) {
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
            this.form.pintura_id = "";
            this.form.numero_parte_cliente = "";
            this.form.peso_kg = "";
            this.form.peso_lbs = "";
            this.form.materiales = [];
            this.form.accesorios = [];
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.clearFields(); //limpiamos campos
                this.close(); //cerramos modal
            })
            .catch(_ => {});
        },
        getMateriales(){
            let me =this;
            let url = '/materialesNombreCompleto' 
            //this.loadingMaterialAccesorio = true;
            axios.get(url).then(function (response) {
                me.materialesSelect = response.data;

                me.materialesSelect.forEach(element => {
                    me.form.materiales.forEach(material => {
                        if(element['id'] == material['id']){
                            element['disabled'] = true;
                        }else{
                            element['disabled'] = false;
                        }
                    });
                });
                
            })
            .catch(function (error) {
                // handle error
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        getAccesorios(){
            let me =this;
            let url = '/accesorios';
            
            axios.get(url).then(function (response) {
                me.accesoriosSelect = response.data;
                me.accesoriosSelect.forEach(element => {
                    me.form.accesorios.forEach(accesorio => {
                        if(element['id'] == accesorio['id']){
                            element['disabled'] = true;
                        }else{
                            element['disabled'] = false;
                        }
                    });
                });
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
        getPinturas(){
            let me =this;
            let url = '/pinturas';
            this.loadingPinturas = true;
            axios.get(url).then(function (response) {
                me.pinturas = response.data;
                me.loadingPinturas = false;
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
                me.loadingPinturas = false;
            });
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        calcularKgsToLbs(){
            this.form.peso_lbs = Number(this.form.peso_kg*2.2046).toFixed(2);
            this.form.peso_kg = Number(this.form.peso_kg).toFixed(2);
        },
        calcularLbsToKgs(){
            this.form.peso_kg = Number(this.form.peso_lbs/2.2046).toFixed(2);
            this.form.peso_lbs = Number(this.form.peso_lbs).toFixed(2);
        },
        agregarMaterial(){
            if(this.materialAgregar.material.id == "" ){
                me.$message.error('Selecciona un material.');
                return false;
            }
            if(this.materialAgregar.pivot.cantidad == "" || this.materialAgregar.pivot.cantidad == 0){
                me.$message.error('Ingresa una cantidad valida');
                return false;
            }
            this.materialAgregar.material['pivot'] = JSON.parse(JSON.stringify(this.materialAgregar.pivot));
            this.form.materiales.push(this.materialAgregar.material);
            this.materialAgregar.material = "";
            this.materialAgregar.pivot.cantidad = 1;
            this.dialogoMateriales = false;
        },
        agregarAccesorio(){
            
            if(this.accesorioAgregar.accesorio.id == "" ){
                me.$message.error('Selecciona un accesorio');
                return false;
            }
            if(this.accesorioAgregar.pivot.cantidad == "" || this.accesorioAgregar.pivot.cantidad == 0){
                me.$message.error('Ingresa una cantidad valida');
                return false;
            }
            this.accesorioAgregar.accesorio['pivot'] = JSON.parse(JSON.stringify(this.accesorioAgregar.pivot));
            this.form.accesorios.push(this.accesorioAgregar.accesorio);
            this.accesorioAgregar.accesorio = "";
            this.accesorioAgregar.pivot.cantidad = 1;
            this.dialogoAccesorios = false;
        },
        actualizarSelectMateriales(){
            this.materialesSelect.forEach(element => {
                element['disabled'] = false;
            });
            this.materialesSelect.forEach(element => {
                this.form.materiales.forEach(material => {
                    if(element['id'] == material['id']){
                        element['disabled'] = true;
                    }
                });
            });
        },
        actualizarSelectAccesorios(){
            this.accesoriosSelect.forEach(element => {
                element['disabled'] = false;
            });
            this.accesoriosSelect.forEach(element => {
                this.form.accesorios.forEach(accesorio => {
                    if(element['id'] == accesorio['id']){
                        element['disabled'] = true;
                    }
                });
            });
        },
        deleteRowMateriales(row){
            let i = this.form.materiales.map(material => material.id).indexOf(row.id);
            this.form.materiales.splice(i, 1);
        },
        deleteRowAccesorios(row){
            let i = this.form.accesorios.map(accesorio => accesorio.id).indexOf(row.id);
            this.form.accesorios.splice(i, 1);
        },
    },
  };
</script>

    
