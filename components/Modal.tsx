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
    vercelUrl: string
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
        <div className={styles.iconLinks}>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            <img
              src="/github-icon.png"
              alt="GitHub"
              className={styles.githubIcon}
            />
          </a>

          <a
            href={project.vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.vercelLink}
          >
            <img
              src="/vercel-icon.png"
              alt="Vercel"
              className={styles.vercelIcon}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Modal
