// DADOS DO USUÁRIO
let userData = {
    name: 'Alex Creator',
    username: '@alexcreator',
    bio: 'Entusiasta de IA apaixonado por conversas interessantes e criação de personagens únicos.',
    email: 'alex@email.com',
    location: 'São Paulo, Brasil',
    website: 'https://alexcreator.dev',
    photo: '👤',
    followers: 1200,
    characters: 12,
    chats: 156,
    likes: 2800,
    coins: 250,
    gems: 12,
    energy: 85,
    credits: 3,
    plan: 'free'
};

let currentTab = 'characters';
let currentFilter = 'all';
let selectedPhotoType = null; // 'emoji' ou 'upload'
let selectedEmoji = '👤';
let selectedCoinPackage = null;
let selectedSubscription = null;

// PERSONAGENS DE EXEMPLO
const mockCharacters = [
    {
        id: 1,
        name: 'Luna Mystica',
        desc: 'Sábia e misteriosa, especialista em astronomia e filosofia',
        avatar: '🌙',
        visibility: 'public',
        likes: 234,
        chats: 1500,
        created: '2024-01-15'
    },
    {
        id: 2,
        name: 'Tech Guru',
        desc: 'Especialista em tecnologia e programação',
        avatar: '🤖',
        visibility: 'public',
        likes: 189,
        chats: 890,
        created: '2024-02-03'
    },
    {
        id: 3,
        name: 'Artista Criativo',
        desc: 'Inspiração artística e criatividade sem limites',
        avatar: '🎨',
        visibility: 'unlisted',
        likes: 156,
        chats: 445,
        created: '2024-02-20'
    },
    {
        id: 4,
        name: 'Mentor Sábio',
        desc: 'Conselhos de vida e desenvolvimento pessoal',
        avatar: '🧙‍♂️',
        visibility: 'private',
        likes: 89,
        chats: 234,
        created: '2024-03-01'
    }
];

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupEventListeners();
    updateDisplay();
    loadCharacters();
});

function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Character filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setFilter(this.dataset.filter);
        });
    });

    // Modal close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function loadUserData() {
    try {
        const saved = localStorage.getItem('chatPersonas_userData');
        if (saved) {
            userData = { ...userData, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.log('Usando dados padrão');
    }
}

function saveUserData() {
    try {
        localStorage.setItem('chatPersonas_userData', JSON.stringify(userData));
    } catch (e) {
        console.log('Dados salvos em memória');
    }
}

function updateDisplay() {
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileUsername').textContent = userData.username;
    document.getElementById('profileBio').textContent = userData.bio;
    document.getElementById('userPhoto').textContent = userData.photo;
    
    document.getElementById('followersCount').textContent = formatNumber(userData.followers);
    document.getElementById('charactersCount').textContent = userData.characters;
    document.getElementById('chatsCount').textContent = userData.chats;
    document.getElementById('likesCount').textContent = formatNumber(userData.likes);

    document.getElementById('walletCoins').textContent = userData.coins;
    document.getElementById('walletGems').textContent = userData.gems;
    document.getElementById('walletEnergy').textContent = userData.energy;
    document.getElementById('walletCredits').textContent = userData.credits;

    // Preencher formulário de edição
    document.getElementById('editName').value = userData.name;
    document.getElementById('editUsername').value = userData.username;
    document.getElementById('editBio').value = userData.bio;
    document.getElementById('editEmail').value = userData.email || '';
    document.getElementById('editLocation').value = userData.location || '';
    document.getElementById('editWebsite').value = userData.website || '';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tabName + 'Tab').style.display = 'block';

    currentTab = tabName;

    // Load specific content
    switch (tabName) {
        case 'characters':
            loadCharacters();
            break;
        case 'memories':
            loadMemories();
            break;
        case 'photos':
            loadPhotos();
            break;
        case 'favorites':
            loadFavorites();
            break;
        case 'liked':
            loadLiked();
            break;
        case 'models':
            loadModels();
            break;
    }
}

function setFilter(filterType) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filterType}"]`).classList.add('active');

    currentFilter = filterType;
    loadCharacters();
}

function loadCharacters() {
    const grid = document.getElementById('charactersGrid');
    let filteredCharacters = mockCharacters;

    if (currentFilter !== 'all') {
        filteredCharacters = mockCharacters.filter(char => char.visibility === currentFilter);
    }

    if (filteredCharacters.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎭</div>
                <div class="empty-title">Nenhum personagem encontrado</div>
                <div class="empty-desc">Crie seu primeiro personagem para começar</div>
                <a href="criar.html" class="btn btn-primary" style="margin-top: 16px;">
                    ✨ Criar Personagem
                </a>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredCharacters.map(char => `
        <div class="character-card" onclick="openCharacterChat('${char.id}')">
            <div class="character-actions">
                <button class="char-action-btn" onclick="event.stopPropagation(); editCharacter('${char.id}')" title="Editar">
                    ✏️
                </button>
                <button class="char-action-btn" onclick="event.stopPropagation(); shareCharacter('${char.id}')" title="Compartilhar">
                    🔗
                </button>
                <button class="char-action-btn" onclick="event.stopPropagation(); deleteCharacter('${char.id}')" title="Excluir">
                    🗑️
                </button>
            </div>
            
            <div class="character-header">
                <div class="character-avatar">${char.avatar}</div>
                <div class="character-info">
                    <div class="character-name">${char.name}</div>
                    <div class="character-desc">${char.desc}</div>
                </div>
            </div>
            
            <div class="character-badges">
                <span class="badge ${char.visibility}">${getVisibilityText(char.visibility)}</span>
            </div>
            
            <div class="character-stats">
                <span>👍 ${char.likes}</span>
                <span>💬 ${char.chats}</span>
                <span>📅 ${formatDate(char.created)}</span>
            </div>
        </div>
    `).join('');
}

function getVisibilityText(visibility) {
    const texts = {
        'public': 'Público',
        'unlisted': 'Não Listado',
        'private': 'Privado'
    };
    return texts[visibility] || visibility;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 30) return `${diffDays} dias atrás`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
    return `${Math.floor(diffDays / 365)} anos atrás`;
}

