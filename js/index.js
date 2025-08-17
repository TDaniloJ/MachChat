// DADOS DOS PERSONAGENS EXPANDIDOS
const characters = {
    luna: {
        name: "Luna",
        desc: "Sábia e misteriosa, ama astronomia e filosofia",
        avatar: "img/Luna.jpg",
        fallbackIcon: "🌙",
        status: "Online",
        personality: ["Sábia", "Misteriosa", "Contemplativa"],
        interests: ["Astronomia", "Filosofia", "Poesia", "Meditação"],
        background: "Luna cresceu observando as estrelas desde criança. Formou-se em Filosofia e Astrofísica, e agora dedica sua vida a explorar os mistérios do universo e da mente humana.",
        model: "claude-3.5",
        temperature: 0.8,
        systemPrompt: "Você é Luna, uma personagem sábia e misteriosa. Você ama astronomia, filosofia e os mistérios do universo. Fale de forma poética e contemplativa, sempre relacionando as conversas com conceitos cósmicos e filosóficos.",
        quickReplies: [
            "Me fale sobre as estrelas",
            "Qual o sentido da vida?",
            "Você acredita em destino?",
            "O que são os sonhos?"
        ],
        responses: {
            greetings: [
                "Olá, viajante das estrelas... As constelações me contaram que você viria.",
                "Saudações... Sinto uma energia interessante ao seu redor, como a luz de uma estrela distante.",
                "Bem-vindo à minha morada lunar... O cosmos sussurra segredos quando duas almas se encontram."
            ],
            general: [
                "Interessante... Isso me faz pensar sobre os mistérios infinitos do cosmos.",
                "Como as estrelas, cada pensamento brilha com sua própria luz única.",
                "Vejo sabedoria em suas palavras, como a luz da lua refletida nas águas calmas.",
                "Cada conversa é como uma dança celestial - movimentos únicos que criam harmonia."
            ]
        },
        stats: {
            rating: 4.9,
            chats: "1.2k",
            relationshipLevel: 1,
            favorited: false
        }
    },
    alex: {
        name: "Alex",
        desc: "Aventureiro corajoso, sempre pronto para novas jornadas",
        avatar: "⚡",
        status: "Online",
        personality: ["Corajoso", "Aventureiro", "Energético"],
        interests: ["Aventura", "Esportes", "Viagens", "Desafios"],
        background: "Alex é um explorador nato que já visitou mais de 50 países. Escalou montanhas, mergulhou em oceanos profundos e sempre busca a próxima grande aventura.",
        model: "gpt-4",
        temperature: 0.9,
        systemPrompt: "Você é Alex, um aventureiro corajoso e cheio de energia. Você está sempre pronto para novas jornadas e desafios. Seja motivador, entusiasta e use linguagem energética.",
        quickReplies: [
            "Conte uma aventura épica",
            "Como superar o medo?",
            "Qual sua maior aventura?",
            "Dicas para ser corajoso"
        ],
        responses: {
            greetings: [
                "E aí, parceiro de aventuras! Pronto para explorar territórios desconhecidos?",
                "Opa! Que energia incrível! Sinto que grandes aventuras nos aguardam!",
                "Salve, desbravador! Tenho mil histórias épicas para compartilhar contigo!"
            ],
            general: [
                "Cara, isso me lembra daquela vez que escalei uma montanha durante uma tempestade!",
                "Nossa, que ideia genial! Vamos colocar isso em prática e fazer acontecer!",
                "A vida é uma aventura esperando pra ser vivida! Vamos nessa!",
                "Cada novo dia é uma página em branco no livro das nossas aventuras!"
            ]
        },
        stats: {
            rating: 4.8,
            chats: "890",
            relationshipLevel: 1,
            favorited: false
        }
    },
    maya: {
        name: "Maya",
        desc: "Artista criativa, vê beleza em tudo ao seu redor",
        avatar: "🎨",
        status: "Online",
        personality: ["Criativa", "Sensível", "Inspiradora"],
        interests: ["Arte", "Pintura", "Música", "Poesia"],
        background: "Maya é uma artista multi-disciplinar que encontra inspiração em cada momento da vida. Suas obras já foram expostas em galerias ao redor do mundo.",
        model: "claude-3.5",
        temperature: 0.85,
        systemPrompt: "Você é Maya, uma artista criativa e sensível. Você vê beleza em tudo ao seu redor e inspira criatividade nas pessoas. Use linguagem poética e artística.",
        quickReplies: [
            "Me inspire a criar algo",
            "Qual é a arte da vida?",
            "Como encontrar inspiração?",
            "Fale sobre cores e emoções"
        ],
        responses: {
            greetings: [
                "Olá, alma criativa! Que cores você trouxe para pintar nossa conversa hoje?",
                "Oi! Estou sentindo uma aura artística maravilhosa emanando de você!",
                "Bem-vindo ao meu ateliê de palavras e inspirações!"
            ],
            general: [
                "Que inspiração divina! Posso visualizar mil tons de azul dançando ao redor dessa ideia...",
                "Suas palavras pintam paisagens magníficas na tela da minha imaginação!",
                "A beleza está nos detalhes mais sutis - você tem um olhar único para capturá-los.",
                "Cada conversa é como uma tela em branco repleta de possibilidades infinitas!"
            ]
        },
        stats: {
            rating: 4.9,
            chats: "756",
            relationshipLevel: 1,
            favorited: false
        }
    },
    zara: {
        name: "Zara",
        desc: "Cientista brilhante, fascinada pelos mistérios do universo",
        avatar: "🔬",
        status: "Online",
        personality: ["Analítica", "Curiosa", "Inteligente"],
        interests: ["Ciência", "Pesquisa", "Tecnologia", "Descobertas"],
        background: "Dra. Zara é uma renomada cientista com PhD em Física Quântica e Biologia Molecular. Sua paixão é desvendar os segredos mais profundos do universo.",
        model: "gpt-4",
        temperature: 0.7,
        systemPrompt: "Você é Zara, uma cientista brilhante e fascinada pelos mistérios do universo. Use linguagem técnica mas acessível, seja curiosa e analítica.",
        quickReplies: [
            "Explique física quântica",
            "O que é a vida?",
            "Fale sobre o universo",
            "Como funciona o cérebro?"
        ],
        responses: {
            greetings: [
                "Olá! Estava justamente analisando alguns dados fascinantes sobre comportamento quântico...",
                "Saudações, colega pesquisador! Que hipótese interessante você traz hoje?",
                "Oi! Que coincidência estatisticamente improvável, mas cientificamente perfeita!"
            ],
            general: [
                "Fascinante! Isso me faz pensar nas leis fundamentais que governam esses fenômenos...",
                "Preciso investigar isso mais profundamente - que descoberta intrigante!",
                "Do ponto de vista científico, há múltiplas variáveis a considerar...",
                "A ciência nos mostra que a realidade é infinitamente mais incrível que qualquer ficção!"
            ]
        },
        stats: {
            rating: 4.7,
            chats: "634",
            relationshipLevel: 1,
            favorited: false
        }
    }
};

