<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text rounded v-on="on">Agregar Alumno</v-btn>
        
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Datos de Alumno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="LU" v-model="DatosAlumnos.lu" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="DNI" v-model="DatosAlumnos.dni" type="number" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombre" v-model="DatosAlumnos.Nombre"  ></v-text-field>
              </v-col>             
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Apellido" v-model="DatosAlumnos.Apellido" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="DatosAlumnos.Email" type="email" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Direccion" v-model="DatosAlumnos.Direccion"  ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="DatosAlumnos.Sexo"
                  :items="['Masculino', 'Femenino']"
                  label="Sexo*"
                  
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="DatosAlumnos.Facultad"
                  :items="['Arquitectura y Urbanismo', 'Ciencias Económicas','Ciencias Veterinarias',
                            'Derecho Ciencias Sociales y Políticas', 'Medicina', 'Ciencias Criminalísticas y Criminología',
                            'Artes, Diseño y Ciencias de la Cultura','Ciencias Agrarias','Ciencias Exactas y Naturales y Agrimensura',
                            'Humanidades', 'Ingeniería', 'Odontología']"
                  label="Facultad*"
                  
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*Todos los item son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="AgregarAlumno">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fb, db} from '@/components/FirebaseInit'


  export default {
      name: 'RegistroAlumnos',
    data () {
      return{
        DatosAlumnos:{
        lu:"",
        dni:"",
        Nombre:"",
        Apellido:"",
        Email:"",
        Direccion:"",
        Sexo:"",
        Facultad:"",
        Estado:"",
        },
        dialog: false
    }
    },
      methods: {
    AgregarAlumno() {
      db.collection("Alumnos").add(
        this.DatosAlumnos
        )
        .then(function() {
          window.location.reload();window.location.reload();
          
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }

  }
</script>