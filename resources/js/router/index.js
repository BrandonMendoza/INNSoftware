import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layzloading will create many files and slow on compiling, so best not to use lazyloading on devlopment.
 * The syntax is lazyloading, but we convert to proper require() with babel-plugin-syntax-dynamic-import
 * @see https://doc.laravue.dev/guide/advanced/lazy-loading.html
 */

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/* Router for modules */
import elementUiRoutes from './modules/element-ui';
import componentRoutes from './modules/components';
import chartsRoutes from './modules/charts';
import tableRoutes from './modules/table';
import adminRoutes from './modules/admin';
import nestedRoutes from './modules/nested';
import errorRoutes from './modules/error';
import excelRoutes from './modules/excel';
import permissionRoutes from './modules/permission';

/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect'),
    hidden: true,
  },
  {
    path: '/404',
    redirect: { name: 'Page404' },
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/edit',
    hidden: true,
    children: [
      {
        path: 'edit',
        component: () => import('@/views/users/SelfProfile'),
        name: 'SelfProfile',
        meta: { title: 'userProfile', icon: 'user', noCache: true },
      },
    ],
  },
];

export const asyncRoutes = [
  /**ORDENES ABIERTAS */
  {
    path: '/ordenesAbiertas',
    component: Layout,
    redirect: '/OrdenesAbiertas',
    name: 'Ordenes Abiertas',
    meta: { 
      title: 'ordenesAbiertas', icon: 'ordenesAbiertas', permissions: ['view menu ordenes abiertas']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/proyectosProductos/List'),
        name: 'ordenesAbiertas',
        meta: { title: 'ordenesAbiertas', icon: 'ordenesAbiertas'},
      },
      {
        path: 'UploadExcel',
        component: () => import('@/views/proyectosProductos/UploadExcel'),
        name: 'importarExcel',
        meta: { title: 'ImportarExcel' },
        hidden: true,
      },
    ],
  },
  /**INVENTARIOS */
  {
    path: '/inventarios',
    component: Layout,
    redirect: '/inventarios',
    meta: {
      title: 'inventarios', icon: 'inventarios', permissions: ['view menu inventarios'],
    },
    children: [   
      {
        path: 'list',
        component: () => import('@/views/inventarios/materialesAccesorios/List'),
        name: 'Inventarios',
        meta: { title: 'inventarios',icon: 'inventarios' },
      },
    ],
  },
  /**PROYECTOS */
  {
    path: '/proyectos',
    component: Layout,
    redirect: '/Proyectos',
    meta: { title: 'productos', icon: 'product' , permissions: ['view menu proyectos'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/proyectos/List'),
        name: 'Proyectos',
        meta: { title: 'proyectos', icon: 'proyectos' },
      },
    ],
  },
  /**PRODUCTOS */
  {
    path: '/productos',
    component: Layout,
    redirect: '/Productos',
    meta: { title: 'productos', icon: 'product' , permissions: ['view menu productos'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/productos/List'),
        name: 'Productos',
        meta: { title: 'productos', icon: 'product'},
      },
    ],
  },
  /**CATALOGOS */
  {
    path: '/catalogos',
    component: Layout,
    redirect: '/catalogos',
    meta: {
      title: 'catalogos',
      icon: 'table',
      permissions: ['view menu catalogos'],
    },
    children: [
      {
        path: 'clientes',
        component: () => import('@/views/clientes/List'),
        name: 'Clientes',
        meta: { title: 'clientes',icon: 'clientes', permissions: ['view menu clientes'] },
      },
      {  
        path: 'procesos',
        component: () => import('@/views/procesos/List'),
        name: 'Procesos',
        meta: { title: 'procesos', icon: 'process', permissions: ['view menu clientes'] },
      },
      {
        path: 'pinturas',
        component: () => import('@/views/pinturas/List'),
        name: 'pinturas',
        meta: { title: 'pinturas',icon: 'form', permissions: ['view menu pinturas']  },
      },
      {
        path: 'accesorios',
        component: () => import('@/views/accesorios/List'),
        name: 'accesorios',
        meta: { title: 'accesorios',icon: 'form' , permissions: ['view menu accesorios']},
      },
      {
        path: 'materiales',
        component: () => import('@/views/materiales/List'),
        name: 'materiales',
        meta: { title: 'materiales',icon: 'form'  , permissions: ['view menu materiales']},
      },
      {
        path: 'tiposMateriales',
        component: () => import('@/views/materiales/tipos/List'),
        name: 'tiposMaterial',
        meta: { title: 'tiposMaterial',icon: 'form' , permissions: ['view menu tipos material'] },
      },
      {
        path: 'tiposAceros',
        component: () => import('@/views/materiales/aceros/List'),
        name: 'tiposAcero',
        meta: { title: 'tiposAcero',icon: 'form' , permissions: ['view menu tipos acero']  },
      },
      // {
      //   path: '/materialesClientes',
      //   component: () => import('@/views/materialesClientes/List'),
      //   name: 'materialesClientes',
      //   meta: { title: 'asignarMaterialClientes',icon: 'form'  },
      // },
    ],
  },
  //permissionRoutes,
  //componentRoutes,
  //chartsRoutes,
  //nestedRoutes,
  //tableRoutes,
  adminRoutes,
  errorRoutes,
    // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/Download'),
  //   hidden: true,
  // },
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.MIX_LARAVUE_PATH,
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
