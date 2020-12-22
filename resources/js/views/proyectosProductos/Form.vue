<template>

    <el-form  :model="form" :rules="rules" ref="form" label-position="top"  label-width="150px" >
        <el-dialog
        width="40%"
        :ref="dialogRef"
        :before-close="handleClose"
        :visible.sync="dialogoAgregar">
            <span v-if="form.id == 0" slot="title"><i class="el-icon-plus"></i> Agregar Orden Abierta</span>
            <span v-if="form.id != 0" slot="title"><i class="el-icon-edit"></i> Editar Orden Abierta </span>

            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>    
            <span style="margin-right: 5px;"><b>Proyecto: </b> {{form.proyecto}}</span>
            <span                           ><b>Producto: </b> {{form.producto}}/{{form.producto_local}}</span>    
            <br>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- Tab General -->
                        <el-tab-pane label="General" name="first">

                            

                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Cantidad">
                                        <el-input-number :min="1" :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.cantidad"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Fecha de Entrega" prop="fecha_entrega">
                                        <el-date-picker :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.fecha_entrega" type="date" />
                                    </el-form-item>
                                </el-col>
                            </el-row>


                            <el-row :gutter="20">
                                <el-col :span="12">
                                   <el-form-item label="Orden de Trabajo">
                                        <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.work_order"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Item">
                                        <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.item"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row :gutter="20" v-permission="['view finanzas']">
                                <el-col :span="12">
                                    <el-form-item label="Precio (pesos)">
                                        <vue-numeric :disabled="!checkPermission(['editar ordenes abiertas'])" class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="form.precio_pesos"></vue-numeric>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Precio (dlls)">
                                        <vue-numeric :disabled="!checkPermission(['editar ordenes abiertas'])" class="el-input__inner" v-bind:precision="2"  currency="$" separator="," v-model="form.precio_dlls"></vue-numeric>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            

                            <el-form-item label="Heat Number" hidden>
                                <el-input :disabled="!checkPermission(['editar ordenes abiertas'])" v-model="form.heat_number" />
                            </el-form-item>
                        </el-tab-pane>
                        <!-- Tab Notas -->
                        <el-tab-pane label="Notas" name="second">
                            <el-input type="textarea" 
                            v-model="form.notas"
                            :autosize="{ minRows: 16, maxRows: 16}"/>
                            
                        </el-tab-pane>
                    </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button v-waves @click="clearFields();close();" class="float-left">Cancelar</el-button>
                <!-- Botón que añade los datos del formulario, solo se muestra si la variable update es igual a 0-->
                <el-button v-waves type="success" v-if="form.id == 0" @click="insert('form');" icon="el-icon-check">Agregar</el-button>
                <!-- Botón que modifica la tarea que anteriormente hemos seleccionado, solo se muestra si la variable update es diferente a 0-->
                <el-button v-waves type="success" v-if="form.id != 0" @click="insert('form');" icon="el-icon-check">Guardar</el-button>
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
import moment from 'moment';
import VueNumeric from 'vue-numeric';
import waves from '@/directive/waves'; // Waves directive

import permission from '@/directive/permission/index.js'
import role from '@/directive/role/index.js'
import checkPermission from '@/utils/permission';
  export default {
    data() {
      return {
        clientes:[],
        productosSelect:[],
        activeName: 'first',
        form:{
            id:0,
            cantidad:"",
            fecha_entrega:"",
            item:"",
            work_order:"",
            heat_number:"",
            proyecto:"",
            producto:"",
            producto_local:"",
            notas:"",
            precio_pesos:"",
            precio_dlls:""
        },
        rules: {
            // numero_parte_cliente: [
            //       { required: true, message: 'Ingresa un número de parte', trigger: 'blur' },
            // ],
            // cliente_id: [
            //     { required: true, message: 'Selecciona un cliente', trigger: 'change' },
            // ],
            // fecha_entrega: [
            //     { required: true, message: 'Selecciona una fecha de entrega', trigger: 'blur' },
            // ],
        },
        dialogoAgregar: false,
        dialogRef: 'myForm',
        dialogoProductos:false,
        loadingCliente:false,
      };
    },
    directives: { waves, permission, role  },
    methods: {
        checkPermission,
        open() {
            this.activeName = 'first';
            this.dialogoAgregar = true;
        },
        close() {
            this.$parent.setCurrent();
            this.dialogoAgregar = false;
        },
        insert(form){/*Update o Insert Proceso*/
            this.$refs[form].validate((valid) => { //validacion del form
                if (valid) {
                    var loadingInstance = this.$loading({
                        target: '.el-dialog'
                    });
                    let me = this;
                    axios.put('/proyectosProductos/insert',me.form).then(function (response) {
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
            this.form.id = 0;
            this.form.cantidad = "";
            this.form.item = "";
            this.form.work_order = "";
            this.form.heat_number = "";
            this.form.notas = "";
            this.form.proyecto = "";
            this.form.producto = "";
            this.form.producto_local = "";
            this.form.fecha_entrega = moment();
            this.form.precio_pesos = 0;
            this.form.precio_dlls = 0;
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

    
