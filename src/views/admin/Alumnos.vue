<template>
  <v-container>
    <v-layout wrap>
      <v-flex md6>
        <h1>Gestion De Alumnos</h1>
        <h5>
          Sección dedicada al control de los ALUMNOS. En la misma podrá permitir dar el alta a los alumnos después que se hayan registrado y 
          completado los requisitos para hacer uso del gimnasio. Antes de dar el alta debe asignar un turno y 
          cambiar la foto por la que corresponda. En caso de ser necesario podrá editar los datos o dar de baja. 
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
      <v-col xs="12" sm="3" xl="3" >
        <v-text-field
          type="search"
          placefolder="Buscar"
          v-model="buscar"
          label="Buscar"
        >
        </v-text-field>      
      </v-col>
        </v-row>
        
      <v-row align="right">
       <v-spacer></v-spacer>
      <v-col xs="12" sm="3" xl="1">
        <v-btn  color="grey lighten-5" small block @click="exportExcel()">Exportar a Excel</v-btn>
        
        <!-- <v-dialog v-model="dialog2" width="600px">
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
        </v-dialog> -->
      </v-col>
      <v-col  xs="12" sm="3" xl="1">
        <v-btn  color="red" small block @click="BajaTotal()">bajatotal</v-btn>
      </v-col>
    </v-row>

    <v-flex xs12>
      <v-simple-table height="400px">
        <thead>
          <tr>
            <th class="text-left">Estado</th>
            <th class="text-left">Foto</th>
            <th class="text-left">Libreta</th>
            <th class="text-left">DNI</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Apellido</th>
            <th class="text-left">Email</th>
            <th class="text-left">Facultad</th>
            <th class="text-left">Turno</th>
            
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Filtro" :key="item.id">
            <td>
                  <v-icon :color="(item.data().estado) ? 'green' : 'red'">mdi-circle</v-icon>
              </td>
            <img class="preview" :src="item.data().foto" />
            <td>{{ item.data().libreta }}</td>
            <td>{{ item.data().dni }}</td>
            <td>{{ item.data().nombre }}</td>
            <td>{{ item.data().apellido }}</td>
            <td>{{ item.data().email }}</td>
            <td>{{ item.data().facultad }}</td>
            <td>{{ item.data().turno }}</td>
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
                  <v-list-item >
                    <!-- <v-btn text small block @click="foto = true">Cargar Foto</v-btn> -->
                    <upload-image :id="item.id"></upload-image>
                  </v-list-item>
                  <v-list-item v-if="!item.data().estado">
                    <v-btn text small block @click="Alta(item)">Alta Alumno</v-btn>
                  </v-list-item>
                  <v-list-item v-if="item.data().estado">
                    <v-btn text small block @click="Baja(item)">Baja Alumno</v-btn>
                  </v-list-item>
                  <v-list-item >
                    <turno :item="item"></turno>
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

import XLSX from 'xlsx';
import RegistroAlumno from "@/components/RegistroAlumno";
import { fb, db } from "@/components/FirebaseInit.js";
import qrcode from "@/components/qr-code";
import pdf from "@/components/pdf.vue";
import EditAlumno from "@/components/EditAlumno.vue";
import Turno from "@/components/Turno";
import UploadImage from '@/components/UploadImage.vue';



