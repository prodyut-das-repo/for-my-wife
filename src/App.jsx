import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

function App() {
  const typingText =
    'From the moment I met you, my life changed in ways I never imagined…'
  const [typed, setTyped] = useState('')
  const [reason, setReason] = useState('')
  const [reasonTyped, setReasonTyped] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const confettiTimerRef = useRef(null)
  const buttonRef = useRef(null)
  const [burstOrigin, setBurstOrigin] = useState({ x: '50%', y: '40%' })

  const reasons = useMemo(
    () => [
      'You make me feel calm and excited at the same time, like home and adventure in one heartbeat.',
      'Your smile is my favorite sunrise—it warms every corner of my day and makes everything feel possible.',
      'You listen with your whole heart, and somehow every word feels lighter after I share it with you.',
      'You’re my safest place, the person I run to when the world gets loud and complicated.',
      'You make ordinary days feel special, turning simple moments into stories I want to keep forever.',
      'You inspire me to be kinder and braver, to show up with more love than fear.',
      'You’re my best friend and my favorite person, and I still get butterflies when I see you.',
      'You believe in me when I forget to, and that faith makes me want to be better every day.',
      'You turn little moments into memories, like sunsets, shared jokes, and quiet hand-holds.',
      'You’re the person I want to celebrate every win with and hold close through every storm.',
      'You make my life softer and brighter, like you sprinkled stardust on the ordinary.',
      'You are my favorite “yes” and my forever choice, today and every day after.',
      'You make me feel understood without saying a word, and that kind of peace is priceless.',
      'You are the reason my heart feels full, even on the busiest and messiest days.',
      'You’re the best part of my mornings and the sweetest thought before I fall asleep.',
      'You love me in a way that makes me love myself more, and I never take that for granted.',
      'You’re my favorite adventure, the one I want to keep choosing for a lifetime.',
      'You make simple places feel special because you’re there with me.',
      'You remember the little things, and that makes the big things feel even bigger.',
      'You are the calm in my chaos and the spark in my quiet moments.',
      'You teach me patience and joy with the way you care and show up every day.',
      'You make my heart feel safe and my soul feel seen.',
      'You are the kind of love I prayed for and the happiness I didn’t know I needed.',
      'You turn my worries into whispers and my hopes into plans.',
      'You make me laugh until my cheeks hurt, and I want that forever.',
      'You’re the best teammate, always cheering me on and holding my hand.',
      'You’re the reason I believe in forever, because with you it feels possible.',
      'You bring warmth to my life, like a cozy blanket on the coldest day.',
      'You make me want to write love letters and live love stories—with you.',
      'You’re my favorite kind of magic—gentle, real, and endlessly bright.',
      'You make my heart feel at home, no matter where we are.',
      'You make me proud to love you and grateful that you love me too.',
    ],
    [],
  )

  const hearts = useMemo(() => {
    const palettes = ['heart-red', 'heart-pink', 'heart-purple', 'heart-blue']
    return Array.from({ length: 20 }).map((_, index) => {
      return {
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 18,
        opacity: 0.25 + Math.random() * 0.35,
        tone: palettes[Math.floor(Math.random() * palettes.length)],
      }
    })
  }, [])

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 120 }).map((_, index) => {
      const angle = Math.random() * Math.PI * 2
      const distance = 160 + Math.random() * 220
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      const rotation = Math.random() * 360
      const delay = Math.random() * 120
      const size = 6 + Math.random() * 10
      const hue = Math.floor(Math.random() * 360)
      return {
        id: index,
        x,
        y,
        rotation,
        delay,
        size,
        color: `hsl(${hue}, 85%, 65%)`,
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

  useEffect(() => {
    if (!reason) {
      setReasonTyped('')
      return
    }

    let index = 0
    setReasonTyped('')
    const interval = setInterval(() => {
      index += 1
      setReasonTyped(reason.slice(0, index))
      if (index >= reason.length) {
        clearInterval(interval)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [reason])

  const handleReason = () => {
    const next = reasons[Math.floor(Math.random() * reasons.length)]
    setReason(next)
    const buttonRect = buttonRef.current?.getBoundingClientRect()
    if (buttonRect) {
      const x = buttonRect.left + buttonRect.width / 2
      const y = buttonRect.top + buttonRect.height / 2
      setBurstOrigin({ x: `${x}px`, y: `${y}px` })
    }
    setShowConfetti(true)
    setConfettiKey((prev) => prev + 1)
    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current)
    }
    confettiTimerRef.current = setTimeout(() => {
      setShowConfetti(false)
    }, 900)
  }


  return (
    <div className="page">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className={heart.tone}
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
            <button className="primary" onClick={handleReason} ref={buttonRef}>
              {reason
                ? 'Click again to see why I love you'
                : 'Click to see why I love you'}
            </button>
          </div>
          {reason && (
            <div className="reason-card">
              <div className="paper">
                <div className="lines">
                  <div className="text" spellCheck="false">
                    {reasonTyped}
                  </div>
                </div>
                <div className="holes hole-top" aria-hidden="true" />
                <div className="holes hole-middle" aria-hidden="true" />
                <div className="holes hole-bottom" aria-hidden="true" />
              </div>
            </div>
          )}
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

      {showConfetti && (
        <div
          className="confetti-burst"
          aria-hidden="true"
          key={confettiKey}
          style={{ '--origin-x': burstOrigin.x, '--origin-y': burstOrigin.y }}
        >
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              style={{
                '--x': `${piece.x}px`,
                '--y': `${piece.y}px`,
                '--r': `${piece.rotation}deg`,
                '--delay': `${piece.delay}ms`,
                width: `${piece.size}px`,
                height: `${piece.size * 0.4}px`,
                backgroundColor: piece.color,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
