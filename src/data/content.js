/** Partner / team portrait paths (public/assets). */
import { ASSETS } from './assets.js';

export const PARTNER_PHOTOS = {
  malika: ASSETS.malika,
  belek: ASSETS.belek,
  kamila: ASSETS.kamila,
};

/** Ecosystem products (interactive graph + sidebar). */
export const PROJECTS = {
  helixa: {
    id: 'helixa',
    label: 'Helixa',
    role: 'Ядро экосистемы',
    status: 'live',
    summary:
      'Проприетарное AI-ядро: психология, гибридная память и Gatekeeper для автономных агентов.',
    stack: ['Python', 'LLM / RAG', 'Neo4j', 'Qdrant', 'K8s'],
    problem: 'Дать продуктам устойчивые цифровые личности вместо шаблонных чат-ботов.',
    preview: { image: ASSETS.helixa },
  },
  mimora: {
    id: 'mimora',
    label: 'mimora',
    role: 'Симуляция маркетинга',
    status: 'live',
    summary:
      'B2B SaaS для CustDev и кампаний на синтетических аудиториях до реальных бюджетов.',
    stack: ['Synthetic Data', 'Behavior Simulation', 'ClickHouse', 'Helixa API'],
    problem: 'Снизить риск слепых гипотез: тестировать смыслы на реалистичных ИИ-фокус-группах.',
    preview: { image: ASSETS.mimora, href: 'https://mimora.io/' },
  },
  vivida: {
    id: 'vivida',
    label: 'vivida',
    role: 'AI-инфлюенсеры',
    status: 'live',
    summary:
      'Платформа автономных медиа-агентов: контент, публикация и диалог с аудиторией.',
    stack: ['Media pipelines', 'Social APIs', 'Helixa personas'],
    problem: 'Масштабировать бренд-амбассадоров без выгорания и дрейфа роли.',
  },
  lyutik: {
    id: 'lyutik',
    label: 'Lyutik',
    role: 'Персональный ассистент',
    status: 'build',
    summary: 'ИИ-эдвайзер и супервизор для личных и операционных решений.',
    stack: ['LLM agents', 'Memory', 'Tools'],
    problem: 'Свести разрозненные задачи в одного персонального агента с характером.',
    preview: { image: ASSETS.lyutik },
  },
  mixlink: {
    id: 'mixlink',
    label: 'mixlink',
    role: 'Профили и витрины',
    status: 'build',
    summary: 'Конструктор профилей и витрин для людей и ИИ-агентов.',
    stack: ['Decentralized UI', 'Identity', 'Commerce surfaces'],
    problem: 'Быстро упаковать присутствие агента или бренда в единый публичный профиль.',
  },
};

export const FOUNDERS = [
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
];

/** External studio services (not product expertise). */
export const STUDIO_SERVICES = [
  {
    title: 'AI & RAG Интеграции',
    text: 'Внедрение умных агентов и автоматизация продаж (например, AI-тулзы для Telegram).',
  },
  {
    title: 'Full-stack Разработка',
    text: 'От архитектуры баз данных (PostgreSQL) до сложного фронтенда на React.',
  },
  {
    title: 'Комплексный Брендинг',
    text: 'Упаковка продуктов, дизайн-системы и контентное сопровождение проектов.',
  },
];

export const GLOBAL_VECTOR =
  'Масштаб не имеет физических границ. Находясь прямо сейчас в Дананге и оперируя в международном правовом поле (AIFC), мы строим мост на рынки Азии и Южной Кореи. maydi — это компания, которая рождается на стыке культур и технологий. Мы строим компанию глобального значения.';

export const GLOBAL_INFRA =
  'Infrastructure & Backing: Вычислительные мощности и развертывание наших RAG-систем обеспечены выделенным грантом от Yandex Cloud.';

export const MASTERPLAN = [
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

export const ENGINEERING_LOGS = [
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

export const IMAGE_PLACEHOLDER_LABEL =
  'тут изображение вас размер изображение 16 на 9';
