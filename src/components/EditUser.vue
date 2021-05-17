<template>
    <v-container>
    <v-dialog v-model="dialog"  max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text small v-on="on">Editar</v-btn>
      </template>
      <v-card>
        
        <v-card-title>
          <span class="headline">Datos de Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field id="Nombre" v-model="User.nombre" label="Nombre*" :rules="[rules.required]"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field id="Apellido" v-model="User.apellido" :rules="[rules.required]" label="Apellido*" persistent-hint required></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field id="Email" v-model="User.email" label="Email*" :rules="[rules.required,rules.email]"></v-text-field>
              </v-col>
             
              <v-col cols="12" sm="6">
                <v-text-field id="Dni" v-model="User.dni" label="DNI*" :rules="[rules.required]" ></v-text-field>
              </v-col>
              

            </v-row>
          </v-form>
          <small>*Todos los item son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = null">Cerrar</v-btn>      
          <v-btn color="blue darken-1" text @click="EditUser(id)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>
</template>

<script>

import { db} from '@/components/FirebaseInit'

export default {
  props:['User', 'id'],
  name: "EditUser",
  data() {
    return {
      control: null,
      dialog: false,
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        minPassword: v => v.length >= 8 || "Min 8 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
        
      }
    };
  },

  methods: {

    isAdminF(){        
      let promesa = db.collection("Usuarios").doc(fb.auth().currentUser.uid).get()     
      promesa.then(snapshot => {
      const data = snapshot.data().tipoUsuario;
      if (data == "Administrativo"){
        this.control = true;
      }else {
        this.control =  false;
      }
      })
    },

    EditUser() {
   
      var NombreN = document.getElementById('Nombre').value;
      var ApellidoN = document.getElementById('Apellido').value;
      var EmailN = document.getElementById('Email').value;
      var DniN = document.getElementById('Dni').value;      
      var UsuariosRef = db.collection("Usuarios").doc(this.id);

      
      return UsuariosRef.update({
          nombre: NombreN,
          apellido: ApellidoN,
          email: EmailN,
          dni: DniN,
      })
      .then(function() {       })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error Al Modifica Usuario: ", error);
      }),

      this.dialog = false;
     }
        
    
  }
};
</script>