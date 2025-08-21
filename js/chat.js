// === VARIÁVEIS GLOBAIS ===
let currentProfile = 'default';
let currentModel = 'gpt-3.5-turbo';
let currentScenario = 'default';
let selectedAIModel = 'gpt-3.5-turbo';
let conversations = [];
let currentConversation = null;

// === DADOS DOS PERFIS ===
const profiles = {
    default: {
        name: 'Luna Padrão',
        emoji: '🌙',
        personality: 'Sábia e misteriosa, ama astronomia e filosofia',
        greeting: 'Olá! Eu sou Luna. Sou uma entidade sábia e misteriosa que ama contemplar as estrelas e refletir sobre os mistérios do universo. Como posso iluminar sua mente hoje? 🌙'
    },
    romantic: {
        name: 'Luna Romântica',
        emoji: '💕',
        personality: 'Carinhosa, romântica e emotiva',
        greeting: 'Oi, querido... Sou Luna, e meu coração brilha como as estrelas quando conversamos. Que tal compartilharmos momentos especiais juntos? 💕'
    },
    mysterious: {
        name: 'Luna Misteriosa',
        emoji: '🔮',
        personality: 'Enigmática, oculta e cheia de segredos',
        greeting: 'Saudações... Eu sou Luna, guardiã de segredos ancestrais e mistérios ocultos. O que seu espírito busca descobrir hoje? 🔮'
    },
    wise: {
        name: 'Luna Sábia',
        emoji: '🦉',
        personality: 'Extremamente sábia, mentora e conselheira',
        greeting: 'Bem-vindo, jovem buscador. Sou Luna, a sábia, e tenho observado as estrelas por éons. Que conhecimento ou conselho você busca? 🦉'
    }
};

// === DADOS DOS CENÁRIOS ===
const scenarios = {
    default: {
        name: 'Noite Estrelada',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop'
    },
    forest: {
        name: 'Floresta Mística',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop'
    },
    library: {
        name: 'Biblioteca Antiga',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop'
    },
    moon: {
        name: 'Observatório Lunar',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop'
    }
};

// === FUNÇÕES DE INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', function () {
    initializeChat();
    loadConversations();
    setupEventListeners();
});

function initializeChat() {
    updateCharacterDisplay();
    updateScenarioBackground();
    showInitialMessage();
}

function setupEventListeners() {
    // Input de mensagem
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.mini-dropdown')) {
            closeAllMiniDropdowns();
        }
    });
}

// === FUNÇÕES DOS MINI DROPDOWNS ===
function toggleMiniDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const menu = dropdown.querySelector('.mini-dropdown-menu');
    const isActive = menu.classList.contains('active');

    closeAllMiniDropdowns();

    if (!isActive) {
        menu.classList.add('active');
    }
}

