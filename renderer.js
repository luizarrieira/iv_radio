// renderer.js — Versão Final AAA: Sincronismo Absoluto, Hot-Swapping e Preload

/* =================== Init Data Check =================== */
const WEATHER_LIMITS = window.GERAL_DATA ? window.GERAL_DATA.weatherLimits : { cloud:11, fog:12, rain:11, sun:12, wind:11 };

/* =================== AudioContext / Constants =================== */
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

// ==== INÍCIO DO DESBLOQUEADOR SUPREMO PARA IOS ====
let iosUnlocked = false;

function unlockAudioForiOS() {
    if (iosUnlocked) return;
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const buffer = audioCtx.createBuffer(1, 1, 22050);
    const node = audioCtx.createBufferSource();
    node.buffer = buffer;
    node.connect(audioCtx.destination);
    node.start(0);

    streamAudioElement.src = silentWAV;
    streamAudioElement.play().catch(e => log('iOS bloqueou o áudio mudo inicial:', e));

    // LIGA A CORDA DE SALVAÇÃO PARA BACKGROUND!
    keepAliveAudio.src = silentWAV;
    keepAliveAudio.play().catch(e => log('Keep-alive bloqueado:', e));

    iosUnlocked = true;
    ['touchstart', 'touchend', 'click'].forEach(evt => 
        document.removeEventListener(evt, unlockAudioForiOS)
    );
    log("🍏 iOS Audio BATIZADO e Desbloqueado com sucesso!");
}

// Escuta em todas as frentes possíveis!
['touchstart', 'touchend', 'click'].forEach(evt => 
    document.addEventListener(evt, unlockAudioForiOS, { once: true })
);
// ==== FIM DO DESBLOQUEADOR ====

const DUCK_TARGET = 0.4;    
const DUCK_DOWN_TIME = 0.1; 
const DUCK_UP_TIME = 0.1;   

/* =================== Gains / Analyser / Streaming =================== */
const musicGain = audioCtx.createGain(); musicGain.gain.value = 1.0; musicGain.connect(audioCtx.destination);
const narrationGain = audioCtx.createGain(); narrationGain.connect(audioCtx.destination);
const analyser = audioCtx.createAnalyser(); analyser.fftSize = 512;
narrationGain.connect(analyser);

// A NOSSA FAIXA MUDA MÁGICA DE 1 BYTE
const silentWAV = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

// O NOSSO STREAM PRINCIPAL (Mixes)
const streamAudioElement = new Audio();
streamAudioElement.crossOrigin = "anonymous";
streamAudioElement.setAttribute('playsinline', ''); 
streamAudioElement.setAttribute('webkit-playsinline', '');
streamAudioElement.style.display = 'none';
document.body.appendChild(streamAudioElement);

// O NOVO MOTOR KEEP-ALIVE (O Impede-Dormir)
const keepAliveAudio = new Audio();
keepAliveAudio.setAttribute('playsinline', '');
keepAliveAudio.setAttribute('webkit-playsinline', '');
keepAliveAudio.loop = true; // Toca em loop infinito!
keepAliveAudio.style.display = 'none';
document.body.appendChild(keepAliveAudio);

// AS LINHAS "createMediaElementSource" e "connect(musicGain)" FORAM APAGADAS AQUI! 

// ==== O SEGURANÇA (ANTI-SEEK GUARD) ====
streamAudioElement.addEventListener('seeked', () => {
    // Se fomos nós (o sistema) a avançar o áudio, está tudo bem.
    if (isSystemSeeking) {
        isSystemSeeking = false;
        return;
    }
    // Se o jogador arrastou a barra no Chrome, nós punimos e voltamos para o tempo real ao vivo!
    if (currentStreamEvent) {
        log("Tentativa de avanço bloqueada pelo Sistema Anti-Seek!");
        const correctOffset = (getCurrentMonthMs() - currentStreamEvent.startMs) / 1000;
        isSystemSeeking = true;
        streamAudioElement.currentTime = Math.max(0, correctOffset);
    }
});

// ==== PERSONALIZAR O WIDGET DO CHROME ====
function updateChromeMediaHub(titleText) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: titleText, // Ex: "radio_vladivostok"
            artist: 'IV Radio Player',
            album: activeExpansionKey.toUpperCase() + ' EDITION'
        });

        // Diz ao Chrome: "Esta rádio é ao vivo, proíbe o jogador de avançar ou voltar!"
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('seekto', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
    }
}

/* =================== State Management =================== */
const audioBufferCache = new Map();
let started = false;
let currentSessionId = 0; 

