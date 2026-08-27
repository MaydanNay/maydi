/** Site copy: ru (default) + en */

import { PARTNER_PHOTOS } from '../data/content.js';

const projectsRu = {
  helixa: {
    role: 'Ядро экосистемы',
    summary:
      'Проприетарное AI-ядро: психология, гибридная память и Gatekeeper для автономных агентов.',
    problem: 'Дать продуктам устойчивые цифровые личности вместо шаблонных чат-ботов.',
  },
  mimora: {
    role: 'Симуляция маркетинга',
    summary:
      'B2B SaaS для CustDev и кампаний на синтетических аудиториях до реальных бюджетов.',
    problem: 'Снизить риск слепых гипотез: тестировать смыслы на реалистичных ИИ-фокус-группах.',
  },
  vivida: {
    role: 'AI-инфлюенсеры',
    summary:
      'Платформа автономных медиа-агентов: контент, публикация и диалог с аудиторией.',
    problem: 'Масштабировать бренд-амбассадоров без выгорания и дрейфа роли.',
  },
  lyutik: {
    role: 'Персональный ассистент',
    summary: 'ИИ-эдвайзер и супервизор для личных и операционных решений.',
    problem: 'Свести разрозненные задачи в одного персонального агента с характером.',
  },
  mixlink: {
    role: 'Профили и витрины',
    summary: 'Конструктор профилей и витрин для людей и ИИ-агентов.',
    problem: 'Быстро упаковать присутствие агента или бренда в единый публичный профиль.',
  },
};

const projectsEn = {
  helixa: {
    role: 'Ecosystem core',
    summary:
      'Proprietary AI core: psychology, hybrid memory and Gatekeeper for autonomous agents.',
    problem: 'Give products durable digital personalities instead of template chatbots.',
  },
  mimora: {
    role: 'Marketing simulation',
    summary:
      'B2B SaaS for CustDev and campaigns on synthetic audiences before real budgets.',
    problem: 'Cut blind-hypothesis risk: test messaging on realistic AI focus groups.',
  },
  vivida: {
    role: 'AI influencers',
    summary:
      'Platform for autonomous media agents: content, publishing and audience dialogue.',
    problem: 'Scale brand ambassadors without burnout or role drift.',
  },
  lyutik: {
    role: 'Personal assistant',
    summary: 'AI advisor and supervisor for personal and operational decisions.',
    problem: 'Unify scattered tasks into one personal agent with character.',
  },
  mixlink: {
    role: 'Profiles & storefronts',
    summary: 'Profile and storefront builder for people and AI agents.',
    problem: 'Package an agent or brand presence into one public profile fast.',
  },
};

const masterplanRu = [
  {
    id: 'phase-01',
    number: '01',
    tag: 'Genesis / Сегодня',
    title: 'Enterprise Core',
    text: 'Внедряем ядро Helixa и AI-тулзы в реальный B2B сектор. Генерируем кэшфлоу и обкатываем архитектуру гибридной памяти на живых бизнес-данных.',
  },
  {
    id: 'phase-02',
    number: '02',
    tag: 'Synthetic Market / 1–2 года',
    title: 'Запуск mimora',
    text: 'Переворачиваем рынок CustDev. Компании прекращают слепые тесты и переносят проверку продуктовых гипотез в нашу симуляцию.',
  },
  {
    id: 'phase-03',
    number: '03',
    tag: 'Media Autonomy / 3 года',
    title: 'Развертывание vivida',
    text: 'Выход в медиа. Платформа берет на себя генерацию, публикацию и диалог с аудиторией, создавая автономных AI-инфлюенсеров.',
  },
  {
    id: 'phase-04',
    number: '04',
    tag: 'Personal Layer / 5 лет',
    title: 'Масштабирование Lyutik',
    text: 'Переход в B2C. Персональные AI-эдвайзеры с эмпатией становятся супервизорами для личных и операционных решений каждого человека.',
  },
  {
    id: 'phase-05',
    number: '05',
    tag: 'The New Digital Physics / 10 лет',
    title: 'Глобальный стандарт',
    text: 'AI перестает быть инструментом и становится мыслящим партнером. Симуляция реальности — фундамент для прогнозирования бизнеса и жизни.',
  },
];

