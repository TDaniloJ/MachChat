// ESTADO DO FORMULÁRIO
let characterData = {
    name: '',
    desc: '',
    avatar: '',
    avatarType: 'emoji', // 'emoji' ou 'image'
    avatarImage: null,
    visibility: 'public',
    personality: [],
    interests: [],
    personalityDesc: '',
    scenario: '',
    scenarioImage: null,
    greeting: '',
    personaCards: [],
    emotions: {
        anger: 0,
        love: 0,
        excitement: 0,
        submission: 0,
        hate: 0
    },
    customEmotions: [],
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
};

let activeSliders = [];
const maxSliders = 3;

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    updatePreview();
    loadUserData();
});

function setupEventListeners() {
    // Character inputs
    document.getElementById('characterName').addEventListener('input', updatePreview);
    document.getElementById('characterDesc').addEventListener('input', function () {
        updateCharCounter('characterDesc', 'descCounter', 100);
        updatePreview();
    });
    document.getElementById('personalityDesc').addEventListener('input', function () {
        updateCharCounter('personalityDesc', 'personalityCounter', 2000);
        updatePreview();
    });
    document.getElementById('scenario').addEventListener('input', function () {
        updateCharCounter('scenario', 'scenarioCounter', 1000);
        updatePreview();
    });
    document.getElementById('greeting').addEventListener('input', function () {
        updateCharCounter('greeting', 'greetingCounter', 500);
        updatePreview();
    });

    // Emoji selector
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.addEventListener('click', function () {
            selectEmoji(this.dataset.emoji);
        });
    });

    // Visibility options
    document.querySelectorAll('.visibility-option').forEach(option => {
        option.addEventListener('click', function () {
            selectVisibility(this.dataset.visibility);
        });
    });

    // Personality tags
    document.querySelectorAll('#personalityTags .tag').forEach(tag => {
        tag.addEventListener('click', function () {
            toggleTag(this, 'personality');
        });
    });

    // Interest tags
    document.querySelectorAll('#interestsTags .tag').forEach(tag => {
        tag.addEventListener('click', function () {
            toggleTag(this, 'interests');
        });
    });

    // Custom trait input
    document.getElementById('customTraitInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addCustomTag(this.value.trim(), 'personality');
            this.value = '';
        }
    });

    // Custom interest input
    document.getElementById('customInterestInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
            addCustomTag(this.value.trim(), 'interests');
            this.value = '';
        }
    });

    // Emotion sliders
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', function () {
            updateSliderValue(this);
            if (this.dataset.emotion) {
                handleEmotionSlider(this);
            }
        });
    });

    // Form submission
    document.getElementById('characterForm').addEventListener('submit', function (e) {
        e.preventDefault();
        createCharacter();
    });
}

function updateCharCounter(inputId, counterId, maxLength) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    const length = input.value.length;
    counter.textContent = length;

    if (length > maxLength) {
        counter.style.color = '#dc3545';
        input.value = input.value.substring(0, maxLength);
        counter.textContent = maxLength;
    } else {
        counter.style.color = length > maxLength * 0.9 ? '#ffc107' : 'rgba(255, 255, 255, 0.6)';
    }
}

function previewCharacterPhoto(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Arquivo muito grande. Máximo 5MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            characterData.avatarImage = e.target.result;
            characterData.avatarType = 'image';
            document.getElementById('photoPreview').src = e.target.result;
            document.getElementById('photoPreviewContainer').style.display = 'block';
            document.getElementById('photoUpload').classList.add('has-image');

            // Deselect emojis
            document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));

            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

function removeCharacterPhoto() {
    characterData.avatarImage = null;
    characterData.avatarType = 'emoji';
    document.getElementById('photoPreviewContainer').style.display = 'none';
    document.getElementById('photoUpload').classList.remove('has-image');
    document.getElementById('characterPhoto').value = '';
    updatePreview();
}