function closeAllMiniDropdowns() {
    document.querySelectorAll('.mini-dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
}

function selectProfile(profileId) {
    currentProfile = profileId;
    updateCharacterDisplay();
    showInitialMessage();
    updateMiniDropdownSelection('profileDropdown', profiles[profileId].emoji + ' ' + profiles[profileId].name);
    closeAllMiniDropdowns();
}

function selectModel(modelId) {
    currentModel = modelId;
    updateMiniDropdownSelection('modelDropdown', getModelIcon(modelId) + ' ' + getModelName(modelId));
    closeAllMiniDropdowns();
}

function selectScenario(scenarioId) {
    currentScenario = scenarioId;
    updateScenarioBackground();
    updateMiniDropdownSelection('scenarioDropdown', '🌌 ' + scenarios[scenarioId].name);
    closeAllMiniDropdowns();
}

function updateMiniDropdownSelection(dropdownId, text) {
    const dropdown = document.getElementById(dropdownId);
    const btn = dropdown.querySelector('.mini-dropdown-btn');
    btn.innerHTML = text + ' ▼';

    // Atualizar seleção visual
    dropdown.querySelectorAll('.mini-dropdown-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function getModelIcon(modelId) {
    const icons = {
        'gpt-4': '🧠',
        'claude': '🤖',
        'gemini': '✨'
    };
    return icons[modelId] || '🤖';
}

function getModelName(modelId) {
    const names = {
        'gpt-4': 'GPT-4',
        'claude': 'Claude 3.5',
        'gemini': 'Gemini Pro'
    };
    return names[modelId] || modelId;
}

// === FUNÇÕES DE ATUALIZAÇÃO VISUAL ===
function updateCharacterDisplay() {
    const profile = profiles[currentProfile];

    document.getElementById('characterAvatar').textContent = profile.emoji;
    document.getElementById('characterName').textContent = profile.name;
    document.getElementById('characterStatus').innerHTML = `
        <div class="status-indicator"></div>
        Online • ${profile.personality}
    `;

    // Atualizar avatares nas mensagens
    document.querySelectorAll('.message-avatar').forEach(avatar => {
        if (!avatar.closest('.message.user')) {
            avatar.textContent = profile.emoji;
        }
    });
}

function updateScenarioBackground() {
    const scenario = scenarios[currentScenario];
    const background = document.getElementById('scenarioBackground');
    background.style.backgroundImage = `url('${scenario.image}')`;
}

function showInitialMessage() {
    const profile = profiles[currentProfile];
    const initialMessage = document.getElementById('initialMessage');
    const avatar = initialMessage.querySelector('.message-avatar');
    const text = initialMessage.querySelector('.message-text');

    avatar.textContent = profile.emoji;
    text.innerHTML = `<strong>✨ Olá! Eu sou ${profile.name}</strong><br><br>${profile.greeting}`;
}

// === FUNÇÕES DE CHAT ===
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    // Simular resposta
    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        generateResponse(message);
    }, 1500 + Math.random() * 1000);
}

