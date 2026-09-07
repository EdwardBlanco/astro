// Verificar autenticación
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');

if (!token || !userStr) {
    window.location.href = '/';
} else {
    const user = JSON.parse(userStr);
    document.getElementById('user-name').textContent = user.nombre_completo.split(' ')[0];
    loadProfile();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

async function loadProfile() {
    const res = await fetchAPI('/numerology/profile', { method: 'GET' });
    
    if (res.ok && res.data) {
        // Mostrar perfil
        document.getElementById('calc-card').style.display = 'none';
        document.getElementById('profile-card').style.display = 'block';
        
        document.getElementById('vida-num').textContent = res.data.numero_vida;
        document.getElementById('exp-num').textContent = res.data.numero_expresion;
        document.getElementById('alma-num').textContent = res.data.numero_alma;
    } else {
        // Mostrar form de cálculo
        document.getElementById('calc-card').style.display = 'block';
        document.getElementById('profile-card').style.display = 'none';
    }
}

async function calculateMatrix() {
    const btn = document.getElementById('btn-calc');
    const errorMsg = document.getElementById('calc-error');
    
    btn.disabled = true;
    btn.textContent = 'Calculando...';
    errorMsg.textContent = '';

    // Dummy numbers generator para propósitos visuales (ya que el usuario dijo que el cálculo completo lo harán luego)
    // El backend espera numero_vida, numero_expresion, numero_alma
    // En un caso real, el usuario ingresaría su fecha y nombre, y el front calcularía o enviaría al back para calcular.
    // Aquí generaremos unos simulados para enviarlos al endpoint
    const vida = Math.floor(Math.random() * 9) + 1;
    const exp = Math.floor(Math.random() * 9) + 1;
    const alma = Math.floor(Math.random() * 9) + 1;

    const res = await fetchAPI('/numerology/calculate', {
        method: 'POST',
        body: JSON.stringify({
            numero_vida: vida,
            numero_expresion: exp,
            numero_alma: alma
        })
    });

    if (res.ok) {
        loadProfile();
    } else {
        errorMsg.textContent = 'Ocurrió un error al guardar la matriz.';
        btn.disabled = false;
        btn.textContent = 'Calcular Mis Números Mágicos';
    }
}
