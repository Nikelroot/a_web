'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

type NavLinkProps = {
  href: string
  exact?: boolean
  activeClassName?: string
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<typeof Link>

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, exact = false, className, activeClassName = 'active', children, ...props }, ref) => {
    const pathname = usePathname()

    const isActive = exact ? pathname === href : pathname.startsWith(href)

    return (
      <Link
        ref={ref}
        href={href}
        className={clsx(className, {
          [activeClassName]: isActive,
        })}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

NavLink.displayName = 'NavLink'

export default NavLink
