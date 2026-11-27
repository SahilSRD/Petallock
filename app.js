/* ==========================================================================
   PETALLOCK PUBLIC APPLICATION (CREATOR STUDIO + RECIPIENT VAULT)
   ========================================================================== */

const supabaseClient = window.supabase.createClient(
    PETALLOCK_CONFIG.SUPABASE_URL,
    PETALLOCK_CONFIG.SUPABASE_ANON_KEY
);

const THEME_PALETTES = {
    crimson: {
        name: 'Crimson Velvet Rose',
        petals: ['#e11d48', '#fb7185', '#fda4af', '#e8c27a']
    },
    midnight: {
        name: 'Midnight Cherry Blossom',
        petals: ['#ff7eb3', '#f9a8d4', '#c084fc', '#f3d9b1']
    },
    ivory: {
        name: 'Ivory Peony & Gold',
        petals: ['#fda4af', '#c85a7c', '#e11d48', '#b8860b']
    }
};

/* --------------------------------------------------------------------------
   1. POETIC INSPIRATION ENGINE (MILESTONE-AWARE)
   -------------------------------------------------------------------------- */
const inspirationCounters = {};

function getInspirationBank(fieldKey, her, you) {
    const h = her || 'my love';
    const y = you || 'me';
    const m = (typeof studioState !== 'undefined' && studioState.milestones)
        ? studioState.milestones
        : { met: true, hugged: true, kissed: false, ldr: false };

    const banks = {
        secretKey: [
            h, `${h}`, 'forever', 'soulmate', 'jaan', 'myheart', 'always',
            'sunshine', 'angel', 'beloved', 'destiny', 'cutie', 'queen', 'sweetheart', 'onlyyou'
        ],
        keyHint: [
            `Only one name holds the key to every beat of my heart, ${h}...`,
            `Hint: It starts with "${h.charAt(0).toUpperCase()}" and owns my entire soul ✨`,
            `Type your beautiful name to let every rose bloom ♥`,
            `The prettiest name in my phone and the only one inside my heart...`,
            `Who is the person I think about before falling asleep every night?`,
            `Enter the name of the girl who stole my heart without even trying 🌹`,
            `One word. Four seasons. My entire world. Type your name, ${h}...`,
            `Only the girl who makes my heart skip a beat can unlock this vault 🔑`,
            `Hint: Look in the mirror—the answer is smiling right back at you ✨`,
            `My favorite notification, my favorite voice, my favorite name...`,
            `Type your name slowly and watch the flowers bloom just for you 🌸`,
            `No password in the universe works here except your name, ${h} ♥`,
            `The girl who turns every ordinary day into magic—type your name...`,
            `Unlock this with the name I whisper in every silent prayer 🤍`,
            `Only one soul has the key to all my secrets—enter your name, ${h}`
        ],
        chapter1: [
            `Of course the lock bloomed open the very second you typed your name, ${h}—because you are the only key to every beat of my heart.\n\nBefore you, days simply passed one after another. Since you walked into my life, every single moment has had a reason to glow.`,
            `Welcome inside my heart, ${h}. Every petal you just saw bloom is a tiny piece of how deeply I adore you. Take a deep breath, smile that gorgeous smile of yours, and step inside.`,
            `You didn't just enter my heart, ${h}—you became my entire world. I built this secret garden just to show you all the things words alone sometimes fail to say.`,
            `From the very first day we talked, something inside me quietly knew you were different. Today, my whole heart belongs to you without a single doubt, ${h}.`,
            `Every time you smile, my whole world softens. I locked these words behind your name because nobody else on this earth could ever belong here, ${h}.`
        ],
        chapter2: [
            `With you, even the loudest days turn peaceful. Whether we are laughing together or talking late into the night, every version of you feels like home to me.\n\nNow step all the way inside and unlock every secret and promise I keep just for you.`,
            `I know life can feel overwhelming sometimes, so hear my heart clearly: you never have to worry or overthink about us. I am right here, holding onto you through every season, ${h}.`,
            `Loving you has softened every corner of my life, ${h}. Inside this vault are the memories I replay when I miss you and the promises I make to you forever.`,
            `You don't ever have to pretend to be strong around me, ${h}. On your best days I will celebrate with you, and on your hardest days I will carry the weight with you.`,
            `Every flaw, every mood swing, every dramatic moment, and every laugh—I love all of you completely, unconditionally, and without hesitation, ${h}.`
        ],
        firstKiss: m.kissed ? [
            `The moment our lips met for the first time, the entire world faded into complete silence. My heart was racing so fast, yet everything suddenly felt right—I knew right then I belonged only to you.`,
            `I still replay our first kiss in my head like my favorite movie scene—the exact heartbeat where my soul realized it had found its home in you, ${h}.`,
            `From the nervousness right before to the warmth right after, that first kiss with you is permanently etched into my heart forever.`,
            `Time literally stood still when I leaned in and kissed you for the first time, ${h}. I never wanted that second to end.`
        ] : m.hugged ? [
            `The moment I wrapped my arms around you and felt you lean in, every worry in my head vanished. Holding you felt like finally coming home, ${h}.`,
            `I still remember the warmth of our hug—how safe, peaceful, and right it felt to have you right there against my heart, ${h}.`,
            `If I could freeze one second in time forever, it would be holding you close in my arms and wishing I never had to let go.`
        ] : m.met ? [
            `The very first moment I saw you in person, ${h}, my heart forgot how to beat normally. Everything about you was even more magical than I imagined.`,
            `Walking beside you and seeing your smile up close for the first time is a memory I replay whenever I miss you, ${h}.`,
            `From the first second our eyes met in person, something inside me quietly knew you were going to mean everything to me.`
        ] : [
            `Even across the distance, that late-night conversation where time completely disappeared made me realize my heart already belonged to you, ${h}.`,
            `No matter how many miles sit between us right now, hearing your voice and feeling how effortlessly our souls connected changed my life forever, ${h}.`,
            `Counting down the days until I finally get to see your smile in person and hold your hand for the very first time, ${h} ✨`
        ],
        littleDetails: m.ldr ? [
            `The way you stay on call with me even when you're sleepy, the comfort of your voice through my headphones, and how close you feel even from miles away, ${h}.`,
            `The way your eyes shine on video call, the sound of your laugh, and even the adorable face you make when you pretend to be upset with me—every little detail melts my heart.`,
            `I adore how your whole face lights up when you are genuinely happy and all the little habits only I get to notice, ${h}.`
        ] : [
            `The way your eyes shine in the sunlight, the sound of your laugh, and even the adorable face you make when you try to stay upset with me—every little detail about you melts my heart instantly.`,
            `I adore how your whole face lights up when you are genuinely happy, the softness in your voice, and all the little habits only I get to notice, ${h}.`,
            `Even when you get playfully grumpy with me, you look ridiculously adorable—and the second you smile again, my whole world brightens.`
        ],
        signature: [
            `Forever yours, ${y}`,
            `Yours always, ${y} ♥`,
            `With all my heart, ${y}`,
            `Only yours, ${y} ✨`,
            `Endlessly yours, ${y}`
        ],
        finaleMsg: [
            `I love you sooooooo much ${h}, my whole heart, my favorite soul, my forever 🥹`,
            `You are my today, my tomorrow, and every lifetime after this, ${h} ❤️`,
            `No matter where life takes us, my heart will always belong only to you, ${h} ✨`,
            `I love you endlessly ${h}—more than words, more than stars, more than yesterday 🥹♥`
        ]
    };
    return banks[fieldKey] || [];
}

