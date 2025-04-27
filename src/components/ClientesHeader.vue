<!-- filepath: c:\Users\jazzi\Documents\Projects\Experiments\front-estetica\src\components\HeaderCliente.vue -->
<template>
    <header class="header">
        <div class="logo" @click="irADashboard" style="cursor: pointer;">
            <div class="logo-text">ESTETICA</div>
        </div>

        <nav class="nav-links">
            <a href="#" class="nav-link" :class="{ active: rutaActual === '/cliente' }"
                @click.prevent="navegar('/cliente')">
                Dashboard
            </a>
            <a href="#" class="nav-link" :class="{ active: rutaActual === '/citas' }"
                @click.prevent="navegar('/citas')">
                Citas
            </a>
            <a href="#" class="nav-link" :class="{ active: rutaActual === '/perfil' }"
                @click.prevent="navegar('/perfil')">
                Perfil
            </a>
        </nav>

        <div class="icons">
            <button class="icon-button" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Log Out
            </button>
        </div>
    </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Función para navegar
function navegar(ruta) {
    router.push(ruta);
}

// Función para ir al dashboard al hacer click en el logo
function irADashboard() {
    router.push('/cliente');
}

// Función de logout
function logout() {
    localStorage.removeItem('token'); // Borra el token
    router.push('/login'); // Redirige al login
}

// Para marcar activo el link
const rutaActual = route.path;
</script>

<style scoped src="../styles/Header.css"></style>