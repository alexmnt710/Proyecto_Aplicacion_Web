<template>
  <div>
    <div class="menu-backdrop" @click="cerrarMenu" v-if="mostrar"></div>
    <div class="menu" :class="{ 'menu-abierto': mostrar }">
      <div class="menu-content" @click.stop>
        <!-- Contenido del menú -->
        <div class="menu-item" @click="administrarCuenta">
          <div class="menu-item-inner">
            Administrar Cuenta
          </div>
        </div>
        <div class="menu-item" @click="mostrarRegistro" v-if="userLog.tipo===0">
          <div class="menu-item-inner">
            Registrar Usuario
          </div>
        </div>
        <div class="menu-item" @click="contactar">
          <div class="menu-item-inner">
            Contactanos
          </div>
        </div>
        <div class="menu-item" @click="recargarPagina">
          <div class="menu-item-inner">
            Log Out
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      mostrar: false,
    };
  },

  computed: {
  ...mapGetters(['getSesion', 'getUsers','getUserLog']),
  sesion() {
    return this.getSesion;
  },
  user() {
    return this.getUsers;
  },
  userLog(){
    return this.getUserLog;
  }
},
  methods: {
    ...mapActions(['logoutUser']),
    mostrarMenu() {
      this.mostrar = true;
    },
    cerrarMenu() {
      this.mostrar = false;
    },
    mostrarRegistro() {
    this.$store.dispatch('toggleRegistrationForm', true);
    this.cerrarMenu();
    },
    recargarPagina() { Swal.fire({
              title: 'Tu sesion ha cerrado',
              icon: 'success',
              confirmButtonText: 'Ok',
              timer: 1000,
            }).then(() => {
              this.logoutUser();
              this.cerrarMenu();
            });
    },
  },
};
</script>
<style scoped>
/* Estilos CSS del menú */
.menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo transparente */
  z-index: 1000; /* Z-index mayor que el menú */
}

.menu {
  position: fixed;
  top: 0;
  right: 0; /* Aparece en la posición correcta */
  width: 40%; /* Ancho del menú, puedes ajustarlo según tus necesidades */
  height: 100%;
  background-color: #333; /* Color de fondo del menú */
  z-index: 1001; /* Z-index mayor que el fondo transparente */
  transition: transform 0.3s; /* Usamos transform para animar la apertura/cierre del menú */
  transform: translateX(100%); /* Inicialmente, el menú está fuera de la vista a la derecha */
}

.menu-abierto {
  transform: translateX(30%); /* Muestra el menú cuando está abierto */
}

.menu-content {
  color: white;
}

/* Estilos para los elementos del menú */
.menu-item {
  border-bottom: 2px solid  rgb(52, 143, 213); /* Borde blanco */
  padding: 15px; /* Relleno interno de 15px */
  text-align: left; /* Contenido centrado */
  cursor: pointer;
}
.menu-item:hover {
  border-bottom: 2px solid  rgb(211, 54, 216); /* Borde blanco */
  padding: 15px; 
  text-align: left; /* Contenido centrado */
  background-color:rgb(52, 143, 213);
  color:white;
  cursor: pointer;
}

.menu-item-inner {
  display: inline-block;
}

.menu-item a {
  color: white;
  text-decoration: none;
}

.menu-item a:hover {
  text-decoration: underline;
}
</style>