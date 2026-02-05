<template>
  <div class="app-layout">
    <header class="top-navbar">
      <div class="brand">
        <h2>Matrículas-API</h2>
      </div>
      <nav class="nav-menu">
        <router-link to="/listar" class="nav-item">Listar</router-link>
        <router-link to="/buscar" class="nav-item">Buscar</router-link>
        <router-link to="/guardar" class="nav-item">Nuevo</router-link>
        <router-link to="/actualizar" class="nav-item">Actualizar (PUT)</router-link>
        <router-link to="/parcial" class="nav-item">Actualizar (PATCH)</router-link>
        <router-link to="/eliminar" class="nav-item">Eliminar</router-link>
      </nav>
    </header>
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" @notify="showNotification" />
        </transition>
      </router-view>
    </main>

    <ToastNotification ref="toast" />
  </div>
</template>

<script>
import ToastNotification from './components/ToastNotification.vue'
import { AuthorizationToken } from './client/AuthorizationToken'

export default {
  components: {
    ToastNotification
  },
  async created() {
    await AuthorizationToken.generarToken("admin", "admin");
  },
  methods: {
    showNotification({ message, type }) {
      this.$refs.toast.show(message, type);
    }
  }
}
</script>

<style>
/* Global Styles & Variables */
:root {
  --primary: #4e54c8;
  --secondary: #8f94fb;
  --success: #2ecc71;
  --danger: #e74c3c;
  --warning: #f1c40f;
  --dark: #2c3e50;
  --light: #f4f7f6;
  --white: #ffffff;
  --text: #333;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--light);
  color: var(--text);
  overflow-x: hidden;
}

/* Layout - Navbar Version */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.top-navbar {
  width: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand h2 {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s;
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-item:hover, .nav-item.router-link-active {
  background: rgba(255,255,255,0.2);
  color: white;
}

.main-content {
  flex: 1;
  padding: 3rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto; /* Centrar contenido */
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Global Component Styles */
.page-container {
  width: 100%;
}

.page-title {
  font-size: 2rem;
  color: var(--dark);
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--secondary);
  padding-bottom: 0.5rem;
  display: inline-block;
}

.card {
  background: var(--white);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--dark);
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: var(--primary);
  outline: none;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
.btn:active { transform: translateY(0); }

.btn-primary { background: var(--primary); color: white; }
.btn-success { background: var(--success); color: white; }
.btn-danger { background: var(--danger); color: white; }
.btn-warning { background: var(--warning); color: var(--dark); }

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f9fa;
  color: var(--dark);
}

.links-list {
  list-style: none;
  font-size: 0.85rem;
}

.links-list li a {
  color: var(--primary);
  text-decoration: none;
}
</style>
