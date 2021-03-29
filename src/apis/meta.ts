import { Meta } from "../../serve/interfaces"
import { Fetch } from "./Fetch"

export const getRaw = (type: 'domain' | 'app' | 'action') => Fetch(`/meta?action=${type}_json`)
export const meta_all = (): Promise<Meta> => Fetch('/api/meta')