function previewScenarioImage(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 10 * 1024 * 1024) {
            showNotification('Arquivo muito grande. Máximo 10MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            characterData.scenarioImage = e.target.result;
            document.getElementById('scenarioPreview').src = e.target.result;
            document.getElementById('scenarioPreviewContainer').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function removeScenarioImage() {
    characterData.scenarioImage = null;
    document.getElementById('scenarioPreviewContainer').style.display = 'none';
    document.getElementById('scenarioImage').value = '';
}

function selectEmoji(emoji) {
    document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector(`[data-emoji="${emoji}"]`).classList.add('selected');
    characterData.avatar = emoji;
    characterData.avatarType = 'emoji';

    // Remove photo if selected
    if (characterData.avatarImage) {
        removeCharacterPhoto();
    }

    updatePreview();
}

function selectVisibility(visibility) {
    document.querySelectorAll('.visibility-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector(`[data-visibility="${visibility}"]`).classList.add('selected');
    characterData.visibility = visibility;
    updatePreview();
}

function toggleTag(tagElement, category) {
    tagElement.classList.toggle('selected');
    const value = tagElement.dataset.trait || tagElement.dataset.interest;

    if (tagElement.classList.contains('selected')) {
        if (!characterData[category].includes(value)) {
            characterData[category].push(value);
        }
    } else {
        characterData[category] = characterData[category].filter(item => item !== value);
    }
    updatePreview();
}

function addCustomTag(value, category) {
    if (!characterData[category].includes(value)) {
        const container = document.getElementById(category + 'Tags');
        const input = container.querySelector('.tag-input');

        const tagElement = document.createElement('div');
        tagElement.className = 'tag selected';
        tagElement.dataset[category === 'personality' ? 'trait' : 'interest'] = value;
        tagElement.textContent = value;
        tagElement.addEventListener('click', function () {
            toggleTag(this, category);
        });

        container.insertBefore(tagElement, input);
        characterData[category].push(value);
        updatePreview();
    }
}

function updateSliderValue(slider) {
    const valueId = slider.id.replace('Slider', 'Value');
    document.getElementById(valueId).textContent = slider.value;
}

function handleEmotionSlider(slider) {
    const emotion = slider.dataset.emotion;
    const value = parseInt(slider.value);

    if (value > 0) {
        if (!activeSliders.includes(emotion)) {
            if (activeSliders.length >= maxSliders) {
                // Reset oldest slider
                const oldestEmotion = activeSliders.shift();
                const oldestSlider = document.getElementById(oldestEmotion + 'Slider');
                oldestSlider.value = 0;
                updateSliderValue(oldestSlider);
                characterData.emotions[oldestEmotion] = 0;
            }
            activeSliders.push(emotion);
        }
    } else {
        activeSliders = activeSliders.filter(e => e !== emotion);
    }

    characterData.emotions[emotion] = value;
}

function addPersonaCard() {
    if (characterData.personaCards.length >= 5) {
        document.getElementById('addPersonaBtn').style.display = 'none';
    }
}

function removePersonaCard(cardId) {
    document.querySelector(`[data-id="${cardId}"]`).remove();
    characterData.personaCards = characterData.personaCards.filter(card => card.id !== cardId);

    if (characterData.personaCards.length < 5) {
        document.getElementById('addPersonaBtn').style.display = 'block';
    }
}

function updatePersonaCard(cardId, field, value) {
    const card = characterData.personaCards.find(c => c.id === cardId);
    if (card) {
        card[field] = value;
    }
}

function addCustomEmotion() {
    const emotionName = prompt('Nome da emoção personalizada:');
    if (emotionName && emotionName.trim()) {
        const emotion = emotionName.trim().toLowerCase();
        const emotionId = 'custom_' + emotion.replace(/\s+/g, '_');

        if (!characterData.customEmotions.find(e => e.id === emotionId)) {
            const sliderHtml = `
                <div class="emotion-slider" id="${emotionId}_container">
                    <div class="emotion-label">💭 ${emotionName}</div>
                    <input type="range" class="slider" id="${emotionId}Slider" min="0" max="100" value="0" data-emotion="${emotion}">
                    <div class="slider-value"><span id="${emotionId}Value">0</span>%</div>
                </div>
            `;

            document.getElementById('emotionSliders').insertAdjacentHTML('beforeend', sliderHtml);

            // Add event listener
            const newSlider = document.getElementById(emotionId + 'Slider');
            newSlider.addEventListener('input', function () {
                updateSliderValue(this);
                handleEmotionSlider(this);
            });

            characterData.customEmotions.push({ id: emotionId, name: emotionName, value: 0 });
            characterData.emotions[emotion] = 0;
        }
    }
}

function toggleAdvanced() {
    const settings = document.getElementById('advancedSettings');
    const icon = document.getElementById('advancedIcon');

    settings.classList.toggle('visible');
    icon.textContent = settings.classList.contains('visible') ? '▲' : '▼';
}

function updatePreview() {
    const name = document.getElementById('characterName').value || 'Nome do Personagem';
    const desc = document.getElementById('characterDesc').value || 'Descrição do personagem aparecerá aqui';
    const scenario = document.getElementById('scenario').value;
    const greeting = document.getElementById('greeting').value || 'Primeira mensagem aparecerá aqui...';

    document.getElementById('previewName').textContent = name;
    document.getElementById('previewDesc').textContent = desc;
    document.getElementById('previewGreeting').textContent = greeting;

    // Update avatar
    const avatarElement = document.getElementById('previewAvatar');
    if (characterData.avatarType === 'image' && characterData.avatarImage) {
        avatarElement.innerHTML = `<img src="${characterData.avatarImage}" alt="${name}">`;
    } else {
        avatarElement.innerHTML = `<span id="previewAvatarEmoji">${characterData.avatar || '🎭'}</span>`;
    }

    // Update visibility badge
    const badgesContainer = document.getElementById('previewBadges');
    const visibilityTexts = {
        'public': 'Público',
        'unlisted': 'Não Listado',
        'private': 'Privado'
    };
    badgesContainer.innerHTML = `<span class="preview-badge">${visibilityTexts[characterData.visibility] || 'Público'}</span>`;

    // Update traits count
    document.getElementById('previewTraits').textContent = characterData.personality.length + characterData.interests.length;

    // Update scenario
    const scenarioSection = document.getElementById('previewScenarioSection');
    if (scenario.trim()) {
        scenarioSection.style.display = 'block';
        document.getElementById('previewScenario').textContent = scenario;
    } else {
        scenarioSection.style.display = 'none';
    }
}

function testCharacter() {
    if (!characterData.avatar && !characterData.avatarImage) {
        showNotification('Selecione um avatar para testar', 'warning');
        return;
    }

    if (!document.getElementById('characterName').value.trim()) {
        showNotification('Digite um nome para o personagem', 'warning');
        return;
    }

    // Simulate character test
    showNotification('Teste iniciado! Redirecionando para chat...', 'success');
    setTimeout(() => {
        window.open('chat.html?test=true', '_blank');
    }, 1000);
}

function saveAsDraft() {
    const draftData = gatherFormData();

    try {
        const drafts = JSON.parse(localStorage.getItem('chatPersonas_drafts') || '[]');
        drafts.push({
            id: Date.now(),
            data: draftData,
            savedAt: new Date().toISOString(),
            name: draftData.name || 'Rascunho sem nome'
        });
        localStorage.setItem('chatPersonas_drafts', JSON.stringify(drafts));

        showNotification('Rascunho salvo com sucesso!', 'success');
    } catch (e) {
        showNotification('Erro ao salvar rascunho', 'error');
    }
}

function gatherFormData() {
    return {
        ...characterData,
        name: document.getElementById('characterName').value,
        desc: document.getElementById('characterDesc').value,
        personalityDesc: document.getElementById('personalityDesc').value,
        scenario: document.getElementById('scenario').value,
        greeting: document.getElementById('greeting').value,
        model: document.getElementById('aiModel').value,
        temperature: parseFloat(document.getElementById('temperature').value),
        maxTokens: parseInt(document.getElementById('maxTokens').value)
    };
}

function createCharacter() {
    // Validate required fields
    const formData = gatherFormData();

    if (!formData.name.trim()) {
        showNotification('Nome do personagem é obrigatório', 'error');
        return;
    }

    if (!formData.desc.trim()) {
        showNotification('Descrição é obrigatória', 'error');
        return;
    }

    if (!formData.personalityDesc.trim()) {
        showNotification('Descrição detalhada da personalidade é obrigatória', 'error');
        return;
    }

    if (!formData.greeting.trim()) {
        showNotification('Saudação é obrigatória', 'error');
        return;
    }

    if (!characterData.avatar && !characterData.avatarImage) {
        showNotification('Selecione um avatar ou emoji', 'error');
        return;
    }

    if (!document.getElementById('acceptTerms').checked) {
        showNotification('Você deve aceitar as diretrizes da comunidade', 'error');
        return;
    }

    if (characterData.personality.length === 0) {
        showNotification('Selecione pelo menos um traço de personalidade', 'error');
        return;
    }

    // Create character object
    const newCharacter = {
        id: generateCharacterId(),
        ...formData,
        stats: {
            rating: 5.0,
            chats: 0,
            relationshipLevel: 1,
            favorited: false,
            likes: 0
        },
        createdAt: new Date().toISOString(),
        isCustom: true,
        systemPrompt: generateSystemPrompt(formData)
    };

    try {
        // Save character
        const customCharacters = JSON.parse(localStorage.getItem('chatPersonas_customCharacters') || '{}');
        customCharacters[newCharacter.id] = newCharacter;
        localStorage.setItem('chatPersonas_customCharacters', JSON.stringify(customCharacters));

        // Add coins to user
        addCoinsToUser(50, 'Personagem criado com sucesso!');

        // Update user stats
        updateUserStats('charactersCreated', 1);

        showNotification('Personagem criado com sucesso! +50 moedas', 'success');

        // Redirect to character
        setTimeout(() => {
            window.location.href = `chat.html?character=${newCharacter.id}`;
        }, 2000);

    } catch (e) {
        console.error('Error creating character:', e);
        showNotification('Erro ao criar personagem', 'error');
    }
}

function generateCharacterId() {
    return 'char_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSystemPrompt(data) {
    let prompt = `Você é ${data.name}. ${data.personalityDesc}\n\n`;

    if (data.personality.length > 0) {
        prompt += `Traços de personalidade: ${data.personality.join(', ')}.\n`;
    }

    if (data.interests.length > 0) {
        prompt += `Interesses: ${data.interests.join(', ')}.\n`;
    }

    if (data.scenario.trim()) {
        prompt += `\nCenário atual: ${data.scenario}\n`;
    }

    // Add persona cards
    if (data.personaCards.length > 0) {
        prompt += `\nAdapte seu comportamento baseado no tipo de usuário:\n`;
        data.personaCards.forEach(card => {
            if (card.name && card.desc) {
                prompt += `- ${card.name}: ${card.desc}\n`;
            }
        });
    }

    // Add emotions
    const activeEmotions = Object.entries(data.emotions).filter(([key, value]) => value > 0);
    if (activeEmotions.length > 0) {
        prompt += `\nEstado emocional atual: `;
        prompt += activeEmotions.map(([emotion, value]) => `${emotion} (${value}%)`).join(', ');
        prompt += `\n`;
    }

    prompt += `\nSempre mantenha-se fiel à sua personalidade e responda de forma consistente com suas características.`;

    return prompt;
}

function addCoinsToUser(amount, reason) {
    try {
        const userData = JSON.parse(localStorage.getItem('chatPersonas_userData') || '{"coins": 250}');
        userData.coins = (userData.coins || 0) + amount;
        localStorage.setItem('chatPersonas_userData', JSON.stringify(userData));

        // Update display
        document.getElementById('userCoins').textContent = userData.coins;
    } catch (e) {
        console.log('Erro ao adicionar moedas');
    }
}

function updateUserStats(stat, increment) {
    try {
        const userData = JSON.parse(localStorage.getItem('chatPersonas_userData') || '{}');
        if (!userData.stats) userData.stats = {};
        userData.stats[stat] = (userData.stats[stat] || 0) + increment;
        localStorage.setItem('chatPersonas_userData', JSON.stringify(userData));
    } catch (e) {
        console.log('Erro ao atualizar estatísticas');
    }
}

function loadUserData() {
    try {
        const userData = JSON.parse(localStorage.getItem('chatPersonas_userData') || '{"coins": 250}');
        document.getElementById('userCoins').textContent = userData.coins || 250;
    } catch (e) {
        console.log('Erro ao carregar dados do usuário');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: ${type === 'warning' ? '#000' : 'white'};
        padding: 16px 24px;
        border-radius: 12px;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
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

// Initialize sliders
document.getElementById('temperature').addEventListener('input', function () {
    document.getElementById('tempValue').textContent = this.value;
});

document.getElementById('maxTokens').addEventListener('input', function () {
    document.getElementById('tokensValue').textContent = this.value;
});

// Auto-select first emoji if none selected
setTimeout(() => {
    if (!characterData.avatar && !characterData.avatarImage) {
        selectEmoji('🎭');
    }
}, 500);

function addPersonaCard() {
    const personaCards = document.querySelectorAll('.persona-card');
    if (personaCards.length >= 5) {
        showNotification('Máximo de 5 cartões de persona', 'warning');
        return;
    }

    const cardId = 'persona_' + Date.now();
    const cardHtml = `
        <div class="persona-card" data-id="${cardId}">
            <button type="button" class="persona-remove" onclick="removePersonaCard('${cardId}')">×</button>
            <div class="form-group">
                <label class="form-label">Nome da Persona</label>
                <input type="text" class="form-input" placeholder="Ex: Usuário Casual" onchange="updatePersonaCard('${cardId}', 'name', this.value)">
            </div>
            <div class="form-group">
                <label class="form-label">Descrição</label>
                <textarea class="form-textarea" rows="2" placeholder="Como o personagem deve se comportar com este tipo de usuário..." onchange="updatePersonaCard('${cardId}', 'desc', this.value)"></textarea>
            </div>
        </div>
    `;

    document.getElementById('personaCards').insertAdjacentHTML('beforeend', cardHtml);
    characterData.personaCards.push({ id: cardId, name: '', desc: '' });

    if (characterData.personaCards.length >= 5) {
        document.getElementById('addPersonaBtn').style.display = 'none';
    }
}

function removePersonaCard(cardId) {
    const cardElement = document.querySelector(`.persona-card[data-id="${cardId}"]`);
    if (cardElement) {
        cardElement.remove();
        characterData.personaCards = characterData.personaCards.filter(card => card.id !== cardId);
        if (characterData.personaCards.length < 5) {
            document.getElementById('addPersonaBtn').style.display = 'block';
        }
    }
}

function updatePersonaCard(cardId, field, value) {
    const card = characterData.personaCards.find(card => card.id === cardId);
    if (card) {
        card[field] = value;
    }
}

console.log('✨ Página de Criação Avançada carregada com sucesso!');