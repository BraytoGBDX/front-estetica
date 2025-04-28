// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import AdminDashboard from './components/AdminDashboard.vue';
import Register from './components/Register.vue';
import ClienteDashboard from './components/ClienteDashboard.vue';
import ClientesAdmin from './components/ClientesAdmin.vue';
import Tratamientos from './components/Tratamientos.vue';
import Citas from './components/Citas.vue';
import CitasCliente from './components/CitasCliente.vue';
import NotFound from './components/NotFound.vue'; // 🛑 Importamos la página de error
import PerfilCliente from './components/PerfilCliente.vue'
import RecuperarPassword from './components/RecuperarPassword.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
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
  { path: '/clientes', component: ClientesAdmin },
  { path: '/citas', component: Citas },
  { path: '/tratamientos', component: Tratamientos },
  { path: '/citasCliente', component: CitasCliente },
  { path: '/perfil', component: PerfilCliente },
  { path: '/recuperar', component: RecuperarPassword },


  
  // ✨ Ruta para manejar cualquier ruta que no exista
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🚀 Guardia Global
// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('access_token');
//     const tipoUsuario = localStorage.getItem('tipo_usuario');
  
//     // 🚨 PRIMERO: Ignorar la ruta de error 404
//     if (to.name === 'NotFound') {
//       return next(); // Deja pasar a la página NotFound aunque no tenga token
//     }
  
//     // 🛡️ Luego proteges el resto
//     if (!token && to.name !== 'login' && to.name !== 'register' && to.path !== '/recuperar') {
//       return next({ name: 'login' });
//     }
  
//     if (to.name === 'login' && token) {
//       if (tipoUsuario === 'Administrador') {
//         return next({ name: 'admin-dashboard' });
//       } else if (tipoUsuario === 'Cliente') {
//         return next({ name: 'cliente-dashboard' });
//       } else {
//         localStorage.clear();
//         return next({ name: 'login' });
//       }
//     }
  
//     if (token) {
//       if (tipoUsuario === 'Administrador') {
//         if (to.name === 'cliente-dashboard' || to.path === '/citasCliente') {
//           return next({ name: 'admin-dashboard' });
//         }
//       } else if (tipoUsuario === 'Cliente') {
//         if (
//           to.name === 'admin-dashboard' ||
//           to.path === '/clientes' ||
//           to.path === '/citas' ||
//           to.path === '/tratamientos'
//         ) {
//           return next({ name: 'cliente-dashboard' });
//         }
//       }
//     }
  
//     next();
//   });
  
export default router;
