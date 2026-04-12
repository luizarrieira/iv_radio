// geral.js — Arquivos de ambiente, comerciais, notícias baseadas no dia do mês e clima.

(function() {
  const pad = (n, len=2) => String(n).padStart(len, '0');

  // --- WEAZEL NEWS (CALENDÁRIO DE 31 DIAS) ---
  
  // 1. Edição IV (Base)
  const newsIV = {
    1: ['news/iv/NEWS_01.ogg', 'news/iv/NEWS_02.ogg'],
    2: ['news/iv/NEWS_03.ogg', 'news/iv/NEWS_04.ogg'],
    3: ['news/iv/NEWS_05.ogg', 'news/iv/NEWS_06.ogg'],
    4: ['news/iv/NEWS_07.ogg', 'news/iv/NEWS_08.ogg'],
    5: ['news/iv/NEWS_09.ogg', 'news/iv/NEWS_10.ogg'],
    6: ['news/iv/NEWS_11.ogg', 'news/iv/NEWS_12.ogg'],
    7: ['news/iv/NEWS_13.ogg', 'news/iv/NEWS_14.ogg'],
    8: ['news/iv/NEWS_15.ogg', 'news/iv/NEWS_16.ogg'],
    9: ['news/iv/NEWS_17.ogg', 'news/iv/NEWS_18.ogg'],
    10: ['news/iv/NEWS_19.ogg', 'news/iv/NEWS_20.ogg'],
    11: ['news/iv/NEWS_21.ogg', 'news/iv/NEWS_22.ogg'],
    12: ['news/iv/NEWS_23.ogg', 'news/iv/NEWS_24.ogg'],
    13: ['news/iv/NEWS_25.ogg', 'news/iv/NEWS_26.ogg'],
    14: ['news/iv/NEWS_27.ogg', 'news/iv/NEWS_28.ogg'],
    15: ['news/iv/NEWS_29.ogg', 'news/iv/NEWS_30.ogg'],
    16: ['news/iv/NEWS_31.ogg', 'news/iv/NEWS_32.ogg'],
    17: ['news/iv/NEWS_33.ogg', 'news/iv/NEWS_35.ogg'],
    18: ['news/iv/NEWS_34.ogg', 'news/iv/NEWS_36.ogg'],
    19: ['news/iv/NEWS_37.ogg', 'news/iv/NEWS_38.ogg'],
    20: ['news/iv/NEWS_39.ogg', 'news/iv/NEWS_40.ogg'],
    21: ['news/iv/NEWS_41.ogg', 'news/iv/NEWS_42.ogg'],
    22: ['news/iv/NEWS_43.ogg', 'news/iv/NEWS_44.ogg'],
    23: ['news/iv/NEWS_45.ogg', 'news/iv/NEWS_46.ogg'],
    24: ['news/iv/NEWS_47.ogg', 'news/iv/NEWS_48.ogg'],
    25: ['news/iv/NEWS_49.ogg', 'news/iv/NEWS_50.ogg'],
    26: ['news/iv/NEWS_51.ogg', 'news/iv/NEWS_52.ogg'],
    27: ['news/iv/NEWS_53.ogg', 'news/iv/NEWS_54.ogg'],
    28: ['news/iv/NEWS_55.ogg', 'news/iv/NEWS_56.ogg'],
    29: ['news/iv/NEWS_57.ogg', 'news/iv/NEWS_58.ogg'],
    30: ['news/iv/NEWS_59.ogg', 'news/iv/NEWS_60.ogg', 'news/iv/NEWS_61.ogg', 'news/iv/NEWS_63.ogg'],
    31: ['news/iv/NEWS_62.ogg', 'news/iv/NEWS_64.ogg', 'news/iv/NEWS_65.ogg', 'news/iv/NEWS_66.ogg', 'news/iv/NEWS_67.ogg', 'news/iv/NEWS_68.ogg']
  };

  // 2. Edição EFLC (Antiga TLAD+TBOGT)
  const newsEFLC = {
    1: ['news/iv/NEWS_01.ogg', 'news/iv/NEWS_02.ogg'],
    2: ['news/iv/NEWS_04.ogg'],
    3: ['news/iv/NEWS_05.ogg', 'news/iv/NEWS_06.ogg'],
    4: ['news/iv/NEWS_07.ogg', 'news/iv/NEWS_08.ogg'],
    5: ['news/iv/NEWS_09.ogg', 'news/iv/NEWS_10.ogg'],
    6: ['news/iv/NEWS_11.ogg', 'news/iv/NEWS_12.ogg'],
    7: ['news/iv/NEWS_14.ogg'],
    8: ['news/tlad/NEWS_01.ogg', 'news/tlad/NEWS_03.ogg'],
    9: ['news/tlad/NEWS_02.ogg'],
    10: ['news/tlad/NEWS_04.ogg'],
    11: ['news/tlad/NEWS_05.ogg', 'news/tbogt/NEWS_05.ogg'],
    12: ['news/tlad/NEWS_06.ogg', 'news/tlad/NEWS_07.ogg'],
    13: ['news/tlad/NEWS_08.ogg', 'news/tbogt/NEWS_01.ogg'],
    14: ['news/tlad/NEWS_09.ogg', 'news/tbogt/NEWS_02.ogg'],
    15: ['news/tlad/NEWS_10.ogg'],
    16: ['news/iv/NEWS_31.ogg', 'news/iv/NEWS_32.ogg'],
    17: ['news/tbogt/NEWS_03.ogg'],
    18: ['news/tlad/NEWS_11.ogg', 'news/tbogt/NEWS_04.ogg'],
    19: ['news/tlad/NEWS_12.ogg', 'news/tbogt/NEWS_07.ogg'],
    20: ['news/tlad/NEWS_13.ogg'],
    21: ['news/tlad/NEWS_14.ogg', 'news/tbogt/NEWS_08.ogg'],
    22: ['news/tlad/NEWS_15.ogg'],
    23: ['news/tbogt/NEWS_09.ogg'],
    24: ['news/tbogt/NEWS_10.ogg'],
    25: ['news/tlad/NEWS_16.ogg', 'news/tbogt/NEWS_11.ogg'],
    26: ['news/tbogt/NEWS_12.ogg', 'news/tbogt/NEWS_13.ogg'],
    27: ['news/tbogt/NEWS_14.ogg', 'news/tbogt/NEWS_15.ogg'],
    28: ['news/tbogt/NEWS_16.ogg', 'news/tbogt/NEWS_17.ogg'],
    29: ['news/tbogt/NEWS_18.ogg', 'news/tbogt/NEWS_19.ogg'],
    30: ['news/tlad/NEWS_18.ogg', 'news/tbogt/NEWS_20.ogg'],
    31: ['news/tlad/NEWS_17.ogg', 'news/tbogt/NEWS_06.ogg']
  };

  // 3. Edição Complete (Antiga EFLC - IV+TLAD+TBOGT juntos)
  const newsComplete = {
    1: ['news/iv/NEWS_01.ogg', 'news/iv/NEWS_02.ogg'],
    2: ['news/iv/NEWS_03.ogg', 'news/iv/NEWS_04.ogg'],
    3: ['news/iv/NEWS_05.ogg', 'news/iv/NEWS_06.ogg'],
    4: ['news/iv/NEWS_07.ogg', 'news/iv/NEWS_08.ogg'],
    5: ['news/iv/NEWS_09.ogg', 'news/iv/NEWS_10.ogg'],
    6: ['news/iv/NEWS_11.ogg', 'news/iv/NEWS_12.ogg'],
    7: ['news/iv/NEWS_13.ogg', 'news/iv/NEWS_14.ogg'],
    8: ['news/iv/NEWS_15.ogg', 'news/iv/NEWS_16.ogg', 'news/tlad/NEWS_01.ogg', 'news/tlad/NEWS_03.ogg'],
    9: ['news/iv/NEWS_17.ogg', 'news/iv/NEWS_18.ogg', 'news/tlad/NEWS_02.ogg'],
    10: ['news/iv/NEWS_19.ogg', 'news/iv/NEWS_20.ogg', 'news/tlad/NEWS_04.ogg'],
    11: ['news/iv/NEWS_21.ogg', 'news/iv/NEWS_22.ogg', 'news/tlad/NEWS_05.ogg', 'news/tbogt/NEWS_05.ogg'],
    12: ['news/iv/NEWS_23.ogg', 'news/iv/NEWS_24.ogg', 'news/tlad/NEWS_06.ogg', 'news/tlad/NEWS_07.ogg'],
    13: ['news/iv/NEWS_25.ogg', 'news/iv/NEWS_26.ogg', 'news/tbogt/NEWS_01.ogg', 'news/tlad/NEWS_08.ogg'],
    14: ['news/iv/NEWS_27.ogg', 'news/iv/NEWS_28.ogg', 'news/tlad/NEWS_09.ogg', 'news/tbogt/NEWS_02.ogg'],
    15: ['news/iv/NEWS_29.ogg', 'news/iv/NEWS_30.ogg', 'news/tlad/NEWS_10.ogg'],
    16: ['news/iv/NEWS_31.ogg', 'news/iv/NEWS_32.ogg'],
    17: ['news/iv/NEWS_33.ogg', 'news/tbogt/NEWS_03.ogg', 'news/iv/NEWS_35.ogg'],
    18: ['news/iv/NEWS_34.ogg', 'news/iv/NEWS_36.ogg', 'news/tlad/NEWS_11.ogg', 'news/tbogt/NEWS_04.ogg'],
    19: ['news/iv/NEWS_37.ogg', 'news/iv/NEWS_38.ogg', 'news/tlad/NEWS_12.ogg', 'news/tbogt/NEWS_07.ogg'],
    20: ['news/iv/NEWS_39.ogg', 'news/iv/NEWS_40.ogg', 'news/tlad/NEWS_13.ogg'],
    21: ['news/iv/NEWS_41.ogg', 'news/tbogt/NEWS_08.ogg', 'news/iv/NEWS_42.ogg', 'news/tlad/NEWS_14.ogg'],
    22: ['news/iv/NEWS_43.ogg', 'news/iv/NEWS_44.ogg', 'news/tlad/NEWS_15.ogg'],
    23: ['news/iv/NEWS_45.ogg', 'news/tbogt/NEWS_09.ogg', 'news/iv/NEWS_46.ogg'],
    24: ['news/iv/NEWS_47.ogg', 'news/iv/NEWS_48.ogg', 'news/tbogt/NEWS_10.ogg'],
    25: ['news/iv/NEWS_49.ogg', 'news/iv/NEWS_50.ogg', 'news/tlad/NEWS_16.ogg', 'news/tbogt/NEWS_11.ogg'],
    26: ['news/iv/NEWS_51.ogg', 'news/iv/NEWS_52.ogg', 'news/tbogt/NEWS_12.ogg', 'news/tbogt/NEWS_13.ogg'],
    27: ['news/iv/NEWS_53.ogg', 'news/iv/NEWS_54.ogg', 'news/tbogt/NEWS_14.ogg', 'news/tbogt/NEWS_15.ogg'],
    28: ['news/iv/NEWS_55.ogg', 'news/iv/NEWS_56.ogg', 'news/tbogt/NEWS_16.ogg', 'news/tbogt/NEWS_17.ogg'],
    29: ['news/iv/NEWS_57.ogg', 'news/iv/NEWS_58.ogg', 'news/tbogt/NEWS_18.ogg', 'news/tbogt/NEWS_19.ogg'],
    30: ['news/iv/NEWS_59.ogg', 'news/iv/NEWS_60.ogg', 'news/iv/NEWS_61.ogg', 'news/iv/NEWS_63.ogg', 'news/tlad/NEWS_18.ogg', 'news/tbogt/NEWS_20.ogg'],
    31: ['news/iv/NEWS_65.ogg', 'news/tlad/NEWS_17.ogg', 'news/tbogt/NEWS_06.ogg', 'news/iv/NEWS_62.ogg', 'news/iv/NEWS_64.ogg', 'news/iv/NEWS_66.ogg', 'news/iv/NEWS_67.ogg', 'news/iv/NEWS_68.ogg']
  };

  // --- ADVERTISEMENTS (Comerciais) ---

  const raw_ads_iv = `AD001_ANIME1_MCHBTT
AD002_ANIME2_ROBTBB
AD003_FEINBURG
AD004_EXCELSIOR
AD005_TRACK_BEAC
AD006_TRACK_BEAC2
AD007_WHIZ_JUNK
AD008_MAS_FUEGO
AD009_MOLIS_FATGIRL
AD010_MUMMIFIC1
AD011_MUMMIFIC2
AD012_SCOOTER1_TRANS
AD013_SCOOTER2_POST
AD014_SCOOTER3_EVOLUTN
AD015_ALCOPATCH
AD016_ALCOTINE_PATCH
AD017_ELECTROLYTE
AD018_AL_DENTES
AD019_ELCAMUCHOROBOTO
AD020_WINGIT1_BRAIN
AD021_WINGIT2_STRIP
AD022_EUGEN1_DESIGN
AD023_EUGEN2_SCIENCE
AD024_VINDICATION
AD025_THE_HORN
AD026_CARBON_DATE
AD027_LC_GUN_CLUB
AD028_NUCA_1
AD029_NUCA_2
AD030_RUSSIAN_EXCELSIOR
AD031_IM_RICH
AD032_RUSSIAN_HORN
AD033_SPANISH_HORN
AD034_HORN_SPRAYFACE2
AD035_TOPHOOKER
AD036_TOPHOOKER2_REVISED
AD037_RUSSIAN_WHIZ
AD038_SPANISH_WHIZ
AD039_VIPRINGTONE_01
AD040_VIPRINGTONE_02
AD041_BABIES_1
AD042_BABIES_2
AD043_BABIES_3
AD044_TRASH_CAN_LIDS
AD045_BITTERSWEET_VIBRATE
AD046_BITTERSWEET_BASEBALL
AD047_EXCELSIOR_SPANISH
AD048_KARIN_DILANTANTE
AD049_WHIZ_FLIP
AD050_LIPURGEX_1
AD051_LIPURGEX_2
AD053_POPPING
AD054_PSYCHIC
AD055_WANING_STARS_BOYBAND
AD056_WEASELNEWS_PROMO
AD057_MALE_AROMATHERAPY
AD058_MEDICATEME_1
AD059_MEDICATEME_2
AD060_SCIENCECRIME_1
AD061_SCIENCECRIME_2
AD062_SCIENCECRIME_3
AD063_SWINGINGPUPPETS
AD064_VIGINSURANCE
AD065_WANINGWITHSTARS_2
AD066_DRAGONBRAIN
AD067_PISSWASSER_1
AD068_PISSWASSER_2
AD069_WTF_THEATER
AD070_BAS_PROMO
AD071_BRUCIE_1
AD072_BRUCIE_2
AD073_CRYOGENICS
AD074_JEREMY_PROMO
AD075_KNIFE_SHOW
AD077_JON_HUNTER_1
AD078_MAS_FUEGO_2
AD079_POKER_PROMO
AD080_MIKE_GRAVES_1
AD081_MIKE_GRAVES_2
AD082_JON_HUNTER_2
AD083_DNA_SEARCH
AD084_HAMSTER_HAREM
AD087_SUBURBS
AD088_CIVILSERVICE
AD089_FLEECA_BABY
AD090_FLEECA_CHOP
AD091_FLEECA_MOM
AD092_FLEECA_TRANNY
AD093_ZIT`;

  const raw_ads_eflc = `AD001_ANIME1_MCHBTT
AD002_ANIME2_ROBTBB
AD004_EXCELSIOR
AD005_TRACK_BEAC
AD007_WHIZ_JUNK
AD008_MAS_FUEGO
AD009_MOLIS_FATGIRL
AD010_MUMMIFIC1
AD014_SCOOTER3_EVOLUTN
AD015_ALCOPATCH
AD016_ALCOTINE_PATCH
AD017_ELECTROLYTE
AD018_AL_DENTES
AD019_ELCAMUCHOROBOTO
AD020_WINGIT1_BRAIN
AD022_EUGEN1_DESIGN
AD024_VINDICATION
AD025_THE_HORN
AD027_LC_GUN_CLUB
AD028_NUCA_1
AD031_IM_RICH
AD035_TOPHOOKER
AD039_VIPRINGTONE_01
AD041_BABIES_1
AD044_TRASH_CAN_LIDS
AD045_BITTERSWEET_VIBRATE
AD048_KARIN_DILANTANTE
AD049_WHIZ_FLIP
AD053_POPPING
AD055_WANING_STARS_BOYBAND
AD059_MEDICATEME_2
AD063_SWINGINGPUPPETS
AD064_VIGINSURANCE
AD066_DRAGONBRAIN
AD067_PISSWASSER_1
AD069_WTF_THEATER
AD073_CRYOGENICS
AD078_MAS_FUEGO_2
AD080_MIKE_GRAVES_1
AD083_DNA_SEARCH
AD084_HAMSTER_HAREM
AD087_SUBURBS
AD088_CIVILSERVICE
AD089_FLEECA_BABY
AD090_FLEECA_CHOP
AD093_ZIT`;

  const parseAds = (rawText, subfolder) => {
    return rawText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')
      .map(name => `adv/${subfolder}/${name}.ogg`);
  };

  const adv_iv_base_completa = parseAds(raw_ads_iv, 'iv');
  const adv_eflc_base = parseAds(raw_ads_eflc, 'iv');

  const nomes_exclusivos = [
    'AD030_RUSSIAN_EXCELSIOR',
    'AD032_RUSSIAN_HORN',
    'AD033_SPANISH_HORN',
    'AD037_RUSSIAN_WHIZ',
    'AD038_SPANISH_WHIZ',
    'AD047_EXCELSIOR_SPANISH'
  ];

  const adv_iv_geral_limpa = adv_iv_base_completa.filter(caminho => {
    return !nomes_exclusivos.some(nome => caminho.includes(nome));
  });

  const adv_exclusivos_russa = adv_iv_base_completa.filter(caminho => caminho.includes('RUSSIAN'));
  const adv_exclusivos_latina = adv_iv_base_completa.filter(caminho => caminho.includes('SPANISH'));

  const adv_exclusivos_tlad = [
    'adv/tlad/AD076_LITTLE_BITCH.ogg',
    'adv/tlad/AD086_MY_DRUNK_UNCLE.ogg',
    'adv/tlad/AD094_DEITY.ogg',
    'adv/tlad/AD095_FLORIST.ogg',
    'adv/tlad/AD096_GENDERROLEDOLL.ogg',
    'adv/tlad/AD097_HOMEVIDEO.ogg'
  ];

  const adv_exclusivos_tbogt = [
    'adv/tbogt/AD100_SPACERANGER_MEAL.ogg',
    'adv/tbogt/AD101_FLOWERS_DOM_VIOLENCE.ogg',
    'adv/tbogt/AD102_MOLLIS_TEACHER.ogg',
    'adv/tbogt/AD103_LITTLE_BITCH_THONG.ogg'
  ];

  const adv = {
    iv: adv_iv_geral_limpa, 
    eflc: [...adv_eflc_base, ...adv_exclusivos_tlad, ...adv_exclusivos_tbogt], 
    complete: [...adv_iv_geral_limpa, ...adv_exclusivos_tlad, ...adv_exclusivos_tbogt],
    
    russa: adv_exclusivos_russa,
    latina: adv_exclusivos_latina
  };

  // --- CLIMA ---
  const weatherConfig = {
    cloud: 11,
    fog: 12,
    rain: 11,
    sun: 12,
    wind: 11
  };

  // EXPORTAÇÃO GLOBAL (Atualizada para a nova hierarquia)
  window.GERAL_DATA = {
    news: {
      iv: newsIV,
      eflc: newsEFLC,         // Antiga tlad
      complete: newsComplete  // Antiga eflc
    },
    adv: {
      iv: adv.iv,             // Antiga base
      eflc: adv.eflc,         // Antiga tlad
      complete: adv.complete, // Antiga ivtlad
      russa: adv.russa,   
      latina: adv.latina  
    },
    weatherLimits: weatherConfig
  };

  console.log('[GERAL] Dados de ambiente e comerciais carregados (Nomenclatura Atualizada).');
})();