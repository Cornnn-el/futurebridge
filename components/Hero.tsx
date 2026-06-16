'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import StarCanvas from './StarCanvas'
import Shuffle from './Shuffle'

const lines = [
    'Bukan sekadar tes minat biasa.',
    'Ikuti cerita. Buat pilihanmu.',
    'Biarkan AI mengenali potensimu.',
]

export default function Hero() {
    const typingRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        let lineIdx = 0, charIdx = 0, deleting = false
        let timeout: ReturnType<typeof setTimeout>

        function type() {
            const full = lines[lineIdx]
            if (!deleting) {
                charIdx++
                if (typingRef.current)
                    typingRef.current.innerHTML = full.slice(0, charIdx) + '<span class="cursor"></span>'
                if (charIdx === full.length) {
                    deleting = true
                    timeout = setTimeout(type, 1800)
                    return
                }
                timeout = setTimeout(type, 60)
            } else {
                charIdx--
                if (typingRef.current)
                    typingRef.current.innerHTML = full.slice(0, charIdx) + '<span class="cursor"></span>'
                if (charIdx === 0) {
                    deleting = false
                    lineIdx = (lineIdx + 1) % lines.length
                    timeout = setTimeout(type, 400)
                    return
                }
                timeout = setTimeout(type, 30)
            }
        }

        timeout = setTimeout(type, 800)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <section className="hero">
            <StarCanvas />

            <span className="hero-badge">✦ INTERACTIVE STORYBOOK ✦</span>
            <p className="hero-eyebrow">TEMUKAN POTENSIMU MELALUI CERITA</p>

            <h1 className="hero-title" style={{ display: 'flex', justifyContent: 'center' }}>
                <Shuffle
                    text="Future"
                    tag="span"
                    shuffleDirection="down"
                    duration={0.4}
                    stagger={0.05}
                    triggerOnce={false}
                    triggerOnHover={true}
                    colorFrom="#7B2FFF"
                    colorTo="#7B2FFF"
                    style={{ color: 'var(--violet)' }}
                />
                <Shuffle
                    text="Bridge"
                    tag="span"
                    shuffleDirection="down"
                    duration={0.4}
                    stagger={0.05}
                    triggerOnce={false}
                    triggerOnHover={true}
                    colorFrom="#00F5D4"
                    colorTo="#00F5D4"
                    style={{ color: 'var(--cyan)' }}
                />
            </h1>
            <p className="hero-edition">STORY EDITION</p>

            <p className="hero-typing" ref={typingRef}><span className="cursor"></span></p>

            <div className="hero-btns">
                <Link href="/story">
                    <button className="btn-primary cursor-target">▶ MULAI PETUALANGAN</button>
                </Link>
                <a href="#characters">
                    <button className="btn-outline cursor-target">◈ LIHAT DEMO</button>
                </a>
            </div>

            {/* Pixel Characters */}
            <div className="hero-chars">
                <div className="hero-char-wrap">
                    <svg width="64" height="80" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                        <rect x="4" y="0" width="8" height="1" fill="#FF6B9D" />
                        <rect x="3" y="1" width="10" height="3" fill="#FF6B9D" />
                        <rect x="3" y="3" width="10" height="6" fill="#FFCBA4" />
                        <rect x="4" y="4" width="2" height="2" fill="#1A0A12" />
                        <rect x="10" y="4" width="2" height="2" fill="#1A0A12" />
                        <rect x="4" y="3" width="2" height="2" fill="#FFB5C0" />
                        <rect x="10" y="3" width="2" height="2" fill="#FFB5C0" />
                        <rect x="5" y="7" width="6" height="1" fill="#CC3366" />
                        <rect x="6" y="8" width="4" height="1" fill="#FFCBA4" />
                        <rect x="2" y="9" width="12" height="7" fill="#FFFFFF" />
                        <rect x="1" y="10" width="2" height="5" fill="#FFFFFF" />
                        <rect x="13" y="10" width="2" height="5" fill="#FFFFFF" />
                        <rect x="7" y="10" width="2" height="4" fill="#FF3355" />
                        <rect x="6" y="11" width="4" height="2" fill="#FF3355" />
                        <rect x="4" y="16" width="3" height="3" fill="#E8558A" />
                        <rect x="9" y="16" width="3" height="3" fill="#E8558A" />
                        <rect x="3" y="19" width="4" height="1" fill="#1A0A12" />
                        <rect x="9" y="19" width="4" height="1" fill="#1A0A12" />
                    </svg>
                    <span className="hero-char-label" style={{ color: 'var(--pink)' }}>ALYA</span>
                </div>
                <div className="hero-char-wrap">
                    <svg width="64" height="80" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                        <rect x="3" y="0" width="10" height="4" fill="#2D1B5C" />
                        <rect x="2" y="1" width="2" height="3" fill="#2D1B5C" />
                        <rect x="3" y="3" width="10" height="6" fill="#FFCBA4" />
                        <rect x="4" y="4" width="3" height="1" fill="#2D1B5C" />
                        <rect x="4" y="6" width="3" height="1" fill="#2D1B5C" />
                        <rect x="4" y="4" width="1" height="3" fill="#2D1B5C" />
                        <rect x="6" y="4" width="1" height="3" fill="#2D1B5C" />
                        <rect x="9" y="4" width="3" height="1" fill="#2D1B5C" />
                        <rect x="9" y="6" width="3" height="1" fill="#2D1B5C" />
                        <rect x="9" y="4" width="1" height="3" fill="#2D1B5C" />
                        <rect x="11" y="4" width="1" height="3" fill="#2D1B5C" />
                        <rect x="7" y="5" width="2" height="1" fill="#2D1B5C" />
                        <rect x="5" y="5" width="1" height="1" fill="#1A0A12" />
                        <rect x="10" y="5" width="1" height="1" fill="#1A0A12" />
                        <rect x="6" y="7" width="4" height="1" fill="#CC7744" />
                        <rect x="6" y="8" width="4" height="1" fill="#FFCBA4" />
                        <rect x="3" y="9" width="10" height="7" fill="#7B2FFF" />
                        <rect x="2" y="10" width="2" height="5" fill="#7B2FFF" />
                        <rect x="12" y="10" width="2" height="5" fill="#7B2FFF" />
                        <rect x="6" y="11" width="4" height="3" fill="#4A1AAA" />
                        <rect x="4" y="16" width="3" height="3" fill="#1E0C3A" />
                        <rect x="9" y="16" width="3" height="3" fill="#1E0C3A" />
                        <rect x="3" y="19" width="4" height="1" fill="#1A0A12" />
                        <rect x="9" y="19" width="4" height="1" fill="#1A0A12" />
                    </svg>
                    <span className="hero-char-label" style={{ color: 'var(--violet)' }}>BIMA</span>
                </div>
                <div className="hero-char-wrap">
                    <svg width="64" height="80" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                        <rect x="4" y="0" width="8" height="2" fill="#E67E00" />
                        <rect x="3" y="0" width="10" height="5" fill="#FFD700" />
                        <rect x="2" y="4" width="2" height="8" fill="#FFD700" />
                        <rect x="12" y="4" width="2" height="8" fill="#FFD700" />
                        <rect x="3" y="2" width="10" height="7" fill="#FFCBA4" />
                        <rect x="5" y="4" width="2" height="2" fill="#1A0A12" />
                        <rect x="9" y="4" width="2" height="2" fill="#1A0A12" />
                        <rect x="5" y="7" width="6" height="1" fill="#CC7744" />
                        <rect x="6" y="8" width="4" height="1" fill="#FFCBA4" />
                        <rect x="3" y="9" width="10" height="7" fill="#FFFFFF" />
                        <rect x="2" y="10" width="2" height="5" fill="#FFD700" />
                        <rect x="12" y="10" width="2" height="5" fill="#FFD700" />
                        <rect x="5" y="10" width="2" height="2" fill="#FF6B9D" />
                        <rect x="9" y="12" width="2" height="2" fill="#7B2FFF" />
                        <rect x="7" y="14" width="2" height="1" fill="#00F5D4" />
                        <rect x="4" y="16" width="3" height="3" fill="#8B6914" />
                        <rect x="9" y="16" width="3" height="3" fill="#8B6914" />
                        <rect x="3" y="19" width="4" height="1" fill="#1A0A12" />
                        <rect x="9" y="19" width="4" height="1" fill="#1A0A12" />
                    </svg>
                    <span className="hero-char-label" style={{ color: 'var(--gold)' }}>NARA</span>
                </div>
                <div className="hero-char-wrap">
                    <svg width="64" height="80" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
                        <rect x="4" y="0" width="8" height="3" fill="#003355" />
                        <rect x="3" y="1" width="1" height="3" fill="#003355" />
                        <rect x="12" y="1" width="1" height="3" fill="#003355" />
                        <rect x="3" y="3" width="10" height="6" fill="#FFCBA4" />
                        <rect x="5" y="4" width="2" height="2" fill="#00F5D4" />
                        <rect x="9" y="4" width="2" height="2" fill="#00F5D4" />
                        <rect x="5" y="4" width="1" height="1" fill="#009E88" />
                        <rect x="9" y="4" width="1" height="1" fill="#009E88" />
                        <rect x="6" y="7" width="4" height="1" fill="#CC7744" />
                        <rect x="6" y="8" width="4" height="1" fill="#FFCBA4" />
                        <rect x="3" y="9" width="10" height="7" fill="#006688" />
                        <rect x="2" y="10" width="2" height="5" fill="#006688" />
                        <rect x="12" y="10" width="2" height="5" fill="#006688" />
                        <rect x="5" y="10" width="6" height="1" fill="#00F5D4" />
                        <rect x="5" y="12" width="2" height="1" fill="#00F5D4" />
                        <rect x="9" y="12" width="2" height="1" fill="#00F5D4" />
                        <rect x="7" y="11" width="2" height="3" fill="#00F5D4" />
                        <rect x="4" y="16" width="3" height="3" fill="#004455" />
                        <rect x="9" y="16" width="3" height="3" fill="#004455" />
                        <rect x="3" y="19" width="4" height="1" fill="#00F5D4" />
                        <rect x="9" y="19" width="4" height="1" fill="#00F5D4" />
                    </svg>
                    <span className="hero-char-label" style={{ color: 'var(--cyan)' }}>RAKA</span>
                </div>
            </div>
        </section>
    )
}
