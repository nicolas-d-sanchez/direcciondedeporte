<template>
  <v-container style="width: 450px;">
    <vue-html2pdf    
      :show-layout="false"
      :float-layout="false"
      :enable-download="true"      
      :paginate-elements-by-height="1100"
      :pdf-quality="2"
      :manual-pagination="false"      
      :filename="Datos.libreta + Datos.nombre + Datos.apellido "     
      ref="credencial"
    >
      <section slot="pdf-content" style="height: 400px;">    
        <div id="credencialgen" style="height: 210px;">
          <h1>Credencial Alumno</h1>
          <v-row no-gutters>
            <v-col>
              <img id="foto" height="95px" width="95px" :src="Datos.foto" />
            </v-col>
            <v-col>
              <qrcode-vue
                class="qr"
                :value="Datos.id"
                :size="size"
                level="H"
              ></qrcode-vue>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
          <ul id="datosS" style="font-family: 'Source Sans Pro'; font-size: 10px  ">
            <ul>
              LU: {{ Datos.libreta }}
            </ul>
            <ul>
              Nombre: {{ Datos.nombre }}
            </ul>
            <ul>
              Apellido: {{ Datos.apellido }}
            </ul>
            <ul>
              Facultad: {{ Datos.facultad }}
            </ul>
            <ul>
              Turno: {{ Datos.turno }}
            </ul>
          </ul>
            </v-col>
          </v-row>
       
        </div>            
      </section>
    </vue-html2pdf>
    
        
    <v-spacer></v-spacer>
    <v-btn text @click="generateReport">Descargar</v-btn>
  </v-container>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
    VueHtml2pdf,
  },
  props: {
    Datos: '',    
  },

  data() {
    return {
      dialog: "",
      size: 95,
      value: "",      
    };
  },

  methods: {    
    generateReport() {     
      
      this.$refs.credencial.generatePdf();     
    },

    
  },
};
</script>

<style >


section.content-wrapper{
     width: 400px !important;
}
  
#credencialgen {
  background-image: url("https://firebasestorage.googleapis.com/v0/b/dirdeporteunne.appspot.com/o/unne_logo.png?alt=media&token=38af42ba-76c3-4543-9e19-1d51d9d83d4a");
  background-size: 150px;
  background-position: 100%;
  background-position-y: 90%;
  background-color: #ffffff;
  text-align: center;
  border: solid 2px #000000;
  border-radius: 15px;
  border-width: 5px;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

#qrcode {
  margin-bottom: auto;
  text-align: match-parent;
}

#datosS {
  text-align: left;
  margin-left: 5px;
}

#credencialgen #qrcode {
  text-align: left;
  margin-bottom: 5px;
}
</style>
