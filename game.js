// ============================================================
// S-LA FOR DJURSLAND — game.js
// ============================================================

class DjurslandQuiz {
  constructor() {
    this.currentRound = 1;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctAnswers = 0;
    this.questions = [];
    this.timer = null;
    this.timeLeft = 30;
    this.maxTime = 30;
    this.selectedAnswer = null;
    this.pendingAnswer = null;
    this.lifelines = {
      fiftyFifty: false,
      audience: false,
      phone: false,
      extraTime: false
    };
    this.streak = 0;
    this.pollVoted = false;
    this.sounds = {};
    this.music = null;
    this.musicMuted = false;
    this.sfxMuted = false;

    // Host billeder — shuffles ved hvert spørgsmål
    this.jensImgs = [
      'jens_v3_01','jens_v3_02','jens_v3_03','jens_v3_04','jens_v3_05',
      'jens_v3_06','jens_v3_07','jens_v3_08','jens_v3_12','jens_v3_17','jens_v3_20',
      'jens_pol_04','jens_pol_05','jens_pol_11',
      'jens_politiker_01','jens_politiker_02'
    ].map(n => `assets/images/host/${n}.png`);

    this.leifImgs = [
      'leif_v3_01','leif_v3_02','leif_v3_03','leif_v3_04','leif_v3_05',
      'leif_v3_06','leif_v3_07','leif_v3_08','leif_v3_10','leif_v3_11','leif_v3_12',
      'leif_pol_05','leif_pol_06','leif_pol_09','leif_pol_11','leif_pol_13',
      'leif_politiker_01','leif_politiker_02','leif_politiker_03'
    ].map(n => `assets/images/host/${n}.png`);

    // Borgere Djursland til publikum-joker
    this.borgereImgs = [
      'borgere_01_vaelgermoede','borgere_02_haandsoprackning','borgere_03_cafe_debat',
      'borgere_04_torvet_diskussion','borgere_05_aeldrecenter','borgere_06_skole_foraeldre',
      'borgere_07_sportshal','borgere_08_stemmerum','borgere_09_frivillige',
      'borgere_10_marked','borgere_11_bibliotek','borgere_12_sankthans'
    ].map(n => `assets/images/borgere_djursland/${n}.png`);

    // Djursland fælles scener til round intro (24 billeder)
    this.djurslandScenes = [
      'faelles_01_superbrugsen','faelles_02_auning','faelles_03_grenaa_havn',
      'faelles_04_fregatten_jylland','faelles_05_kattegatcentret','faelles_06_ebeltoft',
      'faelles_07_gif_fodbold','faelles_08_svoemmehal','faelles_09_mols_bjerge',
      'faelles_10_djurs_sommerland','faelles_11_strand_natur','faelles_12_poelsevogn',
      'faelles_13_traktor_race','faelles_14_kajaktur','faelles_15_julemarked',
      'faelles_16_fisketur','faelles_17_cykeltur','faelles_18_camping',
      'faelles_19_stena_line','faelles_20_vindmoelle','faelles_21_ko_race',
      'faelles_22_sael_safari','faelles_23_ree_park','faelles_24_lokal_kro'
    ].map(n => `assets/images/faelles_djursland_scener/${n}.png`);
    this._lastScene = -1;

    // Baggrundsbilleder til spørgsmål — shuffles random
    this.bgImgs = [
      'bg_p_01_rute15','bg_p_02_grenaa_havn','bg_p_04_vindmoeller','bg_p_05_landsby',
      'bg_p_06_folkeskole','bg_p_07_mols_bjerge','bg_p_08_bolig_landet','bg_p_09_drikkevand',
      'bg_p_10_erhverv','bg_p_11_sundhedshus','bg_p_12_landbrug','bg_p_13_skat_frihed',
      'bg_p_14_foreningsliv','bg_p_15_ebeltoft','bg_p_16_christiansborg','bg_p_17_havmiljoe',
      'bg_p_18_valgplakater','bg_p_19_djurs_sommerland','bg_p_20_strand_kyst'
    ].map(n => `assets/images/scenes/${n}.png`);
    this._lastBg = -1;

    this.hostImages = {
      welcome:    'assets/images/host/jens_v3_01.png',
      correct:    'assets/images/host/jens_v3_03.png',
      wrong:      'assets/images/host/jens_v3_08.png',
      celebrate:  'assets/images/host/jens_v3_06.png',
      checkpoint: 'assets/images/host/jens_v3_07.png',
      gameover:   'assets/images/host/jens_v3_08.png',
    };

    this.experts = [
      {
        id: 'finn', name: 'Finn fra Bønnerup', emoji: '🎣',
        image: 'assets/images/experts/expert_finn_fisker.png',
        specialty: ['Fiskeri', 'Lokalt', 'Kyst'],
        confidentLines: [
          'Det ved jeg! Jeg har fisket her i 40 år – svaret er {answer}!',
          'Klart som vand! {answer} – ingen tvivl!',
          'Haha, det er nemt! {answer}!'
        ],
        unsureLines: [
          'Det er ikke noget med fiskeri... måske {answer}?',
          'Øh... jeg tror det er {answer}, men spørg en anden!',
          'Hmm, {answer}? Det er mit bedste bud.'
        ]
      },
      {
        id: 'birthe', name: 'Birthe fra Nærhospitalet', emoji: '🏥',
        image: 'assets/images/experts/expert_birthe_sygeplejerske.png',
        specialty: ['Sundhed', 'Velfærd', 'Ældrepleje'],
        confidentLines: [
          'Som sygeplejerske kan jeg sige: {answer}!',
          'Det er {answer} – det er jeg helt sikker på!',
          'Vi ser det hver dag på hospitalet: {answer}!'
        ],
        unsureLines: [
          'Det er ikke mit fagområde... {answer}?',
          'Jeg plejer patienter, ikke politik... {answer}?',
          'Hmm, {answer}? Spørg en læge!'
        ]
      },
      {
        id: 'karsten', name: 'Karsten fra Auning', emoji: '🚜',
        image: 'assets/images/experts/expert_karsten_landmand.png',
        specialty: ['Lokalt', 'Erhverv', 'Klima'],
        confidentLines: [
          'Kammerat, det er {answer}! Det ved enhver landmand!',
          '{answer}! Lige så sikkert som høsten i august!',
          'Det er {answer} – og det er ikke til diskussion!'
        ],
        unsureLines: [
          'Jeg kender mest til markerne... {answer}?',
          'Det er ikke noget vi snakker om i stalden... {answer}?',
          'Hmm, {answer}? Jeg er ikke helt sikker.'
        ]
      },
      {
        id: 'mette', name: 'Mette fra Kommunen', emoji: '🏛️',
        image: 'assets/images/experts/expert_mette_kommune.png',
        specialty: ['Infrastruktur', 'Transport', 'Skat'],
        confidentLines: [
          'Ifølge kommunens data: {answer} – 100% sikkert!',
          'Det er {answer}. Vi har behandlet det i udvalget!',
          'Kommunen har styr på det: {answer}!'
        ],
        unsureLines: [
          'Det behandler vi ikke i kommunen... {answer}?',
          'Det er ikke i vores ressort... {answer}?',
          'Hmm, {answer}? Det må du spørge staten om.'
        ]
      },
      {
        id: 'holger', name: 'Holger – Den gamle Djursbo', emoji: '📚',
        image: 'assets/images/experts/expert_holger_djursbo.png',
        specialty: ['Lokalt', 'Uddannelse', 'Velfærd'],
        confidentLines: [
          'Hør nu her – jeg har boet på Djursland i 75 år. Det er {answer}!',
          '{answer}! Det har altid været sådan her på egnen!',
          'Det er {answer} – og det kan du skrive bag øret!'
        ],
        unsureLines: [
          'Hmm, det er noget nyt... {answer}? I min tid var det anderledes.',
          'Det er ikke noget vi bekymrede os om før... {answer}?',
          'Jeg er gammel, ikke dum – men {answer}? Det er mit bedste bud.'
        ]
      }
    ];

    this.roundIntros = {
      1: { title: '🎯 Runde 1: Den Klassiske!', desc: 'Pas på – forkert svar sender dig hjem!', color: '#e74c3c' },
      2: { title: '🤔 Runde 2: Hvem Mener Det?', desc: 'Gæt om det er Jens, Leif, Begge eller Ingen!', color: '#3498db' },
      3: { title: '⚔️ Runde 3: Venskab eller Rivalisering?', desc: 'Kender du deres relation?', color: '#9b59b6' },
      4: { title: '🏆 Runde 4: Djursland Ekspert!', desc: 'Kun ægte kendere klarer denne!', color: '#f39c12' }
    };

    this.db = null;
  }

