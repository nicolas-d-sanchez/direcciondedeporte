<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text rounded v-on="on">Agregar Alumno</v-btn>
    </template>
    <v-form class="formulario" ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              type="number"
              v-model="datosAlumnos.lu"
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
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="datosAlumnos.nombre"
              :rules="textRules"
              :counter="10"
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
        <div>
          <div>
            <input type="file" @change="previewImage" accept="image/*" />
          </div>
          <div>
            <p>
              Progress: {{ uploadValue.toFixed() + "%" }}
              <progress id="progress" :value="uploadValue" max="100"></progress>
            </p>
          </div>
          <div v-if="imageData != null">
            <img class="preview" :src="picture" />
            <br />
            <button @click.prevent="onUpload">Upload</button>
          </div>
        </div>
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
  </v-dialog>
</template>

<script>
import { fb, db } from "@/components/FirebaseInit";
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
        (v && v.length <= 15 && /^[A-Z]+$/i.test(v)) ||
        "El nombre debe tener menos de 15 caracteres",
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
      lu: "",
      dni: "",
      nombre: "",
      apellido: "",
      email: "",
      direccion: "",
      sexo: null,
      facultad: null,
      estado: true,
      fechaAlta: "",
      foto: "",
    },
    imageData: null,
    picture: null,
    uploadValue: 0,

    checkbox: false,
  }),

  computed: {},

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " " + time;
        this.datosAlumnos.fechaAlta = dateTime;
        var foto = this.datosAlumnos.foto;
        if (foto === "") {
          this.datosAlumnos.foto =
            "https://firebasestorage.googleapis.com/v0/b/dirdeporteunne.appspot.com/o/Fotos%2Ficon256.png?alt=media&token=371a6ef5-1b9b-4595-8acf-a447a436d3a7";
        }
        db.collection("Alumnos")
          .add(this.datosAlumnos)
          .then(function() {
            console.log("ok");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      }
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      const storageRef = fb
        .ref("Fotos/" + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.datosAlumnos.foto = url;
            console.log(this.datosAlumnos.foto);
            this.picture = url;
          });
        }
      );
    },
    clear() {
      this.$v.$reset();
      this.datosAlumnos.nombre = "";
      this.datosAlumnos.apellido = "";
      this.datosAlumnos.email = "";
      this.datosAlumnos.selectSexo = null;
      this.datosAlumnos.selectFacultad = null;
      this.datosAlumnos.checkbox = false;
      this.datosAlumnos.dni = "";
      this.datosAlumnos.lu = "";
    },
  },
};
</script>
<style scoped>
.formulario {
  background-color: rgb(252, 246, 246);
}
</style>