function applyInspiration(fieldKey) {
    const her = (document.getElementById('inp-her-name')?.value || '').trim();
    const you = (document.getElementById('inp-your-name')?.value || '').trim();
    const list = getInspirationBank(fieldKey, her, you);
    if (!list.length) return;

    const idx = (inspirationCounters[fieldKey] || 0) % list.length;
    inspirationCounters[fieldKey] = idx + 1;
    const chosen = list[idx];

    const mapIds = {
        secretKey: 'inp-secret-key',
        keyHint: 'inp-key-hint',
        chapter1: 'inp-chapter-1',
        chapter2: 'inp-chapter-2',
        firstKiss: 'inp-first-kiss',
        littleDetails: 'inp-little-details',
        signature: 'inp-signature',
        finaleMsg: 'inp-finale-msg'
    };

    const el = document.getElementById(mapIds[fieldKey]);
    if (el) {
        el.value = chosen;
        if (fieldKey === 'secretKey') manualKeyEdited = true;
        syncFormToState();
        const btn = el.closest('.field-group')?.querySelector('.btn-inspire');
        if (btn) {
            const nextNum = ((idx + 1) % list.length) + 1;
            btn.textContent = `✨ Inspiration (${nextNum}/${list.length})`;
        }
        playHarpPluck(659.25);
        showToast(`✨ Applied poetic inspiration #${idx + 1}!`);
    }
}

function addInspiredJarNote() {
    const her = (studioState.herName || '').trim() || 'my love';
    const jarPool = [
        { tag: 'Sacred Promise', text: `No matter how hard any situation gets, I promise I will never leave your side, ${her}.` },
        { tag: 'Stop Overthinking', text: `Whenever your mind starts overthinking at night, remember you are deeply loved, safe, and never alone.` },
        { tag: 'Safe With Me', text: `You never have to carry heavy days alone—my heart is always your safe place, ${her}.` },
        { tag: 'Sweet Secret', text: `Secret confession: even when you get upset with me, I secretly adore trying to make you smile again.` },
        { tag: 'Always & Forever', text: `In every crowd and every lifetime, my eyes and my heart will always search for you first, ${her}.` }
    ];
    const idx = (inspirationCounters.jar || 0) % jarPool.length;
    inspirationCounters.jar = idx + 1;
    studioState.jarNotes.push({ ...jarPool[idx] });
    renderJarBuilderList();
    playHarpPluck(783.99);
    showToast(`✨ Added inspired note to the Love Jar!`);
}

function applyDeepCardInspiration(cardIdx) {
    const her = (studioState.herName || '').trim() || 'my love';
    const cardBank = [
        { icon: '✨', title: 'Our Unforgettable Moment', secret: `The exact second time stood still with you, ${her}—my heart knew right then I belonged only to you.` },
        { icon: '🌸', title: `What My Eyes Adore in ${her}`, secret: `The sparkle in your eyes, your contagious laugh, and every cute expression you make without even realizing it.` },
        { icon: '🤍', title: 'My Silent Vow to You', secret: `Every moment with you is my silent vow that you are respected, safe, and cherished forever.` },
        { icon: '🥺', title: 'Even When You Are Upset', secret: `Even when you get grumpy or upset with me, I secretly adore melting your mood until your smile returns.` },
        { icon: '🌙', title: 'Whenever You Overthink', secret: `Please put every heavy thought down—I am right here holding your hand through every season, ${her}.` },
        { icon: '🌹', title: `My Lifelong Promise to ${her}`, secret: `Out of everyone in this entire world, my heart chose you and will keep choosing you every morning.` }
    ];
    const key = `deepCard_${cardIdx}`;
    const idx = ((inspirationCounters[key] || cardIdx) + 1) % cardBank.length;
    inspirationCounters[key] = idx;
    studioState.flipCards[cardIdx] = { ...cardBank[idx] };
    renderDeepEditFields();
    playHarpPluck(659.25);
    showToast(`✨ Updated Secret Card #0${cardIdx + 1}!`);
}

function applyDeepEnvInspiration(envIdx) {
    const her = (studioState.herName || '').trim() || 'my love';
    const envBank = [
        { title: 'Open When You Are Upset With Me', body: `Take a deep breath, ${her}. Even when you're upset with me, you are still the person I adore most in this world. I would rather lose a thousand arguments than lose a second of your smile.` },
        { title: 'Open When Your Mind Starts Overthinking', body: `Stop right there and let every heavy thought go. Hear my heart clearly: I am not going anywhere. No situation and no bad day will ever make me leave your side, ${her}.` },
        { title: 'Open When You Miss Me', body: `Close your eyes for three seconds and imagine me right beside you, holding your hand. Every beat of my heart is right there with you, ${her}.` },
        { title: 'Open When You Need to Know How Loved You Are', body: `You are my favorite blessing, ${her}. Loving you is the easiest, truest thing I have ever done—and I am endlessly grateful that my heart belongs to you.` }
    ];
    const key = `deepEnv_${envIdx}`;
    const idx = ((inspirationCounters[key] || envIdx) + 1) % envBank.length;
    inspirationCounters[key] = idx;
    studioState.envelopes[envIdx] = { ...envBank[idx] };
    renderDeepEditFields();
    playHarpPluck(659.25);
    showToast(`✨ Updated Envelope #0${envIdx + 1}!`);
}

/* --------------------------------------------------------------------------
   2. WEB AUDIO PIANO & SOUND EFFECTS
   -------------------------------------------------------------------------- */
let soundEnabled = true;
let audioCtx = null;
let bgmInterval = null;
let bgmStepIndex = 0;

const ROMANTIC_PIANO_NOTES = [
    174.61, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63, 261.63,
    130.81, 261.63, 329.63, 392.00, 493.88, 392.00, 329.63, 261.63,
    220.00, 261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63,
    196.00, 246.94, 293.66, 392.00, 440.00, 392.00, 293.66, 246.94
];

function ensureAudioContext() {
    if (!soundEnabled) return null;
    if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

function playPianoNote(freq, duration = 1.65, volume = 0.032) {
    const ctx = ensureAudioContext();
    if (!ctx || ctx.state !== 'running') return;
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(920, now);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.16, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.045);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
}

function startRomanticBackgroundMusic() {
    if (bgmInterval) return;
    bgmInterval = setInterval(() => {
        if (!soundEnabled) return;
        const ctx = ensureAudioContext();
        if (!ctx || ctx.state !== 'running') return;
        const freq = ROMANTIC_PIANO_NOTES[bgmStepIndex % ROMANTIC_PIANO_NOTES.length];
        const isRoot = (bgmStepIndex % 8 === 0);
        playPianoNote(freq, isRoot ? 2.4 : 1.55, isRoot ? 0.042 : 0.028);
        bgmStepIndex++;
    }, 560);
}

['pointerdown', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, () => {
        if (soundEnabled) {
            ensureAudioContext();
            startRomanticBackgroundMusic();
        }
    }, { once: false, passive: true });
});

document.getElementById('sound-toggle-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    soundEnabled = !soundEnabled;
    document.getElementById('sound-icon').textContent = soundEnabled ? '🎵' : '🔇';
    document.getElementById('sound-text').textContent = soundEnabled ? 'Music On' : 'Muted';
    if (soundEnabled) {
        ensureAudioContext();
        startRomanticBackgroundMusic();
        playHarpPluck(659.25);
    }
});

function playHarpPluck(freq) { playPianoNote(freq, 1.1, 0.055); }
function playHarpArpeggio() {
    [523.25, 659.25, 783.99, 987.77, 1318.51].forEach((f, idx) => {
        setTimeout(() => playPianoNote(f, 1.4, 0.055), idx * 85);
    });
}
function playPaperSound() {
    const ctx = ensureAudioContext();
    if (!ctx || ctx.state !== 'running') return;
    const len = Math.floor(ctx.sampleRate * 0.22);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.38));
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1650;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.11, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    src.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    src.start();
    playPianoNote(659.25, 0.9, 0.04);
}

/* --------------------------------------------------------------------------
   3. FLORAL CANVAS & TAP-TO-BLOOM
   -------------------------------------------------------------------------- */
const petalCanvas = document.getElementById('petal-canvas');
const pCtx = petalCanvas.getContext('2d');
let cw = petalCanvas.width = window.innerWidth;
let ch = petalCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    cw = petalCanvas.width = window.innerWidth;
    ch = petalCanvas.height = window.innerHeight;
});

