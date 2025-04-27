<template>
    <div class="tabla-container">
      <Header />
      <h2 class="titulo">Lista de Citas</h2>
  
      <table class="tabla">
        <thead>
          <tr>
            <th>Nombre Usuario</th>
            <th>Nombre Tratamiento</th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citas" :key="cita.id">
            <td>{{ cita.nombreUsuario }}</td>
            <td>{{ cita.nombreTratamiento }}</td>
            <td>{{ cita.fecha }}</td>
            <td>{{ cita.horario }}</td>
            <td>
              <span :class="['badge', cita.estatus === 'Confirmada' ? 'confirmada' : (cita.estatus === 'Cancelada' ? 'cancelada' : 'pendiente')]">
                {{ cita.estatus }}
              </span>
            </td>
            <td class="acciones">
              <button class="btn aceptar" @click="cambiarEstatus(cita.id, 'Confirmada')">Aceptar</button>
              <button class="btn rechazar" @click="cambiarEstatus(cita.id, 'Cancelada')">Rechazar</button>
              <button class="btn editar" @click="abrirModal(cita)">Editar</button>
              <button class="btn eliminar" @click="eliminarCita(cita.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal para editar -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <h3>Editar Cita</h3>
  
          <div class="formulario">
            <label>Nombre Usuario</label>
            <input v-model="citaSeleccionada.nombreUsuario" placeholder="Nombre Usuario" disabled />
  
            <label>Nombre Tratamiento</label>
            <input v-model="citaSeleccionada.nombreTratamiento" placeholder="Nombre Tratamiento" disabled />
  
            <label>Fecha</label>
            <input type="date" v-model="citaSeleccionada.fecha" />
  
            <label>Horario</label>
            <input type="time" v-model="citaSeleccionada.horario" />
  
            <label>Estatus</label>
            <select v-model="citaSeleccionada.estatus">
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
  
          <div class="acciones-modal">
            <button class="btn guardar" @click="guardarCambios">Guardar</button>
            <button class="btn cancelar" @click="cerrarModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Header from '../components/Header.vue';
  
  const citas = ref([]);
  const mostrarModal = ref(false);
  const citaSeleccionada = ref({});
  
  const fetchNombreUsuario = async (userId) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (response.ok) {
    const data = await response.json();
    console.log("Usuario data:", data);  // Log para verificar la respuesta completa de la API
    return data.nombre || `ID: ${userId}`;  // Si no hay nombre, mostramos el ID
  }
  return `ID: ${userId}`;
};


const fetchNombreTratamiento = async (tratamientoId) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://127.0.0.1:8000/tratamientos/${tratamientoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (response.ok) {
    const data = await response.json();
    console.log("Tratamiento data:", data);  // Log de depuración
    return data.nombre || `ID: ${tratamientoId}`;  // Verifica que el campo nombre esté presente
  }
  return `ID: ${tratamientoId}`;
};

const fetchCitas = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch('http://127.0.0.1:8000/citas', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  // Ahora por cada cita traemos el nombre del usuario y del tratamiento
  const citasConNombres = await Promise.all(
    data.map(async (cita) => {
      const nombreUsuario = await fetchNombreUsuario(cita.idUsuario);
      const nombreTratamiento = await fetchNombreTratamiento(cita.idTratamiento);
      return {
        ...cita,
        nombreUsuario,
        nombreTratamiento,
      };
    })
  );

  citas.value = citasConNombres;
};

  
  const abrirModal = (cita) => {
    citaSeleccionada.value = { ...cita };
    mostrarModal.value = true;
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
    citaSeleccionada.value = {};
  };
  
  const guardarCambios = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://127.0.0.1:8000/citas/${citaSeleccionada.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(citaSeleccionada.value),
    });
  
    if (response.ok) {
      await fetchCitas();
      cerrarModal();
      alert('Cita actualizada correctamente.');
    } else {
      alert('Error al actualizar cita.');
    }
  };
  
  const eliminarCita = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta cita?')) return;
  
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://127.0.0.1:8000/citas/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (response.ok) {
      await fetchCitas();
      alert('Cita eliminada correctamente.');
    } else {
      alert('Error al eliminar cita.');
    }
  };
  
  const cambiarEstatus = async (id, nuevoEstatus) => {
    const token = localStorage.getItem('access_token');
    const citaActualizada = citas.value.find(c => c.id === id);
    if (!citaActualizada) return;
  
    const payload = { ...citaActualizada, estatus: nuevoEstatus };
  
    const response = await fetch(`http://127.0.0.1:8000/citas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (response.ok) {
      await fetchCitas();
      alert(`Cita ${nuevoEstatus.toLowerCase()} correctamente.`);
    } else {
      alert('Error al actualizar estatus.');
    }
  };
  
  onMounted(() => {
    fetchCitas();
  });
  </script>
  
  <style scoped src="../styles/Citas.css"></style>
  