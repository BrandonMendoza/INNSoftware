<template>

    <el-form  :model="form" ref="form" label-position="top" label-width="150px" >
        <el-dialog
        width="40%"
        id="dialogoListDocumento"
        :ref="dialogRef"
        :visible.sync="dialogoAgregar">
            <span slot="title"><i class="el-icon-edit"></i> Documentos de Proyecto </span>

            
            <!-- Id del proceso que se esta editando ("0" si es agregar) -->
            <input v-model="form.id" hidden/>
            <span style="margin-right: 5px;"><b>Núm. de Parte (Local): </b> {{form.numero_parte}}</span>
            <span style="margin-right: 5px;"><b>Núm. de Parte (Cliente): </b> {{form.numero_parte_cliente}}</span>
            <br>
            <br>
            <div class="filter-container">
                <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="dialogoDocumentos = true;">Agregar</el-button>
            </div>
                <el-table
                :data="form.documentos"
                border
                fit
                highlight-current-row
                style="width: 100%">
                    <el-table-column
                    type="index"
                    align="center" 
                    width="80"/>

                    <el-table-column
                    prop="nombre_real"
                    label="Documento"
                    show-overflow-tooltip/>

                    <el-table-column
                    prop="created_at"
                    label="Fecha de carga"
                    align="center" 
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.created_at | moment("YYYY-MMM-DD")}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    align="center"
                    width="180">
                        <template slot-scope="scope">
                            <a type="button" title="descargar" :href="'/proyectos/downloadDocumento/'+scope.row.id" class="el-button el-button--primary el-button--mini" >
                                <i class="el-icon-download"></i>
                            </a>
                            <el-button type="danger" title="eliminar" size="mini" icon="el-icon-delete" @click="deleteDocumento(scope.row);"/>
                        </template>
                    </el-table-column>
                </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="clearFields();dialogoAgregar = false" class="float-left">Cerrar</el-button>
            </span>
        </el-dialog>

        <!-- Dialogo Agregar Doc -->
        <el-dialog
        id="dialogoAgregarDocumento"
        title="Agregar Documento a Proyecto"
        :visible.sync="dialogoDocumentos"
        :before-close="handleClose"
        width="23%">
            
            <div class="filter-container">
                <el-upload
                class="upload-demo"
                action=""
                :file-list="fileList"
                ref="upload"
                :auto-upload="false"
                :on-change="handleUploadChange"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                drag>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Arrastra un archivo aqui o <em>click para subir</em></div>
                </el-upload>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogoDocumentos = false;fileList = [];" class="float-left">Cancelar</el-button>
                <el-button style="margin-left: 10px;" type="success" @click="submitUpload">Guardar</el-button>
            </span>
        </el-dialog>
    </el-form>

    
</template>

<script>
import { CommentDropdown } from '../articles/components/Dropdown';
  export default {
    props: {
        csrf: {
            type: String
        },
        photourl: {
            type: String
        }
    },
    data() {
      return {
        imageUrl: '',
        fileList: [],
        form:{
            id:0,
            numero_parte:"",
            numero_parte_cliente:"",
            documentos:[],
        },
        dialogoAgregar: false,
        dialogRef: 'documentosDialog',
        dialogoDocumentos:false,
        loadingImage: false,
        imageFile: null,
      };
    },
    methods: {
        open() {
            this.dialogoAgregar = true;
        },
        close() {
            this.dialogoAgregar = false;
        },
        clearFields(){
            this.form.id = 0;
            this.form.documentos = [];
        },
        handleClose(done) {
            this.$confirm('Está seguro que deseas salir?')
            .then(_ => {
                this.dialogoDocumentos = false;
            })
            .catch(_ => {});
        },
        deleteDocumento(row){
            let me = this;
            me.loading = true;
            var loadingInstance = this.$loading({
                target: '#dialogoListDocumento > .el-dialog'
            });
            axios.post('/proyectos/documentos/delete',{'proyecto_id':me.form.id,'documento_id':row.id}).then(function (response) {
                let i = me.form.documentos.map(documento => documento.id).indexOf(row.id) // find index of your object
                me.form.documentos = response.data.documentos;
                me.$message.success('Eliminado correctamente.');
                loadingInstance.close();
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
            });
        },
        submitUpload() {
            let me =this;
            if(me.fileList[0] == 'undefined' || me.fileList[0] == null){
                me.notificarError("Selecciona un archivo para subir");
                return false
            }
            var loadingInstance = this.$loading({
                target: '#dialogoAgregarDocumento > .el-dialog'
            });
            const formData = new FormData();
            
            formData.append('file', me.fileList[0].raw);
            formData.append('proyecto_id', me.form.id);
            axios.post('/proyectos/documentos/store', formData,{headers: {'Content-Type': 'multipart/form-data'}})
            .then(function (response){
                me.$message.success('Guardado correctamente.');
                me.form.documentos = response.data.documentos;
                me.fileList = [];
                loadingInstance.close();
                me.dialogoDocumentos = false;
            })
            .catch(function (error) {
                me.$message.error('Hubo un error.');
                console.log(error);
                loadingInstance.close();
                me.dialogoDocumentos = false;
            });
        },
        handleProgress(ev, file, fileLIst) {
            file.raw['status'] = "uploading";
        },
        handleSuccess(res, file, fileLIst) {
            file.raw['status'] = "success";
        },
        handleUploadChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
    },
  };
</script>

    
