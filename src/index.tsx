import { ConfigProvider } from 'antd';
import * as React from 'react'
import { render } from 'react-dom'
import { Fetch } from './apis/Fetch';
import { dispatch } from './store';
import { meta_all } from './apis/meta';
import { Router, Route, Switch, Redirect } from 'react-router';
import { history } from './store';
import BasicLayout from './layout/BasicLayout'
import App from './layout'
// import { BrowserRouter, Link } from 'react-router-dom';

render(
  <ConfigProvider locale={window['antd'].locales.zh_CN}>
    <Router history={history}>
      <Switch>
        <Route path="/user" render={props => <App {...props} />} />
        <Route path="/" render={props => <BasicLayout {...props} />} />
      </Switch>
    </Router>
  </ConfigProvider>, document.getElementById('app')
);