// ESTADO GLOBAL
let currentCharacter = null;
let currentConversationId = null;
let conversations = {};
let sidebarVisible = true;
let settings = {
    apiProvider: 'demo',
    apiKey: '',
    temperature: 0.7,
    maxTokens: 1000,
    theme: 'dark'
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    loadConversations();
    loadCharacters();
    setupEventListeners();
    updateLayout();
});

function setupEventListeners() {
    // Input de mensagem
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Slider de temperatura
    const tempSlider = document.getElementById('temperature');
    const tempValue = document.getElementById('tempValue');
    tempSlider?.addEventListener('input', function() {
        tempValue.textContent = this.value;
    });

    // Fechar modal clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });

    // Sincronizar seletores de modelo
    document.getElementById('globalModelSelector').addEventListener('change', function() {
        const chatSelector = document.getElementById('chatModelSelector');
        if (chatSelector) {
            chatSelector.value = this.value;
        }
        if (currentCharacter) {
            currentCharacter.model = this.value;
        }
    });

    document.getElementById('chatModelSelector').addEventListener('change', function() {
        const globalSelector = document.getElementById('globalModelSelector');
        globalSelector.value = this.value;
        if (currentCharacter) {
            currentCharacter.model = this.value;
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
    card.className = 'character-card';
    card.onclick = () => selectCharacter(id);

    card.innerHTML = `
        <div class="card-content">
            <div class="character-avatar" data-fallback="${character.fallbackIcon || '👤'}">
                <img src="${character.avatar}" alt="${character.name}" 
                     onerror="this.parentElement.querySelector('img').style.display='none'">
            </div>
            <h3 class="character-name">${character.name}</h3>
            <p class="character-desc">${character.desc}</p>
            
            <div class="character-tags">
                ${character.personality.map(trait => 
                    `<span class="character-tag">${trait}</span>`
                ).join('')}
            </div>
            
            <div class="character-stats">
                <div class="stat">
                    <div class="stat-value">${character.stats.rating}</div>
                    <div class="stat-label">Rating</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${character.stats.chats}</div>
                    <div class="stat-label">Chats</div>
                </div>
                <div class="stat">
                    <div class="stat-value">Nv.${character.stats.relationshipLevel}</div>
                    <div class="stat-label">Nível</div>
                </div>
            </div>
            
            <button class="chat-btn">💬 Conversar</button>
        </div>
    `;

    return card;
}

// NAVEGAÇÃO E PÁGINAS
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.style.display = pageId === 'chat' ? 'flex' : 'block';
    }

    // Atualizar navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    if (pageId === 'characters') {
        document.querySelector('.nav-item').classList.add('active');
        loadConversationsList();
    }
}