const masterplanEn = [
  {
    id: 'phase-01',
    number: '01',
    tag: 'Genesis / Today',
    title: 'Enterprise Core',
    text: 'Shipping the Helixa core and AI tools into real B2B. Generating cashflow and stress-testing hybrid memory on live business data.',
  },
  {
    id: 'phase-02',
    number: '02',
    tag: 'Synthetic Market / 1–2 years',
    title: 'Launch mimora',
    text: 'Flip the CustDev market. Companies stop blind tests and move product-hypothesis validation into our simulation.',
  },
  {
    id: 'phase-03',
    number: '03',
    tag: 'Media Autonomy / 3 years',
    title: 'Deploy vivida',
    text: 'Enter media. The platform owns generation, publishing and audience dialogue — autonomous AI influencers.',
  },
  {
    id: 'phase-04',
    number: '04',
    tag: 'Personal Layer / 5 years',
    title: 'Scale Lyutik',
    text: 'Move into B2C. Empathic personal AI advisors become supervisors for every person’s life and ops decisions.',
  },
  {
    id: 'phase-05',
    number: '05',
    tag: 'The New Digital Physics / 10 years',
    title: 'Global standard',
    text: 'AI stops being a tool and becomes a thinking partner. Reality simulation becomes the base for forecasting business and life.',
  },
];

const logsRu = [
  {
    date: '2026-06',
    tag: 'Helixa',
    text: 'Deployed rescue_eliz.py. Успешно гидрировали сущности агентов и устранили "зомби"-состояния в архитектуре.',
  },
  {
    date: '2026-06',
    tag: 'Lyutik',
    text: 'Интегрирована предиктивная аналитика предстоящих расходов (upcoming expenses) и проекций баланса.',
  },
  {
    date: '2026-05',
    tag: 'Infrastructure',
    text: 'Переход на бизнес-поддержку Yandex Cloud для масштабирования RAG-узлов.',
  },
  {
    date: '2026-04',
    tag: 'Release',
    text: 'Автономный AI-Суфлёр для Telegram выведен в production.',
  },
];

const logsEn = [
  {
    date: '2026-06',
    tag: 'Helixa',
    text: 'Deployed rescue_eliz.py. Successfully hydrated agent entities and removed zombie states in the architecture.',
  },
  {
    date: '2026-06',
    tag: 'Lyutik',
    text: 'Integrated predictive analytics for upcoming expenses and balance projections.',
  },
  {
    date: '2026-05',
    tag: 'Infrastructure',
    text: 'Moved to Yandex Cloud business support to scale RAG nodes.',
  },
  {
    date: '2026-04',
    tag: 'Release',
    text: 'Autonomous AI Prompter for Telegram shipped to production.',
  },
];

