<template>
    <div class="app-container">

        <el-row>
           

            
        </el-row>
        
        <div class="filter-container">
             <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>

            <el-button class="filter-item" type="primary" icon="" @click="$refs.dialogoOrdenar.open()"><svg-icon icon-class="list"/> Ordenar</el-button>

            <el-button class="filter-item" type="primary" icon="" @click="$refs.dialogoPorcentaje.open()"><i class="el-icon-s-operation"></i> Porcentajes</el-button>
        </div>

        <el-row >
            
            <el-table
            :data="procesos"
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
                prop="activo"
                label="Activo"
                align="center"
                width="80">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.activo == 1" type="success"><i class="el-icon-success"></i></el-tag>
                        <el-tag v-if="scope.row.activo == 0" type="danger"><i class="el-icon-error"></i></el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                label="Orden"
                align="center"
                width="80">
                    <template slot-scope="scope">
                        <el-tag> {{scope.row.orden == 0 ? '—' :  scope.row.orden}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                prop="nombre"
                label="Nombre"/>

                <el-table-column
                prop="simbolo"
                label="Simbolo"/>

                <el-table-column
                label="Color"
                align="center"
                width="80">
                    <template slot-scope="scope">
                        <el-tag :style="{'background-color':scope.row.color}"></el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                label="Color del Texto"
                align="center"
                width="140">
                    <template slot-scope="scope">
                        <el-tag :style="{'background-color':scope.row.texto_color}"  disabled ></el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                fixed="right"
                label=""
                align="center"
                width="180">
                    <template v-if="scope.row.es_estatico == 0" slot-scope="scope">
                        <el-button type="primary" size="mini" @click="loadFieldsUpdate(scope.row);">Editar</el-button>
                        <el-button type="danger" size="mini" @click="deleteRow(scope.row.id);">Eliminar</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row type="flex" justify="end">
            <pagination v-show="procesos.length>0" :total="procesos.length" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getProcesos" />
        </el-row>

    

        <formDialog  ref="myForm" />
        <ordenarDialog  ref="dialogoOrdenar" />
        <porcentajeDialog  ref="dialogoPorcentaje"/>
    </div>
</template>

<script>
import formDialog from './Form';
import ordenarDialog from './ListOrdenar';
import porcentajeDialog from './Porcentajes';
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
                procesos:[], 
            }
        },
        components: { 
            formDialog : formDialog,
            ordenarDialog : ordenarDialog,
            porcentajeDialog : porcentajeDialog,
            Pagination
        },
        methods:{
            getProcesos(){
                let me =this;
                let url = '/procesos';
                axios.get(url).then(function (response) {
                    me.procesos = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.error('Hubo un error.');
                    console.log(error);
                    me.loading = false;
                });
            },
            loadFieldsUpdate(data){ 
                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.activo = parseInt(data.activo);
                this.$refs.myForm.form.nombre = data.nombre;
                this.$refs.myForm.form.simbolo = data.simbolo;
                this.$refs.myForm.form.color = data.color;
                this.$refs.myForm.form.texto_color = data.texto_color;
                this.$refs.myForm.open();
            },
            deleteRow(id){
                let me = this;
                me.loading = true;
                console.log("DELETE FUNCTION");
                axios.post('/proceso/delete',{'id':id}).then(function (response) {
                    me.getProcesos();
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
           this.getProcesos();
        }
    }
</script>

