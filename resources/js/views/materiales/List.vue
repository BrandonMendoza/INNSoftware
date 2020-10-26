<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
        </div>
        
        <el-row >
            <el-table
            :data="materiales"
            border
            fit
            highlight-current-row
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                type="index"
                align="center" 
                width="80"/>

                <el-table-column
                prop="numero_parte"
                label="Número de Parte"/>

                <el-table-column
                prop="medidas"
                label="Medidas"/>

                <el-table-column
                prop="tipo_material.nombre"
                label="Tipo de Material"/>

                <el-table-column
                prop="acero.nombre"
                label="Acero"/>

                <el-table-column
                prop="peso_kg"
                label="Peso(kg)"/>

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
            <pagination v-show="materiales.length>0" :total="materiales.length" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
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
                materiales:[], //Este array contendrá las tareas de nuestra bd
            }
        },
        components: { 
            formDialog : formDialog,
            Pagination
        },
        methods:{
            async getList(){
                let me =this;
                let url = '/materiales';
                axios.get(url).then(function (response) {
                    me.materiales = response.data;
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
                this.$refs.myForm.form.tipo_material_id = data.tipo_material_id;
                this.$refs.myForm.form.acero_id = data.acero_id;
                this.$refs.myForm.form.peso_kg = data.peso_kg;
                this.$refs.myForm.form.medida_1 = data.medida_1;
                this.$refs.myForm.form.medida_2 = data.medida_2;
                this.$refs.myForm.form.medida_3 = data.medida_3;
                this.$refs.myForm.form.medida_4 = data.medida_4;

                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                console.log("DELETE FUNCTION");
                axios.post('/materiales/delete',{'id':id}).then(function (response) {
                    me.getList();   
                    me.$message.success('Eliminado correctamente.');
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
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

