import { MiddlewareCreater } from 'f2e-server'
import { Route, out } from 'f2e-serve'
import * as apis from './actions'

const creater: MiddlewareCreater = (conf) => {
    const route = new Route()
    
    route.on('api/meta', out.JsonOut(apis.meta))
    route.on('sse/runtime/server_time', out.ServerSent(apis.server_time))
    route.on('sse/runtime/mem_ratio', out.ServerSent(apis.mem_ratio))

    // SPA 的 index.html 配置
    route.on(/^(\w+)?(\/\w+)?(\/\w+)?(\/\w+)?$/, () => 'index.html');

    return {
        onRoute: route.execute
    }
}

export default creater