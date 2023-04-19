import type { GlobalToken } from 'antd'
import { ConfigProvider, App, Button, DatePicker, Space, message } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import type { Dayjs } from 'dayjs'
import { locale } from 'dayjs'
import { useState } from 'react'

import 'antd/dist/reset.css'
import 'dayjs/locale/zh-cn'

locale('zh-cn')

const AntdChildren = () => {
  const [date, setDate] = useState<Dayjs | null>(null)
  const { message: messageApp } = App.useApp()
  const handleChange = (value: Dayjs) => {
    message.info(
      `您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`,
    )

    setDate(value)
  }

  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <DatePicker onChange={handleChange} />

      <div style={{ marginTop: 16 }}>
        当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}
      </div>

      <Space>
        <Button
          type="primary"
          onClick={() => {
            messageApp.info(
              <div>
                app <Button type="primary">TEST</Button>
              </div>,
              10000,
            )
          }}>
          TEST MESSAGE WIDTH APP
        </Button>

        <Button
          type="primary"
          onClick={() => {
            message.info(
              <div>
                message <Button type="primary">TEST</Button>
              </div>,
            )
          }}>
          TEST MESSAGE WIDTH MESSAGE
        </Button>
      </Space>
    </div>
  )
}

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
