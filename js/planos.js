// DADOS DOS PLANOS
const plansData = {
    monthly: {
        free: {
            name: 'Gratuito',
            icon: '🆓',
            description: 'Para começar a explorar',
            price: 0,
            originalPrice: null,
            features: [
                { text: '5 conversas por dia', available: true, limited: true },
                { text: 'Personagens básicos', available: true },
                { text: 'Suporte por email', available: true },
                { text: 'Histórico limitado', available: true, limited: true },
                { text: 'Criar personagens', available: false },
                { text: 'Modelos de IA avançados', available: false },
                { text: 'Suporte prioritário', available: false }
            ],
            popular: false,
            current: true
        },
        premium: {
            name: 'Premium',
            icon: '⭐',
            description: 'Ideal para uso regular',
            price: 29.90,
            originalPrice: null,
            features: [
                { text: 'Conversas ilimitadas', available: true },
                { text: 'Todos os personagens', available: true },
                { text: 'Criar até 10 personagens', available: true },
                { text: 'Histórico completo', available: true },
                { text: 'Modelos GPT-4', available: true },
                { text: 'Suporte prioritário', available: true },
                { text: 'Sem anúncios', available: true }
            ],
            popular: true,
            current: false
        },
        pro: {
            name: 'Pro',
            icon: '🚀',
            description: 'Para profissionais e entusiastas',
            price: 59.90,
            originalPrice: null,
            features: [
                { text: 'Todos os recursos Premium', available: true },
                { text: 'Personagens ilimitados', available: true },
                { text: 'Modelos de IA mais avançados', available: true },
                { text: 'API access', available: true },
                { text: 'Suporte 24/7', available: true },
                { text: 'Beta features', available: true },
                { text: 'Análises detalhadas', available: true }
            ],
            popular: false,
            current: false
        }
    },
    yearly: {
        free: {
            name: 'Gratuito',
            icon: '🆓',
            description: 'Para começar a explorar',
            price: 0,
            originalPrice: null,
            features: [
                { text: '5 conversas por dia', available: true, limited: true },
                { text: 'Personagens básicos', available: true },
                { text: 'Suporte por email', available: true },
                { text: 'Histórico limitado', available: true, limited: true },
                { text: 'Criar personagens', available: false },
                { text: 'Modelos de IA avançados', available: false },
                { text: 'Suporte prioritário', available: false }
            ],
            popular: false,
            current: true
        },
        premium: {
            name: 'Premium',
            icon: '⭐',
            description: 'Ideal para uso regular',
            price: 269.90,
            originalPrice: 358.80,
            features: [
                { text: 'Conversas ilimitadas', available: true },
                { text: 'Todos os personagens', available: true },
                { text: 'Criar até 10 personagens', available: true },
                { text: 'Histórico completo', available: true },
                { text: 'Modelos GPT-4', available: true },
                { text: 'Suporte prioritário', available: true },
                { text: 'Sem anúncios', available: true }
            ],
            popular: true,
            current: false
        },
        pro: {
            name: 'Pro',
            icon: '🚀',
            description: 'Para profissionais e entusiastas',
            price: 539.90,
            originalPrice: 718.80,
            features: [
                { text: 'Todos os recursos Premium', available: true },
                { text: 'Personagens ilimitados', available: true },
                { text: 'Modelos de IA mais avançados', available: true },
                { text: 'API access', available: true },
                { text: 'Suporte 24/7', available: true },
                { text: 'Beta features', available: true },
                { text: 'Análises detalhadas', available: true }
            ],
            popular: false,
            current: false
        }
    }
};

// ESTADO GLOBAL
let isYearly = false;
let selectedPlan = null;
let selectedPaymentMethod = 'card';
let userData = { coins: 250, plan: 'free' };

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    renderPlans();
    setupEventListeners();
});

