<template>
  <div v-if="visible" :class="['toast', type]">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      type: 'info', // info, success, error
      timeout: null
    }
  },
  methods: {
    show(msg, type = 'info', duration = 3000) {
      this.message = msg;
      this.type = type;
      this.visible = true;
      
      if (this.timeout) clearTimeout(this.timeout);
      
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.info { background-color: #3498db; }
.success { background-color: #2ecc71; }
.error { background-color: #e74c3c; }

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>