let currentPetalColors = THEME_PALETTES.crimson.petals;
const driftingPetals = [];
const burstPetals = [];

class DriftingPetal {
    constructor(randomY = false) { this.reset(randomY); }
    reset(randomY = false) {
        this.x = Math.random() * cw;
        this.y = randomY ? Math.random() * ch : -24;
        this.size = Math.random() * 8 + 6;
        this.vy = Math.random() * 0.72 + 0.34;
        this.vx = (Math.random() - 0.5) * 0.42;
        this.swayPhase = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.008;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = Math.random() * 0.032 + 0.015;
        this.alpha = Math.random() * 0.46 + 0.22;
        this.colorIdx = Math.floor(Math.random() * currentPetalColors.length);
    }
    update() {
        this.y += this.vy;
        this.swayPhase += this.swaySpeed;
        this.x += this.vx + Math.sin(this.swayPhase) * 0.52;
        this.rot += this.rotSpeed;
        this.flip += this.flipSpeed;
        if (this.y > ch + 28 || this.x < -35 || this.x > cw + 35) this.reset(false);
    }
    draw() {
        pCtx.save();
        pCtx.translate(this.x, this.y);
        pCtx.rotate(this.rot);
        pCtx.scale(Math.max(0.25, Math.abs(Math.cos(this.flip))), 1);
        pCtx.globalAlpha = this.alpha;
        pCtx.fillStyle = currentPetalColors[this.colorIdx % currentPetalColors.length];
        drawCurvedPetalShape(pCtx, this.size);
        pCtx.restore();
    }
}

class BurstPetal {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        const angle = options.upward
            ? (-Math.PI / 2 + (Math.random() - 0.5) * 1.25)
            : (Math.random() * Math.PI * 2);
        const spd = options.speed || (Math.random() * 4.8 + 1.5);
        this.vx = Math.cos(angle) * spd;
        this.vy = Math.sin(angle) * spd - (options.upward ? 1.4 : 0.8);
        this.size = options.size || (Math.random() * 8 + 5);
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.09;
        this.alpha = 1;
        this.decay = options.decay || (Math.random() * 0.015 + 0.011);
        this.isHeart = Boolean(options.heartsOnly);
        this.color = currentPetalColors[Math.floor(Math.random() * currentPetalColors.length)];
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.045;
        this.vx *= 0.985;
        this.rot += this.rotSpeed;
        this.alpha -= this.decay;
    }
    draw() {
        if (this.alpha <= 0) return;
        pCtx.save();
        pCtx.translate(this.x, this.y);
        pCtx.rotate(this.rot);
        pCtx.globalAlpha = Math.max(0, this.alpha);
        pCtx.fillStyle = this.color;
        if (this.isHeart) drawHeartPath(pCtx, 0, 0, this.size * 1.2);
        else drawCurvedPetalShape(pCtx, this.size);
        pCtx.restore();
    }
}

function drawCurvedPetalShape(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.95, -s * 0.65, s * 0.85, s * 0.55, 0, s);
    ctx.bezierCurveTo(-s * 0.85, s * 0.55, -s * 0.95, -s * 0.65, 0, -s);
    ctx.closePath();
    ctx.fill();
}

function drawHeartPath(ctx, x, y, s) {
    ctx.beginPath();
    const top = s * 0.3;
    ctx.moveTo(x, y + top);
    ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + top);
    ctx.bezierCurveTo(x - s / 2, y + (s + top) / 2, x, y + (s + top) / 1.4, x, y + s);
    ctx.bezierCurveTo(x, y + (s + top) / 1.4, x + s / 2, y + (s + top) / 2, x + s / 2, y + top);
    ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + top);
    ctx.closePath();
    ctx.fill();
}

function spawnPetalBurst(x, y, count = 24, options = {}) {
    for (let i = 0; i < count; i++) burstPetals.push(new BurstPetal(x, y, options));
}

const petalPoolCount = cw < 600 ? 22 : 38;
for (let i = 0; i < petalPoolCount; i++) driftingPetals.push(new DriftingPetal(true));

function animatePetalsLoop() {
    pCtx.clearRect(0, 0, cw, ch);
    for (const p of driftingPetals) { p.update(); p.draw(); }
    for (let i = burstPetals.length - 1; i >= 0; i--) {
        burstPetals[i].update();
        burstPetals[i].draw();
        if (burstPetals[i].alpha <= 0) burstPetals.splice(i, 1);
    }
    requestAnimationFrame(animatePetalsLoop);
}
animatePetalsLoop();

const tapBloomLayer = document.getElementById('tap-bloom-layer');
document.addEventListener('pointerdown', (e) => {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const x = e.clientX;
    const y = e.clientY;
    const cOuter = currentPetalColors[0];
    const cInner = currentPetalColors[2] || '#fda4af';
    const cCore = currentPetalColors[3] || '#e8c27a';

    const flowerEl = document.createElement('div');
    flowerEl.className = 'tap-flower-pop';
    flowerEl.style.left = `${x}px`;
    flowerEl.style.top = `${y}px`;
    flowerEl.innerHTML = `
        <svg viewBox="0 0 64 64" width="66" height="66" fill="none">
            <g opacity="0.95">
                <ellipse cx="32" cy="14" rx="8" ry="13" fill="${cOuter}"/>
                <ellipse cx="32" cy="50" rx="8" ry="13" fill="${cOuter}"/>
                <ellipse cx="14" cy="32" rx="13" ry="8" fill="${cOuter}"/>
                <ellipse cx="50" cy="32" rx="13" ry="8" fill="${cOuter}"/>
                <ellipse cx="19" cy="19" rx="8" ry="12" transform="rotate(-45 19 19)" fill="${cInner}"/>
                <ellipse cx="45" cy="45" rx="8" ry="12" transform="rotate(-45 45 45)" fill="${cInner}"/>
                <ellipse cx="45" cy="19" rx="8" ry="12" transform="rotate(45 45 19)" fill="${cInner}"/>
                <ellipse cx="19" cy="45" rx="8" ry="12" transform="rotate(45 19 45)" fill="${cInner}"/>
                <circle cx="32" cy="32" r="6.5" fill="${cCore}"/>
            </g>
        </svg>
    `;
    tapBloomLayer.appendChild(flowerEl);
    setTimeout(() => flowerEl.remove(), 1600);
    spawnPetalBurst(x, y, 7, { speed: 2.5, size: 6, decay: 0.02 });
});

function applyVisualTheme(themeId) {
    const validTheme = THEME_PALETTES[themeId] ? themeId : 'crimson';
    document.body.setAttribute('data-theme', validTheme);
    currentPetalColors = THEME_PALETTES[validTheme].petals;
}

