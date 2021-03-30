import { ConfigProvider } from 'antd';
import * as React from 'react'
import { render } from 'react-dom'
import { Fetch } from './apis/Fetch';
import App from './layout'
import { dispatch } from './store';
import { meta_all } from './apis/meta'

import BasicLayout from './layout/BasicLayout'

render(<ConfigProvider locale={window['antd'].locales.zh_CN}>
  {/* <App /> */}
  <BasicLayout />
</ConfigProvider>, document.getElementById('app'));

// Promise.all([
//   Fetch(`/admin/loginUser`),
//   meta_all(),
// ]).then(([loginUser, meta]) => dispatch(state => {
//   console.log('state', state);
//   return { ...state, loginUser, meta }
// }))
