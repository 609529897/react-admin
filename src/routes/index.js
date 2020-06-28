import React from 'react';
import { DashboardOutlined, UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';

import {
  Dashboard,
  Login,
  List,
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
    title: '仪表盘',
    isNav: true,
    icon: <DashboardOutlined />,
  },
  {
    path: 'admin/article',
    component: List,
    exact: true,
    title: '文章管理',
    isNav: true,
    icon: <UnorderedListOutlined />,
  },
  {
    path: 'admin/article/edit/:id',
    component: Edit,
  },
  {
    path: 'admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon: <SettingOutlined />,
  }
];