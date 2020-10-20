<template>
    <div class="app-container">

        
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()" hidden>Agregar</el-button>
        </div>
        <el-row >
            <el-table
            :data="list"
            border
            tooltip-effect="light"
            fit
            v-loading="loading"
            style="width: 100%; word-wrap: break-word;">
                <el-table-column
                type="index"
                align="center" 
                fixed/>

                 <el-table-column
                prop="nombre"
                label="Nombre"/> 

                <el-table-column
                prop="simbolo"
                label="Simbolo"
                align="center"/> 

                <el-table-column
                prop="numero_capas"
                label="Núm. de Capas"
                align="center"/> 

                <el-table-column
                prop="tiempo_secado_capa"
                label="Hrs de Secado por Capa"
                align="center"/>

                <el-table-column
                fixed="right"
                align="center"
                width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" title="Editar pintura" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
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
<style>
  .el-table .cell {
    word-break: break-word;
}
</style>
<script>
import formDialog from './Form';
import Pagination from '@/components/Pagination'; 
import moment from 'moment';


    export default {
        data(){
            
            return{
                listUrl:'/pinturas',
                deleteUrl:'/pinturas/delete',
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
                let me = this;
                me.loading = true;
                axios.get(me.listUrl).then(function (response) {
                    //creamos un array y guardamos el contenido que nos devuelve el response
                    console.table("RESPONSE:");
                    console.log(response.data);
                    console.table(response.data);
                    me.list = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    // handle error
                    me.$message.error('Hubo un error.');
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){ 
                console.log("Load fields update DATA:");
                console.log(data);

                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.nombre = data.nombre;
                this.$refs.myForm.form.simbolo = data.simbolo;
                this.$refs.myForm.form.numero_capas = data.numero_capas;
                this.$refs.myForm.form.tiempo_secado_capa = data.tiempo_secado_capa;
                this.$refs.myForm.form.indicaciones = data.indicaciones;


                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                axios.post(me.deleteUrl,{'id':id}).then(function (response) {
                    console.log("Response:");
                    console.log(response);
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
        },
        mounted() {
           this.getList();
        }
    }
</script>

