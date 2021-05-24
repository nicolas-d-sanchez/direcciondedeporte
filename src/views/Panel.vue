<template >
  <v-container v-resize="onResize" >
    <v-app-bar app color="white" height="70" flat>
      <v-avatar  class="mr-3" color="grey lighten-5" size="70">
        <v-img contain max-height="100%" src="@/assets/logo.png"></v-img>
      </v-avatar>

      <v-toolbar-title
        class="font-weight-black headline"
        v-show="windowSize.x>650"
      >Direccion de Deporte UNNE  </v-toolbar-title>

      <v-toolbar-title class="font-weight-black headline" v-show="windowSize.x<650">UNNE</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app permanent expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="this.user.foto"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="title">{{this.user.userName}}</v-list-item-title>
            <v-list-item-subtitle>{{this.user.userEmail}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    
            
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item to="/Panel/Perfil">          
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>
      <v-list nav dense v-if="this.control" >
        <v-list-item v-for="item in items" :key="item.text" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block text @click="CerrarSesion">Logout</v-btn>
        </div>
      </template> 
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-container>
</template>



<script>

import { fb, db } from '@/components/FirebaseInit'
export default {
  name: "Panel",
  components: {},
  data() {
    return {
      control : null,
       user: [
          {
          userEmail:"", 
          userName:"",
          foto:""
          }         
        ],
      windowSize: {
        x: 0,
        y: 0,
       
      },

      items: [
        { text: "Principal", icon: "mdi-home-circle", link: "/" },
        { text: "Panel Alumnos", icon: "mdi-account", link: "/Panel/Alumnos" },
        { text: "Panel Usuarios",icon: "mdi-account-edit", link: "/Panel/Usuarios" },
        { text: "Panel Mensajes", icon: "mdi-message", link: "/Panel/Mensajes" },
      ]
    };
  },

  mounted() {
    this.onResize();  

  },


  created() {
      this.isAdminF();
  },
 
 
  methods: {
    isAdminF(){        
      let promesa = db.collection("Usuarios").doc(fb.auth().currentUser.uid).get()     
      promesa.then(snapshot => {
      const data = snapshot.data().tipoUsuario;
      this.user.foto = snapshot.data().foto;
      this.user.userEmail = snapshot.data().email;
      this.user.userName = snapshot.data().nombre;
      if (data == "Administrativo"){
        
        this.control = true;
      }else {
        this.control =  false;
      } 
      })
    },

    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },  



    CerrarSesion() {
      fb
        .auth()
        .signOut()
        .then(()=> {
          // Sign-out successful.
          this.$fire({
                title: "Hasta la proxima",
                type: "success",
                showConfirmButton: false,
                timer: 1500
              });
          this.$router.push("/");
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
}
</script>