import request from '@/utils/request';
import Resource from '@/api/resource';

class ContratoEmpleadoResource extends Resource {
  constructor() {
    super('contratoEmpleado');
  }


  contratosByEmpleado(empleado_id = 0) {
    return request({
      url: '/' + this.uri + '/'+empleado_id+'/contratosByEmpleado',
      method: 'get',
    });
  }

  storeAlta(id, resource) {
    return request({
      url: '/' + this.uri + '/' +id+'/storeAlta',
      method: 'put',
      data: resource,
    });
  }

  
}

export { ContratoEmpleadoResource as default };