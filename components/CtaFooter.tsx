import Link from 'next/link'

export function Cta() {
    return (
        <section className="sec cta-sec">
            <div className="inner">
                <h2 className="cta-title">Siap Memulai Petualangan?</h2>
                <p className="cta-sub">Buka buku, buat pilihan, temukan siapa dirimu.</p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/story">
                        <button className="btn-primary cursor-target">▶ MULAI MEMBACA SEKARANG</button>
                    </Link>
                    <a href="#about">
                        <button className="btn-outline cursor-target">◈ PELAJARI LEBIH LANJUT</button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export function Footer() {
    return (
        <footer>
            <div className="footer-logo">Future<span style={{ color: 'var(--violet)' }}>Bridge</span> Story</div>
            <p className="footer-text">© 2025 FutureBridge Story Edition — Showcase</p>
        </footer>
    )
}