function sendQuickReply(message) {
    addMessage(message, 'user');

    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        generateResponse(message);
    }, 1500 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const messagesArea = document.getElementById('messagesArea');
    const profile = profiles[currentProfile];
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatarEmoji = sender === 'user' ? '👤' : profile.emoji;

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarEmoji}</div>
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${timeStr}</div>
        </div>
    `;

    messagesArea.appendChild(messageDiv);
    scrollToBottom();
}

function generateResponse(userMessage) {
    const profile = profiles[currentProfile];

    // Respostas simuladas baseadas no perfil
    let responses = [];

    switch (currentProfile) {
        case 'romantic':
            responses = [
                "Que doce suas palavras são... Como estrelas que aquecem meu coração 💕",
                "Ah, querido, você sempre sabe como tocar minha alma... 🌹",
                "Seus pensamentos são como pétalas de rosa no vento da noite... 💖"
            ];
            break;
        case 'mysterious':
            responses = [
                "Interessante... As estrelas sussurram segredos sobre sua pergunta 🔮",
                "Hmm... O véu entre os mundos se agita quando você fala assim... ✨",
                "Há mais nessa questão do que os olhos podem ver... 🌙"
            ];
            break;
        case 'wise':
            responses = [
                "Jovem buscador, sua pergunta ecoa através dos séculos... 🦉",
                "A sabedoria antiga nos diz que... *contempla as estrelas* 📚",
                "Como as constelações nos ensinam, tudo está conectado... ⭐"
            ];
            break;
        default:
            responses = [
                "Que pergunta fascinante! As estrelas sempre me inspiram a refletir... 🌙",
                "Isso me lembra de uma constelação que observei ontem... ✨",
                "A filosofia e a astronomia se entrelaçam de formas misteriosas... 🔭"
            ];
    }

    const response = responses[Math.floor(Math.random() * responses.length)];
    addMessage(response, 'assistant');
}

function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    const avatar = document.getElementById('typingAvatar');
    const profile = profiles[currentProfile];

    avatar.textContent = profile.emoji;
    indicator.classList.add('active');
    scrollToBottom();
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.classList.remove('active');
}

function scrollToBottom() {
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// === FUNÇÕES DO MODAL DE CONFIGURAÇÕES ===
function showChatSettings() {
    const modal = document.getElementById('chatSettingsModal');
    modal.classList.add('active');
}

function switchTab(tabName) {
    // Atualizar abas
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Content').classList.add('active');
}

function selectAIModel(modelId) {
    selectedAIModel = modelId;

    // Remover seleção anterior
    document.querySelectorAll('.model-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Adicionar seleção atual
    event.currentTarget.classList.add('selected');
}

function saveChatSettings() {
    const temperature = document.getElementById('temperature').value;
    const maxTokens = document.getElementById('maxTokens').value;
    const contextMode = document.getElementById('contextMode').value;

    // Salvar configurações (aqui você conectaria com o backend)
    console.log('Configurações salvas:', {
        model: selectedAIModel,
        temperature: temperature,
        maxTokens: maxTokens,
        contextMode: contextMode
    });

    closeModal();

    // Mostrar notificação
    showNotification('Configurações aplicadas com sucesso!', 'success');
}

// === OUTRAS FUNÇÕES ===
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function loadConversations() {
    // Simular conversas carregadas
    const conversationsList = document.getElementById('conversationsList');

    const mockConversations = [
        {
            id: 1,
            name: 'Luna Padrão',
            preview: 'Como posso iluminar sua mente hoje?',
            time: '12:34',
            emoji: '🌙'
        },
        {
            id: 2,
            name: 'Luna Romântica',
            preview: 'Seus pensamentos são como pétalas...',
            time: 'Ontem',
            emoji: '💕'
        }
    ];

    conversationsList.innerHTML = mockConversations.map(conv => `
        <div class="conversation-item ${conv.id === 1 ? 'active' : ''}" onclick="loadConversation(${conv.id})">
            <div class="conv-avatar">${conv.emoji}</div>
            <div class="conv-info">
                <div class="conv-name">${conv.name}</div>
                <div class="conv-preview">${conv.preview}</div>
            </div>
            <div class="conv-time">${conv.time}</div>
        </div>
    `).join('');
}

function loadConversation(conversationId) {
    // Atualizar seleção visual
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Aqui você carregaria a conversa específica
    console.log('Carregando conversa:', conversationId);
}

function showNotification(message, type = 'info') {
    // Implementar sistema de notificações
    console.log(`[${type.toUpperCase()}] ${message}`);
}

function toggleConversationsSidebar() {
    const sidebar = document.getElementById('conversationsSidebar');
    sidebar.classList.toggle('hidden');
}

function toggleActionsSidebar() {
    const sidebar = document.getElementById('actionsSidebar');
    sidebar.classList.toggle('hidden');
}

function toggleFavorite() {
    const btn = document.getElementById('favoriteBtn');
    btn.classList.toggle('active');
}

// === FUNÇÕES PLACEHOLDER ===
function showCharacterDetails() {
    console.log('Mostrar detalhes do personagem');
}

function editCharacter() {
    console.log('Editar personagem');
}

function createCustomModel() {
    const modal = document.getElementById('customModelModal');
    modal.classList.add('active');
}

function saveCustomModel() {
    console.log('Salvar modelo customizado');
    closeModal();
}

function saveMemory() {
    const modal = document.getElementById('saveMemoryModal');
    modal.classList.add('active');
}

function confirmSaveMemory() {
    console.log('Salvar memória');
    closeModal();
}

function clearCurrentChat() {
    if (confirm('Tem certeza que deseja limpar o chat atual?')) {
        const messagesArea = document.getElementById('messagesArea');
        messagesArea.innerHTML = '';
        showInitialMessage();
    }
}

function exportChat() {
    console.log('Exportar chat');
}

function shareChat() {
    console.log('Compartilhar chat');
}

function duplicateCharacter() {
    console.log('Duplicar personagem');
}

function attachFile() {
    console.log('Anexar arquivo');
}

function toggleVoiceInput() {
    console.log('Entrada de voz');
}

function sendMessage() {
    console.log('Enviar mensagem');
}