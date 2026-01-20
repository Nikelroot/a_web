'use client'

import { Button, Input } from 'antd'
import { LoginFormStyled } from '@/entries/LoginForm/styles'

const LoginForm = () => {
  return (
    <LoginFormStyled>
      <div className={'section'}>
        <Input
          size={'small'}
          id="username"
          name="username"
          placeholder="username"
          type="text"
          autoComplete="username"
          required
        />
      </div>

      <div className={'section'}>
        <Input
          size={'small'}
          id="password"
          name="password"
          placeholder="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <div className="action">
        <Button size={'small'}>Вход</Button>
      </div>
    </LoginFormStyled>
  )
}
export default LoginForm
