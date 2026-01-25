// Internationalization - English and Russian translations

export type Language = 'en' | 'ru';

export interface Translations {
  // Home View
  home: {
    title: string;
    subtitle: string;
    description: string;
    startAdventure: string;
    parentDashboard: string;
    setupProfile: string;
    benefitsTitle: string;
    phase1Title: string;
    phase1Desc: string;
    phase2Title: string;
    phase2Desc: string;
    phase3Title: string;
    phase3Desc: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    benefit5: string;
    benefit6: string;
    explanationTitle: string;
    explanationSubtitle: string;
    explanationStep1Title: string;
    explanationStep1Desc: string;
    explanationStep2Title: string;
    explanationStep2Desc: string;
    explanationStep3Title: string;
    explanationStep3Desc: string;
    explanationForParentsTitle: string;
    explanationForParents1: string;
    explanationForParents2: string;
    explanationSafetyTitle: string;
    explanationSafety1: string;
    explanationSafety2: string;
  };
  
  // Dashboard
  dashboard: {
    title: string;
    setup: string;
    comfort: string;
    insights: string;
    badges: string;
    childName: string;
    childAge: string;
    monthsOld: string;
    saveProfile: string;
    recordComfort: string;
    recording: string;
    parentVoice: string;
    musicBox: string;
    whitenoise: string;
    playSound: string;
    deleteSound: string;
    sessionHistory: string;
    noSessions: string;
    totalSessions: string;
    avgDuration: string;
    soundsDiscovered: string;
    totalEngagement: string;
  };
  
  // Game UI
  game: {
    phase: string;
    score: string;
    exit: string;
    pause: string;
    resume: string;
    volume: string;
  };
  
  // Phases
  phases: {
    discovery: {
      title: string;
      subtitle: string;
      soundsDiscovered: string;
    };
    expression: {
      title: string;
      subtitle: string;
      animalsImitated: string;
    };
    creation: {
      title: string;
      subtitle: string;
      rhythmsCreated: string;
    };
  };
  
  // Echo Messages
  echo: {
    welcome: string;
    letsHear: string;
    listenCarefully: string;
    thatWas: string;
    amazing: string;
    greatJob: string;
    fantastic: string;
    wonderful: string;
    excellent: string;
    nowLetsImitate: string;
    canYouMake: string;
    tryAgain: string;
    perfect: string;
    letsCreate: string;
    tapRhythm: string;
    creativeMind: string;
    completed: string;
  };
  
  // Comfort Messages
  comfort: {
    missParent: string;
    comeBackSoon: string;
    stayStrong: string;
    playComfort: string;
  };
  
  // Session Summary
  summary: {
    title: string;
    duration: string;
    minutes: string;
    soundsFound: string;
    animalsImitated: string;
    rhythmsCreated: string;
    newBadges: string;
    emotionalJourney: string;
    playAgain: string;
    backHome: string;
  };
  
