import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { Layout as Layer, Menu, Dropdown, Spin, Result, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, SettingOutlined, LogoutOutlined, BgColorsOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons'
import { connect, getState, dispatch, history, Rect } from '../store';
import Logo from './logo';
import { getMenus, getDefaultOpenKeys, getHome, getRoutes } from '../menu';
import { ThemeType } from '../../serve/interfaces';
import { User } from 'f2e-middle-authority';

const { SubMenu } = Menu

interface Props {
    loading: number;
    collapsed: boolean;
    pathname: string;
    toggleCollapse: () => void
    loginUser: User
    theme: ThemeType
    rect: Rect
}
class Layout extends React.Component<Props> {
    clickMenu = ({ key }): void => {
        history.push(key);
    }

    clickOverlay = ({ key }) => {
        switch (key) {
            case 'admin':
                window.location.href = '/admin';
                break;
            case 'logout':
                window.location.href = '/logout';
                break;
            default:
                break;
        }
    }
    changeTheme = ({ key }): void => {
        dispatch(state => {
            return {
                ...state,
                theme: key
            }
        })
    }

    render() {
        const { collapsed, toggleCollapse, rect, loading, pathname, loginUser, theme } = this.props
        if (!loginUser || !rect) {
            return <div />
        }
        const menus = getMenus()
        const routes = getRoutes()
        return (
            <Spin spinning={loading > 0}>
                <Layer

                >
                    <Layer.Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <a href=""><Logo collapsed={collapsed} theme={theme} /></a>
                        <Menu
                            theme='dark'
                            mode="inline"
                            onClick={this.clickMenu}
                            selectedKeys={[pathname]}
                            defaultOpenKeys={getDefaultOpenKeys()}
                        >
                            {
                                menus.map(m => {
                                    if (m.hide) {
                                        return false
                                    } else if (m.children) {
                                        return <SubMenu
                                            key={m.key}
                                            title={<div>{m.icon}<span>{m.name}</span></div>}
                                        >
                                            {m.children.map(sub => {
                                                if (sub.hide) {
                                                    return false
                                                }
                                                return <Menu.Item key={sub.key}>
                                                    {sub.icon}<span>{sub.name}</span>
                                                </Menu.Item>
                                            })}
                                        </SubMenu>
                                    } else {
                                        return !m.name ? <Menu.Divider key={m.key} /> : <Menu.Item key={m.key}>
                                            {m.icon} <span>{m.name}</span>
                                        </Menu.Item>
                                    }
                                }
                                )
                            }
                        </Menu>
                    </Layer.Sider>
                    <Layer style={{ marginLeft: collapsed ? 80 : 200 }}>
                        <Layer.Header
                            style={{
                                backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggleCollapse} /> : <MenuFoldOutlined className="trigger" onClick={toggleCollapse} />}
                            <span>
                                <Dropdown overlay={<Menu onClick={this.changeTheme}>
                                    <Menu.Item key="dark" disabled={theme === 'dark'}><BulbFilled /> 暗色</Menu.Item>
                                    <Menu.Item key="default" disabled={theme === 'default'}><BulbOutlined /> 亮色</Menu.Item>
                                </Menu>} >
                                    <Button type="text">
                                        <BgColorsOutlined /> 切换主题
                                    </Button>
                                </Dropdown>
                                <Dropdown
                                    overlay={<Menu onClick={this.clickOverlay}>
                                        <Menu.Item key="admin"><SettingOutlined /> 进入管理页</Menu.Item>
                                        <Menu.Item key="logout"><LogoutOutlined /> 登出</Menu.Item>
                                    </Menu>}
                                >
                                    <Button type="text">
                                        <UserOutlined /> {loginUser.nickname}
                                    </Button>
                                </Dropdown>
                            </span>

                        </Layer.Header>
                        <Layer.Content
                            style={{
                                margin: 16,
                                padding: 16,
                                background: theme === 'dark' ? '#333' : '#fff',
                                minHeight: 300,
                                overflowY: 'auto',
                            }}
                        >
                            <Router history={history}>
                                <Switch>
                                    <Route path="/" exact component={() => <Redirect to={getHome().href} />} />
                                    {routes.map(menu => menu.component && <Route key={menu.key} path={menu.href} exact component={menu.component} />)}
                                    <Route component={() => <Result status="404" title="404"
                                        subTitle={`页面未找到或者无权限`}
                                        extra={<Button type="link" href="/">返回首页</Button>}
                                    />} />
                                </Switch>
                            </Router>
                        </Layer.Content>
                    </Layer>
                </Layer>
            </Spin>

        );
    }
}

const toggleCollapse = () => dispatch(state => ({ ...state, collapsed: !state.collapsed }))
export default connect(() => {
    const { loading, collapsed, pathname, loginUser, theme, rect } = getState()
    return {
        loading,
        collapsed,
        pathname,
        toggleCollapse,
        loginUser,
        theme,
        rect,
    }
})(Layout);