  // ============================================================
  // INIT & FIREBASE
  // ============================================================

  initFirebase(config) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      this.db = firebase.database();
    } catch (e) {
      console.warn('Firebase ikke tilgængeligt:', e);
    }
  }

  init() {
    this.loadSounds();
    this.bindButtons();
    this.bindCheats();
    this.showScreen('welcomeScene');
    this.setHostImage('welcome');
  }

  bindCheats() {
    // Cheat for fast testing: Shift+X = answer correctly
    document.addEventListener('keydown', (e) => {
      if (!e.shiftKey) return;
      if ((e.key || '').toLowerCase() !== 'x') return;

      const q = this.questions?.[this.currentQuestionIndex];
      if (!q) return;

      // Only when question scene is active
      const scene = document.getElementById('questionScene');
      if (!scene || !scene.classList.contains('active')) return;

      // Prevent double-answer
      if (this.selectedAnswer !== null) return;

      if (this.currentRound === 1 || this.currentRound === 4) {
        const btn = document.querySelector(`.answer-btn[data-index="${q.correct}"]`);
        if (btn) this.selectAnswer(q.correct, btn);
      } else if (this.currentRound === 2 || this.currentRound === 3) {
        const btn = document.querySelector(`.answer-btn[data-value="${q.answer}"]`);
        if (btn) this.selectAnswerByValue(q.answer, btn);
      }
    });
  }

  bindButtons() {
    const safe = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', fn.bind(this));
    };

    safe('startBtn',        () => this.startGame());
    safe('restartBtn',      () => this.restartGame());
    safe('nextRoundBtn',    () => this.startNextRound());
    safe('mainMenuBtn',     () => this.goToMainMenu());
    safe('shareBtn',        () => this.shareResult());
    safe('highscoreBtn',    () => this.showHighscores());
    safe('closeHighscore',  () => this.hideHighscores());
    safe('submitScoreBtn',  () => this.submitScore());
    safe('muteMusic',       () => this.toggleMusic());
    safe('muteSfx',         () => this.toggleSfx());

    // Joker-knapper
    safe('lifeline5050',    () => this.useFiftyFifty());
    safe('lifelineAudience',() => this.useAudience());
    safe('lifelinePhone',   () => this.usePhone());
    safe('lifelineTime',    () => this.useExtraTime());

    // Poll
    safe('voteRed',    () => this.votePoll('red'));
    safe('voteBlue',   () => this.votePoll('blue'));
    safe('voteUnsure', () => this.votePoll('unsure'));
    safe('voteSilent', () => this.votePoll('silent'));

    // Intro-knap
    safe('startRoundBtn', () => this.beginRound());
  }

  // ============================================================
  // LYD
  // ============================================================

  loadSounds() {
    const soundFiles = {
      correct:     'assets/sounds/Correct - Synthetic Chime.MP3',
      wrong:       'assets/sounds/Buzzer 1.MP3',
      click:       'assets/sounds/Click - Single.MP3',
      applause:    'assets/sounds/Applause - Large Crowd 1.MP3',
      sad:         'assets/sounds/Sad Trombone 1.MP3',
      alert:       'assets/sounds/Alert - Tense.MP3',
      celebrate:   'assets/sounds/Celebratory Jingle 1.MP3',
      checkpoint:  'assets/sounds/Checkpoint Riser.aac',
      drumroll:    'assets/sounds/Drumroll 1.mp3',
      whoosh:      'assets/sounds/Whoosh - Achievement.MP3',
      ding:        'assets/sounds/Ding - Single - Bright.MP3',
      cheer:       'assets/sounds/Crowd - Cheering - Large 1.MP3',
      groan:       'assets/sounds/Crowd - Disappointed Groans.MP3',
      explosion:   'assets/sounds/Explosion 1.MP3',
      wah:         'assets/sounds/Wah Wah Waah.MP3',
      dramatic:    'assets/sounds/Dramatic Buildup 1.MP3',
    };
    for (const [key, src] of Object.entries(soundFiles)) {
      const audio = new Audio(src);
      audio.preload = 'auto';
      this.sounds[key] = audio;
    }
  }

  playSound(name) {
    if (this.sfxMuted) return;
    const snd = this.sounds[name];
    if (!snd) return;
    snd.currentTime = 0;
    snd.play().catch(() => {});
  }

  playMusic(src, loop = true) {
    if (this.music) {
      this.music.pause();
    }
    this.music = new Audio(src);
    this.music.loop = loop;
    this.music.volume = 0.35;
    if (!this.musicMuted) this.music.play().catch(() => {});
  }

  toggleMusic() {
    this.musicMuted = !this.musicMuted;
    if (this.music) {
      if (this.musicMuted) this.music.pause();
      else this.music.play().catch(() => {});
    }
    const btn = document.getElementById('muteMusic');
    if (btn) btn.textContent = this.musicMuted ? '🔇 Musik' : '🎵 Musik';
  }

  toggleSfx() {
    this.sfxMuted = !this.sfxMuted;
    const btn = document.getElementById('muteSfx');
    if (btn) btn.textContent = this.sfxMuted ? '🔇 Lyd' : '🔊 Lyd';
  }

  // ============================================================
  // SKÆRME
  // ============================================================

  showScreen(id) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
    // Tandhjul + footer kun synlig på welcome
    const onWelcome = id === 'welcomeScene';
    const settingsBtn = document.getElementById('settingsBtn');
    const ericFooter = document.querySelector('.eric-footer');
    if (settingsBtn) settingsBtn.style.display = onWelcome ? '' : 'none';
    if (ericFooter)  ericFooter.style.display  = onWelcome ? '' : 'none';
  }

  // Hjælpefunktion: vælg random element fra array
  _rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Random baggrundsbillede til spørgsmål (undgår samme to gange i træk)
  _randomBg() {
    let idx;
    do { idx = Math.floor(Math.random() * this.bgImgs.length); }
    while (idx === this._lastBg && this.bgImgs.length > 1);
    this._lastBg = idx;
    return this.bgImgs[idx];
  }

  setHostImage(state) {
    // Brug _currentHost hvis sat (så feedback matcher spørgsmålets kandidat)
    const candidate = this._currentHost || (this.currentRound === 2 || this.currentRound === 3 ? 'leif' : 'jens');
    if (state === 'welcome' || state === 'checkpoint') {
      // Welcome/checkpoint: altid Jens
      const img = document.getElementById('hostImage') || document.getElementById('roundIntroHostImg');
      if (img) img.src = this._rand(this.jensImgs);
    } else {
      this._setHostImg(candidate);
    }
  }

  // Vælg host-billede baseret på spørgsmålets host-felt
  // Gemmer også hvilken kandidat der er aktiv så feedback-scener bruger samme
  setHostImageForQuestion(q) {
    const host = q?.host || 'random';
    // Bestem kandidat og gem til brug i feedback-scener
    if (host === 'jens') {
      this._currentHost = 'jens';
    } else if (host === 'leif') {
      this._currentHost = 'leif';
    } else if (host === 'both') {
      this._currentHost = this.currentQuestionIndex % 2 === 0 ? 'jens' : 'leif';
    } else {
      this._currentHost = Math.random() > 0.5 ? 'jens' : 'leif';
    }
    this._setHostImg(this._currentHost, true); // forceNew: nyt spørgsmål = nyt billede
  }

  // Sæt host-billede på alle synlige host-img elementer
  // Ved nyt spørgsmål vælges et nyt tilfældigt billede og gemmes i _currentHostImg
  // så feedback-scener (correct/wrong) bruger SAMME billede
  _setHostImg(candidate, forceNew = false) {
    const pool = candidate === 'leif' ? this.leifImgs : this.jensImgs;
    // Vælg nyt billede kun når forceNew=true (ved nyt spørgsmål)
    // Ellers genbrug det gemte billede så rytmen holdes
    if (forceNew || !this._currentHostImg) {
      this._currentHostImg = this._rand(pool);
    }
    const src = this._currentHostImg;
    const ids = ['hostImage','questionHostImg','correctHostImg','wrongHostImg',
                 'correctSpeechHost','wrongSpeechHost','roundIntroHostImg'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.src = src;
    });
  }

  // Skift baggrundsbillede på spørgsmåls-scenen
  setRandomBg() {
    const bg = document.getElementById('questionBgImg') ||
               document.querySelector('#questionScene .scene-bg-img') ||
               document.querySelector('#questionScene .scene-bg img');
    if (bg) bg.src = this._randomBg();
  }

  setHostImageRight(state) {
    const img = document.getElementById('hostImageRight');
    if (!img) return;
    img.src = this._rand(this.jensImgs);
  }

  // ============================================================
  // SPIL-FLOW
  // ============================================================

  startGame() {
    this.currentRound = 1;
    this.score = 0;
    this.correctAnswers = 0;
    this.streak = 0;
    this.lifelines = { fiftyFifty: false, audience: false, phone: false, extraTime: false };
    this.pollVoted = false;
    this.updateScoreDisplay();
    this.showRoundIntro(1);
    this.playMusic('assets/music/Ian Post - Breaking Point.mp3');
  }

  restartGame() {
    this.startGame();
  }

  goToMainMenu() {
    this.stopTimer();
    if (this.music) this.music.pause();
    this.showScreen('welcomeScene');
    this.setHostImage('welcome');
  }

  showRoundIntro(round) {
    const intro = this.roundIntros[round];
    const titleEl = document.getElementById('roundIntroTitle');
    const descEl  = document.getElementById('roundIntroDesc');
    if (titleEl) titleEl.textContent = intro.title;
    if (descEl)  descEl.textContent  = intro.desc;

    // Round badge
    const badge = document.getElementById('roundBadgeBig');
    if (badge) badge.textContent = 'RUNDE ' + round;

    // Rules
    const lifeText = document.getElementById('roundRuleLifeText');
    if (lifeText) lifeText.textContent = 'Ét forkert svar = Game Over!';
    const timerText = document.getElementById('roundRuleTimer');
    if (timerText) timerText.textContent = this.maxTime + ' sekunder pr. spørgsmål';
    const ptsText = document.getElementById('roundRulePoints');
    const pts = { 1: '1000', 2: '500', 3: '500', 4: '1500' }[round];
    if (ptsText) ptsText.textContent = pts + ' point pr. korrekt svar';

    // Speech bubble
    const speeches = {
      1: 'Er du klar? Ét forkert svar og det er slut! 😊',
      2: 'Kender du Jens og Leifs holdninger? 🤔',
      3: 'Samarbejde eller rivalisering? Du bestemmer! ⚔️',
      4: 'Finalen! Kun ægte Djursland-kendere klarer denne! 🏆'
    };
    const speechEl = document.getElementById('roundIntroSpeechText');
    if (speechEl) speechEl.textContent = speeches[round] || '';

    // Sæt random Djursland baggrundsbillede
    let sceneIdx;
    do { sceneIdx = Math.floor(Math.random() * this.djurslandScenes.length); }
    while (sceneIdx === this._lastScene && this.djurslandScenes.length > 1);
    this._lastScene = sceneIdx;
    const introBg = document.getElementById('roundIntroBgImg');
    if (introBg) introBg.src = this.djurslandScenes[sceneIdx];

    this.showScreen('roundIntroScene');
    this.playSound('checkpoint');
  }

  beginRound() {
    this.currentQuestionIndex = 0;
    this.loadQuestions();
    this.showScreen('questionScene');
    this.renderLifelines();
    this.showQuestion();
  }

  startNextRound() {
    this.currentRound++;
    if (this.currentRound > 4) {
      this.showVictory();
    } else {
      this.showRoundIntro(this.currentRound);
    }
  }

  // ============================================================
  // SPØRGSMÅL
  // ============================================================

  loadQuestions() {
    const pool = window.quizData[`runde${this.currentRound}`];
    if (!pool) { console.error('Ingen data for runde', this.currentRound); return; }
    // 10 tilfældige spørgsmål per runde (shufflet)
    this.questions = this.shuffle([...pool]).slice(0, 10);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  showQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endRound();
      return;
    }
    const q = this.questions[this.currentQuestionIndex];
    this.selectedAnswer = null;
    this.pendingAnswer = null;

    this.updateProgress();
    this.setRandomBg();
    this.setHostImageForQuestion(q);
    this.renderQuestion(q);
    this.startTimer();
  }

  updateProgress() {
    const el = document.getElementById('questionProgress');
    if (el) el.textContent = `Spørgsmål ${this.currentQuestionIndex + 1} / ${this.questions.length}`;
    const bar = document.getElementById('timerBar'); // timerBar doubles as progress indicator
    // Note: timerBar is the timer fill — don't overwrite it here
  }

  renderQuestion(q) {
    const textEl   = document.getElementById('questionText');
    const answersEl= document.getElementById('answersContainer');
    const roundEl  = document.getElementById('roundLabel');
    if (roundEl) roundEl.textContent = `Runde ${this.currentRound}`;

    // Category badge
    const catName = document.getElementById('categoryName');
    if (catName) catName.textContent = q.category || '';
    const catBadge = document.getElementById('categoryBadge');
    if (catBadge) catBadge.style.display = q.category ? 'flex' : 'none';

    // Streak display
    const streakEl = document.getElementById('streakDisplay');
    if (streakEl) streakEl.style.display = this.streak >= 2 ? 'flex' : 'none';
    const streakCount = document.getElementById('streakCount');
    if (streakCount) streakCount.textContent = this.streak;

    if (this.currentRound === 1 || this.currentRound === 4) {
      if (textEl) textEl.textContent = q.question;
      this.renderClassicAnswers(q, answersEl);
    } else if (this.currentRound === 2) {
      if (textEl) textEl.textContent = q.statement;
      this.renderRound2Answers(answersEl);
    } else if (this.currentRound === 3) {
      if (textEl) textEl.textContent = q.situation;
      this.renderRound3Answers(answersEl);
    }
  }

  renderClassicAnswers(q, container) {
    if (!container) return;
    container.innerHTML = '';

    const labels = ['A', 'B', 'C', 'D'];

    // Shuffle svarene tilfældigt og opdater q.correct
    const answers = [...q.answers];
    const correctAns = answers[q.correct];
    const indices = answers.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const shuffled = indices.map(i => answers[i]);
    // Gem original og sæt ny korrekt position
    q._origCorrect = q.correct;
    q.correct = shuffled.indexOf(correctAns);

    shuffled.forEach((ans, i) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.dataset.index = i;
      btn.innerHTML = `<span class="answer-label">${labels[i]}</span><span class="answer-text">${ans}</span>`;
      btn.addEventListener('click', () => this.selectAnswer(i, btn));
      container.appendChild(btn);
    });
  }

  renderRound2Answers(container) {
    if (!container) return;
    container.innerHTML = '';
    const opts = [
      { value: 'J', label: '🧑 Jens' },
      { value: 'L', label: '👴 Leif' },
      { value: 'B', label: '🤝 Begge' },
      { value: 'I', label: '❌ Ingen' },
    ];
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.dataset.value = opt.value;
      btn.textContent = opt.label;
      btn.addEventListener('click', () => this.selectAnswerByValue(opt.value, btn));
      container.appendChild(btn);
    });
  }

  renderRound3Answers(container) {
    if (!container) return;
    container.innerHTML = '';
    const opts = [
      { value: 'samarbejde',  label: '🤝 Samarbejde' },
      { value: 'rivalisering',label: '⚔️ Rivalisering' },
      { value: 'begge',       label: '🔄 Begge dele' },
    ];
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.dataset.value = opt.value;
      btn.textContent = opt.label;
      btn.addEventListener('click', () => this.selectAnswerByValue(opt.value, btn));
      container.appendChild(btn);
    });
  }

  selectAnswer(index, btn) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = index;
    this.playSound('click');
    document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
    if (btn && btn.classList) btn.classList.add('selected');
    this.setHostImage('thinking');
    setTimeout(() => this.confirmAnswer(), 800);
  }

  selectAnswerByValue(value, btn) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = value;
    this.playSound('click');
    document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
    if (btn && btn.classList) btn.classList.add('selected');
    this.setHostImage('thinking');
    setTimeout(() => this.confirmAnswerByValue(), 800);
  }

  confirmAnswer() {
    this.stopTimer();
    const q = this.questions[this.currentQuestionIndex];
    const correct = this.selectedAnswer === q.correct;
    this.processResult(correct, q);
  }

  confirmAnswerByValue() {
    this.stopTimer();
    const q = this.questions[this.currentQuestionIndex];
    const correct = this.selectedAnswer === q.answer;
    this.processResult(correct, q);
  }

  processResult(correct, q) {
    const btns = document.querySelectorAll('.answer-btn');
    let correctLabel = '';
    let selectedLabel = '';

    if (this.currentRound === 1 || this.currentRound === 4) {
      btns.forEach((btn, i) => {
        // Brug textContent direkte (ingen .answer-text span i renderClassicAnswers)
        const label = btn.querySelector('.answer-text')?.textContent || btn.textContent.trim();
        if (i === q.correct) { btn.classList.add('correct'); correctLabel = label || q.answers?.[q.correct] || ''; }
        else if (i === this.selectedAnswer) { btn.classList.add('wrong'); selectedLabel = label || q.answers?.[this.selectedAnswer] || ''; }
      });
    } else {
      btns.forEach(btn => {
        const label = btn.querySelector('.answer-text')?.textContent || btn.textContent.trim();
        if (btn.dataset.value === q.answer) { btn.classList.add('correct'); correctLabel = label || q.answer; }
        else if (btn.dataset.value === this.selectedAnswer) { btn.classList.add('wrong'); selectedLabel = label || String(this.selectedAnswer); }
      });
    }

    // Store for feedback scene
    this._correctLabel  = correctLabel;
    this._selectedLabel = selectedLabel;

    if (correct) {
      this.handleCorrect(q);
    } else {
      this.handleWrong(q);
    }
  }

  handleCorrect(q) {
    this.streak++;
    this.correctAnswers++;
    const points = this.calcPoints();
    this.score += points;
    this.updateScoreDisplay();
    this.setHostImage('correct');
    this.playSound('correct');
    if (this.streak >= 3) this.playSound('cheer');
    this.showFeedback(true, points, q.explanation);
  }

  handleWrong(q) {
    this.streak = 0;
    this.setHostImage('wrong');
    this.playSound('wrong');
    this.playSound('sad');
    // Wrong answer = game over in all rounds
    this.showFeedback(false, 0, q.explanation, true);
  }

  calcPoints() {
    const base = { 1: 1000, 2: 500, 3: 500, 4: 1500 }[this.currentRound] || 500;
    const timeBonus = Math.floor((this.timeLeft / this.maxTime) * 200);
    const streakBonus = this.streak >= 3 ? 100 : 0;
    return base + timeBonus + streakBonus;
  }

  showFeedback(correct, points, explanation, gameOver = false) {
    // Clear any existing timers
    if (this._feedbackInterval) clearInterval(this._feedbackInterval);
    if (this._feedbackTimeout) clearTimeout(this._feedbackTimeout);
    this._feedbackGameOver = gameOver; // used by skipFeedback()

    const secs = gameOver ? 4 : 3;
    const onDone = gameOver ? () => this.showGameOver() : () => this.nextQuestion();

    if (correct) {
      const factEl = document.getElementById('correctFact');
      if (factEl) factEl.textContent = explanation || '';
      const ptsEl = document.querySelector('#pointsEarned .points-value');
      if (ptsEl) ptsEl.textContent = '+' + points;
      const answerTextEl = document.getElementById('correctAnswerText');
      if (answerTextEl) answerTextEl.textContent = this._correctLabel ? `✅ ${this._correctLabel}` : '';
      this.showScreen('correctScene');
      this._startFeedbackCountdown('correctCountdown', secs, onDone);
    } else {
      const factEl = document.getElementById('wrongFact');
      if (factEl) factEl.textContent = explanation || '';
      const continueEl = document.getElementById('wrongContinue');
      if (continueEl) continueEl.style.display = 'none'; // always auto-continue
      const selEl = document.getElementById('wrongSelectedAnswer');
      if (selEl) selEl.textContent = this._selectedLabel || '?';
      const corrEl = document.getElementById('wrongCorrectAnswer');
      if (corrEl) corrEl.textContent = this._correctLabel || '?';
      this.showScreen('wrongScene');
      this._startFeedbackCountdown('wrongCountdown', secs, onDone);
    }
  }

  _startFeedbackCountdown(countdownId, seconds, onDone) {
    let t = seconds;
    const el = document.getElementById(countdownId);
    if (el) el.textContent = t;

    // Display timer (setInterval) — only updates the number
    this._feedbackInterval = setInterval(() => {
      t--;
      if (el) el.textContent = Math.max(t, 0);
      if (t <= 0) {
        clearInterval(this._feedbackInterval);
        this._feedbackInterval = null;
      }
    }, 1000);

    // Action timer (setTimeout) — fires the transition, cannot be blocked by re-entry
    this._feedbackTimeout = setTimeout(() => {
      clearInterval(this._feedbackInterval);
      this._feedbackInterval = null;
      this._feedbackTimeout = null;
      onDone();
    }, seconds * 1000);
  }

  skipFeedback() {
    if (this._feedbackInterval) { clearInterval(this._feedbackInterval); this._feedbackInterval = null; }
    if (this._feedbackTimeout)  { clearTimeout(this._feedbackTimeout);   this._feedbackTimeout  = null; }
    if (this._feedbackGameOver) this.showGameOver();
    else this.nextQuestion();
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.showScreen('questionScene');
    this.showQuestion();
  }

  endRound() {
    this.stopTimer();
    this.playSound('celebrate');
    this.setHostImage('celebrate');

    // Runde 4 færdig = sejr!
    if (this.currentRound >= 4) {
      this.showVictory();
      return;
    }

    // Populate checkpoint stats
    const roundNames = { 1: 'Runde 1', 2: 'Runde 2', 3: 'Runde 3', 4: 'Runde 4' };
    const nextNames  = { 1: 'Runde 2: Hvem mener det?', 2: 'Runde 3: Samarbejde eller rivalisering?', 3: 'Runde 4: Djursland-ekspert' };
    const titleEl = document.getElementById('checkpointTitle');
    if (titleEl) titleEl.textContent = `${roundNames[this.currentRound]} klaret! 🎉`;
    const scoreEl = document.getElementById('checkpointScore');
    if (scoreEl) scoreEl.textContent = this.score.toLocaleString();
    const correctEl = document.getElementById('checkpointCorrect');
    if (correctEl) correctEl.textContent = `${this.correctAnswers} / ${this.questions.length}`;
    const streakEl = document.getElementById('checkpointStreak');
    if (streakEl) streakEl.textContent = this.streak;
    const nextEl = document.getElementById('checkpointNextDesc');
    if (nextEl) nextEl.textContent = nextNames[this.currentRound] || '';

    // Progress indicators R1-R4
    for (let r = 1; r <= 4; r++) {
      const prog = document.getElementById('progressR' + r);
      if (prog) {
        prog.classList.toggle('done', r <= this.currentRound);
        prog.classList.toggle('current', r === this.currentRound + 1);
      }
    }
    this.showScreen('checkpointScene');
    this.playSound('checkpoint');
  }

  // ============================================================
  // TIMER
  // ============================================================

  startTimer() {
    this.stopTimer();
    this.timeLeft = this.maxTime;
    this.updateTimerDisplay();
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft === 10) this.playSound('alert'); // only once at 10s
      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.timeExpired();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updateTimerDisplay() {
    const el  = document.getElementById('timerText');
    const bar = document.getElementById('timerBar');
    if (el)  el.textContent = this.timeLeft;
    if (bar) bar.style.width = `${(this.timeLeft / this.maxTime) * 100}%`;
    if (bar) {
      bar.style.backgroundColor =
        this.timeLeft > 15 ? '#2ecc71' :
        this.timeLeft > 8  ? '#f39c12' : '#e74c3c';
    }
  }

  timeExpired() {
    const q = this.questions[this.currentQuestionIndex];
    this.selectedAnswer = -1;
    this.handleWrong(q);
  }

  // ============================================================
  // JOKERS / LIFELINES
  // ============================================================

  renderLifelines() {
    const ids  = ['lifeline5050','lifelineAudience','lifelinePhone','lifelineTime'];
    const keys = ['fiftyFifty','audience','phone','extraTime'];
    ids.forEach((id, i) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      const used = this.lifelines[keys[i]];
      btn.disabled = used;
      btn.style.opacity    = used ? '0' : '1';
      btn.style.visibility = used ? 'hidden' : 'visible';
      btn.style.pointerEvents = used ? 'none' : '';
    });
  }

  useFiftyFifty() {
    if (this.lifelines.fiftyFifty) return;
    if (this.currentRound === 2 || this.currentRound === 3) return;
    this.lifelines.fiftyFifty = true;
    this.renderLifelines();
    this.score -= 200;
    this.updateScoreDisplay();
    this.playSound('whoosh');

    const q = this.questions[this.currentQuestionIndex];
    const btns = document.querySelectorAll('.answer-btn');
    let removed = 0;
    btns.forEach((btn, i) => {
      if (i !== q.correct && removed < 2) {
        btn.style.visibility = 'hidden';
        removed++;
      }
    });
    document.getElementById('lifeline5050').disabled = true;
  }

  useAudience() {
    if (this.lifelines.audience) return;
    this.lifelines.audience = true;
    this.renderLifelines();
    this.score -= 200;
    this.updateScoreDisplay();
    // Sæt random borgere baggrundsbillede
    const bgEl = document.getElementById('audienceBgImg');
    if (bgEl) bgEl.src = this._rand(this.borgereImgs);
    this.playSound('dramatic');

    const q = this.questions[this.currentQuestionIndex];
    const modal = document.getElementById('audienceModal');
    const chart = document.getElementById('audienceResults');
    if (!modal || !chart) return;

    const correct = this.currentRound <= 1 ? q.correct : null;
    const numAnswers = (this.currentRound === 3) ? 3 : 4;
    const votes = this.generateAudienceVotes(numAnswers, correct);

    chart.innerHTML = '';
    votes.forEach((pct, i) => {
      const letter = String.fromCharCode(65 + i);
      const bar = document.createElement('div');
      bar.className = 'audience-bar';
      bar.innerHTML = `
        <span class="audience-label">${letter}</span>
        <div class="audience-bar-fill">
          <div class="audience-bar-inner" style="width:0%" data-pct="${pct}"></div>
        </div>
        <span class="audience-percent">${pct}%</span>
      `;
      chart.appendChild(bar);
    });
    modal.classList.add('active');
    // Animate bars after paint
    requestAnimationFrame(() => {
      chart.querySelectorAll('.audience-bar-inner').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    });
    this.stopTimer();
    document.getElementById('lifelineAudience').disabled = true;
  }

  generateAudienceVotes(count, correctIndex) {
    const votes = Array(count).fill(0);
    let remaining = 100;
    if (correctIndex !== null && correctIndex < count) {
      votes[correctIndex] = 45 + Math.floor(Math.random() * 25);
      remaining -= votes[correctIndex];
    }
    for (let i = 0; i < count; i++) {
      if (votes[i] === 0) {
        const share = i === count - 1
          ? remaining
          : Math.floor(Math.random() * (remaining / (count - i)));
        votes[i] = share;
        remaining -= share;
      }
    }
    return votes;
  }

  getAnswerLabel(index, q) {
    if (this.currentRound === 2) return ['J','L','B','I'][index] || index;
    if (this.currentRound === 3) return ['Samarbejde','Rivalisering','Begge'][index] || index;
    return q.answers ? q.answers[index] : index;
  }

  usePhone() {
    console.log('=== usePhone() kaldt ===');
    if (this.lifelines.phone) return;
    this.lifelines.phone = true;
    this.renderLifelines();
    this.score -= 200;
    this.updateScoreDisplay();
    this.playSound('drumroll');

    const q = this.questions[this.currentQuestionIndex];
    const category = q.category || 'Lokalt';
    const expert = this.pickExpert(category);
    const correctLabel = this.getCorrectLabel(q);
    const isConfident = Math.random() > 0.35;
    const lines = isConfident ? expert.confidentLines : expert.unsureLines;
    const line = lines[Math.floor(Math.random() * lines.length)].replace('{answer}', correctLabel);

    // Build expert grid dynamically (like lager-quiz — no phoneModal)
    console.log('expertGrid element:', document.getElementById('expertGrid'));
    console.log('expertModal element:', document.getElementById('expertModal'));
    const grid = document.getElementById('expertGrid');
    if (grid) {
      grid.innerHTML = '';
      this.experts.forEach(expert => {
        const card = document.createElement('div');
        card.className = 'expert-card';
        card.innerHTML = `
          <img src="${expert.image}" alt="${expert.name}" class="expert-avatar">
          <div class="expert-info">
            <div class="expert-name">${expert.emoji} ${expert.name}</div>
            <div class="expert-specialty">${expert.specialty.join(' • ')}</div>
          </div>
        `;
        card.addEventListener('click', () => this.callExpert(expert, q));
        grid.appendChild(card);
      });
    }
    const bgEl = document.getElementById('expertBgImg');
    if (bgEl) bgEl.src = this._rand(this.borgereImgs);
    const expertModal = document.getElementById('expertModal');
    console.log('expertModal fundet:', expertModal);
    if (expertModal) {
      expertModal.classList.add('active');
      console.log('expertModal classes efter add:', expertModal.className);
      console.log('expertModal computed display:', window.getComputedStyle(expertModal).display);
    } else console.warn('expertModal IKKE fundet i HTML!');
    this.stopTimer();
    document.getElementById('lifelinePhone').disabled = true;
  }

  pickExpert(category) {
    const matches = this.experts.filter(e => e.specialty.includes(category));
    const pool = matches.length > 0 ? matches : this.experts;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  getCorrectLabel(q) {
    if (this.currentRound === 2) {
      return { J: 'Jens', L: 'Leif', B: 'Begge', I: 'Ingen' }[q.answer] || q.answer;
    }
    if (this.currentRound === 3) {
      return { samarbejde: 'Samarbejde', rivalisering: 'Rivalisering', begge: 'Begge dele' }[q.answer] || q.answer;
    }
    // Brug q.correct som er sat til targetPos efter shuffle i renderClassicAnswers
    // Hent tekst direkte fra DOM-knapperne (de er allerede renderet korrekt)
    const btns = document.querySelectorAll('.answer-btn');
    if (btns[q.correct]) {
      return btns[q.correct].querySelector('.answer-text')?.textContent ||
             btns[q.correct].textContent.trim();
    }
    return q.answers ? q.answers[q.correct] : '?';
  }

  useExtraTime() {
    if (this.lifelines.extraTime) return;
    this.lifelines.extraTime = true;
    this.renderLifelines();
    this.score -= 200;
    this.updateScoreDisplay();
    this.playSound('ding');
    this.timeLeft = Math.min(this.timeLeft + 15, this.maxTime + 15); // allow over max
    this.updateTimerDisplay();
    document.getElementById('lifelineTime').disabled = true;
  }

  // ============================================================
  // GAME OVER & SEJR
  // ============================================================

  showGameOver() {
    this.stopTimer();
    if (this.music) this.music.pause();
    this.playSound('wah');
    this.setHostImage('gameover');

    const el = document.getElementById('gameOverScore');
    if (el) el.textContent = this.score;
    const roundEl = document.getElementById('gameOverRound');
    if (roundEl) roundEl.textContent = `Runde ${this.currentRound}, spørgsmål ${this.currentQuestionIndex + 1}`;
    const correctEl = document.getElementById('gameOverCorrect');
    if (correctEl) correctEl.textContent = this.correctAnswers;
    const subtitleEl = document.getElementById('gameOverSubtitle');
    if (subtitleEl) {
      const msgs = ['Bedre held næste gang!', 'Tæt på — prøv igen!', 'Du lærer mere for hver gang!'];
      subtitleEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    }
    this.showScreen('gameOverScene');
  }

  showVictory() {
    this.stopTimer();
    if (this.music) this.music.pause();
    this.playMusic('assets/music/Veaceslav Draganov - Awards.mp3', false);
    this.playSound('applause');
    this.setHostImage('celebrate');

    const scoreEl = document.getElementById('victoryScore');
    if (scoreEl) scoreEl.textContent = this.score;
    const accuracyEl = document.getElementById('victoryAccuracy');
    if (accuracyEl) {
      const total = 120; // 40+30+20+30
      const pct = Math.round((this.correctAnswers / total) * 100);
      accuracyEl.textContent = pct + '%';
    }
    const timeEl = document.getElementById('victoryTime');
    if (timeEl) timeEl.textContent = this.correctAnswers + ' / 120';
    this.showScreen('victoryScene');
    // Navigate to poll after 3 seconds
    setTimeout(() => this.showPoll(), 3000);
  }

  // ============================================================
  // SCORE DISPLAY
  // ============================================================

  updateScoreDisplay() {
    const el = document.getElementById('scoreDisplay');
    if (el) el.textContent = this.score.toLocaleString();
  }

  // ============================================================
  // MENINGSMÅLING (Firebase)
  // ============================================================

  showPollSection() {
    // Legacy: now just navigates to pollScene
    this.showPoll();
  }

  votePoll(choice) {
    if (this.pollVoted) return;
    this.pollVoted = true;
    this.playSound('click');

    if (this.db) {
      const ref = this.db.ref('djursland_poll/votes/' + choice);
      ref.transaction(val => (val || 0) + 1);
      this.listenPollResults();
    } else {
      // Offline fallback
      this.showPollResults({ red: 42, blue: 31, unsure: 18, silent: 9 });
    }

    const btns = document.querySelectorAll('.poll-btn');
    btns.forEach(b => b.disabled = true);

    const shareBtn = document.getElementById('sharePollBtn');
    if (shareBtn) shareBtn.style.display = 'inline-block';
  }

  listenPollResults() {
    if (!this.db) return;
    this.db.ref('djursland_poll/votes').on('value', snap => {
      const data = snap.val() || {};
      this.showPollResults(data);
    });
  }

  showPollResults(data) {
    const total = (data.red || 0) + (data.blue || 0) + (data.unsure || 0) + (data.silent || 0);
    if (total === 0) return;

    const pct = v => Math.round(((v || 0) / total) * 100);
    const results = [
      { key: 'red',    label: '🔴 Rød Blok',   color: '#e74c3c' },
      { key: 'blue',   label: '🔵 Blå Blok',   color: '#3498db' },
      { key: 'unsure', label: '🤔 I tvivl',     color: '#f39c12' },
      { key: 'silent', label: '🤐 Vil ikke',    color: '#95a5a6' },
    ];

    const container = document.getElementById('pollResults');
    if (!container) return;
    container.innerHTML = '';
    results.forEach(r => {
      const p = pct(data[r.key]);
      const votes = data[r.key] || 0;
      const row = document.createElement('div');
      row.className = 'poll-result-row';
      row.innerHTML = `
        <span class="poll-label">${r.label}</span>
        <div class="poll-bar-wrap">
          <div class="poll-bar" style="width:${p}%;background:${r.color}"></div>
        </div>
        <span class="poll-pct">${p}% (${votes} stemmer)</span>
      `;
      container.appendChild(row);
    });
    container.style.display = 'block';
  }

  // ============================================================
  // DEL DIT RESULTAT
  // ============================================================

  shareResult() {
    const url = window.location.href;
    const text = `Jeg klarede S-LA for Djursland quizzen! 🗳️ Score: ${this.score} point. Kender du Djurslands to politikere? Spil her: ${url}`;
    if (navigator.share) {
      navigator.share({ title: 'S-LA for Djursland', text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Resultat kopieret til udklipsholder! 📋');
      }).catch(() => {
        prompt('Kopier dette link:', text);
      });
    }
  }

  // ============================================================
  // HIGHSCORE (Firebase)
  // ============================================================

  showHighscores() {
    this.showScreen('highscoreModal');
    this.loadHighscores();
  }

  hideHighscores() {
    this.showScreen('welcomeScene');
  }

  // Alias
  goHome() { this.goToMainMenu(); }

  showPoll() {
    this.showScreen('pollScene');
    if (this.db) this.listenPollResults();
  }

  filterHighscore(filter) {
    // Tab UI only — full filtering can be added later
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const tab = document.getElementById('tab' + filter.charAt(0).toUpperCase() + filter.slice(1));
    if (tab) tab.classList.add('active');
    this.loadHighscores();
  }

  closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    if (modal) modal.style.display = 'none';
  }

  closeAudienceModal() {
    const modal = document.getElementById('audienceModal');
    if (modal) modal.classList.remove('active');
    this.startTimer();
  }

  callExpert(expert, q) {
    console.log('=== callExpert() kaldt ===', expert.name);
    // Luk ekspert-vælg modal
    const selModal = document.getElementById('expertModal');
    if (selModal) selModal.classList.remove('active');

    const correctLabel = this.getCorrectLabel(q);
    const isConfident = Math.random() > 0.35;
    const lines = isConfident ? expert.confidentLines : expert.unsureLines;
    const line = lines[Math.floor(Math.random() * lines.length)].replace('{answer}', correctLabel);

    // Vis ekspert-svar modal
    const emoji = document.getElementById('expertAnswerEmoji');
    const name  = document.getElementById('expertAnswerName');
    const text  = document.getElementById('expertAnswerText');
    const img   = document.getElementById('expertAnswerImg');
    if (emoji) emoji.textContent = expert.emoji;
    if (name)  name.textContent  = expert.name;
    if (text)  text.textContent  = line;
    if (img)   img.src           = expert.image;

    const abgEl = document.getElementById('expertAnswerBgImg');
    if (abgEl) abgEl.src = this._rand(this.borgereImgs);
    const ansModal = document.getElementById('expertAnswerModal');
    console.log('expertAnswerModal fundet:', ansModal);
    console.log('emoji el:', document.getElementById('expertAnswerEmoji'));
    console.log('name el:', document.getElementById('expertAnswerName'));
    console.log('text el:', document.getElementById('expertAnswerText'));
    if (ansModal) {
      ansModal.classList.add('active');
      console.log('expertAnswerModal classes:', ansModal.className);
      console.log('expertAnswerModal display:', window.getComputedStyle(ansModal).display);
    } else console.error('expertAnswerModal IKKE fundet i HTML!');
  }

  closeExpertAnswer() {
    document.getElementById('expertAnswerModal').classList.remove('active');
    this.startTimer();
  }

  continueAfterWrong() {
    this.nextQuestion();
  }

  toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    if (!panel) return;
    panel.classList.toggle('active');
  }

  selectHost(host) { /* future: swap host images */ }
  setTimerSpeed(val) {
    this.maxTime = val === 'fast' ? 20 : val === 'slow' ? 45 : 30;
  }
  toggleDarkMode() { /* already dark */ }
  resetProgress() {
    if (confirm('Nulstil al fremgang?')) this.startGame();
  }

  async saveScoreInline(context) {
    const nameEl = document.getElementById(context + 'Name');
    const cityEl = document.getElementById(context + 'City');
    const msgEl  = document.getElementById(context + 'SavedMsg');
    const gemBtn = document.getElementById(context + 'GemBtn');
    const name = nameEl ? nameEl.value.trim() : '';
    const city = cityEl ? cityEl.value.trim() : '';
    // Gem navn+by lokalt så det huskes til næste gang
    if (name) localStorage.setItem('quiz_player_name', name);
    if (city) localStorage.setItem('quiz_player_city', city);
    await this.saveHighscore(name || 'Anonym', this.score, this.currentRound, city);
    // Vis gemt besked
    if (msgEl) msgEl.style.display = 'block';
    // Deaktiver KUN input + gem-knap (ikke navigationsknapper)
    if (nameEl) nameEl.disabled = true;
    if (cityEl) cityEl.disabled = true;
    if (gemBtn) gemBtn.disabled = true;
  }

  // Forudfyld navn+by fra localStorage når highscore-formular vises
  prefillPlayerInfo(context) {
    const savedName = localStorage.getItem('quiz_player_name') || '';
    const savedCity = localStorage.getItem('quiz_player_city') || '';
    const nameEl = document.getElementById(context + 'Name');
    const cityEl = document.getElementById(context + 'City');
    if (nameEl && savedName) nameEl.value = savedName;
    if (cityEl && savedCity) cityEl.value = savedCity;
  }

  async saveHighscore(name, score, round, city = '') {
    if (!this.db) return;
    const entry = {
      name: name.trim().substring(0, 20),
      city: city.substring(0, 20),
      score,
      round,
      date: new Date().toISOString()
    };
    try {
      await this.db.ref('djursland_highscores').push(entry);
    } catch (e) {
      console.warn('Kunne ikke gemme highscore:', e);
    }
  }

  async loadHighscores() {
    const tbody = document.getElementById('highscoreTableBody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" class="hs-empty">Henter...</td></tr>';

    if (!this.db) {
      tbody.innerHTML = '<tr><td colspan="5" class="hs-empty">Highscores ikke tilgængelige offline — Firebase ikke forbundet.</td></tr>';
      return;
    }

    try {
      const snap = await this.db.ref('djursland_highscores')
        .orderByChild('score').limitToLast(20).once('value');
      const data = snap.val();
      if (!data) {
        tbody.innerHTML = '<tr><td colspan="5" class="hs-empty">🏆 Vær den første på listen!</td></tr>';
        return;
      }
      const entries = Object.values(data).sort((a, b) => b.score - a.score);
      tbody.innerHTML = '';
      entries.forEach((e, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
        const date = e.date ? new Date(e.date).toLocaleDateString('da-DK') : '';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${medal}</td><td>${e.name || 'Anonym'}</td><td>${e.city || '-'}</td><td>⭐ ${e.score}</td><td>${date}</td>`;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Firebase loadHighscores fejl:', err);
      tbody.innerHTML = `<tr><td colspan="5" class="hs-empty">⚠️ Fejl: ${err.message || err} — tjek Firebase regler.</td></tr>`;
    }
  }

  submitScore() {
    const nameInput = document.getElementById('playerNameInput');
    const cityInput = document.getElementById('playerCityInput');
    const name = nameInput ? nameInput.value.trim() : 'Anonym';
    const city = cityInput ? cityInput.value.trim() : '';
    if (!name) { alert('Indtast dit navn!'); return; }
    this.saveHighscore(name, this.score, this.currentRound, city);
    this.playSound('whoosh');
    const btn = document.getElementById('submitScoreBtn');
    if (btn) { btn.textContent = '✅ Gemt!'; btn.disabled = true; }
    this.loadHighscores();
  }
}

// ============================================================
// START
// ============================================================
const game = new DjurslandQuiz();
document.addEventListener('DOMContentLoaded', () => {
  // Kobl Firebase
  if (typeof initFirebase === 'function') {
    game.db = initFirebase();
    if (game.db) console.log('Firebase tilsluttet ✅');
    else console.warn('Firebase ikke tilsluttet – offline tilstand');
  }
  game.init();
});
