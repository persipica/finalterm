'use client'

import React from 'react'
import styles from '../styles/Header.module.css'

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
        </ul>
      </nav>
    </header>
  )
}
