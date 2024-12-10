<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { ref } from 'vue';


const store = useAuthStore()

const drawer = ref(null)

</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ store.user.email }}</v-app-bar-title>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-list-item-title @click="store.logout">Cerrar Sesión</v-list-item-title>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <h1>Admin View Protected</h1>
    </v-main>
  </v-app>
</template>
