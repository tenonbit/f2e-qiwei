import { Meta } from "../../serve/interfaces"
import { Fetch } from "./Fetch"

export const getRaw = (type: 'domain' | 'app' | 'action') => Fetch(`/meta?action=${type}_json`)

export const meta_all = (): Promise<Meta> => Fetch('/api/meta')

// export const doLogin = (data) => Fetch('/v1/gpm/user/login', data)

// export const getOrgInfo = () => Fetch('/v1/gpm/org/infos?a=1&b=2')
