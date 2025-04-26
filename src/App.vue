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
  width: 100vw;
  height: 100vh;
}

.background {
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* Fondo negro completo */
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
