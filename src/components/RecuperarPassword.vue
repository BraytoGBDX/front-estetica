<template>
    <div class="password-recovery-container">
      <h2>Recuperar Contraseña</h2>
      <form @submit.prevent="buscarUsuario">
        <input
          v-model="correoElectronico"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          required
        />
        <button type="submit">Buscar Usuario</button>
      </form>
  
      <!-- Modal de actualizar contraseña -->
      <div v-if="mostrarModal" class="modal-overlay">
        <div class="modal">
          <h3>Actualizar Contraseña</h3>
          <input
            v-model="nuevaContrasena"
            type="password"
            placeholder="Nueva contraseña"
            required
          />
          <div class="modal-buttons">
            <button @click="actualizarContrasena">Actualizar</button>
            <button @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
  
      <!-- Modal de usuario no encontrado -->
      <div v-if="mostrarModalNoEncontrado" class="modal-overlay">
        <div class="modal">
          <h3>Usuario no encontrado</h3>
          <button @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import bcrypt from 'bcryptjs';
  
  const correoElectronico = ref('');
  const nuevaContrasena = ref('');
  const userId = ref(null);
  const mostrarModal = ref(false);
  const mostrarModalNoEncontrado = ref(false);
  
  const buscarUsuario = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/email/${correoElectronico.value}`);
      if (response.ok) {
        const user = await response.json();
        userId.value = user.id;
        mostrarModal.value = true;
      } else {
        mostrarModalNoEncontrado.value = true;
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      mostrarModalNoEncontrado.value = true;
    }
  };
  
  const actualizarContrasena = async () => {
    try {
      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(nuevaContrasena.value, 12);
  
      // Crear objeto para actualizar solo la contraseña
      const data = { contrasena: hashedPassword };
  
      const response = await fetch(`http://127.0.0.1:8000/usersUpdate/${userId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Contraseña actualizada correctamente');
        cerrarModal();
      } else {
        alert('Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      alert('Error al actualizar');
    }
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
    mostrarModalNoEncontrado.value = false;
    correoElectronico.value = '';
    nuevaContrasena.value = '';
  };
  </script>
  
  <style scoped src="../styles/RecuperarPassword.css"></style>
  