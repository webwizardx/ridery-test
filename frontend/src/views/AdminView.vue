<script setup lang="ts">
import useAuthStore from '@/stores/auth';


const store = useAuthStore()

</script>

<template>
  <main>
    <h1>Admin View Protected</h1>
    <v-btn rounded="0" variant="tonal" @click="store.logout">
      Cerrar sesión
    </v-btn>
  </main>
</template>
