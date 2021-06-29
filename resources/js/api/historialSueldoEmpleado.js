import request from '@/utils/request';
import Resource from '@/api/resource';

class HistorialSueldoEmpleado extends Resource {
  constructor() {
    super('historialSueldoEmpleado');
  }
  historialSueldoByEmpleado(empleado_id = 0) {
    return request({
      url: '/' + this.uri + '/'+empleado_id+'/historialSueldoByEmpleado',
      method: 'get',
    });
  }

  
}

export { HistorialSueldoEmpleado as default };