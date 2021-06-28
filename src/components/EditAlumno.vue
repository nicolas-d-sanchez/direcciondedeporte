<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <template v-slot:activator="{ on }">
        <v-btn text small block v-on="on">Editar</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Datos de Alumnos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form class="formulario" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    id="Nombre"
                    v-model="Alumno.nombre"
                    :rules="textRules"
                    :counter="20"
                    label="Nombre"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    id="Apellido"
                    v-model="Alumno.apellido"
                    :rules="textRules"
                    :counter="10"
                    label="Apellido"
                    required
                  ></v-text-field>
                </v-col>
                <v-row> </v-row>
                <v-col cols="12">
                  <v-text-field
                    id="Email"
                    v-model="Alumno.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      id="direccion"
                      v-model="Alumno.direccion"
                      :rules="direccionRules"
                      label="Direccion"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      id="sexo"
                      v-model="Alumno.sexo"
                      :rules="[(v) => !!v || 'El item es requerido']"
                      :items="sexo"
                      label="Sexo"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      id="facultad"
                      v-model="Alumno.facultad"
                      :rules="[(v) => !!v || 'El item es requerido']"
                      :items="facultad"
                      label="Facultad"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      id="Dni"
                      v-model="Alumno.dni"
                      :counter="8"
                      label="DNI"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="control"
                      id="Libreta"
                      v-model="Alumno.libreta"
                      :rules="luRules"
                      :counter="5"
                      label="Libreta Universitaria"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row>
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
                          id="fechaNac"
                          :v-model="Alumno.fechaNac"
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
                </v-row> -->
              </v-row>
            </v-form>
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
          (v && v.length <= 30) ||
          "El nombre debe tener menos de 30 caracteres",
      ],
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
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
      activePicker: null,
      date: null,
      menu: false,
      control: null,
      dialog: false,
      show1: false,
      dniV: "",
      libretaV: "",
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
    this.guardarDni();
  },

  methods: {
    guardarDni() {
      this.dniV = this.Alumno.dni;
      this.libretaV = this.Alumno.libreta;
    },

    save(date) {
      this.$refs.menu.save(date);
      console.log(date);
      this.datosAlumnos.fechaNac = timeF.fromDate(new Date(date));
      console.log(this.datosAlumnos.fechaNac);
    },

    async controlDni() {
      if (this.dniV != this.Alumno.dni) {
        let dni = this.Alumno.dni;

        let result = await db
          .collection("Alumnos")
          .where("dni", "==", dni)
          .get()
          .then((querySnapshot) => {
            return querySnapshot.empty;
          });
        return result;
      } else {
        return true;
      }
    },

    async controlLibreta() {
      if (this.libretaV != this.Alumno.libreta) {
        let libreta = this.Alumno.libreta;

        let result = await db
          .collection("Alumnos")
          .where("libreta", "==", libreta)
          .get()
          .then((querySnapshot) => {
            return querySnapshot.empty;
          });
        return result;
      } else {
        return true;
      }
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

    async EditAlumno() {
      if (this.$refs.form.validate()) {
        let resultDni = await this.controlDni();
        let resultLibreta = await this.controlLibreta();

        this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#007600",
          confirmButtonText: "Si, Estoy seguro!",
          cancelButtonText: "No, Cancelar!",
        }).then((r) => {
          if (resultDni && resultLibreta) {
            var NombreN = this.Alumno.nombre;
            var ApellidoN = this.Alumno.apellido;
            var EmailN = this.Alumno.email;
            var direccion = this.Alumno.direccion;
            var sexo = this.Alumno.sexo;
            var facultad = this.Alumno.facultad;
            var libreta = this.Alumno.libreta;
            var dni = this.Alumno.dni;

            
            var AlumnosRef = db.collection("Alumnos").doc(this.id);

            AlumnosRef.update({
              nombre: NombreN,
              apellido: ApellidoN,
              email: EmailN,
              direccion: direccion,
              sexo: sexo,
              facultad: facultad,
              libreta: libreta,
              dni: dni,
            })
              .then(() => this.$mount((this.dialog = false)))
              .catch(function(error) {
                console.error("Error Al Modifica Alumnos: ", error);
              });
          } else {
            this.$alert("Verificar datos - Dni o Libreta existente");
          }
        });
      }
    },
  },
};
</script>
