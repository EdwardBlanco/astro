// Comprobar si ya está logueado
if (localStorage.getItem('token')) {
    window.location.href = '/dashboard.html';
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('register-form').classList.add('active');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password_hash = document.getElementById('login-password').value;
    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('login-error');
    
    btn.disabled = true;
    btn.textContent = 'Verificando...';
    errorMsg.textContent = '';

    const res = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password_hash })
    });

    if (res.ok) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.usuario));
        window.location.href = '/dashboard.html';
    } else {
        errorMsg.textContent = res.data.mensaje || 'Credenciales inválidas';
        btn.disabled = false;
        btn.textContent = 'Entrar';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const nombre_completo = document.getElementById('reg-name').value;
    const fecha_nacimiento = document.getElementById('reg-date').value;
    const email = document.getElementById('reg-email').value;
    const password_hash = document.getElementById('reg-password').value;
    
    const btn = document.getElementById('btn-register');
    const errorMsg = document.getElementById('reg-error');

    btn.disabled = true;
    btn.textContent = 'Registrando...';
    errorMsg.textContent = '';

    const res = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nombre_completo, fecha_nacimiento, email, password_hash })
    });

    if (res.ok) {
        // Auto login después de registrarse
        const loginRes = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password_hash })
        });
        if (loginRes.ok) {
            localStorage.setItem('token', loginRes.data.token);
            localStorage.setItem('user', JSON.stringify(loginRes.data.usuario));
            window.location.href = '/dashboard.html';
        }
    } else {
        let errorTxt = res.data.mensaje || 'Error al registrar';
        if (res.data.errores && res.data.errores.length > 0) {
            errorTxt = res.data.errores[0].mensaje;
        }
        errorMsg.textContent = errorTxt;
        btn.disabled = false;
        btn.textContent = 'Registrarse';
    }
}
