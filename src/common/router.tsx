import React from 'react';
import { getMenuData } from './menu';
import { asyncComponent } from './asyncComponent'

const routes = [
  {
    path: '/home',
    component: asyncComponent(() => import('../routes/home')),
  },
  {
    path: '/system/enterprise',
    component: asyncComponent(() => import('../routes/system/Enterprise')),
  }
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
