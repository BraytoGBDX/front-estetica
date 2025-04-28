<template>
    <div class="perfil-usuario">
      <ClienteHeader/>
      <h1>Mi Perfil</h1>
      
      <div class="perfil-info">
        <img :src="fotoPerfil" alt="Foto de perfil" class="foto-perfil" />
        
        <div class="datos">
          <p>
            <label for="nombre"><strong>Nombre:</strong></label>
            <input v-model="nombre" id="nombre" />
          </p>
          <p>
            <label for="apellidos"><strong>Apellidos:</strong></label>
            <input v-model="apellidos" id="apellidos" />
          </p>
          <p>
            <label for="correo"><strong>Correo:</strong></label>
            <input v-model="correo" id="correo" />
          </p>
          <p>
            <label for="tipoUsuario"><strong>Tipo de Usuario:</strong></label>
            <input disabled v-model="tipoUsuario" id="tipoUsuario" />
          </p>
          <p>
            <label for="telefono"><strong>Número de Teléfono:</strong></label>
            <input v-model="numeroTelefono" id="telefono" />
          </p>
          <p>
            <label for="estatus"><strong>Estatus:</strong></label>
            <input v-model="estatus" id="estatus" />
          </p>
          <p>
            <label for="contrasena"><strong>Contraseña:</strong></label>
            <input v-model="contrasena" id="contrasena" type="password" placeholder="Nueva contraseña" />
          </p>
        </div>
      </div>
  
      <button @click="actualizarPerfil" class="btn-actualizar">Actualizar</button>
      <button @click="cerrarSesion" class="btn-cerrar-sesion">Cerrar Sesión</button>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ClienteHeader from './ClientesHeader.vue';
import bcrypt from 'bcryptjs'; // <--- IMPORTANTE: importa bcryptjs

const router = useRouter();

const nombre = ref('');
const apellidos = ref('');
const correo = ref('');
const tipoUsuario = ref('');
const numeroTelefono = ref('');
const estatus = ref('');
const contrasena = ref(''); // Nueva contraseña
const fotoPerfil = ref('https://via.placeholder.com/120');

// Token
const accessToken = localStorage.getItem('access_token');

// Decodificar JWT
const decodificarToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};

const usuarioId = decodificarToken(accessToken).id;

// Obtener datos del perfil
const obtenerDatosPerfil = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/users/${usuarioId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    
    nombre.value = data.nombre;
    apellidos.value = data.apellidos;
    correo.value = data.correoElectronico;
    tipoUsuario.value = data.tipoUsuario;
    numeroTelefono.value = data.numeroTelefono;
    estatus.value = data.estatus;
  } catch (error) {
    console.error('Error al obtener los datos del perfil:', error);
  }
};

// Actualizar perfil
const actualizarPerfil = async () => {
  try {
    let contrasenaHasheada;

    if (contrasena.value.trim() !== '') {
      contrasenaHasheada = await bcrypt.hash(contrasena.value, 12); // <--- Aquí usas bcrypt
    }

    const payload = {
      nombre: nombre.value,
      apellidos: apellidos.value,
      tipoUsuario: tipoUsuario.value,
      correoElectronico: correo.value,
      numeroTelefono: numeroTelefono.value,
      estatus: estatus.value,
    };

    if (contrasenaHasheada) {
      payload.contrasena = contrasenaHasheada; // Solo agregas contraseña si fue cambiada
    }

    const response = await fetch(`http://127.0.0.1:8000/usersUpdate/${usuarioId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
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

// Cargar perfil al montar
onMounted(obtenerDatosPerfil);
</script>

<style src="../styles/PerfilCliente.css"></style>
 