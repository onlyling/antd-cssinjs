import { memo } from 'react'

import CssInJsButton from './button'
import { DesignTokenProvider, ThemeProvider } from './theme'

const CssInJs = () => {
  return (
    <DesignTokenProvider>
      <ThemeProvider>
        <div>ddd</div>
        <CssInJsButton>default</CssInJsButton>
        <CssInJsButton type="dashed">dashed</CssInJsButton>
        <CssInJsButton type="primary">primary</CssInJsButton>
      </ThemeProvider>
    </DesignTokenProvider>
  )
}

export default memo(CssInJs)
