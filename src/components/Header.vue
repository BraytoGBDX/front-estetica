<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <div class="logo" @click="irADashboard" style="cursor: pointer;">
      <div class="logo-text">ESTETICA</div>
    </div>

    <nav class="nav-links">
      <a href="#" 
         class="nav-link" 
         :class="{ active: rutaActual === '/dashboard' }" 
         @click.prevent="navegar('/admin')">
         Dashboard
      </a>
      <a href="#"
         class="nav-link" 
         :class="{ active: rutaActual === '/clientes' }" 
         @click.prevent="navegar('/clientes')">
         Clientes
      </a>
      <a href="#"
         class="nav-link" 
         :class="{ active: rutaActual === '/citas' }" 
         @click.prevent="navegar('/citas')">
         Citas
      </a>
      <a href="#"
         class="nav-link" 
         :class="{ active: rutaActual === '/tratamientos' }" 
         @click.prevent="navegar('/tratamientos')">
         Tratamientos
      </a>
    </nav>

    <div class="icons">
      <button class="icon-button" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Log Out
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Función para navegar
function navegar(ruta) {
  router.push(ruta);
}

// Función para ir al dashboard al hacer click en el logo
function irADashboard() {
  router.push('/dashboard');
}

// Función de logout
function logout() {
  localStorage.removeItem('access_token'); // Borra el token
  router.push('/'); // Redirige al login
}

// Para marcar activo el link
const rutaActual = route.path;
</script>

<style scoped src="../styles/Header.css"></style>
