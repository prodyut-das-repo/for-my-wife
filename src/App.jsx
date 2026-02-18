import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import loveBirds from './assets/love_birds2.png'
import userPhoto from './assets/Gemini_Generated_Image_bzayclbzayclbzay.png'

function App() {
  const typingText =
    'From the moment I met you, my life changed in ways I never imagined…'
  const touchText = 'Touch my watch'
  const [typed, setTyped] = useState('');
  const [touch, setTouch] = useState('')
  const [reason, setReason] = useState('')
  const [reasonTyped, setReasonTyped] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const confettiTimerRef = useRef(null)
  const buttonRef = useRef(null)
  const [burstOrigin, setBurstOrigin] = useState({ x: '50%', y: '40%' })
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStartRef = useRef(null)
  const touchDeltaRef = useRef(0)

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
      'You make the small things feel sacred, like morning light, warm tea, and the slowest, sweetest kind of peace.',
      'You are the pause that turns a long day into rest, the breath that makes everything feel softer again.',
      'You show up with kindness even when no one is watching, and that quiet goodness makes me love you more.',
      'You are the laughter I look for in every room, the sound that makes me feel instantly at home.',
      'You make me feel brave enough to be fully myself, even the messy, honest parts I used to hide.',
      'You turn ordinary nights into the kind I wish would never end, with your warmth and gentle light.',
      'You are my favorite hello and the softest goodnight, the bookends of every day I cherish most.',
      'You teach me how love should feel: steady, gentle, and true, like a promise I can always trust.',
      'You make even silence feel like a conversation, because your presence speaks in the best ways.',
      'You are the reason I believe in the quiet kind of forever, the love that keeps growing without noise.',
      'You make the world feel less heavy just by being in it, and I feel lighter whenever you are near.',
      'You are the safest place my heart has ever known, the calm I return to when everything feels loud.',
      'You bring out the best parts of me without asking, simply by loving me the way you do.',
      'You are the spark that turns my plans into dreams, the nudge that makes me want to reach higher.',
      'You make me want to slow down and savor everything, especially the moments I get to share with you.',
      'You are the sweetness in my coffee and the calm in my mind, the comfort I carry all day long.',
      'You love me in ways that make me feel whole, like every piece finally fits where it belongs.',
      'You are the reason my favorite moments all have your name on them, because you make them shine.',
      'You turn my worries into quiet and my fears into faith, with the steadiness of your love.',
      'You make me believe in love stories written by real life, the kind that grows with time and care.',
      'You are the kind of love that grows deeper every day, like roots that hold me gently in place.',
      'You make every place feel like the right place, just because you are there with me.',
      'You are the brightest part of my days and the calm of my nights, my joy and my quiet.',
      'You make my heart feel understood and my soul feel seen, even when I cannot find the words.',
      'You are the person I want to build every tomorrow with, the one I trust with all my dreams.',
      'You make love feel easy, even on the hard days, because you meet me with patience and grace.',
      'You are my favorite promise and my best memory, the one I keep returning to with a smile.',
      'You make the future feel exciting and safe at the same time, like an adventure wrapped in comfort.',
      'You are the melody I carry through every season, the song that makes life feel lighter.',
      'You make me want to love louder and live softer, to be gentler with myself and the world.',
      'You are the reason my home feels like a hug, the warmth that fills every corner.',
      'You make the ordinary glow with meaning, turning simple moments into something I hold close.',
      'You are the one I want beside me in every story, in the chapters we have yet to write.',
      'You make patience feel like a gift instead of a wait, because you make the journey beautiful.',
      'You are the calm rhythm my heart keeps returning to, the steady beat that feels like peace.',
      'You make me believe that kindness is the strongest kind of love, and you show me that daily.',
      'You are the warmth I look for when the world feels cold, the light I trust to guide me home.',
      'You make me feel treasured in the smallest ways, like you notice every little piece of me.',
      'You are the best part of my day, every day, the thought that makes me smile without trying.',
      'You make everything feel more beautiful just by being you, and I never stop admiring that.',
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

  const carouselSlides = useMemo(
    () => [
      {
        id: 'forever-smile',
        image: userPhoto,
        title: 'Forever Smile',
        note: 'The look that makes my whole day slow down in the best way.',
      },
      {
        id: 'first-convo',
        image: loveBirds,
        title: 'First Conversation',
        note: 'We talked and the world suddenly felt softer and brighter.',
      },
      {
        id: 'always-us',
        image: userPhoto,
        title: 'Always Us',
        note: 'Every step feels lighter when we walk it together.',
      },
    ],
    [],
  )

  useEffect(() => {
    let frame = 0
    const interval = setInterval(() => {
      frame += 1
      setTyped(typingText.slice(0, frame))
      setTouch(touchText.slice(0, frame))
      if (frame >= typingText.length) {
        clearInterval(interval)
      }
    }, 35)
    return () => clearInterval(interval)
  }, [typingText, touchText])

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

  const goToSlide = (index) => {
    const total = carouselSlides.length
    if (!total) {
      return
    }
    const nextIndex = (index + total) % total
    setActiveSlide(nextIndex)
  }

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0].clientX
    touchDeltaRef.current = 0
  }

  const handleTouchMove = (event) => {
    if (touchStartRef.current === null) {
      return
    }
    touchDeltaRef.current = event.touches[0].clientX - touchStartRef.current
  }

  const handleTouchEnd = () => {
    if (touchStartRef.current === null) {
      return
    }
    if (touchDeltaRef.current > 60) {
      goToSlide(activeSlide - 1)
    } else if (touchDeltaRef.current < -60) {
      goToSlide(activeSlide + 1)
    }
    touchStartRef.current = null
    touchDeltaRef.current = 0
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
                  <div className="paper-title">To my dear wife &lt;3</div>
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
          <div className="photo-frame" style={{ overflow: 'hidden' }}>
             <p className="typing-text small">{touch}</p>
            <img className='user-photo' src={userPhoto} alt="Our special moment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <p>The day my heart learned your name, love at first eye sight <b>AGAAAAAIN ❤️</b></p>
              <iframe
                title="NJP Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6075.634960284654!2d88.43363341255963!3d26.692631469414295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e443d36086e611%3A0x731646c9cf2b77be!2sNJP%20Railway%20Sta%20Rd%2C%20Siliguri%2C%20West%20Bengal!5e1!3m2!1sen!2sin!4v1770722573749!5m2!1sen!2sin"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: '8px', marginTop: '8px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="timeline-item">
            <span className="dot">💬</span>
            <div>
              <h4>First conversation</h4>
              <p>We talked for hours like we already knew each other.</p>
              <img src={loveBirds} style={{ borderRadius: "8px", marginTop: "8px" }} alt="Two love birds talking with love" className="love-birds-img" />
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

      <section className="carousel-section">
        <h2>Memory Lane</h2>
        <p className="carousel-subtext">
          A few snapshots that still make my heart flutter.
        </p>
        <div
          className="carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {carouselSlides.map((slide) => (
              <article className="carousel-slide" key={slide.id}>
                <img src={slide.image} alt={slide.title} />
                <div className="carousel-caption">
                  <h3>{slide.title}</h3>
                  <p>{slide.note}</p>
                </div>
              </article>
            ))}
          </div>
          <button
            className="carousel-nav prev"
            type="button"
            onClick={() => goToSlide(activeSlide - 1)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            className="carousel-nav next"
            type="button"
            onClick={() => goToSlide(activeSlide + 1)}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="carousel-dots" role="tablist">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`carousel-dot${
                  index === activeSlide ? ' is-active' : ''
                }`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${slide.title}`}
                aria-pressed={index === activeSlide}
              />
            ))}
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
