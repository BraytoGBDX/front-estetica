<script setup>
// No es necesario importar Login aquí, ya que el enrutador se encarga de eso.
</script>

<template>
  <div class="background">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  width: 100%;
  height: 100vh;
}

.background {
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* Fondo blanco */
  display: block; /* Cambiar de flex a block */
}

#app {
  width: 100%;
  height: 100%;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
  width: 100%; /* Asegura que el contenedor ocupe todo el ancho de la ventana */
  box-sizing: border-box; /* Asegura que el padding no afecte el tamaño total */
}

</style>
