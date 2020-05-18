<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md6>
        <h1>Gestion De Usuarios</h1>
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos optio, ducimus,
          perspiciatis corrupti ipsa dolor labore ad deleniti rerum omnis, ullam cum laboriosam nulla
          ipsum sunt vero enim beatae ipsam!
        </h5>
      </v-flex>
      <v-flex >
        <v-img src="@/assets/Teamwork.jpg" max-height="300" max-width="300"></v-img>
      </v-flex>
    </v-layout>

      <RegistroUser/>


    <v-flex class="mx-auto">
      <v-list subheader>
        <v-subheader>Lista de Usuarios</v-subheader>

        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon v-if="item.active" :color="item.active ? 'deep-purple accent-4' : 'grey'">Editar</v-icon>

            <v-icon
              v-if="!item.active"
              :color="item.active ? 'deep-purple accent-4' : 'grey'"
            >Activar</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
    </v-flex>
  </v-container>
</template>


<script>
import RegistroUser from "@/components/RegistroUser.vue";
export default {
  name: "Usuarios",
  components: {RegistroUser},
  data() {
    return {
      
      items: [
        {
          active: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ]
    };
  }
};
</script>




