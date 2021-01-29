<template>
  <div>
    <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      :filename="datos.id"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="500px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <v-container id="credencialgen">
          
          <h5>Credencial Alumno UNNE</h5>
        
         
          <v-row id="cuerpo">
            <v-col >
              <img class="preview" v-bind:src="datos.Foto" />              
            </v-col>

            <v-col >
              <div id="qrcode" ref="qrcode" ></div>
            </v-col>
            
          </v-row   >
          <v-rom no-gutters>
              <ul id="datos" style="font-family: 'Source Sans Pro'; font-size: 10px;">
              <ul>LU:{{datos.lu}}</ul>
              <ul>Nombre:{{datos.Nombre}}</ul>
              <ul>Apellido:{{datos.Apellido}}</ul>
              <ul>Facultad:{{datos.Facultad}}</ul>
            </ul>

          </v-rom>
          
        </v-container>
      </section>
    </vue-html2pdf>
    <v-btn @click="generateReport">Descargar</v-btn>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import QRcode from "qrcodejs2";
export default {
  components: {
    VueHtml2pdf,
    QRcode,
  },
  props: ["datos"],
  data() {
    return {
      
      size: 200,
      value: "",
    };
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },

    qrcode() {
      let qrcode = new QRcode("qrcode", {
        
        width: 95,
        height: 95, // height
        
        text: this.datos.id, 
        // render: 'canvas' // rendering set (two ways table and canvas, default Canvas)
        // background: '#f0f'
        // foreground: '#ff0'
      });

   
    },
  },
  mounted(){
    this.qrcode();
  },

  updated() {
    
    this.qrcode.text = this.datos.id
    
  },
};
</script>



<style scoped>
img.preview {
  width: 95px;
  height: 95px;
}

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

#datos { 
  text-align: left;
   
}
#credencialgen #qrcode {
  text-align: left;
  margin-bottom: 5px;
}


</style>