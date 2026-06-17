'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StarCanvas from '@/components/StarCanvas'
import soalMinatRaw from '@/data/soal-minat.json'
import soalBakatRaw from '@/data/soal-bakat.json'

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type MinatSkor = { R?: number; I?: number; A?: number; S?: number; E?: number; C?: number }
type BakatSkor = { verbal?: number; numerik?: number; abstrak?: number; spasial?: number }

type Opsi = {
    label: string
    teks: string
    benar?: boolean
    skor: MinatSkor & BakatSkor
}

type Soal = {
    id: string
    type: 'minat' | 'bakat'
    kategori: string
    skenario: string
    opsi: Opsi[]
}

const allSoal = [...soalMinatRaw, ...soalBakatRaw] as Soal[]
const TOTAL = allSoal.length
const MINAT_COUNT = soalMinatRaw.length // 40

/* ─────────────────────────────────────────
   CHARACTER CONFIG
───────────────────────────────────────── */
type CharKey = 'alya' | 'bima' | 'nara' | 'raka'

const charConfig: Record<CharKey, {
    color: string
    label: string
    tag: string
    narasi: Partial<Record<string, string>> & { default: string }
}> = {
    alya: {
        color: 'var(--pink)',
        label: 'ALYA',
        tag: '♥ KESEHATAN',
        narasi: {
            default: 'Alya menatapmu dengan hangat dan bertanya...',
            verbal: 'Alya memberikanmu sebuah teka-teki kata...',
        },
    },
    bima: {
        color: 'var(--violet)',
        label: 'BIMA',
        tag: '◈ LOGIKA',
        narasi: {
            default: 'Bima menyesuaikan kacamatanya dan bertanya...',
            numerik: 'Bima menunjukkan pola angka di catatannya...',
            gaya_belajar: 'Bima penasaran dengan caramu berpikir...',
        },
    },
    nara: {
        color: 'var(--gold)',
        label: 'NARA',
        tag: '✦ SENI & DESAIN',
        narasi: {
            default: 'Nara berhenti menggambar dan menatapmu...',
            aktivitas: 'Nara mengangkat pensilnya sambil tersenyum...',
            spasial: 'Nara membuka sketsanya dan bertanya...',
        },
    },
    raka: {
        color: 'var(--cyan)',
        label: 'RAKA',
        tag: '⚙ TEKNOLOGI',
        narasi: {
            default: 'Raka menoleh dari layar komputernya...',
            profesi: 'Raka menutup laptopnya dan bertanya...',
            abstrak: 'Raka menampilkan sebuah pola misterius...',
        },
    },
}

function getChar(soal: Soal): CharKey {
    if (soal.type === 'bakat') {
        if (soal.kategori === 'verbal') return 'alya'
        if (soal.kategori === 'numerik') return 'bima'
        if (soal.kategori === 'abstrak') return 'raka'
        if (soal.kategori === 'spasial') return 'nara'
    }
    if (soal.kategori === 'aktivitas') return 'nara'
    if (soal.kategori === 'profesi') return 'raka'
    if (soal.kategori === 'gaya_belajar') return 'bima'
    return 'alya'
}

/* ─────────────────────────────────────────
   SCORE CALCULATION
───────────────────────────────────────── */
function calculateScores(answers: Record<string, string>) {
    const riasec = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
    const bakat = { verbal: 0, numerik: 0, abstrak: 0, spasial: 0 }

    allSoal.forEach(soal => {
        const chosen = answers[soal.id]
        if (!chosen) return
        const opsi = soal.opsi.find(o => o.label === chosen)
        if (!opsi) return

        if (soal.type === 'minat') {
            const s = opsi.skor as MinatSkor
            riasec.R += s.R || 0
            riasec.I += s.I || 0
            riasec.A += s.A || 0
            riasec.S += s.S || 0
            riasec.E += s.E || 0
            riasec.C += s.C || 0
        } else {
            const s = opsi.skor as BakatSkor
            bakat.verbal += s.verbal || 0
            bakat.numerik += s.numerik || 0
            bakat.abstrak += s.abstrak || 0
            bakat.spasial += s.spasial || 0
        }
    })

    const riasecToChar: Record<string, CharKey> = {
        R: 'raka', I: 'bima', A: 'nara', S: 'alya', E: 'raka', C: 'bima',
    }
    const dominant = (Object.keys(riasec) as (keyof typeof riasec)[])
        .reduce((a, b) => (riasec[a] >= riasec[b] ? a : b))

    return { riasec, bakat, character: riasecToChar[dominant], dominant }
}

