import { RouteInfo } from "./vertical-sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  
  {
    path: 'modules',
    title: 'Modules',
    icon: 'cpu',
    class: 'has-arrow',
    extralink: false,
    submenu: [{
      path: '/modules/firm/firm-list',
      title: 'Firm',
      icon: 'mdi mdi-adjust',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/modules/designation/designation-list',
      title: 'Designations',
      icon: 'mdi mdi-adjust',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/modules/expense/expense-list',
      title: 'Expense Type',
      icon: 'mdi mdi-adjust',
      class: '',
      extralink: false,
      submenu: []
    }]
  },
  {
    path: 'component',
    title: 'Component',
    icon: 'cpu',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/component/accordion',
        title: 'Accordion',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/alert',
        title: 'Alert',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/carousel',
        title: 'Carousel',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/dropdown',
        title: 'Dropdown',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/modal',
        title: 'Modal',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/pagination',
        title: 'Pagination',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/poptool',
        title: 'Popover & Tooltip',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/progressbar',
        title: 'Progressbar',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/rating',
        title: 'Ratings',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/tabs',
        title: 'Tabs',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/timepicker',
        title: 'Timepicker',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/buttons',
        title: 'Button',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/card',
        title: 'Card',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/notifier',
        title: 'Notifier',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  }
];