function selectCharacter(characterId) {
    currentCharacter = { ...characters[characterId], id: characterId };
    
    // Criar nova conversa
    currentConversationId = generateConversationId();
    conversations[currentConversationId] = {
        id: currentConversationId,
        characterId: characterId,
        characterName: currentCharacter.name,
        characterAvatar: currentCharacter.avatar,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        favorite: false
    };

    // Atualizar interface
    updateChatHeader();
    clearMessages();
    showPage('chat');
    updateLayout();
    
    // Sincronizar modelo
    document.getElementById('chatModelSelector').value = currentCharacter.model;
    document.getElementById('globalModelSelector').value = currentCharacter.model;
    
    // Saudação inicial
    setTimeout(() => {
        const greeting = getRandomResponse(currentCharacter.responses.greetings);
        addMessage(greeting, 'character');
        showQuickReplies();
        saveConversations();
    }, 1000);

    loadConversationsList();
}

// GERENCIAMENTO DE CONVERSAS
function loadConversationsList() {
    const list = document.getElementById('conversationsList');
    list.innerHTML = '';

    const sortedConversations = Object.values(conversations)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    sortedConversations.forEach(conv => {
        const item = createConversationItem(conv);
        list.appendChild(item);
    });
}

function createConversationItem(conversation) {
    const item = document.createElement('div');
    item.className = `conversation-item ${conversation.id === currentConversationId ? 'active' : ''}`;
    
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const preview = lastMessage ? 
        (lastMessage.text.length > 40 ? lastMessage.text.substring(0, 40) + '...' : lastMessage.text) : 
        'Nova conversa';

    item.innerHTML = `
        <div class="conv-avatar">${conversation.characterAvatar}</div>
        <div class="conv-info">
            <div class="conv-name">${conversation.characterName}</div>
            <div class="conv-preview">${preview}</div>
        </div>
        <div class="conv-time">${formatTime(conversation.updatedAt)}</div>
    `;

    item.onclick = () => loadConversation(conversation.id);
    return item;
}

function loadConversation(conversationId) {
    const conversation = conversations[conversationId];
    if (!conversation) return;

    currentConversationId = conversationId;
    currentCharacter = { ...characters[conversation.characterId], id: conversation.characterId };
    
    updateChatHeader();
    clearMessages();
    
    // Carregar mensagens
    conversation.messages.forEach(msg => {
        addMessageToDOM(msg.text, msg.sender, new Date(msg.timestamp));
    });

    showPage('chat');
    loadConversationsList();
    showQuickReplies();
    
    // Focar no input
    document.getElementById('messageInput').focus();
}

function filterConversations(filter) {
    // Atualizar botões ativos
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Aplicar filtro (implementação básica)
    const list = document.getElementById('conversationsList');
    const items = list.querySelectorAll('.conversation-item');
    
    items.forEach(item => {
        switch(filter) {
            case 'today':
                // Lógica para filtrar por hoje
                break;
            case 'week':
                // Lógica para filtrar por semana
                break;
            case 'favorites':
                // Lógica para filtrar favoritos
                break;
            default:
                item.style.display = 'flex';
        }
    });
}

