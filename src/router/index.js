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
            component: () => import('../views/admin/Usuarios.vue'),meta: {
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
        ]
      },
  
    ]

  })


export default Router;

function user(){

}


Router.beforeEach/((to, from, next)=> {  
  let usuario = firebase.auth().currentUser.uid;
  var docRef = db.collection("Admins").doc(usuario);
  docRef.get().then((doc) => {
    if (doc.exists) {
      next()       
    } else {
      alert('Debe estar registrado para acceder a esta seccion');
      next('Home')
    }
  })
})