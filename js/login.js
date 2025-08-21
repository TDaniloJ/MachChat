let currentForm = 'login';

// Form switching
function showLogin() {
    currentForm = 'login';
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('authTitle').textContent = 'Entrar';
    document.getElementById('authSubtitle').textContent = 'Acesse sua conta do ChatPersonas';
}

function showRegister() {
    currentForm = 'register';
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('registerForm').classList.add('active');
    document.getElementById('authTitle').textContent = 'Criar Conta';
    document.getElementById('authSubtitle').textContent = 'Junte-se à comunidade ChatPersonas';
}

function showForgotPassword() {
    currentForm = 'forgot';
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('forgotForm').classList.add('active');
    document.getElementById('authTitle').textContent = 'Recuperar Senha';
    document.getElementById('authSubtitle').textContent = 'Digite seu email para recuperar o acesso';
}

// Password toggle
function togglePassword(button) {
    const input = button.previousElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

// Show messages
function showMessage(text, type = 'info') {
    const container = document.getElementById('messageContainer');
    container.innerHTML = `<div class="message ${type}">${text}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Loading state
function setLoadingState(form, loading = true) {
    const button = form.querySelector('.btn-primary');
    const text = button.querySelector('.btn-text');
    
    if (loading) {
        button.disabled = true;
        text.innerHTML = '<span class="loading"></span> Carregando...';
    } else {
        button.disabled = false;
        if (currentForm === 'login') text.textContent = 'Entrar';
        else if (currentForm === 'register') text.textContent = 'Criar conta';
        else text.textContent = 'Enviar link';
    }
}

// Form submissions
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    setLoadingState(this, true);
    
    const formData = new FormData(this);
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    try {
        // Simular login
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock validation
        if (email === 'teste@teste.com' && password === '123456') {
            showMessage('Login realizado com sucesso! Redirecionando...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('Email ou senha incorretos', 'error');
        }
    } catch (error) {
        showMessage('Erro no servidor. Tente novamente.', 'error');
    } finally {
        setLoadingState(this, false);
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    setLoadingState(this, true);
    
    const inputs = this.querySelectorAll('input');
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;
    
    if (password !== confirmPassword) {
        showMessage('As senhas não coincidem', 'error');
        setLoadingState(this, false);
        return;
    }
    
    try {
        // Simular registro
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showMessage('Conta criada com sucesso! Fazendo login...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        showMessage('Erro ao criar conta. Tente novamente.', 'error');
    } finally {
        setLoadingState(this, false);
    }
});

document.getElementById('forgotForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    setLoadingState(this, true);
    
    try {
        // Simular envio de email
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        showMessage('Link de recuperação enviado para seu email!', 'success');
        setTimeout(showLogin, 2000);
    } catch (error) {
        showMessage('Erro ao enviar email. Tente novamente.', 'error');
    } finally {
        setLoadingState(this, false);
    }
});

// Social login functions
function loginWithGoogle() {
    showMessage('Redirecionando para login com Google...', 'info');
    // Implementar OAuth do Google
    setTimeout(() => {
        showMessage('Login com Google realizado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

function loginWithFacebook() {
    showMessage('Redirecionando para login com Facebook...', 'info');
    // Implementar OAuth do Facebook
    setTimeout(() => {
        showMessage('Login com Facebook realizado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

function registerWithGoogle() {
    showMessage('Redirecionando para registro com Google...', 'info');
    // Implementar OAuth do Google
    setTimeout(() => {
        showMessage('Conta criada com Google com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

function registerWithFacebook() {
    showMessage('Redirecionando para registro com Facebook...', 'info');
    // Implementar OAuth do Facebook
    setTimeout(() => {
        showMessage('Conta criada com Facebook com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.altKey) {
        if (e.key === '1') showLogin();
        else if (e.key === '2') showRegister();
        else if (e.key === '3') showForgotPassword();
    }
});

// Demo credentials hint
setTimeout(() => {
    showMessage('💡 Dica: Use "teste@teste.com" e senha "123456" para testar', 'info');
}, 1000);