// Database Materi & Kuis (Masing-masing 5 soal)
const database = {
    sains: {
        badge: "Sains & Alam",
        title: "Mengenal Sistem Tata Surya",
        visual: "🪐✨🌍",
        content: "Tata Surya terdiri dari Matahari sebagai pusatnya dan 8 planet yang mengelilinginya. Merkurius adalah planet terdekat dari Matahari, sedangkan Jupiter merupakan planet terbesar. Bumi berada di zona layak huni dengan satu satelit alami yaitu Bulan.",
        questions: [
            {
                q: "Planet manakah yang berukuran paling besar di Tata Surya?",
                options: ["Mars", "Jupiter", "Saturnus", "Neptunus"],
                answer: 1
            },
            {
                q: "Apa pusat dari sistem Tata Surya kita?",
                options: ["Bumi", "Bulan", "Matahari", "Galaksi Andromeda"],
                answer: 2
            },
            {
                q: "Planet yang posisinya paling dekat dengan Matahari adalah...",
                options: ["Venus", "Merkurius", "Mars", "Uranus"],
                answer: 1
            },
            {
                q: "Planet apa yang dijuluki sebagai Planet Merah?",
                options: ["Venus", "Mars", "Saturnus", "Uranus"],
                answer: 1
            },
            {
                q: "Galaksi tempat tata surya kita berada disebut...",
                options: ["Andromeda", "Bimasakti", "Sombrero", "Centaurus"],
                answer: 1
            }
        ]
    },
    budaya: {
        badge: "Sejarah & Budaya Lokal",
        title: "Filosofi Harmoni Tri Hita Karana",
        visual: "🏛️🌿🤝",
        content: "Tri Hita Karana adalah filosofi hidup masyarakat Bali yang menekankan tiga penyebab kebahagiaan: hubungan harmonis manusia dengan Tuhan (Parahyangan), sesama manusia (Pawongan), dan alam lingkungan (Palemahan).",
        questions: [
            {
                q: "Apa arti dari konsep 'Palemahan' dalam Tri Hita Karana?",
                options: [
                    "Hubungan harmonis dengan Tuhan",
                    "Hubungan harmonis dengan sesama manusia",
                    "Hubungan harmonis dengan alam lingkungan",
                    "Hubungan dengan leluhur"
                ],
                answer: 2
            },
            {
                q: "Berapa pilar utama yang membentuk filosofi Tri Hita Karana?",
                options: ["Dua", "Tiga", "Empat", "Lima"],
                answer: 1
            },
            {
                q: "Hubungan harmonis antar sesama manusia disebut...",
                options: ["Pawongan", "Parahyangan", "Palemahan", "Subak"],
                answer: 0
            },
            {
                q: "Unsur yang berhubungan dengan Tuhan dalam Tri Hita Karana disebut...",
                options: ["Parahyangan", "Pawongan", "Palemahan", "Pahyangan"],
                answer: 0
            },
            {
                q: "Filosofi Tri Hita Karana berasal dari tradisi masyarakat daerah...",
                options: ["Jawa", "Bali", "Sunda", "Madura"],
                answer: 1
            }
        ]
    },
    matematika: {
        badge: "Matematika & Logika",
        title: "Logika Angka & Aljabar Dasar",
        visual: "🔢➕🧮",
        content: "Matematika adalah bahasa universal yang melibatkan pola, angka, dan logika. Aljabar dasar membantu memecahkan masalah sehari-hari menggunakan variabel, sementara aritmatika melatih ketepatan dan kecepatan berpikir logis.",
        questions: [
            {
                q: "Berapakah hasil dari 12 + 8 × 2?",
                options: ["28", "40", "24", "32"],
                answer: 0
            },
            {
                q: "Jika sebuah persegi memiliki panjang sisi 6 cm, berapakah luasnya?",
                options: ["12 cm²", "24 cm²", "36 cm²", "48 cm²"],
                answer: 2
            },
            {
                q: "Berapakah nilai dari 2 pangkat 3 (2³) ?",
                options: ["6", "8", "9", "12"],
                answer: 1
            },
            {
                q: "Jika x + 5 = 12, berapakah nilai x?",
                options: ["5", "6", "7", "8"],
                answer: 2
            },
            {
                q: "Pecahan berikut yang senilai dengan 1/2 adalah...",
                options: ["2/5", "3/4", "4/8", "1/3"],
                answer: 2
            }
        ]
    }
};

let currentTopic = null;
let currentQIndex = 0;
let correctCount = 0; // Menghitung jumlah jawaban benar

// Toggle Dark Mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Navigasi Layar
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
}

// Pilih Topik -> Tampilkan Materi Singkat
function selectTopic(topicKey) {
    currentTopic = database[topicKey];
    document.getElementById('lesson-badge').textContent = currentTopic.badge;
    document.getElementById('lesson-title').textContent = currentTopic.title;
    document.getElementById('lesson-visual').textContent = currentTopic.visual;
    document.getElementById('lesson-content').textContent = currentTopic.content;
    showScreen('lesson-screen');
}

// Mulai Kuis
function startQuiz() {
    currentQIndex = 0;
    correctCount = 0;
    document.getElementById('current-score').textContent = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const qData = currentTopic.questions[currentQIndex];
    const totalQ = currentTopic.questions.length;

    document.getElementById('question-counter').textContent = `Soal ${currentQIndex + 1}/${totalQ}`;
    document.getElementById('progress-fill').style.width = `${((currentQIndex) / totalQ) * 100}%`;
    document.getElementById('question-text').textContent = qData.q;
    document.getElementById('next-btn').classList.add('hidden');

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, selectedBtn) {
    const qData = currentTopic.questions[currentQIndex];
    const allButtons = document.querySelectorAll('.option-btn');

    // Nonaktifkan semua tombol setelah memilih
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === qData.answer) {
        selectedBtn.classList.add('correct');
        correctCount++; // Tambah jumlah jawaban benar
    } else {
        selectedBtn.classList.add('wrong');
        allButtons[qData.answer].classList.add('correct');
    }

    // Hitung skor sementara secara real-time
    const totalQ = currentTopic.questions.length;
    const currentScore = Math.round((correctCount / totalQ) * 100);
    document.getElementById('current-score').textContent = currentScore;

    document.getElementById('progress-fill').style.width = `${((currentQIndex + 1) / totalQ) * 100}%`;
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQIndex++;
    if (currentQIndex < currentTopic.questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const totalQ = currentTopic.questions.length;
    // Menghitung skor akhir persentase (100% jika semua benar)
    const finalScore = Math.round((correctCount / totalQ) * 100);

    document.getElementById('final-score').textContent = finalScore;
    document.getElementById('result-emoji').textContent = finalScore >= 70 ? '🏆' : '💪';
    document.getElementById('result-message').textContent = finalScore >= 70 
        ? 'Luar biasa! Pemahamanmu sangat baik.' 
        : 'Terus berlatih, kamu pasti bisa lebih baik!';
    showScreen('result-screen');
}