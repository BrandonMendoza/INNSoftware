<template>
    <div class="app-container">

        <el-row type="flex" >
            
        </el-row>
        <div class="filter-container">

             <!-- BUSCAR INPUT -->
            <!-- <div class="filter-item">
                <el-input class="input-with-select" size="small" placeholder="buscar" v-model="presearch" @change="handlePresearchChange()" clearable>
                    <el-select v-model="selectSearch" slot="prepend" size="small" placeholder="Select">
                        <el-option label="Nom. del Proyecto"  value="numero_parte_cliente"></el-option>
                        <el-option label="Núm. de Parte (Local)"    value="numero_parte"></el-option>
                        <el-option label="Cliente"                  value="nombre_cliente"></el-option>
                    </el-select>
                    <el-button slot="append" v-waves size="small" type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div> -->

            <el-button class="filter-item" type="primary" size="small" icon="el-icon-plus" @click="$refs.myForm.clearFields();$refs.myForm.open()">Agregar</el-button>
             <!-- SELECT ROW -->
            <el-button v-waves type="primary" size="small" class="filter-item" icon="el-icon-edit" style="margin-left:0px;" :disabled="disableEditar" @click="loadFieldsUpdate(currentRow)">Editar</el-button>
            <el-button  v-waves type="danger" size="small" class="filter-item" icon="el-icon-delete" style="margin-left:0px;" :disabled="disableEditar"
                        @click="deleteRow(currentRow.id,currentRow.numero_parte,currentRow.nombreCompleto);">Eliminar</el-button>
        </div>
        
        <el-row >
            <el-table
            :data="displayData"
            ref="tableList" 
            highlight-current-row
            @current-change="handleCurrentChangeTable"
            border
            sortable
            tooltip-effect="light"
            fit
            v-loading="loading"
            style="width: 100%">
                <el-table-column
                type="index"
                align="center" 
                width="80"
                sortable
                fixed/>

                <el-table-column
                label="Estatus"
                prop="status_id"
                width="100"
                :filters="[{text: 'sin recibir', value: 1},{text: 'recibido', value: 2},{text: 'revisando', value: 3}]"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
                fixed>
                    <template slot-scope="scope">
                        <el-tag :type="statusColor(scope.row.status_id)">
                            {{scope.row.status.nombre}}
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- <el-table-column
                prop="material_cliente.numero_parte"
                label="Núm. de Parte (Cliente)"
                show-overflow-tooltip
                width="150"/> -->

                <el-table-column
                prop="nombreCompleto"
                label="Material/Accesorio"
                show-overflow-tooltip
                width="360"
                fixed/>

                <el-table-column
                prop="cantidad"
                label="Cantidad"
                show-overflow-tooltip
                width="100"
                align="center"
                fixed/>

                <el-table-column
                prop="material_cliente.numero_parte"
                label="Núm. de Parte (Cliente)"
                show-overflow-tooltip
                width="150"/>

                <el-table-column
                prop="material_cliente.cliente.nombre_cliente"
                label="Cliente"
                show-overflow-tooltip/>

                <el-table-column
                prop="material_cliente.almacen"
                label="Almacén"
                show-overflow-tooltip/>

                <el-table-column
                prop="material_cliente.locacion_almacen"
                label="Locación"
                width="85"
                show-overflow-tooltip/>

                <el-table-column
                prop="acero"
                label="Acero"
                width="100"
                show-overflow-tooltip/>

                <el-table-column
                prop="heat_number"
                label="Heat Number"
                show-overflow-tooltip
                width="120"
                align="center"/>

                <el-table-column
                prop="tba"
                label="Tba"
                show-overflow-tooltip
                align="center"/>

                <el-table-column
                prop="proyecto"
                label="Proyecto"
                show-overflow-tooltip
                width="130"/>

                

                <el-table-column
                prop="pesoTotal"
                label="Peso"
                show-overflow-tooltip
                align="center"/>

                <el-table-column
                prop="work_order"
                label="Work Order"
                show-overflow-tooltip
                width="105"
                align="center"/>

                <el-table-column
                prop="item"
                label="Item"
                align="center"/>                

            </el-table>
        </el-row>    
        
        <el-row type="flex" justify="end">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChangePagination"
                :page-size="pageSize"
                :total="total">
            </el-pagination>

        </el-row>
        <formDialog  ref="myForm" />
    </div>
</template>

