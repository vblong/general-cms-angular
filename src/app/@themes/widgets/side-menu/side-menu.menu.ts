export const MENU_ITEMS: any[] = [
  {
    title: 'E-Commerce Dashboard',
    icon: 'shopping_cart',
    link: 'ecommerce',
    active: false
  },
  {
    title: 'IoT Dashboard',
    icon: 'devices',
    link: 'iot-dashboard',
    active: false
  },
  {
    title: 'Entries',
    icon: 'receipt_long',
    link: 'entries',
    active: false
  },
  {
    title: 'New Entry',
    icon: 'edit',
    link: 'new-entry',
    home: true,
    active: false
  },
  {
    title: 'Category',
    icon: 'category',
    link: 'category',
    active: false
  },
  {
    title: 'Layout',
    icon: 'auto_awesome_mosaic',
    link: 'layout',
    active: false
  },
  {
    title: 'Forms',
    icon: 'construction',
    link: 'forms',
    active: false
  },
  {
    title: 'UI Features',
    icon: 'keypad',
    link: 'ui-features',
    active: false
  },
  {
    title: 'Modal & Overlays',
    icon: 'layers',
    link: 'modal-overlays',
    active: false
  },
  {
    title: 'Maps',
    icon: 'map',
    link: 'maps',
    active: false
  },
  {
    title: 'Charts',
    icon: 'insights',
    link: 'charts',
    active: false,
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'edit',
    link: 'editors',
    active: false,
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'table_chart',
    link: 'table-data',
    active: false,
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: 'settings',
    active: false,
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock',
    link: 'auth',
    active: false,
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: '',
    icon: '',
    link: '',
    active: false,
  }
];
