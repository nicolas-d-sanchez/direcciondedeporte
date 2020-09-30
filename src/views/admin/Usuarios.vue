<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md6>
        <h1>Gestion De Usuarios</h1>
        <h5>
          amet consectetur adipisicing elit. Quos optio, ducimus,
          perspiciatis corrupti ipsa dolor labore ad deleniti rerum omnis, ullam cum laboriosam nulla
          ipsum sunt vero enim b eatae ipsam!
        </h5>
      </v-flex>
      <v-flex>
        <v-img src="@/assets/Teamwork.jpg" max-height="300" max-width="300"></v-img>
      </v-flex>
    </v-layout>

    <RegistroUser />

    <v-simple-table dark height="400px">
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
          <tr v-for="item in Usuario" :key="item.id">
            <td>{{ item.data().dni }}</td>
            <td>{{ item.data().Nombre }}</td>
            <td>{{ item.data().Apellido }}</td>
            <td>{{ item.data().Email }}</td>
            <td>{{ item.data().TipoUser }}</td>
            <td>
              <EditUser :User="item"></EditUser>
              <v-btn
                text
                small
                text-center
                v-if="item.data().Estado === ''"
                @click="AltaUser(item.id)"
              >Alta</v-btn>
              <v-btn
                text
                small
                text-center
                v-if="item.data().Estado === 'true'"
                @click="deleteUser(item.id)"
              >Baja</v-btn>
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

import { fb, db } from "@/components/FirebaseInit.js";

export default {
  name: "Usuarios",
  components: { RegistroUser, EditUser },

  data() {
    return {
      Usuario: []
    };
  },

  methods: {
    deleteUser(doc) {

      var UsuariosRef = db.collection("Usuarios").doc(doc);

      return UsuariosRef.update({
        Estado: ""
      })
        .then(function() {
          window.location.reload();
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error Al Modifica Usuario: ", error);
        });
    },

    AltaUser(doc) {

      var UsuariosRef = db.collection("Usuarios").doc(doc);

      return UsuariosRef.update({
        Estado: "true"
      })
        .then(function() {
          window.location.reload();
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error Al Modifica Usuario: ", error);
        });
    },
    
  },

  mounted() {
    db.collection("Usuarios")
      .get()
      .then(onSnapshot => {
        onSnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.Usuario.push(doc);
        });
      });
  }
};
</script>




