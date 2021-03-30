import React, { PureComponent } from 'react';
import { Layout, Menu, Spin, Tag, Dropdown, Avatar, Divider } from 'antd';
// import moment from 'moment';
// import groupBy from 'lodash/groupBy';
// import Debounce from 'lodash-decorators/debounce';
// import { Link } from 'dva/router';
// import NoticeIcon from '../../components/NoticeIcon';
// import HeaderSearch from '../../components/HeaderSearch';
// import styles from './index.less';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {

  render() {

    let currentUser = {
      name: 'admin',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    }

    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={() => {}}>
        <Menu.Item disabled>个人中心</Menu.Item>
        <Menu.Item disabled>设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    );
    
    return (
      <div className="global-header">
        <Header className="header">
          <div className="right">
            {currentUser.name ? (
              <Dropdown overlay={menu}>
                <span className="action account">
                  <Avatar size="small" className="avatar" src={currentUser.avatar} />
                  <span className="name">{currentUser.name}</span>
                </span>
              </Dropdown>
            ) : <Spin size="small" style={{ marginLeft: 8 }} />}
          </div>
        </Header>
      </div>
    );
  }
}
