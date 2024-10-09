export default [
  { path: '/', name: '主页',icon: 'smile', component: './Index' },
  { path: '/mock_test', name: '测试 mock 数据',icon: 'smile', component: './MockTest' },
  { path: '/interface_info/:id', name: '查看接口',icon: 'smile', component: './InterfaceInfo',hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    // 访问路由，以 / 开头为绝对路径
    path: '/new_page',
    // ./Page ->src/pages/Login
    name: 'newpage',
    icon: 'icon',
    component: './NewPage',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
    ],
  },

  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
