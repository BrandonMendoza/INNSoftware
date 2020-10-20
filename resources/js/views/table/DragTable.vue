<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
                ref="dragTable"
                :data="procesosOrdenar"
                stripe
                border fit highlight-current-row
                row-key="id"
                style="width: 100%">
                    <el-table-column align="center" label="ID" width="65">
                        <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orden"
                        label="Orden"
                        width="180">
                    </el-table-column>
                    
                    <el-table-column
                        prop="nombre"
                        label="Nombre">
                    </el-table-column>
                    <el-table-column
                    prop="simbolo"
                    label="Simbolo">
                    </el-table-column>
                    
                    <el-table-column
                    prop="porcentaje"
                    label="Porcentaje">
                    </el-table-column>
                    
                    <el-table-column align="center" label="Drag" width="80">
                        <template slot-scope="{}">
                        <svg-icon class="drag-handler" icon-class="drag" />
                        </template>
                    </el-table-column>
                    
                </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <div class="show-d">
      {{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}
    </div>
    <div class="show-d">
      {{ $t('table.dragTips2') }} : {{ newList }}
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article';
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
      procesosOrdenar:[],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.getProcesos();
      this.listLoading = true;
      this.list = this.procesosOrdenar;
      //this.total = data.total;
      this.listLoading = false;

      this.oldList = this.list.map(v => v.id);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        this.setSort();
      });
    },
    getProcesos(){
        let me =this;
        let url = '/procesos' //Ruta que hemos creado para que nos devuelva todas las tareas
        axios.get(url).then(function (response) {
            //creamos un array y guardamos el contenido que nos devuelve el response
            console.table("PROCESOS:");
           // console.table(response.data);
            me.procesosOrdenar = response.data;
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '');
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.list.splice(evt.newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        },
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
