/* =========================================================
   script.js — all the app data and logic live here.
   Nothing is sent to a server; the whole app runs in the browser.
   Learned-word progress is saved in the browser with localStorage.
   ========================================================= */

/* ---------------------------------------------------------
   1) THE WORDS
   Each category has an emoji + color, and a list of words.
   Every word has: bg (Bulgarian), en (English), emoji (picture).
   To add words, just add more items to these lists.
   --------------------------------------------------------- */
const CATEGORIES = [
  {
    name: "Цветове",          // Colors
    emoji: "🎨",
    color: "#8e5aa5",         // plum
    words: [
      { bg: "червено",  en: "red",    emoji: "🔴" },
      { bg: "синьо",    en: "blue",   emoji: "🔵" },
      { bg: "зелено",   en: "green",  emoji: "🟢" },
      { bg: "жълто",    en: "yellow", emoji: "🟡" },
      { bg: "оранжево", en: "orange", emoji: "🟠" },
      { bg: "лилаво",   en: "purple", emoji: "🟣" },
      { bg: "черно",    en: "black",  emoji: "⚫" },
      { bg: "бяло",     en: "white",  emoji: "⚪" },
      { bg: "кафяво",   en: "brown",  emoji: "🟤" },
      { bg: "розово",   en: "pink",   emoji: "🌸" }
    ]
  },
  {
    name: "Предмети",         // Everyday objects
    emoji: "🎒",
    color: "#3d7ea6",         // sapphire
    words: [
      { bg: "книга",    en: "book",     emoji: "📖" },
      { bg: "стол",     en: "chair",    emoji: "🪑" },
      { bg: "часовник", en: "clock",    emoji: "🕐" },
      { bg: "ключ",     en: "key",      emoji: "🔑" },
      { bg: "чаша",     en: "cup",      emoji: "☕" },
      { bg: "легло",    en: "bed",      emoji: "🛏️" },
      { bg: "врата",    en: "door",     emoji: "🚪" },
      { bg: "телефон",  en: "phone",    emoji: "📱" },
      { bg: "чадър",    en: "umbrella", emoji: "☂️" },
      { bg: "чанта",    en: "bag",      emoji: "🎒" }
    ]
  },
  {
    name: "Животни",          // Animals
    emoji: "🐶",
    color: "#2a9d8f",         // emerald
    words: [
      { bg: "куче",   en: "dog",    emoji: "🐶" },
      { bg: "котка",  en: "cat",    emoji: "🐱" },
      { bg: "крава",  en: "cow",    emoji: "🐮" },
      { bg: "кон",    en: "horse",  emoji: "🐴" },
      { bg: "прасе",  en: "pig",    emoji: "🐷" },
      { bg: "лъв",    en: "lion",   emoji: "🦁" },
      { bg: "птица",  en: "bird",   emoji: "🐦" },
      { bg: "риба",   en: "fish",   emoji: "🐟" },
      { bg: "мечка",  en: "bear",   emoji: "🐻" },
      { bg: "заек",   en: "rabbit", emoji: "🐰" }
    ]
  },
  {
    name: "Глаголи",          // Verbs
    emoji: "🏃",
    color: "#e76f51",         // coral
    words: [
      { bg: "ям",       en: "eat",   emoji: "🍽️" },
      { bg: "пия",      en: "drink", emoji: "🥤" },
      { bg: "тичам",    en: "run",   emoji: "🏃" },
      { bg: "спя",      en: "sleep", emoji: "😴" },
      { bg: "чета",     en: "read",  emoji: "📖" },
      { bg: "пиша",     en: "write", emoji: "✍️" },
      { bg: "скачам",   en: "jump",  emoji: "🤸" },
      { bg: "пея",      en: "sing",  emoji: "🎤" },
      { bg: "плувам",   en: "swim",  emoji: "🏊" },
      { bg: "танцувам", en: "dance", emoji: "💃" }
    ]
  },
  {
    name: "Числа",            // Numbers
    emoji: "🔢",
    color: "#e9b949",         // mustard
    words: [
      { bg: "едно",    en: "one",   emoji: "1️⃣" },
      { bg: "две",     en: "two",   emoji: "2️⃣" },
      { bg: "три",     en: "three", emoji: "3️⃣" },
      { bg: "четири",  en: "four",  emoji: "4️⃣" },
      { bg: "пет",     en: "five",  emoji: "5️⃣" },
      { bg: "шест",    en: "six",   emoji: "6️⃣" },
      { bg: "седем",   en: "seven", emoji: "7️⃣" },
      { bg: "осем",    en: "eight", emoji: "8️⃣" },
      { bg: "девет",   en: "nine",  emoji: "9️⃣" },
      { bg: "десет",   en: "ten",   emoji: "🔟" }
    ]
  }
];