/* ─────────────────────────────────────────
   PIXEL CHARACTER SPRITES
───────────────────────────────────────── */
function SpriteAlya() {
    return (
        <svg width="80" height="100" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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

function SpriteBima() {
    return (
        <svg width="80" height="100" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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

function SpriteNara() {
    return (
        <svg width="80" height="100" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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

function SpriteRaka() {
    return (
        <svg width="80" height="100" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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

const sprites: Record<CharKey, React.ReactNode> = {
    alya: <SpriteAlya />,
    bima: <SpriteBima />,
    nara: <SpriteNara />,
    raka: <SpriteRaka />,
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function TestPage() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selected, setSelected] = useState<string | null>(null)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [hydrated, setHydrated] = useState(false)
    const [fadeIn, setFadeIn] = useState(true)
    const [showTransition, setShowTransition] = useState(false)

    useEffect(() => {
        const savedIndex = parseInt(localStorage.getItem('fb-index') || '0')
        const savedAnswers = localStorage.getItem('fb-answers')
        if (savedIndex > 0) setCurrentIndex(savedIndex)
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
        setHydrated(true)
    }, [])

    /* ── Keyboard support ── */
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            // Enter → next
            if (e.key === 'Enter' && selected) {
                handleNext()
                return
            }
            // A/B/C/D → pilih jawaban
            const map: Record<string, string> = { a: 'A', b: 'B', c: 'C', d: 'D' }
            if (map[e.key.toLowerCase()]) {
                setSelected(map[e.key.toLowerCase()])
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, currentIndex])

    const soal = allSoal[currentIndex]
    const char = getChar(soal)
    const cfg = charConfig[char]
    const narasi = cfg.narasi[soal.kategori] ?? cfg.narasi.default
    const progress = (currentIndex / TOTAL) * 100

    if (!hydrated) return null

    /* ── Next handler with fade ── */
    function handleNext() {
        if (!selected) return
        const newAnswers = { ...answers, [soal.id]: selected }
        setAnswers(newAnswers)

        if (currentIndex === TOTAL - 1) {
            const result = calculateScores(newAnswers)
            sessionStorage.setItem('futurebridge-result', JSON.stringify(result))
            localStorage.removeItem('fb-answers')
            localStorage.removeItem('fb-index')
            router.push('/story/result')
            return
        }

        localStorage.setItem('fb-answers', JSON.stringify(newAnswers))
        localStorage.setItem('fb-index', String(currentIndex + 1))

        // Transition banner antara minat → bakat
        const isLastMinat = currentIndex === MINAT_COUNT - 1
        if (isLastMinat) {
            setFadeIn(false)
            setTimeout(() => {
                setShowTransition(true)
                setTimeout(() => {
                    setShowTransition(false)
                    setSelected(newAnswers[allSoal[currentIndex + 1].id] ?? null)
                    setCurrentIndex(i => i + 1)
                    setFadeIn(true)
                }, 2200)
            }, 200)
            return
        }

        // Normal → fade out → ganti soal → fade in
        setFadeIn(false)
        setTimeout(() => {
            setSelected(newAnswers[allSoal[currentIndex + 1].id] ?? null)
            setCurrentIndex(i => i + 1)
            setFadeIn(true)
        }, 180)
    }

    /* ── Back handler ── */
    function handleBack() {
        if (currentIndex === 0) {
            router.push('/story')
            return
        }
        setFadeIn(false)
        setTimeout(() => {
            const prev = allSoal[currentIndex - 1]
            setCurrentIndex(i => i - 1)
            setSelected(answers[prev.id] || null)
            setFadeIn(true)
        }, 180)
    }

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px 60px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <StarCanvas />

            {/* ── Transition Banner: Minat → Bakat ── */}
            {showTransition && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 200,
                    background: 'rgba(10,10,26,0.97)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '24px',
                    animation: 'fadeIn 0.4s ease',
                }}>
                    <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '10px', color: 'var(--gold)', letterSpacing: '3px',
                    }}>
                        ✦ BAGIAN 1 SELESAI ✦
                    </div>
                    <div style={{
                        fontFamily: "'VT323', monospace",
                        fontSize: '28px', color: 'var(--text)', textAlign: 'center',
                        maxWidth: '500px', lineHeight: 1.5,
                    }}>
                        Bagus! Sekarang kita masuk ke Tes Bakat...
                    </div>
                    <div style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '7px', color: 'var(--cyan)', letterSpacing: '2px',
                    }}>
                        ◈ PERHATIAN: DI BAGIAN INI ADA JAWABAN BENAR
                    </div>
                    <div style={{
                        width: '200px', height: '3px',
                        background: 'var(--border)', marginTop: '8px',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'var(--cyan)',
                            animation: 'loadingBar 2s linear forwards',
                        }} />
                    </div>
                </div>
            )}

            {/* ── Top bar ── */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 32px',
                background: 'rgba(10,10,26,0.92)',
                borderBottom: '2px solid var(--border)',
                backdropFilter: 'blur(12px)',
            }}>
                <button
                    onClick={handleBack}
                    className="btn-outline cursor-target"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', padding: '8px 16px' }}
                >
                    ◀ BACK
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: 'var(--muted)' }}>
                        {currentIndex + 1} <span style={{ color: cfg.color }}>/</span> {TOTAL}
                    </span>
                    <div style={{ width: '160px', height: '4px', background: 'var(--border)', position: 'relative' }}>
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: cfg.color,
                            transition: 'width 0.4s ease, background 0.4s ease',
                            boxShadow: `0 0 8px ${cfg.color}`,
                        }} />
                    </div>
                    <span style={{
                        fontFamily: "'Press Start 2P', monospace", fontSize: '5px',
                        color: soal.type === 'bakat' ? 'var(--gold)' : 'var(--muted)',
                        letterSpacing: '1px',
                    }}>
                        {soal.type === 'bakat' ? '◈ BAKAT' : '✦ MINAT'}
                    </span>
                </div>
            </div>

            {/* ── Keyboard hint ── */}
            <div style={{
                position: 'fixed', bottom: '20px', right: '24px', zIndex: 50,
                fontFamily: "'Press Start 2P', monospace", fontSize: '5px',
                color: 'var(--border)', letterSpacing: '1px', textAlign: 'right',
                lineHeight: 2,
            }}>
                <div>A B C D → PILIH</div>
                <div>ENTER → NEXT</div>
            </div>

            {/* ── Main content with fade ── */}
            <div style={{
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity 0.18s ease',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', width: '100%',
            }}>
                {/* ── Character sprite ── */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '10px', marginBottom: '24px', zIndex: 1,
                    animation: 'cfloat 3s ease-in-out infinite',
                }}>
                    {sprites[char]}
                    <span style={{
                        fontFamily: "'Press Start 2P', monospace", fontSize: '6px',
                        color: cfg.color, letterSpacing: '3px',
                    }}>
                        {cfg.label}
                    </span>
                    <span style={{
                        fontFamily: "'Press Start 2P', monospace", fontSize: '5px',
                        color: cfg.color, opacity: 0.6,
                        border: `1px solid ${cfg.color}`, padding: '3px 8px',
                    }}>
                        {cfg.tag}
                    </span>
                </div>

                {/* ── Question box ── */}
                <div style={{
                    width: '100%', maxWidth: '700px',
                    border: `2px solid ${cfg.color}`,
                    padding: '32px 36px',
                    background: 'rgba(10,10,26,0.92)',
                    position: 'relative', zIndex: 1, marginBottom: '16px',
                    boxShadow: `0 0 24px ${cfg.color}22`,
                }}>
                    {/* Corner brackets */}
                    {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
                        <div key={pos} style={{
                            position: 'absolute',
                            top: pos.startsWith('t') ? -2 : 'auto',
                            bottom: pos.startsWith('b') ? -2 : 'auto',
                            left: pos.endsWith('l') ? -2 : 'auto',
                            right: pos.endsWith('r') ? -2 : 'auto',
                            width: 12, height: 12,
                            borderColor: cfg.color,
                            borderStyle: 'solid', borderWidth: 0,
                            borderTopWidth: pos.startsWith('t') ? 3 : 0,
                            borderBottomWidth: pos.startsWith('b') ? 3 : 0,
                            borderLeftWidth: pos.endsWith('l') ? 3 : 0,
                            borderRightWidth: pos.endsWith('r') ? 3 : 0,
                        }} />
                    ))}

                    {/* Narrator line */}
                    <p style={{
                        fontFamily: "'VT323', monospace", fontSize: '18px',
                        color: 'var(--muted)', fontStyle: 'italic',
                        marginBottom: '14px', lineHeight: 1.5,
                    }}>
                        {narasi}
                    </p>

                    {/* Question text */}
                    <p style={{
                        fontFamily: "'VT323', monospace", fontSize: '22px',
                        color: 'var(--text)', lineHeight: 1.65,
                    }}>
                        {soal.skenario}
                    </p>

                    {/* Badge for bakat */}
                    {soal.type === 'bakat' && (
                        <span style={{
                            display: 'inline-block', marginTop: '16px',
                            fontFamily: "'Press Start 2P', monospace", fontSize: '6px',
                            color: 'var(--gold)',
                            border: '1px solid var(--gold)',
                            padding: '4px 10px',
                        }}>
                            ◈ ADA JAWABAN BENAR
                        </span>
                    )}
                </div>

                {/* ── Options ── */}
                <div style={{
                    width: '100%', maxWidth: '700px',
                    display: 'flex', flexDirection: 'column', gap: '10px',
                    zIndex: 1, marginBottom: '28px',
                }}>
                    {soal.opsi.map(opsi => (
                        <button
                            key={opsi.label}
                            onClick={() => setSelected(opsi.label)}
                            className={`demo-opt cursor-target${selected === opsi.label ? ' selected' : ''}`}
                            style={{
                                fontSize: '20px', textAlign: 'left',
                                borderColor: selected === opsi.label ? cfg.color : undefined,
                                color: selected === opsi.label ? cfg.color : undefined,
                                background: selected === opsi.label
                                    ? `${cfg.color}12`
                                    : 'transparent',
                                transition: 'all 0.12s',
                            }}
                        >
                            <span style={{
                                fontFamily: "'Press Start 2P', monospace", fontSize: '7px',
                                marginRight: '12px', color: cfg.color, opacity: 0.7,
                            }}>
                                {opsi.label}.
                            </span>
                            {opsi.teks}
                        </button>
                    ))}
                </div>

                {/* ── Bottom nav ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1 }}>
                    <span style={{
                        fontFamily: "'Press Start 2P', monospace", fontSize: '6px',
                        color: selected ? 'var(--muted)' : 'var(--border)',
                        letterSpacing: '1px',
                        transition: 'color 0.2s',
                    }}>
                        {selected ? 'PRESS NEXT / ENTER' : 'PILIH SALAH SATU'}
                    </span>
                    <button
                        className="nav-btn cursor-target"
                        onClick={handleNext}
                        disabled={!selected}
                        style={{
                            opacity: selected ? 1 : 0.35,
                            cursor: selected ? 'pointer' : 'not-allowed',
                            background: selected ? cfg.color : 'var(--border)',
                            boxShadow: selected ? `4px 4px 0 ${cfg.color}66` : 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        {currentIndex === TOTAL - 1 ? '✦ LIHAT HASIL' : '▶ NEXT'}
                    </button>
                </div>
            </div>
        </main>
    )
}
