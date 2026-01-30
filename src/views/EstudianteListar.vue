<template>
  <div class="page-container">
    <div class="card">
      <h1 class="page-title">Listado de Estudiantes</h1>
      
      <div v-if="loading" class="loading-state">
        Cargando estudiantes...
      </div>
      
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Género</th>
              <th>Fecha Nac.</th>
              <th>Provincia</th>
              <th>Enlaces HATEOAS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="est in estudiantes" :key="est.id">
              <td>{{ est.id }}</td>
              <td>{{ est.nombre }}</td>
              <td>{{ est.apellido }}</td>
              <td>{{ est.genero }}</td>
              <td>{{ formatDate(est.fechaNacimiento) }}</td>
              <td>{{ est.provincia }}</td>
              <td>
                <div class="links-container" v-if="est.links && est.links.length">
                  <a v-for="(link, index) in est.links" 
                     :key="index" 
                     href="#" 
                     @click.prevent="abrirLink(link)"
                     class="link-badge">
                     {{ link.href }}
                  </a>
                </div>
                <span v-else class="text-muted">Sin enlaces</span>
              </td>
            </tr>
            <tr v-if="estudiantes.length === 0">
              <td colspan="7" class="text-center">No hay estudiantes registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <DataModal 
        :isOpen="modalOpen" 
        :title="modalTitle" 
        :data="modalData" 
        :loading="modalLoading"
        :error="modalError"
        @close="modalOpen = false"
    />
  </div>
</template>

<script>
import { consultarTodosFachada, consumirUrl } from '../client/MatriculaClient'
import DataModal from '../components/DataModal.vue'

export default {
  components: {
    DataModal
  },
  data() {
    return {
      estudiantes: [],
      loading: false,
      // Modal state
      modalOpen: false,
      modalTitle: '',
      modalData: null,
      modalLoading: false,
      modalError: null
    }
  },
  async mounted() {
    this.cargarEstudiantes();
  },
  methods: {
    async cargarEstudiantes() {
      this.loading = true;
      try {
        this.estudiantes = await consultarTodosFachada();
        this.$emit('notify', { message: 'Listado cargado correctamente', type: 'success' });
      } catch (error) {
        console.error(error);
        this.$emit('notify', { message: 'Error al cargar el listado', type: 'error' });
      } finally {
        this.loading = false;
      }
    },
    async abrirLink(link) {
        this.modalOpen = true;
        this.modalTitle = `Detalle: ${link.href}`; // href es el 'rel' ej: self, hijos
        this.modalLoading = true;
        this.modalError = null;
        this.modalData = null;

        try {
            const data = await consumirUrl(link.rel); // link.rel contiene la URL completa
            this.modalData = data;
        } catch (error) {
            this.modalError = "Error al cargar los datos del enlace.";
        } finally {
            this.modalLoading = false;
        }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    }
  }
}
</script>

<style scoped>
.links-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.link-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--secondary);
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  text-decoration: none;
  transition: background-color 0.2s;
}

.link-badge:hover {
  background-color: var(--primary);
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: var(--secondary);
  font-weight: bold;
}
.text-center { text-align: center; }
.text-muted { color: #999; font-style: italic; }
</style>
