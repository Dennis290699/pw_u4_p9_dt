<template>
  <div class="page-container">
    <div class="card">
      <h1 class="page-title">Actualizar Parcial (PATCH)</h1>
      <p style="color: #666; margin-bottom: 2rem;">Modifique solo los campos que desea cambiar.</p>
      
      <div class="search-section">
          <label>ID del Estudiante:</label>
          <div class="input-wrapper" style="margin-bottom: 2rem;">
              <input type="number" v-model="id" placeholder="ID..." required />
          </div>
      </div>

      <form @submit.prevent="actualizarParcial">
        <div class="form-group">
            <label>Nombre:</label>
            <input v-model="cuerpo.nombre" placeholder="Dejar vacio para no cambiar" />
        </div>
        
        <div class="form-group">
            <label>Apellido:</label>
            <input v-model="cuerpo.apellido" placeholder="Dejar vacio para no cambiar" />
        </div>

        <div class="form-group">
            <label>Género:</label>
            <input v-model="cuerpo.genero" placeholder="Dejar vacio para no cambiar" />
        </div>

        <div class="form-group">
            <label>Fecha Nacimiento:</label>
            <input type="date" v-model="cuerpo.fechaNacimiento" placeholder="Dejar vacio para no cambiar" />
        </div>

        <div class="form-group">
            <label>Provincia:</label>
            <input v-model="cuerpo.provincia" placeholder="Dejar vacio para no cambiar" />
        </div>
        
        <button type="submit" class="btn btn-primary">Actualizar Parcialmente</button>
      </form>
    </div>
  </div>
</template>

<script>
import { actualizarParcialFachada } from '../client/MatriculaClient'

export default {
  data() {
    return {
      id: '',
      cuerpo: {
          nombre: null,
          apellido: null,
          genero: null,
          fechaNacimiento: null,
          provincia: null
      }
    }
  },
  methods: {
    async actualizarParcial() {
      if (!this.id) {
          this.$emit('notify', { message: 'Debe ingresar un ID', type: 'warning' });
          return;
      }

      // Filtrar campos vacíos para enviar solo lo que cambió
      const payload = {};
      if (this.cuerpo.nombre) payload.nombre = this.cuerpo.nombre;
      if (this.cuerpo.apellido) payload.apellido = this.cuerpo.apellido;
      if (this.cuerpo.genero) payload.genero = this.cuerpo.genero;
      if (this.cuerpo.provincia) payload.provincia = this.cuerpo.provincia;
      
      if (this.cuerpo.fechaNacimiento) {
          payload.fechaNacimiento = this.cuerpo.fechaNacimiento + 'T00:00:00';
      }

      if (Object.keys(payload).length === 0) {
          this.$emit('notify', { message: 'No hay cambios para enviar', type: 'info' });
          return;
      }

      try {
        await actualizarParcialFachada(this.id, payload);
        this.$emit('notify', { message: 'Actualización parcial exitosa', type: 'success' });
        this.cuerpo = { nombre: null, apellido: null, genero: null, fechaNacimiento: null, provincia: null };
      } catch (error) {
        this.$emit('notify', { message: 'Error al actualizar', type: 'error' });
      }
    }
  }
}
</script>
