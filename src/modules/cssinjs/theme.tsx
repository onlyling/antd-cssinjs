import type { CSSObject, Theme } from '@ant-design/cssinjs'
import { createTheme, useCacheToken } from '@ant-design/cssinjs'
import React, { useMemo, useContext, createContext } from 'react'

export interface DesignToken {
  primaryColor: string
  textColor: string
  reverseTextColor: string

  componentBackgroundColor: string

  borderRadius: number
  borderColor: string
  borderWidth: number
}

export interface DerivativeToken extends DesignToken {
  primaryColorDisabled: string
}

export type GetStyle = (prefixCls: string, token: DerivativeToken) => CSSObject

const defaultDesignToken: DesignToken = {
  primaryColor: '#1890ff',
  textColor: '#333333',
  reverseTextColor: '#FFFFFF',

  componentBackgroundColor: '#FFFFFF',

  borderRadius: 2,
  borderColor: 'black',
  borderWidth: 1,
}

export const derivative = (designToken: DesignToken): DerivativeToken => {
  return {
    ...designToken,
    primaryColorDisabled: '#098',
  }
}

export const ThemeContext = createContext(createTheme(derivative))

export const DesignTokenContext = createContext<{
  token?: Partial<DesignToken>
  hashed?: string | boolean
}>({
  token: defaultDesignToken,
})

export const ThemeProvider = ({
  theme,
  children,
}: React.PropsWithChildren<{
  theme?: Theme<any, any>
}>) => {
  const value = useMemo(() => theme ?? createTheme(derivative), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const DesignTokenProvider = ({
  token,
  hashed,
  children,
}: React.PropsWithChildren<{
  token?: Partial<DesignToken>
  hashed?: string | boolean
}>) => {
  const value = useMemo(
    () => ({
      token: token ?? defaultDesignToken,
      hashed,
    }),
    [hashed, token],
  )

  return (
    <DesignTokenContext.Provider value={value}>
      {children}
    </DesignTokenContext.Provider>
  )
}

export function useToken(): [Theme<any, any>, DerivativeToken, string] {
  const { token: rootDesignToken = {}, hashed } = useContext(DesignTokenContext)
  const theme = useContext(ThemeContext)

  const [token, hashId] = useCacheToken<DerivativeToken, DesignToken>(
    theme,
    [defaultDesignToken, rootDesignToken],
    {
      salt: typeof hashed === 'string' ? hashed : '',
    },
  )
  return [theme, token, hashed ? hashId : '']
}
