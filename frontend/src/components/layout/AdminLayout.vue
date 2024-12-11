<script setup lang="ts">
import useAuthStore from '@/stores/auth';
const authStore = useAuthStore()

</script>

<template>
  <v-app id="inspire">

    <v-app-bar>
      <v-app-bar-title>{{ authStore.user.email }}</v-app-bar-title>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-list-item-title @click="authStore.logout">
                <v-btn variant="text">
                  Cerrar Sesión
                </v-btn>
              </v-list-item-title>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
