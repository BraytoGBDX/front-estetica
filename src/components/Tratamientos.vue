<template>
  <div class="tabla-container">
    <Header />
    <h2 class="titulo">Tratamientos Disponibles</h2>

    <!-- Botón para abrir formulario de nuevo tratamiento -->
    <div class="controles">
      <button @click="openModal" class="btn agregar-btn">Agregar Tratamiento</button>
      <input placeholder="Buscar por nombre..." class="buscador" v-model="searchTerm" />
      <select class="filtro" v-model="filterStatus">
        <option value="">Todos los estatus</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
    </div>

    <table class="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Tiempo</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tratamiento in filteredTratamientos" :key="tratamiento.id">
          <td>{{ tratamiento.nombre }}</td>
          <td>{{ tratamiento.descripcion }}</td>
          <td>{{ tratamiento.tiempo }}</td>
          <td>
            <span :class="['badge', tratamiento.estatus === 'Activo' ? 'activo' : 'inactivo']">
              {{ tratamiento.estatus }}
            </span>
          </td>
          <td>
            <button @click="editTratamiento(tratamiento)" class="btn editar-btn">Editar</button>
            <button @click="deleteTratamiento(tratamiento.id)" class="btn eliminar-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para editar y agregar tratamiento -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ editing ? 'Editar Tratamiento' : 'Agregar Tratamiento' }}</h3>
        <form @submit.prevent="saveTratamiento">
          <label for="nombre">Nombre</label>
          <input v-model="tratamientoForm.nombre" id="nombre" type="text" required />

          <label for="descripcion">Descripción</label>
          <input v-model="tratamientoForm.descripcion" id="descripcion" type="text" required />

          <label for="tiempo">Tiempo</label>
          <input v-model="tratamientoForm.tiempo" id="tiempo" type="text" required />

          <label for="estatus">Estatus</label>
          <select v-model="tratamientoForm.estatus" id="estatus" required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <div class="modal-actions">
            <button type="submit" class="btn submit-btn">{{ editing ? 'Guardar Cambios' : 'Agregar Tratamiento' }}</button>
            <button @click="closeModal" type="button" class="btn cancel-btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Header from './Header.vue';

const tratamientos = ref([]);
const showModal = ref(false);
const editing = ref(false);
const tratamientoForm = ref({
  id: null,
  nombre: '',
  descripcion: '',
  tiempo: '',
  estatus: 'Activo',
});
const searchTerm = ref('');
const filterStatus = ref('');

// Filtrar tratamientos según búsqueda y estatus
const filteredTratamientos = computed(() => {
  return tratamientos.value.filter((tratamiento) => {
    const matchesSearch = tratamiento.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesStatus = !filterStatus.value || tratamiento.estatus === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

// Cargar tratamientos al montar el componente
onMounted(async () => {
  await loadTratamientos();
});

// Función para obtener los tratamientos de la API
const loadTratamientos = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://127.0.0.1:8000/tratamientos',{
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

// Función para abrir el modal de edición o creación
const openModal = () => {
  tratamientoForm.value = {
    id: null,
    nombre: '',
    descripcion: '',
    tiempo: '',
    estatus: 'Activo',
  };
  editing.value = false;
  showModal.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  showModal.value = false;
};

// Función para manejar la edición de un tratamiento
const editTratamiento = (tratamiento) => {
  tratamientoForm.value = { ...tratamiento };
  editing.value = true;
  showModal.value = true;
};

// Función para eliminar un tratamiento
const deleteTratamiento = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://127.0.0.1:8000/tratamientos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },

    });
    if (response.ok) {
      tratamientos.value = tratamientos.value.filter((tratamiento) => tratamiento.id !== id);
    } else {
      console.error('Error al eliminar tratamiento');
    }
  } catch (error) {
    console.error('Error al hacer la solicitud DELETE', error);
  }
};

// Función para guardar el tratamiento (ya sea nuevo o editado)
const saveTratamiento = async () => {
  try {
    // Asegúrate de que 'tiempo' es un string
    tratamientoForm.value.tiempo = String(tratamientoForm.value.tiempo);

    // Si estamos editando, no necesitamos establecer el 'id' manualmente
    if (editing.value) {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/tratamientos/${tratamientoForm.value.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tratamientoForm.value)
      });

      if (response.ok) {
        const updatedTratamiento = await response.json();
        // Actualizar el tratamiento en el array
        const index = tratamientos.value.findIndex((tratamiento) => tratamiento.id === updatedTratamiento.id);
        tratamientos.value[index] = updatedTratamiento;
      } else {
        console.error('Error al editar tratamiento', await response.text());
      }
    } else {
      // En caso de nuevo tratamiento, enviamos un POST
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/tratamientos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tratamientoForm.value)
      });

      if (response.ok) {
        const newTratamiento = await response.json();
        tratamientos.value.push(newTratamiento);
      } else {
        console.error('Error al agregar tratamiento');
      }
    }

    closeModal();
  } catch (error) {
    console.error('Error al hacer la solicitud', error);
  }
};


</script>

<style scoped src="../styles/Tratamientos.css"></style>
