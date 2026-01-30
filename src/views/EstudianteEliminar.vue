<template>
  <div class="page-container">
    <div class="card">
      <h1 class="page-title" style="border-color: var(--danger);">Eliminar Estudiante</h1>
      
      <div class="delete-section">
          <p class="warning-text">Esta acción no se puede deshacer.</p>
          
          <div class="form-group">
            <label>Ingrese ID del Estudiante a Eliminar:</label>
            <input type="number" v-model="id" placeholder="ID..." />
          </div>

          <button class="btn btn-danger" @click="confirmarEliminar">Eliminar Estudiante</button>
      </div>
    </div>
  </div>
</template>

<script>
import { eliminarFachada } from '../client/MatriculaClient'

export default {
  data() {
    return {
      id: ''
    }
  },
  methods: {
    async confirmarEliminar() {
        if (!this.id) {
            this.$emit('notify', { message: 'Ingrese un ID', type: 'warning' });
            return;
        }

        // Usamos window.confirm solo como última validación de seguridad client-side standard,
        // aunque el usuario pidió evitar alerts, un confirm nativo es a veces aceptable para deletes críticos.
        // Si se quiere evitar 100%, se podría implementar un modal custom, 
        // pero por simplicidad y tiempo, un confirm es seguro. 
        // Si el usuario es estricto, podríamos hacer que el botón cambie a "Confirmar?" al primer click.
        // Vamos a hacer el botón de doble confirmación para ser más "estéticos" y cero alerts.
        
        // Pero para esta implementación rápida seguiré el patrón direct. 
        // Mejor implemento lógica sin alert/confirm nativo, directo llamada con Toast resultado.
        
        try {
            await eliminarFachada(this.id);
            this.$emit('notify', { message: `Estudiante ${this.id} eliminado`, type: 'success' });
            this.id = '';
        } catch (error) {
            this.$emit('notify', { message: 'Error al eliminar (Verifique ID)', type: 'error' });
        }
    }
  }
}
</script>

<style scoped>
.warning-text {
    color: var(--danger);
    font-weight: bold;
    margin-bottom: 1rem;
}
.delete-section {
    text-align: center;
    padding: 2rem;
    border: 1px dashed var(--danger);
    border-radius: 8px;
    background: #fff5f5;
}
</style>
