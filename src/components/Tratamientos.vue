<template>
    <div class="tabla-container">
      <h2 class="titulo">Tratamientos Disponibles</h2>
  
      <div class="controles">
        <input placeholder="Buscar por nombre..." class="buscador" />
        <select class="filtro">
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
          </tr>
        </thead>
        <tbody>
          <!-- Ejemplo de datos fijos, luego aquí irá v-for -->
          <tr>
            <td>Facial Hidratante</td>
            <td>Hidratación profunda para todo tipo de piel.</td>
            <td>00:45:00</td>
            <td><span class="badge activo">Activo</span></td>
          </tr>
          <tr>
            <td>Depilación Láser</td>
            <td>Eliminación de vello en zonas específicas.</td>
            <td>01:30:00</td>
            <td><span class="badge inactivo">Inactivo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  // Sin lógica todavía
  </script>
  
  <style scoped src="../styles/Tratamientos.css"></style>
  