function showToast(msg) {
    const toast = document.getElementById('toast-banner');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* --------------------------------------------------------------------------
   4. CREATOR WIZARD & MILESTONE-AWARE BUILDER
   -------------------------------------------------------------------------- */
let manualKeyEdited = false;
let isPreviewMode = false;
let activeRecipientPayload = null;
let recTimerInterval = null;
let latestOrderId = '';

function createDefaultState() {
    return {
        yourName: '',
        herName: '',
        secretKey: '',
        keyHint: 'Only one name holds the key to every beat of my heart...',
        startDate: '',
        theme: 'crimson',
        milestones: { met: true, hugged: true, kissed: false, ldr: false },
        chapter1: '',
        chapter2: '',
        firstKiss: '',
        littleDetails: '',
        deepMode: false,
        jarNotes: [
            { tag: 'Sacred Promise', text: 'No matter how difficult any situation gets, I promise I will never leave your side.' },
            { tag: 'Stop Overthinking', text: 'Whenever your mind starts overthinking at night, remember you are deeply loved, safe, and never alone.' },
            { tag: 'Sweet Memory', text: 'Even the most ordinary day becomes my favorite memory the second I spend it with you.' },
            { tag: 'Little Secret', text: 'My heart still skips a beat every single time your name pops up on my screen.' },
            { tag: 'Always & Forever', text: 'In every room, every crowd, and every lifetime, I will always choose you first.' },
            { tag: 'Safe With Me', text: 'You never have to carry heavy days alone—my heart is always your safe place.' }
        ],
        flipCards: [],
        envelopes: [],
        signature: '',
        finaleMsg: ''
    };
}

let studioState = createDefaultState();

function updateMilestoneUI(silent = false) {
    const met = document.getElementById('chk-met')?.checked ?? true;
    const hugged = document.getElementById('chk-hugged')?.checked ?? true;
    const kissed = document.getElementById('chk-kissed')?.checked ?? false;
    const ldr = document.getElementById('chk-ldr')?.checked ?? false;

    studioState.milestones = { met, hugged, kissed, ldr };
    inspirationCounters.firstKiss = 0;
    inspirationCounters.littleDetails = 0;

    const lbl = document.getElementById('lbl-special-moment');
    const inp = document.getElementById('inp-first-kiss');
    if (lbl && inp) {
        if (kissed) {
            lbl.textContent = 'Our First Kiss / Unforgettable Moment Together';
            inp.placeholder = 'Where it happened, how nervous or magical it felt...';
        } else if (hugged) {
            lbl.textContent = 'Our First Hug / Favorite Moment Together';
            inp.placeholder = 'How warm and safe it felt when I held you close...';
        } else if (met) {
            lbl.textContent = 'The First Time We Met / Favorite Moment';
            inp.placeholder = 'Seeing your smile up close for the very first time...';
        } else {
            lbl.textContent = 'Our Favorite Late-Night Talk / Special Moment';
            inp.placeholder = 'The moment our conversation made me fall for you...';
        }
    }
    if (!silent) playHarpPluck(659.25);
}

function buildHydratedExperience(raw) {
    const her = (raw.herName || '').trim() || 'My Love';
    const you = (raw.yourName || '').trim() || 'Yours';
    const key = (raw.secretKey || '').trim() || her;
    const hint = (raw.keyHint || '').trim() || `Only one name unlocks my heart, ${her}...`;
    const m = raw.milestones || { met: true, hugged: true, kissed: false, ldr: false };

    const ch1 = (raw.chapter1 || '').trim() ||
        `Of course the lock bloomed open the very second you typed your name, ${her}—because you are the only key to every beat of my heart.\n\nBefore you, days simply passed one after another. Since you walked into my life, every single moment has had a reason to glow.`;

    const ch2 = (raw.chapter2 || '').trim() ||
        `With you, even the loudest days turn peaceful. Every smile, every late-night conversation, and every little moment with you feels like coming home.\n\nStep all the way inside my heart now and unlock every secret, memory, and promise I keep just for you.`;

    const kissText = (raw.firstKiss || '').trim() ||
        `The moment time seemed to stand completely still with you—my heart was racing so fast, yet the second I was close to you, everything in the universe felt completely right.`;

    const detailsText = (raw.littleDetails || '').trim() ||
        `The way your eyes light up when you smile, the sound of your laugh, and even the adorable little expressions you make when you try to act serious—I notice and adore every single one.`;

    const card1Title = m.kissed ? 'Our Unforgettable First Kiss' : (m.hugged ? 'The Warmth of Holding You' : (m.met ? 'The Day I First Saw You' : 'When Our Souls Connected'));
    const card3Title = m.hugged ? 'Every Time I Hold You Close' : (m.ldr ? 'Across Every Mile Between Us' : 'My Silent Vow to You');
    const card3Secret = m.hugged
        ? `Every time I hold you close, ${her}, it isn't just affection—it is my silent promise that you are safe, respected, and deeply cherished by me always.`
        : `Even when we aren't standing side by side, ${her}, every beat of my heart is right there protecting, respecting, and cherishing you always.`;

    const defaultCards = [
        { icon: m.kissed ? '💋' : '✨', title: card1Title, secret: kissText },
        { icon: '🌸', title: `Little Things About ${her}`, secret: detailsText },
        { icon: '🤍', title: card3Title, secret: card3Secret },
        { icon: '🥺', title: 'Even When You Are Upset', secret: `Secret confession: even when you get upset or grumpy with me, I secretly adore trying to melt your mood until that cute smile comes back.` },
        { icon: '🌙', title: 'Whenever You Overthink', secret: `Please never let overthinking steal your peace. No matter what happens in life, I am right here holding your hand through every season.` },
        { icon: '🌹', title: `My Promise to ${her}`, secret: `Out of everyone in this entire world, my heart chose you—and it will keep choosing you every single morning without hesitation.` }
    ];

    const defaultEnvelopes = [
        { title: 'Open When You Are Upset With Me', body: `First of all, take a deep breath, ${her}. Even when you are upset with me, you are still the person I adore most in this world. Whatever happened, I would rather lose a thousand arguments than lose a single second of your smile.` },
        { title: 'Open When Your Mind Starts Overthinking', body: `Stop right there and put every heavy thought down for a moment. Hear my heart clearly: I am not going anywhere. No situation, no bad day, and no distance will ever make me leave your side.` },
        { title: 'Open When You Miss Me', body: `Close your eyes for three seconds and imagine me right beside you, holding your hand. No matter how far apart we are right now, every beat of my heart is right there with you.` },
        { title: 'Open When You Need a Reminder of How Loved You Are', body: `You are my favorite blessing, ${her}. Loving you is the easiest, truest thing I have ever done—and I am endlessly grateful that my heart belongs to you.` }
    ];

    const cards = (raw.deepMode && Array.isArray(raw.flipCards) && raw.flipCards.length === 6)
        ? raw.flipCards.map((c, i) => ({
            icon: c.icon || defaultCards[i].icon,
            title: (c.title || '').trim() || defaultCards[i].title,
            secret: (c.secret || '').trim() || defaultCards[i].secret
        }))
        : defaultCards;

    const envelopes = (raw.deepMode && Array.isArray(raw.envelopes) && raw.envelopes.length === 4)
        ? raw.envelopes.map((e, i) => ({
            title: (e.title || '').trim() || defaultEnvelopes[i].title,
            body: (e.body || '').trim() || defaultEnvelopes[i].body
        }))
        : defaultEnvelopes;

    const jarNotes = (Array.isArray(raw.jarNotes) && raw.jarNotes.length > 0)
        ? raw.jarNotes
        : createDefaultState().jarNotes;

    const sig = (raw.signature || '').trim() || `Forever yours, ${you}`;
    const fin = (raw.finaleMsg || '').trim() ||
        `I love you sooooooo much ${her}, my whole heart, my favorite soul, my forever 🥹`;

    return {
        yourName: you,
        herName: her,
        secretKey: key,
        keyHint: hint,
        startDate: raw.startDate || '',
        theme: THEME_PALETTES[raw.theme] ? raw.theme : 'crimson',
        milestones: m,
        chapter1: ch1,
        chapter2: ch2,
        firstKiss: kissText,
        littleDetails: detailsText,
        deepMode: Boolean(raw.deepMode),
        flipCards: cards,
        envelopes: envelopes,
        jarNotes: jarNotes,
        signature: sig,
        finaleMsg: fin
    };
}

function showCreatorSection(secName) {
    document.getElementById('creator-landing').style.display = secName === 'landing' ? 'block' : 'none';
    document.getElementById('creator-wizard').style.display = secName === 'wizard' ? 'block' : 'none';
    document.getElementById('creator-checkout').style.display = secName === 'checkout' ? 'block' : 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startWizardFresh() {
    studioState = createDefaultState();
    manualKeyEdited = false;
    populateWizardInputsFromState();
    goWizardStep(1);
    showCreatorSection('wizard');
}

function populateWizardInputsFromState() {
    document.getElementById('inp-your-name').value = studioState.yourName;
    document.getElementById('inp-her-name').value = studioState.herName;
    document.getElementById('inp-secret-key').value = studioState.secretKey;
    document.getElementById('inp-key-hint').value = studioState.keyHint;
    document.getElementById('inp-start-date').value = studioState.startDate;
    document.getElementById('inp-chapter-1').value = studioState.chapter1;
    document.getElementById('inp-chapter-2').value = studioState.chapter2;
    document.getElementById('inp-first-kiss').value = studioState.firstKiss;
    document.getElementById('inp-little-details').value = studioState.littleDetails;
    document.getElementById('inp-signature').value = studioState.signature;
    document.getElementById('inp-finale-msg').value = studioState.finaleMsg;

    const m = studioState.milestones || { met: true, hugged: true, kissed: false, ldr: false };
    document.getElementById('chk-met').checked = m.met;
    document.getElementById('chk-hugged').checked = m.hugged;
    document.getElementById('chk-kissed').checked = m.kissed;
    document.getElementById('chk-ldr').checked = m.ldr;
    updateMilestoneUI(true);

    selectStudioTheme(studioState.theme, true);
    renderJarBuilderList();
    setDeepEditMode(studioState.deepMode, true);
}

function handleHerNameInput(val) {
    if (!manualKeyEdited) document.getElementById('inp-secret-key').value = val;
    syncFormToState();
}

function syncFormToState() {
    studioState.yourName = document.getElementById('inp-your-name').value;
    studioState.herName = document.getElementById('inp-her-name').value;
    studioState.secretKey = document.getElementById('inp-secret-key').value;
    studioState.keyHint = document.getElementById('inp-key-hint').value;
    studioState.startDate = document.getElementById('inp-start-date').value;
    studioState.chapter1 = document.getElementById('inp-chapter-1').value;
    studioState.chapter2 = document.getElementById('inp-chapter-2').value;
    studioState.firstKiss = document.getElementById('inp-first-kiss').value;
    studioState.littleDetails = document.getElementById('inp-little-details').value;
    studioState.signature = document.getElementById('inp-signature').value;
    studioState.finaleMsg = document.getElementById('inp-finale-msg').value;

    if (studioState.deepMode) syncDeepInputsToState();
}

function selectStudioTheme(themeId, silent = false) {
    studioState.theme = themeId;
    applyVisualTheme(themeId);
    document.querySelectorAll('.theme-choice-card').forEach((card) => {
        card.classList.toggle('selected', card.getAttribute('data-theme-id') === themeId);
    });
    if (!silent) playHarpPluck(587.33);
}

function goWizardStep(stepNum) {
    syncFormToState();
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`wizard-step-${i}`).classList.toggle('hidden', i !== stepNum);
    }
    document.querySelectorAll('.step-tab').forEach((tab) => {
        tab.classList.toggle('active', Number(tab.getAttribute('data-step')) === stepNum);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderJarBuilderList() {
    const listEl = document.getElementById('jar-notes-list');
    document.getElementById('jar-builder-count').textContent = studioState.jarNotes.length;
    listEl.innerHTML = '';

    studioState.jarNotes.forEach((note, idx) => {
        const row = document.createElement('div');
        row.className = 'jar-note-row';
        row.innerHTML = `
            <span class="jar-note-tag-badge">${escapeHtml(note.tag)}</span>
            <span class="jar-note-text-preview" title="${escapeHtml(note.text)}">${escapeHtml(note.text)}</span>
            <button type="button" class="icon-del-btn" aria-label="Remove note" onclick="removeJarNote(${idx})">✕</button>
        `;
        listEl.appendChild(row);
    });
}

function addCustomJarNote() {
    const tag = document.getElementById('new-jar-tag').value;
    const input = document.getElementById('new-jar-text');
    const text = input.value.trim();
    if (!text) {
        showToast('Write a sweet note first before adding!');
        return;
    }
    studioState.jarNotes.push({ tag, text });
    input.value = '';
    renderJarBuilderList();
    playHarpPluck(659.25);
    showToast('📜 Folded note tucked into the Love Jar!');
}

function removeJarNote(idx) {
    if (studioState.jarNotes.length <= 1) {
        showToast('Keep at least 1 folded note inside the Love Jar ♥');
        return;
    }
    studioState.jarNotes.splice(idx, 1);
    renderJarBuilderList();
}

function setDeepEditMode(enableDeep, silent = false) {
    studioState.deepMode = enableDeep;
    document.getElementById('btn-fast-mode').classList.toggle('active', !enableDeep);
    document.getElementById('btn-deep-mode').classList.toggle('active', enableDeep);
    document.getElementById('fast-mode-summary').style.display = enableDeep ? 'none' : 'block';
    document.getElementById('deep-edit-container').classList.toggle('open', enableDeep);

    if (enableDeep) {
        const hydrated = buildHydratedExperience(studioState);
        if (!studioState.flipCards || studioState.flipCards.length !== 6) {
            studioState.flipCards = hydrated.flipCards.map(c => ({ ...c }));
        }
        if (!studioState.envelopes || studioState.envelopes.length !== 4) {
            studioState.envelopes = hydrated.envelopes.map(e => ({ ...e }));
        }
        renderDeepEditFields();
    }
    if (!silent) playHarpPluck(523.25);
}

function renderDeepEditFields() {
    const cardsContainer = document.getElementById('deep-cards-editor-list');
    cardsContainer.innerHTML = '';
    studioState.flipCards.forEach((card, idx) => {
        const div = document.createElement('div');
        div.className = 'deep-item-card';
        div.innerHTML = `
            <div class="field-label-row" style="margin-bottom: 0.55rem;">
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-gold);">Secret Card #0${idx + 1}</span>
                <button type="button" class="btn-inspire" onclick="applyDeepCardInspiration(${idx})">✨ Inspiration (15+)</button>
            </div>
            <div style="display: grid; grid-template-columns: 68px 1fr; gap: 0.55rem; margin-bottom: 0.55rem;">
                <input type="text" class="studio-input" id="deep-fc-icon-${idx}" value="${escapeHtml(card.icon)}" oninput="syncDeepInputsToState()">
                <input type="text" class="studio-input" id="deep-fc-title-${idx}" value="${escapeHtml(card.title)}" placeholder="Card front title" oninput="syncDeepInputsToState()">
            </div>
            <textarea class="studio-textarea" style="min-height: 70px;" id="deep-fc-secret-${idx}" placeholder="Hidden secret revealed on flip..." oninput="syncDeepInputsToState()">${escapeHtml(card.secret)}</textarea>
        `;
        cardsContainer.appendChild(div);
    });

    const envContainer = document.getElementById('deep-envelopes-editor-list');
    envContainer.innerHTML = '';
    studioState.envelopes.forEach((env, idx) => {
        const div = document.createElement('div');
        div.className = 'deep-item-card';
        div.innerHTML = `
            <div class="field-label-row" style="margin-bottom: 0.55rem;">
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-gold);">Wax-Sealed Envelope #0${idx + 1}</span>
                <button type="button" class="btn-inspire" onclick="applyDeepEnvInspiration(${idx})">✨ Inspiration (15+)</button>
            </div>
            <input type="text" class="studio-input" style="margin-bottom: 0.55rem;" id="deep-env-title-${idx}" value="${escapeHtml(env.title)}" placeholder="Envelope title" oninput="syncDeepInputsToState()">
            <textarea class="studio-textarea" style="min-height: 75px;" id="deep-env-body-${idx}" placeholder="Secret letter inside envelope..." oninput="syncDeepInputsToState()">${escapeHtml(env.body)}</textarea>
        `;
        envContainer.appendChild(div);
    });
}

function syncDeepInputsToState() {
    if (!studioState.deepMode) return;
    studioState.flipCards.forEach((card, idx) => {
        const iconEl = document.getElementById(`deep-fc-icon-${idx}`);
        const titleEl = document.getElementById(`deep-fc-title-${idx}`);
        const secretEl = document.getElementById(`deep-fc-secret-${idx}`);
        if (iconEl) card.icon = iconEl.value || '♥';
        if (titleEl) card.title = titleEl.value;
        if (secretEl) card.secret = secretEl.value;
    });
    studioState.envelopes.forEach((env, idx) => {
        const tEl = document.getElementById(`deep-env-title-${idx}`);
        const bEl = document.getElementById(`deep-env-body-${idx}`);
        if (tEl) env.title = tEl.value;
        if (bEl) env.body = bEl.value;
    });
}

function generateShortOrderId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'PL-';
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function generateOrderCheckout() {
    syncFormToState();
    const btn = document.getElementById('btn-submit-order');
    const origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Saving Vault... ⏳</span>';

    try {
        const hydrated = buildHydratedExperience(studioState);
        const orderId = generateShortOrderId();

        const { error } = await supabaseClient
            .from('vaults')
            .insert([{ id: orderId, status: 'pending', payload: hydrated }]);

        if (error) throw error;

        latestOrderId = orderId;
        document.getElementById('checkout-her-name').textContent = hydrated.herName;
        document.getElementById('generated-order-id').textContent = latestOrderId;
        document.getElementById('checkout-upi-display').textContent = PETALLOCK_CONFIG.SELLER_UPI;
        document.getElementById('checkout-ig-display').textContent = PETALLOCK_CONFIG.SELLER_INSTAGRAM;

        showCreatorSection('checkout');
        playHarpArpeggio();
        spawnPetalBurst(cw / 2, ch * 0.35, 36);
    } catch (err) {
        console.error('Order save failed:', err);
        showToast('❌ Error: ' + (err.message || 'Could not save order.'));
    } finally {
        btn.disabled = false;
        btn.innerHTML = origHtml;
    }
}

function copyToClipboardSafe(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => legacyCopyText(text, successMsg));
    } else {
        legacyCopyText(text, successMsg);
    }
}

function legacyCopyText(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showToast(successMsg);
    } catch (e) {
        showToast('Please select and copy manually.');
    }
    document.body.removeChild(ta);
}

