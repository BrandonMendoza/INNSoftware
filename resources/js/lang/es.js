export default {
  route: {
    /**News */
    ordenesAbiertas:'Ordenes Abiertas',
    proyectos: 'Proyectos',
    productos: 'Productos',
    pinturas: 'Pinturas',
    procesos: 'Procesos',
    inventarios: 'Inventarios',
    clientes: 'Clientes',
    materiales: 'Materiales',
    asignarMaterialClientes: 'Asignar Material a Clientes',
    tiposMaterial: 'Tipos de Material',
    tiposAcero: 'Tipos de Acero',
    accesorios: 'Accesorios',
    /**Old */
    dashboard: 'Tablero',
    introduction: 'Introduccion',
    documentation: 'Documentacion',
    guide: 'Guia',
    permission: 'Permiso',
    pagePermission: 'Pagina Permiso',
    rolePermission: 'Rol Permiso',
    directivePermission: 'Directivas',
    icons: 'Iconos',
    components: 'Comonentes',
    componentIndex: 'Introduccion',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'Editor JSON',
    dndList: 'Lista dnd',
    splitPane: 'SplitPane',
    avatarUpload: 'Subir Avatar',
    dropzone: 'Dropzone',
    sticky: 'pegajoso',
    countTo: 'CountTo',
    componenteMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Arrastrar diálogo',
    dragSelect: 'Arrastrar Seleccionar',
    dragKanban: 'Arrastrar Kanban',
    charts: 'Gráficos',
    keyboardChart: 'Tabla de teclado',
    lineChart: 'Gráfico de líneas',
    mixChart: 'Mix Chart',
    example: 'Ejemplo',
    nested: 'Rutas anidadas',
    menu1: 'Menú 1',
    'menu1-1': 'Menú 1-1',
    'menu1-2': 'Menú 1-2',
    'menu1-2-1': 'Menú 1-2-1',
    'menu1-2-2': 'Menú 1-2-2',
    'menu1-3': 'Menú 1-3',
    menu2: 'Menú 2',
    table: 'Tabla',
    dynamicTable: 'Tabla dinámica',
    dragTable: 'Arrastrar tabla',
    inlineEditTable: 'Edición en línea',
    complexTable: 'Tabla compleja',
    treeTable: 'Tabla de árbol',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Formulario',
    createArticle: 'Crear artículo',
    editArticle: 'Editar artículo',
    articleList: 'Artículos',
    errorPages: 'Páginas de error',
    page401: '401',
    page404: '404',
    errorLog: 'Registro de errores',
    excel: 'Excel',
    exportExcel: 'Exportar Excel',
    selectExcel: 'Exportar seleccionados',
    mergeHeader: 'Combinar encabezado',
    uploadExcel: 'Subir Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Exportar Zip',
    theme: 'Tema',
    clipboardDemo: 'Portapapeles',
    i18n: 'I18n',
    externalLink: 'Enlace externo',
    elementUi: 'Elemento UI',
    administrator: 'Administrador',
    users: 'Usuarios',
    userProfile: 'Perfil de usuario',
  },
  navbar: {
    logOut: 'Cerrar sesión',
    dashboard: 'Tablero',
    github: 'Github',
    theme: 'Tema',
    size: 'Tamaño global',
    profile: 'Perfil',
  },
  login: {
    title: 'Formulario de inicio de sesión',
     logIn: 'Iniciar sesión',
     username: 'Nombre de usuario',
     password: 'Contraseña',
     any: 'cualquiera',
     thirdparty: 'O conectarse con',
     ThirdpartyTips: 'No se puede simular en local, ¡así que combine su propia simulación empresarial! ! ! ',
     email: 'Correo electrónico',
  },
  documentation: {
    documentation: 'Documentación',
    laravel: 'Laravel',
    github: 'Repositorio de Github',
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit Permission',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases it is not suitable to use v-role/v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if with checkRole or/and checkPermission.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide',
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.',
  },
  table: {  
    description: 'Descripción',
    dynamicTips1: 'Encabezado fijo, ordenado por orden de encabezado',
    dynamicTips2: 'Encabezado no fijo, ordenado por orden de clic',
    dragTips1: 'El orden predeterminado',
    dragTips2: 'El orden después de arrastrar',
    name: 'nombre',
    title: 'Título',
    importance: 'Imp',
    type: 'Tipo',
    remark: 'Observación',
    search:'Buscar',
    add: 'Agregar',
    export: 'Exportar',
    reviewer: 'revisor',
    id:'ID',
    date: 'Fecha',
    author: 'Autor',
    readings: 'Lecturas',
    status: 'Estado',
    actions: 'Acciones',
    edit: 'Editar',
    publish: 'Publicar',
    draft: 'Borrador',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    keyword: 'palabra clave',
    role: 'Rol',
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction',
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)',
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)',
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.',
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.',
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All',
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo',
  },
  user: {
    'role': 'Rol',
    'password': 'Contraseña',
    'confirmPassword': 'Confirmar contraseña',
    'name': 'Nombre',
    'email': 'Correo electrónico',
  },
  roles: {
    description: {
      admin: 'Superadministrador. Tener acceso y permiso completo a todas las páginas. ',
    },
  },
};