<template>
  <v-form class="formulario" ref="form" lazy-validation>
    <v-container >
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="datosAlumnos.nombre"
            :rules="textRules"
            :counter="20"
            label="Nombre"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="datosAlumnos.apellido"
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
            v-model="datosAlumnos.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-text-field
            v-model="datosAlumnos.direccion"
            :rules="direccionRules"
            label="Direccion"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="datosAlumnos.sexo"
            :rules="[(v) => !!v || 'El item es requerido']"
            :items="sexo"
            label="Sexo"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="datosAlumnos.facultad"
            :rules="[(v) => !!v || 'El item es requerido']"
            :items="facultad"
            label="Facultad"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            type="number"
            v-model="datosAlumnos.libreta"
            :rules="luRules"
            :counter="5"
            label="Libreta Universitaria"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            type="number"
            :rules="dniRules"
            v-model="datosAlumnos.dni"
            :counter="8"
            label="DNI"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha de Nacimiento"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              color="grey"
              :active-picker.sync="activePicker"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12" class="d-flex flex-row-reverse">
          <v-btn class="mr-4" @click="submit">
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
import { fb, db, timeF } from "@/components/FirebaseInit";

export default {
  props: {},
  data: () => ({
    luRules: [
      (v) => !!v || "Libreta Universitaria es requerida",
      (v) =>
        (v && v.length == 5 && /^(\d+\,?)+$/i.test(v)) ||
        "Libreta Universitaria invalida",
    ],
    dniRules: [
      (v) => !!v || "Dni es requerido",
      (v) => (v && v.length == 8 && /^(\d+\,?)+$/i.test(v)) || "Dni invalido",
    ],
    textRules: [
      (v) => !!v || "El nombre es requerido",
      (v) =>
      (v && v.length <= 20 && /^[A-Za-z\s]+$/i.test(v)) ||
        "El nombre debe tener menos de 20 caracteres",
    ],
    direccionRules: [
      (v) => !!v || "El nombre es requerido",
      (v) =>
        (v && v.length <= 30) || "El nombre debe tener menos de 30 caracteres",
    ],
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
    ],
    activePicker: null,
    date: null,
    menu: false,
    dialog: false,
    sexo: ["Masculino", "Femenino"],
    facultad: [
      "Arquitectura y Urbanismo",
      "Ciencias Económicas",
      "Ciencias Veterinarias",
      "Derecho Ciencias Sociales y Políticas",
      "Medicina",
      "Ciencias Criminalísticas y Criminología",
      "Artes, Diseño y Ciencias de la Cultura",
      "Ciencias Agrarias",
      "Ciencias Exactas y Naturales y Agrimensura",
      "Humanidades",
      "Ingeniería",
      "Odontología",
    ],

    datosAlumnos: {
      libreta: "",
      dni: "",
      nombre: "",
      apellido: "",
      email: "",
      direccion: "",
      sexo: null,
      facultad: null,
      estado: false,
      foto: "",
      tipoUsuario: "Alumno",
      fechaNac: '',
    },
    imageData: null,
    picture: "",
    uploadValue: 0,
  }),

  computed: {},

  methods: {
    save(date) {
      this.$refs.menu.save(date);
      console.log(date);
      this.datosAlumnos.fechaNac = timeF.fromDate(new Date(date))
      console.log(this.datosAlumnos.fechaNac);
    },

    async controlDni() {
      let result = await db
        .collection("Alumnos")
        .where("dni", "==", this.datosAlumnos.dni)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.empty;
        });
      return result;
    },

    async controlLibreta() {
      let result = await db
        .collection("Alumnos")
        .where("libreta", "==", this.datosAlumnos.libreta)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.empty;
        });
      return result;
    },

    async submit() {
      if (this.$refs.form.validate()) {
      let resultDni = await this.controlDni();
      let resultLu = await this.controlLibreta();
      this.$fire({
        title: "Estas seguro?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#007600",
        confirmButtonText: "Si, Estoy seguro!",
        cancelButtonText: "No, Cancelar!",
      }).then((r) => {
       
          this.datosAlumnos.foto =
            "https://firebasestorage.googleapis.com/v0/b/dirdeporteunne.appspot.com/o/Fotos%2Fjacinto.jpeg?alt=media&token=8239be36-5ede-41ba-b150-3db84c052948";

          if (resultDni & resultLu) {
            fb.auth()
              .createUserWithEmailAndPassword(
                this.datosAlumnos.email,
                this.datosAlumnos.dni
              )
              .then((user) => {
                db.collection("Alumnos")
                  .doc(user.user.uid)
                  .set(this.datosAlumnos)
                  .then(function() {
                    console.log("Usuario Creado");
                  })
                  .catch(function(error) {
                    alert("Error al escribir en la base de datos");
                  })
                  .catch((err) => {
                    alert("El email ya existe");
                  });
              });
          } else {
            alert("Ya existe un alumno registrado con el Dni o Lu");
          }
        
      });
       }
    },

    clear() {
      this.datosAlumnos.nombre = "";
      this.datosAlumnos.apellido = "";
      this.datosAlumnos.email = "";
      this.datosAlumnos.selectSexo = null;
      this.datosAlumnos.selectFacultad = null;
      this.datosAlumnos.dni = "";
      this.datosAlumnos.libreta = "";
    },
  },
};
</script>

<style scoped>
.formulario {
  background-color: rgba(255, 255, 255, 0.973);
  width:680px 
}
</style>
