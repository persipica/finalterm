import '../styles/ScrollToTop.css'

export function ScrollToTop() {
  // 클릭하면 스크롤이 위로 올라가는 함수
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className="top-btn-container">
        <button
          className="top-btn"
          onClick={handleTop} // 버튼 클릭시 함수 호출
        >
          <img
            src="/top-button.png"
            alt="탑버튼 아이콘"
            style={{ width: '80px', height: '80px' }}
          />
        </button>
      </div>
    </>
  )
}