/* ---------------------------------------------------------
   2) GRAB THE PAGE ELEMENTS WE NEED
   --------------------------------------------------------- */
// Screens
const homeScreen   = document.getElementById("home-screen");
const cardScreen   = document.getElementById("card-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Home
const categoryList = document.getElementById("category-list");

// Flashcards
const flashcard   = document.getElementById("flashcard");
const frontEmoji  = document.getElementById("front-emoji");
const frontWord   = document.getElementById("front-word");
const backEmoji   = document.getElementById("back-emoji");
const backWord    = document.getElementById("back-word");
const progress    = document.getElementById("progress");
const knownBadge  = document.getElementById("known-badge");
const flipBtn     = document.getElementById("flip-btn");
const speakEnBtn  = document.getElementById("speak-en-btn");
const knowBtn     = document.getElementById("know-btn");
const shuffleBtn  = document.getElementById("shuffle-btn");
const nextBtn     = document.getElementById("next-btn");
const prevBtn     = document.getElementById("prev-btn");
const backBtn     = document.getElementById("back-btn");
const quizStartBtn = document.getElementById("quiz-start-btn");

// Quiz
const quizEmoji    = document.getElementById("quiz-emoji");
const quizWord     = document.getElementById("quiz-word");
const quizOptions  = document.getElementById("quiz-options");
const quizProgress = document.getElementById("quiz-progress");
const quizScoreEl  = document.getElementById("quiz-score");
const quizFeedback = document.getElementById("quiz-feedback");
const quizBackBtn  = document.getElementById("quiz-back-btn");

// Result
const resultEmoji  = document.getElementById("result-emoji");
const resultTitle  = document.getElementById("result-title");
const resultText   = document.getElementById("result-text");
const retryQuizBtn = document.getElementById("retry-quiz-btn");
const resultHomeBtn = document.getElementById("result-home-btn");

/* ---------------------------------------------------------
   3) APP STATE
   --------------------------------------------------------- */
let currentCatIndex = 0;   // which category is open
let currentWords = [];     // the (possibly shuffled) deck being studied
let currentIndex = 0;      // which flashcard we are on

// Quiz state
let quizWords = [];        // shuffled deck for the quiz
let quizIndex = 0;         // which quiz question we are on
let quizScore = 0;         // how many answered correctly

/* ---------------------------------------------------------
   4) HELPERS
   --------------------------------------------------------- */

// Return a new array with the items shuffled (Fisher–Yates).
function shuffled(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Show one screen and hide the others.
function showScreen(screen) {
  [homeScreen, cardScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

/* ----- Learned-word progress (saved in the browser) ----- */
// We store a "1" for each learned word under a unique key.
function knownKey(catIndex, en) {
  return `dumidumi:known:${catIndex}:${en}`;
}
function isKnown(catIndex, en) {
  try { return localStorage.getItem(knownKey(catIndex, en)) === "1"; }
  catch (e) { return false; }   // e.g. private mode with storage disabled
}
function setKnown(catIndex, en, value) {
  try {
    if (value) localStorage.setItem(knownKey(catIndex, en), "1");
    else localStorage.removeItem(knownKey(catIndex, en));
  } catch (e) { /* ignore if storage is unavailable */ }
}
function countKnown(catIndex) {
  return CATEGORIES[catIndex].words.filter(w => isKnown(catIndex, w.en)).length;
}

/* ---------------------------------------------------------
   5) SPEAKING — the browser's built-in text-to-speech.
   lang "bg-BG" = Bulgarian, "en-US" = English.
   --------------------------------------------------------- */
function speak(text, lang) {
  window.speechSynthesis.cancel();   // stop any current word so they don't overlap
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;   // a little slower, easier for kids
  utterance.pitch = 1.1;   // slightly cheerful

  const voices = window.speechSynthesis.getVoices();
  const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2)));
  if (match) utterance.voice = match;

  window.speechSynthesis.speak(utterance);
}
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

/* ---------------------------------------------------------
   6) HOME SCREEN (category buttons + learned counts)
   --------------------------------------------------------- */
function buildHome() {
  categoryList.innerHTML = "";
  CATEGORIES.forEach((category, i) => {
    const total = category.words.length;
    const learned = countKnown(i);
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.style.background = category.color;
    btn.innerHTML =
      `<span class="cat-emoji">${category.emoji}</span>` +
      `<span>${category.name}</span>` +
      `<span class="cat-count">⭐ ${learned} / ${total}</span>`;
    btn.addEventListener("click", () => openCategory(i));
    categoryList.appendChild(btn);
  });
}

/* ---------------------------------------------------------
   7) FLASHCARDS
   --------------------------------------------------------- */
function openCategory(index) {
  currentCatIndex = index;
  currentWords = CATEGORIES[index].words.slice();  // keep original order at first
  currentIndex = 0;
  showScreen(cardScreen);
  showCard();
}

function showCard() {
  const word = currentWords[currentIndex];

  frontEmoji.textContent = word.emoji;
  frontWord.textContent  = word.bg;
  backEmoji.textContent  = word.emoji;
  backWord.textContent   = word.en;

  // Always start on the Bulgarian front with the Flip button hidden.
  flashcard.classList.remove("flipped");
  flipBtn.classList.add("hidden");

  progress.textContent = `${currentIndex + 1} / ${currentWords.length}`;

  // Reflect whether this word is already marked as learned.
  updateKnowButton();
  updateKnownBadge();

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentWords.length - 1;
}

function updateKnowButton() {
  const word = currentWords[currentIndex];
  const known = isKnown(currentCatIndex, word.en);
  knowBtn.classList.toggle("is-known", known);
  knowBtn.textContent = known ? "⭐ Научена!" : "✅ Знам тази дума";
}

function updateKnownBadge() {
  const total = CATEGORIES[currentCatIndex].words.length;
  knownBadge.textContent = `⭐ ${countKnown(currentCatIndex)} / ${total}`;
}

/* ---------------------------------------------------------
   8) QUIZ
   --------------------------------------------------------- */
function startQuiz() {
  quizWords = shuffled(CATEGORIES[currentCatIndex].words);
  quizIndex = 0;
  quizScore = 0;
  showScreen(quizScreen);
  showQuizQuestion();
}

function showQuizQuestion() {
  const word = quizWords[quizIndex];

  quizEmoji.textContent = word.emoji;
  quizWord.textContent  = word.bg;
  quizProgress.textContent = `${quizIndex + 1} / ${quizWords.length}`;
  quizScoreEl.textContent = `⭐ ${quizScore}`;
  quizFeedback.textContent = "";

  // Build four options: the correct English word + three others from this category.
  const others = CATEGORIES[currentCatIndex].words
    .filter(w => w.en !== word.en);
  const distractors = shuffled(others).slice(0, 3);
  const options = shuffled([word, ...distractors]);

  quizOptions.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt.en;
    btn.addEventListener("click", () => answerQuiz(btn, opt, word));
    quizOptions.appendChild(btn);
  });

  // Say the Bulgarian word so the child hears what they must translate.
  speak(word.bg, "bg-BG");
}

