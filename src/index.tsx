import { ConfigProvider } from 'antd';
import * as React from 'react'
import { render } from 'react-dom'
import { Fetch } from './apis/Fetch';
import App from './layout'
import { dispatch } from './store';
import { meta_all } from './apis/meta'

render(<ConfigProvider locale={window['antd'].locales.zh_CN}>
    <App />
</ConfigProvider>, document.getElementById('app'));

Promise.all([
    Fetch(`/admin/loginUser`),
    meta_all(),
]).then(([loginUser, meta]) => dispatch(state => ({ ...state, loginUser, meta })))