function setupEventListeners() {
    // Payment methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            selectedPaymentMethod = this.dataset.method;
        });
    });

    // Modal
    document.getElementById('paymentModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Keyboard
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

function loadUserData() {
    try {
        const saved = localStorage.getItem('chatPersonas_userData');
        if (saved) {
            userData = { ...userData, ...JSON.parse(saved) };
            document.getElementById('userCoins').textContent = userData.coins;
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

function toggleBilling() {
    const toggle = document.getElementById('billingToggle');
    isYearly = !isYearly;
    
    toggle.classList.toggle('active', isYearly);
    renderPlans();
}

function renderPlans() {
    const grid = document.getElementById('plansGrid');
    const plans = isYearly ? plansData.yearly : plansData.monthly;
    
    grid.innerHTML = '';
    
    Object.entries(plans).forEach(([planId, plan]) => {
        const card = createPlanCard(planId, plan);
        grid.appendChild(card);
    });
}

function createPlanCard(planId, plan) {
    const card = document.createElement('div');
    card.className = `plan-card ${plan.popular ? 'popular' : ''}`;
    
    const featuresHtml = plan.features.map(feature => {
        let iconClass = 'feature-icon';
        if (!feature.available) iconClass += ' disabled';
        else if (feature.limited) iconClass += ' limited';
        
        const icon = feature.available ? '✓' : '✗';
        
        return `
            <li>
                <div class="${iconClass}">${icon}</div>
                ${feature.text}
            </li>
        `;
    }).join('');

    const priceDisplay = plan.price === 0 
        ? '<span class="price-amount">Gratuito</span>'
        : `
            <span class="price-currency">R$</span>
            <span class="price-amount">${plan.price.toFixed(2).replace('.', ',')}</span>
            <span class="price-period">/${isYearly ? 'ano' : 'mês'}</span>
            ${plan.originalPrice ? `<span class="price-original">De R$ ${plan.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
        `;

    let buttonText, buttonClass, buttonAction;
    if (plan.current) {
        buttonText = 'Plano Atual';
        buttonClass = 'current';
        buttonAction = '';
    } else if (plan.price === 0) {
        buttonText = 'Começar Grátis';
        buttonClass = 'secondary';
        buttonAction = `onclick="selectPlan('${planId}')"`;
    } else {
        buttonText = `Assinar ${plan.name}`;
        buttonClass = 'primary';
        buttonAction = `onclick="selectPlan('${planId}')"`;
    }

    card.innerHTML = `
        ${plan.popular ? '<div class="popular-badge">Mais Popular</div>' : ''}
        <div class="plan-content">
            <div class="plan-icon">${plan.icon}</div>
            <h3 class="plan-name">${plan.name}</h3>
            <p class="plan-description">${plan.description}</p>
            
            <div class="plan-price">${priceDisplay}</div>
            
            <ul class="plan-features">${featuresHtml}</ul>
            
            <button class="plan-button ${buttonClass}" ${buttonAction}>
                ${buttonText}
            </button>
        </div>
    `;

    return card;
}

function selectPlan(planId) {
    const plans = isYearly ? plansData.yearly : plansData.monthly;
    selectedPlan = { id: planId, ...plans[planId] };
    
    if (planId === 'free') {
        // Processar diretamente para plano gratuito// do plano gratuito
        userData.plan = 'free';
        saveUserData();
        showNotification('Plano alterado para Gratuito!', 'success');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    // Abrir modal de pagamento para planos pagos
    document.getElementById('modalPlanName').textContent = selectedPlan.name;
    document.getElementById('paymentModal').classList.add('active');
}

function closeModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

function processPayment() {
    if (!selectedPlan) return;
    
    // Simular processamento de pagamento
    showNotification('Processando pagamento...', 'info');
    
    setTimeout(() => {
        // Atualizar dados do usuário
        userData.plan = selectedPlan.id;
        userData.coins += 100; // Bonus por assinatura
        saveUserData();
        
        closeModal();
        showNotification(`Parabéns! Você agora é ${selectedPlan.name}! +100 moedas de bônus`, 'success');
        
        // Atualizar display e redirecionar
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }, 2000);
}

function toggleFaq(element) {
    const faqItem = element.parentNode;
    faqItem.classList.toggle('active');
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

console.log('💎 Página de Planos carregada com sucesso!');