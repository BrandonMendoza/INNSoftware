<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
        </div>

        
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
                prop="clave_cliente"
                label="Clave"/>

                <el-table-column
                prop="nombre_cliente"
                label="Nombre Comercial"
                show-overflow-tooltip/>

                 <el-table-column
                prop="nombre_corto"
                label="Nombre Corto"
                show-overflow-tooltip/>

                <el-table-column
                prop="giro"
                label="giro"
                show-overflow-tooltip/>

                <el-table-column
                prop="rfc"
                label="RFC"/>

                <el-table-column
                prop="direccion"
                label="Dirección"
                show-overflow-tooltip/>

                <el-table-column
                prop="razon_social"
                label="Razón social"
                show-overflow-tooltip/>

                <el-table-column
                prop="tel_oficinas"
                label="Teléfono"/>

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
                let url = '/clientes';
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
                this.$refs.myForm.form.foto_cliente = data.foto_cliente;
                this.$refs.myForm.form.clave_cliente = data.clave_cliente;
                this.$refs.myForm.form.nombre_cliente = data.nombre_cliente;
                this.$refs.myForm.form.giro = data.giro;
                this.$refs.myForm.form.rfc = data.rfc;
                this.$refs.myForm.form.direccion = data.direccion;
                this.$refs.myForm.form.razon_social = data.razon_social;
                this.$refs.myForm.form.tel_oficinas = data.tel_oficinas;
                this.$refs.myForm.form.pais = data.pais;
                this.$refs.myForm.form.codigo_postal = data.codigo_postal;
                this.$refs.myForm.form.estado = data.estado;
                this.$refs.myForm.form.ciudad = data.ciudad;

                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                console.log("DELETE FUNCTION");
                axios.post('/clientes/delete',{'id':id}).then(function (response) {
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

