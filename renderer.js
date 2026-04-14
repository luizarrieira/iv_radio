// renderer.js — Versão Final AAA: Correção de Race Condition e iOS Background Limpo

/* =================== Init Data Check =================== */
const WEATHER_LIMITS = window.GERAL_DATA ? window.GERAL_DATA.weatherLimits : { cloud:11, fog:12, rain:11, sun:12, wind:11 };

/* =================== AudioContext / Constants =================== */
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

const DUCK_TARGET = 0.4;    
const DUCK_DOWN_TIME = 0.1; 
const DUCK_UP_TIME = 0.1;   

/* =================== Gerador de Silêncio Real =================== */
function gerarSilencio10Segundos() {
    // CORREÇÃO: Mudado para 16-bits! O zero agora significa Silêncio Absoluto.
    const sampleRate = 8000, segundos = 10, channels = 1, bps = 16;
    const blockAlign = channels * (bps / 8);
    const dataSize = sampleRate * segundos * blockAlign; 
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeStr = (pos, str) => { for(let i=0; i<str.length; i++) view.setUint8(pos+i, str.charCodeAt(i)); };

    writeStr(0, 'RIFF'); view.setUint32(4, 36 + dataSize, true);
    writeStr(8, 'WAVE'); writeStr(12, 'fmt '); view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true); view.setUint16(34, bps, true);
    writeStr(36, 'data'); view.setUint32(40, dataSize, true);

    let binary = '';
    const bytes = new Uint8Array(buffer);
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return 'data:audio/wav;base64,' + btoa(binary);
}
const silentTrack = gerarSilencio10Segundos();

/* =================== Gains / Analyser / Streaming =================== */
const musicGain = audioCtx.createGain(); musicGain.gain.value = 1.0; musicGain.connect(audioCtx.destination);
const narrationGain = audioCtx.createGain(); narrationGain.connect(audioCtx.destination);
const analyser = audioCtx.createAnalyser(); analyser.fftSize = 512;
narrationGain.connect(analyser);

const streamAudioElement = new Audio();
streamAudioElement.crossOrigin = "anonymous";
streamAudioElement.setAttribute('playsinline', ''); 
streamAudioElement.setAttribute('webkit-playsinline', '');
// Pré-carrega o silêncio logo à nascença!
streamAudioElement.src = silentTrack; 
streamAudioElement.style.display = 'none';
document.body.appendChild(streamAudioElement);

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

let currentStreamEvent = null; 
let iosUnlocked = false;

/* =================== Utils & Relógio Mestre =================== */
function pad(n, len=2){ return String(n).padStart(len, '0'); }
function log(...args){ console.log('[RADIO]', ...args); }
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

function getCurrentMonthMs() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    return now.getTime() - startOfMonth.getTime();
}

/* =================== Personalizar Widget Media (Chrome/iOS) =================== */
function updateChromeMediaHub(titleText) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: titleText,
            artist: 'IV Radio Player',
            album: activeExpansionKey.toUpperCase() + ' EDITION'
        });
        
        const blockAction = () => {}; // Função vazia que bloqueia interações
        navigator.mediaSession.setActionHandler('seekto', blockAction);
        navigator.mediaSession.setActionHandler('seekbackward', blockAction);
        navigator.mediaSession.setActionHandler('seekforward', blockAction);
        navigator.mediaSession.setActionHandler('previoustrack', blockAction);
        navigator.mediaSession.setActionHandler('nexttrack', blockAction);

        // A MÁGICA DO LIVE STREAM: Diz ao sistema que a duração é infinita
        if ('setPositionState' in navigator.mediaSession) {
            navigator.mediaSession.setPositionState({
                duration: Infinity, 
                playbackRate: 1.0,
                position: 0
            });
        }
        // FORÇA O ESTADO DE PLAYING (Esconde o comportamento de TV a Cabo)
        navigator.mediaSession.playbackState = 'playing';
    }
}

/* =================== Desbloqueador Limpo do iOS =================== */
function unlockAudioForiOS() {
    if (iosUnlocked) return;
    if (audioCtx.state !== 'running') audioCtx.resume().catch(()=>{});

    if (!streamAudioElement.src.startsWith('data:')) {
        streamAudioElement.src = silentTrack;
    }
    streamAudioElement.muted = false; 
    streamAudioElement.loop = true;
    
    streamAudioElement.play().then(() => {
        iosUnlocked = true;
        log("🍏 iOS Audio Desbloqueado com sucesso (Widget Ativo)!");
    }).catch(e => log('Desbloqueio aguardando interação.'));

    ['touchstart', 'touchend', 'click'].forEach(evt => document.removeEventListener(evt, unlockAudioForiOS));
}
['touchstart', 'touchend', 'click'].forEach(evt => document.addEventListener(evt, unlockAudioForiOS, { once: true }));