function answerQuiz(button, chosen, correct) {
  // Disable all option buttons so the answer can't change.
  const allButtons = quizOptions.querySelectorAll("button");
  allButtons.forEach(b => (b.disabled = true));

  if (chosen.en === correct.en) {
    button.classList.add("correct");
    quizScore++;
    quizFeedback.textContent = "Браво! 🎉";
    speak(correct.en, "en-US");
  } else {
    button.classList.add("wrong");
    quizFeedback.textContent = `Правилно е: ${correct.en}`;
    // Also highlight the correct answer in green.
    allButtons.forEach(b => {
      if (b.textContent === correct.en) b.classList.add("correct");
    });
    speak(correct.en, "en-US");
  }

  quizScoreEl.textContent = `⭐ ${quizScore}`;

  // Move to the next question (or the result screen) after a short pause.
  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizWords.length) showQuizQuestion();
    else showResult();
  }, 1300);
}

/* ---------------------------------------------------------
   9) RESULT SCREEN
   --------------------------------------------------------- */
function showResult() {
  const total = quizWords.length;
  resultText.textContent = `Верни отговори: ${quizScore} / ${total}`;

  // A friendly message based on how well they did.
  if (quizScore === total) {
    resultEmoji.textContent = "🏆";
    resultTitle.textContent = "Отлично!";
  } else if (quizScore >= total / 2) {
    resultEmoji.textContent = "🎉";
    resultTitle.textContent = "Браво!";
  } else {
    resultEmoji.textContent = "💪";
    resultTitle.textContent = "Опитай пак!";
  }

  showScreen(resultScreen);
}

