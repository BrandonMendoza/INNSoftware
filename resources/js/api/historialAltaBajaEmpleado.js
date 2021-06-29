import request from '@/utils/request';
import Resource from '@/api/resource';

class HistorialAltaBajaEmpleado extends Resource {
  constructor() {
    super('historialAltaBajaEmpleado');
  }
  historialByEmpleado(empleado_id = 0) {
    return request({
      url: '/' + this.uri + '/'+empleado_id+'/historialByEmpleado',
      method: 'get',
    });
  }

  
}

export { HistorialAltaBajaEmpleado as default };