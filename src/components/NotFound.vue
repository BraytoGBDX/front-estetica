<template>
    <div class="not-found">
      <h1>Error 404</h1>
      <p>La página que estás buscando no existe.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 100px 20px;
  }
  
  .not-found h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .not-found a {
    font-size: 1rem;
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  