let activeExpansionKey = 'iv'; 
let activeRadioKey = 'radio_liberty_rock'; 
let activeNarrationsCount = 0;
let activeAudioSources = [];
let preloadedEvents = new Map();

let currentTimeline = [];

// NOVAS VARIÁVEIS PARA O ANTI-SEEK:
let currentStreamEvent = null; 
let isSystemSeeking = false;

/* =================== Utils & Relógio Mestre =================== */
function pad(n, len=2){ return String(n).padStart(len, '0'); }
function log(...args){ console.log('[RADIO]', ...args); }
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

function getCurrentMonthMs() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    return now.getTime() - startOfMonth.getTime();
}

/* =================== Data Loaders =================== */
async function loadTimeline(expansionKey, radioKey) {
    const fileName = radioKey.replace('radio_', 'prog_') + '.json';
    
    // Caminho direto e limpo!
    const url = `programacoes_mensais/${expansionKey}/${fileName}`;
    
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status} - Não encontrado em: ${url}`);
        
        currentTimeline = await resp.json();
        log(`Linha do Tempo carregada: ${currentTimeline.length} eventos.`);
    } catch(e) {
        console.error("Erro CRÍTICO ao carregar timeline:", e.message);
        currentTimeline = [];
    }
}

async function getAudioBuffer(filePath, limparDaMemoria = false) {
    if (!filePath) return null;
    if (audioBufferCache.has(filePath)) {
        const buf = audioBufferCache.get(filePath);
        if (limparDaMemoria) audioBufferCache.delete(filePath);
        return buf;
    }
    try {
        const resp = await fetch(filePath);
        if (!resp.ok) throw new Error(`404`);
        const ab = await resp.arrayBuffer();
        const buf = await audioCtx.decodeAudioData(ab);
        audioBufferCache.set(filePath, buf);
        if (audioBufferCache.size > 20) { 
            const oldestKey = audioBufferCache.keys().next().value;
            audioBufferCache.delete(oldestKey);
        }
        return buf;
    } catch (e) {
        console.warn(`Falha no áudio: ${filePath}`);
        return null;
    }
}

/* =================== Lógica de Clima =================== */
let currentWeatherMain = 'Clear';
async function fetchWeather(){
    try{
        const key = '0cad953b1e9b3793a944d644d5193d3a';
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Maringa,BR&appid=${key}`);
        const j = await resp.json();
        currentWeatherMain = j?.weather?.[0]?.main || 'Clear';
    }catch(e){ currentWeatherMain = 'Clear'; }
}

function pickWeatherFile(condition){
    if(!condition) return null;
    const c = condition.toLowerCase();
    const getW = (prefix, limit) => `weather/${prefix}_${pad(Math.floor(Math.random()*limit)+1, 2)}.ogg`;
    const L = WEATHER_LIMITS;
    if(c.includes('cloud')) return getW('CLOUD', L.cloud);
    if(c.includes('rain')) return getW('RAIN', L.rain);
    if(c.includes('fog')||c.includes('mist')) return getW('FOG', L.fog);
    if(c.includes('wind')) return getW('WIND', L.wind);
    return getW('SUN', L.sun);
}

/* =================== Motores de Reprodução (Agendamento Físico) =================== */

// Ducking agora obedece ao relógio absoluto da placa de som!
function onNarrationStart(scheduledTime = null){
    if(!started) return;
    activeNarrationsCount++;
    const triggerTime = scheduledTime !== null ? Math.max(audioCtx.currentTime, scheduledTime) : audioCtx.currentTime;
    
    musicGain.gain.cancelScheduledValues(triggerTime);
    musicGain.gain.setValueAtTime(musicGain.gain.value, triggerTime);
    musicGain.gain.linearRampToValueAtTime(DUCK_TARGET, triggerTime + DUCK_DOWN_TIME);
}

function onNarrationEnd(scheduledTime = null){
    if(!started) return;
    activeNarrationsCount = Math.max(0, activeNarrationsCount-1);
    if(activeNarrationsCount === 0){
        const triggerTime = scheduledTime !== null ? Math.max(audioCtx.currentTime, scheduledTime) : audioCtx.currentTime;
        
        musicGain.gain.cancelScheduledValues(triggerTime);
        musicGain.gain.setValueAtTime(musicGain.gain.value, triggerTime);
        musicGain.gain.linearRampToValueAtTime(1.0, triggerTime + DUCK_UP_TIME);
    }
}

