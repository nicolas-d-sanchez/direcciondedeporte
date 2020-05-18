<template>
  <v-row >
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text rounded  v-on="on">Agregar Alumno</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Datos de Alumno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="LU*" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="DNI*" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Nombre*" required></v-text-field>
              </v-col>             
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Apellido*"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" type="email" 
                :rules="[rules.required, rules.email]"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Direccion*"  required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Todos los item son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

  export default {
      name: 'RegistroAlumnos',
    data () {
      return{
        email:'',
        rulesEmail: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
        
        dialog: false
    }
    }
  }
</script>