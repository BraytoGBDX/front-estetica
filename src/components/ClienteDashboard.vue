<template>
  <ClienteHeader />
  <div class="dashboard-container">
    <!-- Carrusel de imágenes -->
    <div class="carousel">
      <div class="carousel-images" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <img v-for="(image, index) in images" :key="index" :src="image" :alt="'Imagen ' + (index + 1)" />
      </div>
      <div class="carousel-controls">
        <button @click="prevImage">❮</button>
        <button @click="nextImage">❯</button>
      </div>
      <div class="carousel-indicators">
        <span v-for="(image, index) in images" :key="'indicator-' + index" :class="{ active: currentIndex === index }"
          @click="goToImage(index)"></span>
      </div>
    </div>

    <div class="dashboard-header">
      <h1 class="dashboard-title">DashCliente</h1>
    </div>
    <div class="dashboard-content">
      <p>Bienvenido al panel de Cliente.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ClienteHeader from './ClientesHeader.vue'; // Importa el header de cliente

// Lista de imágenes para el carrusel
const images = ref([
  '/src/assets/image01.webp',
  '/src/assets/image02.webp',
  '/src/assets/image03.webp',
  '/src/assets/image04.webp',
  '/src/assets/image05.webp',
]);

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const goToImage = (index) => {
  currentIndex.value = index;
};
</script>

<style scoped src="../styles/ClienteDashboard.css"></style>

