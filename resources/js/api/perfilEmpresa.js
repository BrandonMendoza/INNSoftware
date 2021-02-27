import request from '@/utils/request';
import Resource from '@/api/resource';

class PerfilEmpresaResource extends Resource {
  constructor() {
    super('perfilEmpresa');
  }


  getImgUrl(query) {
    return request({
      url: '/perfilEmpresa/getImgUrl' ,
      method: 'get',
    });
  }

  
}

export { PerfilEmpresaResource as default };