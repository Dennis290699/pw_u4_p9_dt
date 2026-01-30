<template>
  <div class="page-container">
    <div class="card">
      <h1 class="page-title">Buscar Estudiante</h1>
      
      <form @submit.prevent="buscar" class="search-form">
        <div class="form-group search-group">
          <label for="searchId">ID del Estudiante:</label>
          <div class="input-wrapper">
             <input type="number" id="searchId" v-model="id" required placeholder="Ingrese ID..." />
             <button type="submit" class="btn btn-primary">Buscar</button>
          </div>
        </div>
      </form>

      <div v-if="estudiante" class="result-card">
        <h3>Resultados:</h3>
        <div class="detail-grid">
            <div class="detail-item"><strong>ID:</strong> {{ estudiante.id }}</div>
            <div class="detail-item"><strong>Nombre:</strong> {{ estudiante.nombre }}</div>
            <div class="detail-item"><strong>Apellido:</strong> {{ estudiante.apellido }}</div>
            <div class="detail-item"><strong>Género:</strong> {{ estudiante.genero }}</div>
            <div class="detail-item"><strong>Fecha Nacimiento:</strong> {{ formatDate(estudiante.fechaNacimiento) }}</div>
            <div class="detail-item"><strong>Provincia:</strong> {{ estudiante.provincia }}</div>
        </div>
        
        <div v-if="estudiante.links" class="links-section">
            <h4>Enlaces HATEOAS:</h4>
            <ul class="links-list">
                <li v-for="(link, index) in estudiante.links" :key="index" style="margin-bottom: 0.5rem;">
                    <span class="link-label" style="font-weight: bold; margin-right: 0.5rem;">{{ link.href }}:</span> 
                    <a href="#" @click.prevent="abrirLink(link)" style="color: var(--primary); text-decoration: underline;">
                        Ver Detalle
                    </a>
                </li>
            </ul>
        </div>
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
import { consultarPorIdFachada, consumirUrl } from '../client/MatriculaClient'
import DataModal from '../components/DataModal.vue'

export default {
  components: {
    DataModal
  },
  data() {
    return {
      id: '',
      estudiante: null,
      // Modal state
      modalOpen: false,
      modalTitle: '',
      modalData: null,
      modalLoading: false,
      modalError: null
    }
  },
  methods: {
    async buscar() {
      if (!this.id) return;
      
      try {
        this.estudiante = null;
        const data = await consultarPorIdFachada(this.id);
        if (data) {
            this.estudiante = data;
            this.$emit('notify', { message: 'Estudiante encontrado', type: 'success' });
        } else {
            this.$emit('notify', { message: 'Estudiante no encontrado', type: 'warning' });
        }
      } catch (error) {
        console.error(error);
        this.$emit('notify', { message: error.message || 'Error al buscar estudiante', type: 'error' });
      }
    },
    async abrirLink(link) {
        this.modalOpen = true;
        this.modalTitle = `Detalle: ${link.href}`;
        this.modalLoading = true;
        this.modalError = null;
        this.modalData = null;

        try {
            const data = await consumirUrl(link.rel);
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
.search-group {
    max-width: 400px;
}
.input-wrapper {
    display: flex;
    gap: 10px;
}
.result-card {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    animation: fadeIn 0.5s;
}
.detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}
.detail-item {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 6px;
}
.links-section {
    margin-top: 1.5rem;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
