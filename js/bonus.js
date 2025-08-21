// DADOS DO USUÁRIO
let userData = {
    coins: 250,
    level: 1,
    exp: 120,
    streak: 7,
    lastLogin: null,
    totalCoinsEarned: 1250,
    achievementsUnlocked: 8,
    daysActive: 15,
    achievements: {}
};

// CONQUISTAS DISPONÍVEIS
const achievements = {
    firstChat: {
        id: 'firstChat',
        name: 'Primeira Conversa',
        description: 'Inicie sua primeira conversa com um personagem',
        icon: '💬',
        reward: 25,
        target: 1,
        current: 1,
        unlocked: true,
        claimed: true
    },
    chatStreak: {
        id: 'chatStreak',
        name: 'Conversador Dedicado',
        description: 'Mantenha uma sequência de 7 dias de conversas',
        icon: '🔥',
        reward: 100,
        target: 7,
        current: 7,
        unlocked: true,
        claimed: false
    },
    characterCreator: {
        id: 'characterCreator',
        name: 'Criador de Personagens',
        description: 'Crie seu primeiro personagem personalizado',
        icon: '🎭',
        reward: 50,
        target: 1,
        current: 0,
        unlocked: false,
        claimed: false
    },
    socialButterfly: {
        id: 'socialButterfly',
        name: 'Borboleta Social',
        description: 'Converse com 10 personagens diferentes',
        icon: '🦋',
        reward: 75,
        target: 10,
        current: 6,
        unlocked: false,
        claimed: false
    },
    nightOwl: {
        id: 'nightOwl',
        name: 'Coruja Noturna',
        description: 'Faça login entre 22:00 e 06:00',
        icon: '🦉',
        reward: 30,
        target: 1,
        current: 0,
        unlocked: false,
        claimed: false
    },
    collector: {
        id: 'collector',
        name: 'Colecionador de Moedas',
        description: 'Acumule 1000 moedas',
        icon: '💰',
        reward: 200,
        target: 1000,
        current: 250,
        unlocked: false,
        claimed: false
    }
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    updateDisplay();
    checkDailyBonus();
    loadAchievements();
    generateStreakCalendar();
    startDailyTimer();
});

function loadUserData() {
    try {
        const saved = localStorage.getItem('chatPersonas_userData');
        if (saved) {
            userData = { ...userData, ...JSON.parse(saved) };
        }

        // Carregar conquistas específicas
        const savedAchievements = localStorage.getItem('chatPersonas_achievements');
        if (savedAchievements) {
            const parsed = JSON.parse(savedAchievements);
            Object.keys(achievements).forEach(key => {
                if (parsed[key]) {
                    achievements[key] = { ...achievements[key], ...parsed[key] };
                }
            });
        }
    } catch (e) {
        console.log('Usando dados padrão');
    }
}

function saveUserData() {
    try {
        localStorage.setItem('chatPersonas_userData', JSON.stringify(userData));
        localStorage.setItem('chatPersonas_achievements', JSON.stringify(achievements));
    } catch (e) {
        console.log('Dados salvos em memória');
    }
}

function updateDisplay() {
    document.getElementById('userCoins').textContent = userData.coins;
    document.getElementById('userLevel').textContent = userData.level;
    document.getElementById('streakNumber').textContent = userData.streak;
    document.getElementById('totalCoinsEarned').textContent = userData.totalCoinsEarned.toLocaleString();
    document.getElementById('totalExp').textContent = userData.exp;
    document.getElementById('achievementsUnlocked').textContent = userData.achievementsUnlocked;
    document.getElementById('daysActive').textContent = userData.daysActive;
}

function checkDailyBonus() {
    const today = new Date().toDateString();
    const lastLogin = userData.lastLogin;
    const dailyButton = document.getElementById('dailyButton');
    const dailyTimer = document.getElementById('dailyTimer');
    const dailyIcon = document.getElementById('dailyIcon');

    if (lastLogin === today) {
        // Já coletou hoje
        dailyButton.textContent = 'Já Coletado Hoje';
        dailyButton.disabled = true;
        dailyIcon.textContent = '✅';

        // Mostrar countdown para próximo bônus
        updateDailyTimer();
    } else {
        // Pode coletar
        dailyButton.textContent = 'Recolher Recompensa';
        dailyButton.disabled = false;
        dailyIcon.textContent = '🎁';
        dailyTimer.textContent = 'Disponível agora!';
    }
}

function claimDailyBonus() {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Calcular streak
    if (userData.lastLogin === yesterday.toDateString()) {
        userData.streak += 1;
    } else if (userData.lastLogin !== today) {
        userData.streak = 1;
    }

    // Calcular recompensa baseada no streak
    const baseReward = 50;
    const streakBonus = Math.min(userData.streak * 5, 50);
    const totalReward = baseReward + streakBonus;

    // Atualizar dados
    userData.coins += totalReward;
    userData.exp += 25;
    userData.totalCoinsEarned += totalReward;
    userData.lastLogin = today;
    userData.daysActive += 1;

    // Verificar level up
    checkLevelUp();

    // Salvar dados
    saveUserData();

    // Atualizar display
    updateDisplay();
    checkDailyBonus();
    generateStreakCalendar();

    // Feedback visual
    showNotification(`Recompensa coletada! +${totalReward} moedas (+${streakBonus} bônus de streak)`, 'success');

    // Verificar conquistas
    checkAchievements();
}

