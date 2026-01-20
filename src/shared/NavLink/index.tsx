'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = (props) => {
  const { children, ...otherProps } = props
  const pathname = usePathname()
  const className = pathname === props?.href ? 'active' : ''

  return (
    <Link className={className} {...otherProps}>
      {children}
    </Link>
  )
}
export default NavLink
