<template>
  <div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
 
  export default {
    props:['value'],
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