import { App, Button, DatePicker, Space, message } from 'antd'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'

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

export default AntdChildren
