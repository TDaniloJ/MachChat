// DADOS DOS PERSONAGENS
const characters = {
    luna: {
        name: "Luna",
        desc: "Sábia e misteriosa, ama astronomia e filosofia",
        avatar: "🌙",
        personality: ["Sábia", "Misteriosa", "Contemplativa"],
        interests: ["Astronomia", "Filosofia", "Poesia", "Meditação"],
        background: "Luna cresceu observando as estrelas desde criança. Formou-se em Filosofia e Astrofísica, e agora dedica sua vida a explorar os mistérios do universo e da mente humana.",
        stats: { rating: 4.9, chats: "1.2k", level: 1, totalChars: 150000, interactions: 2400 },
        creator: "Sistema",
        isEditable: false
    },
    alex: {
        name: "Alex",
        desc: "Aventureiro corajoso, sempre pronto para novas jornadas",
        avatar: "⚡",
        personality: ["Corajoso", "Aventureiro", "Energético"],
        interests: ["Aventura", "Esportes", "Viagens", "Desafios"],
        background: "Alex é um explorador nato que já visitou mais de 50 países. Escalou montanhas, mergulhou em oceanos profundos e sempre busca a próxima grande aventura.",
        stats: { rating: 4.8, chats: "890", level: 1, totalChars: 120000, interactions: 1800 },
        creator: "Sistema",
        isEditable: false
    },
    maya: {
        name: "Maya",
        desc: "Artista criativa, vê beleza em tudo ao seu redor",
        avatar: "🎨",
        personality: ["Criativa", "Sensível", "Inspiradora"],
        interests: ["Arte", "Pintura", "Música", "Poesia"],
        background: "Maya é uma artista multi-disciplinar que encontra inspiração em cada momento da vida. Suas obras já foram expostas em galerias ao redor do mundo.",
        stats: { rating: 4.9, chats: "756", level: 1, totalChars: 110000, interactions: 1600 },
        creator: "Sistema",
        isEditable: false
    },
    zara: {
        name: "Zara",
        desc: "Cientista brilhante, fascinada pelos mistérios do universo",
        avatar: "🔬",
        personality: ["Analítica", "Curiosa", "Inteligente"],
        interests: ["Ciência", "Pesquisa", "Tecnologia", "Descobertas"],
        background: "Dra. Zara é uma renomada cientista com PhD em Física Quântica e Biologia Molecular. Sua paixão é desvendar os segredos mais profundos do universo.",
        stats: { rating: 4.7, chats: "634", level: 1, totalChars: 95000, interactions: 1200 },
        creator: "Sistema",
        isEditable: false
    }
};

// MODELOS DISPONÍVEIS
const aiModels = {
    free: [
        { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', desc: 'Rápido e eficiente para conversas gerais', cost: 'Gratuito' },
        { id: 'local', name: 'Modelo Local', desc: 'Processamento offline básico', cost: 'Gratuito' }
    ],
    coins: [
        { id: 'gpt-4', name: 'GPT-4', desc: 'Mais inteligente e criativo', cost: '10 moedas/msg' },
        { id: 'claude-3.5', name: 'Claude 3.5 Sonnet', desc: 'Excelente para conversas longas', cost: '15 moedas/msg' },
        { id: 'gemini-pro', name: 'Gemini Pro', desc: 'Ótimo para análises complexas', cost: '12 moedas/msg' }
    ],
    premium: [
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', desc: 'Mais rápido com 32k tokens', cost: 'Premium' },
        { id: 'claude-opus', name: 'Claude 3 Opus', desc: 'O mais inteligente disponível', cost: 'Premium' }
    ]
};

// ESTADO GLOBAL
let currentCharacter = null;
let messageHistory = [];
let conversationHistory = [];
let isFavorite = false;
let isTyping = false;
let currentModel = 'gpt-3.5';
let chatSettings = {
    temperature: 0.7,
    maxTokens: 1000,
    contextMode: 'recent'
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function () {
    loadCharacterFromURL();
    loadConversationHistory();
    setupEventListeners();
    setupAutoResize();
});

function setupEventListeners() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const searchInput = document.getElementById('searchInput');

    // Enter para enviar mensagem
    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (messageInput.value.trim()) {
                sendMessage();
            }
        }
    });

    // Atualizar estado do botão enviar
    messageInput.addEventListener('input', function () {
        updateSendButtonState();
    });

    // Busca de conversas
    searchInput.addEventListener('input', function () {
        filterConversations(this.value);
    });

    // Fechar modais clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });

    // Atalhos de teclado
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }

        // Ctrl/Cmd + K para buscar
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

