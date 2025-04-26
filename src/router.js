// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue'; // Asegúrate de que la ruta sea correcta
import AdminDashboard from './components/AdminDashboard.vue'; // Vista del administrador
import Register from './components/Register.vue'; // Vista de registro
import ClienteDashboard from './components/ClienteDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'login', // Nombre de la ruta
    component: Login, // El componente que se mostrará en esta ruta
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/cliente',
    name: 'cliente-dashboard', 
    component: ClienteDashboard, 
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes, 
});

export default router; 
