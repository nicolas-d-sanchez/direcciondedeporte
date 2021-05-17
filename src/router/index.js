import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase";

Vue.use(VueRouter)

  const Router = new VueRouter ({
    mode: 'history',
    base: process.env.BASE_URL,
      
    routes: [

      {
        path: '*',
        redirect:'/',
      },
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },

      {
        path: '/Panel',
        name: 'Panel',
        component: () => import('../views/Panel.vue'),
        meta: {
          requiresAuth: true
              },
        children:[
          {
            path: 'Alumnos',
            name: 'Alumnos',
            component: () => import('../views/admin/Alumnos.vue')
          },
          {
            path: 'Usuarios',
            name: 'Usuarios',
            component: () => import('../views/admin/Usuarios.vue')
          },
          {
            path: 'Mensajes',
            name: 'Mensajes',
            component: () => import('../views/admin/Mensajes.vue')
          },
          {
            path: 'Perfil',
            name: 'Perfil',
            component: () => import('../views/admin/Perfil.vue')
          },
        ]
      },
  
    ]

  })


export default Router;

Router.beforeEach((to, from, next)=> {
  let usuario = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !usuario) {
    alert('Debe estar registrado para acceder a esta seccion');
    next('Home')
  } else {
    next()
  }
})