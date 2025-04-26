<template>
    <div class="login-container">
      <form class="login-form" @submit.prevent="handleRegister">
        <h1 class="login-title">Registrarse</h1>
  
        <input
          type="text"
          placeholder="Nombre"
          v-model="nombre"
          class="login-input"
          required
        />
        <input
          type="text"
          placeholder="Apellidos"
          v-model="apellidos"
          class="login-input"
          required
        />
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
        <input
          type="text"
          placeholder="Número de teléfono"
          v-model="numeroTelefono"
          class="login-input"
          required
        />
  
        <label for="tipoUsuario" style="display: none;">Cliente</label>
        <input type="text" v-model="tipoUsuario" id="tipoUsuario" style="display: none;" value="Cliente" />
  
        <label for="estatus" style="display: none;">Activo</label>
        <input type="text" v-model="estatus" id="estatus" style="display: none;" value="Activo" />
  
        <div class="login-buttons">
          <button type="submit" class="login-button">Registrarme</button>
          <button type="button" class="register-button" @click="goToLogin">Ya tengo cuenta</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const nombre = ref('');
  const apellidos = ref('');
  const correoElectronico = ref('');
  const contrasena = ref('');
  const numeroTelefono = ref('');
  const tipoUsuario = ref('Cliente');
  const estatus = ref('Activo');
  
  const router = useRouter();
  
  const handleRegister = async () => {
    if (!nombre.value || !apellidos.value || !correoElectronico.value || !contrasena.value || !numeroTelefono.value) {
      alert('Por favor, completa todos los campos');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/usersCreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.value,
          apellidos: apellidos.value,
          tipoUsuario: tipoUsuario.value,
          correoElectronico: correoElectronico.value,
          contrasena: contrasena.value,
          numeroTelefono: numeroTelefono.value,
          estatus: estatus.value,
        }),
      });
  
      if (response.ok) {
        alert('Usuario registrado con éxito');
        router.push({ name: 'login' });
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al intentar registrarse:', error);
      alert('Hubo un problema con la conexión. Intenta nuevamente.');
    }
  };
  
  const goToLogin = () => {
    router.push({ name: 'login' });
  };
  </script>
  
  <style scoped src="../styles/Register.css"></style>
  