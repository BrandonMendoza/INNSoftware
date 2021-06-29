import request from '@/utils/request';
import Resource from '@/api/resource';

class BajaEmpleado extends Resource {
  constructor() {
    super('bajaEmpleado');
  }
  getBajasByEmpleado(empleado_id = 0) {
    return request({
      url: '/' + this.uri + '/'+empleado_id+'/getBajasByEmpleado',
      method: 'get',
    });
  }

  
}

export { BajaEmpleado as default };