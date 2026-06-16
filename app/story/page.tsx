'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import StarCanvas from '@/components/StarCanvas'

/* ── Cutscene data ─────────────────────────────────────────── */
// Scene id 5 (pilih karakter) dihapus — langsung ke tes setelah Raka
const scenes = [
    {
        id: 0,
        character: null,
        text: 'Di suatu kota yang penuh cahaya neon dan layar hologram...',
        subtext: 'Somewhere in a city of neon lights and holographic screens...',
        showBook: true,
    },
    {
        id: 1,
        character: 'ALYA',
        color: '#FF6B9D',
        text: '"Setiap orang punya potensi tersembunyi yang menunggu untuk ditemukan."',
        subtext: '"Everyone has a hidden potential waiting to be discovered."',
        showBook: false,
    },
    {
        id: 2,
        character: 'BIMA',
        color: '#7B2FFF',
        text: '"Tapi bagaimana caranya kita tahu apa yang benar-benar kita inginkan?"',
        subtext: '"But how do we know what we truly want?"',
        showBook: false,
    },
    {
        id: 3,
        character: 'NARA',
        color: '#FFD700',
        text: '"Mungkin... kita hanya perlu membuat satu pilihan pada satu waktu."',
        subtext: '"Maybe... we just need to make one choice at a time."',
        showBook: false,
    },
    {
        id: 4,
        character: 'RAKA',
        color: '#00F5D4',
        text: '"FutureBridge sudah menunggu. Petualanganmu dimulai sekarang."',
        subtext: '"FutureBridge is waiting. Your adventure begins now."',
        showBook: false,
        isFinal: true, // scene terakhir — tombol jadi MULAI PETUALANGAN
    },
]

