import React from 'react';
import { getMenuData } from './menu';
import { asyncComponent } from './asyncComponent'

const routes = [
  // 首页
  {
    path: '/home',
    component: asyncComponent(() => import('../routes/home')),
  },
  // 系统管理
  {
    path: '/system/enterprise',
    component: asyncComponent(() => import('../routes/system/Enterprise')),
  },
  {
    path: '/system/staffs',
    component: asyncComponent(() => import('../routes/system/Staffs')),
  },
  {
    path: '/system/clients',
    component: asyncComponent(() => import('../routes/system/Clients')),
  },
  // 加粉任务
  {
    path: '/fans/taskManage',
    component: asyncComponent(() => import('../routes/fans/TaskManage')),
  },
  {
    path: '/fans/taskAllot',
    component: asyncComponent(() => import('../routes/fans/TaskAllot')),
  },
  {
    path: '/fans/taskList',
    component: asyncComponent(() => import('../routes/fans/TaskLists')),
  },
]

const menuData = getFlatMenuData(getMenuData());

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
}

export const getRouterData = () => (
  routes.reduce((target, route) => {
    return {
      ...target,
      [route.path]: {
        ...route,
        component: route.component,
        name: menuData[route.path.replace(/^\//, '') || '/']
      }
    }
  }, {})
)
