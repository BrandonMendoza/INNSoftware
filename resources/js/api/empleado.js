import request from '@/utils/request';
import Resource from '@/api/resource';

class EmpleadoResource extends Resource {
  constructor() {
    super('empleado');
  }


  updateDeleted(id, resource) {
    console.log("UPODATE DEKETED");
    return request({
      url: '/' + this.uri + '/' + id+'/updateDeleted',
      method: 'put',
      data: resource,
    });
  }

  
}

export { EmpleadoResource as default };