function setupAutoResize() {
    const textarea = document.getElementById('messageInput');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

// GERENCIAMENTO DE PERSONAGEM
function loadCharacterFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('character') || sessionStorage.getItem('selectedCharacter') || 'luna';

    if (characters[characterId]) {
        loadCharacter(characterId);
    } else {
        loadCharacter('luna');
    }
}

function loadCharacter(characterId) {
    currentCharacter = characters[characterId];

    if (!currentCharacter) return;

    updateCharacterUI();
    updateQuickReplies();
    clearMessages();
    loadMessageHistory(characterId);
    loadFavoriteStatus();
    loadChatSettings(characterId);
}

function updateCharacterUI() {
    if (!currentCharacter) return;

    // Header
    document.getElementById('characterAvatar').textContent = currentCharacter.avatar;
    document.getElementById('characterName').textContent = currentCharacter.name;
    document.getElementById('characterStatus').textContent = `Online • ${currentCharacter.desc}`;

    // Welcome message
    document.getElementById('welcomeAvatar').textContent = currentCharacter.avatar;
    document.getElementById('welcomeTitle').textContent = `Olá! Eu sou ${currentCharacter.name}`;
    document.getElementById('welcomeSubtitle').textContent = currentCharacter.desc + ". Como posso ajudar você hoje?";

    // Typing indicator
    document.getElementById('typingAvatar').textContent = currentCharacter.avatar;
}

function updateQuickReplies() {
    if (!currentCharacter) return;

    const quickReplies = document.getElementById('quickReplies');
    quickReplies.innerHTML = '';

    const defaultReplies = [
        { text: '👋 Cumprimentar', message: 'Olá! Como você está?' },
        { text: '❓ Perguntar', message: 'Me conte sobre você' },
        { text: '🎯 Objetivo', message: 'O que você mais gosta de fazer?' },
        { text: '💭 Filosófico', message: 'Qual sua visão sobre a vida?' }
    ];

    // Personalizar por personagem
    if (currentCharacter.name === 'Luna') {
        defaultReplies[1] = { text: '✨ Astronomia', message: 'Fale sobre as estrelas' };
        defaultReplies[3] = { text: '🤔 Filosofia', message: 'Qual o sentido da vida?' };
    } else if (currentCharacter.name === 'Alex') {
        defaultReplies[1] = { text: '🏔️ Aventuras', message: 'Conte sobre suas aventuras' };
        defaultReplies[3] = { text: '💪 Desafios', message: 'Qual foi seu maior desafio?' };
    } else if (currentCharacter.name === 'Maya') {
        defaultReplies[1] = { text: '🎨 Arte', message: 'Me fale sobre sua arte' };
        defaultReplies[3] = { text: '🌈 Inspiração', message: 'O que te inspira?' };
    } else if (currentCharacter.name === 'Zara') {
        defaultReplies[1] = { text: '🔬 Ciência', message: 'Qual sua pesquisa atual?' };
        defaultReplies[3] = { text: '🔍 Descobertas', message: 'Qual sua maior descoberta?' };
    }

    defaultReplies.forEach(reply => {
        const element = document.createElement('div');
        element.className = 'quick-reply';
        element.textContent = reply.text;
        element.onclick = () => sendQuickReply(reply.message);
        quickReplies.appendChild(element);
    });
}

// GERENCIAMENTO DE CONVERSAS
function loadConversationHistory() {
    try {
        const saved = localStorage.getItem('chatPersonas_conversationHistory');
        if (saved) {
            conversationHistory = JSON.parse(saved);
        }
    } catch (e) {
        conversationHistory = generateSampleConversations();
    }

    displayConversations();
}

