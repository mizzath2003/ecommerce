'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'
import Image from 'next/image'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav
        className={[classes.nav, user === undefined && classes.hide, classes.mobileHide]
          .filter(Boolean)
          .join(' ')}
      >
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="none" />
        })}
        {user && <Link href="/account">My Account</Link>}
        {!user && (
          <Button
            el="link"
            href="/login"
            label="Login"
            appearance="primary"
            onClick={() => (window.location.href = '/login')}
          />
        )}
        {user && <CartLink />}
      </nav>

      {/* Mobile */}
      <div
        className={[user === undefined && classes.hide, classes.cartIcon].filter(Boolean).join(' ')}
      >
        {user && <CartLink />}
      </div>
      <div className={classes.mobilemenu}>
        {mobileMenuOpen ? (
          <Image
            src="assets/icons/close.svg"
            alt="menu"
            width={26}
            height={26}
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <Image
            src="assets/icons/menu.svg"
            alt="menu"
            width={26}
            height={26}
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={[user === undefined && classes.hide, classes.mobileNavBar]
          .filter(Boolean)
          .join(' ')}
        style={mobileMenuOpen ? { right: '0.3rem' } : { right: '-100%', display: 'none' }}
      >
        <div className={classes.mobileNavList}>
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="none"
                handleClick={() => setMobileMenuOpen(false)}
              />
            )
          })}
          {user && (
            <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
              My Account
            </Link>
          )}
          {!user && (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
          )}
          {!user && (
            <Link href="/create-account" onClick={() => setMobileMenuOpen(false)}>
              Create Account
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
