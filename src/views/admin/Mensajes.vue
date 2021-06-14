<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md6>
        <h1>Gestion De Usuarios</h1>
        <h5>
         amet consectetur adipisicing elit. Quos optio, ducimus,
          perspiciatis corrupti ipsa dolor labore ad deleniti rerum omnis, ullam cum laboriosam nulla
          ipsum sunt vero enim b      eatae ipsam!    
        </h5>
      </v-flex>
      <v-flex>
        <v-img src="@/assets/Teamwork.jpg" max-height="300" max-width="300"></v-img>
      </v-flex>
    </v-layout> 

    <v-simple-table  height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Email</th>
            <th class="text-left">Asunto</th>
            <th class="text-left">Mensaje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in mensajes" :key="item.id">          
            <td>{{ item.data().Nombre }}</td>            
            <td> 
                <a :href="'mailto:' + item.data().Email" >{{item.data().Email}}</a></td>
            <td>{{ item.data().Asunto }}</td>
            <td>{{ item.data().Mensaje}}</td> 
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>


<script>
import { db } from "@/components/FirebaseInit.js";

export default {
  name: "Mensajes",
  components: {  },

  data() {
    return {
      mensajes: []
      
    };
  },
    
    created() {
    db.collection("Mensajes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.mensajes.push(doc);
        });
      });
  }
}


</script>