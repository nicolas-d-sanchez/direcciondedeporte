<template>
  
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
  
    
  </V-container>
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