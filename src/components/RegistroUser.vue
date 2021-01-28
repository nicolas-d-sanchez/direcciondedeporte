<template>
  <v-row  justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text rounded v-on="on">Agregar Usuario</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Datos de Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="User.Nombre" label="Nombre*" :rules="[rules.required]"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="User.Apellido"
                  :rules="[rules.required]"
                  label="Apellido*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="User.Email"
                  label="Email*"
                  :rules="[rules.required,rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
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
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="User.dni"
                  label="DNI*"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="User.TipoUser"
                  :items="['Administrador', 'Profesor']"
                  label="Tipo Usuario*"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>

            </v-row>
          </v-container>
          <small>*Todos los item son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="Limpiar">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="addData">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fb, db } from '@/components/FirebaseInit.js'
import { firestore } from 'firebase';
import firebase from 'firebase';

export default {
  
  
  name: "RegistoUser",
  data() {
    return {
      dialog: false,
      show1: false,
      
      User: {    
        dni:"",    
        Nombre: "",
        Apellido: "",
        Email: "",
        password: "",
        TipoUser: "",
        Estado:"",
        
      },

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
  firestore(){
    return{
      usuarios: db.collection('Usuarios'),
    }
  },
  methods: {
  
    addData() {
            // Aca no le estoy pasando los parametros como strings para q cree el usuario en authentication, a parte para el login
            //dps hay que validar q sea Administrador del firestore (para la pag) y Profesor para la App.
      firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
      db.collection("Usuarios").add(
        this.User
        )
        .then(function() {
          
          window.location.reload();
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      
        this.dialog = false;        

    },
    Limpiar() {
        this.dialog = false;
    }
  }
};
</script>