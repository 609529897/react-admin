import {
  Dashboard,
  Login,
  ArticleList,
  Edit,
  Settings,
  NotFound,
} from '../views';

export const mainRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: NotFound,
  },
];

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    component: Dashboard,
  },
  {
    path: 'admin/settings',
    component: Settings,
  },
  {
    path: 'admin/article',
    component: ArticleList,
    exact: true,
  },
  {
    path: 'admin/article/edit/:id',
    component: Edit,
  }
];