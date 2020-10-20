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
            v-loading="loading"
            style="width: 100%"
            :row-class-name="tableRowClassName">
                <el-table-column
                type="index"
                align="center" 
                width="80"
                fixed/>

                <el-table-column
                prop="numero_parte"
                label="Núm. de Parte (Local)"
                fixed/>  

                 <el-table-column
                prop="numero_parte_cliente"
                label="Núm. de Parte (Cliente)"
                fixed/> 

                <el-table-column
                prop="cliente.nombre_cliente"
                label="Cliente"
                show-overflow-tooltip
                fixed/>

                <el-table-column
                prop="peso_kg"
                label="Peso (kg)"
                show-overflow-tooltip
                align="center" 
                fixed/>

                <el-table-column
                prop="peso_lbs"
                label="Peso (lbs)"
                show-overflow-tooltip
                align="center" 
                fixed/>


                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="270">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="primary" size="mini" @click="loadDocumentos(scope.row);">Docs</el-button>
                        <el-button type="danger" size="mini" @click="deleteRow(scope.row.id);">Eliminar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <pagination v-show="list.length>0" :total="list.length" :page.sync="list.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
        <formDialog  ref="myForm" />

        <documentosDialog  ref="documentosDialog" />
    </div>
</template>

<style>
  .el-table .danger-row {
    background: #FDE2E2;
  }

  .el-table .success-row {
    background: #E1F3D8;
  }

  .el-table .warning-row {
    background: #FAECD8;
  }
</style>

<script>
import formDialog from './Form';
import documentosDialog from './documentos';
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
            documentosDialog : documentosDialog,
            Pagination
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (row.status_id === 1) { //sin recibir
                    return 'danger-row';
                } else if (row.status_id === 2) {//recibido  
                    return 'success-row';
                }else if (row.status_id === 3) {//revisando  
                    return 'warning-row';
                }
                return '';
            },
            async getList(){
                let me =this;
                let url = '/productos' //Ruta que hemos creado para que nos devuelva todas las tareas
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
            loadFieldsUpdate(data){ 
                console.log("LOad fields update DATA:");
                console.log(data);
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.cliente_id = data.cliente_id;
                this.$refs.myForm.form.pintura_id = data.pintura_id;
                this.$refs.myForm.form.numero_parte_cliente = data.numero_parte_cliente;
                this.$refs.myForm.form.peso_kg = data.peso_kg;
                this.$refs.myForm.form.peso_lbs = data.peso_lbs;
                this.$refs.myForm.form.descripcion = data.descripcion;

                this.$refs.myForm.form.materiales = JSON.parse(JSON.stringify(data.materiales));
                this.$refs.myForm.form.accesorios = JSON.parse(JSON.stringify(data.accesorios));

                this.$refs.myForm.open();
            },
            loadDocumentos(data){
                this.$refs.documentosDialog.form.id = data.id;
                console.log("DOCUMENTOS:");
                console.log(data.documentos);
                this.$refs.documentosDialog.form.documentos = JSON.parse(JSON.stringify(data.documentos));
                this.$refs.documentosDialog.open()
            },
            documentos(data){ 
                console.log("LOad fields update DATA:");
                console.log(data);
                this.$refs.myForm.form.id = data.id;

                // this.$refs.myForm.form.materiales = JSON.parse(JSON.stringify(data.materiales));
                // this.$refs.myForm.form.accesorios = JSON.parse(JSON.stringify(data.accesorios));

                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                console.log("DELETE FUNCTION");
                axios.post('/productos/delete',{'id':id}).then(function (response) {
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

