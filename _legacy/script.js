// База данных узлов
const ecoData = {
    helixa: {
        title: "Helixa (Ядро и Мозг)",
        sections: [
            {
                label: "Что это",
                text: "Наше проприетарное AI-ядро. Движок генерации «синтетических душ»."
            },
            {
                label: "Суть",
                text: "Это чистый, изолированный разум. Helixa отвечает за психологию (Big5), память (векторную и графовую), характер и принятие решений. Именно здесь работает Gatekeeper, который решает - ответить юзеру, проигнорировать скучный питч или кинуть в блок."
            },
            {
                label: "Бизнес-ценность",
                text: "Это наш «Intel Inside». Независимый, Cloud-Native микросервис, который мы можем подключать к любым будущим продуктам."
            }
        ],
        cta: "Подробнее",
        action: "link",
        link: "helixa.html",
        details: [
            "> ИНИЦИАЛИЗАЦИЯ ПОТОКА ДАННЫХ...",
            "> СТАТУС ЯДРА: АКТИВЕН",
            "> ВЫЧИСЛИТЕЛЬНАЯ ТЕКУЧЕСТЬ: 99.8%",
            "",

            "[ОПИСАНИЕ]:",
            "Helixa - это инфраструктурное ядро, которое делает искусственный интеллект по-настоящему человечным.",
            "Наша миссия - задать мировой стандарт создания ИИ-агентов, наделив их способностью понимать человеческую натуру, эмоции и контекст действий.",
            "Это идеальный фундамент для разработки сервисов, требующих максимальной эмпатии и глубокого когнитивного размышления.",
            "",

            "[КАК ЭТО РАБОТАЕТ]:",
            "Система формирует полноценную личность на базе векторных баз данных и графов, генерируя более 5000 параметров синтетических данных:",
            "- Демографический и социальный профиль.",
            "- Финансовое поведение и привычки.",
            "- Долгосрочная память и алгоритмы планирования.",
            "",

            "[МНОГОСТУПЕНЧАТАЯ ВЕРИФИКАЦИЯ]:",
            "Каждый сгенерированный агент проходит строгий контроль качества перед получением статуса «Готов к использованию»:",
            "- Психологические и когнитивные тесты.",
            "- Проверка памяти, знаний и устойчивости к деградации.",
            "- Комплексный тест Тьюринга.",
            "",

            "> ОЖИДАНИЕ НОВЫХ ВВОДОВ..."
        ]
    },
    vivida: {
        title: "Vivida (Агенты в реальном мире)",
        sections: [
            {
                label: "Что это",
                text: "Платформа для создания и управления автономными ИИ-инфлюенсерами."
            },
            {
                label: "Суть",
                text: "Если в Mimora ИИ-люди сидят в закрытой лаборатории, то Vivida выпускает их в реальный интернет. Платформа берёт личность из Helixa, добавляет узлы генерации медиаконтента (фото/видео) и позволяет ИИ-блогеру самостоятельно планировать контент-план, публиковать посты в соцсетях и общаться с живыми подписчиками, не выходя из образа."
            },
            {
                label: "Бизнес-ценность",
                text: "Автоматизированные виртуальные амбассадоры для брендов и медиа-компаний. Фабрика инфлюенсеров, которые никогда не устают и не требуют зарплату."
            }
        ],
        cta: "Подробнее",
        action: "link",
        link: "vivida.html"
    },
    mimora: {
        title: "Mimora (Среда и Физика)",
        sections: [
            {
                label: "Что это",
                text: "B2B SaaS-платформа для глубокой симуляции маркетинга и CustDev-а."
            },
            {
                label: "Суть",
                text: "Это «физика» мира. Mimora берёт мозги из Helixa и помещает их в управляемую песочницу. Она отвечает за интерфейс, задержки времени (статусы «печатает...»), очереди сообщений, дашборды, воронки конверсий и биллинг."
            },
            {
                label: "Бизнес-ценность",
                text: "Инструмент для брендов и маркетологов, позволяющий тестировать идеи, продукты и рекламные кампании на фокус-группах из 100% реалистичных ИИ-людей до того, как тратить реальные бюджеты."
            }
        ],
        cta: "Подробнее",
        action: "link",
        link: "mimora.html"
    },
    lyutik: {
        title: "Lyutik",
        desc: "Персональный ИИ-ассистент, финансовый эдвайзер и супервизор.",
        cta: "Подробнее",
        action: "link",
        link: "lyutik.html"
    },
    mixlink: {
        title: "MixLink",
        desc: "Конструктор профилей и онлайн-магазинов для ИИ-агентов и людей.",
        cta: "Подробнее",
        action: "link",
        link: "mixlink.html"
    },
    secret1: {
        title: "0xUNKNOWN",
        desc: "[Узел зашифрован] #&@!%*(_+~> 0x0000FF... Требуется уровень доступа: Helixa-Core.",
        cta: "Дешифровать",
        action: "encrypted"
    },
    secret2: {
        title: "0xUNKNOWN",
        desc: "[Узел зашифрован] #&@!%*(_+~> 0x011A88... Требуется уровень доступа: Helixa-Core.",
        cta: "Дешифровать",
        action: "encrypted"
    },
    secret3: {
        title: "0xUNKNOWN",
        desc: "[Узел зашифрован] #&@!%*(_+~> 0xFF00AA... Требуется уровень доступа: Helixa-Core.",
        cta: "Дешифровать",
        action: "encrypted"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node');
    const tooltip = document.getElementById('tooltip');
    const ttTitle = document.getElementById('tt-title');
    const ttDesc = document.getElementById('tt-desc');
    const ttCta = document.getElementById('tt-cta');
    
    // Элементы для параллакса
    const universe = document.querySelector('.universe');
    const system = document.querySelector('.system-container');
    
    // --- Audio System ---
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    
    function initAudio() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    // Браузеры требуют взаимодействия для включения звука
    document.body.addEventListener('click', initAudio, { once: true });
    document.body.addEventListener('mousemove', initAudio, { once: true });

    function playHoverSound() {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } catch(e) {}
    }
    
    function playGlitchSound() {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch(e) {}
    }

    let activeNodeData = null;
    let encryptInterval = null;
    let hideTimeout = null;
    
    // Набор символов для Матричного/Glitch эффекта
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}!~+';
    
    // Функция скрытия тултипа
    function closeTooltip() {
        tooltip.classList.remove('visible', 'tooltip--rich');
        tooltip.classList.add('hidden');
        clearInterval(encryptInterval);
        activeNodeData = null;
    }
    
    function getTooltipWidth(data) {
        return data.sections ? 380 : 280;
    }

    function fillTooltip(data) {
        ttTitle.innerText = data.title;
        ttCta.innerText = data.cta;
        ttCta.className = 'cta-btn';

        if (data.sections) {
            tooltip.classList.add('tooltip--rich');
            ttDesc.innerHTML = data.sections.map((section) => (
                `<div class="tooltip-block">` +
                `<span class="tooltip-block__label">${section.label}:</span>` +
                `<p>${section.text}</p>` +
                `</div>`
            )).join('');
            return;
        }

        tooltip.classList.remove('tooltip--rich');
        if (data.action === 'encrypted') {
            runEncryption(data.desc);
            return;
        }

        ttDesc.textContent = data.desc;
    }

    // Функция запуска визуального шифрования
    function runEncryption(finalText) {
        clearInterval(encryptInterval);
        
        let iteration = 0;
        const speed = 30; // ms
        
        // Сначала генерируем случайную строку той же длины
        ttDesc.innerText = finalText.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        
        encryptInterval = setInterval(() => {
            ttDesc.innerText = finalText
                .split('')
                .map((letter, index) => {
                    // Постепенно открываем реальный текст
                    if (index < iteration) return letter;
                    // Для нераскрытых позиций показываем шум
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
                
            if (iteration >= finalText.length) {
                clearInterval(encryptInterval);
            }
            
            // Скорость раскрытия (1/2 символа за тик)
            iteration += 0.5;
        }, speed);
    }

    nodes.forEach(node => {
        // Десктопное поведение (Hover)
        node.addEventListener('mouseenter', (e) => {
            // Если мобильный, игнорируем hover
            if (window.innerWidth <= 768) return; 

            clearTimeout(hideTimeout);
            const id = node.getAttribute('data-id');
            if(!id) return;
            
            const data = ecoData[id];
            activeNodeData = data;
            
            const rect = node.getBoundingClientRect();
            const tooltipWidth = getTooltipWidth(data);
            let leftPos = rect.right + 20;
            let topPos = rect.top - 20;

            if (leftPos + tooltipWidth > window.innerWidth) {
                leftPos = rect.left - tooltipWidth - 20;
            }
            const maxHeight = data.sections ? 420 : 220;
            if (topPos + maxHeight > window.innerHeight) {
                topPos = window.innerHeight - maxHeight - 20;
            }
            if (topPos < 20) {
                topPos = 20;
            }

            tooltip.style.left = leftPos + 'px';
            tooltip.style.top = topPos + 'px';

            clearInterval(encryptInterval);
            fillTooltip(data);

            if (data.action === 'encrypted') {
                playGlitchSound();
            } else {
                playHoverSound();
            }
            
            tooltip.classList.remove('hidden');
            tooltip.classList.add('visible');
        });
        
        node.addEventListener('mouseleave', () => {
            if (window.innerWidth <= 768) return;
            // Даем 150ms чтобы мышь могла перейти с узла на сам тултип
            hideTimeout = setTimeout(closeTooltip, 150); 
        });
        
        // Мобильное поведение (Click/Tap)
        node.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return;
            
            const id = node.getAttribute('data-id');
            if (!id) return;
            
            const data = ecoData[id];
            activeNodeData = data;
            
            clearInterval(encryptInterval);
            fillTooltip(data);

            tooltip.classList.remove('hidden');
            tooltip.classList.add('visible');
        });
    });
    
    // Поддержка ховера на самом тултипе (чтобы он не пропадал, когда мы читаем или кликаем CTA на десктопе)
    tooltip.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return;
        clearTimeout(hideTimeout);
    });
    tooltip.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) return;
        hideTimeout = setTimeout(closeTooltip, 150);
    });
    
    // Логика кликов по кнопке (CTA)
    ttCta.addEventListener('click', () => {
        if (!activeNodeData) return;
        
        if (activeNodeData.action === 'url') {
            window.location.href = activeNodeData.url;
        } else if (activeNodeData.action === 'link') {
            window.location.href = activeNodeData.link;
        } else if (activeNodeData.action === 'modal') {
            openTerminalModal(activeNodeData);
        } else if (activeNodeData.action === 'soon') {
            // Заглушка "Скоро"
            const originalText = activeNodeData.cta;
            ttCta.innerText = "Скоро (Coming soon)";
            
            // Возврат оригинального текста через 2 секунды
            setTimeout(() => {
                if(ttCta.innerText === "Скоро (Coming soon)") {
                    ttCta.innerText = originalText;
                }
            }, 2000);
        } else if (activeNodeData.action === 'encrypted') {
            // Ошибка дешифровки / Matrix эффект кнопки
            ttCta.innerText = "ERR_ENCRYPTED";
            ttCta.classList.add('error');
            
            let glitchCount = 0;
            const glitchInt = setInterval(() => {
                ttCta.innerText = Array(12).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
                glitchCount++;
                if(glitchCount > 10) {
                    clearInterval(glitchInt);
                    ttCta.innerText = "ACCESS DENIED";
                }
            }, 50);
            
            // Сброс через время (но так как это секрет, можно оставить на ACCESS DENIED до перенаведения)
            setTimeout(() => {
                ttCta.innerText = activeNodeData.cta;
                ttCta.classList.remove('error');
            }, 3000);
        }
    });

    // Скрытие карточки на мобильных устройствах при клике "мимо"
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            // Если клик не в тултипе и не по узлу экосистемы - закрываем тултип
            if (!tooltip.contains(e.target) && !e.target.closest('.node')) {
                closeTooltip();
            }
        }
    });

    // --- Modal Terminal Logic ---
    const projectModal = document.getElementById('project-modal');
    const modalTitleElem = document.getElementById('modal-title');
    const modalBodyElem = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');
    let typeWriterInterval = null;

    function openTerminalModal(data) {
        closeTooltip();
        system.classList.add('blurred'); // Размытие фона космоса
        
        modalTitleElem.innerText = data.title;
        modalBodyElem.innerHTML = '';
        projectModal.classList.add('active');
        
        if (data.details && data.details.length > 0) {
            let lineIndex = 0;
            typeWriterInterval = setInterval(() => {
                if (lineIndex >= data.details.length) {
                    clearInterval(typeWriterInterval);
                    return;
                }
                const p = document.createElement('p');
                p.className = 'terminal-line';
                
                const text = data.details[lineIndex];
                if (text.startsWith('>')) {
                    p.style.color = '#ffffff';
                    p.style.fontWeight = 'bold';
                    if (typeof playHoverSound === 'function') playHoverSound();
                } else if (text.startsWith('[')) {
                    p.style.color = '#ffffff';
                    p.style.textDecoration = 'underline';
                }
                
                p.innerText = text || '\u00A0'; // Неразрывный пробел для пустых строк
                modalBodyElem.appendChild(p);
                
                modalBodyElem.scrollTop = modalBodyElem.scrollHeight; // Автоскролл
                lineIndex++;
            }, 300); // Скорость печати
        }
    }

    function closeTerminalModal() {
        clearInterval(typeWriterInterval);
        projectModal.classList.remove('active');
        system.classList.remove('blurred');
    }

    modalCloseBtn.addEventListener('click', closeTerminalModal);
    
    // Закрытие по клику вне контента модалки
    projectModal.addEventListener('click', (e) => {
        if(e.target === projectModal) {
            closeTerminalModal();
        }
    });

    // Флаг загрузки для параллакса, чтобы предотвратить конфликт CSS animation и JS transform
    let bootFinished = false;
    setTimeout(() => { bootFinished = true; }, 2000);

    // 3D Parallax эффект слежения за мышью
    universe.addEventListener('mousemove', (e) => {
        if (!bootFinished || window.innerWidth <= 768) return; // Отключаем на мобилках или во время анимации загрузки

        // Вычисляем отклонение курсора от центра экрана (с коэффициентом плавности 40)
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40; 
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40; 
        
        system.style.transform = `scale(0.65) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Плавный возврат в центр, если убрали мышь с экрана
    universe.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            system.style.transition = `transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)`;
            system.style.transform = `scale(0.65) rotateY(0deg) rotateX(0deg)`;
        }
    });
    
    // Сброс transition при возвращении мыши для отзывчивости
    universe.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            system.style.transition = `transform 0.1s ease-out`;
        }
    });
});
