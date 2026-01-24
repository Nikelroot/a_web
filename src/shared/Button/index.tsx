'use client'

import { Button as AntButton } from 'antd'
import React, { ComponentProps, useRef } from 'react'

type ButtonProps = ComponentProps<typeof AntButton>

const Button = (props: ButtonProps) => {
  const { onClick, ...otherProps } = props
  const ref = useRef<HTMLButtonElement | null>(null)
  const onClickHandler: ButtonProps['onClick'] = (e) => {
    const el = ref?.current
    onClick?.(e)

    if (!el) return
    el.blur()
  }
  return <AntButton ref={ref} onClick={onClickHandler} {...otherProps} />
}
export default Button
