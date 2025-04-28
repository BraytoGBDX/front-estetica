<template>
    <div class="perfil-usuario">
        <ClienteHeader/>
      <h1>Mi Perfil</h1>
      
      <div class="perfil-info">
        <img :src="fotoPerfil" alt="Foto de perfil" class="foto-perfil" />
        
        <div class="datos">
          <p><strong>Nombre:</strong> <input v-model="nombre" /></p>
          <p><strong>Correo:</strong> <input v-model="correo" /></p>
          <p><strong>Tipo de Usuario:</strong> <input disabled v-model="tipoUsuario" /></p>
        </div>
      </div>
  
      <button @click="actualizarPerfil" class="btn-actualizar">Actualizar</button>
      <button @click="cerrarSesion" class="btn-cerrar-sesion">Cerrar Sesión</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import ClienteHeader from './ClientesHeader.vue'; // Importa el header de cliente
  
  const router = useRouter();
  
  const nombre = ref('');
  const correo = ref('');
  const tipoUsuario = ref('');
  const fotoPerfil = ref('https://via.placeholder.com/120');
  
  // Obtén el token de acceso desde el almacenamiento local
  const accessToken = localStorage.getItem('access_token');
  
  // Función para decodificar el JWT (extraer el payload)
  const decodificarToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  
  const usuarioId = decodificarToken(accessToken).id;
  
  // Obtener los datos del perfil del usuario cuando se carga el componente
  const obtenerDatosPerfil = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${usuarioId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
      
      // Asigna los datos al estado
      nombre.value = data.nombre;
      correo.value = data.correo;
      tipoUsuario.value = data.tipoUsuario;
    } catch (error) {
      console.error('Error al obtener los datos del perfil:', error);
    }
  };
  
  // Actualizar los datos del perfil en el backend
  const actualizarPerfil = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/usersUpdate/${usuarioId}`, {
        method: 'PUT', // O 'PATCH', dependiendo de tu API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          nombre: nombre.value,
          correo: correo.value,
          tipoUsuario: tipoUsuario.value,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
  
      const data = await response.json();
      alert('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };
  
  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.clear();
    router.push({ name: 'login' });
  };
  
  // Obtener los datos del perfil al montar el componente
  onMounted(obtenerDatosPerfil);
  </script>
  

  <style src="../styles/PerfilCliente.css"></style>


  