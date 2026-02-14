const optionsData = [
    { text: "🎧 Denger lagu", isCorrect: true },
    { text: "🎙️ Voice bareng", isCorrect: true },
    { text: "📱 Scroll TikTok", isCorrect: false },
    { text: "🎮 Main game", isCorrect: false },
    { text: "😴 Ketiduran", isCorrect: false },
    { text: "📺 Nonton YouTube", isCorrect: false },
    { text: "🍜 Makan mie", isCorrect: false },
    { text: "💬 Chat random", isCorrect: false },
    { text: "📸 Edit foto", isCorrect: false },
    { text: "🧠 Overthinking", isCorrect: false },
    { text: "🎧 Denger podcast", isCorrect: false },
    { text: "📚 Baca materi", isCorrect: false }
];

// DOM Elements
const card = document.getElementById('game-card');
const screenQuestion = document.getElementById('screen-question');
const screenLoading = document.getElementById('screen-loading');
const screenResult = document.getElementById('screen-result');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.querySelector('.progress-fill');
const resultTitle = document.getElementById('result-title');
const resultMsg = document.getElementById('result-msg');
const resultIcon = document.querySelector('.result-icon');
const btnRestart = document.getElementById('btn-restart');

// State
let currentOptions = [];

// Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    optionsContainer.innerHTML = ''; // Clear previous options

    // Pick 4 random options
    // Ensure at least one correct answer is included to make it winnable, 
    // but the prompt says "User harus menebak dari banyak pilihan yang diacak". 
    // Random shuffle of all options is fine.

    // However, to make it fair, let's mix 1 correct + 3 others, OR just pure random.
    // Pure random might give 4 wrong answers which is impossible to win.
    // Let's implement: 1 correct guaranteed + 3 random others (mixed correct/inc).

    const correctOpts = optionsData.filter(o => o.isCorrect);
    const otherOpts = optionsData.filter(o => !o.isCorrect); // Actually, we can shuffle all.

    // Strategy: Shuffle everything, allow any combo? 
    // Better: Ensure at least one correct option exists in the set.
    const oneCorrect = correctOpts[Math.floor(Math.random() * correctOpts.length)];

    // Remove that one from the pool of others (if we want strictly unique)
    // But since `isCorrect` options are few, let's just pick 3 random from the REST of the full list.
    const remaining = optionsData.filter(o => o !== oneCorrect);
    shuffleArray(remaining);

    const selected = [oneCorrect, ...remaining.slice(0, 3)];
    shuffleArray(selected);
    currentOptions = selected;

    // Render Buttons
    selected.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerHTML = `<span class="text">${opt.text}</span>`;
        btn.onclick = () => handleOptionClick(opt);
        optionsContainer.appendChild(btn);
    });

    showScreen(screenQuestion);
}

function showScreen(screen) {
    [screenQuestion, screenLoading, screenResult].forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    screen.style.display = 'block';
    setTimeout(() => {
        screen.classList.add('active');
    }, 10);
}

function handleOptionClick(option) {
    // 1. Shake Card
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);

    // 2. Show Loading
    showScreen(screenLoading);

    // 3. Animate Progress
    progressFill.style.width = '0%';
    setTimeout(() => {
        progressFill.style.width = '100%';
    }, 100);

    // 4. Wait & Show Result
    setTimeout(() => {
        showResult(option);
    }, 2000);
}

function showResult(option) {
    if (option.isCorrect) {
        // WIN
        resultIcon.innerHTML = "🍫";
        resultTitle.innerText = "Yey Benar! 🎉";
        resultMsg.innerText = "Nih coklat buat kamu! Makasih udah ngertiin aku.";
    } else {
        // LOSE
        resultIcon.innerHTML = "🤪";
        resultTitle.innerText = "Salah Wlee!";
        resultMsg.innerText = "Bukan itu dong... Coba tebak lagi ya!";
    }

    showScreen(screenResult);
}

function resetGame() {
    progressFill.style.width = '0%';
    startGame();
}

// Event Listeners
btnRestart.addEventListener('click', resetGame);

// Init
startGame();
