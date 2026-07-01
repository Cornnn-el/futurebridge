import { NextResponse } from 'next/server'

// Route ini jalan di SERVER (bukan browser), jadi GEMINI_API_KEY aman di sini.
// Ambil key dari .env.local — JANGAN pernah taruh key ini di kode client (page.tsx dsb).

type RiasecKey = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

interface AnalyzeBody {
    riasec: Record<RiasecKey, number>
    bakat: { verbal: number; numerik: number; abstrak: number; spasial: number }
    character: string
    dominant: RiasecKey
    answers?: Record<string, string>
    openAnswers?: Record<string, string>
}

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY belum diset di server (.env.local)' },
                { status: 500 }
            )
        }

        const body: AnalyzeBody = await req.json()
        const { riasec, bakat, character, dominant, openAnswers } = body

        if (!riasec || !bakat || !character || !dominant) {
            return NextResponse.json({ error: 'Data hasil tes tidak lengkap' }, { status: 400 })
        }

        const jawabanTerbuka =
            openAnswers && Object.keys(openAnswers).length > 0
                ? Object.entries(openAnswers)
                    .map(([id, teks]) => `- ${teks}`)
                    .join('\n')
                : '(siswa tidak menulis jawaban terbuka apa pun)'

        const prompt = `Kamu adalah kakak mentor karir yang asik, hangat, dan ngerti banget dunia siswa SMA di Indonesia. Kamu lagi ngasih hasil "pembacaan karakter" ke siswa yang baru selesai ngerjain tes minat & bakat di sebuah web interaktif bertema game/petualangan.

Tulis analisis dengan gaya:
- Ngobrol langsung ke siswanya pakai "kamu", bukan "Anda". Nada kayak kakak yang beneran kenal dia, bukan laporan psikotes.
- Bahasa sehari-hari yang natural, boleh santai, TAPI tetap sopan dan membangun — hindari bahasa baku/kaku ala formulir resmi (contoh yang HARUS dihindari: "Berdasarkan hasil asesmen", "individu tersebut", "menunjukkan kecenderungan yang signifikan").
- Jangan mendaftar/listing seperti laporan ("Kekuatan: ...", "Karakter: ..."). Tulis mengalir sebagai cerita/obrolan, bukan poin-poin.
- Sebisa mungkin nyambungin ke hal konkret yang siswa sebutin sendiri di jawaban reflektifnya (kalau ada) — biar berasa personal, bukan template generik.
- JANGAN sebut angka skor mentah atau kode RIASEC (jangan tulis "R", "I", "skor 85", dsb) — terjemahkan semua ke bahasa manusia biasa.
- Hindari kalimat pembuka basa-basi yang generik kayak "Senang sekali melihat hasil tesmu" — langsung masuk ke insight yang related sama dia.

Struktur 4 paragraf pendek (2-4 kalimat tiap paragraf):
1. Buka dengan hal paling menonjol/unik dari karakternya — sesuatu yang bikin dia mikir "eh, ini gue banget"
2. Gali lebih dalam soal cara dia berpikir, bekerja, atau berinteraksi dengan orang lain / masalah
3. WAJIB sebutkan 2-3 contoh jurusan kuliah DAN 2-3 contoh profesi/karir yang konkret dan relevan — sebut nama jurusan & karirnya secara eksplisit (bukan cuma "bidang yang butuh analisis"), tapi tetap dijelaskan secara mengalir/naratif, bukan bullet list. Kaitkan ke jawaban reflektif siswa kalau ada, biar berasa personal.
4. Tutup dengan dorongan yang personal dan believable — bukan quote motivasi generik, tapi kayak kakak yang beneran percaya sama potensinya

PENTING: JANGAN sebut nama universitas/kampus spesifik (contoh: UI, ITB, UGM, dll) — cukup fokus ke nama jurusan dan profesinya aja. Info soal universitas gampang berubah dan bisa bikin siswa ngerasa terbatas hanya ke kampus tertentu.

Data buat kamu olah (JANGAN ditulis ulang mentah-mentah ke siswa):
Skor RIASEC: ${JSON.stringify(riasec)}
Dimensi RIASEC dominan: ${dominant}
Skor bakat kognitif: ${JSON.stringify(bakat)}
Karakter hasil pemetaan sistem: ${character}

Jawaban reflektif siswa (dari pertanyaan terbuka, kalau ada — manfaatkan ini sebanyak mungkin buat personalisasi):
${jawabanTerbuka}`

        const geminiRes = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.9,
                        topP: 0.95,
                    },
                }),
            }
        )

        if (!geminiRes.ok) {
            const errText = await geminiRes.text()
            console.error('Gemini API error:', geminiRes.status, errText)
            return NextResponse.json({ error: 'Gagal menghubungi Gemini API' }, { status: 502 })
        }

        const geminiData = await geminiRes.json()
        const text: string | undefined = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) {
            console.error('Gemini response kosong/tidak terduga:', JSON.stringify(geminiData))
            return NextResponse.json({ error: 'Respons Gemini kosong' }, { status: 502 })
        }

        return NextResponse.json({ analysis: text })
    } catch (err) {
        console.error('Error di /api/analyze:', err)
        return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
    }
}