export default {
  components: { RegistroAlumno, qrcode, EditAlumno, pdf ,Turno, UploadImage, },

  data() {
    return {
      foto:false,
      dialog: false,
      dialog2: false,
      alumnos: [],facu: [],
      buscar: "",
      Datos: {
        id: "",
        foto: "",
        libreta: "",
        nombre: "",
        apellido: "",
        facultad: "",
        estado:""
      },
    };
  },

  methods: {
    cargarFoto(){
      this.foto = true
    }, 

    async leer(){
     let ref =  await db.collection("Alumnos")
     ref.onSnapshot((querySnapshot) => {      
      this.alumnos = [];
      querySnapshot.forEach((doc) => {        
    
        this.alumnos.push(doc)
        this.facu.push(doc.data().facultad)
            
      });
    })
    },

    
    exportExcel() {
            let tableData = [
                ['Libreta', 'DNI', 'Nombre', 'Apellido','Email','Direccion', 'Genero', 'Facultad', 'Turno', 'Estado']
            ] 
            this.alumnos.forEach (item => {
                let rowData = []
                let estado = ''
                if (item.data().estado){
                  estado = 'Activo'
                }else estado = 'No Activo'


                rowData = [
                    item.data().libreta,
                    item.data().dni,
                    item.data().nombre,
                    item.data().apellido,
                    item.data().email,
                    item.data().direccion,
                    item.data().sexo,
                    item.data().facultad,
                    item.data().turno,
                    estado
                ]
                tableData.push(rowData)
            })
            let date = new Date()
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            let ws = XLSX.utils.aoa_to_sheet(tableData)
            let wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'data') // Workbook name
            XLSX.writeFile(wb, 'DatosAlumnos-'+ day + '-' + month + '-' + year + '.xlsx') // Saved file name
    },

    credencial(item) {
      this.Datos.id = item.id;
      this.Datos.foto = item.data().foto;
      this.Datos.libreta = item.data().libreta;
      this.Datos.nombre = item.data().nombre;
      this.Datos.apellido = item.data().apellido;
      this.Datos.facultad = item.data().facultad;
      this.Datos.turno = item.data().turno;
      this.dialog = true;
    },

    Alta(item){     
       
      var today = fb.serverTimestamp

       this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#007600',
          confirmButtonText: 'Si, Estoy seguro!',
          cancelButtonText: "No, Cancelar!"
        }).then(r => {          
           if (r.value == true){
            if (item.data().turno == null){
                this.$alert("debe asignar un turno primero")
            }else{
                var AlumnosRef = db.collection("Alumnos").doc(item.id);
              AlumnosRef.update({
              estado: true,
              fechaAlta: today
              })
              .then(() => this.$mount((this.dialog = false)))
              .catch(function(error) {
              this.$alert("Error Al Modifica Alumnos: ", error);
              });
            }
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

       

    Contar(datosAlumno){
      console.log(datosAlumno);
      if(!Array.isArray(datosAlumno)){
        throw TypeError('el argumento no es un array')
      }
       let result = datosAlumno.reduce((a, d) => (a [d] ? a[d] +=1 : a[d] = 1 , a), {});
       console.log(result);
    },

    activos(){
      this.buscar = true
    },

    BajaTotal(){   
      this.$fire({
          title: "Esta a punto de dar de baja a todos los alumnos esta seguro ?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si, Estoy seguro!',
          cancelButtonText: "No, Cancelar!",        
   
        }).then(r => {  
            if (r.value == true){
                this.$fire({
                title: "Realmente esta seguro?",
                type: "question",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Si, Estoy seguro!',
                cancelButtonText: "No, Cancelar!",        
        
              }).then(r => { 
                if (r.value == true){
                      const collection = db.collection("Alumnos")
                      collection.where('estado', '==', true).get().then(response => {
                          let batch = fb.firestore().batch()
                          response.docs.forEach((doc) => {
                              const docRef = fb.firestore().collection("Alumnos").doc(doc.id)
                              batch.update(docRef,
                                      {
                                  estado: false,
                                  }
                              )
                          })
                          batch.commit().then(() => {
                              this.$alert ('Se dieron de baja todos los alumnos')
                          })
                        })

                }
                        });
          }


      });
    }

  },

    computed: {

    Filtro() {
      return this.alumnos.filter((alumnos) => {
        return (
          alumnos.data().libreta.includes(this.buscar) ||         
          alumnos.data().dni.includes(this.buscar) ||
          alumnos.data().nombre.includes(this.buscar) ||
          alumnos.data().apellido.includes(this.buscar) ||
          alumnos.data().email.includes(this.buscar) 
        );
      });
    },

  },

  mounted() {
    this.leer();
  },

};
</script>

<style scoped="">
img.preview {
  width: 50px;
  height: 50px;
}
</style>
