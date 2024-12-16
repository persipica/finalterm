import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import styles from '@/styles/VirtualPet.module.css'

const VirtualPet = () => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' })
  const [isDragging, setIsDragging] = useState(false)
  const [motion, setMotion] = useState<'idle' | 'walking' | 'dragging'>('idle')
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const petRef = useRef<HTMLDivElement>(null)
  const prevPosition = useRef({ top: '50%', left: '50%' })

  useEffect(() => {
    const movePet = () => {
      if (!isDragging) {
        const randomTop = Math.random() * 90 + '%'
        const randomLeft = Math.random() * 90 + '%'

        if (parseFloat(randomLeft) < parseFloat(prevPosition.current.left)) {
          setDirection('left')
        } else {
          setDirection('right')
        }

        prevPosition.current = { top: randomTop, left: randomLeft }
        setPosition({ top: randomTop, left: randomLeft })
        setMotion('walking')
        setTimeout(() => setMotion('idle'), 2000)
      }
    }

    const interval = setInterval(movePet, 8000)
    return () => clearInterval(interval)
  }, [isDragging])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && petRef.current) {
        setPosition({
          top: `${e.clientY - petRef.current.offsetHeight / 2}px`,
          left: `${e.clientX - petRef.current.offsetWidth / 2}px`,
        })
      }
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setMotion('idle')
  }, [])

  const handleMouseDown = () => {
    setIsDragging(true)
    setMotion('dragging')
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const getPetImage = () => {
    if (motion === 'dragging') return '/drag.gif'
    if (motion === 'walking')
      return direction === 'left' ? '/walk2.gif' : '/walk.gif'
    return direction === 'left' ? '/idle2.gif' : '/idle.gif'
  }

  return (
    <div
      ref={petRef}
      className={styles.pet}
      style={{ top: position.top, left: position.left }}
      onMouseDown={handleMouseDown}
    >
      <Image
        src={getPetImage()}
        alt="Virtual Pet"
        width={80}
        height={80}
        className={styles.petImage}
        priority
      />
    </div>
  )
}

export default VirtualPet
