import request from '@/utils/request';
import Resource from '@/api/resource';

class ProyectoProductoComentarioResource extends Resource {
  constructor() {
    super('proyectosProductosComentarios');
  }

  storeComentario(resource){
    return request({
      url: '/proyectosProductosComentarios/store' ,
      method: 'post',
      data: resource,
    });
  }

  getProyectoProducoComentarioByProyectoProducto(proyecto_producto_id = 0){
    return request({
      url: '/proyectosProductosComentarios/'+proyecto_producto_id+'/getProyectoProducoComentarioByProyectoProducto' ,
      method: 'post',
    });
  }

  
}

export { ProyectoProductoComentarioResource as default };