<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
        </div>

        <!-- <th>#</th>
        <th>Cliente</th>
        <th>Núm. de Parte(Cliente)</th>
        <th>Material</th>
        <th data-orderable="false">Almacen</th>
        <th data-orderable="false">Locación</th>
        <th data-orderable="false"></th> -->
        
        <el-row >
            <el-table
            :data="list"
            border
            tooltip-effect="light"
            fit
            highlight-current-row
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                type="index"
                align="center" 
                width="80"/>

                <el-table-column
                prop="cliente.nombre_cliente"
                label="Cliente"/>

                <el-table-column
                prop="numero_parte"
                label="Núm. de Parte(Cliente)"
                show-overflow-tooltip/>

                <el-table-column
                prop="nombre"
                label="Material/Accesorio"
                show-overflow-tooltip/>

                <el-table-column
                prop="almacen"
                label="Almacén"/>

                <el-table-column
                prop="locacion_almacen"
                label="Locación"
                show-overflow-tooltip/>

                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="danger" size="mini" @click="deleteRow(scope.row.id);">Eliminar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination v-show="list.length>0" :total="list.length" :page.sync="list.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
        <formDialog  ref="myForm" />
    </div>
</template>

<script>
import formDialog from './Form';
import Pagination from '@/components/Pagination'; 


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
                list:[], //Este array contendrá las tareas de nuestra bd
            }
        },
        components: { 
            formDialog : formDialog,
            Pagination
        },
        methods:{
            async getList(){
                let me =this;
                let url = '/materialesClientes' //Ruta que hemos creado para que nos devuelva todas las tareas
                axios.get(url).then(function (response) {
                    //creamos un array y guardamos el contenido que nos devuelve el response
                    console.table("RESPONSE:");
                    console.log(response.data);
                    console.table(response.data);
                    me.list = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    // handle error
                    me.notificarError();
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){ //Esta función rellena los campos y la variable update, con la tarea que queremos modificar
                console.log("DATA:");
                console.log(data);

                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.catalogo = data.catalogo;
                this.$refs.myForm.form.numero_parte = data.numero_parte;
                this.$refs.myForm.form.material_id = data.material_id;
                this.$refs.myForm.form.cliente_id = data.cliente_id;
                this.$refs.myForm.form.locacion_almacen = data.locacion_almacen;
                this.$refs.myForm.form.almacen = data.almacen;

                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                console.log("DELETE FUNCTION");
                axios.post('/materialesClientes/delete',{'id':id}).then(function (response) {
                    console.log("Response:");
                    console.log(response);
                    me.getList();   
                    me.notificarSuccess('Eliminado correctamente.');
                    me.loading = false;
                })
                .catch(function (error) {
                    me.notificarError();
                    console.log(error);
                    me.loading = false;
                });
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
        },
        mounted() {
           this.getList();
        }
    }
</script>

