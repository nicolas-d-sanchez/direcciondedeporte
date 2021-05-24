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
    </v-layout>

    <v-row>
      <v-col sm="3" xl="3">
        <v-text-field
          type="search"
          placefolder="Buscar"
          v-model="buscar"
          label="Buscar"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-dialog v-model="dialog2" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text  v-bind="attrs" v-on="on">
              Alta Alumno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Registro de Alumno</span>              
            </v-card-title>
            <v-divider></v-divider>
            <RegistroAlumno/>            
          </v-card>
        </v-dialog>
      </v-col>
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
            
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Filtro" :key="item.id">
            <img class="preview" :src="item.data().foto" />
            <td>{{ item.data().l }}</td>
            <td>{{ item.data().dni }}</td>
            <td>{{ item.data().nombre }}</td>
            <td>{{ item.data().apellido }}</td>
            <td>{{ item.data().email }}</td>
            <td>{{ item.data().direccion }}</td>
            
            <td>
              <v-menu offset-y absolute>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small text v-bind="attrs" v-on="on">
                    Acciones
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item>
                    <editAlumno
                      block
                      :Alumno="item.data()"
                      :id="item.id"
                    ></editAlumno>
                  </v-list-item>
                  <v-list-item>
                    <v-btn text small block @click="credencial(item)">Credencial</v-btn>
                  </v-list-item>
                  <v-list-item v-if="!item.data().estado">
                    <v-btn text small block @click="Alta(item)">Alta Alumno</v-btn>
                  </v-list-item>
                  <v-list-item v-if="item.data().estado">
                    <v-btn text small block @click="Baja(item)">Baja Alumno</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>

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
      dialog2: false,
      alumnos: [],
      buscar: "",
      Datos: {
        id: "",
        foto: "",
        l: "",
        nombre: "",
        apellido: "",
        facultad: "",
        estado:""
      },
    };
  },

  methods: {
    credencial(item) {
      this.Datos.id = item.id;
      this.Datos.foto = item.data().foto;
      this.Datos.l = item.data().l;
      this.Datos.nombre = item.data().nombre;
      this.Datos.apellido = item.data().apellido;
      this.Datos.facultad = item.data().facultad;
      this.dialog = true;
    },

    Alta(item){

       this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#007600',
          confirmButtonText: 'Si, Estoy seguro!',
          cancelButtonText: "No, Cancelar!"
        }).then(r => {          
           if (r.value == true){
            var AlumnosRef = db.collection("Alumnos").doc(item.id);
            AlumnosRef.update({
            estado: true,
            })
            .then(() => this.$mount((this.dialog = false)))
            .catch(function(error) {
            this.$alert("Error Al Modifica Alumnos: ", error);
            });
          }
        });       

    
    },

    Baja(item){
          this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si, Estoy seguro!',
          cancelButtonText: "No, Cancelar!",
         
   
        }).then(r => {          
           if (r.value == true){
             console.log(r);
              var AlumnosRef = db.collection("Alumnos").doc(item.id);
            AlumnosRef.update({
            estado: false,
            })
            .then(() => this.$mount((this.dialog = false)))
            .catch(function(error) {
            this.$alert("Error Al Modifica Alumnos: ", error);
            });
          }
        });
      
    },

  },

    computed: {

    Filtro() {      
      return this.alumnos.filter((alumnos) => {
        return (
          alumnos.data().dni.includes(this.buscar) ||
          alumnos.data().nombre.includes(this.buscar) ||
          alumnos.data().apellido.includes(this.buscar) ||
          alumnos.data().estado.includes(this.buscar) ||
          alumnos.data().email.includes(this.buscar) 
        );
      });
    },

  },

  mounted() {
    db.collection("Alumnos").onSnapshot((querySnapshot) => {      
      this.alumnos = [];
      querySnapshot.forEach((doc) => {      
        this.alumnos.push(doc);
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