/* =================== Data Loaders =================== */
async function loadTimeline(expansionKey, radioKey) {
    let targetExpansion = expansionKey;

    const radioData = window.STATION_DATA.PROGRAMACOES[expansionKey]?.[radioKey];
    
    if (radioData && radioData.aliasFrom) {
        targetExpansion = radioData.aliasFrom;
        log(`🔀 Roteamento Dinâmico: Puxando ${radioKey} diretamente da expansão ${targetExpansion.toUpperCase()}.`);
    }

    const fileName = radioKey.replace('radio_', 'prog_') + '.json';
    const url = `programacoes_mensais/${targetExpansion}/${fileName}`;
    
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status} - Não encontrado em: ${url}`);
        currentTimeline = await resp.json();
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
        // AUMENTADO PARA 40: Reduz recarregamentos agressivos ao pular estações
        if (audioBufferCache.size > 40) { 
            const oldestKey = audioBufferCache.keys().next().value;
            audioBufferCache.delete(oldestKey);
        }
        return buf;
    } catch (e) {
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

/* =================== Motores de Reprodução =================== */
function onNarrationStart(scheduledTime = null){
    if(!started) return;
    activeNarrationsCount++;
    const triggerTime = scheduledTime !== null ? Math.max(audioCtx.currentTime, scheduledTime) : audioCtx.currentTime;
    
    musicGain.gain.setTargetAtTime(DUCK_TARGET, triggerTime, DUCK_DOWN_TIME);
}

function onNarrationEnd(scheduledTime = null){
    if(!started) return;
    activeNarrationsCount = Math.max(0, activeNarrationsCount-1);
    if(activeNarrationsCount === 0){
        const triggerTime = scheduledTime !== null ? Math.max(audioCtx.currentTime, scheduledTime) : audioCtx.currentTime;
        musicGain.gain.setTargetAtTime(1.0, triggerTime, DUCK_UP_TIME);
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
        currentStreamEvent = ev;
        streamAudioElement.src = ev.path;
        streamAudioElement.muted = true; 
        streamAudioElement.loop = false;

        const applyOffsetAndPlay = () => {
            if (currentStreamEvent !== ev) return;
            const offset = (getCurrentMonthMs() - ev.startMs) / 1000;

            const forcePlay = () => {
                if (currentStreamEvent !== ev) return;
                streamAudioElement.muted = false; 
                streamAudioElement.play().catch(e => log('Autoplay stream bloqueado:', e.message));
            };

            if (offset <= 0.5) {
                forcePlay();
            } else {
                streamAudioElement.addEventListener('seeked', forcePlay, { once: true });
                streamAudioElement.currentTime = offset; 
            }

            updateChromeMediaHub(activeRadioKey.replace('radio_', '').toUpperCase().replace(/_/g, ' '));
        };

        if (streamAudioElement.readyState >= 1) { 
            applyOffsetAndPlay();
        } else {
            streamAudioElement.onloadedmetadata = applyOffsetAndPlay;
        }
        return;
    }

    if (!currentStreamEvent) {
        if (streamAudioElement.paused || !streamAudioElement.src.startsWith('data:')) {
            streamAudioElement.src = silentTrack; 
            streamAudioElement.muted = false; 
            streamAudioElement.loop = true;
            streamAudioElement.play().catch(e => {});
            updateChromeMediaHub(activeRadioKey.replace('radio_', '').toUpperCase().replace(/_/g, ' '));
        }
    }

    let pathToPlay = ev.path;
    if (ev.type === 'dynamic_weather') {
        pathToPlay = ev._resolvedPath || pickWeatherFile(currentWeatherMain);
    }
    if (!pathToPlay) return;

    const buf = await getAudioBuffer(pathToPlay, true);
    // ABORTA SE A SESSÃO MUDOU ENQUANTO BAIXAVA: Previne narração perdida da rádio anterior
    if (!buf || !started || currentSessionId !== mySession) return;

    if (audioCtx.state !== 'running') {
        audioCtx.resume().catch(e => log('Erro ao acordar placa de som:', e));
    }
    
    if (activeNarrationsCount === 0) {
        musicGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.01);
    }
    narrationGain.gain.setTargetAtTime(1.0, audioCtx.currentTime, 0.01);

    const nowMs = forcedNowMs !== null ? forcedNowMs : getCurrentMonthMs();
    const seekOffsetSec = (nowMs - ev.startMs) / 1000;
    
    let startOffset = 0;
    let scheduledTime = audioCtx.currentTime;

    if (forcedSyncTime !== null) {
        scheduledTime = forcedSyncTime;
        startOffset = Math.max(0, seekOffsetSec);
    } else {
        if (seekOffsetSec < 0) {
            scheduledTime = audioCtx.currentTime + Math.abs(seekOffsetSec);
        } else {
            startOffset = seekOffsetSec;
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
        onNarrationStart(scheduledTime); 
        s.onended = () => { onNarrationEnd(audioCtx.currentTime); activeAudioSources = activeAudioSources.filter(x => x !== s); };
    } else if (ev.type === 'music') {
        s.connect(musicGain);
        s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    } else {
        s.connect(narrationGain);
        s.onended = () => { activeAudioSources = activeAudioSources.filter(x => x !== s); };
    }

    try {
        s.start(scheduledTime, startOffset);
        if (startOffset > 0) {
            log(`🔄 HOT-SWAP: ${pathToPlay} (Avançado: ${startOffset.toFixed(2)}s)`);
        } else {
            log(`▶️ Agendado: ${pathToPlay}`);
        }
    } catch (err) {
        log(`⚠️ Erro ao tocar (offset além do limite?): ${pathToPlay}`);
        if (ev.type === 'voiceover') onNarrationEnd(audioCtx.currentTime); 
    }
}

async function radioLoop(mySession) {
    log(`A sintonizar Rádio (${activeExpansionKey} -> ${activeRadioKey})...`);
    await loadTimeline(activeExpansionKey, activeRadioKey);
    
    if (currentTimeline.length === 0) {
        return;
    }

    let eventIndex = 0;
    let nowMs = getCurrentMonthMs();
    
    const hotSwapEvents = [];
    for (let i = 0; i < currentTimeline.length; i++) {
        const ev = currentTimeline[i];
        if (ev.startMs <= nowMs && ev.endMs > nowMs) {
            hotSwapEvents.push(ev); 
        } else if (ev.startMs > nowMs && ev.startMs - nowMs <= 2000) {
            hotSwapEvents.push(ev); 
        }
        if (ev.startMs > nowMs + 2000 && eventIndex === 0) {
            eventIndex = i;
        }
    }
    if (eventIndex === 0) eventIndex = currentTimeline.findIndex(ev => ev.startMs > nowMs + 2000);

    if (hotSwapEvents.length > 0) {
        await Promise.all(hotSwapEvents.map(ev => preloadEvent(ev)));
        nowMs = getCurrentMonthMs();
        const syncAudioContextTime = audioCtx.currentTime + 0.05; 
        
        for (const ev of hotSwapEvents) {
            if (ev.startMs <= nowMs) {
                executeEvent(ev, mySession, syncAudioContextTime, nowMs);
            } else {
                executeEvent(ev, mySession); 
            }
        }
    }

    async function radarTick() {
        if (!started || currentSessionId !== mySession) return;
        
        if (audioCtx.state !== 'running') {
            audioCtx.resume().catch(()=>{});
        }

        nowMs = getCurrentMonthMs();

        if (currentStreamEvent && currentStreamEvent.endMs <= nowMs) {
            if (!streamAudioElement.paused && !streamAudioElement.src.startsWith('data:')) {
                log(`🛑 Guilhotina: Encerrando stream.`);
                streamAudioElement.pause();
            }
            currentStreamEvent = null;
        }

        for (let i = eventIndex; i < currentTimeline.length; i++) {
            const ev = currentTimeline[i];
            if (ev.startMs - nowMs <= 30000) {
                if (!preloadedEvents.has(i)) {
                    preloadedEvents.set(i, true);
                    preloadEvent(ev).catch(e => {}); 
                }
            } else { break; }
        }

        while (eventIndex < currentTimeline.length && currentTimeline[eventIndex].startMs - nowMs <= 15000) {
            const ev = currentTimeline[eventIndex];
            if (ev.endMs > nowMs) { 
                executeEvent(ev, mySession);
            }
            preloadedEvents.delete(eventIndex); 
            eventIndex++;
        }

        if (eventIndex >= currentTimeline.length) {
            eventIndex = 0;
            preloadedEvents.clear();
        }
    }

    streamAudioElement.addEventListener('timeupdate', radarTick);
    
    const pcInterval = setInterval(() => {
        if (!started || currentSessionId !== mySession) {
            clearInterval(pcInterval);
            streamAudioElement.removeEventListener('timeupdate', radarTick);
            return;
        }
        radarTick();
    }, 250);
}

// ==== CONTROLO DE ESTADO GLOBAL ====
async function startRadio(expansionKey, radioKey){
    if(started && activeExpansionKey === expansionKey && activeRadioKey === radioKey) return;
    
    stopRadio(); 
    
    activeExpansionKey = expansionKey;
    activeRadioKey = radioKey;
    started = true;
    currentSessionId++; 
    const mySession = currentSessionId;
    
    unlockAudioForiOS();
    
    if(audioCtx.state !== 'running') {
        audioCtx.resume().catch(()=>{});
    }
    
    radioLoop(mySession).catch(e => {
        if(currentSessionId === mySession) started = false;
    });
}

function stopRadio() {
    log('Limpeza profunda do sistema...');
    started = false; 

    activeAudioSources.forEach(src => {
        src.onended = null; 
        try { src.stop(); src.disconnect(); } catch(e) {}
    });
    activeAudioSources = [];
    preloadedEvents.clear();

    streamAudioElement.pause();
    
    // LIMPEZA BRUTA: Remove o src totalmente para matar o download na hora
    streamAudioElement.removeAttribute('src'); 
    streamAudioElement.load(); 
    streamAudioElement.src = silentTrack; 
    
    currentStreamEvent = null;
    
    const now = audioCtx.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(1.0, now);
    activeNarrationsCount = 0;
}

window.__RADIO = window.__RADIO || {};
window.__RADIO.startRadio = startRadio;
window.__RADIO.stopRadio = stopRadio;
window.__RADIO.unlock = unlockAudioForiOS;