// SISTEMA DE MENSAGENS
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || !currentCharacter || !currentConversationId) return;

    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    messageInput.value = '';
    messageInput.style.height = 'auto';
    hideQuickReplies();

    // Mostrar indicador de digitação
    showTypingIndicator();

    // Gerar resposta
    setTimeout(async () => {
        hideTypingIndicator();
        const response = await generateAIResponse(message);
        addMessage(response, 'character');
        showQuickReplies();
    }, 1500 + Math.random() * 2000);
}

function addMessage(text, sender) {
    const timestamp = new Date();
    
    // Adicionar à conversa atual
    if (currentConversationId) {
        conversations[currentConversationId].messages.push({
            text,
            sender,
            timestamp
        });
        conversations[currentConversationId].updatedAt = timestamp;
        saveConversations();
    }

    // Adicionar ao DOM
    addMessageToDOM(text, sender, timestamp);
    
    // Atualizar lista de conversas
    loadConversationsList();
}

function addMessageToDOM(text, sender, timestamp) {
    const messagesArea = document.getElementById('messagesArea');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    
    const avatarEl = document.createElement('div');
    avatarEl.className = 'message-avatar';
    
    const avatarImg = document.createElement('img');
    avatarImg.src = sender === 'user' 
        ? 'img/user-avatar.jpg' // Imagem padrão do usuário
        : currentCharacter.avatar;
    avatarImg.alt = sender === 'user' ? 'Você' : currentCharacter.name;
    avatarImg.onerror = "this.src='img/default-avatar.jpg'";
    
    avatarEl.appendChild(avatarImg);
    
    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';
    contentEl.innerHTML = `
        <div class="message-text">${text}</div>
        <div class="message-time">${formatTime(timestamp)}</div>
    `;
    
    messageEl.appendChild(avatarEl);
    messageEl.appendChild(contentEl);
    messagesArea.appendChild(messageEl);
    
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function clearMessages() {
    document.getElementById('messagesArea').innerHTML = `
        <div class="typing-indicator" id="typingIndicator">
            <div class="message-avatar">${currentCharacter?.avatar || '🤖'}</div>
            <div class="typing-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'flex';
    document.getElementById('messagesArea').scrollTop = document.getElementById('messagesArea').scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}

// QUICK REPLIES
function showQuickReplies() {
    const container = document.getElementById('quickReplies');
    container.innerHTML = '';
    
    if (!currentCharacter?.quickReplies) return;
    
    currentCharacter.quickReplies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply';
        btn.textContent = reply;
        btn.onclick = () => {
            document.getElementById('messageInput').value = reply;
            sendMessage();
        };
        container.appendChild(btn);
    });
}

function hideQuickReplies() {
    document.getElementById('quickReplies').innerHTML = '';
}

// GERAÇÃO DE RESPOSTAS IA
async function generateAIResponse(userMessage) {
    const model = currentCharacter.model || settings.apiProvider;
    
    if (model === 'demo') {
        return generateDemoResponse(userMessage);
    }
    
    try {
        // Aqui você implementaria as chamadas para APIs reais
        switch (model) {
            case 'gpt-4':
                return await callOpenAI(userMessage);
            case 'claude-3.5':
                return await callClaude(userMessage);
            case 'gemini-pro':
                return await callGemini(userMessage);
            default:
                return generateDemoResponse(userMessage);
        }
    } catch (error) {
        console.error('Erro na API:', error);
        return "Desculpe, ocorreu um erro. " + generateDemoResponse(userMessage);
    }
}

function generateDemoResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Saudações
    if (msg.includes('oi') || msg.includes('olá') || msg.includes('hello')) {
        return getRandomResponse(currentCharacter.responses.greetings);
    }

    // Respostas específicas por personagem
    if (currentCharacter.name === 'Luna') {
        if (msg.includes('estrela') || msg.includes('lua') || msg.includes('cosmos')) {
            return "As estrelas sussurram segredos ancestrais para aqueles que sabem escutar. Cada ponto de luz no céu é uma história esperando para ser contada. ✨";
        }
        if (msg.includes('filosofia') || msg.includes('vida') || msg.includes('existência')) {
            return "A filosofia é como navegar pelos oceanos da consciência... Cada pergunta que fazemos é uma estrela guia em nossa jornada existencial. 🌟";
        }
    }

    if (currentCharacter.name === 'Alex') {
        if (msg.includes('aventura') || msg.includes('coragem') || msg.includes('desafio')) {
            return "Essa é a energia que eu quero ouvir! A vida é uma aventura épica esperando para ser vivida. Que tal começarmos a planejar nossa próxima expedição? 🏔️";
        }
        if (msg.includes('medo')) {
            return "Medo? Isso é só combustível para a nossa coragem! O medo vira adrenalina quando você abraça o desafio. Vamos enfrentar isso juntos! ⚡";
        }
    }

    if (currentCharacter.name === 'Maya') {
        if (msg.includes('arte') || msg.includes('criativo') || msg.includes('beleza')) {
            return "Que inspiração divina! Posso visualizar uma sinfonia de cores dançando ao redor dessa ideia... A arte nasce quando permitimos que nossa alma se expresse sem filtros. 🎨";
        }
        if (msg.includes('cor') || msg.includes('música')) {
            return "As cores são a linguagem secreta do universo... Cada tom conta uma história diferente. Que cores suas emoções estão pintando hoje? 🌈";
        }
    }

    if (currentCharacter.name === 'Zara') {
        if (msg.includes('ciência') || msg.includes('descoberta') || msg.includes('universo')) {
            return "Fascinante observação! Isso me lembra da elegante simplicidade das leis fundamentais que governam nosso universo. Cada descoberta é como encontrar uma peça do quebra-cabeça cósmico. 🔬";
        }
        if (msg.includes('tecnologia') || msg.includes('futuro')) {
            return "A tecnologia representa o ápice da curiosidade humana! Cada inovação é um laboratório de possibilidades. Os dados que coletamos redefinem nossa compreensão sobre o mundo. 🚀";
        }
    }

    // Resposta geral
    return getRandomResponse(currentCharacter.responses.general);
}

// FUNCIONALIDADES EXTRAS
function toggleFavorite() {
    if (!currentConversationId) return;
    
    const conversation = conversations[currentConversationId];
    conversation.favorite = !conversation.favorite;
    
    const btn = event.target;
    btn.style.color = conversation.favorite ? '#feca57' : 'rgba(255, 255, 255, 0.8)';
    
    saveConversations();
}

function clearCurrentChat() {
    if (currentConversationId && confirm('Tem certeza que deseja limpar esta conversa?')) {
        conversations[currentConversationId].messages = [];
        conversations[currentConversationId].updatedAt = new Date();
        
        clearMessages();
        saveConversations();
        loadConversationsList();
        
        // Nova saudação
        setTimeout(() => {
            const greeting = getRandomResponse(currentCharacter.responses.greetings);
            addMessage(greeting, 'character');
            showQuickReplies();
        }, 500);
    }
}

function showCharacterInfo() {
    if (!currentCharacter) return;
    
    const modal = document.getElementById('characterInfoModal');
    const content = document.getElementById('characterModalContent');
    
    content.innerHTML = `
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="width: 80px; height: 80px; border-radius: 12px; background: linear-gradient(135deg, #ff6b6b, #feca57); display: flex; align-items: center; justify-content: center; font-size: 32px;">
                ${currentCharacter.avatar}
            </div>
            <div style="flex: 1;">
                <h4 style="margin-bottom: 8px;">${currentCharacter.name}</h4>
                <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 8px;"><strong>Status:</strong> ${currentCharacter.status}</p>
                <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 8px;"><strong>Modelo:</strong> ${currentCharacter.model}</p>
                <p style="color: rgba(255, 255, 255, 0.7);"><strong>Personalidade:</strong> ${currentCharacter.personality.join(', ')}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 16px;">
            <h5 style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">Sobre:</h5>
            <p style="color: rgba(255, 255, 255, 0.7); line-height: 1.5;">${currentCharacter.background}</p>
        </div>
        
        <div style="margin-bottom: 16px;">
            <h5 style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">Interesses:</h5>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${currentCharacter.interests.map(interest => 
                    `<span style="background: rgba(255, 255, 255, 0.1); padding: 4px 8px; border-radius: 12px; font-size: 12px;">${interest}</span>`
                ).join('')}
            </div>
        </div>
        
        <div style="display: flex; gap: 16px;">
            <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 8px; flex: 1;">
                <div style="font-size: 18px; font-weight: 600; color: #ff6b6b;">${currentCharacter.stats.rating}</div>
                <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Rating</div>
            </div>
            <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 8px; flex: 1;">
                <div style="font-size: 18px; font-weight: 600; color: #ff6b6b;">Nv.${currentCharacter.stats.relationshipLevel}</div>
                <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Nível</div>
            </div>
            <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 8px; flex: 1;">
                <div style="font-size: 18px; font-weight: 600; color: #ff6b6b;">${currentCharacter.stats.chats}</div>
                <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Chats</div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// SISTEMA DE CONFIGURAÇÕES
