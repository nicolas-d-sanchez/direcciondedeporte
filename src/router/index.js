import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase";
import { fb, db } from "@/components/FirebaseInit";

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
        children:[
          {
            path: '/Panel/Perfil',
            name: 'Perfil',
            component: () => import('../views/usuarios/Perfil.vue')
          },
          {
            path: 'Alumnos',
            name: 'Alumnos',
            component: () => import('../views/admin/Alumnos.vue'),
            meta: {
              requiresAuth: true
                  },
          },
          {
            path: 'Usuarios',
            name: 'Usuarios',
            component: () => import('../views/admin/Usuarios.vue'),
            meta: {
              requiresAuth: true
                  },
          },
          {
            path: 'Mensajes',
            name: 'Mensajes',
            component: () => import('../views/admin/Mensajes.vue'),
            meta: {
              requiresAuth: true
                  },
          },     
          {
            path: 'Reportes',
            name: 'Reportes',
            component: () => import('../views/admin/Reportes.vue'),
            meta: {
              requiresAuth: true
                  },
          },
            
            
        ]
      },
  
    ]

  })


export default Router;



// Router.beforeEach/((to, next)=> {  
//    let usuario = firebase.auth().currentUser.uid;
//   const requiresAuth = to.matched.some(record  => record.meta.requiresAuth)

//   db.collection("Admins").doc(usuario).get().then((doc) => {
//     if (!doc.exists & requiresAuth) {
//       alert('Debe estar registrado para acceder a esta seccion');
//       next('/Home')       
//     } else {
      
//       next('/Panel')
//     }
//   })
// })

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    db.collection("Admins").doc(fb.auth().currentUser.uid).get().then((doc) => {
          if (!doc.exists) {
            alert('No tiene suficientes privilegios');
            next({
              path: '/login',
              query: {
                redirect: to.fullPath,
              },
            })
      }else{ next()}
    })
  } else {
    next();
  }
})
