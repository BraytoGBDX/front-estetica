<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h1 class="login-title">Iniciar Sesión</h1>

      <input
        type="email"
        placeholder="Correo electrónico"
        v-model="correoElectronico"
        class="login-input"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        v-model="contrasena"
        class="login-input"
        required
      />

      <div class="forgot-password">
        <a href="/recuperar" @click.prevent="goToRecover">¿Olvidaste tu contraseña?</a>
      </div>

      <div class="login-buttons">
        <button type="submit" class="login-button">Entrar</button>
        <button type="button" class="register-button" @click="goToRegister">Registrarme</button>
      </div>

      <div id="google-signin-btn" class="google-login-btn" style="margin-top: 1rem;"></div>
    </form>
  </div>
</template>

<style scoped src="../styles/Login.css"></style>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const correoElectronico = ref('');
const contrasena = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (!correoElectronico.value || !contrasena.value) {
    alert('Por favor, completa ambos campos');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correoElectronico: correoElectronico.value,
        contrasena: contrasena.value,
      }),
    });

    const data = await response.json();

    if (response.ok && data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      const decodedToken = jwtDecode(data.access_token);
      console.log(decodedToken); 
      const tipoUsuario = decodedToken.tipoUsuario;
      localStorage.setItem('tipo_usuario', tipoUsuario);
      console.log(tipoUsuario); 
      redirectByUserType(tipoUsuario);
    } else {
      alert('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error de conexión');
  }
};

const redirectByUserType = (tipoUsuario) => {
  if (!tipoUsuario) {
    alert('Tipo de usuario no encontrado en el token');
    return;
  }

  if (tipoUsuario === 'Administrador') {
    router.push({ name: 'admin-dashboard' });
  } else if (tipoUsuario === 'Cliente') {
    router.push({ name: 'cliente-dashboard' });
  } else {
    alert('Tipo de usuario no reconocido');
  }
};

const goToRegister = () => {
  router.push({ name: 'register' });
};

const goToRecover = () => {
  router.push('/recuperar'); // <- Aquí rediriges a recuperar
};

onMounted(() => {
  const handleCredentialResponse = async (response) => {
    const id_token = response.credential;
    console.log("ID Token de Google:", id_token);  
    try {
      const res = await fetch('http://127.0.0.1:8000/users/google-login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      });
      const data = await res.json();

      console.log("Respuesta del servidor al login con Google:", data);  

      if (res.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        const decodedToken = jwtDecode(data.access_token);
        console.log(decodedToken); 
        const tipoUsuario = decodedToken.tipoUsuario;
        localStorage.setItem('tipo_usuario', tipoUsuario);
        console.log(tipoUsuario); 
        redirectByUserType(tipoUsuario);
      } else {
        alert('No se pudo autenticar con Google');
      }
    } catch (err) {
      console.error('Error en login con Google:', err);
    }
  };

  if (!document.getElementById('google-oauth-script')) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-oauth-script';
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '828668298867-3akqs5u9h9c5trop4b2fi9s0ngsahok5.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { theme: 'outline', size: 'large' }
      );
    };
    document.head.appendChild(script);
  }
});
</script>
