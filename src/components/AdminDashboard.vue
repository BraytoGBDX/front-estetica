<!-- src/views/Dashboard.vue -->
<template>
    <div class="dashboard">
      <Header />
  
      <main class="main-content">
        <!-- Aquí irá el contenido de tu dashboard -->
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Empieza a administrar tu clínica estética desde aquí.</p>
      </main>
    </div>
  </template>
  
  <script setup>
  import Header from './Header.vue'; // Importa tu Header
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding-top: 70px; /* Para que el contenido no quede debajo del header fijo */
    padding: 2rem;
    background-color: #f5f5f5;
  }
  </style>
  