function playCenteredSlot(buf, targetSlotMs, startOffset = 0, scheduledTime = null) {
    const s = audioCtx.createBufferSource();
    s.buffer = buf;
    s.connect(narrationGain);
    activeAudioSources.push(s);
    
    const audioDur = buf.duration;
    const padding = Math.max(0, (targetSlotMs / 1000) - audioDur);
    const halfPadding = padding / 2; 

    s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    const baseTime = scheduledTime !== null ? scheduledTime : audioCtx.currentTime;
    
    if (startOffset === 0) {
        s.start(baseTime + halfPadding);
    } else {
        if (startOffset < halfPadding) {
            s.start(baseTime + (halfPadding - startOffset));
        } else if (startOffset < halfPadding + audioDur) {
            s.start(baseTime, startOffset - halfPadding);
        }
    }
}

/* =================== O Scanner da Linha do Tempo =================== */
async function preloadEvent(ev) {
    if (ev.type === 'dynamic_weather') {
        await fetchWeather();
        const wPath = pickWeatherFile(currentWeatherMain);
        if (wPath) {
            ev._resolvedPath = wPath; 
            await getAudioBuffer(wPath);
        }
    } else if (ev.path && ev.type !== 'stream') {
        await getAudioBuffer(ev.path);
    }
}

async function executeEvent(ev, mySession, forcedSyncTime = null, forcedNowMs = null) {
    if (!started || currentSessionId !== mySession) return;

    if (ev.type === 'stream') {
        currentStreamEvent = ev; // Guarda na memória quem está a tocar
        const offset = (getCurrentMonthMs() - ev.startMs) / 1000;
        
        isSystemSeeking = true; // Avisa o segurança que este salto é legal
        streamAudioElement.src = ev.path;
        streamAudioElement.currentTime = Math.max(0, offset);
        streamAudioElement.play().catch(e => log('Autoplay bloqueado', e));
        
        // Atualiza o widget do Chrome com o nome bonito da Rádio!
        updateChromeMediaHub(activeRadioKey.replace('radio_', '').toUpperCase().replace(/_/g, ' '));
        return;
    }

    let pathToPlay = ev.path;
    if (ev.type === 'dynamic_weather') {
        pathToPlay = ev._resolvedPath || pickWeatherFile(currentWeatherMain);
    }
    if (!pathToPlay) return;

    const buf = await getAudioBuffer(pathToPlay, true);
    if (!buf || !started || currentSessionId !== mySession) return;

    // MATEMÁTICA DE SINCRONISMO ABSOLUTA
    const nowMs = forcedNowMs !== null ? forcedNowMs : getCurrentMonthMs();
    const seekOffsetSec = (nowMs - ev.startMs) / 1000;
    
    let startOffset = 0;
    let scheduledTime = audioCtx.currentTime;

    if (forcedSyncTime !== null) {
        // Hot-Swap Obrigado (Múltiplos áudios agrupados colados no mesmo nanosegundo)
        scheduledTime = forcedSyncTime;
        startOffset = Math.max(0, seekOffsetSec);
    } else {
        // Agendamento no Futuro (O Radar manda executar segundos antes de acontecer)
        if (seekOffsetSec < 0) {
            scheduledTime = audioCtx.currentTime + Math.abs(seekOffsetSec);
        } else {
            startOffset = seekOffsetSec; // Compensação de mini-lags
        }
    }

    if (ev.type === 'dynamic_weather') {
        playCenteredSlot(buf, ev.targetMs, startOffset, scheduledTime);
        return;
    }

    const s = audioCtx.createBufferSource();
    s.buffer = buf;
    activeAudioSources.push(s);

    if (ev.type === 'voiceover') {
        s.connect(narrationGain);
        onNarrationStart(scheduledTime); // Ducking agendado na placa de som!
        s.onended = () => { onNarrationEnd(audioCtx.currentTime); activeAudioSources = activeAudioSources.filter(x => x !== s); };
    } else if (ev.type === 'music') {
        s.connect(musicGain);
        s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    } else {
        s.connect(narrationGain);
        s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    }

    // DISPARO PERFEITO
    s.start(scheduledTime, startOffset);
    
    if (startOffset > 0) {
        log(`🔄 HOT-SWAP: ${pathToPlay} (Avançado: ${startOffset.toFixed(2)}s)`);
    } else {
        const tempoRestante = scheduledTime - audioCtx.currentTime;
        log(`▶️ Agendado: ${pathToPlay} (Inicia em ${tempoRestante.toFixed(2)}s)`);
    }
}