/* ---------------------------------------------------------
   10) EVENTS
   --------------------------------------------------------- */

// Tap the card: speak Bulgarian and reveal the Flip button.
flashcard.addEventListener("click", () => {
  if (!flashcard.classList.contains("flipped")) {
    speak(currentWords[currentIndex].bg, "bg-BG");
    flipBtn.classList.remove("hidden");
  }
});
flashcard.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    flashcard.click();
  }
});

// Flip to the English side.
flipBtn.addEventListener("click", () => flashcard.classList.add("flipped"));

// Speak the English word (stopPropagation so it doesn't re-trigger the card tap).
speakEnBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  speak(currentWords[currentIndex].en, "en-US");
});

// Mark / unmark this word as learned.
knowBtn.addEventListener("click", () => {
  const word = currentWords[currentIndex];
  const nowKnown = !isKnown(currentCatIndex, word.en);
  setKnown(currentCatIndex, word.en, nowKnown);
  updateKnowButton();
  updateKnownBadge();
});

// Shuffle the current deck and start over from the first card.
shuffleBtn.addEventListener("click", () => {
  currentWords = shuffled(currentWords);
  currentIndex = 0;
  showCard();
});

// Next / Previous cards.
nextBtn.addEventListener("click", () => {
  if (currentIndex < currentWords.length - 1) { currentIndex++; showCard(); }
});
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) { currentIndex--; showCard(); }
});

// Start the quiz for the current category.
quizStartBtn.addEventListener("click", startQuiz);

// Back to categories (from flashcards). Refresh home so learned counts are current.
backBtn.addEventListener("click", () => {
  window.speechSynthesis.cancel();
  buildHome();
  showScreen(homeScreen);
});

// Quiz screen: back to categories.
quizBackBtn.addEventListener("click", () => {
  window.speechSynthesis.cancel();
  buildHome();
  showScreen(homeScreen);
});

// Result screen buttons.
retryQuizBtn.addEventListener("click", startQuiz);
resultHomeBtn.addEventListener("click", () => {
  buildHome();
  showScreen(homeScreen);
});

/* ---------------------------------------------------------
   11) START THE APP
   --------------------------------------------------------- */
buildHome();
