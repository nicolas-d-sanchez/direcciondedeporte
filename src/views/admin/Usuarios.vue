<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md6>
        <h1>Gestion De Usuarios</h1>
        <h5>
          amet consectetur adipisicing elit. Quos optio, ducimus, perspiciatis
          corrupti ipsa dolor labore ad deleniti rerum omnis, ullam cum
          laboriosam nulla ipsum sunt vero enim b eatae ipsam!
        </h5>
      </v-flex>
      <v-flex>
        <v-img
          src="@/assets/Teamwork.jpg"
          max-height="300"
          max-width="300"
        ></v-img>
      </v-flex>
    </v-layout>

    <v-row>
      
      <v-col sm="3" xl="12">
        <v-text-field
          type="search"
          placefolder="Buscar"
          v-model="buscar"
          label="Buscar"
        >
        </v-text-field>
      </v-col>
      <RegistroUser />
    </v-row>

    <v-simple-table height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">DNI</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Apellido</th>
            <th class="text-left">Email</th>
            <th class="text-left">Tipo Usuario</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Filtro" :key="item.id">
            <td>{{ item.data().dni }}</td>
            <td>{{ item.data().nombre }}</td>
            <td>{{ item.data().apellido }}</td>
            <td>{{ item.data().email }}</td>
            <td>{{ item.data().tipoUsuario }}</td>
            <td>
              <EditUser :User="item"></EditUser>
              <v-btn
                text
                small
                text-center
                v-if="item.data().estado === ''"
                @click="AltaUser(item.id)"
                >Alta</v-btn
              >
              <v-btn
                text
                small
                text-center
                v-if="item.data().estado === 'true'"
                @click="deleteUser(item.id)"
                >Baja</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import RegistroUser from "@/components/RegistroUser.vue";
import EditUser from "@/components/EditUser.vue";

import {  db } from "@/components/FirebaseInit.js";

export default {
  name: "Usuarios",
  components: { RegistroUser, EditUser },

  data() {
    return {
      buscar: "",
      usuarios: [],
    };
  },

  methods: {
    deleteUser(doc) {
      var UsuariosRef = db.collection("Usuarios").doc(doc);
      return UsuariosRef.update({
        Estado: "",
      })
        .then(function() {
          // window.location.reload();
        })
        .catch(function(error) {
          console.error("Error Al Modifica Usuario: ", error);
        });
    },

    AltaUser(doc) {
      var UsuariosRef = db.collection("Usuarios").doc(doc);
      return UsuariosRef.update({
        Estado: "true",
      })
        .then(function() {
          // window.location.reload();
        })
        .catch(function(error) {
          console.error("Error Al Modifica Usuario: ", error);
        });
    },
  },

  computed: {
    Filtro() {
          return this.usuarios.filter(usuarios => {
          return usuarios.data().dni.includes(this.buscar) || 
          usuarios.data().nombre.includes(this.buscar) || 
          usuarios.data().apellido.includes(this.buscar) || 
          usuarios.data().email.includes(this.buscar)
          ;
        });      
    },
  },

  mounted() {
    db.collection("Usuarios").onSnapshot((querySnapshot) => {
      this.usuarios = [];
      querySnapshot.forEach((doc) => {
        this.usuarios.push(doc);
      });
    });
  },
};
</script>
