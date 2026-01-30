<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div v-if="loading" class="loading">Cargando datos...</div>
        
        <div v-else-if="error" class="error-msg">{{ error }}</div>
        
        <div v-else>
            <!-- Si es Array (ej: hijos) -->
            <div v-if="Array.isArray(data) && data.length > 0">
                <table class="modal-table">
                    <thead>
                        <tr>
                            <th v-for="(key) in Object.keys(data[0])" :key="key">{{ formatKey(key) }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in data" :key="idx">
                            <td v-for="(val, key) in item" :key="key">{{ formatVal(val) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Si es Objeto (ej: self) -->
            <div v-else-if="data && typeof data === 'object' && !Array.isArray(data)">
                <div class="detail-grid">
                    <div v-for="(val, key) in data" :key="key" class="detail-row">
                        <span class="label">{{ formatKey(key) }}:</span>
                        <span class="value">{{ formatVal(val) }}</span>
                    </div>
                </div>
            </div>

            <div v-else class="empty-state">
                No hay datos para mostrar o formato no reconocido.
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="close">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    title: String,
    data: [Object, Array],
    loading: Boolean,
    error: String
  },
  methods: {
    close() {
      this.$emit('close');
    },
    formatKey(key) {
      if(key === 'links') return 'Enlaces';
      // Capitalize first letter
      return key.charAt(0).toUpperCase() + key.slice(1);
    },
    formatVal(val) {
        if(val === null || val === undefined) return 'N/A';
        if (typeof val === 'object') {
            if(Array.isArray(val)) return '[Lista]';
             return JSON.stringify(val); // Fallback simple para objetos anidados
        }
        return val;
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  animation: modalIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: white;
  border-radius: 12px 12px 0 0;
}

.modal-header h3 {
    margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 1rem 2rem;
  border-top: 1px solid #eee;
  text-align: right;
  background: #f9f9f9;
  border-radius: 0 0 12px 12px;
}

.modal-table {
    width: 100%;
    border-collapse: collapse;
}

.modal-table th, .modal-table td {
    border: 1px solid #eee;
    padding: 0.8rem;
    text-align: left;
}

.modal-table th {
    background: #f4f6f8;
    color: var(--dark);
    font-weight: 600;
}

.detail-grid {
    display: grid;
    gap: 1rem;
}

.detail-row {
    display: flex;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
}

.label {
    font-weight: 600;
    width: 150px;
    color: var(--primary);
}

.value {
    color: var(--text);
    flex: 1;
}

.btn-secondary {
    background: #95a5a6;
    color: white;
}

@keyframes modalIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
