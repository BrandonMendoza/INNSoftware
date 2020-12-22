import request from '@/utils/request';
import Resource from '@/api/resource';

class ProyectoProductoResource extends Resource {
  constructor() {
    super('productos');
  }

  getProductosByCliente(cliente_id = 0) {
    return request({
      url: '/' + this.uri + '/'+cliente_id+'/getProductosByCliente' ,
      method: 'get',
    });
  }
}

export { ProyectoProductoResource as default };