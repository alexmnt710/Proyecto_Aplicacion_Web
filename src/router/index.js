import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '@/views/Inicio.vue';
import Registro from '@/components/RegistroForm.vue'

const routes = [
  {
    path: '/', // Esta es la ruta principal, debe ser solo '/'
    name: 'Inicio',
    component: Inicio, // Utiliza el componente Inicio.vue
    meta: { mainPage: true } // Esta ruta se marcará como la página principal
  },
  {
    path: '/registro', // Esta es la ruta principal, debe ser solo '/'
    name: 'Registro',
    component: Registro, // Utiliza el componente Inicio.vue
    meta: { mainPage: true } // Esta ruta se marcará como la página principal
  },

  // ... Otras rutas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;