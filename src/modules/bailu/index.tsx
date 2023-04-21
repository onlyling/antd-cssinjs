import { Space, Tag } from 'antd'
import { memo, useMemo, useState } from 'react'

import AntdChildren from '../antd/app'

import Button from './bailu/button'
import type { BailuGlobalToken } from './bailu/provider'
import Provider from './bailu/provider'

const token1: Partial<BailuGlobalToken> = {
  colorPrimary: '#098',
  colorInfo: '#098',
  brand_6: '#098',
}

const Bailu = () => {
  const [token, setToken] = useState<Partial<BailuGlobalToken> | undefined>()
  const theme = useMemo(() => ({ token: token }), [token])

  return (
    <Provider theme={theme}>
      <Space>
        <Button type="default">什么</Button>
        <Button type="primary">什么</Button>
        <Button type="dashed">什么</Button>
      </Space>

      <br />

      <Space>
        <Tag color="success">success</Tag>
        <Tag color="processing">processing</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warning">warning</Tag>
        <Tag color="default">default</Tag>
      </Space>

      <br />

      <Space>
        <Button
          type="primary"
          onClick={() => {
            setToken(token1)
          }}>
          token1
        </Button>
        <Button
          onClick={() => {
            setToken(undefined)
          }}>
          token reset
        </Button>
      </Space>

      <AntdChildren />
    </Provider>
  )
}

export default memo(Bailu)