  // Badges
  badges: {
    firstSafari: { name: string; description: string };
    soundDetective: { name: string; description: string };
    animalExpert: { name: string; description: string };
    rhythmMaster: { name: string; description: string };
    braveExplorer: { name: string; description: string };
    superListener: { name: string; description: string };
    voiceChampion: { name: string; description: string };
    musicMaker: { name: string; description: string };
    safariVeteran: { name: string; description: string };
    comfortFriend: { name: string; description: string };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    home: {
      title: 'Sound Safari',
      subtitle: 'The Interactive Audio Adventure for Curious Toddlers',
      description: 'Transform parental absence into an engaging auditory exploration with Echo, your child\'s friendly sound companion!',
      startAdventure: 'Start Adventure',
      parentDashboard: 'Parent Dashboard',
      setupProfile: 'Setup Profile',
      benefitsTitle: 'Benefits for Your Child',
      phase1Title: 'Phase 1: Discovery',
      phase1Desc: 'Quiet Ears Expedition - Listen to the world around you',
      phase2Title: 'Phase 2: Expression',
      phase2Desc: 'Jungle Choir Carnival - Make your own animal sounds',
      phase3Title: 'Phase 3: Creation',
      phase3Desc: 'Family Rhythm Band - Create musical rhythms',
      benefit1: 'Reduces separation anxiety through engagement',
      benefit2: 'Builds auditory processing and attention skills',
      benefit3: 'Encourages vocal confidence and expression',
      benefit4: 'Develops creativity through sound exploration',
      benefit5: 'Provides emotional comfort during transitions',
      benefit6: '100% privacy-focused with local processing',
      explanationTitle: 'How Sound Safari Works',
      explanationSubtitle: 'A simple, guided flow that turns listening into play and comfort.',
      explanationStep1Title: 'Listen and Discover',
      explanationStep1Desc: 'Echo introduces a sound and your child listens for it in the environment.',
      explanationStep2Title: 'Imitate and Express',
      explanationStep2Desc: 'Your child mirrors animal sounds to build confidence and speech practice.',
      explanationStep3Title: 'Create a Rhythm',
      explanationStep3Desc: 'They tap or clap a rhythm, turning feelings into playful music.',
      explanationForParentsTitle: 'For Parents',
      explanationForParents1: 'Set up a profile once, then launch quick sessions anytime.',
      explanationForParents2: 'Use the dashboard to review progress and earned badges.',
      explanationSafetyTitle: 'Safety & Privacy',
      explanationSafety1: 'No accounts needed for kids and no ads or external links.',
      explanationSafety2: 'Audio stays on device with local processing only.'
    },
    
    dashboard: {
      title: 'Parent Dashboard',
      setup: 'Setup',
      comfort: 'Comfort',
      insights: 'Insights',
      badges: 'Badges',
      childName: 'Child\'s Name',
      childAge: 'Age (months)',
      monthsOld: 'months old',
      saveProfile: 'Save Profile',
      recordComfort: 'Record Comfort Sound',
      recording: 'Recording...',
      parentVoice: 'Parent Voice',
      musicBox: 'Music Box',
      whitenoise: 'White Noise',
      playSound: 'Play',
      deleteSound: 'Delete',
      sessionHistory: 'Session History',
      noSessions: 'No sessions yet',
      totalSessions: 'Total Sessions',
      avgDuration: 'Avg Duration',
      soundsDiscovered: 'Sounds Discovered',
      totalEngagement: 'Total Engagement'
    },
    
    game: {
      phase: 'Phase',
      score: 'Score',
      exit: 'Exit',
      pause: 'Pause',
      resume: 'Resume',
      volume: 'Volume'
    },
    
    phases: {
      discovery: {
        title: 'Quiet Ears Expedition',
        subtitle: 'Listen to the sounds around you',
        soundsDiscovered: 'Sounds Discovered'
      },
      expression: {
        title: 'Animal Chorus',
        subtitle: 'Imitate the animals',
        animalsImitated: 'Animals Imitated'
      },
      creation: {
        title: 'Rhythm Safari',
        subtitle: 'Create your own rhythms',
        rhythmsCreated: 'Rhythms Created'
      }
    },
    
    echo: {
      welcome: 'Hi! I\'m Echo! Let\'s go on a Sound Safari!',
      letsHear: 'Let\'s hear what the world is whispering...',
      listenCarefully: 'Listen carefully... Can you hear the',
      thatWas: 'That was the',
      amazing: 'Amazing listening!',
      greatJob: 'Great job!',
      fantastic: 'Fantastic!',
      wonderful: 'Wonderful!',
      excellent: 'Excellent!',
      nowLetsImitate: 'Now let\'s imitate some animals!',
      canYouMake: 'Can you make a sound like a',
      tryAgain: 'Try again!',
      perfect: 'Perfect!',
      letsCreate: 'Now let\'s create some rhythms!',
      tapRhythm: 'Tap out your own rhythm',
      creativeMind: 'What a creative mind!',
      completed: 'You completed all phases! Amazing work!'
    },
    
    comfort: {
      missParent: 'Missing mom/dad?',
      comeBackSoon: 'They\'ll be back soon!',
      stayStrong: 'You\'re doing great!',
      playComfort: 'Play Comfort Sound'
    },
    
    summary: {
      title: 'Adventure Complete!',
      duration: 'Duration',
      minutes: 'minutes',
      soundsFound: 'Sounds Found',
      animalsImitated: 'Animals Imitated',
      rhythmsCreated: 'Rhythms Created',
      newBadges: 'New Badges Earned',
      emotionalJourney: 'Emotional Journey',
      playAgain: 'Play Again',
      backHome: 'Back Home'
    },
    
    badges: {
      firstSafari: {
        name: 'First Safari',
        description: 'Complete your very first Sound Safari adventure!'
      },
      soundDetective: {
        name: 'Sound Detective',
        description: 'Discover 25 different sounds'
      },
      animalExpert: {
        name: 'Animal Expert',
        description: 'Imitate 20 different animal sounds'
      },
      rhythmMaster: {
        name: 'Rhythm Master',
        description: 'Create 15 unique rhythms'
      },
      braveExplorer: {
        name: 'Brave Explorer',
        description: 'Complete 5 safari sessions'
      },
      superListener: {
        name: 'Super Listener',
        description: 'Discover all sounds in one phase'
      },
      voiceChampion: {
        name: 'Voice Champion',
        description: 'Successfully imitate 10 animals in a row'
      },
      musicMaker: {
        name: 'Music Maker',
        description: 'Create a rhythm longer than 30 seconds'
      },
      safariVeteran: {
        name: 'Safari Veteran',
        description: 'Complete 25 total sessions'
      },
      comfortFriend: {
        name: 'Comfort Friend',
        description: 'Use comfort sounds during 5 sessions'
      }
    }
  },
  
