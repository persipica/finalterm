'use client'

import React from 'react'
import styles from '../styles/Header.module.css'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import SignInButton from '@/components/SignInButton'

export default function Header() {
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const { status, data: session } = useSession()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">KHS</a>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#about-me" onClick={(e) => handleScroll(e, 'about-me')}>
              Aboutme
            </a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => handleScroll(e, 'skills')}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
              Contact
            </a>
          </li>
          <li>
            {status === 'authenticated' ? (
              <>
                <div className="flex gap-2 items-center">
                  <Image
                    className="rounded-full"
                    src={session?.user?.image ?? '/default-avatar.png'}
                    width={40}
                    height={40}
                    alt={session?.user?.name ?? 'user'}
                  />

                  <span className="text-white font-bold">
                    {session?.user?.name}
                  </span>
                </div>

                <button
                  onClick={() => signOut()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <SignInButton />
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
