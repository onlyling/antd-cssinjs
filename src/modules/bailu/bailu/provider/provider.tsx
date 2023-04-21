import TOKENS from '@fruits-chain/design-tokens-bailu'
import { ConfigProvider, App } from 'antd'
import type { GlobalToken, ThemeConfig } from 'antd'
import type { ConfigProviderProps } from 'antd/lib/config-provider'
import type { AliasToken } from 'antd/lib/theme/interface/alias'
import zhCN from 'antd/locale/zh_CN'
import { locale as dayjsLocale } from 'dayjs'
import { useMemo, useContext } from 'react'

import 'antd/dist/reset.css'
import 'dayjs/locale/zh-cn'

dayjsLocale('zh-cn')

type BailuToken = typeof TOKENS
export type BailuGlobalToken = BailuToken & GlobalToken
export type BailuThemeConfig = Omit<ThemeConfig, 'token'> & {
  token?: Partial<AliasToken & BailuToken>
}

const Provider = ({
  children,
  theme,
  locale,
  ...restProps
}: Omit<ConfigProviderProps, 'theme'> & {
  theme?: BailuThemeConfig
}) => {
  const { locale: parentLocale, theme: parentTheme } = useContext(
    ConfigProvider.ConfigContext,
  )
  const token = useMemo(
    () => ({
      ...TOKENS,
      ...{
        colorPrimary: TOKENS.brand_6,
        colorInfo: TOKENS.brand_6,
      },
      ...theme?.token,
    }),
    [theme?.token],
  )
  const _theme = useMemo(
    () => ({ ...parentTheme, ...theme, token }),
    [parentTheme, theme, token],
  )

  return (
    <ConfigProvider
      {...restProps}
      theme={_theme}
      locale={locale || parentLocale || zhCN}>
      <App>{children}</App>
    </ConfigProvider>
  )
}

export default Provider