function copyOrderId() {
    copyToClipboardSafe(latestOrderId, `📋 Order ID (${latestOrderId}) copied! DM it with ₹99 payment ♥`);
}

function copyConfiguredUpi() {
    copyToClipboardSafe(PETALLOCK_CONFIG.SELLER_UPI, `💳 UPI ID (${PETALLOCK_CONFIG.SELLER_UPI}) copied!`);
}

function sendOrderViaWhatsApp() {
    const hydrated = buildHydratedExperience(studioState);
    const cleanPhone = (PETALLOCK_CONFIG.SELLER_WHATSAPP || '').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
        `Hi! I created a PetalLock surprise for ${hydrated.herName} 🌸\nOrder ID: ${latestOrderId}\nI am paying ₹${PETALLOCK_CONFIG.PRICE_INR} via UPI (${PETALLOCK_CONFIG.SELLER_UPI}) to activate my permanent link!`
    );
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${msg}` : `https://wa.me/?text=${msg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function copyDmMessageBundle() {
    const hydrated = buildHydratedExperience(studioState);
    const bundle = `Hi! I created a PetalLock surprise for ${hydrated.herName} 🌸\nOrder ID: ${latestOrderId}\nI have paid ₹${PETALLOCK_CONFIG.PRICE_INR} (UPI: ${PETALLOCK_CONFIG.SELLER_UPI}). Please activate my link!`;
    copyToClipboardSafe(bundle, '📩 Complete DM message + Order ID copied!');
}

