export default function Pitch() {
    return (
        <section className="sec sec-dark" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="pitch-glow"></div>
            <div className="pitch-inner">
                <span className="pitch-eyebrow">// VISI KAMI</span>
                <div className="pitch-quote">
                    &quot;Kami mengembangkan<br />
                    <span className="v">Interactive Storybook berbasis AI</span><br />
                    yang membantu anak-anak mengenali<br />
                    <span className="g">minat</span>, <span className="p">potensi</span>, dan <span className="c">cita-cita</span> mereka<br />
                    melalui pengalaman membaca<br />
                    yang interaktif dan menyenangkan.&quot;
                </div>
                <div className="pitch-tags">
                    <span className="pitch-tag">AI-POWERED</span>
                    <span className="pitch-tag">LITERASI DIGITAL</span>
                    <span className="pitch-tag">CAREER DISCOVERY</span>
                    <span className="pitch-tag">NILAI SOSIAL</span>
                    <span className="pitch-tag">INTERAKTIF</span>
                    <span className="pitch-tag">EDUKATIF</span>
                </div>
            </div>
        </section>
    )
}
