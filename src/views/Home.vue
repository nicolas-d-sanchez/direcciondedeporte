<template>
 <div id="app">
  <v-app>
    <v-app-bar
      app
      color="white"
      height="70"
      
    >
      <v-avatar
        class="mr-3"
        color="grey lighten-5"
        size="70"
      >
        <v-img
          contain
          max-height="100%"
          src="@/assets/logo.png"
        ></v-img>
      </v-avatar>

      <v-toolbar-title class="font-weight-black headline">
        Direccion de Deporte UNNE
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <h5 v-if="logueado">{{this.logueado.email}}</h5>
      <v-btn v-if="logueado" to="/panel" text small>Panel</v-btn>
      <v-btn v-if="logueado" @click="CerrarSesion" text small>Cerrar Sesion</v-btn>
      <login v-if="!logueado"></login>
  </v-app-bar>

    <v-content>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="@/assets/unne.jpg"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col
                    class="white--text text-center"
                    cols="12"
                    tag="h1"
                  >
                   

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-2': 'display-3']"
                      class="font-weight-black"
                    >
                      Direccion De Deporte
                    </span>

                    <br>

                     <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >
                      UNNE
                    </span>

                  </v-col>

                  <v-btn
                    class="align-self-end"
                    fab
                    outlined
                    @click="$vuetify.goTo('#about-me')"
                  >
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">Deportes en la Universidad</h2>

          <v-responsive
            class="mx-auto mb-8"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            La práctica del Deporte ayuda a los estudiantes a tener una mejor calidad de vida, a adoptar disciplina, compromiso y compañerismo. 
            Es una herramienta que además refuerza la concentración, permite relajar tensiones e integra a los jóvenes para el trabajo en equipo.

            Por todo ello, la Universidad Nacional del Nordeste le da gran importancia a la actividad física - en todas sus disciplinas-, 
            a la sana competición en torneos y a la realización de maratones, ofreciendo diversas alternativas, totalmente gratuitas, 
            para que los universitarios puedan acceder a ellas en distintos días y horarios.

            En ese sentido, la Dirección de Deportes dependiente de la Secretaría General de Asuntos Sociales, cuenta con una variada oferta de disciplinas tanto en Chaco como en Corrientes.
          </v-responsive>

          <v-avatar
            class="elevation-12 mb-12"
            size="128"
          >
            <v-img src="@/assets/logo.png"></v-img>
          </v-avatar>

          <div></div>

          <v-btn
            color="grey"
            href="https://www.unne.edu.ar/index.php?lang=es"
            outlined
            large
          >
            <span class="grey--text text--darken-1 font-weight-bold">
              Universidad Nacional Del Nordeste
            </span>
          </v-btn>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section
        id="features"
        class="grey lighten-3"
      >
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">VUETIFY FEATURES</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card
                class="py-12 px-4"
                color="grey lighten-5"
                flat
              >
                <v-theme-provider dark>
                  <div>
                    <v-avatar
                      color="primary"
                      size="88"
                    >
                      <v-icon
                        large
                        v-text="icon"
                      ></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text
                  class="subtitle-1"
                  v-text="text"
                >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="stats">
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 0  : 500"
          src="@/assets/unne.jpg"
        >
         
        </v-parallax>
      </section>

      <section id="blog">
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Noticias</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ src, text, title }, i) in articles"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="src"
                class="mb-4"
                height="275"
                max-width="100%"
              ></v-img>

              <h3
                class="font-weight-black mb-4 text-uppercase"
                v-text="title"
              ></h3>

              <div
                class="title font-weight-light mb-5"
                v-text="text"
              ></div>

              <v-btn
                class="ml-n4 font-weight-black"
                text
              >
                Continue Reading
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <v-sheet
        id="contact"
        color="#333333"
        dark
        tag="section"
        tile
      >
        <div class="py-12"></div>

        <v-container>
          <h2 class="display-2 font-weight-bold mb-3  text-center">Contáctenos</h2>

          <v-responsive
            class="mx-auto mb-12"
            width="56"
          >
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-theme-provider light>
            <v-row>
              <v-col cols="12">
                <v-text-field flat label="Nombre*" v-model="Mensaje.Nombre" solo></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field flat label="Email*" v-model="Mensaje.Email" solo ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field flat label="Asunto*" v-model="Mensaje.Asunto" solo ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea flat label="Mensaje*" v-model="Mensaje.Mensaje" solo ></v-textarea>
              </v-col>

              <v-col class="mx-auto" cols="auto" >
                <v-btn color="accent" x-large @click="AgregarMensaje" > Enviar </v-btn>
              </v-col>
            </v-row>
          </v-theme-provider>
        </v-container>


        <div class="py-12"></div>
      </v-sheet>
    </v-content>



    <v-footer
      class="justify-center"
      color="#292929"
      height="100"
    >
      <div class="title font-weight-light grey--text text--lighten-1 text-center">
        Universidad Nacional del Nordeste · Chaco · Corrientes · República Argentina
        Rectorado · 25 de Mayo 868 - (3400) Corrientes <br/>
        &copy;  GN Team — {{ (new Date()).getFullYear() }} 
      </div>
    </v-footer>


    
  </v-app>
 </div>


</template>

<script>

import Login from "@/components/Login.vue";
import { fb, db } from "@/components/FirebaseInit.js";
export default {
  name: 'Home',
  components: { Login },

  data(){
    return{
      logueado: false,
      currentUser: false,
      Mensaje:{
        Nombre:"",
        Email:"",
        Asunto:"",
        Mensaje:"",
        },
      articles: [
          {
            src: 'https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Mobile first & Responsive',
            text: 'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.',
          },
          {
            src: 'https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Think outside the box',
            text: 'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.',
          },
          {
            src: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1892&q=80',
            title: 'Small changes, big difference',
            text: 'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.',
          },
        ],
      features: [
          {
            icon: 'mdi-account-group-outline',
            title: 'Vibrant Community',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
          },
          {
            icon: 'mdi-update',
            title: 'Frequent Updates',
            text: 'Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit.',
          },
          {
            icon: 'mdi-shield-outline',
            title: 'Long-term Support',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam',
          },
        ],


    }
  },
  methods:{
     toggleModal() {
       console.log('modal')
      this.$emit("toggleModal");
    },

    AgregarMensaje() {
      db.collection("Mensajes").add(
        this.Mensaje
        )
        .then(function() {
          window.location.reload();window.location.reload();
          
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },

     CerrarSesion() {
      fb
        .auth()
        .signOut()
        .then(()=> {
          // Sign-out successful.
          alert(`Hasta la proxima`);
          this.$router.go("/");
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  created() {
          this.logueado = fb.auth().currentUser
  },
 

}
</script>
