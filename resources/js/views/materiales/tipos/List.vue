<template>
    <div class="app-container">

        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
        </div>

        <el-row >
            <el-table
            :data="tiposMateriales"
            border
            fit
            highlight-current-row
            v-loading="loading"
            style="width: 60%">
                <el-table-column
                type="index"
                align="center"
                width="80"/>

                <el-table-column
                    prop="nombre_spanish"
                    label="Nombre Español"
                    width="180"/>

                <el-table-column
                    prop="nombre"
                    label="Nombre Ingles"
                    width="180"/>

                

                <el-table-column
                    prop="simbolo"
                    label="Simbolo"/>

                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="danger" size="mini"  @click="deleteRow(scope.row.id);">Eliminar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>    
        
        <el-row>
            <pagination v-show="tiposMateriales.length>0" :total="tiposMateriales.length" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
        <formDialog  ref="myForm" />
    </div>
</template>

<script>
import formDialog from './Form';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination


    export default {
        data(){
            return{
                loading : true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id',
                },
                tiposMateriales:[], //Este array contendrá las tareas de nuestra bd
            }
        },
        components: { 
            formDialog : formDialog,
            Pagination
        },
        methods:{
            async getList(){
                let me =this;
                let url = '/tiposMateriales' //Ruta que hemos creado para que nos devuelva todas las tareas
                axios.get(url).then(function (response) {
                    me.tiposMateriales = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){ //Esta función rellena los campos y la variable update, con la tarea que queremos modificar
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.cantidad_datos = data.cantidad_datos;
                this.$refs.myForm.form.simbolo = data.simbolo;
                this.$refs.myForm.form.nombre = data.nombre;
                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                axios.post('/tiposMateriales/delete',{'id':id}).then(function (response) {
                    me.getList();   
                    me.$message.success('Eliminado correctamente.');
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                    me.loading = false;
                });
            },
            handleCurrentChange(val) {
                this.currentRow = val;
                console.log("CAMBIO");
                console.log(val);
            }
        },
        mounted() {
           this.getList();
        }
    }
</script>

