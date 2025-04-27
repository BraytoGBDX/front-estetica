<template>
    <div class="tabla-container">
      <h2 class="titulo">Citas Agendadas</h2>
  
      <div class="controles">
        <input placeholder="Buscar por cliente..." class="buscador" />
        <select class="filtro">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>
  
      <table class="tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Tratamiento</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <!-- Aquí luego irán las filas de citas -->
          <tr>
            <td>Ejemplo Cliente</td>
            <td>2025-04-30</td>
            <td>10:00 AM</td>
            <td>Facial Rejuvenecedor</td>
            <td><span class="badge pendiente">Pendiente</span></td>
          </tr>
          <tr>
            <td>Otra Persona</td>
            <td>2025-05-02</td>
            <td>2:00 PM</td>
            <td>Depilación Láser</td>
            <td><span class="badge confirmada">Confirmada</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  // Sin lógica por ahora
  </script>
  
  <style scoped src="../styles/Citas.css"></style>
