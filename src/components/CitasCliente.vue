<template>
    <div class="tabla-container">
        <ClientesHeader />
      <h2 class="titulo">Mis Citas</h2>
  
      <table class="tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Tratamiento</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citas" :key="cita.id">
            <td>{{ cita.fecha }}</td>
            <td>{{ formatHora(cita.horario) }}h</td>
            <td>{{ tratamientosNombres[cita.idTratamiento] || 'Cargando...' }}</td>
            <td>
              <span :class="['badge', cita.estatus.toLowerCase()]">{{ cita.estatus }}</span>
            </td>
            <td class="acciones">
              <button class="btn eliminar" @click="eliminarCita(cita.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped src="../styles/CitasCliente.css"></style>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import ClientesHeader from './ClientesHeader.vue';

  
  const citas = ref([]);
  const tratamientosNombres = ref({});
  
  function getUserIdFromToken() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;  
    } catch (error) {
      console.error('Error al decodificar token', error);
      return null;
    }
  }
  
  async function cargarCitas() {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('No se pudo obtener el usuario');
      return;
    }
  
    const API_URL = `http://127.0.0.1:8000/citas/usuario?user_id=${userId}`;
  
    try {
      const response = await fetch(API_URL, {
        method: 'GET'
      });
  
      if (!response.ok) throw new Error('Error al cargar citas');
  
      const citasData = await response.json();
      citas.value = citasData;
  
      // Una vez cargadas las citas, obtenemos los tratamientos
      await cargarNombresTratamientos(citasData);
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar las citas');
    }
  }
  
  async function cargarNombresTratamientos(citasData) {
    const idsTratamientosUnicos = [...new Set(citasData.map(cita => cita.idTratamiento))];
  
    const fetchTratamientos = idsTratamientosUnicos.map(async (id) => {
      try {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`http://127.0.0.1:8000/tratamientos/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },

            }
        );
        if (!response.ok) throw new Error('No se encontró el tratamiento');
  
        const tratamiento = await response.json();
        tratamientosNombres.value[id] = tratamiento.nombre;
      } catch (error) {
        console.error(`Error cargando tratamiento ID ${id}`, error);
        tratamientosNombres.value[id] = 'Desconocido';
      }
    });
  
    await Promise.all(fetchTratamientos);
  }
  
  async function eliminarCita(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta cita?')) return;
  
    try {
      const token = localStorage.getItem('access_token');
  
      const response = await fetch(`http://127.0.0.1:8000/citas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error('Error al eliminar cita');
  
      alert('Cita eliminada correctamente');
      cargarCitas();
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la cita');
    }
  }
  

  
  function formatHora(horaCompleta) {
    return horaCompleta ? horaCompleta.slice(0, 5) : '';
  }
  
  onMounted(() => {
    cargarCitas();
  });
  </script>
  