/* ── Pixel character SVGs ──────────────────────────────────── */
function AlySvg() {
    return (
        <svg width="96" height="120" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
function BimaSvg() {
    return (
        <svg width="96" height="120" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
function NaraSvg() {
    return (
        <svg width="96" height="120" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
function RakaSvg() {
    return (
        <svg width="96" height="120" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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

const charMap: Record<string, { svg: React.ReactNode; color: string }> = {
    ALYA: { svg: <AlySvg />, color: '#FF6B9D' },
    BIMA: { svg: <BimaSvg />, color: '#7B2FFF' },
    NARA: { svg: <NaraSvg />, color: '#FFD700' },
    RAKA: { svg: <RakaSvg />, color: '#00F5D4' },
}

/* ── Pixel Book SVG ────────────────────────────────────────── */
function PixelBook() {
    return (
        <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
            <rect x="6" y="8" width="52" height="44" fill="#1C1C36" />
            <rect x="8" y="10" width="48" height="40" fill="#2A1A6E" />
            <rect x="6" y="8" width="6" height="44" fill="#4A1AAA" />
            <rect x="7" y="9" width="4" height="42" fill="#7B2FFF" />
            <rect x="54" y="10" width="4" height="40" fill="#F0EEF8" />
            <rect x="55" y="11" width="2" height="38" fill="#DEDCF0" />
            <rect x="16" y="14" width="2" height="2" fill="#FFD700" />
            <rect x="22" y="12" width="2" height="2" fill="#00F5D4" />
            <rect x="30" y="16" width="2" height="2" fill="#FF6B9D" />
            <rect x="40" y="13" width="2" height="2" fill="#7B2FFF" />
            <rect x="46" y="15" width="2" height="2" fill="#FFD700" />
            <rect x="14" y="20" width="36" height="3" fill="#7B2FFF" />
            <rect x="16" y="25" width="28" height="2" fill="#00F5D4" />
            <rect x="27" y="30" width="10" height="12" fill="#7B2FFF" />
            <rect x="28" y="28" width="8" height="5" fill="#FFCBA4" />
            <rect x="29" y="29" width="2" height="1" fill="#1A0A12" />
            <rect x="33" y="29" width="2" height="1" fill="#1A0A12" />
            <rect x="14" y="36" width="16" height="1" fill="#2A1A6E" />
            <rect x="14" y="38" width="22" height="1" fill="#2A1A6E" />
            <rect x="14" y="40" width="18" height="1" fill="#2A1A6E" />
            <rect x="8" y="48" width="48" height="2" fill="#1C1C36" />
            <rect x="8" y="50" width="48" height="1" fill="#0A0A1A" />
        </svg>
    )
}

/* ── Main Component ────────────────────────────────────────── */
export default function StoryPage() {
    const router = useRouter()
    const [sceneIdx, setSceneIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [visible, setVisible] = useState(true)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const scene = scenes[sceneIdx]
    const isFinal = !!(scene as any).isFinal

    /* typewriter effect */
    useEffect(() => {
        setDisplayed('')
        setIsDone(false)
        let i = 0
        const full = scene.text

        function tick() {
            i++
            setDisplayed(full.slice(0, i))
            if (i < full.length) timeoutRef.current = setTimeout(tick, 38)
            else setIsDone(true)
        }
        timeoutRef.current = setTimeout(tick, 300)
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
    }, [sceneIdx, scene.text])

    function handleBtn() {
        // Kalau teks belum selesai → skip ke akhir teks
        if (!isDone) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setDisplayed(scene.text)
            setIsDone(true)
            return
        }
        // Kalau ini scene terakhir → langsung ke tes
        if (isFinal) {
            router.push('/story/test')
            return
        }
        // Kalau bukan scene terakhir → ke scene berikutnya
        setVisible(false)
        setTimeout(() => {
            setSceneIdx(i => i + 1)
            setVisible(true)
        }, 300)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '20px 20px',
                fontFamily: "'VT323', monospace",
            }}>
            <StarCanvas />

            {/* Back button */}
            <button
                className="cursor-target"
                onClick={() => router.push('/')}
                style={{
                    position: 'absolute', top: '24px', left: '24px',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '8px', color: 'var(--muted)',
                    background: 'transparent', border: '2px solid var(--border)',
                    padding: '8px 14px', cursor: 'pointer', zIndex: 10,
                    transition: 'color .15s, border-color .15s',
                }}
                onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = 'var(--cyan)'
                        ; (e.target as HTMLElement).style.borderColor = 'var(--cyan)'
                }}
                onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'var(--muted)'
                        ; (e.target as HTMLElement).style.borderColor = 'var(--border)'
                }}
            >
                ◀ BACK
            </button>

            {/* Scene counter */}
            <div style={{
                position: 'absolute', top: '28px', right: '28px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '7px', color: 'var(--muted)',
            }}>
                {sceneIdx + 1} / {scenes.length}
            </div>

            {/* ── CUTSCENE BOX ── */}
            <div style={{
                maxWidth: '720px', width: '100%',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}>

                {/* Pixel art area */}
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    marginBottom: '16px', minHeight: '140px', alignItems: 'flex-end',
                }}>
                    {scene.showBook && (
                        <div style={{ animation: 'cfloat 3s ease-in-out infinite' }}>
                            <PixelBook />
                        </div>
                    )}
                    {scene.character && charMap[scene.character] && (
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                            animation: 'cfloat 3s ease-in-out infinite',
                        }}>
                            {charMap[scene.character].svg}
                            <span style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: '8px', color: charMap[scene.character].color,
                                letterSpacing: '2px',
                            }}>
                                {scene.character}
                            </span>
                        </div>
                    )}
                </div>

                {/* Dialog box */}
                <div style={{
                    border: '2px solid var(--violet)',
                    background: 'rgba(10,10,26,0.92)',
                    padding: '32px 36px',
                    position: 'relative',
                    backdropFilter: 'blur(8px)',
                }}>
                    {/* Corner decorations */}
                    {['0,0', 'calc(100% - 10px),0', '0,calc(100% - 10px)', 'calc(100% - 10px),calc(100% - 10px)'].map((pos, i) => {
                        const [l, t] = pos.split(',')
                        return (
                            <div key={i} style={{
                                position: 'absolute', left: l, top: t,
                                width: '10px', height: '10px',
                                background: 'var(--violet)',
                            }} />
                        )
                    })}

                    {scene.character && (
                        <div style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '8px',
                            color: charMap[scene.character]?.color ?? 'var(--cyan)',
                            marginBottom: '14px', letterSpacing: '2px',
                        }}>
                            [{scene.character}]
                        </div>
                    )}

                    <p style={{
                        fontSize: '22px', color: 'var(--text)',
                        lineHeight: '1.8', marginBottom: '10px', minHeight: '60px',
                    }}>
                        {displayed}
                        {!isDone && <span className="cursor" />}
                    </p>

                    <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: '1.6', fontStyle: 'italic' }}>
                        {scene.subtext}
                    </p>
                </div>

                {/* Action button — satu tombol untuk semua state */}
                <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <span style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '7px', color: 'var(--muted)',
                    }}>
                        {!isDone
                            ? 'CLICK TO SKIP'
                            : isFinal
                                ? 'SIAP UNTUK MEMULAI?'
                                : 'PRESS NEXT TO CONTINUE'}
                    </span>
                    <button
                        className="cursor-target"
                        onClick={handleBtn}
                        style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '8px', padding: '12px 24px',
                            background: isDone
                                ? isFinal ? 'var(--cyan)' : 'var(--violet)'
                                : 'transparent',
                            color: isDone ? '#0A0A1A' : 'var(--muted)',
                            border: isDone ? 'none' : '2px solid var(--border)',
                            cursor: 'pointer',
                            boxShadow: isDone
                                ? isFinal
                                    ? '3px 3px 0 #009E88'
                                    : '3px 3px 0 var(--violet-d)'
                                : 'none',
                            transition: 'all 0.1s',
                        }}
                    >
                        {!isDone
                            ? '▶▶ SKIP'
                            : isFinal
                                ? '▶ MULAI PETUALANGAN'
                                : '▶ NEXT'}
                    </button>
                </div>

            </div>
        </div>
    )
}
