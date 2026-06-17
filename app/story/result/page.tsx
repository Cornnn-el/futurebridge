'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StarCanvas from '@/components/StarCanvas'

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type CharKey = 'alya' | 'bima' | 'nara' | 'raka'
type RiasecKey = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

interface ResultData {
    riasec: Record<RiasecKey, number>
    bakat: { verbal: number; numerik: number; abstrak: number; spasial: number }
    character: CharKey
    dominant: RiasecKey
}

/* ─────────────────────────────────────────
   CHARACTER DATA
───────────────────────────────────────── */
const charData: Record<CharKey, {
    color: string
    name: string
    title: string
    desc: string
    traits: string[]
    jurusan: string[]
    karir: string[]
    quote: string
}> = {
    alya: {
        color: '#FF6B9D',
        name: 'ALYA',
        title: 'The Empathic Healer',
        desc: 'Kamu adalah jiwa yang hangat dan penuh empati. Kamu menemukan makna terdalam ketika bisa membuat perbedaan nyata dalam kehidupan orang lain — dan dunia sangat membutuhkan orang sepertimu.',
        traits: ['Empati Tinggi', 'Komunikatif', 'Peduli', 'Supportif', 'Kolaboratif'],
        jurusan: ['Kedokteran', 'Psikologi', 'Keperawatan', 'Pendidikan', 'Kesehatan Masyarakat', 'Bimbingan Konseling'],
        karir: ['Dokter', 'Psikolog', 'Konselor', 'Guru', 'Perawat', 'Social Worker'],
        quote: '"Kekuatan terbesarmu adalah kemampuanmu membuat orang merasa didengar."',
    },
    bima: {
        color: '#7B2FFF',
        name: 'BIMA',
        title: 'The Analytical Mind',
        desc: 'Kamu adalah pemikir sistematis yang tidak puas sebelum memahami "mengapa" di balik segalanya. Otakmu dirancang untuk memecahkan masalah yang membuat orang lain menyerah.',
        traits: ['Analitis', 'Logis', 'Teliti', 'Penasaran', 'Sistematis'],
        jurusan: ['Informatika', 'Matematika', 'Fisika', 'Data Science', 'Statistika', 'Teknik Komputer'],
        karir: ['Software Engineer', 'Data Scientist', 'Peneliti', 'Aktuaris', 'AI Engineer', 'Analis Sistem'],
        quote: '"Setiap masalah adalah teka-teki yang menunggumu untuk dipecahkan."',
    },
    nara: {
        color: '#FFD700',
        name: 'NARA',
        title: 'The Creative Visionary',
        desc: 'Kamu melihat dunia dengan cara yang berbeda dari kebanyakan orang. Di mana orang lain melihat keterbatasan, kamu melihat kanvas kosong yang menunggu untuk diisi dengan ide-ide luar biasa.',
        traits: ['Kreatif', 'Imajinatif', 'Ekspresif', 'Inovatif', 'Estetis'],
        jurusan: ['Desain Grafis', 'Seni Rupa', 'Arsitektur', 'Komunikasi Visual', 'Film & TV', 'Animasi'],
        karir: ['Designer', 'Art Director', 'Animator', 'Fotografer', 'Content Creator', 'Arsitek'],
        quote: '"Kreativitasmu adalah bahasamu — dan dunia perlu mendengarnya."',
    },
    raka: {
        color: '#00F5D4',
        name: 'RAKA',
        title: 'The Technical Builder',
        desc: 'Kamu adalah orang yang membuat sesuatu menjadi nyata. Tanganmu dan pikiranmu bekerja bersama untuk mengubah konsep abstrak menjadi sesuatu yang bisa dilihat, disentuh, dan digunakan.',
        traits: ['Teknikal', 'Praktikal', 'Inovatif', 'Eksploratif', 'Presisi'],
        jurusan: ['Teknik Mesin', 'Teknik Elektro', 'Teknik Sipil', 'Robotika', 'Teknik Industri', 'Aerospace'],
        karir: ['Engineer', 'Robotics Developer', 'Pilot', 'Arsitek Sistem', 'Teknisi Avionik', 'Product Engineer'],
        quote: '"Yang kamu bangun hari ini adalah fondasi masa depan yang belum ada."',
    },
}

