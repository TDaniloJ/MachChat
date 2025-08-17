// ESTADO DO FORMULÁRIO
let characterData = {
    name: '',
    desc: '',
    avatar: '',
    personality: [],
    interests: [],
    background: '',
    systemPrompt: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updatePreview();
});

function setupEventListeners() {
    // Avatar selector
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            characterData.avatar = this.dataset.avatar;
            updatePreview();
        });
    });

    // Personality tags
    document.querySelectorAll('#personalityTags .tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
            const trait = this.dataset.trait;
            if (this.classList.contains('selected')) {
                if (!characterData.personality.includes(trait)) {
                    characterData.personality.push(trait);
                }
            } else {
                characterData.personality = characterData.personality.filter(t => t !== trait);
            }
            updatePreview();
        });
    });

    // Interest tags
    document.querySelectorAll('#interestsTags .tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
            const interest = this.dataset.interest;
            if (this.classList.contains('selected')) {
                if (!characterData.interests.includes(interest)) {
                    characterData.interests.push(interest);
                }
            } else {
                characterData.interests = characterData.interests.filter(i => i !== interest);
            }
            updatePreview();
        });
    });

    // Custom trait input
    document.getElementById('customTraitInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addCustomTrait(this.value.trim());
            this.value = '';
        }
    });

    // Custom interest input
    document.getElementById('customInterestInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addCustomInterest(this.value.trim());
            this.value = '';
        }
    });

    // Form inputs
    document.getElementById('characterName').addEventListener('input', function() {
        characterData.name = this.value;
        updatePreview();
    });

    document.getElementById('characterDesc').addEventListener('input', function() {
        characterData.desc = this.value;
        updatePreview();
    });

    document.getElementById('characterBackground').addEventListener('input', function() {
        characterData.background = this.value;
    });

    document.getElementById('systemPrompt').addEventListener('input', function() {
        characterData.systemPrompt = this.value;
    });

    // Sliders
    document.getElementById('temperature').addEventListener('input', function() {
        characterData.temperature = parseFloat(this.value);
        document.getElementById('tempValue').textContent = this.value;
    });

    document.getElementById('maxTokens').addEventListener('input', function() {
        characterData.maxTokens = parseInt(this.value);
        document.getElementById('tokensValue').textContent = this.value;
    });

    // Model selector
    document.getElementById('aiModel').addEventListener('change', function() {
        characterData.model = this.value;
    });

    // Form submission
    document.getElementById('characterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createCharacter();
    });
}

function addCustomTrait(trait) {
    if (!characterData.personality.includes(trait)) {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag selected';
        tagElement.dataset.trait = trait;
        tagElement.textContent = trait;
        tagElement.addEventListener('click', function() {
            this.classList.toggle('selected');
            if (this.classList.contains('selected')) {
                if (!characterData.personality.includes(trait)) {
                    characterData.personality.push(trait);
                }
            } else {
                characterData.personality = characterData.personality.filter(t => t !== trait);
            }
            updatePreview();
        });

        const input = document.getElementById('customTraitInput');
        input.parentNode.insertBefore(tagElement, input);
        
        characterData.personality.push(trait);
        updatePreview();
    }
}

function addCustomInterest(interest) {
    if (!characterData.interests.includes(interest)) {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag selected';
        tagElement.dataset.interest = interest;
        tagElement.textContent = interest;
        tagElement.addEventListener('click', function() {
            this.classList.toggle('selected');
            if (this.classList.contains('selected')) {
                if (!characterData.interests.includes(interest)) {
                    characterData.interests.push(interest);
                }
            } else {
                characterData.interests = characterData.interests.filter(i => i !== interest);
            }
            updatePreview();
        });

        const input = document.getElementById('customInterestInput');
        input.parentNode.insertBefore(tagElement, input);
        
        characterData.interests.push(interest);
        updatePreview();
    }
}

function updatePreview() {
    document.getElementById('previewAvatar').textContent = characterData.avatar || '🎭';
    document.getElementById('previewName').textContent = characterData.name || 'Nome do Personagem';
    document.getElementById('previewDesc').textContent = characterData.desc || 'Descrição do personagem aparecerá aqui';
    
    const previewTags = document.getElementById('previewTags');
    previewTags.innerHTML = '';
    
    [...characterData.personality, ...characterData.interests].forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'preview-tag';
        tagElement.textContent = tag;
        previewTags.appendChild(tagElement);
    });
}