  ru: {
    home: {
      title: 'Звуковое Сафари',
      subtitle: 'Интерактивное Звуковое Приключение для Любознательных Малышей',
      description: 'Превратите отсутствие родителей в увлекательное звуковое исследование с Эхо, дружелюбным звуковым компаньоном вашего ребёнка!',
      startAdventure: 'Начать Приключение',
      parentDashboard: 'Панель Родителя',
      setupProfile: 'Настроить Профиль',
      benefitsTitle: 'Польза для Вашего Ребёнка',
      phase1Title: 'Фаза 1: Открытие',
      phase1Desc: 'Экспедиция Тихих Ушек - Слушай мир вокруг себя',
      phase2Title: 'Фаза 2: Выражение',
      phase2Desc: 'Карнавал Хора Джунглей - Издавай звуки животных',
      phase3Title: 'Фаза 3: Творчество',
      phase3Desc: 'Семейный Ритм-Оркестр - Создавай музыкальные ритмы',
      benefit1: 'Снижает тревогу разлуки через вовлечение',
      benefit2: 'Развивает слуховое восприятие и внимание',
      benefit3: 'Поощряет голосовую уверенность и самовыражение',
      benefit4: 'Развивает творчество через звуковое исследование',
      benefit5: 'Обеспечивает эмоциональный комфорт в переходные моменты',
      benefit6: '100% конфиденциальность с локальной обработкой',
      explanationTitle: 'Как работает Sound Safari',
      explanationSubtitle: 'Простой и понятный путь, превращающий слушание в игру и поддержку.',
      explanationStep1Title: 'Слушай и находи',
      explanationStep1Desc: 'Эхо знакомит со звуком, а ребёнок ищет его вокруг себя.',
      explanationStep2Title: 'Повторяй и выражайся',
      explanationStep2Desc: 'Ребёнок имитирует звуки животных, развивая уверенность и речь.',
      explanationStep3Title: 'Создавай ритм',
      explanationStep3Desc: 'Хлопки и постукивания превращают эмоции в музыку.',
      explanationForParentsTitle: 'Для родителей',
      explanationForParents1: 'Настройте профиль один раз и запускайте сессии в любой момент.',
      explanationForParents2: 'В панели доступны прогресс и полученные значки.',
      explanationSafetyTitle: 'Безопасность и приватность',
      explanationSafety1: 'Детям не нужны аккаунты, нет рекламы и внешних ссылок.',
      explanationSafety2: 'Обработка звука происходит только на устройстве.'
    },
    
    dashboard: {
      title: 'Панель Родителя',
      setup: 'Настройки',
      comfort: 'Успокоение',
      insights: 'Аналитика',
      badges: 'Значки',
      childName: 'Имя ребёнка',
      childAge: 'Возраст (месяцев)',
      monthsOld: 'месяцев',
      saveProfile: 'Сохранить Профиль',
      recordComfort: 'Записать Успокаивающий Звук',
      recording: 'Запись...',
      parentVoice: 'Голос Родителя',
      musicBox: 'Музыкальная Шкатулка',
      whitenoise: 'Белый Шум',
      playSound: 'Воспроизвести',
      deleteSound: 'Удалить',
      sessionHistory: 'История Сессий',
      noSessions: 'Сессий пока нет',
      totalSessions: 'Всего Сессий',
      avgDuration: 'Средняя Продолжительность',
      soundsDiscovered: 'Звуков Открыто',
      totalEngagement: 'Общая Вовлечённость'
    },
    
    game: {
      phase: 'Фаза',
      score: 'Счёт',
      exit: 'Выйти',
      pause: 'Пауза',
      resume: 'Продолжить',
      volume: 'Громкость'
    },
    
    phases: {
      discovery: {
        title: 'Экспедиция Тихих Ушек',
        subtitle: 'Слушай звуки вокруг себя',
        soundsDiscovered: 'Звуков Открыто'
      },
      expression: {
        title: 'Хор Животных',
        subtitle: 'Изобрази животных',
        animalsImitated: 'Животных Изображено'
      },
      creation: {
        title: 'Ритмическое Сафари',
        subtitle: 'Создай свои ритмы',
        rhythmsCreated: 'Ритмов Создано'
      }
    },
    
    echo: {
      welcome: 'Привет! Я Эхо! Давай отправимся в Звуковое Сафари!',
      letsHear: 'Давай послушаем, что шепчет мир...',
      listenCarefully: 'Слушай внимательно... Слышишь',
      thatWas: 'Это был',
      amazing: 'Потрясающий слух!',
      greatJob: 'Отлично!',
      fantastic: 'Фантастика!',
      wonderful: 'Замечательно!',
      excellent: 'Превосходно!',
      nowLetsImitate: 'А теперь давай изобразим животных!',
      canYouMake: 'Можешь издать звук как',
      tryAgain: 'Попробуй ещё раз!',
      perfect: 'Идеально!',
      letsCreate: 'А теперь давай создадим ритмы!',
      tapRhythm: 'Отстучи свой ритм',
      creativeMind: 'Какая творческая личность!',
      completed: 'Ты прошёл все фазы! Потрясающая работа!'
    },
    
    comfort: {
      missParent: 'Скучаешь по маме/папе?',
      comeBackSoon: 'Они скоро вернутся!',
      stayStrong: 'У тебя всё отлично!',
      playComfort: 'Воспроизвести Успокаивающий Звук'
    },
    
    summary: {
      title: 'Приключение Завершено!',
      duration: 'Продолжительность',
      minutes: 'минут',
      soundsFound: 'Звуков Найдено',
      animalsImitated: 'Животных Изображено',
      rhythmsCreated: 'Ритмов Создано',
      newBadges: 'Новых Значков Получено',
      emotionalJourney: 'Эмоциональное Путешествие',
      playAgain: 'Играть Снова',
      backHome: 'На Главную'
    },
    
    badges: {
      firstSafari: {
        name: 'Первое Сафари',
        description: 'Завершить первое Звуковое Сафари!'
      },
      soundDetective: {
        name: 'Детектив Звуков',
        description: 'Открыть 25 разных звуков'
      },
      animalExpert: {
        name: 'Эксперт Животных',
        description: 'Изобразить 20 разных звуков животных'
      },
      rhythmMaster: {
        name: 'Мастер Ритма',
        description: 'Создать 15 уникальных ритмов'
      },
      braveExplorer: {
        name: 'Смелый Исследователь',
        description: 'Завершить 5 сессий сафари'
      },
      superListener: {
        name: 'Супер Слушатель',
        description: 'Открыть все звуки в одной фазе'
      },
      voiceChampion: {
        name: 'Чемпион Голоса',
        description: 'Успешно изобразить 10 животных подряд'
      },
      musicMaker: {
        name: 'Создатель Музыки',
        description: 'Создать ритм длительностью более 30 секунд'
      },
      safariVeteran: {
        name: 'Ветеран Сафари',
        description: 'Завершить 25 сессий'
      },
      comfortFriend: {
        name: 'Друг Утешения',
        description: 'Использовать успокаивающие звуки в 5 сессиях'
      }
    }
  }
};