const riasecLabel: Record<RiasecKey, string> = {
    R: 'Realistis', I: 'Investigatif', A: 'Artistik',
    S: 'Sosial', E: 'Enterprising', C: 'Konvensional',
}

const riasecColor: Record<RiasecKey, string> = {
    R: '#00F5D4', I: '#7B2FFF', A: '#FFD700',
    S: '#FF6B9D', E: '#FF8C00', C: '#88AACC',
}

/* ─────────────────────────────────────────
   PIXEL SPRITES
───────────────────────────────────────── */
function SpriteAlya({ size = 120 }: { size?: number }) {
    const s = size / 20
    return (
        <svg width={size * 0.8} height={size} viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="0" width="8" height="1" fill="#FF6B9D" />
            <rect x="3" y="1" width="10" height="3" fill="#FF6B9D" />
            <rect x="3" y="3" width="10" height="6" fill="#FFCBA4" />
            <rect x="4" y="4" width="2" height="2" fill="#1A0A12" />
            <rect x="10" y="4" width="2" height="2" fill="#1A0A12" />
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
    )
}

function SpriteBima({ size = 120 }: { size?: number }) {
    return (
        <svg width={size * 0.8} height={size} viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
    )
}

function SpriteNara({ size = 120 }: { size?: number }) {
    return (
        <svg width={size * 0.8} height={size} viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
    )
}

function SpriteRaka({ size = 120 }: { size?: number }) {
    return (
        <svg width={size * 0.8} height={size} viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
    )
}

const sprites: Record<CharKey, (size: number) => React.ReactNode> = {
    alya: (s) => <SpriteAlya size={s} />,
    bima: (s) => <SpriteBima size={s} />,
    nara: (s) => <SpriteNara size={s} />,
    raka: (s) => <SpriteRaka size={s} />,
}

