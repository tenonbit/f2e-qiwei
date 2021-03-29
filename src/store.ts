import { Meta, ThemeType } from '../serve/interfaces'
import createStore, { IPreact } from 'ipreact-for-react'
import { createBrowserHistory } from 'history'
import { User } from 'f2e-middle-authority'
export const history = createBrowserHistory()

/**
 * npm history:
 *  - forceRefresh: true  // 地址变化时，强制刷新页面
 */

/**
 * 本地存储KEY
 */
const STORE_KEY = 'CREATE@F2E@APP'
export interface Rect {
    width: number,
    height: number,
}
interface IStoreState {
    loading?: number
    collapsed?: boolean
    pathname?: string
    theme?: ThemeType
    loginUser?: User
    rect?: Rect
    meta?: Meta
}
let store: IStoreState = {
    loading: 0,
    collapsed: false,
    pathname: location.pathname,
    theme: 'default',
    rect: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    }
}
try {
    Object.assign(store, JSON.parse(localStorage.getItem(STORE_KEY)))
} catch (e) { }


const { connect, dispatch, getState }: IPreact<IStoreState> = createStore([
    (prevState, currentState) => {
        const { collapsed, theme = 'default' } = currentState
        const href = `/css/theme.${theme}.css`
        /** 切换主题准备 */
        const themeCSS = document.querySelector<HTMLLinkElement>('#theme-css')
        if (themeCSS && href != themeCSS.getAttribute('href')) {
            themeCSS.href = href
        }
        localStorage.setItem(STORE_KEY, JSON.stringify({ collapsed, theme }))
    }
])({
    ...store,
    pathname: window.location.pathname,
})

export { connect, dispatch, getState };

const resize = function () {
    dispatch(state => {
        return {
            ...state,
            rect: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            }
        }
    })
}
addEventListener('resize', resize)