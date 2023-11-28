import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';
import './assets/custom-sweetalert.css';
import store from './store/index.js';
import router from './router/index.js';

const superUsuario = store.getters.getUsers;
if (superUsuario.length === 0) {
  const datosSuperUsuario = {
    usuario: 'alexmnt710',
    correo: 'superusuario@example.com',
    contrasena: '0991969987',
    tipo: 0, // Super usuario
  };
  console.log('El usuario se ha creado con exito: ', superUsuario);
  // Agrega el "super usuario" al store
  store.dispatch('registerUser', datosSuperUsuario); // Aquí usamos 'registerUser'
}else{
  console.log('Ya existe superusuario: ',superUsuario)
}

const app = createApp(App);

app.use(store);

app.use(router) // Registra Vue Router

app.mount('#app');
