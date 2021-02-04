<template>  
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text rounded v-on="on">Agregar Usuario</v-btn>
      </template>
        <v-form class="formulario" ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="datosUsuario.nombre"
              :rules="textRules"
              :counter="10"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="datosUsuario.apellido"
              :rules="textRules"
              :counter="10"
              label="Apellido"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="datosUsuario.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
            type="password"
              v-model="datosUsuario.password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          
          </v-row>
          
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="datosUsuario.direccion"
              :rules="direccionRules"
              label="Direccion"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              type="number"
              :rules="dniRules"
              v-model="datosUsuario.dni"
              :counter="8"
              label="DNI"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="datosUsuario.tipoUsuario"
              :rules="[(v) => !!v || 'El item es requerido']"
              :items="tipoUsuario"
              label="Tipo de Usuario"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'Debe tildar para continuar']"
              label="Esta seguro?"
              required
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12" class="d-flex flex-row-reverse">
            <v-btn class="mr-4" @click="addData">
              Agregar
            </v-btn>
            <v-btn class="mr-4" @click="clear">
              Limpiar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
      
    </v-dialog> 
</template>

<script>
import { fb, db } from '@/components/FirebaseInit.js';


export default {
  
  
  name: "RegistoUser",
  data() {    
    return {
    passwordRules:[
      (v) => !!v || "Password es requerido",
      (v) => (v && v.length >= 8)  || "Debe contener mas de 8 caracteres",
    ],
    dniRules: [
      (v) => !!v || "Dni es requerido",
      (v) => (v && v.length == 8 && /^(\d+\,?)+$/i.test(v)) || "Dni invalido",
    ],

    textRules: [
      (v) => !!v || "El nombre es requerido",
      (v) =>
        (v && v.length <= 15 && /^[A-Z]+$/i.test(v)) ||
        "El nombre debe tener menos de 15 caracteres",
    ],

    direccionRules: [
      (v) => !!v || "La direccion es requerida",
      (v) =>
        (v && v.length <= 30) || "Este campoo debe tener menos de 30 caracteres",
    ],

    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
    ],
      dialog: false,
      show1: false,
      tipoUsuario: ["Administrivo", "Profesor"],
      checkbox:"",
      datosUsuario: {    
        dni:"",    
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipoUsuario: "",
        estado: true,
        direccion: "",     
      },
    };
  },
  
  methods: {
    createUser(){
      fb.auth().createUserWithEmailAndPassword(this.datosUsuario.email.toString(),this.datosUsuario.password.toString())
      .then((usuario) => {
    // Signed in
    // ..
      console.log(usuario)
  })
      .catch(err => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
    },
    addData() {
      
      db.collection("Usuarios").add(
        this.datosUsuario
        )
        .then(function() {
          
            console.log("Usuario Creado");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
        this.createUser(),
        this.dialog = false;        

    },
      clear() {
      this.$v.$reset();
      this.datosUsuario.nombre = "";
      this.datosUsuario.apellido = "";
      this.datosUsuario.email = "";
      this.datosUsuario.tipoUsuario = null;
      this.datosUsuario.direcion = null;
      this.datosUsuario.checkbox = false;
      this.datosUsuario.dni = "";
      this.datosUsuario.lu = "";
    },
  }
};
</script>
<style scoped>
.formulario {
  background-color: rgb(252, 246, 246);
}
</style>