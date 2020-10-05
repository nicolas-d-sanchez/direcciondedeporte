<template>
  <v-container>
    <v-layout wrap>
      <v-flex md6>
        <h1>Gestion De Alumnos</h1>
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos optio,
          ducimus, perspiciatis corrupti ipsa dolor labore ad deleniti rerum
          omnis, ullam cum laboriosam nulla ipsum sunt vero enim beatae ipsam!
        </h5>
      </v-flex>

      <v-flex>
        <v-img
          src="@/assets/Teamwork.jpg"
          max-height="300"
          max-width="300"
        ></v-img>
      </v-flex>

      <v-row>
        <v-col sm="2" xl="12">
          <v-select
            v-model="filtros"
            :items="['DNI', 'Nombre', 'Apellido']"
            label="Tipo de Dato*"
          ></v-select>
        </v-col>
        <v-col sm="3" xl="12">
          <v-text-field
            type="search"
            placefolder="Buscar"
            v-model="buscar"
            label="Buscar"
          >
          </v-text-field>
        </v-col>
        <RegistroAlumnos />
      </v-row>

      <v-flex xs12>
        <v-simple-table height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Foto</th>
                <th class="text-left">LU</th>
                <th class="text-left">DNI</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Apellido</th>
                <th class="text-left">Email</th>
                <th class="text-left">Direccion</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Filtro" :key="item.id">
                <img class="preview" v-bind:src="item.data().Foto" />
                <td>{{ item.data().lu }}</td>
                <td>{{ item.data().dni }}</td>
                <td>{{ item.data().Nombre }}</td>
                <td>{{ item.data().Apellido }}</td>
                <td>{{ item.data().Email }}</td>
                <td>{{ item.data().Direccion }}</td>
                <td>
                  <EditAlumno :Alumnos="item"></EditAlumno>
                  <v-btn text small text-center @click="credencial(item)"
                    >Generar credencial</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="680" max-hight="400">
        <v-card>
          <v-card-text></v-card-text>

          <qrcode :datos="Datos"></qrcode>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"
              >Enviar por Email</v-btn
            >
            <v-btn color="green darken-1" text @click="dialog = false"
              >Aceptar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import RegistroAlumnos from "@/components/RegistroAlumno";
import { fb, db } from "@/components/FirebaseInit.js";
import qrcode from "@/components/qr-code";
import EditAlumno from "@/components/EditAlumno.vue";
export default {
  components: { RegistroAlumnos, qrcode, EditAlumno },

  data() {
    return {
      dialog: false,
      Alumnos: [],
      filtros: "",
      buscar: "",
      Datos: {
        id: "",
        Foto: "",
        LU: "",
        Nombre: "",
        Apellido: "",
        Facultad: "",
      },
    };
  },

  methods: {
    credencial(doc) {
      this.Datos.id = doc.id;
      this.Datos.Foto = doc.data().Foto;
      this.Datos.lu = doc.data().lu;
      this.Datos.Nombre = doc.data().Nombre;
      this.Datos.Apellido = doc.data().Apellido;
      this.Datos.Facultad = doc.data().Facultad;
      this.dialog = true;
    },
  },

  computed: {
    Filtro() {
      if (this.filtros === "DNI") {
        return this.Alumnos.filter((alumnos) =>
          alumnos.data().dni.includes(this.buscar)
        );
      } else if (this.filtros === "Nombre") {
        return this.Alumnos.filter((alumnos) =>
          alumnos.data().Nombre.includes(this.buscar)
        );
      } else if (this.filtros === "Apellido") {
        return this.Alumnos.filter((alumnos) =>
          alumnos.data().Apellido.includes(this.buscar)
        );
      } else {
        return this.Alumnos;
      }
    },
  },

  mounted() {
    db.collection("Alumnos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.Alumnos.push(doc);
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