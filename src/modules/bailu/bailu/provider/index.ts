import { attachPropertiesToComponent } from '../attach-properties-to-component'

import Provider from './provider'
export type { BailuGlobalToken } from './provider'
import useToken from './useToken'

export default attachPropertiesToComponent(Provider, { useToken })
