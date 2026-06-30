'use client'
import { useState } from 'react'

const demoResults: Record<string, string> = {
    empati: '✦ Kamu menunjukkan empati tinggi dan suka membantu! Bidang yang mungkin cocok: Kedokteran, Psikologi, Pendidikan.',
    logika: '◈ Kamu berpikir logis dan solutif! Bidang yang mungkin cocok: Informatika, Teknik, Data Science.',
    kreatif: '✦ Kamu kreatif dan inovatif! Bidang yang mungkin cocok: Desain, Komunikasi, Seni Rupa.',
    teknis: '⚙ Kamu peneliti dan suka eksplorasi! Bidang yang mungkin cocok: Teknik Komputer, Informatika, Sistem Informasi.',
}

export default function Characters() {
    const [selected, setSelected] = useState<string | null>(null)

    return (
        <section className="sec" id="characters">
            <div className="inner">
                <div className="sec-center">
                    <span className="eyebrow">KARAKTER CERITA</span>
                    <h2 className="sec-title">Temui Para Karakter</h2>
                    <p>Anak-anak akan berteman dengan 4 karakter unik, masing-masing dengan mimpi dan kepribadian berbeda.</p>
                </div>

                <div className="char-cards">

                    {/* Alya */}
                    <div className="char-card alya">
                        <svg className="char-sprite" width="72" height="90" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
                        <div className="char-name">Alya</div>
                        <p className="char-desc">Suka membantu orang yang sedang kesulitan atau sakit. Selalu ada untuk teman-temannya.</p>
                        <span className="char-tag">♥ KESEHATAN</span>
                    </div>

                    {/* Bima */}
                    <div className="char-card bima">
                        <svg className="char-sprite" width="72" height="90" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
                        <div className="char-name">Bima</div>
                        <p className="char-desc">Senang memecahkan teka-teki dan mencari solusi dari masalah yang paling rumit sekalipun.</p>
                        <span className="char-tag">◈ LOGIKA</span>
                    </div>

                    {/* Nara */}
                    <div className="char-card nara">
                        <svg className="char-sprite" width="72" height="90" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
                        <div className="char-name">Nara</div>
                        <p className="char-desc">Jiwa seni yang tinggi. Selalu menuangkan ide dan imajinasi lewat gambar dan kreasi unik.</p>
                        <span className="char-tag">✦ SENI &amp; DESAIN</span>
                    </div>

                    {/* Raka */}
                    <div className="char-card raka">
                        <svg className="char-sprite" width="72" height="90" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
                        <div className="char-name">Raka</div>
                        <p className="char-desc">Hobi membongkar dan memperbaiki barang elektronik. Penasaran dengan cara kerja teknologi.</p>
                        <span className="char-tag">⚙ TEKNOLOGI</span>
                    </div>

                </div>

                {/* Mini demo */}
                <div className="demo-box">
                    <span className="demo-label">▶ COBA MINI DEMO</span>
                    <p className="demo-q">Temanmu kesulitan mengerjakan soal matematika sebelum ujian. Apa yang kamu lakukan?</p>
                    <div className="demo-opts">
                        <button className={`demo-opt cursor-target${selected === 'empati' ? ' selected' : ''}`} onClick={() => setSelected('empati')}>A. Langsung duduk di sampingnya dan bantu jelaskan pelan-pelan</button>
                        <button className={`demo-opt cursor-target${selected === 'logika' ? ' selected' : ''}`} onClick={() => setSelected('logika')}>B. Buatkan rangkuman dan metode cepat untuk menyelesaikannya</button>
                        <button className={`demo-opt cursor-target${selected === 'kreatif' ? ' selected' : ''}`} onClick={() => setSelected('kreatif')}>C. Bikin cara belajar yang seru supaya tidak membosankan</button>
                        <button className={`demo-opt cursor-target${selected === 'teknis' ? ' selected' : ''}`} onClick={() => setSelected('teknis')}>D. Cari referensi dan tools online yang bisa membantu</button>
                    </div>
                    {selected && (
                        <div className="demo-result show">
                            <p>{demoResults[selected]}</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}
