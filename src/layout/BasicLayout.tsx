import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { Layout, message } from 'antd';
import { connect, getState, dispatch, history, Rect } from '../store';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import { getMenuData } from '../common/menu';
import { getRoutes } from '../utils/utils';
import { getRouterData } from '../common/router'



const { Content } = Layout;

const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

interface IBasicLayout {
  loading: number,
  collapsed: boolean,
  pathname: string,
  toggleCollapse: () => void,
  match?: any,
  location?: any,
  routerData?: any
}

class BasicLayout extends React.PureComponent<IBasicLayout> {
  state = {
    isMobile: false
  }

  render() {
    const {
      collapsed, match, location, routerData
    } = this.props

    return (
      <div>
        <Layout>
          <SiderMenu
            collapsed={collapsed}
            location={location}
            isMobile={this.state.isMobile}
          />

          <Layout>
            <GlobalHeader
              // logo={logo}
              // currentUser={currentUser}
              // fetchingNotices={fetchingNotices}
              // notices={notices}
              // collapsed={collapsed}
              // isMobile={this.state.isMobile}
              // onNoticeClear={this.handleNoticeClear}
              // onCollapse={this.handleMenuCollapse}
              // onMenuClick={this.handleMenuClick}
              // onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />

            <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              <div style={{ minHeight: 'calc(100vh - 260px)' }}>
                <Switch>
                  {
                    redirectData.map(item =>
                      <Redirect key={item.from} exact from={item.from} to={item.to} />
                    )
                  }
                  {
                    getRoutes(match.path, routerData).map(item => (
                      <Route
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                      />
                    ))
                  }
                  <Redirect exact from="/" to="/home" />
                  {/* <Route render={NotFound} /> */}
                </Switch>
              </div>
              <GlobalFooter
                links={[{
                  title: 'Ant Design Pro',
                  href: 'http://pro.ant.design',
                  blankTarget: true,
                }, {
                  title: 'GitHub',
                  href: 'https://github.com/ant-design/ant-design-pro',
                  blankTarget: true,
                }, {
                  title: 'Ant Design',
                  href: 'http://ant.design',
                  blankTarget: true,
                }]}
                copyright={
                  <div>
                    Copyright @ CopyrightCopyrightCopyright
                  </div>
                }
              />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(() => {
  const { loading, collapsed, routerData } = getState()
  return {
    loading,
    collapsed,
    routerData,
  }
})(BasicLayout);