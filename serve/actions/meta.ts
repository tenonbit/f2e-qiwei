import { Action, App, Domain, Meta } from '../interfaces'
import { Fetch } from '../utils'

let _meta: Meta
export const meta = async () => {
    if (_meta) {
        return _meta
    }
    // flowid提供的meta信息接口，保持每小时更新一次
    setTimeout(() => {
        _meta = null;
    }, 60 * 60 * 1000);

    try {
        const domains = await Fetch<Domain[]>('http://172.16.0.201:5001/get?action=domain_json').then(res => res.json())
        const apps = await Fetch<App[]>('http://172.16.0.201:5001/get?action=app_json').then(res => res.json())
        const actions = await Fetch<Action[]>('http://172.16.0.201:5001/get?action=action_json').then(res => res.json())
    
        _meta = { domains, apps, actions }
    
    } catch (e) {
        console.log(e)
    }

    return _meta
}
