import request from '@/utils/request';
import Resource from '@/api/resource';

class ProyectoProductoResource extends Resource {
  constructor() {
    super('proyectosProductos');
  }

  store(resource){
    return request({
      url: '/proyectosProductos/store' ,
      method: 'post',
      data: resource,
    });
  }

  updateMultiplePlanCorte(resource){
    return request({
      url: '/proyectosProductos/updateMultiplePlanCorte' ,
      method: 'post',
      data: resource,
    });
  }

  deleteFromProject(resource){
    return request({
      url: '/proyectosProductos/deleteFromProject' ,
      method: 'post',
      data: resource,
    });
  }

  
  deleteMultipleFromProject(resource){
    return request({
      url: '/proyectosProductos/deleteMultipleFromProject' ,
      method: 'post',
      data: resource,
    });
  }

  getOrdenesAbiertasList(query) {
    return request({
      url: '/proyectosProductos/getOrdenesAbiertasList' ,
      method: 'get',
      params: query,
    });
  }

  getDocumentosFromOrden(query) {
    return request({
      url: '/proyectosProductos/getDocumentosFromOrden' ,
      method: 'get',
      params: query,
    });
  }

  OrdenesTerminadasSinEmbarcar(cliente_id = 0) {
    return request({
      url: '/' + this.uri + '/'+cliente_id+'/OrdenesTerminadasSinEmbarcar' ,
      method: 'get',
    });
  }

  getOrdenesAbiertasByCliente(cliente_id = 0) {
    return request({
      url: '/' + this.uri + '/'+cliente_id+'/getOrdenesAbiertasByCliente' ,
      method: 'get',
    });
  }

  
}

export { ProyectoProductoResource as default };