<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="$refs.myForm.open();$refs.myForm.clearFields();">Agregar</el-button>
        </div>
        <el-row >
            <el-table
            :data="list"
            border
            fit
            highlight-current-row
            v-loading="loading"
            style="width: 100%">

                <el-table-column
                prop="numero_parte"
                label="Número de Parte"/>

                <el-table-column
                prop="descripcion"
                label="Descripción"/>

                <el-table-column
                prop="acero.nombre"
                label="Acero"/>

                <el-table-column
                prop="peso_kg"
                label="Peso(kg)"
                align="center" 
                width="120"/>

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
                list:[],
            }
        },
        components: { 
            formDialog : formDialog,
            Pagination
        },
        methods:{
            async getList(){
                let me =this;
                let url = '/accesorios';
                axios.get(url).then(function (response) {
                    me.list = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.catalogo = data.catalogo;
                this.$refs.myForm.form.numero_parte = data.numero_parte;
                this.$refs.myForm.form.descripcion = data.descripcion;
                this.$refs.myForm.form.acero_id = data.acero_id;
                this.$refs.myForm.form.acero_nombre = data.acero.nombre;
                this.$refs.myForm.form.peso_kg = data.peso_kg;
                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                console.log("DELETE FUNCTION");
                axios.post('/accesorios/delete',{'id':id}).then(function (response) {
                    me.getList();   
                    me.$message.success('Eliminado correctamente.');
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.success('Hubo un error.');
                    console.log(error);
                    me.loading = false;
                });
            }
        },
        mounted() {
           this.getList();
        }
    }
</script>

