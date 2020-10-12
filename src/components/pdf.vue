<template>
  <div>
    <v-btn @click="DescargarPdf">Descarga</v-btn>
  </div>
</template>

<script>
import jsPDF from "jspdf";
export default {
  name: "pdf",
  data() {
    return {};
  },

  methods: {
    DescargarPdf() {
      var doc = new jsPDF();
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 20, 85, 55, 3, 3, "FD");
      doc.setFontSize(12);
      doc.text("Credencial Alumno", 40, 25);
      doc.addImage("examples/images/Octonyan.jpg", "JPEG", 25, 28, 25, 25);
      doc.addImage("examples/images/Octonyan.jpg", "JPEG", 75, 28, 25, 25);
      doc.setFontSize(9);
      doc.text("LU: ", 25, 58);
      doc.text("Nombre: ", 25, 62);
      doc.text("Apellido: ", 25, 66);
      doc.text("Carrera: ", 25, 70);
      doc.save("into.pdf");
    },
  },
};
</script>