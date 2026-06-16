'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
    useEffect(() => {
        const handler = () => {
            const nav = document.querySelector('nav') as HTMLElement
            if (nav) {
                nav.style.borderBottomColor =
                    window.scrollY > 40 ? 'var(--violet)' : 'var(--border)'
            }
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    return (
        <nav>
            <div className="logo">
                <span className="logo-dot"></span>
                Future<em>Bridge</em>
            </div>
            <ul className="nav-links">
                <li><a href="#about">Tentang</a></li>
                <li><a href="#characters">Karakter</a></li>
                <li><a href="#how">Cara Kerja</a></li>
                <li><a href="#features">Fitur</a></li>
            </ul>
            <Link href="/story">
                <button className="nav-btn cursor-target">▶ MULAI CERITA</button>
            </Link>
        </nav>
    )
}
