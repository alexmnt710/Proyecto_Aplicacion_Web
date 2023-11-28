<template>
  <div class="formulario-registro-abierto" @click="cerrarFormulario()">
    <div class="formulario-registro" @click.stop>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10 col-12">
            <h2>Registro</h2>
            <form @submit.prevent="registrarUsuario">
              <div class="form-group">
                <label for="usuario">Nombre de Usuario</label>
                <input v-model="usuario" type="text" id="usuario" class="form-control" placeholder="Usuario">
              </div>
              <div class="form-group">
                <label for="correo">Correo Electrónico</label>
                <input v-model="correo" type="email" id="correo" class="form-control" placeholder="Correo Electrónico">
              </div>
              <div class="form-group">
                <label for="contrasena">Contraseña</label>
                <input v-model="contrasena" type="password" id="contra" class="form-control" placeholder="Contraseña">
              </div>
              <button type="submit" class="btn btn-primary mt-3">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      usuario: '',
      correo: '',
      contrasena: '',
    };
  },
  computed: {
    ...mapGetters(['getUsers']), // No uses el espacio de nombres 'users'
  },
  methods: {
    ...mapActions(['registerUser']), // No uses el espacio de nombres 'users'
    async registrarUsuario() {
      // Validaciones
      if (!this.usuario || !this.correo || !this.contrasena) {
        Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
        return;
      }

      // Accede a la lista de usuarios desde el módulo 'users'
      const usuariosRegistrados = this.getUsers;

      if (usuariosRegistrados && (usuariosRegistrados.some((u) => u.usuario === this.usuario) || usuariosRegistrados.some((u) => u.correo === this.correo))) {
        Swal.fire('Error', 'El usuario o correo ya están registrados', 'error');
        return;
      }

      if (this.contrasena.length < 6) {
        Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
        return;
      }
      const user = {
        usuario: this.usuario,
        correo: this.correo,
        contrasena: this.contrasena,
        tipo: 1,
      };
      await this.registerUser(user); 
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Te has registrado con éxito',
        icon: 'success',
        confirmButtonText: 'Ir al inicio de Sesion',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit('cerrar');
        }
      });
    },
    cerrarFormulario() {
      this.$emit('cerrar');
      console.log("Lo intenta")
    },
  },
};
</script>

  
  <style scoped>
  .formulario-registro button {
    width: 100%;
    padding: 10px;
    background-color: transparent !important;
    color: rgb(52, 143, 213) ;
    border: solid 2px rgb(52, 143, 213);
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .formulario-registro button:hover {
    background-color: rgb(52, 143, 213) !important;
    color: #fff;
  }
  
  /* Estilo para el formulario de registro (cuando se muestra) */
  .formulario-registro-abierto {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #333; /* Fondo transparente */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  
  /* Estilo para el formulario de registro dentro del div */
  .formulario-registro{
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color:  #151f2b !important;
    border: none;
    border-radius: 5px;
  }
  .formulario-registro h2, label{
    color:rgb(52, 143, 213) !important
  }
  </style>
  