import {
  AndroidOutlined,
  DashboardOutlined,
  ReadOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import React from 'react';


const menuData = [
  {
    name: '首页',
    icon: <DashboardOutlined />,
    path: 'home',
  }, 
  {
    name: '系统管理',
    icon: <LogoutOutlined />,
    path: 'system',
    children: [
      {
        name: '企业管理',
        path: 'enterprise',
      }, 
      {
        name: '员工管理',
        path: 'staffs',
      },
      {
        name: '客户列表',
        path: 'clients',
      }
    ],
  },
  {
    name: '加粉任务',
    icon: <ReadOutlined />,
    path: 'fans',
    children: [
      {
        name: '加粉任务管理',
        path: 'taskManagement',
      }, 
      {
        name: '加粉任务分配',
        path: 'taskAssignment',
      },
      {
        name: '加粉任务列表',
        path: 'taskList',
      }
    ],
  },
];

function formatter(data, parentPath = '') {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
