'use client'
import { useEffect, useRef } from 'react'

export default function StarCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        let animId: number

        type Star = {
            x: number; y: number; size: number
            speed: number; color: string; blink: number
        }
        let stars: Star[] = []

        function resize() {
            canvas!.width = window.innerWidth
            canvas!.height = window.innerHeight
        }

        function initStars() {
            stars = []
            for (let i = 0; i < 80; i++) {
                stars.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height,
                    size: Math.random() < 0.7 ? 2 : 4,
                    speed: Math.random() * 0.5 + 0.2,
                    color: ['#F0EEF8', '#7B2FFF', '#00F5D4', '#FFD700'][Math.floor(Math.random() * 4)],
                    blink: Math.random() * Math.PI * 2,
                })
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height)
            stars.forEach(s => {
                s.blink += s.speed * 0.03
                const alpha = (Math.sin(s.blink) * 0.5 + 0.5) * 0.8 + 0.1
                ctx.fillStyle = s.color
                ctx.globalAlpha = alpha
                ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size)
            })
            ctx.globalAlpha = 1
            animId = requestAnimationFrame(draw)
        }

        const handleResize = () => { resize(); initStars() }
        window.addEventListener('resize', handleResize)
        resize()
        initStars()
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <canvas id="star-canvas" ref={canvasRef} />
}
