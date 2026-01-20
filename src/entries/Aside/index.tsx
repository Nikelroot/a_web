'use client'
import { AsideStyled } from '@/entries/Aside/styles'
import NavLink from '@/shared/NavLink'

const Aside = () => {
  return (
    <AsideStyled>
      <NavLink href={'/'}>Домой</NavLink>
      <NavLink href={'/library'}>Библиотека</NavLink>
    </AsideStyled>
  )
}
export default Aside
