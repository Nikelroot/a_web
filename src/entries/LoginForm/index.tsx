'use client'
import { Button, Flex, Input } from 'antd'
import { LoginFormStyled } from '@/entries/LoginForm/styles'
import apiService, { AuthData } from '@/services/apiService'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import moment from 'moment'

const LoginForm = () => {
  const router = useRouter()
  const { login, register } = apiService
  const [data, setData] = useState<AuthData>({})
  const cookieStore = new Cookies()

  const submitAction = useCallback(
    (e) => {
      e.preventDefault()
      login(data)
        .then(({ token }) => {
          cookieStore.set('token', token, {
            expires: moment().add(2, 'week').toDate(),
          })
          router.push('/library')
        })
        .catch(console.log)
    },
    [data],
  )

  const changeHandler = useCallback((e) => {
    const { name, value } = e.target

    setData((_state) => {
      return { ..._state, [name]: value }
    })
  }, [])

  const registerShandler = useCallback((e) => {
    e.preventDefault()
    register(data)
      .then(({ token }) => {
        cookieStore.set('token', token, {
          expires: moment().add(2, 'week').toDate(),
        })
        router.push('/library')
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    cookieStore.remove('token')
  }, [])

  return (
    <LoginFormStyled onSubmit={submitAction}>
      <div className={'section'}>
        <Input
          size={'small'}
          id="username"
          name="username"
          placeholder="username"
          type="text"
          autoComplete="username"
          onChange={changeHandler}
          required
          data-testid="username"
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
          onChange={changeHandler}
          required
          data-testid="password"
        />
      </div>

      <Flex gap={'5px'}>
        <Button
          size={'small'}
          variant={'solid'}
          color={'default'}
          htmlType={'submit'}
          data-testid="login-btn"
        >
          Вход
        </Button>
        <Button
          size={'small'}
          variant={'solid'}
          color={'default'}
          onClick={registerShandler}
          data-testid="register-btn"
        >
          Регистрация
        </Button>
      </Flex>
    </LoginFormStyled>
  )
}
export default LoginForm
