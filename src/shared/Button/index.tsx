'use client'

import { Button as AntButton } from 'antd'
import { useRef } from 'react'

const Button = (props) => {
  const { onClick, ...otherProps } = props
  const ref = useRef<HTMLButtonElement>(null)
  const onClickHandler = (e) => {
    ref.current && ref.current.blur()
    onClick(e)
  }
  return <AntButton onClick={onClickHandler} {...otherProps} />
}
export default Button