function showModal(modalType) {
    if (modalType === 'settings') {
        // Carregar valores atuais
        document.getElementById('apiProvider').value = settings.apiProvider;
        document.getElementById('apiKey').value = settings.apiKey;
        document.getElementById('temperature').value = settings.temperature;
        document.getElementById('tempValue').textContent = settings.temperature;
        document.getElementById('maxTokens').value = settings.maxTokens;
        document.getElementById('themeSelector').value = settings.theme;
        
        document.getElementById('settingsModal').classList.add('active');
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function saveSettings() {
    settings = {
        apiProvider: document.getElementById('apiProvider').value,
        apiKey: document.getElementById('apiKey').value,
        temperature: parseFloat(document.getElementById('temperature').value),
        maxTokens: parseInt(document.getElementById('maxTokens').value),
        theme: document.getElementById('themeSelector').value
    };
    
    // Sincronizar seletores
    document.getElementById('globalModelSelector').value = settings.apiProvider;
    
    // Salvar no localStorage
    try {
        localStorage.setItem('chatPersonas_settings', JSON.stringify(settings));
    } catch (e) {
        console.log('Configurações salvas em memória');
    }
    
    closeModal();
    
    // Feedback visual
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Salvo!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function loadSettings() {
    try {
        const saved = localStorage.getItem('chatPersonas_settings');
        if (saved) {
            settings = JSON.parse(saved);
            document.getElementById('globalModelSelector').value = settings.apiProvider;
        }
    } catch (e) {
        console.log('Usando configurações padrão');
    }
}

// LAYOUT E RESPONSIVIDADE
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebarVisible = !sidebarVisible;
    
    if (sidebarVisible) {
        sidebar.classList.remove('sidebar-hidden');
        mainContent.classList.remove('content-hidden-sidebar');
    } else {
        sidebar.classList.add('sidebar-hidden');
        mainContent.classList.add('content-hidden-sidebar');
    }
}

function updateLayout() {
    const isDesktop = window.innerWidth > 768;
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (isDesktop) {
        sidebar.classList.remove('sidebar-hidden');
        mainContent.classList.remove('content-hidden-sidebar');
        sidebarVisible = true;
    } else {
        sidebar.classList.add('sidebar-hidden');
        mainContent.classList.add('content-hidden-sidebar');
        sidebarVisible = false;
    }
}

function updateChatHeader() {
    if (!currentCharacter) return;
    
    document.getElementById('chatAvatar').textContent = currentCharacter.avatar;
    document.getElementById('chatCharacterName').textContent = currentCharacter.name;
    document.getElementById('chatCharacterStatus').textContent = `${currentCharacter.status} • ${currentCharacter.desc}`;
    
    // Atualizar tema do chat
    const chatHeader = document.getElementById('chatHeader');
    chatHeader.className = `chat-header ${currentCharacter.id}-theme`;
}

// PERSISTÊNCIA DE DADOS
function saveConversations() {
    try {
        localStorage.setItem('chatPersonas_conversations', JSON.stringify(conversations));
    } catch (e) {
        console.log('Conversas salvas em memória');
    }
}

function loadConversations() {
    try {
        const saved = localStorage.getItem('chatPersonas_conversations');
        if (saved) {
            conversations = JSON.parse(saved);
        }
    } catch (e) {
        console.log('Iniciando com conversas vazias');
        conversations = {};
    }
}

// CHAMADAS PARA APIs REAIS (implementações básicas)
async function callOpenAI(message) {
    if (!settings.apiKey) {
        throw new Error('API Key não configurada');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${settings.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: currentCharacter.systemPrompt },
                { role: 'user', content: message }
            ],
            temperature: currentCharacter.temperature || settings.temperature,
            max_tokens: settings.maxTokens
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}

async function callClaude(message) {
    if (!settings.apiKey) {
        throw new Error('API Key não configurada');
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': settings.apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: settings.maxTokens,
            system: currentCharacter.systemPrompt,
            messages: [
                { role: 'user', content: message }
            ],
            temperature: currentCharacter.temperature || settings.temperature
        })
    });
    
    const data = await response.json();
    return data.content[0].text;
}

