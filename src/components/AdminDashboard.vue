<!-- filepath: c:\Users\jazzi\Documents\Projects\Experiments\front-estetica\src\components\AdminDashboard.vue -->
<template>
  <div class="dashboard">
    <Header />

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

    <main class="main-content">
      <!-- Aquí irá el contenido de tu dashboard -->
      <h1>Bienvenido al Panel de Administración</h1>
      <p>Empieza a administrar tu clínica estética desde aquí.</p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './Header.vue'; // Importa tu Header

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
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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

.main-content {
  flex: 1;
  padding-top: 70px;
  /* Para que el contenido no quede debajo del header fijo */
  padding: 2rem;
  background-color: #f5f5f5;
}
</style>