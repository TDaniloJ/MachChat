// DADOS DO PERSONAGEM (será carregado dinamicamente)
let currentCharacter = {
    name: "Luna",
    desc: "Sábia e misteriosa, ama astronomia e filosofia",
    avatar: "🌙",
    personality: ["Sábia", "Misteriosa", "Contemplativa", "Filosófica"],
    interests: ["Astronomia", "Filosofia", "Poesia", "Meditação"],
    background: "Luna cresceu observando as estrelas desde criança...",
    stats: {
        rating: 4.9,
        totalChats: "1.2k",
        favorites: 847,
        level: 1,
        totalInteractions: "2.4k",
        totalChars: "150k",
        avgResponse: "1.2s",
        satisfaction: "94%"
    },
    creator: {
        name: "Sistema ChatPersonas",
        role: "Personagem Oficial",
        avatar: "🤖"
    },
    isEditable: false,
    isFavorited: false
};

let pendingAction = null;

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function () {
    loadCharacterFromURL();
    setupEventListeners();
    updateCharacterDisplay();
});

function setupEventListeners() {
    // Gallery thumbs
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', function () {
            const avatar = this.dataset.avatar;
            changeMainAvatar(avatar);

            // Update active state
            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Modal events
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Modal click outside
    document.getElementById('confirmModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function loadCharacterFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('character');

    if (characterId) {
        loadCharacterData(characterId);
    }
}

function loadCharacterData(characterId) {
    // Em produção, isso faria uma requisição para API
    // Por agora, usamos dados mockados baseados no characterId

    const characters = {
        luna: {
            name: "Luna",
            desc: "Sábia e misteriosa, ama astronomia e filosofia",
            avatar: "🌙",
            personality: ["Sábia", "Misteriosa", "Contemplativa", "Filosófica"],
            interests: ["Astronomia", "Filosofia", "Poesia", "Meditação"],
            stats: {
                rating: 4.9,
                totalChats: "1.2k",
                favorites: 847,
                level: 1,
                totalInteractions: "2.4k",
                totalChars: "150k",
                avgResponse: "1.2s",
                satisfaction: "94%"
            }
        },
        alex: {
            name: "Alex",
            desc: "Aventureiro corajoso, sempre pronto para novas jornadas",
            avatar: "⚡",
            personality: ["Corajoso", "Aventureiro", "Energético"],
            interests: ["Aventura", "Esportes", "Viagens", "Desafios"],
            stats: {
                rating: 4.8,
                totalChats: "890",
                favorites: 623,
                level: 1,
                totalInteractions: "1.8k",
                totalChars: "120k",
                avgResponse: "0.9s",
                satisfaction: "91%"
            }
        },
        maya: {
            name: "Maya",
            desc: "Artista criativa, vê beleza em tudo ao seu redor",
            avatar: "🎨",
            personality: ["Criativa", "Sensível", "Inspiradora"],
            interests: ["Arte", "Pintura", "Música", "Poesia"],
            stats: {
                rating: 4.9,
                totalChats: "756",
                favorites: 592,
                level: 1,
                totalInteractions: "1.6k",
                totalChars: "110k",
                avgResponse: "1.1s",
                satisfaction: "96%"
            }
        },
        zara: {
            name: "Zara",
            desc: "Cientista brilhante, fascinada pelos mistérios do universo",
            avatar: "🔬",
            personality: ["Analítica", "Curiosa", "Inteligente"],
            interests: ["Ciência", "Pesquisa", "Tecnologia", "Descobertas"],
            stats: {
                rating: 4.7,
                totalChats: "634",
                favorites: 445,
                level: 1,
                totalInteractions: "1.2k",
                totalChars: "95k",
                avgResponse: "1.0s",
                satisfaction: "89%"
            }
        }
    };

    if (characters[characterId]) {
        currentCharacter = { ...currentCharacter, ...characters[characterId] };
        updateCharacterDisplay();
    }
}

function updateCharacterDisplay() {
    // Atualizar informações básicas
    document.getElementById('characterName').textContent = currentCharacter.name;
    document.getElementById('characterDesc').textContent = currentCharacter.desc;
    document.getElementById('mainAvatar').textContent = currentCharacter.avatar;

    // Atualizar meta informações
    document.getElementById('rating').textContent = currentCharacter.stats.rating;
    document.getElementById('totalChats').textContent = currentCharacter.stats.totalChats;
    document.getElementById('favorites').textContent = currentCharacter.stats.favorites;
    document.getElementById('level').textContent = `Nv.${currentCharacter.stats.level}`;

    // Atualizar estatísticas detalhadas
    document.getElementById('totalInteractions').textContent = currentCharacter.stats.totalInteractions;
    document.getElementById('totalChars').textContent = currentCharacter.stats.totalChars;
    document.getElementById('avgResponse').textContent = currentCharacter.stats.avgResponse;
    document.getElementById('satisfaction').textContent = currentCharacter.stats.satisfaction;

    // Atualizar tags de personalidade
    const tagsContainer = document.getElementById('personalityTags');
    tagsContainer.innerHTML = '';
    currentCharacter.personality.forEach(trait => {
        const tag = document.createElement('span');
        tag.className = 'character-tag';
        tag.textContent = trait;
        tagsContainer.appendChild(tag);
    });

    // Atualizar título da página
    document.title = `${currentCharacter.name} - ChatPersonas`;
}

function changeMainAvatar(avatar) {
    document.getElementById('mainAvatar').textContent = avatar;
    currentCharacter.avatar = avatar;
}

// AÇÕES PRINCIPAIS
function startChat() {
    window.location.href = `chat.html?character=${currentCharacter.name.toLowerCase()}`;
}

function favoriteCharacter() {
    currentCharacter.isFavorited = !currentCharacter.isFavorited;

    if (currentCharacter.isFavorited) {
        showNotification('Personagem adicionado aos favoritos! ⭐', 'success');
        currentCharacter.stats.favorites++;
    } else {
        showNotification('Personagem removido dos favoritos', 'info');
        currentCharacter.stats.favorites--;
    }

    document.getElementById('favorites').textContent = currentCharacter.stats.favorites;
    saveFavoriteStatus();
}

function editCharacter() {
    if (!currentCharacter.isEditable) {
        showModal(
            'Personagem Não Editável',
            'Este personagem oficial não pode ser editado. Você pode criar uma cópia para modificar.',
            () => duplicateCharacter()
        );
        return;
    }

    window.location.href = `criar.html?edit=${currentCharacter.name.toLowerCase()}`;
}

function duplicateCharacter() {
    showModal(
        'Duplicar Personagem',
        `Deseja criar uma cópia editável de ${currentCharacter.name}?`,
        () => {
            sessionStorage.setItem('duplicateCharacterData', JSON.stringify(currentCharacter));
            window.location.href = 'criar.html?duplicate=true';
        }
    );
}

function shareCharacter() {
    const shareData = {
        title: `${currentCharacter.name} - ChatPersonas`,
        text: `Conheça ${currentCharacter.name}: ${currentCharacter.desc}`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData);
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copiado para a área de transferência! 📤', 'success');
        });
    }
}