function generateSampleConversations() {
    return [
        {
            id: 'conv_luna_1',
            characterId: 'luna',
            characterName: 'Luna',
            characterAvatar: '🌙',
            preview: 'As estrelas sussurram segredos eternos...',
            lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            messageCount: 15
        },
        {
            id: 'conv_alex_1',
            characterId: 'alex',
            characterName: 'Alex',
            characterAvatar: '⚡',
            preview: 'Que aventura épica vamos viver hoje?',
            lastMessage: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            messageCount: 8
        },
        {
            id: 'conv_maya_1',
            characterId: 'maya',
            characterName: 'Maya',
            characterAvatar: '🎨',
            preview: 'Que cores suas emoções pintam hoje?',
            lastMessage: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            messageCount: 22
        },
        {
            id: 'conv_zara_1',
            characterId: 'zara',
            characterName: 'Zara',
            characterAvatar: '🔬',
            preview: 'Descobri algo fascinante sobre quarks...',
            lastMessage: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            messageCount: 12
        }
    ];
}

function displayConversations() {
    const list = document.getElementById('conversationsList');
    list.innerHTML = '';

    const sortedConversations = conversationHistory.sort((a, b) =>
        new Date(b.lastMessage) - new Date(a.lastMessage)
    );

    sortedConversations.forEach(conv => {
        const item = createConversationItem(conv);
        list.appendChild(item);
    });
}

function createConversationItem(conversation) {
    const item = document.createElement('div');
    item.className = `conversation-item ${conversation.characterId === currentCharacter?.name.toLowerCase() ? 'active' : ''}`;

    const timeAgo = getTimeAgo(conversation.lastMessage);

    item.innerHTML = `
        <div class="conv-avatar">${conversation.characterAvatar}</div>
        <div class="conv-info">
            <div class="conv-name">${conversation.characterName}</div>
            <div class="conv-preview">${conversation.preview}</div>
        </div>
        <div class="conv-time">${timeAgo}</div>
    `;

    item.onclick = () => loadConversation(conversation.characterId);
    return item;
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
}

function filterConversations(query) {
    const items = document.querySelectorAll('.conversation-item');
    items.forEach(item => {
        const name = item.querySelector('.conv-name').textContent.toLowerCase();
        const preview = item.querySelector('.conv-preview').textContent.toLowerCase();
        const matches = name.includes(query.toLowerCase()) || preview.includes(query.toLowerCase());
        item.style.display = matches ? 'flex' : 'none';
    });
}

function loadConversation(characterId) {
    if (characters[characterId]) {
        loadCharacter(characterId);
        // Atualizar URL sem recarregar
        window.history.pushState({}, '', `?character=${characterId}`);
    }
}

// SISTEMA DE MENSAGENS
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText || isTyping) return;

    addMessage('user', messageText);
    messageInput.value = '';
    messageInput.style.height = 'auto';
    updateSendButtonState();
    hideWelcomeMessage();
    generateResponse(messageText);
}

function sendQuickReply(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    sendMessage();
}

function addMessage(sender, text) {
    const messagesArea = document.getElementById('messagesArea');
    const messageElement = createMessageElement(sender, text);

    messagesArea.appendChild(messageElement);
    scrollToBottom();

    messageHistory.push({
        sender,
        text,
        timestamp: new Date().toISOString()
    });

    saveMessageHistory();
    updateConversationPreview(text, sender);
}

function createMessageElement(sender, text) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : currentCharacter.avatar;

    const content = document.createElement('div');
    content.className = 'message-content';

    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    content.appendChild(messageText);
    content.appendChild(time);
    message.appendChild(avatar);
    message.appendChild(content);

    return message;
}

function generateResponse(userMessage) {
    if (!currentCharacter) return;

    showTyping();

    setTimeout(() => {
        hideTyping();
        let response = getCharacterResponse(userMessage);
        addMessage('character', response);
    }, 1000 + Math.random() * 2000);
}

function getCharacterResponse(userMessage) {
    if (!currentCharacter) return "Desculpe, não consegui processar sua mensagem.";

    const message = userMessage.toLowerCase();
    return generatePersonalityResponse(message);
}

