<template>
  <div class="page-container">
    <div class="card">
      <h1 class="page-title">Nuevo Estudiante</h1>
      
      <form @submit.prevent="guardar">
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
            <input type="date" v-model="estudiante.fechaNacimiento" />
        </div>
        
        <div class="form-group">
            <label>Provincia:</label>
            <input v-model="estudiante.provincia" />
        </div>
        
        <button type="submit" class="btn btn-primary">Guardar Estudiante</button>
      </form>
    </div>
  </div>
</template>

<script>
import { guardarFachada } from '../client/MatriculaClient'

export default {
  data() {
    return {
      estudiante: {
        nombre: '',
        apellido: '',
        cedula: '',
        fechaNacimiento: null,
        provincia: ''
      }
    }
  },
  methods: {
    async guardar() {
      try {
        // Aseguramos formato correcto de fecha: YYYY-MM-DD + T00:00:00
        const payload = { ...this.estudiante };
        if (payload.fechaNacimiento) {
             // Si el input date tiene valor, le intentamos pegar la hora para que sea LocalDateTime compatible
             payload.fechaNacimiento = payload.fechaNacimiento + 'T00:00:00';
        }
        
        await guardarFachada(payload);
        this.$emit('notify', { message: 'Estudiante guardado con éxito', type: 'success' });
        this.limpiar();
      } catch (error) {
        console.error(error);
        // Mostrar mensaje detallado del error
        this.$emit('notify', { message: error.message || 'Error al guardar estudiante', type: 'error' });
      }
    },
    limpiar() {
        this.estudiante = { nombre: '', apellido: '', cedula: '', fechaNacimiento: null, provincia: '' };
    }
  }
}
</script>