function launchLivePreview() {
    syncFormToState();
    isPreviewMode = true;
    document.getElementById('preview-banner-bar').classList.add('visible');
    mountRecipientExperience(buildHydratedExperience(studioState));
}

function exitPreviewToEditor() {
    isPreviewMode = false;
    document.getElementById('preview-banner-bar').classList.remove('visible');
    document.getElementById('recipient-view').classList.add('hidden');
    document.getElementById('creator-view').classList.remove('hidden');
    applyVisualTheme(studioState.theme);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function launchDemoExperience() {
    const demoRaw = {
        yourName: 'Aarav',
        herName: 'Ananya',
        secretKey: 'Ananya',
        keyHint: 'Only one name holds the key to every beat of my heart, Ananya...',
        startDate: '2026-02-14',
        theme: 'crimson',
        milestones: { met: true, hugged: true, kissed: false, ldr: false },
        chapter1: 'Of course the lock bloomed open the very second you typed your name, Ananya—because you are the only key to every beat of my heart.\n\nBefore you, days simply passed one after another. Since you walked into my life, every single moment has had a reason to glow.',
        chapter2: 'With you, even the loudest days turn peaceful. Whether we are laughing over coffee or talking late into the night, every version of you feels like home.\n\nNow step all the way inside my heart and unlock every secret and promise I keep just for you.',
        firstKiss: 'The moment I wrapped my arms around you and felt you lean in, every worry vanished—holding you felt like finally coming home.',
        littleDetails: 'The way your eyes sparkle in the afternoon sunlight, your contagious laugh, and the adorable face you make when you pretend to be upset with me.',
        deepMode: false,
        jarNotes: createDefaultState().jarNotes,
        signature: 'Forever yours, Aarav',
        finaleMsg: 'I love you sooooooo much my Ananya, my whole heart, my favorite soul, my forever 🥹'
    };
    isPreviewMode = true;
    document.getElementById('preview-banner-bar').classList.add('visible');
    mountRecipientExperience(buildHydratedExperience(demoRaw));
}

function switchToCreatorFromLink() {
    history.replaceState(null, '', window.location.pathname);
    document.getElementById('recipient-view').classList.add('hidden');
    document.getElementById('creator-view').classList.remove('hidden');
    document.getElementById('footer-create-own-btn').style.display = 'none';
    showCreatorSection('landing');
}

/* --------------------------------------------------------------------------
   5. RECIPIENT EXPERIENCE, 3D LOVE JAR & MAGICAL PEN
   -------------------------------------------------------------------------- */
let recUnlocked = false;
let recWrongAttempts = 0;
let recUnfoldedSet = new Set();
let recUnreadPool = [];
let recPenRunning = false;
let jarAnimBusy = false;

function mountRecipientExperience(payload) {
    activeRecipientPayload = payload;
    recUnlocked = false;
    recWrongAttempts = 0;
    recUnfoldedSet = new Set();
    recUnreadPool = [...Array(payload.jarNotes.length).keys()];
    recPenRunning = false;
    jarAnimBusy = false;

    applyVisualTheme(payload.theme);
    document.getElementById('creator-view').classList.add('hidden');
    document.getElementById('recipient-view').classList.remove('hidden');

    ['rec-stage-1', 'rec-stage-2', 'rec-stage-3', 'rec-stage-4'].forEach((id, i) => {
        const el = document.getElementById(id);
        el.classList.toggle('active', i === 0);
        el.classList.toggle('hidden', i !== 0);
    });

    document.getElementById('rec-for-pill').textContent = `For ${payload.herName} Only`;
    document.getElementById('wreath-lock-stage').classList.remove('bloomed');
    const keyInput = document.getElementById('rec-key-input');
    keyInput.value = '';
    keyInput.placeholder = isPreviewMode ? `Type "${payload.secretKey}" to unlock...` : 'Enter the secret key...';
    document.getElementById('rec-wrong-hint').classList.remove('visible');

    document.getElementById('rec-ch1-her-name').textContent = payload.herName;
    document.getElementById('rec-ch1-body').textContent = payload.chapter1;
    document.getElementById('rec-ch2-body').textContent = payload.chapter2;

    document.getElementById('rec-vault-her-name').textContent = payload.herName;
    setupRecipientTimer(payload.startDate);

    const cardsGrid = document.getElementById('rec-flip-cards-grid');
    cardsGrid.innerHTML = '';
    payload.flipCards.forEach((c, idx) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'secret-flip-card';
        cardEl.tabIndex = 0;
        cardEl.setAttribute('role', 'button');
        cardEl.innerHTML = `
            <div class="secret-flip-inner">
                <div class="secret-face secret-front">
                    <div class="secret-icon-circle">${escapeHtml(c.icon)}</div>
                    <h3>${escapeHtml(c.title)}</h3>
                    <span class="secret-tap-hint">Tap to reveal secret</span>
                </div>
                <div class="secret-face secret-back">
                    <span class="secret-back-num">Secret #0${idx + 1}</span>
                    <p>${escapeHtml(c.secret)}</p>
                </div>
            </div>
        `;
        cardEl.addEventListener('click', () => {
            cardEl.classList.toggle('flipped');
            playHarpPluck(659.25);
            if (cardEl.classList.contains('flipped')) {
                const r = cardEl.getBoundingClientRect();
                spawnPetalBurst(r.left + r.width / 2, r.top + r.height / 2, 16);
            }
        });
        cardsGrid.appendChild(cardEl);
    });

    const envGrid = document.getElementById('rec-envelopes-grid');
    envGrid.innerHTML = '';
    const envIcons = ['💌', '🌙', '🤍', '🌹'];
    payload.envelopes.forEach((env, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'wax-env-btn';
        btn.innerHTML = `
            <div class="wax-seal-medallion">${envIcons[idx % envIcons.length]}</div>
            <div class="wax-env-meta">
                <h3>${escapeHtml(env.title)}</h3>
                <span>Tap to break wax seal →</span>
            </div>
        `;
        btn.addEventListener('click', () => {
            playPaperSound();
            document.getElementById('rec-env-modal-title').textContent = env.title;
            document.getElementById('rec-env-modal-body').textContent = env.body;
            document.getElementById('rec-env-modal-sig').textContent = `${payload.signature} ♥`;
            document.getElementById('rec-envelope-modal').classList.add('open');
            spawnPetalBurst(cw / 2, ch / 2, 22);
        });
        envGrid.appendChild(btn);
    });

    document.getElementById('rec-jar-progress').textContent = `0 / ${payload.jarNotes.length} Notes Unfolded`;
    document.getElementById('rec-letter-heading').textContent = `To My Dearest ${payload.herName}`;
    document.getElementById('rec-letter-prose').textContent =
        `${payload.chapter1}\n\n${payload.firstKiss}\n\n${payload.chapter2}`;
    document.getElementById('rec-sig-handwritten').textContent = payload.signature;
    resetRecMagicalPenDom();
    document.getElementById('rec-shower-msg').textContent = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('rec-unlock-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!activeRecipientPayload || recUnlocked) return;

    const typed = document.getElementById('rec-key-input').value.trim().toLowerCase();
    const expected = activeRecipientPayload.secretKey.trim().toLowerCase();

    if (typed && typed === expected) {
        recUnlocked = true;
        document.getElementById('rec-wrong-hint').classList.remove('visible');
        document.getElementById('rec-key-input').blur();

        playHarpArpeggio();
        const stageEl = document.getElementById('wreath-lock-stage');
        stageEl.classList.add('bloomed');
        const rect = stageEl.getBoundingClientRect();
        spawnPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 68);

        setTimeout(() => goRecStage('rec-stage-1', 'rec-stage-2'), 1500);
    } else {
        playPianoNote(196, 0.5, 0.06);
        const hintBox = document.getElementById('rec-wrong-hint');
        hintBox.textContent = activeRecipientPayload.keyHint;
        recWrongAttempts++;
        hintBox.classList.add('visible');

        const lockCard = document.getElementById('rec-lock-card');
        lockCard.classList.remove('shake');
        void lockCard.offsetWidth;
        lockCard.classList.add('shake');
    }
});