async function radioLoop(mySession) {
    log(`A sintonizar Rádio (${activeExpansionKey} -> ${activeRadioKey})...`);
    await loadTimeline(activeExpansionKey, activeRadioKey);
    
    if (currentTimeline.length === 0) {
        log("Timeline vazia. Rádio abortada.");
        return;
    }

    let eventIndex = 0;
    let nowMs = getCurrentMonthMs();
    
    // =========================================================================
    // 1. O BLOCO MÁGICO DE HOT-SWAP (Corrige os atrasos de narração vs música)
    // =========================================================================
    const hotSwapEvents = [];
    for (let i = 0; i < currentTimeline.length; i++) {
        const ev = currentTimeline[i];
        
        // Pega tudo o que já devia estar a tocar ou que vai tocar nos próximos 2 segundos!
        if (ev.startMs <= nowMs && ev.endMs > nowMs) {
            hotSwapEvents.push(ev); 
        } else if (ev.startMs > nowMs && ev.startMs - nowMs <= 2000) {
            hotSwapEvents.push(ev); 
        }
        
        // Marca o ponto do radar para o futuro
        if (ev.startMs > nowMs + 2000 && eventIndex === 0) {
            eventIndex = i;
        }
    }
    if (eventIndex === 0) eventIndex = currentTimeline.findIndex(ev => ev.startMs > nowMs + 2000);

    if (hotSwapEvents.length > 0) {
        // ESPERA todos os ficheiros daquele momento estarem carregados na memória RAM
        await Promise.all(hotSwapEvents.map(ev => preloadEvent(ev)));
        
        // Recalcula o relógio (porque o download demorou uns milissegundos)
        nowMs = getCurrentMonthMs();
        const syncAudioContextTime = audioCtx.currentTime + 0.05; // Dá um espaço de 50ms para todos entrarem cravados
        
        for (const ev of hotSwapEvents) {
            if (ev.startMs <= nowMs) {
                // Hot-Swap: Disparamos todos com o mesmo relógio forçado
                executeEvent(ev, mySession, syncAudioContextTime, nowMs);
            } else {
                // Futuro imediato: Deixa agendar com o delay natural
                executeEvent(ev, mySession); 
            }
        }
    }

    // =========================================================================
    // 2. RADAR DE EVENTOS (O Motor Permanente)
    // =========================================================================
    while(started && currentSessionId === mySession) {
        nowMs = getCurrentMonthMs();
        
        // A. RADAR PRELOAD: Olha 15 segundos para a frente na programação e descodifica
        for (let i = eventIndex; i < currentTimeline.length; i++) {
            const ev = currentTimeline[i];
            if (ev.startMs - nowMs <= 15000) {
                if (!preloadedEvents.has(i)) {
                    preloadedEvents.set(i, true);
                    preloadEvent(ev).catch(e => {}); 
                }
            } else { break; }
        }

        // B. GATILHO DE REPRODUÇÃO: Agenda o áudio 2 segundos ANTES de ele acontecer!
        // Isto delega a responsabilidade do tempo para a Placa de Som, evitando engasgos no Javascript
        while (eventIndex < currentTimeline.length && currentTimeline[eventIndex].startMs - nowMs <= 2000) {
            const ev = currentTimeline[eventIndex];
            if (ev.endMs > nowMs) { 
                executeEvent(ev, mySession);
            }
            preloadedEvents.delete(eventIndex); 
            eventIndex++;
        }

        if (eventIndex >= currentTimeline.length) {
            log("Virada de mês atingida. A reiniciar index...");
            eventIndex = 0;
            preloadedEvents.clear();
        }

        await sleep(50); 
    }
}

// ==== CONTROLO DE ESTADO GLOBAL ====
async function startRadio(expansionKey, radioKey){
    // NOVA LINHA: Força o desbloqueio no momento exato do clique!
    unlockAudioForiOS();

    if(started && activeExpansionKey === expansionKey && activeRadioKey === radioKey) return;
    
    stopRadio(); 
    activeExpansionKey = expansionKey;
    activeRadioKey = radioKey;
    started = true;
    currentSessionId++; 
    const mySession = currentSessionId;
    
    if(audioCtx.state === 'suspended') await audioCtx.resume();
    
    radioLoop(mySession).catch(e => {
        console.error("Erro no Loop Mestre:", e);
        if(currentSessionId === mySession) started = false;
    });
}

function stopRadio() {
    log('A parar rádio atual e a limpar buffers...');
    started = false; 

    activeAudioSources.forEach(src => {
        try { src.stop(); } catch(e) {}
    });
    activeAudioSources = [];
    preloadedEvents.clear();

    streamAudioElement.pause();
    streamAudioElement.src = ""; 
    
    // DESLIGA O KEEP-ALIVE
    keepAliveAudio.pause();
    
    const now = audioCtx.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(1.0, now);
    activeNarrationsCount = 0;
}

window.__RADIO = window.__RADIO || {};
window.__RADIO.startRadio = startRadio;
window.__RADIO.stopRadio = stopRadio;
