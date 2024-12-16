import styles from '../styles/Loading.module.css'
import React, { useState } from 'react'

const Loading = () => {
  const [messageIndex, setMessageIndex] = useState(0)

  const loadingMessages = [
    '포트폴리오 준비중...',
    '무슨 말을 할지 고민중...',
    '웹 페이지 구성하려고 노력중...',
    '몇 초만 더 기다리는 중...',
    '몇 초만 더 기다리는 중...',
    '무슨 말을 할지 고민중...',
    '무슨 말을 할지 고민중...',
  ]

  setTimeout(() => {
    setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length)
  }, 1000)

  return (
    <div className={styles.loadingContainer}>
      <h2>{loadingMessages[messageIndex]}</h2>
      <img src="./loading.gif" alt="loading" />
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  )
}

export default Loading