function goRecStage(fromId, toId) {
    playHarpPluck(659.25);
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(fromId).classList.add('hidden');
    document.getElementById(toId).classList.remove('hidden');
    document.getElementById(toId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openRecHeartVault() {
    playHarpArpeggio();
    spawnPetalBurst(cw / 2, ch * 0.42, 65);
    goRecStage('rec-stage-3', 'rec-stage-4');
}

function setupRecipientTimer(dateStr) {
    clearInterval(recTimerInterval);
    const panel = document.getElementById('rec-timer-panel');
    if (!dateStr) { panel.style.display = 'none'; return; }
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3) { panel.style.display = 'none'; return; }
    const start = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);
    if (isNaN(start.getTime())) { panel.style.display = 'none'; return; }

    panel.style.display = 'inline-flex';
    document.getElementById('rec-timer-caption').textContent = `Every second since ${dateStr} has belonged to you`;

    function tick() {
        const diff = Math.max(0, Date.now() - start.getTime());
        const secs = Math.floor(diff / 1000);
        document.getElementById('rt-days').textContent = String(Math.floor(secs / 86400)).padStart(2, '0');
        document.getElementById('rt-hours').textContent = String(Math.floor((secs % 86400) / 3600)).padStart(2, '0');
        document.getElementById('rt-mins').textContent = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        document.getElementById('rt-secs').textContent = String(secs % 60).padStart(2, '0');
    }
    tick();
    recTimerInterval = setInterval(tick, 1000);
}

function getNextRecJarIdx() {
    const total = activeRecipientPayload.jarNotes.length;
    if (recUnreadPool.length === 0) recUnreadPool = [...Array(total).keys()];
    const pos = Math.floor(Math.random() * recUnreadPool.length);
    const idx = recUnreadPool.splice(pos, 1)[0];
    recUnfoldedSet.add(idx);
    document.getElementById('rec-jar-progress').textContent = `${recUnfoldedSet.size} / ${total} Notes Unfolded`;
    return idx;
}

function showRecJarSlipModal(idx) {
    const total = activeRecipientPayload.jarNotes.length;
    const note = activeRecipientPayload.jarNotes[idx];
    document.getElementById('rec-jar-modal-num').textContent = `Folded Note #${String(idx + 1).padStart(2, '0')} of ${total}`;
    document.getElementById('rec-jar-modal-tag').textContent = note.tag;
    document.getElementById('rec-jar-modal-text').textContent = `“${note.text}”`;
    document.getElementById('rec-jar-modal').classList.add('open');
}

function pullRecJarNote() {
    if (jarAnimBusy || !activeRecipientPayload) return;
    jarAnimBusy = true;

    const stage = document.getElementById('rec-jar-stage');
    const slip = document.getElementById('rec-rising-slip');
    const modal = document.getElementById('rec-jar-modal');
    const paperBox = modal.querySelector('.modal-parchment-box');

    stage.classList.remove('jar-opening', 'wobble');
    slip.classList.remove('slip-launch', 'pop');
    void stage.offsetWidth;

    stage.classList.add('jar-opening');
    slip.classList.add('slip-launch');
    playPaperSound();

    const r = stage.getBoundingClientRect();
    spawnPetalBurst(r.left + r.width / 2, r.top + 32, 26, { upward: true, speed: 4.5 });

    const idx = getNextRecJarIdx();
    setTimeout(() => {
        showRecJarSlipModal(idx);
        paperBox.classList.remove('paper-refolding', 'paper-unfolding');
        void paperBox.offsetWidth;
        paperBox.classList.add('paper-unfolding');
        playHarpPluck(783.99);
        spawnPetalBurst(cw / 2, ch * 0.45, 18);
    }, 560);

    setTimeout(() => {
        stage.classList.remove('jar-opening');
        slip.classList.remove('slip-launch');
        jarAnimBusy = false;
    }, 950);
}

function pullAnotherRecJarNote() {
    if (jarAnimBusy || !activeRecipientPayload) return;
    jarAnimBusy = true;

    const modal = document.getElementById('rec-jar-modal');
    const paperBox = modal.querySelector('.modal-parchment-box');

    playPaperSound();
    paperBox.classList.remove('paper-unfolding');
    paperBox.classList.add('paper-refolding');

    setTimeout(() => {
        modal.classList.remove('open');
        paperBox.classList.remove('paper-refolding');
        jarAnimBusy = false;
        pullRecJarNote();
    }, 360);
}

