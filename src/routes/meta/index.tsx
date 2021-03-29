import * as React from 'react';
import { Meta } from '../../../serve/interfaces';
import TagSelector from 'flowpp-tag-selector'
import { Form } from 'antd';
import { connect, getState } from '../../store';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

interface Props {
    meta: Meta
}
const MetaApp = (props: Props) => {
    const { meta } = props
    if (!meta) {
        return <div></div>
    }

    const app_map = new Map(meta.apps.map(app => [app.id + '', app]))
    const [apps, setApps] = React.useState<string[]>([])
    
    console.log(meta.actions.filter(act => apps.includes(act.parent_id + '')).map(act => ({
        id: act.id + '',
        name: act.name_cn,
        tags: [act.parent_id + '']
    })))

    return <>
        <Form.Item label="选择应用" {...layout}>
            <TagSelector tagGroups={[{
                id: 'domain',
                name: '领域',
                items: meta.domains.map(d => ({ id: d.id + '', name: d.name_cn }))
            }]} items={meta.apps.map(app => ({
                id: app.id + '',
                name: app.name_cn,
                tags: [ app.parent_id + '' ],
            }))} data={apps} onChange={setApps} selectProps={{ placeholder: '点击展开选择' }}/>
        </Form.Item>
        <Form.Item label="选择行为" {...layout}>
            <TagSelector tagGroups={[{
                id: 'app',
                name: '应用',
                items: apps.map(id => {
                    const app = app_map.get(id)
                    return { id, name: app.name_cn }
                })
            }]} items={meta.actions.filter(act => apps.includes(act.parent_id + '')).map(act => ({
                id: act.id + '',
                name: act.name_cn,
                tags: [ act.parent_id + '' ]
            }))} data={[]} selectProps={{ placeholder: '点击展开选择' }}/>
        </Form.Item>
    </>
}

export default connect(() => {
    const { meta } = getState()
    return { meta }
})(MetaApp)