import React from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    imageUrl: string
    repoUrl: string
  } | null
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2>{project.title}</h2>
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.image}
        />
        <p>{project.description}</p>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoLink}
        >
          GitHub에서 보기
        </a>
      </div>
    </div>
  )
}

export default Modal
