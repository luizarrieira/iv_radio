// station.js — Músicas, IDs, Narrações e Definição de Programações.
// Requer: geral.js carregado antes.

(function() {
  const pad = (n, len=2) => String(n).padStart(len, '0');
  const G = window.GERAL_DATA; 
  if (!G) { console.error("ERRO: geral.js precisa ser carregado antes de station.js"); return; }

  /* ================================================================================= */
  /* =========================== 1. RADIO: LIBERTY ROCK ============================== */
  /* ================================================================================= */
  
  const lr_base_musicasList = [
    { id:'fascination', name:'FASCINATION', arquivo:'radio_liberty_rock/musicas/FASCINATION.ogg', introStart:5581, introEnd:27563, finalStart:188733, finalEnd:216000 },
    { id:'remedy', name:'REMEDY', arquivo:'radio_liberty_rock/musicas/REMEDY.ogg', introStart:6020, introEnd:36138, finalStart:195886, finalEnd:222205 },
    { id:'cocaine', name:'COCAINE', arquivo:'radio_liberty_rock/musicas/COCAINE.ogg', finalStart:171349, finalEnd:201728 },
    { id:'1979', name:'1979', arquivo:'radio_liberty_rock/musicas/1979.ogg', introStart:1895, introEnd:11613, finalStart:226907, finalEnd:244963 },
    { id:'cry', name:'CRY', arquivo:'radio_liberty_rock/musicas/CRY.ogg', introStart:3413, introEnd:15736, finalStart:195000, finalEnd:218269 },
    { id:'dominion', name:'DOMINION', arquivo:'radio_liberty_rock/musicas/DOMINION.ogg' },
    { id:'edgeofseventeen', name:'EDGEOFSEVENTEEN', arquivo:'radio_liberty_rock/musicas/EDGEOFSEVENTEEN.ogg', finalStart:242440, finalEnd:269738 },
    { id:'evilwoman', name:'EVILWOMAN', arquivo:'radio_liberty_rock/musicas/EVILWOMAN.ogg', introStart:6570, introEnd:29958, finalStart:195393, finalEnd:225301 },
    { id:'goodbyehorses', name:'GOODBYEHORSES', arquivo:'radio_liberty_rock/musicas/GOODBYEHORSES.ogg', introStart:6826, introEnd:28508, finalStart:137199, finalEnd:165000 },
    { id:'heavenandhell', name:'HEAVENANDHELL', arquivo:'radio_liberty_rock/musicas/HEAVENANDHELL.ogg', introStart:2986, introEnd:22250, finalStart:280405, finalEnd:302770 },
    { id:'herstrut', name:'HERSTRUT', arquivo:'radio_liberty_rock/musicas/HERSTRUT.ogg', introStart:4199, introEnd:24966, finalStart:157991, finalEnd:190000 },
    { id:'iwannabeyourdog', name:'IWANNABEYOURDOG', arquivo:'radio_liberty_rock/musicas/IWANNABEYOURDOG.ogg', introStart:2380, introEnd:23786, finalStart:151573, finalEnd:174866 },
    { id:'jailbreak', name:'JAILBREAK', arquivo:'radio_liberty_rock/musicas/JAILBREAK.ogg', introStart:2197, introEnd:18983, finalStart:206452, finalEnd:235163 },
    { id:'mama', name:'MAMA', arquivo:'radio_liberty_rock/musicas/MAMA.ogg', introStart:4889, introEnd:29179, finalStart:260364, finalEnd:291065 },
    { id:'newyorkgroove', name:'NEWYORKGROOVE', arquivo:'radio_liberty_rock/musicas/NEWYORKGROOVE.ogg', finalStart:127005, finalEnd:152020 },
    { id:'onevision', name:'ONEVISION', arquivo:'radio_liberty_rock/musicas/ONEVISION.ogg', introStart:9642, introEnd:30922, finalStart:215893, finalEnd:227306 },
    { id:'rockymountainway', name:'ROCKYMOUNTAINWAY', arquivo:'radio_liberty_rock/musicas/ROCKYMOUNTAINWAY.ogg', introStart:21606, introEnd:47224, finalStart:234922, finalEnd:260224 },
    { id:'straighton', name:'STRAIGHTON', arquivo:'radio_liberty_rock/musicas/STRAIGHTON.ogg', introStart:2052, introEnd:17002, finalStart:157013, finalEnd:185290 },
    { id:'streetkids', name:'STREETKIDS', arquivo:'radio_liberty_rock/musicas/STREETKIDS.ogg', introStart:4853, introEnd:23040, finalStart:219858, finalEnd:247773 },
    { id:'theseeker', name:'THESEEKER', arquivo:'radio_liberty_rock/musicas/THESEEKER.ogg', introStart:3504, introEnd:17007, finalStart:144031, finalEnd:184829 },
    { id:'thug', name:'THUG', arquivo:'radio_liberty_rock/musicas/THUG.ogg', introStart:1858, introEnd:16282, finalStart:173141, finalEnd:197448 },
    { id:'turnyouinsideout', name:'TURNYOUINSIDEOUT', arquivo:'radio_liberty_rock/musicas/TURNYOUINSIDEOUT.ogg', introStart:3923, introEnd:21663, finalStart:167936, finalEnd:190086 }
  ];

  const lr_eflc_musicasList = [
    { id:'chinagrove_ph', name:'CHINAGROVE_PH', arquivo:'radio_liberty_rock/musicas/CHINAGROVE_PH.ogg', introStart:6316, introEnd:21472, finalStart:140333, finalEnd:173642 },
    { id:'deadoralive_ph', name:'DEADORALIVE_PH', arquivo:'radio_liberty_rock/musicas/DEADORALIVE_PH.ogg', introStart:15000, introEnd:38946, finalStart:255000, finalEnd:282684 },
    { id:'drivinwheel_ph', name:'DRIVINWHEEL_PH', arquivo:'radio_liberty_rock/musicas/DRIVINWHEEL_PH.ogg', introStart:4650, introEnd:17955, finalStart:199989, finalEnd:221874 },
    { id:'everypicturetells_ph', name:'EVERYPICTURETELLS_PH', arquivo:'radio_liberty_rock/musicas/EVERYPICTURETELLS_PH.ogg', introStart:3029, introEnd:16238, finalStart:285184, finalEnd:310061 },
    { id:'fivetoone_ph', name:'FIVETOONE_PH', arquivo:'radio_liberty_rock/musicas/FIVETOONE_PH.ogg', introStart:6925, introEnd:16933, finalStart:224675, finalEnd:248426 },
    { id:'freeride_ph', name:'FREERIDE_PH', arquivo:'radio_liberty_rock/musicas/FREERIDE_PH.ogg', introStart:7082, introEnd:15488, finalStart:145106, finalEnd:162193 },
    { id:'funknumber49_ph', name:'FUNKNUMBER49_PH', arquivo:'radio_liberty_rock/musicas/FUNKNUMBER49_PH.ogg', introStart:11264, introEnd:16909, finalStart:180819, finalEnd:198260 },
    { id:'gotohell_ph', name:'GOTOHELL_PH', arquivo:'radio_liberty_rock/musicas/GOTOHELL_PH.ogg', introStart:10973, introEnd:35648, finalStart:169389, finalEnd:216368 },
    { id:'hairofthedog_ph', name:'HAIROFTHEDOG_PH', arquivo:'radio_liberty_rock/musicas/HAIROFTHEDOG_PH.ogg', introStart:4433, introEnd:15309, finalStart:195958, finalEnd:211168 },
    { id:'highwaystar_ph', name:'HIGHWAYSTAR_PH', arquivo:'radio_liberty_rock/musicas/HIGHWAYSTAR_PH.ogg', introStart:7269, introEnd:33218, finalStart:235162, finalEnd:265312 },
    { id:'jane_ph', name:'JANE_PH', arquivo:'radio_liberty_rock/musicas/JANE_PH.ogg', introStart:18597, introEnd:33798, finalStart:177247, finalEnd:201148 },
    { id:'lordofthethighs_ph', name:'LORDOFTHETHIGHS_PH', arquivo:'radio_liberty_rock/musicas/LORDOFTHETHIGHS_PH.ogg', introStart:10867, introEnd:28312, finalStart:165870, finalEnd:203869 },
    { id:'renegade_ph', name:'RENEGADE_PH', arquivo:'radio_liberty_rock/musicas/RENEGADE_PH.ogg', introStart:30805, introEnd:41317, finalStart:203960, finalEnd:222759 },
    { id:'runtothehills_ph', name:'RUNTOTHEHILLS_PH', arquivo:'radio_liberty_rock/musicas/RUNTOTHEHILLS_PH.ogg', introStart:4078, introEnd:15701, finalStart:189809, finalEnd:214594 },
    { id:'saturdaynightspecial_ph', name:'SATURDAYNIGHTSPECIAL_PH', arquivo:'radio_liberty_rock/musicas/SATURDAYNIGHTSPECIAL_PH.ogg', introStart:7560, introEnd:22145, finalStart:238702, finalEnd:263517 },
    { id:'touchtoomuch', name:'TOUCHTOOMUCH', arquivo:'radio_liberty_rock/musicas/TOUCHTOOMUCH.ogg', introStart:1538, introEnd:7714, finalStart:228902, finalEnd:255941 },
    { id:'wheelofsteel_ph', name:'WHEELOFSTEEL_PH', arquivo:'radio_liberty_rock/musicas/WHEELOFSTEEL_PH.ogg', introStart:5998, introEnd:18682, finalStart:234613, finalEnd:271267 },
    { id:'wildside_ph', name:'WILDSIDE_PH', arquivo:'radio_liberty_rock/musicas/WILDSIDE_PH.ogg', introStart:10206, introEnd:26080, finalStart:161655, finalEnd:186433 }
  ];

  const obj_lr_iv = {
    musicasList: lr_base_musicasList.slice(),
    narracoesGeneral: Array.from({length:25},(_,i)=>`radio_liberty_rock/narracoes/GENERAL_${pad(i+1,2)}.ogg`),
    timePools: {
      morning: Array.from({length:5},(_,i)=>`radio_liberty_rock/narracoes/MORNING_${pad(i+1,2)}.ogg`),
      afternoon: Array.from({length:5},(_,i)=>`radio_liberty_rock/narracoes/AFTERNOON_${pad(i+1,2)}.ogg`),
      evening: Array.from({length:6},(_,i)=>`radio_liberty_rock/narracoes/EVENING_${pad(i+1,2)}.ogg`),
      night: Array.from({length:5},(_,i)=>`radio_liberty_rock/narracoes/NIGHT_${pad(i+1,2)}.ogg`)
    },
    endto: {
      toad: Array.from({length:5},(_,i)=>`radio_liberty_rock/narracoes/TO_AD_${pad(i+1,2)}.ogg`),
      tonews: Array.from({length:5},(_,i)=>`radio_liberty_rock/narracoes/TO_NEWS_${pad(i+1,2)}.ogg`),
      towheather: Array.from({length:5},(_,i)=>`radio_liberty_rock/narracoes/TO_WEATHER_${pad(i+1,2)}.ogg`)
    },
    grupoID: Array.from({length:12},(_,i)=>`radio_liberty_rock/narracoes/ID_${pad(i+1,2)}.ogg`),
    grupoDJSolo: Array.from({length:13},(_,i)=>`radio_liberty_rock/narracoes/SOLO_${pad(i+1,2)}.ogg`),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'FASCINATION': ['radio_liberty_rock/narracoes/FASCINATION_01.ogg','radio_liberty_rock/narracoes/FASCINATION_02.ogg'],
        'REMEDY': ['radio_liberty_rock/narracoes/REMEDY_01.ogg','radio_liberty_rock/narracoes/REMEDY_02.ogg'],
        '1979': ['radio_liberty_rock/narracoes/1979_01.ogg'],
        'CRY': ['radio_liberty_rock/narracoes/CRY_01.ogg'],
        'DOMINION': ['radio_liberty_rock/narracoes/DOMINION_01.ogg'],
        'EVILWOMAN': ['radio_liberty_rock/narracoes/EVILWOMAN_01.ogg'],
        'GOODBYEHORSES': ['radio_liberty_rock/narracoes/GOODBYEHORSES_01.ogg'],
        'HEAVENANDHELL': ['radio_liberty_rock/narracoes/HEAVENHELL_01.ogg','radio_liberty_rock/narracoes/HEAVENHELL_02.ogg'],
        'ONEVISION': ['radio_liberty_rock/narracoes/ONEVISION_01.ogg','radio_liberty_rock/narracoes/ONEVISION_02.ogg'],
        'ROCKYMOUNTAINWAY': ['radio_liberty_rock/narracoes/ROCKYMOUNTAINWAY_01.ogg'],
        'STRAIGHTON': ['radio_liberty_rock/narracoes/STRAIGHTON_01.ogg','radio_liberty_rock/narracoes/STRAIGHTON_02.ogg'],
        'THESEEKER': ['radio_liberty_rock/narracoes/THESEEKER_01.ogg'],
        'THUG': ['radio_liberty_rock/narracoes/THUG_01.ogg','radio_liberty_rock/narracoes/THUG_02.ogg'],
        'TURNYOUINSIDEOUT': ['radio_liberty_rock/narracoes/TURNYOUINSIDEOUT_01.ogg']
    }
  };

  const obj_lr_eflc = {
    musicasList: lr_eflc_musicasList.slice(),
    narracoesGeneral: Array.from({length:17}, (_,i) => `radio_liberty_rock/narracoes/GENERAL_${pad(i+26,2)}.ogg`),
    timePools: {
      morning: ['radio_liberty_rock/narracoes/MORNING_06.ogg','radio_liberty_rock/narracoes/MORNING_07.ogg','radio_liberty_rock/narracoes/MORNING_08.ogg'],
      afternoon: ['radio_liberty_rock/narracoes/AFTERNOON_06.ogg','radio_liberty_rock/narracoes/AFTERNOON_07.ogg','radio_liberty_rock/narracoes/AFTERNOON_08.ogg'],
      evening: ['radio_liberty_rock/narracoes/EVENING_07.ogg','radio_liberty_rock/narracoes/EVENING_08.ogg','radio_liberty_rock/narracoes/EVENING_09.ogg'],
      night: ['radio_liberty_rock/narracoes/NIGHT_06.ogg','radio_liberty_rock/narracoes/NIGHT_07.ogg','radio_liberty_rock/narracoes/NIGHT_08.ogg']
    },
    endto: {
      toad: ['radio_liberty_rock/narracoes/TO_AD_06.ogg','radio_liberty_rock/narracoes/TO_AD_07.ogg'],
      tonews: ['radio_liberty_rock/narracoes/TO_NEWS_06.ogg','radio_liberty_rock/narracoes/TO_NEWS_07.ogg','radio_liberty_rock/narracoes/TO_NEWS_08.ogg'],
      towheather: ['radio_liberty_rock/narracoes/TO_WEATHER_06.ogg','radio_liberty_rock/narracoes/TO_WEATHER_07.ogg','radio_liberty_rock/narracoes/TO_WEATHER_08.ogg']
    },
    grupoID: obj_lr_iv.grupoID.slice(), // ID Base
    grupoDJSolo: Array.from({length:10},(_,i)=>`radio_liberty_rock/narracoes/SOLO_${pad(i+14,2)}.ogg`),
    grupoAdv: G.adv.eflc.slice(),
    grupoWeazelNews: G.news.eflc,
    musicIntroNarrations: {
        'CHINAGROVE_PH': ['radio_liberty_rock/narracoes/CHINAGROVE_PH_01.ogg','radio_liberty_rock/narracoes/CHINAGROVE_PH_02.ogg'],
        'DEADORALIVE_PH': ['radio_liberty_rock/narracoes/DEADORALIVE_PH_01.ogg','radio_liberty_rock/narracoes/DEADORALIVE_PH_02.ogg'],
        'DRIVINWHEEL_PH': ['radio_liberty_rock/narracoes/DRIVINWHEEL_PH_01.ogg','radio_liberty_rock/narracoes/DRIVINWHEEL_PH_02.ogg'],
        'EVERYPICTURETELLS_PH': ['radio_liberty_rock/narracoes/EVERYPICTURETELLS_PH_01.ogg','radio_liberty_rock/narracoes/EVERYPICTURETELLS_PH_02.ogg'],
        'FIVETOONE_PH': ['radio_liberty_rock/narracoes/FIVETOONE_PH_01.ogg','radio_liberty_rock/narracoes/FIVETOONE_PH_02.ogg'],
        'FREERIDE_PH': ['radio_liberty_rock/narracoes/FREERIDE_PH_01.ogg','radio_liberty_rock/narracoes/FREERIDE_PH_02.ogg'],
        'FUNKNUMBER49_PH': ['radio_liberty_rock/narracoes/FUNKNUMBER49_PH_01.ogg','radio_liberty_rock/narracoes/FUNKNUMBER49_PH_02.ogg'],
        'GOTOHELL_PH': ['radio_liberty_rock/narracoes/GOTOHELL_PH_01.ogg','radio_liberty_rock/narracoes/GOTOHELL_PH_02.ogg'],
        'HAIROFTHEDOG_PH': ['radio_liberty_rock/narracoes/HAIROFTHEDOG_PH_01.ogg','radio_liberty_rock/narracoes/HAIROFTHEDOG_PH_02.ogg'],
        'HIGHWAYSTAR_PH': ['radio_liberty_rock/narracoes/HIGHWAYSTAR_PH_01.ogg','radio_liberty_rock/narracoes/HIGHWAYSTAR_PH_02.ogg'],
        'JANE_PH': ['radio_liberty_rock/narracoes/JANE_PH_01.ogg','radio_liberty_rock/narracoes/JANE_PH_02.ogg'],
        'LORDOFTHETHIGHS_PH': ['radio_liberty_rock/narracoes/LORDOFTHETHIGHS_PH_01.ogg','radio_liberty_rock/narracoes/LORDOFTHETHIGHS_PH_02.ogg'],
        'RENEGADE_PH': ['radio_liberty_rock/narracoes/RENEGADE_PH_01.ogg','radio_liberty_rock/narracoes/RENEGADE_PH_02.ogg'],
        'RUNTOTHEHILLS_PH': ['radio_liberty_rock/narracoes/RUNTOTHEHILLS_PH_01.ogg','radio_liberty_rock/narracoes/RUNTOTHEHILLS_PH_02.ogg'],
        'SATURDAYNIGHTSPECIAL_PH': ['radio_liberty_rock/narracoes/SATURDAYNIGHTSPECIAL_PH_01.ogg','radio_liberty_rock/narracoes/SATURDAYNIGHTSPECIAL_PH_02.ogg'],
        'TOUCHTOOMUCH': ['radio_liberty_rock/narracoes/TOUCHTOOMUCH_01.ogg','radio_liberty_rock/narracoes/TOUCHTOOMUCH_02.ogg'],
        'WHEELOFSTEEL_PH': ['radio_liberty_rock/narracoes/WHEELOFSTEEL_PH_01.ogg','radio_liberty_rock/narracoes/WHEELOFSTEEL_PH_02.ogg'],
        'WILDSIDE_PH': ['radio_liberty_rock/narracoes/WILDSIDE_PH_01.ogg','radio_liberty_rock/narracoes/WILDSIDE_PH_02.ogg']
    }
  };

  const obj_lr_complete = {
    musicasList: [...obj_lr_iv.musicasList, ...obj_lr_eflc.musicasList],
    narracoesGeneral: [...obj_lr_iv.narracoesGeneral, ...obj_lr_eflc.narracoesGeneral],
    timePools: {
      morning: [...obj_lr_iv.timePools.morning, ...obj_lr_eflc.timePools.morning],
      afternoon: [...obj_lr_iv.timePools.afternoon, ...obj_lr_eflc.timePools.afternoon],
      evening: [...obj_lr_iv.timePools.evening, ...obj_lr_eflc.timePools.evening],
      night: [...obj_lr_iv.timePools.night, ...obj_lr_eflc.timePools.night]
    },
    endto: {
      toad: [...obj_lr_iv.endto.toad, ...obj_lr_eflc.endto.toad],
      tonews: [...obj_lr_iv.endto.tonews, ...obj_lr_eflc.endto.tonews],
      towheather: [...obj_lr_iv.endto.towheather, ...obj_lr_eflc.endto.towheather]
    },
    grupoID: obj_lr_iv.grupoID.slice(),
    grupoDJSolo: [...obj_lr_iv.grupoDJSolo, ...obj_lr_eflc.grupoDJSolo],
    grupoAdv: G.adv.complete.slice(),
    grupoWeazelNews: G.news.complete,
    musicIntroNarrations: {...obj_lr_iv.musicIntroNarrations, ...obj_lr_eflc.musicIntroNarrations}
  };


  /* ================================================================================= */
  /* =========================== 2. RADIO: DANCE ROCK ================================ */
  /* ================================================================================= */

  // Helpers para o Dance Rock
  const drPref = 'radio_dance_rock/narracoes/';
  const drList = (prefix, items) => items.map(i => `${drPref}${prefix}_${pad(i,2)}.ogg`);
  const range = (start, end) => Array.from({ length: (end - start + 1) }, (_, i) => start + i);

  // --- PROGRAMAÇÃO IV ---
  const dr_iv_musicas = [
    { id:'arminarm', name:'ARMINARM', arquivo:'radio_dance_rock/musicas/ARMINARM.ogg', introStart:15018, introEnd:37484, finalStart:151040, finalEnd:172710 },
    { id:'cocaine', name:'COCAINE', arquivo:'radio_dance_rock/musicas/COCAINE.ogg', introStart:1920, introEnd:13706, finalStart:78506, finalEnd:103989 },
    { id:'disneyland', name:'DISNEYLAND', arquivo:'radio_dance_rock/musicas/DISNEYLAND.ogg', introStart:9988, introEnd:34517, finalStart:166570, finalEnd:192649 },
    { id:'getinnocuous', name:'GETINNOCUOUS', arquivo:'radio_dance_rock/musicas/GETINNOCUOUS.ogg', introStart:38294, introEnd:80761, finalStart:235748, finalEnd:268793 },
    { id:'homicide', name:'HOMICIDE', arquivo:'radio_dance_rock/musicas/HOMICIDE.ogg', introStart:5834, introEnd:30545, finalStart:176937, finalEnd:211191 },
    { id:'insidethecage', name:'INSIDETHECAGE', arquivo:'radio_dance_rock/musicas/INSIDETHECAGE.ogg', introStart:1567, introEnd:16634, finalStart:164147, finalEnd:194355 },
    { id:'mayday', name:'MAYDAY', arquivo:'radio_dance_rock/musicas/MAYDAY.ogg', introStart:5461, introEnd:25136, finalStart:164181, finalEnd:191786 }, 
    { id:'nosexforben', name:'NOSEXFORBEN', arquivo:'radio_dance_rock/musicas/NOSEXFORBEN.ogg', introStart:8960, introEnd:20410, finalStart:182954, finalEnd:205866 }, 
    { id:'onandon', name:'ONANDON', arquivo:'radio_dance_rock/musicas/ONANDON.ogg', introStart:3944, introEnd:12071, finalStart:148138, finalEnd:170329 },
    { id:'onehorserace', name:'ONEHORSERACE', arquivo:'radio_dance_rock/musicas/ONEHORSERACE.ogg', introStart:4170, introEnd:13930, finalStart:225365, finalEnd:244789 }, 
    { id:'ragingintheplague', name:'RAGINGINTHEPLAGUE', arquivo:'radio_dance_rock/musicas/RAGINGINTHEPLAGUE.ogg', finalStart:136629, finalEnd:157450 }, 
    { id:'riotinthecity', name:'RIOTINTHECITY', arquivo:'radio_dance_rock/musicas/RIOTINTHECITY.ogg', introStart:8874, introEnd:25184, finalStart:114005, finalEnd:128938 }, 
    { id:'sleepisimpossible', name:'SLEEPISIMPOSSIBLE', arquivo:'radio_dance_rock/musicas/SLEEPISIMPOSSIBLE.ogg', introStart:7676, introEnd:28114, finalStart:190068, finalEnd:214409 },
    { id:'strangetimes', name:'STRANGETIMES', arquivo:'radio_dance_rock/musicas/STRANGETIMES.ogg', introStart:7949, introEnd:17976, finalStart:155149, finalEnd:181602 }, 
    { id:'teenager', name:'TEENAGER', arquivo:'radio_dance_rock/musicas/TEENAGER.ogg', finalStart:134428, finalEnd:153656 }, 
    { id:'theteacher', name:'THETEACHER', arquivo:'radio_dance_rock/musicas/THETEACHER.ogg', introStart:7338, introEnd:24490, finalStart:191914, finalEnd:217472 }, 
    { id:'vagabond', name:'VAGABOND', arquivo:'radio_dance_rock/musicas/VAGABOND.ogg', introStart:7125, introEnd:29501, finalStart:141250, finalEnd:172920 },
    { id:'wrapitup', name:'WRAPITUP', arquivo:'radio_dance_rock/musicas/WRAPITUP.ogg', introStart:9583, introEnd:30336, finalStart:182678, finalEnd:210539 },
    { id:'yadnus', name:'YADNUS', arquivo:'radio_dance_rock/musicas/YADNUS.ogg', introStart:97849, introEnd:120925, finalStart:291157, finalEnd:318421 }
  ];

  const obj_dr_iv = {
    musicasList: dr_iv_musicas,
    narracoesGeneral: drList('GENERAL', range(1, 24)),
    timePools: {
      morning: drList('MORNING', range(1, 4)),
      afternoon: drList('AFTERNOON', range(1, 3)),
      evening: drList('EVENING', range(1, 4)),
      night: drList('NIGHT', range(1, 4))
    },
    endto: {
      toad: drList('TO_AD', range(1, 5)),
      tonews: drList('TO_NEWS', range(1, 4)),
      towheather: drList('TO_WEATHER', range(1, 5))
    },
    grupoID: drList('ID', range(1, 10)),
    grupoDJSolo: drList('SOLO', range(1, 11)),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'ARMINARM': drList('ARMINARM', [1, 2]),
        'COCAINE': drList('COCAINE', [1, 2]),
        'DISNEYLAND': drList('DISNEYLAND', [1, 2]),
        'GETINNOCUOUS': drList('GETINNOCUOUS', [1, 2]),
        'HOMICIDE': drList('HOMICIDE', [1, 2]),
        'INSIDETHECAGE': drList('INSIDETHECAGE', [1, 2]),
        'ONANDON': drList('ONANDON', [1, 2]),
        'SLEEPISIMPOSSIBLE': drList('SLEEPISIMPOSSIBLE', [1, 2]),
        'VAGABOND': drList('VAGABOND', [1, 2]),
        'WRAPITUP': drList('WRAPITUP', [1, 2]),
        'YADNUS': drList('YADNUS', [1, 2])
    }
  };

  // --- PROGRAMAÇÃO TLAD+TBOGT ---
  const dr_eflc_musicas = [
    { id:'bloodonthesteps_ph', name:'BLOODONTHESTEPS_PH', arquivo:'radio_dance_rock/musicas/BLOODONTHESTEPS_PH.ogg', introStart:3821, introEnd:10256, finalStart:162435, finalEnd:187819 },
    { id:'body_language_ph', name:'BODY_LANGUAGE_PH', arquivo:'radio_dance_rock/musicas/BODY_LANGUAGE_PH.ogg', introStart:5418, introEnd:19456, finalStart:148138, finalEnd:181034 },
    { id:'borderline_ph', name:'BORDERLINE_PH', arquivo:'radio_dance_rock/musicas/BORDERLINE_PH.ogg', introStart:11549, introEnd:34251, finalStart:196436, finalEnd:232000 },
    { id:'command_ph', name:'COMMAND_PH', arquivo:'radio_dance_rock/musicas/COMMAND_PH.ogg', introStart:3368, introEnd:11343, finalStart:219852, finalEnd:258092 },
    { id:'dancegirl_ph', name:'DANCEGIRL_PH', arquivo:'radio_dance_rock/musicas/DANCEGIRL_PH.ogg', introStart:13098, introEnd:28921, finalStart:165973, finalEnd:188764 },
    { id:'getreadytodie_ph', name:'GETREADYTODIE_PH', arquivo:'radio_dance_rock/musicas/GETREADYTODIE_PH.ogg', introStart:9982, introEnd:23371, finalStart:123845, finalEnd:136898 },
    { id:'hellonwheels', name:'HELLONWHEELS', arquivo:'radio_dance_rock/musicas/HELLONWHEELS.ogg', introStart:27651, introEnd:58841, finalStart:214357, finalEnd:243626 },
    { id:'iwalkalone_ph', name:'IWALKALONE_PH', arquivo:'radio_dance_rock/musicas/IWALKALONE_PH.ogg', introStart:5426, introEnd:16274, finalStart:233408, finalEnd:262437 },
    { id:'nouveauamerician_ph', name:'NOUVEAUAMERICIAN_PH', arquivo:'radio_dance_rock/musicas/NOUVEAUAMERICIAN_PH.ogg', introStart:18110, introEnd:45000, finalStart:189789, finalEnd:210438 },
    { id:'radicalbusiness_ph', name:'RADICALBUSINESS_PH', arquivo:'radio_dance_rock/musicas/RADICALBUSINESS_PH.ogg', finalStart:100149, finalEnd:129332 },
    { id:'shakeitloose_ph', name:'SHAKEITLOOSE_PH', arquivo:'radio_dance_rock/musicas/SHAKEITLOOSE_PH.ogg', introStart:53930, introEnd:67328, finalStart:227077, finalEnd:249008 },
    { id:'thehunger', name:'THEHUNGER', arquivo:'radio_dance_rock/musicas/THEHUNGER.ogg', introStart:20565, introEnd:38528, finalStart:196608, finalEnd:244485 }
  ];

  const obj_dr_eflc = {
    musicasList: dr_eflc_musicas,
    narracoesGeneral: drList('GENERAL', range(25, 38)), // Une as antigas (25,26) com as novas (27-38)
    timePools: {
      morning: drList('MORNING', range(5, 7)),
      afternoon: drList('AFTERNOON', range(4, 6)),
      evening: drList('EVENING', range(5, 7)),
      night: drList('NIGHT', range(5, 7))
    },
    endto: {
      toad: drList('TO_AD', range(6, 9)),
      tonews: drList('TO_NEWS', range(5, 8)),
      towheather: drList('TO_WEATHER', range(6, 9))
    },
    grupoID: obj_dr_iv.grupoID.slice(), // ID Base
    grupoDJSolo: drList('SOLO', range(12, 24)),
    grupoAdv: G.adv.eflc.slice(),
    grupoWeazelNews: G.news.eflc,
    musicIntroNarrations: {
        'BLOODONTHESTEPS_PH': drList('BLOODONTHESTEPS_PH', [1, 2]),
        'BODY_LANGUAGE_PH': drList('BODY_LANGUAGE_PH', [1, 2]),
        'BORDERLINE_PH': drList('BORDERLINE_PH', [1, 2]),
        'COMMAND_PH': drList('COMMAND_PH', [1, 2]),
        'DANCEGIRL_PH': drList('DANCEGIRL_PH', [1, 2]),
        'GETREADYTODIE_PH': drList('GETREADYTODIE_PH', [1]), // Apenas 1 no txt
        'HELLONWHEELS': drList('HELLONWHEELS', [1, 2]),
        'IWALKALONE_PH': drList('IWALKALONE_PH', [1, 2]),
        'NOUVEAUAMERICIAN_PH': drList('NOUVEAUAMERICIAN_PH', [1, 2]),
        'RADICALBUSINESS_PH': drList('RADICALBUSINESS_PH', [1, 2]),
        'SHAKEITLOOSE_PH': drList('SHAKEITLOOSE_PH', [1, 2]),
        'THEHUNGER': drList('THEHUNGER', [1, 2])
    }
  };

  // --- PROGRAMAÇÃO EFLC (Uniões) ---
  const obj_dr_complete = {
    musicasList: [...obj_dr_iv.musicasList, ...obj_dr_eflc.musicasList],
    narracoesGeneral: [...obj_dr_iv.narracoesGeneral, ...obj_dr_eflc.narracoesGeneral],
    timePools: {
      morning: [...obj_dr_iv.timePools.morning, ...obj_dr_eflc.timePools.morning],
      afternoon: [...obj_dr_iv.timePools.afternoon, ...obj_dr_eflc.timePools.afternoon],
      evening: [...obj_dr_iv.timePools.evening, ...obj_dr_eflc.timePools.evening],
      night: [...obj_dr_iv.timePools.night, ...obj_dr_eflc.timePools.night]
    },
    endto: {
      toad: [...obj_dr_iv.endto.toad, ...obj_dr_eflc.endto.toad],
      tonews: [...obj_dr_iv.endto.tonews, ...obj_dr_eflc.endto.tonews],
      towheather: [...obj_dr_iv.endto.towheather, ...obj_dr_eflc.endto.towheather]
    },
    grupoID: obj_dr_iv.grupoID.slice(),
    grupoDJSolo: [...obj_dr_iv.grupoDJSolo, ...obj_dr_eflc.grupoDJSolo],
    grupoAdv: G.adv.complete.slice(),
    grupoWeazelNews: G.news.complete,
    musicIntroNarrations: {...obj_dr_iv.musicIntroNarrations, ...obj_dr_eflc.musicIntroNarrations}
  };

  /* ================================================================================= */
  /* =========================== 3. RADIO: DANCE MIX ================================= */
  /* ================================================================================= */

  const obj_dm_iv = {
    isMixRadio: true, // FLAG MÁGICA PARA O RENDERER
    musicasList: [
      { name: 'FK', arquivo: 'radio_dance_mix/FK.ogg' } // <-- Removido o 'musicas/'
    ]
  };

  const obj_dm_eflc = {
    isMixRadio: true,
    musicasList: [
      { name: 'CROOKERS_MIX', arquivo: 'radio_dance_mix/CROOKERS_MIX.ogg' } // <-- Removido o 'musicas/'
    ]
  };

  const obj_dm_complete = {
    isMixRadio: true,
    musicasList: [
      { name: 'FK', arquivo: 'radio_dance_mix/FK.ogg' }, // <-- Removido o 'musicas/'
      { name: 'CROOKERS_MIX', arquivo: 'radio_dance_mix/CROOKERS_MIX.ogg' } // <-- Removido o 'musicas/'
    ]
  };

  /* ================================================================================= */
  /* ============================ 4. RADIO: BEAT 95 ================================== */
  /* ================================================================================= */

  const obj_beat_iv = {
    isMixRadio: true,
    musicasList: [
      { name: 'BEAT', arquivo: 'radio_beat_95/BEAT.ogg' }
    ]
  };

  const obj_beat_eflc = {
    isMixRadio: true,
    musicasList: [
      // A propriedade 'nextMix' diz ao motor o que DEVE tocar a seguir obrigatoriamente
      { 
      id: 'e1_beat_mix_p1', 
      name: 'E1_BEAT_MIX_P1', 
      arquivo: 'radio_beat_95/E1_BEAT_MIX_P1.ogg',
      nextMix: 'E1_BEAT_MIX_P2' // <-- A MUDANÇA É AQUI (nextMix em vez de nextTrack)
    },
    { 
      id: 'e1_beat_mix_p2', 
      name: 'E1_BEAT_MIX_P2', 
      arquivo: 'radio_beat_95/E1_BEAT_MIX_P2.ogg',
      linkedOnly: true 
    }
    ]
  };

  const obj_beat_complete = {
    isMixRadio: true,
    musicasList: [
      { name: 'BEAT', arquivo: 'radio_beat_95/BEAT.ogg' },
      { 
      id: 'e1_beat_mix_p1', 
      name: 'E1_BEAT_MIX_P1', 
      arquivo: 'radio_beat_95/E1_BEAT_MIX_P1.ogg',
      nextMix: 'E1_BEAT_MIX_P2' // <-- A MUDANÇA É AQUI (nextMix em vez de nextTrack)
    },
    { 
      id: 'e1_beat_mix_p2', 
      name: 'E1_BEAT_MIX_P2', 
      arquivo: 'radio_beat_95/E1_BEAT_MIX_P2.ogg',
      linkedOnly: true 
    }
    ]
  };


  /* ================================================================================= */
  /* ============================== 5. RADIO: WKTT =================================== */
  /* ================================================================================= */
  const padWKTT = (n) => String(n).padStart(2, '0');
  
  // --- PROGRAMAÇÃO IV ---
  const obj_wktt_iv = {
    isSequentialTalkRadio: true, // Nova flag
    grupoID: Array.from({length:11}, (_,i)=>`radio_wktt/ID_${padWKTT(i+1)}.ogg`),
    grupoAdv: G.adv.iv,
    // Sequência exata pedida para o IV
    programasList: [
      { name: '1_UNJUST_1', arquivo: 'radio_wktt/1_UNJUST_1.ogg' },
      { name: '2_FIZZ_1', arquivo: 'radio_wktt/2_FIZZ_1.ogg' },
      { name: '3_CONSERVATIVE_1', arquivo: 'radio_wktt/3_CONSERVATIVE_1.ogg' },
      { name: '4_UNJUST_2', arquivo: 'radio_wktt/4_UNJUST_2.ogg' },
      { name: '5_FIZZ_2', arquivo: 'radio_wktt/5_FIZZ_2.ogg' },
      { name: '6_CONSERVATIVE_2', arquivo: 'radio_wktt/6_CONSERVATIVE_2.ogg' }
    ]
  };

  // --- PROGRAMAÇÃO TLAD+TBOGT ---
  const obj_wktt_eflc = {
    isSequentialTalkRadio: true, 
    grupoID: Array.from({length:11}, (_,i)=>`radio_wktt/ID_${padWKTT(i+1)}.ogg`),
    grupoAdv: G.adv.eflc,
    // Looping exclusivo da expansão
    programasList: [
      { name: '7_MARTINSERIOUSSHOW', arquivo: 'radio_wktt/7_MARTINSERIOUSSHOW.ogg' },
      { name: '8_MONO_CONSPIRE_PART_1', arquivo: 'radio_wktt/8_MONO_CONSPIRE_PART_1.ogg' },
      { name: '9_MONO_CONSPIRE_PART_2', arquivo: 'radio_wktt/9_MONO_CONSPIRE_PART_2.ogg' }
    ]
  };

  // --- PROGRAMAÇÃO EFLC ---
  const obj_wktt_complete = {
    isSequentialTalkRadio: true, 
    grupoID: Array.from({length:11}, (_,i)=>`radio_wktt/ID_${padWKTT(i+1)}.ogg`),
    grupoAdv: G.adv.complete, // Junta os comerciais da IV e da TLAD
    // A lista completa, garantindo a Parte 2 logo após a Parte 1
    programasList: [
      { name: '1_UNJUST_1', arquivo: 'radio_wktt/1_UNJUST_1.ogg' },
      { name: '2_FIZZ_1', arquivo: 'radio_wktt/2_FIZZ_1.ogg' },
      { name: '3_CONSERVATIVE_1', arquivo: 'radio_wktt/3_CONSERVATIVE_1.ogg' },
      { name: '4_UNJUST_2', arquivo: 'radio_wktt/4_UNJUST_2.ogg' },
      { name: '5_FIZZ_2', arquivo: 'radio_wktt/5_FIZZ_2.ogg' },
      { name: '6_CONSERVATIVE_2', arquivo: 'radio_wktt/6_CONSERVATIVE_2.ogg' },
      { name: '7_MARTINSERIOUSSHOW', arquivo: 'radio_wktt/7_MARTINSERIOUSSHOW.ogg' },
      { name: '8_MONO_CONSPIRE_PART_1', arquivo: 'radio_wktt/8_MONO_CONSPIRE_PART_1.ogg' },
      { name: '9_MONO_CONSPIRE_PART_2', arquivo: 'radio_wktt/9_MONO_CONSPIRE_PART_2.ogg' }
    ]
  };

  /* ================================================================================= */
  /* ============================ 6. RADIO: HARDCORE ================================= */
  /* ================================================================================= */

  const lchc_base_musicasList = [
    { id: 'allyourboyz', name: 'ALLYOURBOYZ', arquivo: 'radio_hardcore/musicas/ALLYOURBOYZ.ogg', introStart: 7168, introEnd: 31041, finalStart: 111616, finalEnd: 137516 },
    { id: 'backtoback', name: 'BACKTOBACK', arquivo: 'radio_hardcore/musicas/BACKTOBACK.ogg', introStart: 2730, introEnd: 20493, finalStart: 140124, finalEnd: 166301 },
    { id: 'dayinthelife', name: 'DAYINTHELIFE', arquivo: 'radio_hardcore/musicas/DAYINTHELIFE.ogg', introStart: 1085, introEnd: 28096, finalStart: 74410, finalEnd: 98719 },
    { id: 'enforcer', name: 'ENFORCER', arquivo: 'radio_hardcore/musicas/ENFORCER.ogg', introStart: 1322, introEnd: 21696, finalStart: 199168, finalEnd: 223820 },
    { id: 'injusticesystem', name: 'INJUSTICESYSTEM', arquivo: 'radio_hardcore/musicas/INJUSTICESYSTEM.ogg', introStart: 1082, introEnd: 24416, finalStart: 105277, finalEnd: 123918 },
    { id: 'itsthelimit', name: 'ITSTHELIMIT', arquivo: 'radio_hardcore/musicas/ITSTHELIMIT.ogg', introStart: 5376, introEnd: 17360, finalStart: 69802, finalEnd: 86020 },
    { id: 'justcanthate', name: 'JUSTCANTHATE', arquivo: 'radio_hardcore/musicas/JUSTCANTHATE.ogg', introStart: 49920, introEnd: 70731, finalStart: 131072, finalEnd: 153929 },
    { id: 'rightbrigade', name: 'RIGHTBRIGADE', arquivo: 'radio_hardcore/musicas/RIGHTBRIGADE.ogg', introStart: 4634, introEnd: 17343, finalStart: 114458, finalEnd: 134746 },
    { id: 'telltale', name: 'TELLTALE', arquivo: 'radio_hardcore/musicas/TELLTALE.ogg', introStart: 3467, introEnd: 17312, finalStart: 65232, finalEnd: 84493 },
    { id: 'victiminpain', name: 'VICTIMINPAIN', arquivo: 'radio_hardcore/musicas/VICTIMINPAIN.ogg', introStart: 4693, introEnd: 21589 }
  ];

  const obj_lchc_iv = {
    grupoID: Array.from({length:10}, (_,i)=>`radio_hardcore/narracoes/ID_${pad(i+1)}.ogg`),
    grupoAdv: G.adv.iv,
    grupoWeazelNews: G.news.iv,
    grupoDJSolo: Array.from({length:10}, (_,i)=>`radio_hardcore/narracoes/SOLO_${pad(i+1)}.ogg`),
    narracoesGeneral: Array.from({length:29}, (_,i)=>`radio_hardcore/narracoes/GENERAL_${pad(i+1)}.ogg`),
    timePools: {
      morning: Array.from({length:4}, (_,i)=>`radio_hardcore/narracoes/MORNING_${pad(i+1)}.ogg`),
      afternoon: Array.from({length:4}, (_,i)=>`radio_hardcore/narracoes/AFTERNOON_${pad(i+1)}.ogg`),
      evening: Array.from({length:4}, (_,i)=>`radio_hardcore/narracoes/EVENING_${pad(i+1)}.ogg`),
      night: Array.from({length:4}, (_,i)=>`radio_hardcore/narracoes/NIGHT_${pad(i+1)}.ogg`)
    },
    endto: {
      toad: Array.from({length:6}, (_,i)=>`radio_hardcore/narracoes/TO_AD_${pad(i+1)}.ogg`),
      tonews: Array.from({length:5}, (_,i)=>`radio_hardcore/narracoes/TO_NEWS_${pad(i+1)}.ogg`),
      towheather: Array.from({length:5}, (_,i)=>`radio_hardcore/narracoes/TO_WEATHER_${pad(i+1)}.ogg`)
    },
    musicIntroNarrations: {
      'ALLYOURBOYZ': ['radio_hardcore/narracoes/ALLYOURBOYZ_01.ogg', 'radio_hardcore/narracoes/ALLYOURBOYZ_02.ogg'],
      'BACKTOBACK': ['radio_hardcore/narracoes/BACKTOBACK_01.ogg', 'radio_hardcore/narracoes/BACKTOBACK_02.ogg'],
      'DAYINTHELIFE': ['radio_hardcore/narracoes/DAYINTHELIFE_01.ogg', 'radio_hardcore/narracoes/DAYINTHELIFE_02.ogg'],
      'ENFORCER': ['radio_hardcore/narracoes/ENFORCER_01.ogg', 'radio_hardcore/narracoes/ENFORCER_02.ogg'],
      'JUSTCANTHATE': ['radio_hardcore/narracoes/JUSTCANTHATE_01.ogg', 'radio_hardcore/narracoes/JUSTCANTHATE_02.ogg'],
      'RIGHTBRIGADE': ['radio_hardcore/narracoes/RIGHTBRIGADE_01.ogg', 'radio_hardcore/narracoes/RIGHTBRIGADE_02.ogg'],
      'TELLTALE': ['radio_hardcore/narracoes/TELLTALE_01.ogg', 'radio_hardcore/narracoes/TELLTALE_02.ogg'],
      'VICTIMINPAIN': ['radio_hardcore/narracoes/VICTIMINPAIN_01.ogg', 'radio_hardcore/narracoes/VICTIMINPAIN_02.ogg']
    },
    musicasList: lchc_base_musicasList
  };

  const obj_lchc_eflc = {
    isMixRadio: true, // Funciona igual à Dance Mix
    grupoAdv: G.adv.eflc,
    musicasList: [
      { id: 'lchc_mix', name: 'LCHC_MIX', arquivo: 'radio_hardcore/musicas/LCHC_32K_PH.ogg' }
    ]
  };

  const obj_lchc_complete = {
    isHybridRadio: true, // Motor comanda a transição inteligente
    grupoID: obj_lchc_iv.grupoID,
    grupoAdv: G.adv.complete,
    grupoWeazelNews: G.news.complete,
    grupoDJSolo: obj_lchc_iv.grupoDJSolo,
    narracoesGeneral: obj_lchc_iv.narracoesGeneral,
    timePools: obj_lchc_iv.timePools,
    endto: obj_lchc_iv.endto,
    musicIntroNarrations: obj_lchc_iv.musicIntroNarrations,
    musicasList: obj_lchc_iv.musicasList,
    mixData: { id: 'lchc_mix', name: 'LCHC_MIX', arquivo: 'radio_hardcore/musicas/LCHC_32K_PH.ogg' } 
  };

  /* ================================================================================= */
  /* ========================= 7. RADIO: VLADIVOSTOK FM ============================== */
  /* ================================================================================= */

  // Helpers para a Vladivostok
  const vladPref = 'radio_vladivostok/narracoes/';
  const vladList = (prefix, items) => items.map(i => `${vladPref}${prefix}_${pad(i,2)}.ogg`);

  // --- FILTRO DE ANÚNCIOS RUSSOS ---
  const removerAdsVlad = ['AD004_EXCELSIOR', 'AD025_THE_HORN', 'AD049_WHIZ_FLIP'];
  const adicionarAdsVlad = ['AD030_RUSSIAN_EXCELSIOR', 'AD032_RUSSIAN_HORN', 'AD037_RUSSIAN_WHIZ'];

  const montarAdvVlad = (baseAdvArray) => {
    // Filtra os comerciais padrão para fora
    let filtrado = baseAdvArray.filter(ad => !removerAdsVlad.some(rem => ad.includes(rem)));
    // Resgata os comerciais russos corretos da nossa memória G.adv.russa
    let adsRussos = G.adv.russa ? G.adv.russa.filter(ad => adicionarAdsVlad.some(add => ad.includes(add))) : [];
    return filtrado.concat(adsRussos);
  };

  const vlad_adv_iv = montarAdvVlad(G.adv.iv);
  const vlad_adv_complete = montarAdvVlad(G.adv.complete);

  // --- PROGRAMAÇÃO IV ---
  const vlad_iv_musicas = [
    { id:'gnisvouliniu', name:'GNISVOULINIU', arquivo:'radio_vladivostok/musicas/GNISVOULINIU.ogg', introStart:1766, introEnd:11424, finalStart:136102, finalEnd:158876 },
    { id:'kingring', name:'KINGRING', arquivo:'radio_vladivostok/musicas/KINGRING.ogg', introStart:6997, introEnd:28458, finalStart:149845, finalEnd:175786 },
    { id:'kino', name:'KINO', arquivo:'radio_vladivostok/musicas/KINO.ogg', introStart:10597, introEnd:34494, finalStart:168334, finalEnd:197654 },
    { id:'kvartira', name:'KVARTIRA', arquivo:'radio_vladivostok/musicas/KVARTIRA.ogg', finalStart:161766, finalEnd:193327 }, // Apenas narração final
    { id:'libertycity', name:'LIBERTYCITY', arquivo:'radio_vladivostok/musicas/LIBERTYCITY.ogg', introStart:3541, introEnd:18805, finalStart:173525, finalEnd:200490 },
    { id:'mama', name:'MAMA', arquivo:'radio_vladivostok/musicas/MAMA.ogg', introStart:2474, introEnd:21958, finalStart:196352, finalEnd:215835 },
    { id:'nikogone', name:'NIKOGONE', arquivo:'radio_vladivostok/musicas/NIKOGONE.ogg', introStart:3316, introEnd:18894, finalStart:163271, finalEnd:193650 },
    { id:'otebe', name:'OTEBE', arquivo:'radio_vladivostok/musicas/OTEBE.ogg', introStart:2005, introEnd:21029, finalStart:159061, finalEnd:183710 },
    { id:'rep', name:'REP', arquivo:'radio_vladivostok/musicas/REP.ogg', finalStart:125923, finalEnd:158378 },
    { id:'shvayne', name:'SHVAYNE', arquivo:'radio_vladivostok/musicas/SHVAYNE.ogg', introStart:4049, introEnd:23129, finalStart:196979, finalEnd:220974 },
    { id:'wild_horses', name:'WILD_HORSES', arquivo:'radio_vladivostok/musicas/WILD_HORSES.ogg', introStart:2133, introEnd:21945, finalStart:147456, finalEnd:171604 },
    { id:'zelenoglazoe_taksi', name:'ZELENOGLAZOE_TAKSI', arquivo:'radio_vladivostok/musicas/ZELENOGLAZOE_TAKSI.ogg', introStart:4352, introEnd:22329, finalStart:166897, finalEnd:197816 },
    { id:'zhdat', name:'ZHDAT', arquivo:'radio_vladivostok/musicas/ZHDAT.ogg', introStart:8409, introEnd:29151, finalStart:178898, finalEnd:202941 }
  ];

  const obj_vlad_iv = {
    musicasList: vlad_iv_musicas,
    narracoesGeneral: vladList('GENERAL', range(1, 24)),
    timePools: {
      morning: vladList('MORNING', range(1, 4)),
      afternoon: vladList('AFTERNOON', range(1, 4)),
      evening: vladList('EVENING', range(1, 4)),
      night: vladList('NIGHT', range(1, 4))
    },
    endto: {
      toad: vladList('TO_AD', range(1, 4)),
      tonews: vladList('TO_NEWS', range(1, 3)),
      towheather: vladList('TO_WEATHER', range(1, 4))
    },
    grupoID: vladList('ID', range(1, 11)),
    grupoDJSolo: vladList('SOLO', range(2, 13)), // Começa no 02 conforme a sua lista
    grupoAdv: vlad_adv_iv, // Anúncios filtrados
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'GNISVOULINIU': vladList('GNISVOULINIU', [1, 2]),
        'KINGRING': vladList('KINGRING', [1, 2]),
        'KINO': vladList('KINO', [1, 2]),
        'LIBERTYCITY': vladList('LIBERTYCITY', [1]), // Apenas 1 no txt
        'MAMA': vladList('MAMA', [1, 2]),
        'NIKOGONE': vladList('NIKOGONE', [1, 2]),
        'SHVAYNE': vladList('SHVAYNE', [1]), // Apenas 1 no txt
        'WILD_HORSES': vladList('WILD_HORSES', [1, 2]),
        'ZELENOGLAZOE_TAKSI': vladList('ZELENOGLAZOE_TAKSI', [1]),
        'ZHDAT': vladList('ZHDAT', [1, 2])
    }
  };

  // --- PROGRAMAÇÃO TLAD+TBOGT ---
  const obj_vlad_eflc = {
    isMixRadio: true, // Funciona apenas com streaming da Mix
    grupoAdv: G.adv.eflc,
    musicasList: [
      { id: 'vlad_mix', name: 'EUROBEAT_MIX', arquivo: 'radio_vladivostok/musicas/EUROBEAT_MIX.ogg' }
    ]
  };

  // --- PROGRAMAÇÃO EFLC (A Híbrida Inteligente) ---
  const obj_vlad_complete = {
    isHybridRadio: true, // O motor do renderer.js (que configurámos na LCHC) tratará das transições automáticas!
    grupoID: obj_vlad_iv.grupoID,
    grupoAdv: vlad_adv_complete, // Anúncios russos mesclados com a expansão
    grupoWeazelNews: G.news.complete,
    grupoDJSolo: obj_vlad_iv.grupoDJSolo,
    narracoesGeneral: obj_vlad_iv.narracoesGeneral,
    timePools: obj_vlad_iv.timePools,
    endto: obj_vlad_iv.endto,
    musicIntroNarrations: obj_vlad_iv.musicIntroNarrations,
    musicasList: obj_vlad_iv.musicasList,
    mixData: { id: 'vlad_mix', name: 'EUROBEAT_MIX', arquivo: 'radio_vladivostok/musicas/EUROBEAT_MIX.ogg' }
  };

  /* ================================================================================= */
  /* ========================= 8. RADIO: SAN JUAN SOUNDS ============================= */
  /* ================================================================================= */

  // Helpers para a San Juan Sounds
  const sjsPref = 'radio_san_juan_sounds/narracoes/';
  const sjsList = (prefix, items) => items.map(i => `${sjsPref}${prefix}_${pad(i,2)}.ogg`);

  // --- FILTRO DE ANÚNCIOS LATINOS (SPANISH) ---
  const removerAdsSjs = ['AD004_EXCELSIOR', 'AD025_THE_HORN', 'AD049_WHIZ_FLIP'];
  const adicionarAdsSjs = ['AD033_SPANISH_HORN', 'AD038_SPANISH_WHIZ', 'AD047_EXCELSIOR_SPANISH'];

  const montarAdvSjs = (baseAdvArray) => {
    // Filtra os comerciais padrão americanos para fora
    let filtrado = baseAdvArray.filter(ad => !removerAdsSjs.some(rem => ad.includes(rem)));
    // Resgata os comerciais latinos corretos da nossa memória G.adv.latina
    let adsLatinos = G.adv.latina ? G.adv.latina.filter(ad => adicionarAdsSjs.some(add => ad.includes(add))) : [];
    return filtrado.concat(adsLatinos);
  };

  const sjs_adv_iv = montarAdvSjs(G.adv.iv);
  const sjs_adv_eflc = montarAdvSjs(G.adv.eflc);
  const sjs_adv_complete = montarAdvSjs(G.adv.complete);

  // --- PROGRAMAÇÃO IV ---
  const sjs_iv_musicas = [
    { id:'atrevetetete', name:'ATREVETETETE', arquivo:'radio_san_juan_sounds/musicas/ATREVETETETE.ogg', introStart:1962, introEnd:24042, finalStart:167936, finalEnd:201308 },
    { id:'impacto', name:'IMPACTO', arquivo:'radio_san_juan_sounds/musicas/IMPACTO.ogg', introStart:3434, introEnd:29173, finalStart:151893, finalEnd:180783 },
    { id:'maldades', name:'MALDADES', arquivo:'radio_san_juan_sounds/musicas/MALDADES.ogg', introStart:6359, introEnd:24938, finalStart:157013, finalEnd:198409 },
    { id:'ponmela', name:'PONMELA', arquivo:'radio_san_juan_sounds/musicas/PONMELA.ogg', introStart:6359, introEnd:24010, finalStart:183125, finalEnd:218730 },
    { id:'salioelsol', name:'SALIOELSOL', arquivo:'radio_san_juan_sounds/musicas/SALIOELSOL.ogg', introStart:16042, introEnd:43562, finalStart:157354, finalEnd:196277 },
    { id:'sexymovimiento', name:'SEXYMOVIMIENTO', arquivo:'radio_san_juan_sounds/musicas/SEXYMOVIMIENTO.ogg', introStart:3925, introEnd:26976, finalStart:149623, finalEnd:186962 },
    { id:'sienteelboom', name:'SIENTEELBOOM', arquivo:'radio_san_juan_sounds/musicas/SIENTEELBOOM.ogg', introStart:4660, introEnd:20320, finalStart:165290, finalEnd:189431 },
    { id:'venbailalo', name:'VENBAILALO', arquivo:'radio_san_juan_sounds/musicas/VENBAILALO.ogg', introStart:10777, introEnd:28181, finalStart:168960, finalEnd:194250 }
  ];

  const obj_sjs_iv = {
    musicasList: sjs_iv_musicas,
    narracoesGeneral: sjsList('GENERAL', range(1, 24)),
    timePools: {
      morning: sjsList('MORNING', range(1, 4)),
      afternoon: sjsList('AFTERNOON', range(1, 4)),
      evening: sjsList('EVENING', range(1, 4)),
      night: sjsList('NIGHT', range(1, 4))
    },
    endto: {
      toad: sjsList('TO_AD', range(1, 5)),
      tonews: sjsList('TO_NEWS', range(1, 5)),
      towheather: sjsList('TO_WEATHER', range(1, 5))
    },
    grupoID: sjsList('ID', range(1, 11)),
    grupoDJSolo: sjsList('SOLO', range(1, 9)),
    grupoAdv: sjs_adv_iv, // Anúncios filtrados
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'ATREVETETETE': sjsList('ATREVETETETE', [1]),
        'IMPACTO': sjsList('IMPACTO', [1, 2]),
        'MALDADES': sjsList('MALDADES', [1, 2]),
        'PONMELA': sjsList('PONMELA', [1]),
        'SALIOELSOL': sjsList('SALIOELSOL', [1, 2]),
        'SEXYMOVIMIENTO': sjsList('SEXYMOVIMIENTO', [1]),
        'SIENTEELBOOM': sjsList('SIENTEELBOOM', [1]),
        'VENBAILALO': sjsList('VENBAILALO', [1])
    }
  };

  // --- PROGRAMAÇÃO TLAD+TBOGT ---
  const obj_sjs_eflc = {
    isMixRadio: true, // Funciona apenas com streaming da Mix
    grupoAdv: sjs_adv_eflc, // Anúncios latinos aplicados aqui também
    musicasList: [
      { id: 'sjs_mix', name: 'SANTIAGO_SOUNDS', arquivo: 'radio_san_juan_sounds/musicas/SANTIAGO_SOUNDS.ogg' }
    ]
  };

  // --- PROGRAMAÇÃO EFLC (A Híbrida Inteligente) ---
  const obj_sjs_complete = {
    isHybridRadio: true, // O motor do renderer.js tratará das transições automaticamente
    grupoID: obj_sjs_iv.grupoID,
    grupoAdv: sjs_adv_complete, 
    grupoWeazelNews: G.news.complete,
    grupoDJSolo: obj_sjs_iv.grupoDJSolo,
    narracoesGeneral: obj_sjs_iv.narracoesGeneral,
    timePools: obj_sjs_iv.timePools,
    endto: obj_sjs_iv.endto,
    musicIntroNarrations: obj_sjs_iv.musicIntroNarrations,
    musicasList: obj_sjs_iv.musicasList,
    mixData: { id: 'sjs_mix', name: 'SANTIAGO_SOUNDS', arquivo: 'radio_san_juan_sounds/musicas/SANTIAGO_SOUNDS.ogg' }
  };

  /* ================================================================================= */
  /* ============================ 9. RADIO: IF99 (AFRO BEAT) ======================== */
  /* ================================================================================= */

  const afroPref = 'radio_afro_beat/narracoes/';
  const afroList = (prefix, items) => items.map(i => `${afroPref}${prefix}_${pad(i,2)}.ogg`);

  const afro_iv_musicas = [
    { id:'achanceforpeace', name:'ACHANCEFORPEACE', arquivo:'radio_afro_beat/musicas/ACHANCEFORPEACE.ogg', introStart:6669, introEnd:29731, finalStart:169936, finalEnd:189424 },
    { id:'cryinforlove', name:'CRYINFORLOVE', arquivo:'radio_afro_beat/musicas/CRYINFORLOVE.ogg', introStart:3449, introEnd:21124, finalStart:179925, finalEnd:195819 },
    { id:'galaxy', name:'GALAXY', arquivo:'radio_afro_beat/musicas/GALAXY.ogg', introStart:5039, introEnd:25436, finalStart:162519, finalEnd:207530 },
    { id:'givethepeople', name:'GIVETHEPEOPLE', arquivo:'radio_afro_beat/musicas/GIVETHEPEOPLE.ogg', introStart:4476, introEnd:19724, finalStart:190544, finalEnd:205544 },
    { id:'homeiswhere', name:'HOMEISWHERE', arquivo:'radio_afro_beat/musicas/HOMEISWHERE.ogg', introStart:1259, introEnd:11095, finalStart:163017, finalEnd:183166 },
    { id:'justkissedmybaby', name:'JUSTKISSEDMYBABY', arquivo:'radio_afro_beat/musicas/JUSTKISSEDMYBABY.ogg', introStart:3896, introEnd:22073, finalStart:161975, finalEnd:179970 },
    { id:'livinitup', name:'LIVINITUP', arquivo:'radio_afro_beat/musicas/LIVINITUP.ogg', introStart:6107, introEnd:26399, finalStart:180000, finalEnd:210663 },
    { id:'newbell', name:'NEWBELL', arquivo:'radio_afro_beat/musicas/NEWBELL.ogg', introStart:7742, introEnd:34731, finalStart:142607, finalEnd:164481 },
    { id:'sorrowtearsblood', name:'SORROWTEARSBLOOD', arquivo:'radio_afro_beat/musicas/SORROWTEARSBLOOD.ogg', introStart:109462, introEnd:158907, finalStart:354218, finalEnd:382837 },
    { id:'truthdontdie', name:'TRUTHDONTDIE', arquivo:'radio_afro_beat/musicas/TRUTHDONTDIE.ogg', introStart:5075, introEnd:27117, finalStart:265663, finalEnd:296180 },
    { id:'whoisheandwhatis', name:'WHOISHEANDWHATIS', arquivo:'radio_afro_beat/musicas/WHOISHEANDWHATIS.ogg', introStart:5432, introEnd:26538, finalStart:204800, finalEnd:241962 },
    { id:'zombie', name:'ZOMBIE', arquivo:'radio_afro_beat/musicas/ZOMBIE.ogg', introStart:20053, introEnd:43157, finalStart:337152, finalEnd:355930 }
  ];

  const obj_afro_iv = {
    musicasList: afro_iv_musicas,
    narracoesGeneral: afroList('GENERAL', range(1, 23)),
    timePools: {
      morning: afroList('MORNING', range(1, 4)),
      afternoon: afroList('AFTERNOON', range(1, 4)),
      evening: afroList('EVENING', range(1, 4)),
      night: afroList('NIGHT', range(1, 4))
    },
    endto: {
      toad: afroList('TO_AD', range(1, 5)),
      tonews: afroList('TO_NEWS', range(1, 5)),
      towheather: afroList('TO_WEATHER', range(1, 5))
    },
    grupoID: afroList('ID', range(1, 10)),
    grupoDJSolo: afroList('SOLO', range(1, 10)),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'ACHANCEFORPEACE': afroList('ACHANCEFORPEACE', [1]),
        'GIVETHEPEOPLE': afroList('GIVETHEPEOPLE', [1, 2]),
        'HOMEISWHERE': afroList('HOMEISWHERE', [1, 2]),
        'JUSTKISSEDMYBABY': afroList('JUSTKISSEDMYBABY', [1, 2]),
        'LIVINITUP': afroList('LIVINITUP', [1, 2]),
        'NEWBELL': afroList('NEWBELL', [1, 2]),
        'SORROWTEARSBLOOD': afroList('SORROWTEARSBLOOD', [1, 2]),
        'TRUTHDONTDIE': afroList('TRUTHDONTDIE', [1, 2]),
        'WHOISHEANDWHATIS': afroList('WHOISHEANDWHATIS', [1, 2]),
        'ZOMBIE': afroList('ZOMBIE', [1, 2])
    }
  };

  const obj_afro_complete = {
    ...obj_afro_iv, 
    grupoAdv: G.adv.complete.slice(), 
    grupoWeazelNews: G.news.complete
  };

  /* ================================================================================= */
  /* ============================ 10. RADIO: BABYLON ================================= */
  /* ================================================================================= */

  const babyPref = 'radio_babylon/narracoes/';
  const babyList = (prefix, items) => items.map(i => `${babyPref}${prefix}_${pad(i,2)}.ogg`);

  const baby_musicas = [
    { id:'chasedem', name:'CHASEDEM', arquivo:'radio_babylon/musicas/CHASEDEM.ogg', introStart:11250, introEnd:28632, finalStart:179797, finalEnd:202410 },
    { id:'concretejungle', name:'CONCRETEJUNGLE', arquivo:'radio_babylon/musicas/CONCRETEJUNGLE.ogg', introStart:7523, introEnd:29388, finalStart:189519, finalEnd:218920 },
    { id:'pimpersparadise', name:'PIMPERSPARADISE', arquivo:'radio_babylon/musicas/PIMPERSPARADISE.ogg', introStart:11008, introEnd:36440, finalStart:153088, finalEnd:179293 },
    { id:'ratrace', name:'RATRACE', arquivo:'radio_babylon/musicas/RATRACE.ogg', introStart:3114, introEnd:15334, finalStart:127030, finalEnd:153792 },
    { id:'rebelmusic', name:'REBELMUSIC', arquivo:'radio_babylon/musicas/REBELMUSIC.ogg', introStart:7424, introEnd:28053, finalStart:164158, finalEnd:193194 },
    { id:'satisfymysoul', name:'SATISFYMYSOUL', arquivo:'radio_babylon/musicas/SATISFYMYSOUL.ogg', introStart:2282, introEnd:15573, finalStart:213845, finalEnd:235178 },
    { id:'somuchtrouble', name:'SOMUCHTROUBLE', arquivo:'radio_babylon/musicas/SOMUCHTROUBLE.ogg', introStart:4010, introEnd:19413, finalStart:177128, finalEnd:198058 },
    { id:'standupjamrockremix', name:'STANDUPJAMROCKREMIX', arquivo:'radio_babylon/musicas/STANDUPJAMROCKREMIX.ogg', introStart:7850, introEnd:26230, finalStart:247011, finalEnd:258942 },
    { id:'wakeupandlive', name:'WAKEUPANDLIVE', arquivo:'radio_babylon/musicas/WAKEUPANDLIVE.ogg', finalStart:153429, finalEnd:185642 } // Apenas narração final
  ];

  const obj_baby_iv = {
    musicasList: baby_musicas,
    narracoesGeneral: babyList('GENERAL', range(1, 22)),
    timePools: {
      morning: babyList('MORNING', range(1, 4)),
      afternoon: babyList('AFTERNOON', range(1, 4)),
      evening: babyList('EVENING', range(1, 4)),
      night: babyList('NIGHT', range(1, 4))
    },
    endto: {
      toad: babyList('TO_AD', range(1, 4)),
      tonews: babyList('TO_NEWS', range(1, 4)),
      towheather: babyList('TO_WEATHER', range(1, 4))
    },
    grupoID: babyList('ID', range(1, 12)),
    grupoDJSolo: babyList('SOLO', range(1, 11)),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'CHASEDEM': babyList('CHASEDEM', [1, 2]),
        'CONCRETEJUNGLE': babyList('CONCRETEJUNGLE', [1, 2]),
        'PIMPERSPARADISE': babyList('PIMPERSPARADISE', [1, 2]),
        'RATRACE': babyList('RATRACE', [1]),
        'REBELMUSIC': babyList('REBELMUSIC', [1, 2]),
        'SATISFYMYSOUL': babyList('SATISFYMYSOUL', [1]),
        'SOMUCHTROUBLE': babyList('SOMUCHTROUBLE', [1, 2]),
        'STANDUPJAMROCKREMIX': babyList('STANDUPJAMROCKREMIX', [1, 2]),
        'WAKEUPANDLIVE': babyList('WAKEUPANDLIVE', [1, 2])
    }
  };

  const obj_baby_complete = {
    ...obj_baby_iv, 
    grupoAdv: G.adv.complete.slice(), 
    grupoWeazelNews: G.news.complete
  };

  /* ================================================================================= */
  /* ============================ 11. RADIO: MASSIVE B =============================== */
  /* ================================================================================= */

  // Configuração limpa e direta, sem subpastas
  const obj_massiveb_iv = {
    isMixRadio: true, // Funciona com streaming contínuo como a dance_mix
    musicasList: [
      { id: 'massiveb_mix', name: 'MASSIVEB_MIX', arquivo: 'radio_bobby_konders/MASSIVEB_MIX.ogg' }
    ]
  };

  // Na EFLC o funcionamento e o ficheiro são exatamente os mesmos
  const obj_massiveb_complete = {
    ...obj_massiveb_iv
  };

  /* ================================================================================= */
  /* ========================= 12. RADIO: CLASSICAL AMBIENT ========================== */
  /* ================================================================================= */

  const journeyPref = 'radio_classical_ambient/narracoes/';
  const journeyList = (prefix, items) => items.map(i => `${journeyPref}${prefix}_${pad(i,2)}.ogg`);

  const journey_musicas = [
    { id:'arainbowincurvedair', name:'ARAINBOWINCURVEDAIR', arquivo:'radio_classical_ambient/musicas/ARAINBOWINCURVEDAIR.ogg', introStart:10510, introEnd:42050, finalStart:149629, finalEnd:191348 },
    { id:'arrival', name:'ARRIVAL', arquivo:'radio_classical_ambient/musicas/ARRIVAL.ogg', introStart:14720, introEnd:39808, finalStart:106905, finalEnd:139614 },
    { id:'communique', name:'COMMUNIQUE', arquivo:'radio_classical_ambient/musicas/COMMUNIQUE.ogg', introStart:18905, introEnd:49817, finalStart:147007, finalEnd:183429 },
    { id:'eightmaidenvoyage', name:'EIGHTMAIDENVOYAGE', arquivo:'radio_classical_ambient/musicas/EIGHTMAIDENVOYAGE.ogg', introStart:17586, introEnd:40242, finalStart:150211, finalEnd:184304 },
    { id:'oofpleasure', name:'OOFPLEASURE', arquivo:'radio_classical_ambient/musicas/OOFPLEASURE.ogg', introStart:6477, introEnd:34356, finalStart:135904, finalEnd:178724 },
    { id:'oxygene', name:'OXYGENE', arquivo:'radio_classical_ambient/musicas/OXYGENE.ogg', finalStart:133067, finalEnd:178901 }, // Apenas narração final
    { id:'pruitigoe', name:'PRUITIGOE', arquivo:'radio_classical_ambient/musicas/PRUITIGOE.ogg', introStart:12749, introEnd:42698, finalStart:153459, finalEnd:170525 },
    { id:'remoteviewing', name:'REMOTEVIEWING', arquivo:'radio_classical_ambient/musicas/REMOTEVIEWING.ogg', introStart:17361, introEnd:57416, finalStart:148369, finalEnd:199510 },
    { id:'ztwig', name:'ZTWIG', arquivo:'radio_classical_ambient/musicas/ZTWIG.ogg', introStart:0, introEnd:0, finalStart:0, finalEnd:0 } // Faltam os tempos desta faixa
  ];

  const obj_journey_iv = {
    musicasList: journey_musicas,
    narracoesGeneral: journeyList('GENERAL', range(1, 27)),
    timePools: {
      morning: journeyList('MORNING', range(1, 4)),
      afternoon: journeyList('AFTERNOON', range(1, 4)),
      evening: journeyList('EVENING', range(1, 4)),
      night: journeyList('NIGHT', range(1, 4))
    },
    endto: {}, // Vazio: sem locuções para transições
    grupoID: journeyList('ID', range(1, 10)),
    grupoDJSolo: journeyList('SOLO', range(1, 10)),
    grupoAdv: [], // Vazio: rádio sem comerciais
    grupoWeazelNews: [], // Vazio: sem boletim de notícias
    musicIntroNarrations: {} // Vazio: sem locuções atreladas ao nome da música
  };

  const obj_journey_complete = {
    ...obj_journey_iv
  };

  /* ================================================================================= */
  /* ============================== 13. RADIO: FUSION FM ============================= */
  /* ================================================================================= */

  const fusionPref = 'radio_fusion_fm/narracoes/';
  const fusionList = (prefix, items) => items.map(i => `${fusionPref}${prefix}_${pad(i,2)}.ogg`);

  const fusion_musicas = [
    { id:'funkinthehole', name:'FUNKINTHEHOLE', arquivo:'radio_fusion_fm/musicas/FUNKINTHEHOLE.ogg', introStart:6075, introEnd:32345, finalStart:163893, finalEnd:205884 },
    { id:'heavytune', name:'HEAVYTUNE', arquivo:'radio_fusion_fm/musicas/HEAVYTUNE.ogg', introStart:5798, introEnd:24090, finalStart:184350, finalEnd:212046 },
    { id:'holythursday', name:'HOLYTHURSDAY', arquivo:'radio_fusion_fm/musicas/HOLYTHURSDAY.ogg', introStart:9045, introEnd:33930, finalStart:177941, finalEnd:201717 }, // Tempos ordenados
    { id:'knucklehead', name:'KNUCKLEHEAD', arquivo:'radio_fusion_fm/musicas/KNUCKLEHEAD.ogg', introStart:15375, introEnd:43045, finalStart:197445, finalEnd:218060 },
    { id:'pokusa', name:'POKUSA', arquivo:'radio_fusion_fm/musicas/POKUSA.ogg', introStart:4603, introEnd:20735, finalStart:173397, finalEnd:201698 },
    { id:'rasins', name:'RASINS', arquivo:'radio_fusion_fm/musicas/RASINS.ogg', introStart:8454, introEnd:28003, finalStart:184666, finalEnd:204478 },
    { id:'sneakinintheback', name:'SNEAKININTHEBACK', arquivo:'radio_fusion_fm/musicas/SNEAKININTHEBACK.ogg', introStart:6075, introEnd:29975, finalStart:163706, finalEnd:191189 },
    { id:'stomp', name:'STOMP', arquivo:'radio_fusion_fm/musicas/STOMP.ogg', introStart:6284, introEnd:27193, finalStart:180000, finalEnd:200000 },
    { id:'stratus', name:'STRATUS', arquivo:'radio_fusion_fm/musicas/STRATUS.ogg', introStart:3849, introEnd:13412, finalStart:170454, finalEnd:190722 },
    { id:'theedge', name:'THEEDGE', arquivo:'radio_fusion_fm/musicas/THEEDGE.ogg', finalStart:149665, finalEnd:164227 } // Apenas narração final
  ];

  const obj_fusion_iv = {
    musicasList: fusion_musicas,
    narracoesGeneral: fusionList('GENERAL', range(1, 24)),
    timePools: {
      morning: fusionList('MORNING', range(1, 4)),
      afternoon: fusionList('AFTERNOON', range(1, 4)),
      evening: fusionList('EVENING', range(1, 4)),
      night: fusionList('NIGHT', range(1, 4))
    },
    endto: {
      toad: fusionList('TO_AD', range(1, 4)),
      tonews: fusionList('TO_NEWS', range(1, 4)),
      towheather: fusionList('TO_WEATHER', range(1, 4))
    },
    grupoID: fusionList('ID', range(1, 10)),
    grupoDJSolo: fusionList('SOLO', range(1, 17)),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'FUNKINTHEHOLE': fusionList('FUNKINTHEHOLE', [1, 2]),
        'HEAVYTUNE': fusionList('HEAVYTUNE', [1, 2]),
        'HOLYTHURSDAY': fusionList('HOLYTHURSDAY', [1, 2]),
        'KNUCKLEHEAD': fusionList('KNUCKLEHEAD', [1]),
        'POKUSA': fusionList('POKUSA', [1]),
        'RASINS': fusionList('RASINS', [1, 2]),
        'STRATUS': fusionList('STRATUS', [1]),
        'THEEDGE': fusionList('THEEDGE', [1, 2])
    }
  };

  const obj_fusion_complete = {
    ...obj_fusion_iv, 
    grupoAdv: G.adv.complete.slice(), 
    grupoWeazelNews: G.news.complete
  };

  /* ================================================================================= */
  /* ============================ 14. RADIO: JAZZ NATION ============================= */
  /* ================================================================================= */

  const jnrPref = 'radio_jazz_nation/narracoes/';
  const jnrList = (prefix, items) => items.map(i => `${jnrPref}${prefix}_${pad(i,2)}.ogg`);

  const jnr_musicas = [
    { id:'aprilinparis', name:'APRILINPARIS', arquivo:'radio_jazz_nation/musicas/APRILINPARIS.ogg', introStart:1024, introEnd:25344, finalStart:162181, finalEnd:183676 },
    { id:'giantsteps', name:'GIANTSTEPS', arquivo:'radio_jazz_nation/musicas/GIANTSTEPS.ogg', introStart:9243, introEnd:32698, finalStart:155033, finalEnd:174592 },
    { id:'letsgetlost', name:'LETSGETLOST', arquivo:'radio_jazz_nation/musicas/LETSGETLOST.ogg', introStart:17595, introEnd:64298, finalStart:170760, finalEnd:206898 },
    { id:'moanin', name:'MOANIN', arquivo:'radio_jazz_nation/musicas/MOANIN.ogg', introStart:7909, introEnd:30000, finalStart:184999, finalEnd:210973 },
    { id:'more', name:'MORE', arquivo:'radio_jazz_nation/musicas/MORE.ogg', introStart:5015, introEnd:14330, finalStart:132319, finalEnd:148629 },
    { id:'nightandday', name:'NIGHTANDDAY', arquivo:'radio_jazz_nation/musicas/NIGHTANDDAY.ogg', introStart:9286, introEnd:26919, finalStart:150604, finalEnd:165768 },
    { id:'snapcrackle', name:'SNAPCRACKLE', arquivo:'radio_jazz_nation/musicas/SNAPCRACKLE.ogg', introStart:15000, introEnd:37382, finalStart:159252, finalEnd:185207 },
    { id:'stthomas', name:'STTHOMAS', arquivo:'radio_jazz_nation/musicas/STTHOMAS.ogg', introStart:2357, introEnd:13590, finalStart:169728, finalEnd:190983 },
    { id:'takintheatrain', name:'TAKINTHEATRAIN', arquivo:'radio_jazz_nation/musicas/TAKINTHEATRAIN.ogg', introStart:10282, introEnd:29232, finalStart:146253, finalEnd:170695 },
    { id:'whispernot', name:'WHISPERNOT', arquivo:'radio_jazz_nation/musicas/WHISPERNOT.ogg', introStart:2837, introEnd:28058, finalStart:133533, finalEnd:161472 }
  ];

  const obj_jnr_iv = {
    musicasList: jnr_musicas,
    narracoesGeneral: jnrList('GENERAL', range(1, 22)),
    timePools: {
      morning: jnrList('MORNING', range(1, 3)), // JNR vai apenas até 3
      afternoon: jnrList('AFTERNOON', range(1, 3)),
      evening: jnrList('EVENING', range(1, 3)),
      night: jnrList('NIGHT', range(1, 3))
    },
    endto: {
      toad: jnrList('TO_AD', range(1, 4)),
      tonews: jnrList('TO_NEWS', range(1, 4)),
      towheather: jnrList('TO_WEATHER', range(1, 4))
    },
    grupoID: jnrList('ID', range(1, 10)),
    grupoDJSolo: jnrList('SOLO', range(1, 13)), // JNR vai até 13
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'APRILINPARIS': jnrList('APRILINPARIS', [1, 2]),
        'GIANTSTEPS': jnrList('GIANTSTEPS', [1, 2]),
        'MOANIN': jnrList('MOANIN', [1, 2]),
        'MORE': jnrList('MORE', [1, 2]),
        'NIGHTANDDAY': jnrList('NIGHTANDDAY', [1, 2]),
        'SNAPCRACKLE': jnrList('SNAPCRACKLE', [1, 2]),
        'STTHOMAS': jnrList('STTHOMAS', [1, 2]),
        'TAKINTHEATRAIN': jnrList('TAKINTHEATRAIN', [1, 2]),
        'WHISPERNOT': jnrList('WHISPERNOT', [1])
    }
  };

  const obj_jnr_complete = {
    ...obj_jnr_iv, 
    grupoAdv: G.adv.complete.slice(), 
    grupoWeazelNews: G.news.complete
  };

  /* ================================================================================= */
  /* ========================== 15. RADIO: K109 THE STUDIO =========================== */
  /* ================================================================================= */

  const k109Pref = 'radio_k109_the_studio/narracoes/';
  const k109List = (prefix, items) => items.map(i => `${k109Pref}${prefix}_${pad(i,2)}.ogg`);

  // --- MÚSICAS IV ---
  const k109_musicas_iv = [
    { id:'burninglove', name:'BURNINGLOVE', arquivo:'radio_k109_the_studio/musicas/BURNINGLOVE.ogg', introStart:5541, introEnd:25443, finalStart:192755, finalEnd:212181 },
    { id:'cantlivewithoutyourlove', name:'CANTLIVEWITHOUTYOURLOVE', arquivo:'radio_k109_the_studio/musicas/CANTLIVEWITHOUTYOURLOVE.ogg', introStart:6286, introEnd:24747, finalStart:227547, finalEnd:264949 },
    { id:'dancer', name:'DANCER', arquivo:'radio_k109_the_studio/musicas/DANCER.ogg', introStart:12182, introEnd:40736, finalStart:230400, finalEnd:257450 },
    { id:'getonup', name:'GETONUP', arquivo:'radio_k109_the_studio/musicas/GETONUP.ogg', introStart:8943, introEnd:30000, finalStart:218800, finalEnd:249130 },
    { id:'onajourney', name:'ONAJOURNEY', arquivo:'radio_k109_the_studio/musicas/ONAJOURNEY.ogg', introStart:8021, introEnd:30890, finalStart:210000, finalEnd:247425 },
    { id:'standingintherain', name:'STANDINGINTHERAIN', arquivo:'radio_k109_the_studio/musicas/STANDINGINTHERAIN.ogg', introStart:10471, introEnd:33598, finalStart:197346, finalEnd:223129 },
    { id:'supernature', name:'SUPERNATURE', arquivo:'radio_k109_the_studio/musicas/SUPERNATURE.ogg', introStart:13994, introEnd:39081, finalStart:212138, finalEnd:241920 },
    { id:'tillyousurrender', name:'TILLYOUSURRENDER', arquivo:'radio_k109_the_studio/musicas/TILLYOUSURRENDER.ogg', introStart:47722, introEnd:80101, finalStart:236714, finalEnd:266453 },
    { id:'underwater', name:'UNDERWATER', arquivo:'radio_k109_the_studio/musicas/UNDERWATER.ogg', introStart:4096, introEnd:21617, finalStart:209867, finalEnd:243547 },
    { id:'walkthenight', name:'WALKTHENIGHT', arquivo:'radio_k109_the_studio/musicas/WALKTHENIGHT.ogg', introStart:16502, introEnd:50709, finalStart:189781, finalEnd:225706 }
  ];

  // --- MÚSICAS TLAD+TBOGT ---
  const k109_musicas_eflc = [
    { id:'aloversholiday', name:'ALOVERSHOLIDAY', arquivo:'radio_k109_the_studio/musicas/ALOVERSHOLIDAY.ogg', introStart:7701, introEnd:24838, finalStart:183947, finalEnd:205417 },
    { id:'anylove', name:'ANYLOVE', arquivo:'radio_k109_the_studio/musicas/ANYLOVE.ogg', introStart:12480, introEnd:31242, finalStart:187904, finalEnd:221162 },
    { id:'boogieoogie', name:'BOOGIEOOGIE', arquivo:'radio_k109_the_studio/musicas/BOOGIEOOGIE.ogg', introStart:5070, introEnd:16390, finalStart:149632, finalEnd:168692 },
    { id:'busstop', name:'BUSSTOP', arquivo:'radio_k109_the_studio/musicas/BUSSTOP.ogg', introStart:11858, introEnd:22443, finalStart:207018, finalEnd:220938 },
    { id:'discoinferno', name:'DISCOINFERNO', arquivo:'radio_k109_the_studio/musicas/DISCOINFERNO.ogg', introStart:10209, introEnd:33095, finalStart:168266, finalEnd:199060 },
    { id:'dointhedog', name:'DOINTHEDOG', arquivo:'radio_k109_the_studio/musicas/DOINTHEDOG.ogg', introStart:29184, introEnd:53152, finalStart:166912, finalEnd:195328 },
    { id:'everybodydance', name:'EVERYBODYDANCE', arquivo:'radio_k109_the_studio/musicas/EVERYBODYDANCE.ogg', introStart:16303, introEnd:42982, finalStart:186368, finalEnd:226389 },
    { id:'greatestdancer', name:'GREATESTDANCER', arquivo:'radio_k109_the_studio/musicas/GREATESTDANCER.ogg', introStart:23228, introEnd:51078, finalStart:262524, finalEnd:282306 },
    { id:'ineedyou', name:'INEEDYOU', arquivo:'radio_k109_the_studio/musicas/INEEDYOU.ogg', introStart:5854, introEnd:16016, finalStart:187407, finalEnd:215370 },
    { id:'menergy', name:'MENERGY', arquivo:'radio_k109_the_studio/musicas/MENERGY.ogg', introStart:4384, introEnd:18271, finalStart:155168, finalEnd:179257 },
    { id:'puturbodyinit', name:'PUTURBODYINIT', arquivo:'radio_k109_the_studio/musicas/PUTURBODYINIT.ogg', introStart:5205, introEnd:16561, finalStart:173998, finalEnd:193225 },
    { id:'relightmyfire', name:'RELIGHTMYFIRE', arquivo:'radio_k109_the_studio/musicas/RELIGHTMYFIRE.ogg', introStart:25021, introEnd:55047, finalStart:227463, finalEnd:262311 },
    { id:'shakeyourgroovething', name:'SHAKEYOURGROOVETHING', arquivo:'radio_k109_the_studio/musicas/SHAKEYOURGROOVETHING.ogg', introStart:19299, introEnd:29546, finalStart:189449, finalEnd:211328 },
    { id:'stillinlove', name:'STILLINLOVE', arquivo:'radio_k109_the_studio/musicas/STILLINLOVE.ogg', introStart:16341, introEnd:34170, finalStart:219818, finalEnd:258901 },
    { id:'therebutforthegraceofgod', name:'THEREBUTFORTHEGRACEOFGOD', arquivo:'radio_k109_the_studio/musicas/THEREBUTFORTHEGRACEOFGOD.ogg', introStart:8918, introEnd:24770, finalStart:187394, finalEnd:210635 },
    { id:'youngheartsrunfree', name:'YOUNGHEARTSRUNFREE', arquivo:'radio_k109_the_studio/musicas/YOUNGHEARTSRUNFREE.ogg', introStart:2736, introEnd:9604, finalStart:165996, finalEnd:188418 }
  ];

  // --- PROGRAMAÇÃO IV ---
  const obj_k109_iv = {
    musicasList: k109_musicas_iv,
    narracoesGeneral: k109List('GENERAL', range(1, 23)),
    timePools: {
      morning: k109List('MORNING', range(1, 4)),
      afternoon: k109List('AFTERNOON', range(1, 4)),
      evening: k109List('EVENING', range(1, 3)),
      night: k109List('NIGHT', range(1, 4))
    },
    endto: {
      toad: k109List('TO_AD', range(1, 4)),
      tonews: k109List('TO_NEWS', range(1, 3)),
      towheather: k109List('TO_WEATHER', range(1, 4))
    },
    grupoID: k109List('ID', range(1, 9)),
    grupoDJSolo: k109List('SOLO', range(1, 10)),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'BURNINGLOVE': k109List('BURNINGLOVE', [1, 2]),
        'DANCER': k109List('DANCER', [1]),
        'GETONUP': k109List('GETONUP', [1, 2]),
        'ONAJOURNEY': k109List('ONAJOURNEY', [1, 2]),
        'STANDINGINTHERAIN': k109List('STANDINGINTHERAIN', [1, 2]),
        'WALKTHENIGHT': k109List('WALKTHENIGHT', [1, 2])
    }
  };

  // --- PROGRAMAÇÃO TLAD+TBOGT ---
  const obj_k109_eflc = {
    musicasList: k109_musicas_eflc,
    narracoesGeneral: k109List('GENERAL', range(24, 53)),
    timePools: {
      morning: k109List('MORNING', range(5, 7)),
      afternoon: k109List('AFTERNOON', range(5, 7)),
      evening: k109List('EVENING', range(4, 6)),
      night: k109List('NIGHT', range(5, 7))
    },
    endto: {
      toad: k109List('TO_AD', range(5, 7)),
      tonews: k109List('TO_NEWS', range(4, 6)),
      towheather: k109List('TO_WEATHER', range(5, 7))
    },
    grupoID: k109List('ID', range(1, 9)), // Usa os mesmos da IV
    grupoDJSolo: k109List('SOLO', range(11, 24)),
    grupoAdv: G.adv.eflc.slice(),
    grupoWeazelNews: [], // Sem notícias nesta expansão
    musicIntroNarrations: {
        'ALOVERSHOLIDAY': k109List('ALOVERSHOLIDAY', [1]),
        'ANYLOVE': k109List('ANYLOVE', [1, 2]),
        'BOOGIEOOGIE': k109List('BOOGIEOOGIE', [1, 2]),
        'BUSSTOP': k109List('BUSSTOP', [1, 2, 3]),
        'DISCOINFERNO': k109List('DISCOINFERNO', [1, 2]),
        'DOINTHEDOG': k109List('DOINTHEDOG', [1]),
        'EVERYBODYDANCE': k109List('EVERYBODYDANCE', [1, 2]),
        'GREATESTDANCER': k109List('GREATESTDANCER', [1, 2]),
        'INEEDYOU': k109List('INEEDYOU', [1]),
        'MENERGY': k109List('MENERGY', [1]),
        'PUTURBODYINIT': k109List('PUTURBODYINIT', [1, 2]),
        'RELIGHTMYFIRE': k109List('RELIGHTMYFIRE', [1, 2]),
        'SHAKEYOURGROOVETHING': k109List('SHAKEYOURGROOVETHING', [1]),
        'THEREBUTFORTHEGRACEOFGOD': k109List('THEREBUTFORTHEGRACEOFGOD', [1, 2]),
        'YOUNGHEARTSRUNFREE': k109List('YOUNGHEARTSRUNFREE', [1])
    }
  };

  // --- PROGRAMAÇÃO EFLC ---
  const obj_k109_complete = {
    musicasList: [...k109_musicas_iv, ...k109_musicas_eflc], // Une as duas listas
    narracoesGeneral: k109List('GENERAL', range(1, 53)),
    timePools: {
      morning: k109List('MORNING', range(1, 7)),
      afternoon: k109List('AFTERNOON', range(1, 7)),
      evening: k109List('EVENING', range(1, 6)),
      night: k109List('NIGHT', range(1, 7))
    },
    endto: {
      toad: k109List('TO_AD', range(1, 7)),
      tonews: k109List('TO_NEWS', range(1, 6)),
      towheather: k109List('TO_WEATHER', range(1, 7))
    },
    grupoID: k109List('ID', range(1, 9)),
    grupoDJSolo: k109List('SOLO', range(1, 24)),
    grupoAdv: G.adv.complete.slice(),
    grupoWeazelNews: G.news.complete,
    musicIntroNarrations: {
        ...obj_k109_iv.musicIntroNarrations, 
        ...obj_k109_eflc.musicIntroNarrations
    }
  };

  /* ================================================================================= */
  /* ============================ 16. RADIO: LAZLOW (INTEGRITY) ====================== */
  /* ================================================================================= */

  const padZero = (n) => String(n).padStart(2, '0');
  const lazlowIDs = Array.from({length: 6}, (_, i) => `radio_lazlow/ID_${padZero(i+1)}.ogg`);

  const lazlow_prog_iv = [
    { name: 'INTEGRITY_01', arquivo: 'radio_lazlow/INTEGRITY_01.ogg' },
    { name: 'INTEGRITY_02', arquivo: 'radio_lazlow/INTEGRITY_02.ogg' },
    { name: 'INTEGRITY_03', arquivo: 'radio_lazlow/INTEGRITY_03.ogg' },
    { name: 'INTEGRITY_04', arquivo: 'radio_lazlow/INTEGRITY_04.ogg' }
  ];

  const lazlow_prog_eflc = [
    { name: 'INTEGRITY_MONO_5', arquivo: 'radio_lazlow/INTEGRITY_MONO_5.ogg' },
    { name: 'INTEGRITY_MONO_6', arquivo: 'radio_lazlow/INTEGRITY_MONO_6.ogg' },
    { name: 'INTEGRITY_MONO_7', arquivo: 'radio_lazlow/INTEGRITY_MONO_7.ogg' },
    { name: 'INTEGRITY_MONO_8', arquivo: 'radio_lazlow/INTEGRITY_MONO_8.ogg' }
  ];

  const obj_lazlow_iv = {
    isSequentialTalkRadio: true,
    grupoID: lazlowIDs,
    grupoAdv: G.adv.iv.slice(),
    programasList: lazlow_prog_iv // Só toca se passar pelo filtro do index.html (Dia 8+)
  };

  const obj_lazlow_eflc = {
    isSequentialTalkRadio: true,
    grupoID: lazlowIDs,
    grupoAdv: G.adv.eflc.slice(),
    programasList: lazlow_prog_eflc // Toca o mês todo
  };

  const obj_lazlow_complete = {
    isSequentialTalkRadio: true,
    grupoID: lazlowIDs,
    grupoAdv: G.adv.complete.slice(),
    // Getter dinâmico: a lista muda dependendo do dia atual!
    get programasList() {
      const day = new Date().getDate(); // Substitua por sua variável de dia
      if (day >= 8 && day <= 14) return lazlow_prog_iv;
      if (day >= 15 && day <= 20) return lazlow_prog_eflc;
      if (day >= 21) return [...lazlow_prog_iv, ...lazlow_prog_eflc];
      return []; // Antes do dia 8 fica vazia
    }
  };

  /* ================================================================================= */
  /* ============================ 17. RADIO: NY CLASSICS ============================= */
  /* ================================================================================= */

  const obj_ny_classics_iv = {
    isMixRadio: true, // Streaming contínuo igual à Dance Mix
    musicasList: [
      { id: 'classics_mix', name: 'CLASSICS_MIX', arquivo: 'radio_ny_classics/CLASSICS_MIX.ogg' }
    ]
  };

  const obj_ny_classics_complete = { ...obj_ny_classics_iv };

  /* ================================================================================= */
  /* ============================ 18. RADIO: PLR ===================================== */
  /* ================================================================================= */

  const plrIDs = Array.from({length: 7}, (_, i) => `radio_plr/ID_${padZero(i+1)}.ogg`);

  const obj_plr_iv = {
    isShuffleTalkRadio: true, // A nossa nova regra de embaralhamento sem repetição!
    grupoID: plrIDs,
    grupoAdv: G.adv.iv.slice(),
    programasList: [
      { name: 'INTELLAGENDA', arquivo: 'radio_plr/INTELLAGENDA.ogg' },
      { name: 'PACEMAKER', arquivo: 'radio_plr/PACEMAKER.ogg' },
      { name: 'THE_SEANCE', arquivo: 'radio_plr/THE_SEANCE.ogg' }
    ]
  };

  const obj_plr_complete = {
    ...obj_plr_iv,
    grupoAdv: G.adv.complete.slice()
  };

  /* ================================================================================= */
  /* ============================== 19. RADIO: THE VIBE ============================== */
  /* ================================================================================= */

  const thevibePref = 'radio_the_vibe/narracoes/';
  const thevibeList = (prefix, items) => items.map(i => `${thevibePref}${prefix}_${pad(i,2)}.ogg`);

  const thevibe_musicas = [
    { id:'becauseofyou', name:'BECAUSEOFYOU', arquivo:'radio_the_vibe/musicas/BECAUSEOFYOU.ogg', introStart:5836, introEnd:22220, finalStart:177678, finalEnd:201787 },
    { id:'bumpngrind', name:'BUMPNGRIND', arquivo:'radio_the_vibe/musicas/BUMPNGRIND.ogg', introStart:19829, introEnd:33635, finalStart:168947, finalEnd:203264 },
    { id:'cod', name:'COD', arquivo:'radio_the_vibe/musicas/COD.ogg', introStart:10582, introEnd:27706, finalStart:164894, finalEnd:191498 },
    { id:'criticize', name:'CRITICIZE', arquivo:'radio_the_vibe/musicas/CRITICIZE.ogg', introStart:5120, introEnd:29162, finalStart:170154, finalEnd:193620 },
    { id:'daylight', name:'DAYLIGHT', arquivo:'radio_the_vibe/musicas/DAYLIGHT.ogg', introStart:2044, introEnd:22570, finalStart:178688, finalEnd:217696 },
    { id:'footsteps', name:'FOOTSTEPS', arquivo:'radio_the_vibe/musicas/FOOTSTEPS.ogg', introStart:10581, introEnd:30000, finalStart:224512, finalEnd:252170 },
    { id:'freeknyou', name:'FREEKNYOU', arquivo:'radio_the_vibe/musicas/FREEKNYOU.ogg', introStart:10069, introEnd:28906, finalStart:217088, finalEnd:250624 },
    { id:'getitshawty', name:'GETITSHAWTY', arquivo:'radio_the_vibe/musicas/GETITSHAWTY.ogg', introStart:3512, introEnd:15648, finalStart:162683, finalEnd:187171 },
    { id:'golden', name:'GOLDEN', arquivo:'radio_the_vibe/musicas/GOLDEN.ogg', introStart:2048, introEnd:19145, finalStart:172232, finalEnd:210090 },
    { id:'hanginonastring', name:'HANGINONASTRING', arquivo:'radio_the_vibe/musicas/HANGINONASTRING.ogg', introStart:13056, introEnd:36992, finalStart:226806, finalEnd:253341 },
    { id:'haveyoueverloved', name:'HAVEYOUEVERLOVED', arquivo:'radio_the_vibe/musicas/HAVEYOUEVERLOVED.ogg', introStart:6058, introEnd:28425, finalStart:200874, finalEnd:225657 },
    { id:'inmybed', name:'INMYBED', arquivo:'radio_the_vibe/musicas/INMYBED.ogg', finalStart:183104, finalEnd:203656 }, // Apenas tempo final
    { id:'innercityblues', name:'INNERCITYBLUES', arquivo:'radio_the_vibe/musicas/INNERCITYBLUES.ogg', introStart:8021, introEnd:30500, finalStart:203434, finalEnd:233101 },
    { id:'insidemylove', name:'INSIDEMYLOVE', arquivo:'radio_the_vibe/musicas/INSIDEMYLOVE.ogg', introStart:1536, introEnd:22149, finalStart:147956, finalEnd:180168 },
    { id:'itsonlylove', name:'ITSONLYLOVE', arquivo:'radio_the_vibe/musicas/ITSONLYLOVE.ogg', finalStart:173504, finalEnd:200128 }, // Apenas tempo final
    { id:'iwantyou', name:'IWANTYOU', arquivo:'radio_the_vibe/musicas/IWANTYOU.ogg', introStart:938, introEnd:12336, finalStart:169128, finalEnd:197728 },
    { id:'justbegoodtome', name:'JUSTBEGOODTOME', arquivo:'radio_the_vibe/musicas/JUSTBEGOODTOME.ogg', introStart:13068, introEnd:46805, finalStart:234685, finalEnd:269994 },
    { id:'pony', name:'PONY', arquivo:'radio_the_vibe/musicas/PONY.ogg', introStart:7213, introEnd:27748, finalStart:223750, finalEnd:248688 },
    { id:'you', name:'YOU', arquivo:'radio_the_vibe/musicas/YOU.ogg', introStart:2517, introEnd:16039, finalStart:158037, finalEnd:185205 }
  ];

  const obj_thevibe_iv = {
    musicasList: thevibe_musicas,
    narracoesGeneral: thevibeList('GENERAL', range(1, 25)),
    timePools: {
      morning: thevibeList('MORNING', range(1, 4)),
      afternoon: thevibeList('AFTERNOON', range(1, 4)),
      evening: thevibeList('EVENING', range(1, 4)),
      night: thevibeList('NIGHT', range(1, 4))
    },
    endto: {
      toad: thevibeList('TO_AD', range(1, 5)),
      tonews: thevibeList('TO_NEWS', range(1, 5)),
      towheather: thevibeList('TO_WEATHER', range(1, 5))
    },
    grupoID: thevibeList('ID', range(1, 11)),
    grupoDJSolo: thevibeList('SOLO', range(1, 11)),
    grupoAdv: G.adv.iv.slice(),
    grupoWeazelNews: G.news.iv,
    musicIntroNarrations: {
        'COD': thevibeList('COD', [1, 2]),
        'CRITICIZE': thevibeList('CRITICIZE', [1, 2]),
        'FOOTSTEPS': thevibeList('FOOTSTEPS', [1, 2]),
        'FREEKNYOU': thevibeList('FREEKNYOU', [1, 2]),
        'GOLDEN': thevibeList('GOLDEN', [1, 2]),
        'HAVEYOUEVERLOVED': thevibeList('HAVEYOUEVERLOVED', [1, 2]),
        'INNERCITYBLUES': thevibeList('INNERCITYBLUES', [1, 2]),
        'INSIDEMYLOVE': thevibeList('INSIDEMYLOVE', [1, 2]),
        'IWANTYOU': thevibeList('IWANTYOU', [1, 2]),
        'JUSTBEGOODTOME': thevibeList('JUSTBEGOODTOME', [1, 2]),
        'PONY': thevibeList('PONY', [1, 2]),
        'YOU': thevibeList('YOU', [1, 2])
    }
  };

  const obj_thevibe_complete = {
    ...obj_thevibe_iv, 
    grupoAdv: G.adv.complete.slice(), 
    grupoWeazelNews: G.news.complete
  };

  /* ================================================================================= */
  /* ====================== 20. RADIO: SELF-ACTUALIZATION FM ========================= */
  /* ================================================================================= */

  const medPref = 'radio_meditation/narracoes/';
  const medList = (prefix, items) => items.map(i => `${medPref}${prefix}_${pad(i,2)}.ogg`);

  const med_musicas = [
    { id:'artifacts', name:'ARTIFACTS', arquivo:'radio_meditation/musicas/ARTIFACTS.ogg', introStart:16896, introEnd:58922, finalStart:163840, finalEnd:198997 },
    { id:'bike', name:'BIKE', arquivo:'radio_meditation/musicas/BIKE.ogg', introStart:17920, introEnd:29824, finalStart:166570, finalEnd:206506 },
    { id:'cosmogonicmyth', name:'COSMOGONICMYTH', arquivo:'radio_meditation/musicas/COSMOGONICMYTH.ogg', introStart:28330, introEnd:56320, finalStart:181589, finalEnd:213077 },
    { id:'goforward', name:'GOFORWARD', arquivo:'radio_meditation/musicas/GOFORWARD.ogg', introStart:19968, introEnd:48768, finalStart:196437, finalEnd:223658 },
    { id:'moonbathing', name:'MOONBATHING', arquivo:'radio_meditation/musicas/MOONBATHING.ogg', introStart:29525, introEnd:60416, finalStart:169472, finalEnd:211456 },
    { id:'orb', name:'ORB', arquivo:'radio_meditation/musicas/ORB.ogg', introStart:26994, introEnd:56192, finalStart:178239, finalEnd:213160 },
    { id:'skygazer', name:'SKYGAZER', arquivo:'radio_meditation/musicas/SKYGAZER.ogg', introStart:25941, introEnd:61098, finalStart:167572, finalEnd:200960 },
    { id:'v8psychedelicbrunch', name:'V8PSYCHEDELICBRUNCH', arquivo:'radio_meditation/musicas/V8PSYCHEDELICBRUNCH.ogg', introStart:27477, introEnd:45525, finalStart:185685, finalEnd:219733 }
  ];

  const obj_med_eflc = {
    musicasList: med_musicas,
    narracoesGeneral: medList('GENERAL', range(1, 25)),
    timePools: {
      morning: medList('MORNING', range(1, 4)),
      afternoon: medList('AFTERNOON', range(1, 4)),
      evening: medList('EVENING', range(1, 4)),
      night: medList('NIGHT', range(1, 4))
    },
    endto: {}, // Vazio, pois não tem comerciais nem notícias
    grupoID: medList('ID', range(1, 12)),
    grupoDJSolo: medList('SOLO', range(1, 10)),
    grupoAdv: [], // Sem comerciais
    grupoWeazelNews: [], // Sem notícias
    musicIntroNarrations: {
        'ARTIFACTS': medList('ARTIFACTS', [1, 2]),
        'BIKE': medList('BIKE', [1, 2]),
        'COSMOGONICMYTH': medList('COSMOGONICMYTH', [1, 2]),
        'GOFORWARD': medList('GOFORWARD', [1, 2]),
        'MOONBATHING': medList('MOONBATHING', [1, 2]),
        'ORB': medList('ORB', [1, 2]),
        'SKYGAZER': medList('SKYGAZER', [1, 2]),
        'V8PSYCHEDELICBRUNCH': medList('V8PSYCHEDELICBRUNCH', [1, 2])
    }
  };

  const obj_med_complete = { ...obj_med_eflc };

  /* ================================================================================= */
  /* ================================ 21. RADIO: RAMJAM FM =========================== */
  /* ================================================================================= */

  const obj_ramjam_eflc = {
    isMixRadio: true, // Funciona com streaming contínuo
    musicasList: [
      { id: 'ramjam_mix', name: 'RAMJAM_MIX', arquivo: 'radio_ramjamfm/RAMJAM_MIX.ogg' }
    ]
  };

  const obj_ramjam_complete = { ...obj_ramjam_eflc };

  /* ================================================================================= */
  /* ============================== 22. RADIO: VICE CITY FM ========================== */
  /* ================================================================================= */

  const vcfmPref = 'radio_vcfm/narracoes/';
  const vcfmList = (prefix, items) => items.map(i => `${vcfmPref}${prefix}_${pad(i,2)}.ogg`);

  const vcfm_musicas = [
    { id:'breakout', name:'BREAKOUT', arquivo:'radio_vcfm/musicas/BREAKOUT.ogg', introStart:2970, introEnd:18570, finalStart:168362, finalEnd:199553 },
    { id:'buffalostance', name:'BUFFALOSTANCE', arquivo:'radio_vcfm/musicas/BUFFALOSTANCE.ogg', introStart:20049, introEnd:28881, finalStart:179637, finalEnd:212677 },
    { id:'cestlavie', name:'CESTLAVIE', arquivo:'radio_vcfm/musicas/CESTLAVIE.ogg', introStart:7161, introEnd:19946, finalStart:154691, finalEnd:180156 },
    { id:'cuddlytoy', name:'CUDDLYTOY', arquivo:'radio_vcfm/musicas/CUDDLYTOY.ogg', introStart:16379, introEnd:25834, finalStart:177030, finalEnd:195410 },
    { id:'divineemotions', name:'DIVINEEMOTIONS', arquivo:'radio_vcfm/musicas/DIVINEEMOTIONS.ogg', introStart:5755, introEnd:16543, finalStart:190134, finalEnd:222513 },
    { id:'findthetime', name:'FINDTHETIME', arquivo:'radio_vcfm/musicas/FINDTHETIME.ogg', introStart:6929, introEnd:18202, finalStart:169465, finalEnd:211722 },
    { id:'heartandsoul', name:'HEARTANDSOUL', arquivo:'radio_vcfm/musicas/HEARTANDSOUL.ogg', introStart:13748, introEnd:32655, finalStart:194422, finalEnd:205421 },
    { id:'history', name:'HISTORY', arquivo:'radio_vcfm/musicas/HISTORY.ogg', introStart:14262, introEnd:27311, finalStart:178041, finalEnd:201978 },
    { id:'icantwait', name:'ICANTWAIT', arquivo:'radio_vcfm/musicas/ICANTWAIT.ogg', introStart:13401, introEnd:36363, finalStart:183966, finalEnd:202144 },
    { id:'idontwantalover', name:'IDONTWANTALOVER', arquivo:'radio_vcfm/musicas/IDONTWANTALOVER.ogg', introStart:12063, introEnd:32005, finalStart:189989, finalEnd:202645 },
    { id:'kayleigh', name:'KAYLEIGH', arquivo:'radio_vcfm/musicas/KAYLEIGH.ogg', introStart:6620, introEnd:26941, finalStart:189989, finalEnd:207764 },
    { id:'labouroflove', name:'LABOUROFLOVE', arquivo:'radio_vcfm/musicas/LABOUROFLOVE.ogg', introStart:14361, introEnd:23733, finalStart:185556, finalEnd:202849 },
    { id:'lovechanges', name:'LOVECHANGES', arquivo:'radio_vcfm/musicas/LOVECHANGES.ogg', introStart:12016, introEnd:28600, finalStart:189557, finalEnd:213717 },
    { id:'maneater', name:'MANEATER', arquivo:'radio_vcfm/musicas/MANEATER.ogg', introStart:16100, introEnd:43068, finalStart:193079, finalEnd:216444 },
    { id:'misfit', name:'MISFIT', arquivo:'radio_vcfm/musicas/MISFIT.ogg', introStart:13277, introEnd:24917, finalStart:194171, finalEnd:212973 },
    { id:'peopleholdon', name:'PEOPLEHOLDON', arquivo:'radio_vcfm/musicas/PEOPLEHOLDON.ogg', introStart:10585, introEnd:24872, finalStart:183140, finalEnd:200113 },
    { id:'politicsofdancing', name:'POLITICSOFDANCING', arquivo:'radio_vcfm/musicas/POLITICSOFDANCING.ogg', introStart:4357, introEnd:17659, finalStart:184942, finalEnd:205066 },
    { id:'somethingaboutyou', name:'SOMETHINGABOUTYOU', arquivo:'radio_vcfm/musicas/SOMETHINGABOUTYOU.ogg', introStart:6442, introEnd:15914, finalStart:163669, finalEnd:183488 },
    { id:'staywithmetonight', name:'STAYWITHMETONIGHT', arquivo:'radio_vcfm/musicas/STAYWITHMETONIGHT.ogg', introStart:7732, introEnd:16830, finalStart:181428, finalEnd:208644 },
    { id:'teardrops', name:'TEARDROPS', arquivo:'radio_vcfm/musicas/TEARDROPS.ogg', introStart:5717, introEnd:13482, finalStart:177664, finalEnd:198144 },
    { id:'thelook', name:'THELOOK', arquivo:'radio_vcfm/musicas/THELOOK.ogg', introStart:5440, introEnd:14124, finalStart:202325, finalEnd:211634 },
    { id:'voicescarry', name:'VOICESCARRY', arquivo:'radio_vcfm/musicas/VOICESCARRY.ogg', introStart:5728, introEnd:16729, finalStart:209950, finalEnd:226592 },
    { id:'waitingforastar', name:'WAITINGFORASTAR', arquivo:'radio_vcfm/musicas/WAITINGFORASTAR.ogg', introStart:7981, introEnd:18781, finalStart:216193, finalEnd:236740 },
    { id:'whenlovebreaksdown', name:'WHENLOVEBREAKSDOWN', arquivo:'radio_vcfm/musicas/WHENLOVEBREAKSDOWN.ogg', introStart:6548, introEnd:14915, finalStart:174120, finalEnd:202942 },
    { id:'wishingiwaslucky', name:'WISHINGIWASLUCKY', arquivo:'radio_vcfm/musicas/WISHINGIWASLUCKY.ogg', introStart:9236, introEnd:24343, finalStart:160790, finalEnd:182827 },
    { id:'wishingwell', name:'WISHINGWELL', arquivo:'radio_vcfm/musicas/WISHINGWELL.ogg', introStart:2560, introEnd:6890, finalStart:169805, finalEnd:187760 },
    { id:'woodbeez', name:'WOODBEEZ', arquivo:'radio_vcfm/musicas/WOODBEEZ.ogg', introStart:16128, introEnd:43946, finalStart:179968, finalEnd:199082 },
    { id:'yourethevoice', name:'YOURETHEVOICE', arquivo:'radio_vcfm/musicas/YOURETHEVOICE.ogg', introStart:10922, introEnd:25472, finalStart:219648, finalEnd:244522 }
  ];

  const obj_vcfm_eflc = {
    musicasList: vcfm_musicas,
    narracoesGeneral: vcfmList('GENERAL', range(1, 25)),
    timePools: {
      morning: vcfmList('MORNING', range(1, 4)),
      afternoon: vcfmList('AFTERNOON', range(1, 4)),
      evening: vcfmList('EVENING', range(1, 4)),
      night: vcfmList('NIGHT', range(1, 4))
    },
    endto: {
      toad: vcfmList('TO_AD', range(1, 4)),
      tonews: vcfmList('TO_NEWS', range(1, 4)),
      towheather: vcfmList('TO_WEATHER', range(1, 4))
    },
    grupoID: vcfmList('ID', range(1, 12)),
    grupoDJSolo: vcfmList('SOLO', range(1, 10)),
    grupoAdv: G.adv.eflc.slice(),
    grupoWeazelNews: [], // Sem notícias na TLAD
    musicIntroNarrations: {
        'BREAKOUT': vcfmList('BREAKOUT', [1, 2]),
        'BUFFALOSTANCE': vcfmList('BUFFALOSTANCE', [1, 2]),
        'CESTLAVIE': vcfmList('CESTLAVIE', [1, 2]),
        'CUDDLYTOY': vcfmList('CUDDLYTOY', [1, 2]),
        'DIVINEEMOTIONS': vcfmList('DIVINEEMOTIONS', [1, 2]),
        'FINDTHETIME': vcfmList('FINDTHETIME', [1, 2]),
        'HEARTANDSOUL': vcfmList('HEARTANDSOUL', [1, 2]),
        'HISTORY': vcfmList('HISTORY', [1, 2]),
        'ICANTWAIT': vcfmList('ICANTWAIT', [1, 2]),
        'IDONTWANTALOVER': vcfmList('IDONTWANTALOVER', [1, 2]),
        'KAYLEIGH': vcfmList('KAYLEIGH', [1, 2]),
        'LABOUROFLOVE': vcfmList('LABOUROFLOVE', [1, 2]),
        'LOVECHANGES': vcfmList('LOVECHANGES', [1, 2]),
        'MANEATER': vcfmList('MANEATER', [1, 2]),
        'MISFIT': vcfmList('MISFIT', [1, 2]),
        'PEOPLEHOLDON': vcfmList('PEOPLEHOLDON', [1, 2]),
        'POLITICSOFDANCING': vcfmList('POLITICSOFDANCING', [1, 2]),
        'SOMETHINGABOUTYOU': vcfmList('SOMETHINGABOUTYOU', [1, 2]),
        'STAYWITHMETONIGHT': vcfmList('STAYWITHMETONIGHT', [1, 2]),
        'TEARDROPS': vcfmList('TEARDROPS', [1, 2]),
        'THELOOK': vcfmList('THELOOK', [1, 2]),
        'VOICESCARRY': vcfmList('VOICESCARRY', [1, 2]),
        'WAITINGFORASTAR': vcfmList('WAITINGFORASTAR', [1, 2]),
        'WHENLOVEBREAKSDOWN': vcfmList('WHENLOVEBREAKSDOWN', [1, 2]),
        'WISHINGIWASLUCKY': vcfmList('WISHINGIWASLUCKY', [1, 2]),
        'WISHINGWELL': vcfmList('WISHINGWELL', [1, 2]),
        'WOODBEEZ': vcfmList('WOODBEEZ', [1, 2]),
        'YOURETHEVOICE': vcfmList('YOURETHEVOICE', [1, 2])
    }
  };

  const obj_vcfm_complete = {
    ...obj_vcfm_eflc, 
    grupoAdv: G.adv.complete.slice(), 
    grupoWeazelNews: G.news.complete
  };

  /* ================================================================================= */
  /* =========================== EXPORTAÇÃO GLOBAL =================================== */
  /* ================================================================================= */
  
  window.STATION_DATA = {
    PROGRAMACOES: {
      'iv': {
        'radio_liberty_rock': obj_lr_iv,
        'radio_dance_rock': obj_dr_iv,
        'radio_dance_mix': obj_dm_iv,
        'radio_beat_95': obj_beat_iv,
        'radio_wktt': obj_wktt_iv,
        'radio_hardcore': obj_lchc_iv,
        'radio_vladivostok': obj_vlad_iv,
        'radio_san_juan_sounds': obj_sjs_iv,
        'radio_afro_beat': obj_afro_iv,
        'radio_babylon': obj_baby_iv,
        'radio_bobby_konders': obj_massiveb_iv,
        'radio_classical_ambient': obj_journey_iv,
        'radio_fusion_fm': obj_fusion_iv,
        'radio_jazz_nation': obj_jnr_iv,
        'radio_k109_the_studio': obj_k109_iv,
        'radio_lazlow': obj_lazlow_iv,
        'radio_ny_classics': obj_ny_classics_iv,
        'radio_plr': obj_plr_iv,
        'radio_the_vibe': obj_thevibe_iv
      },
      'eflc': {
        'radio_liberty_rock': obj_lr_eflc,
        'radio_dance_rock': obj_dr_eflc,
        'radio_dance_mix': obj_dm_eflc,
        'radio_beat_95': obj_beat_eflc,
        'radio_wktt': obj_wktt_eflc,
        'radio_hardcore': obj_lchc_eflc,
        'radio_vladivostok': obj_vlad_eflc,
        'radio_san_juan_sounds': obj_sjs_eflc,
        'radio_k109_the_studio': obj_k109_eflc,
        'radio_lazlow': obj_lazlow_eflc,
        'radio_meditation': obj_med_eflc,
        'radio_ramjamfm': obj_ramjam_eflc,
        'radio_vcfm': obj_vcfm_eflc
      },
      'complete': {
        // ==== RÁDIOS HÍBRIDAS E COMPLEXAS (Mantêm os objetos próprios) ====
        'radio_liberty_rock': obj_lr_complete,
        'radio_dance_rock': obj_dr_complete,
        'radio_dance_mix': obj_dm_complete,
        'radio_beat_95': obj_beat_complete,
        'radio_wktt': obj_wktt_complete,
        'radio_hardcore': obj_lchc_complete,
        'radio_vladivostok': obj_vlad_complete,
        'radio_san_juan_sounds': obj_sjs_complete,
        'radio_k109_the_studio': obj_k109_complete,
        'radio_lazlow': obj_lazlow_complete,

        // ==== RÁDIOS PURAS (Agora são atalhos diretos e limpos!) ====
        'radio_afro_beat': { aliasFrom: 'iv' },
        'radio_babylon': { aliasFrom: 'iv' },
        'radio_bobby_konders': { aliasFrom: 'iv' },
        'radio_classical_ambient': { aliasFrom: 'iv' },
        'radio_fusion_fm': { aliasFrom: 'iv' },
        'radio_jazz_nation': { aliasFrom: 'iv' },
        'radio_ny_classics': { aliasFrom: 'iv' },
        'radio_plr': { aliasFrom: 'iv' },
        'radio_the_vibe': { aliasFrom: 'iv' },

        'radio_meditation': { aliasFrom: 'eflc' },
        'radio_ramjamfm': { aliasFrom: 'eflc' },
        'radio_vcfm': { aliasFrom: 'eflc' }
      }
    }
  };
})();
