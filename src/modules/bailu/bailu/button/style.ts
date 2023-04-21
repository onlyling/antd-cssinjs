import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs'
import { useStyleRegister } from '@ant-design/cssinjs'

import type { BailuGlobalToken } from '../provider'
import Provider from '../provider'

// 通用框架
const genSharedButtonStyle = (
  prefixCls: string,
  token: BailuGlobalToken,
): CSSInterpolation => ({
  [`.${prefixCls}`]: {
    borderColor: token.colorBorder,
    borderWidth: 1,
    borderRadius: token.borderRadius,

    cursor: 'pointer',

    transition: 'background 0.3s',
  },
})

// 实心底色样式
const genSolidButtonStyle = (
  prefixCls: string,
  token: BailuGlobalToken,
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
  token: BailuGlobalToken,
): CSSInterpolation =>
  genSolidButtonStyle(prefixCls, token, () => ({
    backgroundColor: 'transparent',
    color: token.colorText,

    '&:hover': {
      color: token.colorPrimary,
    },
  }))

const genPrimaryButtonStyle = (
  prefixCls: string,
  token: BailuGlobalToken,
): CSSInterpolation =>
  genSolidButtonStyle(prefixCls, token, () => ({
    backgroundColor: token.colorPrimary,
    border: `1px solid ${token.colorPrimary}`,
    color: token.colorText,

    '&:hover': {
      backgroundColor: token.colorBgContainer,
    },
  }))

const genDashedButtonStyle = (
  prefixCls: string,
  token: BailuGlobalToken,
): CSSInterpolation => [
  genSharedButtonStyle(prefixCls, token),
  {
    [`.${prefixCls}`]: {
      backgroundColor: 'transparent',
      color: token.colorPrimary,
      border: `1px solid ${token.colorPrimary}`,
      borderStyle: 'dashed',
      '&:hover': {
        borderColor: token.colorPrimary,
        color: token.colorPrimary,
      },
    },
  },
]

export const useStyle = (prefixCls: string) => {
  const { theme, token, hashId } = Provider.useToken()

  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [
      genDefaultButtonStyle(`${prefixCls}-default`, token),
      genPrimaryButtonStyle(`${prefixCls}-primary`, token),
      genDashedButtonStyle(`${prefixCls}-dashed`, token),
    ],
  )

  return [wrapSSR, hashId] as const
}
