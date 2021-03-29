import { getState } from '../store'

export enum AuthorityType {
    /** 可以查看运行状态 */
    RUNTIME = 1,
}
export const hasAuthority = (auth: AuthorityType) => {
    const { role } = getState().loginUser || {}
    if (!role) {
        return false
    } else if (role.isAdmin) {
        return true
    } else {
        return role.authorities[auth] > 0
    }
}