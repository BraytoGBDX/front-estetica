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

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  overflow: hidden;
}

.carousel-images {
  display: flex;
  transition: transform 0.5s ease-in-out;
  /* Animación suave */
  width: 100%;
}

.carousel-images img {
  width: 100%;
  flex-shrink: 0;
  /* Evita que las imágenes se reduzcan */
  object-fit: cover;
  /* Ajusta las imágenes para que se vean bien */
  height: 400px;
  /* Altura fija para todas las imágenes */
}

.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-controls button {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.carousel-indicators span {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background: gray;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-indicators .active {
  background: black;
}

.dashboard-header {
  margin-top: 2rem;
  text-align: center;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: bold;
}

.dashboard-content {
  margin-top: 1rem;
  text-align: center;
}
</style>
