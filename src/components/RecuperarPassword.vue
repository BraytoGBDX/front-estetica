<template>
    <div class="recover-container">
      <h1>Recuperar Contraseña</h1>
      <form @submit.prevent="handleRecover">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Enviando...' : 'Recuperar Contraseña' }}
        </button>
        <p v-if="message" class="message">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const loading = ref(false);
  const message = ref('');
  
  const handleRecover = async () => {
    loading.value = true;
    message.value = '';
  
    try {
      // Aquí iría tu lógica para enviar el correo
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay
  
      message.value = 'Si el correo está registrado, recibirás instrucciones pronto.';
    } catch (error) {
      message.value = 'Ocurrió un error. Intenta nuevamente.';
    } finally {
      loading.value = false;
    }
  };
  </script>

<style scoped src="../styles/RecuperarPassword.css"></style>

  