<style>
    .el-select .el-input {
        width: 180px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .el-table .danger-row {
        background: #FDE2E2;
    }

    .el-table .success-row {
        background: #E1F3D8;
    }

    .el-table .warning-row {
        background: #FAECD8;
    }
    .el-table .cell {
        word-break: break-word;
    }
</style>

<script>
import formDialog from './Form';
import Pagination from '@/components/Pagination'; 
import waves from '@/directive/waves'; // Waves directive


    export default {
        data(){
            
            return{
                loading : true,
                list:[],
                presearch:'',
                search: '',
                page: 1,
                pageSize: 10,
                total: 0,
                currentRow: null,
                selectSearch:'',
                
            }
        },
        computed: {
            searching() {
                if (!this.search) {
                    this.total = this.list.length;
                    return this.list;
                }
                this.page = 1;
                if(this.selectSearch == "nombre_cliente"){
                   return this.list.filter(data => data['cliente']['nombre_cliente'].toLowerCase().includes(this.search.toLowerCase()));
                }
                return this.list.filter(data => data[this.selectSearch].toLowerCase().includes(this.search.toLowerCase()));
            },
            displayData() {
                this.total = this.searching.length;
                return this.searching.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
            },
            disableEditar() {
                if(this.currentRow == null){
                    return true;
                }
                return false;
            }
        },
        directives: { waves },
        components: { 
            formDialog : formDialog,
            Pagination
        },
        methods:{
            setCurrent(row) {
                this.$refs.tableList.setCurrentRow(row);
            },
            //SELECTROW
            handleCurrentChangeTable(val) {
                this.currentRow = val;
            },
            handleCurrentChangePagination (val) {
                this.page = val
            },
            handlePresearchChange(){
                if(!this.presearch){
                    this.search = '';
                }
            },
            handleSearch () {
                this.search = this.presearch;
            },
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
                let url = '/inventariosMaterialesAccesorios';
                axios.get(url).then(function (response) {
                    me.list = response.data;
                    me.loading = false;
                })
                .catch(function (error) {
                    me.$message.success('Hubo un error.');
                    console.log(error);
                });
            },
            loadFieldsUpdate(data){ 

                this.$refs.myForm.form.id = data.id;
                this.$refs.myForm.form.status_id = data.status_id;
                this.$refs.myForm.form.status_nombre = data.status.nombre;
                this.$refs.myForm.form.catalogo = data.catalogo;
                if(data.catalogo == 1){
                    this.$refs.myForm.form.catalogo_nombre = 'Material';
                }else{
                    this.$refs.myForm.form.catalogo_nombre = 'Accesorio';
                }
                
                
                this.$refs.myForm.form.material_id = data.material_id;
                this.$refs.myForm.form.material_nombre = data.nombreCompleto;
                this.$refs.myForm.form.cantidad = data.cantidad;
                this.$refs.myForm.form.tba = data.tba;
                this.$refs.myForm.form.heat_number = data.heat_number;
                this.$refs.myForm.form.work_order = data.work_order;
                this.$refs.myForm.form.item = data.item;
                this.$refs.myForm.form.proyecto = data.proyecto;
                this.$refs.myForm.form.plan_corte = data.plan_corte;
                
                /**Informacion de Cliente - Material */
                if(data.material_cliente != null){
                    this.$refs.myForm.form.numero_parte = data.material_cliente.numero_parte;
                    this.$refs.myForm.form.cliente_id = data.material_cliente.cliente.id;
                    this.$refs.myForm.form.cliente_nombre = data.material_cliente.cliente.nombre_cliente;
                    this.$refs.myForm.form.material_cliente_id = data.material_cliente_id;
                    this.$refs.myForm.form.almacen = data.material_cliente.almacen;
                    this.$refs.myForm.form.locacion_almacen = data.material_cliente.locacion_almacen;
                    this.$refs.myForm.changeCliente();
                }
                this.$refs.myForm.open();
            },
            deleteRow(id,material){
                this.$confirm('Esto eliminara permanentemente el material ' + material  +' del inventario. Quieres continuar?', 'Advertencia', {
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    type: 'warning',
                }).then(() => {
                    let me = this;
                    me.loading = true;
                    console.log("DELETE FUNCTION");
                    axios.post('/inventariosMaterialesAccesorios/delete',{'id':id}).then(function (response) {
                        me.getList();
                        me.$message.success('Eliminado correctamente.');
                        me.loading = false;
                    })
                    .catch(function (error) {
                        me.$message.success('Hubo un error.');
                        console.log(error);
                        me.loading = false;
                    });
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: 'Eliminacion cancelada',
                    });
                });
            },
            /**Funcion para darle clase a el TAG de acuerdo a la feche de entrega */
            statusColor(status){
                switch (parseInt(status)) {
                    case 1://sin recibir
                        return "danger";
                        break;
                    
                    case 2: //recibido
                        return "success";       
                        break;

                    case 3://revisando
                        return "warning";    
                        break;
                
                }
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
        },
        
        mounted() {
           this.getList();
        }
    }
</script>