function generatePersonalityResponse(message) {
    const responses = {
        luna: [
            "Interessante pergunta... As estrelas me sussurram que a resposta está dentro de você. O que seu coração diz?",
            "Na vastidão do cosmos, cada pergunta é um convite à reflexão. Como você se conecta com essa questão?",
            "A sabedoria antiga nos ensina que... mas primeiro, me conte o que você pensa sobre isso.",
            "Observando as constelações da sua alma, percebo uma busca profunda. Podemos explorar isso juntos?"
        ],
        alex: [
            "Cara, isso me lembra de uma aventura incrível que vivi! Quer que eu conte?",
            "Adoro essa energia! Me faz querer partir para uma nova expedição. Você topa?",
            "Cada desafio é uma oportunidade de crescimento! Como você enfrenta os seus?",
            "A vida é uma grande aventura, não acha? Vamos descobrir o que vem pela frente!"
        ],
        maya: [
            "Que bela expressão! Posso quase ver as cores das suas emoções dançando no ar...",
            "Sua alma artística transparece nas suas palavras. Que arte você cria com seus sentimentos?",
            "Cada momento é uma tela em branco esperando ser pintada. Como você pintaria este momento?",
            "A beleza está nos detalhes, nos pequenos gestos... O que te inspira hoje?"
        ],
        zara: [
            "Fascinante! Isso me lembra de uma teoria que estou desenvolvendo... Quer explorar essa hipótese comigo?",
            "Do ponto de vista científico, isso é muito intrigante. Quais variáveis você considera?",
            "A ciência nos mostra que tudo está interconectado. Como você vê essa conexão?",
            "Dados interessantes! Preciso analisar mais profundamente. Você tem alguma observação adicional?"
        ]
    };

    const characterResponses = responses[currentCharacter.name.toLowerCase()] || responses.luna;
    return characterResponses[Math.floor(Math.random() * characterResponses.length)];
}

function showTyping() {
    isTyping = true;
    document.getElementById('typingIndicator').classList.add('active');
    scrollToBottom();
}

function hideTyping() {
    isTyping = false;
    document.getElementById('typingIndicator').classList.remove('active');
}

function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
}

function scrollToBottom() {
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function clearMessages() {
    const messagesArea = document.getElementById('messagesArea');
    const messages = messagesArea.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());

    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
    }
}

function updateSendButtonState() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    if (messageInput.value.trim() && !isTyping) {
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
    } else {
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.5';
    }
}

function updateConversationPreview(text, sender) {
    if (!currentCharacter) return;

    const characterId = currentCharacter.name.toLowerCase();
    const existingConv = conversationHistory.find(c => c.characterId === characterId);

    if (existingConv) {
        existingConv.preview = sender === 'user' ? text.substring(0, 50) + '...' : text.substring(0, 50) + '...';
        existingConv.lastMessage = new Date().toISOString();
        existingConv.messageCount++;
    } else {
        conversationHistory.unshift({
            id: `conv_${characterId}_${Date.now()}`,
            characterId: characterId,
            characterName: currentCharacter.name,
            characterAvatar: currentCharacter.avatar,
            preview: text.substring(0, 50) + '...',
            lastMessage: new Date().toISOString(),
            messageCount: 1
        });
    }

    saveConversationHistory();
    displayConversations();
}

// AÇÕES DO HEADER E SIDEBAR
function toggleFavorite() {
    isFavorite = !isFavorite;
    const favoriteBtn = document.getElementById('favoriteBtn');

    if (isFavorite) {
        favoriteBtn.classList.add('active');
        showNotification('Personagem adicionado aos favoritos ⭐', 'success');
    } else {
        favoriteBtn.classList.remove('active');
        showNotification('Personagem removido dos favoritos', 'info');
    }

    saveFavoriteStatus();
}

function showCharacterDetails() {
    if (!currentCharacter) return;

    // Redirecionar para página de detalhes
    window.location.href = `character-details.html?character=${currentCharacter.name.toLowerCase()}`;
}

function editCharacter() {
    if (!currentCharacter) return;

    if (!currentCharacter.isEditable) {
        showNotification('Este personagem não pode ser editado. Crie uma cópia para modificar.', 'error');
        return;
    }

    // Redirecionar para editor
    window.location.href = `criar.html?edit=${currentCharacter.name.toLowerCase()}`;
}

