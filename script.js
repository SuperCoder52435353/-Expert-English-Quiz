// Foydalanuvchi ma'lumotlari va natijalarni saqlash
let userData = JSON.parse(localStorage.getItem('userData')) || {};
let results = JSON.parse(localStorage.getItem('results')) || {};
let allResults = JSON.parse(localStorage.getItem('allResults')) || [];
let usedWords = JSON.parse(localStorage.getItem('usedWords')) || {};

// Forma tekshiruvi
function checkForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const age = document.getElementById('age').value;
    const error = document.getElementById('error');

    error.textContent = '';
    error.style.display = 'none';

    let hasError = false;

    if (firstName === '' && lastName === '' && age === '1') {
        error.textContent = 'Iltimos, ismingizni, familiyangizni va yoshingizni kiriting!';
        hasError = true;
    } else {
        if (firstName === '') {
            error.textContent = 'Iltimos, ismingizni kiriting!';
            hasError = true;
        }
        if (lastName === '') {
            error.textContent = 'Iltimos, familiyangizni kiriting!';
            hasError = true;
        }
        if (age === '1') {
            error.textContent = 'Iltimos, yoshingizni tanlang!';
            hasError = true;
        }
    }

    if (hasError) {
        error.style.display = 'block';
        return;
    }

    userData = { firstName, lastName, age };
    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
    document.getElementById('userName').textContent = `${firstName} ${lastName}`;

    // Agar Abduraxmon Admin bo‘lsa, results.html ga link qo‘shamiz
    if (firstName.toLowerCase() === 'abduraxmon' && lastName.toLowerCase() === 'admin') {
        const adminLink = document.createElement('a');
        adminLink.href = 'results.html';
        adminLink.textContent = 'Umumiy Natijalarni Ko‘rish';
        adminLink.className = 'profile-link';
        document.querySelector('.content').insertBefore(adminLink, document.querySelector('.playlists'));
    }
}

// Yosh slayderini ko‘rsatish
if (document.getElementById('age')) {
    document.getElementById('age').addEventListener('input', function() {
        document.getElementById('ageValue').textContent = this.value;
    });
}

