<template>
    <ClienteHeader />
    <div class="dashboard-container">
      <!-- Carrusel de imágenes -->
      <div v-if="images.length > 0" class="carousel">
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
        <!-- Cards de Tratamientos -->
        <div v-if="tratamientos.length > 0" class="tratamientos-container">
          <h2>Tratamientos Disponibles</h2>
          <div class="cards-container">
            <div v-for="tratamiento in tratamientos" :key="tratamiento.id" class="card">
              <h3>{{ tratamiento.nombre }}</h3>
              <p><strong>Descripción:</strong> {{ tratamiento.descripcion }}</p>
              <p><strong>Tiempo:</strong> {{ tratamiento.tiempo }}</p>
              <button @click="agendarCita(tratamiento.id)">Agendar Cita</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
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
  
  // Lista de tratamientos
  const tratamientos = ref([]);
  
  // Cargar tratamientos desde el servidor
  const loadTratamientos = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/tratamientos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        tratamientos.value = data;
      } else {
        console.error('Error al cargar tratamientos', response.status);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud GET', error);
    }
  };
  
  // Función para agendar cita
  const agendarCita = async (tratamientoId) => {
  try {
    const token = localStorage.getItem('access_token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;  // Extraer el ID (id) del token

    const response = await fetch(`http://127.0.0.1:8000/citas/?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        idUsuario: userId,
        idTratamiento: tratamientoId,
        estatus: 'pendiente',
        horario: new Date().toISOString().split('T')[1],  // Obtén solo la hora (HH:mm:ss)
        fecha: new Date().toISOString().split('T')[0],  // Fecha de hoy (YYYY-MM-DD)
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Cita agendada:', data);
    } else {
      console.error('Error al agendar la cita', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud', error);
  }
};

  
  // Cargar tratamientos cuando el componente se monta
  onMounted(() => {
    loadTratamientos();
  });
  </script>
  
  <style scoped src="../styles/ClienteDashboard.css"></style>
  