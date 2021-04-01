import { getMenuData } from './menu';

import Home from '../routes/home'
import Analysis from '../routes/dashboard/Analysis'

const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/dashboard/analysis',
    component: Analysis,
  }
]

const menuData = getFlatMenuData(getMenuData());
// const routerDataWithName = {};
// Object.keys(routes).forEach((item) => {
//   routerDataWithName[item] = {
//     ...routes[item],
//     name: routes[item].name || menuData[item.replace(/^\//, '')],
//   };
// });

// console.log('menuData-router', menuData)

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


export const getRouterData = () => {
  const pathArr = routes.map(route => {
    return {
      [route.path]: route
    }
  })

  let name = ''
  return pathArr.reduce((target, item): any => {
    name = menuData[Object.keys(item)[0].replace(/^\//, '') || '/']
    return {
      ...target,
      ...item,
      name
    }
  }, {})
}








