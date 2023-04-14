import { useStyleRegister } from '@ant-design/cssinjs'
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs'
import React, { memo } from 'react'

import type { DerivativeToken } from './theme'
import { useToken } from './theme'

// 通用框架
const genSharedButtonStyle = (
  prefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}`]: {
    borderColor: token.borderColor,
    borderWidth: token.borderWidth,
    borderRadius: token.borderRadius,

    cursor: 'pointer',

    transition: 'background 0.3s',
  },
})

// 实心底色样式
const genSolidButtonStyle = (
  prefixCls: string,
  token: DerivativeToken,
  postFn: () => CSSObject,
): CSSInterpolation => [
  genSharedButtonStyle(prefixCls, token),
  {
    [`.${prefixCls}`]: {
      ...postFn(),
    },
  },
]

const genDefaultButtonStyle = (
  prefixCls: string,
  token: DerivativeToken,
): CSSInterpolation =>
  genSolidButtonStyle(prefixCls, token, () => ({
    backgroundColor: token.componentBackgroundColor,
    color: token.textColor,

    '&:hover': {
      borderColor: token.primaryColor,
      color: token.primaryColor,
    },
  }))

const genPrimaryButtonStyle = (
  prefixCls: string,
  token: DerivativeToken,
): CSSInterpolation =>
  genSolidButtonStyle(prefixCls, token, () => ({
    backgroundColor: token.primaryColor,
    border: `${token.borderWidth}px solid ${token.primaryColor}`,
    color: token.reverseTextColor,

    '&:hover': {
      backgroundColor: token.primaryColorDisabled,
    },
  }))

const genDashedButtonStyle = (
  prefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => [
  genSharedButtonStyle(prefixCls, token),
  {
    [`.${prefixCls}`]: {
      backgroundColor: 'transparent',
      color: token.primaryColor,
      border: `${token.borderWidth}px solid ${token.primaryColor}`,
      borderStyle: 'dashed',

      '&:hover': {
        borderColor: token.primaryColor,
        color: token.primaryColor,
      },
    },
  },
]

const prefixCls = 'demo-btn'

const CssInJsButton = ({
  className,
  type,
  ...restProps
}: React.PropsWithChildren<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'default' | 'primary' | 'dashed'
  }
>) => {
  const [theme, token, hashId] = useToken()
  const defaultCls = `${prefixCls}-default`
  const primaryCls = `${prefixCls}-primary`
  const dashedCls = `${prefixCls}-dashed`

  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [
      genDefaultButtonStyle(defaultCls, token),
      genPrimaryButtonStyle(primaryCls, token),
      genDashedButtonStyle(dashedCls, token),
    ],
  )

  const typeCls =
    (
      {
        primary: primaryCls,
        dashed: dashedCls,
      } as any
    )[type as any] || defaultCls

  return wrapSSR(
    <button
      {...restProps}
      className={[prefixCls, typeCls, hashId, className]
        .filter(Boolean)
        .join(' ')}
    />,
  )
}

export default memo(CssInJsButton)