function loadMemories() {
    // Implementar carregamento de memórias salvas
}

function loadPhotos() {
    // Implementar carregamento de fotos
}

function loadFavorites() {
    // Implementar carregamento de favoritos
}

function loadLiked() {
    // Implementar carregamento de curtidas
}

function loadModels() {
    // Implementar carregamento de modelos
}

// MODAL FUNCTIONS
function showEditProfileModal() {
    document.getElementById('editProfileModal').classList.add('active');
}

function showWalletModal() {
    document.getElementById('walletModal').classList.add('active');
}

function showPhotoModal() {
    document.getElementById('photoModal').classList.add('active');
}

function showBuyCoinsModal() {
    closeModal();
    document.getElementById('buyCoinsModal').classList.add('active');
}

function showSubscriptionModal() {
    closeModal();
    document.getElementById('subscriptionModal').classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// PROFILE FUNCTIONS
function saveProfile() {
    userData.name = document.getElementById('editName').value;
    userData.username = document.getElementById('editUsername').value;
    userData.bio = document.getElementById('editBio').value;
    userData.email = document.getElementById('editEmail').value;
    userData.location = document.getElementById('editLocation').value;
    userData.website = document.getElementById('editWebsite').value;

    saveUserData();
    updateDisplay();
    closeModal();
    showNotification('Perfil atualizado com sucesso!', 'success');
}

function previewPhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('photoPreview').style.display = 'block';
            selectedPhotoType = 'upload';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function selectEmoji(emoji) {
    selectedEmoji = emoji;
    selectedPhotoType = 'emoji';
    document.getElementById('photoPreview').style.display = 'none';
}

function savePhoto() {
    if (selectedPhotoType === 'emoji') {
        userData.photo = selectedEmoji;
    } else if (selectedPhotoType === 'upload') {
        // Em uma implementação real, você enviaria a imagem para o servidor
        userData.photo = '📷'; // Placeholder
    }

    saveUserData();
    updateDisplay();
    closeModal();
    showNotification('Foto atualizada com sucesso!', 'success');
}

// WALLET FUNCTIONS
function selectCoinPackage(size, amount, price) {
    selectedCoinPackage = { size, amount, price };
    // Highlight selected package
    document.querySelectorAll('#buyCoinsModal .wallet-item').forEach(item => {
        item.style.borderColor = 'transparent';
    });
    event.currentTarget.style.borderColor = '#ff6b6b';
}

function processCoinPurchase() {
    if (!selectedCoinPackage) {
        showNotification('Selecione um pacote de moedas', 'error');
        return;
    }

    // Simular compra
    userData.coins += selectedCoinPackage.amount;
    if (selectedCoinPackage.size === 'medium') userData.coins += 25;
    if (selectedCoinPackage.size === 'large') userData.coins += 75;

    saveUserData();
    updateDisplay();
    closeModal();
    showNotification(`Parabéns! Você comprou ${selectedCoinPackage.amount} moedas!`, 'success');
}

function selectSubscription(plan, price) {
    selectedSubscription = { plan, price };
    // Highlight selected subscription
    document.querySelectorAll('#subscriptionModal .wallet-item').forEach(item => {
        item.style.borderColor = 'transparent';
    });
    event.currentTarget.style.borderColor = '#ff6b6b';
}

function processSubscription() {
    if (!selectedSubscription) {
        showNotification('Selecione um plano', 'error');
        return;
    }

    userData.plan = selectedSubscription.plan;
    saveUserData();
    closeModal();
    showNotification(`Bem-vindo ao plano ${selectedSubscription.plan}!`, 'success');
}

// CHARACTER ACTIONS
function openCharacterChat(characterId) {
    window.location.href = `chat.html?character=${characterId}`;
}

function editCharacter(characterId) {
    window.location.href = `criar.html?edit=${characterId}`;
}

function shareCharacter(characterId) {
    navigator.clipboard.writeText(`${window.location.origin}/character/${characterId}`);
    showNotification('Link copiado para área de transferência!', 'success');
}

function deleteCharacter(characterId) {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
        // Remove do array mock
        const index = mockCharacters.findIndex(char => char.id == characterId);
        if (index > -1) {
            mockCharacters.splice(index, 1);
            userData.characters--;
            loadCharacters();
            updateDisplay();
            saveUserData();
            showNotification('Personagem excluído com sucesso!', 'success');
        }
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
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
    }, 3000);
}

console.log('👤 Página de Perfil Avançada carregada com sucesso!');