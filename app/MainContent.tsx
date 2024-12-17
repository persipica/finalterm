'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Loading from './Loading'
import { ScrollToTop } from '@/components/ScrollToTop'
import Modal from '../components/Modal'
import { ContactForm } from '@/components/ContactForm'
import VirtualPet from '@/components/VirtualPet'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
}

interface Project {
  title: string
  description: string
  imageUrl: string
  repoUrl: string
  vercelUrl: string
}

export default function Home() {
  const { data: session } = useSession()
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const reposPerPage = 9
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects: Project[] = [
    {
      title: 'Project 1',
      description: '수업시간에 진행했던 HCJDEMO 프로젝트입니다.',
      imageUrl: '../project1.png',
      repoUrl: 'https://github.com/persipica/HCJDEMO2024-2',
      vercelUrl: 'https://hcjdemo-2024-2.vercel.app/',
    },
    {
      title: 'Project 2',
      description: 'clerk-api를 활용한 실습 사이트입니다.',
      imageUrl: '/project2.png',
      repoUrl: 'https://github.com/persipica/clerk-api',
      vercelUrl: 'https://clerk-api-o3jz-5ssdvx0lz-vivats-projects.vercel.app/',
    },
    {
      title: 'Project 3',
      description: 'Next.js로 만든 중간발표용 포트폴리오 사이트입니다.',
      imageUrl: '/project3.png',
      repoUrl: 'https://github.com/persipica/midterm',
      vercelUrl: 'https://midterm-sigma.vercel.app/',
    },
    {
      title: 'Project 4',
      description: '2학기 기말고사 팀프로젝트 입니다.',
      imageUrl: '../project4.png',
      repoUrl: 'https://github.com/persipica/finalteam',
      vercelUrl: 'https://finalteam.vercel.app/',
    },
    {
      title: 'Project 5',
      description: '간단한 여행정보 홈페이지입니다.',
      imageUrl: '/project5.png',
      repoUrl: 'https://github.com/persipica/webprogram-main',
      vercelUrl: 'https://webprogram-main.vercel.app/',
    },
    {
      title: 'Project 6',
      description: '1학기때 만들었던 팀프로젝트입니다.',
      imageUrl: '/project6.png',
      repoUrl: 'https://github.com/persipica/Teamfinalproject',
      vercelUrl: 'https://teamfinalproject.vercel.app/',
    },
  ]

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeInUp)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const skillCards = document.querySelectorAll(`.${styles.skillCard}`)
    const projectCards = document.querySelectorAll(`.${styles.projectCard}`)

    skillCards.forEach((card) => observer.observe(card))
    projectCards.forEach((card) => observer.observe(card))
  }, [])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/persipica/repos'
        )
        if (!response.ok) throw new Error('GitHub API 요청 실패')
        const data: GitHubRepo[] = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('리포지토리를 가져오지 못했습니다:', error)
      }
    }
    fetchRepos()
  }, [])

  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(repos.length / reposPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.container}>
        <Header />

        {session && <VirtualPet />}
        <section id="banner" className={styles.banner}>
          <h1>Welcome to My Portfolio</h1>
          <p>Explore my work and skills below!</p>
        </section>

        <section id="about-me" className={styles.about}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutVideo}>
              <video controls loop muted autoPlay className={styles.video}>
                <source src="/introduce.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className={styles.aboutText}>
              <h2>About Me</h2>
              <p>중부대학교 정보보호학과 강희수 입니다.</p>
              <p>
                웹보안프로그래밍 수업을 통해 웹프로그래밍 실력을 쌓고 있습니다.
              </p>
              <p>공부를 통해 좋은 웹개발자가 되기위해 노력중입니다.</p>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/persipica"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/github-icon.png"
                  alt="GitHub"
                  className={styles.githubIcon}
                />{' '}
              </a>
              <a
                href="https://vercel.com/vivats-projects"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img
                  src="/vercel-icon.png"
                  alt="Vercel"
                  className={styles.vercelIcon}
                />{' '}
              </a>
            </div>
          </div>
        </section>

        <div className={styles.arrowContainer}>
          <a href="#skills" className={styles.arrowDown}>
            ↓
          </a>
        </div>

        <section id="skills" className={styles.skills}>
          <h2>Skills</h2>
          <div className={styles.skillGrid}>
            <div className={styles.skillCard}>
              <h3>HTML5 / CSS3</h3>
              <p>웹 표준을 지키고, 반응형 웹 디자인을 할 수 있습니다.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>JavaScript / TypeScript</h3>
              <p>스크립트를 활용한 간단한 기능을 만들 수 있습니다.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>React</h3>
              <p>React를 활용한 홈페이지를 제작할 수 있습니다.</p>
            </div>
            <div className={styles.skillCard}>
              <h3>Next.js</h3>
              <p>Next.js를 활용한 홈페이지를 제작할 수 있습니다.</p>
            </div>
          </div>
        </section>

        <section id="projects" className={styles.projects}>
          <h2>Projects</h2>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <div
                key={index}
                className={styles.projectCard}
                onClick={() => openModal(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />

        <section id="github-repos" className={styles.githubSection}>
          <h2>My GitHub Repositories</h2>
          <div className={styles.repoGrid}>
            {currentRepos.map((repo) => (
              <div key={repo.id} className={styles.repoCard}>
                <h3>{repo.name}</h3>
                <p>{repo.description || '설명이 없습니다.'}</p>
                <p>
                  <span role="img" aria-label="view count">
                    👁️
                  </span>{' '}
                  {repo.stargazers_count} Stars
                </p>
                <p>
                  <span role="img" aria-label="fork count">
                    🍴
                  </span>{' '}
                  {repo.forks_count} Forks
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoLink}
                >
                  GitHub에서 보기
                </a>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`${styles.pageButton} ${
                  currentPage === number ? styles.activePage : ''
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <h2>Contact</h2>
          <ContactForm />
        </section>

        <footer className={styles.footer}>
          <div id="footer">
            <p>© KHS Portfolio. All rights reserved.</p>
          </div>
          <div id="top">
            <ScrollToTop />
          </div>
        </footer>
      </div>
    </Suspense>
  )
}
