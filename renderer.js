// renderer.js — Versão Final AAA: Sincronia Estrita + Motor HLS + Clima Dinâmico Inteligente

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
let isSystemSeeking = false; 
let iosUnlocked = false;

// Controle da Instância HLS
let hlsInstance = null;

/* =================== Utils & Relógio Mestre =================== */
function pad(n, len=2){ return String(n).padStart(len, '0'); }
function log(...args){ console.log('[RADIO]', ...args); }
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

function getCurrentMonthMs() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    return now.getTime() - startOfMonth.getTime();
}

/* =================== O Segurança (Anti-Seek Guard) =================== */
streamAudioElement.addEventListener('seeked', () => {
    if (isSystemSeeking) {
        isSystemSeeking = false;
        return;
    }
    if (currentStreamEvent && !streamAudioElement.src.startsWith('data:')) {
        log("Tentativa de avanço bloqueada pelo Sistema Anti-Seek!");
        const correctOffset = (getCurrentMonthMs() - currentStreamEvent.startMs) / 1000;
        isSystemSeeking = true;
        streamAudioElement.currentTime = Math.max(0, correctOffset);
    }
});

/* =================== Personalizar Widget Media (Chrome/iOS) =================== */
function updateChromeMediaHub(titleText) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: titleText,
            artist: 'IV Radio Player',
            album: activeExpansionKey.toUpperCase() + ' EDITION'
        });
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('seekto', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
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
        if (audioBufferCache.size > 20) { 
            const oldestKey = audioBufferCache.keys().next().value;
            audioBufferCache.delete(oldestKey);
        }
        return buf;
    } catch (e) {
        return null;
    }
}

/* =================== Lógica de Clima (API ID com Precisão Absoluta) =================== */
let currentWeatherState = null;
let lastWeatherFetch = 0;

const WEATHER_BUCKETS = {
    cloud: { short: [2, 4, 5, 8, 10, 11], long: [1, 3, 6, 7, 9] },
    fog: { short: [3, 5, 7, 8, 10, 12], long: [1, 2, 4, 6, 9, 11] },
    rain: { short: [2, 3, 5, 8, 11], long: [1, 4, 6, 7, 9, 10] },
    sun: { short: [3, 5, 6, 9, 11, 12], long: [1, 2, 4, 7, 8, 10] },
    wind: { short: [1, 5, 7, 10, 11], long: [2, 3, 4, 6, 8, 9] }
};

