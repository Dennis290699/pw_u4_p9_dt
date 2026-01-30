import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/', // Redirect root to listar
    redirect: '/listar'
  },
  {
    path: '/listar',
    name: 'listar',
    component: () => import('../views/EstudianteListar.vue')
  },
  {
    path: '/buscar',
    name: 'buscar',
    component: () => import('../views/EstudianteBuscar.vue')
  },
  {
    path: '/guardar',
    name: 'guardar',
    component: () => import('../views/EstudianteGuardar.vue')
  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import('../views/EstudianteActualizar.vue')
  },
  {
    path: '/parcial',
    name: 'parcial',
    component: () => import('../views/EstudianteParcial.vue')
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: () => import('../views/EstudianteEliminar.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
