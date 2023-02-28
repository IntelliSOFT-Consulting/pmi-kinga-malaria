import React from 'react'
import { Spin } from 'antd'

export default function Loading() {
  return (
    <div className='loader'>
        <Spin spinning={true} />
    </div>
  )
}
