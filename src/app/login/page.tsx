import LoginForm from '@/entries/LoginForm'
import BigLogo from '@/components/BigLogo'
import { LoginPageStyled } from '@/entries/pages/login/styles'

const LoginPage = () => {
  return (
    <LoginPageStyled>
      <BigLogo />
      <LoginForm />
    </LoginPageStyled>
  )
}
export default LoginPage
