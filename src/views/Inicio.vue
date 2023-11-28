<template>
  <div id="app" class="container mt-4">
    <div class="border p-4 bodyd">
      <div class="d-flex">
        <button class="btn btn-primary custom-button" @click="mostrarFormulario = true">Agregar productos</button>
        <input v-model="busqueda" type="text" placeholder="Buscar por nombre" class="buscador">
      </div>
      <div class="row mt-4">
        <div class="col-md-4" v-for="product in filteredProducts" :key="product.id">
          <div class="product-card">
            <div class="row">
              <div class="col-md-6">
                <p><strong>Nombre:</strong> {{ product.name }}</p>
                <p><strong>Material:</strong> {{ product.material }}</p>
                <p><strong>Precio:</strong> ${{ product.price }}</p>
                <p>
                  <strong>Stock:</strong>
                  <button class="btn btn-sm" @click="reducirStock(product)" style="color: rgb(52, 143, 213) !important;">-</button>
                  {{ product.stock }}
                  <button class="btn btn-sm" @click="aumentarStock(product)" style="color: rgb(52, 143, 213) !important;">+</button>
                </p>
              </div>
              <div class="col-md-6">
                <img :src="product.image" alt="Producto" />
              </div>
            </div>
            <div class="text-center mt-2">
              <button class="btn btn-danger btn-sm" @click="eliminarProducto(product)">Eliminar producto</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Formulario para agregar un nuevo producto (fuera del contenedor) -->
    <div class="mt-4" v-if="mostrarFormulario">
      <div class="formulario-agregar-producto-abierto" @click="cancelarAgregarProducto">
        <div class="formulario-agregar-producto" @click.stop>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-16 col-18">
                <h2>Agregar Producto</h2>
                <form @submit.prevent="agregarNuevoProducto">
                  <label for="nuevo-producto-image" class="col-form-label col-sm-2">Imagen:</label>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" id="nuevo-producto-image" v-model="nuevoProducto.image" class="form-control form-control-sm center">
                    </div>
                  </div>
                  <label for="nuevo-producto-name" class="col-form-label col-sm-2">Nombre:</label>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" id="nuevo-producto-name" v-model="nuevoProducto.name" class="form-control form-control-sm">
                    </div>
                  </div>
                  <label for="nuevo-producto-material" class="col-form-label col-sm-2">Material:</label>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" id="nuevo-producto-material" v-model="nuevoProducto.material" class="form-control form-control-sm">
                    </div>
                  </div>
                  <label for="nuevo-producto-price" class="col-form-label col-sm-2">Precio:</label>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="text" id="nuevo-producto-price" v-model="nuevoProducto.price" class="form-control form-control-sm">
                    </div>
                  </div>
                  <label for="nuevo-producto-stock" class="col-form-label col-sm-2">Stock:</label>
                  <div class="form-group row">
                    <div class="col-sm-12">
                      <input type="number" id="nuevo-producto-stock" v-model="nuevoProducto.stock" class="form-control form-control-sm">
                    </div>
                  </div>
                  <div class="text-center mt-10">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'PaginaInicio',
  data() {
    return {
      products: [
        {
    id: 3,
    image: require('@/assets/producto3.jpg'),
    name: 'Mesa de universitaria',
    material: 'Madera de roble',
    price: 299.99,
    stock: 10
  },
  {
    id: 4,
    image: require('@/assets/producto4.jpg'),
    name: 'Sofá de Cuero universitario',
    material: 'Cuero genuino',
    price: 499.99,
    stock: 5
  },
  {
    id: 5,
    image: require('@/assets/producto5.jpg'),
    name: 'Silla de Oficina',
    material: 'Plástico y metal',
    price: 129.99,
    stock: 15
  },
  {
    id: 6,
    image: require('@/assets/producto6.jpg'),
    name: 'Armario de laboratorio',
    material: 'Madera contrachapada',
    price: 379.99,
    stock: 8
  },
  {
    id: 7,
    image: require('@/assets/producto7.jpg'),
    name: 'Estante de Pared',
    material: 'Madera de pino',
    price: 89.99,
    stock: 12
  },
  {
    id: 8,
    image: require('@/assets/producto8.jpg'),
    name: 'Silla de Comedor',
    material: 'Madera de abedul',
    price: 79.99,
    stock: 20
  },
  {
    id: 9,
    image: require('@/assets/producto9.jpg'),
    name: 'Mesa estudiantil',
    material: 'Vidrio templado y metal',
    price: 149.99,
    stock: 7
  },
  {
    id: 10,
    image: require('@/assets/producto10.jpg'),
    name: 'Cama',
    material: 'Madera de cerezo',
    price: 599.99,
    stock: 4
  },
        // Puedes agregar más productos aquí
      ],
      mostrarFormulario: false, // Inicialmente, el formulario no se muestra
      nuevoProducto: {
        image: '',
        name: '',
        material: '',
        price: '',
        stock: 0
      },
      busqueda: '' // Variable para la búsqueda
    };
  },
  computed: {
    ...mapGetters(['getUsers,getSesion']),
    filteredProducts() {
      // Filtrar productos por nombre
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.busqueda.toLowerCase());
      });
    }
  },
  methods: {
    ...mapActions(['loginUser', 'logoutUser']),
    agregarNuevoProducto() {
      // Agregar lógica para guardar el nuevo producto en la lista
      this.products.push(this.nuevoProducto);

      // Restablecer el formulario y ocultar
      this.nuevoProducto = {
        image: '',
        name: '',
        material: '',
        price: '',
        stock: 0
      };
      this.mostrarFormulario = false;
    },

    cancelarAgregarProducto() {
      // Restablecer el formulario y ocultar
      this.nuevoProducto = {
        image: '',
        name: '',
        material: '',
        price: '',
        stock: 0
      };
      this.mostrarFormulario = false;
    },
    eliminarProducto(product) {
      const index = this.products.indexOf(product);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    },aumentarStock(product) {
      // Aumentar el stock del producto
      product.stock++;
    },
    reducirStock(product) {
      // Reducir el stock del producto si es mayor que 0
      if (product.stock > 0) {
        product.stock--;
      }
    },
    
  }
};
</script>