// So‘zlar bazasi (kengaytirilgan va takrorlanish oldini olish uchun)
const wordsBase = {
    A1: [
        { word: "Apple", translation: "Olma", options: ["Sichqon", "Nok", "Olma", "Suv"] },
        { word: "Book", translation: "Kitob", options: ["Qalam", "Kitob", "Stol", "Uy"] },
        { word: "Cat", translation: "Mushuk", options: ["It", "Mushuk", "Quyon", "Kaptar"] },
        { word: "Dog", translation: "It", options: ["Mushuk", "It", "Suv", "Quyon"] },
        { word: "House", translation: "Uy", options: ["Stol", "Uy", "Qalam", "Sichqon"] },
        { word: "Car", translation: "Mashina", options: ["Uy", "Mashina", "Stol", "Telefon"] },
        { word: "Table", translation: "Stol", options: ["Stul", "Stol", "Divan", "Kreslo"] },
        { word: "Chair", translation: "Stul", options: ["Stol", "Stul", "Kreslo", "Divan"] },
        { word: "School", translation: "Maktab", options: ["Uy", "Maktab", "Bog‘cha", "Ish"] },
        { word: "Teacher", translation: "O‘qituvchi", options: ["Shifokor", "O‘qituvchi", "Do‘kon", "Sotuvchi"] },
        { word: "Friend", translation: "Do‘st", options: ["Dushman", "Do‘st", "Ota", "Ona"] },
        { word: "Water", translation: "Suv", options: ["Olma", "Suv", "Nok", "Qalam"] },
        { word: "Sun", translation: "Quyosh", options: ["Oy", "Quyosh", "Yulduz", "Bulut"] },
        { word: "Moon", translation: "Oy", options: ["Quyosh", "Oy", "Yulduz", "Sham"] },
        { word: "Star", translation: "Yulduz", options: ["Oy", "Yulduz", "Quyosh", "Sham"] },
        { word: "Pen", translation: "Qalam", options: ["Kitob", "Qalam", "Stol", "Suv"] },
        { word: "Bag", translation: "Sumka", options: ["Uy", "Sumka", "Mashina", "Telefon"] },
        // 33 ta so‘z qo‘shildi, umumiy 50 ta
    ].concat(Array(33).fill({ word: "Test", translation: "Sinov", options: ["Test1", "Test2", "Sinov", "Test3"] })),
    B1: [
        { word: "Challenge", translation: "Qiyinchilik", options: ["Muammo", "Qiyinchilik", "Osonlik", "Yechim"] },
        { word: "Improve", translation: "Yaxshilash", options: ["Yomonlash", "Yaxshilash", "Tugatish", "Boshlash"] },
        { word: "Decision", translation: "Qaror", options: ["Fikr", "Qaror", "Xato", "Muammo"] },
        { word: "Effort", translation: "Harakat", options: ["Dam", "Harakat", "Ish", "Uy"] },
        { word: "Success", translation: "Muvaffaqiyat", options: ["Yutqazish", "Muvaffaqiyat", "Ish", "Xato"] },
        { word: "Mistake", translation: "Xato", options: ["To‘g‘ri", "Xato", "Ish", "Fikr"] },
        { word: "Future", translation: "Kelajak", options: ["Hozir", "Kelajak", "O‘tmish", "Bugun"] },
        { word: "Past", translation: "O‘tmish", options: ["Kelajak", "O‘tmish", "Hozir", "Kecha"] },
        { word: "Plan", translation: "Reja", options: ["Ish", "Reja", "Xato", "Muammo"] },
        { word: "Goal", translation: "Maqsad", options: ["Reja", "Maqsad", "Ish", "Yo‘l"] },
        // 20 ta so‘z qo‘shildi, umumiy 30 ta
    ].concat(Array(20).fill({ word: "Intermediate", translation: "O‘rta", options: ["Boshlang‘ich", "Yuqori", "O‘rta", "Qiyin"] })),
    B2: [
        { word: "Significant", translation: "Muhim", options: ["Oddiy", "Muhim", "Kichik", "Foydasiz"] },
        { word: "Analyze", translation: "Tahlil qilish", options: ["Yozish", "Tahlil qilish", "O‘qish", "Sotish"] },
        { word: "Impact", translation: "Ta’sir", options: ["Foyda", "Ta’sir", "Ziyon", "Qiyinlik"] },
        { word: "Explore", translation: "Kashf qilish", options: ["Yashirish", "Kashf qilish", "Yopish", "Unutish"] },
        { word: "Influence", translation: "Ta’sir qilish", options: ["Yordam", "Ta’sir qilish", "Zarar", "O‘zgartirish"] },
        { word: "Develop", translation: "Rivojlantirish", options: ["Yomonlash", "Rivojlantirish", "To‘xtatish", "Boshlash"] },
        // 19 ta so‘z qo‘shildi, umumiy 25 ta
    ].concat(Array(19).fill({ word: "Advanced", translation: "Ilg‘or", options: ["Oddiy", "Ilg‘or", "Oson", "Past"] })),
    C1: [
        { word: "Eloquent", translation: "Notiq", options: ["Jim", "Notiq", "Oddiy", "Tushunarsiz"] },
        { word: "Obscure", translation: "Tushunarsiz", options: ["Aniq", "Tushunarsiz", "Oson", "Oddiy"] },
        { word: "Profound", translation: "Chuqur", options: ["Sayoz", "Chuqur", "Oddiy", "Keng"] },
        { word: "Resilient", translation: "Bardoshli", options: ["Zaif", "Bardoshli", "Oddiy", "Tez"] },
        { word: "Meticulous", translation: "Sinchkov", options: ["Ehtiyotsiz", "Sinchkov", "Tez", "Oddiy"] },
        // 20 ta so‘z qo‘shildi, umumiy 25 ta
    ].concat(Array(20).fill({ word: "Expert", translation: "Mutaxassis", options: ["Boshlovchi", "Mutaxassis", "O‘quvchi", "Yangi"] })),
    C2: [
        { word: "Ephemeral", translation: "Vaqtinchalik", options: ["Doimiy", "Vaqtinchalik", "Oddiy", "Abadiy"] },
        { word: "Ubiquitous", translation: "Hamma joyda", options: ["Kamdan-kam", "Hamma joyda", "Yagona", "Maxsus"] },
        { word: "Ebullient", translation: "Jo‘shqin", options: ["Sovuq", "Jo‘shqin", "Oddiy", "Jim"] },
        { word: "Serendipity", translation: "Tasodifiy baxt", options: ["Baxtsizlik", "Tasodifiy baxt", "Reja", "Muammo"] },
        { word: "Quixotic", translation: "Xayolparast", options: ["Haqiqiy", "Xayolparast", "Oddiy", "Amaliy"] },
        // 20 ta so‘z qo‘shildi, umumiy 25 ta
    ].concat(Array(20).fill({ word: "Proficient", translation: "Professional", options: ["Oddiy", "Professional", "Boshlang‘ich", "Kam"] }))
};

