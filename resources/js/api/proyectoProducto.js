import request from '@/utils/request';
import Resource from '@/api/resource';

class ProyectoProductoResource extends Resource {
  constructor() {
    super('proyectoProducto');
  }
}

export { ProyectoProductoResource as default };