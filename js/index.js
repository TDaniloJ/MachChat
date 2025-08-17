// DADOS DOS PERSONAGENS
const characters = {
    luna: {
        name: "Luna",
        desc: "Sábia e misteriosa, ama astronomia e filosofia",
        avatar: "🌙",
        status: "Online",
        stats: {
            rating: 4.9,
            chats: "1.2k",
            level: 1
        }
    },
    alex: {
        name: "Alex",
        desc: "Aventureiro corajoso, sempre pronto para novas jornadas",
        avatar: "⚡",
        status: "Online",
        stats: {
            rating: 4.8,
            chats: "890",
            level: 1
        }
    },
    maya: {
        name: "Maya",
        desc: "Artista criativa, vê beleza em tudo ao seu redor",
        avatar: "🎨",
        status: "Online",
        stats: {
            rating: 4.9,
            chats: "756",
            level: 1
        }
    },
    zara: {
        name: "Zara",
        desc: "Cientista brilhante, fascinada pelos mistérios do universo",
        avatar: "🔬",
        status: "Online",
        stats: {
            rating: 4.7,
            chats: "634",
            level: 1
        }
    }
};

// ESTADO GLOBAL
let userData = {
    name: "Usuário",
    coins: 250,
    level: 1,
    totalChats: 12,
    currentStreak: 7,
    favCharacters: 3,
    achievements: 8
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadCharacters();
    loadConversationsList();
    setupEventListeners();
    updateStats();
});

function setupEventListeners() {
    // Fechar modal clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });

    // Atalhos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
        
        // Atalhos rápidos
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showModal('start');
                    break;
                case '2':
                    e.preventDefault();
                    showModal('create');
                    break;
                case '3':
                    e.preventDefault();
                    showModal('plans');
                    break;
                case 'b':
                    e.preventDefault();
                    redirectToBonus();
                    break;
            }
        }
    });
}

// GERENCIAMENTO DE PERSONAGENS
function loadCharacters() {
    const grid = document.getElementById('charactersGrid');
    grid.innerHTML = '';

    Object.entries(characters).forEach(([id, character]) => {
        const card = createCharacterCard(id, character);
        grid.appendChild(card);
    });
}

function createCharacterCard(id, character) {
    const card = document.createElement('div');
    card.className = `character-card`;
    card.onclick = () => startChatWithCharacter(id);

    card.innerHTML = `
        <div class="card-content">
            <div class="character-avatar">${character.avatar}</div>
            <h3 class="character-name">${character.name}</h3>
            <p class="character-desc">${character.desc}</p>
            
            <div class="character-stats">
                <div class="char-stat">
                    <div class="char-stat-value">${character.stats.rating}</div>
                    <div class="char-stat-label">Rating</div>
                </div>
                <div class="char-stat">
                    <div class="char-stat-value">${character.stats.chats}</div>
                    <div class="char-stat-label">Chats</div>
                </div>
                <div class="char-stat">
                    <div class="char-stat-value">Nv.${character.stats.level}</div>
                    <div class="char-stat-label">Nível</div>
                </div>
            </div>
            
            <button class="chat-btn">💬 Conversar</button>
        </div>
    `;

    return card;
}

function startChatWithCharacter(characterId) {
    // Salvar o personagem selecionado
    sessionStorage.setItem('selectedCharacter', characterId);
    
    // Redirecionar para o chat
    window.location.href = `chat.html?character=${characterId}`;
}

// SISTEMA DE MODAIS
function showModal(modalType) {
    closeModal(); // Fechar outros modais primeiro
    
    const modalId = modalType + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

// AÇÕES DOS MODAIS

// MODAL INICIAR
function startTutorial() {
    closeModal();
    showNotification('Tutorial iniciado! Bem-vindo ao ChatPersonas 🚀', 'success');
    // Implementar tutorial interativo
}

function selectRandomCharacter() {
    const characterIds = Object.keys(characters);
    const randomId = characterIds[Math.floor(Math.random() * characterIds.length)];
    closeModal();
    startChatWithCharacter(randomId);
}

function showPopularCharacters() {
    closeModal();
    // Filtrar por personagens populares
    showNotification('Mostrando personagens populares ⭐', 'info');
}

// MODAL CRIAR
function redirectToCreateCharacter() {
    window.location.href = 'criar.html';
}

function quickCreateCharacter() {
    closeModal();
    showNotification('Criando personagem automaticamente... ⚡', 'info');
    
    // Simular criação rápida
    setTimeout(() => {
        showNotification('Personagem criado com sucesso! 🎭', 'success');
        // Adicionar novo personagem à lista
    }, 2000);
}

function importCharacter() {
    closeModal();
    // Implementar importação
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showNotification('Importando personagem... 📥', 'info');
            // Processar arquivo
        }
    };
    input.click();
}