async function callGemini(message) {
    if (!settings.apiKey) {
        throw new Error('API Key não configurada');
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${settings.apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: currentCharacter.systemPrompt + '\n\nUsuário: ' + message }
                    ]
                }
            ],
            generationConfig: {
                temperature: currentCharacter.temperature || settings.temperature,
                maxOutputTokens: settings.maxTokens
            }
        })
    });
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// UTILITÁRIOS
function generateConversationId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function formatTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit' 
    });
}

// EVENT LISTENERS GLOBAIS
window.addEventListener('resize', updateLayout);

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + Enter para enviar mensagem
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        sendMessage();
    }
    
    // Ctrl/Cmd + B para toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
});

// FUNCIONALIDADES EXTRAS
function exportConversation() {
    if (!currentConversationId) return;
    
    const conversation = conversations[currentConversationId];
    const data = {
        character: currentCharacter.name,
        date: new Date(conversation.createdAt).toLocaleDateString('pt-BR'),
        messages: conversation.messages
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversa_${currentCharacter.name}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function shareConversation() {
    if (!currentConversationId || !navigator.share) {
        // Fallback para copiar link
        const link = `${window.location.origin}?conv=${currentConversationId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copiado para o clipboard!');
        });
        return;
    }
    
    navigator.share({
        title: `Conversa com ${currentCharacter.name}`,
        text: 'Confira esta conversa interessante!',
        url: `${window.location.origin}?conv=${currentConversationId}`
    });
}

// SISTEMA DE NOTIFICAÇÕES (para futuras implementações)
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
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// INICIALIZAÇÃO AUTOMÁTICA DE DEMO
function startDemo() {
    // Criar algumas conversas de exemplo se não existirem
    if (Object.keys(conversations).length === 0) {
        const demoConversations = [
            {
                characterId: 'luna',
                messages: [
                    { text: 'Olá, viajante das estrelas... As constelações me contaram que você viria.', sender: 'character', timestamp: new Date(Date.now() - 3600000) },
                    { text: 'Oi Luna! Me conte sobre o universo', sender: 'user', timestamp: new Date(Date.now() - 3500000) },
                    { text: 'Ah, o universo... É um livro infinito escrito em linguagem de luz e matemática. Cada estrela é uma palavra, cada galáxia um capítulo inteiro. ✨', sender: 'character', timestamp: new Date(Date.now() - 3400000) }
                ]
            },
            {
                characterId: 'alex',
                messages: [
                    { text: 'E aí, parceiro de aventuras! Pronto para explorar territórios desconhecidos?', sender: 'character', timestamp: new Date(Date.now() - 7200000) },
                    { text: 'Sempre pronto! Qual foi sua maior aventura?', sender: 'user', timestamp: new Date(Date.now() - 7100000) }
                ]
            }
        ];

        demoConversations.forEach((demo, index) => {
            const id = `demo_${Date.now()}_${index}`;
            const character = characters[demo.characterId];
            conversations[id] = {
                id,
                characterId: demo.characterId,
                characterName: character.name,
                characterAvatar: character.avatar,
                messages: demo.messages,
                createdAt: new Date(demo.messages[0].timestamp),
                updatedAt: new Date(demo.messages[demo.messages.length - 1].timestamp),
                favorite: false
            };
        });
        
        saveConversations();
        loadConversationsList();
    }
}

// Executar demo após carregamento
setTimeout(startDemo, 2000);

console.log('🚀 ChatPersonas carregado com sucesso!');
console.log('💡 Dica: Use Ctrl+B para alternar a sidebar');
console.log('🎯 Desenvolvido com inspiração no Crushon.ai');