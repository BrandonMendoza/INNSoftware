import request from '@/utils/request';
import Resource from '@/api/resource';

class ProyectoProductoResource extends Resource {
  constructor() {
    super('proyectosProductos');
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