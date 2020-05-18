import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import '@/components/FirebaseInit'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user =>{
  if (!app){
    new Vue({
      iconfont: 'mdi' ,// 'md' || 'mdi' || 'fa' || 'fa4'
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  
  }
})



  