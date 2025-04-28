<template>
  <div class="dashboard">
    <Header />
    <div class="contenido-dashboard">
      <div class="calendario-contenedor">
        <!-- Calendario -->
        <vue-cal class="calendario" :events="eventos" :on-event-click="onEventClick" :time="false"
          :hide-title-bar="false" default-view="month" 
          :disable-views="['years', 'year', 'week', 'day', '24hours']" 
          ></vue-cal>

        <!-- Significado de estatus -->
        <div class="estatus-leyenda">
          <h3>Significado de Estatus</h3>
          <ul>
            <li><span class="estatus-confirmada"></span> Confirmada</li>
            <li><span class="estatus-pendiente"></span> Pendiente</li>
            <li><span class="estatus-cancelada"></span> Cancelada</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue'; // Importa tu Header
import VueCal from 'vue-cal'; // Importa Vue Cal
import 'vue-cal/dist/vuecal.css'; // Importa los estilos de Vue Cal

import { ref, onMounted } from 'vue';

// Eventos del calendario (citas)
const eventos = ref([]);

// Función para cargar las citas desde el servidor
const loadCitas = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://127.0.0.1:8000/citas', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      // Procesar las citas y convertirlas al formato esperado por Vue Cal
      eventos.value = data.map((cita) => ({
        start: cita.fecha, // Asumiendo que 'fecha' es de tipo 'YYYY-MM-DD'
        end: cita.fecha,   // Si no tienes hora, puedes poner la misma fecha en 'end'
        title: `${cita.nombreUsuario} - ${cita.tratamiento}`,
        class: cita.estatus === 'confirmada' ? 'confirmada' : cita.estatus === 'pendiente' ? 'pendiente' : 'cancelada',
      }));
    } else {
      console.error('Error al cargar las citas', response.status);
    }
  } catch (error) {
    console.error('Error al hacer la solicitud GET', error);
  }
};

// Función para manejar clics en eventos
function onEventClick(event) {
  console.log('Evento clicado:', event.event);
}

// Cargar las citas cuando el componente se monta
onMounted(() => {
  loadCitas();
});
</script>

<style src="../styles/AdminDashboard.css"></style>