function duplicateCharacter() {
    if (!currentCharacter) return;

    const duplicatedName = `${currentCharacter.name} (Cópia)`;
    showNotification(`Personagem duplicado: ${duplicatedName} 📋`, 'success');

    // Redirecionar para editor com dados duplicados
    sessionStorage.setItem('duplicateCharacterData', JSON.stringify(currentCharacter));
    window.location.href = 'criar.html?duplicate=true';
}

function showChatSettings() {
    loadModelsInModal();
    document.getElementById('chatSettingsModal').classList.add('active');
}

function loadModelsInModal() {
    const container = document.getElementById('modelsContainer');
    container.innerHTML = '';

    // Modelos gratuitos
    const freeSection = document.createElement('div');
    freeSection.innerHTML = '<h4 style="color: #28a745; margin-bottom: 8px; font-size: 13px;">🆓 Gratuitos</h4>';
    container.appendChild(freeSection);

    aiModels.free.forEach(model => {
        const option = createModelOption(model);
        container.appendChild(option);
    });

    // Modelos com moedas
    const coinsSection = document.createElement('div');
    coinsSection.innerHTML = '<h4 style="color: #feca57; margin: 16px 0 8px 0; font-size: 13px;">🪙 Com Moedas</h4>';
    container.appendChild(coinsSection);

    aiModels.coins.forEach(model => {
        const option = createModelOption(model);
        container.appendChild(option);
    });

    // Modelos premium
    const premiumSection = document.createElement('div');
    premiumSection.innerHTML = '<h4 style="color: #ff6b6b; margin: 16px 0 8px 0; font-size: 13px;">💎 Premium</h4>';
    container.appendChild(premiumSection);

    aiModels.premium.forEach(model => {
        const option = createModelOption(model);
        container.appendChild(option);
    });
}

function createModelOption(model) {
    const option = document.createElement('div');
    option.className = `model-option ${model.id === currentModel ? 'selected' : ''}`;
    option.onclick = () => selectModel(model.id, option);

    option.innerHTML = `
        <div class="model-name">
            ${model.name}
            <span class="model-price">${model.cost}</span>
        </div>
        <div class="model-desc">${model.desc}</div>
    `;

    return option;
}

