<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <Header />
    <div class="contenido-dashboard">
      <div class="calendario-contenedor">
        <!-- Calendario -->
        <vue-cal class="calendario" :events="eventos" :on-event-click="onEventClick" :time="false" default-view="month"
          :hide-title-bar="false"></vue-cal>

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

// Eventos del calendario (citas)
const eventos = [
  {
    start: '2025-04-27',
    end: '2025-04-27',
    title: 'Juan Pérez - Tratamiento Facial',
    class: 'confirmada',
  },
  {
    start: '2025-04-28',
    end: '2025-04-28',
    title: 'Ana Gómez - Limpieza Dental',
    class: 'pendiente',
  },
  {
    start: '2025-04-29',
    end: '2025-04-29',
    title: 'Carlos López - Masaje Relajante',
    class: 'cancelada',
  },
];

// Función para manejar clics en eventos
function onEventClick(event) {
  console.log('Evento clicado:', event.event);
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenido-dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  padding-top: 70px;
  /* Para que el contenido no quede debajo del header fijo */
}

.calendario-contenedor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.calendario {
  flex: 2;
  max-width: 70%;
}

.estatus-leyenda {
  flex: 1;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.estatus-leyenda h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}

.estatus-leyenda ul {
  list-style: none;
  padding: 0;
}

.estatus-leyenda li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.estatus-leyenda span {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 0.5rem;
  border-radius: 50%;
}

.estatus-confirmada {
  background-color: green;
}

.estatus-pendiente {
  background-color: orange;
}

.estatus-cancelada {
  background-color: red;
}

/* Estilos personalizados para Vue Cal */
.vuecal__cell--confirmada {
  background-color: rgba(0, 128, 0, 0.2);
}

.vuecal__cell--pendiente {
  background-color: rgba(255, 165, 0, 0.2);
}

.vuecal__cell--cancelada {
  background-color: rgba(255, 0, 0, 0.2);
}
</style>
