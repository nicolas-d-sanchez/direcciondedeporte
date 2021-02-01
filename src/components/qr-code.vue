<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"      
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="500px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <v-container id="credencialgen">
          <h1>Credencial Alumno</h1>
           
          <v-row no-gutters>
            
            <v-col>
              <img id="foto"  height="95px" width="95px" :src="Datos.foto" />
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
           
          <ul id="datosS" style="font-family: 'Source Sans Pro'; font-size: 10px;">             
              <ul>LU: {{Datos.lu}}</ul>
              <ul>Nombre: {{Datos.nombre}}</ul>
              <ul>Apellido: {{Datos.apellido}}</ul>
              <ul>Facultad: {{Datos.facultad}}</ul>
            </ul>   
          
          
        </v-container>
      </section>
    </vue-html2pdf>
    <v-btn @click="generateReport">Descargar</v-btn>
  </div>
</template>


<script>
import { fb, db } from "@/components/FirebaseInit.js";
import VueHtml2pdf from "vue-html2pdf";
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
    VueHtml2pdf,
  },
  props: {
     Datos: Object,
  },
     
   


  data() {
    return {
      size: 95,
      value: "",
      imageURL:'',
    };
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
      
    },
  

  },



};
</script> 


<style scoped>


#credencialgen {
  /* background-color: rgb(143, 202, 183); */
  width: 321px;
  height: 207px;
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
   
}
#credencialgen #qrcode {
  text-align: left;
  margin-bottom: 5px;
}

</style>