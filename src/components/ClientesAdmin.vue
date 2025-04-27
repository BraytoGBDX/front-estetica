<template>
    <div class="tabla-container">
      <Header />
      <h2 class="titulo">Lista de Usuarios</h2>
  
      <div class="controles">
        <input v-model="busqueda" placeholder="Buscar por nombre o correo..." class="buscador" />
        <select v-model="filtroTipo" class="filtro">
          <option value="">Todos los tipos</option>
          <option value="Administrador">Administrador</option>
          <option value="Cliente">Cliente</option>
        </select>
      </div>
  
      <table class="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Tipo Usuario</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuariosFiltrados" :key="user.id">
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellidos }}</td>
            <td>{{ user.tipoUsuario }}</td>
            <td>{{ user.correoElectronico }}</td>
            <td>{{ user.numeroTelefono }}</td>
            <td>
              <span :class="['badge', user.estatus === 'Activo' ? 'activo' : 'inactivo']">
                {{ user.estatus }}
              </span>
            </td>
            <td class="acciones">
              <button class="btn editar" @click="abrirModal(user)">Editar</button>
              <button class="btn eliminar" @click="eliminarUsuario(user.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal para editar -->
      <div v-if="mostrarModal" class="modal">
        <div class="modal-contenido">
          <h3>Editar Usuario</h3>
  
          <div class="formulario">
      <label>Nombre</label>
      <input v-model="usuarioSeleccionado.nombre" placeholder="Nombre" />

      <label>Apellidos</label>
      <input v-model="usuarioSeleccionado.apellidos" placeholder="Apellidos" />

      <label>Tipo de Usuario</label>
      <select v-model="usuarioSeleccionado.tipoUsuario">
        <option value="Administrador">Administrador</option>
        <option value="Cliente">Cliente</option>
      </select>

      <label>Correo Electrónico</label>
      <input v-model="usuarioSeleccionado.correoElectronico" placeholder="Correo" />

      <label>Teléfono</label>
      <input v-model="usuarioSeleccionado.numeroTelefono" placeholder="Teléfono" />

      <label>Estatus</label>
      <select v-model="usuarioSeleccionado.estatus">
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
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
  import { ref, computed, onMounted } from 'vue';
  import Header from '../components/Header.vue';
  
  const usuarios = ref([]);
  const busqueda = ref('');
  const filtroTipo = ref('');
  const mostrarModal = ref(false);
  const usuarioSeleccionado = ref({});
  
  const fetchUsuarios = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch('http://127.0.0.1:8000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    usuarios.value = data;
  };
  
  const abrirModal = (usuario) => {
    usuarioSeleccionado.value = { ...usuario };
    mostrarModal.value = true;
  };
  
  const cerrarModal = () => {
    mostrarModal.value = false;
    usuarioSeleccionado.value = {};
  };
  
  const guardarCambios = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://127.0.0.1:8000/usersUpdate/${usuarioSeleccionado.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usuarioSeleccionado.value),
    });
  
    if (response.ok) {
      await fetchUsuarios();
      cerrarModal();
      alert('Usuario actualizado correctamente.');
    } else {
      alert('Error al actualizar usuario.');
    }
  };
  
  const eliminarUsuario = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
  
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://127.0.0.1:8000/usersDelete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      await fetchUsuarios();
      alert('Usuario eliminado correctamente.');
    } else {
      alert('Error al eliminar usuario.');
    }
  };
  
  const usuariosFiltrados = computed(() => {
    return usuarios.value.filter((user) => {
      const coincideNombreCorreo = 
        user.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
        user.correoElectronico.toLowerCase().includes(busqueda.value.toLowerCase());
      const coincideTipo = filtroTipo.value ? user.tipoUsuario === filtroTipo.value : true;
      return coincideNombreCorreo && coincideTipo;
    });
  });
  
  onMounted(() => {
    fetchUsuarios();
  });
  </script>
  
  <style scoped src="../styles/UsuariosAdmin.css"></style>
  