export const dictionaries = {
  ru: {
    nav: {
      manifesto: 'Манифест',
      ecosystem: 'Ecosystem',
      enterprise: 'Enterprise',
      partners: 'Команда',
      masterplan: 'Masterplan',
      pitch: 'Pitch Deck',
      dataRoom: 'DataRoom',
      aria: 'Главная навигация',
      menu: 'Меню',
      close: 'Закрыть',
    },
    lang: {
      ru: 'RU',
      en: 'EN',
      switch: 'Язык',
    },
    hero: {
      lead: 'Мы строим AI, который понимает человеческую природу, чтобы заложить фундамент новой цифровой эпохи.',
    },
    bridge: {
      text: 'Технологии стали безупречными, но слишком холодными. Корпорации относятся к людям как к набору данных, а к AI — как к слепому калькулятору. Мы отказались играть по этим правилам. Поэтому мы объединили хардкорную инженерию и глубокую эстетику, чтобы создать системы нового порядка.',
    },
    founders: {
      kicker: 'The Founders',
      title: 'Кто мы',
      hint: 'Наведите на карточку слева или справа',
      leftLabel: 'Слева · CEO & CTO',
      rightLabel: 'Справа · CDO',
      photo: 'тут изображение нас размер изображение 9 на 16',
      people: [
        {
          name: 'Maidan Naymanov',
          title: 'Founder, CEO & CTO',
          text: 'Я не просто пишу код — я создаю архитектуру, которая умеет думать. Проектирую сложные RAG-системы, интегрирую LLM и строю гибридную память, чтобы машины обрели контекст и логику.',
        },
        {
          name: 'Diana Bushanskaya',
          title: 'Founder & CDO',
          text: 'Я превращаю сложную технологию в язык, который чувствуешь с первой секунды. Создаю визуальную правду продуктов: от UI/UX до глобального брендинга. Потому что технология без эстетики мертва.',
        },
      ],
    },
    projects: {
      kicker: 'Ecosystem',
      title: 'Карта нашей воли',
      subtitle:
        'Наши продукты — это не разрозненные SaaS. Это единая живая экосистема, где Helixa выступает в роли сердца, а остальные проекты вращаются вокруг, решая задачи новой цифровой реальности.',
      statusLive: 'В работе',
      statusBuild: 'В разработке',
      mapKicker: 'Ecosystem',
      mapText:
        'Вся наша архитектура вращается вокруг единого ядра. Изучите, как взаимодействуют агенты и продукты на интерактивной карте.',
      mapCta: 'Запустить карту экосистемы',
      readMore: 'Подробнее',
      items: projectsRu,
    },
    masterplan: {
      title: 'Masterplan',
      phases: masterplanRu,
    },
    studio: {
      kicker: 'Enterprise · R&D',
      title: 'Столкновение с реальностью (Enterprise R&D)',
      p1: 'Мы не живем в вакууме. Чтобы наши автономные агенты и AI-архитектуры работали безупречно, мы обкатываем их на реальном бизнесе. Мы берем в работу ограниченное число сложных Enterprise-задач, чтобы тестировать гипотезы и внедрять наше ядро в реальные условия.',
      p2: 'За нашими архитектурами стоит отлаженный механизм: сильная инхаус-команда (от жесткого проектного менеджмента до геймдева и визуального контента) и выстроенная партнерская сеть по B2B-продажам в СНГ. Мы знаем, как не только создавать сложные алгоритмы, но и дистрибутировать их на реальные рынки.',
      cta: 'Enterprise-интеграции',
    },
    partners: {
      kicker: 'Team · Partners',
      title: 'С кем мы работаем',
      subtitle:
        'In-house команда и партнёры, которые закрывают delivery, инженерию, визуал и выход на B2B-рынки.',
      typeInhouse: 'In-house',
      typePartner: 'Партнёр',
      people: [
        {
          id: 'partner-kamila',
          name: 'Kamila Chintasova',
          role: 'Chief Operating Officer',
          type: 'inhouse',
          photo: PARTNER_PHOTOS.kamila,
          description:
            'Отвечает за операционное управление maydi: процессы, приоритеты и синхронизацию продукта, delivery и партнёрской сети.',
        },
        {
          id: 'partner-belek',
          name: 'Belek Sadakbek',
          role: 'Chief Sales Partner',
          type: 'partner',
          photo: PARTNER_PHOTOS.belek,
          photoPosition: '64% 40%',
          description:
            'Партнёр по операционному развитию и B2B-связям. Усиливает delivery-команду и помогает выстраивать устойчивые партнёрские контуры.',
        },
        {
          id: 'partner-malika',
          name: 'Malika Igibayeva',
          role: 'Партнёр',
          type: 'partner',
          photo: PARTNER_PHOTOS.malika,
          description:
            'Партнёр по развитию направлений и выходу на новые рынки. Помогает связывать продуктовую стратегию maydi с реальными возможностями роста.',
        },
      ],
    },
    logs: {
      kicker: 'Engineering',
      title: 'Engineering Logs',
      hint: '// maydi · commit history · read-only',
      entries: logsRu,
    },
    global: {
      kicker: 'Geography',
      title: 'Global',
      text: 'Масштаб не имеет физических границ. Находясь прямо сейчас в Дананге и оперируя в международном правовом поле (AIFC), мы строим мост на рынки Азии и Южной Кореи. maydi — это компания, которая рождается на стыке культур и технологий. Мы строим компанию глобального значения.',
      infra:
        'Infrastructure & Backing: Вычислительные мощности и развертывание наших RAG-систем обеспечены выделенным грантом от Yandex Cloud.',
    },
    footer: {
      tagline: 'Экосистема · Надежность · Стремление',
      navAria: 'Навигация',
      contactAria: 'Контакты',
      products: 'Продукты',
      ecosystem: 'Экосистема',
      contacts: 'Контакты',
      mail: 'Почта',
      pitch: 'Запросить Pitch Deck (Seed Round)',
      dataRoom: 'Запросить доступ к DataRoom',
      demo: 'Запросить демо Enterprise-ядра',
    },
    dataRoom: {
      kicker: 'Investor materials',
      title: 'Запрос доступа к DataRoom',
      close: 'Закрыть',
      name: 'Имя / Компания',
      contact: 'Telegram / Email',
      note: 'Комментарий',
      notePlaceholder: 'Кратко: кто вы и зачем нужен DataRoom',
      submit: 'Отправить заявку',
      sent: 'Заявка сформирована — откройте почтовый клиент, чтобы отправить.',
    },
    ecosystemPage: {
      hint: 'Нажмите на узел',
      back: '← maydi',
    },
    error: {
      kicker: 'Ошибка',
      code: '404',
      text: 'Страница не найдена или была перемещена.',
      home: 'На главную',
    },
    modal: {
      close: 'Закрыть',
      description: 'Описание',
      problem: 'Задача',
      stack: 'Стек',
    },
  },
  en: {
    nav: {
      manifesto: 'Manifesto',
      ecosystem: 'Ecosystem',
      enterprise: 'Enterprise',
      partners: 'Team',
      masterplan: 'Masterplan',
      pitch: 'Pitch Deck',
      dataRoom: 'DataRoom',
      aria: 'Main navigation',
      menu: 'Menu',
      close: 'Close',
    },
    lang: {
      ru: 'RU',
      en: 'EN',
      switch: 'Language',
    },
    hero: {
      lead: 'We build AI that understands human nature — to lay the foundation of a new digital era.',
    },
    bridge: {
      text: 'Technology became flawless — and too cold. Corporations treat people as datasets and AI as a blind calculator. We refused to play by those rules. So we fused hardcore engineering with deep aesthetics to build systems of a new order.',
    },
    founders: {
      kicker: 'The Founders',
      title: 'Who we are',
      hint: 'Hover the card on the left or on the right',
      leftLabel: 'Left · CEO & CTO',
      rightLabel: 'Right · CDO',
      photo: 'founder portrait placeholder 9:16',
      people: [
        {
          name: 'Maidan Naymanov',
          title: 'Founder, CEO & CTO',
          text: 'I don’t just write code — I build architectures that can think. I design complex RAG systems, integrate LLMs and shape hybrid memory so machines gain context and logic.',
        },
        {
          name: 'Diana Bushanskaya',
          title: 'Founder & CDO',
          text: 'I turn hard technology into a language you feel from the first second. I create the visual truth of products: from UI/UX to global branding. Because technology without aesthetics is dead.',
        },
      ],
    },
    projects: {
      kicker: 'Ecosystem',
      title: 'Map of our will',
      subtitle:
        'Our products are not scattered SaaS. They are one living ecosystem where Helixa is the heart and the rest orbit it — solving the next digital reality.',
      statusLive: 'Live',
      statusBuild: 'In build',
      mapKicker: 'Ecosystem',
      mapText:
        'Our whole architecture spins around one core. Explore how agents and products interact on the live map.',
      mapCta: 'Open ecosystem map',
      readMore: 'Read more',
      items: projectsEn,
    },
    masterplan: {
      title: 'Masterplan',
      phases: masterplanEn,
    },
    studio: {
      kicker: 'Enterprise · R&D',
      title: 'Collision with reality (Enterprise R&D)',
      p1: 'We don’t live in a vacuum. To keep our autonomous agents and AI architectures sharp, we run them against real business. We take a limited number of hard Enterprise problems to test hypotheses and plant our core in the wild.',
      p2: 'Behind our architectures sits a tuned machine: a strong in-house team (from hard project management to gamedev and visual content) and a built B2B sales partner network across CIS. We know how to invent complex algorithms — and how to distribute them into real markets.',
      cta: 'Enterprise integrations',
    },
    partners: {
      kicker: 'Team · Partners',
      title: 'Who we work with',
      subtitle:
        'In-house team and partners covering delivery, engineering, visual craft, and B2B go-to-market.',
      typeInhouse: 'In-house',
      typePartner: 'Partner',
      people: [
        {
          id: 'partner-kamila',
          name: 'Kamila Chintasova',
          role: 'Chief Operating Officer',
          type: 'inhouse',
          photo: PARTNER_PHOTOS.kamila,
          description:
            'Owns maydi operations: processes, priorities, and sync across product, delivery, and the partner network.',
        },
        {
          id: 'partner-belek',
          name: 'Belek Sadakbek',
          role: 'Chief Sales Partner',
          type: 'partner',
          photo: PARTNER_PHOTOS.belek,
          photoPosition: '64% 40%',
          description:
            'Partner for operations and B2B relationships. Strengthens delivery and helps build durable partner networks.',
        },
        {
          id: 'partner-malika',
          name: 'Malika Igibayeva',
          role: 'Partner',
          type: 'partner',
          photo: PARTNER_PHOTOS.malika,
          description:
            'Partner for growth strategy and new market entry. Connects maydi product direction with real expansion opportunities.',
        },
      ],
    },
    logs: {
      kicker: 'Engineering',
      title: 'Engineering Logs',
      hint: '// maydi · commit history · read-only',
      entries: logsEn,
    },
    global: {
      kicker: 'Geography',
      title: 'Global',
      text: 'Scale has no physical borders. Based in Da Nang and operating under international law (AIFC), we build a bridge into Asia and South Korea. maydi is a company born at the seam of cultures and technology. We are building a company of global weight.',
      infra:
        'Infrastructure & Backing: Compute and deployment of our RAG systems are powered by a dedicated Yandex Cloud grant.',
    },
    footer: {
      tagline: 'Ecosystem · Reliability · Ambition',
      navAria: 'Navigation',
      contactAria: 'Contact',
      products: 'Products',
      ecosystem: 'Ecosystem',
      contacts: 'Contacts',
      mail: 'Email',
      pitch: 'Request Pitch Deck (Seed Round)',
      dataRoom: 'Request DataRoom access',
      demo: 'Request Enterprise core demo',
    },
    dataRoom: {
      kicker: 'Investor materials',
      title: 'Request DataRoom access',
      close: 'Close',
      name: 'Name / Company',
      contact: 'Telegram / Email',
      note: 'Note',
      notePlaceholder: 'Briefly: who you are and why you need DataRoom',
      submit: 'Submit request',
      sent: 'Request drafted — finish sending in your email client.',
    },
    ecosystemPage: {
      hint: 'Click a node',
      back: '← maydi',
    },
    error: {
      kicker: 'Error',
      code: '404',
      text: 'Page not found or has been moved.',
      home: 'Back home',
    },
    modal: {
      close: 'Close',
      description: 'Description',
      problem: 'Problem',
      stack: 'Stack',
    },
  },
};
