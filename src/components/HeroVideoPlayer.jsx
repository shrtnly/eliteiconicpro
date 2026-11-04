import { useState, useRef } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'

export default function HeroVideoPlayer({
  videoSrc = '/video/Dhaka%20Icon%20City.MP4',
  poster = '/dhaka-icon-hero.jpg',
  lang = 'en'
}) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const isBn = lang === 'bn'

  const handlePlay = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          // If browser restricts unmuted autoplay, fallback to muted playback
          console.warn('Playback error, falling back to muted playback:', err)
          video.muted = true
          setIsMuted(true)
          video.play()
            .then(() => setIsPlaying(true))
            .catch((e2) => console.error('Video play failed:', e2))
        })
    }
  }

  const handleTogglePlay = (e) => {
    // When playing, clicking the video toggles pause
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      handlePlay(e)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <div
      className={`hero-video-player-wrap ${isPlaying ? 'is-playing' : 'is-paused'}`}
      role="region"
      aria-label="Dhaka Icon City Video Showcase"
      onClick={isPlaying ? handleTogglePlay : undefined}
    >
      {/* 1. STILL POSTER WITH ANIMATED PLAY BUTTON */}
      <div
        className={`hvp-poster ${isPlaying ? 'hvp-poster-hidden' : ''}`}
        onClick={handlePlay}
        role="button"
        tabIndex={0}
        aria-label={isBn ? 'ভিডিও চালান' : 'Play Video'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handlePlay(e)
          }
        }}
      >
        <img
          src={poster}
          alt={isBn ? 'ঢাকা আইকন সিটি - লাক্সারি স্মার্ট মেগা টাউনশিপ' : 'Dhaka Icon City - Luxury Smart Township'}
          loading="eager"
        />
        <div className="hvp-poster-overlay" />

        {/* Center Animated Play Button with ripples */}
        <div className="hvp-play-big">
          <div className="hvp-play-btn-wrapper">
            <span className="hvp-play-ripple" />
            <span className="hvp-play-ripple" />
            <span className="hvp-play-ripple" />
            <div className="hvp-play-big-btn">
              <Play size={28} className="hvp-play-icon" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. NATIVE HTML5 VIDEO STREAM (Plays video only when clicked) */}
      <video
        ref={videoRef}
        className="hvp-video"
        poster={poster}
        preload="metadata"
        playsInline
        webkit-playsinline="true"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src="/video/Dhaka Icon City.MP4" type="video/mp4" />
        Your browser does not support HTML5 video playback.
      </video>

      {/* 3. OPTIONAL SOUND TOGGLE (Appears discreetly on hover when playing) */}
      {isPlaying && (
        <button
          type="button"
          className="hvp-sound-toggle-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? (isBn ? 'শব্দ চালু করুন' : 'Unmute') : (isBn ? 'শব্দ বন্ধ করুন' : 'Mute')}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
    </div>
  )
}
