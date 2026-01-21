'use client'
import { AsideStyled } from '@/entries/Aside/styles'
import NavLink from '@/shared/NavLink'
import { usePathname } from 'next/dist/client/components/navigation'

const Aside = () => {
  const pathname = usePathname()

  if (pathname === '/login') {
    return
  }
  return (
    <AsideStyled>
      <NavLink href={'/'}>Мои книги</NavLink>
      <NavLink href={'/library'}>Библиотека</NavLink>
    </AsideStyled>
  )
}
export default Aside