// Sound names/descriptions translations
export interface SoundTranslations {
  displayName: string;
  description: string;
}

export const soundTranslations: Record<Language, Record<string, SoundTranslations>> = {
  en: {
    'clock-tick': {
      displayName: 'Tick-Tock Clock',
      description: 'The gentle ticking of a clock'
    },
    'fridge-hum': {
      displayName: 'Humming Refrigerator',
      description: 'The low hum of the fridge'
    },
    'water-drip': {
      displayName: 'Dripping Water',
      description: 'Drip... drip... drip...'
    },
    'wind-blow': {
      displayName: 'Gentle Wind',
      description: 'Whoooosh goes the wind'
    },
    'bird-chirp': {
      displayName: 'Bird Chirping',
      description: 'Tweet tweet from a little bird'
    },
    'door-creak': {
      displayName: 'Creaky Door',
      description: 'Creeeak! The door opens'
    },
    'rain-patter': {
      displayName: 'Rain Drops',
      description: 'Pitter patter on the window'
    },
    'phone-ring': {
      displayName: 'Phone Ringing',
      description: 'Ring ring! Time to answer'
    },
    'lion-roar': {
      displayName: 'Lion',
      description: 'ROOOAAAR! The mighty lion!'
    },
    'elephant-trumpet': {
      displayName: 'Elephant',
      description: 'PAAA-OOOOO! The elephant says hello!'
    },
    'monkey-chatter': {
      displayName: 'Monkey',
      description: 'Ooh ooh ah ah! The silly monkey!'
    },
    'snake-hiss': {
      displayName: 'Snake',
      description: 'Ssssss... The sneaky snake!'
    }
  },
  ru: {
    'clock-tick': {
      displayName: 'Часы Тик-Так',
      description: 'Нежное тиканье часов'
    },
    'fridge-hum': {
      displayName: 'Гудящий Холодильник',
      description: 'Низкий гул холодильника'
    },
    'water-drip': {
      displayName: 'Капающая Вода',
      description: 'Кап... кап... кап...'
    },
    'wind-blow': {
      displayName: 'Нежный Ветер',
      description: 'Шшшууууу дует ветер'
    },
    'bird-chirp': {
      displayName: 'Чирикающая Птичка',
      description: 'Чирик-чирик от маленькой птички'
    },
    'door-creak': {
      displayName: 'Скрипучая Дверь',
      description: 'Скрииип! Дверь открывается'
    },
    'rain-patter': {
      displayName: 'Капли Дождя',
      description: 'Кап-кап по окну'
    },
    'phone-ring': {
      displayName: 'Звонящий Телефон',
      description: 'Дзынь-дзынь! Пора отвечать'
    },
    'lion-roar': {
      displayName: 'Лев',
      description: 'РРРРРР! Могучий лев!'
    },
    'elephant-trumpet': {
      displayName: 'Слон',
      description: 'ПАААА-УУУУ! Слон приветствует!'
    },
    'monkey-chatter': {
      displayName: 'Обезьяна',
      description: 'У-у-а-а! Весёлая обезьянка!'
    },
    'snake-hiss': {
      displayName: 'Змея',
      description: 'Шшшшш... Хитрая змейка!'
    }
  }
};