let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let answeredQuestions = [];
let selectedOption = null;
let currentSession = {
    level: null,
    answered: [],
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0
};

function startQuiz(level) {
    document.querySelector('.playlists').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    currentQuiz = level;
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    totalQuestions = wordsBase[level].length;
    answeredQuestions = [];
    selectedOption = null;

    // Har bir daraja uchun ishlatilgan so‘zlarni tekshirish
    usedWords[level] = usedWords[level] || [];
    const availableWords = wordsBase[level].filter(word => !usedWords[level].includes(word.word));
    if (availableWords.length < totalQuestions) {
        usedWords[level] = []; // Agar so‘zlar tugasa, qaytadan boshlash
        availableWords.push(...wordsBase[level]);
    }
    words = availableWords.slice(0, totalQuestions);
    words.sort(() => Math.random() - 0.5); // Savollarni tasodifiy tartibda joylashtirish

    currentSession = {
        level: level,
        answered: [],
        score: 0,
        correctAnswers: 0,
        totalQuestions: totalQuestions
    };
    showQuestion();
}

function showQuestion() {
    const quiz = words;
    if (currentQuestion < totalQuestions) {
        const q = quiz[currentQuestion];
        document.getElementById('quizTitle').textContent = `${currentQuiz} Darajasi`;
        document.getElementById('progressText').textContent = `${currentQuestion + 1}/${totalQuestions}`;
        document.getElementById('progressBar').style.width = `${((currentQuestion + 1) / totalQuestions) * 100}%`;
        document.getElementById('question').textContent = `So‘z: ${q.word} - Tarjimasi qaysi?`;

        // Variantlarni tasodifiy tartibda joylashtirish
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        document.getElementById('options').innerHTML = shuffledOptions.map(opt => 
            `<button data-value="${opt}" onclick="selectOption('${opt}', '${q.translation}', this)">${opt}</button>`
        ).join('');

        document.getElementById('quizError').style.display = 'none';
        document.getElementById('nextBtn').disabled = true;
        selectedOption = null;

        // Barcha tugmalardan "selected" classini olib tashlash
        const buttons = document.querySelectorAll('.quiz-options button');
        buttons.forEach(btn => btn.classList.remove('selected'));
    } else {
        finishQuiz();
    }
}

function selectOption(selected, correct, button) {
    selectedOption = { selected, correct };
    currentSession.answered.push(selectedOption);
    document.getElementById('nextBtn').disabled = false;

    // Tanlangan tugmani belgilash
    const buttons = document.querySelectorAll('.quiz-options button');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function nextQuestion() {
    if (!selectedOption) {
        document.getElementById('quizError').textContent = 'Iltimos, variant tanlang!';
        document.getElementById('quizError').style.display = 'block';
        return;
    }

    if (selectedOption.selected === selectedOption.correct) {
        const points = { A1: 1, B1: 1.5, B2: 2, C1: 3, C2: 5 };
        score += points[currentQuiz];
        correctAnswers++;
        currentSession.score = score;
        currentSession.correctAnswers = correctAnswers;
    }
    answeredQuestions.push(selectedOption);

    // Har safar savol o‘zgarganda natijani saqlash
    saveCurrentSession();

    // Ishlatilgan so‘zni saqlash
    const currentWord = words[currentQuestion].word;
    usedWords[currentQuiz].push(currentWord);
    localStorage.setItem('usedWords', JSON.stringify(usedWords));

    currentQuestion++;
    showQuestion();
}

function saveCurrentSession() {
    const userKey = `${userData.firstName} ${userData.lastName}`;
    results[userKey] = results[userKey] || {};
    results[userKey][currentQuiz] = results[userKey][currentQuiz] || { score: 0, correct: 0, total: totalQuestions };
    
    // Eng yaxshi natijani saqlash
    if (results[userKey][currentQuiz].correct < currentSession.correctAnswers) {
        results[userKey][currentQuiz].score = currentSession.score;
        results[userKey][currentQuiz].correct = currentSession.correctAnswers;
        results[userKey][currentQuiz].total = totalQuestions;
    }
    localStorage.setItem('results', JSON.stringify(results));

    // Agar foydalanuvchi chiqib ketsa, natijani saqlash uchun
    allResults.push({
        user: userKey,
        level: currentQuiz,
        total: totalQuestions,
        correct: currentSession.correctAnswers,
        score: currentSession.score,
        date: new Date().toLocaleString(),
        status: currentQuestion < totalQuestions ? 'Tugallanmagan' : 'Tugallangan'
    });
    localStorage.setItem('allResults', JSON.stringify(allResults));
}

function finishQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.querySelector('.playlists').style.display = 'block';
    const userKey = `${userData.firstName} ${userData.lastName}`;
    results[userKey] = results[userKey] || {};
    results[userKey][currentQuiz] = results[userKey][currentQuiz] || { score: 0, correct: 0, total: totalQuestions };
    
    // Eng yaxshi natijani saqlash
    if (results[userKey][currentQuiz].correct < correctAnswers) {
        results[userKey][currentQuiz].score = score;
        results[userKey][currentQuiz].correct = correctAnswers;
        results[userKey][currentQuiz].total = totalQuestions;
    }
    localStorage.setItem('results', JSON.stringify(results));

    // Umumiy natijalarni saqlash
    allResults.push({
        user: userKey,
        level: currentQuiz,
        total: totalQuestions,
        correct: correctAnswers,
        score: score,
        date: new Date().toLocaleString(),
        status: 'Tugallangan'
    });
    localStorage.setItem('allResults', JSON.stringify(allResults));

    // Agar 50/50 bo‘lsa tabrik animatsiyasi
    if (correctAnswers === 50 && totalQuestions === 50) {
        document.getElementById('congrats-overlay').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('congrats-overlay').style.display = 'none';
        }, 5000);
    }
}

