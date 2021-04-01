import React, { PureComponent } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// import logo from '../../assets/logo.svg';
import { getMenuData } from '../../common/menu';

// import {
//   AppstoreOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
// } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface ISiderMenu {
  openKeys?: any,
  collapsed?: any,
}

export default class SiderMenu extends PureComponent<any, ISiderMenu> {
  private menus: any

  constructor(props) {
    super(props);
    this.menus = getMenuData();
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
      collapsed: false,
    };
  }
  // private menus = getMenuData()

  // state = {
  //   collapsed: false,
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.pathname !== this.props.location.pathname) {
  //     this.setState({
  //       openKeys: this.getDefaultCollapsedSubMenus(nextProps),
  //     });
  //   }
  // }

  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    const snippets = pathname.split('/').slice(1, -1);
    const currentPathSnippets = snippets.map((item, index) => {
      const arr = snippets.filter((_, i) => i <= index);
      return arr.join('/');
    });
    let currentMenuSelectedKeys = [];
    currentPathSnippets.forEach((item) => {
      currentMenuSelectedKeys = currentMenuSelectedKeys.concat(this.getSelectedMenuKeys(item));
    });
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }

  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }

  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus);
    if (flatMenuKeys.indexOf(path.replace(/^\//, '')) > -1) {
      return [path.replace(/^\//, '')];
    }
    if (flatMenuKeys.indexOf(path.replace(/^\//, '').replace(/\/$/, '')) > -1) {
      return [path.replace(/^\//, '').replace(/\/$/, '')];
    }
    return flatMenuKeys.filter((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
      const itemRegExp = new RegExp(itemRegExpStr);
      return itemRegExp.test(path.replace(/^\//, '').replace(/\/$/, ''));
    });
  }





  getNavMenuItems(menusData) {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path && item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return item.hideInMenu ? null :
          (
            <SubMenu
              title={
                item.icon ? (
                  <span>
                    {item.icon}
                    <span>{item.name}</span>
                  </span>
                ) : item.name
              }
              key={item.key || item.path}
            >
              {this.getNavMenuItems(item.children)}
            </SubMenu>
          );
      }
      const icon = item.icon ? item.icon : null;
      return item.hideInMenu ? null :
        (
          <Menu.Item key={item.key || item.path}>
            {
              /^https?:\/\//.test(itemPath) ? (
                <a href={itemPath} target={item.target}>
                  {icon}<span>{item.name}</span>
                </a>
              ) : (
                <Link
                  to={itemPath}
                  target={item.target}
                  replace={itemPath === this.props.location.pathname}
                // onClick={this.props.isMobile ? () => { this.props.onCollapse(true); } : undefined}
                >
                  {icon}<span>{item.name}</span>
                </Link>
              )
            }
          </Menu.Item>
        );
    });
  }

  handleOpenChange = (openKeys) => {
    console.log('openKeys', openKeys);
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }


  render() {

    // console.log('this.menu', this.menus);
    // console.log('state', this.state);
    console.log('this.props.siderMenu', this.props)

    const { collapsed, location: { pathname } } = this.props
    const { openKeys } = this.state
    // 当前展开的 SubMenu 菜单项 key 数组
    const menuProps = collapsed ? {} : { openKeys }

    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    console.log('selectedKeys', selectedKeys);

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
        breakpoint="md"
        onCollapse={null}
        width={256}
        className="side-menu"
      >
        <div className="logo">
          logo
          {/* <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link> */}
        </div>
        <Menu
          mode="inline"
          theme="dark"
          style={{ padding: '16px 0', width: '100%' }}
          {...menuProps}
          selectedKeys={selectedKeys}
          onOpenChange={this.handleOpenChange}
        >

          {this.getNavMenuItems(this.menus)}

          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}


        </Menu>
      </Sider>
    );
  }
}
