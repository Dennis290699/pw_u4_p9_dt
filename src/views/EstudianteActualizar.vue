<template>
  <div class="page-container">
    <div class="card">
      <h1 class="page-title">Actualizar Estudiante (PUT)</h1>
      
      <div class="search-section">
          <label>Buscar por ID para cargar:</label>
          <div class="input-wrapper" style="display:flex; gap:10px; margin-bottom: 2rem;">
              <input type="number" v-model="searchId" placeholder="ID..." />
              <button type="button" class="btn btn-warning" @click="cargar">Cargar</button>
          </div>
      </div>

      <form v-if="estudiante.id" @submit.prevent="actualizar">
        <div class="form-group">
            <label>Nombre:</label>
            <input v-model="estudiante.nombre" required />
        </div>
        
        <div class="form-group">
            <label>Apellido:</label>
            <input v-model="estudiante.apellido" required />
        </div>
        
        <div class="form-group">
            <label>Género:</label>
            <input v-model="estudiante.genero" required />
        </div>
        
        <div class="form-group">
            <label>Fecha de Nacimiento:</label>
            <input type="date" v-model="fechaNacimientoBinding" />
        </div>
        
        <div class="form-group">
            <label>Provincia:</label>
            <input v-model="estudiante.provincia" />
        </div>
        
        <button type="submit" class="btn btn-primary">Actualizar Todo</button>
      </form>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, actualizarFachada } from '../client/MatriculaClient'

export default {
  data() {
    return {
      searchId: '',
      estudiante: {}
    }
  },
  computed: {
    // Computada para manejar el formato de fecha del input date (YYYY-MM-DD)
    fechaNacimientoBinding: {
        get() {
            if (!this.estudiante.fechaNacimiento) return '';
            // Si viene con hora, cortamos
            return this.estudiante.fechaNacimiento.split('T')[0];
        },
        set(val) {
            this.estudiante.fechaNacimiento = val;
        }
    }
  },
  methods: {
    async cargar() {
        if (!this.searchId) return;
        try {
            const data = await consultarPorIdFachada(this.searchId);
            if (data) {
                this.estudiante = data;
                this.$emit('notify', { message: 'Datos cargados', type: 'info' });
            } else {
                this.$emit('notify', { message: 'No encontrado', type: 'warning' });
            }
        } catch (e) {
            this.$emit('notify', { message: 'Error al cargar', type: 'error' });
        }
    },
    async actualizar() {
      try {
        await actualizarFachada(this.estudiante.id, this.estudiante);
        this.$emit('notify', { message: 'Estudiante actualizado completamente', type: 'success' });
      } catch (error) {
        this.$emit('notify', { message: 'Error al actualizar', type: 'error' });
      }
    }
  }
}
</script>
