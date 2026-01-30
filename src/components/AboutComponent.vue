<template>
  <div class="student-manager">
    <header class="header">
      <h1>Gestión de Estudiantes</h1>
      <button class="btn btn-primary" @click="showCreateForm" v-if="!showForm">
        + Nuevo Estudiante
      </button>
    </header>

    <!-- Feedback Message -->
    <div v-if="message" :class="['alert', messageType]">
      {{ message }}
    </div>

    <!-- Student Form -->
    <div v-if="showForm" class="form-container">
      <div class="card">
        <h2>{{ isEditing ? 'Editar Estudiante' : 'Nuevo Estudiante' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nombre</label>
            <input v-model="currentStudent.nombre" type="text" required placeholder="Ingrese nombre" />
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input v-model="currentStudent.apellido" type="text" required placeholder="Ingrese apellido" />
          </div>
          <div class="form-group">
            <label>Cédula</label>
            <input v-model="currentStudent.cedula" type="text" required placeholder="Ingrese cédula" :disabled="isEditing" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="currentStudent.email" type="email" required placeholder="Ingrese email" />
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="cancelForm">Cancelar</button>
            <button type="submit" class="btn btn-success">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Student List -->
    <div v-else class="list-container">
      <div v-if="loading" class="loading">Cargando estudiantes...</div>
      <div v-else-if="students.length === 0" class="empty-state">
        No hay estudiantes registrados.
      </div>
      <div v-else class="table-responsive card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cédula</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.nombre }}</td>
              <td>{{ student.apellido }}</td>
              <td>{{ student.cedula }}</td>
              <td>{{ student.email }}</td>
              <td class="actions">
                <button class="btn btn-small btn-info" @click="editStudent(student)">Editar</button>
                <button class="btn btn-small btn-danger" @click="confirmDelete(student.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  consultarTodosFachada, 
  guardarFachada, 
  actualizarFachada, 
  eliminarFachada 
} from '@/client/MatriculaClient'

export default {
  name: 'AboutComponent',
  data() {
    return {
      students: [],
      currentStudent: {
        id: null,
        nombre: '',
        apellido: '',
        cedula: '',
        email: ''
      },
      showForm: false,
      isEditing: false,
      loading: false,
      message: '',
      messageType: '', 
      tempMessageTimer: null
    }
  },
  async mounted() {
    await this.loadStudents();
  },
  methods: {
    async loadStudents() {
      this.loading = true;
      try {
        this.students = await consultarTodosFachada();
      } catch (error) {
        this.showMessage('Error al cargar estudiantes', 'error');
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    showCreateForm() {
      this.resetForm();
      this.showForm = true;
      this.isEditing = false;
    },
    cancelForm() {
      this.resetForm();
      this.showForm = false;
    },
    editStudent(student) {
      this.currentStudent = { ...student };
      this.showForm = true;
      this.isEditing = true;
    },
    resetForm() {
      this.currentStudent = { id: null, nombre: '', apellido: '', cedula: '', email: '' };
    },
    async handleSubmit() {
      try {
        if (this.isEditing) {
          await actualizarFachada(this.currentStudent.id, this.currentStudent);
          this.showMessage('Estudiante actualizado correctamente', 'success');
        } else {
          await guardarFachada(this.currentStudent);
          this.showMessage('Estudiante guardado correctamente', 'success');
        }
        this.showForm = false;
        await this.loadStudents();
      } catch (error) {
        this.showMessage('Error al guardar/actualizar', 'error');
        console.error(error);
      }
    },
    async confirmDelete(id) {
      if (confirm('¿Está seguro de eliminar este estudiante?')) {
        try {
          await eliminarFachada(id);
          this.showMessage('Estudiante eliminado', 'success');
          await this.loadStudents();
        } catch (error) {
          this.showMessage('Error al eliminar', 'error');
          console.error(error);
        }
      }
    },
    showMessage(text, type) {
      this.message = text;
      this.messageType = type === 'error' ? 'alert-danger' : 'alert-success';
      if (this.tempMessageTimer) clearTimeout(this.tempMessageTimer);
      this.tempMessageTimer = setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
/* Modern, Clean & Aesthetic Variables */
:root {
  --primary: #42b983;
  --primary-dark: #33a06f;
  --secondary: #2c3e50;
  --danger: #e74c3c;
  --info: #3498db;
  --light: #f8f9fa;
  --dark: #343a40;
  --shadow: 0 4px 6px rgba(0,0,0,0.1);
  --radius: 8px;
}

.student-manager {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

h2 {
  margin-top: 0;
  color: #42b983;
}

/* Cards */
.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid #eaeaea;
}

/* Buttons */
.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.btn-primary { background: #42b983; color: white; }
.btn-primary:hover { background: #3aa876; transform: translateY(-1px); }

.btn-secondary { background: #95a5a6; color: white; }
.btn-secondary:hover { background: #7f8c8d; }

.btn-success { background: #2ecc71; color: white; }
.btn-success:hover { background: #27ae60; }

.btn-danger { background: #e74c3c; color: white; }
.btn-danger:hover { background: #c0392b; }

.btn-info { background: #3498db; color: white; }
.btn-info:hover { background: #2980b9; }

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  margin-right: 0.5rem;
}

/* Form Styles */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  animation: slideIn 0.3s ease;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box; /* Fix for padding increasing width */
}

.form-group input:focus {
  border-color: #42b983;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Table Styles */
.list-container {
  animation: fadeIn 0.4s ease;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

tr:hover {
  background-color: #fcfcfc;
}

.actions {
  white-space: nowrap;
}

/* Alerts */
.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
}
.alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.alert-danger { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

/* Utilities */
.loading, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

