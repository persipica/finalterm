'use client'

import { useState } from 'react'
import styles from '../styles/Home.module.css'

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })

    if (response.ok) {
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } else {
      setStatus('error')
    }
  }

  return (
    <div>
      <h3>Contact Me</h3>
      {status === 'sent' && (
        <p className={styles.successMessage}>Thanks for reaching out!</p>
      )}
      {status === 'error' && (
        <p className={`${styles.errorMessage} ${styles.error}`}>
          Something went wrong. Please try again.
        </p>
      )}
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
