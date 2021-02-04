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
        <RegistroAlumno />
        
      </v-row>

      <v-flex xs12>
        <v-simple-table height="400px">
          
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
              <tr v-for="item in alumnos" :key="item.id">
                <img class="preview" :src="item.data().foto" />
                <td>{{ item.data().lu }}</td>
                <td>{{ item.data().dni }}</td>
                <td>{{ item.data().nombre }}</td>
                <td>{{ item.data().apellido }}</td>
                <td>{{ item.data().email }}</td>
                <td>{{ item.data().direccion }}</td>
                <td>
                  <EditAlumno :Alumnos="item"></EditAlumno>
                  <v-btn text small text-center @click="credencial(item)">                    
                    Generar credencial
                  </v-btn>
                </td>
                 
              </tr>
            </tbody>
          
        </v-simple-table>
      </v-flex>
    </v-layout>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500" max-hight="400">
        <v-card>
          <qrcode :Datos="Datos"></qrcode>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>

import RegistroAlumno from "@/components/RegistroAlumno";
import { db } from "@/components/FirebaseInit.js";
import qrcode from "@/components/qr-code";
import pdf from "@/components/pdf.vue";
import EditAlumno from "@/components/EditAlumno.vue";
export default {
  components: { RegistroAlumno, qrcode, EditAlumno, pdf },

  data() {
    return {
      dialog: false,
      alumnos: [],
      filtros: "",
      buscar: "",
      Datos: {
        id: "",
        foto: "",
        lu: "",
        nombre: "",
        apellido: "",
        facultad: "",
      },
    };
  },

  methods: {
    credencial(item) {
      
      this.Datos.id = item.id;      
      this.Datos.foto = item.data().foto;
      this.Datos.lu = item.data().lu;
      this.Datos.nombre = item.data().nombre;
      this.Datos.apellido = item.data().apellido;
      this.Datos.facultad = item.data().facultad;
      this.dialog = true;
      
    },

   
  },

  computed: {
    Filtro() {
      if (this.filtros === "DNI") {
        return this.alumnos.filter((alumnos) =>
          alumnos.data().dni.includes(this.buscar)
        );
      } else if (this.filtros === "Nombre") {
        return this.alumnos.filter((alumnos) =>
          alumnos.data().nombre.includes(this.buscar)
        );
      } else if (this.filtros === "Apellido") {
        return this.alumnos.filter((alumnos) =>
          alumnos.data().apellido.includes(this.buscar)
        );
      } else {
        return this.alumnos;
      }
    },
  },

  mounted() {
    db.collection("Alumnos")
      .onSnapshot
      (querySnapshot => {
          this.alumnos = [];
          querySnapshot.forEach(doc => {
            this.alumnos.push(doc);
          })
      })
  },
};
</script>


<style scoped="">
img.preview {
  width: 50px;
  height: 50px;
}
</style>