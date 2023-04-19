import { memo, useState } from 'react'

import CssInJsButton from './button'
import type { DesignToken } from './theme'
import { DesignTokenProvider, ThemeProvider } from './theme'

const TOKEN_1: Partial<DesignToken> = {
  primaryColor: '#f30',
}

const CssInJsChildren = () => {
  return (
    <>
      <div>ddd</div>
      <CssInJsButton>default</CssInJsButton>
      <CssInJsButton type="dashed">dashed</CssInJsButton>
      <CssInJsButton type="primary">primary</CssInJsButton>
    </>
  )
}

const CssInJs = () => {
  const [token, setToken] = useState<Partial<DesignToken> | undefined>()

  return (
    <>
      <button
        onClick={() => {
          setToken(TOKEN_1)
        }}>
        token 1
      </button>
      <button
        onClick={() => {
          setToken(undefined)
        }}>
        token reset
      </button>
      <DesignTokenProvider hashed token={token}>
        <ThemeProvider>
          <CssInJsChildren />
        </ThemeProvider>
      </DesignTokenProvider>
    </>
  )
}

export default memo(CssInJs)