/* ─────────────────────────────────────────
   REVEAL PHASES
   0 = scanning    (loading bar)
   1 = glitch      (karakter muncul glitch)
   2 = reveal      (full result)
───────────────────────────────────────── */
export default function ResultPage() {
    const router = useRouter()

    // ── Share functions ──
    const shareWhatsApp = (name: string, title: string) => {
        const text = `Aku dapat karakter ${name} — ${title} di FutureBridge Story Edition! Temukan potensimu juga di: ${window.location.origin}`
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
    }
    const shareTwitter = (name: string, title: string) => {
        const text = `Aku dapat karakter ${name} — ${title} di FutureBridge Story Edition! Temukan potensimu juga 🚀`
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`)
    }
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.origin)
        alert('Link berhasil dicopy!')
    }

    const [result, setResult] = useState<ResultData | null>(null)
    const [phase, setPhase] = useState<0 | 1 | 2>(0)
    const [scanPct, setScanPct] = useState(0)
    const [glitchOn, setGlitchOn] = useState(false)
    const [visibleSections, setVisibleSections] = useState(0)

    /* ── Load result from sessionStorage ── */
    useEffect(() => {
        const raw = sessionStorage.getItem('futurebridge-result')
        if (!raw) { router.push('/story/test'); return }
        setResult(JSON.parse(raw))
    }, [router])

    /* ── Phase 0: scanning animation ── */
    useEffect(() => {
        if (!result || phase !== 0) return
        let pct = 0
        const interval = setInterval(() => {
            pct += Math.random() * 4 + 1
            if (pct >= 100) {
                pct = 100
                setScanPct(100)
                clearInterval(interval)
                setTimeout(() => setPhase(1), 400)
            } else {
                setScanPct(Math.min(pct, 99))
            }
        }, 60)
        return () => clearInterval(interval)
    }, [result, phase])

    /* ── Phase 1: glitch reveal ── */
    useEffect(() => {
        if (phase !== 1) return
        let count = 0
        const glitch = setInterval(() => {
            setGlitchOn(g => !g)
            count++
            if (count > 10) {
                clearInterval(glitch)
                setGlitchOn(false)
                setTimeout(() => setPhase(2), 200)
            }
        }, 80)
        return () => clearInterval(glitch)
    }, [phase])

    /* ── Phase 2: sections appear one by one ── */
    useEffect(() => {
        if (phase !== 2) return
        let i = 0
        const t = setInterval(() => {
            i++
            setVisibleSections(i)
            if (i >= 5) clearInterval(t)
        }, 350)
        return () => clearInterval(t)
    }, [phase])

    if (!result) return null

    const char = result.character
    const data = charData[char]
    const color = data.color

    const maxRiasec = Math.max(...Object.values(result.riasec))
    const maxBakat = Math.max(...Object.values(result.bakat))

    /* ── Extra jurusan from bakat ── */
    const bakatBonus: string[] = []
    const { verbal, numerik, abstrak, spasial } = result.bakat
    const bakatMax = Math.max(verbal, numerik, abstrak, spasial)
    if (verbal === bakatMax) bakatBonus.push('Sastra', 'Hukum', 'Jurnalistik')
    if (numerik === bakatMax) bakatBonus.push('Aktuaria', 'Statistika', 'Ekonomi')
    if (abstrak === bakatMax) bakatBonus.push('Ilmu Komputer', 'Riset & Inovasi')
    if (spasial === bakatMax) bakatBonus.push('Arsitektur', 'Animasi 3D', 'Teknik Sipil')

    const allJurusan = [...new Set([...data.jurusan, ...bakatBonus])]

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'VT323', monospace",
        }}>
            <StarCanvas />

            {/* ════════════════════════════════
          PHASE 0 — SCANNING
      ════════════════════════════════ */}
            {phase === 0 && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 50,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '32px',
                    animation: 'fadeIn 0.4s ease',
                }}>
                    {/* Scanning lines */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,245,212,0.03) 2px,
              rgba(0,245,212,0.03) 4px
            )`,
                    }} />

                    <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '8px', color: 'var(--cyan)', letterSpacing: '3px',
                        animation: 'pulse 1s ease-in-out infinite',
                    }}>
                        ◈ MENGANALISIS JAWABAN...
                    </div>

                    {/* Big scanning box */}
                    <div style={{
                        width: '320px', border: `2px solid ${color}`,
                        padding: '32px', textAlign: 'center',
                        background: 'rgba(10,10,26,0.9)',
                        boxShadow: `0 0 40px ${color}33`,
                        position: 'relative',
                    }}>
                        {/* corner pixels */}
                        {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
                            <div key={c} style={{
                                position: 'absolute',
                                top: c[0] === 't' ? -3 : 'auto', bottom: c[0] === 'b' ? -3 : 'auto',
                                left: c[1] === 'l' ? -3 : 'auto', right: c[1] === 'r' ? -3 : 'auto',
                                width: 10, height: 10, background: color,
                            }} />
                        ))}

                        <div style={{ fontSize: '60px', marginBottom: '16px', opacity: 0.3 }}>?</div>

                        <div style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '6px', color: 'var(--muted)', marginBottom: '20px',
                        }}>
                            PROCESSING PROFILE
                        </div>

                        {/* Progress bar */}
                        <div style={{ width: '100%', height: '8px', background: 'var(--border)', marginBottom: '12px' }}>
                            <div style={{
                                height: '100%', width: `${scanPct}%`,
                                background: color,
                                boxShadow: `0 0 12px ${color}`,
                                transition: 'width 0.06s linear',
                            }} />
                        </div>

                        <div style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '9px', color,
                        }}>
                            {Math.floor(scanPct)}%
                        </div>
                    </div>

                    {/* Scanning labels */}
                    {['RIASEC PROFILE', 'BAKAT KOGNITIF', 'KARAKTER MAPPING', 'REKOMENDASI'].map((label, i) => (
                        <div key={label} style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '6px',
                            color: scanPct > (i + 1) * 22 ? 'var(--cyan)' : 'var(--border)',
                            letterSpacing: '2px',
                            transition: 'color 0.3s',
                        }}>
                            {scanPct > (i + 1) * 22 ? '✓' : '○'} {label}
                        </div>
                    ))}
                </div>
            )}

            {/* ════════════════════════════════
          PHASE 1 — GLITCH REVEAL
      ════════════════════════════════ */}
            {phase === 1 && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 50,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '24px',
                }}>
                    <div style={{
                        filter: glitchOn ? `drop-shadow(4px 0 0 #ff0088) drop-shadow(-4px 0 0 #00f5d4)` : 'none',
                        transform: glitchOn ? `translateX(${Math.random() > 0.5 ? 4 : -4}px)` : 'none',
                        transition: 'none',
                    }}>
                        {sprites[char](180)}
                    </div>
                    <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '10px',
                        color: glitchOn ? '#ff0088' : color,
                        letterSpacing: '4px',
                        filter: glitchOn ? `blur(1px)` : 'none',
                    }}>
                        {data.name}
                    </div>
                </div>
            )}

            {/* ════════════════════════════════
          PHASE 2 — FULL RESULT
      ════════════════════════════════ */}
            {phase === 2 && (
                <div style={{
                    maxWidth: '800px', margin: '0 auto',
                    padding: '60px 24px 80px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '32px',
                    position: 'relative', zIndex: 1,
                }}>

                    {/* ── SECTION 0: Character Hero ── */}
                    {visibleSections >= 1 && (
                        <div style={{
                            width: '100%', textAlign: 'center',
                            animation: 'slideUp 0.5s ease',
                        }}>
                            {/* Glow bg */}
                            <div style={{
                                position: 'relative', display: 'inline-block',
                                marginBottom: '24px',
                            }}>
                                <div style={{
                                    position: 'absolute', inset: '-20px',
                                    background: `radial-gradient(ellipse, ${color}33 0%, transparent 70%)`,
                                    borderRadius: '50%',
                                    animation: 'pulse 2s ease-in-out infinite',
                                }} />
                                <div style={{ animation: 'cfloat 3s ease-in-out infinite' }}>
                                    {sprites[char](200)}
                                </div>
                            </div>

                            <div style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: '8px', color: 'var(--muted)',
                                letterSpacing: '3px', marginBottom: '12px',
                            }}>
                                ✦ KARAKTER KAMU ADALAH ✦
                            </div>

                            <h1 style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: '28px', color,
                                textShadow: `0 0 30px ${color}, 0 0 60px ${color}66`,
                                letterSpacing: '4px', marginBottom: '8px',
                                lineHeight: 1.4,
                            }}>
                                {data.name}
                            </h1>

                            <div style={{
                                fontFamily: "'VT323', monospace",
                                fontSize: '24px', color: 'var(--muted)',
                                letterSpacing: '2px', marginBottom: '24px',
                            }}>
                                {data.title}
                            </div>

                            {/* Quote */}
                            <div style={{
                                border: `1px solid ${color}66`,
                                padding: '16px 24px',
                                background: `${color}0A`,
                                maxWidth: '560px', margin: '0 auto',
                                fontFamily: "'VT323', monospace",
                                fontSize: '20px', color,
                                fontStyle: 'italic', lineHeight: 1.6,
                            }}>
                                {data.quote}
                            </div>
                        </div>
                    )}

                    {/* ── SECTION 1: Description & Traits ── */}
                    {visibleSections >= 2 && (
                        <div style={{
                            width: '100%', animation: 'slideUp 0.5s ease',
                            border: `2px solid ${color}44`,
                            background: 'rgba(10,10,26,0.85)',
                            padding: '28px 32px',
                            position: 'relative',
                        }}>
                            {/* Corner brackets */}
                            {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
                                <div key={c} style={{
                                    position: 'absolute',
                                    top: c[0] === 't' ? -2 : 'auto', bottom: c[0] === 'b' ? -2 : 'auto',
                                    left: c[1] === 'l' ? -2 : 'auto', right: c[1] === 'r' ? -2 : 'auto',
                                    width: 12, height: 12,
                                    borderColor: color, borderStyle: 'solid', borderWidth: 0,
                                    borderTopWidth: c[0] === 't' ? 3 : 0,
                                    borderBottomWidth: c[0] === 'b' ? 3 : 0,
                                    borderLeftWidth: c[1] === 'l' ? 3 : 0,
                                    borderRightWidth: c[1] === 'r' ? 3 : 0,
                                }} />
                            ))}

                            <div style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: '7px', color, letterSpacing: '2px',
                                marginBottom: '16px',
                            }}>
                // PROFIL KEPRIBADIAN
                            </div>

                            <p style={{
                                fontSize: '20px', color: 'var(--text)',
                                lineHeight: 1.8, marginBottom: '24px',
                            }}>
                                {data.desc}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {data.traits.map(t => (
                                    <span key={t} style={{
                                        fontFamily: "'Press Start 2P', monospace",
                                        fontSize: '6px', color,
                                        border: `1px solid ${color}`,
                                        padding: '6px 12px', letterSpacing: '1px',
                                        background: `${color}11`,
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── SECTION 2: RIASEC + Bakat bars ── */}
                    {visibleSections >= 3 && (
                        <div style={{
                            width: '100%', display: 'grid',
                            gridTemplateColumns: '1fr 1fr', gap: '20px',
                            animation: 'slideUp 0.5s ease',
                        }}>
                            {/* RIASEC */}
                            <div style={{
                                border: `2px solid var(--border)`,
                                background: 'rgba(10,10,26,0.85)',
                                padding: '24px',
                            }}>
                                <div style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    fontSize: '6px', color: 'var(--cyan)',
                                    letterSpacing: '2px', marginBottom: '20px',
                                }}>
                  // PROFIL RIASEC
                                </div>
                                {(Object.keys(result.riasec) as RiasecKey[]).map(key => (
                                    <div key={key} style={{ marginBottom: '12px' }}>
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between',
                                            marginBottom: '4px',
                                        }}>
                                            <span style={{
                                                fontFamily: "'Press Start 2P', monospace",
                                                fontSize: '6px',
                                                color: key === result.dominant ? riasecColor[key] : 'var(--muted)',
                                            }}>
                                                {key} — {riasecLabel[key]}
                                                {key === result.dominant && ' ★'}
                                            </span>
                                            <span style={{
                                                fontFamily: "'Press Start 2P', monospace",
                                                fontSize: '6px', color: 'var(--muted)',
                                            }}>
                                                {result.riasec[key]}
                                            </span>
                                        </div>
                                        <div style={{ height: '6px', background: 'var(--border)' }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${maxRiasec > 0 ? (result.riasec[key] / maxRiasec) * 100 : 0}%`,
                                                background: riasecColor[key],
                                                boxShadow: key === result.dominant ? `0 0 8px ${riasecColor[key]}` : 'none',
                                                transition: 'width 1s ease',
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bakat */}
                            <div style={{
                                border: `2px solid var(--border)`,
                                background: 'rgba(10,10,26,0.85)',
                                padding: '24px',
                            }}>
                                <div style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    fontSize: '6px', color: 'var(--gold)',
                                    letterSpacing: '2px', marginBottom: '20px',
                                }}>
                  // SKOR BAKAT
                                </div>
                                {([
                                    { key: 'verbal', label: 'Penalaran Verbal', c: '#FF6B9D' },
                                    { key: 'numerik', label: 'Kemampuan Numerik', c: '#7B2FFF' },
                                    { key: 'abstrak', label: 'Penalaran Abstrak', c: '#00F5D4' },
                                    { key: 'spasial', label: 'Relasi Ruang', c: '#FFD700' },
                                ] as const).map(({ key, label, c }) => (
                                    <div key={key} style={{ marginBottom: '12px' }}>
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between',
                                            marginBottom: '4px',
                                        }}>
                                            <span style={{
                                                fontFamily: "'Press Start 2P', monospace",
                                                fontSize: '6px', color: 'var(--muted)',
                                            }}>
                                                {label}
                                            </span>
                                            <span style={{
                                                fontFamily: "'Press Start 2P', monospace",
                                                fontSize: '6px', color: c,
                                            }}>
                                                {result.bakat[key]}
                                            </span>
                                        </div>
                                        <div style={{ height: '6px', background: 'var(--border)' }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${maxBakat > 0 ? (result.bakat[key] / maxBakat) * 100 : 0}%`,
                                                background: c,
                                                boxShadow: `0 0 6px ${c}88`,
                                                transition: 'width 1s ease',
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── SECTION 3: Rekomendasi Jurusan ── */}
                    {visibleSections >= 4 && (
                        <div style={{
                            width: '100%', animation: 'slideUp 0.5s ease',
                            border: `2px solid ${color}44`,
                            background: 'rgba(10,10,26,0.85)',
                            padding: '28px 32px',
                        }}>
                            <div style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: '7px', color, letterSpacing: '2px',
                                marginBottom: '20px',
                            }}>
                // REKOMENDASI JURUSAN
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                                gap: '12px',
                            }}>
                                {allJurusan.map((j, i) => (
                                    <div key={j} style={{
                                        border: `1px solid ${i < data.jurusan.length ? color : 'var(--border)'}`,
                                        padding: '12px 16px',
                                        background: i < data.jurusan.length ? `${color}0F` : 'transparent',
                                        fontFamily: "'VT323', monospace",
                                        fontSize: '18px',
                                        color: i < data.jurusan.length ? color : 'var(--muted)',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                    }}>
                                        <span style={{ fontSize: '12px', opacity: 0.6 }}>
                                            {i < data.jurusan.length ? '★' : '○'}
                                        </span>
                                        {j}
                                    </div>
                                ))}
                            </div>

                            <p style={{
                                fontSize: '16px', color: 'var(--muted)',
                                marginTop: '16px', lineHeight: 1.6,
                            }}>
                                ★ = Rekomendasi utama berdasarkan profil minat &nbsp;|&nbsp;
                                ○ = Rekomendasi tambahan berdasarkan skor bakat
                            </p>
                        </div>
                    )}

                    {/* ── SECTION 4: Karir & CTA ── */}
                    {visibleSections >= 5 && (
                        <div style={{
                            width: '100%', animation: 'slideUp 0.5s ease',
                            display: 'flex', flexDirection: 'column', gap: '20px',
                        }}>
                            {/* Karir */}
                            <div style={{
                                border: `2px solid var(--border)`,
                                background: 'rgba(10,10,26,0.85)',
                                padding: '28px 32px',
                            }}>
                                <div style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    fontSize: '7px', color: 'var(--muted)',
                                    letterSpacing: '2px', marginBottom: '20px',
                                }}>
                  // JALUR KARIR
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                    {data.karir.map(k => (
                                        <div key={k} style={{
                                            fontFamily: "'Press Start 2P', monospace",
                                            fontSize: '6px', color: 'var(--text)',
                                            border: '1px solid var(--border)',
                                            padding: '8px 16px',
                                            background: 'var(--bg)',
                                        }}>
                                            ▶ {k}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA buttons */}
                            <div style={{
                                display: 'flex', gap: '16px',
                                justifyContent: 'center', flexWrap: 'wrap',
                            }}>
                                <button
                                    onClick={() => {
                                        sessionStorage.removeItem('futurebridge-result')
                                        localStorage.removeItem('fb-answers')
                                        localStorage.removeItem('fb-index')
                                        router.push('/story/test')
                                    }}
                                    className="btn-outline cursor-target"
                                    style={{
                                        fontFamily: "'Press Start 2P', monospace",
                                        fontSize: '7px', padding: '14px 24px',
                                    }}
                                >
                                    ↺ ULANGI TES
                                </button>
                                <button
                                    onClick={() => router.push('/')}
                                    className="btn-primary cursor-target"
                                    style={{
                                        fontFamily: "'Press Start 2P', monospace",
                                        fontSize: '7px', padding: '14px 24px',
                                        background: color,
                                        boxShadow: `4px 4px 0 ${color}66`,
                                    }}
                                >
                                    ▶ KEMBALI KE HOME
                                </button>
                            </div>

                            {/* Share buttons */}
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => shareWhatsApp(data.name, data.title)}
                                    className="btn-outline cursor-target"
                                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', padding: '10px 16px', borderColor: '#25D366', color: '#25D366' }}
                                >
                                    ✦ WHATSAPP
                                </button>
                                <button
                                    onClick={() => shareTwitter(data.name, data.title)}
                                    className="btn-outline cursor-target"
                                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', padding: '10px 16px', borderColor: '#1DA1F2', color: '#1DA1F2' }}
                                >
                                    ✦ TWITTER
                                </button>
                                <button
                                    onClick={copyLink}
                                    className="btn-outline cursor-target"
                                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', padding: '10px 16px' }}
                                >
                                    ◈ COPY LINK
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            )}

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
        </div>
    )
}
