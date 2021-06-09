<template>
  <v-container>
    <v-dialog v-model="dialog"  max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text small block v-on="on">Editar</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Datos de Alumnos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  id="Nombre"
                  v-model="Alumno.nombre"
                  label="Nombre*"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  id="Apellido"
                  v-model="Alumno.apellido"
                  :rules="[rules.required]"
                  label="Apellido*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-row> </v-row>
              <v-col cols="12">
                <v-text-field
                  id="Email"
                  v-model="Alumno.email"
                  label="Email*"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="12" sm="6">
                <v-text-field
                  id="Dni"
                  v-model="Alumno.dni"
                  label="DNI*"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="control"
                  id="Libreta"
                  v-model="Alumno.l"
                  label="LU*"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col> -->
            </v-row>
          </v-container>
          <small>*Todos los item son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cerrar</v-btn
          >
          <v-btn color="blue darken-1" text @click="EditAlumno(id)"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { fb, db } from "@/components/FirebaseInit";

export default {
  props: ["Alumno", "id"],
  name: "EditAlumnos",
  data() {
    return {
      control: null,
      dialog: false,
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        minPassword: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  created() {
    this.isAdminF();
  },

  methods: {
    async controlDni(){
      let dni = document.getElementById("Dni").value 
      console.log(dni);
      let result = await db.collection('Alumnos').where("dni", "==", dni ).get()
      .then((querySnapshot) => {
        return querySnapshot.empty;
      })
       return result;
    },

    async controlLibreta(){
      let libreta = document.getElementById("Libreta").value
      console.log(libreta);
      let result = await db.collection('Alumnos').where("libreta", "==",  libreta).get()
      .then((querySnapshot) => {
        return querySnapshot.empty;
      })
      return result;
    },

    isAdminF() {
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
    },

    EditAlumno() {
     

      var NombreN = document.getElementById("Nombre").value;
      var ApellidoN = document.getElementById("Apellido").value;
      var EmailN = document.getElementById("Email").value;

      var AlumnosRef = db.collection("Alumnos").doc(this.id);

      AlumnosRef.update({
        nombre: NombreN,
        apellido: ApellidoN,
        email: EmailN,
      })
        .then(() => this.$mount((this.dialog = false)))
        .catch(function(error) {
          console.error("Error Al Modifica Alumnos: ", error);
        });

      
    },
  },
};
</script>