function toggleAdvanced() {
    const settings = document.getElementById('advancedSettings');
    const icon = document.getElementById('advancedIcon');
    
    settings.classList.toggle('visible');
    icon.textContent = settings.classList.contains('visible') ? '▲' : '▼';
}

function saveAsDraft() {
    const draftData = {
        ...characterData,
        name: document.getElementById('characterName').value,
        desc: document.getElementById('characterDesc').value,
        background: document.getElementById('characterBackground').value,
        systemPrompt: document.getElementById('systemPrompt').value
    };

    try {
        const drafts = JSON.parse(localStorage.getItem('chatPersonas_drafts') || '[]');
        drafts.push({
            id: Date.now(),
            data: draftData,
            savedAt: new Date()
        });
        localStorage.setItem('chatPersonas_drafts', JSON.stringify(drafts));
        
        showNotification('Rascunho salvo com sucesso!', 'success');
    } catch (e) {
        showNotification('Erro ao salvar rascunho', 'error');
    }
}

function createCharacter() {
    // Validar campos obrigatórios
    const name = document.getElementById('characterName').value.trim();
    const desc = document.getElementById('characterDesc').value.trim();
    const background = document.getElementById('characterBackground').value.trim();

    if (!name || !desc || !background || !characterData.avatar) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }

    if (characterData.personality.length === 0) {
        showNotification('Selecione pelo menos um traço de personalidade', 'error');
        return;
    }

    // Preparar dados do personagem
    const newCharacter = {
        id: generateCharacterId(),
        name: name,
        desc: desc,
        avatar: characterData.avatar,
        personality: characterData.personality,
        interests: characterData.interests,
        background: background,
        systemPrompt: characterData.systemPrompt || generateSystemPrompt(),
        model: characterData.model,
        temperature: characterData.temperature,
        maxTokens: characterData.maxTokens,
        stats: {
            rating: 5.0,
            chats: "0",
            relationshipLevel: 1,
            favorited: false
        },
        createdAt: new Date(),
        isCustom: true
    };

    try {
        // Salvar personagem
        const customCharacters = JSON.parse(localStorage.getItem('chatPersonas_customCharacters') || '{}');
        customCharacters[newCharacter.id] = newCharacter;
        localStorage.setItem('chatPersonas_customCharacters', JSON.stringify(customCharacters));

        // Adicionar moedas ao usuário
        addCoinsToUser(50, 'Personagem criado com sucesso!');

        showNotification('Personagem criado com sucesso! +50 moedas', 'success');
        
        // Redirecionar para o chat após 2 segundos
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 2000);
        
    } catch (e) {
        showNotification('Erro ao criar personagem', 'error');
    }
}

function generateCharacterId() {
    return 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSystemPrompt() {
    const { name, personality, interests, background } = characterData;
    const personalityStr = personality.join(', ');
    const interestsStr = interests.join(', ');

    return `Você é ${name}. Sua personalidade é: ${personalityStr}. 
Seus principais interesses são: ${interestsStr}. 
Background: ${background}

Mantenha sempre essas características em suas respostas, seja natural e consistente com sua personalidade.`;
}

function addCoinsToUser(amount, reason) {
    try {
        const userData = JSON.parse(localStorage.getItem('chatPersonas_userData') || '{"coins": 250}');
        userData.coins = (userData.coins || 0) + amount;
        localStorage.setItem('chatPersonas_userData', JSON.stringify(userData));
        
        // Atualizar display
        document.getElementById('userCoins').textContent = userData.coins;
    } catch (e) {
        console.log('Erro ao adicionar moedas');
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

// Carregar dados do usuário
document.addEventListener('DOMContentLoaded', function() {
    try {
        const userData = JSON.parse(localStorage.getItem('chatPersonas_userData') || '{"coins": 250}');
        document.getElementById('userCoins').textContent = userData.coins || 250;
    } catch (e) {
        console.log('Erro ao carregar dados do usuário');
    }
});

console.log('🎭 Página de Criação de Personagens carregada!');