<template>
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
            v-model="datosUsuario.legajo"
            :rules="leRules"
            :counter="5"
            label="Legajo"
            required
          ></v-text-field>
        </v-col>
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
        <v-col cols="12" sm="6" md="6" v-if="control">
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
</template>

<script>
import { fb, db } from "@/components/FirebaseInit.js";

export default {
  name: "RegistoUser",
  data() {
    return {
      leRules: [
        (v) => !!v || "Legajo es requerido",
        (v) =>
          (v && v.length == 5 && /^(\d+\,?)+$/i.test(v)) || "Legajo invalido",
      ],
      passwordRules: [
        (v) => !!v || "Password es requerido",
        (v) => (v && v.length >= 8) || "Debe contener mas de 8 caracteres",
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
          (v && v.length <= 30) ||
          "Este campoo debe tener menos de 30 caracteres",
      ],
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
      control: "",
      control2:"",
      dialog: false,
      show1: false,
      tipoUsuario: ["Administrativo", "Profesor"],
      checkbox: "",
      datosUsuario: {
        dni: "",
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipoUsuario: "",
        estado: false,
        direccion: "",
        legajo:"",
        foto:"",
      },
    };
  },

  created() {
    this.isAdminF();
  },

  methods: {
    isAdminF() {
      let usuario = fb.auth().currentUser;
      if (usuario == null) {
        this.control = false;
      } else if (usuario) {
        let promesa = db
          .collection("Usuarios")
          .doc(fb.auth().currentUser.uid)
          .get();
        promesa.then((snapshot) => {
          const data = snapshot.data().tipoUsuario;
          if (data == "Administrativo") {
            this.control = true;
          } else {
            this.control = false;
          }
        });
      }
    },

    async controlDni(){
      let result = await db.collection('Usuarios').where("dni", "==",  this.datosUsuario.dni).get()
      .then((querySnapshot) => {
        return querySnapshot.empty;
      })
       return result;
    },

    async controlLegajo(){
      let result = await db.collection('Usuarios').where("legajo", "==",  this.datosUsuario.legajo).get()
      .then((querySnapshot) => {
        return querySnapshot.empty;
      })
      return result;
    },

   async submit() {

    let resultDni = await this.controlDni();
    let resultLe = await this.controlLegajo();

     this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#007600',
          confirmButtonText: 'Si, Estoy seguro!',
          cancelButtonText: "No, Cancelar!"
        }).then(r => {     

    var foto = this.datosAlumnos.foto;
        if (foto === "") {
          this.datosUsuario.foto =
            "https://firebasestorage.googleapis.com/v0/b/dirdeporteunne.appspot.com/o/Fotos%2Fjacinto.jpeg?alt=media&token=8239be36-5ede-41ba-b150-3db84c052948";
    }

    if (resultDni & resultLe){
     fb.auth()
          .createUserWithEmailAndPassword(
            this.datosUsuario.email,
            this.datosUsuario.password
          )
          .then((user) => {
            db.collection("Usuarios")
              .doc(user.user.uid)
              .set(this.datosUsuario)
              .then(function() {
                alert("Usuario Creado");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          })
          .catch((err) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        })
      }else {
      alert('Ya existe un usuario con ese Dni o Legajo');
      }
      this.dialog = false;
       });  
    },

    clear() {
      this.datosUsuario.nombre = "";
      this.datosUsuario.apellido = "";
      this.datosUsuario.email = "";
      this.datosUsuario.tipoUsuario = null;
      this.datosUsuario.direcion = null;
      this.datosUsuario.checkbox = false;
      this.datosUsuario.dni = "";
      this.datosUsuario.lu = "";
    },
  },
};
</script>
<style scoped>
.formulario {
  background-color: rgb(255, 255, 255);
}
</style>
