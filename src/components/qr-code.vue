<template>
  <div>

  
  <v-container id="credencialgen">
    <h1>Credencial Alumno</h1>
    <v-row>
      <v-col md="6">
        
        <img class="preview"  v-bind:src="datos.Foto" >
      </v-col>
      
      <v-col  md="6">
        <qrcode-vue :value="datos.id" :size="size" level="H"></qrcode-vue>
      </v-col>
      <ul id="datos">
     
        <ul>LU: {{datos.lu}}</ul>
        <ul>Nombre: {{datos.Nombre}}</ul>
        <ul>Apellido: {{datos.Apellido}}</ul>
        <ul>Facultad: {{datos.Facultad}}</ul> 
      </ul>
 
    </v-row>
    
    
    
  </v-container>
  <v-btn @click="DescargarPdf">Descargar</v-btn>
  </div>
  
</template>


<script>
import jsPDF from 'jspdf'
  import QrcodeVue from 'qrcode.vue'
 
  export default {
    props:[ 'datos' ],
    data() {
      return {
        size: 200,
        value: '',
      }
    },
    methods:{
          DescargarPdf() {
     
      
      var doc = new jsPDF();
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 20, 85, 55, 3, 3, "FD");
      doc.setFontSize(12);
      doc.text("Credencial Alumno", 40, 25);
      doc.addImage("this.datos.Foto", "jpeg", 25, 28, 25, 25);
      doc.addImage("this.datos.Foto", "JPEG", 75, 28, 25, 25);
      doc.setFontSize(9);
      doc.text("LU: ", 25, 58);
      doc.text(this.datos.lu, 40,58);
      doc.text("Nombre: ", 25, 62);
      doc.text(this.datos.Nombre, 40,62);
      doc.text("Apellido: ", 25, 66);
      doc.text (this.datos.Apellido, 40, 66);
      doc.text("Carrera: ", 25, 70);
      doc.text(this.datos.Facultad, 40,70);
      doc.save("into.pdf");
    },
    },
    components: {
      QrcodeVue,jsPDF,
    },
  }
</script> 



<style scoped>

img.preview {
    width: 200px; height: 200px;
    
}

h1 {
  margin-top: 25px;
}
#credencialgen {
  /* background-color: rgb(143, 202, 183); */
  width: 650px;
  height: 460px;
  text-align: center;
  border:solid 2px #000000;
 
  border-radius: 15px;
  border-width: 5px;
  margin-left: 15px;
  margin-right: 15px;
}
#qrcode {
  margin-bottom: auto;
  text-align: match-parent;
}
#datos{
  text-align: left
}
#credencialgen #qrcode {
  text-align: center;
  margin-bottom: 5px;
  
}
</style>