function checkLevelUp() {
    const newLevel = Math.floor(userData.exp / 100) + 1;
    if (newLevel > userData.level) {
        userData.level = newLevel;
        userData.coins += newLevel * 20; // Bônus de level up
        showNotification(`Parabéns! Você subiu para o nível ${newLevel}! +${newLevel * 20} moedas`, 'success');
    }
}

function updateDailyTimer() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeDiff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('dailyTimer').textContent =
        `Próximo bônus em: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startDailyTimer() {
    updateDailyTimer();
    setInterval(updateDailyTimer, 1000);
}

function generateStreakCalendar() {
    const calendar = document.getElementById('streakCalendar');
    calendar.innerHTML = '';

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date.getDate();

        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
            if (userData.lastLogin === today.toDateString()) {
                dayElement.classList.add('completed');
            }
        } else if (date < today) {
            // Simular dias anteriores como completos se dentro do streak
            if (i < userData.streak) {
                dayElement.classList.add('completed');
            }
        } else {
            dayElement.classList.add('future');
        }

        calendar.appendChild(dayElement);
    }
}

function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';

    Object.values(achievements).forEach(achievement => {
        const card = createAchievementCard(achievement);
        grid.appendChild(card);
    });
}

function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : ''}`;

    const progress = Math.min((achievement.current / achievement.target) * 100, 100);

    card.innerHTML = `
        <div class="achievement-content">
            <div class="achievement-header">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                </div>
            </div>
            
            <div class="achievement-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">
                    <span>${achievement.current}/${achievement.target}</span>
                    <span>${Math.floor(progress)}%</span>
                </div>
            </div>
            
            <div class="achievement-reward">
                <div class="reward-info">
                    <span>🪙</span>
                    <span>+${achievement.reward}</span>
                </div>
                ${achievement.unlocked && !achievement.claimed ?
            `<button class="claim-button" onclick="claimAchievement('${achievement.id}')">Recolher</button>` :
            achievement.claimed ? '<span style="color: #28a745; font-size: 12px;">✓ Coletado</span>' :
                '<span style="color: #6c757d; font-size: 12px;">Bloqueado</span>'
        }
            </div>
        </div>
    `;

    return card;
}

function checkAchievements() {
    let newUnlocks = 0;

    Object.values(achievements).forEach(achievement => {
        if (!achievement.unlocked && achievement.current >= achievement.target) {
            achievement.unlocked = true;
            newUnlocks++;
            showNotification(`🏆 Conquista desbloqueada: ${achievement.name}!`, 'success');
        }
    });

    if (newUnlocks > 0) {
        userData.achievementsUnlocked += newUnlocks;
        saveUserData();
        updateDisplay();
        loadAchievements();
    }
}

function claimAchievement(achievementId) {
    const achievement = achievements[achievementId];

    if (achievement && achievement.unlocked && !achievement.claimed) {
        achievement.claimed = true;
        userData.coins += achievement.reward;
        userData.totalCoinsEarned += achievement.reward;
        userData.exp += 10;

        checkLevelUp();
        saveUserData();
        updateDisplay();
        loadAchievements();

        showNotification(`Recompensa coletada! +${achievement.reward} moedas`, 'success');
    }
}

// Simular progresso em conquistas (para demonstração)
function simulateProgress() {
    // Simular conversa com personagem
    achievements.socialButterfly.current = Math.min(achievements.socialButterfly.current + 1, 10);

    // Simular acúmulo de moedas
    achievements.collector.current = userData.coins;

    // Verificar login noturno
    const currentHour = new Date().getHours();
    if (currentHour >= 22 || currentHour <= 6) {
        achievements.nightOwl.current = 1;
        achievements.nightOwl.unlocked = true;
    }

    saveUserData();
    checkAchievements();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Funções específicas para demonstração
function addConversation() {
    achievements.socialButterfly.current = Math.min(achievements.socialButterfly.current + 1, 10);
    userData.exp += 5;
    checkLevelUp();
    saveUserData();
    updateDisplay();
    checkAchievements();
}

function createCharacter() {
    achievements.characterCreator.current = 1;
    achievements.characterCreator.unlocked = true;
    userData.exp += 20;
    userData.coins += 50;
    userData.totalCoinsEarned += 50;

    checkLevelUp();
    saveUserData();
    updateDisplay();
    checkAchievements();
}

// Eventos para demonstração
document.addEventListener('keydown', function (e) {
    // Teclas de demonstração (desenvolvimento)
    if (e.altKey && e.key === '1') {
        addConversation();
        showNotification('Simulado: Nova conversa iniciada!', 'info');
    }
    if (e.altKey && e.key === '2') {
        createCharacter();
        showNotification('Simulado: Personagem criado!', 'info');
    }
    if (e.altKey && e.key === '3') {
        userData.coins += 100;
        userData.totalCoinsEarned += 100;
        achievements.collector.current = userData.coins;
        saveUserData();
        updateDisplay();
        checkAchievements();
        showNotification('Simulado: +100 moedas!', 'info');
    }
});

// Inicializar algumas simulações
setTimeout(() => {
    simulateProgress();
}, 2000);

// Simular atividade a cada 30 segundos para demonstração
setInterval(() => {
    if (Math.random() > 0.7) {
        const randomBonus = Math.floor(Math.random() * 10) + 1;
        userData.coins += randomBonus;
        achievements.collector.current = userData.coins;
        saveUserData();
        updateDisplay();
    }
}, 30000);

// Dicas para o usuário
console.log('🎯 Página de Bônus carregada!');
console.log('💡 Dicas de demonstração:');
console.log('   Alt+1: Simular nova conversa');
console.log('   Alt+2: Simular criação de personagem');
console.log('   Alt+3: Adicionar 100 moedas');