// MODAL PLANOS
function selectPlan(planType) {
    closeModal();
    showNotification(`Plano ${planType} selecionado! Redirecionando... 💎`, 'info');
    setTimeout(() => {
        redirectToPlans();
    }, 1500);
}

function redirectToPlans() {
    window.location.href = 'planos.html';
}

// NAVEGAÇÃO
function redirectToBonus() {
    window.location.href = 'bonus.html';
}

// PERFIL
function redirectToProfile() {
    window.location.href = 'perfil.html';
}

// GERENCIAMENTO DE CONVERSAS
function loadConversationsList() {
    const list = document.getElementById('conversationsList');
    list.innerHTML = '';

    // Conversas de exemplo
    const exampleConversations = [
        {
            id: 'conv_1',
            characterName: 'Luna',
            characterAvatar: '🌙',
            preview: 'As estrelas sussurram segredos...',
            time: '2h',
            active: false
        },
        {
            id: 'conv_2',
            characterName: 'Alex',
            characterAvatar: '⚡',
            preview: 'Que aventura épica vamos viver hoje?',
            time: '1d',
            active: false
        },
        {
            id: 'conv_3',
            characterName: 'Maya',
            characterAvatar: '🎨',
            preview: 'Que cores suas emoções estão pintando?',
            time: '3d',
            active: false
        },
        {
            id: 'conv_4',
            characterName: 'Zara',
            characterAvatar: '🔬',
            preview: 'Descobri algo fascinante sobre...',
            time: '5d',
            active: false
        }
    ];

    exampleConversations.forEach(conv => {
        const item = createConversationItem(conv);
        list.appendChild(item);
    });
}

function createConversationItem(conversation) {
    const item = document.createElement('div');
    item.className = `conversation-item`;
    
    item.innerHTML = `
        <div class="conversation-avatar">${conversation.characterAvatar}</div>
        <div style="flex: 1; min-width: 0;">
            <div style="font-size: 14px; font-weight: 500; margin-bottom: 2px;">
                ${conversation.characterName}
            </div>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${conversation.preview}
            </div>
        </div>
        <div style="font-size: 11px; color: rgba(255, 255, 255, 0.4);">
            ${conversation.time}
        </div>
    `;

    item.onclick = () => loadConversation(conversation.id);
    return item;
}

function loadConversation(conversationId) {
    // Redirecionar para a página de conversa específica
    window.location.href = `chat.html?conv=${conversationId}`;
}

function filterConversations(filter) {
    // Atualizar botões ativos
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Implementar filtros
    showNotification(`Filtrando por: ${filter}`, 'info');
}

// GERENCIAMENTO DE USUÁRIO
function loadUserData() {
    try {
        const saved = localStorage.getItem('chatPersonas_userData');
        if (saved) {
            userData = { ...userData, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.log('Usando dados de usuário padrão');
    }
    updateUserDisplay();
}

function updateUserDisplay() {
    document.getElementById('userCoins').textContent = userData.coins;
    document.getElementById('userLevel').textContent = userData.level;
}

function updateStats() {
    document.getElementById('totalChats').textContent = userData.totalChats;
    document.getElementById('currentStreak').textContent = userData.currentStreak;
    document.getElementById('favCharacters').textContent = userData.favCharacters;
    document.getElementById('totalConversations').textContent = userData.totalChats * 2;
    document.getElementById('streakDays').textContent = userData.currentStreak;
    document.getElementById('achievements').textContent = userData.achievements;
    document.getElementById('currentLevel').textContent = userData.level;
}

function saveUserData() {
    try {
        localStorage.setItem('chatPersonas_userData', JSON.stringify(userData));
    } catch (e) {
        console.log('Dados do usuário salvos em memória');
    }
}

// SISTEMA DE NOTIFICAÇÕES
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
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        max-width: 300px;
        word-wrap: break-word;
        font-size: 14px;
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

// Adicionar animação slideInRight
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// TUTORIAL E DICAS
function showTips() {
    console.log('💡 Dicas do ChatPersonas:');
    console.log('   Ctrl+1: Modal Iniciar');
    console.log('   Ctrl+2: Modal Criar');
    console.log('   Ctrl+3: Modal Planos');
    console.log('   Ctrl+B: Página de Bônus');
    console.log('   ESC: Fechar modal');
}

// FUNCIONALIDADES DEMO
setTimeout(() => {
    showTips();
    showNotification('Hub Central carregado! Use os atalhos para navegação rápida 🚀', 'success');
}, 1000);

console.log('🎯 ChatPersonas Hub Central carregado com sucesso!');