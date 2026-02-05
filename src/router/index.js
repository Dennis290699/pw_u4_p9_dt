import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/', // Redirect root to listar
    redirect: '/listar',
    meta: {
      requiereAutorizacion: false,
      esPublico: true
    }
  },
  {
    path: '/listar',
    name: 'listar',
    component: () => import('../views/EstudianteListar.vue'),
    meta: {
      requiereAutorizacion: false,
      esPublico: true
    }
  },
  {
    path: '/buscar',
    name: 'buscar',
    component: () => import('../views/EstudianteBuscar.vue'),
    meta: {
      requiereAutorizacion: false,
      esPublico: true
    }
  },
  {
    path: '/guardar',
    name: 'guardar',
    component: () => import('../views/EstudianteGuardar.vue'),
    meta: {
      requiereAutorizacion: true,
      esPublico: false
    }
  },
  {
    path: '/actualizar',
    name: 'actualizar',
    component: () => import('../views/EstudianteActualizar.vue'),
    meta: {
      requiereAutorizacion: true,
      esPublico: false
    }
  },
  {
    path: '/parcial',
    name: 'parcial',
    component: () => import('../views/EstudianteParcial.vue'),
    meta: {
      requiereAutorizacion: true,
      esPublico: false
    }
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: () => import('../views/EstudianteEliminar.vue'),
    meta: {
      requiereAutorizacion: true,
      esPublico: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Configuración del guardian
router.beforeEach((to, from, next) => {
  const requiereAutorizacion = to.meta.requiereAutorizacion
  const esPublico = to.meta.esPublico
  const estaLogueado = localStorage.getItem('token')

  if (requiereAutorizacion && !estaLogueado) {
    console.log('No autorizado')
    next({ name: 'login' })
  } else {
    console.log('Autorizado')
    next()
  }
})

export default router