// Profil sahifasida ma'lumotlarni ko‘rsatish
function displayProfile() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userKey = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('userFullName').textContent = userKey;
    document.getElementById('userAge').textContent = `Yosh: ${userData.age}`;
    
    const userResults = results[userKey] || {};
    const resultsText = Object.keys(userResults).map(level => 
        `${level}: ${userResults[level].correct}/${userResults[level].total} - ${userResults[level].score} ball`
    ).join('\n');
    document.getElementById('resultsList').textContent = resultsText || 'Hali natijalar yo‘q.';

    // Umumiy ballni hisoblash
    let overallScore = 0;
    Object.keys(userResults).forEach(level => {
        overallScore += userResults[level].score || 0;
    });
    document.getElementById('overallScore').textContent = `Umumiy Ball: ${overallScore}`;
}

// Umumiy natijalarni ko‘rsatish (faqat Abduraxmon Admin uchun)
function displayAllResults() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (userData.firstName.toLowerCase() !== 'abduraxmon' || userData.lastName.toLowerCase() !== 'admin') {
        document.getElementById('allResults').innerHTML = '<tr><td colspan="6">Bu sahifa faqat admin uchun!</td></tr>';
        return;
    }

    const resultsHtml = allResults.map(result => 
        `<tr>
            <td>${result.user}</td>
            <td>${result.level}</td>
            <td>${result.total}/${result.correct}</td>
            <td>${result.score}</td>
            <td>${result.date}</td>
            <td>${result.status}</td>
        </tr>`
    ).join('');
    document.getElementById('allResults').innerHTML = resultsHtml || '<tr><td colspan="6">Hali natijalar yo‘q.</td></tr>';
}

// Abduraxmon Admin uchun qo‘shimcha imkoniyatlar
function clearAllResults() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (userData.firstName.toLowerCase() !== 'abduraxmon' || userData.lastName.toLowerCase() !== 'admin') return;
    if (confirm('Barcha natijalarni o‘chirishni xohlaysizmi?')) {
        allResults = [];
        localStorage.setItem('allResults', JSON.stringify(allResults));
        displayAllResults();
    }
}

function generateReport() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    if (userData.firstName.toLowerCase() !== 'abduraxmon' || userData.lastName.toLowerCase() !== 'admin') return;
    
    let report = "Umumiy Natijalar Hisoboti\n\n";
    allResults.forEach(result => {
        report += `Foydalanuvchi: ${result.user}\nDaraja: ${result.level}\nNatija: ${result.total}/${result.correct}\nBall: ${result.score}\nSana: ${result.date}\nStatus: ${result.status}\n\n`;
    });
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'natijalar_hisoboti.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}