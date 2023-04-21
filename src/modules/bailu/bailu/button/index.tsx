import React, { memo } from 'react'

import { useStyle } from './style'

const prefixCls = 'demo-btn'

const CssInJsButton = ({
  className,
  type = 'default',
  ...restProps
}: React.PropsWithChildren<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'default' | 'primary' | 'dashed'
  }
>) => {
  const [wrapSSR, hashId] = useStyle(prefixCls)

  return wrapSSR(
    <button
      {...restProps}
      className={[prefixCls, `${prefixCls}-${type}`, hashId, className]
        .filter(Boolean)
        .join(' ')}
    />,
  )
}

export default memo(CssInJsButton)
