<template>
  <v-app class="app">
      
    <router-view></router-view>
  </v-app>
</template>

<script>
import Home from '@/views/Home';


export default {
  name: 'App',

  components: {
    Home,
  },

  data () {
    return{
    
    } 
  }
};
</script>
