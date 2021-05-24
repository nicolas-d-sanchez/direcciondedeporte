<template>
    <v-dialog v-model="dialog"  max-width="500px">
        <template v-slot:activator="{ on }">
        <v-btn color="dark" small text v-on="on">Iniciar Sesion</v-btn>
        <v-btn color="dark" small text v-if="!loginM">LogOut</v-btn>
        </template>
      <v-card>
        <v-card-title>
          <span class="headline">Iniciar Sesion</span>
          <v-spacer></v-spacer>
           <v-btn color="dark" small text @click="dialog = false">X</v-btn>  
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">
                <v-text-field v-model="email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
          <registroGeneral></registroGeneral>
          <v-btn color="dark" text @click="login">Iniciar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>

import {fb} from '@/components/FirebaseInit';
import RegistroGeneral from "@/components/RegistroGeneral.vue";
  export default {
    name: 'Login',
    components: {  RegistroGeneral },
    data: () => ({
      dialog: false,
      loginM: true,
      email:'',
      password:'',
      

    }),

    methods:{
      login() {
 
      if (this.email && this.password) {
        fb
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            () => {           
                this.$fire({
                title: "Bienvenido",
                type: "success",
                showConfirmButton: false,
                timer: 1500
              });
              this.isOpen = false;
              this.$router.push("/panel");
            },
            err => {
              alert(err.message);
            }
          );

      }
    },
    }
  }
</script>