function resetRecMagicalPenDom() {
    const initEl = document.getElementById('rec-initial-letter');
    const sigEl = document.getElementById('rec-sig-handwritten');
    const btnBar = document.getElementById('rec-sign-btn-bar');
    const finStage = document.getElementById('rec-finale-stage');
    const finStamp = document.getElementById('rec-finale-stamp');
    const replayBar = document.getElementById('rec-replay-bar');

    initEl.classList.remove('dissolving', 'vanished');
    sigEl.style.clipPath = 'inset(0 100% 0 0)';
    sigEl.style.webkitClipPath = 'inset(0 100% 0 0)';
    btnBar.style.opacity = '1';
    btnBar.style.pointerEvents = 'auto';
    finStage.classList.remove('active');
    finStamp.classList.remove('visible');
    replayBar.style.display = 'none';
}

function splitMessageIntoLines(msg) {
    const words = msg.trim().split(/\s+/);
    if (words.length <= 4) return [msg.trim()];
    const lines = [];
    let current = '';
    words.forEach((w) => {
        if ((current + ' ' + w).trim().length > 26 && current.length > 0) {
            lines.push(current.trim());
            current = w;
        } else {
            current = (current + ' ' + w).trim();
        }
    });
    if (current) lines.push(current.trim());
    return lines;
}

function animateTween(ms, cb) {
    return new Promise((resolve) => {
        const t0 = performance.now();
        function frame(now) {
            const p = Math.min(1, (now - t0) / ms);
            cb(p);
            if (p < 1) requestAnimationFrame(frame);
            else resolve();
        }
        requestAnimationFrame(frame);
    });
}

function positionRecQuillAt(localX, localY) {
    const quill = document.getElementById('rec-quill-sprite');
    quill.style.transform = `translate(${localX - 6}px, ${localY - 76}px)`;
}

function emitRecQuillSpark(localX, localY, count = 2) {
    const card = document.getElementById('rec-parchment-card');
    const r = card.getBoundingClientRect();
    spawnPetalBurst(r.left + localX, r.top + localY, count, { speed: 2.1, size: 6, decay: 0.025 });
}

async function triggerRecMagicalPen() {
    if (recPenRunning || !activeRecipientPayload) return;
    recPenRunning = true;

    const card = document.getElementById('rec-parchment-card');
    const quill = document.getElementById('rec-quill-sprite');
    const initEl = document.getElementById('rec-initial-letter');
    const sigEl = document.getElementById('rec-sig-handwritten');
    const btnBar = document.getElementById('rec-sign-btn-bar');
    const finStage = document.getElementById('rec-finale-stage');
    const linesWrap = document.getElementById('rec-finale-lines-wrap');
    const finStamp = document.getElementById('rec-finale-stamp');
    const replayBar = document.getElementById('rec-replay-bar');

    btnBar.style.opacity = '0';
    btnBar.style.pointerEvents = 'none';

    const cRect = card.getBoundingClientRect();
    const sRect = sigEl.getBoundingClientRect();
    const startX = (sRect.left - cRect.left) + 8;
    const endX = (sRect.right - cRect.left) - 4;
    const sigY = (sRect.top - cRect.top) + (sRect.height * 0.65);

    quill.classList.add('visible');
    playHarpPluck(783.99);
    await animateTween(600, (t) => {
        const ease = 1 - Math.pow(1 - t, 3);
        positionRecQuillAt((cRect.width * 0.85) + (startX - cRect.width * 0.85) * ease, 28 + (sigY - 28) * ease);
    });

    playHarpPluck(880);
    await animateTween(1500, (t) => {
        const rem = (1 - t) * 100;
        sigEl.style.clipPath = `inset(0 ${rem}% 0 0)`;
        sigEl.style.webkitClipPath = `inset(0 ${rem}% 0 0)`;
        const cx = startX + (endX - startX) * t;
        const cy = sigY + Math.sin(t * Math.PI * 9) * 5;
        positionRecQuillAt(cx, cy);
        emitRecQuillSpark(cx, cy, 2);
    });

    await new Promise(r => setTimeout(r, 1200));

    playHarpArpeggio();
    initEl.classList.add('dissolving');
    await new Promise(r => setTimeout(r, 1100));
    initEl.classList.add('vanished');

    const splitLines = splitMessageIntoLines(activeRecipientPayload.finaleMsg);
    linesWrap.innerHTML = '';
    const lineEls = splitLines.map((lineText) => {
        const div = document.createElement('div');
        div.className = 'finale-script-line';
        div.textContent = lineText;
        linesWrap.appendChild(div);
        return div;
    });

    finStamp.textContent = `— ${activeRecipientPayload.signature} ♥`;
    finStage.classList.add('active');

    for (let i = 0; i < lineEls.length; i++) {
        const el = lineEls[i];
        const uCRect = card.getBoundingClientRect();
        const lRect = el.getBoundingClientRect();
        const lx1 = Math.max(20, lRect.left - uCRect.left);
        const lx2 = Math.min(uCRect.width - 20, lRect.right - uCRect.left);
        const ly = (lRect.top - uCRect.top) + (lRect.height * 0.62);

        playHarpPluck(783.99 + i * 85);
        await animateTween(300, (t) => {
            const ease = 1 - Math.pow(1 - t, 3);
            positionRecQuillAt((uCRect.width * 0.5) + (lx1 - uCRect.width * 0.5) * ease, ly);
        });

        await animateTween(1100, (t) => {
            const rem = (1 - t) * 100;
            el.style.clipPath = `inset(0 ${rem}% 0 0)`;
            el.style.webkitClipPath = `inset(0 ${rem}% 0 0)`;
            const cx = lx1 + (lx2 - lx1) * t;
            const cy = ly + Math.sin(t * Math.PI * 12) * 4;
            positionRecQuillAt(cx, cy);
            emitRecQuillSpark(cx, cy, 2);
        });
    }

    quill.classList.remove('visible');
    finStamp.classList.add('visible');
    replayBar.style.display = 'block';
    playHarpArpeggio();

    const fRect = card.getBoundingClientRect();
    spawnPetalBurst(fRect.left + fRect.width / 2, fRect.top + fRect.height / 2, 60);
    recPenRunning = false;
}

function replayRecMagicalPen() {
    if (recPenRunning) return;
    resetRecMagicalPenDom();
    setTimeout(() => triggerRecMagicalPen(), 300);
}

function triggerRecHeartShower() {
    playHarpArpeggio();
    const you = activeRecipientPayload?.yourName || 'their';
    document.getElementById('rec-shower-msg').textContent = `Every heart & petal just reached ${you}'s heart ♥`;
    [0.15, 0.32, 0.5, 0.68, 0.85].forEach((ratio, i) => {
        setTimeout(() => {
            spawnPetalBurst(cw * ratio, ch * 0.88, 24, { upward: true, heartsOnly: true, speed: 6 });
        }, i * 110);
    });
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

async function bootPetalLockApp() {
    const params = new URLSearchParams(window.location.search);
    const vaultId = (params.get('v') || '').trim().toUpperCase();

    if (vaultId) {
        showToast('🌸 Opening your secret vault...');
        const { data, error } = await supabaseClient
            .from('vaults')
            .select('payload')
            .eq('id', vaultId)
            .single();

        if (!error && data && data.payload) {
            isPreviewMode = false;
            document.getElementById('preview-banner-bar').classList.remove('visible');
            document.getElementById('footer-create-own-btn').style.display = 'inline-block';
            mountRecipientExperience(buildHydratedExperience(data.payload));
            return;
        } else {
            showToast('⏳ This vault is pending activation or does not exist.');
            return;
        }
    }

    document.getElementById('recipient-view').classList.add('hidden');
    document.getElementById('creator-view').classList.remove('hidden');
    document.getElementById('footer-create-own-btn').style.display = 'none';
    showCreatorSection('landing');
}

window.addEventListener('DOMContentLoaded', bootPetalLockApp);
