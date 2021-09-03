<template>
    <v-dialog v-model="dialog"  max-width="500px">
        <template v-slot:activator="{ on }">
        <v-btn color="dark" small text v-on="on">Iniciar Sesion/Registrarse</v-btn>
        <v-btn color="dark" small text v-if="!loginM">LogOut</v-btn>
        </template>
      <v-form v-if="isLogin" class="formulario" ref="form" lazy-validation>
      <v-card >
        <v-card-title>
          <span class="headline">Iniciar Sesion</span>
          <v-spacer></v-spacer>
           <v-btn color="dark" small text @click="close()">X</v-btn>  
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <a color="primary"  
           @click="isLogin = false">¿Has olvidado la contraseña?</a>
        <v-spacer></v-spacer>
          <registroGeneral></registroGeneral>
          <v-btn color="dark" text @click="login">Iniciar</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>

      <v-form v-if="!isLogin" class="formulario" ref="form" lazy-validation>

      
      <v-card >
        <v-card-title>
          <span class="headline">Restablecer Contraseña</span>
          <v-spacer></v-spacer>
           <v-btn color="dark" small text @click="dialog = false">X</v-btn>  
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">
                <v-text-field 
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <a color="primary"  
           @click="isLogin = true">Iniciar Sesion</a>
        <v-spacer></v-spacer>
          <v-btn color="dark" text @click="doReset()">Restablecer</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>

    </v-dialog>

</template>

<script>

import {fb} from '@/components/FirebaseInit';
import RegistroGeneral from "@/components/RegistroGeneral.vue";
  export default {
    name: 'Login',
    components: {  RegistroGeneral },
    data () {
      return{
        passwordRules: [
        (v) => !!v || "Password es requerido",
        (v) => (v && v.length >= 8) || "Debe contener mas de 8 caracteres",
      ],
        emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
      isLogin : true,
      dialog: false,
      loginM: true,
      email:'',
      password:'',
      

    }},

    methods:{
      login() {
          if (this.$refs.form.validate()) {
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

            }}
          },

      async doReset(context ) {
      if (this.$refs.form.validate()) {
          await fb.auth().sendPasswordResetEmail(this.email);
            this.close()
      }
    },

    close(){
      this.email = ''
      this.password = ''
      this.dialog= false
    }

    }
  }
</script>
<style>
  
</style>


