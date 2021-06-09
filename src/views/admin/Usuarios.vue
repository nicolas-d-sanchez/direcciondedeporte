<template>
  <v-container>
    <v-layout wrap>
      <v-flex md6>
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
        <v-col sm="3" xl="3">
          <v-text-field
            type="search"
            placefolder="Buscar"
            v-model="buscar"
            label="Buscar"
          >
          </v-text-field>
        </v-col> <v-col>
        <v-dialog v-model="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text  v-bind="attrs" v-on="on">
              Alta Usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Registro de Usuario</span>
              
            </v-card-title>
            <v-divider></v-divider>
            <RegistroUser/>            
          </v-card>
        </v-dialog>
      </v-col>
      </v-row>

      <v-simple-table height="400px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Foto</th>
              <th class="text-left">Legajo</th>
              <th class="text-left">DNI</th>
              <th class="text-left">Nombre</th>
              <th class="text-left">Apellido</th>
              <th class="text-left">Email</th>
              <th class="text-left">Direccion</th>
              <th class="text-left">Tipo Usuario</th>
              <th class="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Filtro" :key="item.id">
              <img class="preview" :src="item.data().foto" />
              <td>{{ item.data().legajo }}</td>
              <td>{{ item.data().dni }}</td>
              <td>{{ item.data().nombre }}</td>
              <td>{{ item.data().apellido }}</td>
              <td>{{ item.data().email }}</td>
              <td>{{ item.data().direccion }}</td>
              <td>{{ item.data().tipoUsuario }}</td>
              <td>
                
              <v-menu offset-y absolute>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small text v-bind="attrs" v-on="on">
                    Acciones
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item>
                    <EditUser
                      block
                      :User="item.data()"
                      :id="item.id"
                    ></EditUser>
                  </v-list-item>                 
                  <v-list-item v-if="item.data().tipoUsuario == 'Sin Definir'">
                    <v-btn text small block @click="AltaAdmin(item)">Alta Administrativo</v-btn>
                  </v-list-item>
                  <v-list-item v-if="item.data().tipoUsuario == 'Administrativo'">
                    <v-btn text small block @click="BajaAdmin(item)">Baja Administrativo</v-btn>
                  </v-list-item>
                  <v-list-item v-if="item.data().tipoUsuario == 'Sin Definir'">
                    <v-btn text small block @click="AltaProfesor(item)">Alta Profesor</v-btn>
                  </v-list-item>
                  <v-list-item v-if="item.data().tipoUsuario == 'Profesor'">
                    <v-btn text small block @click="BajaProfesor(item)">Baja Profesor</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>

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
import { db } from "@/components/FirebaseInit.js";

export default {
  name: "Usuarios",
  components: { RegistroUser, EditUser },

  data() {
    return {
      dialog: false,
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

  

    AltaAdmin(item) {
      this.$fire({
        title: "Estas seguro?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#007600',
        confirmButtonText: 'Si, Estoy seguro!',
        cancelButtonText: "No, Cancelar!"
      }).then(r => {          
           if (r.value == true){
            var UsuariosRef = db.collection("Usuarios").doc(item.id);

             db.collection("Admins").doc(item.id).set({
                name: item.data().nombre,
              }).then(
                function() {
                   UsuariosRef.update({
                    estado: true,
                    tipoUsuario: "Administrativo",
                  })
                }
            ).catch(function(error) {
              alert("Error en el alta de Administrativo: ", error);
            }); 
            
          }
        })
    },

    BajaAdmin(item) {
      this.$fire({
        title: "Estas seguro?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#007600',
        confirmButtonText: 'Si, Estoy seguro!',
        cancelButtonText: "No, Cancelar!"
      }).then(r => {          
           if (r.value == true){
            var UsuariosRef = db.collection("Usuarios").doc(item.id);

            db.collection("Admins").doc(item.id).delete()
              .then(function() {
              UsuariosRef.update({
              estado: false,
              tipoUsuario: "Sin Definir",
            })
            })       
            .catch(function(error) {
              alert("Error al dar de baja Administrativo: ", error);
            }); 
          }
        })
    },

    AltaProfesor(item) {
      this.$fire({
        title: "Estas seguro?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#007600',
        confirmButtonText: 'Si, Estoy seguro!',
        cancelButtonText: "No, Cancelar!"
      }).then(r => {          
           if (r.value == true){
            var UsuariosRef = db.collection("Usuarios").doc(item.id);

             db.collection("Profesores").doc(item.id).set({
                name: item.data().nombre,
              }).then(
                function() {
                   UsuariosRef.update({
                    estado: true,
                    tipoUsuario: "Profesor",
                  })
                }
            ).catch(function(error) {
              alert("Error en el alta de Profesor: ", error);
            }); 
            
          }
        })
    },

    BajaProfesor(item) {
      this.$fire({
        title: "Estas seguro?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#007600',
        confirmButtonText: 'Si, Estoy seguro!',
        cancelButtonText: "No, Cancelar!"
      }).then(r => {          
           if (r.value == true){
            var UsuariosRef = db.collection("Usuarios").doc(item.id);

            db.collection("Profesores").doc(item.id).delete()
              .then(function() {
              UsuariosRef.update({
              estado: false,
              tipoUsuario: "Sin Definir",
            })
            })       
            .catch(function(error) {
              alert("Error al dar de baja Profesor: ", error);
            }); 
          }
        })
    } 
  },

  computed: {
    Filtro() {
      return this.usuarios.filter((usuarios) => {
        return (       
          usuarios.data().dni.includes(this.buscar) ||
          usuarios.data().nombre.includes(this.buscar) ||
          usuarios.data().apellido.includes(this.buscar) || 
          usuarios.data().email.includes(this.buscar)
        );
      });
    },
  },

  mounted() {
    let ref = db.collection("Usuarios")
    ref.onSnapshot((querySnapshot) => {
      this.usuarios = [];
      querySnapshot.forEach((doc) => {
        this.usuarios.push(doc);
      });
    });
  },
};
</script>
<style scoped="">
img.preview {
  width: 50px;
  height: 50px;
}
</style>
