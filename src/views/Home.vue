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
        Direccion de Deportes UNNE
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
                      Direccion De Deportes
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

        <v-container class="text-center ">
          <h2 class="display-2 font-weight-bold mb-3">DOCUMENTACION REQUERIDA</h2>

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
          <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">AUTORIDADES</h2>

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

              <!-- <v-btn
                class="ml-n4 font-weight-black"
                text
              >
                Continue Reading
              </v-btn> -->
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
            <v-form ref="form" lazy-validation>

            
            <v-row>
              <v-col cols="12">
                <v-text-field flat label="Nombre*" v-model="Mensaje.Nombre" :rules="textRules" solo></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field flat label="Email*" v-model="Mensaje.Email" :rules="emailRules" solo ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field flat label="Asunto*" v-model="Mensaje.Asunto" :rules="textRules" solo ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea flat label="Mensaje*" v-model="Mensaje.Mensaje" :rules="textRules"  solo ></v-textarea>
              </v-col>

              <v-col class="mx-auto" cols="auto" >
                <v-btn color="accent" x-large @click="AgregarMensaje" > Enviar </v-btn>
              </v-col>
            </v-row>
            </v-form>
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
      textRules: [
        (v) => !!v || "El campo es requerido",
        
      ],
      
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
      ],
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
            src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRYVFRUYGBgYGBgZGRoYGRgYGBgYGBgaGRgYGRgcIS4lHB4sHxoaJjgmKy8xNjU1GiQ7QDs0Py40NTQBDAwMEA8QHxISHzQrJSw1NDQ1NDQ0MTQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABFEAACAAMFBAYFCgUEAQUAAAABAgADEQQFEiExBkFRYSIycYGRsRNScqHBBxQjQmJzkrLR8DNDgqLhRFPC8bMVVGOD4//EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAApEQACAgEDAwMFAQEBAAAAAAAAAQIRAxIhMQQyQRMiYRQzQlFxI5FS/9oADAMBAAIRAxEAPwC3iN1jQRusc00kgjdY0EbiLIbCNhGojYRCHseiPI9iENqx7WNRHsEiGywYggRYNENggWZGsxKgg6EUj2sYTBsEpVqkFHZDuPu3QK3Xln7YiwbQ2ehVxvyPwhCR0k5OvnD8z14H/AMS05UWWZoYXXSM39swxfqmF906v7Zjzq4Z1A2X1j2QCOu3bDCWekeyF467dsUiIaytBGlp6p7DEiaCNLT1T2QK5BK/c+p/e+LUsVW6NT3ecWpNI7E+TJ4F1t60ZYeseyPbZ1jHlh6x7Iv8QfJpe31O+B5UE3t9TvgeVBLtI+QyXEVj/mfeP8Ikl7ojsv8AM+8byECiGs6IJR6S9sEToGl9Ze0QX4kfIZbz9Gx4UPgREV3TMSsaU6R8hEtuH0b+yYGubqt7Z8hAvtJ5N7XoYSbLH6J+Ux/hDu16GEey3UmDhOf4Rn6hf5jcfcN5mnOFMzUw0mwsmamMMTQPRG6xoI3WOgZCQRuIjESLFkNhGwjUR7WLIbVgG87WyYAurHCOZg0wBektWwYtK17IGW0Wy1yR2O3O030bHMLUjLuhtWEthlqJoI3g57zpDkReJ3EqXJLJ1EFM1BAsgZxO5h6emNg+SJptCeX+RGxfyHugbn3Z8olIBWu8a9kc+XVNyoaoqjy2yvSIy6nd7QiphOkOTD3GLmg7v3wisW+TgmngTiHeY6mCerG4/BnmtMkxoer3QBdGr+0YOU9HugC6NX9oxxK5OgHyuseyFU+1IjMWNN/OnHkI0vq9/RHAnSmPko4czwipl3muEBxJWrMfrHex5cBwg4Y21bCssM7a4BgkuWWPMgd9OERHbOUwIKsH3rl2ZQts1mCuzUzo3hWlPGse2rZVHTKgbM131POGrFEii5DC6LzSta6nwzi6SZgYZGOMWcPZ5wkzDrkjHfXRSefnSLpcd7shwOSV968+wb40273Ezx/os1r6xjywdY9kazZmI1jawdY9kM/Ez+TW9tV74HlQRe2q98DyoNdpXkLlRrZ9X9s/lWPZZjWVq/t/8VgEQ1mwMvWHtDzgiZA51HaPOD8MryG20fRv7JgS5eo/tnyEG2odB/ZbygG4uo/tnyEB4LJ7UMjCDZg9GeOE54f2rQwg2a/1H3zfGE9R9sbj7hvMELJuphpMhZNTOOfEex2I3ERiNxHRMpuIkWI1iQREQ3EerGojYQSRDaIp8gPSu6JYyCoEhk2VFNQM4JEaiPTpESrghIkwBgDvy+MTO2RhJbppBTPMNXwh0j4gGG8Q2UG8d/spS91AsqjHM56GJXCg4RmeA4c48+bip/e+JpcsCOW+ldjtRIIV33ZsSBxqvlvhsgjxZYYEHTMR0cNwoVL3ISSGqndC2wTggmMTkCTDP0eAMvq18N0VG020orAfWmU7hHPcbm18myL9qYvtjkuWIq75U9VTXI92X/cF2eXhAAIxH3c+we80HGAp14qlcaYS25Vq55VJ3xlotRQZ4Eqcy7gEGmmpq3ZGuMW9kim1yN7HZy7gCoUankILtN7S0OGjHdUlUWvtMfIR7cE8shFASKZjQgjWA7ysk5j9G2A51ZRVzn1anqildN9OcRRjqpjdUlFOILtPdhtMjGiUdekhDA15Yhv+NIU3baTMRXPRcHA43h13kcxFpue7pqAh5mPFriAGe/T459usV2/rMbPaMX1JwAbcMa9Q9prT/qLentRTTa1MsV0WvIKe7ly7IfXeekeyKBYbwAanHPtG/wB1Is9kv2VKFZhNCBQgFqxUZ7aWZ8kPyQ2vXVO+IJMKrdtRZ3K4ceVfq0+MBrtZKH1HP4R8Ydqjp5EeS1yoxNX9r/isVmXtjK/23/t/WPW2ylDF9G5qfs8AOPKB1RLssMyBW1HaPOER2vQ/ym72H6QXYr4Sa2EKytrQ0oaa0Ii1KNVYJY5/Uf2W8oX3B1H9s/lWGL5o3snyhZs/1H9s+SxPBYXatDCDZsdK0/en4w/tW+K/s8enafvf1hPUfbYzH3DiZC2Yc4YzIWzBnHOiaBpLtKN1WB7CD5RMHEfO8tyMwCDyy8ouvyeXhOaa6B2YGXWjsxAKsBUV01jrSxOKuzGpW6Orq4jcOIVS2nHULE6ib9mFqMmFaGImCNg4hcFm/ZiVUmcVgtMirQbjjYOIBwTOK+EbKkziPCL0y/ZLQcHEYXgP0cziI99G/rDwi9D/AGVaBrecxDG5Z4KYTqvluhVb8QpiNTGXVPwuBubLv3R0FC8KM7l7y0BR5RuF86xEjZRvWMUmh+5gjyWczGqGMBzgNQVCq9XwljxAjmt6Wh0ckKSVdnGRYcATy/QR0a/Dru6Jzjl16M6E0QVYHPpUA7K0HujJFf6NmpdiE1jtLvapQY1bGmLt1bwEXNNnQ7s7kkliQDXog6gDShqdeXCOe2S3rJtMpwOijgtxocmPgTHX5F4o6gggggEU0IOYjXNyilpLwqMrTJbCiS6ioESva0rkQ1NQKFgONOEKLamI4yxWlTrTcBpoYLs+SYsJpTrOQikcmagbuhem9zRqS2GSTFIqDlyiu7W2f00rDStGB8P+4Y2CckyrIcsRBoQRiXWhGR7olt8tVRmbRQWPYBU+6Ka0slpxOc1ocOKrr0lOXSXQ8iePPPfk3lTMcuh1HHcefDjFa2wvORMnIbOcSqvSYAqpJpRQCBSgHiYkui9sJGI1FKHiVr5j4QWXG61IyKadxGqySHFRub8sQ+hhvZqMUO7pDl1T7o2eyCmUClsZHs6E4lRMtnyr++MNZNiqcoYmyKi1bcKxVFWVyXZc4eXTZKOrcK/lI+MDSqO9BlnDyzpQjkIvTuWiw/VPYfKFez/Uf2z5CGidXu+EK9nuo/tt5CHeAgy074r2z/XtP3g+MWK074rtxfxbT7Y+MJz/AG2Mh3DeZC6Yc4YuYWzDnHORoOJyzFj2AtAS2rU0DK6+K4v+MVmUYbbNTQlskMdMaD8XR+Md2StNGBco7dLtC+sPGJRaBxERpLWug8InEteA8IyxWw1nonrxEbCeOIjwS14CN1lrwEHXyDZnpxxEbLPHERmBeAj0IvARaXySz0TxxEYbQOIjYIvAR4UHARdfJLFN5zKsM90BM9KEQTeR6ZgCY0dOCrGv4ZJdzLnYLQHRWG8e/fBOKKtcNtwOZZ0bMe1FjLRys0XGVGuD1KzdGjxjnEUtox3hN7DK3FO0LUCnjr2UJ86Rye+rMZk0kkkFqcqDl3COnbTuwUEaeXOKNOkDEo4k+NBl7zARdSbHxXtOfWmTQmmkX7Y+YWkopOYBw9ldO6o8RFUtsjCxUjcKeEC2G8ZlnmI6kkKT0SciD1l5f4EbO+NC01CVnWbbYTMCYXZCpr0QDWmVM9+Zz3QVZ5CAk+jBcihd6zH/ABuSfCAbsvmTNUOrVB14qd6sNxhgLwQGFJyWxsWl7hUuWFpQUoa8Bnr5xBfBxyXQaujr+JSIz52WGQiQJWlYCnyynJPZHBvQlWZSM1JBHMZQTZ1KkEacDpHUbw+T9Z80TVbBiRCcsWYQAmndDq6tkpcgrVVYjfhp2kk1Ne+N+hyRzNSiyjXVb5Xo0QzQrDXERmdN1cqQ8FoTAAhDUGoIOQ5x0dJaqAAoA4ACkbNYZTjpS0P9Ir211EJlgklsy3KMndHOrNa6HNawNft4oyMoxh8qUphoNantrF6tmyclx0GdDnmDiHeGzPjHPNobqeRNKOBWlVI6rKcgRXspQ8O+FaJR5FtIGuica51PfTyi42LqnOumtK0z4RTbFKaopFwu49A140iRdyLiWCScu6Fuz/Uf22+EMLOch2Qt2ePQf7x/hBBh9p3xXbkP01p9pfjFhtBiu3MPp7T7S+RhWf7bDh3IbTDC6ZrB7QumNnHORpZxCWc4Js8zA6P6rK34WB+ECKYmrpHeowHaJe0ck0OP3GChtDJ9ceBjksp2KqcZ0G+CUmv658Yw7xNyxRaOqrf8n1x74kW/5Prj3xykTZn+4fGJFmzfXMVql8F+hE6mL+lf7ixst+SvXWOVGbN9eNlnzfXPui/Ul8FehH5OsC+ZXrr4xt/6xL9ZfGOTi0TfX8ow2mfumH3RPUZPQidGtU0M2IZ10gbUx5LqESuZwjyjEMdyKqC/hyJd7IJ7kNUGhFKdsW+67eJqBvrDJhzim2vrGCbkt3o3AJ6L5Ht3GMefHqj8jsctMi6IdYHvK1iWtaVJNABqSdAO05RJJaFd6Y8aMoBCYjnpiIojdxwDvPGObV7Gxcia9gMzNR57kVMtGwIgzADzDvqDktMxFYtk5wVdrP6FVagUEP0KU6w17846BJsoBdQahSDnqThAB9xHdTdCa+jkajKHLGtJbnTKFf8AKDjGuo1pvGoYciDFfmjENMxr8DFitM1GJUGlMlI/L3Z91RCxrKScQpTloc90SD07MKS1bhWz1laWiuD/ABGNKfVK7jxqK+Bi4WahAOpiuybK6JLQDpI7Mw5MKjzPvix2Zw1HXQjPkd9RuMHl5tExcUM7E9YKn2jCpbcAfKsL5UwA617o8tLlujuGv6fGF8jVsi9XI2KRJb1paHxQGCpyVFP3WAtnHrZpf2Vw/hJUe4CGEdNO0cyXJAulI3sxyjycR36xpZmyiNFBkUr5QLOWMlsPRXGpYaYmwkKe4H3xb2m54V148I8tFmR0ZHWqsKEHzrxrnXjC8sG40Wmcns8gClIsdlFEHP8ASA7fdLWeaUOakEo3rLz5itCP1guzAhADu0jDFVKmEh1ZT0R2QBs91H+8f4QZYz0R2QFs/kkz71/OCDDrRFfub+NafbT8sP58ILo/i2n20/IIXn+0wodyGLwvmHODpkLphzjnI0s4kwoY3V9I8fONFEd98mDwOLIwwio5aQSCuWXugOwTyFPb5wdKnYsox5E02dLE7giZ5agVplGgZeHnErt0YmxAUyhF7DfIICv7rHhw/usMUK8PKNxg4eUVrLoXKF4++NkC1AJ1IGvEwwVV4DwES2dFLoKDrLuHGJGVugZKk2XBzQAch5RknWNZpj2Rvj0iVROBe4LajmYFJia1HOGWz1y/OCzuSstTQkas3qgnSg1PMd2abSW4yKtljuNzNlo3LM8CMoLvFKoFAqK586ajvyiWRJSWgSWuFBuFc+JJOZPbGk+ZQRijCN7GlydALSGGZqeDCgJH2hof3pFM2iR5kx0FaAhcsqlqCg4DMVJjoMt6oP3plCSfYmxs6itacNQQQfEd8G8excZ77nO72uf0CS0VfpZhIBqSSAADh3LmRx7coOuK7FZ8AIKocLHdRSSx7CxoOyLTe90TJjyJxQN6PGGQHNg1N5yGlNd8S3Nc6pj6BRK4qOVJVNcHRJqKVFSdCeMC8TbW2wxZNvkQegBnvQUA03ZDdT+sjugiz2OjMdxz93+InlSyavTpOzMePTJOHxMGy6UhE5WzTCKSoB+a0NR2mN3l0HP4wYyRG9DQ8GoO5asedKp+IREE1SLFsx/CI9VyP7VPxho7kVoKncNIrWyN4B51qkj+V6InmXVifABYss1d8dDDvFWczLWt0RsuWeu/98IilNhDN6oJ8Inmv0GbgpPgKwNaMpTn7J8oalckAe2M5DjvPE7/AHwYrQou+fVF7B74ZIeOXnBZY0ylwR3lYUnIUbXVTvVuI+IisWmxtKCqxB9kkj3gRcMPCAr0sPpUyycZqdx4g9sY541epchKQmsJyHZAtx9Wb99M/NBNlUr0WFCMiDqDA1z5Cb99M84z0NDbQYQ3V/EtP3i/kWHk8wjuvr2j7xf/ABpAZV/my4dyDXMLZmsHTXArCuZaBXWOajUyv7NbCSLRZpU95swM4JKrhw5MVoMq7uMP0+T2xKOkrN2sw8mgzYtcNjkqDUAP+dodu+RjryyIyKBUr32TscqzznlyirKjMDjc5qCRkSRHPbMdY6ttFOpZrRXT0T1/CY5HZiWYKisSxoKAnvy3QDWpGrDJRVNhxmdGJPSaQQlwWg5YR46QY+zTDMzKd1YFYW/AbzwT5FonRssyGybJTCMQc0pl0NffCG2SWluZbMpYU0IIz5jygJYWgo54y2TCxMj1JxUhhuIPhAIRuHujDj4HwgFHfYY2joQnh1VhowBieUcjFX2YtZNZT5U6S9m8R0+47uWWodxV2zAoTgB0FNzU1O7TjXuxzJ40ziTxOM2iCybMS2VXnF8RoSgIUCueE5VrxzEPllqqhEUKqigUCgAiFrR6yOOYo35an3R7UEVU1EY5W+RkaRkxqQvtE6msS2mfh+PCF1uJZSyUrvUnyPwMXCKTI2MrA9VPtfAGDJaDOvKEWz1oLq+IUIfzUQ8QQ3hlE3oRSF1+PgkOPXpLHPGaN/biPdDJWim/KFapyhDIZfoAZ0xGBOMNVFUHcevz6SxbtpqPJSkotOXBG2EIS2QAJJ0AA1z3UiH/ANVQ+jOZaawUFBiDYgWWaQOqCKEjOjE8Y0u+0TZyLWQ8tmUNRqMlCK1Dg07jQ8oBsWz1rs6kI0ucgzRCcDrQ6ByADkTqRmF5kc2NJtSOll1UpQC7TejFp0qSuKZKUFlYECrAEZ1pv3kQqnbRMjy5WHG5B+jUksXfJFWlQKstWJpQMtKxHelttqKxNmdVAFZjMCEoFqWoxyADDUZkZjSBLNcs6zWqRaHKlZrFMYOM1ZQrtXTFVyAeCExrw4Y5JUjHmzTju+UWrYKytItdpR3DTGVGcjQu4xtTkCaDkBHQ2jnktVkXjIZT/GRkbOpxKDme7CPGOiaiN2WMY01xRjxSc1qYvnTAUcDgRl7x25+8R7bErLccUbyMSTLLqRoammeZNf1Om8kxrO6jeyfKBh4Y1le2dJwlWNSrEDktej2nDTOH6oTvinXVa8FqwE5Oi04Y0Jr3lW/t5RazNMMyt63RS4CUl/aMShGGjeMAq54kwUk4n6sIk2WQ22yl+kB0h/cOHbFcu3WaP/mf4RbVflCS9ZOBy6jJz0vbAAr3gDwMZc0a9wyLvYGnNCW7T05/3g/8SQdap9BCW7J+c48ZvlLSMk5xcGhsYvUg21pkeyK7PU1hzabRkeyEFomHEY5nJsVln2NdWscorp06dzsIczuqY5FJ2jMlcEuSMq0Yud+fVFOPGB7RtXbWBAcoD6tfMkx2HjbZi1Ujpd+0+bzgaZo4z39ExzKXNCGuLAeIbCR2UzhbNNpmjEwmuONGI9wpAb2dxqrDtUiCWL5IsteCyS7+VMxMnMeTtT+4xBatq5zdRnXmXJMVwxkNSoU3YwtV72iZXHPmNXcXanhWkQWeBxEqMMoklsHCr3Gkm1MRqecEC0txMKpDUOehyg6XJLsFWpJ3D95DnGeUFZuhO47nR/k1uf0ge1OT0WKS+RABdxzzAB3UbfSnR0kIQAVUgaVFQPHU84rGxEn0Vjky8YauOYWXMUZ2pQ7+2LIj1ruUb40RVRSRhyy1SbDBQZCIZlmUmoJU/ZIz7QQaxFKtGM0QZD60FKlO2BewKF9usTlSEKk035H9PKKbeNsmSnRHQqAcwy5OO3RsuFYtd77RSLOwRmxzWphlpQvnvbcq8z3AxXdoto3WWcWE4slSgKdrE5mmXDXSAlmUdmOx9PLJwNrsky06SCizKGlSRUDcDproIcSyc4p11JMaUgc4d+WVDxFCRTsyOu+gcSbfMGVA26uYPfAx6hLZsOXST5Qp2qvq0pbbHIs7YJbOvpWZQZbEnEZRc1zwAnDkemO6O32d7WwYUWWzFyTmz0NJSgcAoDHnTWhhzMlekydVYYg9CAaMDiU1PA0p2RpeFrSUhqekQQKa1p9XnBfUu/Zz+yvpIunk/wCHthsQlALid6esxOHgBhpGjJMQUR8ZJOLH0QMssOFa67j4xpIt6YcVTQgEVVhkRlkRWvLWNpE/GaioXcSKVrwGvjSMzcnuzalFbIIDNhoxBNM+jkeOVYWXrZfTtZw5Ho5LhymYBpSmmtACKfaPCGDmhziB2rEx5pYpaolZMUckdLBnVGtqYQoEmUXqKDpMaeTAxbvnapSrCnaIqbhc8t1K6ZcOyDrnszuwZGC4agM1W6WWi1zIFK1yzHGN31rnSrhUc/6JYk3q2LE9rTCWDDQnUcIDtE7ErBAWJH1R8dPfC2+ltEphPDqxGtFZQ2gAmLWhGgqNCRpD+wz1my0mLo6hqHUHep5g1B5iGRyt7JUKlFJJ3ZTLNstaHmCZNdECkEIgLsCNCWqADnuJi1ybCB1mZjzyHgINeIi9NTBVJu7BtGJLA0AjVpK1rUg8mancK090ZMbfGhfKsWoslnrFxpRuRyPiP0iC0srqUaqk6V47iDoY3+cqd8RTbQm+hiNRe0iK1uVa31AIOoqD2iEl29WZzmn8iwRtoJiTEnSGqjqQ6sRgLJQDInIlTTo+rziW4bPLmyKtjRndmqGGJD1ab1YZb6VqI5WTC02kaoy4YLPNawkmzczDC97tnyanEXT11rT+pdVMKMS8T4/4jJ9O1yPWVMRyhUKaDqruHqiCpcoHVV/CsB2UVRD9kDwJEMrOBlkY6kuTCmxvYHKKFUADhQawwS1vy8IX2cimkFKsLDthXzpt4U93+Y1LqdZaHtWIwI2EWS2atZpDa2aUf6F/SNDd9mP+ml9yqP8AjE8eUiWyWDNdNkP+nUdhI8qR6t12YVpLYYqA9JjUA1p1tK0y30gkR4YvnkvU0qCrNeU6SoSVhKCtFcGuZrQMDkK13HWBb62wtODAZATTNHxgjfqoI98TydI9tEhXFCIfGVIUxzde21mxypJxSy4UdNSoViBQM/V1yqCd0DbW7QWt29FYwQlWVnUATCQaEqz0AXmufMQqFgRiMSg04isKby2fVmxDsFa5DcBwHKKk0y42mD2GYlnctOPTrV6ursCd7kMTWu8xPe98yZoTAxGFsWKoFKUpTWmcLWuXPMVhrdXyfzrUuOXgRA2Es5YVpSuFVBxU07YzyhFyvc2YuolDfYbWPaeQqgM6qwyILVrTeDlkddBrDexbR2eYQquCTENj+SKzBaTpk124y8EtR2BgxPaT3Rufkisn1Z1pH9Uo+SRTxQZS6mYTbr8SWpNa8hmSYQNammEu+RNQBuVeA58YbTPkrlnS2WnLTEVb9I0nfJaGFDbJh9tCw/PDIRjAXPLKQFd208uQ9HYFQmHIiuoplXPJR4+JEm9w7vRiVZmYEagMa7m56coEmfJD6tsA/wDo/wD0ieT8mdoQKFtq0UmmKQN/MuT74klFrYkMklK2Sz7wQtQMznt88somW1qBmMHaVJPZnUx7M2NtWQFskCmtJRWvMnH5RC+w9sYUW2Sh7KGvvrC/TGvNubi3plU0HPTvMWjZK9Jbo0tSpdTQhc8mNQxrrXeRkMI03cx2juG0WQKHtiuz1oig4qClWPRoBmNTn4wtuuy2t2LJPZMqVyO/cKZdsNxRUXYrNk1Ro7JtheCJZ2ViMTYlSh1ZlZcuNK4jww9kLNhrwBWbJrkpExexyQ4HLEK/1xy++7FaxRntLvh36Hv498M9m9oZ6EhJaO4QjGej0arUNQGuYB3b4fGnJCE/a0dheeBA8ychHWHjHLrffd4uTRpaD7Kk+8tCeVJvF2ZhPbXPJQPAikPlKMeBa3OqPfKIxVzlxgadfSBsGMdIVQ8eVY5rb7nt0ygeYz05oB7qRALgtQCKWchTUdPQ8qGFPKw9KL497IjYseRyavn3QVaLY2GtCcqjCCxI4ikUC6roK2mU1pRnll8MwOzFSHBUEkHcSD3R060ejsyJLlSxjaqS5YqSakEksakIDQk8hCG96GJIrVom+lswNCpSa6klcJJIBrmK/Wp3RXXs1plHHJZ6DM0Wqk/aByYU491IvV8WFxZ2UuXmVxs9OjiqOiBuUAUA5cYqqXjNZahyoFVIBgY4p5H7NySyxxx3J7o2rBos5SjaFqEo3I16vYcucNJljsrnEZIJOdUICnnSKuJedajvgj51TLCO7SHS6TKuExa6jG+WkNfk5lq9hAKK2Fpi5iurYs69sa7TXAJISaq4AzYSo0qRUEDdpSPYyMLm/UkNaWlCmSuUEpGRkMBNhGwj2MiEMjIyMiEMjUxkZBIolltBCmMjIYCSII8mLWPIyKYRvdtms5atocqo+qquS/ayg4R74uSbUWFFCK+FVFFAlzKADdQLGRkUwjZdrLGf539kwf8AGNl2nsh/nr3q481jIyJRCRNo7IdLTK73C+dInS97O2loknsmJ+sZGRVBKKonFpQ6Oh7GX9Y2ExT9ZfxCMjIhKN1HMeMQXhbkkoXmOqqN5Op3AcTyjIyIgTit5W1rTOeY9asTQeqtclH71qd8N7ql4VjIyGxBkeXwuJCIFuSyhanjGRkHEBjF0jyXapaDpuqljliIFadsZGQU+0keSb5/K3TE/EIz50h0dfER5GRjcmaNKIp7qwp18x0VIq2eghzs9aJnpbQ05VLqFLMDiIB6ssHQAAE98ZGRcX7WB5Q2n2uS6lWqKih74rNp2RsT9WY6djRkZBxuD9rLlFSW4IdgZNejaW7yDGh2AH/uv34xkZBS6jL/AOmK9GH6P//Z',
            title: 'RECTORA',
            text: 'Prof. María Delfina Veiravé',
          },
          {
            src: 'https://fotos-themonkeybusiness.s3.eu-west-3.amazonaws.com/wp-content/uploads/2021/04/26081829/imagenes-de-personas.jpg',
            title: 'SECRETARIO GENERAL DE ASUNTOS SOCIALES',
            text: 'Med. Miguel Eduardo Cibils',
          },
          {
            src: 'https://scontent.fpss2-1.fna.fbcdn.net/v/t1.18169-1/p320x320/10447878_10204336899616871_4034730675871059949_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_ohc=P6O2GKwL7vEAX9AhFUE&_nc_ht=scontent.fpss2-1.fna&tp=6&oh=a4a1454a781b03954d6181195718d9f1&oe=60E4FA8F',
            title: 'DIRECCION DE ASUNTOS SOCIALES',
            text: 'Lic. Marcelo Omar Cáceres',
          },
        ],
      features: [
          {
            icon: 'mdi-account-group-outline',
            title: 'Ubicación',
            text: 'Campus Universitario “Deodoro Roca”. Avenida Libertad 5370, Corrientes. Gimnasio cubierto (ex comedor). Belgrano 1045, Corrientes. Informes 0397-4421024 Int. 105 de 8.00 h. a 20.00 h.',
          },
          {
            icon: 'mdi-update',
            title: 'Condiciones para su uso',
            text: 'Los estudiantes, docentes y no docentes, incluido su grupo familiar, están autorizados para el uso de dichas instalaciones, para ello deben tramitar su “carnet” en la Dirección General de Asuntos Estudiantiles. (Belgrano 1045, Corrientes).',
          },
          {
            icon: 'mdi-shield-outline',
            title: 'Requisitos:',
            text: 'Cuatro (4) foto 4X4. Constancia de alumno regular o constancia de alumno inscripto (para Salud). Constancia de aptitud física (Expedido por la Dirección de Salud Universitaria. Belgrano 1045 (1ºpiso). Los mismo deberán entregarse en la Dirección de Deportes - Belgrano 1045. 1ºpiso - de Lunes a Viernes de 8.00 hs a 20.00 hs.',
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
      this.$fire({
          title: "Estas seguro?",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: '#007600',
          confirmButtonText: 'Si, Estoy seguro!',
          cancelButtonText: "No, Cancelar!"
        }).then(r => {  

          if (this.$refs.form.validate()) {
            db.collection("Mensajes").add(
              this.Mensaje
              )
              .then(function() {
                window.location.reload();window.location.reload();
                
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
              
          }
              
        });
    },

    CerrarSesion() {
      fb
        .auth()
        .signOut()
        .then(()=> {
          // Sign-out successful.
          this.$fire({
                title: "Hasta la proxima",
                type: "success",
                showConfirmButton: false,
                timer: 1500
              });
          
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
