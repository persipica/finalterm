'use client'

import React, { useEffect, useState, Suspense } from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Loading from './Loading'
import { ScrollToTop } from '@/components/ScrollToTop'
import Modal from '../components/Modal'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number // ★ 별 갯수 추가
  forks_count: number // ★ 포크 수 추가
}

interface Project {
  title: string
  description: string
  imageUrl: string
  repoUrl: string
}

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const reposPerPage = 9 // 한 페이지당 표시할 리포지토리 수
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects: Project[] = [
    {
      title: 'Project 1',
      description: '수업시간에 진행했던 HCJDEMO 프로젝트입니다.',
      imageUrl: '../project1.png',
      repoUrl: 'https://github.com/persipica/HCJDEMO2024-2',
    },
    {
      title: 'Project 2',
      description: 'clerk-api를 활용한 실습 사이트입니다.',
      imageUrl: '/project2.png',
      repoUrl: 'https://github.com/persipica/clerk-api',
    },
    {
      title: 'Project 3',
      description: 'Next.js로 만든 중간발표용 포트폴리오 사이트입니다.',
      imageUrl: '/project3.png',
      repoUrl: 'https://github.com/persipica/midterm',
    },
    {
      title: 'Project 4',
      description: '처음 제작했던 포트폴리오 사이트입니다.',
      imageUrl: '../project4.png',
      repoUrl: 'https://github.com/persipica/portfolio',
    },
    {
      title: 'Project 5',
      description: '간단한 여행정보 홈페이지입니다.',
      imageUrl: '/project5.png',
      repoUrl: 'https://github.com/persipica/webprogram-main',
    },
    {
      title: 'Project 6',
      description: '1학기때 만들었던 팀프로젝트입니다.',
      imageUrl: '/project6.png',
      repoUrl: 'https://github.com/persipica/Teamfinalproject',
    },
  ]

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // 모달 닫기
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
        ) // 자신의 GitHub 사용자명으로 변경
        if (!response.ok) throw new Error('GitHub API 요청 실패')
        const data: GitHubRepo[] = await response.json()
        setRepos(data) // 리포지토리 데이터 저장
      } catch (error) {
        console.error('리포지토리를 가져오지 못했습니다:', error)
      }
    }
    fetchRepos()
  }, [])

  // 현재 페이지에 해당하는 리포지토리 계산
  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo)

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // 페이지 번호 계산
  const totalPages = Math.ceil(repos.length / reposPerPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.container}>
        <Header></Header>
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
                onClick={() => openModal(project)} // 클릭 시 모달 열기
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

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
        />

        {/* GitHub 리포지토리 표시 */}
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

          {/* 페이지네이션 */}
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

        <section id="contact" className={styles.contactMe}>
          <h2>Contact Me</h2>

          <div className={styles.contactInfo}>
            <p>
              <i className="fas fa-phone"></i> TEL : 010-8597-7633
            </p>
            <p>
              <i className="fas fa-envelope"></i> Email : likekhs0107@naver.com
            </p>
          </div>

          <form className={styles.contactForm}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력하세요"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="메시지를 입력하세요"
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </section>

        <footer className={styles.footer}>
          <div id="footer">
            <p>© KHS Portfolio. All rights reserved.</p>
          </div>
          <div id="top">
            <ScrollToTop></ScrollToTop>
          </div>
        </footer>
      </div>
    </Suspense>
  )
}
