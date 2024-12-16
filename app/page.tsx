'use client'

import React, { useState } from 'react'
import Loading from './Loading'
import MainContent from './MainContent'

const HomePage = () => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
    return <Loading />
  }

  return <MainContent />
}

export default HomePage
