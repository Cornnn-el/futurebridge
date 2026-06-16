export default function About() {
    return (
        <section className="sec sec-dark" id="about">
            <div className="inner">
                <div className="about-grid">
                    <div className="about-text">
                        <span className="eyebrow">// TENTANG PROYEK</span>
                        <h2 className="sec-title">Bukan Sekadar Tes Minat Biasa</h2>
                        <p>
                            FutureBridge Story Edition adalah <strong>Interactive Storybook berbasis AI</strong>
                            {' '}yang membantu anak-anak mengenali minat, potensi, dan cita-cita mereka.
                        </p>
                        <p>
                            Alih-alih mengisi kuesioner formal yang membingungkan, anak-anak cukup{' '}
                            <strong>membaca cerita</strong> dan membuat pilihan seperti dalam petualangan interaktif.
                        </p>
                        <p>
                            Setiap pilihan direkam oleh sistem AI kami, lalu dianalisis untuk menghasilkan
                            rekomendasi bidang studi yang personal.
                        </p>
                        <div className="stat-grid">
                            <div className="stat-card">
                                <span className="stat-num">4</span>
                                <span className="stat-label">Karakter Cerita</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-num">AI</span>
                                <span className="stat-label">Analisis Pilihan</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-num">∞</span>
                                <span className="stat-label">Jalur Cerita</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-num">100%</span>
                                <span className="stat-label">Fun &amp; Edukatif</span>
                            </div>
                        </div>
                    </div>

                    {/* Pixel book illustration */}
                    <div className="about-visual">
                        <svg width="260" height="260" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
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
                    </div>
                </div>
            </div>
        </section>
    )
}