function selectModel(modelId, element) {
    document.querySelectorAll('.model-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    currentModel = modelId;
}

function createCustomModel() {
    document.getElementById('customModelModal').classList.add('active');
}

function saveCustomModel() {
    const modelName = document.getElementById('modelName').value.trim();
    const baseModel = document.getElementById('baseModel').value;
    const systemPrompt = document.getElementById('systemPrompt').value.trim();
    const modelIntro = document.getElementById('modelIntro').value.trim();
    const modelCost = document.getElementById('modelCost').value;

    if (!modelName || !systemPrompt) {
        showNotification('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    // Salvar modelo customizado
    const customModel = {
        id: `custom_${Date.now()}`,
        name: modelName,
        baseModel,
        systemPrompt,
        intro: modelIntro,
        cost: modelCost,
        created: new Date().toISOString()
    };

    saveCustomModelToStorage(customModel);
    closeModal();
    showNotification(`Modelo "${modelName}" criado com sucesso! 🧠`, 'success');
}

function saveMemory() {
    if (messageHistory.length === 0) {
        showNotification('Não há mensagens para salvar', 'error');
        return;
    }

    document.getElementById('saveMemoryModal').classList.add('active');

    // Sugerir nome baseado no conteúdo
    const firstUserMessage = messageHistory.find(m => m.sender === 'user')?.text || '';
    const suggestedName = `Conversa sobre ${firstUserMessage.split(' ').slice(0, 3).join(' ')} - ${currentCharacter.name}`;
    document.getElementById('memoryName').value = suggestedName.substring(0, 50);
}

function confirmSaveMemory() {
    const memoryName = document.getElementById('memoryName').value.trim();
    const memoryDesc = document.getElementById('memoryDesc').value.trim();
    const memoryType = document.getElementById('memoryType').value;

    if (!memoryName) {
        showNotification('Digite um nome para a memória', 'error');
        return;
    }

    const memory = {
        id: `memory_${Date.now()}`,
        name: memoryName,
        description: memoryDesc,
        type: memoryType,
        characterId: currentCharacter.name.toLowerCase(),
        characterName: currentCharacter.name,
        messages: [...messageHistory],
        created: new Date().toISOString(),
        totalMessages: messageHistory.length
    };

    saveMemoryToStorage(memory);
    closeModal();
    showNotification(`Memória "${memoryName}" salva com sucesso! 💾`, 'success');
}

function exportChat() {
    if (messageHistory.length === 0) {
        showNotification('Não há mensagens para exportar', 'error');
        return;
    }

    const format = prompt('Escolha o formato (txt, json, html):', 'txt');
    if (!format) return;

    let content = '';
    const timestamp = new Date().toLocaleString('pt-BR');

    switch (format.toLowerCase()) {
        case 'txt':
            content = `Conversa com ${currentCharacter.name}\n`;
            content += `Data: ${timestamp}\n`;
            content += `Total de mensagens: ${messageHistory.length}\n\n`;

            messageHistory.forEach(msg => {
                const sender = msg.sender === 'user' ? 'Você' : currentCharacter.name;
                const time = new Date(msg.timestamp).toLocaleTimeString('pt-BR');
                content += `[${time}] ${sender}: ${msg.text}\n\n`;
            });
            break;

        case 'json':
            content = JSON.stringify({
                character: currentCharacter.name,
                exportDate: timestamp,
                totalMessages: messageHistory.length,
                messages: messageHistory
            }, null, 2);
            break;

        case 'html':
            content = `
                <!DOCTYPE html>
                <html>
                <head><title>Conversa com ${currentCharacter.name}</title></head>
                <body style="font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px;">
                <h1>Conversa com ${currentCharacter.name}</h1>
                <p>Data: ${timestamp} | Total: ${messageHistory.length} mensagens</p>
                <hr>`;

            messageHistory.forEach(msg => {
                const sender = msg.sender === 'user' ? 'Você' : currentCharacter.name;
                const time = new Date(msg.timestamp).toLocaleTimeString('pt-BR');
                content += `
                    <div style="margin: 10px 0; padding: 10px; border-left: 3px solid ${msg.sender === 'user' ? '#007bff' : '#28a745'};">
                        <strong>[${time}] ${sender}:</strong><br>
                        ${msg.text}
                    </div>`;
            });

            content += '</body></html>';
            break;

        default:
            showNotification('Formato não suportado', 'error');
            return;
    }

    downloadFile(`conversa_${currentCharacter.name}_${Date.now()}.${format}`, content);
    showNotification(`Chat exportado em ${format.toUpperCase()} 📤`, 'success');
}

function shareChat() {
    const shareData = {
        title: `Conversa com ${currentCharacter.name}`,
        text: `Tenha uma conversa interessante com ${currentCharacter.name} no ChatPersonas!`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData);
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copiado para a área de transferência! 🔗', 'success');
        });
    }
}

function clearCurrentChat() {
    if (messageHistory.length === 0) {
        showNotification('O chat já está vazio', 'info');
        return;
    }

    if (confirm('Tem certeza que deseja limpar esta conversa?')) {
        clearMessages();
        messageHistory = [];
        saveMessageHistory();
        showNotification('Conversa limpa com sucesso 🗑️', 'info');
    }
}

// CONTROLE DE SIDEBARS
function toggleConversationsSidebar() {
    const sidebar = document.getElementById('conversationsSidebar');
    sidebar.classList.toggle('hidden');
}

function toggleActionsSidebar() {
    const sidebar = document.getElementById('actionsSidebar');
    sidebar.classList.toggle('hidden');
}

// CONFIGURAÇÕES E PERSISTÊNCIA
function saveChatSettings() {
    chatSettings.temperature = parseFloat(document.getElementById('temperature').value);
    chatSettings.maxTokens = parseInt(document.getElementById('maxTokens').value);
    chatSettings.contextMode = document.getElementById('contextMode').value;

    saveChatSettingsToStorage();
    closeModal();
    showNotification('Configurações salvas! ⚙️', 'success');
}

