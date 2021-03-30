import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
// import { Link } from 'dva/router';
// import logo from '../../assets/logo.svg';
// import { getMenuData } from '../../common/menu';
// let styles = {}

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends PureComponent {
  state = {
    collapsed: false,
  };
  
  
  render() {
   
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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {/* {this.getNavMenuItems(this.menus)} */}
          
          <Menu.Item key="1" icon={<PieChartOutlined />}>
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
          </SubMenu>







        </Menu>
      </Sider>
    );
  }
}
