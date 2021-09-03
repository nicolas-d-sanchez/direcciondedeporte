<template>
  <v-container v-resize="onResize">
    <v-app-bar app color="white" height="70" flat>
      <v-avatar class="mr-3" color="grey lighten-5" size="70">
        <v-img contain max-height="100%" src="@/assets/logo.png"></v-img>
      </v-avatar>

      <v-toolbar-title
        class="font-weight-black headline"
        v-show="windowSize.x > 650"
        >Direccion de Deportes UNNE
      </v-toolbar-title>

      <v-toolbar-title
        class="font-weight-black headline"
        v-show="windowSize.x < 650"
        >UNNE</v-toolbar-title
      >

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app permanent expand-on-hover>
      <v-list>
        <v-list-item class="ml-auto">
          <v-list-item-avatar>
            <v-img :src="this.user.foto"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"
              >Tipo de Usuario:
            </v-list-item-title>

            <v-list-item-subtitle>{{
              this.user.tipoUsuario
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{
              this.user.userName
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              this.user.userEmail
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

        <v-list nav dense >
        <v-list-item v-for="item in all" :key="item.text" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list nav dense v-if="this.control">
        <v-list-item v-for="item in items" :key="item.text" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block text @click="CerrarSesion">Cerrar Sesion</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-container>
</template>

<script>
import { fb, db } from "@/components/FirebaseInit";
export default {
  name: "Panel",
  components: {},
  data() {
    return {
      control: null,
      user: [
        {
          userEmail: "",
          userName: "",
          foto: "",
          tipoUsuario: "",
        },
      ],
      windowSize: {
        x: 0,
        y: 0,
      },

       all: [
        { text: "Principal", icon: "mdi-home-circle", link: "/" },
        { text: "Perfil", icon: "mdi-account", link: "/Panel/Perfil" },
       
      ],

      items: [
     
        { text: "Panel Alumnos", icon: "mdi-account", link: "/Panel/Alumnos" },
        {
          text: "Panel Usuarios",
          icon: "mdi-account-edit",
          link: "/Panel/Usuarios",
        },
        {
          text: "Panel Mensajes",
          icon: "mdi-message",
          link: "/Panel/Mensajes",
        },

        {
          text: "Panel Reportes",
          icon: "mdi-domain",
          link: "/Panel/Reportes",
        },
      ],
    };
  },

  mounted() {
    this.onResize();
  },

  created() {
    this.User();
    this.admin();
  },

  methods: {
    User() {
      let usuario = fb.auth().currentUser.uid;
      let docRef = db.collection("Usuarios").doc(usuario);
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.user.tipoUsuario = doc.data().tipoUsuario;
          this.user.foto = doc.data().foto;
          this.user.userEmail = doc.data().email;
          this.user.userName = doc.data().nombre;
      
        } else {
          db.collection("Alumnos")
            .doc(usuario)
            .get()
            .then((doc) => {
              if (doc.exists) {
                this.user.tipoUsuario = doc.data().tipoUsuario;
                this.user.foto = doc.data().foto;
                this.user.userEmail = doc.data().email;
                this.user.userName = doc.data().nombre;
              }
            });
        }
      });
    },

    admin(){
          let usuario = fb.auth().currentUser.uid;
          db.collection("Admins").doc(usuario).get().then((doc) => {
            if (doc.exists) {
              this.control = true;  
            } 
          })
    },

    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    CerrarSesion() {
      fb.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$fire({
            title: "Hasta la proxima",
            type: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/");
        })
        .catch(function(error) {
          // An error happened.
        });
    },
  },
};
</script>