async function updateWeatherState() {
    const now = Date.now();
    if (now - lastWeatherFetch < 5 * 60 * 1000) return; // Cache de 5 min
    lastWeatherFetch = now;
    
    try {
        const key = '0cad953b1e9b3793a944d644d5193d3a';
        // units=metric força o vento a retornar em metros por segundo (m/s)
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Maringa,BR&appid=${key}&units=metric`);
        const data = await resp.json();
        
        const id = data.weather[0].id;
        const windSpeed = data.wind?.speed || 0; 
        const windGust = data.wind?.gust || 0; 
        const hour = new Date().getHours();
        
        // 1. PRIORIDADE MÁXIMA: Ventos > 13.9 m/s (50km/h) ou Rajadas > 19.4 m/s (70km/h)
        if (windSpeed > 13.9 || windGust > 19.4) {
            currentWeatherState = 'wind';
        } 
        // 2. CHUVA (IDs 200 a 531: Tempestades, Chuviscos, Chuva)
        else if (id >= 200 && id < 600) {
            currentWeatherState = 'rain';
        } 
        // 3. FOG (IDs 700 a 781: Névoa, Fog, Haze, Poeira)
        else if (id >= 700 && id < 800) {
            currentWeatherState = 'fog';
        } 
        // 4. NUVENS (IDs 801 a 804: Poucas nuvens a totalmente nublado)
        else if (id >= 801 && id <= 804) {
            currentWeatherState = 'cloud';
        } 
        // 5. SOL (ID 800: Céu Limpo) -> APENAS das 09h às 15h59
        else if (id === 800) {
            if (hour >= 9 && hour < 16) {
                currentWeatherState = 'sun';
            } else {
                currentWeatherState = null; 
            }
        } 
        else {
            currentWeatherState = null;
        }
        
        log(`🌤️ Clima: [${currentWeatherState || 'NENHUM'}] | ID: ${id} | Vento: ${windSpeed}m/s`);
    } catch(e) { 
        log("Erro na API Weather. Assumindo Clima null.");
        currentWeatherState = null; 
    }
}

function pickWeatherFile(state, slotReservadoMs){
    if(!state) return null;
    const bucketType = (slotReservadoMs && slotReservadoMs > 13000) ? 'long' : 'short';

    let prefix = 'SUN'; let arrays = WEATHER_BUCKETS.sun;
    if(state === 'cloud') { prefix = 'CLOUD'; arrays = WEATHER_BUCKETS.cloud; }
    else if(state === 'rain') { prefix = 'RAIN'; arrays = WEATHER_BUCKETS.rain; }
    else if(state === 'fog') { prefix = 'FOG'; arrays = WEATHER_BUCKETS.fog; }
    else if(state === 'wind') { prefix = 'WIND'; arrays = WEATHER_BUCKETS.wind; }

    const pool = arrays[bucketType];
    const pickedNum = pool[Math.floor(Math.random() * pool.length)];
    return `weather/${prefix}_${pad(pickedNum, 2)}.ogg`;
}

/* =================== Motores de Reprodução (Agendamento Físico) =================== */
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
    // Atualiza o clima apenas se o evento envolver clima para evitar chamadas à toa
    if (ev.type === 'dynamic_weather' || (ev.type === 'voiceover' && ev.path && ev.path.includes('TO_WEATHER'))) {
        await updateWeatherState(); 
    }

    // REGRA 1: Aborta o TO_WEATHER no final da música se o clima não for viável
    if (ev.type === 'voiceover' && ev.path && ev.path.includes('TO_WEATHER')) {
        if (currentWeatherState === null) {
            ev._skipEvent = true; // Marca para ser ignorado no executeEvent
            log(`🛑 Clima indisponível. Cancelando locução de fim de música: ${ev.path}`);
        }
    }

    // REGRA 2: Resolve o buraco do bloco de clima na grade
    if (ev.type === 'dynamic_weather') {
        if (currentWeatherState !== null) {
            // Caminho Feliz: Temos clima válido
            const wPath = pickWeatherFile(currentWeatherState, ev.targetMs);
            if (wPath) {
                ev._resolvedPath = wPath; 
                await getAudioBuffer(wPath);
            }
        } else {
            // FALLBACK INTELIGENTE: Puxa uma narração SOLO para tapar o buraco do clima!
            const rData = window.STATION_DATA?.PROGRAMACOES?.[activeExpansionKey]?.[activeRadioKey];
            let fallbackPath = null;
            if (rData && rData.grupoDJSolo && rData.grupoDJSolo.length > 0) {
                fallbackPath = rData.grupoDJSolo[Math.floor(Math.random() * rData.grupoDJSolo.length)];
            }
            
            if (fallbackPath) {
                ev._resolvedPath = fallbackPath;
                log(`🔄 Substituindo buraco de clima vazio (${ev.targetMs}ms) pela locução: ${fallbackPath}`);
                await getAudioBuffer(fallbackPath);
            } else {
                ev._skipEvent = true; // Se a rádio não tiver pasta SOLO, ele engole o silêncio e ignora
            }
        }
    } else if (ev.path && ev.type !== 'stream' && !ev._skipEvent) {
        await getAudioBuffer(ev.path);
    }
}

async function executeEvent(ev, mySession, forcedSyncTime = null, forcedNowMs = null) {
    if (!started || currentSessionId !== mySession) return;
    
    // Ignora completamente eventos marcados como incompatíveis pelo preloadEvent
    if (ev._skipEvent) return;

    if (ev.type === 'stream') {
        currentStreamEvent = ev;
        const offset = (getCurrentMonthMs() - ev.startMs) / 1000;
        isSystemSeeking = true;

        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }

        if (ev.path.endsWith('.m3u8') && window.Hls && window.Hls.isSupported()) {
            log(`🌐 Iniciando HLS Stream: ${ev.path}`);
            
            hlsInstance = new window.Hls({ startPosition: Math.max(0, offset) });
            hlsInstance.loadSource(ev.path);
            hlsInstance.attachMedia(streamAudioElement);

            hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, function() {
                streamAudioElement.muted = false;
                streamAudioElement.loop = false;
                streamAudioElement.play()
                    .then(() => { window.dispatchEvent(new CustomEvent('radio-ready')); }) // SINAL INTERFACE HLS
                    .catch(e => log('Autoplay HLS bloqueado:', e.message));
            });
        } else {
            log(`🍏 Iniciando Stream Nativo: ${ev.path}`);
            streamAudioElement.src = ev.path;
            streamAudioElement.muted = false; 
            streamAudioElement.loop = false;
            streamAudioElement.currentTime = Math.max(0, offset);
            streamAudioElement.play()
                .then(() => { window.dispatchEvent(new CustomEvent('radio-ready')); }) // SINAL INTERFACE NATIVO
                .catch(e => log('Autoplay stream bloqueado:', e.message));
        }

        updateChromeMediaHub(activeRadioKey.replace('radio_', '').toUpperCase().replace(/_/g, ' '));
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
        pathToPlay = ev._resolvedPath; 
    }
    
    if (!pathToPlay) return;

    const buf = await getAudioBuffer(pathToPlay, true);
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
        window.dispatchEvent(new CustomEvent('radio-ready')); // SINAL INTERFACE CLIMA/SOLO
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

    s.start(scheduledTime, startOffset);
    window.dispatchEvent(new CustomEvent('radio-ready')); // SINAL INTERFACE OGG
    
    if (startOffset > 0) {
        log(`🔄 HOT-SWAP: ${pathToPlay} (Avançado: ${startOffset.toFixed(2)}s)`);
    } else {
        log(`▶️ Agendado: ${pathToPlay}`);
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
            if (ev.type !== 'stream') {
                hotSwapEvents.push(ev); 
            }
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
            const nextEvent = currentTimeline.find(ev => ev.type === 'stream' && ev.startMs <= nowMs && ev.endMs > nowMs);
            if (!nextEvent) {
                log(`🛑 Guilhotina: Encerrando stream.`);
                streamAudioElement.pause();
                
                if (hlsInstance) {
                    hlsInstance.destroy();
                    hlsInstance = null;
                }
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

        while (eventIndex < currentTimeline.length) {
            const ev = currentTimeline[eventIndex];
            const timeUntilStart = ev.startMs - nowMs;

            if (timeUntilStart > 15000) break;

            if (ev.type === 'stream' && timeUntilStart > 0) {
                break; 
            }

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
    log('A parar rádio atual...');
    started = false; 

    activeAudioSources.forEach(src => {
        try { src.stop(); } catch(e) {}
    });
    activeAudioSources = [];
    preloadedEvents.clear();

    streamAudioElement.pause();
    
    if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
    }
    
    if (!streamAudioElement.src.startsWith('data:')) {
        streamAudioElement.src = silentTrack; 
    }
    
    currentStreamEvent = null;
    
    const now = audioCtx.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(1.0, now);
    activeNarrationsCount = 0;
}

window.__RADIO = window.__RADIO || {};
window.__RADIO.startRadio = startRadio;
window.__RADIO.stopRadio = stopRadio;
