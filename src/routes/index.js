import React from 'react'
import { DashboardOutlined, UnorderedListOutlined, SettingOutlined, RobotOutlined } from '@ant-design/icons'

import {
  Dashboard,
  Login,
  List,
  Edit,
  Settings,
  NotFound,
  Notifications,
  NoAuth,
  Profile
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
]

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    isNav: true,
    icon: <DashboardOutlined />,
    roles: ['001', '002', '003']
  },
  {
    path: '/admin/article',
    component: List,
    exact: true,
    title: '文章管理',
    isNav: true,
    icon: <UnorderedListOutlined />,
    roles: ['001', '002', '003']
  },
  {
    path: '/admin/article/edit/:id',
    component: Edit,
  }, {
    path: '/admin/notifications',
    component: Notifications,
    roles: ['001', '002', '003']
  }, {
    path: '/admin/noauth',
    component: NoAuth,
    roles: ['001', '002', '003']
  }, {
    path: '/admin/profile',
    component: Profile,
    roles: ['001', '002', '003']
  }, {
    path: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon: <SettingOutlined />,
    roles: ['001', '002', '003']
  },{
    path: '/admin/dev',
    component: "",
    title: '开发中...',
    isNav: true,
    icon: <RobotOutlined />,
    roles: ['000']
  },
]