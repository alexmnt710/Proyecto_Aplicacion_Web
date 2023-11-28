<template>
  <div>
    <header class="navbar navbar-expand-lg navbar-light bg-light header">
      <!-- Logo o icono en la parte superior derecha -->
      <router-link to="/" class="navbar-brand ml-auto mx-4">
        <img src="@/assets/logo-cropped.svg" alt="Logo" width="50" style="cursor: pointer;">
      </router-link>
      <!-- Botones en la parte superior izquierda -->
      <div class="navbar-nav">
        <div v-if="userLog.tipo===0">
          <p style="color:#fff;">Bienvenido Dios, {{userLog.usuario}}</p>
        </div>
        <div v-else-if="userLog.tipo===1">
          <p style="color:#fff;">Bienvenido, {{userLog.usuario}}</p>
        </div>
        <button class="btn btn-primary mx-2" @click="mostrarFormulario('menu')">
          <span class="material-symbols-outlined">
            menu
          </span>
        </button>
      </div>
    </header>
    <registro-form v-if="shouldShowRegistrationForm" @cerrar="toggleRegistrationForm(false)"></registro-form>
    <LoginComponent v-else-if="!sesion" @cerrar="toggleRegistrationForm(false)"></LoginComponent>
    <menu-component ref="menuComponent" @mostrar-registro="toggleRegistrationForm(true)"></menu-component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RegistroForm from "@/components/RegistroForm.vue";
import MenuComponent from "@/components/MenuComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  components: {
    RegistroForm,
    LoginComponent,
    MenuComponent,
  },
  methods: {
    ...mapActions(['toggleRegistrationForm']), // Mapear la acción de Vuex
    mostrarFormulario(tipo) {
      if (tipo === "menu") {
        this.$refs.menuComponent.mostrarMenu();
      }
    },
  },
  computed: {
    ...mapGetters({
      sesion: 'getSesion',
      user: 'getUsers', // Esta propiedad computada no se utiliza en la plantilla, considera removerla si no es necesaria
      userLog: 'getUserLog',
      shouldShowRegistrationForm: 'showRegistrationForm', // Utilizar el getter mapeado
    }),
  },
  created() {
    if (this.user.length === 0) { // Corregir typo y utilizar la propiedad computada mapeada
      this.toggleRegistrationForm(true);
    }
  },
};
</script>



<style scoped>
/* Css del Header */
header {
  background-color: #151f2b !important;
  border-bottom: rgb(52, 143, 213) !important;
}
.header .navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .navbar-nav {
  margin-left: auto; /* Mueve los botones a la derecha */
  margin-right: 10px;
}
.header .navbar-brand {
  margin-right: 10px; /* Agrega espacio entre el logo y el borde derecho */
}
.header button {
  background-color: transparent !important;
  color: rgb(52, 143, 213) !important;
  border: none;
  transition: opacity 0.3s;
}
.header button:hover {
  background-color: rgb(52, 143, 213) !important;
  color: white !important;
  border: none;
}

</style>
