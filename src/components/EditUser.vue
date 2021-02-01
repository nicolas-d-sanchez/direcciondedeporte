<template>
    
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text small v-on="on">Editar</v-btn>
      </template>
      <v-card>
        
        <v-card-title>
          <span class="headline">Datos de Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field id="Nombre" v-model="User.data().nombre" label="Nombre*" :rules="[rules.required]"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field id="Apellido" v-model="User.data().apellido" :rules="[rules.required]" label="Apellido*" persistent-hint required></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field id="Email" v-model="User.data().email" label="Email*" :rules="[rules.required,rules.email]"></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  v-model="User.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required,rules.minPassword]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="Debe contener minimo 8 caracteres"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-text-field id="Dni" v-model="User.data().dni" label="DNI*" :rules="[rules.required]" ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-select id="TipoUser"
                v-model="User.data().TipoUser" :items="['Administrador', 'Profesor']" label="Tipo Usuario*" x:rules="[rules.required]"
                ></v-select>
              </v-col> -->

            </v-row>
          </v-form>
          <small>*Todos los item son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = null">Cerrar</v-btn>      
          <v-btn color="blue darken-1" text @click="EditUser(User.id)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>

import { fb, db} from '@/components/FirebaseInit'

export default {
  props:{User: Object},
  name: "EditUser",
  data() {
    return {
      dialog: false,
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        minPassword: v => v.length >= 8 || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
        // emailMatch: () => ('The email and password you entered don\'t match'),
      }
    };
  },

  methods: {
    EditUser() {
   
      var NombreN = document.getElementById('Nombre').value;
      var ApellidoN = document.getElementById('Apellido').value;
      var EmailN = document.getElementById('Email').value;
      var DniN = document.getElementById('Dni').value;      
      var UsuariosRef = db.collection("Usuarios").doc(this.User.id);

      
      return UsuariosRef.update({
          nombre: NombreN,
          apellido: ApellidoN,
          email: EmailN,
          dni: DniN,
      })
      .then(function() {       })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error Al Modifica Usuario: ", error);
      }),

      this.dialog = false;
     }
        
    
  }
};
</script>