<style scoped>
.custom-button {
  margin-right: 20px;
}
.product-card {
  padding: 10px;
  margin: 10px;
  background-color: #333 !important;
  border: none !important;
  border-radius: 5px;
}
.product-card p strong {
  color: white !important;
}
.product-card p {
  color: white !important;
}
.product-card button.btn-secondary {
  background: transparent !important;
  color: rgb(52, 143, 213) !important;
  border: none;
}
.product-card img {
  max-width: 100%;
  height: auto;
}
.formulario-agregar-producto {
  width: 100%;
  max-width: 300px;
  padding: 20px;
  background-color:  #151f2b !important;
  border: 1px solid rgb(52, 143, 213) !important;
  border-radius: 5px;
}

/* Estilo para el título del formulario */
.formulario-agregar-producto h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Estilo para los campos de entrada */
.formulario-agregar-producto .form-group {
  margin-bottom: 15px;
}

.formulario-agregar-producto label {
  font-weight: 600;
  color: #333;
}

/* Estilo para el botón de registro */
.formulario-agregar-producto button {
  width: 100%;
  padding: 10px;
  background-color: transparent !important;
  color: rgb(52, 143, 213) ;
  border: solid 2px rgb(52, 143, 213) ;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  padding-bottom: 15px;
}
.formulario-agregar-producto button:hover {
  background-color: rgb(52, 143, 213) !important;
  color: #fff;
}

/* Estilo para el formulario de registro (cuando se muestra) */
.formulario-agregar-producto-abierto {
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
.formulario-agregar-producto {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color:  #151f2b !important;
  border: none !important;
  border-radius: 5px;
}
.formulario-agregar-producto h2, label {
  color: rgb(52, 143, 213) !important;
}
.formulario-agregar-producto input {
  display: block;
}
.bodyd {
  border: none !important;
  border-radius: none;
  background-color: #151f2b !important;;
}
.buscador{
  border-radius: 5px;
  width: 500px;
}
</style>