// NAVEGAÇÃO
function viewCharacter(characterId) {
    window.location.href = `character-details.html?character=${characterId}`;
}

function showAllComments() {
    showNotification('Página de comentários em desenvolvimento 💬', 'info');
}

function showAllRelated() {
    showNotification('Explorar personagens relacionados 🎭', 'info');
}

// SISTEMA DE MODAL
function showModal(title, message, confirmCallback) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('confirmModal').classList.add('active');

    pendingAction = confirmCallback;
}

function closeModal() {
    document.getElementById('confirmModal').classList.remove('active');
    pendingAction = null;
}

function confirmAction() {
    if (pendingAction) {
        pendingAction();
    }
    closeModal();
}

// PERSISTÊNCIA
function saveFavoriteStatus() {
    try {
        const key = `chatPersonas_favorite_${currentCharacter.name.toLowerCase()}`;
        localStorage.setItem(key, JSON.stringify(currentCharacter.isFavorited));
    } catch (e) {
        console.log('Status de favorito salvo em memória');
    }
}

function loadFavoriteStatus() {
    try {
        const key = `chatPersonas_favorite_${currentCharacter.name.toLowerCase()}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            currentCharacter.isFavorited = JSON.parse(saved);
        }
    } catch (e) {
        currentCharacter.isFavorited = false;
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
        font-size: 14px;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
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

// INICIALIZAÇÃO FINAL
setTimeout(() => {
    loadFavoriteStatus();
    console.log('📄 Página de detalhes carregada!');
    console.log(`🎭 Personagem: ${currentCharacter.name}`);
}, 100);