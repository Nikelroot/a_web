import LoginForm from '@/entries/LoginForm'
import BigLogo from '@/components/BigLogo'
import { LoginPageStyled } from '@/entries/pages/login/styles'
import { Wrap } from '@/global/global'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Page',
  description: 'My page description',
}

const LoginPage = () => {
  return (
    <>
      <Wrap $type={'login'} className={'container'}>
        <LoginPageStyled>
          <BigLogo />
          <LoginForm />
        </LoginPageStyled>
      </Wrap>
    </>
  )
}
export default LoginPage
