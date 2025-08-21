// DADOS MOCK
const users = [
    {
        id: 1,
        name: "Ana Silva",
        avatar: "👩‍💻",
        totalInteractions: 15420,
        charactersCount: 8,
        description: "Criadora de personagens de ficção científica",
        level: 15,
        badges: ["🏆", "⭐", "🔥"]
    },
    {
        id: 2,
        name: "Carlos Santos",
        avatar: "👨‍🎨",
        totalInteractions: 12850,
        charactersCount: 12,
        description: "Especialista em personagens históricos",
        level: 13,
        badges: ["🎭", "📚", "⚡"]
    },
    {
        id: 3,
        name: "Maria Costa",
        avatar: "🧙‍♀️",
        totalInteractions: 11200,
        charactersCount: 6,
        description: "Criadora de personagens fantásticos",
        level: 12,
        badges: ["🔮", "✨", "🦄"]
    },
    {
        id: 4,
        name: "João Oliveira",
        avatar: "🤖",
        totalInteractions: 9800,
        charactersCount: 15,
        description: "Focado em IA e tecnologia",
        level: 10,
        badges: ["💻", "🔧", "🚀"]
    },
    {
        id: 5,
        name: "Lucia Ferreira",
        avatar: "🎨",
        totalInteractions: 8500,
        charactersCount: 7,
        description: "Artista e criadora criativa",
        level: 9,
        badges: ["🎨", "💡", "🌟"]
    }
];

const characters = [
    {
        id: 1,
        name: "Luna Estrelar",
        description: "Sábia astronauta que explora os mistérios do cosmos",
        avatar: "🌙",
        creator: "Ana Silva",
        interactions: 5420,
        rating: 4.9,
        category: "Sci-Fi"
    },
    {
        id: 2,
        name: "Alexandre Magno",
        description: "O grande conquistador da Macedônia",
        avatar: "👑",
        creator: "Carlos Santos",
        interactions: 4850,
        rating: 4.8,
        category: "Histórico"
    },
    {
        id: 3,
        name: "Fada Violeta",
        description: "Guardiã mágica das florestas encantadas",
        avatar: "🧚‍♀️",
        creator: "Maria Costa",
        interactions: 4200,
        rating: 4.9,
        category: "Fantasia"
    }
];

let currentTab = 'ranking';
let currentFilter = 'all';

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    loadRanking();
    setupEventListeners();
});

function setupEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            if (currentTab === 'search') {
                performSearch();
            }
        });
    });

    // Period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadRanking(this.dataset.period);
        });
    });
}

function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide sections
    document.getElementById('rankingSection').classList.toggle('active', tab === 'ranking');
    document.getElementById('searchResults').classList.toggle('active', tab === 'search');
    
    if (tab === 'search' && document.getElementById('searchInput').value) {
        performSearch();
    }
}

function loadRanking(period = 'week') {
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';

    users.forEach((user, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'rank-item';
        
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        
        rankItem.innerHTML = `
            ${medal ? `<div class="rank-medal">${medal}</div>` : `<div class="rank-position">#${index + 1}</div>`}
            <div class="rank-avatar">${user.avatar}</div>
            <div class="rank-info">
                <div class="rank-name">${user.name}</div>
                <div class="rank-desc">${user.description}</div>
                <div class="rank-stats">
                    <span class="rank-stat">📊 ${user.charactersCount} personagens</span>
                    <span class="rank-stat">⭐ Nível ${user.level}</span>
                    <span class="rank-stat">🏆 ${user.badges.join(' ')}</span>
                </div>
            </div>
            <div class="rank-interactions">
                ${user.totalInteractions.toLocaleString()}<br>
                <small style="color: rgba(255,255,255,0.6);">interações</small>
            </div>
        `;
        
        rankingList.appendChild(rankItem);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsGrid = document.getElementById('charactersGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!query) {
        resultsGrid.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.6); padding: 40px;">Digite algo para pesquisar</div>';
        resultsCount.textContent = '0 resultados encontrados';
        return;
    }

    // Switch to search tab
    switchTab('search');
    
    // Filter characters based on query and current filter
    let filteredCharacters = characters.filter(char => 
        char.name.toLowerCase().includes(query) ||
        char.description.toLowerCase().includes(query) ||
        char.creator.toLowerCase().includes(query)
    );

    // Apply additional filters
    if (currentFilter !== 'all') {
        switch(currentFilter) {
            case 'popular':
                filteredCharacters = filteredCharacters.filter(char => char.interactions > 4000);
                break;
            case 'recent':
                // Mock recent filter
                filteredCharacters = filteredCharacters.slice(0, 2);
                break;
            case 'trending':
                filteredCharacters = filteredCharacters.filter(char => char.rating >= 4.8);
                break;
        }
    }

    resultsCount.textContent = `${filteredCharacters.length} resultado${filteredCharacters.length !== 1 ? 's' : ''} encontrado${filteredCharacters.length !== 1 ? 's' : ''}`;
    
    if (filteredCharacters.length === 0) {
        resultsGrid.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.6); padding: 40px;">Nenhum resultado encontrado</div>';
        return;
    }

    resultsGrid.innerHTML = '';
    filteredCharacters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.onclick = () => startChat(character.id);
        
        card.innerHTML = `
            <div class="character-avatar-large">${character.avatar}</div>
            <h3 class="character-name">${character.name}</h3>
            <p class="character-desc">${character.description}</p>
            
            <div class="character-stats">
                <div class="char-stat">
                    <div class="char-stat-value">${character.rating}</div>
                    <div class="char-stat-label">Rating</div>
                </div>
                <div class="char-stat">
                    <div class="char-stat-value">${(character.interactions/1000).toFixed(1)}k</div>
                    <div class="char-stat-label">Chats</div>
                </div>
                <div class="char-stat">
                    <div class="char-stat-value">${character.category}</div>
                    <div class="char-stat-label">Categoria</div>
                </div>
            </div>
            
            <div style="font-size: 12px; color: rgba(255,255,255,0.6); text-align: center; margin-bottom: 16px;">
                Por: ${character.creator}
            </div>
            
            <button class="chat-btn">💬 Conversar</button>
        `;
        
        resultsGrid.appendChild(card);
    });
}

function startChat(characterId) {
    // Simular início de chat
    alert(`Iniciando chat com personagem ID: ${characterId}`);
}

// Auto-complete para pesquisa
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query.length >= 2) {
        // Aqui você implementaria o auto-complete
        console.log('Auto-complete para:', query);
    }
});