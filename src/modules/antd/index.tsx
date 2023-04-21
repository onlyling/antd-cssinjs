import type { GlobalToken } from 'antd'
import { ConfigProvider, App, Button, Space } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { locale } from 'dayjs'
import { useState } from 'react'

import AntdChildren from './app'

import 'antd/dist/reset.css'
import 'dayjs/locale/zh-cn'

locale('zh-cn')

const token1: Partial<GlobalToken> = {
  colorPrimary: '#098',
  colorInfo: '#098',
}

const Antd = () => {
  const [token, setToken] = useState<Partial<GlobalToken> | undefined>()

  return (
    <ConfigProvider locale={zhCN} theme={{ token: token }}>
      <App>
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
      </App>
    </ConfigProvider>
  )
}

export default Antd