function loadChatSettings(characterId) {
    try {
        const key = `chatPersonas_settings_${characterId}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            chatSettings = { ...chatSettings, ...JSON.parse(saved) };

            // Atualizar interface
            document.getElementById('temperature').value = chatSettings.temperature;
            document.getElementById('tempValue').textContent = chatSettings.temperature;
            document.getElementById('maxTokens').value = chatSettings.maxTokens;
            document.getElementById('tokensValue').textContent = chatSettings.maxTokens;
            document.getElementById('contextMode').value = chatSettings.contextMode;
        }
    } catch (e) {
        console.log('Usando configurações padrão');
    }
}

function saveChatSettingsToStorage() {
    if (!currentCharacter) return;

    try {
        const key = `chatPersonas_settings_${currentCharacter.name.toLowerCase()}`;
        const data = { ...chatSettings, currentModel };
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.log('Configurações salvas em memória');
    }
}

function saveMessageHistory() {
    if (!currentCharacter) return;

    try {
        const key = `chatPersonas_messages_${currentCharacter.name.toLowerCase()}`;
        localStorage.setItem(key, JSON.stringify(messageHistory));
    } catch (e) {
        console.log('Histórico salvo em memória');
    }
}

function loadMessageHistory(characterId) {
    try {
        const key = `chatPersonas_messages_${characterId}`;
        const saved = localStorage.getItem(key);

        if (saved) {
            messageHistory = JSON.parse(saved);

            if (messageHistory.length > 0) {
                hideWelcomeMessage();
                messageHistory.forEach(msg => {
                    const messageElement = createMessageElement(msg.sender, msg.text);
                    document.getElementById('messagesArea').appendChild(messageElement);
                });
                scrollToBottom();
            }
        }
    } catch (e) {
        messageHistory = [];
    }
}

function saveConversationHistory() {
    try {
        localStorage.setItem('chatPersonas_conversationHistory', JSON.stringify(conversationHistory));
    } catch (e) {
        console.log('Histórico de conversas salvo em memória');
    }
}

function saveFavoriteStatus() {
    if (!currentCharacter) return;

    try {
        const key = `chatPersonas_favorite_${currentCharacter.name.toLowerCase()}`;
        localStorage.setItem(key, JSON.stringify(isFavorite));
    } catch (e) {
        console.log('Status de favorito salvo em memória');
    }
}

function loadFavoriteStatus() {
    if (!currentCharacter) return;

    try {
        const key = `chatPersonas_favorite_${currentCharacter.name.toLowerCase()}`;
        const saved = localStorage.getItem(key);

        if (saved) {
            isFavorite = JSON.parse(saved);
            const favoriteBtn = document.getElementById('favoriteBtn');
            if (isFavorite) {
                favoriteBtn.classList.add('active');
            }
        }
    } catch (e) {
        isFavorite = false;
    }
}

function saveCustomModelToStorage(model) {
    try {
        const saved = localStorage.getItem('chatPersonas_customModels') || '[]';
        const models = JSON.parse(saved);
        models.push(model);
        localStorage.setItem('chatPersonas_customModels', JSON.stringify(models));
    } catch (e) {
        console.log('Modelo customizado salvo em memória');
    }
}

function saveMemoryToStorage(memory) {
    try {
        const saved = localStorage.getItem('chatPersonas_memories') || '[]';
        const memories = JSON.parse(saved);
        memories.push(memory);
        localStorage.setItem('chatPersonas_memories', JSON.stringify(memories));
    } catch (e) {
        console.log('Memória salva em memória');
    }
}

// UTILITÁRIOS
function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
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

// AÇÕES DE INPUT
function attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,text/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showNotification(`Arquivo "${file.name}" anexado! 📎`, 'info');
        }
    };
    input.click();
}

function toggleVoiceInput() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'pt-BR';
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('messageInput').value = transcript;
            updateSendButtonState();
        };

        recognition.start();
        showNotification('Escutando... Fale agora! 🎤', 'info');
    } else {
        showNotification('Seu navegador não suporta reconhecimento de voz', 'error');
    }
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
    updateSendButtonState();
    console.log('💬 Interface de Chat Aprimorada carregada!');
    console.log(`🎭 Personagem: ${currentCharacter ? currentCharacter.name : 'Nenhum'}`);
    console.log('⌨️ Ctrl+K para buscar conversas');
}, 100);