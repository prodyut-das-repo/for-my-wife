import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const typingText =
    'From the moment I met you, my life changed in ways I never imagined…'
  const [typed, setTyped] = useState('')
  const [reason, setReason] = useState('')

  const reasons = useMemo(
    () => [
      'You make me feel calm and excited at the same time.',
      'Your smile is my favorite sunrise.',
      'You listen with your whole heart.',
      'You’re my safest place.',
      'You make ordinary days feel special.',
      'You inspire me to be kinder and braver.',
      'You’re my best friend and my favorite person.',
      'You believe in me when I forget to.',
      'You turn little moments into memories.',
    ],
    [],
  )

  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, index) => {
      return {
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 18,
        opacity: 0.25 + Math.random() * 0.35,
      }
    })
  }, [])

  useEffect(() => {
    let frame = 0
    const interval = setInterval(() => {
      frame += 1
      setTyped(typingText.slice(0, frame))
      if (frame >= typingText.length) {
        clearInterval(interval)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [typingText])

  const handleReason = () => {
    const next = reasons[Math.floor(Math.random() * reasons.length)]
    setReason(next)
  }


  return (
    <div className="page">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
            }}
          >
            💗
          </span>
        ))}
      </div>

      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Valentine’s Day 2026</p>
          <h1>
            Hi <span className="highlight">Riya</span>, Happy Valentine’s Day
            <span> ❤️</span>
          </h1>
          <p className="hero-subtext">
            This page is my way of saying how much you mean to me.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={handleReason}>
              {reason
                ? 'Click again to see why I love you'
                : 'Click to see why I love you'}
            </button>
          </div>
          {reason && <div className="reason-card">{reason}</div>}
        </div>
        <div className="hero-card">
          <div className="typing-plain">
            <p className="typing-text small">{typed}</p>
          </div>
          <div className="photo-frame">
            <div className="photo-placeholder">Add your photo here ✨</div>
          </div>
        </div>
      </header>

      <section className="timeline">
        <h2>Relationship Timeline</h2>
        <div className="timeline-track">
          <div className="timeline-item">
            <span className="dot">📍</span>
            <div>
              <h4>First time we met</h4>
              <p>The day my heart learned your name.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="dot">💬</span>
            <div>
              <h4>First conversation</h4>
              <p>We talked for hours like we already knew each other.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="dot">💍</span>
            <div>
              <h4>Big milestones</h4>
              <p>Every adventure that made us stronger together.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="dot">❤️</span>
            <div>
              <h4>Today</h4>
              <p>Still falling for you, a little more every day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="final">
        <h2>Final Message</h2>
        <p>
          Thank you for every laugh, every lesson, and every gentle moment. I
          love you endlessly and I’m excited for all the chapters still ahead of
          us.
        </p>
      </section>
    </div>
  )
}

export default App
