<template>
  
  <div id="credencialgen">
    <h1>Credencial Alumno</h1>
    <qrcode-vue :value="datos.id" :size="size" level="H"></qrcode-vue>
    <tr>LU: {{datos.lu}}</tr>
    <tr>Nombre: {{datos.Nombre}}</tr>
    <tr>Apellido: {{datos.Apellido}}</tr>
    <tr>Facultad: {{datos.Facultad}}</tr>
    
  </div>
</template>


<script>
  import QrcodeVue from 'qrcode.vue'
 
  export default {
    props:[ 'datos' ],
    data() {
      return {
        size: 200,
      }
    },
    components: {
      QrcodeVue,
    },
  }
</script> 

<style scoped>
h1 {
  margin-top: 25px;
}
#credencialgen {
  background-image: "@/assets/logo.png";
  background-color: rgb(143, 202, 183);
  width: 350px;
  height: 460px;
  text-align: center;
  border-color: #333131;
  border-radius: 15px;
  border-width: 5px;
  margin-left: 15px;
  margin-right: 15px;
}
#qrcode {
  margin-bottom: auto;
  text-align: match-parent;
}
#credencialgen #qrcode {
  text-align: center;
  margin-bottom: 5px;
  
}
</style>