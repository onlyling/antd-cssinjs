import { theme as AntdTheme } from 'antd'

import type { BailuGlobalToken } from './provider'

export default () => {
  const { theme, token, hashId } = AntdTheme.useToken()

  return {
    theme,
    token: token as BailuGlobalToken,
    hashId,
  }
}
