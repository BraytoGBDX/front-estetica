<template>
    <div class="tabla-container">
      <h2 class="titulo">Lista de Usuarios</h2>
  
      <div class="controles">
        <input placeholder="Buscar por nombre o correo..." class="buscador" />
        <select class="filtro">
          <option value="">Todos los tipos</option>
          <option value="Administrador">Administrador</option>
          <option value="Recepcionista">Recepcionista</option>
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
          </tr>
        </thead>
        <tbody>
          <!-- Ejemplo de datos fijos, luego irá un v-for -->
          <tr>
            <td>Juan</td>
            <td>Pérez</td>
            <td>Administrador</td>
            <td>juan.perez@email.com</td>
            <td>+52 123 456 7890</td>
            <td><span class="badge activo">Activo</span></td>
          </tr>
          <tr>
            <td>María</td>
            <td>González</td>
            <td>Recepcionista</td>
            <td>maria.gonzalez@email.com</td>
            <td>+52 987 654 3210</td>
            <td><span class="badge inactivo">Inactivo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  // No tiene lógica aún
  </script>
  
  <style scoped src="../styles/UsuariosAdmin.css"></style>
  