<template>
    <v-container>
    <v-dialog v-model="dialog"  max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn block text small v-on="on">Editar</v-btn>
      </template>
      <v-card>
        
        <v-card-title>
          <span class="headline">Datos de Usuario</span>
        </v-card-title>
        <v-card-text>         
          <v-form class="formulario" ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="datosUsuario.nombre"
                    :rules="textRules"
                    :counter="20"
                    label="Nombre"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="datosUsuario.apellido"
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
                    v-model="datosUsuario.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
               
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="datosUsuario.direccion"
                    :rules="direccionRules"
                    label="Direccion"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    type="number"
                    v-model="datosUsuario.legajo"
                    :rules="leRules"
                    :counter="5"
                    label="Legajo"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    type="number"
                    :rules="dniRules"
                    v-model="datosUsuario.dni"
                    :counter="8"
                    label="DNI"
                    required
                  ></v-text-field>
                </v-col>
                
              </v-row>
            
            </v-container>
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

import {fb, db} from '@/components/FirebaseInit'

export default {
  props:['datosUsuario', 'id'],
  name: "EditUser",
  data() {
    return {
      
      leRules: [
        (v) => !!v || "Legajo es requerido",
        (v) =>
          (v && v.length == 5 && /^(\d+\,?)+$/i.test(v)) || "Legajo invalido",
      ],
      passwordRules: [
        (v) => !!v || "Password es requerido",
        (v) => (v && v.length >= 8) || "Debe contener mas de 8 caracteres",
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
        (v) => !!v || "La direccion es requerida",
        (v) =>
          (v && v.length <= 30) ||
          "Este campoo debe tener menos de 30 caracteres",
      ],
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
      control: null,
      dialog: false,
      dniV : '',
      legajoV: '',
     
      
    };
  },
  created() {
    this.isAdminF();
    this.guardarDni();
  },

  methods: {
    guardarDni() {
      this.dniV = this.datosUsuario.dni;
      this.legajoV = this.datosUsuario.legajo;
    },



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

    async controlDni() {
        if (this.dniV != this.datosUsuario.dni) {
        let dni = this.datosUsuario.dni;

          let result = await db
            .collection("Usuarios")
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

    async controlLegajo() {
        if (this.legajoV != this.datosUsuario.legajo) {
        let libreta = this.datosUsuario.legajo;


          let result = await db
            .collection("Usuarios")
            .where("legajo", "==", libreta)
            .get()
            .then((querySnapshot) => {
              return querySnapshot.empty;
            });
         
         
      return result;
      } else {
        return true;
      }

    },

    async EditUser() {
      if (this.$refs.form.validate()) {
        let resultDni = await this.controlDni();
        let resultLegajo = await this.controlLegajo();

        this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#007600",
          confirmButtonText: "Si, Estoy seguro!",
          cancelButtonText: "No, Cancelar!",
        }).then((r) => {
          if (r.value == true) {

            if (resultDni && resultLegajo) {
              var NombreN = this.datosUsuario.nombre;
              var ApellidoN = this.datosUsuario.apellido;
              var EmailN = this.datosUsuario.email;
              var DniN = this.datosUsuario.dni;    
              var LegajoN = this.datosUsuario.legajo;   

              var UsuariosRef = db.collection("Usuarios").doc(this.id);

              
              return UsuariosRef.update({
                  nombre: NombreN,
                  apellido: ApellidoN,
                  email: EmailN,
                  dni: DniN,
                  legajo: LegajoN,
              })
              .then(function() {  
                this.close()
                   })
              .catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error Al Modifica Usuario: ", error);
              }),

              this.dialog = false;
            }else {
              this.$alert("Verificar datos - Dni o Libreta existente");
            }

            }

        })
        }
    },

    close(){
      this.datosUsuario = [],
      this.dialog = false
    }
                
    
  }
};
</script>