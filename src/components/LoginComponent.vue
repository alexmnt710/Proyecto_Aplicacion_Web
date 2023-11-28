<template>
    <div class="formulario-inicio-sesion-abierto" @click="cerrarFormulario">
        <div class="formulario-inicio-sesion" @click.stop>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-10 col-12">
                <h2>Inicio de Sesión</h2>
                <form @submit.prevent="iniciarSesion">
                  <div class="form-group">
                    <label for="nombreUsuario">Nombre de Usuario</label>
                    <input v-model="nombreUsuario" type="text" id="nombreUsuario" class="form-control" placeholder="Nombre de Usuario">
                  </div>
                  <div class="form-group">
                    <label for="contrasena">Contraseña</label>
                    <input v-model="contrasena" type="password" id="contrasena" class="form-control" placeholder="Contraseña">
                  </div>
                  <button type="submit" class="btn btn-primary mt-3">Iniciar Sesión</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </template>
  <script>
  import Swal from 'sweetalert2';
  import store from '@/store';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        nombreUsuario: '',
        contrasena: '',
        sesion: null,
      };
    },
    methods: {
      cerrarFormulario() {
        this.$emit('cerrar');
      },
      iniciarSesion() {
        if (this.nombreUsuario && this.contrasena) {
          const usuarios = this.getUsers;
          const usuarioIngresado = {
            nombre: this.nombreUsuario,
            contrasena: this.contrasena,
          };
          let usuarioEncontrado = null;
          usuarios.forEach(user => {
            if (user.nombre === usuarioIngresado.usuario && user.contrasena === usuarioIngresado.contrasena) {
              
              usuarioEncontrado = user;
            }
          });
          if (usuarioEncontrado) {

            Swal.fire({
              title: 'Inicio de Sesión Exitoso',
              icon: 'success',
              confirmButtonText: 'Ok',
              timer: 1000,
            }).then(() => {
              store.dispatch('loginUser',usuarioEncontrado),
              this.sesion=store.getters.getSesion;
              this.$emit('cerrar');
              console.log(this.sesion)
            });
          } else {
            Swal.fire('Credenciales incorrectas', 'El nombre de usuario o la contraseña son incorrectos.', 'error');
          }
        } else {
          Swal.fire('Campos Vacíos', 'Por favor, complete todos los campos.', 'error');
        }
      },
      },
      computed:{
        ...mapGetters(['getUsers']),
        user(){
          return this.getUsers;
        }
      }
  };
  </script>
<style scoped>
.formulario-inicio-sesion {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color:  #151f2b !important;
  border: 1px solid rgb(52, 143, 213) !important;
  border-radius: 5px;
}

/* Estilo para el título del formulario */
.formulario-inicio-sesion h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Estilo para los campos de entrada */
.formulario-inicio-sesion .form-group {
  margin-bottom: 15px;
}

.formulario-inicio-sesion label {
  font-weight: 600;
  color: #333;
}

.formulario-inicio-sesion input[type="text"],
.formulario-inicio-sesion input[type="email"],
.formulario-inicio-sesion input[type="password"] {
  width: 100%; 
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
}

/* Estilo para el botón de registro */
.formulario-inicio-sesion {
  width: 100%;
  padding: 10px;
  background-color: rgb(52, 143, 213) !important;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}
.formulario-inicio-sesion button {
  width: 100%;
  padding: 10px;
  background-color: transparent !important;
  color: rgb(52, 143, 213) ;
  border: solid 2px rgb(52, 143, 213) ;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}
.formulario-inicio-sesion button:hover {
  background-color: rgb(52, 143, 213) !important;
  color: #fff;
}

/* Estilo para el formulario de registro (cuando se muestra) */
.formulario-inicio-sesion-abierto{
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
.formulario-inicio-sesion{
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color:  #151f2b !important;
  border: none !important;
  border-radius: 5px;
}
.formulario-inicio-sesion h2, label{
  color:rgb(52, 143, 213) !important
}
</style>