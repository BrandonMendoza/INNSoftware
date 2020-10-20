<template>
    <div class="app-container">
        <el-dialog
        class="dialogoOrdenar"
        width="60%"
        :ref="dialogOrdenarRef"
        :visible.sync="dialogoOrdenar"> 
          <span slot="title"><svg-icon icon-class="list"/> Ordenar Procesos</span>
          <el-table
          ref="dragTable"
          :data="procesosOrdenar"
          border
          fit
          highlight-current-row
          row-key="id"
          v-loading="listLoading"
          style="width: 100%">
              <el-table-column
                  prop="orden"
                  label="Orden"
                  width="180">
              </el-table-column>

              <el-table-column
                  prop="nombre"
                  label="Nombre">
                <template slot-scope="scope" :style="{'background-color':scope.row.color,'color':scope.row.texto_color}">
                  <span >{{scope.row.nombre}}</span>
                </template>
                  
              </el-table-column>

              <el-table-column
              prop="simbolo"
              label="Simbolo">
              </el-table-column>
              
              <el-table-column
              prop="porcentaje"
              label="Porcentaje">
                <template slot-scope="scope">
                  <span >{{scope.row.porcentaje}}%</span>
                </template>
              </el-table-column>
          </el-table> 

          <span slot="footer" class="dialog-footer">
              <el-button @click=" dialogoOrdenar = false" class="float-left">Cancelar</el-button>
              
              <el-button type="success" @click="guardarOrden();" icon="el-icon-check">Guardar</el-button>
          </span>

        </el-dialog>
  </div>
</template>

<script>
  import Sortable from 'sortablejs';
 
export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger',
      };
      return statusMap[status];
    },
  },
  data() {
    return {
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
        },
        sortable: null,
        oldList: [],
        newList: [],

        sortable: null,
        dialogoOrdenar: false,
        dialogOrdenarRef: 'dialogoOrdenar',  
        loading : true,
        procesosOrdenar:[],
    };
  },
  methods: {
    guardarOrden(){
      var loadingInstance = this.$loading({
        target: '.dialogoOrdenar .el-dialog'
      });

      let me =this;
      axios.put('/procesos/updateOrder',{'procesos':this.procesosOrdenar}).then(function (response) {
          console.log("Response:");
          console.log(response);
          
          me.$parent.getProcesos();
          me.close(); //Cerramos dialogo
          loadingInstance.close();//paramos animacion de cargar
          me.notificarSuccess(); //notificamos
      })
      .catch(function (error) {
          notificarError();
          console.log(error);
      });
    },
    getList() {
      this.listLoading = true;
      //const { data } = await fetchList(this.listQuery);
      this.list = this.procesosOrdenar;
      //this.total = list.total;
      this.oldList = this.list.map(v => v.id);
      this.newList = this.oldList.slice();

      this.$nextTick(() => {
        this.setSort();
      });

      
    },
    getProcesos(){
        let me =this;
        let url = '/procesos/order' //Ruta que hemos creado para que nos devuelva todas las tareas
        axios.get(url).then(function (response) {
            //creamos un array y guardamos el contenido que nos devuelve el response
            console.table("PROCESOS ORDER:");
            console.table(response.data);
            me.procesosOrdenar = response.data;
            me.getList();
            me.listLoading = false;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
      console.log("EL:");
      console.log(el);
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          /* Se obtienen los ids ordenados de la tabla */
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
          /* Se le asigna a la lista principal el nuevo orden */
          this.newList.forEach((value, index) => {
            this.procesosOrdenar.find(proceso => {
              if (proceso.id === value) {
                proceso.orden = (index+1);
              }
            });
          });
        },
      });
    },
    open() {
        this.dialogoOrdenar = true;
        this.getProcesos();
    },
    close() {
        this.dialogoOrdenar = false;
    },
    notificarSuccess() {
      this.$message({
          message: 'Guardado correctamente.',
          type: 'success'
      });
    },
    notificarError() {
      this.$message({
          message: 'Hubo un error.',
          type: 'danger'
      });
    },
  },
};
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star {
  margin-right:2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>