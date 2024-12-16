import '../styles/ScrollToTop.css'

export function ScrollToTop() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className="top-btn-container">
        <button className="top-btn" onClick={handleTop}>
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
