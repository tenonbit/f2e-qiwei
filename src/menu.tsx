import * as React from 'react'
import { DashboardOutlined, HomeOutlined, AndroidOutlined, FileSearchOutlined, SearchOutlined } from '@ant-design/icons'
import { history, dispatch } from './store'
import { hasAuthority, AuthorityType } from './utils/auth'
import Meta from './routes/meta'
import Runtime from './routes/runtime'

export interface MenuItem {
  key: string
  name?: string
  icon?: any
  href?: string
  children?: MenuItem[],
  component?: React.ComponentType,
  hide?: boolean
}
const PageNotBuild = () => <h2>页面未开发</h2>

/** 支持两级菜单 */
export const getMenus = (): MenuItem[] => {
  return [
    {
      key: '/home',
      name: '基本功能',
      icon: <HomeOutlined />,
      children: [
        {
          key: '/home/meta',
          name: 'Meta选择器',
          icon: <AndroidOutlined />,
          href: '/home/meta',
          component: Meta,
        },
        {
          key: '/not_build',
          name: '未开发页面',
          icon: <SearchOutlined />,
          href: '/not_build',
          component: PageNotBuild,
          // hide: true,
        },
      ]
    },
    {
      key: 'devide-line',
    },
    hasAuthority(AuthorityType.RUNTIME) && {
      key: '/runtime',
      name: '运行状态',
      icon: <DashboardOutlined />,
      href: '/runtime',
      component: Runtime,
    },
  ].filter(m => m)
};

/** 支持两级菜单 */
export const getRoutes = () => {
  const menus = getMenus()
  let routes: MenuItem[] = []
  menus.map(({ children, ...menu }) => {
    if (menu.href) {
      routes.push(menu)
    }
    if (children && children.length) {
      children.map(c => {
        if (c.href) {
          routes.push(c)
        }
      })
    }
  })
  return routes;
}

export const getHome = () => {
  return getRoutes()[0]
}

export const getDefaultOpenKeys = () => {
  const { pathname } = location
  return getMenus().filter(m => m.children && m.children.find(c => c.href === pathname)).map(m => m.key);
}

const title = document.title;
const dispatch_pathname = (location: Location) => {
  const pathname = location.pathname || '/'
  let item = getMenus().find(m => m.href === pathname)
  if (item) {
    document.title = title + '-' + item.name
  }
  dispatch(state => ({ ...state, pathname: location.pathname }))
}
history.listen(function () {
  dispatch_pathname(window.location)
})
dispatch_pathname(window.location)
